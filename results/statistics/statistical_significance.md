# Formal Statistical Significance Analysis Report

Paired hypothesis testing comparing baseline (0% Augmentation) against augmented models across repeated seeds.
Alpha significance threshold: $\alpha = 0.05$.

| Model | Aug Ratio | Metric | Baseline Mean | Aug Mean | Mean Diff | 95% CI | p-value (t-test) | Cohen's d | Conclusion |
|---|---|---|---|---|---|---|---|---|---|
| Logistic Regression | 25.0% | recall | 0.6667 | 0.6631 | -0.0036 | [-0.0498, 0.0426] | 0.8396 | -0.10 (Negligible) | Neutral / No Difference |
| Logistic Regression | 25.0% | f1_score | 0.7082 | 0.7034 | -0.0048 | [-0.0250, 0.0153] | 0.5418 | -0.30 (Small) | Neutral / No Difference |
| Logistic Regression | 25.0% | roc_auc | 0.7918 | 0.7869 | -0.0049 | [-0.0093, -0.0005] | **0.0363** | -1.38 (Large) | Inferior |
| Logistic Regression | 25.0% | accuracy | 0.7282 | 0.7240 | -0.0042 | [-0.0119, 0.0034] | 0.1988 | -0.69 (Medium) | Neutral / No Difference |
| Logistic Regression | 50.0% | recall | 0.6667 | 0.6602 | -0.0065 | [-0.0914, 0.0784] | 0.8425 | -0.09 (Negligible) | Neutral / No Difference |
| Logistic Regression | 50.0% | f1_score | 0.7082 | 0.6974 | -0.0108 | [-0.0479, 0.0262] | 0.4625 | -0.36 (Small) | Neutral / No Difference |
| Logistic Regression | 50.0% | roc_auc | 0.7918 | 0.7827 | -0.0091 | [-0.0162, -0.0020] | **0.0236** | -1.59 (Large) | Inferior |
| Logistic Regression | 50.0% | accuracy | 0.7282 | 0.7187 | -0.0095 | [-0.0224, 0.0033] | 0.1087 | -0.92 (Large) | Neutral / No Difference |
| Logistic Regression | 75.0% | recall | 0.6667 | 0.6573 | -0.0095 | [-0.1285, 0.1096] | 0.8362 | -0.10 (Negligible) | Neutral / No Difference |
| Logistic Regression | 75.0% | f1_score | 0.7082 | 0.6899 | -0.0183 | [-0.0700, 0.0333] | 0.3804 | -0.44 (Small) | Neutral / No Difference |
| Logistic Regression | 75.0% | roc_auc | 0.7918 | 0.7791 | -0.0127 | [-0.0219, -0.0035] | **0.0188** | -1.71 (Large) | Inferior |
| Logistic Regression | 75.0% | accuracy | 0.7282 | 0.7119 | -0.0163 | [-0.0320, -0.0006] | **0.0452** | -1.29 (Large) | Inferior |
| Logistic Regression | 100.0% | recall | 0.6667 | 0.6551 | -0.0116 | [-0.1620, 0.1388] | 0.8405 | -0.10 (Negligible) | Neutral / No Difference |
| Logistic Regression | 100.0% | f1_score | 0.7082 | 0.6825 | -0.0257 | [-0.0918, 0.0403] | 0.3401 | -0.48 (Small) | Neutral / No Difference |
| Logistic Regression | 100.0% | roc_auc | 0.7918 | 0.7760 | -0.0159 | [-0.0272, -0.0045] | **0.0178** | -1.74 (Large) | Inferior |
| Logistic Regression | 100.0% | accuracy | 0.7282 | 0.7053 | -0.0229 | [-0.0432, -0.0027] | **0.0348** | -1.40 (Large) | Inferior |
| Logistic Regression | 150.0% | recall | 0.6667 | 0.6509 | -0.0158 | [-0.2235, 0.1918] | 0.8426 | -0.09 (Negligible) | Neutral / No Difference |
| Logistic Regression | 150.0% | f1_score | 0.7082 | 0.6665 | -0.0418 | [-0.1357, 0.0522] | 0.2845 | -0.55 (Medium) | Neutral / No Difference |
| Logistic Regression | 150.0% | roc_auc | 0.7918 | 0.7699 | -0.0219 | [-0.0376, -0.0063] | **0.0176** | -1.74 (Large) | Inferior |
| Logistic Regression | 150.0% | accuracy | 0.7282 | 0.6912 | -0.0370 | [-0.0657, -0.0083] | **0.0231** | -1.60 (Large) | Inferior |
| Logistic Regression | 200.0% | recall | 0.6667 | 0.6481 | -0.0186 | [-0.2728, 0.2357] | 0.8491 | -0.09 (Negligible) | Neutral / No Difference |
| Logistic Regression | 200.0% | f1_score | 0.7082 | 0.6518 | -0.0564 | [-0.1737, 0.0608] | 0.2523 | -0.60 (Medium) | Neutral / No Difference |
| Logistic Regression | 200.0% | roc_auc | 0.7918 | 0.7634 | -0.0284 | [-0.0495, -0.0073] | **0.0202** | -1.67 (Large) | Inferior |
| Logistic Regression | 200.0% | accuracy | 0.7282 | 0.6783 | -0.0499 | [-0.0864, -0.0135] | **0.0191** | -1.70 (Large) | Inferior |
| Random Forest | 25.0% | recall | 0.6808 | 0.6885 | +0.0077 | [-0.0219, 0.0373] | 0.5088 | 0.32 (Small) | Neutral / No Difference |
| Random Forest | 25.0% | f1_score | 0.7181 | 0.7187 | +0.0006 | [-0.0104, 0.0115] | 0.8912 | 0.07 (Negligible) | Neutral / No Difference |
| Random Forest | 25.0% | roc_auc | 0.8009 | 0.7984 | -0.0025 | [-0.0034, -0.0016] | **0.0015** | -3.49 (Large) | Inferior |
| Random Forest | 25.0% | accuracy | 0.7355 | 0.7335 | -0.0020 | [-0.0050, 0.0011] | 0.1463 | -0.80 (Large) | Neutral / No Difference |
| Random Forest | 50.0% | recall | 0.6808 | 0.6896 | +0.0088 | [-0.0408, 0.0584] | 0.6489 | 0.22 (Small) | Neutral / No Difference |
| Random Forest | 50.0% | f1_score | 0.7181 | 0.7173 | -0.0007 | [-0.0183, 0.0168] | 0.9129 | -0.05 (Negligible) | Neutral / No Difference |
| Random Forest | 50.0% | roc_auc | 0.8009 | 0.7966 | -0.0043 | [-0.0053, -0.0033] | **0.0003** | -5.21 (Large) | Inferior |
| Random Forest | 50.0% | accuracy | 0.7355 | 0.7318 | -0.0037 | [-0.0075, 0.0001] | 0.0556 | -1.20 (Large) | Neutral / No Difference |
| Random Forest | 75.0% | recall | 0.6808 | 0.6892 | +0.0084 | [-0.0569, 0.0738] | 0.7385 | 0.16 (Negligible) | Neutral / No Difference |
| Random Forest | 75.0% | f1_score | 0.7181 | 0.7138 | -0.0043 | [-0.0278, 0.0193] | 0.6403 | -0.23 (Small) | Neutral / No Difference |
| Random Forest | 75.0% | roc_auc | 0.8009 | 0.7946 | -0.0063 | [-0.0082, -0.0045] | **0.0007** | -4.23 (Large) | Inferior |
| Random Forest | 75.0% | accuracy | 0.7355 | 0.7277 | -0.0078 | [-0.0131, -0.0025] | **0.0154** | -1.81 (Large) | Inferior |
| Random Forest | 100.0% | recall | 0.6808 | 0.6885 | +0.0077 | [-0.0703, 0.0857] | 0.7987 | 0.12 (Negligible) | Neutral / No Difference |
| Random Forest | 100.0% | f1_score | 0.7181 | 0.7113 | -0.0067 | [-0.0354, 0.0220] | 0.5504 | -0.29 (Small) | Neutral / No Difference |
| Random Forest | 100.0% | roc_auc | 0.8009 | 0.7929 | -0.0081 | [-0.0099, -0.0062] | **0.0003** | -5.41 (Large) | Inferior |
| Random Forest | 100.0% | accuracy | 0.7355 | 0.7252 | -0.0103 | [-0.0174, -0.0032] | **0.0157** | -1.80 (Large) | Inferior |
| Random Forest | 150.0% | recall | 0.6808 | 0.6872 | +0.0064 | [-0.0992, 0.1121] | 0.8742 | 0.08 (Negligible) | Neutral / No Difference |
| Random Forest | 150.0% | f1_score | 0.7181 | 0.7052 | -0.0129 | [-0.0508, 0.0250] | 0.3981 | -0.42 (Small) | Neutral / No Difference |
| Random Forest | 150.0% | roc_auc | 0.8009 | 0.7897 | -0.0112 | [-0.0140, -0.0083] | **0.0004** | -4.88 (Large) | Inferior |
| Random Forest | 150.0% | accuracy | 0.7355 | 0.7187 | -0.0168 | [-0.0245, -0.0091] | **0.0037** | -2.72 (Large) | Inferior |
| Random Forest | 200.0% | recall | 0.6808 | 0.6875 | +0.0067 | [-0.1162, 0.1296] | 0.8872 | 0.07 (Negligible) | Neutral / No Difference |
| Random Forest | 200.0% | f1_score | 0.7181 | 0.7010 | -0.0171 | [-0.0616, 0.0274] | 0.3456 | -0.48 (Small) | Neutral / No Difference |
| Random Forest | 200.0% | roc_auc | 0.8009 | 0.7868 | -0.0142 | [-0.0183, -0.0100] | **0.0007** | -4.21 (Large) | Inferior |
| Random Forest | 200.0% | accuracy | 0.7355 | 0.7138 | -0.0217 | [-0.0308, -0.0125] | **0.0028** | -2.93 (Large) | Inferior |
| SVM | 25.0% | recall | 0.6726 | 0.6549 | -0.0178 | [-0.1025, 0.0670] | 0.5917 | -0.26 (Small) | Neutral / No Difference |
| SVM | 25.0% | f1_score | 0.7085 | 0.6962 | -0.0123 | [-0.0492, 0.0246] | 0.4079 | -0.41 (Small) | Neutral / No Difference |
| SVM | 25.0% | roc_auc | 0.7886 | 0.7826 | -0.0060 | [-0.0163, 0.0043] | 0.1796 | -0.73 (Medium) | Neutral / No Difference |
| SVM | 25.0% | accuracy | 0.7262 | 0.7186 | -0.0077 | [-0.0218, 0.0064] | 0.2042 | -0.68 (Medium) | Neutral / No Difference |
| SVM | 50.0% | recall | 0.6726 | 0.6620 | -0.0106 | [-0.1503, 0.1291] | 0.8434 | -0.09 (Negligible) | Neutral / No Difference |
| SVM | 50.0% | f1_score | 0.7085 | 0.6900 | -0.0184 | [-0.0736, 0.0367] | 0.4059 | -0.41 (Small) | Neutral / No Difference |
| SVM | 50.0% | roc_auc | 0.7886 | 0.7782 | -0.0104 | [-0.0198, -0.0010] | **0.0373** | -1.37 (Large) | Inferior |
| SVM | 50.0% | accuracy | 0.7262 | 0.7101 | -0.0161 | [-0.0328, 0.0006] | 0.0553 | -1.20 (Large) | Neutral / No Difference |
| SVM | 75.0% | recall | 0.6726 | 0.6313 | -0.0413 | [-0.2021, 0.1195] | 0.5150 | -0.32 (Small) | Neutral / No Difference |
| SVM | 75.0% | f1_score | 0.7085 | 0.6716 | -0.0369 | [-0.1102, 0.0363] | 0.2339 | -0.63 (Medium) | Neutral / No Difference |
| SVM | 75.0% | roc_auc | 0.7886 | 0.7741 | -0.0145 | [-0.0266, -0.0023] | **0.0297** | -1.48 (Large) | Inferior |
| SVM | 75.0% | accuracy | 0.7262 | 0.7013 | -0.0250 | [-0.0489, -0.0011] | **0.0439** | -1.30 (Large) | Inferior |
| SVM | 100.0% | recall | 0.6726 | 0.6408 | -0.0318 | [-0.1959, 0.1322] | 0.6185 | -0.24 (Small) | Neutral / No Difference |
| SVM | 100.0% | f1_score | 0.7085 | 0.6700 | -0.0385 | [-0.1194, 0.0423] | 0.2563 | -0.59 (Medium) | Neutral / No Difference |
| SVM | 100.0% | roc_auc | 0.7886 | 0.7675 | -0.0211 | [-0.0388, -0.0034] | **0.0294** | -1.48 (Large) | Inferior |
| SVM | 100.0% | accuracy | 0.7262 | 0.6953 | -0.0309 | [-0.0610, -0.0008] | **0.0463** | -1.28 (Large) | Inferior |
| SVM | 150.0% | recall | 0.6726 | 0.6414 | -0.0313 | [-0.2823, 0.2197] | 0.7468 | -0.15 (Negligible) | Neutral / No Difference |
| SVM | 150.0% | f1_score | 0.7085 | 0.6489 | -0.0596 | [-0.1799, 0.0606] | 0.2407 | -0.62 (Medium) | Neutral / No Difference |
| SVM | 150.0% | roc_auc | 0.7886 | 0.7544 | -0.0342 | [-0.0708, 0.0024] | 0.0603 | -1.16 (Large) | Neutral / No Difference |
| SVM | 150.0% | accuracy | 0.7262 | 0.6745 | -0.0517 | [-0.0991, -0.0044] | **0.0387** | -1.36 (Large) | Inferior |
| SVM | 200.0% | recall | 0.6726 | 0.6852 | +0.0125 | [-0.2389, 0.2639] | 0.8965 | 0.06 (Negligible) | Neutral / No Difference |
| SVM | 200.0% | f1_score | 0.7085 | 0.6634 | -0.0451 | [-0.1376, 0.0474] | 0.2473 | -0.61 (Medium) | Neutral / No Difference |
| SVM | 200.0% | roc_auc | 0.7886 | 0.7570 | -0.0316 | [-0.0548, -0.0085] | **0.0192** | -1.70 (Large) | Inferior |
| SVM | 200.0% | accuracy | 0.7262 | 0.6712 | -0.0550 | [-0.0873, -0.0227] | **0.0091** | -2.11 (Large) | Inferior |
| XGBoost | 25.0% | recall | 0.6882 | 0.6932 | +0.0050 | [-0.0148, 0.0249] | 0.5203 | 0.31 (Small) | Neutral / No Difference |
| XGBoost | 25.0% | f1_score | 0.7201 | 0.7202 | +0.0002 | [-0.0058, 0.0062] | 0.9348 | 0.04 (Negligible) | Neutral / No Difference |
| XGBoost | 25.0% | roc_auc | 0.8010 | 0.7992 | -0.0018 | [-0.0028, -0.0008] | **0.0078** | -2.21 (Large) | Inferior |
| XGBoost | 25.0% | accuracy | 0.7352 | 0.7337 | -0.0015 | [-0.0028, -0.0003] | **0.0249** | -1.57 (Large) | Inferior |
| XGBoost | 50.0% | recall | 0.6882 | 0.6950 | +0.0068 | [-0.0231, 0.0367] | 0.5617 | 0.28 (Small) | Neutral / No Difference |
| XGBoost | 50.0% | f1_score | 0.7201 | 0.7196 | -0.0005 | [-0.0094, 0.0085] | 0.8941 | -0.06 (Negligible) | Neutral / No Difference |
| XGBoost | 50.0% | roc_auc | 0.8010 | 0.7975 | -0.0035 | [-0.0041, -0.0029] | **0.0001** | -7.01 (Large) | Inferior |
| XGBoost | 50.0% | accuracy | 0.7352 | 0.7323 | -0.0029 | [-0.0038, -0.0020] | **0.0008** | -4.07 (Large) | Inferior |
| XGBoost | 75.0% | recall | 0.6882 | 0.6981 | +0.0099 | [-0.0316, 0.0514] | 0.5439 | 0.30 (Small) | Neutral / No Difference |
| XGBoost | 75.0% | f1_score | 0.7201 | 0.7189 | -0.0012 | [-0.0143, 0.0120] | 0.8174 | -0.11 (Negligible) | Neutral / No Difference |
| XGBoost | 75.0% | roc_auc | 0.8010 | 0.7962 | -0.0048 | [-0.0056, -0.0040] | **0.0001** | -7.15 (Large) | Inferior |
| XGBoost | 75.0% | accuracy | 0.7352 | 0.7304 | -0.0049 | [-0.0067, -0.0031] | **0.0017** | -3.34 (Large) | Inferior |
| XGBoost | 100.0% | recall | 0.6882 | 0.6998 | +0.0116 | [-0.0364, 0.0597] | 0.5380 | 0.30 (Small) | Neutral / No Difference |
| XGBoost | 100.0% | f1_score | 0.7201 | 0.7182 | -0.0018 | [-0.0161, 0.0124] | 0.7408 | -0.16 (Negligible) | Neutral / No Difference |
| XGBoost | 100.0% | roc_auc | 0.8010 | 0.7948 | -0.0063 | [-0.0073, -0.0052] | **0.0001** | -7.17 (Large) | Inferior |
| XGBoost | 100.0% | accuracy | 0.7352 | 0.7290 | -0.0063 | [-0.0072, -0.0053] | **0.0001** | -8.29 (Large) | Inferior |
| XGBoost | 150.0% | recall | 0.6882 | 0.6996 | +0.0114 | [-0.0536, 0.0763] | 0.6525 | 0.22 (Small) | Neutral / No Difference |
| XGBoost | 150.0% | f1_score | 0.7201 | 0.7145 | -0.0055 | [-0.0257, 0.0147] | 0.4905 | -0.34 (Small) | Neutral / No Difference |
| XGBoost | 150.0% | roc_auc | 0.8010 | 0.7925 | -0.0085 | [-0.0103, -0.0066] | **0.0002** | -5.58 (Large) | Inferior |
| XGBoost | 150.0% | accuracy | 0.7352 | 0.7246 | -0.0107 | [-0.0140, -0.0073] | **0.0009** | -3.94 (Large) | Inferior |
| XGBoost | 200.0% | recall | 0.6882 | 0.7008 | +0.0126 | [-0.0649, 0.0901] | 0.6751 | 0.20 (Small) | Neutral / No Difference |
| XGBoost | 200.0% | f1_score | 0.7201 | 0.7125 | -0.0075 | [-0.0312, 0.0162] | 0.4279 | -0.39 (Small) | Neutral / No Difference |
| XGBoost | 200.0% | roc_auc | 0.8010 | 0.7905 | -0.0105 | [-0.0125, -0.0085] | **0.0001** | -6.47 (Large) | Inferior |
| XGBoost | 200.0% | accuracy | 0.7352 | 0.7218 | -0.0135 | [-0.0157, -0.0112] | **0.0001** | -7.37 (Large) | Inferior |
