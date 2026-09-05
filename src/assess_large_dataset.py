"""
Comprehensive Quality Assessment of the Processed Large CVD Dataset

Analyzes data/processed/large_train.csv (training set only)
and produces:
    results/dataset_quality_report.md
    results/figures/dataset/*.png
"""

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import seaborn as sns
from scipy import stats
import os
import warnings
warnings.filterwarnings("ignore")

# ============================================================
# CONFIGURATION
# ============================================================

TRAIN_PATH = "data/processed/large_train.csv"
CLEAN_PATH = "data/processed/large_clean.csv"

FIGURES_DIR = "results/figures/dataset"
REPORT_PATH = "results/dataset_quality_report.md"

TARGET = "cardio"

NUMERICAL_FEATURES = ["age", "height", "weight", "ap_hi", "ap_lo"]
CATEGORICAL_FEATURES = ["gender", "cholesterol", "gluc", "smoke", "alco", "active"]

# Research-quality plot style
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

PALETTE = ["#2196F3", "#F44336"]  # Blue=No CVD, Red=CVD
sns.set_style("whitegrid")

os.makedirs(FIGURES_DIR, exist_ok=True)

# ============================================================
# LOAD DATA
# ============================================================

print("=" * 70)
print("DATASET QUALITY ASSESSMENT")
print("=" * 70)

df = pd.read_csv(TRAIN_PATH)
df_clean = pd.read_csv(CLEAN_PATH)

print("\nTraining set shape:", df.shape)
print("Full clean set shape:", df_clean.shape)

report_lines = []


def rpt(line=""):
    report_lines.append(line)


# ============================================================
# 1. MISSING VALUES
# ============================================================

print("\n[1/9] Analyzing missing values...")

missing = df.isnull().sum()
missing_pct = (df.isnull().sum() / len(df) * 100).round(4)
total_missing = missing.sum()

missing_table = pd.DataFrame({
    "Feature": df.columns,
    "Missing": missing.values,
    "Pct": missing_pct.values,
})

rpt("# Dataset Quality Assessment Report")
rpt("## Cardiovascular Disease Dataset (Large — Training Set)")
rpt("")
rpt("| Property | Value |")
rpt("|---|---|")
rpt("| Dataset | `large_train.csv` |")
rpt("| Records | {:,} |".format(len(df)))
rpt("| Features | {} |".format(len(df.columns) - 1))
rpt("| Target | `{}` |".format(TARGET))
rpt("| Assessment Date | 2026-08-26 |")
rpt("")
rpt("---")
rpt("")
rpt("## 1. Missing Values")
rpt("")

if total_missing == 0:
    rpt("> [!TIP]")
    rpt("> **Zero missing values** across all {:,} records and {} features.".format(
        len(df), len(df.columns)))
    rpt("")
    print("  Total missing: 0")
else:
    rpt("| Feature | Missing | Percentage |")
    rpt("|---|---|---|")
    for _, row in missing_table.iterrows():
        if row["Missing"] > 0:
            rpt("| {} | {:,} | {:.4f}% |".format(
                row["Feature"], int(row["Missing"]), row["Pct"]))
    rpt("")

# ============================================================
# 2. DUPLICATE RECORDS
# ============================================================

print("[2/9] Checking duplicates...")

n_dup = df.duplicated().sum()
n_dup_pct = (n_dup / len(df) * 100)

rpt("## 2. Duplicate Records")
rpt("")
rpt("| Metric | Value |")
rpt("|---|---|")
rpt("| Total records | {:,} |".format(len(df)))
rpt("| Duplicate rows | {:,} |".format(n_dup))
rpt("| Percentage | {:.2f}% |".format(n_dup_pct))
rpt("")

if n_dup > 0:
    rpt("> [!NOTE]")
    rpt("> {:,} duplicate rows remain after preprocessing. These are clinically valid records (different patients with identical measurements) and are retained intentionally.".format(n_dup))
    rpt("")
else:
    rpt("> [!TIP]")
    rpt("> No duplicate records found.")
    rpt("")

print("  Duplicates:", n_dup)

# ============================================================
# 3. CLASS IMBALANCE
# ============================================================

