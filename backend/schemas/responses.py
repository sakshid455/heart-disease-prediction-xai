"""
Pydantic Response Schemas for HeartAI Endpoints
"""

from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", example="healthy")
    service: str = Field(default="HeartAI API", example="HeartAI API")
    version: str = Field(default="1.0.0", example="1.0.0")
    model_loaded: bool = Field(default=True)
    optimal_model: Optional[str] = Field(default="Logistic Regression")


class DatasetSummaryResponse(BaseModel):
    dataset_name: str = Field(example="Cardiovascular Disease Dataset (Kaggle/Ulianova)")
    total_records: int = Field(example=68612)
    number_of_features: int = Field(example=11)
    numerical_features_count: int = Field(example=5)
    categorical_features_count: int = Field(example=6)
    training_records: int = Field(example=54889)
    testing_records: int = Field(example=13723)
    missing_value_count: int = Field(default=0, example=0)
    target_distribution: Dict[str, Any] = Field(
        example={
            "class_0_negative_count": 34664,
            "class_1_positive_count": 33948,
            "negative_percentage": 50.52,
            "positive_percentage": 49.48
        }
    )
    feature_names: List[str] = Field(
        example=["age", "gender", "height", "weight", "ap_hi", "ap_lo", "cholesterol", "gluc", "smoke", "alco", "active"]
    )


class ModelItem(BaseModel):
    name: str = Field(example="Logistic Regression")
    type: str = Field(example="Linear Probabilistic Classifier")
    is_trained: bool = Field(default=True)
    artifact_key: str = Field(example="optimal_model.joblib")
    augmentation_ratio: Optional[str] = Field(default="200%")
    is_optimal: bool = Field(default=False)


class ModelInfoResponse(BaseModel):
    total_models_available: int = Field(example=2)
    models: List[ModelItem]


class OptimalConfigResponse(BaseModel):
    best_model: str = Field(example="Logistic Regression")
    optimal_augmentation_ratio: str = Field(example="200%")
    training_size: int = Field(example=54889)
    synthetic_training_size: int = Field(example=109778)
    total_training_size: int = Field(example=164667)
    accuracy: float = Field(example=0.720979)
    precision: float = Field(example=0.709376)
    recall: float = Field(example=0.738733)
    f1_score: float = Field(example=0.723757)
    roc_auc: float = Field(example=0.789407)
    weighted_score: Optional[float] = Field(default=0.749443)
    priorities: Optional[str] = Field(default="1. Recall (0.40), 2. ROC-AUC (0.30), 3. F1-Score (0.30)")


class AugmentationResultItem(BaseModel):
    model: str = Field(example="Logistic Regression")
    augmentation_ratio: str = Field(example="200%")
    real_train_size: int = Field(example=54889)
    synthetic_train_size: int = Field(example=109778)
    total_train_size: int = Field(example=164667)
    accuracy: float = Field(example=0.720979)
    precision: float = Field(example=0.709376)
    recall: float = Field(example=0.738733)
    f1_score: float = Field(example=0.723757)
    roc_auc: float = Field(example=0.789407)


class ModelComparisonRow(BaseModel):
    model: str
    augmentation_ratio: str
    real_train_size: int
    synthetic_train_size: int
    total_train_size: int
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    weighted_score: Optional[float] = None


class ModelComparisonResponse(BaseModel):
    total_experiments: int = Field(example=28)
    models_evaluated: List[str]
    augmentation_ratios: List[str]
    results: List[ModelComparisonRow]


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="0 for No CVD, 1 for CVD Present", example=1)
    prediction_label: str = Field(..., example="Cardiovascular Disease Present")
    probability: float = Field(..., description="Posterior probability score (0.0 to 1.0)", example=0.826)
    probability_class_0: float = Field(default=0.174, description="Posterior probability of class 0 (No Disease)", example=0.174)
    probability_class_1: float = Field(default=0.826, description="Posterior probability of class 1 (Disease Present)", example=0.826)
    decision_threshold: float = Field(default=0.45, description="Calibrated classification decision threshold", example=0.45)
    risk_category: str = Field(..., example="High Risk")
    model: str = Field(..., example="Logistic Regression")
    model_name: str = Field(default="Logistic Regression", example="Logistic Regression")
    model_version: str = Field(default="1.0.0", example="1.0.0")
    augmentation_ratio: str = Field(..., example="200%")
    is_research_prediction: bool = Field(default=True, description="Indicates prediction is from a research model")
    medical_diagnosis: bool = Field(default=False, description="Explicit flag affirming output is NOT a medical diagnosis")


class FeatureContribution(BaseModel):
    feature: str = Field(example="ap_hi")
    value: float = Field(example=160.0)
    shap_value: float = Field(example=0.8421)
    impact: str = Field(example="positive", description="positive (increases risk) or negative (reduces risk)")
    clinical_interpretation: str = Field(example="Systolic Blood Pressure (160 mmHg): Contributed to the model prediction by increasing predicted risk (+0.842 log-odds).")


class ExplanationResponse(BaseModel):
    prediction: int = Field(example=1)
    prediction_label: str = Field(example="Cardiovascular Disease Present")
    probability: float = Field(example=0.826)
    model: str = Field(example="Logistic Regression")
    model_name: str = Field(default="Logistic Regression", example="Logistic Regression")
    augmentation_ratio: str = Field(example="200%")
    base_value: float = Field(example=0.12)
    top_shap_features: List[FeatureContribution] = Field(default_factory=list)
    feature_contributions: List[FeatureContribution] = Field(default_factory=list)
    features: List[FeatureContribution] = Field(default_factory=list)
    top_positive_contributors: List[FeatureContribution] = Field(default_factory=list)
    top_negative_contributors: List[FeatureContribution] = Field(default_factory=list)
    research_note: str = Field(
        default="SHAP is used to interpret how individual features contributed to the model prediction. Values reflect statistical associations within the trained model and do not establish clinical causation."
    )


class CTGANInfoResponse(BaseModel):
    model_name: str = Field(default="CTGAN", example="CTGAN")
    training_records: int = Field(example=54889)
    synthetic_records: int = Field(example=109778)
    epochs: int = Field(example=150)
    batch_size: int = Field(example=500)
    generator_lr: float = Field(example=0.0002)
    discriminator_lr: float = Field(example=0.0002)
    random_seed: int = Field(example=42)
    synthetic_ratio: float = Field(example=2.0)
    synthetic_target_distribution: Dict[str, Any] = Field(
        example={
            "class_0_negative_count": 44547,
            "class_1_positive_count": 65231,
            "negative_percentage": 40.58,
            "positive_percentage": 59.42
        }
    )
    synthetic_dataset_status: str = Field(default="Generated and Verified", example="Generated and Verified")
    quality_evaluation_status: str = Field(default="Completed (Wasserstein distance & Jensen-Shannon divergence evaluated)", example="Completed")


class ResearchResultsResponse(BaseModel):
    research_question: str = Field(
        default="What amount of synthetic data provides the most useful improvement in heart disease prediction?"
    )
    dataset_statistics: Dict[str, Any]
    ctgan_statistics: Dict[str, Any]
    synthetic_data_quality: Dict[str, Any]
    adaptive_augmentation: Dict[str, Any]
    best_model: Dict[str, Any]
    optimal_ratio: str
    robustness_results: Dict[str, Any]
    statistical_analysis: Dict[str, Any]
    sensitivity_results: Dict[str, Any]
    xai_findings: Dict[str, Any]
    fairness_results: Dict[str, Any]
    privacy_analysis: Dict[str, Any]
