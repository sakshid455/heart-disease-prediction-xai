"""
Phase 12: Global and Local Explainable AI (XAI) Engine
Calculates TreeSHAP and KernelSHAP attributions for global feature ranking and local individual risk explanations.
Outputs:
  - results/explainability/xai_analysis.json
  - results/explainability/xai_analysis.md
"""

import os
import json
from typing import Dict, Any, List, Optional
import numpy as np
import pandas as pd
import shap

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.explainability.xai")


class XAIEngine:
    """Computes global feature attributions and local instance-level explanations."""

    def __init__(self, model: Any, feature_names: List[str], background_samples: Optional[pd.DataFrame] = None):
        self.model = model
        self.feature_names = feature_names
        self.background_samples = background_samples

    def explain_global(self, X_eval: pd.DataFrame, max_samples: int = 500) -> Dict[str, Any]:
        """Calculates cohort-level mean absolute SHAP values across features."""
        if len(X_eval) > max_samples:
            X_eval = X_eval.sample(n=max_samples, random_state=42)

        # Handle Pipeline models vs direct estimators
        estimator = self.model.named_steps["model"] if hasattr(self.model, "named_steps") else self.model
        scaler = self.model.named_steps.get("scaler") if hasattr(self.model, "named_steps") else None

        X_processed = scaler.transform(X_eval) if scaler else X_eval.values

        # Tree vs Linear vs General Explainer
        try:
            explainer = shap.TreeExplainer(estimator)
            shap_values = explainer.shap_values(X_processed)
        except Exception:
            try:
                explainer = shap.LinearExplainer(estimator, X_processed)
                shap_values = explainer.shap_values(X_processed)
            except Exception:
                bg = shap.sample(X_processed, 50)
                explainer = shap.KernelExplainer(estimator.predict_proba if hasattr(estimator, "predict_proba") else estimator.predict, bg)
                shap_values = explainer.shap_values(X_processed[:50])

        # If binary classification returns list [shap_class_0, shap_class_1] or 3D array
        if isinstance(shap_values, list):
            sv = shap_values[1] if len(shap_values) > 1 else shap_values[0]
        elif hasattr(shap_values, "values"):
            sv = shap_values.values
            if len(sv.shape) == 3:
                sv = sv[:, :, 1]
        elif len(shap_values.shape) == 3:
            sv = shap_values[:, :, 1]
        else:
            sv = shap_values

        mean_abs_shap = np.mean(np.abs(sv), axis=0)
        total_importance = float(np.sum(mean_abs_shap))

        feature_ranking = []
        for i, feat in enumerate(self.feature_names):
            val = float(mean_abs_shap[i])
            pct = float((val / total_importance) * 100.0) if total_importance > 0 else 0.0
            feature_ranking.append({
                "feature": feat,
                "mean_abs_shap": round(val, 5),
                "relative_importance_percent": round(pct, 2),
            })

        feature_ranking.sort(key=lambda x: x["mean_abs_shap"], reverse=True)
        for rank, item in enumerate(feature_ranking, 1):
            item["rank"] = rank

        base_val = explainer.expected_value
        if isinstance(base_val, (list, np.ndarray)):
            base_val = float(base_val[1] if len(base_val) > 1 else base_val[0])
        else:
            base_val = float(base_val)

        return {
            "base_expected_value": round(base_val, 4),
            "samples_evaluated": len(X_eval),
            "feature_ranking": feature_ranking,
        }

    def explain_local(self, patient_dict: Dict[str, float]) -> Dict[str, Any]:
        """Calculates exact feature attributions for an individual patient instance."""
        x_vec = np.array([[float(patient_dict.get(f, 0.0)) for f in self.feature_names]])

        estimator = self.model.named_steps["model"] if hasattr(self.model, "named_steps") else self.model
        scaler = self.model.named_steps.get("scaler") if hasattr(self.model, "named_steps") else None

        x_proc = scaler.transform(x_vec) if scaler else x_vec

        try:
            explainer = shap.TreeExplainer(estimator)
            shap_values = explainer.shap_values(x_proc)
        except Exception:
            bg = x_proc
            explainer = shap.LinearExplainer(estimator, bg)
            shap_values = explainer.shap_values(x_proc)

        if isinstance(shap_values, list):
            sv = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
        elif hasattr(shap_values, "values"):
            sv = shap_values.values[0]
            if len(sv.shape) == 2:
                sv = sv[:, 1]
        elif len(shap_values.shape) == 3:
            sv = shap_values[0, :, 1]
        elif len(shap_values.shape) == 2:
            sv = shap_values[0]
        else:
            sv = shap_values

        base_val = explainer.expected_value
        if isinstance(base_val, (list, np.ndarray)):
            base_val = float(base_val[1] if len(base_val) > 1 else base_val[0])
        else:
            base_val = float(base_val)

        attributions = []
        for i, feat in enumerate(self.feature_names):
            attr_val = float(sv[i])
            patient_val = float(patient_dict.get(feat, 0.0))
            attributions.append({
                "feature": feat,
                "feature_value": round(patient_val, 2),
                "shap_value": round(attr_val, 5),
                "direction": "Risk Increasing (+)" if attr_val > 0 else "Risk Decreasing (-)",
                "magnitude": round(abs(attr_val), 5),
            })

        attributions.sort(key=lambda x: x["magnitude"], reverse=True)

        return {
            "base_expected_value": round(base_val, 4),
            "attributions": attributions,
            "top_positive_contributors": [a for a in attributions if a["shap_value"] > 0][:3],
            "top_negative_contributors": [a for a in attributions if a["shap_value"] < 0][:3],
        }

    def generate_markdown(self, global_report: Dict[str, Any]) -> str:
        """Generates academic Markdown documentation for SHAP analysis."""
        lines = [
            "# Explainable AI (SHAP) Attribution Analysis",
            "",
            f"**Samples Evaluated**: {global_report['samples_evaluated']:,}",
            f"**Base Expected Value $E[f(x)]$**: {global_report['base_expected_value']:.4f}",
            "",
            "## Global Feature Importance Hierarchy",
            "",
            "| Rank | Feature Name | Mean |SHAP| Value | Relative Contribution |",
            "|---|---|---|---|",
        ]
        for f in global_report["feature_ranking"]:
            lines.append(
                f"| #{f['rank']} | `{f['feature']}` | {f['mean_abs_shap']:.4f} | {f['relative_importance_percent']:.1f}% |"
            )
        lines.append("")
        return "\n".join(lines)


