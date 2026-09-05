"""
CTGAN Synthetic Data Generation Pipeline — Large CVD Dataset

Trains CTGAN on:
    data/processed/large_train.csv  (training set ONLY)

Produces:
    data/processed/large_synthetic_ctgan.csv
    results/ctgan_training_config.json

NEVER uses:
    data/processed/large_test.csv

Reuses patterns from:
    src/generate_synthetic_data.py
    src/tune_ctgan.py
"""

import pandas as pd
import numpy as np
import json
import os
import time
import warnings
warnings.filterwarnings("ignore")

from ctgan import CTGAN


# ============================================================
# CONFIGURATION
# ============================================================

TRAIN_PATH = "data/processed/large_train.csv"
OUTPUT_PATH = "data/processed/large_synthetic_ctgan.csv"
CONFIG_PATH = "results/ctgan_training_config.json"

TARGET = "cardio"

RANDOM_SEED = 42

# Feature type definitions (from preprocessing and quality assessment)
NUMERICAL_FEATURES = ["age", "height", "weight", "ap_hi", "ap_lo"]
CATEGORICAL_FEATURES = ["gender", "cholesterol", "gluc", "smoke", "alco", "active"]

# CTGAN Hyperparameters
# Scaled for the large dataset (54,889 records vs 303 in original)
# - epochs: 150 (lower than original 300/1000 because dataset is ~180x larger;
#   each epoch sees far more data, so fewer epochs needed)
# - batch_size: 500 (scaled up from 60 to match dataset size;
#   CTGAN requires batch_size to be divisible by pac)
# - pac: 10 (Packing parameter, same as existing scripts)
# - generator_dim/discriminator_dim: (256, 256) (same as tune_ctgan.py;
#   capacity suitable for 11 features)
# - generator_lr/discriminator_lr: 2e-4 (same as tune_ctgan.py;
#   Adam default for GANs per Goodfellow et al.)

CTGAN_PARAMS = {
    "epochs": 150,
    "batch_size": 500,
    "pac": 10,
    "generator_dim": (256, 256),
    "discriminator_dim": (256, 256),
    "generator_lr": 2e-4,
    "discriminator_lr": 2e-4,
    "verbose": True,
}

# Generate 200% of training data to support augmentation ratios up to 200%
SYNTHETIC_RATIO = 2.0


# ============================================================
# STEP 1: LOAD TRAINING DATA
# ============================================================

print("=" * 70)
print("CTGAN SYNTHETIC DATA GENERATION PIPELINE")
print("Large Cardiovascular Disease Dataset")
print("=" * 70)

print("\n[Step 1] Loading training data...")

df_train = pd.read_csv(TRAIN_PATH)

print("  Source:", TRAIN_PATH)
print("  Shape:", df_train.shape)
print("  Columns:", df_train.columns.tolist())


# ============================================================
# STEP 2: DETECT AND VALIDATE FEATURE TYPES
# ============================================================

print("\n[Step 2] Detecting feature types...")

# Auto-detect categorical columns: features with <= 5 unique values
detected_categorical = []
detected_numerical = []

for col in df_train.columns:
    if col == TARGET:
        continue
    n_unique = df_train[col].nunique()
    if n_unique <= 5:
        detected_categorical.append(col)
    else:
        detected_numerical.append(col)

# Validate against expected columns
assert set(detected_categorical) == set(CATEGORICAL_FEATURES), \
    "Categorical mismatch: detected {} vs expected {}".format(
        detected_categorical, CATEGORICAL_FEATURES)

assert set(detected_numerical) == set(NUMERICAL_FEATURES), \
    "Numerical mismatch: detected {} vs expected {}".format(
        detected_numerical, NUMERICAL_FEATURES)

# Target is also discrete (binary: 0/1)
discrete_columns = CATEGORICAL_FEATURES + [TARGET]

print("  Numerical features ({}):" .format(len(NUMERICAL_FEATURES)))
for feat in NUMERICAL_FEATURES:
    print("    - {} (unique: {})".format(feat, df_train[feat].nunique()))

