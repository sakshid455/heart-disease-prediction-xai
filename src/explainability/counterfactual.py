"""
Phase 11: Counterfactual Explainability Engine
Generates constrained, minimal-perturbation counterfactual scenarios for high-risk predictions.
Respects physiological boundaries and feature mutability constraints.
Strictly labeled as an algorithmic simulation tool, NOT a clinical recommendation.
"""

import os
import copy
from typing import Dict, Any, List, Optional
import numpy as np
import pandas as pd
from scipy.optimize import minimize

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.explainability.counterfactual")

DISCLAIMER = (
    "RESEARCH DISCLAIMER: Counterfactual generation is an algorithmic sensitivity analysis "
    "showing model response to perturbed inputs. It does NOT constitute clinical advice or "
    "prescribed lifestyle/medical modifications. Real-world medical management must be guided by qualified healthcare providers."
)

DEFAULT_BOUNDS = {
    # Large cardio dataset bounds
    "ap_hi": (90.0, 180.0),
    "ap_lo": (60.0, 110.0),
    "cholesterol": (1.0, 3.0),
    "gluc": (1.0, 3.0),
    "smoke": (0.0, 1.0),
    "alco": (0.0, 1.0),
    "active": (0.0, 1.0),
    "weight": (45.0, 130.0),
    "height": (145.0, 195.0),
    # Cleveland dataset bounds
    "trestbps": (90.0, 180.0),
    "chol": (120.0, 350.0),
    "fbs": (0.0, 1.0),
    "restecg": (0.0, 2.0),
    "thalach": (70.0, 200.0),
    "exang": (0.0, 1.0),
    "oldpeak": (0.0, 4.0),
    "slope": (0.0, 2.0),
    "ca": (0.0, 3.0),
    "thal": (0.0, 3.0),
    "cp": (0.0, 3.0),
}

IMMUTABLE_FEATURES = {"age", "gender", "sex", "height", "id"}


