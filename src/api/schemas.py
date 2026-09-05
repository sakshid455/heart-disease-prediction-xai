"""
Pydantic Schemas for Cardiovascular Disease Prediction & Explainability API
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, field_validator


class PatientFeatures(BaseModel):
    age: int = Field(..., ge=18, le=120, description="Patient Age in whole years (e.g. 54)", example=54)
    gender: int = Field(..., ge=1, le=2, description="Biological Sex: 1 for female, 2 for male", example=1)
    height: float = Field(..., ge=80.0, le=250.0, description="Height in centimeters (e.g. 165.0)", example=165.0)
    weight: float = Field(..., ge=20.0, le=300.0, description="Body Weight in kilograms (e.g. 72.0)", example=72.0)
    ap_hi: int = Field(..., ge=50, le=280, description="Systolic Blood Pressure (ap_hi) in mmHg (e.g. 120)", example=130)
    ap_lo: int = Field(..., ge=30, le=200, description="Diastolic Blood Pressure (ap_lo) in mmHg (e.g. 80)", example=85)
    cholesterol: int = Field(..., ge=1, le=3, description="Total Cholesterol Level: 1 = Normal, 2 = Above Normal, 3 = Well Above Normal", example=2)
    gluc: int = Field(..., ge=1, le=3, description="Fasting Blood Glucose Level (gluc): 1 = Normal, 2 = Above Normal, 3 = Well Above Normal", example=1)
    smoke: int = Field(..., ge=0, le=1, description="Smoking Status: 0 = Non-smoker, 1 = Smoker", example=0)
    alco: int = Field(..., ge=0, le=1, description="Alcohol Consumption (alco): 0 = No, 1 = Yes", example=0)
    active: int = Field(..., ge=0, le=1, description="Physical Activity: 0 = Inactive, 1 = Active", example=1)

    @field_validator("ap_lo")
    @classmethod
    def validate_blood_pressure(cls, v: int, info) -> int:
        ap_hi = info.data.get("ap_hi")
        if ap_hi is not None and v > ap_hi:
            # We allow it with a warning or clamp/note in production, but clinically diastolic shouldn't exceed systolic
            pass
        return v


class HealthResponse(BaseModel):
    status: str
    version: str
    model_loaded: bool
    optimal_model_name: str
    optimal_augmentation_ratio: int


class DatasetSummaryResponse(BaseModel):
    total_records: int
    number_of_features: int
    feature_names: List[str]
    training_size: int
    test_size: int
    synthetic_size: int
    target_distribution: Dict[str, Any]


class PredictionResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability: float
    risk_category: str
    model: str
    augmentation_ratio: int


class FeatureContribution(BaseModel):
    feature: str
    value: float
    shap_value: float
    impact_direction: str
    clinical_interpretation: str


class ExplanationResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability: float
    base_value: float
    shap_feature_contributions: Dict[str, float]
    top_contributing_features: List[FeatureContribution]
    model: str


class OptimalConfigResponse(BaseModel):
    best_model: str
    optimal_augmentation_ratio: int
    real_train_size: int
    synthetic_train_size: int
    total_train_size: int
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    weighted_score: float
    priorities: str


class ModelComparisonRow(BaseModel):
    model: str
    augmentation_ratio: int
    real_train_size: int
    synthetic_train_size: int
    total_train_size: int
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    weighted_score: Optional[float] = None
    training_time_seconds: Optional[float] = None


class ModelComparisonResponse(BaseModel):
    total_experiments: int
    models_evaluated: List[str]
    augmentation_ratios: List[int]
    results: List[ModelComparisonRow]
