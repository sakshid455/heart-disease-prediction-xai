"""
Comprehensive Automated Test Suite for CardioAI Research Framework Extension.
Tests all 17 research phases, core algorithms, and FastAPI endpoints.
"""

import os
import sys
sys.path.insert(0, os.path.abspath("."))

import json
import numpy as np
import pandas as pd
from fastapi.testclient import TestClient

from backend.main import app
from src.validation import run_data_quality_assessment, run_leakage_validation
from src.synthetic import run_synthetic_quality_evaluation, run_privacy_analysis
from src.augmentation import (
    AugmentationExperimentEngine,
    BestConfigurationEngine,
    run_augmentation_experiments,
    find_best_configuration,
)
from src.statistics import StatisticalSignificanceEngine, run_statistical_significance_analysis
from src.robustness import BootstrapRobustnessEngine, run_bootstrap_analysis
from src.calibration import (
    CalibrationEngine,
    ThresholdOptimizer,
    run_calibration_analysis,
    run_threshold_optimization,
)
from src.explainability import (
    CounterfactualEngine,
    XAIEngine,
    generate_counterfactual_explanation,
    run_xai_evaluation,
)
from src.experiments import get_experiment_tracker
from src.reporting import generate_full_research_report

client = TestClient(app)


# ------------------------------------------------------------
# 1. Validation & Quality Tests
# ------------------------------------------------------------
def test_data_quality_engine():
    report = run_data_quality_assessment()
    assert report is not None
    assert "shape" in report
    assert "missing_values" in report
    assert "target_analysis" in report
    assert report["shape"]["rows"] > 0
    assert os.path.exists("results/validation/data_quality_report.json")
    assert os.path.exists("results/validation/data_quality_report.md")


def test_leakage_validator():
    report = run_leakage_validation()
    assert report is not None
    assert "status" in report
    assert "metrics" in report
    assert "test_records_used_in_ctgan" in report["metrics"]
    assert report["metrics"]["test_records_used_in_ctgan"] == 0
    assert os.path.exists("results/validation/leakage_report.json")


# ------------------------------------------------------------
# 2. Synthetic Data Quality & Privacy
# ------------------------------------------------------------
def test_synthetic_quality_engine():
    report = run_synthetic_quality_evaluation()
    assert report is not None
    assert "overall_quality_score" in report
    assert 0.0 <= report["overall_quality_score"] <= 1.0
    assert "numerical_distributions" in report
    assert "correlation_analysis" in report
    assert os.path.exists("results/synthetic/synthetic_quality_report.json")


def test_privacy_analysis():
    report = run_privacy_analysis()
    assert report is not None
    assert "risk_level" in report
    assert report["risk_level"] in ["LOW", "MODERATE", "MEDIUM", "HIGH"]
    assert "exact_duplicates" in report
    assert "synthetic_to_train_pct" in report["exact_duplicates"]
    assert os.path.exists("results/privacy/privacy_analysis.json")


# ------------------------------------------------------------
# 3. Augmentation & Best Config Tests
# ------------------------------------------------------------
def test_augmentation_engine_quick():
    results = run_augmentation_experiments(quick_mode=True, ratios=[0, 50], models=["Logistic Regression"])
    assert isinstance(results, list)
    assert len(results) >= 2
    for r in results:
        assert "accuracy" in r
        assert "recall" in r
        assert "f1" in r
        assert "roc_auc" in r
        assert 0.0 <= r["accuracy"] <= 1.0


def test_best_configuration_engine():
    best_recall = find_best_configuration(objective="recall")
    assert best_recall is not None
    assert "best_model" in best_recall
    assert "optimal_augmentation_ratio" in best_recall
    assert "metrics" in best_recall
    assert os.path.exists("results/augmentation/best_configuration.json")

    best_f1 = find_best_configuration(objective="f1")
    assert best_f1 is not None
    assert best_f1["objective"] == "f1"


# ------------------------------------------------------------
# 4. Statistics, Robustness, Calibration Tests
# ------------------------------------------------------------
def test_statistical_significance():
    engine = StatisticalSignificanceEngine(alpha=0.05)
    base = [0.70, 0.71, 0.69, 0.72, 0.70]
    aug = [0.75, 0.77, 0.74, 0.76, 0.78]
    res = engine.compare_paired(base, aug, metric_name="recall", model_name="TestModel", augmentation_ratio=100.0)
    assert res["statistically_significant"] is True
    assert res["mean_difference"] > 0
    assert res["cohens_d"] > 0
    assert res["scientific_conclusion"] == "Superior"


def test_bootstrap_robustness():
    boot = BootstrapRobustnessEngine(n_iterations=50, random_seed=42)
    y_true = np.array([0, 1, 0, 1, 0, 1, 0, 1, 1, 0] * 5)
    y_pred = np.array([0, 1, 0, 1, 0, 0, 0, 1, 1, 0] * 5)
    res = boot.evaluate_bootstrap_ci(y_true, y_pred, model_name="Test")
    assert "metrics" in res
    assert "recall" in res["metrics"]
    assert res["metrics"]["recall"]["ci_lower"] <= res["metrics"]["recall"]["ci_upper"]


def test_calibration_engine():
    engine = CalibrationEngine(n_bins=5)
    y_true = np.array([0, 0, 0, 1, 1, 1])
    y_prob = np.array([0.1, 0.2, 0.3, 0.7, 0.8, 0.9])
    res = engine.evaluate_model_calibration(y_true, y_prob, model_name="Test")
    assert "brier_score" in res
    assert "expected_calibration_error" in res
    assert res["brier_score"] >= 0.0


