"""
Phase 8: Bootstrap Robustness Analysis
Evaluates test set metric stability via B-iteration non-parametric bootstrap resampling with replacement.
Calculates empirical 95% Confidence Intervals (2.5th and 97.5th percentiles) for:
Accuracy, Precision, Recall, F1-Score, and ROC-AUC.
Outputs:
  - results/robustness/bootstrap_results.json
  - results/robustness/bootstrap_results.md
"""

import os
import json
from typing import Dict, Any, List, Optional
import numpy as np
import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.robustness.bootstrap")


class BootstrapRobustnessEngine:
    """Non-parametric bootstrap estimation for predictive performance metrics."""

    def __init__(self, n_iterations: int = 1000, confidence_level: float = 0.95, random_seed: int = 42):
        self.n_iterations = n_iterations
        self.confidence_level = confidence_level
        self.random_seed = random_seed

    def evaluate_bootstrap_ci(
        self,
        y_true: np.ndarray,
        y_pred: np.ndarray,
        y_prob: Optional[np.ndarray] = None,
        model_name: str = "Model",
        scenario_name: str = "Evaluation",
    ) -> Dict[str, Any]:
        """Runs bootstrap iterations with replacement and computes empirical percentiles."""
        y_true = np.asarray(y_true, dtype=int)
        y_pred = np.asarray(y_pred, dtype=int)
        if y_prob is None:
            y_prob = y_pred.astype(float)
        else:
            y_prob = np.asarray(y_prob, dtype=float)

        n_samples = len(y_true)
        rng = np.random.RandomState(self.random_seed)

        boot_metrics = {
            "accuracy": [],
            "precision": [],
            "recall": [],
            "f1": [],
            "roc_auc": [],
        }

        for _ in range(self.n_iterations):
            idx = rng.randint(0, n_samples, size=n_samples)
            y_t_b = y_true[idx]
            y_p_b = y_pred[idx]
            y_pr_b = y_prob[idx]

            # In rare bootstrap cases with single class, skip roc_auc or handle gracefully
            boot_metrics["accuracy"].append(float(accuracy_score(y_t_b, y_p_b)))
            boot_metrics["precision"].append(float(precision_score(y_t_b, y_p_b, zero_division=0)))
            boot_metrics["recall"].append(float(recall_score(y_t_b, y_p_b, zero_division=0)))
            boot_metrics["f1"].append(float(f1_score(y_t_b, y_p_b, zero_division=0)))

            try:
                if len(np.unique(y_t_b)) > 1:
                    boot_metrics["roc_auc"].append(float(roc_auc_score(y_t_b, y_pr_b)))
                else:
                    boot_metrics["roc_auc"].append(0.5)
            except Exception:
                boot_metrics["roc_auc"].append(0.5)

        alpha = 1.0 - self.confidence_level
        lower_p = (alpha / 2.0) * 100
        upper_p = (1.0 - alpha / 2.0) * 100

        summary = {}
        for metric, values in boot_metrics.items():
            arr = np.array(values)
            ci_lower = float(np.percentile(arr, lower_p))
            ci_upper = float(np.percentile(arr, upper_p))
            summary[metric] = {
                "mean": round(float(np.mean(arr)), 6),
                "std": round(float(np.std(arr)), 6),
                "median": round(float(np.median(arr)), 6),
                "ci_lower": round(ci_lower, 6),
                "ci_upper": round(ci_upper, 6),
                "ci_width": round(ci_upper - ci_lower, 6),
            }

        return {
            "model": model_name,
            "scenario": scenario_name,
            "bootstrap_iterations": self.n_iterations,
            "confidence_level": self.confidence_level,
            "metrics": summary,
        }

    def compare_baseline_vs_augmented(
        self,
        y_true: np.ndarray,
        base_pred: np.ndarray,
        base_prob: np.ndarray,
        aug_pred: np.ndarray,
        aug_prob: np.ndarray,
        model_name: str = "Classifier",
    ) -> Dict[str, Any]:
        """Simultaneous paired bootstrap computing difference distributions."""
        y_true = np.asarray(y_true, dtype=int)
        n_samples = len(y_true)
        rng = np.random.RandomState(self.random_seed)

        base_res = self.evaluate_bootstrap_ci(y_true, base_pred, base_prob, model_name=model_name, scenario_name="Baseline (0% Aug)")
        aug_res = self.evaluate_bootstrap_ci(y_true, aug_pred, aug_prob, model_name=model_name, scenario_name="Augmented (CTGAN)")

        # Metric delta distributions
        deltas = {"accuracy": [], "precision": [], "recall": [], "f1": [], "roc_auc": []}
        for _ in range(self.n_iterations):
            idx = rng.randint(0, n_samples, size=n_samples)
            y_t = y_true[idx]

            acc_diff = accuracy_score(y_t, aug_pred[idx]) - accuracy_score(y_t, base_pred[idx])
            prec_diff = precision_score(y_t, aug_pred[idx], zero_division=0) - precision_score(y_t, base_pred[idx], zero_division=0)
            rec_diff = recall_score(y_t, aug_pred[idx], zero_division=0) - recall_score(y_t, base_pred[idx], zero_division=0)
            f1_diff = f1_score(y_t, aug_pred[idx], zero_division=0) - f1_score(y_t, base_pred[idx], zero_division=0)

            deltas["accuracy"].append(float(acc_diff))
            deltas["precision"].append(float(prec_diff))
            deltas["recall"].append(float(rec_diff))
            deltas["f1"].append(float(f1_diff))

            try:
                if len(np.unique(y_t)) > 1:
                    auc_diff = roc_auc_score(y_t, aug_prob[idx]) - roc_auc_score(y_t, base_prob[idx])
                    deltas["roc_auc"].append(float(auc_diff))
            except Exception:
                pass

        delta_summary = {}
        lower_p = ((1.0 - self.confidence_level) / 2.0) * 100
        upper_p = (1.0 - (1.0 - self.confidence_level) / 2.0) * 100

        for metric, values in deltas.items():
            if not values:
                continue
            arr = np.array(values)
            ci_l = float(np.percentile(arr, lower_p))
            ci_u = float(np.percentile(arr, upper_p))
            delta_summary[metric] = {
                "mean_delta": round(float(np.mean(arr)), 6),
                "ci_lower": round(ci_l, 6),
                "ci_upper": round(ci_u, 6),
                "prob_positive_gain": round(float(np.mean(arr > 0)), 4),
            }

        return {
            "model": model_name,
            "iterations": self.n_iterations,
            "baseline": base_res["metrics"],
            "augmented": aug_res["metrics"],
            "delta_analysis": delta_summary,
        }

    def generate_markdown(self, result: Dict[str, Any]) -> str:
        """Generates clear scientific Markdown table."""
        lines = [
            "# Bootstrap Robustness Analysis Report",
            "",
            f"**Model**: {result['model']}",
            f"**Bootstrap Resampling Iterations**: {result['iterations']:,} with replacement",
            f"**Empirical Confidence Level**: {result.get('confidence_level', 0.95)*100:.0f}%",
            "",
            "## Empirical Performance Bounds",
            "",
            "| Metric | Baseline Mean (95% CI) | Augmented Mean (95% CI) | Mean Delta | Delta 95% CI | P(Gain > 0) |",
            "|---|---|---|---|---|---|",
        ]
        base_m = result["baseline"]
        aug_m = result["augmented"]
        delta_m = result["delta_analysis"]

        for metric in ["recall", "f1", "roc_auc", "accuracy", "precision"]:
            if metric in base_m and metric in aug_m and metric in delta_m:
                b = base_m[metric]
                a = aug_m[metric]
                d = delta_m[metric]
                lines.append(
                    f"| `{metric.upper()}` | {b['mean']:.4f} [{b['ci_lower']:.4f}, {b['ci_upper']:.4f}] | "
                    f"{a['mean']:.4f} [{a['ci_lower']:.4f}, {a['ci_upper']:.4f}] | "
                    f"{d['mean_delta']:+.4f} | [{d['ci_lower']:+.4f}, {d['ci_upper']:+.4f}] | {d['prob_positive_gain']*100:.1f}% |"
                )

        lines.append("")
        return "\n".join(lines)


