# Decision Threshold Optimization Analysis

> [!NOTE]
> RESEARCH DISCLAIMER: Model Threshold Optimization is an experimental analysis tool evaluating algorithmic operating trade-offs. It is NOT a clinical recommendation or medical decision aid. Threshold selections must not be applied clinically without prospective medical validation.

**Model**: Logistic Regression

## Recommended Operating Criteria

| Objective | Selected Threshold | Sensitivity (Recall) | Specificity | Precision | F1-Score | Youden's J |
|---|---|---|---|---|---|---|
| Standard Default (0.50) | **0.50** | 71.4% | 71.3% | 71.4% | 0.7141 | +0.4272 |
| Balanced F1 Maximization | **0.45** | 77.2% | 63.5% | 67.9% | 0.7225 | +0.4062 |
| Youden's J Optimal (Sensitivity + Specificity) | **0.55** | 65.7% | 77.9% | 74.9% | 0.7001 | +0.4362 |
| High-Sensitivity Screening | **0.10** | 99.1% | 3.9% | 50.9% | 0.6723 | +0.0305 |

## Complete Threshold Sweep Table

| Threshold | Sensitivity | Specificity | Precision | F1-Score | Accuracy | Youden's J |
|---|---|---|---|---|---|---|
| 0.10 | 0.9912 | 0.0393 | 0.5086 | 0.6723 | 0.5160 | +0.0305 |
| 0.15 | 0.9808 | 0.0994 | 0.5221 | 0.6815 | 0.5408 | +0.0802 |
| 0.20 | 0.9657 | 0.1747 | 0.5400 | 0.6926 | 0.5708 | +0.1403 |
| 0.25 | 0.9425 | 0.2452 | 0.5561 | 0.6995 | 0.5944 | +0.1877 |
| 0.30 | 0.9177 | 0.3277 | 0.5780 | 0.7093 | 0.6232 | +0.2455 |
| 0.35 | 0.8818 | 0.4287 | 0.6076 | 0.7195 | 0.6556 | +0.3105 |
| 0.40 | 0.8251 | 0.5256 | 0.6357 | 0.7181 | 0.6756 | +0.3507 |
| 0.45 | 0.7716 | 0.6346 | 0.6793 | 0.7225 | 0.7032 | +0.4062 |
| 0.50 | 0.7141 | 0.7131 | 0.7141 | 0.7141 | 0.7136 | +0.4272 |
| 0.55 | 0.6573 | 0.7788 | 0.7489 | 0.7001 | 0.7180 | +0.4362 |
| 0.60 | 0.6054 | 0.8205 | 0.7719 | 0.6786 | 0.7128 | +0.4259 |
| 0.65 | 0.5519 | 0.8638 | 0.8026 | 0.6540 | 0.7076 | +0.4157 |
| 0.70 | 0.4984 | 0.8870 | 0.8157 | 0.6187 | 0.6924 | +0.3854 |
| 0.75 | 0.4273 | 0.9159 | 0.8359 | 0.5655 | 0.6712 | +0.3432 |
| 0.80 | 0.3442 | 0.9311 | 0.8337 | 0.4873 | 0.6372 | +0.2753 |
| 0.85 | 0.2516 | 0.9511 | 0.8378 | 0.3870 | 0.6008 | +0.2027 |
| 0.90 | 0.1637 | 0.9663 | 0.8300 | 0.2735 | 0.5644 | +0.1301 |
