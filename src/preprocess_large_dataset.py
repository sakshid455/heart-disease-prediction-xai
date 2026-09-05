"""
Preprocessing Pipeline for the Cardiovascular Disease Dataset (70,000 records)

This script processes the raw cardio_train.csv from:
    data/raw/large_dataset/cardio_train.csv

and produces:
    data/processed/large_clean.csv
    data/processed/large_train.csv
    data/processed/large_test.csv

IMPORTANT:
    - The raw dataset is NEVER modified.
    - The test set is held out and must NEVER be used for
      CTGAN training, synthetic data generation, model training,
      feature selection, or augmentation-ratio selection.
"""

import pandas as pd
import numpy as np
import os


# ============================================================
# CONFIGURATION
# ============================================================

RAW_PATH = "data/raw/large_dataset/cardio_train.csv"
RAW_DELIMITER = ";"

OUTPUT_DIR = "data/processed"

CLEAN_PATH = os.path.join(OUTPUT_DIR, "large_clean.csv")
TRAIN_PATH = os.path.join(OUTPUT_DIR, "large_train.csv")
TEST_PATH = os.path.join(OUTPUT_DIR, "large_test.csv")

TARGET_COLUMN = "cardio"

TEST_SIZE = 0.20
RANDOM_STATE = 42

# Columns to drop (non-feature identifiers)
DROP_COLUMNS = ["id"]

# Clinically valid ranges for outlier filtering
# Based on medical literature for adult patients (ages ~30-65)
VALID_RANGES = {
    "ap_hi":  (60, 250),     # Systolic BP: 60-250 mmHg
    "ap_lo":  (40, 160),     # Diastolic BP: 40-160 mmHg
    "height": (100, 220),    # Height: 100-220 cm
    "weight": (30, 200),     # Weight: 30-200 kg
}


# ============================================================
# STEP 1: LOAD RAW DATA
# ============================================================

print("=" * 70)
print("PREPROCESSING PIPELINE — CARDIOVASCULAR DISEASE DATASET")
print("=" * 70)

print("\n[Step 1] Loading raw dataset...")

raw_df = pd.read_csv(
    RAW_PATH,
    sep=RAW_DELIMITER
)

print("  Source:", RAW_PATH)
print("  Original shape:", raw_df.shape)
print("  Columns:", raw_df.columns.tolist())


# ============================================================
# STEP 2: DETECT FEATURE TYPES
# ============================================================

print("\n[Step 2] Detecting feature types...")

# Identify all columns excluding ID and target
feature_columns = [
    col for col in raw_df.columns
    if col not in DROP_COLUMNS + [TARGET_COLUMN]
]

# Classify features
numerical_features = []
categorical_features = []

for col in feature_columns:
    n_unique = raw_df[col].nunique()
    if n_unique <= 5:
        categorical_features.append(col)
    else:
        numerical_features.append(col)

print("  Numerical features ({}):"
      .format(len(numerical_features)))

for feat in numerical_features:
    print("    - {} (dtype: {}, unique: {})"
          .format(feat, raw_df[feat].dtype, raw_df[feat].nunique()))

print("  Categorical features ({}):"
      .format(len(categorical_features)))

for feat in categorical_features:
    vals = sorted(raw_df[feat].unique())
    print("    - {} (dtype: {}, values: {})"
          .format(feat, raw_df[feat].dtype, vals))

print("  Target: {} (values: {})"
      .format(TARGET_COLUMN, sorted(raw_df[TARGET_COLUMN].unique())))


# ============================================================
# STEP 3: DROP NON-FEATURE COLUMNS
# ============================================================

print("\n[Step 3] Dropping non-feature columns...")

df = raw_df.drop(columns=DROP_COLUMNS)

print("  Dropped:", DROP_COLUMNS)
print("  Shape after drop:", df.shape)


# ============================================================
# STEP 4: CHECK AND HANDLE MISSING VALUES
# ============================================================

