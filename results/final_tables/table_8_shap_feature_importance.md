### Table 8: Global SHAP Feature Importance, Rank Stability, and Directional Consistency

*Evaluated across N=2,000 real test patients comparing real-only (0%) and augmented (200%) models. Spearman rank correlation rho = +0.8455.*

| Clinical Biomarker | Augmented Rank | Real-Only Rank | Real |SHAP| | Augmented |SHAP| | Real Weight (Beta) | Augmented Weight (Beta) | Directional Match |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ap_hi | 1 | 1 | 0.7651 | 0.6648 | 0.9419 | 0.8232 | Identical (+) |
| cholesterol | 2 | 3 | 0.2782 | 0.2933 | 0.3351 | 0.3851 | Identical (+) |
| age | 3 | 2 | 0.2867 | 0.2742 | 0.3398 | 0.3272 | Identical (+) |
| ap_lo | 4 | 6 | 0.0654 | 0.2409 | 0.0953 | 0.3378 | Identical (+) |
| weight | 5 | 4 | 0.1275 | 0.1778 | 0.1686 | 0.2071 | Identical (+) |
| active | 6 | 5 | 0.0727 | 0.1145 | -0.0920 | -0.1362 | Identical (+) |
| gender | 7 | 11 | 0.0086 | 0.0580 | -0.0093 | 0.0588 | Shifted |
| height | 8 | 8 | 0.0254 | 0.0504 | -0.0326 | 0.0654 | Shifted |
| smoke | 9 | 9 | 0.0241 | 0.0288 | -0.0423 | -0.0489 | Identical (+) |
| gluc | 10 | 7 | 0.0634 | 0.0271 | -0.0800 | 0.0421 | Shifted |
| alco | 11 | 10 | 0.0193 | 0.0166 | -0.0479 | 0.0422 | Shifted |

