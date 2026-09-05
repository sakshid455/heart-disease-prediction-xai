"""
MULTI-MODEL ADAPTIVE SYNTHETIC DATA AUGMENTATION EXPERIMENT

Extends the single-model experiment to compare 4 classifiers across
7 augmentation ratios (28 total experiments).

Models:
    1. Logistic Regression  (with StandardScaler preprocessing)
    2. Random Forest         (no scaling needed)
    3. SVM (RBF kernel)     (with StandardScaler preprocessing)
    4. XGBoost              (no scaling needed)

Data:
    Real training:  data/processed/large_train.csv
    Synthetic:      data/processed/large_synthetic_ctgan.csv
    Real test:      data/processed/large_test.csv  (evaluation ONLY)

Augmentation Ratios:
    0%, 25%, 50%, 75%, 100%, 150%, 200%

Output:
    results/adaptive_model_comparison.csv

Test-set leakage prevention: MANDATORY
"""

import pandas as pd
import numpy as np
import os
import time
import warnings
warnings.filterwarnings("ignore")

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier

from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report,
)


# ============================================================
# CONFIGURATION
# ============================================================

REAL_TRAIN_PATH = "data/processed/large_train.csv"
SYNTHETIC_PATH = "data/processed/large_synthetic_ctgan.csv"
REAL_TEST_PATH = "data/processed/large_test.csv"

RESULTS_PATH = "results/adaptive_model_comparison.csv"

TARGET = "cardio"
RANDOM_SEED = 42

AUGMENTATION_RATIOS = [0, 25, 50, 75, 100, 150, 200]

# Model definitions with appropriate preprocessing
# LR and SVM need scaling; RF and XGBoost do not
MODELS = {
    "Logistic Regression": Pipeline([
        ("scaler", StandardScaler()),
        ("model", LogisticRegression(
            max_iter=1000,
            random_state=RANDOM_SEED,
            solver="lbfgs",
            C=1.0,
        )),
    ]),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=RANDOM_SEED,
    ),
    "SVM": Pipeline([
        ("scaler", StandardScaler()),
        ("model", SVC(
            kernel="rbf",
            C=1.0,
            gamma="scale",
            probability=True,
            random_state=RANDOM_SEED,
        )),
    ]),
    "XGBoost": XGBClassifier(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=RANDOM_SEED,
        eval_metric="logloss",
        verbosity=0,
    ),
}


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 70)
print("MULTI-MODEL ADAPTIVE AUGMENTATION EXPERIMENT")
print("4 Models x 7 Ratios = 28 Experiments")
print("=" * 70)

print("\n[1/3] Loading data...")

real_train = pd.read_csv(REAL_TRAIN_PATH)
synthetic = pd.read_csv(SYNTHETIC_PATH)
real_test = pd.read_csv(REAL_TEST_PATH)

N_real = len(real_train)
N_synth_available = len(synthetic)
N_test = len(real_test)

print("  Real training:     {:,} records".format(N_real))
print("  Synthetic:         {:,} records".format(N_synth_available))
print("  Real test:         {:,} records (evaluation ONLY)".format(N_test))

# Prepare FIXED test set
X_test = real_test.drop(columns=[TARGET])
y_test = real_test[TARGET]

print("\n  Models to evaluate:")
for name in MODELS:
    print("    - {}".format(name))

print("\n  Augmentation ratios: {}".format(
    [str(r) + "%" for r in AUGMENTATION_RATIOS]))
print("  Total experiments: {}".format(
    len(MODELS) * len(AUGMENTATION_RATIOS)))


# ============================================================
# RUN ALL EXPERIMENTS
# ============================================================

print("\n[2/3] Running experiments...")
print("=" * 70)

results = []
experiment_num = 0
total_experiments = len(MODELS) * len(AUGMENTATION_RATIOS)

