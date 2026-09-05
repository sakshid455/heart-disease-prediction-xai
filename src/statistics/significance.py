"""
Phase 7: Statistical Significance Analysis
Performs formal paired hypothesis testing (Paired t-test, Wilcoxon signed-rank test),
computes 95% Confidence Intervals of difference, and Cohen's d effect sizes.
Outputs:
  - results/statistics/statistical_significance.json
  - results/statistics/statistical_significance.md
"""

import os
import json
from typing import Dict, Any, List, Optional
import numpy as np
import pandas as pd
from scipy import stats

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.statistics.significance")


class StatisticalSignificanceEngine:
    """Hypothesis testing engine comparing baseline vs augmented models across seeds."""

    def __init__(self, alpha: float = 0.05):
        self.alpha = alpha

    @staticmethod
    def calculate_cohens_d(differences: np.ndarray) -> float:
        """Calculates Cohen's d for paired samples: mean(d) / std(d, ddof=1)."""
        s_d = np.std(differences, ddof=1)
        if s_d == 0 or np.isnan(s_d):
            return 0.0
        return float(np.mean(differences) / s_d)

    @staticmethod
    def interpret_effect_size(d: float) -> str:
        abs_d = abs(d)
        if abs_d < 0.2:
            return "Negligible"
        elif abs_d < 0.5:
            return "Small"
        elif abs_d < 0.8:
            return "Medium"
        else:
            return "Large"

    def compare_paired(
        self,
        baseline_scores: List[float],
        augmented_scores: List[float],
        metric_name: str,
        model_name: str,
        augmentation_ratio: float,
    ) -> Dict[str, Any]:
        """Runs formal paired t-test and Wilcoxon test between baseline and augmented samples."""
        base = np.array(baseline_scores, dtype=float)
        aug = np.array(augmented_scores, dtype=float)

        if len(base) != len(aug) or len(base) < 2:
            raise ValueError(f"Need at least 2 paired observations. Received {len(base)} base vs {len(aug)} aug.")

        diffs = aug - base
        n = len(diffs)
        mean_diff = float(np.mean(diffs))
        std_diff = float(np.std(diffs, ddof=1))
        se_diff = float(std_diff / np.sqrt(n))

        # Degrees of freedom
        df = n - 1
        t_crit = float(stats.t.ppf(1 - self.alpha / 2, df)) if df > 0 else 1.96
        ci_lower = float(mean_diff - t_crit * se_diff)
        ci_upper = float(mean_diff + t_crit * se_diff)

        # Paired t-test
        t_stat, p_val_ttest = stats.ttest_rel(aug, base)
        if np.isnan(t_stat):
            t_stat, p_val_ttest = 0.0, 1.0

        # Wilcoxon signed-rank test
        try:
            if np.all(diffs == 0):
                w_stat, p_val_wilcoxon = 0.0, 1.0
            else:
                w_res = stats.wilcoxon(aug, base, zero_method="wilcox")
                w_stat, p_val_wilcoxon = float(w_res.statistic), float(w_res.pvalue)
        except Exception:
            w_stat, p_val_wilcoxon = float("nan"), float("nan")

        cohen_d = self.calculate_cohens_d(diffs)

        is_significant = bool(p_val_ttest < self.alpha)
        direction = "Superior" if mean_diff > 0 and is_significant else ("Inferior" if mean_diff < 0 and is_significant else "Neutral / No Difference")

        return {
            "model": model_name,
            "augmentation_ratio": float(augmentation_ratio),
            "metric": metric_name,
            "n_pairs": int(n),
            "baseline_mean": round(float(np.mean(base)), 6),
            "baseline_std": round(float(np.std(base, ddof=1)), 6),
            "augmented_mean": round(float(np.mean(aug)), 6),
            "augmented_std": round(float(np.std(aug, ddof=1)), 6),
            "mean_difference": round(mean_diff, 6),
            "ci_95": [round(ci_lower, 6), round(ci_upper, 6)],
            "t_statistic": round(float(t_stat), 4),
            "p_value_ttest": round(float(p_val_ttest), 6),
            "wilcoxon_stat": round(float(w_stat), 4) if not np.isnan(w_stat) else None,
            "p_value_wilcoxon": round(float(p_val_wilcoxon), 6) if not np.isnan(p_val_wilcoxon) else None,
            "cohens_d": round(cohen_d, 4),
            "effect_size_magnitude": self.interpret_effect_size(cohen_d),
            "statistically_significant": is_significant,
            "scientific_conclusion": direction,
        }

    def analyze_dataset(
        self,
        repeated_df: pd.DataFrame,
        metrics: Optional[List[str]] = None,
        ratios: Optional[List[float]] = None,
    ) -> List[Dict[str, Any]]:
        """Scans repeated experimental runs across models, ratios, and metrics."""
        if metrics is None:
            metrics = ["recall", "f1_score", "roc_auc", "accuracy"]
        models = repeated_df["model"].unique()
        all_results = []

        for m in models:
            m_df = repeated_df[repeated_df["model"] == m]
            base_df = m_df[m_df["augmentation_ratio"] == 0].sort_values("seed")
            if base_df.empty:
                continue

            available_ratios = ratios or sorted([r for r in m_df["augmentation_ratio"].unique() if r > 0])

            for r in available_ratios:
                aug_df = m_df[m_df["augmentation_ratio"] == r].sort_values("seed")
                if aug_df.empty:
                    continue

                for metric in metrics:
                    if metric not in base_df.columns or metric not in aug_df.columns:
                        continue
                    b_vals = base_df[metric].dropna().tolist()
                    a_vals = aug_df[metric].dropna().tolist()

                    if len(b_vals) >= 2 and len(b_vals) == len(a_vals):
                        res = self.compare_paired(
                            baseline_scores=b_vals,
                            augmented_scores=a_vals,
                            metric_name=metric,
                            model_name=m,
                            augmentation_ratio=r,
                        )
                        all_results.append(res)

        return all_results

    def generate_markdown(self, results: List[Dict[str, Any]]) -> str:
        """Generates academic Markdown report."""
        lines = [
            "# Formal Statistical Significance Analysis Report",
            "",
            "Paired hypothesis testing comparing baseline (0% Augmentation) against augmented models across repeated seeds.",
            "Alpha significance threshold: $\\alpha = 0.05$.",
            "",
            "| Model | Aug Ratio | Metric | Baseline Mean | Aug Mean | Mean Diff | 95% CI | p-value (t-test) | Cohen's d | Conclusion |",
            "|---|---|---|---|---|---|---|---|---|---|",
        ]
        for r in results:
            sig_marker = "**" if r["statistically_significant"] else ""
            lines.append(
                f"| {r['model']} | {r['augmentation_ratio']}% | {r['metric']} | "
                f"{r['baseline_mean']:.4f} | {r['augmented_mean']:.4f} | {r['mean_difference']:+.4f} | "
                f"[{r['ci_95'][0]:.4f}, {r['ci_95'][1]:.4f}] | {sig_marker}{r['p_value_ttest']:.4f}{sig_marker} | "
                f"{r['cohens_d']:.2f} ({r['effect_size_magnitude']}) | {r['scientific_conclusion']} |"
            )
        lines.append("")
        return "\n".join(lines)


def run_statistical_significance_analysis(
    repeated_results_path: str = "results/robustness/repeated_experiment_results.csv",
    output_dir: str = "results/statistics",
    alpha: float = 0.05,
) -> List[Dict[str, Any]]:
    """Runs statistical significance analysis."""
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.exists(repeated_results_path):
        raise FileNotFoundError(f"Repeated results file not found: {repeated_results_path}")

    df = pd.read_csv(repeated_results_path)
    engine = StatisticalSignificanceEngine(alpha=alpha)
    results = engine.analyze_dataset(df)

    json_path = os.path.join(output_dir, "statistical_significance.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    md_path = os.path.join(output_dir, "statistical_significance.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(engine.generate_markdown(results))

    logger.info(f"Statistical significance analysis completed: {len(results)} paired tests saved to {json_path}")
    return results


if __name__ == "__main__":
    run_statistical_significance_analysis()
