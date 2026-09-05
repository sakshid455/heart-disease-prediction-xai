# Table_E11: Cross-Dataset Validation: UCI Cleveland vs. Large Cardiovascular Cohort

**Source Reference**: `results/cross_dataset/cross_dataset_results.csv`  
**Data Integrity**: Authoritative Validated Frozen Results  

---

| Evaluation Dimension | UCI Cleveland Benchmark | Large Cardiovascular Cohort | Scale Ratio |
| --- | --- | --- | ---|
| Cohort Size (N) | 303 records (242 train / 61 test) | 68,612 records (54,889 train / 13,723 test) | 1 : 226 scale difference |
| Number of Attributes | 13 clinical features | 11 clinical features | Distinct feature schemas (unmerged) |
| Optimal Model Architecture | Random Forest | Logistic Regression | Model choice adapts to sample density |
| Optimal Augmentation Ratio | 75% Augmentation | 200% Augmentation | Small data saturates earlier (50%-75%) |
| Baseline Sensitivity (Recall) | 92.86% | 66.58% | High baseline in small cohort |
| Augmented Sensitivity (Recall) | 100.00% | 73.87% | Universal sensitivity gains |
| Net Sensitivity Surge (Delta) | +7.14% | +7.29% | Concordant sensitivity expansion (+7%) |
| Augmented ROC-AUC | 0.9556 (vs. 0.9491 baseline) | 0.7894 (vs. 0.7959 baseline) | Rank discrimination preserved |
