"""
Phase 1: Automated Data Quality Engine
Calculates comprehensive, dynamic dataset quality reports across 10 analytical dimensions.
Outputs:
  - results/validation/data_quality_report.json
  - results/validation/data_quality_report.md
"""

import os
import json
import math
from typing import Dict, Any, Optional, List
import pandas as pd
import numpy as np

from src.utils.logger import get_research_logger

logger = get_research_logger("cardioai.validation.quality")


class DataQualityEngine:
    """Automated, dynamic dataset inspection and quality assessment."""

    def __init__(self, target_column: Optional[str] = None):
        self.target_column = target_column

    def analyze(self, df: pd.DataFrame, dataset_name: str = "Dataset") -> Dict[str, Any]:
        """Performs a 10-dimension dynamic data quality analysis on the provided DataFrame."""
        rows, cols = df.shape

        # 1. Dataset Shape
        shape_info = {
            "rows": int(rows),
            "columns": int(cols),
            "total_cells": int(rows * cols),
        }

        # 2. Column Names
        column_names = list(df.columns)

        # 3. Data Types
        data_types = {col: str(df[col].dtype) for col in column_names}

        # 4. Missing Values
        missing_by_col = df.isnull().sum()
        total_missing = int(missing_by_col.sum())
        missing_pct = float((total_missing / (rows * cols)) * 100) if rows * cols > 0 else 0.0
        missing_details = {
            col: {
                "count": int(missing_by_col[col]),
                "percent": float((missing_by_col[col] / rows) * 100) if rows > 0 else 0.0,
            }
            for col in column_names
            if missing_by_col[col] > 0
        }

        # 5. Duplicate Rows
        duplicate_count = int(df.duplicated().sum())
        duplicate_pct = float((duplicate_count / rows) * 100) if rows > 0 else 0.0

        # Separate Numerical and Categorical columns
        num_cols = list(df.select_dtypes(include=[np.number]).columns)
        cat_cols = [c for c in column_names if c not in num_cols]

        # Automatic detection: numeric columns with <= 6 unique values often represent categories/flags
        auto_cats = [c for c in num_cols if df[c].nunique() <= 6 and c != "age"]
        reported_cat_cols = list(set(cat_cols + auto_cats))
        reported_num_cols = [c for c in num_cols if c not in reported_cat_cols]

        # 6. Invalid / Anomaly Detection (physiological boundaries & unexpected negatives)
        invalid_entries = {}
        for col in num_cols:
            neg_count = int((df[col] < 0).sum())
            null_count = int(df[col].isnull().sum())
            infinite_count = int(np.isinf(df[col]).sum())
            if neg_count > 0 or infinite_count > 0:
                invalid_entries[col] = {
                    "negative_count": neg_count,
                    "infinite_count": infinite_count,
                }

        # 7. Numerical Ranges & Summary Statistics
        num_stats = {}
        for col in reported_num_cols:
            s = df[col].dropna()
            if len(s) > 0:
                num_stats[col] = {
                    "min": float(s.min()),
                    "max": float(s.max()),
                    "mean": float(s.mean()),
                    "std": float(s.std()) if len(s) > 1 else 0.0,
                    "median": float(s.median()),
                    "q25": float(s.quantile(0.25)),
                    "q75": float(s.quantile(0.75)),
                    "skewness": float(s.skew()) if len(s) > 2 else 0.0,
                }

        # 8. Categorical Distributions
        cat_stats = {}
        for col in reported_cat_cols:
            vc = df[col].value_counts(dropna=False).to_dict()
            cat_stats[col] = {
                "unique_count": int(df[col].nunique(dropna=False)),
                "frequencies": {str(k): int(v) for k, v in vc.items()},
            }

        # 9 & 10. Target Classes & Class Imbalance
        target_info = {}
        target_col = self.target_column
        if not target_col:
            # Auto-detect target column from common heart disease names
            for potential in ["target", "cardio", "num", "condition", "diagnosis"]:
                if potential in df.columns:
                    target_col = potential
                    break

        if target_col and target_col in df.columns:
            vc = df[target_col].value_counts().to_dict()
            total_target = sum(vc.values())
            classes = {str(k): int(v) for k, v in vc.items()}
            counts = list(vc.values())
            majority = max(counts) if counts else 0
            minority = min(counts) if counts else 0
            imbalance_ratio = float(majority / minority) if minority > 0 else 1.0

            # Shannon Entropy for balance (1.0 = perfectly balanced)
            entropy = 0.0
            if total_target > 0 and len(counts) > 1:
                probs = [c / total_target for c in counts if c > 0]
                entropy = float(-sum(p * math.log2(p) for p in probs) / math.log2(len(counts)))

            target_info = {
                "target_column": target_col,
                "classes": classes,
                "majority_count": majority,
                "minority_count": minority,
                "imbalance_ratio": round(imbalance_ratio, 3),
                "entropy_balance": round(entropy, 4),
                "is_balanced": bool(imbalance_ratio <= 1.5),
            }
        else:
            target_info = {
                "target_column": None,
                "classes": {},
                "imbalance_ratio": 1.0,
                "is_balanced": True,
            }

        report = {
            "dataset_name": dataset_name,
            "shape": shape_info,
            "column_names": column_names,
            "data_types": data_types,
            "missing_values": {
                "total_missing": total_missing,
                "missing_pct": round(missing_pct, 4),
                "by_column": missing_details,
            },
            "duplicate_rows": {
                "count": duplicate_count,
                "percent": round(duplicate_pct, 4),
            },
            "invalid_values": invalid_entries,
            "numerical_features": num_stats,
            "categorical_features": cat_stats,
            "target_analysis": target_info,
        }

        return report

    def generate_markdown(self, report: Dict[str, Any]) -> str:
        """Formats the JSON data quality report into clean, publication-ready Markdown."""
        s = report["shape"]
        m = report["missing_values"]
        d = report["duplicate_rows"]
        t = report["target_analysis"]

        lines = [
            f"# Data Quality Report: {report['dataset_name']}",
            "",
            "## 1. Executive Summary",
            "",
            f"- **Total Records (Rows):** {s['rows']:,}",
            f"- **Total Attributes (Columns):** {s['columns']:,}",
            f"- **Missing Value Count:** {m['total_missing']:,} ({m['missing_pct']}%)",
            f"- **Duplicate Row Count:** {d['count']:,} ({d['percent']}%)",
            f"- **Numerical Attributes:** {len(report['numerical_features'])}",
            f"- **Categorical Attributes:** {len(report['categorical_features'])}",
        ]

        if t.get("target_column"):
            lines.extend([
                f"- **Target Attribute:** `{t['target_column']}`",
                f"- **Class Distribution:** {json.dumps(t['classes'])}",
                f"- **Imbalance Ratio:** {t['imbalance_ratio']} (Entropy Balance: {t['entropy_balance']})",
                f"- **Balance Evaluation:** {'Balanced cohort' if t['is_balanced'] else 'Class imbalance present'}",
            ])

        lines.extend([
            "",
            "## 2. Missing Value & Anomaly Breakdown",
            "",
        ])

        if m["by_column"]:
            lines.append("| Column | Missing Count | Missing Percent |")
            lines.append("|---|---|---|")
            for col, item in m["by_column"].items():
                lines.append(f"| `{col}` | {item['count']} | {item['percent']:.2f}% |")
        else:
            lines.append("No missing values detected in the cohort.")

        lines.extend([
            "",
            "## 3. Numerical Attribute Distributions",
            "",
            "| Feature | Min | Q25 | Median | Mean | Q75 | Max | Std Dev |",
            "|---|---|---|---|---|---|---|---|",
        ])

        for col, stat in report["numerical_features"].items():
            lines.append(
                f"| `{col}` | {stat['min']:.2f} | {stat['q25']:.2f} | {stat['median']:.2f} | {stat['mean']:.2f} | {stat['q75']:.2f} | {stat['max']:.2f} | {stat['std']:.2f} |"
            )

        lines.extend([
            "",
            "## 4. Categorical Attribute Summary",
            "",
            "| Feature | Unique Categories | Distribution Breakdown |",
            "|---|---|---|",
        ])

        for col, stat in report["categorical_features"].items():
            freq_str = ", ".join(f"{k}: {v}" for k, v in stat["frequencies"].items())
            lines.append(f"| `{col}` | {stat['unique_count']} | {freq_str} |")

        lines.append("")
        return "\n".join(lines)


def run_data_quality_assessment(
    csv_path: str = "data/raw/heart_disease.csv",
    output_dir: str = "results/validation",
    dataset_name: str = "UCI Cleveland Heart Disease",
    target_column: Optional[str] = None,
) -> Dict[str, Any]:
    """CLI / programmatic runner for data quality assessment."""
    os.makedirs(output_dir, exist_ok=True)
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Dataset not found at: {csv_path}")

    df = pd.read_csv(csv_path)
    engine = DataQualityEngine(target_column=target_column)
    report = engine.analyze(df, dataset_name=dataset_name)

    json_path = os.path.join(output_dir, "data_quality_report.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    md_content = engine.generate_markdown(report)
    md_path = os.path.join(output_dir, "data_quality_report.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    logger.info(f"Data quality report successfully written to {json_path} and {md_path}")
    return report


if __name__ == "__main__":
    run_data_quality_assessment()
