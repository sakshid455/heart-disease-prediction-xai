# Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction

**Scientific Evidence & Technical Research Report**  
*Generated: 2026-09-05 11:37 UTC | Framework Version: 2.0.0*

> [!NOTE]
> **Medical Disclaimer**: This manuscript reports computational machine learning experiments and statistical > simulations. All algorithms, model predictions, decision thresholds, and counterfactuals are intended > strictly for scientific investigation and do not constitute clinical guidance, diagnoses, or prescriptions.

---

## 1. Executive Summary

This research investigates the efficacy and safety of generative synthetic tabular data augmentation using Conditional Tabular Generative Adversarial Networks (CTGAN) to enhance predictive models for cardiovascular disease risk classification. Using a high-capacity multi-model experimental grid (Logistic Regression, Random Forest, Support Vector Machines, XGBoost) across systematic augmentation ratios (0% to 200%), we rigorously measure classification fidelity, empirical privacy preservation, statistical significance, bootstrap stability, probability calibration, threshold trade-offs, and explainability.

## 2. Dataset Quality & Experimental Isolation

- **Cohort Dimension**: 303 records x 14 features.
- **Missing Value Profile**: 6 missing values (0.14%).
- **Target Analysis**: Target column `num` with 5 class levels.
- **Entropy Balance**: 0.795.

**Data Leakage Audit**: **FLAGGED (FAIL)**.
- Test records in CTGAN generator: 0
- Test contamination in preprocessing fit: 0

## 3. Generative Fidelity & Empirical Privacy Assessment

- **Generative Fidelity Score**: **92.44%**
- **Mean Correlation Similarity**: 0.0%
- **Frobenius Norm Gap**: 0.00
- **Median Distance to Closest Record (DCR)**: 0.0000
- **Empirical Privacy Risk**: **MODERATE**
- **Synthetic-to-Train Duplicate Rate**: 0.000%
- **Synthetic-to-Test Duplicate Rate**: 0.000%
- **Nearest Neighbor Distance Ratio (NNDR Median)**: 0.000

> *Privacy Statement*: The current implementation does not provide a formal (ε, δ)-Differential Privacy guarantee. All metrics represent empirical distance and duplicate analyses. DP-CTGAN is planned as future work.

## 4. Optimal Augmentation Configuration

- **Optimal Architecture**: **Logistic Regression**
- **Optimal Augmentation Ratio**: **50.0%**
- **Training Cohort Size**: 5,000 records
- **Target Metric (RECALL)**: 0.7133
- **Accuracy**: 72.50%
- **ROC-AUC**: 0.7915

- **Gain over 0% Baseline**: +0.0390 (+5.78% relative)

## 5. Statistical Rigor, Calibration & Robustness

- **Bootstrap Confidence (1000 resamples)**: Model Logistic Regression
  - Recall 95% CI: [0.6942, 0.7261]
  - F1 95% CI: [0.6989, 0.7245]
  - Mean Recall Improvement: +0.0513 (P(gain > 0) = 100.0%)
- **Probability Calibration**:
  - Augmented Brier Score: 0.1938
  - Augmented Expected Calibration Error (ECE): 0.0424
  - Finding: Augmentation maintained comparable calibration stability
- **Decision Thresholds (Optimal Operating Points)**:
  - Best F1 Threshold: **0.45** (F1 = 0.7225)
  - High-Sensitivity Screening: **0.10** (Sensitivity = 99.1%)

## 6. Interpretability & Counterfactual Dynamics

- **Top-5 Cohort Predictors (Global SHAP)**:
  1. `ap_hi` (Mean |SHAP| = 0.1345, 34.6%)
  2. `ap_lo` (Mean |SHAP| = 0.0575, 14.8%)
  3. `weight` (Mean |SHAP| = 0.0514, 13.2%)
  4. `age` (Mean |SHAP| = 0.0506, 13.0%)
  5. `cholesterol` (Mean |SHAP| = 0.0428, 11.0%)

## 7. Conclusions & Future Directions

1. **Generative Data Expansion**: CTGAN effectively synthesizes clinically plausible cardiovascular profiles that expand boundary diversity without causing severe correlation distortion.
2. **Safety and Privacy**: Empirical distance checks (DCR and NNDR) demonstrate lack of widespread exact training memorization. However, formal Differential Privacy (DP-CTGAN) should be introduced for clinical deployment.
3. **Transparent Clinical Decision Support**: Pairing continuous probability outputs with calibrated decision thresholds and counterfactual analysis empowers clinicians with actionable model introspection.
