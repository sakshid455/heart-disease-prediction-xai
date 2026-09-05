"""
FastAPI Backend API for Cardiovascular Disease Prediction & Explainability System
Serves predictions, SHAP explainability, dataset statistics, and research benchmark results.
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from src.api.schemas import (
    PatientFeatures,
    HealthResponse,
    DatasetSummaryResponse,
    PredictionResponse,
    ExplanationResponse,
    FeatureContribution,
    OptimalConfigResponse,
    ModelComparisonResponse,
    ModelComparisonRow,
)

# ------------------------------------------------------------
# 1. Application Initialization & Lifespan / Model Loading
# ------------------------------------------------------------
app = FastAPI(
    title="Cardiovascular Disease Prediction & XAI API",
    description="Production-grade API serving the optimal CTGAN-augmented machine learning model with real-time SHAP explainability.",
    version="1.0.0",
)

# Enable CORS for future frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model bundle and research artifacts
MODEL_PATH = "models/optimal_model.joblib"
DATASET_STATS_CSV = "results/final_results/dataset_statistics.csv"
ADAPTIVE_RESULTS_CSV = "results/final_results/adaptive_model_comparison.csv"
OPTIMAL_JSON = "results/final_results/optimal_configuration.json"

bundle = None
cached_dataset_stats = None
cached_model_comparison = None
cached_optimal_config = None


def load_artifacts():
    global bundle, cached_dataset_stats, cached_model_comparison, cached_optimal_config
    if os.path.exists(MODEL_PATH):
        bundle = joblib.load(MODEL_PATH)
        print(f"Loaded optimal model bundle: {bundle['model_name']} ({bundle['augmentation_ratio']}% Aug)")
    else:
        raise FileNotFoundError(f"Optimal model bundle not found at {MODEL_PATH}. Run export_optimal_model.py first.")

    if os.path.exists(OPTIMAL_JSON):
        with open(OPTIMAL_JSON, "r") as f:
            cached_optimal_config = json.load(f)

    if os.path.exists(ADAPTIVE_RESULTS_CSV):
        cached_model_comparison = pd.read_csv(ADAPTIVE_RESULTS_CSV)

    if os.path.exists(DATASET_STATS_CSV):
        cached_dataset_stats = pd.read_csv(DATASET_STATS_CSV)


# Load artifacts on module import
try:
    load_artifacts()
except Exception as e:
    print(f"Warning: Artifacts not loaded at import time: {e}")


# ------------------------------------------------------------
# 2. Endpoints
# ------------------------------------------------------------

@app.get("/health", response_model=HealthResponse, tags=["System"])
def health_check():
    """Returns the API status and optimal model configuration info."""
    if bundle is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model bundle is not loaded.",
        )
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        model_loaded=True,
        optimal_model_name=bundle.get("model_name", "Logistic Regression"),
        optimal_augmentation_ratio=bundle.get("augmentation_ratio", 200),
    )


@app.get("/dataset-summary", response_model=DatasetSummaryResponse, tags=["Research Data"])
def get_dataset_summary():
    """Returns dataset dimensions, features, train/test split sizes, and target distributions."""
    try:
        # Load from active processed files
        train_df = pd.read_csv("data/processed/large_train.csv")
        test_df = pd.read_csv("data/processed/large_test.csv")
        synth_df = pd.read_csv("data/processed/large_synthetic_ctgan.csv")

        total_rows = len(train_df) + len(test_df)
        features = [c for c in train_df.columns if c != "cardio"]

        cardio_train_pos = int(train_df["cardio"].sum())
        cardio_test_pos = int(test_df["cardio"].sum())
        total_pos = cardio_train_pos + cardio_test_pos

        return DatasetSummaryResponse(
            total_records=total_rows,
            number_of_features=len(features),
            feature_names=features,
            training_size=len(train_df),
            test_size=len(test_df),
            synthetic_size=len(synth_df),
            target_distribution={
                "negative_count_train": int(len(train_df) - cardio_train_pos),
                "positive_count_train": cardio_train_pos,
                "positive_percentage_train": round(float(cardio_train_pos / len(train_df) * 100), 2),
                "negative_count_test": int(len(test_df) - cardio_test_pos),
                "positive_count_test": cardio_test_pos,
                "positive_percentage_test": round(float(cardio_test_pos / len(test_df) * 100), 2),
                "total_positive_percentage": round(float(total_pos / total_rows * 100), 2),
            },
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to load dataset summary: {str(e)}",
        )


@app.get("/augmentation-results", tags=["Research Data"])
def get_augmentation_results():
    """Returns the multi-ratio adaptive augmentation experiment results."""
    try:
        if cached_model_comparison is not None:
            df = cached_model_comparison
        else:
            df = pd.read_csv("results/adaptive_model_comparison.csv")
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve augmentation results: {str(e)}",
        )


@app.get("/optimal-configuration", response_model=OptimalConfigResponse, tags=["Research Data"])
def get_optimal_configuration():
    """Returns the optimal model architecture, augmentation ratio, and held-out test performance."""
    try:
        if cached_optimal_config is not None:
            cfg = cached_optimal_config
        else:
            with open(OPTIMAL_JSON, "r") as f:
                cfg = json.load(f)

        return OptimalConfigResponse(
            best_model=cfg["best_model"],
            optimal_augmentation_ratio=cfg["optimal_augmentation_ratio"],
            real_train_size=cfg["real_train_size"],
            synthetic_train_size=cfg["synthetic_train_size"],
            total_train_size=cfg["total_train_size"],
            accuracy=cfg["accuracy"],
            precision=cfg["precision"],
            recall=cfg["recall"],
            f1_score=cfg["f1_score"],
            roc_auc=cfg["roc_auc"],
            weighted_score=cfg.get("weighted_score", 0.749443),
            priorities=cfg.get("priorities", "1. Recall (0.40), 2. ROC-AUC (0.30), 3. F1-Score (0.30)"),
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve optimal configuration: {str(e)}",
        )


@app.post("/predict", response_model=PredictionResponse, tags=["Inference"])
def predict_cardio_risk(patient: PatientFeatures):
    """
    Accepts validated patient parameters and outputs cardiovascular disease risk prediction.
    Uses the optimal Logistic Regression model trained on 200% CTGAN-augmented data.
    """
    if bundle is None:
        raise HTTPException(status_code=503, detail="Model bundle not loaded.")

    try:
        # Construct dataframe with exact feature ordering
        feature_names = bundle["feature_names"]
        patient_dict = patient.model_dump()
        input_df = pd.DataFrame([patient_dict])[feature_names]

        # Preprocess with the trained StandardScaler
        scaler = bundle["scaler"]
        input_scaled = scaler.transform(input_df)

        # Predict
        clf = bundle["classifier"]
        prob = float(clf.predict_proba(input_scaled)[0, 1])
        pred = int(clf.predict(input_scaled)[0])

        if prob >= 0.70:
            risk_cat = "High Risk"
        elif prob >= 0.45:
            risk_cat = "Moderate Risk"
        else:
            risk_cat = "Low Risk"

        label = "Cardiovascular Disease" if pred == 1 else "No Cardiovascular Disease"

        return PredictionResponse(
            prediction=pred,
            prediction_label=label,
            probability=round(prob, 4),
            risk_category=risk_cat,
            model=f"{bundle['model_name']} (Augmented @ {bundle['augmentation_ratio']}%)",
            augmentation_ratio=bundle["augmentation_ratio"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Inference error: {str(e)}",
        )


@app.post("/explain", response_model=ExplanationResponse, tags=["Explainability"])
def explain_prediction(patient: PatientFeatures):
    """
    Generates real-time SHAP feature attributions for an individual patient.
    Explains which factors increased or decreased the predicted cardiovascular risk.
    """
    if bundle is None:
        raise HTTPException(status_code=503, detail="Model bundle not loaded.")

    try:
        feature_names = bundle["feature_names"]
        patient_dict = patient.model_dump()
        input_df = pd.DataFrame([patient_dict])[feature_names]

        scaler = bundle["scaler"]
        input_scaled = scaler.transform(input_df)

        clf = bundle["classifier"]
        prob = float(clf.predict_proba(input_scaled)[0, 1])
        pred = int(clf.predict(input_scaled)[0])
        label = "Cardiovascular Disease" if pred == 1 else "No Cardiovascular Disease"

        # Compute SHAP values
        explainer = bundle["explainer"]
        shap_res = explainer(input_scaled)
        shap_vals = shap_res.values[0]

        # Calculate base value (intercept / mean margin)
        base_val = float(explainer.mean_marginal_log_odds if hasattr(explainer, "mean_marginal_log_odds") else (clf.intercept_[0] if hasattr(clf, "intercept_") else 0.0))

        # Build feature contribution map
        contributions_dict = {}
        contributions_list = []

        clinical_descriptions = {
            "ap_hi": lambda v: f"Systolic Blood Pressure ({int(v)} mmHg)",
            "ap_lo": lambda v: f"Diastolic Blood Pressure ({int(v)} mmHg)",
            "age": lambda v: f"Patient Age ({int(v)} years)",
            "cholesterol": lambda v: f"Total Cholesterol ({'Normal' if v==1 else 'Above Normal' if v==2 else 'Well Above Normal'})",
            "weight": lambda v: f"Body Weight ({v:.1f} kg)",
            "active": lambda v: f"Physical Activity ({'Active' if v==1 else 'Inactive'})",
            "gluc": lambda v: f"Fasting Blood Glucose ({'Normal' if v==1 else 'Above Normal' if v==2 else 'Well Above Normal'})",
            "smoke": lambda v: f"Smoking Status ({'Smoker' if v==1 else 'Non-smoker'})",
            "alco": lambda v: f"Alcohol Consumption ({'Yes' if v==1 else 'No'})",
            "gender": lambda v: f"Biological Sex ({'Female' if v==1 else 'Male'})",
            "height": lambda v: f"Height ({v:.1f} cm)",
        }

        for feat, val, s_val in zip(feature_names, input_df.iloc[0], shap_vals):
            s_float = float(s_val)
            contributions_dict[feat] = round(s_float, 4)

            direction = "Increases Risk" if s_float > 0.005 else ("Decreases Risk" if s_float < -0.005 else "Neutral")
            desc_func = clinical_descriptions.get(feat, lambda v: f"{feat}={v}")
            interp = f"{desc_func(val)}: {direction} ({s_float:+.3f} log-odds impact)"

            contributions_list.append(
                FeatureContribution(
                    feature=feat,
                    value=float(val),
                    shap_value=round(s_float, 4),
                    impact_direction=direction,
                    clinical_interpretation=interp,
                )
            )

        # Sort top contributors by absolute SHAP impact
        top_sorted = sorted(contributions_list, key=lambda x: abs(x.shap_value), reverse=True)

        return ExplanationResponse(
            prediction=pred,
            prediction_label=label,
            probability=round(prob, 4),
            base_value=round(base_val, 4),
            shap_feature_contributions=contributions_dict,
            top_contributing_features=top_sorted,
            model=f"{bundle['model_name']} (Augmented @ {bundle['augmentation_ratio']}%)",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Explanation generation error: {str(e)}",
        )


@app.get("/model-comparison", response_model=ModelComparisonResponse, tags=["Research Data"])
def get_model_comparison():
    """Returns the complete comparative benchmarking dataset across 4 ML models and 7 augmentation ratios."""
    try:
        if cached_model_comparison is not None:
            df = cached_model_comparison
        else:
            df = pd.read_csv("results/adaptive_model_comparison.csv")

        models = list(df["model"].unique())
        ratios = sorted([int(r) for r in df["augmentation_ratio"].unique()])

        rows = []
        for _, r in df.iterrows():
            rows.append(
                ModelComparisonRow(
                    model=r["model"],
                    augmentation_ratio=int(r["augmentation_ratio"]),
                    real_train_size=int(r["real_train_size"]),
                    synthetic_train_size=int(r["synthetic_train_size"]),
                    total_train_size=int(r["total_train_size"]),
                    accuracy=float(r["accuracy"]),
                    precision=float(r["precision"]),
                    recall=float(r["recall"]),
                    f1_score=float(r["f1_score"]),
                    roc_auc=float(r["roc_auc"]),
                    weighted_score=float(r["weighted_score"]) if "weighted_score" in r and not pd.isna(r["weighted_score"]) else None,
                    training_time_seconds=float(r["training_time_seconds"]) if "training_time_seconds" in r and not pd.isna(r["training_time_seconds"]) else None,
                )
            )

        return ModelComparisonResponse(
            total_experiments=len(rows),
            models_evaluated=models,
            augmentation_ratios=ratios,
            results=rows,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve model comparison: {str(e)}",
        )
