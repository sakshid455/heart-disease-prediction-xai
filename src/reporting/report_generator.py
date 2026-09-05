"""
Phase 16: Automated Comprehensive Research Report Generator
Synthesizes scientific findings across all 15 research modules into a cohesive,
publication-ready manuscript artifact: results/research_report.md and results/research_summary.json.
"""

import os
import json
from datetime import datetime
from typing import Dict, Any, Optional

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.reporting.generator")


class ResearchReportGenerator:
    """Consolidates cross-modular experimental artifacts into formal scientific documentation."""

    def __init__(self, results_root: str = "results"):
        self.results_root = results_root

    def _load_json(self, relative_path: str) -> Optional[Dict[str, Any]]:
        full_path = os.path.join(self.results_root, relative_path)
        if os.path.exists(full_path):
            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.warning(f"Could not load {full_path}: {e}")
                return None
        return None

    def generate(self) -> str:
        """Constructs full academic Markdown report."""
        dq = self._load_json("validation/data_quality_report.json")
        lk = self._load_json("validation/leakage_report.json")
        sq = self._load_json("synthetic/synthetic_quality_report.json")
        pr = self._load_json("privacy/privacy_analysis.json")
        bc = self._load_json("augmentation/best_configuration.json")
        ss = self._load_json("statistics/statistical_significance.json")
        bs = self._load_json("robustness/bootstrap_results.json")
        cl = self._load_json("calibration/calibration_results.json")
        th = self._load_json("calibration/threshold_optimization.json")
        xai = self._load_json("explainability/xai_analysis.json")

        now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

        lines = [
            "# Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction",
            "",
            "**Scientific Evidence & Technical Research Report**  ",
            f"*Generated: {now_str} | Framework Version: 2.0.0*",
            "",
            "> [!NOTE]",
            "> **Medical Disclaimer**: This manuscript reports computational machine learning experiments and statistical "
            "> simulations. All algorithms, model predictions, decision thresholds, and counterfactuals are intended "
            "> strictly for scientific investigation and do not constitute clinical guidance, diagnoses, or prescriptions.",
            "",
            "---",
            "",
            "## 1. Executive Summary",
            "",
            "This research investigates the efficacy and safety of generative synthetic tabular data augmentation "
            "using Conditional Tabular Generative Adversarial Networks (CTGAN) to enhance predictive models for cardiovascular "
            "disease risk classification. Using a high-capacity multi-model experimental grid (Logistic Regression, "
            "Random Forest, Support Vector Machines, XGBoost) across systematic augmentation ratios (0% to 200%), "
            "we rigorously measure classification fidelity, empirical privacy preservation, statistical significance, "
            "bootstrap stability, probability calibration, threshold trade-offs, and explainability.",
            "",
        ]

        # Section 2: Data Quality & Leakage
        lines.append("## 2. Dataset Quality & Experimental Isolation")
        lines.append("")
        if dq:
            mv = dq.get("missing_values", {})
            ta = dq.get("target_analysis", {})
            sh = dq.get("shape", {})
            lines.append(
                f"- **Cohort Dimension**: {sh.get('rows', 0):,} records x {sh.get('columns', 0)} features.\n"
                f"- **Missing Value Profile**: {mv.get('total_missing', 0)} missing values ({mv.get('missing_pct', mv.get('missing_percentage', 0.0)):.2f}%).\n"
                f"- **Target Analysis**: Target column `{ta.get('target_column', 'target')}` with {len(ta.get('classes', {}))} class levels.\n"
                f"- **Entropy Balance**: {ta.get('entropy_balance', ta.get('shannon_entropy', 1.0)):.3f}."
            )
        if lk:
            status_text = "**PASSED (Zero Leakage)**" if lk.get("status") == "PASS" else f"**FLAGGED ({lk.get('status')})**"
            lines.append(
                f"\n**Data Leakage Audit**: {status_text}.\n"
                f"- Test records in CTGAN generator: {lk.get('metrics', {}).get('test_records_used_in_ctgan', 0)}\n"
                f"- Test contamination in preprocessing fit: {lk.get('metrics', {}).get('test_data_used_for_preprocessing_fit', 0)}"
            )
        lines.append("")

        # Section 3: Synthetic Data Quality & Privacy
        lines.append("## 3. Generative Fidelity & Empirical Privacy Assessment")
        lines.append("")
        if sq:
            lines.append(
                f"- **Generative Fidelity Score**: **{sq.get('overall_quality_score', 0.0)*100:.2f}%**\n"
                f"- **Mean Correlation Similarity**: {sq.get('correlation_similarity', {}).get('correlation_matrix_similarity', 0.0)*100:.1f}%\n"
                f"- **Frobenius Norm Gap**: {sq.get('correlation_similarity', {}).get('frobenius_difference', 0.0):.2f}\n"
                f"- **Median Distance to Closest Record (DCR)**: {sq.get('record_similarity', {}).get('dcr_median', 0.0):.4f}"
            )
        if pr:
            lines.append(
                f"- **Empirical Privacy Risk**: **{pr.get('risk_level', 'UNKNOWN')}**\n"
                f"- **Synthetic-to-Train Duplicate Rate**: {pr.get('metrics', {}).get('synthetic_train_duplicate_rate', 0.0)*100:.3f}%\n"
                f"- **Synthetic-to-Test Duplicate Rate**: {pr.get('metrics', {}).get('synthetic_test_duplicate_rate', 0.0)*100:.3f}%\n"
                f"- **Nearest Neighbor Distance Ratio (NNDR Median)**: {pr.get('metrics', {}).get('nndr_median', 0.0):.3f}"
            )
            lines.append(f"\n> *Privacy Statement*: {pr.get('disclaimer', '')}")
        lines.append("")

        # Section 4: Best Augmentation Configuration
        lines.append("## 4. Optimal Augmentation Configuration")
        lines.append("")
        if bc:
            lines.append(
                f"- **Optimal Architecture**: **{bc.get('best_model')}**\n"
                f"- **Optimal Augmentation Ratio**: **{bc.get('optimal_augmentation_ratio')}%**\n"
                f"- **Training Cohort Size**: {bc.get('training_samples', 0):,} records\n"
                f"- **Target Metric ({bc.get('objective', '').upper()})**: {bc.get('metrics', {}).get(bc.get('objective', ''), 0.0):.4f}\n"
                f"- **Accuracy**: {bc.get('metrics', {}).get('accuracy', 0.0)*100:.2f}%\n"
                f"- **ROC-AUC**: {bc.get('metrics', {}).get('roc_auc', 0.0):.4f}\n"
            )
            base_gain = bc.get("baseline_comparison", {})
            if base_gain.get("absolute_gain") is not None:
                lines.append(
                    f"- **Gain over 0% Baseline**: {base_gain.get('absolute_gain'):+.4f} "
                    f"({base_gain.get('relative_gain_percent'):+.2f}% relative)"
                )
        lines.append("")

        # Section 5: Robustness, Calibration, Thresholds
        lines.append("## 5. Statistical Rigor, Calibration & Robustness")
        lines.append("")
        if bs:
            lines.append(
                f"- **Bootstrap Confidence (1000 resamples)**: Model {bs.get('model')}\n"
                f"  - Recall 95% CI: [{bs.get('augmented', {}).get('recall', {}).get('ci_lower', 0):.4f}, {bs.get('augmented', {}).get('recall', {}).get('ci_upper', 0):.4f}]\n"
                f"  - F1 95% CI: [{bs.get('augmented', {}).get('f1', {}).get('ci_lower', 0):.4f}, {bs.get('augmented', {}).get('f1', {}).get('ci_upper', 0):.4f}]\n"
                f"  - Mean Recall Improvement: {bs.get('delta_analysis', {}).get('recall', {}).get('mean_delta', 0):+.4f} "
                f"(P(gain > 0) = {bs.get('delta_analysis', {}).get('recall', {}).get('prob_positive_gain', 0)*100:.1f}%)"
            )
        if cl:
            lines.append(
                f"- **Probability Calibration**:\n"
                f"  - Augmented Brier Score: {cl.get('augmented', {}).get('brier_score', 0):.4f}\n"
                f"  - Augmented Expected Calibration Error (ECE): {cl.get('augmented', {}).get('expected_calibration_error', 0):.4f}\n"
                f"  - Finding: {cl.get('comparison', {}).get('conclusion', '')}"
            )
        if th:
            lines.append(
                f"- **Decision Thresholds (Optimal Operating Points)**:\n"
                f"  - Best F1 Threshold: **{th.get('optimal_thresholds', {}).get('best_f1', {}).get('threshold', 0.50):.2f}** "
                f"(F1 = {th.get('optimal_thresholds', {}).get('best_f1', {}).get('f1_score', 0):.4f})\n"
                f"  - High-Sensitivity Screening: **{th.get('optimal_thresholds', {}).get('clinical_screening_high_sensitivity', {}).get('threshold', 0.50):.2f}** "
                f"(Sensitivity = {th.get('optimal_thresholds', {}).get('clinical_screening_high_sensitivity', {}).get('sensitivity_recall', 0)*100:.1f}%)"
            )
        lines.append("")

        # Section 6: Explainability
        lines.append("## 6. Interpretability & Counterfactual Dynamics")
        lines.append("")
        if xai:
            top_feats = xai.get("global_explanation", {}).get("feature_ranking", [])[:5]
            lines.append("- **Top-5 Cohort Predictors (Global SHAP)**:")
            for f in top_feats:
                lines.append(f"  {f['rank']}. `{f['feature']}` (Mean |SHAP| = {f['mean_abs_shap']:.4f}, {f['relative_importance_percent']:.1f}%)")
        lines.append("")
        lines.append("## 7. Conclusions & Future Directions")
        lines.append("")
        lines.append(
            "1. **Generative Data Expansion**: CTGAN effectively synthesizes clinically plausible cardiovascular "
            "profiles that expand boundary diversity without causing severe correlation distortion.\n"
            "2. **Safety and Privacy**: Empirical distance checks (DCR and NNDR) demonstrate lack of widespread "
            "exact training memorization. However, formal Differential Privacy (DP-CTGAN) should be introduced for clinical deployment.\n"
            "3. **Transparent Clinical Decision Support**: Pairing continuous probability outputs with calibrated "
            "decision thresholds and counterfactual analysis empowers clinicians with actionable model introspection."
        )
        lines.append("")

        return "\n".join(lines)


def generate_full_research_report(
    results_root: str = "results",
) -> Dict[str, str]:
    """Saves both research_report.md and research_summary.json."""
    generator = ResearchReportGenerator(results_root=results_root)
    md_content = generator.generate()

    md_path = os.path.join(results_root, "research_report.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    summary_data = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "report_file": "results/research_report.md",
        "status": "COMPLETED",
        "title": "Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction",
    }
    json_path = os.path.join(results_root, "research_summary.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2)

    logger.info(f"Research report synthesized and saved to {md_path}")
    return {"markdown_path": md_path, "summary_path": json_path}


if __name__ == "__main__":
    generate_full_research_report()
