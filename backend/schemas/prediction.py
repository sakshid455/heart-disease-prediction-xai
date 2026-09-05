"""
Pydantic Request Schemas for Patient Prediction & Explainability
Supports both the 13-feature Cleveland Clinical model and the 11-feature large cohort model.
"""

from typing import Optional
from pydantic import BaseModel, Field


class ClinicalPatientFeatures(BaseModel):
    """
    13-feature Cleveland clinical assessment profile.
    Used by the trained RandomForest classifier (models/heart_disease_rf.pkl).
    """
    age: int = Field(50, ge=18, le=120, description="Patient age in completed years (18-120)")
    sex: int = Field(1, ge=0, le=1, description="Biological sex (0: Female, 1: Male)")
    cp: int = Field(1, ge=1, le=4, description="Chest Pain Type (1: Typical Angina, 2: Atypical Angina, 3: Non-Anginal, 4: Asymptomatic)")
    trestbps: int = Field(120, ge=50, le=250, description="Resting Blood Pressure in mmHg (50-250)")
    chol: int = Field(200, ge=50, le=600, description="Serum Cholesterol in mg/dL (50-600)")
    fbs: int = Field(0, ge=0, le=1, description="Fasting Blood Sugar > 120 mg/dL (0: No, 1: Yes)")
    restecg: int = Field(0, ge=0, le=2, description="Resting ECG (0: Normal, 1: ST-T wave abnormality, 2: Left ventricular hypertrophy)")
    thalach: int = Field(150, ge=50, le=250, description="Maximum Heart Rate Achieved (50-250)")
    exang: int = Field(0, ge=0, le=1, description="Exercise-Induced Angina (0: No, 1: Yes)")
    oldpeak: float = Field(1.0, ge=0.0, le=10.0, description="ST depression induced by exercise relative to rest (0.0-10.0)")
    slope: int = Field(1, ge=1, le=3, description="Slope of the peak exercise ST segment (1: Upsloping, 2: Flat, 3: Downsloping)")
    ca: int = Field(0, ge=0, le=3, description="Number of major vessels colored by fluoroscopy (0-3)")
    thal: int = Field(3, ge=1, le=7, description="Thalassemia (3: Normal, 6: Fixed defect, 7: Reversible defect)")


class PatientFeatures(BaseModel):
    """
    11-feature demographic & clinical cohort model (models/optimal_model.joblib).
    """
    age: int = Field(..., ge=18, le=120, description="Patient age in whole completed years", example=55)
    gender: int = Field(..., ge=1, le=2, description="Biological sex at birth (1: Female, 2: Male)", example=2)
    height: float = Field(..., ge=100.0, le=220.0, description="Standing height in centimeters (cm)", example=175.0)
    weight: float = Field(..., ge=30.0, le=250.0, description="Body weight in kilograms (kg)", example=80.0)
    ap_hi: int = Field(..., ge=60, le=240, description="Systolic blood pressure in mmHg", example=135)
    ap_lo: int = Field(..., ge=40, le=160, description="Diastolic blood pressure in mmHg", example=85)
    cholesterol: int = Field(..., ge=1, le=3, description="Total serum cholesterol (1: Normal, 2: Above Normal, 3: Well Above Normal)", example=2)
    gluc: int = Field(..., ge=1, le=3, description="Fasting blood glucose (1: Normal, 2: Above Normal, 3: Well Above Normal)", example=1)
    smoke: int = Field(..., ge=0, le=1, description="Active tobacco smoking status (0: Non-smoker, 1: Smoker)", example=0)
    alco: int = Field(..., ge=0, le=1, description="Regular alcohol consumption (0: Non-consumer, 1: Consumer)", example=0)
    active: int = Field(..., ge=0, le=1, description="Physical activity / exercise lifestyle (0: Inactive, 1: Active)", example=1)


class UnifiedPatientFeatures(BaseModel):
    """
    Unified payload allowing either 13-feature clinical or 11-feature cohort parameters.
    """
    age: int = Field(50, ge=18, le=120)
    
    # Clinical 13-feature fields
    sex: Optional[int] = Field(None, ge=0, le=1)
    cp: Optional[int] = Field(None, ge=1, le=4)
    trestbps: Optional[int] = Field(None, ge=50, le=250)
    chol: Optional[int] = Field(None, ge=50, le=600)
    fbs: Optional[int] = Field(None, ge=0, le=1)
    restecg: Optional[int] = Field(None, ge=0, le=2)
    thalach: Optional[int] = Field(None, ge=50, le=250)
    exang: Optional[int] = Field(None, ge=0, le=1)
    oldpeak: Optional[float] = Field(None, ge=0.0, le=10.0)
    slope: Optional[int] = Field(None, ge=1, le=3)
    ca: Optional[int] = Field(None, ge=0, le=3)
    thal: Optional[int] = Field(None, ge=1, le=7)

    # 11-feature cohort fields
    gender: Optional[int] = Field(None, ge=1, le=2)
    height: Optional[float] = Field(None, ge=80.0, le=250.0)
    weight: Optional[float] = Field(None, ge=20.0, le=300.0)
    ap_hi: Optional[int] = Field(None, ge=50, le=280)
    ap_lo: Optional[int] = Field(None, ge=30, le=200)
    cholesterol: Optional[int] = Field(None, ge=1, le=3)
    gluc: Optional[int] = Field(None, ge=1, le=3)
    smoke: Optional[int] = Field(None, ge=0, le=1)
    alco: Optional[int] = Field(None, ge=0, le=1)
    active: Optional[int] = Field(None, ge=0, le=1)