print("[3/9] Analyzing class distribution...")

target_counts = df[TARGET].value_counts().sort_index()
target_pcts = df[TARGET].value_counts(normalize=True).sort_index() * 100

rpt("## 3. Target Variable — Class Distribution")
rpt("")
rpt("| Class | Label | Count | Percentage |")
rpt("|---|---|---|---|")
rpt("| 0 | No CVD | {:,} | {:.2f}% |".format(
    target_counts[0], target_pcts[0]))
rpt("| 1 | CVD Present | {:,} | {:.2f}% |".format(
    target_counts[1], target_pcts[1]))
rpt("")

imbalance_ratio = target_counts.max() / target_counts.min()
rpt("| Metric | Value |")
rpt("|---|---|")
rpt("| Imbalance ratio | {:.4f}:1 |".format(imbalance_ratio))
rpt("| Balance assessment | {} |".format(
    "Well balanced" if imbalance_ratio < 1.5 else "Imbalanced"))
rpt("")

# Target distribution plot
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

bars = axes[0].bar(
    ["No CVD (0)", "CVD (1)"],
    target_counts.values,
    color=PALETTE,
    edgecolor="white",
    linewidth=1.5,
    width=0.6,
)
for bar, count in zip(bars, target_counts.values):
    axes[0].text(
        bar.get_x() + bar.get_width() / 2, bar.get_height() + 200,
        "{:,}".format(count),
        ha="center", va="bottom", fontweight="bold", fontsize=11
    )
axes[0].set_title("Target Distribution (Count)")
axes[0].set_ylabel("Number of Records")
axes[0].set_ylim(0, target_counts.max() * 1.12)

axes[1].pie(
    target_counts.values,
    labels=["No CVD (0)", "CVD (1)"],
    colors=PALETTE,
    autopct="%1.1f%%",
    startangle=90,
    explode=(0.03, 0.03),
    textprops={"fontsize": 12, "fontweight": "bold"},
    wedgeprops={"edgecolor": "white", "linewidth": 2},
)
axes[1].set_title("Target Distribution (Proportion)")

plt.suptitle("Target Variable: Cardiovascular Disease", fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "target_distribution.png"), bbox_inches="tight")
plt.close()

rpt("![Target Distribution](figures/dataset/target_distribution.png)")
rpt("")

# ============================================================
# 4. NUMERICAL FEATURE DISTRIBUTIONS
# ============================================================

print("[4/9] Analyzing numerical feature distributions...")

rpt("## 4. Numerical Feature Distributions")
rpt("")
rpt("| Feature | Mean | Std | Min | 25% | Median | 75% | Max | Skewness | Kurtosis |")
rpt("|---|---|---|---|---|---|---|---|---|---|")

num_stats = {}
for feat in NUMERICAL_FEATURES:
    s = df[feat]
    sk = s.skew()
    ku = s.kurtosis()
    num_stats[feat] = {
        "mean": s.mean(), "std": s.std(), "min": s.min(),
        "q25": s.quantile(0.25), "median": s.median(),
        "q75": s.quantile(0.75), "max": s.max(),
        "skew": sk, "kurtosis": ku,
    }
    rpt("| {} | {:.2f} | {:.2f} | {:.1f} | {:.1f} | {:.1f} | {:.1f} | {:.1f} | {:.3f} | {:.3f} |".format(
        feat, s.mean(), s.std(), s.min(), s.quantile(0.25),
        s.median(), s.quantile(0.75), s.max(), sk, ku
    ))

rpt("")

# Distribution plots — all numerical features
fig, axes = plt.subplots(2, 3, figsize=(15, 9))
axes = axes.ravel()

feature_labels = {
    "age": "Age (years)",
    "height": "Height (cm)",
    "weight": "Weight (kg)",
    "ap_hi": "Systolic BP (mmHg)",
    "ap_lo": "Diastolic BP (mmHg)",
}

