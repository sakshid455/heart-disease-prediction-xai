"""
Phase 5: Automated Augmentation Experiment Engine
Evaluates 4 core models across multi-level synthetic data augmentation ratios (0% to 200%).
Logs structured experimental metrics: Accuracy, Precision, Recall, F1, ROC-AUC.
Outputs:
  - results/augmentation/augmentation_experiments.csv
  - results/augmentation/augmentation_experiments.json
"""

import os
import time
import json
import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
import pandas as pd
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.augmentation.engine")


class AugmentationExperimentEngine:
    """Evaluates predictive models under varying synthetic data augmentation ratios."""

    def __init__(self, target_column: str = "cardio", random_state: int = 42):
        self.target_column = target_column
        self.random_state = random_state

    def get_model(self, model_name: str, quick_mode: bool = False):
        """Constructs model pipeline with appropriate feature scaling."""
        name_clean = model_name.lower().replace(" ", "_").replace("-", "_")

        if "logistic" in name_clean:
            return Pipeline([
                ("scaler", StandardScaler()),
                ("model", LogisticRegression(
                    max_iter=1000 if not quick_mode else 200,
                    random_state=self.random_state,
                    solver="lbfgs",
                    C=1.0,
                )),
            ])
        elif "random_forest" in name_clean or "forest" in name_clean:
            return RandomForestClassifier(
                n_estimators=100 if not quick_mode else 30,
                max_depth=12 if quick_mode else None,
                random_state=self.random_state,
                n_jobs=-1,
            )
        elif "svm" in name_clean:
            # SVC with probability calibration
            return Pipeline([
                ("scaler", StandardScaler()),
                ("model", SVC(
                    kernel="rbf",
                    C=1.0,
                    gamma="scale",
                    probability=True,
                    random_state=self.random_state,
                    max_iter=2000 if quick_mode else -1,
                )),
            ])
        elif "xgboost" in name_clean or "xgb" in name_clean:
            return XGBClassifier(
                n_estimators=100 if not quick_mode else 40,
                max_depth=6 if not quick_mode else 4,
                learning_rate=0.1,
                random_state=self.random_state,
                eval_metric="logloss",
                verbosity=0,
                n_jobs=-1,
            )
        else:
            raise ValueError(f"Unsupported model: {model_name}. Choose from Logistic Regression, Random Forest, SVM, XGBoost.")

    def run_single_experiment(
        self,
        model_name: str,
        ratio: float,
        train_df: pd.DataFrame,
        synth_df: pd.DataFrame,
        test_df: pd.DataFrame,
        experiment_id: Optional[str] = None,
        quick_mode: bool = False,
    ) -> Dict[str, Any]:
        """Trains on augmented data (Real + ratio*Real synthetic) and tests strictly on Real test data."""
        if experiment_id is None:
            experiment_id = f"EXP-{uuid.uuid4().hex[:8].upper()}"

        start_time = time.time()
        n_real = len(train_df)
        n_synth_to_add = int(n_real * (ratio / 100.0))

        if n_synth_to_add > 0:
            synth_sample = synth_df.sample(
                n=min(n_synth_to_add, len(synth_df)),
                replace=(n_synth_to_add > len(synth_df)),
                random_state=self.random_state,
            )
            # Align columns
            common_cols = [c for c in train_df.columns if c in synth_sample.columns]
            augmented_train = pd.concat([train_df[common_cols], synth_sample[common_cols]], ignore_index=True)
        else:
            common_cols = [c for c in train_df.columns]
            augmented_train = train_df.copy()

        # If quick_mode and large dataset, subsample for swift execution
        if quick_mode and len(augmented_train) > 5000:
            augmented_train = augmented_train.sample(n=5000, random_state=self.random_state)
        eval_test = test_df
        if quick_mode and len(eval_test) > 2000:
            eval_test = eval_test.sample(n=2000, random_state=self.random_state)

        X_train = augmented_train.drop(columns=[self.target_column])
        y_train = (augmented_train[self.target_column] > 0).astype(int)

        X_test = eval_test.drop(columns=[self.target_column])
        y_test = (eval_test[self.target_column] > 0).astype(int)

        model = self.get_model(model_name, quick_mode=quick_mode)
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        if hasattr(model, "predict_proba"):
            y_prob = model.predict_proba(X_test)[:, 1]
        else:
            y_prob = y_pred

        accuracy = float(accuracy_score(y_test, y_pred))
        precision = float(precision_score(y_test, y_pred, zero_division=0))
        recall = float(recall_score(y_test, y_pred, zero_division=0))
        f1 = float(f1_score(y_test, y_pred, zero_division=0))
        try:
            roc_auc = float(roc_auc_score(y_test, y_prob))
        except Exception:
            roc_auc = 0.5

        elapsed = float(time.time() - start_time)

        result = {
            "experiment_id": experiment_id,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "model": model_name,
            "augmentation_ratio": float(ratio),
            "real_samples": int(n_real),
            "synthetic_samples": int(n_synth_to_add),
            "total_samples": int(len(augmented_train)),
            "accuracy": round(accuracy, 6),
            "precision": round(precision, 6),
            "recall": round(recall, 6),
            "f1": round(f1, 6),
            "roc_auc": round(roc_auc, 6),
            "random_seed": self.random_state,
            "training_time_seconds": round(elapsed, 3),
        }
        return result

    def run_experiment_grid(
        self,
        train_df: pd.DataFrame,
        synth_df: pd.DataFrame,
        test_df: pd.DataFrame,
        models: List[str],
        ratios: List[float],
        output_dir: str = "results/augmentation",
        quick_mode: bool = False,
    ) -> List[Dict[str, Any]]:
        """Executes full grid across models and augmentation ratios."""
        os.makedirs(output_dir, exist_ok=True)
        results = []

        total = len(models) * len(ratios)
        count = 0
        logger.info(f"Starting Augmentation Experiment Suite: {len(models)} models x {len(ratios)} ratios = {total} experiments.")

        for m in models:
            for r in ratios:
                count += 1
                logger.info(f"[{count}/{total}] Running {m} with {r}% augmentation...")
                res = self.run_single_experiment(
                    model_name=m,
                    ratio=r,
                    train_df=train_df,
                    synth_df=synth_df,
                    test_df=test_df,
                    quick_mode=quick_mode,
                )
                results.append(res)

        # Save to CSV and JSON (append or create)
        csv_path = os.path.join(output_dir, "augmentation_experiments.csv")
        json_path = os.path.join(output_dir, "augmentation_experiments.json")

        df_new = pd.DataFrame(results)
        if os.path.exists(csv_path):
            df_existing = pd.read_csv(csv_path)
            # Append only non-duplicates or concat
            combined = pd.concat([df_existing, df_new], ignore_index=True)
            combined.to_csv(csv_path, index=False)
        else:
            df_new.to_csv(csv_path, index=False)

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2)

        logger.info(f"Completed {len(results)} experiments. Results saved to {csv_path} and {json_path}")
        return results


