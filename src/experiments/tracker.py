"""
Phase 13: Append-Only Persistent Experiment Tracker
Maintains a permanent, structured registry of all experimental runs, hyperparameters,
and evaluation metrics to guarantee research transparency and reproducibility.
Outputs:
  - results/experiments/experiment_registry.json
  - results/experiments/experiment_registry.csv
"""

import os
import json
import csv
from datetime import datetime
from typing import Dict, Any, List, Optional
import pandas as pd

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.experiments.tracker")


class ExperimentTracker:
    """Manages append-only experiment records with unique sequential IDs."""

    def __init__(self, registry_dir: str = "results/experiments"):
        self.registry_dir = registry_dir
        os.makedirs(self.registry_dir, exist_ok=True)
        self.json_path = os.path.join(self.registry_dir, "experiment_registry.json")
        self.csv_path = os.path.join(self.registry_dir, "experiment_registry.csv")

    def _get_next_id(self, existing: List[Dict[str, Any]]) -> str:
        """Generates sequential ID: EXP-00001, EXP-00002, etc."""
        max_num = 0
        for item in existing:
            e_id = item.get("experiment_id", "")
            if e_id.startswith("EXP-"):
                try:
                    num = int(e_id.split("-")[1])
                    if num > max_num:
                        max_num = num
                except Exception:
                    pass
        return f"EXP-{max_num + 1:05d}"

    def log_experiment(
        self,
        model_name: str,
        augmentation_ratio: float,
        metrics: Dict[str, float],
        hyperparameters: Optional[Dict[str, Any]] = None,
        dataset_name: str = "Cardiovascular Disease Tabular",
        random_seed: int = 42,
        training_time_seconds: float = 0.0,
        sample_counts: Optional[Dict[str, int]] = None,
        notes: str = "",
    ) -> Dict[str, Any]:
        """Appends an experimental record to the registry."""
        all_records = self.get_all_experiments()
        exp_id = self._get_next_id(all_records)

        record = {
            "experiment_id": exp_id,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "dataset_name": dataset_name,
            "model": model_name,
            "augmentation_ratio": float(augmentation_ratio),
            "random_seed": int(random_seed),
            "sample_counts": sample_counts or {},
            "hyperparameters": hyperparameters or {},
            "metrics": {k: round(float(v), 6) for k, v in metrics.items()},
            "training_time_seconds": round(float(training_time_seconds), 3),
            "notes": notes,
        }

        all_records.append(record)

        # Write JSON
        with open(self.json_path, "w", encoding="utf-8") as f:
            json.dump(all_records, f, indent=2)

        # Write CSV
        flat_records = []
        for r in all_records:
            flat = {
                "experiment_id": r["experiment_id"],
                "timestamp": r["timestamp"],
                "dataset_name": r["dataset_name"],
                "model": r["model"],
                "augmentation_ratio": r["augmentation_ratio"],
                "random_seed": r["random_seed"],
                "training_time_seconds": r["training_time_seconds"],
                "accuracy": r["metrics"].get("accuracy"),
                "precision": r["metrics"].get("precision"),
                "recall": r["metrics"].get("recall"),
                "f1": r["metrics"].get("f1") or r["metrics"].get("f1_score"),
                "roc_auc": r["metrics"].get("roc_auc"),
                "notes": r.get("notes", ""),
            }
            flat_records.append(flat)

        pd.DataFrame(flat_records).to_csv(self.csv_path, index=False)
        logger.info(f"Registered experiment {exp_id} ({model_name} @ {augmentation_ratio}%). Total logged: {len(all_records)}")
        return record

    def get_all_experiments(self) -> List[Dict[str, Any]]:
        """Reads all recorded experiments."""
        if os.path.exists(self.json_path):
            try:
                with open(self.json_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    def get_experiment_by_id(self, experiment_id: str) -> Optional[Dict[str, Any]]:
        """Finds record by ID."""
        for r in self.get_all_experiments():
            if r.get("experiment_id", "").lower() == experiment_id.lower():
                return r
        return None

    def get_best_experiment(self, objective: str = "recall") -> Optional[Dict[str, Any]]:
        """Returns the top performing experiment for a given metric."""
        records = self.get_all_experiments()
        if not records:
            return None
        norm_obj = objective.lower()
        if norm_obj == "f1_score":
            norm_obj = "f1"

        def get_val(r):
            m = r.get("metrics", {})
            return float(m.get(norm_obj) or m.get(f"{norm_obj}_score") or -1.0)

        sorted_records = sorted(records, key=get_val, reverse=True)
        return sorted_records[0] if sorted_records else None


_default_tracker = None

def get_experiment_tracker(registry_dir: str = "results/experiments") -> ExperimentTracker:
    global _default_tracker
    if _default_tracker is None:
        _default_tracker = ExperimentTracker(registry_dir=registry_dir)
    return _default_tracker


if __name__ == "__main__":
    tracker = get_experiment_tracker()
    rec = tracker.log_experiment(
        model_name="XGBoost",
        augmentation_ratio=75.0,
        metrics={"accuracy": 0.733, "precision": 0.741, "recall": 0.708, "f1": 0.724, "roc_auc": 0.800},
        notes="Benchmark verification run",
    )
    print("Logged experiment:", rec["experiment_id"])