for model_name, model_template in MODELS.items():

    print("\n" + "=" * 70)
    print("  MODEL: {}".format(model_name))
    print("=" * 70)

    for ratio in AUGMENTATION_RATIOS:

        experiment_num += 1
        n_synth = int(N_real * ratio / 100)
        n_synth = min(n_synth, N_synth_available)

        print("\n  [{}/{}] {} @ {}% augmentation".format(
            experiment_num, total_experiments, model_name, ratio))

        # Build training set
        if n_synth > 0:
            synth_sample = synthetic.sample(
                n=n_synth,
                random_state=RANDOM_SEED,
            )
            train_data = pd.concat(
                [real_train, synth_sample],
                ignore_index=True,
            )
        else:
            train_data = real_train.copy()

        n_total = len(train_data)

        X_train = train_data.drop(columns=[TARGET])
        y_train = train_data[TARGET]

        print("    Training: {:,} records (real={:,} + synth={:,})".format(
            n_total, N_real, n_synth))

        # Clone model (fresh instance for each experiment)
        from sklearn.base import clone
        model = clone(model_template)

        # Train
        start = time.time()
        model.fit(X_train, y_train)
        train_time = time.time() - start

        # Evaluate on REAL TEST SET ONLY
        y_pred = model.predict(X_test)

        # Get probabilities for ROC-AUC
        if hasattr(model, "predict_proba"):
            y_prob = model.predict_proba(X_test)[:, 1]
        elif hasattr(model, "decision_function"):
            y_prob = model.decision_function(X_test)
        else:
            y_prob = y_pred.astype(float)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1_val = f1_score(y_test, y_pred, zero_division=0)
        roc = roc_auc_score(y_test, y_prob)

        print("    Time: {:.1f}s  |  Acc={:.4f}  Prec={:.4f}  Rec={:.4f}  F1={:.4f}  AUC={:.4f}".format(
            train_time, acc, prec, rec, f1_val, roc))

        results.append({
            "model": model_name,
            "augmentation_ratio": ratio,
            "real_train_size": N_real,
            "synthetic_train_size": n_synth,
            "total_train_size": n_total,
            "accuracy": round(acc, 6),
            "precision": round(prec, 6),
            "recall": round(rec, 6),
            "f1_score": round(f1_val, 6),
            "roc_auc": round(roc, 6),
            "training_time_seconds": round(train_time, 1),
        })


# ============================================================
# SAVE RESULTS
# ============================================================

print("\n\n[3/3] Saving results and analysis...")

results_df = pd.DataFrame(results)

os.makedirs(os.path.dirname(RESULTS_PATH), exist_ok=True)
results_df.to_csv(RESULTS_PATH, index=False)

print("  Saved: {}".format(RESULTS_PATH))


# ============================================================
# FINAL COMPARISON TABLES
# ============================================================

print("\n" + "=" * 70)
print("COMPLETE RESULTS")
print("=" * 70)

# Table 1: All results
print("\n{:<22s} {:>6s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}".format(
    "Model", "Ratio", "Acc", "Prec", "Recall", "F1", "AUC"))
print("-" * 75)

for r in results:
    print("{:<22s} {:>5d}%  {:>8.4f}  {:>8.4f}  {:>8.4f}  {:>8.4f}  {:>8.4f}".format(
        r["model"], r["augmentation_ratio"],
        r["accuracy"], r["precision"], r["recall"],
        r["f1_score"], r["roc_auc"]))

# Table 2: Best ratio per model per metric
print("\n" + "=" * 70)
print("BEST AUGMENTATION RATIO PER MODEL")
print("=" * 70)

print("\n{:<22s} {:>12s}  {:>12s}  {:>12s}".format(
    "Model", "Best Acc", "Best F1", "Best AUC"))
print("-" * 62)

