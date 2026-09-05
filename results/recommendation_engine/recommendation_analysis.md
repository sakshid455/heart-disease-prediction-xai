# HeartAI — Adaptive Augmentation Recommendation Engine Report

**Generated**: August 30, 2026  
**Source**: 28-Run Validated Empirical Benchmark Matrix (`results/adaptive_model_comparison.csv`)  

---

## 1. Recommendation Matrix Across Supported Objectives

| Objective | Recommended Ratio | Recommended Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | Total Training Samples | Synthetic Samples |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---|
| Balanced Performance | 50% | XGBoost | 73.56% | 74.87% | 70.07% | 72.39% | 0.8022 | 82,333 | 27,444 |
| High Sensitivity / Recall | 200% | Logistic Regression | 72.10% | 70.94% | 73.87% | 72.38% | 0.7894 | 164,667 | 109,778 |
| High Precision | 0% | XGBoost | 73.80% | 76.21% | 68.39% | 72.09% | 0.8053 | 54,889 | 0 |
| Maximum F1 | 75% | XGBoost | 73.30% | 74.08% | 70.82% | 72.41% | 0.8001 | 96,055 | 41,166 |
| Maximum ROC-AUC | 0% | XGBoost | 73.80% | 76.21% | 68.39% | 72.09% | 0.8053 | 54,889 | 0 |

---

## 2. Objective-Specific Decision Analysis & Rationale

### Balanced Performance
- **Recommended Ratio**: `50%`
- **Recommended Model**: `XGBoost`
- **Performance Profile**:
  - **Recall (Sensitivity)**: `70.07%`
  - **Precision (PPV)**: `74.87%`
  - **Harmonic F1-Score**: `72.39%`
  - **Accuracy**: `73.56%`
  - **ROC-AUC**: `0.8022`
  - **Total Training Volume**: `82,333` (27,444 CTGAN synthetic)
- **Clinical & Mathematical Rationale**: Selected XGBoost at 50% augmentation because it achieves the highest harmonic multi-objective utility score (0.7480), establishing an optimal equilibrium between Precision (74.87%) and Recall (70.07%) with strong ROC-AUC (0.8022).

### High Sensitivity / Recall
- **Recommended Ratio**: `200%`
- **Recommended Model**: `Logistic Regression`
- **Performance Profile**:
  - **Recall (Sensitivity)**: `73.87%`
  - **Precision (PPV)**: `70.94%`
  - **Harmonic F1-Score**: `72.38%`
  - **Accuracy**: `72.10%`
  - **ROC-AUC**: `0.7894`
  - **Total Training Volume**: `164,667` (109,778 CTGAN synthetic)
- **Clinical & Mathematical Rationale**: Selected Logistic Regression at 200% augmentation because it maximizes clinical disease detection sensitivity (73.87% Recall), reducing false negatives to the lowest empirical rate (26.13%) across all evaluated valid configurations while maintaining a 72.38% F1-score and 0.7894 ROC-AUC.

### High Precision
- **Recommended Ratio**: `0%`
- **Recommended Model**: `XGBoost`
- **Performance Profile**:
  - **Recall (Sensitivity)**: `68.39%`
  - **Precision (PPV)**: `76.21%`
  - **Harmonic F1-Score**: `72.09%`
  - **Accuracy**: `73.80%`
  - **ROC-AUC**: `0.8053`
  - **Total Training Volume**: `54,889` (0 CTGAN synthetic)
- **Clinical & Mathematical Rationale**: Selected XGBoost at 0% augmentation because it achieves the highest positive predictive value (76.21% Precision), minimizing false positive alarm rates for confirmatory clinical pipelines where downstream testing costs are significant.

### Maximum F1
- **Recommended Ratio**: `75%`
- **Recommended Model**: `XGBoost`
- **Performance Profile**:
  - **Recall (Sensitivity)**: `70.82%`
  - **Precision (PPV)**: `74.08%`
  - **Harmonic F1-Score**: `72.41%`
  - **Accuracy**: `73.30%`
  - **ROC-AUC**: `0.8001`
  - **Total Training Volume**: `96,055` (41,166 CTGAN synthetic)
- **Clinical & Mathematical Rationale**: Selected XGBoost at 75% augmentation because it delivers the peak harmonic mean of precision and recall (72.41% F1-Score), providing the highest aggregate classification effectiveness.

### Maximum ROC-AUC
- **Recommended Ratio**: `0%`
- **Recommended Model**: `XGBoost`
- **Performance Profile**:
  - **Recall (Sensitivity)**: `68.39%`
  - **Precision (PPV)**: `76.21%`
  - **Harmonic F1-Score**: `72.09%`
  - **Accuracy**: `73.80%`
  - **ROC-AUC**: `0.8053`
  - **Total Training Volume**: `54,889` (0 CTGAN synthetic)
- **Clinical & Mathematical Rationale**: Selected XGBoost at 0% augmentation because it maximizes global rank-order separability (0.8053 ROC-AUC) and overall accuracy (73.80%), preserving exact empirical distributions without generative boundary smoothing.

---

## 3. Python API Integration Example

```python
from src.recommendation_engine import recommend_augmentation

# 1. Clinical Screening (High Sensitivity)
screening_rec = recommend_augmentation('High Sensitivity / Recall')
print(screening_rec['recommended_augmentation_ratio'])  # '200%'
print(screening_rec['recommended_model'])               # 'Logistic Regression'

# 2. General Balanced Deployment
balanced_rec = recommend_augmentation('Balanced Performance')
print(balanced_rec['recommended_augmentation_ratio'])   # '50%'
print(balanced_rec['recommended_model'])               # 'XGBoost'

# 3. High Precision Confirmatory Pipeline
precision_rec = recommend_augmentation('High Precision')
print(precision_rec['recommended_augmentation_ratio'])  # '0%'
print(precision_rec['recommended_model'])               # 'XGBoost'
```
