import pandas as pd
import numpy as np
import os

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report
)


# ============================================================
# 1. Load datasets
# ============================================================

real_data = pd.read_csv(
    "data/processed/heart_disease_clean.csv"
)

synthetic_data = pd.read_csv(
    "data/processed/synthetic_heart_disease.csv"
)

print("Real Dataset Shape:", real_data.shape)
print("Synthetic Dataset Shape:", synthetic_data.shape)


# ============================================================
# 2. Convert target into binary classification
# ============================================================

# Original:
# 0 = No Disease
# 1, 2, 3, 4 = Disease

real_data["num"] = (
    real_data["num"] > 0
).astype(int)

synthetic_data["num"] = (
    synthetic_data["num"] > 0
).astype(int)


# ============================================================
# 3. Separate features and target
# ============================================================

X_real = real_data.drop(
    columns=["num"]
)

y_real = real_data["num"]


X_synthetic = synthetic_data.drop(
    columns=["num"]
)

y_synthetic = synthetic_data["num"]


# ============================================================
# 4. Split REAL data into training and testing
# ============================================================

# IMPORTANT:
# The real test set will be used for evaluating
# ALL THREE models.

X_train_real, X_test_real, y_train_real, y_test_real = train_test_split(
    X_real,
    y_real,
    test_size=0.20,
    random_state=42,
    stratify=y_real
)


print("\nReal Training Set:", X_train_real.shape)
print("Real Test Set:", X_test_real.shape)


# ============================================================
# 5. Define evaluation function
# ============================================================

def evaluate_model(
    model,
    X_test,
    y_test,
    model_name
):

    # Make predictions
    y_pred = model.predict(X_test)

    # Get prediction probabilities
    y_probability = model.predict_proba(
        X_test
    )[:, 1]

    # Calculate metrics
    accuracy = accuracy_score(
        y_test,
        y_pred
    )

    precision = precision_score(
        y_test,
        y_pred,
        zero_division=0
    )

    recall = recall_score(
        y_test,
        y_pred,
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        y_pred,
        zero_division=0
    )

    roc_auc = roc_auc_score(
        y_test,
        y_probability
    )

    # Print results
    print("\n========================================")
    print(model_name)
    print("========================================")

    print(
        f"Accuracy:  {accuracy:.4f}"
    )

    print(
        f"Precision: {precision:.4f}"
    )

    print(
        f"Recall:    {recall:.4f}"
    )

    print(
        f"F1-Score:  {f1:.4f}"
    )

    print(
        f"ROC-AUC:   {roc_auc:.4f}"
    )

    print("\nClassification Report:")

    print(
        classification_report(
            y_test,
            y_pred,
            zero_division=0
        )
    )

    return {
        "Model": model_name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1-Score": f1,
        "ROC-AUC": roc_auc
    }


# ============================================================
# 6. MODEL 1: REAL TRAINING DATA
# ============================================================

print("\nTraining Model 1: Real Data...")

model_real = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_real.fit(
    X_train_real,
    y_train_real
)


results_real = evaluate_model(
    model_real,
    X_test_real,
    y_test_real,
    "Real Data Model"
)


# ============================================================
# 7. MODEL 2: SYNTHETIC DATA
# ============================================================

print("\nTraining Model 2: Synthetic Data...")

model_synthetic = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_synthetic.fit(
    X_synthetic,
    y_synthetic
)


results_synthetic = evaluate_model(
    model_synthetic,
    X_test_real,
    y_test_real,
    "Synthetic Data Model"
)


# ============================================================
# 8. MODEL 3: REAL + SYNTHETIC DATA
# ============================================================

print("\nPreparing Combined Training Data...")

# Combine ONLY real training data
# with synthetic data.
#
# IMPORTANT:
# The real test data is NOT included.

combined_train = pd.concat(
    [
        pd.concat(
            [
                X_train_real,
                y_train_real
            ],
            axis=1
        ),
        synthetic_data
    ],
    ignore_index=True
)


# Separate combined features and target

X_combined_train = combined_train.drop(
    columns=["num"]
)

y_combined_train = combined_train["num"]


print(
    "Combined Training Data:",
    X_combined_train.shape
)


# Train combined model

print("\nTraining Model 3: Real + Synthetic Data...")

model_combined = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_combined.fit(
    X_combined_train,
    y_combined_train
)


results_combined = evaluate_model(
    model_combined,
    X_test_real,
    y_test_real,
    "Real + Synthetic Data Model"
)


# ============================================================
# 9. Create final comparison table
# ============================================================

results = pd.DataFrame(
    [
        results_real,
        results_synthetic,
        results_combined
    ]
)


print("\n========================================")
print("FINAL FAIR MODEL COMPARISON")
print("========================================")

print(
    results.to_string(
        index=False
    )
)


# ============================================================
# 10. Save results
# ============================================================

os.makedirs(
    "results",
    exist_ok=True
)

output_path = (
    "results/"
    "improved_model_comparison.csv"
)

results.to_csv(
    output_path,
    index=False
)

print(
    "\nResults saved to:",
    output_path
)