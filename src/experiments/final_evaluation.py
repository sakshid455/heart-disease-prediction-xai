import os
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report,
    confusion_matrix
)

from xgboost import XGBClassifier


# ============================================================
# PATHS
# ============================================================

REAL_TRAIN_PATH = "data/processed/real_train.csv"
REAL_TEST_PATH = "data/processed/real_test.csv"
SYNTHETIC_PATH = "data/processed/synthetic_tuned.csv"

CV_RESULTS_PATH = (
    "results/cross_validation/"
    "cross_validation_results.csv"
)

OUTPUT_DIR = "results/final"

TARGET = "num"
RANDOM_STATE = 42


# ============================================================
# LOAD DATA
# ============================================================

real_train = pd.read_csv(
    REAL_TRAIN_PATH
)

real_test = pd.read_csv(
    REAL_TEST_PATH
)

synthetic = pd.read_csv(
    SYNTHETIC_PATH
)

cv_results = pd.read_csv(
    CV_RESULTS_PATH
)


# ============================================================
# SELECT BEST CONFIGURATION
# ============================================================

best = cv_results.loc[
    cv_results["F1_Mean"].idxmax()
]

best_model_name = best["Model"]

best_ratio = int(
    best["Augmentation_Ratio"]
)

print("\n" + "=" * 70)
print("SELECTED CONFIGURATION")
print("=" * 70)

print(
    f"Model        : {best_model_name}"
)

print(
    f"Augmentation : {best_ratio}%"
)

print(
    f"CV F1        : {best['F1_Mean']:.4f}"
)

print(
    f"CV ROC-AUC   : {best['ROC_AUC_Mean']:.4f}"
)


# ============================================================
# CREATE AUGMENTED DATA
# ============================================================

if best_ratio == 0:

    augmented_train = real_train.copy()

else:

    n_synthetic = int(
        len(real_train) *
        best_ratio /
        100
    )

    replace = (
        n_synthetic >
        len(synthetic)
    )

    synthetic_subset = synthetic.sample(
        n=n_synthetic,
        replace=replace,
        random_state=RANDOM_STATE
    )

    augmented_train = pd.concat(
        [
            real_train,
            synthetic_subset
        ],
        ignore_index=True
    )


print("\nTraining data:")
print(
    f"Real samples      : {len(real_train)}"
)

print(
    f"Synthetic samples : "
    f"{len(augmented_train) - len(real_train)}"
)

print(
    f"Total samples     : "
    f"{len(augmented_train)}"
)


# ============================================================
# PREPARE DATA
# ============================================================

X_train = augmented_train.drop(
    columns=[TARGET]
)

y_train = augmented_train[TARGET]

X_test = real_test.drop(
    columns=[TARGET]
)

y_test = real_test[TARGET]


# ============================================================
# CREATE SELECTED MODEL
# ============================================================

def create_model(name):

    if name == "Logistic Regression":

        return Pipeline([
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
        ])

    if name == "Random Forest":

        return RandomForestClassifier(
            n_estimators=300,
            random_state=RANDOM_STATE,
            class_weight="balanced"
        )

    if name == "XGBoost":

        return XGBClassifier(
            n_estimators=300,
            max_depth=4,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=RANDOM_STATE,
            eval_metric="logloss"
        )

    if name == "SVM":

        return Pipeline([
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

    raise ValueError(
        f"Unknown model: {name}"
    )


# ============================================================
# TRAIN FINAL MODEL
# ============================================================

model = create_model(
    best_model_name
)

model.fit(
    X_train,
    y_train
)


# ============================================================
# PREDICTIONS
# ============================================================

predictions = model.predict(
    X_test
)

probabilities = (
    model
    .predict_proba(X_test)[:, 1]
)


# ============================================================
# FINAL METRICS
# ============================================================

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


# ============================================================
# PRINT RESULTS
# ============================================================

print("\n" + "=" * 70)
print("FINAL TEST RESULTS")
print("=" * 70)

print(
    f"Accuracy  : {accuracy:.4f}"
)

print(
    f"Precision : {precision:.4f}"
)

print(
    f"Recall    : {recall:.4f}"
)

print(
    f"F1 Score  : {f1:.4f}"
)

print(
    f"ROC-AUC   : {roc_auc:.4f}"
)


# ============================================================
# CLASSIFICATION REPORT
# ============================================================

print("\n" + "=" * 70)
print("CLASSIFICATION REPORT")
print("=" * 70)

print(
    classification_report(
        y_test,
        predictions,
        zero_division=0
    )
)


# ============================================================
# CONFUSION MATRIX
# ============================================================

print("\n" + "=" * 70)
print("CONFUSION MATRIX")
print("=" * 70)

print(
    confusion_matrix(
        y_test,
        predictions
    )
)


# ============================================================
# SAVE FINAL RESULTS
# ============================================================

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)

final_results = pd.DataFrame([
    {
        "Model": best_model_name,
        "Augmentation_Ratio": best_ratio,
        "Real_Training_Samples": len(real_train),
        "Synthetic_Training_Samples":
            len(augmented_train) -
            len(real_train),
        "Total_Training_Samples":
            len(augmented_train),
        "Test_Samples": len(real_test),
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1": f1,
        "ROC_AUC": roc_auc
    }
])

final_results.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "final_model_results.csv"
    ),
    index=False
)


# ============================================================
# SAVE PREDICTIONS
# ============================================================

prediction_results = real_test.copy()

prediction_results[
    "Predicted_Class"
] = predictions

prediction_results[
    "Prediction_Probability"
] = probabilities

prediction_results.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "test_predictions.csv"
    ),
    index=False
)


print("\n" + "=" * 70)
print("FINAL EVALUATION COMPLETED")
print("=" * 70)

print(
    "\nSaved:"
)

print(
    "results/final/final_model_results.csv"
)

print(
    "results/final/test_predictions.csv"
)