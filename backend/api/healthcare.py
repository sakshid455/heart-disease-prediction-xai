"""
Healthcare Facility & Cardiology Hospital Finder API Router
Provides endpoints for locating cardiology facilities, emergency services,
performing nearby spatial queries, and retrieving verified facility metadata.
"""

from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query, status

from backend.schemas.hospital import (
    Hospital,
    HospitalWithDistance,
    NearbyHospitalsResponse,
    LocationCoordinates,
)
from backend.services.hospital_service import hospital_service

router = APIRouter()


@router.get(
    "/search",
    response_model=List[HospitalWithDistance],
    summary="Search hospitals by text query, city, or area",
    description="Search facilities by name, city, specialty or address with optional user coordinate distance computation.",
)
async def search_hospitals(
    q: str = Query(..., min_length=1, description="Search query string (e.g. 'Vellore', 'CMC', 'Cardiology')"),
    latitude: Optional[float] = Query(None, ge=-90.0, le=90.0, description="Optional user latitude for distance sorting"),
    longitude: Optional[float] = Query(None, ge=-180.0, le=180.0, description="Optional user longitude for distance sorting"),
    radius_km: Optional[float] = Query(None, gt=0, le=500.0, description="Optional maximum distance filter in km"),
    cardiology_only: Optional[bool] = Query(None, description="Filter cardiology capable facilities"),
    emergency_only: Optional[bool] = Query(None, description="Filter emergency capable facilities"),
):
    try:
        results = hospital_service.search_hospitals(
            query=q,
            user_lat=latitude,
            user_lon=longitude,
            radius_km=radius_km,
            cardiology_only=cardiology_only,
            emergency_only=emergency_only,
        )
        return results
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to execute hospital search: {str(e)}"
        )


@router.get(
    "/hospitals",
    response_model=List[Hospital],
    summary="List all hospitals with optional attribute filtering",
    description="Retrieve hospital directory filtered by specialty, emergency services, type, or city.",
)
async def list_hospitals(
    cardiology_only: Optional[bool] = Query(None, description="Filter by cardiology capability"),
    emergency_only: Optional[bool] = Query(None, description="Filter by emergency services availability"),
    cardiac_surgery: Optional[bool] = Query(None, description="Filter by cardiac surgery availability"),
    hospital_type: Optional[str] = Query(None, description="Filter by hospital type (e.g. 'Specialty Hospital')"),
    city: Optional[str] = Query(None, description="Filter by city name"),
):
    try:
        return hospital_service.get_all_hospitals(
            cardiology_only=cardiology_only,
            emergency_only=emergency_only,
            cardiac_surgery=cardiac_surgery,
            hospital_type=hospital_type,
            city=city,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve hospitals: {str(e)}"
        )


@router.get(
    "/hospitals/nearby",
    response_model=NearbyHospitalsResponse,
    summary="Find nearby cardiology hospitals within a geographical radius",
    description="Calculates dynamic Haversine distance from input coordinates and returns nearest facilities.",
)
async def find_nearby_hospitals(
    latitude: float = Query(..., ge=-90.0, le=90.0, description="User or query latitude"),
    longitude: float = Query(..., ge=-180.0, le=180.0, description="User or query longitude"),
    radius_km: float = Query(25.0, gt=0, le=200.0, description="Search radius in kilometers (default: 25 km)"),
    cardiology: bool = Query(True, description="Require cardiology care capabilities"),
    emergency: Optional[bool] = Query(None, description="Require emergency availability"),
    emergency_24_7: Optional[bool] = Query(None, description="Require 24/7 emergency service"),
    cardiac_surgery: Optional[bool] = Query(None, description="Require cardiac surgery unit"),
    hospital_type: Optional[str] = Query(None, description="Filter by facility type"),
    limit: int = Query(50, ge=1, le=100, description="Maximum number of facilities to return"),
):
    try:
        response = hospital_service.find_nearby_hospitals(
            latitude=latitude,
            longitude=longitude,
            radius_km=radius_km,
            cardiology_only=cardiology,
            emergency_only=emergency,
            emergency_24_7_only=emergency_24_7,
            cardiac_surgery_only=cardiac_surgery,
            hospital_type=hospital_type,
            limit=limit,
        )
        return response
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error finding nearby hospitals: {str(e)}"
        )


@router.get(
    "/hospitals/{hospital_id}",
    response_model=Hospital,
    summary="Get verified details of a specific hospital",
    description="Returns complete verified profile, contact details, coordinates, and services.",
)
async def get_hospital_details(hospital_id: str):
    hospital = hospital_service.get_hospital_by_id(hospital_id)
    if not hospital:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Hospital with ID '{hospital_id}' not found in registry"
        )
    return hospital


@router.get(
    "/cardiology",
    response_model=List[Hospital],
    summary="Get all cardiology-capable medical facilities",
    description="Convenience endpoint returning all facilities with dedicated cardiology services.",
)
async def get_cardiology_facilities():
    return hospital_service.get_all_hospitals(cardiology_only=True)


@router.get(
    "/emergency",
    response_model=List[Hospital],
    summary="Get all verified emergency healthcare facilities",
    description="Convenience endpoint returning facilities with verified emergency response care.",
)
async def get_emergency_facilities():
    return hospital_service.get_all_hospitals(emergency_only=True)


@router.get(
    "/geocode",
    response_model=LocationCoordinates,
    summary="Geocode a location query to coordinates",
    description="Resolves city or place names (e.g. 'Vellore', 'Chennai') to geographic coordinates.",
)
async def geocode_location(
    query: str = Query(..., min_length=2, description="Place or city name")
):
    coords = hospital_service.geocode_location(query)
    if not coords:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Could not resolve coordinates for '{query}'. Please enter latitude and longitude manually."
        )
    return coords
