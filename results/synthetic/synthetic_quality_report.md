# Synthetic Data Quality & Fidelity Evaluation Report

## 1. Executive Summary

- **Real Benchmark Records:** 54,889
- **CTGAN Synthetic Records:** 109,778
- **Composite Fidelity Score:** **92.44%**
- **Correlation Matrix Similarity:** **92.15%** (Frobenius: 0.80)
- **Exact Duplication Rate:** 0.41% (452 records)
- **Median Distance to Closest Record (DCR):** 1.0169
- **Median Nearest Neighbor Distance Ratio (NNDR):** 0.8601

## 2. Numerical Feature Distribution Fidelity

| Feature | KS Statistic | p-value | Wasserstein Dist | Fidelity Score |
|---|---|---|---|---|
| `age` | 0.0674 | 0.0000 | 0.7034 | 93.3% |
| `height` | 0.0475 | 0.0000 | 0.7703 | 95.2% |
| `weight` | 0.1440 | 0.0000 | 3.2437 | 85.6% |
| `ap_hi` | 0.0799 | 0.0000 | 2.2051 | 92.0% |
| `ap_lo` | 0.0434 | 0.0000 | 0.9466 | 95.7% |

## 3. Categorical Feature Concordance

| Feature | Total Variation Dist (TVD) | JS Distance | Concordance |
|---|---|---|---|
| `alco` | 0.0678 | 0.0860 | 93.2% |
| `gluc` | 0.0503 | 0.0474 | 95.0% |
| `gender` | 0.0665 | 0.0483 | 93.3% |
| `active` | 0.0670 | 0.0642 | 93.3% |
| `cholesterol` | 0.0737 | 0.0606 | 92.6% |
| `cardio` | 0.0994 | 0.0706 | 90.1% |
| `smoke` | 0.0748 | 0.0805 | 92.5% |

## 4. Central Tendencies & Moment Comparison

| Feature | Real Mean (Std) | Synthetic Mean (Std) | Mean Error | Std Error |
|---|---|---|---|---|
| `age` | 53.3 (6.8) | 52.6 (6.9) | 1.3% | 2.7% |
| `height` | 164.4 (8.0) | 164.9 (8.0) | 0.3% | 0.5% |
| `weight` | 74.1 (14.3) | 76.0 (12.4) | 2.6% | 13.1% |
| `ap_hi` | 126.7 (16.7) | 128.0 (16.9) | 1.0% | 1.1% |
| `ap_lo` | 81.3 (9.4) | 81.8 (9.3) | 0.6% | 0.7% |
