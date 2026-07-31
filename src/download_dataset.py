from ucimlrepo import fetch_ucirepo
import pandas as pd
import os

print("Downloading UCI Heart Disease Dataset...")

# Fetch the UCI Heart Disease dataset
heart_disease = fetch_ucirepo(id=45)

# Get features
X = heart_disease.data.features

# Get target
y = heart_disease.data.targets

# Combine features and target
df = pd.concat([X, y], axis=1)

# Create data/raw folder if it does not exist
os.makedirs("data/raw", exist_ok=True)

# Save dataset
file_path = "data/raw/heart_disease.csv"
df.to_csv(file_path, index=False)

print("\nDataset downloaded successfully!")
print("Saved at:", file_path)

print("\nDataset Shape:")
print(df.shape)

print("\nColumn Names:")
print(df.columns.tolist())

print("\nFirst 5 Rows:")
print(df.head())

print("\nMissing Values:")
print(df.isnull().sum())