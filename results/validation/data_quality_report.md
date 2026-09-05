# Data Quality Report: UCI Cleveland Heart Disease

## 1. Executive Summary

- **Total Records (Rows):** 303
- **Total Attributes (Columns):** 14
- **Missing Value Count:** 6 (0.1414%)
- **Duplicate Row Count:** 0 (0.0%)
- **Numerical Attributes:** 5
- **Categorical Attributes:** 9
- **Target Attribute:** `num`
- **Class Distribution:** {"0": 164, "1": 55, "2": 36, "3": 35, "4": 13}
- **Imbalance Ratio:** 12.615 (Entropy Balance: 0.795)
- **Balance Evaluation:** Class imbalance present

## 2. Missing Value & Anomaly Breakdown

| Column | Missing Count | Missing Percent |
|---|---|---|
| `ca` | 4 | 1.32% |
| `thal` | 2 | 0.66% |

## 3. Numerical Attribute Distributions

| Feature | Min | Q25 | Median | Mean | Q75 | Max | Std Dev |
|---|---|---|---|---|---|---|---|
| `age` | 29.00 | 48.00 | 56.00 | 54.44 | 61.00 | 77.00 | 9.04 |
| `trestbps` | 94.00 | 120.00 | 130.00 | 131.69 | 140.00 | 200.00 | 17.60 |
| `chol` | 126.00 | 211.00 | 241.00 | 246.69 | 275.00 | 564.00 | 51.78 |
| `thalach` | 71.00 | 133.50 | 153.00 | 149.61 | 166.00 | 202.00 | 22.88 |
| `oldpeak` | 0.00 | 0.00 | 0.80 | 1.04 | 1.60 | 6.20 | 1.16 |

## 4. Categorical Attribute Summary

| Feature | Unique Categories | Distribution Breakdown |
|---|---|---|
| `exang` | 2 | 0: 204, 1: 99 |
| `slope` | 3 | 1: 142, 2: 140, 3: 21 |
| `cp` | 4 | 4: 144, 3: 86, 2: 50, 1: 23 |
| `thal` | 4 | 3.0: 166, 7.0: 117, 6.0: 18, nan: 2 |
| `fbs` | 2 | 0: 258, 1: 45 |
| `restecg` | 3 | 0: 151, 2: 148, 1: 4 |
| `num` | 5 | 0: 164, 1: 55, 2: 36, 3: 35, 4: 13 |
| `ca` | 5 | 0.0: 176, 1.0: 65, 2.0: 38, 3.0: 20, nan: 4 |
| `sex` | 2 | 1: 206, 0: 97 |
