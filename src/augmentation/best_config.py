"""
Phase 6: Automatic Best Configuration Engine
Selects the optimal augmentation ratio and model architecture based on
a designated optimization objective (Recall, F1-Score, ROC-AUC, Accuracy, Precision).
Outputs:
  - results/augmentation/best_configuration.json
"""

import os
import json
from typing import Dict, Any, Optional, List
import pandas as pd

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.augmentation.best_config")


class BestConfigurationEngine:
    """Selects best model and augmentation ratio according to clinical/statistical objectives."""

    SUPPORTED_OBJECTIVES = ["recall", "f1", "roc_auc", "accuracy", "precision", "f1_score"]

    def __init__(self, primary_objective: str = "recall"):
        norm_obj = primary_objective.lower()
        if norm_obj == "f1_score":
            norm_obj = "f1"
        if norm_obj not in self.SUPPORTED_OBJECTIVES:
            raise ValueError(f"Unsupported objective: {primary_objective}. Must be one of {self.SUPPORTED_OBJECTIVES}")
        self.primary_objective = norm_obj

    def find_best(
        self,
        experiments_data: Any,
        model_filter: Optional[str] = None,
        min_ratio: Optional[float] = None,
        max_ratio: Optional[float] = None,
    ) -> Dict[str, Any]:
        """
        Scans experimental records and selects the top performer according to the objective.
        `experiments_data` can be a DataFrame, list of dicts, or path to CSV/JSON.
        """
        if isinstance(experiments_data, str):
            if experiments_data.endswith(".json"):
                with open(experiments_data, "r", encoding="utf-8") as f:
                    df = pd.DataFrame(json.load(f))
            else:
                df = pd.read_csv(experiments_data)
        elif isinstance(experiments_data, list):
            df = pd.DataFrame(experiments_data)
        elif isinstance(experiments_data, pd.DataFrame):
            df = experiments_data.copy()
        else:
            raise TypeError("experiments_data must be a DataFrame, list of dicts, or file path.")

        # Normalize column names
        col_map = {
            "f1_score": "f1",
            "model_name": "model",
            "ratio": "augmentation_ratio",
        }
        df = df.rename(columns=col_map)

        if self.primary_objective not in df.columns:
            raise KeyError(f"Objective metric '{self.primary_objective}' not found in experiment data columns: {df.columns.tolist()}")

        filtered_df = df.copy()

        # Apply filters if provided
        if model_filter:
            filtered_df = filtered_df[filtered_df["model"].str.lower() == model_filter.lower()]
        if min_ratio is not None and "augmentation_ratio" in filtered_df.columns:
            filtered_df = filtered_df[filtered_df["augmentation_ratio"] >= min_ratio]
        if max_ratio is not None and "augmentation_ratio" in filtered_df.columns:
            filtered_df = filtered_df[filtered_df["augmentation_ratio"] <= max_ratio]

        if filtered_df.empty:
            raise ValueError("No experiments match the specified filtering criteria.")

        # Sort by primary objective descending
        best_row = filtered_df.sort_values(by=self.primary_objective, ascending=False).iloc[0]

        # Baseline comparison: find 0% augmentation for the chosen model
        baseline_row = df[(df["model"] == best_row["model"]) & (df["augmentation_ratio"] == 0)]
        baseline_metric = float(baseline_row[self.primary_objective].iloc[0]) if not baseline_row.empty else None
        improvement = None
        if baseline_metric is not None:
            improvement = float(best_row[self.primary_objective] - baseline_metric)

        best_config = {
            "objective": self.primary_objective,
            "best_model": str(best_row["model"]),
            "optimal_augmentation_ratio": float(best_row["augmentation_ratio"]),
            "training_samples": int(best_row.get("total_samples", best_row.get("total_train_size", 0))),
            "metrics": {
                "accuracy": float(best_row.get("accuracy", 0.0)),
                "precision": float(best_row.get("precision", 0.0)),
                "recall": float(best_row.get("recall", 0.0)),
                "f1": float(best_row.get("f1", 0.0)),
                "roc_auc": float(best_row.get("roc_auc", 0.0)),
            },
            "baseline_comparison": {
                "baseline_0pct_metric": round(baseline_metric, 6) if baseline_metric is not None else None,
                "absolute_gain": round(improvement, 6) if improvement is not None else None,
                "relative_gain_percent": round((improvement / baseline_metric) * 100, 2) if baseline_metric and baseline_metric > 0 else None,
            },
            "notes": f"Optimal configuration selected to maximize {self.primary_objective.upper()} on held-out test evaluation."
        }
        return best_config


def find_best_configuration(
    experiments_path: Optional[str] = None,
    output_dir: str = "results/augmentation",
    objective: str = "recall",
    model_filter: Optional[str] = None,
) -> Dict[str, Any]:
    """Finds and saves the best configuration."""
    os.makedirs(output_dir, exist_ok=True)

    if experiments_path is None or not os.path.exists(experiments_path):
        candidates = [
            "results/augmentation/augmentation_experiments.json",
            "results/augmentation/augmentation_experiments.csv",
            "results/adaptive_model_comparison.csv",
        ]
        for c in candidates:
            if os.path.exists(c):
                experiments_path = c
                break

    if experiments_path is None or not os.path.exists(experiments_path):
        raise FileNotFoundError("No experimental results found to evaluate best configuration.")

    engine = BestConfigurationEngine(primary_objective=objective)
    best_config = engine.find_best(experiments_data=experiments_path, model_filter=model_filter)

    out_file = os.path.join(output_dir, "best_configuration.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(best_config, f, indent=2)

    logger.info(
        f"Best Configuration selected: {best_config['best_model']} @ {best_config['optimal_augmentation_ratio']}% "
        f"({objective.upper()} = {best_config['metrics'].get(objective, 0.0):.4f})"
    )
    return best_config


if __name__ == "__main__":
    find_best_configuration(objective="recall")