for model_name in MODELS:
    model_results = [r for r in results if r["model"] == model_name]

    best_acc = max(model_results, key=lambda x: x["accuracy"])
    best_f1 = max(model_results, key=lambda x: x["f1_score"])
    best_auc = max(model_results, key=lambda x: x["roc_auc"])

    print("{:<22s} {:>3d}% ({:.4f})  {:>3d}% ({:.4f})  {:>3d}% ({:.4f})".format(
        model_name,
        best_acc["augmentation_ratio"], best_acc["accuracy"],
        best_f1["augmentation_ratio"], best_f1["f1_score"],
        best_auc["augmentation_ratio"], best_auc["roc_auc"]))

# Table 3: Baseline vs Best augmented
print("\n" + "=" * 70)
print("BASELINE (0%) vs BEST AUGMENTED -- PER MODEL")
print("=" * 70)

print("\n{:<22s} {:>10s} {:>10s} {:>10s} {:>10s}".format(
    "Model", "Base F1", "Best F1", "Delta", "Best Ratio"))
print("-" * 65)

for model_name in MODELS:
    model_results = [r for r in results if r["model"] == model_name]
    baseline = [r for r in model_results if r["augmentation_ratio"] == 0][0]
    augmented = [r for r in model_results if r["augmentation_ratio"] > 0]
    best = max(augmented, key=lambda x: x["f1_score"])

    delta = best["f1_score"] - baseline["f1_score"]
    print("{:<22s} {:>10.4f} {:>10.4f} {:>+10.4f} {:>9d}%".format(
        model_name, baseline["f1_score"], best["f1_score"],
        delta, best["augmentation_ratio"]))

# Table 4: Best model at each ratio
print("\n" + "=" * 70)
print("BEST MODEL AT EACH AUGMENTATION RATIO")
print("=" * 70)

print("\n{:>6s}  {:<22s} {:>8s}  {:>8s}  {:>8s}".format(
    "Ratio", "Best Model", "F1", "Acc", "AUC"))
print("-" * 58)

for ratio in AUGMENTATION_RATIOS:
    ratio_results = [r for r in results if r["augmentation_ratio"] == ratio]
    best = max(ratio_results, key=lambda x: x["f1_score"])
    print("{:>5d}%  {:<22s} {:>8.4f}  {:>8.4f}  {:>8.4f}".format(
        ratio, best["model"], best["f1_score"],
        best["accuracy"], best["roc_auc"]))

# Overall best
print("\n" + "=" * 70)
print("OVERALL BEST CONFIGURATION")
print("=" * 70)

overall_best_f1 = max(results, key=lambda x: x["f1_score"])
overall_best_acc = max(results, key=lambda x: x["accuracy"])
overall_best_auc = max(results, key=lambda x: x["roc_auc"])

print("\n  By F1-Score:  {} @ {}% -> F1={:.4f}, Acc={:.4f}, AUC={:.4f}".format(
    overall_best_f1["model"], overall_best_f1["augmentation_ratio"],
    overall_best_f1["f1_score"], overall_best_f1["accuracy"],
    overall_best_f1["roc_auc"]))

print("  By Accuracy:  {} @ {}% -> Acc={:.4f}, F1={:.4f}, AUC={:.4f}".format(
    overall_best_acc["model"], overall_best_acc["augmentation_ratio"],
    overall_best_acc["accuracy"], overall_best_acc["f1_score"],
    overall_best_acc["roc_auc"]))

print("  By ROC-AUC:   {} @ {}% -> AUC={:.4f}, F1={:.4f}, Acc={:.4f}".format(
    overall_best_auc["model"], overall_best_auc["augmentation_ratio"],
    overall_best_auc["roc_auc"], overall_best_auc["f1_score"],
    overall_best_auc["accuracy"]))

print("\n" + "=" * 70)
print("EXPERIMENT COMPLETE")
print("=" * 70)
print("\n  Test-set leakage:  NONE")
print("  Reproducibility:   random_state=42 everywhere")
print("  Results:           {}".format(RESULTS_PATH))
print("  Total experiments: {}".format(total_experiments))
print("\n" + "=" * 70)
