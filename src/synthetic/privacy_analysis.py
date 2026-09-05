"""
Phase 4: Empirical Privacy Analysis Engine
Performs rigorous empirical privacy-risk assessments for CTGAN synthetic healthcare data.
Evaluates Distance to Closest Record (DCR), Nearest Neighbor Distance Ratio (NNDR),
exact duplication rates, and empirical memorization risk against held-out baselines.

MANDATORY SCIENTIFIC DISCLAIMERS:
- Empirical Privacy Risk Assessment
- The current implementation does not provide a formal (ε, δ)-Differential Privacy guarantee.
- DP-CTGAN is planned as future work.
"""

import os
import json
from typing import Dict, Any, Optional
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.synthetic.privacy")


class PrivacyAnalysisEngine:
    """Rigorous empirical privacy risk assessment engine."""

    def __init__(self, target_column: Optional[str] = "cardio"):
        self.target_column = target_column

    def evaluate_privacy(
        self,
        train_df: pd.DataFrame,
        synth_df: pd.DataFrame,
        test_df: Optional[pd.DataFrame] = None,
        subsample_size: int = 2500,
    ) -> Dict[str, Any]:
        """
        Executes empirical privacy assessment contrasting synthetic records with training and test baselines.
        """
        common_cols = [c for c in train_df.columns if c in synth_df.columns]
        numeric_cols = list(train_df[common_cols].select_dtypes(include=[np.number]).columns)

        # 1. Exact Duplication Analysis
        train_synth_merge = pd.merge(train_df[common_cols], synth_df[common_cols], on=common_cols, how="inner")
        exact_train_dup_count = len(train_synth_merge)
        exact_train_dup_pct = float((exact_train_dup_count / len(synth_df)) * 100) if len(synth_df) > 0 else 0.0

        exact_test_dup_count = 0
        exact_test_dup_pct = 0.0
        if test_df is not None:
            test_synth_merge = pd.merge(test_df[common_cols], synth_df[common_cols], on=common_cols, how="inner")
            exact_test_dup_count = len(test_synth_merge)
            exact_test_dup_pct = float((exact_test_dup_count / len(synth_df)) * 100) if len(synth_df) > 0 else 0.0

        # Subsample for distance metrics
        n_sub = min(subsample_size, len(train_df), len(synth_df))
        train_sub = train_df[numeric_cols].sample(n=n_sub, random_state=42)
        synth_sub = synth_df[numeric_cols].sample(n=n_sub, random_state=42)

        scaler = StandardScaler()
        train_scaled = scaler.fit_transform(train_sub.fillna(0.0))
        synth_scaled = scaler.transform(synth_sub.fillna(0.0))

        # 2. Synthetic-to-Train DCR & NNDR
        nn_train = NearestNeighbors(n_neighbors=2, metric="euclidean")
        nn_train.fit(train_scaled)
        distances_synth_to_train, _ = nn_train.kneighbors(synth_scaled)

        d1_synth = distances_synth_to_train[:, 0]
        d2_synth = distances_synth_to_train[:, 1]
        nndr_synth = np.where(d2_synth > 1e-9, d1_synth / d2_synth, 1.0)

        # 3. Test-to-Train Baseline DCR (Reference benchmark for legitimate generalization)
        baseline_dcr_median = None
        memorization_ratio = None
        if test_df is not None:
            n_test_sub = min(subsample_size, len(test_df))
            test_sub = test_df[numeric_cols].sample(n=n_test_sub, random_state=42)
            test_scaled = scaler.transform(test_sub.fillna(0.0))
            distances_test_to_train, _ = nn_train.kneighbors(test_scaled)
            d1_test = distances_test_to_train[:, 0]
            baseline_dcr_median = float(np.median(d1_test))

            synth_dcr_median = float(np.median(d1_synth))
            # Memorization Ratio = Median(DCR_synth) / Median(DCR_test)
            # A ratio close to 1.0 indicates synthetic data exhibits distance properties similar to unseen real patients
            memorization_ratio = float(synth_dcr_median / baseline_dcr_median) if baseline_dcr_median > 0 else 1.0

        # 4. Empirical Privacy Risk Classification
        if exact_train_dup_pct < 0.1 and float(np.percentile(d1_synth, 5)) > 0.5:
            risk_level = "LOW"
            risk_assessment = "Low empirical privacy risk. Generative samples demonstrate substantial non-memorized diversity."
        elif exact_train_dup_pct < 1.0:
            risk_level = "MODERATE"
            risk_assessment = "Moderate empirical privacy risk. Minor localized density clustering observed."
        else:
            risk_level = "ELEVATED"
            risk_assessment = "Elevated privacy risk. Exact duplication or tight clustering detected."

        report = {
            "title": "Empirical Privacy Risk Assessment for CTGAN Synthetic Data",
            "risk_level": risk_level,
            "formal_dp_guarantee": False,
            "disclaimer": (
                "The current implementation does not provide a formal (ε, δ)-Differential Privacy guarantee. "
                "All metrics represent empirical distance and duplicate analyses. DP-CTGAN is planned as future work."
            ),
            "sample_counts": {
                "training_records": len(train_df),
                "synthetic_records": len(synth_df),
                "test_records": len(test_df) if test_df is not None else 0,
            },
            "exact_duplicates": {
                "synthetic_to_train_count": exact_train_dup_count,
                "synthetic_to_train_pct": round(exact_train_dup_pct, 4),
                "synthetic_to_test_count": exact_test_dup_count,
                "synthetic_to_test_pct": round(exact_test_dup_pct, 4),
            },
            "distance_to_closest_record": {
                "dcr_mean": round(float(np.mean(d1_synth)), 4),
                "dcr_median": round(float(np.median(d1_synth)), 4),
                "dcr_5th_percentile": round(float(np.percentile(d1_synth, 5)), 4),
                "dcr_min": round(float(np.min(d1_synth)), 4),
                "test_to_train_baseline_dcr_median": round(baseline_dcr_median, 4) if baseline_dcr_median else None,
                "memorization_ratio": round(memorization_ratio, 4) if memorization_ratio else None,
            },
            "nearest_neighbor_distance_ratio": {
                "nndr_mean": round(float(np.mean(nndr_synth)), 4),
                "nndr_median": round(float(np.median(nndr_synth)), 4),
                "nndr_5th_percentile": round(float(np.percentile(nndr_synth, 5)), 4),
            },
            "interpretation": risk_assessment,
        }

        return report

    def generate_markdown(self, report: Dict[str, Any]) -> str:
        """Formats the empirical privacy analysis report as Markdown."""
        dcr = report["distance_to_closest_record"]
        nndr = report["nearest_neighbor_distance_ratio"]
        dup = report["exact_duplicates"]
        cnt = report["sample_counts"]

        lines = [
            "# Empirical Privacy Risk Assessment Report",
            "",
            "> [!NOTE]",
            "> **Research Privacy Notice:** The current implementation provides an empirical privacy assessment and does not provide a formal (ε, δ)-Differential Privacy guarantee. DP-CTGAN with Rényi differential privacy accounting is identified as future work.",
            "",
            "## 1. Executive Summary",
            "",
            f"- **Overall Empirical Risk Level:** **{report['risk_level']}**",
            f"- **Evaluation Scope:** {cnt['synthetic_records']:,} synthetic vs {cnt['training_records']:,} real training records",
            f"- **Exact Duplication with Training Data:** {dup['synthetic_to_train_pct']:.2f}% ({dup['synthetic_to_train_count']} records)",
            f"- **Exact Duplication with Held-Out Test Data:** {dup['synthetic_to_test_pct']:.2f}% ({dup['synthetic_to_test_count']} records)",
            f"- **Median Distance to Closest Record (DCR):** {dcr['dcr_median']:.4f}",
        ]

        if dcr.get("test_to_train_baseline_dcr_median"):
            lines.extend([
                f"- **Held-Out Test Baseline DCR:** {dcr['test_to_train_baseline_dcr_median']:.4f}",
                f"- **Empirical Memorization Ratio:** {dcr['memorization_ratio']} (Values $\\approx 1.0$ indicate healthy non-memorizing distribution coverage)",
            ])

        lines.extend([
            "",
            "## 2. Record Distance & Proximity Metrics (Standardized Euclidean)",
            "",
            "| Metric | Measured Value | Safe Threshold Benchmark | Evaluation |",
            "|---|---|---|---|",
            f"| Exact Duplicate Rate | {dup['synthetic_to_train_pct']:.2f}% | < 1.0% | {'PASS' if dup['synthetic_to_train_pct'] < 1.0 else 'WARN'} |",
            f"| 5th Percentile DCR | {dcr['dcr_5th_percentile']:.4f} | > 0.20 | {'PASS' if dcr['dcr_5th_percentile'] > 0.20 else 'WARN'} |",
            f"| Median DCR | {dcr['dcr_median']:.4f} | > 1.00 | {'PASS' if dcr['dcr_median'] > 1.00 else 'WARN'} |",
            f"| Median NNDR | {nndr['nndr_median']:.4f} | > 0.60 | {'PASS' if nndr['nndr_median'] > 0.60 else 'WARN'} |",
            "",
            "## 3. Empirical Interpretation & Safeguards",
            "",
            f"{report['interpretation']}",
            "",
            "### Future Work",
            "- Incorporation of Differentially Private Conditional Tabular GAN (DP-CTGAN) via gradient clipping and calibrated Gaussian noise injection during discriminator updates.",
            "- Membership inference attack (MIA) resilience quantification using shadow model ensembles.",
            "",
        ])

        return "\n".join(lines)


