# HeartAI — Dataset Documentation & Clinical Schemas

## 1. Primary Cardiovascular Cohort ($N = 68,612$)

### Overview & Data Source
The primary cohort originates from outpatient electronic health records consisting of 70,000 initial examination records. Following strict clinical boundary filtering (removing extreme physiologically impossible values such as negative blood pressures or extreme height/weight recording artifacts), the master cleaned cohort contains **$N = 68,612$ patient records** with zero missing values.

### Feature Dictionary

| Column Name | Description | Clinical Data Type | Measurement Units / Valid Range | Normal Baseline |
| :--- | :--- | :--- | :--- | :--- |
| `age` | Patient age | Continuous | Years ($18 - 100$) | Median $\approx 53.3$ yrs |
| `gender` | Biological sex | Binary Categorical | $1 = \text{Female}, 2 = \text{Male}$ | $65.0\%$ Female / $35.0\%$ Male |
| `height` | Body height | Continuous | Centimeters ($120 - 220\text{ cm}$) | $164.4 \pm 7.8\text{ cm}$ |
| `weight` | Body weight | Continuous | Kilograms ($30 - 200\text{ kg}$) | $74.1 \pm 14.3\text{ kg}$ |
| `ap_hi` | Systolic blood pressure | Continuous | $\text{mmHg}$ ($60 - 240\text{ mmHg}$) | $126.6 \pm 16.7\text{ mmHg}$ |
| `ap_lo` | Diastolic blood pressure | Continuous | $\text{mmHg}$ ($40 - 160\text{ mmHg}$) | $81.3 \pm 9.6\text{ mmHg}$ |
| `cholesterol` | Serum cholesterol | Ordinal Categorical | $1 = \text{Normal}, 2 = \text{Above Normal}, 3 = \text{Well Above}$ | $75.3\%$ Normal |
| `gluc` | Fasting blood glucose | Ordinal Categorical | $1 = \text{Normal}, 2 = \text{Above Normal}, 3 = \text{Well Above}$ | $85.3\%$ Normal |
| `smoke` | Tobacco smoking status | Binary Categorical | $0 = \text{Non-Smoker}, 1 = \text{Smoker}$ | $8.8\%$ Smokers |
| `alco` | Alcohol intake | Binary Categorical | $0 = \text{No}, 1 = \text{Yes}$ | $5.4\%$ Positive |
| `active` | Physical activity | Binary Categorical | $0 = \text{Inactive}, 1 = \text{Active}$ | $80.4\%$ Active |
| `cardio` | Cardiovascular Disease (Target) | Binary Indicator | $0 = \text{Absent (Negative)}, 1 = \text{Present (Positive)}$ | **50.52% Neg / 49.48% Pos** |

---

## 2. Partitioning & Quarantine Protocol

To eliminate test set leakage:
- **Partition Ratio**: 80% Training ($N = 54,889$) / 20% Test ($N = 13,723$).
- **Stratification**: Partitioned with exact target proportion matching (`cardio`).
- **Quarantine**: The test partition is stored in `data/processed/large_test.csv` and is **never** used during preprocessing scalar fitting, CTGAN training, or hyperparameter selection.

---

## 3. Benchmark Dataset: UCI Cleveland Heart Disease ($N = 303$)

- **Source**: UCI Machine Learning Repository (Cleveland Clinic Foundation).
- **Features (13)**: `age`, `sex`, `cp` (chest pain type), `trestbps` (resting BP), `chol` (serum cholesterol), `fbs` (fasting blood sugar), `restecg`, `thalach` (max HR), `exang` (exercise angina), `oldpeak` (ST depression), `slope`, `ca` (fluoroscopy vessels), `thal` (thallium scan).
- **Target**: `num` binarized ($0 = \text{Absent}, 1 = \text{Present}$).
- **Role in Study**: Cross-dataset validation benchmark evaluating generative transferability in a small sample regime ($N_{\text{train}} = 242$).