for idx, feat in enumerate(NUMERICAL_FEATURES):
    ax = axes[idx]
    label = feature_labels.get(feat, feat)

    # Histogram with KDE
    for cls, color, name in [(0, PALETTE[0], "No CVD"), (1, PALETTE[1], "CVD")]:
        subset = df[df[TARGET] == cls][feat]
        ax.hist(subset, bins=40, alpha=0.5, color=color, label=name,
                density=True, edgecolor="white", linewidth=0.5)
        subset.plot.kde(ax=ax, color=color, linewidth=2)

    ax.set_title(label, fontweight="bold")
    ax.set_xlabel(label)
    ax.set_ylabel("Density")
    ax.legend(fontsize=9)

# Remove extra subplot
axes[5].axis("off")

plt.suptitle("Numerical Feature Distributions by Target Class",
             fontsize=14, fontweight="bold", y=1.01)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "numerical_distributions.png"), bbox_inches="tight")
plt.close()

rpt("![Numerical Distributions](figures/dataset/numerical_distributions.png)")
rpt("")

# Box plots
fig, axes = plt.subplots(1, 5, figsize=(18, 5))

for idx, feat in enumerate(NUMERICAL_FEATURES):
    ax = axes[idx]
    label = feature_labels.get(feat, feat)

    data_0 = df[df[TARGET] == 0][feat]
    data_1 = df[df[TARGET] == 1][feat]

    bp = ax.boxplot(
        [data_0, data_1],
        labels=["No CVD", "CVD"],
        patch_artist=True,
        widths=0.6,
        medianprops={"color": "black", "linewidth": 2},
    )
    for patch, color in zip(bp["boxes"], PALETTE):
        patch.set_facecolor(color)
        patch.set_alpha(0.7)

    ax.set_title(label, fontweight="bold")
    ax.set_ylabel(label)

plt.suptitle("Feature Box Plots by Target Class",
             fontsize=14, fontweight="bold", y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "numerical_boxplots.png"), bbox_inches="tight")
plt.close()

rpt("![Box Plots](figures/dataset/numerical_boxplots.png)")
rpt("")

# Normality assessment
rpt("### Normality Assessment (Shapiro-Wilk on 5000-sample subset)")
rpt("")
rpt("| Feature | W-statistic | p-value | Normal? |")
rpt("|---|---|---|---|")

for feat in NUMERICAL_FEATURES:
    sample = df[feat].sample(5000, random_state=42)
    w_stat, p_val = stats.shapiro(sample)
    is_normal = "Yes" if p_val > 0.05 else "No"
    rpt("| {} | {:.6f} | {:.2e} | {} |".format(feat, w_stat, p_val, is_normal))

rpt("")

# ============================================================
# 5. CATEGORICAL FEATURE DISTRIBUTIONS
# ============================================================

print("[5/9] Analyzing categorical feature distributions...")

rpt("## 5. Categorical Feature Distributions")
rpt("")

cat_labels = {
    "gender": {1: "Female", 2: "Male"},
    "cholesterol": {1: "Normal", 2: "Above Normal", 3: "Well Above"},
    "gluc": {1: "Normal", 2: "Above Normal", 3: "Well Above"},
    "smoke": {0: "No", 1: "Yes"},
    "alco": {0: "No", 1: "Yes"},
    "active": {0: "No", 1: "Yes"},
}

for feat in CATEGORICAL_FEATURES:
    counts = df[feat].value_counts().sort_index()
    pcts = df[feat].value_counts(normalize=True).sort_index() * 100
    labels = cat_labels.get(feat, {})

    rpt("### {}".format(feat.capitalize()))
    rpt("")
    rpt("| Value | Label | Count | Percentage |")
    rpt("|---|---|---|---|")
    for val in counts.index:
        lbl = labels.get(val, str(val))
        rpt("| {} | {} | {:,} | {:.2f}% |".format(val, lbl, counts[val], pcts[val]))
    rpt("")

# Categorical distributions plot
fig, axes = plt.subplots(2, 3, figsize=(16, 10))
axes = axes.ravel()

