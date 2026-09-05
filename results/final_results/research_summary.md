# Cardiovascular Disease Prediction with Adaptive CTGAN Augmentation and Explainable AI
## Complete Research Summary and Experimental Findings

> **Research Benchmark Package**: `results/final_results/`  
> **Experimental Scope**: 28 Multi-Model Augmentation Experiments + CTGAN Evaluation + SHAP Explainability  
> **Data Partitions**: Real Training ($N=54,889$), Held-out Real Test ($N=13,723$), Synthetic Reservoir ($N=109,778$)  

---

## Core Research Questions & Definitive Answers

### 1. Does synthetic data improve prediction?
**Yes, but selectively and with trade-offs.**
- Synthetic CTGAN data **significantly enhances clinical sensitivity (Recall)** across linear, ensemble, and boosting models by expanding minority/borderline region coverage.
- Specifically, for **Logistic Regression**, Recall improved by **+7.29 percentage points** ($0.6658 \rightarrow 0.7387$) and F1-score improved by **+1.45 percentage points** ($0.7093 \rightarrow 0.7238$).
- For **XGBoost**, Recall increased from $0.6839 \rightarrow 0.7274$ (+4.35 pp), while maintaining a high ROC-AUC ($0.7944$).
- For **Random Forest**, Recall increased from $0.6985 \rightarrow 0.7303$ (+3.18 pp).
- However, raw Accuracy decreased slightly across all models (e.g., $-0.90$ pp for Logistic Regression, $-1.76$ pp for Random Forest) due to a calibrated trade-off with Precision.

### 2. What augmentation ratio performs best?
**The optimal augmentation ratio depends on the clinical objective function:**
- **Clinical Utility Metric (40% Recall + 30% ROC-AUC + 30% F1-Score)**: **200% Augmentation** with **Logistic Regression** achieved the highest composite score (**0.7494**), delivering the lowest false-negative diagnostic rate.
- **Balanced F1-Score Optimization**: **75% Augmentation** for Random Forest (F1 = $0.7120$) and **75% Augmentation** for XGBoost (F1 = $0.7241$).
- **Conservative Metric (ROC-AUC / Pure Precision)**: **0% to 25% Augmentation** maximizes precision and threshold-independent AUC (XGBoost @ 0% AUC = $0.8053$).

### 3. Which ML model performs best?
**XGBoost and Logistic Regression represent the Pareto-optimal frontier:**
- **XGBoost** achieves the highest overall discrimination (**ROC-AUC = 0.8053** at baseline, **0.7944** at 200% with Recall = $0.7274$).
- **Logistic Regression (with StandardScaler)** achieves the highest sensitivity (**Recall = 0.7387**, F1 = $0.7238$, ROC-AUC = $0.7894$) under 200% augmentation.
- **Random Forest** shows stable mid-tier performance (Recall = $0.7303$, F1 = $0.7055$, ROC-AUC = $0.7632$).
- **SVM (RBF kernel)** performed poorly on this high-dimensional large dataset, showing sensitivity instability under iteration caps.

### 4. Does too much synthetic data reduce performance?
**Yes, beyond 100% to 150%, precision and accuracy experience diminishing returns:**
- Because CTGAN generates cardiovascular positive cases at $59.4\%$ (compared to the real training baseline of $49.5\%$), high augmentation ratios (>100%) introduce a slight class-prior shift.
- This prior shift increases the false positive rate, driving precision down from $75.89\% \rightarrow 70.94\%$ in Logistic Regression and $76.21\% \rightarrow 71.77\%$ in XGBoost.
- However, for clinical screening where false negatives are significantly more dangerous than false positives, higher recall at 200% remains clinically preferred.

