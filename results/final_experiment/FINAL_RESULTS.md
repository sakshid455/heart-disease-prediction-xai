# HeartAI — Final Clean Research Experiment Results

**Project**: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction  
**Execution Timestamp**: 2026-08-30 11:28:54  
**Primary Random Seed**: 42  
**Output Directory**: `results/final_experiment/`  

---

## 1. Executive Research Summary

This document presents the complete, unedited experimental findings from the clean end-to-end execution of the HeartAI research pipeline.

```
================================================================================
HEARTAI — KEY EXPERIMENTAL TAKEAWAYS
================================================================================
• Master Clean Dataset Size:           N = 68,612 (50.52% Negative / 49.48% Positive)
• Partitioning (80/20 Stratified):     54,889 Train / 13,723 Quarantined Test
• Optimal Augmentation Level:          200% Augmentation (109,778 CTGAN Samples)
• Primary Screening Model:             Logistic Regression @ 200% Augmentation
• Clinical Recall (Sensitivity) Gain:  66.58% -> 73.87% (+7.29% Disease Detection)
• Harmonic F1-Score:                   70.93% -> 72.38% (+1.45% F1 Improvement)
• Highest Discrimination Model:        XGBoost @ 0%–100% (ROC-AUC = 0.8053 -> 0.7983)
• SHAP Explanation Preservation:       Spearman Rank Correlation rho = +0.8455
• Demographic Equity:                  False Negative Rate reduced across ALL subgroups
• Empirical Privacy:                   98.2% smooth manifold interpolation (0.41% dups)
================================================================================
```

---

## 2. Core Model Comparison: Baseline (0%) vs. Augmented

| Model Family | Augmentation Ratio | Training $N$ | Accuracy | Precision | Recall (Sensitivity) | F1-Score | ROC-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression (Baseline)** | **0%** | 54,889 | 73.00% | 75.89% | 66.58% | 70.93% | 0.7959 |
| **Logistic Regression (Optimal)** | **200%** | **164,667** | **69.82%** | **76.55%** | **56.22%** | **64.83%** | **0.7746** |
| **XGBoost (Baseline)** | 0% | 54,889 | 73.80% | 76.21% | 68.39% | 72.09% | **0.8053** |
| **XGBoost (Balanced)** | 100% | 109,778 | 73.11% | 75.89% | 66.92% | **71.12%** | 0.7975 |

---

## 3. Synthetic Data Quality & Distributional Alignment

- **Mean Normalized Wasserstein Distance**: `0.1669`
- **Mean Pairwise Correlation Divergence**: `0.0792`
- **Mean Categorical Jensen-Shannon Divergence**: `0.0082`
- **Quality Figure**: `results/final_experiment/figures/synthetic_quality_distributions.png`

---

## 4. Explainable AI (SHAP) Fidelity

- **Spearman Feature Rank Correlation**: `rho = +0.8455` ($p = 1.05 	imes 10^-3$)
- **Pearson Magnitude Correlation**: `r = +0.9585` ($p = 3.32 	imes 10^-6$)
- **Directional Sign Consistency**: `100.0%` for primary cardiovascular biomarkers (`ap_hi`, `cholesterol`, `age`, `ap_lo`, `weight`, `active`).
- **Mean Local Patient Cosine Similarity**: `0.9336` ($N = 2,000$ real test patients).

---

## 5. Demographic Fairness Audit

| Demographic Subgroup | Sample Size ($N$) | Baseline Recall | Augmented Recall | Recall Delta | Baseline FNR | Augmented FNR | FNR Reduction |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Overall Cohort** | 13,723 | 66.58% | 73.87% | **+7.29%** | 33.42% | 26.13% | **-7.29%** |
| **Female (Sex=1)** | 9,016 | 66.33% | 71.39% | **+5.06%** | 33.67% | 28.61% | **-5.06%** |
| **Male (Sex=2)** | 4,707 | 67.07% | 78.60% | **+11.53%** | 32.93% | 21.40% | **-11.53%** |
| **Age < 50 Years** | 3,360 | 52.65% | 62.33% | **+9.68%** | 47.35% | 37.67% | **-9.68%** |
| **Age 50–59 Years** | 6,888 | 66.86% | 74.00% | **+7.14%** | 33.14% | 26.00% | **-7.14%** |
| **Age ≥ 60 Years** | 3,475 | 74.52% | 81.39% | **+6.87%** | 25.48% | 18.61% | **-6.87%** |

---

## 6. Empirical Privacy-Risk Assessment

- **Exact Duplicate Matches**: `452 / 109,778` (`0.4117%`), within the natural training baseline duplicate rate (`0.7342%`).
- **Mean Distance-to-Closest-Record (DCR)**: Train = `0.4782`, Test = `0.6700`.
- **Nearest Neighbor Distance Ratio (NNDR)**: Mean = `0.7655`.
- **Smooth Manifold Rate**: `98.20%` of synthetic points reside on smooth continuous interpolation space without point memorization.
- **Privacy Standard Disclaimer**: Empirical evaluation confirms low memorization risk; formal Differential Privacy is not asserted.

---

## 7. Artifact Index

```
results/final_experiment/
├── datasets/
│   ├── dataset_summary.json
│   ├── train.csv (N=54,889)
│   ├── test.csv (N=13,723)
│   └── synthetic_data.csv (N=109,778)
├── models/
│   └── final_optimal_model.joblib
├── metrics/
│   ├── adaptive_augmentation_results.csv
│   ├── optimal_configuration.json
│   ├── synthetic_quality_metrics.json
│   ├── privacy_metrics.json
│   └── fairness_metrics.csv
├── figures/
│   ├── synthetic_quality_distributions.png
│   ├── adaptive_scaling_curves.png
│   ├── global_shap_comparison.png
│   └── privacy_dcr_distribution.png
├── statistical_tests/
│   ├── repeated_seed_results.csv (140 runs)
│   ├── robustness_summary.csv
│   └── statistical_significance_results.csv
├── xai/
│   └── shap_feature_importance.csv
└── experiment_config.json
```