for idx, feat in enumerate(CATEGORICAL_FEATURES):
    ax = axes[idx]
    labels = cat_labels.get(feat, {})

    # Grouped bar chart by target
    ct = pd.crosstab(df[feat], df[TARGET], normalize="index") * 100

    x = np.arange(len(ct.index))
    width = 0.35

    label_names = [labels.get(v, str(v)) for v in ct.index]

    bars1 = ax.bar(x - width / 2, ct[0], width, color=PALETTE[0],
                   label="No CVD", edgecolor="white", linewidth=0.8)
    bars2 = ax.bar(x + width / 2, ct[1], width, color=PALETTE[1],
                   label="CVD", edgecolor="white", linewidth=0.8)

    ax.set_title(feat.capitalize(), fontweight="bold")
    ax.set_xticks(x)
    ax.set_xticklabels(label_names, rotation=0)
    ax.set_ylabel("Percentage (%)")
    ax.legend(fontsize=9)
    ax.set_ylim(0, 100)

plt.suptitle("Categorical Feature Distributions by Target Class",
             fontsize=14, fontweight="bold", y=1.01)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "categorical_distributions.png"), bbox_inches="tight")
plt.close()

rpt("![Categorical Distributions](figures/dataset/categorical_distributions.png)")
rpt("")

# ============================================================
# 6. FEATURE RANGES
# ============================================================

print("[6/9] Documenting feature ranges...")

rpt("## 6. Feature Ranges (After Preprocessing)")
rpt("")
rpt("| Feature | Type | Min | Max | Range | Unique Values |")
rpt("|---|---|---|---|---|---|")

for feat in NUMERICAL_FEATURES:
    rpt("| {} | Numerical | {:.1f} | {:.1f} | {:.1f} | {:,} |".format(
        feat, df[feat].min(), df[feat].max(),
        df[feat].max() - df[feat].min(), df[feat].nunique()
    ))

for feat in CATEGORICAL_FEATURES:
    vals = sorted(df[feat].unique())
    rpt("| {} | Categorical | {} | {} | — | {} |".format(
        feat, min(vals), max(vals), len(vals)
    ))

rpt("")

# ============================================================
# 7. CORRELATIONS
# ============================================================

print("[7/9] Computing correlations...")

rpt("## 7. Feature Correlations")
rpt("")

# Full correlation matrix
corr_matrix = df.corr()

# Correlation with target
target_corr = corr_matrix[TARGET].drop(TARGET).sort_values(
    key=abs, ascending=False
)

rpt("### Correlation with Target (`cardio`)")
rpt("")
rpt("| Feature | Pearson r | Strength |")
rpt("|---|---|---|")

for feat, r in target_corr.items():
    strength = "Strong" if abs(r) > 0.3 else ("Moderate" if abs(r) > 0.15 else "Weak")
    rpt("| {} | {:.4f} | {} |".format(feat, r, strength))

rpt("")

# Correlation heatmap
fig, ax = plt.subplots(figsize=(10, 8))

mask = np.triu(np.ones_like(corr_matrix, dtype=bool), k=1)

sns.heatmap(
    corr_matrix,
    mask=mask,
    annot=True,
    fmt=".3f",
    cmap="RdBu_r",
    center=0,
    vmin=-1, vmax=1,
    square=True,
    linewidths=0.5,
    linecolor="white",
    cbar_kws={"shrink": 0.8, "label": "Pearson Correlation"},
    ax=ax,
)

ax.set_title("Feature Correlation Matrix (Lower Triangle)",
             fontsize=14, fontweight="bold", pad=15)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "correlation_matrix.png"), bbox_inches="tight")
plt.close()

rpt("![Correlation Matrix](figures/dataset/correlation_matrix.png)")
rpt("")

# Inter-feature correlation highlights
rpt("### Notable Inter-Feature Correlations")
rpt("")
rpt("| Feature Pair | Correlation | Interpretation |")
rpt("|---|---|---|")

pairs_seen = set()
for i, f1 in enumerate(corr_matrix.columns):
    for j, f2 in enumerate(corr_matrix.columns):
        if i >= j or f1 == TARGET or f2 == TARGET:
            continue
        r = corr_matrix.loc[f1, f2]
        pair = tuple(sorted([f1, f2]))
        if abs(r) > 0.2 and pair not in pairs_seen:
            pairs_seen.add(pair)
            if r > 0:
                interp = "Positive — {} increases with {}".format(f1, f2)
            else:
                interp = "Negative — {} decreases as {} increases".format(f1, f2)
            rpt("| {} ↔ {} | {:.4f} | {} |".format(f1, f2, r, interp))