print("  Categorical features ({}):" .format(len(CATEGORICAL_FEATURES)))
for feat in CATEGORICAL_FEATURES:
    print("    - {} (values: {})".format(feat, sorted(df_train[feat].unique())))

print("  Target: {} (values: {})".format(
    TARGET, sorted(df_train[TARGET].unique())))

print("  Discrete columns for CTGAN:", discrete_columns)


# ============================================================
# STEP 3: PRE-TRAINING SUMMARY
# ============================================================

print("\n[Step 3] Pre-training summary...")

n_train = len(df_train)
n_synthetic = int(n_train * SYNTHETIC_RATIO)

print("  Training records: {:,}".format(n_train))
print("  Synthetic to generate: {:,} ({:.0f}% of training)".format(
    n_synthetic, SYNTHETIC_RATIO * 100))

print("\n  Target distribution (training):")
target_counts = df_train[TARGET].value_counts().sort_index()
for val in target_counts.index:
    pct = target_counts[val] / n_train * 100
    print("    Class {}: {:,} ({:.2f}%)".format(val, target_counts[val], pct))

print("\n  CTGAN Hyperparameters:")
for key, val in CTGAN_PARAMS.items():
    if key != "verbose":
        print("    {}: {}".format(key, val))


# ============================================================
# STEP 4: TRAIN CTGAN
# ============================================================

print("\n" + "=" * 70)
print("[Step 4] Training CTGAN...")
print("=" * 70)

# Set random seeds for reproducibility
np.random.seed(RANDOM_SEED)
import torch
torch.manual_seed(RANDOM_SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(RANDOM_SEED)

start_time = time.time()

ctgan = CTGAN(
    epochs=CTGAN_PARAMS["epochs"],
    batch_size=CTGAN_PARAMS["batch_size"],
    pac=CTGAN_PARAMS["pac"],
    generator_dim=CTGAN_PARAMS["generator_dim"],
    discriminator_dim=CTGAN_PARAMS["discriminator_dim"],
    generator_lr=CTGAN_PARAMS["generator_lr"],
    discriminator_lr=CTGAN_PARAMS["discriminator_lr"],
    verbose=CTGAN_PARAMS["verbose"],
)

ctgan.fit(
    df_train,
    discrete_columns=discrete_columns,
)

training_time = time.time() - start_time

print("\n  CTGAN training completed!")
print("  Training time: {:.1f} seconds ({:.1f} minutes)".format(
    training_time, training_time / 60))


# ============================================================
# STEP 5: GENERATE SYNTHETIC DATA
# ============================================================

print("\n[Step 5] Generating synthetic data...")

synthetic_data = ctgan.sample(n_synthetic)

print("  Synthetic shape:", synthetic_data.shape)
print("  Columns:", synthetic_data.columns.tolist())


# ============================================================
# STEP 6: POST-PROCESS SYNTHETIC DATA
# ============================================================

print("\n[Step 6] Post-processing synthetic data...")

# Ensure target is binary integer
synthetic_data[TARGET] = synthetic_data[TARGET].round().astype(int)
synthetic_data[TARGET] = synthetic_data[TARGET].clip(0, 1)

# Ensure categorical features are integer
for feat in CATEGORICAL_FEATURES:
    valid_values = sorted(df_train[feat].unique())
    synthetic_data[feat] = synthetic_data[feat].round().astype(int)
    synthetic_data[feat] = synthetic_data[feat].clip(
        min(valid_values), max(valid_values)
    )

# Clip numerical features to training ranges (clinical validity)
for feat in NUMERICAL_FEATURES:
    real_min = df_train[feat].min()
    real_max = df_train[feat].max()
    n_clipped = (
        (synthetic_data[feat] < real_min) |
        (synthetic_data[feat] > real_max)
    ).sum()
    if n_clipped > 0:
        print("  Clipped {} out-of-range values in {}".format(n_clipped, feat))
    synthetic_data[feat] = synthetic_data[feat].clip(real_min, real_max)

# Round age to 1 decimal (same as preprocessing)
synthetic_data["age"] = synthetic_data["age"].round(1)

# Round height and weight to integers (clinical standard)
synthetic_data["height"] = synthetic_data["height"].round(0).astype(int)
synthetic_data["weight"] = synthetic_data["weight"].round(0).astype(int)

# Round blood pressure to integers (clinical standard)
synthetic_data["ap_hi"] = synthetic_data["ap_hi"].round(0).astype(int)
synthetic_data["ap_lo"] = synthetic_data["ap_lo"].round(0).astype(int)

print("  Post-processing complete.")


# ============================================================
# STEP 7: SAVE SYNTHETIC DATA
# ============================================================

print("\n[Step 7] Saving synthetic data...")

os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
synthetic_data.to_csv(OUTPUT_PATH, index=False)

file_size_mb = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)
print("  Saved:", OUTPUT_PATH)
print("  File size: {:.2f} MB".format(file_size_mb))


