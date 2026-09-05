"""
Pydantic schemas for CardioAI Research Endpoints.
"""

from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field


class CounterfactualRequest(BaseModel):
    features: Dict[str, float] = Field(
        ...,
        description="Patient clinical feature dictionary (e.g. age, ap_hi, ap_lo, cholesterol, etc.)",
        example={
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
    )
    model_name: Optional[str] = Field("Logistic Regression", description="Model architecture to probe")
    max_changes: Optional[int] = Field(4, description="Maximum actionable features to modify")


class ResearchEndpointResponse(BaseModel):
    status: str = "success"
    timestamp: str
    data: Dict[str, Any]