def run_privacy_analysis(
    train_path: str = "data/processed/large_train.csv",
    synthetic_path: str = "data/processed/large_synthetic_ctgan.csv",
    test_path: Optional[str] = "data/processed/large_test.csv",
    output_dir: str = "results/privacy",
    target_column: str = "cardio",
) -> Dict[str, Any]:
    """CLI runner for empirical privacy analysis."""
    os.makedirs(output_dir, exist_ok=True)
    if not os.path.exists(train_path) or not os.path.exists(synthetic_path):
        if os.path.exists("data/processed/real_train.csv") and os.path.exists("data/processed/synthetic_heart_disease.csv"):
            train_path = "data/processed/real_train.csv"
            synthetic_path = "data/processed/synthetic_heart_disease.csv"
            test_path = "data/processed/real_test.csv"
            target_column = "target" if "target" in pd.read_csv(train_path, nrows=2).columns else "num"
        else:
            raise FileNotFoundError(f"Files not found: {train_path}, {synthetic_path}")

    train_df = pd.read_csv(train_path)
    synth_df = pd.read_csv(synthetic_path)
    test_df = pd.read_csv(test_path) if test_path and os.path.exists(test_path) else None

    engine = PrivacyAnalysisEngine(target_column=target_column)
    report = engine.evaluate_privacy(train_df, synth_df, test_df)

    json_path = os.path.join(output_dir, "privacy_analysis.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    md_path = os.path.join(output_dir, "privacy_analysis.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(engine.generate_markdown(report))

    logger.info(f"Privacy analysis completed: Risk level {report['risk_level']}. Saved to {json_path}")
    return report


if __name__ == "__main__":
    run_privacy_analysis()
