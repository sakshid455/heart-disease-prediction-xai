import pandas as pd
import os

from sklearn.model_selection import train_test_split
from ctgan import CTGAN


# ============================================================
# 1. Load cleaned real dataset
# ============================================================

data_path = "data/processed/heart_disease_clean.csv"

df = pd.read_csv(data_path)

print("Full Dataset Shape:", df.shape)


# ============================================================
# 2. Convert target into binary
# ============================================================

# 0 = No Heart Disease
# 1,2,3,4 = Heart Disease

df["num"] = (
    df["num"] > 0
).astype(int)


# ============================================================
# 3. Split REAL data
# ============================================================

# IMPORTANT:
# CTGAN will only see the training data.
# The test data remains completely unseen.

train_data, test_data = train_test_split(
    df,
    test_size=0.20,
    random_state=42,
    stratify=df["num"]
)


print("\nReal Training Data Shape:")
print(train_data.shape)

print("\nReal Test Data Shape:")
print(test_data.shape)


# ============================================================
# 4. Define categorical columns
# ============================================================

categorical_columns = [
    "sex",
    "cp",
    "fbs",
    "restecg",
    "exang",
    "slope",
    "ca",
    "thal",
    "num"
]


# ============================================================
# 5. Train CTGAN
# ============================================================

print("\n========================================")
print("Training Tuned CTGAN")
print("========================================")

ctgan = CTGAN(
    epochs=1000,
    batch_size=60,
    pac=10,
    generator_dim=(256, 256),
    discriminator_dim=(256, 256),
    generator_lr=2e-4,
    discriminator_lr=2e-4,
    verbose=True
)


ctgan.fit(
    train_data,
    discrete_columns=categorical_columns
)


print("\nCTGAN training completed!")


# ============================================================
# 6. Generate synthetic data
# ============================================================

synthetic_data = ctgan.sample(
    len(train_data) * 4
)


print("\nSynthetic Dataset Shape:")
print(synthetic_data.shape)


# ============================================================
# 7. Check target distribution
# ============================================================

print("\nReal Training Target Distribution:")
print(
    train_data["num"]
    .value_counts(normalize=True)
)


print("\nSynthetic Target Distribution:")
print(
    synthetic_data["num"]
    .value_counts(normalize=True)
)


# ============================================================
# 8. Save datasets
# ============================================================

os.makedirs(
    "data/processed",
    exist_ok=True
)


train_data.to_csv(
    "data/processed/real_train.csv",
    index=False
)


test_data.to_csv(
    "data/processed/real_test.csv",
    index=False
)


synthetic_data.to_csv(
    "data/processed/synthetic_tuned.csv",
    index=False
)


print("\n========================================")
print("Files Saved Successfully")
print("========================================")

print(
    "Real Training Data:"
    " data/processed/real_train.csv"
)

print(
    "Real Test Data:"
    " data/processed/real_test.csv"
)

print(
    "Tuned Synthetic Data:"
    " data/processed/synthetic_tuned.csv"
)