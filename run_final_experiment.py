"""
HeartAI — Master End-to-End Reproducible Experiment Pipeline
Project: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction

Single command execution that reproduces the full research pipeline:
  1. Data loading & schema validation
  2. Strict train/test partitioning (80/20 stratified quarantine)
  3. CTGAN training & synthetic sample generation
  4. Generative data quality assessment (Wasserstein, JS, Corr diff)
  5. Adaptive augmentation matrix (0% to 200% across 4 ML models)
  6. Optimal configuration selection & model serialization
  7. SHAP explainability audit & rank consistency
  8. Multi-seed robustness study (5 seeds x 7 ratios x 4 models = 140 runs)
  9. Paired hypothesis testing with Benjamini-Hochberg FDR correction
  10. Empirical privacy (DCR/NNDR) & demographic fairness audits
  11. Publication research tables generation (Tables 1-10)
  12. Publication research figures generation (Figures 1-14)
  13. Final comprehensive research report (FINAL_RESULTS.md)

Usage:
  python run_final_experiment.py
"""

import os
import sys
import time
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def run_step(step_name, cmd):
    print(f"\n" + "=" * 80)
    print(f"PIPELINE STAGE: {step_name}")
    print(f"=" * 80)
    t0 = time.time()
    res = subprocess.run(cmd, cwd=BASE_DIR, shell=True)
    if res.returncode != 0:
        print(f"[ERROR] Stage '{step_name}' failed with exit code {res.returncode}")
        sys.exit(res.returncode)
    elapsed = time.time() - t0
    print(f"[SUCCESS] {step_name} completed in {elapsed:.2f} seconds.")


def main():
    print("=" * 80)
    print("HEARTAI — STARTING COMPLETE END-TO-END REPRODUCIBLE RESEARCH EXPERIMENT")
    print("Project: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction")
    print("=" * 80)
    total_t0 = time.time()

    # Stage 1: Core Clean Experiment Pipeline (Datasets, CTGAN, Models, SHAP, Stats, Privacy, Fairness, Report)
    run_step("Core Clean Research Pipeline", f"{sys.executable} src/run_final_clean_experiment.py")

    # Stage 2: Cross-Dataset Validation Study (UCI vs. Large Cohort)
    run_step("Cross-Dataset Validation Study", f"{sys.executable} src/run_cross_dataset_study.py")

    # Stage 3: Publication Research Tables (Tables 1 to 10)
    run_step("Publication Research Tables (1-10)", f"{sys.executable} src/generate_publication_tables.py")

    # Stage 4: Publication Research Figures (Figures 1 to 14)
    run_step("Publication Research Figures (1-14)", f"{sys.executable} src/generate_publication_figures.py")

    total_elapsed = (time.time() - total_t0) / 60.0
    print("\n" + "=" * 80)
    print(f"ALL RESEARCH EXPERIMENTS REPRODUCED SUCCESSFULLY IN {total_elapsed:.2f} MINUTES.")
    print("Generated Artifact Directories:")
    print("  • results/final_experiment/  (Clean datasets, models, metrics, XAI, and FINAL_RESULTS.md)")
    print("  • results/final_tables/      (Publication Tables 1-10 in CSV and Markdown)")
    print("  • results/final_figures/     (Publication Figures 1-14 at 300 DPI high resolution)")
    print("  • results/cross_dataset/     (UCI Cleveland vs. Large Cardiovascular Cohort Study)")
    print("=" * 80)


if __name__ == "__main__":
    main()
