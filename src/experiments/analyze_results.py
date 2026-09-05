import os
import pandas as pd
import matplotlib.pyplot as plt


# ============================================================
# CONFIGURATION
# ============================================================

RESULTS_PATH = "results/adaptive_augmentation_results.csv"

OUTPUT_DIR = "results/analysis"

os.makedirs(OUTPUT_DIR, exist_ok=True)


# ============================================================
# LOAD RESULTS
# ============================================================

df = pd.read_csv(RESULTS_PATH)

print("\n" + "=" * 70)
print("ADAPTIVE AUGMENTATION RESULT ANALYSIS")
print("=" * 70)

print("\nLoaded results:")
print(df.shape)


# ============================================================
# CONVERT RATIO TO PERCENTAGE LABEL
# ============================================================

df["Augmentation_Label"] = (
    df["Augmentation_Ratio"].astype(str) + "%"
)


# ============================================================
# BEST RESULT FOR EACH MODEL
# ============================================================

best_by_model = (
    df.loc[
        df.groupby("Model")["F1"].idxmax()
    ]
    .sort_values("F1", ascending=False)
)

best_by_model.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "best_result_per_model.csv"
    ),
    index=False
)


# ============================================================
# BEST RESULT OVERALL
# ============================================================

best_overall = df.loc[
    df["F1"].idxmax()
]

print("\n" + "=" * 70)
print("BEST OVERALL CONFIGURATION")
print("=" * 70)

print(
    f"Model              : {best_overall['Model']}"
)

print(
    f"Augmentation       : "
    f"{best_overall['Augmentation_Ratio']}%"
)

print(
    f"Training Samples   : "
    f"{best_overall['Training_Samples']}"
)

print(
    f"Accuracy           : "
    f"{best_overall['Accuracy']:.4f}"
)

print(
    f"Precision          : "
    f"{best_overall['Precision']:.4f}"
)

print(
    f"Recall             : "
    f"{best_overall['Recall']:.4f}"
)

print(
    f"F1 Score           : "
    f"{best_overall['F1']:.4f}"
)

print(
    f"ROC-AUC            : "
    f"{best_overall['ROC_AUC']:.4f}"
)


# ============================================================
# BEST RESULT FOR EACH AUGMENTATION RATIO
# ============================================================

best_by_ratio = (
    df.loc[
        df.groupby("Augmentation_Ratio")["F1"].idxmax()
    ]
    .sort_values("Augmentation_Ratio")
)

best_by_ratio.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "best_model_per_augmentation.csv"
    ),
    index=False
)


# ============================================================
# MODEL COMPARISON
# ============================================================

model_summary = (
    df.groupby("Model")
    .agg(
        Best_Accuracy=("Accuracy", "max"),
        Best_Precision=("Precision", "max"),
        Best_Recall=("Recall", "max"),
        Best_F1=("F1", "max"),
        Best_ROC_AUC=("ROC_AUC", "max")
    )
    .reset_index()
)

model_summary = model_summary.sort_values(
    "Best_F1",
    ascending=False
)

model_summary.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "model_comparison_summary.csv"
    ),
    index=False
)


# ============================================================
# FULL RESULTS SORTED BY F1
# ============================================================

ranked_results = df.sort_values(
    ["F1", "ROC_AUC"],
    ascending=[False, False]
)

ranked_results.to_csv(
    os.path.join(
        OUTPUT_DIR,
        "ranked_results.csv"
    ),
    index=False
)


# ============================================================
# PRINT BEST RESULTS
# ============================================================

print("\n" + "=" * 70)
print("BEST RESULT FOR EACH MODEL")
print("=" * 70)

print(
    best_by_model[
        [
            "Model",
            "Augmentation_Ratio",
            "Training_Samples",
            "Accuracy",
            "Precision",
            "Recall",
            "F1",
            "ROC_AUC"
        ]
    ].to_string(index=False)
)


print("\n" + "=" * 70)
print("BEST MODEL AT EACH AUGMENTATION LEVEL")
print("=" * 70)

print(
    best_by_ratio[
        [
            "Augmentation_Ratio",
            "Model",
            "Accuracy",
            "Precision",
            "Recall",
            "F1",
            "ROC_AUC"
        ]
    ].to_string(index=False)
)


# ============================================================
# GRAPH 1
# F1 SCORE VS AUGMENTATION
# ============================================================

plt.figure(figsize=(10, 6))

for model in df["Model"].unique():

    model_data = df[
        df["Model"] == model
    ]

    plt.plot(
        model_data["Augmentation_Ratio"],
        model_data["F1"],
        marker="o",
        label=model
    )

plt.xlabel("Synthetic Data Augmentation (%)")
plt.ylabel("F1 Score")
plt.title(
    "F1 Score vs Synthetic Data Augmentation"
)

plt.xticks(
    sorted(df["Augmentation_Ratio"].unique())
)

plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()

plt.savefig(
    os.path.join(
        OUTPUT_DIR,
        "f1_vs_augmentation.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# GRAPH 2
# ACCURACY VS AUGMENTATION
# ============================================================

plt.figure(figsize=(10, 6))

for model in df["Model"].unique():

    model_data = df[
        df["Model"] == model
    ]

    plt.plot(
        model_data["Augmentation_Ratio"],
        model_data["Accuracy"],
        marker="o",
        label=model
    )

plt.xlabel("Synthetic Data Augmentation (%)")
plt.ylabel("Accuracy")
plt.title(
    "Accuracy vs Synthetic Data Augmentation"
)

plt.xticks(
    sorted(df["Augmentation_Ratio"].unique())
)

plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()

plt.savefig(
    os.path.join(
        OUTPUT_DIR,
        "accuracy_vs_augmentation.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# GRAPH 3
# ROC-AUC VS AUGMENTATION
# ============================================================

plt.figure(figsize=(10, 6))

for model in df["Model"].unique():

    model_data = df[
        df["Model"] == model
    ]

    plt.plot(
        model_data["Augmentation_Ratio"],
        model_data["ROC_AUC"],
        marker="o",
        label=model
    )

plt.xlabel("Synthetic Data Augmentation (%)")
plt.ylabel("ROC-AUC")
plt.title(
    "ROC-AUC vs Synthetic Data Augmentation"
)

plt.xticks(
    sorted(df["Augmentation_Ratio"].unique())
)

plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()

plt.savefig(
    os.path.join(
        OUTPUT_DIR,
        "roc_auc_vs_augmentation.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# GRAPH 4
# BEST MODEL COMPARISON
# ============================================================

plt.figure(figsize=(10, 6))

plt.bar(
    model_summary["Model"],
    model_summary["Best_F1"]
)

plt.xlabel("Machine Learning Model")
plt.ylabel("Best F1 Score")
plt.title(
    "Best F1 Score Achieved by Each Model"
)

plt.xticks(rotation=20)

plt.tight_layout()

plt.savefig(
    os.path.join(
        OUTPUT_DIR,
        "best_model_f1_comparison.png"
    ),
    dpi=300
)

plt.close()


# ============================================================
# FINAL MESSAGE
# ============================================================

print("\n" + "=" * 70)
print("ANALYSIS COMPLETED")
print("=" * 70)

print(
    f"\nAnalysis files saved to:\n{OUTPUT_DIR}"
)

print("\nGenerated files:")

for filename in sorted(
    os.listdir(OUTPUT_DIR)
):
    print(f"  - {filename}")