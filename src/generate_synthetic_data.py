import pandas as pd
import os
from ctgan import CTGAN

# ==========================================
# 1. Load cleaned dataset
# ==========================================

input_path = "data/processed/heart_disease_clean.csv"

df = pd.read_csv(input_path)

print("Original Dataset Shape:", df.shape)

print("\nOriginal Columns:")
print(df.columns.tolist())


# ==========================================
# 2. Define categorical columns
# ==========================================

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


# ==========================================
# 3. Train CTGAN
# ==========================================

print("\nTraining CTGAN...")
print("This may take some time...")

ctgan = CTGAN(
    epochs=300,
    batch_size=60,
    pac=10,
    verbose=True
)

ctgan.fit(
    df,
    discrete_columns=categorical_columns
)

print("\nCTGAN training completed successfully!")


# ==========================================
# 4. Generate synthetic data
# ==========================================

synthetic_data = ctgan.sample(1000)

print("\nSynthetic Dataset Shape:")
print(synthetic_data.shape)

print("\nFirst 5 Synthetic Records:")
print(synthetic_data.head())


# ==========================================
# 5. Save synthetic dataset
# ==========================================

os.makedirs("data/processed", exist_ok=True)

output_path = "data/processed/synthetic_heart_disease.csv"

synthetic_data.to_csv(
    output_path,
    index=False
)

print("\nSynthetic dataset saved successfully!")
print("Saved at:", output_path)