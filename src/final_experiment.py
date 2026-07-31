import pandas as pd
import os

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

real_train = pd.read_csv(
    "data/processed/real_train.csv"
)

real_test = pd.read_csv(
    "data/processed/real_test.csv"
)

synthetic_data = pd.read_csv(
    "data/processed/synthetic_tuned.csv"
)


print("Real Training Shape:", real_train.shape)
print("Real Test Shape:", real_test.shape)
print("Tuned Synthetic Shape:", synthetic_data.shape)


# ============================================================
# 2. Separate features and target
# ============================================================

X_train_real = real_train.drop(
    columns=["num"]
)

y_train_real = real_train["num"]


X_test_real = real_test.drop(
    columns=["num"]
)

y_test_real = real_test["num"]


X_synthetic = synthetic_data.drop(
    columns=["num"]
)

y_synthetic = synthetic_data["num"]


# ============================================================
# 3. Evaluation Function
# ============================================================

def evaluate_model(
    model,
    model_name
):

    # Predict on SAME real test set
    y_pred = model.predict(
        X_test_real
    )

    y_probability = model.predict_proba(
        X_test_real
    )[:, 1]


    # Metrics

    accuracy = accuracy_score(
        y_test_real,
        y_pred
    )

    precision = precision_score(
        y_test_real,
        y_pred,
        zero_division=0
    )

    recall = recall_score(
        y_test_real,
        y_pred,
        zero_division=0
    )

    f1 = f1_score(
        y_test_real,
        y_pred,
        zero_division=0
    )

    roc_auc = roc_auc_score(
        y_test_real,
        y_probability
    )


    # Print results

    print("\n========================================")

    print(
        model_name
    )

    print(
        "========================================"
    )

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


    print(
        "\nClassification Report:"
    )

    print(
        classification_report(
            y_test_real,
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
# 4. MODEL 1
# Real Training Data
# ============================================================

print(
    "\nTraining Model 1: Real Training Data..."
)

model_real = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_real.fit(
    X_train_real,
    y_train_real
)


result_real = evaluate_model(
    model_real,
    "Real Training Data"
)


# ============================================================
# 5. MODEL 2
# Tuned Synthetic Data
# ============================================================

print(
    "\nTraining Model 2: Tuned Synthetic Data..."
)

model_synthetic = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_synthetic.fit(
    X_synthetic,
    y_synthetic
)


result_synthetic = evaluate_model(
    model_synthetic,
    "Tuned Synthetic Data"
)


# ============================================================
# 6. MODEL 3
# Real Training + Tuned Synthetic
# ============================================================

print(
    "\nPreparing Combined Training Data..."
)


combined_train = pd.concat(
    [
        real_train,
        synthetic_data
    ],
    ignore_index=True
)


X_combined = combined_train.drop(
    columns=["num"]
)

y_combined = combined_train["num"]


print(
    "Combined Training Shape:",
    X_combined.shape
)


print(
    "\nTraining Model 3: "
    "Real + Tuned Synthetic..."
)


model_combined = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model_combined.fit(
    X_combined,
    y_combined
)


result_combined = evaluate_model(
    model_combined,
    "Real + Tuned Synthetic Data"
)


# ============================================================
# 7. Final Comparison
# ============================================================

results = pd.DataFrame(
    [
        result_real,
        result_synthetic,
        result_combined
    ]
)


print(
    "\n========================================"
)

print(
    "FINAL FAIR COMPARISON"
)

print(
    "========================================"
)

print(
    results.to_string(
        index=False
    )
)


# ============================================================
# 8. Save Results
# ============================================================

os.makedirs(
    "results",
    exist_ok=True
)


results.to_csv(
    "results/final_model_comparison.csv",
    index=False
)


print(
    "\nFinal results saved to:"
)

print(
    "results/final_model_comparison.csv"
)