import pandas as pd
import os

# Load the dataset
input_path = "data/raw/heart_disease.csv"

df = pd.read_csv(input_path)

print("Original Dataset Shape:", df.shape)

# Display missing values
print("\nMissing Values Before Preprocessing:")
print(df.isnull().sum())

# Fill missing values
# 'ca' and 'thal' are categorical/discrete variables
df["ca"] = df["ca"].fillna(df["ca"].mode()[0])
df["thal"] = df["thal"].fillna(df["thal"].mode()[0])

# Check missing values again
print("\nMissing Values After Preprocessing:")
print(df.isnull().sum())

# Create processed data folder
os.makedirs("data/processed", exist_ok=True)

# Save cleaned dataset
output_path = "data/processed/heart_disease_clean.csv"

df.to_csv(output_path, index=False)

print("\nPreprocessing completed successfully!")
print("Cleaned dataset saved at:", output_path)

# Display first 5 rows
print("\nFirst 5 Rows:")
print(df.head())