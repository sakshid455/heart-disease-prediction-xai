"""
HeartAI — Master Publication Figures Generator (Figures 1-14)
Generates high-resolution (300 DPI) publication-quality figures using validated experimental data:
  Figure 1: Overall proposed methodology
  Figure 2: Dataset distribution
  Figure 3: Real vs CTGAN synthetic distributions
  Figure 4: Synthetic data correlation comparison
  Figure 5: Augmentation ratio vs Accuracy
  Figure 6: Augmentation ratio vs Recall
  Figure 7: Augmentation ratio vs F1-score
  Figure 8: Augmentation ratio vs ROC-AUC
  Figure 9: ML model comparison
  Figure 10: Optimal augmentation ratio
  Figure 11: Robustness across random seeds
  Figure 12: SHAP global feature importance
  Figure 13: Real-only vs augmented SHAP comparison
  Figure 14: UCI vs large dataset results

All outputs saved under results/final_figures/
"""

import os
import sys
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import seaborn as sns

# Academic styling
plt.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["DejaVu Sans", "Arial", "Helvetica"],
    "font.size": 10,
    "axes.titlesize": 12,
    "axes.titleweight": "bold",
    "axes.labelsize": 10,
    "axes.labelweight": "bold",
    "xtick.labelsize": 9,
    "ytick.labelsize": 9,
    "legend.fontsize": 9,
    "figure.titlesize": 14,
    "figure.titleweight": "bold",
    "axes.grid": True,
    "grid.alpha": 0.3,
    "grid.linestyle": "--",
})

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "results", "final_figures")
os.makedirs(OUT_DIR, exist_ok=True)

PALETTE = {
    "Logistic Regression": "#2563eb",  # Blue
    "Random Forest": "#10b981",        # Emerald
    "SVM": "#f59e0b",                  # Amber
    "XGBoost": "#8b5cf6",              # Purple
    "Real": "#1e293b",                 # Slate
    "Synthetic": "#06b6d4",            # Cyan
    "Baseline": "#64748b",             # Grey
    "Optimal": "#ef4444",              # Red/Coral
}


