import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# ==========================================
# 1. Load Real and Synthetic Data
# ==========================================

real_path = "data/processed/heart_disease_clean.csv"
synthetic_path = "data/processed/synthetic_heart_disease.csv"

real_data = pd.read_csv(real_path)
synthetic_data = pd.read_csv(synthetic_path)

print("Real Dataset Shape:", real_data.shape)
print("Synthetic Dataset Shape:", synthetic_data.shape)


# ==========================================
# 2. Basic Information
# ==========================================

print("\nReal Dataset:")
print(real_data.head())

print("\nSynthetic Dataset:")
print(synthetic_data.head())


# ==========================================
# 3. Compare Statistical Summary
# ==========================================

print("\nReal Data Statistics:")
print(real_data.describe())

print("\nSynthetic Data Statistics:")
print(synthetic_data.describe())


# ==========================================
# 4. Compare Means
# ==========================================

numeric_columns = [
    "age",
    "trestbps",
    "chol",
    "thalach",
    "oldpeak"
]

comparison = pd.DataFrame({
    "Real Mean": real_data[numeric_columns].mean(),
    "Synthetic Mean": synthetic_data[numeric_columns].mean(),
    "Real Std": real_data[numeric_columns].std(),
    "Synthetic Std": synthetic_data[numeric_columns].std()
})

print("\nReal vs Synthetic Statistics:")
print(comparison)


# ==========================================
# 5. Save Comparison Results
# ==========================================

os.makedirs("results", exist_ok=True)

comparison.to_csv(
    "results/statistical_comparison.csv"
)

print("\nStatistical comparison saved!")


# ==========================================
# 6. Compare Feature Distributions
# ==========================================

for column in numeric_columns:

    plt.figure(figsize=(8, 5))

    plt.hist(
        real_data[column],
        bins=20,
        alpha=0.5,
        label="Real Data"
    )

    plt.hist(
        synthetic_data[column],
        bins=20,
        alpha=0.5,
        label="Synthetic Data"
    )

    plt.xlabel(column)
    plt.ylabel("Frequency")

    plt.title(
        f"Real vs Synthetic Distribution: {column}"
    )

    plt.legend()

    plt.tight_layout()

    plt.savefig(
        f"results/{column}_distribution.png"
    )

    plt.show()


# ==========================================
# 7. Correlation Comparison
# ==========================================

plt.figure(figsize=(10, 8))

sns.heatmap(
    real_data.corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title("Correlation Matrix - Real Data")

plt.tight_layout()

plt.savefig(
    "results/real_correlation_matrix.png"
)

plt.show()


plt.figure(figsize=(10, 8))

sns.heatmap(
    synthetic_data.corr(),
    annot=True,
    cmap="coolwarm"
)

plt.title("Correlation Matrix - Synthetic Data")

plt.tight_layout()

plt.savefig(
    "results/synthetic_correlation_matrix.png"
)

plt.show()

print("\nSynthetic data evaluation completed!")