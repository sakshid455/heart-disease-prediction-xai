### Table 5: Finalized Optimal Deployment Configuration and Multi-Objective Criteria

*Formalized optimal configuration selected for clinical screening deployment.*

| Parameter / Attribute | Selected Configuration | Clinical & Technical Rationale |
| --- | --- | --- |
| Optimal Model Architecture | Logistic Regression | High sensitivity, calibrated log-odds, transparent clinical explainability. |
| Optimal Augmentation Ratio | 200% | Maximizes clinical true positive detection while preserving harmonic F1-score. |
| Real Training Cohort Size | 54,889 | 80% partition of master cleaned dataset. |
| Synthetic Training Cohort Size | 109,778 | Generated via CTGAN (pac=10, batch=500, lr=2e-4). |
| Total Effective Training Volume | 164,667 | Combined real + synthetic training space. |
| Quarantined Test Set Size | 13,723 | Held-out real patient records (Zero generative or scaling contamination). |
| Clinical Sensitivity (Recall) | 73.87% | +7.29 percentage points gain over real-only baseline (66.58%). |
| Harmonic F1-Score | 72.38% | +1.45 percentage points gain over real-only baseline (70.93%). |
| ROC-AUC Discrimination | 0.7894 | High discriminative power across varying decision thresholds. |
| Selection Objective Formula | 0.40 Recall + 0.30 ROC-AUC + 0.30 F1 | Prioritizes false negative reduction in cardiovascular screening. |

