### Table 4: Comparative Performance by Machine Learning Model Family (Baseline vs. Augmented)

*Comparison between real-only training (0%) and CTGAN augmented configurations on held-out test data (N=13,723).*

| Model Family | Baseline Ratio | Baseline Recall | Baseline F1 | Baseline ROC-AUC | Optimal Ratio | Augmented Recall | Augmented F1 | Augmented ROC-AUC | Recall Delta |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Logistic Regression | 0% | 66.58% | 70.93% | 0.7959 | 200% | 73.87% | 72.38% | 0.7894 | +7.29% |
| Random Forest | 0% | 69.85% | 70.88% | 0.7758 | 75% | 72.16% | 71.20% | 0.7728 | +2.31% |
| SVM | 0% | 43.68% | 47.81% | 0.5342 | 200% | 74.05% | 58.01% | 0.4428 | +30.37% |
| XGBoost | 0% | 68.39% | 72.09% | 0.8053 | 75% | 70.82% | 72.41% | 0.8001 | +2.43% |

