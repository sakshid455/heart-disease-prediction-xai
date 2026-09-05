"""
HeartAI SHAP Explainability Service
Computes real-time Shapley value attributions for individual patient predictions.
Supports both the Clinical 13-feature model and the 11-feature optimal model.
Adheres strictly to research guidelines: does not assert medical causation.
"""

from typing import List, Union, Dict, Any
import numpy as np
import pandas as pd
from backend.services.model_service import model_service
from backend.schemas.prediction import PatientFeatures, ClinicalPatientFeatures, UnifiedPatientFeatures
from backend.schemas.responses import ExplanationResponse, FeatureContribution
from backend.utils.preprocessing import format_patient_features


class ShapService:
    def explain(self, patient: Union[PatientFeatures, ClinicalPatientFeatures, UnifiedPatientFeatures, Dict[str, Any]]) -> ExplanationResponse:
        data = patient.model_dump() if hasattr(patient, "model_dump") else dict(patient)
        is_clinical = any(k in data and data[k] is not None for k in ["cp", "trestbps", "thalach", "oldpeak", "slope", "ca", "thal"])

        if is_clinical:
            import shap
            rf_model = model_service.get_rf_model()
            age = int(data.get("age", 50))
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
            prediction_label = "Cardiovascular Disease Present" if pred == 1 else "No Cardiovascular Disease"

            tree_explainer = shap.TreeExplainer(rf_model)
            shap_raw = tree_explainer.shap_values(input_df)

            if isinstance(shap_raw, list):
                shap_vals = shap_raw[1][0]
            elif hasattr(shap_raw, "ndim") and shap_raw.ndim == 3:
                shap_vals = shap_raw[0, :, 1]
            else:
                shap_vals = shap_raw[0]

            cp_names = {1: "Typical Angina", 2: "Atypical Angina", 3: "Non-Anginal", 4: "Asymptomatic"}
            restecg_names = {0: "Normal", 1: "ST-T Abnormality", 2: "LV Hypertrophy"}
            slope_names = {1: "Upsloping", 2: "Flat", 3: "Downsloping"}
            thal_names = {3: "Normal", 6: "Fixed Defect", 7: "Reversible Defect"}

            clinical_labels = {
                "age": lambda v: f"Patient Age ({int(v)} yrs)",
                "sex": lambda v: f"Biological Sex ({'Male' if v == 1 else 'Female'})",
                "cp": lambda v: f"Chest Pain Type ({cp_names.get(int(v), f'Type {int(v)}')})",
                "trestbps": lambda v: f"Resting Blood Pressure ({int(v)} mmHg)",
                "chol": lambda v: f"Serum Cholesterol ({int(v)} mg/dL)",
                "fbs": lambda v: f"Fasting Blood Sugar ({'> 120 mg/dL' if v == 1 else 'Normal'})",
                "restecg": lambda v: f"Resting ECG ({restecg_names.get(int(v), str(int(v)))})",
                "thalach": lambda v: f"Max Heart Rate Achieved ({int(v)} bpm)",
                "exang": lambda v: f"Exercise Angina ({'Yes' if v == 1 else 'No'})",
                "oldpeak": lambda v: f"ST Depression / Oldpeak ({v:.1f})",
                "slope": lambda v: f"ST Slope ({slope_names.get(int(v), str(int(v)))})",
                "ca": lambda v: f"Major Vessels ({int(v)})",
                "thal": lambda v: f"Thalassemia ({thal_names.get(int(v), str(int(v)))})",
            }

            feature_contributions: List[FeatureContribution] = []
            for i, feat in enumerate(features):
                val = float(input_df.iloc[0][feat])
                s_val = float(shap_vals[i])
                impact = "positive" if s_val >= 0 else "negative"
                lbl_fn = clinical_labels.get(feat, lambda v: f"{feat}: {v}")
                interpretation = (
                    f"{lbl_fn(val)}: {'Increased' if impact == 'positive' else 'Decreased'} "
                    f"predicted risk ({s_val:+.3f} SHAP impact)."
                )
                feature_contributions.append(
                    FeatureContribution(
                        feature=feat,
                        value=val,
                        shap_value=round(s_val, 4),
                        impact=impact,
                        clinical_interpretation=interpretation,
                    )
                )

            feature_contributions.sort(key=lambda x: abs(x.shap_value), reverse=True)
            top_positive = [f for f in feature_contributions if f.impact == "positive"]
            top_negative = [f for f in feature_contributions if f.impact == "negative"]

            return ExplanationResponse(
                prediction=pred,
                prediction_label=prediction_label,
                probability=round(prob, 4),
                model="Random Forest Classifier (Clinical Profile)",
                model_name="Random Forest Classifier",
                augmentation_ratio="Clinical Baseline",
                base_value=0.5,
                top_shap_features=feature_contributions[:6],
                feature_contributions=feature_contributions,
                features=feature_contributions,
                top_positive_contributors=top_positive[:3],
                top_negative_contributors=top_negative[:3],
                research_note=(
                    "SHAP feature attributions quantify each clinical parameter's marginal contribution "
                    "to the Random Forest prediction score. These values reflect statistical associations "
                    "within the trained model and should be interpreted alongside clinical judgment."
                ),
            )
        else:
            bundle = model_service.get_optimal_bundle()
            feature_names = bundle["feature_names"]
            scaler = bundle["scaler"]
            classifier = bundle["classifier"]
            explainer = bundle["explainer"]
            model_name = bundle.get("model_name", "Logistic Regression")
            aug_ratio = bundle.get("augmentation_ratio", 200)

            # Align features and transform
            input_df = format_patient_features(data, feature_names)
            input_scaled = scaler.transform(input_df)

            # Predict
            prob = float(classifier.predict_proba(input_scaled)[0, 1])
            pred = int(classifier.predict(input_scaled)[0])
            prediction_label = "Cardiovascular Disease Present" if pred == 1 else "No Cardiovascular Disease"

            # Compute SHAP
            shap_res = explainer(input_scaled)
            shap_vals = shap_res.values[0]

            # Base value (mean marginal log-odds / intercept)
            if hasattr(explainer, "mean_marginal_log_odds"):
                base_value = float(explainer.mean_marginal_log_odds)
            elif hasattr(classifier, "intercept_"):
                base_value = float(classifier.intercept_[0])
            else:
                base_value = 0.0

            clinical_labels = {
                "age": lambda v: f"Patient Age ({int(v)} yrs)",
                "gender": lambda v: f"Biological Sex ({'Female' if v == 1 else 'Male'})",
                "height": lambda v: f"Height ({v:.1f} cm)",
                "weight": lambda v: f"Body Weight ({v:.1f} kg)",
                "ap_hi": lambda v: f"Systolic Blood Pressure ({int(v)} mmHg)",
                "ap_lo": lambda v: f"Diastolic Blood Pressure ({int(v)} mmHg)",
                "cholesterol": lambda v: f"Total Cholesterol ({'Normal' if v == 1 else 'Above Normal' if v == 2 else 'Well Above Normal'})",
                "gluc": lambda v: f"Fasting Blood Glucose ({'Normal' if v == 1 else 'Above Normal' if v == 2 else 'Well Above Normal'})",
                "smoke": lambda v: f"Smoking Status ({'Smoker' if v == 1 else 'Non-smoker'})",
                "alco": lambda v: f"Alcohol Consumption ({'Consumer' if v == 1 else 'Non-consumer'})",
                "active": lambda v: f"Physical Activity ({'Active' if v == 1 else 'Inactive'})",
            }

            feature_contributions: List[FeatureContribution] = []
            for i, feat in enumerate(feature_names):
                val = float(input_df.iloc[0][feat])
                s_val = float(shap_vals[i])
                impact = "positive" if s_val >= 0 else "negative"
                lbl_fn = clinical_labels.get(feat, lambda v: f"{feat}: {v}")
                interpretation = (
                    f"{lbl_fn(val)}: Contributed to the model prediction by "
                    f"{'increasing' if impact == 'positive' else 'decreasing'} predicted risk "
                    f"({s_val:+.3f} log-odds)."
                )
                feature_contributions.append(
                    FeatureContribution(
                        feature=feat,
                        value=val,
                        shap_value=round(s_val, 4),
                        impact=impact,
                        clinical_interpretation=interpretation,
                    )
                )

            feature_contributions.sort(key=lambda x: abs(x.shap_value), reverse=True)
            top_positive = [f for f in feature_contributions if f.impact == "positive"]
            top_negative = [f for f in feature_contributions if f.impact == "negative"]

            return ExplanationResponse(
                prediction=pred,
                prediction_label=prediction_label,
                probability=round(prob, 4),
                model=model_name,
                model_name=model_name,
                augmentation_ratio=f"{aug_ratio}%",
                base_value=round(base_value, 4),
                top_shap_features=feature_contributions[:5],
                feature_contributions=feature_contributions,
                features=feature_contributions,
                top_positive_contributors=top_positive[:3],
                top_negative_contributors=top_negative[:3],
                research_note=(
                    "SHAP is used to interpret how individual features contributed to the model prediction. "
                    "Values reflect statistical associations within the trained model and do not establish clinical causation."
                ),
            )


shap_service = ShapService()
