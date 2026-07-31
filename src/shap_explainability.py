import pandas as pd
import numpy as np
import os
import shap
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier


# ============================================================
# 1. Load Real Training and Test Data
# ============================================================

real_train = pd.read_csv(
    "data/processed/real_train.csv"
)

real_test = pd.read_csv(
    "data/processed/real_test.csv"
)


print("Real Training Shape:", real_train.shape)
print("Real Test Shape:", real_test.shape)


# ============================================================
# 2. Separate Features and Target
# ============================================================

X_train = real_train.drop(
    columns=["num"]
)

y_train = real_train["num"]


X_test = real_test.drop(
    columns=["num"]
)

y_test = real_test["num"]


print("\nFeatures:")
print(X_train.columns.tolist())


# ============================================================
# 3. Train Random Forest Model
# ============================================================

print(
    "\nTraining Random Forest Model..."
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(
    X_train,
    y_train
)


print(
    "Random Forest training completed!"
)


# ============================================================
# 4. Create SHAP Explainer
# ============================================================

print(
    "\nCreating SHAP Explainer..."
)

explainer = shap.TreeExplainer(
    model
)


# Calculate SHAP values
shap_values = explainer.shap_values(
    X_test
)


print(
    "SHAP values calculated successfully!"
)


# ============================================================
# 5. Create Results Folder
# ============================================================

os.makedirs(
    "results/shap",
    exist_ok=True
)


# ============================================================
# 6. SHAP Summary Bar Plot
# ============================================================

print(
    "\nGenerating SHAP Feature Importance Plot..."
)

plt.figure()

shap.summary_plot(
    shap_values[:, :, 1],
    X_test,
    plot_type="bar",
    show=False
)

plt.title(
    "SHAP Feature Importance"
)

plt.tight_layout()

plt.savefig(
    "results/shap/shap_feature_importance.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# 7. SHAP Summary Plot
# ============================================================

print(
    "Generating SHAP Summary Plot..."
)

plt.figure()

shap.summary_plot(
    shap_values[:, :, 1],
    X_test,
    show=False
)

plt.title(
    "SHAP Summary Plot"
)

plt.tight_layout()

plt.savefig(
    "results/shap/shap_summary_plot.png",
    dpi=300,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# 8. SHAP Dependence Plots
# ============================================================

features_to_plot = [
    "age",
    "thalach",
    "oldpeak",
    "chol"
]


for feature in features_to_plot:

    print(
        f"Generating SHAP plot for {feature}..."
    )

    plt.figure()

    shap.dependence_plot(
        feature,
        shap_values[:, :, 1],
        X_test,
        show=False
    )

    plt.tight_layout()

    plt.savefig(
        f"results/shap/shap_{feature}.png",
        dpi=300,
        bbox_inches="tight"
    )

    plt.close()


# ============================================================
# 9. Explain One Patient
# ============================================================

patient_index = 0

patient = X_test.iloc[
    patient_index
]

patient_shap_values = shap_values[
    patient_index,
    :,
    1
]


patient_explanation = pd.DataFrame({
    "Feature": X_test.columns,
    "Feature Value": patient.values,
    "SHAP Value": patient_shap_values
})


patient_explanation[
    "Absolute SHAP"
] = patient_explanation[
    "SHAP Value"
].abs()


patient_explanation = patient_explanation.sort_values(
    by="Absolute SHAP",
    ascending=False
)


print(
    "\n========================================"
)

print(
    "INDIVIDUAL PATIENT SHAP EXPLANATION"
)

print(
    "========================================"
)

print(
    patient_explanation.to_string(
        index=False
    )
)


# ============================================================
# 10. Save Patient Explanation
# ============================================================

patient_explanation.to_csv(
    "results/shap/patient_explanation.csv",
    index=False
)


print(
    "\n========================================"
)

print(
    "SHAP ANALYSIS COMPLETED SUCCESSFULLY!"
)

print(
    "========================================"
)

print(
    "\nSHAP results saved in:"
)

print(
    "results/shap/"
)