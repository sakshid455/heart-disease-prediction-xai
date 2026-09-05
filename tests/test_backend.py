"""
HeartAI Backend Comprehensive Test Suite
Validates all endpoints, error handling, Pydantic validation, and artifact integrity.
"""

import sys
import os
from fastapi.testclient import TestClient

# Ensure workspace root is in sys.path
sys.path.insert(0, os.path.abspath("."))

from backend.main import app

client = TestClient(app)


def test_health_endpoint():
    """Validates GET /api/health."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "HeartAI API"
    assert data["model_loaded"] is True
    assert "Logistic Regression" in data["optimal_model"]


def test_dataset_summary_endpoint():
    """Validates GET /api/dataset-summary."""
    response = client.get("/api/dataset-summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total_records"] == 68612
    assert data["number_of_features"] == 11
    assert data["numerical_features_count"] == 5
    assert data["categorical_features_count"] == 6
    assert data["training_records"] == 54889
    assert data["testing_records"] == 13723
    assert data["missing_value_count"] == 0
    assert "target_distribution" in data
    assert data["target_distribution"]["class_0_negative_count"] == 34664
    assert data["target_distribution"]["class_1_positive_count"] == 33948


def test_models_endpoint():
    """Validates GET /api/models."""
    response = client.get("/api/models")
    assert response.status_code == 200
    data = response.json()
    assert data["total_models_available"] >= 1
    assert len(data["models"]) >= 1
    optimal_found = any(m["is_optimal"] for m in data["models"])
    assert optimal_found is True
    # Ensure no absolute filesystem paths are exposed
    for m in data["models"]:
        assert "/" not in m["artifact_key"]
        assert "\\" not in m["artifact_key"]


def test_optimal_configuration_endpoint():
    """Validates GET /api/optimal-configuration."""
    response = client.get("/api/optimal-configuration")
    assert response.status_code == 200
    data = response.json()
    assert data["best_model"] == "Logistic Regression"
    assert data["optimal_augmentation_ratio"] == "200%"
    assert data["training_size"] == 54889
    assert data["synthetic_training_size"] == 109778
    assert data["total_training_size"] == 164667
    assert data["accuracy"] > 0.70
    assert data["recall"] > 0.70
    assert data["f1_score"] > 0.70
    assert data["roc_auc"] > 0.75


def test_augmentation_results_endpoint():
    """Validates GET /api/augmentation-results and filters."""
    # 1. Unfiltered
    response = client.get("/api/augmentation-results")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 28, f"Expected 28 runs, got {len(data)}"

    # 2. Filter by model
    resp_filtered = client.get("/api/augmentation-results?model=XGBoost")
    assert resp_filtered.status_code == 200
    data_xgb = resp_filtered.json()
    assert len(data_xgb) == 7
    for row in data_xgb:
        assert row["model"] == "XGBoost"

    # 3. Filter by metric
    resp_metric = client.get("/api/augmentation-results?metric=recall")
    assert resp_metric.status_code == 200
    data_metric = resp_metric.json()
    assert len(data_metric) == 28
    assert "metric_name" in data_metric[0]
    assert data_metric[0]["metric_name"] == "recall"


def test_model_comparison_endpoint():
    """Validates GET /api/model-comparison."""
    response = client.get("/api/model-comparison")
    assert response.status_code == 200
    data = response.json()
    assert data["total_experiments"] == 28
    assert "Logistic Regression" in data["models_evaluated"]
    assert "200%" in data["augmentation_ratios"]
    assert len(data["results"]) == 28


def test_ctgan_info_endpoint():
    """Validates GET /api/ctgan."""
    response = client.get("/api/ctgan")
    assert response.status_code == 200
    data = response.json()
    assert data["training_records"] == 54889
    assert data["synthetic_records"] == 109778
    assert data["epochs"] == 150
    assert data["batch_size"] == 500
    assert data["random_seed"] == 42
    assert data["synthetic_ratio"] == 2.0


def test_research_results_endpoint():
    """Validates GET /api/research-results."""
    response = client.get("/api/research-results")
    assert response.status_code == 200
    data = response.json()
    assert "research_question" in data
    assert data["best_model"]["model"] == "Logistic Regression"
    assert data["optimal_ratio"] == "200%"
    assert data["synthetic_data_quality"]["status"] == "completed"
    assert data["robustness_results"]["status"] == "completed"
    assert data["statistical_analysis"]["status"] == "completed"
    assert data["fairness_results"]["status"] == "completed"
    assert data["privacy_analysis"]["status"] == "completed"
    assert data["xai_findings"]["status"] == "completed"


def test_predict_endpoint():
    """Validates POST /api/predict for various clinical patient profiles."""
    # 1. High-risk hypertensive patient
    high_risk_patient = {
        "age": 62,
        "gender": 2,
        "height": 172.0,
        "weight": 95.0,
        "ap_hi": 160,
        "ap_lo": 100,
        "cholesterol": 3,
        "gluc": 2,
        "smoke": 1,
        "alco": 0,
        "active": 0,
    }
    resp = client.post("/api/predict", json=high_risk_patient)
    assert resp.status_code == 200
    data = resp.json()
    assert data["prediction"] == 1
    assert data["probability"] > 0.65
    assert data["risk_category"] == "High Risk"
    assert "Logistic Regression" in data["model"]
    assert data["model_name"] == "Logistic Regression"
    assert data["augmentation_ratio"] == "200%"

    # 2. Low-risk young normotensive patient
    low_risk_patient = {
        "age": 32,
        "gender": 1,
        "height": 165.0,
        "weight": 55.0,
        "ap_hi": 110,
        "ap_lo": 70,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1,
    }
    resp_low = client.post("/api/predict", json=low_risk_patient)
    assert resp_low.status_code == 200
    data_low = resp_low.json()
    assert data_low["prediction"] == 0
    assert data_low["probability"] < 0.45
    assert data_low["risk_category"] == "Low Risk"
    assert data_low["model_name"] == "Logistic Regression"


def test_explain_endpoint():
    """Validates POST /api/explain SHAP attributions."""
    patient = {
        "age": 58,
        "gender": 2,
        "height": 175.0,
        "weight": 88.0,
        "ap_hi": 150,
        "ap_lo": 95,
        "cholesterol": 2,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1,
    }
    resp = client.post("/api/explain", json=patient)
    assert resp.status_code == 200
    data = resp.json()
    assert "prediction" in data
    assert "probability" in data
    assert "model_name" in data
    assert len(data["features"]) == 11
    assert "top_shap_features" in data
    assert len(data["top_shap_features"]) == 5
    assert "feature_contributions" in data
    assert len(data["feature_contributions"]) == 11
    assert len(data["top_positive_contributors"]) > 0
    assert "research_note" in data
    # Ensure wording does not assert medical causality
    for f in data["features"]:
        assert "contributed to the model prediction" in f["clinical_interpretation"].lower()


def test_predict_validation_errors():
    """Validates Pydantic 422 error on out-of-range or malformed inputs."""
    # 1. Age < 18 (Invalid)
    invalid_age = {
        "age": 12,
        "gender": 1,
        "height": 160.0,
        "weight": 50.0,
        "ap_hi": 120,
        "ap_lo": 80,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1,
    }
    resp = client.post("/api/predict", json=invalid_age)
    assert resp.status_code == 422

    # 2. Blood pressure impossible range (ap_hi > 240)
    invalid_bp = {
        "age": 50,
        "gender": 1,
        "height": 160.0,
        "weight": 50.0,
        "ap_hi": 350,
        "ap_lo": 80,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1,
    }
    resp_bp = client.post("/api/predict", json=invalid_bp)
    assert resp_bp.status_code == 422


if __name__ == "__main__":
    print("=" * 60)
    print("Running HeartAI Backend Test Suite...")
    print("=" * 60)
    
    test_functions = [
        test_health_endpoint,
        test_dataset_summary_endpoint,
        test_models_endpoint,
        test_optimal_configuration_endpoint,
        test_augmentation_results_endpoint,
        test_model_comparison_endpoint,
        test_ctgan_info_endpoint,
        test_research_results_endpoint,
        test_predict_endpoint,
        test_explain_endpoint,
        test_predict_validation_errors,
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
            
    print("=" * 60)
    print(f"Results: {passed} passed, {failed} failed out of {len(test_functions)} tests.")
    print("=" * 60)
    if failed > 0:
        sys.exit(1)