def test_threshold_optimizer():
    optimizer = ThresholdOptimizer(min_thresh=0.2, max_thresh=0.8, step=0.1)
    y_true = np.array([0, 0, 1, 1, 0, 1, 0, 1])
    y_prob = np.array([0.1, 0.3, 0.6, 0.8, 0.4, 0.7, 0.2, 0.9])
    report = optimizer.sweep_thresholds(y_true, y_prob)
    assert "optimal_thresholds" in report
    assert "best_f1" in report["optimal_thresholds"]
    assert "best_youden_j" in report["optimal_thresholds"]
    assert "clinical_screening_high_sensitivity" in report["optimal_thresholds"]


# ------------------------------------------------------------
# 5. Explainability & Tracker Tests
# ------------------------------------------------------------
def test_counterfactual_explanation():
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
    assert cf is not None
    assert "status" in cf
    assert "disclaimer" in cf
    assert "RESEARCH DISCLAIMER" in cf["disclaimer"]
    assert "original_probability" in cf
    assert "counterfactual_probability" in cf
    assert cf["counterfactual_probability"] <= cf["original_probability"]


def test_experiment_tracker():
    tracker = get_experiment_tracker()
    rec = tracker.log_experiment(
        model_name="TestClassifier",
        augmentation_ratio=50.0,
        metrics={"recall": 0.85, "f1": 0.80},
        notes="Automated unit test record",
    )
    assert rec["experiment_id"].startswith("EXP-")
    found = tracker.get_experiment_by_id(rec["experiment_id"])
    assert found is not None
    assert found["model"] == "TestClassifier"


def test_research_report_generation():
    paths = generate_full_research_report()
    assert os.path.exists(paths["markdown_path"])
    assert os.path.exists(paths["summary_path"])
    with open(paths["markdown_path"], "r", encoding="utf-8") as f:
        content = f.read()
    assert "Adaptive CTGAN-Based Synthetic Data Augmentation" in content
    assert "Medical Disclaimer" in content


# ------------------------------------------------------------
# 6. FastAPI Endpoints Integration Tests (TestClient)
# ------------------------------------------------------------
def test_api_dataset_quality():
    resp = client.get("/api/research/dataset-quality")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "success"
    assert "shape" in data["data"]


def test_api_leakage():
    resp = client.get("/api/research/leakage")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"


def test_api_synthetic_quality():
    resp = client.get("/api/research/synthetic-quality")
    assert resp.status_code == 200
    assert "overall_quality_score" in resp.json()["data"]


def test_api_privacy():
    resp = client.get("/api/research/privacy")
    assert resp.status_code == 200
    assert "risk_level" in resp.json()["data"]


def test_api_augmentation():
    resp = client.get("/api/research/augmentation")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"


def test_api_augmentation_best():
    resp = client.get("/api/research/augmentation/best?objective=recall")
    assert resp.status_code == 200
    assert resp.json()["data"]["best_model"] is not None


def test_api_models():
    resp = client.get("/api/research/models")
    assert resp.status_code == 200
    assert "models" in resp.json()


def test_api_statistics():
    resp = client.get("/api/research/statistics")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"


def test_api_bootstrap():
    resp = client.get("/api/research/bootstrap")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"


def test_api_calibration():
    resp = client.get("/api/research/calibration")
    assert resp.status_code == 200
    assert resp.json()["status"] == "success"


def test_api_thresholds():
    resp = client.get("/api/research/thresholds")
    assert resp.status_code == 200
    assert "optimal_thresholds" in resp.json()["data"]


def test_api_counterfactual():
    payload = {
        "features": {
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
        },
        "model_name": "Logistic Regression",
    }
    resp = client.post("/api/research/counterfactual", json=payload)
    assert resp.status_code == 200
    res_data = resp.json()["data"]
    assert "disclaimer" in res_data
    assert "probability_reduction" in res_data


def test_api_experiments():
    resp = client.get("/api/research/experiments?limit=5")
    assert resp.status_code == 200
    assert "data" in resp.json()


def test_api_report():
    resp_json = client.get("/api/research/report?format=json")
    assert resp_json.status_code == 200
    assert "markdown_content" in resp_json.json()

    resp_md = client.get("/api/research/report?format=markdown")
    assert resp_md.status_code == 200
    assert "Adaptive CTGAN-Based Synthetic Data Augmentation" in resp_md.text


if __name__ == "__main__":
    import sys
    print("=" * 70)
    print("Running CardioAI Research Framework Comprehensive Test Suite...")
    print("=" * 70)

    test_functions = [
        test_data_quality_engine,
        test_leakage_validator,
        test_synthetic_quality_engine,
        test_privacy_analysis,
        test_augmentation_engine_quick,
        test_best_configuration_engine,
        test_statistical_significance,
        test_bootstrap_robustness,
        test_calibration_engine,
        test_threshold_optimizer,
        test_counterfactual_explanation,
        test_experiment_tracker,
        test_research_report_generation,
        test_api_dataset_quality,
        test_api_leakage,
        test_api_synthetic_quality,
        test_api_privacy,
        test_api_augmentation,
        test_api_augmentation_best,
        test_api_models,
        test_api_statistics,
        test_api_bootstrap,
        test_api_calibration,
        test_api_thresholds,
        test_api_counterfactual,
        test_api_experiments,
        test_api_report,
    ]

    passed = 0
    failed = 0

    for tf in test_functions:
        name = tf.__name__
        try:
            tf()
            print(f"  [PASS] {name}")
            passed += 1
        except Exception as e:
            print(f"  [FAIL] {name}: {e}")
            failed += 1

    print("=" * 70)
    print(f"Research Pipeline Tests: {passed} passed, {failed} failed out of {len(test_functions)}.")
    print("=" * 70)
    if failed > 0:
        sys.exit(1)

