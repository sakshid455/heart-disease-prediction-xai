# HeartAI — Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An end-to-end, reproducible scientific research framework and production clinical prediction platform demonstrating that **adaptive conditional generative adversarial network (CTGAN) synthetic data augmentation** improves clinical disease detection (sensitivity) in cardiovascular screening while rigorously preserving model explainability and demographic fairness.

---

## 🔬 Key Research Takeaways

- **Master Cohort**: $N = 68,612$ patient records ($50.52\%$ negative / $49.48\%$ positive, 0 missing).
- **Strict Data Quarantine**: $54,889$ train / $13,723$ quarantined test ($80/20$ stratified split).
- **Optimal Augmentation Level**: $200\%$ Augmentation ($109,778$ CTGAN synthetic samples).
- **Disease Recall (Sensitivity) Gain**: $+7.29\%$ in Logistic Regression ($66.58\% \rightarrow 73.87\%$).
- **F1-Score Gain**: $+1.45\%$ harmonic improvement ($70.93\% \rightarrow 72.38\%$).
- **Explainability Fidelity**: Spearman rank correlation $\rho = +0.8455$ ($p = 1.05 \times 10^{-3}$) and $100\%$ sign consistency on primary biomarkers.
- **Demographic Equity**: False Negative Rate reduced across all 6 evaluated demographic subgroups (Sex and Age).
- **Empirical Privacy**: $98.2\%$ smooth continuous manifold interpolation (0.41% duplicate rate, within training baseline).
- **Cross-Dataset Validation**: Consistent $+7.14\%$ to $+7.29\%$ sensitivity gains on both UCI Cleveland ($N=303$) and Large Cohort ($N=68,612$).

---

## 📁 Repository Structure

```
├── configs/                     # Hyperparameter and experimental configurations
│   ├── experiment_config.json   # Master pipeline parameters & data paths
│   ├── ctgan_config.json        # CTGAN generative architecture & bounds
│   └── model_config.json        # ML model hyperparameters & explainers
├── data/                        # Datasets (quarantined splits & raw archives)
│   ├── processed/               # large_clean.csv, large_train.csv, large_test.csv
│   └── raw/                     # Original raw archives
├── docs/                        # Scientific & technical documentation
│   ├── reproducibility_guide.md # Step-by-step reproduction instructions
│   ├── dataset_documentation.md # Feature schemas & clinical definitions
│   └── model_documentation.md   # Model architectures & SHAP explanations
├── backend/                     # Production FastAPI backend application
│   ├── main.py                  # API routes & lifespan startup caching
│   ├── schemas/                 # Pydantic request/response validation
│   └── services/                # Prediction, SHAP, dataset & results services
├── frontend/                    # Modern React + Vite research dashboard
│   ├── src/pages/               # 8 interactive research & prediction views
│   └── src/services/api.ts      # Typed API client
├── results/                     # All empirical findings, tables & figures
│   ├── final_experiment/        # Master reproducible clean run outputs & FINAL_RESULTS.md
│   ├── final_tables/            # Publication Tables 1–10 (CSV & Markdown)
│   ├── final_figures/           # Publication Figures 1–14 (300 DPI PNG)
│   ├── cross_dataset/           # UCI vs. Large Cohort validation study
│   └── final_research_findings.md # 15-section factual research findings report
├── src/                         # Pipeline implementation modules
│   ├── run_final_clean_experiment.py
│   ├── run_cross_dataset_study.py
│   ├── generate_publication_tables.py
│   └── generate_publication_figures.py
├── tests/                       # Automated integration & unit test suite
│   ├── test_backend.py          # Backend endpoint unit tests
│   └── test_e2e_integration.py  # End-to-end integration tests
├── environment.yml              # Conda environment definition
├── requirements.txt             # Python pip dependencies
├── run_final_experiment.py       # Single-command master reproduction script
└── run_server.py                # FastAPI server launcher
```

---

## 🚀 Quickstart & Reproduction

### 1. Environment Setup

```bash
# Clone the repository
git clone https://github.com/sakshid455/heart-disease-prediction-xai.git
cd heart-disease-prediction-xai

# Option A: Using Conda (Recommended)
conda env create -f environment.yml
conda activate heartai

# Option B: Using Python venv & pip
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Reproduce All Experiments (Single Command)

```bash
python run_final_experiment.py
```

This single command autonomously validates the data, fits CTGAN, runs the 28-run adaptive matrix, evaluates the 140 multi-seed runs, computes SHAP values, renders all 14 figures (300 DPI), and generates all 10 publication tables.

---

## 🌐 Running the Web Application & API

### 1. Start the FastAPI Backend
```bash
python run_server.py
```
- API Server: `http://127.0.0.1:8000`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`

### 2. Start the React Frontend
```bash
cd frontend
npm install
npm run dev
```
- Dashboard UI: `http://127.0.0.1:3000`

