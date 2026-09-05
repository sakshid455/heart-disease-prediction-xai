# Table_E7: Multi-Seed Robustness Summary across 140 Benchmark Runs

**Source Reference**: `results/final_submission/statistical_tests/robustness_summary.csv`  
**Data Integrity**: Authoritative Validated Frozen Results  

---

| Model Family | Augmentation Ratio | Recall Mean ± Std | F1-Score Mean ± Std | ROC-AUC Mean ± Std | 95% Student-t CI (Recall) |
| --- | --- | --- | --- | --- | ---|
| Logistic Regression | 0% (Baseline) | 66.58% ± 0.38% | 70.93% ± 0.29% | 0.7956 ± 0.0018 | [66.11%, 67.05%] |
| Logistic Regression | 100% | 72.15% ± 0.41% | 72.18% ± 0.31% | 0.7918 ± 0.0021 | [71.64%, 72.66%] |
| Logistic Regression | 200% (Optimal) | 73.65% ± 0.42% | 72.38% ± 0.33% | 0.7894 ± 0.0024 | [73.13%, 74.17%] |
| Random Forest | 0% (Baseline) | 69.85% ± 0.45% | 70.88% ± 0.34% | 0.7758 ± 0.0022 | [69.29%, 70.41%] |
| Random Forest | 75% (Optimal) | 72.16% ± 0.48% | 71.20% ± 0.36% | 0.7728 ± 0.0025 | [71.56%, 72.76%] |
| XGBoost | 0% (Baseline) | 68.39% ± 0.32% | 72.09% ± 0.25% | 0.8051 ± 0.0012 | [67.99%, 68.79%] |
| XGBoost | 50% (Balanced) | 70.07% ± 0.35% | 72.39% ± 0.27% | 0.8022 ± 0.0015 | [69.64%, 70.50%] |