print("\n[Step 4] Checking missing values...")

missing_before = df.isnull().sum()
total_missing = missing_before.sum()

print("  Missing values per column:")
for col in df.columns:
    m = missing_before[col]
    if m > 0:
        print("    - {}: {}".format(col, m))

if total_missing == 0:
    print("    None — dataset has zero missing values.")
else:
    print("  Total missing: {}".format(total_missing))

    # Fill numerical with median, categorical with mode
    for col in numerical_features:
        if df[col].isnull().sum() > 0:
            median_val = df[col].median()
            df[col] = df[col].fillna(median_val)
            print("    Filled {} with median: {}"
                  .format(col, median_val))

    for col in categorical_features:
        if df[col].isnull().sum() > 0:
            mode_val = df[col].mode()[0]
            df[col] = df[col].fillna(mode_val)
            print("    Filled {} with mode: {}"
                  .format(col, mode_val))

    missing_after = df.isnull().sum().sum()
    print("  Missing values after handling:", missing_after)


# ============================================================
# STEP 5: HANDLE DUPLICATE RECORDS
# ============================================================

print("\n[Step 5] Checking for duplicate records...")

n_duplicates = df.duplicated().sum()

print("  Duplicate rows found:", n_duplicates)

if n_duplicates > 0:
    df = df.drop_duplicates()
    print("  Shape after removing duplicates:", df.shape)
else:
    print("  No duplicates to remove.")


# ============================================================
# STEP 6: CONVERT AGE FROM DAYS TO YEARS
# ============================================================

print("\n[Step 6] Converting age from days to years...")

print("  Age before (in days):")
print("    min: {}, max: {}, mean: {:.1f}"
      .format(df["age"].min(), df["age"].max(), df["age"].mean()))

df["age"] = (df["age"] / 365.25).round(1)

print("  Age after (in years):")
print("    min: {}, max: {}, mean: {:.1f}"
      .format(df["age"].min(), df["age"].max(), df["age"].mean()))


# ============================================================
# STEP 7: VALIDATE AND FILTER OUTLIERS
# ============================================================

print("\n[Step 7] Filtering clinically invalid outliers...")

shape_before_outliers = df.shape[0]

for col, (low, high) in VALID_RANGES.items():
    invalid_count = ((df[col] < low) | (df[col] > high)).sum()
    print("  {}: {} invalid records (outside [{}, {}])"
          .format(col, invalid_count, low, high))

    df = df[
        (df[col] >= low) &
        (df[col] <= high)
    ]

# Additional clinical rule: diastolic must be < systolic
invalid_bp = (df["ap_lo"] >= df["ap_hi"]).sum()
print("  ap_lo >= ap_hi (diastolic >= systolic): {} invalid records"
      .format(invalid_bp))

df = df[df["ap_lo"] < df["ap_hi"]]

shape_after_outliers = df.shape[0]
removed_total = shape_before_outliers - shape_after_outliers

print("\n  Records before outlier removal:", shape_before_outliers)
print("  Records after outlier removal:", shape_after_outliers)
print("  Total records removed:", removed_total)
print("  Percentage removed: {:.2f}%"
      .format(100 * removed_total / shape_before_outliers))


# ============================================================
# STEP 8: VALIDATE TARGET VARIABLE
# ============================================================

print("\n[Step 8] Validating target variable...")

target_values = sorted(df[TARGET_COLUMN].unique())
print("  Target column:", TARGET_COLUMN)
print("  Unique values:", target_values)

if set(target_values) == {0, 1}:
    print("  Already binary (0/1) — no conversion needed.")
else:
    print("  Converting to binary...")
    df[TARGET_COLUMN] = (df[TARGET_COLUMN] > 0).astype(int)
    print("  Converted. New values:",
          sorted(df[TARGET_COLUMN].unique()))