def main():
    print("=" * 80)
    print("GENERATING PUBLICATION-READY ACADEMIC FIGURES (FIGURES 1-14)")
    print("=" * 80)

    # 1. Load Data Sources
    train_path = os.path.join(BASE_DIR, "data", "processed", "large_train.csv")
    test_path = os.path.join(BASE_DIR, "data", "processed", "large_test.csv")
    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)
    full_df = pd.concat([train_df, test_df], ignore_index=True)

    synth_path = os.path.join(BASE_DIR, "data", "processed", "large_synthetic_ctgan.csv")
    if not os.path.exists(synth_path):
        synth_path = os.path.join(BASE_DIR, "results", "final_experiment", "datasets", "synthetic_data.csv")
    synth_df = pd.read_csv(synth_path)

    adapt_path = os.path.join(BASE_DIR, "results", "adaptive_model_comparison.csv")
    adapt_df = pd.read_csv(adapt_path)
    adapt_df["ratio_num"] = adapt_df["augmentation_ratio"].astype(str).str.replace("%", "").astype(float)

    rob_path = os.path.join(BASE_DIR, "results", "robustness", "repeated_experiment_results.csv")
    rob_df = pd.read_csv(rob_path)

    xai_path = os.path.join(BASE_DIR, "results", "xai_final", "feature_importance_comparison.csv")
    xai_df = pd.read_csv(xai_path)

    cross_path = os.path.join(BASE_DIR, "results", "cross_dataset", "cross_dataset_results.csv")
    cross_df = pd.read_csv(cross_path)

    # ==================================================================
    # FIGURE 1: Overall Proposed Methodology
    # ==================================================================
    print("Generating Figure 1: Overall Proposed Methodology...")
    fig, ax = plt.subplots(figsize=(14, 7), dpi=300)
    ax.axis("off")

    boxes = [
        {"title": "1. Data Curation & Quarantine", "subtitle": "N = 68,612 Cohort\n• Strict 80/20 Stratified Split\n• Test Set (N=13,723) Quarantined", "x": 0.05, "y": 0.60, "w": 0.25, "h": 0.32, "color": "#e0f2fe", "border": "#0284c7"},
        {"title": "2. Conditional GAN Training", "subtitle": "CTGAN Synthesis\n• Fitted ONLY on Train Split\n• Discrete & Continuous Conditioning\n• Generates 200% Synthetic Data", "x": 0.37, "y": 0.60, "w": 0.26, "h": 0.32, "color": "#f0fdf4", "border": "#16a34a"},
        {"title": "3. Adaptive Augmentation Matrix", "subtitle": "7 Scaling Levels (0%–200%)\n• 4 ML Classifiers\n• Multi-Seed Robustness (5 Seeds)\n• Statistical Paired t-tests", "x": 0.70, "y": 0.60, "w": 0.26, "h": 0.32, "color": "#fef3c7", "border": "#d97706"},
        {"title": "4. Model Evaluation & Optimization", "subtitle": "Held-Out Test Set (N=13,723)\n• Accuracy, Precision, Recall, F1, AUC\n• Multi-Objective Utility Scoring\n• Optimal Screening Model Selected", "x": 0.05, "y": 0.12, "w": 0.25, "h": 0.32, "color": "#ede9fe", "border": "#7c3aed"},
        {"title": "5. Explainable AI (XAI) Audit", "subtitle": "SHAP Consistency & Fidelity\n• Spearman Rank Correlation (rho)\n• Local Patient Explanations\n• Biomarker Sign Consistency", "x": 0.37, "y": 0.12, "w": 0.26, "h": 0.32, "color": "#fce7f3", "border": "#db2777"},
        {"title": "6. Fairness, Privacy & Deployment", "subtitle": "Algorithmic Equity & DCR Privacy\n• Subgroup FNR Reduction\n• Sub-15ms FastAPI Deployment\n• Interactive Clinical Dashboard", "x": 0.70, "y": 0.12, "w": 0.26, "h": 0.32, "color": "#f1f5f9", "border": "#475569"},
    ]

    for b in boxes:
        rect = patches.FancyBboxPatch((b["x"], b["y"]), b["w"], b["h"], boxstyle="round,pad=0.02", facecolor=b["color"], edgecolor=b["border"], linewidth=2)
        ax.add_patch(rect)
        ax.text(b["x"] + b["w"]/2, b["y"] + b["h"] - 0.06, b["title"], ha="center", va="center", fontweight="bold", fontsize=11, color="#0f172a")
        ax.text(b["x"] + b["w"]/2, b["y"] + b["h"]/2 - 0.03, b["subtitle"], ha="center", va="center", fontsize=9, color="#334155")

    # Connectors
    arrows = [
        ((0.30, 0.76), (0.37, 0.76)),
        ((0.63, 0.76), (0.70, 0.76)),
        ((0.83, 0.60), (0.83, 0.44)),
        ((0.70, 0.28), (0.63, 0.28)),
        ((0.37, 0.28), (0.30, 0.28)),
    ]
    for start, end in arrows:
        ax.annotate("", xy=end, xytext=start, arrowprops=dict(arrowstyle="->", lw=2.5, color="#334155"))

    ax.set_title("Figure 1: Overall Architecture of the Adaptive CTGAN-Based Explainable Heart Disease Prediction Framework", fontsize=13, pad=15)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_1_methodology.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_1_methodology.png")

    # ==================================================================
    # FIGURE 2: Dataset Distribution
    # ==================================================================
    print("Generating Figure 2: Dataset Distribution...")
    fig, axes = plt.subplots(2, 3, figsize=(14, 9), dpi=300)

    # Age
    sns.histplot(full_df["age"], kde=True, ax=axes[0, 0], color="#2563eb", bins=25)
    axes[0, 0].set_title("Age Distribution (Years)")
    axes[0, 0].set_xlabel("Age (years)")

    # Systolic BP
    sns.histplot(full_df["ap_hi"], kde=True, ax=axes[0, 1], color="#10b981", bins=25)
    axes[0, 1].set_title("Systolic Blood Pressure (ap_hi)")
    axes[0, 1].set_xlabel("mmHg")

    # Diastolic BP
    sns.histplot(full_df["ap_lo"], kde=True, ax=axes[0, 2], color="#f59e0b", bins=25)
    axes[0, 2].set_title("Diastolic Blood Pressure (ap_lo)")
    axes[0, 2].set_xlabel("mmHg")

    # Cholesterol
    chol_counts = full_df["cholesterol"].value_counts().sort_index()
    axes[1, 0].bar(["1: Normal", "2: Above Normal", "3: Well Above"], chol_counts.values, color=["#38bdf8", "#818cf8", "#c084fc"])
    axes[1, 0].set_title("Serum Cholesterol Categories")
    axes[1, 0].set_ylabel("Patient Count")

    # Glucose
    gluc_counts = full_df["gluc"].value_counts().sort_index()
    axes[1, 1].bar(["1: Normal", "2: Above Normal", "3: Well Above"], gluc_counts.values, color=["#34d399", "#fbbf24", "#f87171"])
    axes[1, 1].set_title("Fasting Glucose Categories")
    axes[1, 1].set_ylabel("Patient Count")

    # Target
    target_counts = full_df["cardio"].value_counts().sort_index()
    axes[1, 2].bar(["0: Absent (No CVD)", "1: Present (CVD)"], target_counts.values, color=["#64748b", "#ef4444"])
    axes[1, 2].set_title("Target Label Distribution (cardio)")
    axes[1, 2].set_ylabel("Patient Count")

    fig.suptitle("Figure 2: Clinical Feature and Target Distributions Across the Full Cohort (N = 68,612)", y=1.02)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_2_dataset_distribution.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_2_dataset_distribution.png")

    # ==================================================================
    # FIGURE 3: Real vs CTGAN Synthetic Distributions
    # ==================================================================
    print("Generating Figure 3: Real vs CTGAN Synthetic Distributions...")
    fig, axes = plt.subplots(2, 2, figsize=(12, 9), dpi=300)

    cont_vars = [("age", "Age (years)"), ("ap_hi", "Systolic BP (ap_hi, mmHg)"), ("ap_lo", "Diastolic BP (ap_lo, mmHg)"), ("weight", "Weight (kg)")]
    
    for i, (col, lbl) in enumerate(cont_vars):
        ax = axes[i // 2, i % 2]
        sns.kdeplot(train_df[col], ax=ax, label="Real Training (N=54,889)", color="#1e293b", linewidth=2.5)
        sns.kdeplot(synth_df[col], ax=ax, label="CTGAN Synthetic (N=109,778)", color="#06b6d4", linewidth=2.5, linestyle="--")
        ax.set_title(f"Density Alignment: {lbl}")
        ax.set_xlabel(lbl)
        ax.set_ylabel("Probability Density")
        ax.legend()

    fig.suptitle("Figure 3: Density Overlay Comparison Between Real Training Data and CTGAN Synthetic Samples", y=1.02)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_3_real_vs_synthetic_distributions.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_3_real_vs_synthetic_distributions.png")

    # ==================================================================
    # FIGURE 4: Synthetic Data Correlation Comparison
    # ==================================================================
    print("Generating Figure 4: Synthetic Data Correlation Comparison...")
    fig, axes = plt.subplots(1, 3, figsize=(16, 5), dpi=300)

    cols = ["age", "height", "weight", "ap_hi", "ap_lo", "cholesterol", "gluc", "smoke", "alco", "active", "cardio"]
    r_corr = train_df[cols].corr()
    s_corr = synth_df[cols].corr()
    diff_corr = (r_corr - s_corr).abs()

    sns.heatmap(r_corr, ax=axes[0], cmap="vlag", center=0, cbar=False, annot=False)
    axes[0].set_title("A. Real Training Correlation")

    sns.heatmap(s_corr, ax=axes[1], cmap="vlag", center=0, cbar=False, annot=False)
    axes[1].set_title("B. CTGAN Synthetic Correlation")

    sns.heatmap(diff_corr, ax=axes[2], cmap="Reds", vmin=0, vmax=0.2, cbar=True, annot=False)
    axes[2].set_title("C. Absolute Correlation Divergence")

    fig.suptitle("Figure 4: Inter-Feature Correlation Matrices (Real vs. Synthetic and Absolute Divergence)", y=1.05)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_4_correlation_comparison.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_4_correlation_comparison.png")

    # ==================================================================
    # FIGURE 5: Augmentation Ratio vs Accuracy
    # ==================================================================
    print("Generating Figure 5: Augmentation Ratio vs Accuracy...")
    fig, ax = plt.subplots(figsize=(9, 6), dpi=300)
    models = ["Logistic Regression", "Random Forest", "SVM", "XGBoost"]
    
    for m in models:
        sub = adapt_df[adapt_df["model"] == m].sort_values(by="ratio_num")
        ax.plot(sub["ratio_num"], sub["accuracy"] * 100, marker="o", linewidth=2.5, label=m, color=PALETTE[m])
    
    ax.set_title("Figure 5: Classifier Accuracy Trajectory Across CTGAN Augmentation Levels")
    ax.set_xlabel("CTGAN Synthetic Augmentation Ratio (%)")
    ax.set_ylabel("Classification Accuracy (%)")
    ax.set_xticks([0, 25, 50, 75, 100, 150, 200])
    ax.legend(title="Model Family")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_5_augmentation_vs_accuracy.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_5_augmentation_vs_accuracy.png")

    # ==================================================================
    # FIGURE 6: Augmentation Ratio vs Recall (Clinical Sensitivity)
    # ==================================================================
    print("Generating Figure 6: Augmentation Ratio vs Recall...")
    fig, ax = plt.subplots(figsize=(9, 6), dpi=300)
    
    for m in models:
        sub = adapt_df[adapt_df["model"] == m].sort_values(by="ratio_num")
        ax.plot(sub["ratio_num"], sub["recall"] * 100, marker="s", linewidth=2.5, label=m, color=PALETTE[m])
    
    # Highlight peak recall
    ax.annotate("Peak Screening Recall (73.87%)\n+7.29% Disease Detection Gain", xy=(200, 73.87), xytext=(120, 68),
                arrowprops=dict(arrowstyle="->", lw=2, color="#ef4444"), fontweight="bold", color="#b91c1c")

    ax.set_title("Figure 6: Clinical Disease Recall (Sensitivity) Progression Across Augmentation Ratios")
    ax.set_xlabel("CTGAN Synthetic Augmentation Ratio (%)")
    ax.set_ylabel("Recall / Sensitivity (%)")
    ax.set_xticks([0, 25, 50, 75, 100, 150, 200])
    ax.legend(title="Model Family")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_6_augmentation_vs_recall.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_6_augmentation_vs_recall.png")

    # ==================================================================
    # FIGURE 7: Augmentation Ratio vs F1-Score
    # ==================================================================
    print("Generating Figure 7: Augmentation Ratio vs F1-Score...")
    fig, ax = plt.subplots(figsize=(9, 6), dpi=300)
    
    for m in models:
        sub = adapt_df[adapt_df["model"] == m].sort_values(by="ratio_num")
        ax.plot(sub["ratio_num"], sub["f1_score"] * 100, marker="^", linewidth=2.5, label=m, color=PALETTE[m])
    
    ax.set_title("Figure 7: Harmonic F1-Score Trajectory Across Augmentation Ratios")
    ax.set_xlabel("CTGAN Synthetic Augmentation Ratio (%)")
    ax.set_ylabel("F1-Score (%)")
    ax.set_xticks([0, 25, 50, 75, 100, 150, 200])
    ax.legend(title="Model Family")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_7_augmentation_vs_f1_score.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_7_augmentation_vs_f1_score.png")

    # ==================================================================
    # FIGURE 8: Augmentation Ratio vs ROC-AUC
    # ==================================================================
    print("Generating Figure 8: Augmentation Ratio vs ROC-AUC...")
    fig, ax = plt.subplots(figsize=(9, 6), dpi=300)
    
    for m in models:
        sub = adapt_df[adapt_df["model"] == m].sort_values(by="ratio_num")
        ax.plot(sub["ratio_num"], sub["roc_auc"], marker="d", linewidth=2.5, label=m, color=PALETTE[m])
    
    ax.set_title("Figure 8: Area Under the ROC Curve (ROC-AUC) Across Augmentation Ratios")
    ax.set_xlabel("CTGAN Synthetic Augmentation Ratio (%)")
    ax.set_ylabel("ROC-AUC Score")
    ax.set_xticks([0, 25, 50, 75, 100, 150, 200])
    ax.set_ylim(0.35, 0.85)
    ax.legend(title="Model Family")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_8_augmentation_vs_roc_auc.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_8_augmentation_vs_roc_auc.png")

    # ==================================================================
    # FIGURE 9: ML Model Comparison (Baseline vs Optimal)
    # ==================================================================
    print("Generating Figure 9: ML Model Comparison...")
    fig, ax = plt.subplots(figsize=(11, 6), dpi=300)
    
    models = ["Logistic Regression", "Random Forest", "SVM", "XGBoost"]
    x = np.arange(len(models))
    width = 0.35

    base_recalls = [adapt_df[(adapt_df["model"]==m)&(adapt_df["ratio_num"]==0)]["recall"].values[0]*100 for m in models]
    # Optimal for LR: 200%, RF: 75%, SVM: 100%, XGB: 100%
    aug_recalls = [
        adapt_df[(adapt_df["model"]=="Logistic Regression")&(adapt_df["ratio_num"]==200)]["recall"].values[0]*100,
        adapt_df[(adapt_df["model"]=="Random Forest")&(adapt_df["ratio_num"]==75)]["recall"].values[0]*100,
        adapt_df[(adapt_df["model"]=="SVM")&(adapt_df["ratio_num"]==100)]["recall"].values[0]*100,
        adapt_df[(adapt_df["model"]=="XGBoost")&(adapt_df["ratio_num"]==100)]["recall"].values[0]*100,
    ]

    r1 = ax.bar(x - width/2, base_recalls, width, label="Baseline (0% Augmentation)", color="#64748b")
    r2 = ax.bar(x + width/2, aug_recalls, width, label="Optimal Synthetic Augmentation", color="#2563eb")

    for rect in r1:
        h = rect.get_height()
        ax.annotate(f"{h:.1f}%", xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 3), textcoords="offset points", ha="center", va="bottom", fontsize=8)
    for rect in r2:
        h = rect.get_height()
        ax.annotate(f"{h:.1f}%", xy=(rect.get_x() + rect.get_width()/2, h), xytext=(0, 3), textcoords="offset points", ha="center", va="bottom", fontsize=8, fontweight="bold")

    ax.set_title("Figure 9: Clinical Recall Comparison: Real-Only Baseline vs. Optimal Synthetic Augmentation")
    ax.set_ylabel("Recall / Sensitivity (%)")
    ax.set_xticks(x)
    ax.set_xticklabels(models, fontweight="bold")
    ax.set_ylim(0, 88)
    ax.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_9_ml_model_comparison.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_9_ml_model_comparison.png")

    # ==================================================================
    # FIGURE 10: Optimal Augmentation Ratio (Multi-Objective Utility Tradeoff)
    # ==================================================================
    print("Generating Figure 10: Optimal Augmentation Ratio Tradeoff...")
    fig, ax = plt.subplots(figsize=(10, 6), dpi=300)

    lr_sub = adapt_df[adapt_df["model"] == "Logistic Regression"].sort_values(by="ratio_num")
    # Weighted Score: 0.4*Recall + 0.3*AUC + 0.3*F1
    weighted_scores = 0.40 * lr_sub["recall"] + 0.30 * lr_sub["roc_auc"] + 0.30 * lr_sub["f1_score"]

    ax.plot(lr_sub["ratio_num"], lr_sub["recall"], marker="o", label="Recall (Weight = 0.40)", color="#ef4444", linewidth=2)
    ax.plot(lr_sub["ratio_num"], lr_sub["roc_auc"], marker="s", label="ROC-AUC (Weight = 0.30)", color="#3b82f6", linewidth=2)
    ax.plot(lr_sub["ratio_num"], lr_sub["f1_score"], marker="^", label="F1-Score (Weight = 0.30)", color="#10b981", linewidth=2)
    ax.plot(lr_sub["ratio_num"], weighted_scores, marker="*", markersize=10, label="Composite Utility Score", color="#8b5cf6", linewidth=3, linestyle="--")

    ax.axvline(200, color="#8b5cf6", linestyle=":", linewidth=2, label="Optimal Level (200%)")
    ax.set_title("Figure 10: Multi-Criteria Clinical Utility Optimization Across Augmentation Ratios")
    ax.set_xlabel("CTGAN Augmentation Ratio (%)")
    ax.set_ylabel("Normalized Metric Value")
    ax.set_xticks([0, 25, 50, 75, 100, 150, 200])
    ax.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_10_optimal_augmentation_ratio.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_10_optimal_augmentation_ratio.png")

    # ==================================================================
    # FIGURE 11: Robustness Across Random Seeds
    # ==================================================================
    print("Generating Figure 11: Robustness Across Random Seeds...")
    fig, ax = plt.subplots(figsize=(11, 6), dpi=300)

    # Boxplot of ROC-AUC across seeds by model & ratio
    sns.boxplot(data=rob_df, x="model", y="roc_auc", hue="augmentation_ratio", ax=ax, palette="Blues")
    ax.set_title("Figure 11: Metric Stability and Variance Across 5 Independent Random Seeds (140 Runs)")
    ax.set_xlabel("Model Family")
    ax.set_ylabel("Held-Out ROC-AUC")
    ax.legend(title="Augmentation Level", bbox_to_anchor=(1.02, 1), loc="upper left")
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_11_robustness_random_seeds.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_11_robustness_random_seeds.png")

    # ==================================================================
    # FIGURE 12: SHAP Global Feature Importance
    # ==================================================================
    print("Generating Figure 12: SHAP Global Feature Importance...")
    fig, ax = plt.subplots(figsize=(10, 6), dpi=300)

    xai_sorted = xai_df.sort_values(by="mean_abs_shap_aug", ascending=True)
    y_pos = np.arange(len(xai_sorted))

    ax.barh(y_pos, xai_sorted["mean_abs_shap_aug"], color="#2563eb", height=0.6, label="Mean |SHAP| (Augmented 200%)")
    ax.set_yticks(y_pos)
    ax.set_yticklabels(xai_sorted["feature"], fontweight="bold")
    ax.set_xlabel("Mean Absolute SHAP Value (Log-Odds Impact)")
    ax.set_title("Figure 12: Global SHAP Feature Importance for the Optimal Augmented Predictor")
    
    for i, v in enumerate(xai_sorted["mean_abs_shap_aug"]):
        ax.text(v + 0.01, i, f"{v:.4f}", va="center", fontsize=8)

    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_12_shap_global_importance.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_12_shap_global_importance.png")

    # ==================================================================
    # FIGURE 13: Real-Only vs Augmented SHAP Comparison
    # ==================================================================
    print("Generating Figure 13: Real-Only vs Augmented SHAP Comparison...")
    fig, ax = plt.subplots(figsize=(11, 7), dpi=300)

    xai_rev = xai_df.sort_values(by="mean_abs_shap_aug", ascending=True)
    y = np.arange(len(xai_rev))
    h = 0.35

    ax.barh(y - h/2, xai_rev["mean_abs_shap_real"], height=h, label="Real-Only Model (0%)", color="#64748b")
    ax.barh(y + h/2, xai_rev["mean_abs_shap_aug"], height=h, label="Augmented Model (200%)", color="#2563eb")

    ax.set_yticks(y)
    ax.set_yticklabels(xai_rev["feature"], fontweight="bold")
    ax.set_xlabel("Mean Absolute SHAP Value")
    ax.set_title("Figure 13: SHAP Feature Attribution Consistency Between Real-Only and Augmented Models (rho = +0.8455)")
    ax.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_13_shap_comparison_real_vs_augmented.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_13_shap_comparison_real_vs_augmented.png")

    # ==================================================================
    # FIGURE 14: UCI vs Large Dataset Results (Cross-Dataset)
    # ==================================================================
    print("Generating Figure 14: UCI vs Large Dataset Results...")
    fig, axes = plt.subplots(1, 2, figsize=(14, 6), dpi=300)

    # UCI
    uci_sub = cross_df[cross_df["dataset"] == "UCI Heart Disease"]
    for m in models:
        s = uci_sub[uci_sub["model"] == m].sort_values(by="ratio_float")
        axes[0].plot(s["ratio_float"] * 100, s["recall"] * 100, marker="o", linewidth=2, label=m, color=PALETTE[m])
    axes[0].set_title("A. Small Clinical Cohort (UCI, N=303)")
    axes[0].set_xlabel("CTGAN Augmentation Ratio (%)")
    axes[0].set_ylabel("Clinical Recall (%)")
    axes[0].legend()

    # Large
    large_sub = cross_df[cross_df["dataset"] == "Large Cardiovascular Cohort"]
    for m in models:
        s = large_sub[large_sub["model"] == m].sort_values(by="ratio_float")
        axes[1].plot(s["ratio_float"] * 100, s["recall"] * 100, marker="s", linewidth=2, label=m, color=PALETTE[m])
    axes[1].set_title("B. Population-Scale Cohort (Large, N=68,612)")
    axes[1].set_xlabel("CTGAN Augmentation Ratio (%)")
    axes[1].set_ylabel("Clinical Recall (%)")
    axes[1].legend()

    fig.suptitle("Figure 14: Cross-Dataset Generalizability of Clinical Sensitivity Gains Across Scaling Regimes", y=1.03)
    plt.tight_layout()
    plt.savefig(os.path.join(OUT_DIR, "figure_14_cross_dataset_results.png"), dpi=300)
    plt.close()
    print("  [SAVED] figure_14_cross_dataset_results.png")

    # Save Documentation Index
    index_md = """# HeartAI — Publication Figures Index (Figures 1–14)

**Project**: Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction  
**Directory**: `results/final_figures/`  
**Resolution**: 300 DPI High-Resolution PNG  

---

### Figure Catalog

| Figure # | Filename | Description |
| :--- | :--- | :--- |
| **Figure 1** | [`figure_1_methodology.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_1_methodology.png) | Overall architectural diagram of the data quarantine, CTGAN training, adaptive matrix, and XAI pipeline. |
| **Figure 2** | [`figure_2_dataset_distribution.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_2_dataset_distribution.png) | Histograms and frequency distributions of demographic and biomarker features across the $N=68,612$ cohort. |
| **Figure 3** | [`figure_3_real_vs_synthetic_distributions.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_3_real_vs_synthetic_distributions.png) | Density overlay curves (KDE) comparing real training distributions vs. CTGAN generated distributions. |
| **Figure 4** | [`figure_4_correlation_comparison.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_4_correlation_comparison.png) | Side-by-side heatmaps of real and synthetic correlation matrices, plus absolute pairwise divergence. |
| **Figure 5** | [`figure_5_augmentation_vs_accuracy.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_5_augmentation_vs_accuracy.png) | Classification accuracy scaling trajectories across 0% to 200% augmentation for all 4 ML models. |
| **Figure 6** | [`figure_6_augmentation_vs_recall.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_6_augmentation_vs_recall.png) | Clinical sensitivity (recall) progression demonstrating the +7.29% disease detection gain. |
| **Figure 7** | [`figure_7_augmentation_vs_f1_score.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_7_augmentation_vs_f1_score.png) | Harmonic F1-score performance curves across all augmentation levels. |
| **Figure 8** | [`figure_8_augmentation_vs_roc_auc.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_8_augmentation_vs_roc_auc.png) | Area Under the ROC Curve (ROC-AUC) scaling curves across all 4 machine learning models. |
| **Figure 9** | [`figure_9_ml_model_comparison.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_9_ml_model_comparison.png) | Grouped bar chart comparing baseline (0%) vs. optimal augmentation recall for each model family. |
| **Figure 10** | [`figure_10_optimal_augmentation_ratio.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_10_optimal_augmentation_ratio.png) | Multi-criteria utility scoring curves identifying the optimal 200% augmentation screening configuration. |
| **Figure 11** | [`figure_11_robustness_random_seeds.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_11_robustness_random_seeds.png) | Boxplots of held-out ROC-AUC across 5 independent random seeds (140 total benchmark runs). |
| **Figure 12** | [`figure_12_shap_global_importance.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_12_shap_global_importance.png) | Horizontal bar plot of global mean $|SHAP|$ attributions for the optimal augmented predictor. |
| **Figure 13** | [`figure_13_shap_comparison_real_vs_augmented.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_13_shap_comparison_real_vs_augmented.png) | Side-by-side SHAP attribution comparison verifying feature rank preservation ($\rho = +0.8455$). |
| **Figure 14** | [`figure_14_cross_dataset_results.png`](file:///c:/Users/datir/predictive/results/final_figures/figure_14_cross_dataset_results.png) | Cross-dataset generalizability plots comparing sensitivity trajectories on UCI ($N=303$) vs. Large ($N=68,612$). |
"""
    with open(os.path.join(OUT_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write(index_md)

    print(f"\nSuccessfully generated all 14 publication figures in {OUT_DIR}/")
    print("=" * 80)


if __name__ == "__main__":
    main()
