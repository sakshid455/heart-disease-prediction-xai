"""
Regenerate Publication-Quality Figures with Refined Typography & Layout
"""

import os
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

RESULTS_DIR = "results"
FIGURE_DIR = "results/figures/adaptive_augmentation"
RESULTS_CSV = os.path.join(RESULTS_DIR, "adaptive_model_comparison.csv")
OPTIMAL_JSON = os.path.join(RESULTS_DIR, "optimal_configuration.json")

df = pd.read_csv(RESULTS_CSV)
with open(OPTIMAL_JSON, "r") as f:
    optimal = json.load(f)

if "weighted_score" not in df.columns:
    df["weighted_score"] = 0.40 * df["recall"] + 0.30 * df["roc_auc"] + 0.30 * df["f1_score"]

plt.rcParams.update({
    "figure.dpi": 150,
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
    "font.size": 11,
    "axes.titlesize": 13,
    "axes.labelsize": 12,
    "xtick.labelsize": 10,
    "ytick.labelsize": 10,
    "legend.fontsize": 10,
    "font.family": "sans-serif",
    "axes.grid": True,
    "grid.alpha": 0.3,
    "grid.linestyle": "--",
    "axes.spines.top": False,
    "axes.spines.right": False,
})

model_colors = {
    "Logistic Regression": "#1f77b4",
    "Random Forest": "#2ca02c",
    "SVM": "#ff7f0e",
    "XGBoost": "#d62728"
}
model_markers = {
    "Logistic Regression": "o",
    "Random Forest": "s",
    "SVM": "^",
    "XGBoost": "D"
}

ratios = sorted(df["augmentation_ratio"].unique())
models = list(model_colors.keys())

def plot_single_metric(metric_col, metric_label, filename):
    fig, ax = plt.subplots(figsize=(8.5, 5.5))
    for m in models:
        m_df = df[df["model"] == m].sort_values("augmentation_ratio")
        ax.plot(
            m_df["augmentation_ratio"], m_df[metric_col],
            label=m, color=model_colors[m], marker=model_markers[m],
            linewidth=2.2, markersize=7.5
        )

    opt_val = df[(df["model"] == optimal["best_model"]) & (df["augmentation_ratio"] == optimal["optimal_augmentation_ratio"])][metric_col].values[0]
    ax.scatter(
        [optimal["optimal_augmentation_ratio"]], [opt_val],
        color="gold", edgecolor="black", s=220, zorder=5, marker="*",
        label=f"Optimal: {optimal['best_model']} ({optimal['optimal_augmentation_ratio']}%)"
    )

    ax.set_title(f"{metric_label} vs. Synthetic Augmentation Ratio", fontweight="bold", pad=12)
    ax.set_xlabel("Synthetic Augmentation Ratio (%)", fontweight="medium")
    ax.set_ylabel(metric_label, fontweight="medium")
    ax.set_xticks(ratios)
    ax.set_xticklabels([f"{r}%" for r in ratios])
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter('%.3f'))
    ax.legend(frameon=True, facecolor="white", edgecolor="#ddd", loc="best")
    plt.tight_layout()
    fig.savefig(os.path.join(FIGURE_DIR, filename))
    plt.close(fig)
    print(f"  Generated: {filename}")

print("Regenerating figures...")
plot_single_metric("accuracy", "Accuracy", "1_accuracy_vs_ratio.png")
plot_single_metric("precision", "Precision", "2_precision_vs_ratio.png")
plot_single_metric("recall", "Recall", "3_recall_vs_ratio.png")
plot_single_metric("f1_score", "F1-Score", "4_f1_vs_ratio.png")
plot_single_metric("roc_auc", "ROC-AUC", "5_roc_auc_vs_ratio.png")

# 6. Model comparison grid
fig, axes = plt.subplots(2, 2, figsize=(14, 10), sharex=True)
metric_grid = [
    ("accuracy", "Accuracy", axes[0, 0]),
    ("f1_score", "F1-Score", axes[0, 1]),
    ("recall", "Recall", axes[1, 0]),
    ("roc_auc", "ROC-AUC", axes[1, 1])
]

