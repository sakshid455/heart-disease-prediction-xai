"""
RESEARCH-QUALITY VISUALIZATIONS FOR ADAPTIVE AUGMENTATION STUDY

Generates 8 publication-quality figures from the multi-model experiment results.

Input:
    results/adaptive_model_comparison.csv

Output figures in:
    results/figures/adaptive_augmentation/

Figures:
    1. accuracy_vs_ratio.png
    2. precision_vs_ratio.png
    3. recall_vs_ratio.png
    4. f1_vs_ratio.png
    5. roc_auc_vs_ratio.png
    6. model_comparison_heatmap.png
    7. training_size_vs_performance.png
    8. optimal_configuration.png
"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import os
import json
import warnings
warnings.filterwarnings("ignore")

# ============================================================
# STYLE CONFIGURATION (research quality)
# ============================================================

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

# Model colors and markers — consistent across all plots
MODEL_STYLES = {
    "Logistic Regression": {"color": "#2196F3", "marker": "o", "ls": "-"},
    "Random Forest":       {"color": "#4CAF50", "marker": "s", "ls": "-"},
    "SVM":                 {"color": "#FF9800", "marker": "^", "ls": "-"},
    "XGBoost":             {"color": "#E91E63", "marker": "D", "ls": "-"},
}

FIGURE_DIR = "results/figures/adaptive_augmentation"
os.makedirs(FIGURE_DIR, exist_ok=True)

# ============================================================
# LOAD DATA
# ============================================================

print("Loading results...")
df = pd.read_csv("results/adaptive_model_comparison.csv")
ratios = sorted(df["augmentation_ratio"].unique())
models = list(MODEL_STYLES.keys())

# Verify all models present
available_models = df["model"].unique().tolist()
models = [m for m in models if m in available_models]
print("  Models: {}".format(models))
print("  Ratios: {}".format(ratios))

# Load optimal config if available
opt_config = None
if os.path.exists("results/optimal_configuration.json"):
    with open("results/optimal_configuration.json") as f:
        opt_config = json.load(f)
    print("  Optimal: {} @ {}%".format(
        opt_config["best_model"], opt_config["optimal_augmentation_ratio"]))


# ============================================================
# HELPER: Line plot for a single metric
# ============================================================

def plot_metric_vs_ratio(metric, ylabel, title, filename,
                         highlight_optimal=True, invert=False):
    """Standard line plot: augmentation ratio vs metric, one line per model."""
    fig, ax = plt.subplots(figsize=(8, 5.5))

    for model_name in models:
        style = MODEL_STYLES[model_name]
        mdf = df[df["model"] == model_name].sort_values("augmentation_ratio")

        ax.plot(
            mdf["augmentation_ratio"], mdf[metric],
            color=style["color"], marker=style["marker"],
            linestyle=style["ls"], linewidth=2, markersize=7,
            label=model_name, zorder=3,
        )

    # Highlight optimal point
    if highlight_optimal and opt_config:
        opt_ratio = opt_config["optimal_augmentation_ratio"]
        opt_val = df[(df["model"] == opt_config["best_model"]) &
                     (df["augmentation_ratio"] == opt_ratio)][metric].values
        if len(opt_val) > 0:
            ax.scatter(
                [opt_ratio], [opt_val[0]],
                color="red", s=200, zorder=5, marker="*",
                edgecolors="black", linewidth=0.8,
                label="Optimal ({} @ {}%)".format(
                    opt_config["best_model"], opt_ratio),
            )

    # Baseline reference (dashed line at 0%)
    for model_name in models:
        style = MODEL_STYLES[model_name]
        baseline = df[(df["model"] == model_name) &
                      (df["augmentation_ratio"] == 0)][metric].values
        if len(baseline) > 0:
            ax.axhline(y=baseline[0], color=style["color"],
                       linestyle=":", alpha=0.3, linewidth=1)

    ax.set_xlabel("Augmentation Ratio (%)")
    ax.set_ylabel(ylabel)
    ax.set_title(title)
    ax.set_xticks(ratios)
    ax.set_xticklabels(["{}%".format(r) for r in ratios])
    ax.legend(loc="best", framealpha=0.9)

    # Format y-axis as percentage-like
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.3f"))

    plt.tight_layout()
    path = os.path.join(FIGURE_DIR, filename)
    fig.savefig(path)
    plt.close(fig)
    print("  Saved: {}".format(filename))


# ============================================================
# FIGURE 1-5: Individual metric plots
# ============================================================

print("\nGenerating individual metric plots...")

plot_metric_vs_ratio(
    "accuracy", "Accuracy", "Accuracy vs Augmentation Ratio",
    "accuracy_vs_ratio.png")

plot_metric_vs_ratio(
    "precision", "Precision", "Precision vs Augmentation Ratio",
    "precision_vs_ratio.png")

plot_metric_vs_ratio(
    "recall", "Recall", "Recall vs Augmentation Ratio",
    "recall_vs_ratio.png")

plot_metric_vs_ratio(
    "f1_score", "F1-Score", "F1-Score vs Augmentation Ratio",
    "f1_vs_ratio.png")

plot_metric_vs_ratio(
    "roc_auc", "ROC-AUC", "ROC-AUC vs Augmentation Ratio",
    "roc_auc_vs_ratio.png")


# ============================================================
# FIGURE 6: Model comparison heatmap
# ============================================================

print("\nGenerating model comparison heatmap...")

fig, axes = plt.subplots(1, 5, figsize=(22, 5))
metrics_hm = [
    ("accuracy", "Accuracy"),
    ("precision", "Precision"),
    ("recall", "Recall"),
    ("f1_score", "F1-Score"),
    ("roc_auc", "ROC-AUC"),
]

for ax, (metric, label) in zip(axes, metrics_hm):
    # Build matrix: models x ratios
    matrix = np.zeros((len(models), len(ratios)))
    for i, model_name in enumerate(models):
        for j, ratio in enumerate(ratios):
            val = df[(df["model"] == model_name) &
                     (df["augmentation_ratio"] == ratio)][metric]
            if len(val) > 0:
                matrix[i, j] = val.values[0]

    im = ax.imshow(matrix, cmap="RdYlGn", aspect="auto")

    # Annotations
    for i in range(len(models)):
        for j in range(len(ratios)):
            text_color = "white" if matrix[i, j] < matrix.mean() - 0.01 else "black"
            ax.text(j, i, "{:.3f}".format(matrix[i, j]),
                    ha="center", va="center", fontsize=8, color=text_color)

    ax.set_xticks(range(len(ratios)))
    ax.set_xticklabels(["{}%".format(r) for r in ratios], fontsize=8)
    ax.set_yticks(range(len(models)))
    ax.set_yticklabels(models if ax == axes[0] else [""] * len(models), fontsize=9)
    ax.set_title(label, fontsize=11, fontweight="bold")
    ax.set_xlabel("Augmentation Ratio", fontsize=9)

fig.suptitle("Model Performance Across Augmentation Ratios", fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
path = os.path.join(FIGURE_DIR, "model_comparison_heatmap.png")
fig.savefig(path)
plt.close(fig)
print("  Saved: model_comparison_heatmap.png")


# ============================================================
# FIGURE 7: Training size vs performance
# ============================================================

print("\nGenerating training size vs performance plot...")

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

size_metrics = [
    ("recall", "Recall"),
    ("f1_score", "F1-Score"),
    ("roc_auc", "ROC-AUC"),
]

for ax, (metric, label) in zip(axes, size_metrics):
    for model_name in models:
        style = MODEL_STYLES[model_name]
        mdf = df[df["model"] == model_name].sort_values("total_train_size")

        ax.plot(
            mdf["total_train_size"] / 1000, mdf[metric],
            color=style["color"], marker=style["marker"],
            linewidth=2, markersize=6, label=model_name,
        )

    ax.set_xlabel("Training Set Size (thousands)")
    ax.set_ylabel(label)
    ax.set_title("{} vs Training Set Size".format(label))
    ax.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.3f"))

    if ax == axes[-1]:
        ax.legend(loc="best", framealpha=0.9, fontsize=9)

fig.suptitle("Impact of Training Set Size on Model Performance",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
path = os.path.join(FIGURE_DIR, "training_size_vs_performance.png")
fig.savefig(path)
plt.close(fig)
print("  Saved: training_size_vs_performance.png")


# ============================================================
# FIGURE 8: Optimal configuration visualization
# ============================================================

print("\nGenerating optimal configuration plot...")

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Panel A: Weighted score comparison
ax = axes[0, 0]
if "weighted_score" not in df.columns:
    df["weighted_score"] = 0.40 * df["recall"] + 0.30 * df["roc_auc"] + 0.30 * df["f1_score"]

for model_name in models:
    style = MODEL_STYLES[model_name]
    mdf = df[df["model"] == model_name].sort_values("augmentation_ratio")
    ax.plot(
        mdf["augmentation_ratio"], mdf["weighted_score"],
        color=style["color"], marker=style["marker"],
        linewidth=2.5, markersize=8, label=model_name,
    )

if opt_config:
    opt_ratio = opt_config["optimal_augmentation_ratio"]
    opt_ws = df[(df["model"] == opt_config["best_model"]) &
                (df["augmentation_ratio"] == opt_ratio)]
    if len(opt_ws) > 0:
        ax.scatter(
            [opt_ratio], [opt_ws["weighted_score"].values[0]],
            color="red", s=250, zorder=5, marker="*",
            edgecolors="black", linewidth=1,
        )
        ax.annotate(
            "OPTIMAL\n{}\n@ {}%".format(opt_config["best_model"], opt_ratio),
            xy=(opt_ratio, opt_ws["weighted_score"].values[0]),
            xytext=(opt_ratio + 25, opt_ws["weighted_score"].values[0] - 0.008),
            fontsize=9, fontweight="bold", color="red",
            arrowprops=dict(arrowstyle="->", color="red", lw=1.5),
        )

ax.set_xlabel("Augmentation Ratio (%)")
ax.set_ylabel("Weighted Score")
ax.set_title("(A) Weighted Score (40% Recall + 30% AUC + 30% F1)")
ax.set_xticks(ratios)
ax.set_xticklabels(["{}%".format(r) for r in ratios])
ax.legend(loc="best", framealpha=0.9)
ax.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.3f"))

# Panel B: Best model bar chart at each ratio
ax = axes[0, 1]
best_at_ratio = []
for ratio in ratios:
    rdf = df[df["augmentation_ratio"] == ratio]
    if "weighted_score" not in rdf.columns:
        rdf = rdf.copy()
        rdf["weighted_score"] = 0.40 * rdf["recall"] + 0.30 * rdf["roc_auc"] + 0.30 * rdf["f1_score"]
    best_row = rdf.loc[rdf["weighted_score"].idxmax()]
    best_at_ratio.append(best_row)

bar_colors = [MODEL_STYLES.get(r["model"], {"color": "gray"})["color"]
              for r in best_at_ratio]
bar_vals = [r["weighted_score"] for r in best_at_ratio]
bar_labels = [r["model"] for r in best_at_ratio]

bars = ax.bar(range(len(ratios)), bar_vals, color=bar_colors, edgecolor="white", linewidth=0.5)
ax.set_xticks(range(len(ratios)))
ax.set_xticklabels(["{}%".format(r) for r in ratios])
ax.set_xlabel("Augmentation Ratio (%)")
ax.set_ylabel("Weighted Score")
ax.set_title("(B) Best Model at Each Ratio")

# Add model name labels on bars
for bar, label in zip(bars, bar_labels):
    short_label = label.replace("Logistic Regression", "LR").replace(
        "Random Forest", "RF").replace("XGBoost", "XGB")
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() - 0.003,
            short_label, ha="center", va="top", fontsize=8,
            fontweight="bold", color="white")

ax.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.3f"))

# Panel C: Precision-Recall tradeoff
ax = axes[1, 0]
for model_name in models:
    style = MODEL_STYLES[model_name]
    mdf = df[df["model"] == model_name].sort_values("augmentation_ratio")

    ax.plot(
        mdf["recall"], mdf["precision"],
        color=style["color"], marker=style["marker"],
        linewidth=2, markersize=7, label=model_name,
    )

    # Annotate start and end ratios
    ax.annotate("0%", (mdf["recall"].iloc[0], mdf["precision"].iloc[0]),
                fontsize=7, color=style["color"], fontweight="bold",
                textcoords="offset points", xytext=(-10, 5))
    ax.annotate("200%", (mdf["recall"].iloc[-1], mdf["precision"].iloc[-1]),
                fontsize=7, color=style["color"],
                textcoords="offset points", xytext=(3, -10))

ax.set_xlabel("Recall")
ax.set_ylabel("Precision")
ax.set_title("(C) Precision-Recall Tradeoff by Augmentation")
ax.legend(loc="best", framealpha=0.9, fontsize=9)

# Panel D: Delta from baseline
ax = axes[1, 1]
bar_width = 0.18
x = np.arange(len(ratios))
delta_metrics = ["recall", "f1_score", "roc_auc"]
delta_labels = ["Recall", "F1-Score", "ROC-AUC"]
delta_colors = ["#4CAF50", "#2196F3", "#FF9800"]

if opt_config:
    best_model = opt_config["best_model"]
else:
    # Use model with highest weighted score overall
    best_model = df.loc[df["weighted_score"].idxmax(), "model"]

mdf = df[df["model"] == best_model].sort_values("augmentation_ratio")
baseline = mdf[mdf["augmentation_ratio"] == 0].iloc[0]

for k, (met, lab, col) in enumerate(zip(delta_metrics, delta_labels, delta_colors)):
    deltas = (mdf[met] - baseline[met]).values
    offset = (k - 1) * bar_width
    ax.bar(x + offset, deltas, bar_width, label=lab, color=col, alpha=0.85)

ax.axhline(y=0, color="black", linewidth=0.8)
ax.set_xticks(x)
ax.set_xticklabels(["{}%".format(r) for r in ratios])
ax.set_xlabel("Augmentation Ratio (%)")
ax.set_ylabel("Delta from Baseline (0%)")
ax.set_title("(D) Performance Delta for {} (vs 0%)".format(best_model))
ax.legend(loc="best", framealpha=0.9, fontsize=9)
ax.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.4f"))

fig.suptitle("Optimal Augmentation Configuration Analysis",
             fontsize=15, fontweight="bold", y=1.01)
plt.tight_layout()
path = os.path.join(FIGURE_DIR, "optimal_configuration.png")
fig.savefig(path)
plt.close(fig)
print("  Saved: optimal_configuration.png")


# ============================================================
# SUMMARY
# ============================================================

print("\n" + "=" * 50)
print("ALL FIGURES SAVED")
print("=" * 50)

saved = os.listdir(FIGURE_DIR)
for fname in sorted(saved):
    fpath = os.path.join(FIGURE_DIR, fname)
    size_kb = os.path.getsize(fpath) / 1024
    print("  {} ({:.1f} KB)".format(fname, size_kb))

print("\nTotal: {} figures in {}".format(len(saved), FIGURE_DIR))
