# HeartAI — Model Architectures & Optimization Documentation

## 1. Machine Learning Classifiers

| Model Family | Scikit-Learn / Library Class | Key Hyperparameters | Rationale & Clinical Properties |
| :--- | :--- | :--- | :--- |
| **Logistic Regression** | `sklearn.linear_model.LogisticRegression` | `C=1.0`, `solver="lbfgs"`, `max_iter=1000` | Highly interpretable, well-calibrated posterior probabilities, linear log-odds coefficients. |
| **Random Forest** | `sklearn.ensemble.RandomForestClassifier` | `n_estimators=100`, `max_depth=12`, `min_samples_split=5` | Non-linear ensemble, robust to outliers, captures feature interactions without overfitting. |
| **Support Vector Classifier (SGD)** | `sklearn.linear_model.SGDClassifier` | `loss="log_loss"`, `alpha=1e-4`, `max_iter=1000` | Large-margin linear optimization suitable for high-throughput batch gradient updates. |
| **XGBoost** | `xgboost.XGBClassifier` | `n_estimators=100`, `max_depth=6`, `learning_rate=0.1` | State-of-the-art gradient boosted decision trees with high discriminative ROC-AUC ($0.8053$). |

---

## 2. Multi-Objective Clinical Selection Formula

Cardiovascular screening in clinical practice prioritizes **minimizing false negatives** (missed diseased patients) while maintaining discriminative power and precision. The optimal model is selected via the composite clinical utility function:

$$\text{Utility Score} = 0.40 \times \text{Recall} + 0.30 \times \text{ROC-AUC} + 0.30 \times \text{F1-Score}$$

---

## 3. Explainable AI (SHAP) Implementation

- **Linear Models (Logistic Regression / SGD)**: Evaluated using `shap.LinearExplainer(model, background_sample)` where `background_sample` is sampled from the scaled training distribution ($N=100$).
- **Tree Ensembles (Random Forest / XGBoost)**: Evaluated using `shap.TreeExplainer(model)` utilizing exact tree-path traversal for local and global feature attribution.
- **Rank Consistency Metric**:
  $$\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}$$
  Where $d_i$ is the rank difference between real-only and augmented feature attributions ($n=11$ clinical biomarkers).
