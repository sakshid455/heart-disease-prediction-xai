# Bootstrap Robustness Analysis Report

**Model**: Logistic Regression
**Bootstrap Resampling Iterations**: 100 with replacement
**Empirical Confidence Level**: 95%

## Empirical Performance Bounds

| Metric | Baseline Mean (95% CI) | Augmented Mean (95% CI) | Mean Delta | Delta 95% CI | P(Gain > 0) |
|---|---|---|---|---|---|
| `RECALL` | 0.6603 [0.6396, 0.6782] | 0.7116 [0.6942, 0.7261] | +0.0513 | [+0.0420, +0.0601] | 100.0% |
| `F1` | 0.7016 [0.6868, 0.7172] | 0.7126 [0.6989, 0.7245] | +0.0110 | [+0.0036, +0.0184] | 100.0% |
| `ROC_AUC` | 0.7811 [0.7691, 0.7917] | 0.7772 [0.7659, 0.7888] | -0.0040 | [-0.0066, -0.0012] | 1.0% |
| `ACCURACY` | 0.7222 [0.7093, 0.7349] | 0.7161 [0.7039, 0.7269] | -0.0061 | [-0.0125, +0.0007] | 3.0% |
| `PRECISION` | 0.7484 [0.7332, 0.7684] | 0.7136 [0.6956, 0.7330] | -0.0348 | [-0.0425, -0.0259] | 0.0% |
