import os
import pandas as pd
import numpy as np

from sklearn.model_selection import StratifiedKFold
from sklearn.base import clone
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
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
SYNTHETIC_PATH = "data/processed/synthetic_tuned.csv"

RESULTS_DIR = "results/cross_validation"

TARGET_COLUMN = "num"

RANDOM_STATE = 42

N_SPLITS = 5

AUGMENTATION_RATIOS = [
    0.00,
    0.25,
    0.50,
    0.75,
    1.00,
    1.50,
    2.00
]


# ============================================================
# LOAD DATA
# ============================================================

real_train = pd.read_csv(
    REAL_TRAIN_PATH
)

synthetic = pd.read_csv(
    SYNTHETIC_PATH
)

print("\n" + "=" * 70)
print("CROSS-VALIDATION EXPERIMENT")
print("=" * 70)

print(
    f"Real training data : {real_train.shape}"
)

print(
    f"Synthetic data     : {synthetic.shape}"
)


# ============================================================
# MODELS
# ============================================================

def get_models():

    return {

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


# ============================================================
# CREATE AUGMENTED DATA
# ============================================================

def create_augmented_data(
    train_data,
    synthetic_data,
    ratio
):

    if ratio == 0:
        return train_data.copy()

    n_samples = int(
        len(train_data) * ratio
    )

    replace = (
        n_samples > len(synthetic_data)
    )

    synthetic_subset = synthetic_data.sample(
        n=n_samples,
        replace=replace,
        random_state=RANDOM_STATE
    )

    augmented = pd.concat(
        [
            train_data,
            synthetic_subset
        ],
        ignore_index=True
    )

    return augmented


# ============================================================
# CROSS VALIDATION
# ============================================================

models = get_models()

all_results = []


for ratio in AUGMENTATION_RATIOS:

    percentage = int(
        ratio * 100
    )

    print("\n" + "-" * 70)

    print(
        f"Augmentation: {percentage}%"
    )

    augmented_data = create_augmented_data(
        real_train,
        synthetic,
        ratio
    )

    X = augmented_data.drop(
        columns=[TARGET_COLUMN]
    )

    y = augmented_data[TARGET_COLUMN]

    cv = StratifiedKFold(
        n_splits=N_SPLITS,
        shuffle=True,
        random_state=RANDOM_STATE
    )

    for model_name, model in models.items():

        print(
            f"  Evaluating {model_name}..."
        )

        fold_metrics = []

        for fold, (train_idx, val_idx) in enumerate(
            cv.split(X, y),
            start=1
        ):

            X_train = X.iloc[train_idx]

            X_val = X.iloc[val_idx]

            y_train = y.iloc[train_idx]

            y_val = y.iloc[val_idx]

            current_model = clone(model)

            current_model.fit(
                X_train,
                y_train
            )

            predictions = current_model.predict(
                X_val
            )

            probabilities = (
                current_model
                .predict_proba(X_val)[:, 1]
            )

            metrics = {

                "Accuracy": accuracy_score(
                    y_val,
                    predictions
                ),

                "Precision": precision_score(
                    y_val,
                    predictions,
                    zero_division=0
                ),

                "Recall": recall_score(
                    y_val,
                    predictions,
                    zero_division=0
                ),

                "F1": f1_score(
                    y_val,
                    predictions,
                    zero_division=0
                ),

                "ROC_AUC": roc_auc_score(
                    y_val,
                    probabilities
                )
            }

            fold_metrics.append(
                metrics
            )

        metrics_df = pd.DataFrame(
            fold_metrics
        )

        result = {

            "Augmentation_Ratio": percentage,

            "Model": model_name,

            "Accuracy_Mean":
                metrics_df["Accuracy"].mean(),

            "Accuracy_STD":
                metrics_df["Accuracy"].std(),

            "Precision_Mean":
                metrics_df["Precision"].mean(),

            "Precision_STD":
                metrics_df["Precision"].std(),

            "Recall_Mean":
                metrics_df["Recall"].mean(),

            "Recall_STD":
                metrics_df["Recall"].std(),

            "F1_Mean":
                metrics_df["F1"].mean(),

            "F1_STD":
                metrics_df["F1"].std(),

            "ROC_AUC_Mean":
                metrics_df["ROC_AUC"].mean(),

            "ROC_AUC_STD":
                metrics_df["ROC_AUC"].std()
        }

        all_results.append(
            result
        )

        print(
            f"    F1: "
            f"{result['F1_Mean']:.4f} "
            f"+/- "
            f"{result['F1_STD']:.4f}"
        )

        print(
            f"    ROC-AUC: "
            f"{result['ROC_AUC_Mean']:.4f}"
        )


# ============================================================
# SAVE RESULTS
# ============================================================

results_df = pd.DataFrame(
    all_results
)

os.makedirs(
    RESULTS_DIR,
    exist_ok=True
)

results_path = os.path.join(
    RESULTS_DIR,
    "cross_validation_results.csv"
)

results_df.to_csv(
    results_path,
    index=False
)


# ============================================================
# FIND BEST CONFIGURATION
# ============================================================

best_result = results_df.loc[
    results_df["F1_Mean"].idxmax()
]


print("\n" + "=" * 70)
print("BEST CROSS-VALIDATION CONFIGURATION")
print("=" * 70)

print(
    f"Model          : "
    f"{best_result['Model']}"
)

print(
    f"Augmentation   : "
    f"{best_result['Augmentation_Ratio']}%"
)

print(
    f"Mean Accuracy  : "
    f"{best_result['Accuracy_Mean']:.4f}"
)

print(
    f"Mean F1        : "
    f"{best_result['F1_Mean']:.4f}"
)

print(
    f"Mean ROC-AUC    : "
    f"{best_result['ROC_AUC_Mean']:.4f}"
)

print(
    f"\nResults saved to:"
    f"\n{results_path}"
)


# ============================================================
# PRINT FULL RESULTS
# ============================================================

print("\n" + "=" * 70)
print("CROSS-VALIDATION RESULTS")
print("=" * 70)

print(
    results_df[
        [
            "Augmentation_Ratio",
            "Model",
            "Accuracy_Mean",
            "Precision_Mean",
            "Recall_Mean",
            "F1_Mean",
            "ROC_AUC_Mean"
        ]
    ].to_string(index=False)
)