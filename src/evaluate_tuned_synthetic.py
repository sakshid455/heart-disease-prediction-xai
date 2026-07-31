import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# ============================================================
# 1. Load Real Training and Tuned Synthetic Data
# ============================================================

real_train = pd.read_csv(
    "data/processed/real_train.csv"
)

synthetic_data = pd.read_csv(
    "data/processed/synthetic_tuned.csv"
)

print("Real Training Shape:", real_train.shape)
print("Synthetic Shape:", synthetic_data.shape)


# ============================================================
# 2. Display Target Distribution
# ============================================================

print("\nReal Training Target Distribution:")
print(
    real_train["num"].value_counts(normalize=True)
)

print("\nSynthetic Target Distribution:")
print(
    synthetic_data["num"].value_counts(normalize=True)
)


# ============================================================
# 3. Compare Numerical Features
# ============================================================

numeric_columns = [
    "age",
    "trestbps",
    "chol",
    "thalach",
    "oldpeak"
]

comparison = pd.DataFrame({
    "Real Mean": real_train[numeric_columns].mean(),
    "Synthetic Mean": synthetic_data[numeric_columns].mean(),

    "Real Std": real_train[numeric_columns].std(),
    "Synthetic Std": synthetic_data[numeric_columns].std(),

    "Mean Difference": (
        real_train[numeric_columns].mean()
        -
        synthetic_data[numeric_columns].mean()
    ).abs()
})

print("\n========================================")
print("STATISTICAL COMPARISON")
print("========================================")

print(
    comparison.to_string()
)


# ============================================================
# 4. Save Statistical Comparison
# ============================================================

os.makedirs(
    "results",
    exist_ok=True
)

comparison.to_csv(
    "results/tuned_statistical_comparison.csv"
)


# ============================================================
# 5. Plot Feature Distributions
# ============================================================

for column in numeric_columns:

    plt.figure(
        figsize=(8, 5)
    )

    plt.hist(
        real_train[column],
        bins=20,
        alpha=0.5,
        label="Real Training"
    )

    plt.hist(
        synthetic_data[column],
        bins=20,
        alpha=0.5,
        label="Synthetic"
    )

    plt.xlabel(column)

    plt.ylabel(
        "Frequency"
    )

    plt.title(
        f"Real vs Synthetic: {column}"
    )

    plt.legend()

    plt.tight_layout()

    plt.savefig(
        f"results/tuned_{column}_distribution.png"
    )

    plt.close()


# ============================================================
# 6. Real Correlation Matrix
# ============================================================

plt.figure(
    figsize=(10, 8)
)

sns.heatmap(
    real_train.corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title(
    "Correlation Matrix - Real Training Data"
)

plt.tight_layout()

plt.savefig(
    "results/tuned_real_correlation.png"
)

plt.close()


# ============================================================
# 7. Synthetic Correlation Matrix
# ============================================================

plt.figure(
    figsize=(10, 8)
)

sns.heatmap(
    synthetic_data.corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title(
    "Correlation Matrix - Tuned Synthetic Data"
)

plt.tight_layout()

plt.savefig(
    "results/tuned_synthetic_correlation.png"
)

plt.close()


print(
    "\n========================================"
)

print(
    "Tuned Synthetic Data Evaluation Completed!"
)

print(
    "========================================"
)

print(
    "\nResults saved in the results folder."
)