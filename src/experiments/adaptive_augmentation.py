import os
import pandas as pd
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from xgboost import XGBClassifier


# ============================================================
# CONFIGURATION
# ============================================================

REAL_TRAIN_PATH = "data/processed/real_train.csv"
REAL_TEST_PATH = "data/processed/real_test.csv"
SYNTHETIC_PATH = "data/processed/synthetic_tuned.csv"

RESULTS_DIR = "results"
RESULTS_PATH = os.path.join(
    RESULTS_DIR,
    "adaptive_augmentation_results.csv"
)

# Synthetic augmentation ratios
AUGMENTATION_RATIOS = [
    0.00,
    0.25,
    0.50,
    0.75,
    1.00,
    1.50,
    2.00
]

TARGET_COLUMN = "num"

RANDOM_STATE = 42


# ============================================================
# LOAD DATA
# ============================================================

def load_data():

    print("\n" + "=" * 60)
    print("LOADING DATA")
    print("=" * 60)

    real_train = pd.read_csv(REAL_TRAIN_PATH)
    real_test = pd.read_csv(REAL_TEST_PATH)
    synthetic = pd.read_csv(SYNTHETIC_PATH)

    print(f"Real training data : {real_train.shape}")
    print(f"Real test data     : {real_test.shape}")
    print(f"Synthetic data     : {synthetic.shape}")

    return real_train, real_test, synthetic


# ============================================================
# PREPARE FEATURES AND TARGET
# ============================================================

def prepare_data(real_train, real_test):

    X_train = real_train.drop(columns=[TARGET_COLUMN])
    y_train = real_train[TARGET_COLUMN]

    X_test = real_test.drop(columns=[TARGET_COLUMN])
    y_test = real_test[TARGET_COLUMN]

    return X_train, y_train, X_test, y_test


# ============================================================
# CREATE AUGMENTED DATASET
# ============================================================

def create_augmented_dataset(
    real_train,
    synthetic,
    ratio
):

    if ratio == 0:
        return real_train.copy()

    number_of_synthetic_samples = int(
        len(real_train) * ratio
    )

    # If requested samples are greater than
    # available synthetic records, sample with replacement.
    replace = number_of_synthetic_samples > len(synthetic)

    synthetic_subset = synthetic.sample(
        n=number_of_synthetic_samples,
        replace=replace,
        random_state=RANDOM_STATE
    )

    augmented_data = pd.concat(
        [
            real_train,
            synthetic_subset
        ],
        ignore_index=True
    )

    return augmented_data


# ============================================================
# DEFINE ML MODELS
# ============================================================

def get_models():

    models = {

        "Logistic Regression": Pipeline([
            (
                "scaler",
                StandardScaler()
            ),
            (
                "model",
                LogisticRegression(
                    max_iter=2000,
                    random_state=RANDOM_STATE
                )
            )
        ]),

        "Random Forest": RandomForestClassifier(
            n_estimators=300,
            random_state=RANDOM_STATE,
            class_weight="balanced"
        ),

        "XGBoost": XGBClassifier(
            n_estimators=300,
            max_depth=4,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=RANDOM_STATE,
            eval_metric="logloss"
        ),

        "SVM": Pipeline([
            (
                "scaler",
                StandardScaler()
            ),
            (
                "model",
                SVC(
                    probability=True,
                    kernel="rbf",
                    random_state=RANDOM_STATE
                )
            )
        ])
    }

    return models


# ============================================================
# EVALUATE MODEL
# ============================================================

def evaluate_model(
    model,
    X_train,
    y_train,
    X_test,
    y_test
):

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    probabilities = model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    precision = precision_score(
        y_test,
        predictions,
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        zero_division=0
    )

    roc_auc = roc_auc_score(
        y_test,
        probabilities
    )

    return {
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1": f1,
        "ROC_AUC": roc_auc
    }


# ============================================================
# MAIN EXPERIMENT
# ============================================================

def run_experiment():

    real_train, real_test, synthetic = load_data()

    print("\nPreparing datasets...")

    _, _, X_test, y_test = prepare_data(
        real_train,
        real_test
    )

    models = get_models()

    all_results = []

    print("\n" + "=" * 60)
    print("ADAPTIVE SYNTHETIC DATA AUGMENTATION")
    print("=" * 60)

    for ratio in AUGMENTATION_RATIOS:

        print("\n")
        print("-" * 60)

        percentage = int(ratio * 100)

        print(
            f"Testing augmentation: "
            f"Real + {percentage}% Synthetic"
        )

        augmented_data = create_augmented_dataset(
            real_train,
            synthetic,
            ratio
        )

        X_train = augmented_data.drop(
            columns=[TARGET_COLUMN]
        )

        y_train = augmented_data[TARGET_COLUMN]

        print(
            f"Training samples: {len(X_train)}"
        )

        for model_name, model in models.items():

            print(
                f"  Training {model_name}..."
            )

            metrics = evaluate_model(
                model,
                X_train,
                y_train,
                X_test,
                y_test
            )

            result = {
                "Augmentation_Ratio": percentage,
                "Training_Samples": len(X_train),
                "Model": model_name,
                "Accuracy": metrics["Accuracy"],
                "Precision": metrics["Precision"],
                "Recall": metrics["Recall"],
                "F1": metrics["F1"],
                "ROC_AUC": metrics["ROC_AUC"]
            }

            all_results.append(result)

            print(
                f"    Accuracy : {metrics['Accuracy']:.4f}"
            )

            print(
                f"    Precision: {metrics['Precision']:.4f}"
            )

            print(
                f"    Recall   : {metrics['Recall']:.4f}"
            )

            print(
                f"    F1       : {metrics['F1']:.4f}"
            )

            print(
                f"    ROC-AUC  : {metrics['ROC_AUC']:.4f}"
            )

    # ========================================================
    # SAVE RESULTS
    # ========================================================

    results_df = pd.DataFrame(all_results)

    os.makedirs(
        RESULTS_DIR,
        exist_ok=True
    )

    results_df.to_csv(
        RESULTS_PATH,
        index=False
    )

    print("\n" + "=" * 60)
    print("EXPERIMENT COMPLETED")
    print("=" * 60)

    print(
        f"\nResults saved to:\n{RESULTS_PATH}"
    )

    print("\nResults:")
    print(results_df.to_string(index=False))

    return results_df


# ============================================================
# PROGRAM ENTRY POINT
# ============================================================

if __name__ == "__main__":

    run_experiment()