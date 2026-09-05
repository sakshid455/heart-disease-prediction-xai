"""
Test suite validating that all React frontend routes, assets, and backend API endpoints respond with 200 OK.
"""
import urllib.request
import json

def test_routes():
    print("Testing Vite Frontend & FastAPI Backend Integration...")
    
    # 1. Test Vite Root
    vite_res = urllib.request.urlopen("http://localhost:3000")
    assert vite_res.status == 200, f"Vite root status: {vite_res.status}"
    html = vite_res.read().decode("utf-8")
    assert "HeartAI" in html or "<div id=\"root\"></div>" in html
    print("  [PASS] Vite Frontend Root: 200 OK (HTML loaded)")

    # 2. Test All Backend Endpoints
    endpoints = [
        "/api/health",
        "/api/dataset-summary",
        "/api/models",
        "/api/optimal-configuration",
        "/api/augmentation-results",
        "/api/model-comparison",
        "/api/ctgan",
        "/api/research-results",
        "/api/augmentation-recommendation?objective=High+Sensitivity",
        "/api/augmentation-recommendation?objective=Balanced+Performance",
        "/api/healthcare/hospitals",
        "/api/healthcare/hospitals/nearby?latitude=12.9165&longitude=79.1325&radius_km=30",
        "/api/healthcare/search?q=Vellore",
        "/api/healthcare/cardiology",
        "/api/healthcare/emergency",
    ]
    for ep in endpoints:
        res = urllib.request.urlopen(f"http://127.0.0.1:8000{ep}")
        assert res.status == 200, f"Endpoint {ep} failed with {res.status}"
        data = json.loads(res.read().decode("utf-8"))
        assert data is not None
        print(f"  [PASS] GET {ep}: 200 OK")

    # 3. Test POST /api/predict
    pred_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/predict",
        data=json.dumps({
            "age": 60, "gender": 2, "height": 175.0, "weight": 85.0,
            "ap_hi": 145, "ap_lo": 90, "cholesterol": 2, "gluc": 1,
            "smoke": 0, "alco": 0, "active": 1
        }).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    pred_res = urllib.request.urlopen(pred_req)
    assert pred_res.status == 200
    pred_data = json.loads(pred_res.read().decode("utf-8"))
    assert "probability" in pred_data and "prediction" in pred_data and "model_name" in pred_data
    print(f"  [PASS] POST /api/predict: 200 OK (Model: {pred_data.get('model_name')}, Prob: {pred_data.get('probability')*100:.1f}%)")

    # 4. Test POST /api/explain
    exp_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/explain",
        data=json.dumps({
            "age": 60, "gender": 2, "height": 175.0, "weight": 85.0,
            "ap_hi": 145, "ap_lo": 90, "cholesterol": 2, "gluc": 1,
            "smoke": 0, "alco": 0, "active": 1
        }).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    exp_res = urllib.request.urlopen(exp_req)
    assert exp_res.status == 200
    exp_data = json.loads(exp_res.read().decode("utf-8"))
    assert "features" in exp_data and len(exp_data["features"]) > 0
    print(f"  [PASS] POST /api/explain: 200 OK ({len(exp_data['features'])} SHAP features explained)")

    print("\nALL FRONTEND & API VERIFICATIONS PASSED SUCCESSFULLY (100%).")

if __name__ == "__main__":
    test_routes()
