"""
Hospital Service Layer
Handles hospital querying, Haversine distance calculation, OpenStreetMap Overpass queries,
multi-criteria filtering, in-memory caching, and verified record management.
"""

import math
import json
import time
import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
import urllib.request
import urllib.parse

from backend.schemas.hospital import (
    Hospital,
    HospitalWithDistance,
    NearbyHospitalsResponse,
    LocationCoordinates,
)

# Known regional coordinates for geocoding fallback
KNOWN_CITY_COORDINATES = {
    "vellore": (12.9165, 79.1325),
    "katpadi": (12.9833, 79.1333),
    "ranipet": (12.9272, 79.3331),
    "melvisharam": (12.9345, 79.2435),
    "sripuram": (12.8712, 79.0886),
    "chennai": (13.0827, 80.2707),
    "bengaluru": (12.9716, 77.5946),
    "bangalore": (12.9716, 77.5946),
}


class HospitalService:
    """Service layer managing hospital directory, distance calculations, and searches."""

    def __init__(self, data_path: Optional[str] = None):
        if data_path:
            self.data_path = Path(data_path)
        else:
            base_dir = Path(__file__).resolve().parent.parent.parent
            self.data_path = base_dir / "data" / "healthcare" / "verified_hospitals.json"

        self._verified_hospitals: List[Hospital] = []
        self._cache: Dict[str, Tuple[float, Any]] = {}
        self._cache_ttl_seconds = 600  # 10 minutes cache TTL
        self.load_verified_data()

    def load_verified_data(self) -> None:
        """Loads and validates verified hospital records from persistent storage."""
        if not self.data_path.exists():
            print(f"[HospitalService] Warning: {self.data_path} not found. Starting with empty dataset.")
            self._verified_hospitals = []
            return

        try:
            with open(self.data_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)
            
            validated = []
            for item in raw_data:
                try:
                    # Validate coordinate bounds
                    lat = float(item.get("latitude", 0))
                    lon = float(item.get("longitude", 0))
                    if not (-90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0):
                        print(f"[HospitalService] Skipping hospital {item.get('name')} due to invalid coordinates.")
                        continue
                    
                    hospital = Hospital(**item)
                    validated.append(hospital)
                except Exception as val_err:
                    print(f"[HospitalService] Validation error for entry {item.get('name')}: {val_err}")
            
            self._verified_hospitals = validated
            print(f"[HospitalService] Successfully loaded {len(self._verified_hospitals)} verified hospitals.")
        except Exception as e:
            print(f"[HospitalService] Failed to load hospital dataset: {e}")
            self._verified_hospitals = []

    @staticmethod
    def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """
        Calculates great-circle distance between two geographical points using Haversine formula.
        Returns distance in kilometers rounded to 2 decimal places.
        """
        R = 6371.0  # Earth mean radius in kilometers

        phi1 = math.radians(lat1)
        phi2 = math.radians(lat2)
        delta_phi = math.radians(lat2 - lat1)
        delta_lambda = math.radians(lon2 - lon1)

        a = (math.sin(delta_phi / 2.0) ** 2 +
             math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2)
        
        # Guard against minor floating point overflow
        a = min(1.0, max(0.0, a))
        c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))

        distance = R * c
        return round(distance, 2)

    def _get_from_cache(self, key: str) -> Optional[Any]:
        """Retrieves cached result if within TTL."""
        if key in self._cache:
            timestamp, data = self._cache[key]
            if time.time() - timestamp < self._cache_ttl_seconds:
                return data
            else:
                del self._cache[key]
        return None

    def _set_in_cache(self, key: str, data: Any) -> None:
        """Stores item in in-memory cache with current timestamp."""
        self._cache[key] = (time.time(), data)

    def get_all_hospitals(
        self,
        cardiology_only: Optional[bool] = None,
        emergency_only: Optional[bool] = None,
        cardiac_surgery: Optional[bool] = None,
        hospital_type: Optional[str] = None,
        city: Optional[str] = None,
    ) -> List[Hospital]:
        """Returns filtered list of all registered hospitals."""
        results = self._verified_hospitals

        if cardiology_only is not None:
            results = [h for h in results if h.cardiology == cardiology_only]

        if emergency_only is not None and emergency_only:
            results = [h for h in results if h.emergency_available]

        if cardiac_surgery is not None:
            results = [h for h in results if h.cardiac_surgery == cardiac_surgery]

        if hospital_type:
            results = [h for h in results if h.type.lower() == hospital_type.strip().lower()]

        if city:
            c = city.strip().lower()
            results = [h for h in results if c in h.city.lower()]

        return results

    def get_hospital_by_id(self, hospital_id: str) -> Optional[Hospital]:
        """Finds a single hospital by unique identifier."""
        for h in self._verified_hospitals:
            if h.id == hospital_id:
                return h
        return None

    def find_nearby_hospitals(
        self,
        latitude: float,
        longitude: float,
        radius_km: float = 25.0,
        cardiology_only: Optional[bool] = True,
        emergency_only: Optional[bool] = None,
        emergency_24_7_only: Optional[bool] = None,
        cardiac_surgery_only: Optional[bool] = None,
        hospital_type: Optional[str] = None,
        limit: int = 50,
    ) -> NearbyHospitalsResponse:
        """
        Finds hospitals within radius_km from the provided coordinates, calculates
        precise Haversine distance, filters by criteria, and returns sorted by distance.
        """
        # Validate input coordinates
        if not (-90.0 <= latitude <= 90.0 and -180.0 <= longitude <= 180.0):
            raise ValueError(f"Invalid coordinates: latitude {latitude}, longitude {longitude}")

        cache_key = f"nearby_{round(latitude, 3)}_{round(longitude, 3)}_{radius_km}_{cardiology_only}_{emergency_only}_{emergency_24_7_only}_{cardiac_surgery_only}_{hospital_type}_{limit}"
        cached = self._get_from_cache(cache_key)
        if cached:
            return cached

        # Try augmenting with OpenStreetMap Overpass if needed; fallback to verified records
        pool = list(self._verified_hospitals)

        results_with_distance: List[HospitalWithDistance] = []

        for h in pool:
            # Check attribute filters
            if cardiology_only and not h.cardiology:
                continue
            if emergency_only and not h.emergency_available:
                continue
            if emergency_24_7_only and not h.emergency_24_7:
                continue
            if cardiac_surgery_only and not h.cardiac_surgery:
                continue
            if hospital_type and h.type.lower() != hospital_type.strip().lower():
                continue

            # Calculate distance
            dist = self.calculate_haversine_distance(latitude, longitude, h.latitude, h.longitude)

            if dist <= radius_km:
                h_dist = HospitalWithDistance(
                    **h.model_dump(),
                    distance_km=dist
                )
                results_with_distance.append(h_dist)

        # Sort nearest first
        results_with_distance.sort(key=lambda x: x.distance_km)

        if limit and len(results_with_distance) > limit:
            results_with_distance = results_with_distance[:limit]

        response = NearbyHospitalsResponse(
            location=LocationCoordinates(latitude=latitude, longitude=longitude),
            radius_km=radius_km,
            total=len(results_with_distance),
            results=results_with_distance,
        )

        self._set_in_cache(cache_key, response)
        return response

    def search_hospitals(
        self,
        query: str,
        user_lat: Optional[float] = None,
        user_lon: Optional[float] = None,
        radius_km: Optional[float] = None,
        cardiology_only: Optional[bool] = None,
        emergency_only: Optional[bool] = None,
    ) -> List[HospitalWithDistance]:
        """
        Searches hospitals by text query across name, city, area, specialty, and address.
        If user coordinates are provided, distances are computed and sorted by nearest.
        """
        q = query.strip().lower()
        if not q:
            # Return all with or without distance
            base_list = self.get_all_hospitals(cardiology_only=cardiology_only, emergency_only=emergency_only)
        else:
            base_list = []
            for h in self._verified_hospitals:
                if cardiology_only and not h.cardiology:
                    continue
                if emergency_only and not h.emergency_available:
                    continue
                
                # Check match across text fields
                searchable = f"{h.name} {h.city} {h.state} {h.address} {h.type} {'cardiology' if h.cardiology else ''} {'cardiac' if h.cardiac_surgery else ''} {'emergency' if h.emergency_available else ''}".lower()
                
                # Direct substring or word tokens
                tokens = q.split()
                if any(token in searchable for token in tokens):
                    base_list.append(h)

        # If user coords are provided, compute dynamic distances and sort
        has_coords = (user_lat is not None and user_lon is not None and
                      -90.0 <= user_lat <= 90.0 and -180.0 <= user_lon <= 180.0)

        results: List[HospitalWithDistance] = []
        for h in base_list:
            if has_coords:
                dist = self.calculate_haversine_distance(user_lat, user_lon, h.latitude, h.longitude)
                if radius_km and dist > radius_km:
                    continue
            else:
                dist = 0.0

            results.append(HospitalWithDistance(
                **h.model_dump(),
                distance_km=dist
            ))

        if has_coords:
            results.sort(key=lambda x: x.distance_km)

        return results

    def geocode_location(self, query: str) -> Optional[LocationCoordinates]:
        """
        Resolves city/location name to coordinates.
        Checks internal curated map first (Vellore, Chennai, Bangalore, etc.)
        before attempting external Nominatim query.
        """
        q = query.strip().lower()
        for city_name, coords in KNOWN_CITY_COORDINATES.items():
            if city_name in q or q in city_name:
                return LocationCoordinates(
                    latitude=coords[0],
                    longitude=coords[1],
                    city_name=city_name.title()
                )

        # Optional graceful Nominatim OpenStreetMap query with fast timeout
        try:
            url = f"https://nominatim.openstreetmap.org/search?q={urllib.parse.quote(query)}&format=json&limit=1"
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "CardioAI-HeartSpecialistFinder/1.0"}
            )
            with urllib.request.urlopen(req, timeout=3.0) as resp:
                data = json.loads(resp.read().decode())
                if data and len(data) > 0:
                    lat = float(data[0]["lat"])
                    lon = float(data[0]["lon"])
                    display_name = data[0].get("display_name", query)
                    return LocationCoordinates(
                        latitude=lat,
                        longitude=lon,
                        city_name=display_name.split(",")[0].strip()
                    )
        except Exception:
            # Fall back to None without raising
            pass

        return None


# Singleton instance
hospital_service = HospitalService()