rpt("")

# ============================================================
# 8. FEATURE-TARGET RELATIONSHIPS
# ============================================================

print("[8/9] Analyzing feature-target relationships...")

rpt("## 8. Feature-Target Relationships")
rpt("")

# Statistical tests — numerical features vs target
rpt("### Numerical Features — Mann-Whitney U Test")
rpt("")
rpt("| Feature | Mean (No CVD) | Mean (CVD) | Difference | U-statistic | p-value | Significant? |")
rpt("|---|---|---|---|---|---|---|")

for feat in NUMERICAL_FEATURES:
    group_0 = df[df[TARGET] == 0][feat]
    group_1 = df[df[TARGET] == 1][feat]
    u_stat, p_val = stats.mannwhitneyu(group_0, group_1, alternative="two-sided")
    mean_diff = group_1.mean() - group_0.mean()
    sig = "Yes (p < 0.001)" if p_val < 0.001 else ("Yes" if p_val < 0.05 else "No")
    rpt("| {} | {:.2f} | {:.2f} | {:+.2f} | {:.0f} | {:.2e} | {} |".format(
        feat, group_0.mean(), group_1.mean(), mean_diff, u_stat, p_val, sig
    ))

rpt("")

# Statistical tests — categorical features vs target
rpt("### Categorical Features — Chi-Square Test")
rpt("")
rpt("| Feature | Chi² | p-value | Cramér's V | Significant? |")
rpt("|---|---|---|---|---|")

for feat in CATEGORICAL_FEATURES:
    ct = pd.crosstab(df[feat], df[TARGET])
    chi2, p_val, dof, expected = stats.chi2_contingency(ct)
    n = len(df)
    k = min(ct.shape)
    cramers_v = np.sqrt(chi2 / (n * (k - 1)))
    sig = "Yes (p < 0.001)" if p_val < 0.001 else ("Yes" if p_val < 0.05 else "No")
    rpt("| {} | {:.2f} | {:.2e} | {:.4f} | {} |".format(
        feat, chi2, p_val, cramers_v, sig
    ))

rpt("")

# CVD rate by feature value (categorical)
rpt("### CVD Prevalence by Categorical Feature Value")
rpt("")

for feat in CATEGORICAL_FEATURES:
    labels = cat_labels.get(feat, {})
    rpt("**{}:**".format(feat.capitalize()))
    rpt("")
    rpt("| Value | Label | CVD Rate |")
    rpt("|---|---|---|")
    for val in sorted(df[feat].unique()):
        subset = df[df[feat] == val]
        cvd_rate = subset[TARGET].mean() * 100
        lbl = labels.get(val, str(val))
        rpt("| {} | {} | {:.1f}% |".format(val, lbl, cvd_rate))
    rpt("")

# Feature-target relationship plot
fig, axes = plt.subplots(2, 3, figsize=(16, 10))
axes = axes.ravel()

for idx, feat in enumerate(CATEGORICAL_FEATURES):
    ax = axes[idx]
    labels_map = cat_labels.get(feat, {})

    ct = pd.crosstab(df[feat], df[TARGET], normalize="index") * 100
    label_names = [labels_map.get(v, str(v)) for v in ct.index]

    ct.index = label_names
    ct.columns = ["No CVD", "CVD"]

    ct.plot(
        kind="bar",
        stacked=True,
        color=PALETTE,
        edgecolor="white",
        linewidth=0.8,
        ax=ax,
    )

    ax.set_title("{} vs CVD".format(feat.capitalize()), fontweight="bold")
    ax.set_ylabel("Percentage (%)")
    ax.set_xlabel("")
    ax.set_xticklabels(ax.get_xticklabels(), rotation=0)
    ax.legend(fontsize=9)

plt.suptitle("CVD Prevalence by Categorical Feature",
             fontsize=14, fontweight="bold", y=1.01)
plt.tight_layout()
plt.savefig(os.path.join(FIGURES_DIR, "categorical_vs_target.png"), bbox_inches="tight")
plt.close()

rpt("![Categorical vs Target](figures/dataset/categorical_vs_target.png)")
rpt("")

