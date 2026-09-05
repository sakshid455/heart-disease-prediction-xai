# Table_E2: Experimental Pipeline Setup & Hyperparameter Specifications

**Source Reference**: `configs/experiment_config.json`  
**Data Integrity**: Authoritative Validated Frozen Results  

---

| Pipeline Component | Specification | Sample Size | Hardware / Seed |
| --- | --- | --- | ---|
| Dataset Partitioning | Stratified 80/20 train/test quarantine split | 54,889 train / 13,723 test | Random State = 42 |
| CTGAN Synthesis Architecture | 2-layer Generator (256x256), 2-layer Discriminator (256x256) | 109,778 synthetic records (200% capacity) | PAC=10, Batch=500, LR=2e-4 |
| Adaptive Augmentation Ratios | 0%, 25%, 50%, 75%, 100%, 150%, 200% | 54,889 to 164,667 training samples | Strict test isolation |
| Model Families | Logistic Regression, Random Forest, SGD-SVM, XGBoost | 4 classifier families x 7 ratios = 28 runs | Scikit-Learn 1.2+ / XGBoost 1.7+ |
| Multi-Seed Robustness Protocol | 5 independent random seeds [42, 52, 62, 72, 82] | 140 total benchmark executions | 95% Student-t Confidence Intervals |
| XAI Attribution Engine | Linear & Tree SHAP (SHapley Additive exPlanations) | 2,000 held-out test patients | Spearman & Pearson correlation audits |