# ============================================================
# STEP 8: SAVE TRAINING CONFIGURATION
# ============================================================

print("\n[Step 8] Saving training configuration...")

config = {
    "model": "CTGAN",
    "library": "ctgan",
    "library_version": "0.12.1",
    "training_data": TRAIN_PATH,
    "output_data": OUTPUT_PATH,
    "hyperparameters": {
        "epochs": CTGAN_PARAMS["epochs"],
        "batch_size": CTGAN_PARAMS["batch_size"],
        "pac": CTGAN_PARAMS["pac"],
        "generator_dim": list(CTGAN_PARAMS["generator_dim"]),
        "discriminator_dim": list(CTGAN_PARAMS["discriminator_dim"]),
        "generator_lr": CTGAN_PARAMS["generator_lr"],
        "discriminator_lr": CTGAN_PARAMS["discriminator_lr"],
    },
    "random_seed": RANDOM_SEED,
    "training_sample_count": n_train,
    "synthetic_sample_count": n_synthetic,
    "synthetic_ratio": SYNTHETIC_RATIO,
    "max_augmentation_ratio_supported": "200%",
    "training_time_seconds": round(training_time, 1),
    "discrete_columns": discrete_columns,
    "numerical_features": NUMERICAL_FEATURES,
    "categorical_features": CATEGORICAL_FEATURES,
    "target_column": TARGET,
    "test_set_used": False,
    "notes": [
        "CTGAN trained ONLY on large_train.csv (training split).",
        "large_test.csv was NEVER loaded or used.",
        "Synthetic ratio of 2.0 supports augmentation up to 200%.",
        "Hyperparameters adapted from src/tune_ctgan.py for large dataset.",
    ],
}

