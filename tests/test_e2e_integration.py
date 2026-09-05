"""
HeartAI Comprehensive End-to-End Integration Test Suite
Validates the complete pipeline:
  Frontend API -> FastAPI -> Preprocessing -> Optimal Model -> Prediction -> SHAP
  Frontend API -> FastAPI -> Research Results -> Adaptive Trajectories & Benchmarks
  Error handling, input validation, edge cases, response times, and model caching.
"""

import sys
import os
import time
import json
import urllib.request
import urllib.error
import numpy as np

BASE_URL = "http://127.0.0.1:8000"


def http_get(endpoint: str):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.status, json.loads(resp.read().decode("utf-8"))


def http_post(endpoint: str, payload: dict):
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.status, json.loads(resp.read().decode("utf-8"))


def http_post_error(endpoint: str, payload: dict):
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        urllib.request.urlopen(req, timeout=10)
        return 200, {}
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))


def test_suite():
    print("=" * 80)
    print("HEARTAI — END-TO-END INTEGRATION TEST SUITE")
    print(f"Target Server: {BASE_URL}")
    print("=" * 80)

    results = []

    # ------------------------------------------------------------
    # 1. Health & Server Status
    # ------------------------------------------------------------
    try:
        status, data = http_get("/health")
        assert status == 200
        assert data["status"] == "healthy"
        assert data["model_loaded"] is True
        assert "Logistic Regression" in data["optimal_model"]
        results.append(("1. Health Check Endpoint", "PASS", f"Service: {data['service']}, Optimal: {data['optimal_model']}"))
    except Exception as e:
        results.append(("1. Health Check Endpoint", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 2. Dataset Summary
    # ------------------------------------------------------------
    try:
        status, data = http_get("/dataset-summary")
        assert status == 200
        assert data["total_records"] == 68612
        assert data["training_records"] == 54889
        assert data["testing_records"] == 13723
        assert data["number_of_features"] == 11
        assert data["missing_value_count"] == 0
        assert data["target_distribution"]["class_0_negative_count"] == 34664
        assert data["target_distribution"]["class_1_positive_count"] == 33948
        results.append(("2. Dataset Summary Endpoint", "PASS", f"Total: {data['total_records']}, Clean: 0 missing"))
    except Exception as e:
        results.append(("2. Dataset Summary Endpoint", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 3. Augmentation Trajectories & Query Filters
    # ------------------------------------------------------------
    try:
        status, all_aug = http_get("/augmentation-results")
        assert status == 200
        assert len(all_aug) == 28

        status, xgb_aug = http_get("/augmentation-results?model=XGBoost")
        assert status == 200
        assert len(xgb_aug) == 7
        assert all(row["model"] == "XGBoost" for row in xgb_aug)

        status, rec_aug = http_get("/augmentation-results?metric=recall")
        assert status == 200
        assert len(rec_aug) == 28
        results.append(("3. Augmentation Results & Filters", "PASS", f"28 total runs, model/metric filters validated"))
    except Exception as e:
        results.append(("3. Augmentation Results & Filters", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 4. Model Comparison Matrix
    # ------------------------------------------------------------
    try:
        status, data = http_get("/model-comparison")
        assert status == 200
        assert data["total_experiments"] == 28
        assert "Logistic Regression" in data["models_evaluated"]
        assert "XGBoost" in data["models_evaluated"]
        assert len(data["results"]) == 28
        results.append(("4. Model Comparison Matrix", "PASS", f"4 models across 7 ratios evaluated on held-out test"))
    except Exception as e:
        results.append(("4. Model Comparison Matrix", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 5. Optimal Configuration
    # ------------------------------------------------------------
    try:
        status, data = http_get("/optimal-configuration")
        assert status == 200
        assert data["best_model"] == "Logistic Regression"
        assert data["optimal_augmentation_ratio"] == "200%"
        assert data["recall"] > 0.70
        assert data["f1_score"] > 0.70
        assert data["roc_auc"] > 0.75
        results.append(("5. Optimal Configuration", "PASS", f"Best: {data['best_model']} @ {data['optimal_augmentation_ratio']}, Recall: {data['recall']*100:.2f}%"))
    except Exception as e:
        results.append(("5. Optimal Configuration", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 6. CTGAN Metadata
    # ------------------------------------------------------------
    try:
        status, data = http_get("/ctgan")
        assert status == 200
        assert data["training_records"] == 54889
        assert data["synthetic_records"] == 109778
        assert data["epochs"] == 150
        results.append(("6. CTGAN Metadata", "PASS", f"150 epochs, {data['synthetic_records']:,} synthetic samples"))
    except Exception as e:
        results.append(("6. CTGAN Metadata", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 7. Research Results Synthesis
    # ------------------------------------------------------------
    try:
        status, data = http_get("/research-results")
        assert status == 200
        assert data["robustness_results"]["status"] == "completed"
        assert data["statistical_analysis"]["status"] == "completed"
        assert data["sensitivity_results"]["status"] == "completed"
        assert data["fairness_results"]["status"] == "completed"
        assert data["privacy_analysis"]["status"] == "completed"
        assert data["xai_findings"]["status"] == "completed"
        results.append(("7. Full Research Results Synthesis", "PASS", "All 6 advanced empirical studies completed"))
    except Exception as e:
        results.append(("7. Full Research Results Synthesis", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 8. Prediction Pipeline: High-Risk Profile
    # ------------------------------------------------------------
    high_risk_patient = {
        "age": 63,
        "gender": 2,
        "height": 172.0,
        "weight": 96.0,
        "ap_hi": 165,
        "ap_lo": 105,
        "cholesterol": 3,
        "gluc": 2,
        "smoke": 1,
        "alco": 0,
        "active": 0,
    }
    try:
        status, data = http_post("/predict", high_risk_patient)
        assert status == 200
        assert data["prediction"] == 1
        assert data["probability"] > 0.70
        assert data["risk_category"] == "High Risk"
        assert "Logistic Regression" in data["model_name"]
        results.append(("8. High-Risk Patient Prediction", "PASS", f"Prob: {data['probability']*100:.1f}%, Category: {data['risk_category']}"))
    except Exception as e:
        results.append(("8. High-Risk Patient Prediction", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 9. Prediction Pipeline: Low-Risk Profile
    # ------------------------------------------------------------
    low_risk_patient = {
        "age": 28,
        "gender": 1,
        "height": 164.0,
        "weight": 52.0,
        "ap_hi": 105,
        "ap_lo": 68,
        "cholesterol": 1,
        "gluc": 1,
        "smoke": 0,
        "alco": 0,
        "active": 1,
    }
    try:
        status, data = http_post("/predict", low_risk_patient)
        assert status == 200
        assert data["prediction"] == 0
        assert data["probability"] < 0.40
        assert data["risk_category"] == "Low Risk"
        results.append(("9. Low-Risk Patient Prediction", "PASS", f"Prob: {data['probability']*100:.1f}%, Category: {data['risk_category']}"))
    except Exception as e:
        results.append(("9. Low-Risk Patient Prediction", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 10. SHAP Explanation Pipeline
    # ------------------------------------------------------------
    try:
        status, data = http_post("/explain", high_risk_patient)
        assert status == 200
        assert data["prediction"] == 1
        assert len(data["features"]) == 11
        assert len(data["top_shap_features"]) == 5
        assert len(data["feature_contributions"]) == 11
        assert len(data["top_positive_contributors"]) > 0
        assert "contributed to the model prediction" in data["features"][0]["clinical_interpretation"].lower()
        results.append(("10. SHAP Explanation Pipeline", "PASS", f"11 features explained, Top driver: {data['top_shap_features'][0]['feature']} (+{data['top_shap_features'][0]['shap_value']:.3f})"))
    except Exception as e:
        results.append(("10. SHAP Explanation Pipeline", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 11. Error Handling: Missing Fields
    # ------------------------------------------------------------
    try:
        status, data = http_post_error("/predict", {"age": 55, "gender": 2})
        assert status == 422
        assert "detail" in data
        results.append(("11. Error Handling: Missing Fields", "PASS", "HTTP 422 Unprocessable Entity correctly returned"))
    except Exception as e:
        results.append(("11. Error Handling: Missing Fields", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 12. Error Handling: Out-of-Bounds Physiological Inputs
    # ------------------------------------------------------------
    try:
        invalid_bp = {**high_risk_patient, "ap_hi": 320}  # impossible BP > 240
        status, data = http_post_error("/predict", invalid_bp)
        assert status == 422
        results.append(("12. Error Handling: Out-of-Bounds BP", "PASS", "HTTP 422 returned for ap_hi=320"))
    except Exception as e:
        results.append(("12. Error Handling: Out-of-Bounds BP", "FAIL", str(e)))

    # ------------------------------------------------------------
    # 13. Model Caching & Latency Check (Zero Retraining)
    # ------------------------------------------------------------
    try:
        latencies = []
        for _ in range(10):
            t0 = time.time()
            status, _ = http_post("/predict", high_risk_patient)
            latencies.append((time.time() - t0) * 1000)
            assert status == 200
        
        avg_latency = float(np.mean(latencies))
        assert avg_latency < 30.0, f"Average latency too high ({avg_latency:.2f}ms), model may be reloading"
        results.append(("13. Caching & Inference Latency", "PASS", f"Mean request latency: {avg_latency:.2f}ms (Zero retraining verified)"))
    except Exception as e:
        results.append(("13. Caching & Inference Latency", "FAIL", str(e)))

    # ------------------------------------------------------------
    # Print Test Report
    # ------------------------------------------------------------
    print("\n" + "=" * 80)
    print("END-TO-END INTEGRATION TEST RESULTS")
    print("=" * 80)
    
    passed_count = sum(1 for _, outcome, _ in results if outcome == "PASS")
    failed_count = len(results) - passed_count

    for name, outcome, note in results:
        badge = "[PASS]" if outcome == "PASS" else "[FAIL]"
        print(f"  {badge:<7} {name:<35} | {note}")

    print("=" * 80)
    print(f"SUMMARY: {passed_count}/{len(results)} Tests Passed ({passed_count/len(results)*100:.1f}% Success Rate), {failed_count} Failed.")
    print("=" * 80)

    if failed_count > 0:
        sys.exit(1)


if __name__ == "__main__":
    test_suite()
