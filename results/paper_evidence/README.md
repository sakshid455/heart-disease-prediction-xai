# HeartAI — Research Paper Evidence Package

**Project**: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction  
**Status**: Authoritative Research Evidence Package  
**Date**: August 30, 2026  
**Artifact Directory**: `results/paper_evidence/`  

---

## 1. Master Evidence Mapping Matrix

This directory contains the authoritative experimental tables and high-resolution figures cross-referenced to the corresponding sections of the research paper manuscript ([`results/research_paper_draft.md`](file:///c:/Users/datir/predictive/results/research_paper_draft.md)).

| Manuscript Section | Evidence Artifact (Table) | Evidence Artifact (Figure) | Primary Empirical Finding Supported |
| :--- | :--- | :--- | :--- |
| **Section 5: Dataset** | [Table E1 (Dataset Characteristics)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e1.md) | [Figure 2 (Dataset Distribution)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_2_dataset_distribution.png) | 68,612 clean records with zero missing values and balanced 50.5% / 49.5% CVD distribution. |
| **Section 6: Proposed Methodology** | [Table E2 (Experimental Setup)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e2.md) | [Figure 1 (Methodology Architecture)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_1_methodology.png) | 6-stage scientific workflow with strict 80/20 train/test quarantine protocol. |
| **Section 7: CTGAN Synthesis** | [Table E3 (CTGAN Quality)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e3.md) | [Figure 3 (Distributions)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_3_real_vs_synthetic_distributions.png) & [Figure 4 (Correlation Diff)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_4_correlation_comparison.png) | Low Wasserstein distance ($W_1 = 0.0624$) and correlation difference ($\Delta r = 0.0792$). |
| **Section 8: Adaptive Framework** | [Table E4 (Augmentation Performance)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e4.md) | [Figure 5 (Accuracy)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_5_augmentation_vs_accuracy.png) & [Figure 6 (Recall)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_6_augmentation_vs_recall.png) & [Figure 7 (F1)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_7_augmentation_vs_f1.png) | Monotonic sensitivity expansion in Logistic Regression ($66.58\% ightarrow 73.87\%$). |
| **Section 9: ML Model Benchmarks** | [Table E5 (Model Comparison)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e5.md) | [Figure 9 (Model Comparison)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_9_model_comparison.png) & [Figure 10 (Optimal Ratio)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_10_optimal_augmentation_ratio.png) | High-sensitivity screening peak at 200% (LR) vs. peak rank discrimination (XGBoost ROC-AUC = 0.8053). |
| **Section 10: Statistical Testing** | [Table E6 (Statistical Significance)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e6.md) | [Figure 8 (ROC-AUC Invariance)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_8_augmentation_vs_roc_auc.png) | Paired $t$-tests with Benjamini-Hochberg FDR correction confirming $q < 0.05$ significance. |
| **Section 11: Robustness Analysis** | [Table E7 (Robustness Summary)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e7.md) | [Figure 11 (Seed Robustness Boxplots)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_11_robustness_across_seeds.png) | High stability across 140 benchmark runs ($CV < 0.6\%$, 95% CI: $[73.13\%, 74.17\%]$). |
| **Section 12: Empirical Privacy** | [Table E8 (Privacy Audit)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e8.md) | — | DCR ($0.4782$) and duplicate rate ($0.41\%$) confirming $98.2\%$ smooth continuous manifold interpolation. |
| **Section 13: Demographic Fairness** | [Table E9 (Fairness Analysis)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e9.md) | — | Universal false negative reductions across all sex/age strata (younger $<50$ yrs recall $+9.68\%$). |
| **Section 14: Explainable AI (SHAP)**| [Table E10 (SHAP Concordance)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e10.md) | [Figure 12 (Global SHAP Importance)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_12_shap_feature_importance.png) & [Figure 13 (SHAP Real vs Aug Comparison)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_13_shap_comparison.png) | Feature rank correlation $ho = +0.8455$, magnitude correlation $r = +0.9585$, $100\%$ sign agreement. |
| **Section 15: Cross-Dataset Study** | [Table E11 (Cross-Dataset Validation)](file:///c:/Users/datir/predictive/results/paper_evidence/tables/table_e11.md) | [Figure 14 (UCI vs Large Cohort Trajectories)](file:///c:/Users/datir/predictive/results/paper_evidence/figures/figure_14_cross_dataset_results.png) | Concordant sensitivity gains ($+7.14\%$ on UCI, $+7.29\%$ on Large) across $1:226$ scale difference. |

---

## 2. Directory Structure

```
results/paper_evidence/
├── README.md                          # This master mapping guide
├── tables/
│   ├── table_e1.csv / table_e1.md     # Dataset Characteristics & Feature Dictionary
│   ├── table_e2.csv / table_e2.md     # Experimental Pipeline Setup
│   ├── table_e3.csv / table_e3.md     # CTGAN Quality & Distributional Fidelity
│   ├── table_e4.csv / table_e4.md     # Augmentation Performance Trajectory
│   ├── table_e5.csv / table_e5.md     # Model Comparison Benchmark
│   ├── table_e6.csv / table_e6.md     # Statistical Significance (FDR q<0.05)
│   ├── table_e7.csv / table_e7.md     # Multi-Seed Robustness (140 runs)
│   ├── table_e8.csv / table_e8.md     # Empirical Privacy Risk & DCR Audit
│   ├── table_e9.csv / table_e9.md     # Subgroup Demographic Fairness
│   ├── table_e10.csv / table_e10.md   # SHAP Feature Attribution Concordance
│   └── table_e11.csv / table_e11.md   # Cross-Dataset Validation (UCI vs. Large)
└── figures/
    ├── figure_1_methodology.png       # 300 DPI Proposed Methodology Flowchart
    ├── figure_2_dataset_distribution.png # 300 DPI Clinical Biomarker Distributions
    ├── figure_3_real_vs_synthetic_distributions.png # 300 DPI Real vs CTGAN Density
    ├── figure_4_correlation_comparison.png # 300 DPI Correlation Heatmap & Delta
    ├── figure_5_augmentation_vs_accuracy.png # 300 DPI Accuracy Trajectories
    ├── figure_6_augmentation_vs_recall.png # 300 DPI Recall / Sensitivity Surge
    ├── figure_7_augmentation_vs_f1.png # 300 DPI Harmonic F1-Score Trajectories
    ├── figure_8_augmentation_vs_roc_auc.png # 300 DPI ROC-AUC Equivalence Invariance
    ├── figure_9_model_comparison.png  # 300 DPI Cross-Model Benchmark Radar & Bar
    ├── figure_10_optimal_augmentation_ratio.png # 300 DPI Multi-Objective Scorecard
    ├── figure_11_robustness_across_seeds.png # 300 DPI Multi-Seed Variance Boxplots
    ├── figure_12_shap_feature_importance.png # 300 DPI Global SHAP Attribution Bar
    ├── figure_13_shap_comparison.png  # 300 DPI Real vs Augmented SHAP Scatter & Parity
    └── figure_14_cross_dataset_results.png # 300 DPI UCI vs Large Cohort Scaling
```

================================================================================
ALL 11 EVIDENCE TABLES AND 14 PUBLICATION FIGURES GENERATED AND VALIDATED.
================================================================================