os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
with open(CONFIG_PATH, "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2)

print("  Saved:", CONFIG_PATH)


# ============================================================
# STEP 9: COMPARE REAL VS SYNTHETIC
# ============================================================

print("\n" + "=" * 70)
print("[Step 9] REAL vs SYNTHETIC COMPARISON")
print("=" * 70)

# 9a. Shape
print("\n--- Shape ---")
print("  Real training: {}".format(df_train.shape))
print("  Synthetic:     {}".format(synthetic_data.shape))

# 9b. Missing values
print("\n--- Missing Values ---")
real_missing = df_train.isnull().sum().sum()
synth_missing = synthetic_data.isnull().sum().sum()
print("  Real:      {}".format(real_missing))
print("  Synthetic: {}".format(synth_missing))

# 9c. Target distribution
print("\n--- Target Distribution ---")
real_target = df_train[TARGET].value_counts(normalize=True).sort_index() * 100
synth_target = synthetic_data[TARGET].value_counts(normalize=True).sort_index() * 100

print("  {:>10s}  {:>12s}  {:>12s}  {:>10s}".format(
    "Class", "Real (%)", "Synthetic (%)", "Diff (pp)"))
for cls in sorted(real_target.index):
    r = real_target[cls]
    s = synth_target.get(cls, 0)
    print("  {:>10d}  {:>12.2f}  {:>12.2f}  {:>+10.2f}".format(
        cls, r, s, s - r))

# 9d. Feature ranges
print("\n--- Feature Ranges ---")
print("  {:>12s}  {:>10s} {:>10s}  {:>10s} {:>10s}  {:>8s}".format(
    "Feature", "Real Min", "Real Max", "Synth Min", "Synth Max", "OK?"))

for feat in NUMERICAL_FEATURES:
    r_min, r_max = df_train[feat].min(), df_train[feat].max()
    s_min, s_max = synthetic_data[feat].min(), synthetic_data[feat].max()
    in_range = "Yes" if (s_min >= r_min and s_max <= r_max) else "WARN"
    print("  {:>12s}  {:>10.1f} {:>10.1f}  {:>10.1f} {:>10.1f}  {:>8s}".format(
        feat, r_min, r_max, s_min, s_max, in_range))

for feat in CATEGORICAL_FEATURES:
    r_vals = sorted(df_train[feat].unique())
    s_vals = sorted(synthetic_data[feat].unique())
    ok = "Yes" if set(s_vals).issubset(set(r_vals)) else "WARN"
    print("  {:>12s}  {:>10s} {:>10s}  {:>10s} {:>10s}  {:>8s}".format(
        feat, str(r_vals[0]), str(r_vals[-1]),
        str(s_vals[0]), str(s_vals[-1]), ok))

# 9e. Basic statistical properties (numerical)
print("\n--- Statistical Properties (Numerical Features) ---")
print("  {:>12s}  {:>10s} {:>10s} {:>10s}  {:>10s} {:>10s} {:>10s}".format(
    "Feature", "R.Mean", "R.Std", "R.Med",
    "S.Mean", "S.Std", "S.Med"))

for feat in NUMERICAL_FEATURES:
    r = df_train[feat]
    s = synthetic_data[feat]
    print("  {:>12s}  {:>10.2f} {:>10.2f} {:>10.1f}  {:>10.2f} {:>10.2f} {:>10.1f}".format(
        feat, r.mean(), r.std(), r.median(),
        s.mean(), s.std(), s.median()))

# 9f. Categorical distribution comparison
print("\n--- Categorical Feature Distributions ---")
for feat in CATEGORICAL_FEATURES:
    real_dist = df_train[feat].value_counts(normalize=True).sort_index() * 100
    synth_dist = synthetic_data[feat].value_counts(normalize=True).sort_index() * 100

    print("\n  {}:".format(feat))
    print("    {:>6s}  {:>10s}  {:>10s}  {:>10s}".format(
        "Value", "Real (%)", "Synth (%)", "Diff (pp)"))
    for val in sorted(real_dist.index):
        r = real_dist[val]
        s = synth_dist.get(val, 0)
        print("    {:>6d}  {:>10.2f}  {:>10.2f}  {:>+10.2f}".format(
            val, r, s, s - r))

# 9g. Correlation comparison
print("\n--- Key Correlation Comparison ---")
real_corr = df_train.corr()
synth_corr = synthetic_data.corr()

important_pairs = [
    ("ap_hi", "cardio"),
    ("ap_lo", "cardio"),
    ("age", "cardio"),
    ("cholesterol", "cardio"),
    ("weight", "cardio"),
    ("ap_hi", "ap_lo"),
    ("cholesterol", "gluc"),
]

print("  {:>25s}  {:>10s}  {:>10s}  {:>10s}".format(
    "Pair", "Real r", "Synth r", "Diff"))
for f1, f2 in important_pairs:
    r = real_corr.loc[f1, f2]
    s = synth_corr.loc[f1, f2]
    print("  {:>12s} <-> {:<10s}  {:>10.4f}  {:>10.4f}  {:>+10.4f}".format(
        f1, f2, r, s, s - r))


# ============================================================
# FINAL SUMMARY
# ============================================================

print("\n" + "=" * 70)
print("PIPELINE COMPLETE")
print("=" * 70)

print("\n  Training data:   {} ({:,} records)".format(TRAIN_PATH, n_train))
print("  Synthetic data:  {} ({:,} records)".format(OUTPUT_PATH, n_synthetic))
print("  Config:          {}".format(CONFIG_PATH))
print("  Training time:   {:.1f} seconds ({:.1f} min)".format(
    training_time, training_time / 60))

print("\n  DATA LEAKAGE CHECK:")
print("    large_test.csv was NEVER loaded or used.  ✓")
print("    CTGAN trained only on large_train.csv.     ✓")
print("    Synthetic data generated from CTGAN only.  ✓")

print("\n" + "=" * 70)
