"""
Re-export Hospital models from schemas.hospital for convenient access.
"""
from backend.schemas.hospital import (
    Hospital,
    HospitalBase,
    HospitalWithDistance,
    LocationCoordinates,
    NearbyHospitalsResponse,
    HospitalFilterParams,
)

__all__ = [
    "Hospital",
    "HospitalBase",
    "HospitalWithDistance",
    "LocationCoordinates",
    "NearbyHospitalsResponse",
    "HospitalFilterParams",
]