def run_bootstrap_analysis(
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    test_path: str = "data/processed/large_test.csv",
    output_dir: str = "results/robustness",
    model_name: str = "Logistic Regression",
    n_iterations: int = 1000,
    quick_mode: bool = False,
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """Runs end-to-end bootstrap evaluation on baseline vs augmented models."""
    os.makedirs(output_dir, exist_ok=True)
    if quick_mode:
        n_iterations = 100

    # Path fallback
    if not os.path.exists(train_path) or not os.path.exists(test_path):
        if os.path.exists("data/processed/real_train.csv"):
            train_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            test_path = "data/processed/real_test.csv"
            target_column = "num"

    from src.augmentation.experiment_engine import AugmentationExperimentEngine
    aug_engine = AugmentationExperimentEngine(target_column=target_column)

    train_df = pd.read_csv(train_path)
    synth_df = pd.read_csv(synthetic_path)
    test_df = pd.read_csv(test_path)

    # Subsample test if very large for fast bootstrap
    if len(test_df) > 5000 and quick_mode:
        test_df = test_df.sample(n=5000, random_state=42)

    X_train_base = train_df.drop(columns=[target_column])
    y_train_base = (train_df[target_column] > 0).astype(int)

    # Augmented dataset (e.g. 100% augmentation)
    n_add = min(len(train_df), len(synth_df))
    synth_samp = synth_df.sample(n=n_add, random_state=42)
    common_cols = [c for c in train_df.columns if c in synth_samp.columns]
    augmented_df = pd.concat([train_df[common_cols], synth_samp[common_cols]], ignore_index=True)
    X_train_aug = augmented_df.drop(columns=[target_column])
    y_train_aug = (augmented_df[target_column] > 0).astype(int)

    X_test = test_df.drop(columns=[target_column])
    y_test = (test_df[target_column] > 0).astype(int).values

    # Fit baseline
    m_base = aug_engine.get_model(model_name, quick_mode=quick_mode)
    m_base.fit(X_train_base, y_train_base)
    base_pred = m_base.predict(X_test)
    base_prob = m_base.predict_proba(X_test)[:, 1] if hasattr(m_base, "predict_proba") else base_pred.astype(float)

    # Fit augmented
    m_aug = aug_engine.get_model(model_name, quick_mode=quick_mode)
    m_aug.fit(X_train_aug, y_train_aug)
    aug_pred = m_aug.predict(X_test)
    aug_prob = m_aug.predict_proba(X_test)[:, 1] if hasattr(m_aug, "predict_proba") else aug_pred.astype(float)

    boot_engine = BootstrapRobustnessEngine(n_iterations=n_iterations, random_seed=42)
    result = boot_engine.compare_baseline_vs_augmented(
        y_true=y_test,
        base_pred=base_pred,
        base_prob=base_prob,
        aug_pred=aug_pred,
        aug_prob=aug_prob,
        model_name=model_name,
    )

    json_path = os.path.join(output_dir, "bootstrap_results.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)

    md_path = os.path.join(output_dir, "bootstrap_results.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(boot_engine.generate_markdown(result))

    logger.info(f"Bootstrap evaluation completed ({n_iterations} iterations). Saved to {json_path}")
    return result


if __name__ == "__main__":
    run_bootstrap_analysis(quick_mode=True)
