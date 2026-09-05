"""
Export the trained optimal model, scaler, and SHAP explainer for FastAPI backend.
Saves to models/optimal_model.joblib
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import shap

MODELS_DIR = "models"
REAL_TRAIN_PATH = "data/processed/large_train.csv"
SYNTHETIC_PATH = "data/processed/large_synthetic_ctgan.csv"
OPTIMAL_JSON = "results/optimal_configuration.json"
MODEL_OUTPUT_PATH = os.path.join(MODELS_DIR, "optimal_model.joblib")

RANDOM_SEED = 42
TARGET = "cardio"

def main():
    os.makedirs(MODELS_DIR, exist_ok=True)
    print("Loading datasets and configuration...")

    with open(OPTIMAL_JSON, "r") as f:
        opt_cfg = json.load(f)

    opt_ratio = opt_cfg["optimal_augmentation_ratio"]
    model_name = opt_cfg["best_model"]

    real_train = pd.read_csv(REAL_TRAIN_PATH)
    synthetic = pd.read_csv(SYNTHETIC_PATH)

    N_real = len(real_train)
    N_synth = int(N_real * opt_ratio / 100)
    synth_sample = synthetic.sample(n=N_synth, random_state=RANDOM_SEED)
    augmented_train = pd.concat([real_train, synth_sample], ignore_index=True)

    X_train = augmented_train.drop(columns=[TARGET])
    y_train = augmented_train[TARGET]
    feature_names = list(X_train.columns)

    print(f"Training {model_name} on {len(X_train):,} records ({N_real:,} real + {N_synth:,} synthetic)...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    clf = LogisticRegression(max_iter=1000, random_state=RANDOM_SEED, solver="lbfgs")
    clf.fit(X_train_scaled, y_train)

    print("Pre-computing SHAP LinearExplainer with background sample...")
    background_sample = X_train_scaled[:500]
    masker = shap.maskers.Independent(background_sample)
    explainer = shap.LinearExplainer(clf, masker)

    bundle = {
        "model_name": model_name,
        "augmentation_ratio": opt_ratio,
        "feature_names": feature_names,
        "scaler": scaler,
        "classifier": clf,
        "explainer": explainer,
        "optimal_config": opt_cfg,
        "feature_means": X_train.mean().to_dict(),
        "feature_stds": X_train.std().to_dict(),
    }

    joblib.dump(bundle, MODEL_OUTPUT_PATH)
    print(f"Saved model bundle to {MODEL_OUTPUT_PATH} ({os.path.getsize(MODEL_OUTPUT_PATH)/1024:.1f} KB)")

if __name__ == "__main__":
    main()
