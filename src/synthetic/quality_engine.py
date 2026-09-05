"""
Phase 3: Synthetic Data Quality Engine
Evaluates statistical fidelity, distribution distance, correlation structure preservation,
and record similarity between Real and CTGAN-generated synthetic data.
Outputs:
  - results/synthetic/synthetic_quality_report.json
  - results/synthetic/synthetic_quality_report.md
"""

import os
import json
from typing import Dict, Any, Optional, List
import pandas as pd
import numpy as np
from scipy import stats
from scipy.spatial.distance import cdist
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.synthetic.quality")


class SyntheticQualityEngine:
    """Rigorous evaluation of generative fidelity across distribution, correlation, and record levels."""

    def __init__(self, target_column: Optional[str] = "cardio"):
        self.target_column = target_column

    def evaluate(
        self,
        real_df: pd.DataFrame,
        synth_df: pd.DataFrame,
        sample_size_for_dcr: int = 2000,
    ) -> Dict[str, Any]:
        """
        Executes complete synthetic quality evaluation suite.
        """
        # Find common columns
        common_cols = [c for c in real_df.columns if c in synth_df.columns]
        real_sub = real_df[common_cols].copy()
        synth_sub = synth_df[common_cols].copy()

        # Identify numerical vs categorical
        num_cols = list(real_sub.select_dtypes(include=[np.number]).columns)
        cat_cols = [c for c in common_cols if c not in num_cols]
        auto_cats = [c for c in num_cols if real_sub[c].nunique() <= 6 and c != "age"]
        reported_cat_cols = list(set(cat_cols + auto_cats))
        reported_num_cols = [c for c in num_cols if c not in reported_cat_cols]

        # -------------------------------------------------------------
        # A. Numerical Distribution Comparison (KS Test & Wasserstein)
        # -------------------------------------------------------------
        numerical_eval = {}
        for col in reported_num_cols:
            r_vals = real_sub[col].dropna().values
            s_vals = synth_sub[col].dropna().values

            ks_stat, ks_pval = stats.ks_2samp(r_vals, s_vals)
            try:
                wasserstein_dist = stats.wasserstein_distance(r_vals, s_vals)
            except Exception:
                wasserstein_dist = 0.0

            numerical_eval[col] = {
                "ks_statistic": round(float(ks_stat), 4),
                "ks_pvalue": round(float(ks_pval), 6),
                "wasserstein_distance": round(float(wasserstein_dist), 4),
                "distribution_similarity": round(float(max(0.0, 1.0 - ks_stat)), 4),
            }

        # -------------------------------------------------------------
        # B. Categorical Distribution Comparison (TVD & JS Divergence)
        # -------------------------------------------------------------
        categorical_eval = {}
        for col in reported_cat_cols:
            all_cats = list(set(real_sub[col].dropna().unique()).union(set(synth_sub[col].dropna().unique())))
            r_freq = real_sub[col].value_counts(normalize=True).to_dict()
            s_freq = synth_sub[col].value_counts(normalize=True).to_dict()

            p = np.array([r_freq.get(c, 0.0) for c in all_cats])
            q = np.array([s_freq.get(c, 0.0) for c in all_cats])

            # Total Variation Distance (TVD) = 0.5 * sum(|p - q|)
            tvd = 0.5 * np.sum(np.abs(p - q))

            # Jensen-Shannon Distance
            m = 0.5 * (p + q)
            # Avoid log(0)
            kl_pm = stats.entropy(p, m) if np.all(p >= 0) else 0.0
            kl_qm = stats.entropy(q, m) if np.all(q >= 0) else 0.0
            js_div = 0.5 * (kl_pm + kl_qm)
            js_dist = np.sqrt(max(0.0, js_div))

            categorical_eval[col] = {
                "tvd": round(float(tvd), 4),
                "js_distance": round(float(js_dist), 4),
                "categorical_similarity": round(float(max(0.0, 1.0 - tvd)), 4),
            }

        # -------------------------------------------------------------
        # C. Mean, Median, Std Dev Comparison
        # -------------------------------------------------------------
        tendency_eval = {}
        for col in reported_num_cols:
            r_mean = float(real_sub[col].mean())
            s_mean = float(synth_sub[col].mean())
            r_std = float(real_sub[col].std())
            s_std = float(synth_sub[col].std())
            r_med = float(real_sub[col].median())
            s_med = float(synth_sub[col].median())

            mean_rel_err = abs(s_mean - r_mean) / abs(r_mean) if abs(r_mean) > 1e-6 else 0.0
            std_rel_err = abs(s_std - r_std) / abs(r_std) if abs(r_std) > 1e-6 else 0.0

            tendency_eval[col] = {
                "real_mean": round(r_mean, 2),
                "synth_mean": round(s_mean, 2),
                "mean_rel_error": round(float(mean_rel_err), 4),
                "real_std": round(r_std, 2),
                "synth_std": round(s_std, 2),
                "std_rel_error": round(float(std_rel_err), 4),
                "real_median": round(r_med, 2),
                "synth_median": round(s_med, 2),
            }

        # -------------------------------------------------------------
        # D. Correlation Comparison (Frobenius Distance & Similarity)
        # -------------------------------------------------------------
        numeric_subset = [c for c in common_cols if np.issubdtype(real_sub[c].dtype, np.number)]
        real_corr = real_sub[numeric_subset].corr().fillna(0.0)
        synth_corr = synth_sub[numeric_subset].corr().fillna(0.0)

        # Frobenius norm distance = sqrt(sum((R - S)^2))
        frob_dist = float(np.linalg.norm(real_corr.values - synth_corr.values, ord="fro"))
        # Normalized by matrix size
        n_features = len(numeric_subset)
        norm_frob = frob_dist / n_features if n_features > 0 else 0.0

        # Pearson correlation between upper triangle values
        triu_idx = np.triu_indices(n_features, k=1)
        r_triu = real_corr.values[triu_idx]
        s_triu = synth_corr.values[triu_idx]
        if len(r_triu) > 1:
            matrix_r, _ = stats.pearsonr(r_triu, s_triu)
            matrix_corr_score = float(matrix_r) if not np.isnan(matrix_r) else 0.0
        else:
            matrix_corr_score = 1.0

        overall_correlation_similarity = max(0.0, min(1.0, matrix_corr_score))

        # -------------------------------------------------------------
        # E. Record-Level Similarity (DCR, NNDR, Exact Duplicates)
        # -------------------------------------------------------------
        # Exact duplicate rate
        exact_merged = pd.merge(real_sub, synth_sub, on=common_cols, how="inner")
        exact_dup_count = len(exact_merged)
        exact_dup_rate = float(exact_dup_count / len(synth_sub)) if len(synth_sub) > 0 else 0.0

        # Subsample for computational speed if dataset is huge
        sample_size = min(sample_size_for_dcr, len(synth_sub), len(real_sub))
        r_sample = real_sub[numeric_subset].sample(n=sample_size, random_state=42)
        s_sample = synth_sub[numeric_subset].sample(n=sample_size, random_state=42)

        scaler = StandardScaler()
        r_scaled = scaler.fit_transform(r_sample.fillna(0.0))
        s_scaled = scaler.transform(s_sample.fillna(0.0))

        # Fit NearestNeighbors on real data
        nn = NearestNeighbors(n_neighbors=2, metric="euclidean")
        nn.fit(r_scaled)
        distances, indices = nn.kneighbors(s_scaled)

        # d1 = distance to 1st closest real record, d2 = distance to 2nd closest
        d1 = distances[:, 0]
        d2 = distances[:, 1]
        nndr = np.where(d2 > 1e-9, d1 / d2, 1.0)

        dcr_metrics = {
            "dcr_mean": round(float(np.mean(d1)), 4),
            "dcr_median": round(float(np.median(d1)), 4),
            "dcr_5th_percentile": round(float(np.percentile(d1, 5)), 4),
            "dcr_min": round(float(np.min(d1)), 4),
            "nndr_mean": round(float(np.mean(nndr)), 4),
            "nndr_median": round(float(np.median(nndr)), 4),
            "exact_duplicate_count": exact_dup_count,
            "exact_duplicate_rate_pct": round(exact_dup_rate * 100, 4),
        }

        # Overall Quality Score (Weighted composite)
        avg_num_sim = np.mean([v["distribution_similarity"] for v in numerical_eval.values()]) if numerical_eval else 1.0
        avg_cat_sim = np.mean([v["categorical_similarity"] for v in categorical_eval.values()]) if categorical_eval else 1.0
        overall_quality_score = float(
            0.35 * avg_num_sim + 0.35 * overall_correlation_similarity + 0.30 * avg_cat_sim
        )

        report = {
            "dataset_comparison": {
                "real_records": len(real_df),
                "synthetic_records": len(synth_df),
                "attributes_evaluated": len(common_cols),
            },
            "overall_quality_score": round(overall_quality_score, 4),
            "correlation_analysis": {
                "overall_correlation_similarity": round(overall_correlation_similarity, 4),
                "frobenius_distance": round(frob_dist, 4),
                "normalized_frobenius": round(norm_frob, 4),
            },
            "record_similarity_privacy": dcr_metrics,
            "numerical_distributions": numerical_eval,
            "categorical_distributions": categorical_eval,
            "central_tendencies": tendency_eval,
        }

        return report

    def generate_markdown(self, report: Dict[str, Any]) -> str:
        """Formats the synthetic quality report as academic Markdown."""
        c = report["dataset_comparison"]
        score = report["overall_quality_score"]
        corr = report["correlation_analysis"]
        rec = report["record_similarity_privacy"]

        lines = [
            "# Synthetic Data Quality & Fidelity Evaluation Report",
            "",
            "## 1. Executive Summary",
            "",
            f"- **Real Benchmark Records:** {c['real_records']:,}",
            f"- **CTGAN Synthetic Records:** {c['synthetic_records']:,}",
            f"- **Composite Fidelity Score:** **{score * 100:.2f}%**",
            f"- **Correlation Matrix Similarity:** **{corr['overall_correlation_similarity'] * 100:.2f}%** (Frobenius: {corr['frobenius_distance']:.2f})",
            f"- **Exact Duplication Rate:** {rec['exact_duplicate_rate_pct']:.2f}% ({rec['exact_duplicate_count']} records)",
            f"- **Median Distance to Closest Record (DCR):** {rec['dcr_median']:.4f}",
            f"- **Median Nearest Neighbor Distance Ratio (NNDR):** {rec['nndr_median']:.4f}",
            "",
            "## 2. Numerical Feature Distribution Fidelity",
            "",
            "| Feature | KS Statistic | p-value | Wasserstein Dist | Fidelity Score |",
            "|---|---|---|---|---|",
        ]

        for feat, row in report["numerical_distributions"].items():
            lines.append(
                f"| `{feat}` | {row['ks_statistic']:.4f} | {row['ks_pvalue']:.4f} | {row['wasserstein_distance']:.4f} | {row['distribution_similarity']*100:.1f}% |"
            )

        lines.extend([
            "",
            "## 3. Categorical Feature Concordance",
            "",
            "| Feature | Total Variation Dist (TVD) | JS Distance | Concordance |",
            "|---|---|---|---|",
        ])

        for feat, row in report["categorical_distributions"].items():
            lines.append(
                f"| `{feat}` | {row['tvd']:.4f} | {row['js_distance']:.4f} | {row['categorical_similarity']*100:.1f}% |"
            )

        lines.extend([
            "",
            "## 4. Central Tendencies & Moment Comparison",
            "",
            "| Feature | Real Mean (Std) | Synthetic Mean (Std) | Mean Error | Std Error |",
            "|---|---|---|---|---|",
        ])

        for feat, row in report["central_tendencies"].items():
            lines.append(
                f"| `{feat}` | {row['real_mean']:.1f} ({row['real_std']:.1f}) | {row['synth_mean']:.1f} ({row['synth_std']:.1f}) | {row['mean_rel_error']*100:.1f}% | {row['std_rel_error']*100:.1f}% |"
            )

        lines.append("")
        return "\n".join(lines)


