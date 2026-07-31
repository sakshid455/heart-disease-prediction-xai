import pandas as pd
import numpy as np

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

# ==========================================
# 1. Load datasets
# ==========================================

real_data = pd.read_csv(
    "data/processed/heart_disease_clean.csv"
)

synthetic_data = pd.read_csv(
    "data/processed/synthetic_heart_disease.csv"
)

print("Real Data Shape:", real_data.shape)
print("Synthetic Data Shape:", synthetic_data.shape)


# ==========================================
# 2. Convert target into binary
# ==========================================

# 0 = No Heart Disease
# 1,2,3,4 = Heart Disease

real_data["num"] = (
    real_data["num"] > 0
).astype(int)

synthetic_data["num"] = (
    synthetic_data["num"] > 0
).astype(int)


# ==========================================
# 3. Separate features and target
# ==========================================

X_real = real_data.drop(
    columns=["num"]
)

y_real = real_data["num"]


X_synthetic = synthetic_data.drop(
    columns=["num"]
)

y_synthetic = synthetic_data["num"]


# ==========================================
# 4. Create combined dataset
# ==========================================

combined_data = pd.concat(
    [
        real_data,
        synthetic_data
    ],
    ignore_index=True
)

X_combined = combined_data.drop(
    columns=["num"]
)

y_combined = combined_data["num"]


# ==========================================
# 5. Function to train and evaluate model
# ==========================================

def train_and_evaluate(
    X,
    y,
    dataset_name
):

    print("\n================================")
    print(dataset_name)
    print("================================")

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # Create Random Forest
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )

    # Train model
    model.fit(
        X_train,
        y_train
    )

    # Predictions
    y_pred = model.predict(
        X_test
    )

    # Prediction probabilities
    y_probability = model.predict_proba(
        X_test
    )[:, 1]

    # Evaluation metrics
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
    print("\nAccuracy:", accuracy)
    print("Precision:", precision)
    print("Recall:", recall)
    print("F1-Score:", f1)
    print("ROC-AUC:", roc_auc)

    print("\nClassification Report:")
    print(
        classification_report(
            y_test,
            y_pred,
            zero_division=0
        )
    )

    return {
        "Dataset": dataset_name,
        "Accuracy": accuracy,
        "Precision": precision,
        "Recall": recall,
        "F1-Score": f1,
        "ROC-AUC": roc_auc
    }


# ==========================================
# 6. Train Model 1: Real Data
# ==========================================

real_results = train_and_evaluate(
    X_real,
    y_real,
    "Real Data"
)


# ==========================================
# 7. Train Model 2: Synthetic Data
# ==========================================

synthetic_results = train_and_evaluate(
    X_synthetic,
    y_synthetic,
    "Synthetic Data"
)


# ==========================================
# 8. Train Model 3: Combined Data
# ==========================================

combined_results = train_and_evaluate(
    X_combined,
    y_combined,
    "Real + Synthetic Data"
)


# ==========================================
# 9. Create comparison table
# ==========================================

results = pd.DataFrame(
    [
        real_results,
        synthetic_results,
        combined_results
    ]
)

print("\n================================")
print("FINAL MODEL COMPARISON")
print("================================")

print(results)


# ==========================================
# 10. Save results
# ==========================================

results.to_csv(
    "results/model_comparison.csv",
    index=False
)

print(
    "\nResults saved to:"
    " results/model_comparison.csv"
)