def run_augmentation_experiments(
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    test_path: str = "data/processed/large_test.csv",
    output_dir: str = "results/augmentation",
    ratios: Optional[List[float]] = None,
    models: Optional[List[str]] = None,
    random_state: int = 42,
    target_column: str = "cardio",
    quick_mode: bool = False,
    use_existing_if_available: bool = False,
) -> List[Dict[str, Any]]:
    """CLI runner for augmentation experiment suite."""
    os.makedirs(output_dir, exist_ok=True)
    json_path = os.path.join(output_dir, "augmentation_experiments.json")

    # If already computed and requested to use existing
    if use_existing_if_available and os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)

    # Resolve paths with Cleveland fallback
    if not os.path.exists(train_path) or not os.path.exists(synthetic_path) or not os.path.exists(test_path):
        if os.path.exists("data/processed/real_train.csv"):
            train_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            test_path = "data/processed/real_test.csv"
            target_column = "num"
        else:
            raise FileNotFoundError("Training, synthetic, or test datasets missing.")

    train_df = pd.read_csv(train_path)
    synth_df = pd.read_csv(synthetic_path)
    test_df = pd.read_csv(test_path)

    if ratios is None:
        ratios = [0, 25, 50, 75, 100, 125, 150, 175, 200] if not quick_mode else [0, 50, 100, 200]
    if models is None:
        models = ["Logistic Regression", "Random Forest", "SVM", "XGBoost"] if not quick_mode else ["Logistic Regression", "Random Forest", "XGBoost"]

    engine = AugmentationExperimentEngine(target_column=target_column, random_state=random_state)
    return engine.run_experiment_grid(
        train_df=train_df,
        synth_df=synth_df,
        test_df=test_df,
        models=models,
        ratios=ratios,
        output_dir=output_dir,
        quick_mode=quick_mode,
    )


if __name__ == "__main__":
    run_augmentation_experiments(quick_mode=True)
