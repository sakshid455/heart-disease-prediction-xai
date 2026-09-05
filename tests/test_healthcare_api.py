"""
Healthcare Facility & Cardiology Hospital Finder Test Suite
Validates distance calculations, nearby searches, Vellore data fidelity,
filtering, error handling, and API endpoints.
"""

import sys
import os
from fastapi.testclient import TestClient

# Ensure workspace root is in sys.path
sys.path.insert(0, os.path.abspath("."))

from backend.main import app
from backend.services.hospital_service import HospitalService, hospital_service

client = TestClient(app)


def test_haversine_distance_calculation():
    """Validates that Haversine distance matches real-world geographical distances."""
    # CMC Vellore (12.9248, 79.1348) to Naruvi Hospitals (12.9157, 79.1302)
    # Approx 1.1 km apart in Vellore
    dist = HospitalService.calculate_haversine_distance(12.9248, 79.1348, 12.9157, 79.1302)
    assert 0.9 <= dist <= 1.5, f"Expected distance ~1.1km, got {dist}km"

    # Same point distance should be 0.0
    zero_dist = HospitalService.calculate_haversine_distance(12.9248, 79.1348, 12.9248, 79.1348)
    assert zero_dist == 0.0


def test_verified_hospitals_loaded():
    """Validates that verified hospitals are loaded and contain required fields."""
    hospitals = hospital_service.get_all_hospitals()
    assert len(hospitals) >= 5, f"Expected at least 5 verified hospitals, found {len(hospitals)}"
    
    # Check Vellore hospitals specifically
    names = [h.name for h in hospitals]
    assert any("Christian Medical College" in n or "CMC" in n for n in names)
    assert any("Naruvi" in n for n in names)
    assert any("Sri Narayani" in n for n in names)

    for h in hospitals:
        assert h.name, "Hospital name must not be empty"
        assert -90.0 <= h.latitude <= 90.0, "Latitude out of bounds"
        assert -180.0 <= h.longitude <= 180.0, "Longitude out of bounds"
        assert h.source, "Hospital source must be specified"
        assert h.last_verified, "Last verified timestamp must be specified"
        # Phone must either be a valid string or None, NEVER a fabricated placeholder
        if h.phone:
            assert "+91" in h.phone or "0416" in h.phone or "04172" in h.phone or "044" in h.phone or "080" in h.phone


def test_nearby_hospitals_vellore_api():
    """Validates GET /api/healthcare/hospitals/nearby from Vellore center coordinates."""
    # Vellore center: 12.9165 N, 79.1325 E
    response = client.get("/api/healthcare/hospitals/nearby?latitude=12.9165&longitude=79.1325&radius_km=30")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert data["total"] > 0
    results = data["results"]
    
    # Results must be sorted nearest first
    distances = [item["distance_km"] for item in results]
    assert distances == sorted(distances), "Hospitals must be sorted in ascending order of distance"
    
    # CMC Vellore and Naruvi should be within ~5 km of Vellore center
    top_result = results[0]
    assert top_result["distance_km"] < 5.0
    assert "CMC" in top_result["name"] or "Naruvi" in top_result["name"]


def test_search_hospitals_endpoint():
    """Validates GET /api/healthcare/search for 'Vellore' and 'CMC'."""
    # Search for CMC
    res_cmc = client.get("/api/healthcare/search?q=CMC")
    assert res_cmc.status_code == 200
    cmc_data = res_cmc.json()
    assert len(cmc_data) >= 1
    assert any("CMC" in item["name"] or "Christian Medical College" in item["name"] for item in cmc_data)

    # Search for Vellore
    res_vellore = client.get("/api/healthcare/search?q=Vellore")
    assert res_vellore.status_code == 200
    vellore_data = res_vellore.json()
    assert len(vellore_data) >= 3


def test_hospital_details_endpoint():
    """Validates GET /api/healthcare/hospitals/{hospital_id} and 404 behavior."""
    # Known ID
    res = client.get("/api/healthcare/hospitals/cmc-vellore-main")
    assert res.status_code == 200
    item = res.json()
    assert item["id"] == "cmc-vellore-main"
    assert "Christian Medical College" in item["name"]
    assert item["cardiology"] is True
    assert item["emergency_available"] is True
    assert item["emergency_24_7"] is True
    assert item["latitude"] == 12.9248
    assert item["longitude"] == 79.1348

    # Non-existent ID -> 404
    res_404 = client.get("/api/healthcare/hospitals/non-existent-facility-id")
    assert res_404.status_code == 404


def test_hospital_filtering():
    """Validates cardiology and emergency filtering."""
    # Filter 24/7 emergency only
    res_24_7 = client.get("/api/healthcare/hospitals/nearby?latitude=12.9165&longitude=79.1325&radius_km=50&emergency_24_7=true")
    assert res_24_7.status_code == 200
    items = res_24_7.json()["results"]
    for it in items:
        assert it["emergency_24_7"] is True


def test_invalid_coordinates_handling():
    """Validates that out-of-range coordinates return appropriate 422 validation errors."""
    res_invalid_lat = client.get("/api/healthcare/hospitals/nearby?latitude=195.0&longitude=79.1325")
    assert res_invalid_lat.status_code == 422  # Pydantic validation error

    res_invalid_lon = client.get("/api/healthcare/hospitals/nearby?latitude=12.9&longitude=250.0")
    assert res_invalid_lon.status_code == 422


def test_geocode_endpoint():
    """Validates GET /api/healthcare/geocode."""
    res = client.get("/api/healthcare/geocode?query=Vellore")
    assert res.status_code == 200
    data = res.json()
    assert 12.8 <= data["latitude"] <= 13.0
    assert 79.0 <= data["longitude"] <= 79.2


if __name__ == "__main__":
    print("Running healthcare facility test suite...")
    test_haversine_distance_calculation()
    print("[OK] test_haversine_distance_calculation passed")
    test_verified_hospitals_loaded()
    print("[OK] test_verified_hospitals_loaded passed")
    test_nearby_hospitals_vellore_api()
    print("[OK] test_nearby_hospitals_vellore_api passed")
    test_search_hospitals_endpoint()
    print("[OK] test_search_hospitals_endpoint passed")
    test_hospital_details_endpoint()
    print("[OK] test_hospital_details_endpoint passed")
    test_hospital_filtering()
    print("[OK] test_hospital_filtering passed")
    test_invalid_coordinates_handling()
    print("[OK] test_invalid_coordinates_handling passed")
    test_geocode_endpoint()
    print("[OK] test_geocode_endpoint passed")
    print("\nALL 8 HEALTHCARE FACILITY TESTS PASSED SUCCESSFULLY!")
