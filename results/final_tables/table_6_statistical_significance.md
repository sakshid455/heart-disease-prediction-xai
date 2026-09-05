### Table 6: Paired Statistical Hypothesis Testing and Multiple Comparison Corrections

*Two-tailed paired t-tests (df=4, N=5 seeds) with Benjamini-Hochberg False Discovery Rate (FDR q<0.05) corrections.*

| Model | Comparison | Metric | Mean Difference | t-statistic | Raw p-value | FDR Adjusted p-value | Cohen's d_z | Significant (q<0.05) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Logistic Regression | 0% vs 50% | recall | -0.00648 | -0.212 | 0.84248 | 0.84907 | -0.0948 | False |
| Logistic Regression | 0% vs 100% | recall | -0.011635 | -0.2148 | 0.840456 | 0.84907 | -0.096 | False |
| Logistic Regression | 0% vs 200% | recall | -0.018586 | -0.203 | 0.84907 | 0.84907 | -0.0908 | False |
| Logistic Regression | 0% vs 50% | f1_score | -0.010842 | -0.8118 | 0.462467 | 0.652895 | -0.363 | False |
| Logistic Regression | 0% vs 100% | f1_score | -0.025746 | -1.0821 | 0.340098 | 0.544157 | -0.4839 | False |
| Logistic Regression | 0% vs 200% | f1_score | -0.056436 | -1.3366 | 0.252321 | 0.465823 | -0.5977 | False |
| Logistic Regression | 0% vs 50% | roc_auc | -0.009127 | -3.5586 | 0.023615 | 0.080966 | -1.5915 | False |
| Logistic Regression | 0% vs 100% | roc_auc | -0.015872 | -3.8811 | 0.017825 | 0.080966 | -1.7357 | False |
| Logistic Regression | 0% vs 200% | roc_auc | -0.028393 | -3.7356 | 0.020198 | 0.080966 | -1.6706 | False |
| Logistic Regression | 0% vs 50% | accuracy | -0.009532 | -2.0584 | 0.108654 | 0.237063 | -0.9205 | False |
| Logistic Regression | 0% vs 100% | accuracy | -0.022925 | -3.1405 | 0.03483 | 0.096891 | -1.4045 | False |
| Logistic Regression | 0% vs 200% | accuracy | -0.049916 | -3.8015 | 0.01908 | 0.080966 | -1.7001 | False |
| XGBoost | 0% vs 50% | recall | 0.006804 | 0.632 | 0.561712 | 0.748949 | 0.2826 | False |
| XGBoost | 0% vs 100% | recall | 0.011635 | 0.6727 | 0.538021 | 0.748949 | 0.3008 | False |
| XGBoost | 0% vs 200% | recall | 0.012607 | 0.4514 | 0.675067 | 0.81008 | 0.2019 | False |
| XGBoost | 0% vs 50% | f1_score | -0.000459 | -0.1418 | 0.89406 | 0.932932 | -0.0634 | False |
| XGBoost | 0% vs 100% | f1_score | -0.001821 | -0.3546 | 0.740802 | 0.846631 | -0.1586 | False |
| XGBoost | 0% vs 200% | f1_score | -0.00752 | -0.8814 | 0.427891 | 0.748949 | -0.3942 | False |
| XGBoost | 0% vs 50% | roc_auc | -0.00349 | -15.6692 | 9.7e-05 | 0.000466 | -7.0075 | True |
| XGBoost | 0% vs 100% | roc_auc | -0.006253 | -16.0336 | 8.8e-05 | 0.000466 | -7.1705 | True |
| XGBoost | 0% vs 200% | roc_auc | -0.010505 | -14.4664 | 0.000133 | 0.000532 | -6.4696 | True |
| XGBoost | 0% vs 50% | accuracy | -0.002944 | -9.1112 | 0.000805 | 0.002415 | -4.0746 | True |
| XGBoost | 0% vs 100% | accuracy | -0.006281 | -18.5275 | 5e-05 | 0.000466 | -8.2858 | True |
| XGBoost | 0% vs 200% | accuracy | -0.013466 | -16.4825 | 7.9e-05 | 0.000466 | -7.3712 | True |