def run_xai_evaluation(
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    test_path: str = "data/processed/large_test.csv",
    output_dir: str = "results/explainability",
    model_name: str = "Random Forest",
    quick_mode: bool = False,
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """Runs global SHAP evaluation and exports structured artifacts."""
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.exists(train_path) or not os.path.exists(test_path):
        if os.path.exists("data/processed/real_train.csv"):
            train_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            test_path = "data/processed/real_test.csv"
            target_column = "num"

    from src.augmentation.experiment_engine import AugmentationExperimentEngine
    aug_engine = AugmentationExperimentEngine(target_column=target_column)

    train_df = pd.read_csv(train_path)
    synth_df = pd.read_csv(synthetic_path) if os.path.exists(synthetic_path) else None
    test_df = pd.read_csv(test_path)

    if synth_df is not None:
        n_add = min(len(train_df), len(synth_df))
        synth_sample = synth_df.sample(n=n_add, random_state=42)
        common_cols = [c for c in train_df.columns if c in synth_sample.columns]
        augmented_df = pd.concat([train_df[common_cols], synth_sample[common_cols]], ignore_index=True)
    else:
        augmented_df = train_df

    if quick_mode and len(augmented_df) > 5000:
        augmented_df = augmented_df.sample(n=5000, random_state=42)
    if quick_mode and len(test_df) > 500:
        test_df = test_df.sample(n=500, random_state=42)

    X_train = augmented_df.drop(columns=[target_column])
    y_train = (augmented_df[target_column] > 0).astype(int)

    X_test = test_df.drop(columns=[target_column])

    feature_names = X_train.columns.tolist()

    model = aug_engine.get_model(model_name, quick_mode=quick_mode)
    model.fit(X_train, y_train)

    engine = XAIEngine(model=model, feature_names=feature_names)
    global_res = engine.explain_global(X_test, max_samples=300 if quick_mode else 1000)

    # Add a sample local explanation
    sample_patient = X_test.iloc[0].to_dict()
    local_res = engine.explain_local(sample_patient)

    combined_res = {
        "model": model_name,
        "global_explanation": global_res,
        "sample_local_explanation": local_res,
    }

    json_path = os.path.join(output_dir, "xai_analysis.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(combined_res, f, indent=2)

    md_path = os.path.join(output_dir, "xai_analysis.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(engine.generate_markdown(global_res))

    logger.info(f"XAI SHAP evaluation completed: Top feature {global_res['feature_ranking'][0]['feature']}. Saved to {json_path}")
    return combined_res


if __name__ == "__main__":
    run_xai_evaluation(quick_mode=True)
