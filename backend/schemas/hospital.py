"""
Hospital Data Models and Schemas
Strict, validated data schemas for Cardiology and Healthcare Facilities.
"""

from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, HttpUrl


class HospitalBase(BaseModel):
    id: str = Field(..., description="Unique slug or identifier for the facility")
    name: str = Field(..., description="Official verified facility name")
    type: str = Field("Hospital", description="Facility type: Hospital, Specialty Hospital, Clinic, Medical Centre")
    address: str = Field(..., description="Physical street address")
    city: str = Field(..., description="City or district")
    state: str = Field(..., description="State or province")
    country: str = Field("India", description="Country")
    postal_code: Optional[str] = Field(None, description="Postal / PIN code")
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Geographic latitude")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Geographic longitude")
    phone: Optional[str] = Field(None, description="Verified primary contact telephone number")
    emergency_phone: Optional[str] = Field(None, description="Direct emergency hotline if verified")
    website: Optional[str] = Field(None, description="Official facility portal URL")
    cardiology: bool = Field(True, description="Whether cardiology care is provided")
    cardiac_surgery: bool = Field(False, description="Whether cardiothoracic / cardiac surgery is available")
    emergency_available: bool = Field(True, description="Whether emergency / casualty services exist")
    emergency_24_7: bool = Field(False, description="Whether emergency department is 24/7 verified")
    cardiac_icu: bool = Field(False, description="Dedicated cardiac intensive care unit availability")
    cath_lab: bool = Field(False, description="Cardiac catheterization laboratory availability")
    source: str = Field(..., description="Verification registry or authority source")
    last_verified: str = Field(..., description="ISO date when contact & capability was verified")


class Hospital(HospitalBase):
    """Full Hospital entity representation."""
    pass


class HospitalWithDistance(HospitalBase):
    """Hospital entity with calculated dynamic user distance."""
    distance_km: float = Field(..., ge=0.0, description="Haversine distance in kilometers from query coordinates")


class LocationCoordinates(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    city_name: Optional[str] = None


class NearbyHospitalsResponse(BaseModel):
    location: LocationCoordinates
    radius_km: float
    total: int
    results: List[HospitalWithDistance]


class HospitalFilterParams(BaseModel):
    cardiology: Optional[bool] = None
    cardiac_surgery: Optional[bool] = None
    emergency_available: Optional[bool] = None
    emergency_24_7: Optional[bool] = None
    hospital_type: Optional[str] = None
    max_distance_km: Optional[float] = None
