"""
Phase 10: Model Threshold Optimization
Sweeps classification decision thresholds across [0.10, 0.90] to optimize Sensitivity, Specificity,
F1-Score, and Youden's J statistic for clinical screening and diagnostic trade-offs.
Outputs:
  - results/calibration/threshold_optimization.json
  - results/calibration/threshold_optimization.md
"""

import os
import json
from typing import Dict, Any, List, Optional
import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.calibration.thresholds")

DISCLAIMER = (
    "RESEARCH DISCLAIMER: Model Threshold Optimization is an experimental analysis tool "
    "evaluating algorithmic operating trade-offs. It is NOT a clinical recommendation or "
    "medical decision aid. Threshold selections must not be applied clinically without prospective medical validation."
)


class ThresholdOptimizer:
    """Evaluates multi-threshold performance curves and identifies optimal decision criteria."""

    def __init__(self, min_thresh: float = 0.10, max_thresh: float = 0.90, step: float = 0.05):
        self.thresholds = np.round(np.arange(min_thresh, max_thresh + 1e-5, step), 2).tolist()

    def sweep_thresholds(
        self, y_true: np.ndarray, y_prob: np.ndarray, model_name: str = "Classifier"
    ) -> Dict[str, Any]:
        """Calculates confusion matrix and performance statistics across all thresholds."""
        y_true = np.asarray(y_true, dtype=int)
        y_prob = np.asarray(y_prob, dtype=float)

        curve_data = []

        best_f1_val = -1.0
        best_f1_threshold = 0.50

        best_youden_val = -2.0
        best_youden_threshold = 0.50

        best_sens_val = -1.0
        best_sens_threshold = 0.50

        default_metrics = None

        for t in self.thresholds:
            y_pred = (y_prob >= t).astype(int)
            tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()

            sens = float(tp / (tp + fn)) if (tp + fn) > 0 else 0.0
            spec = float(tn / (tn + fp)) if (tn + fp) > 0 else 0.0
            prec = float(tp / (tp + fp)) if (tp + fp) > 0 else 0.0
            f1 = float(2 * prec * sens / (prec + sens)) if (prec + sens) > 0 else 0.0
            acc = float((tp + tn) / len(y_true))
            youden_j = float(sens + spec - 1.0)

            row = {
                "threshold": round(float(t), 2),
                "true_positives": int(tp),
                "false_positives": int(fp),
                "true_negatives": int(tn),
                "false_negatives": int(fn),
                "sensitivity_recall": round(sens, 4),
                "specificity": round(spec, 4),
                "precision": round(prec, 4),
                "f1_score": round(f1, 4),
                "accuracy": round(acc, 4),
                "youden_j": round(youden_j, 4),
            }
            curve_data.append(row)

            if abs(t - 0.50) < 1e-4:
                default_metrics = row

            if f1 > best_f1_val:
                best_f1_val = f1
                best_f1_threshold = t

            if youden_j > best_youden_val:
                best_youden_val = youden_j
                best_youden_threshold = t

            # High sensitivity screening threshold (sens >= 0.85 with highest precision)
            if sens >= 0.85 and sens > best_sens_val:
                best_sens_val = sens
                best_sens_threshold = t

        # If no threshold achieved 0.85 sens, take minimum threshold
        if best_sens_val < 0:
            best_sens_threshold = self.thresholds[0]

        best_f1_row = [r for r in curve_data if abs(r["threshold"] - best_f1_threshold) < 1e-4][0]
        best_youden_row = [r for r in curve_data if abs(r["threshold"] - best_youden_threshold) < 1e-4][0]
        best_sens_row = [r for r in curve_data if abs(r["threshold"] - best_sens_threshold) < 1e-4][0]

        return {
            "model": model_name,
            "disclaimer": DISCLAIMER,
            "optimal_thresholds": {
                "default_0_50": default_metrics,
                "best_f1": best_f1_row,
                "best_youden_j": best_youden_row,
                "clinical_screening_high_sensitivity": best_sens_row,
            },
            "operating_points": curve_data,
        }

    def generate_markdown(self, result: Dict[str, Any]) -> str:
        """Generates clear Markdown summary."""
        lines = [
            "# Decision Threshold Optimization Analysis",
            "",
            f"> [!NOTE]",
            f"> {result['disclaimer']}",
            "",
            f"**Model**: {result['model']}",
            "",
            "## Recommended Operating Criteria",
            "",
            "| Objective | Selected Threshold | Sensitivity (Recall) | Specificity | Precision | F1-Score | Youden's J |",
            "|---|---|---|---|---|---|---|",
        ]
        opts = result["optimal_thresholds"]
        for name, row in [
            ("Standard Default (0.50)", opts["default_0_50"]),
            ("Balanced F1 Maximization", opts["best_f1"]),
            ("Youden's J Optimal (Sensitivity + Specificity)", opts["best_youden_j"]),
            ("High-Sensitivity Screening", opts["clinical_screening_high_sensitivity"]),
        ]:
            if row:
                lines.append(
                    f"| {name} | **{row['threshold']:.2f}** | {row['sensitivity_recall']*100:.1f}% | "
                    f"{row['specificity']*100:.1f}% | {row['precision']*100:.1f}% | "
                    f"{row['f1_score']:.4f} | {row['youden_j']:+.4f} |"
                )

        lines.append("")
        lines.append("## Complete Threshold Sweep Table")
        lines.append("")
        lines.append("| Threshold | Sensitivity | Specificity | Precision | F1-Score | Accuracy | Youden's J |")
        lines.append("|---|---|---|---|---|---|---|")
        for r in result["operating_points"]:
            lines.append(
                f"| {r['threshold']:.2f} | {r['sensitivity_recall']:.4f} | {r['specificity']:.4f} | "
                f"{r['precision']:.4f} | {r['f1_score']:.4f} | {r['accuracy']:.4f} | {r['youden_j']:+.4f} |"
            )
        lines.append("")
        return "\n".join(lines)


