"""
HeartAI Backend Configuration
Centralized configuration management for paths, CORS settings, and environment variables.
"""

import os
from typing import List
from pydantic import BaseModel, Field


class Settings(BaseModel):
    PROJECT_NAME: str = "HeartAI API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Host & Port
    HOST: str = os.getenv("BACKEND_HOST", "127.0.0.1")
    PORT: int = int(os.getenv("BACKEND_PORT", "8000"))
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # CORS Configuration
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    ALLOWED_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )
    
    # Paths to ML Artifacts & Results
    BASE_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    @property
    def MODEL_BUNDLE_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "models", "optimal_model.joblib")

    @property
    def LEGACY_RF_MODEL_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "models", "heart_disease_rf.pkl")

    @property
    def DATA_CLEAN_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "data", "processed", "large_clean.csv")

    @property
    def DATA_TRAIN_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "data", "processed", "large_train.csv")

    @property
    def DATA_TEST_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "data", "processed", "large_test.csv")

    @property
    def DATA_SYNTHETIC_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "data", "processed", "large_synthetic_ctgan.csv")

    @property
    def OPTIMAL_CONFIG_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "results", "optimal_configuration.json")

    @property
    def ADAPTIVE_RESULTS_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "results", "adaptive_model_comparison.csv")

    @property
    def CTGAN_CONFIG_PATH(self) -> str:
        return os.path.join(self.BASE_DIR, "results", "ctgan_training_config.json")


settings = Settings()
