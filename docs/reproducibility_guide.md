# HeartAI — Scientific Reproducibility Guide & Audit

This guide provides end-to-end instructions for completely reproducing all research experiments, models, tables, and figures in the **HeartAI** project.

---

## 1. System Requirements & Environment Setup

### Hardware Specifications Tested
- **CPU**: x86_64 Multi-Core (4+ cores recommended)
- **RAM**: 16 GB+ recommended
- **OS**: Windows 10/11, Ubuntu Linux 20.04+, or macOS 12+

### Step 1: Clone Repository & Create Environment

```bash
# Clone repository
git clone https://github.com/sakshid455/heart-disease-prediction-xai.git
cd heart-disease-prediction-xai

# Option A: Conda environment (Recommended)
conda env create -f environment.yml
conda activate heartai

# Option B: Python venv & pip
python -m venv venv
# Activate on Windows:
venv\Scripts\activate
# Activate on Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

---

## 2. Master Single-Command Reproduction

To execute the entire end-to-end scientific pipeline:

```bash
python run_final_experiment.py
```

This single master script will autonomously:
1. **Validate Dataset Integrity**: Verifies sample counts, types, and absence of missing values.
2. **Execute Strict Quarantine Split**: Partitions $N=68,612$ cohort into 80% train ($N=54,889$) and 20% test ($N=13,723$).
3. **Train CTGAN Generative Model**: Trains CTGAN on training data with pac size $10$, batch size $500$, and learning rate $2 \times 10^{-4}$.
4. **Generate Synthetic Cohort**: Produces 200% synthetic dataset ($N=109,778$) with post-hoc physiological boundary clipping.
5. **Evaluate Generative Statistical Quality**: Calculates normalized Wasserstein distances, Jensen-Shannon divergences, and pairwise correlation difference matrices.
6. **Execute Adaptive Augmentation Matrix**: Trains 4 ML classifiers across 7 scaling levels (0%, 25%, 50%, 75%, 100%, 150%, 200%).
7. **Select Optimal Deployment Configuration**: Applies multi-objective clinical utility function ($0.40 \times \text{Recall} + 0.30 \times \text{AUC} + 0.30 \times \text{F1}$).
8. **Audit Explainable AI (SHAP) Fidelity**: Computes Spearman rank correlation ($\rho$), Pearson correlation ($r$), and patient-level cosine similarities.
9. **Execute Multi-Seed Robustness & Hypothesis Testing**: Evaluates 140 benchmark runs across 5 random seeds (`[42, 52, 62, 72, 82]`) with paired $t$-tests and Benjamini-Hochberg FDR adjustments.
10. **Assess Empirical Privacy & Demographic Fairness**: Evaluates DCR/NNDR distributions and subgroup error rates across Sex and Age demographics.
11. **Generate All 10 Publication Tables**: Outputs CSV and Markdown versions into `results/final_tables/`.
12. **Render All 14 Publication Figures**: Generates 300 DPI high-resolution figures into `results/final_figures/`.
13. **Compile Comprehensive Report**: Writes `results/final_experiment/FINAL_RESULTS.md`.

---

## 3. Random Seed Governance & Determinism Audit

To ensure complete determinism across executions:
- **Primary Seed (`42`)**: Governs the primary 80/20 train/test split, CTGAN initialization, model fitting, and SHAP sample selections.
- **Robustness Seeds (`[42, 52, 62, 72, 82]`)**: Used for the 5-fold repeated experiment matrix to test statistical variance and compute 95% Student-$t$ confidence intervals.
- **Python & NumPy Seed Setting**:
  ```python
  import random, numpy as np, torch
  random.seed(42)
  np.random.seed(42)
  torch.manual_seed(42)
  ```

---

## 4. Output Artifact Verification Matrix

After running `python run_final_experiment.py`, verify that all directory outputs are present:

```
results/
├── final_experiment/
│   ├── datasets/         (train.csv, test.csv, synthetic_data.csv)
│   ├── models/           (final_optimal_model.joblib)
│   ├── metrics/          (adaptive_augmentation_results.csv, etc.)
│   ├── figures/          (diagnostic plots)
│   ├── statistical_tests/(repeated_seed_results.csv, significance.csv)
│   ├── xai/              (shap_feature_importance.csv)
│   └── FINAL_RESULTS.md
├── final_tables/         (10 publication CSV and Markdown tables)
├── final_figures/        (14 publication 300-DPI figures)
└── cross_dataset/        (UCI vs. Large Cohort comparison)
```