for col, name, ax in metric_grid:
    for m in models:
        m_df = df[df["model"] == m].sort_values("augmentation_ratio")
        ax.plot(
            m_df["augmentation_ratio"], m_df[col],
            label=m, color=model_colors[m], marker=model_markers[m],
            linewidth=2, markersize=6
        )
    opt_v = df[(df["model"] == optimal["best_model"]) & (df["augmentation_ratio"] == optimal["optimal_augmentation_ratio"])][col].values[0]
    ax.scatter([optimal["optimal_augmentation_ratio"]], [opt_v], color="gold", edgecolor="black", s=160, zorder=5, marker="*")
    ax.set_title(name, fontweight="bold")
    ax.set_ylabel(name)
    ax.set_xticks(ratios)
    ax.set_xticklabels([f"{r}%" for r in ratios])
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter('%.3f'))

axes[1, 0].set_xlabel("Augmentation Ratio (%)")
axes[1, 1].set_xlabel("Augmentation Ratio (%)")
axes[0, 0].legend(loc="best", frameon=True)
fig.suptitle("Model Comparison Across Synthetic Augmentation Ratios", fontsize=15, fontweight="bold", y=0.99)
plt.tight_layout()
fig.savefig(os.path.join(FIGURE_DIR, "6_model_comparison_across_ratios.png"))
plt.close(fig)
print("  Generated: 6_model_comparison_across_ratios.png")

# 7. Training dataset size vs performance
fig, ax = plt.subplots(figsize=(9.5, 5.5))
for m in models:
    m_df = df[df["model"] == m].sort_values("total_train_size")
    ax.plot(
        m_df["total_train_size"] / 1000, m_df["weighted_score"],
        label=f"{m}", color=model_colors[m], marker=model_markers[m],
        linewidth=2.2, markersize=7
    )
opt_ws = optimal["weighted_score"]
ax.scatter([optimal["total_train_size"] / 1000], [opt_ws], color="gold", edgecolor="black", s=220, zorder=5, marker="*",
           label=f"Optimal: {optimal['best_model']} ({optimal['optimal_augmentation_ratio']}%)")

ax.set_title("Training Dataset Size vs. Clinical Performance Score", fontweight="bold", pad=12)
ax.set_xlabel("Total Training Dataset Size (Thousands of Records)", fontweight="medium")
ax.set_ylabel("Weighted Performance Score\n(0.40 Recall + 0.30 AUC + 0.30 F1)", fontweight="medium")
ax.yaxis.set_major_formatter(mticker.FormatStrFormatter('%.3f'))
ax.legend(frameon=True, facecolor="white", edgecolor="#ddd", loc="best")
plt.tight_layout()
fig.savefig(os.path.join(FIGURE_DIR, "7_training_dataset_size_vs_performance.png"))
plt.close(fig)
print("  Generated: 7_training_dataset_size_vs_performance.png")

# 8. Optimal configuration visualization (Clear Horizontal Bar Chart with clean text)
fig, ax = plt.subplots(figsize=(11, 6.5))
top_df = df.sort_values("weighted_score", ascending=True).tail(10).copy()
labels = [f"{r['model']} ({r['augmentation_ratio']}%)" for _, r in top_df.iterrows()]
bar_colors = [model_colors[r['model']] for _, r in top_df.iterrows()]

bars = ax.barh(labels, top_df["weighted_score"], color=bar_colors, edgecolor="black", height=0.62, alpha=0.9)
bars[-1].set_edgecolor("gold")
bars[-1].set_linewidth(2.8)

min_val = top_df["weighted_score"].min()
max_val = top_df["weighted_score"].max()
ax.set_xlim(left=0.68, right=0.765)

for bar, (_, r) in zip(bars, top_df.iterrows()):
    score_txt = f"Score: {r['weighted_score']:.4f}  [Recall: {r['recall']:.3f} | AUC: {r['roc_auc']:.3f} | F1: {r['f1_score']:.3f}]"
    ax.text(
        bar.get_width() + 0.0015, bar.get_y() + bar.get_height() / 2,
        score_txt,
        va="center", ha="left", color="#222", fontweight="bold", fontsize=9
    )

ax.set_title("Top 10 Model-Augmentation Configurations Ranked by Clinical Utility Metric", fontweight="bold", pad=14)
ax.set_xlabel("Weighted Clinical Score (0.40 Recall + 0.30 ROC-AUC + 0.30 F1-Score)", fontweight="medium")
plt.tight_layout()
fig.savefig(os.path.join(FIGURE_DIR, "8_optimal_augmentation_ratio_visualization.png"))
plt.close(fig)
print("  Generated: 8_optimal_augmentation_ratio_visualization.png")
print("All figures successfully updated!")
