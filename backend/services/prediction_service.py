"""
HeartAI Prediction Service
Executes patient risk prediction using either the clinical Random Forest model
or the optimal CTGAN-augmented classifier.
"""

from typing import Dict, Any, Union
import pandas as pd
from backend.services.model_service import model_service
from backend.schemas.prediction import PatientFeatures, ClinicalPatientFeatures, UnifiedPatientFeatures
from backend.schemas.responses import PredictionResponse
from backend.utils.preprocessing import format_patient_features


class PredictionService:
    def predict(self, patient: Union[PatientFeatures, ClinicalPatientFeatures, UnifiedPatientFeatures, Dict[str, Any]]) -> PredictionResponse:
        data = patient.model_dump() if hasattr(patient, "model_dump") else dict(patient)

        # Check if clinical 13-feature input is provided
        is_clinical = any(k in data and data[k] is not None for k in ["cp", "trestbps", "thalach", "oldpeak", "slope", "ca", "thal"])

        if is_clinical:
            rf_model = model_service.get_rf_model()
            
            # Extract clinical values with safe defaults
            age = int(data.get("age", 50))
            # Support both 'sex' (0/1) and 'gender' (1=female, 2=male)
            if "sex" in data and data["sex"] is not None:
                sex = int(data["sex"])
            elif "gender" in data and data["gender"] is not None:
                sex = 1 if int(data["gender"]) == 2 else 0
            else:
                sex = 1

            cp = int(data.get("cp", 1))
            trestbps = int(data.get("trestbps", data.get("ap_hi", 120)))
            chol = int(data.get("chol", 200))
            fbs = int(data.get("fbs", 0))
            restecg = int(data.get("restecg", 0))
            thalach = int(data.get("thalach", 150))
            exang = int(data.get("exang", 0))
            oldpeak = float(data.get("oldpeak", 0.0))
            slope = int(data.get("slope", 1))
            ca = int(data.get("ca", 0))
            thal = int(data.get("thal", 3))

            features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
            input_df = pd.DataFrame([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]], columns=features)

            prob = float(rf_model.predict_proba(input_df)[0, 1])
            pred = int(rf_model.predict(input_df)[0])

            if prob >= 0.70:
                risk_category = "High Risk"
            elif prob >= 0.45:
                risk_category = "Moderate Risk"
            else:
                risk_category = "Low Risk"

            prediction_label = "Cardiovascular Disease Present" if pred == 1 else "No Cardiovascular Disease"

            return PredictionResponse(
                prediction=pred,
                prediction_label=prediction_label,
                probability=round(prob, 4),
                risk_category=risk_category,
                model="Random Forest Classifier (Clinical Profile)",
                model_name="Random Forest Classifier",
                augmentation_ratio="Clinical Baseline",
            )
        else:
            # 11-feature demographic model
            bundle = model_service.get_optimal_bundle()
            feature_names = bundle["feature_names"]
            scaler = bundle["scaler"]
            classifier = bundle["classifier"]
            model_name = bundle.get("model_name", "Logistic Regression")
            aug_ratio = bundle.get("augmentation_ratio", 200)

            # Align features
            input_df = format_patient_features(data, feature_names)

            # Scale using saved scaler
            input_scaled = scaler.transform(input_df)

            # Predict
            prob = float(classifier.predict_proba(input_scaled)[0, 1])
            pred = int(classifier.predict(input_scaled)[0])

            if prob >= 0.70:
                risk_category = "High Risk"
            elif prob >= 0.45:
                risk_category = "Moderate Risk"
            else:
                risk_category = "Low Risk"

            prediction_label = "Cardiovascular Disease Present" if pred == 1 else "No Cardiovascular Disease"

            return PredictionResponse(
                prediction=pred,
                prediction_label=prediction_label,
                probability=round(prob, 4),
                risk_category=risk_category,
                model=model_name,
                model_name=model_name,
                augmentation_ratio=f"{aug_ratio}%",
            )


prediction_service = PredictionService()