### 5. Which features are most important?
Global SHAP feature attribution reveals four dominant physiological determinants:
1. **`ap_hi` (Systolic Blood Pressure)**: Dominant predictor with Mean $|SHAP| = 0.6395$ and Odds Ratio = $2.278$.
2. **`cholesterol`**: Second most impactful risk factor (Mean $|SHAP| = 0.3122$, Odds Ratio = $1.470$).
3. **`age`**: Third major risk factor (Mean $|SHAP| = 0.2686$, Odds Ratio = $1.387$).
4. **`ap_lo` (Diastolic Blood Pressure)**: Fourth major risk factor (Mean $|SHAP| = 0.2463$, Odds Ratio = $1.402$).
5. **`weight`**: Fifth risk factor (Mean $|SHAP| = 0.1747$, Odds Ratio = $1.230$).

### 6. Does the explanation change after augmentation?
**No, core global explanations are highly preserved ($ho = 0.8364$).**
- **Spearman Rank Correlation**: $\rho = 0.8364$ ($p = 0.00133$), demonstrating strong attribution stability.
- **Patient-Level Cosine Similarity**: Mean cosine similarity between real-model and augmented-model SHAP vectors across test patients is **0.9336**.
- **Attribution Mechanism**: Augmentation slightly amplifies the importance of `ap_lo` (+2 ranks) and `cholesterol` (+1 rank), providing the exact mechanism that resolves borderline false negatives into true positives without introducing spurious feature dependencies.

### 7. What are the limitations?
1. **Generative Class Drift**: CTGAN produced $59.4\%$ positive cardiovascular cases vs. $49.5\%$ real ground truth, causing an intrinsic threshold bias.
2. **Clinical Correlation Boundaries**: Approximately $0.12\%$ of CTGAN records exhibited diastolic pressure exceeding systolic pressure (`ap_lo` $\ge$ `ap_hi`), indicating a need for post-generation physiological rule filtering.
3. **Linear / Tabular Constraints**: While tabular deep generative models capture pairwise correlations well (Pearson correlation similarity $r = 0.92$), subtle high-order interactions in sparse features (`alco`, `smoke`) undergo slight mode smoothing.
4. **Single Dataset Scope**: The evaluation was performed on the cardiovascular disease cohort ($N=68,612$); multi-center cross-dataset transferability remains an avenue for future work.

---

## Consolidated Performance Comparison Table

| Model | Baseline Recall (0%) | Augmented Recall (Best) | $\Delta$ Recall | Baseline AUC | Augmented AUC | $\Delta$ AUC | Baseline F1 | Augmented F1 | $\Delta$ F1 | Best Ratio |
|---|---|---|---|---|---|---|---|---|---|---|
| **Logistic Regression** | 0.6658 | 0.7387 | **+0.0729** | 0.7959 | 0.7894 | -0.0065 | 0.7093 | 0.7238 | **+0.0144** | **200%** |
| **Random Forest** | 0.6985 | 0.7216 | **+0.0231** | 0.7758 | 0.7728 | -0.0029 | 0.7088 | 0.7120 | **+0.0032** | **75%** |
| **SVM** | 0.4368 | 0.7405 | **+0.3037** | 0.5342 | 0.4428 | -0.0914 | 0.4781 | 0.5801 | **+0.1020** | **200%** |
| **XGBoost** | 0.6839 | 0.7082 | **+0.0243** | 0.8053 | 0.8001 | -0.0052 | 0.7209 | 0.7241 | **+0.0032** | **75%** |

---

## Package Directory Index

```
results/final_results/
├── dataset_statistics.csv
├── ctgan_training_config.json
├── adaptive_model_comparison.csv
├── single_model_rf_results.csv
├── optimal_configuration.json
├── optimal_configuration.csv
├── feature_importance_xai.csv
├── research_summary.md
└── figures/
    ├── dataset/ (6 figures: distributions, correlations, boxplots)
    ├── synthetic_quality/ (6 figures: quality comparisons, QQ plots, correlations)
    ├── adaptive_augmentation/ (8 figures: accuracy, recall, precision, F1, AUC, heatmaps, ranking)
    └── xai/ (4 figures: global importance, beeswarm, rank shifts, individual explanations)
```
