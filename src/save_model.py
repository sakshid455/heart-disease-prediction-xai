import pandas as pd
import joblib
import os

from sklearn.ensemble import RandomForestClassifier


# Load training data
train_data = pd.read_csv(
    "data/processed/real_train.csv"
)

print("Training Data Shape:", train_data.shape)


# Separate features and target
X_train = train_data.drop(
    columns=["num"]
)

y_train = train_data["num"]


# Train final model
print("\nTraining final Random Forest model...")

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

print("Model training completed!")


# Create models folder if it does not exist
os.makedirs(
    "models",
    exist_ok=True
)


# Save model
model_path = "models/heart_disease_rf.pkl"

joblib.dump(
    model,
    model_path
)


print("\n================================")
print("MODEL SAVED SUCCESSFULLY!")
print("================================")
print(f"\nSaved at: {model_path}")
print("\nFeatures used:")
print(X_train.columns.tolist())