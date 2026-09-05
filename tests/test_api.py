"""
Comprehensive Automated Test Suite for FastAPI Backend Endpoints
Tests:
  1. GET /health
  2. GET /dataset-summary
  3. GET /augmentation-results
  4. GET /optimal-configuration
  5. POST /predict (Valid case, High risk case, Low risk case, Invalid bounds)
  6. POST /explain (SHAP breakdown, Top contributors, Non-empty attributions)
  7. GET /model-comparison
"""

import sys
import os
from fastapi.testclient import TestClient

# Ensure workspace root is on sys.path
sys.path.insert(0, os.path.abspath("."))

from src.api.main import app

client = TestClient(app)

def test_1_health_check():
    print("Testing GET /health...")
    response = client.get("/health")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True
    assert "Logistic Regression" in data["optimal_model_name"]
    assert data["optimal_augmentation_ratio"] == 200
    print("  [PASSED] /health returned healthy status and model configuration.")

def test_2_dataset_summary():
    print("\nTesting GET /dataset-summary...")
    response = client.get("/dataset-summary")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["total_records"] == 68612
    assert data["number_of_features"] == 11
    assert "age" in data["feature_names"]
    assert "ap_hi" in data["feature_names"]
    assert data["training_size"] == 54889
    assert data["test_size"] == 13723
    assert data["synthetic_size"] == 109778
    assert "positive_percentage_train" in data["target_distribution"]
    print(f"  [PASSED] /dataset-summary verified (Total: {data['total_records']}, Features: {data['number_of_features']}).")

def test_3_augmentation_results():
    print("\nTesting GET /augmentation-results...")
    response = client.get("/augmentation-results")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 28, f"Expected 28 experiments, got {len(data)}"
    sample = data[0]
    assert "model" in sample
    assert "augmentation_ratio" in sample
    assert "recall" in sample
    assert "roc_auc" in sample
    print(f"  [PASSED] /augmentation-results returned all {len(data)} experiment rows.")

def test_4_optimal_configuration():
    print("\nTesting GET /optimal-configuration...")
    response = client.get("/optimal-configuration")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["best_model"] == "Logistic Regression"
    assert data["optimal_augmentation_ratio"] == 200
    assert data["total_train_size"] == 164667
    assert data["recall"] >= 0.70
    assert data["roc_auc"] >= 0.75
    print(f"  [PASSED] /optimal-configuration returned optimal model specs ({data['best_model']} @ {data['optimal_augmentation_ratio']}%).")

def test_5_predict_endpoint():
    print("\nTesting POST /predict...")
    
    # 1. High risk patient (severe hypertension, older age, high cholesterol)
    high_risk_patient = {
        "age": 62.0,
        "gender": 2,
        "height": 172.0,
        "weight": 95.0,
        "ap_hi": 160,
        "ap_lo": 100,
        "cholesterol": 3,
        "gluc": 2,
        "smoke": 1,
        "alco": 0,
        "active": 0
    }
    resp_high = client.post("/predict", json=high_risk_patient)
    assert resp_high.status_code == 200, f"Expected 200, got {resp_high.status_code}: {resp_high.text}"
    data_high = resp_high.json()
    assert data_high["prediction"] == 1
    assert data_high["probability"] > 0.65
    assert data_high["risk_category"] == "High Risk"
    print(f"  [PASSED] High-risk prediction: P={data_high['probability']:.4f}, Label: {data_high['prediction_label']}")

    # 2. Low risk patient (young, normal BP, normal cholesterol, active)
    low_risk_patient = {
        "age": 35.0,
        "gender": 1,
        "height": 165.0,
        "weight": 58.0,
        "ap_hi": 110,
        "ap_lo": 70,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1
    }
    resp_low = client.post("/predict", json=low_risk_patient)
    assert resp_low.status_code == 200
    data_low = resp_low.json()
    assert data_low["prediction"] == 0
    assert data_low["probability"] < 0.35
    assert data_low["risk_category"] == "Low Risk"
    print(f"  [PASSED] Low-risk prediction: P={data_low['probability']:.4f}, Label: {data_low['prediction_label']}")

    # 3. Validation error test (invalid age, out of range BP)
    invalid_patient = {
        "age": 5.0,  # Below min 18.0
        "gender": 3, # Invalid gender
        "height": 165.0,
        "weight": 70.0,
        "ap_hi": 500, # Out of range
        "ap_lo": 80,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1
    }
    resp_inv = client.post("/predict", json=invalid_patient)
    assert resp_inv.status_code == 422, f"Expected 422 Unprocessable Entity, got {resp_inv.status_code}"
    print("  [PASSED] Validation error caught correctly for invalid inputs (422 Unprocessable Entity).")

def test_6_explain_endpoint():
    print("\nTesting POST /explain...")
    patient = {
        "age": 58.0,
        "gender": 1,
        "height": 160.0,
        "weight": 82.0,
        "ap_hi": 145,
        "ap_lo": 90,
        "cholesterol": 2,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1
    }
    response = client.post("/explain", json=patient)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert "shap_feature_contributions" in data
    assert len(data["shap_feature_contributions"]) == 11
    assert "ap_hi" in data["shap_feature_contributions"]
    assert "top_contributing_features" in data
    assert len(data["top_contributing_features"]) == 11

    top1 = data["top_contributing_features"][0]
    print(f"  [PASSED] Top risk driver identified: {top1['feature']} with impact: {top1['shap_value']:+.4f} ({top1['clinical_interpretation']})")

def test_7_model_comparison():
    print("\nTesting GET /model-comparison...")
    response = client.get("/model-comparison")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["total_experiments"] == 28
    assert "Logistic Regression" in data["models_evaluated"]
    assert "XGBoost" in data["models_evaluated"]
    assert 0 in data["augmentation_ratios"]
    assert 200 in data["augmentation_ratios"]
    assert len(data["results"]) == 28
    print(f"  [PASSED] /model-comparison verified with {data['total_experiments']} experiments across {len(data['models_evaluated'])} models.")

if __name__ == "__main__":
    print("=" * 70)
    print("RUNNING FASTAPI BACKEND TEST SUITE")
    print("=" * 70)
    test_1_health_check()
    test_2_dataset_summary()
    test_3_augmentation_results()
    test_4_optimal_configuration()
    test_5_predict_endpoint()
    test_6_explain_endpoint()
    test_7_model_comparison()
    print("\n" + "=" * 70)
    print("ALL 7 ENDPOINT TESTS PASSED SUCCESSFULLY (100% PASS RATE)!")
    print("=" * 70)
