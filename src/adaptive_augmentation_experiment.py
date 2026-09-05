"""
ADAPTIVE SYNTHETIC DATA AUGMENTATION EXPERIMENT
Main Research Contribution

Research Question:
    "What is the optimal amount of CTGAN-generated synthetic healthcare
     data required to improve heart disease prediction?"

Data:
    Real training:  data/processed/large_train.csv
    Synthetic:      data/processed/large_synthetic_ctgan.csv
    Real test:      data/processed/large_test.csv  (evaluation ONLY)

Augmentation Ratios:
    0%, 25%, 50%, 75%, 100%, 150%, 200%

    Each ratio is relative to N (number of real training records).
    For each ratio, ALL real training records are kept and the specified
    number of synthetic records are added.

Model:
    RandomForestClassifier (n_estimators=100, random_state=42)
    Reuses pattern from src/final_experiment.py

Outputs:
    data/experiments/adaptive/  - experiment datasets
    results/adaptive_augmentation_results.csv  - results table

Test-set leakage prevention:
    large_test.csv is ONLY used for evaluation, never for training.
"""

import pandas as pd
import numpy as np
import os
import time
import warnings
warnings.filterwarnings("ignore")

from sklearn.ensemble import RandomForestClassifier
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

EXPERIMENTS_DIR = "data/experiments/adaptive"
RESULTS_PATH = "results/adaptive_augmentation_results.csv"

TARGET = "cardio"
RANDOM_SEED = 42

# Augmentation ratios to evaluate
AUGMENTATION_RATIOS = [0, 25, 50, 75, 100, 150, 200]

# Model configuration (reused from final_experiment.py)
MODEL_PARAMS = {
    "n_estimators": 100,
    "random_state": RANDOM_SEED,
}


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 70)
print("ADAPTIVE SYNTHETIC DATA AUGMENTATION EXPERIMENT")
print("=" * 70)

print("\n[1/4] Loading data...")

real_train = pd.read_csv(REAL_TRAIN_PATH)
synthetic = pd.read_csv(SYNTHETIC_PATH)
real_test = pd.read_csv(REAL_TEST_PATH)

N_real = len(real_train)
N_synth_available = len(synthetic)
N_test = len(real_test)

print("  Real training:     {:,} records".format(N_real))
print("  Synthetic:         {:,} records".format(N_synth_available))
print("  Real test:         {:,} records (evaluation ONLY)".format(N_test))

# Verify columns match
assert list(real_train.columns) == list(synthetic.columns), \
    "Column mismatch between real and synthetic"
assert list(real_train.columns) == list(real_test.columns), \
    "Column mismatch between real train and test"

print("  Columns:           {} ({} features + target)".format(
    len(real_train.columns), len(real_train.columns) - 1))

# Prepare test set (FIXED — never changes)
X_test = real_test.drop(columns=[TARGET])
y_test = real_test[TARGET]

print("\n  TEST SET LEAKAGE CHECK:")
print("    Real test loaded:       {}".format(REAL_TEST_PATH))
print("    Test records:           {:,}".format(N_test))
print("    Test set used for:      EVALUATION ONLY")
print("    Test set in training:   NEVER")


# ============================================================
# EXPERIMENT LOOP
# ============================================================

print("\n[2/4] Running augmentation experiments...")
print("=" * 70)

os.makedirs(EXPERIMENTS_DIR, exist_ok=True)
os.makedirs(os.path.dirname(RESULTS_PATH), exist_ok=True)

results = []

for ratio in AUGMENTATION_RATIOS:

    print("\n" + "-" * 50)
    print("  Augmentation Ratio: {}%".format(ratio))
    print("-" * 50)

    # Calculate number of synthetic records
    n_synth = int(N_real * ratio / 100)

    if n_synth > N_synth_available:
        print("  WARNING: Requested {:,} synthetic records but only {:,} available".format(
            n_synth, N_synth_available))
        n_synth = N_synth_available

    # Sample synthetic records (reproducible)
    if n_synth > 0:
        synth_sample = synthetic.sample(
            n=n_synth,
            random_state=RANDOM_SEED,
        )
        # Combine: ALL real + sampled synthetic
        train_data = pd.concat(
            [real_train, synth_sample],
            ignore_index=True,
        )
    else:
        train_data = real_train.copy()

    n_total = len(train_data)

    print("  Real training records:     {:,}".format(N_real))
    print("  Synthetic records added:   {:,}".format(n_synth))
    print("  Total training records:    {:,}".format(n_total))

    # Save experiment dataset
    exp_filename = "train_aug_{:03d}pct.csv".format(ratio)
    exp_path = os.path.join(EXPERIMENTS_DIR, exp_filename)
    train_data.to_csv(exp_path, index=False)
    print("  Saved: {}".format(exp_path))

    # Separate features and target
    X_train = train_data.drop(columns=[TARGET])
    y_train = train_data[TARGET]

    # Train model
    print("  Training RandomForest...")
    start = time.time()

    model = RandomForestClassifier(**MODEL_PARAMS)
    model.fit(X_train, y_train)

    train_time = time.time() - start
    print("  Training time: {:.1f}s".format(train_time))

    # Evaluate on REAL TEST SET ONLY
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    roc = roc_auc_score(y_test, y_prob)

    print("\n  Results (evaluated on real test set):")
    print("    Accuracy:  {:.4f}".format(acc))
    print("    Precision: {:.4f}".format(prec))
    print("    Recall:    {:.4f}".format(rec))
    print("    F1-Score:  {:.4f}".format(f1))
    print("    ROC-AUC:   {:.4f}".format(roc))

    print("\n  Classification Report:")
    print(classification_report(y_test, y_pred, zero_division=0,
                                target_names=["No CVD", "CVD"]))

    results.append({
        "augmentation_ratio": ratio,
        "real_train_size": N_real,
        "synthetic_train_size": n_synth,
        "total_train_size": n_total,
        "accuracy": round(acc, 6),
        "precision": round(prec, 6),
        "recall": round(rec, 6),
        "f1_score": round(f1, 6),
        "roc_auc": round(roc, 6),
        "training_time_seconds": round(train_time, 1),
    })