class CounterfactualEngine:
    """Finds minimal plausible feature perturbations that shift prediction across the decision boundary."""

    def __init__(
        self,
        model: Any,
        feature_names: List[str],
        bounds: Optional[Dict[str, tuple]] = None,
        immutable_features: Optional[set] = None,
        target_probability: float = 0.45,
    ):
        self.model = model
        self.feature_names = feature_names
        self.bounds = bounds or DEFAULT_BOUNDS
        self.immutable_features = immutable_features or IMMUTABLE_FEATURES
        self.target_probability = target_probability

    def _predict_prob(self, x_vec: np.ndarray) -> float:
        """Helper to get positive class probability."""
        x_2d = pd.DataFrame([x_vec], columns=self.feature_names)
        if hasattr(self.model, "predict_proba"):
            return float(self.model.predict_proba(x_2d)[0, 1])
        return float(self.model.predict(x_2d)[0])

    def generate(
        self,
        patient_features: Dict[str, float],
        max_changes: int = 4,
    ) -> Dict[str, Any]:
        """Solves constrained optimization to produce counterfactual profile."""
        # Convert dictionary to ordered vector
        x_orig = np.array([float(patient_features.get(f, 0.0)) for f in self.feature_names])
        orig_prob = self._predict_prob(x_orig)
        orig_pred = int(orig_prob >= 0.5)

        # Feature normalization ranges
        ranges = {}
        for f in self.feature_names:
            if f in self.bounds:
                b_min, b_max = self.bounds[f]
                ranges[f] = max(b_max - b_min, 1.0)
            else:
                ranges[f] = 100.0

        mutable_indices = [
            i for i, f in enumerate(self.feature_names)
            if f.lower() not in self.immutable_features
        ]

        if orig_prob <= 0.5:
            return {
                "disclaimer": DISCLAIMER,
                "status": "ALREADY_LOW_RISK",
                "message": "Patient features already correspond to low risk (P <= 0.50).",
                "original_prediction": orig_pred,
                "original_probability": round(orig_prob, 4),
                "counterfactual_probability": round(orig_prob, 4),
                "probability_reduction": 0.0,
                "sparsity": 0,
                "changes": [],
                "counterfactual_features": {f: round(float(patient_features.get(f, 0.0)), 2) for f in self.feature_names},
            }

        # Coordinate descent across actionable features to find the most impactful perturbations
        # Evaluate 1-step sensitivity for each mutable feature
        impacts = []
        for idx in mutable_indices:
            feat_name = self.feature_names[idx]
            current_val = x_orig[idx]
            b_min, b_max = self.bounds.get(feat_name, (current_val * 0.5, current_val * 1.5))

            # Test lower bound (or higher bound if protective like physical activity)
            test_val = b_min if feat_name not in ["active", "thalach"] else b_max
            x_test = x_orig.copy()
            x_test[idx] = test_val
            prob_test = self._predict_prob(x_test)
            drop = orig_prob - prob_test
            impacts.append((idx, feat_name, drop, test_val))

        # Sort features by highest risk reduction
        impacts.sort(key=lambda x: x[2], reverse=True)

        # Greedy iterative shift
        x_cf = x_orig.copy()
        current_prob = orig_prob
        selected_changes = []

        for idx, feat_name, drop, target_val in impacts:
            if len(selected_changes) >= max_changes or current_prob <= self.target_probability:
                break

            orig_v = x_cf[idx]
            if abs(orig_v - target_val) < 1e-4:
                continue

            # Binary search optimal point between orig_v and target_val
            steps = np.linspace(orig_v, target_val, 15)
            best_s = orig_v
            best_p = current_prob
            for s in steps:
                x_try = x_cf.copy()
                x_try[idx] = s
                p_try = self._predict_prob(x_try)
                if p_try < best_p:
                    best_p = p_try
                    best_s = s
                if p_try <= self.target_probability:
                    best_p = p_try
                    best_s = s
                    break

            if abs(best_s - orig_v) > 1e-3:
                x_cf[idx] = best_s
                current_prob = best_p
                # Discrete rounding for discrete features
                if feat_name in ["cholesterol", "gluc", "smoke", "alco", "active", "cp", "restecg", "exang", "slope", "ca", "thal"]:
                    best_s = round(best_s)
                    x_cf[idx] = best_s

                delta = best_s - orig_v
                pct_change = (delta / orig_v * 100.0) if orig_v != 0 else 0.0
                selected_changes.append({
                    "feature": feat_name,
                    "original_value": round(float(orig_v), 2),
                    "counterfactual_value": round(float(best_s), 2),
                    "delta": round(float(delta), 2),
                    "percentage_change": round(float(pct_change), 1),
                })

        final_prob = self._predict_prob(x_cf)
        final_pred = int(final_prob >= 0.5)

        cf_dict = {f: round(float(x_cf[i]), 2) for i, f in enumerate(self.feature_names)}

        return {
            "disclaimer": DISCLAIMER,
            "status": "SUCCESS" if final_prob <= 0.5 else "PARTIAL_REDUCTION",
            "original_prediction": orig_pred,
            "original_probability": round(orig_prob, 4),
            "counterfactual_prediction": final_pred,
            "counterfactual_probability": round(final_prob, 4),
            "probability_reduction": round(orig_prob - final_prob, 4),
            "sparsity": len(selected_changes),
            "changes": selected_changes,
            "counterfactual_features": cf_dict,
        }


def generate_counterfactual_explanation(
    patient_data: Dict[str, float],
    model_name: str = "Logistic Regression",
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """Generates counterfactual explanation for given patient attributes."""
    if not os.path.exists(train_path):
        if os.path.exists("data/processed/real_train.csv"):
            train_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            target_column = "num"

    from src.augmentation.experiment_engine import AugmentationExperimentEngine
    aug_engine = AugmentationExperimentEngine(target_column=target_column)

    train_df = pd.read_csv(train_path)
    synth_df = pd.read_csv(synthetic_path) if os.path.exists(synthetic_path) else None

    # Use 100% augmented model
    if synth_df is not None:
        n_add = min(len(train_df), len(synth_df))
        synth_sample = synth_df.sample(n=n_add, random_state=42)
        common_cols = [c for c in train_df.columns if c in synth_sample.columns]
        train_df = pd.concat([train_df[common_cols], synth_sample[common_cols]], ignore_index=True)

    if len(train_df) > 10000:
        train_df = train_df.sample(n=10000, random_state=42)

    X_train = train_df.drop(columns=[target_column])
    y_train = (train_df[target_column] > 0).astype(int)

    feature_names = X_train.columns.tolist()

    model = aug_engine.get_model(model_name, quick_mode=True)
    model.fit(X_train, y_train)

    engine = CounterfactualEngine(model=model, feature_names=feature_names)
    return engine.generate(patient_features=patient_data)


if __name__ == "__main__":
    sample_patient = {
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
    res = generate_counterfactual_explanation(sample_patient)
    print("Counterfactual result:", res["status"], res["probability_reduction"], res["changes"])
