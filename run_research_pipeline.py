"""
Phase 15: Master Research Pipeline Orchestrator
Executes the end-to-end CardioAI scientific research pipeline across Phases 1 through 16.
CLI Options:
  --quick                 Enable fast execution mode for testing/verification
  --seed INT              Set random seed (default 42)
  --objective STR         Optimization metric for best configuration (default 'recall')
  --skip-experiments      Skip retraining augmentation models if results already exist
"""

import os
import sys
import time
import argparse
from datetime import datetime

from src.utils.logger import get_research_logger
from src.validation import run_data_quality_assessment, run_leakage_validation
from src.synthetic import run_synthetic_quality_evaluation, run_privacy_analysis
from src.augmentation import run_augmentation_experiments, find_best_configuration
from src.statistics import run_statistical_significance_analysis
from src.robustness import run_bootstrap_analysis
from src.calibration import run_calibration_analysis, run_threshold_optimization
from src.explainability import run_xai_evaluation, generate_counterfactual_explanation
from src.experiments import get_experiment_tracker
from src.reporting import generate_full_research_report

logger = get_research_logger("cardioai.pipeline.master")


def execute_pipeline(
    quick_mode: bool = False,
    seed: int = 42,
    objective: str = "recall",
    skip_if_exists: bool = False,
):
    start_total = time.time()
    logger.info("=" * 80)
    logger.info("STARTING CARDIOAI SCIENTIFIC RESEARCH PIPELINE")
    logger.info(f"Mode: {'QUICK (Fast Verification)' if quick_mode else 'FULL RIGOR'}, Seed: {seed}, Objective: {objective}")
    logger.info("=" * 80)

    # 1. Phase 1: Data Quality Engine
    logger.info("\n--- [1/12] Phase 1: Data Quality Assessment ---")
    t0 = time.time()
    dq = run_data_quality_assessment()
    logger.info(f"Phase 1 completed in {time.time() - t0:.2f}s.")

    # 2. Phase 2: Data Leakage Validator
    logger.info("\n--- [2/12] Phase 2: Pipeline Leakage Validation ---")
    t0 = time.time()
    lk = run_leakage_validation()
    logger.info(f"Phase 2 completed in {time.time() - t0:.2f}s. Status: {lk.get('status')}")

    # 3. Phase 3: Synthetic Data Quality Engine
    logger.info("\n--- [3/12] Phase 3: Synthetic Quality Evaluation ---")
    t0 = time.time()
    sq = run_synthetic_quality_evaluation()
    logger.info(f"Phase 3 completed in {time.time() - t0:.2f}s. Fidelity Score: {sq.get('overall_quality_score', 0)*100:.2f}%")

    # 4. Phase 4: Privacy Assessment
    logger.info("\n--- [4/12] Phase 4: Empirical Privacy Assessment ---")
    t0 = time.time()
    pr = run_privacy_analysis()
    logger.info(f"Phase 4 completed in {time.time() - t0:.2f}s. Risk Level: {pr.get('risk_level')}")

    # 5. Phase 5: Augmentation Experiment Suite
    logger.info("\n--- [5/12] Phase 5: Augmentation Experiment Grid ---")
    t0 = time.time()
    aug_res = run_augmentation_experiments(
        quick_mode=quick_mode,
        random_state=seed,
        use_existing_if_available=skip_if_exists,
    )
    logger.info(f"Phase 5 completed in {time.time() - t0:.2f}s. {len(aug_res)} experiments evaluated.")

    # 6. Phase 6: Automatic Best Configuration
    logger.info("\n--- [6/12] Phase 6: Best Configuration Selection ---")
    t0 = time.time()
    bc = find_best_configuration(objective=objective)
    logger.info(f"Phase 6 completed in {time.time() - t0:.2f}s. Best: {bc.get('best_model')} @ {bc.get('optimal_augmentation_ratio')}%")

    # 7. Phase 7: Statistical Significance
    logger.info("\n--- [7/12] Phase 7: Statistical Significance Testing ---")
    t0 = time.time()
    try:
        ss = run_statistical_significance_analysis()
        logger.info(f"Phase 7 completed in {time.time() - t0:.2f}s. {len(ss)} paired tests evaluated.")
    except Exception as e:
        logger.warning(f"Phase 7 skipped or note: {e}")

    # 8. Phase 8: Bootstrap Robustness
    logger.info("\n--- [8/12] Phase 8: Bootstrap Robustness Analysis ---")
    t0 = time.time()
    bs = run_bootstrap_analysis(quick_mode=quick_mode, n_iterations=100 if quick_mode else 1000)
    logger.info(f"Phase 8 completed in {time.time() - t0:.2f}s. Bootstrap iterations: {bs.get('iterations')}")

    # 9. Phase 9: Probability Calibration
    logger.info("\n--- [9/12] Phase 9: Model Calibration Analysis ---")
    t0 = time.time()
    cal = run_calibration_analysis(quick_mode=quick_mode)
    logger.info(f"Phase 9 completed in {time.time() - t0:.2f}s. ECE: {cal['augmented']['expected_calibration_error']:.4f}")

    # 10. Phase 10: Threshold Optimization
    logger.info("\n--- [10/12] Phase 10: Decision Threshold Optimization ---")
    t0 = time.time()
    th = run_threshold_optimization(quick_mode=quick_mode)
    logger.info(f"Phase 10 completed in {time.time() - t0:.2f}s. Best F1 Threshold: {th['optimal_thresholds']['best_f1']['threshold']}")

    # 11. Phase 11 & 12: Explainability (SHAP & Counterfactual)
    logger.info("\n--- [11/12] Phase 11 & 12: Explainability & Counterfactuals ---")
    t0 = time.time()
    xai = run_xai_evaluation(quick_mode=quick_mode)
    sample_patient = {
        "age": 55.0,
        "gender": 1.0,
        "height": 165.0,
        "weight": 88.0,
        "ap_hi": 150.0,
        "ap_lo": 95.0,
        "cholesterol": 3.0,
        "gluc": 2.0,
        "smoke": 1.0,
        "alco": 0.0,
        "active": 0.0,
    }
    cf = generate_counterfactual_explanation(sample_patient)
    logger.info(f"Phase 11 & 12 completed in {time.time() - t0:.2f}s. CF drop: {cf.get('probability_reduction', 0):.4f}")

    # 12. Phase 13 & 16: Tracking & Master Report Generation
    logger.info("\n--- [12/12] Phase 13 & 16: Experiment Tracking & Report Generation ---")
    t0 = time.time()
    tracker = get_experiment_tracker()
    tracker.log_experiment(
        model_name=bc.get("best_model", "XGBoost"),
        augmentation_ratio=bc.get("optimal_augmentation_ratio", 75.0),
        metrics=bc.get("metrics", {}),
        notes="Master pipeline automated run",
    )
    report_paths = generate_full_research_report()
    logger.info(f"Report generated in {time.time() - t0:.2f}s. Path: {report_paths['markdown_path']}")

    total_time = time.time() - start_total
    logger.info("\n" + "=" * 80)
    logger.info(f"RESEARCH PIPELINE COMPLETED SUCCESSFULLY IN {total_time:.2f}s")
    logger.info(f"Final Report: {report_paths['markdown_path']}")
    logger.info("=" * 80)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CardioAI Research Pipeline Orchestrator")
    parser.add_argument("--quick", action="store_true", help="Run fast verification mode")
    parser.add_argument("--seed", type=int, default=42, help="Random seed")
    parser.add_argument("--objective", type=str, default="recall", help="Primary optimization objective")
    parser.add_argument("--skip-if-exists", action="store_true", help="Reuse existing augmentation results")
    args = parser.parse_args()

    execute_pipeline(
        quick_mode=args.quick,
        seed=args.seed,
        objective=args.objective,
        skip_if_exists=args.skip_if_exists,
    )