# ============================================================
# SAVE RESULTS
# ============================================================

print("\n[3/4] Saving results...")

results_df = pd.DataFrame(results)
results_df.to_csv(RESULTS_PATH, index=False)

print("  Saved: {}".format(RESULTS_PATH))


# ============================================================
# SUMMARY TABLE
# ============================================================

print("\n[4/4] Final Results Summary")
print("=" * 70)

# Print full table
print("\n{:>8s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}  {:>8s}".format(
    "Ratio", "Real N", "Synth N", "Total N",
    "Acc", "Prec", "Recall", "ROC-AUC"))
print("-" * 70)

baseline_acc = results[0]["accuracy"]
baseline_f1 = results[0]["f1_score"]
baseline_roc = results[0]["roc_auc"]

for r in results:
    print("{:>7d}%  {:>8,d}  {:>8,d}  {:>8,d}  {:>8.4f}  {:>8.4f}  {:>8.4f}  {:>8.4f}".format(
        r["augmentation_ratio"],
        r["real_train_size"],
        r["synthetic_train_size"],
        r["total_train_size"],
        r["accuracy"],
        r["precision"],
        r["recall"],
        r["roc_auc"]))

# Find best ratio
print("\n" + "=" * 70)
print("ANALYSIS")
print("=" * 70)

best_acc_idx = max(range(len(results)), key=lambda i: results[i]["accuracy"])
best_f1_idx = max(range(len(results)), key=lambda i: results[i]["f1_score"])
best_roc_idx = max(range(len(results)), key=lambda i: results[i]["roc_auc"])

print("\n  Baseline (0% augmentation):")
print("    Accuracy:  {:.4f}".format(baseline_acc))
print("    F1-Score:  {:.4f}".format(baseline_f1))
print("    ROC-AUC:   {:.4f}".format(baseline_roc))

print("\n  Best by Accuracy:  {}% augmentation -> {:.4f} (delta: {:+.4f})".format(
    results[best_acc_idx]["augmentation_ratio"],
    results[best_acc_idx]["accuracy"],
    results[best_acc_idx]["accuracy"] - baseline_acc))

print("  Best by F1-Score:  {}% augmentation -> {:.4f} (delta: {:+.4f})".format(
    results[best_f1_idx]["augmentation_ratio"],
    results[best_f1_idx]["f1_score"],
    results[best_f1_idx]["f1_score"] - baseline_f1))

print("  Best by ROC-AUC:   {}% augmentation -> {:.4f} (delta: {:+.4f})".format(
    results[best_roc_idx]["augmentation_ratio"],
    results[best_roc_idx]["roc_auc"],
    results[best_roc_idx]["roc_auc"] - baseline_roc))

# Deltas from baseline
print("\n  Performance delta from baseline (0%):")
print("  {:>8s}  {:>10s}  {:>10s}  {:>10s}  {:>10s}".format(
    "Ratio", "Acc", "F1", "ROC-AUC", "Verdict"))
print("  " + "-" * 55)

for r in results:
    d_acc = r["accuracy"] - baseline_acc
    d_f1 = r["f1_score"] - baseline_f1
    d_roc = r["roc_auc"] - baseline_roc

    # Simple verdict
    if d_acc > 0.001 and d_f1 > 0.001:
        verdict = "IMPROVED"
    elif d_acc < -0.001 or d_f1 < -0.001:
        verdict = "DEGRADED"
    else:
        verdict = "NEUTRAL"

    print("  {:>7d}%  {:>+10.4f}  {:>+10.4f}  {:>+10.4f}  {:>10s}".format(
        r["augmentation_ratio"], d_acc, d_f1, d_roc, verdict))

print("\n" + "=" * 70)
print("EXPERIMENT COMPLETE")
print("=" * 70)

print("\n  Test set leakage: NONE (large_test.csv used for evaluation only)")
print("  Reproducibility:  random_state={} for all operations".format(RANDOM_SEED))
print("  Results:          {}".format(RESULTS_PATH))
print("  Datasets:         {}/".format(EXPERIMENTS_DIR))

print("\n" + "=" * 70)