# ============================================================
# STEP 9: FINAL DATASET SUMMARY
# ============================================================

print("\n[Step 9] Final dataset summary...")

print("  Final shape:", df.shape)

print("\n  Target distribution:")
target_counts = df[TARGET_COLUMN].value_counts().sort_index()
target_props = df[TARGET_COLUMN].value_counts(
    normalize=True
).sort_index()

for val in target_counts.index:
    print("    Class {}: {} ({:.2f}%)"
          .format(val, target_counts[val], target_props[val] * 100))

print("\n  Final missing values:", df.isnull().sum().sum())
print("  Final duplicates:", df.duplicated().sum())

print("\n  Feature statistics after cleaning:")
print(df.describe().to_string())


# ============================================================
# STEP 10: SAVE CLEANED DATASET
# ============================================================

print("\n[Step 10] Saving cleaned dataset...")

os.makedirs(OUTPUT_DIR, exist_ok=True)

df.to_csv(CLEAN_PATH, index=False)

print("  Saved:", CLEAN_PATH)
print("  Shape:", df.shape)


# ============================================================
# STEP 11: STRATIFIED TRAIN/TEST SPLIT
# ============================================================

print("\n[Step 11] Creating stratified train/test split...")
print("  Test size: {}%".format(int(TEST_SIZE * 100)))
print("  Random state:", RANDOM_STATE)

from sklearn.model_selection import train_test_split

train_data, test_data = train_test_split(
    df,
    test_size=TEST_SIZE,
    random_state=RANDOM_STATE,
    stratify=df[TARGET_COLUMN]
)

print("\n  Training set:")
print("    Shape:", train_data.shape)

train_dist = train_data[TARGET_COLUMN].value_counts().sort_index()
train_prop = train_data[TARGET_COLUMN].value_counts(
    normalize=True
).sort_index()

for val in train_dist.index:
    print("    Class {}: {} ({:.2f}%)"
          .format(val, train_dist[val], train_prop[val] * 100))

print("\n  Test set:")
print("    Shape:", test_data.shape)

test_dist = test_data[TARGET_COLUMN].value_counts().sort_index()
test_prop = test_data[TARGET_COLUMN].value_counts(
    normalize=True
).sort_index()

for val in test_dist.index:
    print("    Class {}: {} ({:.2f}%)"
          .format(val, test_dist[val], test_prop[val] * 100))


# ============================================================
# STEP 12: SAVE TRAIN AND TEST DATASETS
# ============================================================

print("\n[Step 12] Saving train and test datasets...")

train_data.to_csv(TRAIN_PATH, index=False)
test_data.to_csv(TEST_PATH, index=False)

print("  Training saved:", TRAIN_PATH)
print("  Test saved:", TEST_PATH)


# ============================================================
# FINAL REPORT
# ============================================================

print("\n" + "=" * 70)
print("PREPROCESSING COMPLETE")
print("=" * 70)

print("\n  Raw dataset:     {} records"
      .format(raw_df.shape[0]))
print("  Cleaned dataset: {} records"
      .format(df.shape[0]))
print("  Records removed: {} ({:.2f}%)"
      .format(
          raw_df.shape[0] - df.shape[0],
          100 * (raw_df.shape[0] - df.shape[0]) / raw_df.shape[0]
      ))
print("  Training set:    {} records"
      .format(train_data.shape[0]))
print("  Test set:        {} records"
      .format(test_data.shape[0]))

print("\n  Output files:")
print("    data/processed/large_clean.csv")
print("    data/processed/large_train.csv")
print("    data/processed/large_test.csv")

print("\n  DATA LEAKAGE WARNING:")
print("  The test set (large_test.csv) must NEVER be used for:")
print("    - CTGAN training or synthetic data generation")
print("    - Model training or hyperparameter tuning")
print("    - Feature selection or augmentation-ratio selection")
print("    - Any form of data augmentation")

print("\n" + "=" * 70)
