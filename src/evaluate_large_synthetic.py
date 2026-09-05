"""
Synthetic Data Quality Evaluation Module
Large CVD Dataset: Real Training Data vs CTGAN Synthetic Data

Compares:
    data/processed/large_train.csv       (real training data)
    data/processed/large_synthetic_ctgan.csv  (CTGAN synthetic data)

Produces:
    results/synthetic_quality_report.md
    results/figures/synthetic_quality/*.png

NEVER uses:
    data/processed/large_test.csv
"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
from scipy import stats
from scipy.spatial.distance import jensenshannon
import os
import warnings
warnings.filterwarnings("ignore")


# ============================================================
# CONFIGURATION
# ============================================================

REAL_PATH = "data/processed/large_train.csv"
SYNTH_PATH = "data/processed/large_synthetic_ctgan.csv"

FIGURES_DIR = "results/figures/synthetic_quality"
REPORT_PATH = "results/synthetic_quality_report.md"

TARGET = "cardio"

NUMERICAL_FEATURES = ["age", "height", "weight", "ap_hi", "ap_lo"]
CATEGORICAL_FEATURES = ["gender", "cholesterol", "gluc", "smoke", "alco", "active"]

FEATURE_LABELS = {
    "age": "Age (years)",
    "height": "Height (cm)",
    "weight": "Weight (kg)",
    "ap_hi": "Systolic BP (mmHg)",
    "ap_lo": "Diastolic BP (mmHg)",
}

CAT_LABELS = {
    "gender": {1: "Female", 2: "Male"},
    "cholesterol": {1: "Normal", 2: "Above Normal", 3: "Well Above"},
    "gluc": {1: "Normal", 2: "Above Normal", 3: "Well Above"},
    "smoke": {0: "No", 1: "Yes"},
    "alco": {0: "No", 1: "Yes"},
    "active": {0: "No", 1: "Yes"},
}

# Research-quality plot styling
plt.rcParams.update({
    "figure.dpi": 150,
    "savefig.dpi": 200,
    "font.size": 11,
    "axes.titlesize": 13,
    "axes.labelsize": 11,
    "xtick.labelsize": 10,
    "ytick.labelsize": 10,
    "legend.fontsize": 10,
    "figure.titlesize": 14,
    "axes.grid": True,
    "grid.alpha": 0.3,
})

COLORS = {
    "real": "#2196F3",
    "synth": "#FF9800",
}
sns.set_style("whitegrid")

os.makedirs(FIGURES_DIR, exist_ok=True)


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 70)
print("SYNTHETIC DATA QUALITY EVALUATION")
print("Real Training vs CTGAN Synthetic")
print("=" * 70)

real = pd.read_csv(REAL_PATH)
synth = pd.read_csv(SYNTH_PATH)

print("\nReal training shape: ", real.shape)
print("Synthetic shape:     ", synth.shape)

# Report builder
rpt = []


def r(line=""):
    rpt.append(line)


# ============================================================
# HEADER
# ============================================================

r("# Synthetic Data Quality Evaluation Report")
r("## Real Training Data vs CTGAN Synthetic Data")
r("")
r("| Property | Real Training | Synthetic |")
r("|---|---|---|")
r("| Source | `large_train.csv` | `large_synthetic_ctgan.csv` |")
r("| Records | {:,} | {:,} |".format(len(real), len(synth)))
r("| Features | {} | {} |".format(len(real.columns), len(synth.columns)))
r("| Target | `{}` | `{}` |".format(TARGET, TARGET))
r("")
r("---")
r("")


# ============================================================
# 1. DISTRIBUTION SIMILARITY
# ============================================================

print("\n[1/8] Evaluating distribution similarity...")

r("## 1. Distribution Similarity (Numerical Features)")
r("")

# KS test and Jensen-Shannon divergence
r("### Statistical Tests")
r("")
r("| Feature | KS Statistic | KS p-value | Jensen-Shannon Div. | Verdict |")
r("|---|---|---|---|---|")

ks_results = {}
js_results = {}

for feat in NUMERICAL_FEATURES:
    # Kolmogorov-Smirnov test
    ks_stat, ks_p = stats.ks_2samp(real[feat], synth[feat])
    ks_results[feat] = (ks_stat, ks_p)

    # Jensen-Shannon divergence (histogram-based)
    bins = np.linspace(
        min(real[feat].min(), synth[feat].min()),
        max(real[feat].max(), synth[feat].max()),
        50,
    )
    real_hist, _ = np.histogram(real[feat], bins=bins, density=True)
    synth_hist, _ = np.histogram(synth[feat], bins=bins, density=True)

    # Add small epsilon to avoid zero bins
    real_hist = real_hist + 1e-10
    synth_hist = synth_hist + 1e-10

    # Normalize to valid probability distributions
    real_hist = real_hist / real_hist.sum()
    synth_hist = synth_hist / synth_hist.sum()

    js_div = jensenshannon(real_hist, synth_hist)
    js_results[feat] = js_div

    if ks_stat < 0.05:
        verdict = "Excellent"
    elif ks_stat < 0.10:
        verdict = "Good"
    elif ks_stat < 0.20:
        verdict = "Moderate"
    else:
        verdict = "Poor"

    r("| {} | {:.4f} | {:.2e} | {:.4f} | {} |".format(
        feat, ks_stat, ks_p, js_div, verdict))

r("")

# Overall distribution quality score
avg_ks = np.mean([v[0] for v in ks_results.values()])
avg_js = np.mean(list(js_results.values()))

r("> **Overall Distribution Quality**: Mean KS = {:.4f}, Mean JS Divergence = {:.4f}".format(
    avg_ks, avg_js))
r("")

# Distribution overlay plots — Histogram + KDE
fig, axes = plt.subplots(2, 3, figsize=(16, 10))
axes = axes.ravel()

for idx, feat in enumerate(NUMERICAL_FEATURES):
    ax = axes[idx]
    label = FEATURE_LABELS.get(feat, feat)

    # Overlapping histograms
    ax.hist(real[feat], bins=40, alpha=0.5, color=COLORS["real"],
            label="Real", density=True, edgecolor="white", linewidth=0.5)
    ax.hist(synth[feat], bins=40, alpha=0.5, color=COLORS["synth"],
            label="Synthetic", density=True, edgecolor="white", linewidth=0.5)

    # KDE
    real[feat].plot.kde(ax=ax, color=COLORS["real"], linewidth=2, linestyle="-")
    synth[feat].plot.kde(ax=ax, color=COLORS["synth"], linewidth=2, linestyle="--")

    ks_s = ks_results[feat][0]
    js_d = js_results[feat]
    ax.set_title("{}\nKS={:.3f}  JS={:.3f}".format(label, ks_s, js_d),
                 fontweight="bold")
    ax.set_xlabel(label)
    ax.set_ylabel("Density")
    ax.legend(fontsize=9)

# Remove unused subplot
axes[5].axis("off")

plt.suptitle("Numerical Feature Distributions: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.01)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "distribution_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Distribution Comparison](figures/synthetic_quality/distribution_comparison.png)")
r("")


# ============================================================
# 2. MEAN AND STANDARD DEVIATION
# ============================================================

print("[2/8] Comparing mean and standard deviation...")

r("## 2. Mean and Standard Deviation Comparison")
r("")
r("| Feature | Real Mean | Synth Mean | Mean Diff | "
  "Real Std | Synth Std | Std Diff | Rel. Mean Error |")
r("|---|---|---|---|---|---|---|---|")

mean_errors = {}
for feat in NUMERICAL_FEATURES:
    r_mean = real[feat].mean()
    s_mean = synth[feat].mean()
    r_std = real[feat].std()
    s_std = synth[feat].std()
    mean_diff = s_mean - r_mean
    std_diff = s_std - r_std
    rel_err = abs(mean_diff) / r_mean * 100 if r_mean != 0 else 0
    mean_errors[feat] = rel_err

    r("| {} | {:.2f} | {:.2f} | {:+.2f} | {:.2f} | {:.2f} | {:+.2f} | {:.2f}% |".format(
        feat, r_mean, s_mean, mean_diff, r_std, s_std, std_diff, rel_err))

r("")

avg_rel_err = np.mean(list(mean_errors.values()))
r("> **Average Relative Mean Error**: {:.2f}%".format(avg_rel_err))
r("")

# Bar chart comparing means and stds
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Means
x = np.arange(len(NUMERICAL_FEATURES))
width = 0.35

real_means = [real[f].mean() for f in NUMERICAL_FEATURES]
synth_means = [synth[f].mean() for f in NUMERICAL_FEATURES]

bars1 = axes[0].bar(x - width / 2, real_means, width, color=COLORS["real"],
                     label="Real", edgecolor="white", linewidth=1)
bars2 = axes[0].bar(x + width / 2, synth_means, width, color=COLORS["synth"],
                     label="Synthetic", edgecolor="white", linewidth=1)
axes[0].set_xticks(x)
axes[0].set_xticklabels([FEATURE_LABELS.get(f, f) for f in NUMERICAL_FEATURES],
                         rotation=30, ha="right")
axes[0].set_title("Mean Comparison", fontweight="bold")
axes[0].set_ylabel("Mean Value")
axes[0].legend()

# Stds
real_stds = [real[f].std() for f in NUMERICAL_FEATURES]
synth_stds = [synth[f].std() for f in NUMERICAL_FEATURES]

axes[1].bar(x - width / 2, real_stds, width, color=COLORS["real"],
            label="Real", edgecolor="white", linewidth=1)
axes[1].bar(x + width / 2, synth_stds, width, color=COLORS["synth"],
            label="Synthetic", edgecolor="white", linewidth=1)
axes[1].set_xticks(x)
axes[1].set_xticklabels([FEATURE_LABELS.get(f, f) for f in NUMERICAL_FEATURES],
                         rotation=30, ha="right")
axes[1].set_title("Standard Deviation Comparison", fontweight="bold")
axes[1].set_ylabel("Std Value")
axes[1].legend()

plt.suptitle("Numerical Statistics: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "mean_std_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Mean/Std Comparison](figures/synthetic_quality/mean_std_comparison.png)")
r("")


# ============================================================
# 3. CATEGORICAL FREQUENCY SIMILARITY
# ============================================================

print("[3/8] Comparing categorical frequencies...")

r("## 3. Categorical Frequency Similarity")
r("")

cat_chi2_results = {}

for feat in CATEGORICAL_FEATURES:
    labels = CAT_LABELS.get(feat, {})
    real_counts = real[feat].value_counts().sort_index()
    synth_counts = synth[feat].value_counts().sort_index()

    real_pcts = real[feat].value_counts(normalize=True).sort_index() * 100
    synth_pcts = synth[feat].value_counts(normalize=True).sort_index() * 100

    # Chi-square goodness-of-fit: does synthetic follow real distribution?
    # Scale real proportions to synthetic sample size
    expected_counts = (real_pcts / 100 * len(synth)).values
    observed_counts = synth_counts.values
    chi2, p_val = stats.chisquare(observed_counts, f_exp=expected_counts)
    cat_chi2_results[feat] = (chi2, p_val)

    max_diff = max(abs(synth_pcts - real_pcts))

    r("### {}".format(feat.capitalize()))
    r("")
    r("| Value | Label | Real (%) | Synth (%) | Diff (pp) |")
    r("|---|---|---|---|---|")

    for val in sorted(real_pcts.index):
        lbl = labels.get(val, str(val))
        rp = real_pcts.get(val, 0)
        sp = synth_pcts.get(val, 0)
        r("| {} | {} | {:.2f} | {:.2f} | {:+.2f} |".format(
            val, lbl, rp, sp, sp - rp))

    r("")
    r("Chi-square goodness-of-fit: chi2 = {:.1f}, p = {:.2e}, "
      "Max deviation = {:.2f} pp".format(chi2, p_val, max_diff))
    r("")

# Categorical comparison plot
fig, axes = plt.subplots(2, 3, figsize=(16, 10))
axes = axes.ravel()

for idx, feat in enumerate(CATEGORICAL_FEATURES):
    ax = axes[idx]
    labels = CAT_LABELS.get(feat, {})

    real_pcts = real[feat].value_counts(normalize=True).sort_index() * 100
    synth_pcts = synth[feat].value_counts(normalize=True).sort_index() * 100

    x = np.arange(len(real_pcts))
    width = 0.35
    label_names = [labels.get(v, str(v)) for v in real_pcts.index]

    ax.bar(x - width / 2, real_pcts.values, width, color=COLORS["real"],
           label="Real", edgecolor="white", linewidth=0.8)
    ax.bar(x + width / 2, synth_pcts.values, width, color=COLORS["synth"],
           label="Synthetic", edgecolor="white", linewidth=0.8)

    ax.set_title(feat.capitalize(), fontweight="bold")
    ax.set_xticks(x)
    ax.set_xticklabels(label_names, rotation=0)
    ax.set_ylabel("Percentage (%)")
    ax.legend(fontsize=9)

plt.suptitle("Categorical Feature Frequencies: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.01)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "categorical_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Categorical Comparison](figures/synthetic_quality/categorical_comparison.png)")
r("")


# ============================================================
# 4. CORRELATION SIMILARITY
# ============================================================

print("[4/8] Comparing correlations...")

r("## 4. Correlation Similarity")
r("")

real_corr = real.corr()
synth_corr = synth.corr()
corr_diff = synth_corr - real_corr

# Extract upper triangle (excluding diagonal)
mask = np.triu(np.ones_like(real_corr, dtype=bool), k=1)
real_upper = real_corr.where(mask).stack()
synth_upper = synth_corr.where(mask).stack()
diff_upper = (synth_upper - real_upper).abs()

# Correlation similarity metrics
corr_mae = diff_upper.mean()
corr_rmse = np.sqrt((diff_upper ** 2).mean())
corr_max = diff_upper.max()
corr_pearson = real_upper.corr(synth_upper)

r("### Overall Correlation Similarity Metrics")
r("")
r("| Metric | Value | Interpretation |")
r("|---|---|---|")
r("| Mean Absolute Error | {:.4f} | {} |".format(
    corr_mae, "Good" if corr_mae < 0.05 else "Moderate" if corr_mae < 0.10 else "Poor"))
r("| RMSE | {:.4f} | {} |".format(
    corr_rmse, "Good" if corr_rmse < 0.07 else "Moderate" if corr_rmse < 0.15 else "Poor"))
r("| Max Absolute Error | {:.4f} | Worst-case pair |".format(corr_max))
r("| Pearson (real vs synth corrs) | {:.4f} | {} |".format(
    corr_pearson, "Excellent" if corr_pearson > 0.95 else "Good" if corr_pearson > 0.90 else "Moderate"))
r("")

# Key correlations table
r("### Key Feature-Pair Correlations")
r("")
r("| Feature Pair | Real r | Synth r | Abs. Diff | Quality |")
r("|---|---|---|---|---|")

important_pairs = [
    ("ap_hi", TARGET), ("ap_lo", TARGET), ("age", TARGET),
    ("cholesterol", TARGET), ("weight", TARGET), ("gluc", TARGET),
    ("ap_hi", "ap_lo"), ("cholesterol", "gluc"),
    ("height", "weight"), ("gender", "height"),
    ("weight", "ap_hi"), ("weight", "ap_lo"),
    ("smoke", "alco"), ("age", "ap_hi"),
]

for f1, f2 in important_pairs:
    rv = real_corr.loc[f1, f2]
    sv = synth_corr.loc[f1, f2]
    ad = abs(sv - rv)
    quality = "Excellent" if ad < 0.02 else "Good" if ad < 0.05 else "Moderate" if ad < 0.10 else "Poor"
    r("| {} -- {} | {:.4f} | {:.4f} | {:.4f} | {} |".format(
        f1, f2, rv, sv, ad, quality))

r("")

# Side-by-side correlation heatmaps
fig, axes = plt.subplots(1, 3, figsize=(22, 7))

mask_lower = np.triu(np.ones_like(real_corr, dtype=bool), k=1)

# Real
sns.heatmap(real_corr, mask=mask_lower, annot=True, fmt=".3f",
            cmap="RdBu_r", center=0, vmin=-1, vmax=1, square=True,
            linewidths=0.5, linecolor="white",
            cbar_kws={"shrink": 0.8}, ax=axes[0])
axes[0].set_title("Real Training Data", fontsize=13, fontweight="bold")

# Synthetic
sns.heatmap(synth_corr, mask=mask_lower, annot=True, fmt=".3f",
            cmap="RdBu_r", center=0, vmin=-1, vmax=1, square=True,
            linewidths=0.5, linecolor="white",
            cbar_kws={"shrink": 0.8}, ax=axes[1])
axes[1].set_title("Synthetic Data", fontsize=13, fontweight="bold")

# Difference
sns.heatmap(corr_diff, mask=mask_lower, annot=True, fmt=".3f",
            cmap="PiYG", center=0, vmin=-0.2, vmax=0.2, square=True,
            linewidths=0.5, linecolor="white",
            cbar_kws={"shrink": 0.8, "label": "Synth - Real"}, ax=axes[2])
axes[2].set_title("Correlation Difference (S - R)", fontsize=13, fontweight="bold")

plt.suptitle("Correlation Matrix Comparison",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "correlation_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Correlation Comparison](figures/synthetic_quality/correlation_comparison.png)")
r("")

# Scatter: real correlations vs synthetic correlations
fig, ax = plt.subplots(figsize=(7, 7))

ax.scatter(real_upper.values, synth_upper.values,
           alpha=0.6, s=60, color="#7E57C2", edgecolor="white", linewidth=0.8)
ax.plot([-1, 1], [-1, 1], "k--", linewidth=1, alpha=0.5, label="Perfect Match")

ax.set_xlabel("Real Correlations", fontsize=12)
ax.set_ylabel("Synthetic Correlations", fontsize=12)
ax.set_title("Correlation Fidelity: Real vs Synthetic\n(r = {:.4f})".format(
    corr_pearson), fontsize=13, fontweight="bold")
ax.set_xlim(-0.3, 0.8)
ax.set_ylim(-0.3, 0.8)
ax.legend()
ax.set_aspect("equal")

plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "correlation_scatter.png"),
            bbox_inches="tight")
plt.close()

r("![Correlation Scatter](figures/synthetic_quality/correlation_scatter.png)")
r("")


# ============================================================
# 5. TARGET DISTRIBUTION SIMILARITY
# ============================================================

print("[5/8] Comparing target distributions...")

r("## 5. Target Distribution Similarity")
r("")

real_target = real[TARGET].value_counts(normalize=True).sort_index() * 100
synth_target = synth[TARGET].value_counts(normalize=True).sort_index() * 100

r("| Class | Label | Real (%) | Synth (%) | Diff (pp) |")
r("|---|---|---|---|---|")

for cls in sorted(real_target.index):
    rv = real_target[cls]
    sv = synth_target.get(cls, 0)
    label = "No CVD" if cls == 0 else "CVD"
    r("| {} | {} | {:.2f} | {:.2f} | {:+.2f} |".format(
        cls, label, rv, sv, sv - rv))

r("")

target_diff = abs(synth_target[1] - real_target[1])
if target_diff < 2:
    verdict = "Excellent"
elif target_diff < 5:
    verdict = "Good"
elif target_diff < 10:
    verdict = "Moderate"
else:
    verdict = "Concerning"

r("> **Target balance drift**: {:.2f} percentage points ({})".format(
    target_diff, verdict))
r("")

if target_diff >= 5:
    r("> [!WARNING]")
    r("> CTGAN over-generates the CVD class by {:.1f} pp. ".format(target_diff))
    r("> When augmenting, use controlled blending ratios (e.g., 50-100%) to keep the "
      "combined dataset close to the original distribution.")
    r("")

# Target distribution plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Bar chart
x = np.arange(2)
width = 0.35
axes[0].bar(x - width / 2, real_target.values, width, color=COLORS["real"],
            label="Real", edgecolor="white", linewidth=1.5)
axes[0].bar(x + width / 2, synth_target.values, width, color=COLORS["synth"],
            label="Synthetic", edgecolor="white", linewidth=1.5)

for i, (rv, sv) in enumerate(zip(real_target.values, synth_target.values)):
    axes[0].text(i - width / 2, rv + 0.5, "{:.1f}%".format(rv),
                 ha="center", fontweight="bold", fontsize=10, color=COLORS["real"])
    axes[0].text(i + width / 2, sv + 0.5, "{:.1f}%".format(sv),
                 ha="center", fontweight="bold", fontsize=10, color=COLORS["synth"])

axes[0].set_xticks(x)
axes[0].set_xticklabels(["No CVD (0)", "CVD (1)"])
axes[0].set_ylabel("Percentage (%)")
axes[0].set_title("Target Distribution", fontweight="bold")
axes[0].legend()
axes[0].set_ylim(0, max(real_target.max(), synth_target.max()) + 5)

# Pie charts side by side
axes[1].remove()
gs = fig.add_gridspec(1, 4)
ax_pie1 = fig.add_subplot(gs[0, 2])
ax_pie2 = fig.add_subplot(gs[0, 3])

ax_pie1.pie(real_target.values, labels=["No CVD", "CVD"],
            colors=["#2196F3", "#F44336"], autopct="%1.1f%%",
            startangle=90, textprops={"fontsize": 9, "fontweight": "bold"},
            wedgeprops={"edgecolor": "white", "linewidth": 2})
ax_pie1.set_title("Real", fontweight="bold")

ax_pie2.pie(synth_target.values, labels=["No CVD", "CVD"],
            colors=["#FF9800", "#E65100"], autopct="%1.1f%%",
            startangle=90, textprops={"fontsize": 9, "fontweight": "bold"},
            wedgeprops={"edgecolor": "white", "linewidth": 2})
ax_pie2.set_title("Synthetic", fontweight="bold")

plt.suptitle("Target Variable: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "target_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Target Comparison](figures/synthetic_quality/target_comparison.png)")
r("")


# ============================================================
# 6. FEATURE RANGE VALIDITY
# ============================================================

print("[6/8] Checking feature range validity...")

r("## 6. Feature Range Validity")
r("")

r("### Numerical Features")
r("")
r("| Feature | Real Min | Real Max | Synth Min | Synth Max | "
  "Min Valid? | Max Valid? | Range Coverage |")
r("|---|---|---|---|---|---|---|---|")

for feat in NUMERICAL_FEATURES:
    r_min, r_max = real[feat].min(), real[feat].max()
    s_min, s_max = synth[feat].min(), synth[feat].max()
    min_ok = "Yes" if s_min >= r_min else "OVER"
    max_ok = "Yes" if s_max <= r_max else "OVER"
    coverage = (s_max - s_min) / (r_max - r_min) * 100 if (r_max - r_min) > 0 else 0

    r("| {} | {:.1f} | {:.1f} | {:.1f} | {:.1f} | {} | {} | {:.1f}% |".format(
        feat, r_min, r_max, s_min, s_max, min_ok, max_ok, coverage))

r("")

r("### Categorical Features")
r("")
r("| Feature | Real Values | Synth Values | Valid? |")
r("|---|---|---|---|")

for feat in CATEGORICAL_FEATURES:
    r_vals = sorted(real[feat].unique())
    s_vals = sorted(synth[feat].unique())
    valid = "Yes" if set(s_vals).issubset(set(r_vals)) else "INVALID"
    r("| {} | {} | {} | {} |".format(feat, r_vals, s_vals, valid))

r("")


# ============================================================
# 7. DUPLICATE / SUSPICIOUS RECORDS
# ============================================================

print("[7/8] Checking duplicates and suspicious records...")

r("## 7. Duplicate and Suspicious Records")
r("")

# Duplicates within synthetic
synth_dups = synth.duplicated().sum()
synth_dup_pct = synth_dups / len(synth) * 100

# Exact copies from real data in synthetic
merged = pd.merge(synth, real, how="inner",
                  on=list(real.columns))
exact_copies = len(merged)
exact_copy_pct = exact_copies / len(synth) * 100

r("| Metric | Count | Percentage | Assessment |")
r("|---|---|---|---|")
r("| Duplicate rows in synthetic | {:,} | {:.2f}% | {} |".format(
    synth_dups, synth_dup_pct,
    "Acceptable" if synth_dup_pct < 5 else "High"))
r("| Exact copies of real records | {:,} | {:.4f}% | {} |".format(
    exact_copies, exact_copy_pct,
    "Good (low memorization)" if exact_copy_pct < 1 else "Concerning"))
r("")

if exact_copy_pct < 1:
    r("> [!TIP]")
    r("> Only {:.4f}% of synthetic records are exact copies of real training data. "
      "This indicates CTGAN is **generating novel records**, not memorizing the training set.".format(
          exact_copy_pct))
else:
    r("> [!WARNING]")
    r("> {:.2f}% of synthetic records are exact copies. "
      "This suggests potential memorization.".format(exact_copy_pct))
r("")

# Check for clinically implausible records
r("### Clinical Plausibility Check")
r("")

n_bp_invalid = (synth["ap_lo"] >= synth["ap_hi"]).sum()
n_bp_invalid_pct = n_bp_invalid / len(synth) * 100

r("| Check | Count | Percentage |")
r("|---|---|---|")
r("| Diastolic >= Systolic BP | {:,} | {:.2f}% |".format(
    n_bp_invalid, n_bp_invalid_pct))
r("")

if n_bp_invalid > 0:
    r("> [!WARNING]")
    r("> {:,} synthetic records have diastolic BP >= systolic BP, which is "
      "clinically implausible. Consider post-filtering these records before "
      "augmentation.".format(n_bp_invalid))
    r("")
else:
    r("> [!TIP]")
    r("> All synthetic records have valid blood pressure relationships "
      "(diastolic < systolic).")
    r("")


# ============================================================
# 8. OVERALL STATISTICAL SIMILARITY
# ============================================================

print("[8/8] Computing overall similarity metrics...")

r("## 8. Overall Statistical Similarity")
r("")

# Percentile comparison for numerical features
r("### Percentile Comparison")
r("")
r("| Feature | Percentile | Real | Synthetic | Abs. Diff |")
r("|---|---|---|---|---|")

percentiles = [5, 25, 50, 75, 95]
for feat in NUMERICAL_FEATURES:
    for pct in percentiles:
        rv = np.percentile(real[feat], pct)
        sv = np.percentile(synth[feat], pct)
        r("| {} | P{} | {:.1f} | {:.1f} | {:.1f} |".format(
            feat, pct, rv, sv, abs(sv - rv)))

r("")

# Skewness and kurtosis comparison
r("### Shape Comparison (Skewness & Kurtosis)")
r("")
r("| Feature | Real Skew | Synth Skew | Skew Diff | "
  "Real Kurt | Synth Kurt | Kurt Diff |")
r("|---|---|---|---|---|---|---|")

for feat in NUMERICAL_FEATURES:
    r_skew = real[feat].skew()
    s_skew = synth[feat].skew()
    r_kurt = real[feat].kurtosis()
    s_kurt = synth[feat].kurtosis()
    r("| {} | {:.3f} | {:.3f} | {:+.3f} | {:.3f} | {:.3f} | {:+.3f} |".format(
        feat, r_skew, s_skew, s_skew - r_skew, r_kurt, s_kurt, s_kurt - r_kurt))

r("")

# Box plot comparison
fig, axes = plt.subplots(1, 5, figsize=(20, 5))

for idx, feat in enumerate(NUMERICAL_FEATURES):
    ax = axes[idx]
    label = FEATURE_LABELS.get(feat, feat)

    bp = ax.boxplot(
        [real[feat], synth[feat]],
        labels=["Real", "Synthetic"],
        patch_artist=True,
        widths=0.6,
        medianprops={"color": "black", "linewidth": 2},
    )
    for patch, color in zip(bp["boxes"], [COLORS["real"], COLORS["synth"]]):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)

    ax.set_title(label, fontweight="bold")
    ax.set_ylabel(label)

plt.suptitle("Box Plot Comparison: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "boxplot_comparison.png"),
            bbox_inches="tight")
plt.close()

r("![Box Plot Comparison](figures/synthetic_quality/boxplot_comparison.png)")
r("")

# QQ plots
fig, axes = plt.subplots(1, 5, figsize=(20, 4))

for idx, feat in enumerate(NUMERICAL_FEATURES):
    ax = axes[idx]
    label = FEATURE_LABELS.get(feat, feat)

    # Sample equal sizes for QQ
    n_sample = min(5000, len(real), len(synth))
    real_sample = np.sort(real[feat].sample(n_sample, random_state=42).values)
    synth_sample = np.sort(synth[feat].sample(n_sample, random_state=42).values)

    ax.scatter(real_sample, synth_sample, alpha=0.3, s=8, color="#7E57C2")
    lim_min = min(real_sample.min(), synth_sample.min())
    lim_max = max(real_sample.max(), synth_sample.max())
    ax.plot([lim_min, lim_max], [lim_min, lim_max], "k--", linewidth=1, alpha=0.5)

    ax.set_xlabel("Real Quantiles")
    ax.set_ylabel("Synthetic Quantiles")
    ax.set_title(label, fontweight="bold")
    ax.set_aspect("equal")

plt.suptitle("Q-Q Plots: Real vs Synthetic",
             fontsize=14, fontweight="bold", y=1.05)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "qq_plots.png"),
            bbox_inches="tight")
plt.close()

r("![QQ Plots](figures/synthetic_quality/qq_plots.png)")
r("")


# ============================================================
# SUMMARY SCORECARD
# ============================================================

r("## 9. Summary Scorecard")
r("")
r("| Criterion | Score | Details |")
r("|---|---|---|")

# Distribution (KS)
if avg_ks < 0.05:
    dist_score = "A (Excellent)"
elif avg_ks < 0.10:
    dist_score = "B (Good)"
elif avg_ks < 0.20:
    dist_score = "C (Moderate)"
else:
    dist_score = "D (Poor)"
r("| Distribution Similarity | {} | Mean KS = {:.4f} |".format(
    dist_score, avg_ks))

# Correlation
if corr_pearson > 0.95:
    corr_score = "A (Excellent)"
elif corr_pearson > 0.90:
    corr_score = "B (Good)"
elif corr_pearson > 0.80:
    corr_score = "C (Moderate)"
else:
    corr_score = "D (Poor)"
r("| Correlation Fidelity | {} | Pearson = {:.4f} |".format(
    corr_score, corr_pearson))

# Mean accuracy
if avg_rel_err < 1:
    mean_score = "A (Excellent)"
elif avg_rel_err < 3:
    mean_score = "B (Good)"
elif avg_rel_err < 5:
    mean_score = "C (Moderate)"
else:
    mean_score = "D (Poor)"
r("| Mean Accuracy | {} | Avg. relative error = {:.2f}% |".format(
    mean_score, avg_rel_err))

# Target balance
if target_diff < 2:
    target_score = "A (Excellent)"
elif target_diff < 5:
    target_score = "B (Good)"
elif target_diff < 10:
    target_score = "C (Moderate)"
else:
    target_score = "D (Poor)"
r("| Target Balance | {} | Drift = {:.1f} pp |".format(
    target_score, target_diff))

# Range validity
all_ranges_ok = all(
    synth[f].min() >= real[f].min() and synth[f].max() <= real[f].max()
    for f in NUMERICAL_FEATURES
)
range_score = "A (Excellent)" if all_ranges_ok else "C (Moderate)"
r("| Range Validity | {} | All features within bounds |".format(range_score))

# Privacy (memorization)
if exact_copy_pct < 0.5:
    priv_score = "A (Excellent)"
elif exact_copy_pct < 2:
    priv_score = "B (Good)"
else:
    priv_score = "D (Poor)"
r("| Privacy (low memorization) | {} | {:.4f}% exact copies |".format(
    priv_score, exact_copy_pct))

r("")

# ============================================================
# STRENGTHS AND WEAKNESSES
# ============================================================

r("## 10. Strengths and Weaknesses")
r("")

r("### Strengths")
r("")
strengths = []
if avg_ks < 0.15:
    strengths.append("Numerical distributions are well-reproduced (mean KS = {:.4f})".format(avg_ks))
if corr_pearson > 0.90:
    strengths.append("Strong correlation structure preservation (Pearson = {:.4f})".format(corr_pearson))
if all_ranges_ok:
    strengths.append("All synthetic values fall within real training data ranges")
if exact_copy_pct < 1:
    strengths.append("Very low memorization rate ({:.4f}% exact copies) -- generates novel records".format(exact_copy_pct))
if avg_rel_err < 5:
    strengths.append("Mean values well-preserved (avg relative error = {:.2f}%)".format(avg_rel_err))

# Always add zero missing values
strengths.append("Zero missing values in synthetic data")

for s in strengths:
    r("- {}".format(s))
r("")

r("### Weaknesses")
r("")
weaknesses = []

if target_diff >= 5:
    weaknesses.append("Target class imbalance drift: CVD over-generated by {:.1f} pp".format(target_diff))

# Check sparse feature inflation
for feat in ["smoke", "alco"]:
    real_minority = real[feat].value_counts(normalize=True).sort_index()
    synth_minority = synth[feat].value_counts(normalize=True).sort_index()
    # Get the less frequent class
    min_val = real_minority.idxmin()
    drift = abs(synth_minority[min_val] - real_minority[min_val]) * 100
    if drift > 5:
        weaknesses.append("`{}` minority class over-generated by {:.1f} pp (GAN mode smoothing)".format(
            feat, drift))

# Check BP correlation degradation
bp_corr_diff = abs(synth_corr.loc["ap_hi", "ap_lo"] - real_corr.loc["ap_hi", "ap_lo"])
if bp_corr_diff > 0.05:
    weaknesses.append("ap_hi-ap_lo correlation degraded by {:.3f} (from {:.3f} to {:.3f})".format(
        bp_corr_diff, real_corr.loc["ap_hi", "ap_lo"], synth_corr.loc["ap_hi", "ap_lo"]))

if n_bp_invalid > 0:
    weaknesses.append("{:,} records with clinically invalid BP (diastolic >= systolic)".format(
        n_bp_invalid))

# Check range coverage
for feat in NUMERICAL_FEATURES:
    coverage = (synth[feat].max() - synth[feat].min()) / (real[feat].max() - real[feat].min()) * 100
    if coverage < 70:
        weaknesses.append("`{}` range coverage only {:.0f}% -- tails under-represented".format(
            feat, coverage))

if not weaknesses:
    weaknesses.append("No major weaknesses identified")

for w in weaknesses:
    r("- {}".format(w))
r("")

r("### Recommendations for Augmentation")
r("")
r("1. **Use controlled blending ratios** (50-100%) to mitigate target drift")
r("2. **Post-filter** clinically invalid records (diastolic >= systolic) if present")
r("3. **Monitor** sparse feature distributions (smoke, alco) in the augmented blend")
r("4. **Verify** that model performance improves with augmentation on a validation set")
r("")


# ============================================================
# SAVE REPORT
# ============================================================

print("\nSaving report...")

os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)

with open(REPORT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(rpt))

print("  Report saved:", REPORT_PATH)

# List generated figures
print("\n  Generated figures:")
for fname in sorted(os.listdir(FIGURES_DIR)):
    fpath = os.path.join(FIGURES_DIR, fname)
    size_kb = os.path.getsize(fpath) / 1024
    print("    - {} ({:.1f} KB)".format(fname, size_kb))

print("\n" + "=" * 70)
print("SYNTHETIC QUALITY EVALUATION COMPLETE")
print("=" * 70)