def run_synthetic_quality_evaluation(
    real_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    output_dir: str = "results/synthetic",
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """CLI runner for synthetic data quality evaluation."""
    os.makedirs(output_dir, exist_ok=True)
    if not os.path.exists(real_path) or not os.path.exists(synthetic_path):
        # Fallback to standard heart_disease paths if large paths not found
        if os.path.exists("data/processed/real_train.csv") and os.path.exists("data/processed/synthetic_heart_disease.csv"):
            real_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            target_column = "target" if "target" in pd.read_csv(real_path, nrows=2).columns else "num"
        else:
            raise FileNotFoundError(f"Real or synthetic dataset missing: {real_path}, {synthetic_path}")

    real_df = pd.read_csv(real_path)
    synth_df = pd.read_csv(synthetic_path)

    engine = SyntheticQualityEngine(target_column=target_column)
    report = engine.evaluate(real_df, synth_df)

    json_path = os.path.join(output_dir, "synthetic_quality_report.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    md_path = os.path.join(output_dir, "synthetic_quality_report.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(engine.generate_markdown(report))

    logger.info(f"Synthetic quality evaluation completed: Score {report['overall_quality_score']*100:.2f}%. Saved to {json_path}")
    return report


if __name__ == "__main__":
    run_synthetic_quality_evaluation()