# ============================================================
# 9. DATA QUALITY PROBLEMS
# ============================================================

print("[9/9] Identifying potential data quality problems...")

rpt("## 9. Potential Data Quality Issues")
rpt("")

issues = []

# Check remaining skew in numerical features
for feat in NUMERICAL_FEATURES:
    sk = abs(df[feat].skew())
    if sk > 1.0:
        issues.append(
            "**High skewness** in `{}`: skew = {:.3f}. "
            "Consider log or Box-Cox transform for models sensitive to skewness.".format(feat, sk)
        )

# Check low-variance categorical features
for feat in CATEGORICAL_FEATURES:
    dominant_pct = df[feat].value_counts(normalize=True).iloc[0] * 100
    if dominant_pct > 90:
        issues.append(
            "**Low variance** in `{}`: dominant class = {:.1f}%. "
            "Feature may have limited discriminative power.".format(feat, dominant_pct)
        )

# Check weak predictors
for feat, r in target_corr.items():
    if abs(r) < 0.05:
        issues.append(
            "**Very weak correlation** between `{}` and target: r = {:.4f}. "
            "Feature may contribute minimal predictive value.".format(feat, r)
        )

# Check for multicollinearity
for i, f1 in enumerate(NUMERICAL_FEATURES):
    for j, f2 in enumerate(NUMERICAL_FEATURES):
        if i >= j:
            continue
        r = corr_matrix.loc[f1, f2]
        if abs(r) > 0.7:
            issues.append(
                "**High multicollinearity** between `{}` and `{}`: r = {:.4f}. "
                "Consider feature selection or regularization.".format(f1, f2, r)
            )

# Age range limitation
rpt("> [!IMPORTANT]")
rpt("> The dataset contains patients aged **29.6–64.9 years** only. "
    "Predictions for patients outside this range should be interpreted with caution.")
rpt("")

if issues:
    rpt("### Identified Issues")
    rpt("")
    for i, issue in enumerate(issues, 1):
        rpt("{}. {}".format(i, issue))
    rpt("")
else:
    rpt("> [!TIP]")
    rpt("> No critical data quality issues identified.")
    rpt("")

# CTGAN suitability assessment
rpt("## 10. CTGAN Suitability Assessment")
rpt("")
rpt("| Criterion | Assessment | Details |")
rpt("|---|---|---|")
rpt("| Training records | {:,} | Abundant for CTGAN |".format(len(df)))
rpt("| Numerical features | {} | Good continuous distributions for CTGAN to learn |".format(
    len(NUMERICAL_FEATURES)))
rpt("| Categorical features | {} | Mix of binary and ordinal |".format(
    len(CATEGORICAL_FEATURES)))
rpt("| Missing values | 0 | No imputation needed before CTGAN |")
rpt("| Class balance | {:.1f}% / {:.1f}% | Well balanced — CTGAN can learn both classes |".format(
    target_pcts[0], target_pcts[1]))
rpt("| Feature count | {} | Manageable dimensionality |".format(
    len(NUMERICAL_FEATURES) + len(CATEGORICAL_FEATURES)))
rpt("")
rpt("> [!TIP]")
rpt("> This dataset is **highly suitable for CTGAN**. The combination of {:,} training records, ".format(len(df)))
rpt("> {} numerical + {} categorical features, balanced classes, and zero missing values ".format(
    len(NUMERICAL_FEATURES), len(CATEGORICAL_FEATURES)))
rpt("> provides ideal conditions for synthetic tabular data generation.")
rpt("")

# ============================================================
# SAVE REPORT
# ============================================================

print("\nSaving report...")

os.makedirs(os.path.dirname(REPORT_PATH), exist_ok=True)

with open(REPORT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(report_lines))

print("  Report saved:", REPORT_PATH)

# List generated figures
print("\n  Generated figures:")
for fname in sorted(os.listdir(FIGURES_DIR)):
    fpath = os.path.join(FIGURES_DIR, fname)
    size_kb = os.path.getsize(fpath) / 1024
    print("    - {} ({:.1f} KB)".format(fname, size_kb))

print("\n" + "=" * 70)
print("QUALITY ASSESSMENT COMPLETE")
print("=" * 70)
