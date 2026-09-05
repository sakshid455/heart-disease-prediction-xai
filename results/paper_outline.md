# Manuscript Structure: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction

**Target Venue**: IEEE Transactions on Biomedical Engineering / Nature Digital Medicine / Computers in Biology and Medicine  
**Working Title**: *Adaptive Conditional Generative Tabular Augmentation for Robust and Explainable Cardiovascular Risk Stratification*  
**Date**: 2026-09-05

---

## Abstract
- **Background**: Tabular electronic health records frequently suffer from class imbalance, small sample sizes, and privacy restrictions.
- **Method**: We propose an adaptive augmentation pipeline leveraging Conditional Tabular GANs (CTGAN) across four model families (Logistic Regression, Random Forest, Support Vector Machines, XGBoost) systematically tested from 0% to 200% augmentation ratios.
- **Validation**: Strict leakage prevention, empirical privacy guarantees (Distance to Closest Record and Nearest Neighbor Distance Ratio), 1,000-iteration bootstrap percentile confidence intervals, probability calibration (Brier Score, Expected Calibration Error), and optimal decision threshold sweeps.
- **Explainability**: Integrated TreeSHAP cohort feature attribution and constrained counterfactual sensitivity analysis.
- **Results**: CTGAN augmentation at optimal ratios yields statistically significant improvements in sensitivity (recall) while preserving predictive calibration and patient privacy boundaries.

---

## 1. Introduction
- Global burden of cardiovascular diseases (CVD).
- Limitations of traditional SMOTE/oversampling techniques on heterogeneous continuous/discrete tabular clinical variables.
- Contributions of this work:
  1. Rigorous data isolation auditing proving zero test set contamination.
  2. Multi-model empirical grid revealing differential model sensitivity to synthetic manifold density.
  3. Empirical privacy quantification confirming that generative models avoid training data memorization.
  4. Probabilistic calibration and Youden's J threshold optimization for clinically aligned operating points.
  5. Actionable model-level counterfactual explanations within bounded physiological ranges.

---

## 2. Related Work
- Synthetic tabular data generation in healthcare (CTGAN, TVAE, MedGAN).
- Machine learning benchmarks for cardiovascular disease detection.
- Explainable Artificial Intelligence (SHAP, LIME, Counterfactuals) in medicine.
- Calibration and threshold optimization under class imbalance.

---

## 3. Methodology & Mathematical Formulation

### 3.1 Conditional Tabular GAN (CTGAN)
Generative adversarial formulation with conditional vector representation $c = \text{vec}(D_1, \dots, D_N)$ and mode-specific continuous normalization via Variational Gaussian Mixture Models (VGM).

$$\min_G \max_D V(D, G) = \mathbb{E}_{x \sim p_{data}}[\log D(x)] + \mathbb{E}_{z \sim p_z, c \sim p_c}[\log(1 - D(G(z, c)))]$$

### 3.2 Empirical Privacy Verification
Distance to Closest Record (DCR) and Nearest Neighbor Distance Ratio (NNDR):

$$d_{min}(s, \mathcal{D}_{train}) = \min_{x \in \mathcal{D}_{train}} \|s - x\|_2$$

$$\text{NNDR}(s) = \frac{d(s, x^{(1)})}{d(s, x^{(2)})}$$

### 3.3 Bootstrap Confidence Bounds
Given test sample $\mathcal{D}_{test}$ of size $N$, compute $B = 1000$ non-parametric resamples with replacement $\mathcal{D}^{*(b)}$:

$$\theta^{*(b)} = f(\mathcal{D}^{*(b)}), \quad \text{CI}_{95\%} = [\theta^{*}_{(\alpha/2)}, \theta^{*}_{(1 - \alpha/2)}]$$

### 3.4 Model Probability Calibration
Expected Calibration Error (ECE) across $M = 10$ probability bins:

$$\text{ECE} = \sum_{m=1}^M \frac{|B_m|}{N} |\text{acc}(B_m) - \text{conf}(B_m)|$$

$$\text{Brier Score} = \frac{1}{N} \sum_{i=1}^N (p_i - y_i)^2$$

### 3.5 Decision Threshold Optimization
Youden's J statistic maximization for screening sensitivity/specificity trade-off:

$$J(\tau) = \text{Sensitivity}(\tau) + \text{Specificity}(\tau) - 1$$

### 3.6 Constrained Counterfactual Perturbation
For patient $x$ with $P(y=1|x) > 0.5$, find minimal perturbation $\delta$:

$$\min_\delta \left(P(y=1|x + \delta) - P_{target}\right)^2 + \lambda \sum_{j \in \mathcal{M}} \frac{|\delta_j|}{\text{range}(f_j)}$$

subject to:
- $l_j \le x_j + \delta_j \le u_j$ (physiological bounds)
- $\delta_k = 0$ for immutable features $k \in \mathcal{I}$ (e.g. age, biological sex)

---

## 4. Experimental Results
- Data quality baseline and zero data leakage verification.
- Synthetic distribution fidelity (Wasserstein metrics and correlation matrix Frobenius norms).
- Augmentation grid comparison: baseline (0%) vs optimal augmentation across LR, RF, SVM, XGBoost.
- Statistical significance (paired t-test, Wilcoxon signed-rank test, Cohen's d).
- 1,000-sample bootstrap validation of recall gains.
- Reliability diagrams & Expected Calibration Error before and after augmentation.
- Decision threshold sweep curves and clinical screening configurations.
- Cohort TreeSHAP attribution and individualized counterfactual recourse.

---

## 5. Discussion & Ethical Considerations
- Clinical safety disclaimer: computational experimentation vs. prospective clinical trials.
- Limitations of current tabular generative models under extreme outliers.
- Future work: multi-center federated synthetic augmentation and Differential Privacy (DP-CTGAN).

---

## 6. References
1. Xu, L., et al. (2019). Modeling Tabular data using Conditional GAN. *NeurIPS 2019*.
2. Lundberg, S. M., & Lee, S. I. (2017). A unified approach to interpreting model predictions. *NeurIPS 2017*.
3. Guo, C., et al. (2017). On calibration of modern neural networks. *ICML 2017*.
4. Wachter, S., et al. (2017). Counterfactual explanations without opening the black box. *Harvard JL & Tech*.
