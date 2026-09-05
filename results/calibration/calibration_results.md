# Model Probability Calibration & Reliability Report

**Model Evaluated**: Logistic Regression
**Discretization Bins**: 10

## Summary Metrics Comparison

| Metric | Baseline (0% Aug) | Augmented (CTGAN) | Delta (Aug - Base) | Better Calibration |
|---|---|---|---|---|
| Brier Score Loss | 0.19160 | 0.19382 | +0.00222 | Baseline |
| Expected Calibration Error (ECE) | 0.03993 | 0.04241 | +0.00249 | Baseline |
| Maximum Calibration Error (MCE) | 0.10245 | 0.11590 | +0.01346 | — |

**Scientific Finding**: Augmentation maintained comparable calibration stability

## Reliability Diagram (Bin Breakdown)

| Bin Range | Samples (Aug) | Mean Pred Prob | True Fraction | Gap |
|---|---|---|---|---|
| [0.0, 0.1] | 60 | 0.067 | 0.183 | 0.116 |
| [0.1, 0.2] | 201 | 0.154 | 0.159 | 0.005 |
| [0.2, 0.3] | 251 | 0.254 | 0.239 | 0.015 |
| [0.3, 0.4] | 363 | 0.350 | 0.320 | 0.030 |
| [0.4, 0.5] | 373 | 0.447 | 0.373 | 0.074 |
| [0.5, 0.6] | 270 | 0.546 | 0.504 | 0.043 |
| [0.6, 0.7] | 217 | 0.645 | 0.618 | 0.028 |
| [0.7, 0.8] | 248 | 0.751 | 0.778 | 0.027 |
| [0.8, 0.9] | 270 | 0.850 | 0.837 | 0.013 |
| [0.9, 1.0] | 247 | 0.943 | 0.830 | 0.113 |