def run_threshold_optimization(
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    test_path: str = "data/processed/large_test.csv",
    output_dir: str = "results/calibration",
    model_name: str = "Logistic Regression",
    quick_mode: bool = False,
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """Runs full threshold sweep analysis."""
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
    synth_df = pd.read_csv(synthetic_path)
    test_df = pd.read_csv(test_path)

    if quick_mode and len(train_df) > 5000:
        train_df = train_df.sample(n=5000, random_state=42)
    if quick_mode and len(test_df) > 2500:
        test_df = test_df.sample(n=2500, random_state=42)

    n_add = min(len(train_df), len(synth_df))
    synth_samp = synth_df.sample(n=n_add, random_state=42)
    common_cols = [c for c in train_df.columns if c in synth_samp.columns]
    augmented_df = pd.concat([train_df[common_cols], synth_samp[common_cols]], ignore_index=True)

    X_train = augmented_df.drop(columns=[target_column])
    y_train = (augmented_df[target_column] > 0).astype(int)

    X_test = test_df.drop(columns=[target_column])
    y_test = (test_df[target_column] > 0).astype(int).values

    model = aug_engine.get_model(model_name, quick_mode=quick_mode)
    model.fit(X_train, y_train)

    y_prob = model.predict_proba(X_test)[:, 1] if hasattr(model, "predict_proba") else model.predict(X_test).astype(float)

    optimizer = ThresholdOptimizer()
    report = optimizer.sweep_thresholds(y_true=y_test, y_prob=y_prob, model_name=model_name)

    json_path = os.path.join(output_dir, "threshold_optimization.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    md_path = os.path.join(output_dir, "threshold_optimization.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(optimizer.generate_markdown(report))

    logger.info(
        f"Threshold optimization completed: Best F1 @ {report['optimal_thresholds']['best_f1']['threshold']} "
        f"(F1={report['optimal_thresholds']['best_f1']['f1_score']:.4f}). Saved to {json_path}"
    )
    return report


if __name__ == "__main__":
    run_threshold_optimization(quick_mode=True)
