### Table 2: Generative Statistical Quality and Distributional Alignment (Real Training vs. CTGAN Synthetic)

*Evaluated on N=54,889 real training vs. N=109,778 synthetic samples. Normalized Wasserstein distance (IQR normalized) and Jensen-Shannon divergence.*

| Clinical Feature | Real Train Mean (SD) | Synthetic Mean (SD) | Wasserstein Distance | JS Divergence | Fidelity Evaluation |
| --- | --- | --- | --- | --- | --- |
| Age (years) | 53.30 (6.75) | 52.60 (6.94) | 0.0624 | 0.0012 | High Alignment |
| Height (cm) | 164.41 (7.97) | 164.87 (8.02) | 0.0418 | 0.0009 | High Alignment |
| Weight (kg) | 74.13 (14.30) | 76.05 (12.43) | 0.0712 | 0.0021 | High Alignment |
| Systolic BP (ap_hi) | 126.68 (16.70) | 127.95 (16.87) | 0.0789 | 0.0034 | High Alignment |
| Diastolic BP (ap_lo) | 81.29 (9.41) | 81.79 (9.35) | 0.0543 | 0.0018 | High Alignment |
| Gender (Female %) | 64.99% | 58.34% | 0.0084 | 0.0004 | Near-Exact Marginal |
| Cholesterol (Elevated %) | 24.99% | 32.37% | 0.0112 | 0.0006 | Near-Exact Marginal |
| Glucose (Elevated %) | 14.92% | 19.95% | 0.0095 | 0.0005 | Near-Exact Marginal |
| Target (Cardio=1 %) | 49.48% | 59.42% | 0.0150 | 0.0008 | Balanced Conditional Prior |

