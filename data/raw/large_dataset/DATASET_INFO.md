# Cardiovascular Disease Dataset — Documentation

## Dataset Identity

| Attribute | Value |
|---|---|
| **Dataset Name** | Cardiovascular Disease Dataset |
| **Source** | Kaggle |
| **Author** | Svetlana Ulianova |
| **URL** | https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset |
| **Download Date** | 2026-08-26 |
| **License** | Listed as "Unknown" on Kaggle; cleaned versions available under CC0: Public Domain |
| **File Name** | `cardio_train.csv` |
| **File Format** | CSV with semicolon (`;`) delimiter |
| **File Size** | 2.81 MB |

---

## Dataset Dimensions

| Metric | Value |
|---|---|
| **Number of Records** | 70,000 |
| **Number of Columns** | 13 (1 ID + 11 features + 1 target) |
| **Number of Input Features** | 11 |
| **Missing Values** | 0 (none) |
| **Duplicate Rows** | 0 (none) |

---

## Target Variable

| Attribute | Value |
|---|---|
| **Column Name** | `cardio` |
| **Type** | Binary (0/1) |
| **Definition** | Presence (1) or absence (0) of cardiovascular disease |

### Class Distribution

| Class | Count | Proportion |
|---|---|---|
| 0 (No CVD) | 35,021 | 50.03% |
| 1 (CVD Present) | 34,979 | 49.97% |

**Note:** The dataset is nearly perfectly balanced (50/50 split).

---

## Feature Descriptions

| # | Column | Type | Category | Description | Range / Values |
|---|---|---|---|---|---|
| 0 | `id` | int64 | Identifier | Patient ID (not a feature) | 0 to 99,999 |
| 1 | `age` | int64 | Objective | Patient age in **days** | 10,798–23,713 (≈29.6–64.9 years) |
| 2 | `gender` | int64 | Objective | Patient gender | 1 = Female, 2 = Male |
| 3 | `height` | int64 | Objective | Height in centimeters | 55–250 cm |
| 4 | `weight` | float64 | Objective | Weight in kilograms | 10.0–200.0 kg |
| 5 | `ap_hi` | int64 | Examination | Systolic blood pressure | -150 to 16,020 (contains outliers) |
| 6 | `ap_lo` | int64 | Examination | Diastolic blood pressure | -70 to 11,000 (contains outliers) |
| 7 | `cholesterol` | int64 | Examination | Cholesterol level | 1 = normal, 2 = above normal, 3 = well above normal |
| 8 | `gluc` | int64 | Examination | Glucose level | 1 = normal, 2 = above normal, 3 = well above normal |
| 9 | `smoke` | int64 | Subjective | Smoking status | 0 = No, 1 = Yes |
| 10 | `alco` | int64 | Subjective | Alcohol intake | 0 = No, 1 = Yes |
| 11 | `active` | int64 | Subjective | Physical activity | 0 = No, 1 = Yes |
| 12 | `cardio` | int64 | **Target** | Cardiovascular disease | 0 = Absent, 1 = Present |

### Feature Categories

- **Objective features** (factual/measured): `age`, `gender`, `height`, `weight`
- **Examination features** (medical test results): `ap_hi`, `ap_lo`, `cholesterol`, `gluc`
- **Subjective features** (patient-reported): `smoke`, `alco`, `active`

### Feature Type Summary

| Feature Type | Count | Columns |
|---|---|---|
| Continuous Numerical | 5 | `age`, `height`, `weight`, `ap_hi`, `ap_lo` |
| Ordinal Categorical | 2 | `cholesterol`, `gluc` |
| Binary Categorical | 4 | `gender`, `smoke`, `alco`, `active` |

---

## Known Data Quality Issues & Outliers

### Blood Pressure Outliers (Critical)

| Issue | Count |
|---|---|
| `ap_hi` < 0 (negative systolic BP) | 7 records |
| `ap_lo` < 0 (negative diastolic BP) | 1 record |
| `ap_lo` > `ap_hi` (diastolic exceeds systolic) | 1,234 records |
| `ap_hi` > 250 (extremely high systolic) | 40 records |
| `ap_hi` < 50 (extremely low systolic) | 188 records |
| `ap_hi` max value | 16,020 (physiologically impossible) |
| `ap_lo` max value | 11,000 (physiologically impossible) |

### Height Outliers

| Issue | Count |
|---|---|
| Height < 100 cm (adult dataset, ages 29–65) | 29 records |
| Height > 220 cm | 1 record |

### Weight Outliers

| Issue | Count |
|---|---|
| Weight < 30 kg (adult dataset) | 7 records |

### Age Format

- Age is recorded in **days**, not years
- Range: 10,798 to 23,713 days (≈29.6 to 64.9 years)
- Conversion to years required during preprocessing

---

## Known Limitations

1. **Blood pressure outliers**: Contains physiologically impossible values that require filtering during preprocessing.
2. **Cholesterol and glucose are ordinal** (1/2/3 levels), not continuous lab values — less granular than clinical data.
3. **No ECG or exercise stress test data**: Unlike the UCI Heart Disease dataset, no electrocardiographic or cardiac catheterization features are available.
4. **License listed as "Unknown"**: The original Kaggle page does not specify a formal license. Some cleaned versions are shared under CC0.
5. **Age restricted to 29–65 years**: The dataset does not include elderly patients (65+) or younger adults (<30).
6. **Self-reported lifestyle features**: `smoke`, `alco`, `active` are patient-reported and may be subject to reporting bias.
7. **No feature for medical history**: No prior stroke, diabetes, or family history features.
8. **Original data source/collection methodology not fully documented** on the Kaggle page.

---

## Usage in This Project

This dataset serves as the **primary large-scale dataset** for the adaptive CTGAN-based synthetic data augmentation experiment. The existing UCI Heart Disease Dataset (303 records) is retained as a **small-data benchmark** for comparison.

### Research Design

```
Dataset A: UCI Heart Disease (303 records)     → Data-scarce scenario
Dataset B: CVD Dataset (70,000 records)         → Data-abundant scenario
```

This dual-dataset approach enables analysis of whether CTGAN-based synthetic data augmentation is more beneficial when original data is scarce versus abundant.

---

## File Integrity

| Property | Value |
|---|---|
| File | `cardio_train.csv` |
| Delimiter | Semicolon (`;`) |
| Size | 2,941,524 bytes (2.81 MB) |
| Records | 70,000 |
| Columns | 13 |
| Missing Values | 0 |
| Duplicates | 0 |
