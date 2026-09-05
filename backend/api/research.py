"""
Phase 17: FastAPI Research Router
Exposes 14 research-grade endpoints for dataset audit, leakage validation,
generative fidelity, privacy, multi-ratio augmentation, statistics, bootstrap,
calibration, decision thresholds, counterfactual explanations, and manuscript reporting.
"""

import os
import json
from datetime import datetime
from typing import Optional, List, Dict, Any

from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import JSONResponse, PlainTextResponse

from backend.schemas.research import CounterfactualRequest
from src.validation import run_data_quality_assessment, run_leakage_validation
from src.synthetic import run_synthetic_quality_evaluation, run_privacy_analysis
from src.augmentation import run_augmentation_experiments, find_best_configuration
from src.statistics import run_statistical_significance_analysis
from src.robustness import run_bootstrap_analysis
from src.calibration import run_calibration_analysis, run_threshold_optimization
from src.explainability import run_xai_evaluation, generate_counterfactual_explanation
from src.experiments import get_experiment_tracker
from src.reporting import generate_full_research_report

router = APIRouter()


def _read_json_or_compute(filepath: str, compute_fn, **kwargs) -> Any:
    """Reads existing cached json artifact or runs compute_fn."""
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return compute_fn(**kwargs)


# 1. Dataset Quality
@router.get("/dataset-quality", summary="Phase 1: Automated 10-point dataset quality profile")
async def get_dataset_quality():
    try:
        data = _read_json_or_compute("results/validation/data_quality_report.json", run_data_quality_assessment)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load dataset quality report: {str(e)}")


# 2. Data Leakage
@router.get("/leakage", summary="Phase 2: Pipeline isolation and data leakage audit")
async def get_leakage_audit():
    try:
        data = _read_json_or_compute("results/validation/leakage_report.json", run_leakage_validation)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load leakage report: {str(e)}")


# 3. Synthetic Data Quality
@router.get("/synthetic-quality", summary="Phase 3: Generative fidelity, Wasserstein & correlation similarity")
async def get_synthetic_quality():
    try:
        data = _read_json_or_compute("results/synthetic/synthetic_quality_report.json", run_synthetic_quality_evaluation)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load synthetic quality report: {str(e)}")


# 4. Empirical Privacy
@router.get("/privacy", summary="Phase 4: Empirical privacy risk, DCR, and NNDR assessment")
async def get_privacy_assessment():
    try:
        data = _read_json_or_compute("results/privacy/privacy_analysis.json", run_privacy_analysis)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load privacy report: {str(e)}")


# 5. Augmentation Experiments
@router.get("/augmentation", summary="Phase 5: Multi-ratio augmentation experiments across models")
async def get_augmentation_experiments():
    try:
        data = _read_json_or_compute(
            "results/augmentation/augmentation_experiments.json",
            run_augmentation_experiments,
            quick_mode=True,
            use_existing_if_available=True,
        )
        return {"status": "success", "count": len(data), "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load augmentation experiments: {str(e)}")


# 6. Best Configuration
@router.get("/augmentation/best", summary="Phase 6: Automatic best configuration selector")
async def get_best_configuration(
    objective: str = Query("recall", description="Target metric: recall, f1, roc_auc, accuracy, precision"),
    model_filter: Optional[str] = Query(None, description="Optional model filter (e.g. 'Random Forest')"),
):
    try:
        data = find_best_configuration(objective=objective, model_filter=model_filter)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to determine best configuration: {str(e)}")


# 7. Model Architectures & Performance Summary
@router.get("/models", summary="Overview of 4 core model architectures across augmentation")
async def get_models_overview():
    try:
        data = _read_json_or_compute(
            "results/augmentation/augmentation_experiments.json",
            run_augmentation_experiments,
            quick_mode=True,
            use_existing_if_available=True,
        )
        models_dict = {}
        for r in data:
            m = r.get("model", "Unknown")
            if m not in models_dict:
                models_dict[m] = []
            models_dict[m].append(r)
        return {"status": "success", "models": list(models_dict.keys()), "data": models_dict}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load models overview: {str(e)}")


# 8. Statistical Significance
@router.get("/statistics", summary="Phase 7: Paired t-test, Wilcoxon, Cohen's d & 95% CIs")
async def get_statistical_significance():
    try:
        data = _read_json_or_compute("results/statistics/statistical_significance.json", run_statistical_significance_analysis)
        return {"status": "success", "count": len(data), "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load statistical significance tests: {str(e)}")


# 9. Bootstrap Robustness
@router.get("/bootstrap", summary="Phase 8: 1000-iteration bootstrap percentile confidence bounds")
async def get_bootstrap_analysis():
    try:
        data = _read_json_or_compute("results/robustness/bootstrap_results.json", run_bootstrap_analysis, quick_mode=True)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load bootstrap analysis: {str(e)}")


# 10. Probability Calibration
@router.get("/calibration", summary="Phase 9: Brier score, ECE, and reliability curves")
async def get_calibration_analysis():
    try:
        data = _read_json_or_compute("results/calibration/calibration_results.json", run_calibration_analysis, quick_mode=True)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load calibration analysis: {str(e)}")


# 11. Threshold Optimization
@router.get("/thresholds", summary="Phase 10: Multi-threshold sweep, Youden's J & clinical screening operating points")
async def get_threshold_optimization():
    try:
        data = _read_json_or_compute("results/calibration/threshold_optimization.json", run_threshold_optimization, quick_mode=True)
        return {"status": "success", "data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load threshold optimization: {str(e)}")


# 12. Counterfactual Explainability
@router.post("/counterfactual", summary="Phase 11: Constrained model-level counterfactual generation")
async def post_counterfactual(request: CounterfactualRequest):
    try:
        result = generate_counterfactual_explanation(
            patient_data=request.features,
            model_name=request.model_name or "Logistic Regression",
        )
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate counterfactual: {str(e)}")


# 13. Persistent Experiment Registry
@router.get("/experiments", summary="Phase 13: Append-only persistent experiment registry")
async def get_experiment_registry(
    limit: int = Query(50, ge=1, le=500),
    model: Optional[str] = None,
):
    try:
        tracker = get_experiment_tracker()
        all_exps = tracker.get_all_experiments()
        if model:
            all_exps = [e for e in all_exps if e.get("model", "").lower() == model.lower()]
        return {"status": "success", "total": len(all_exps), "data": all_exps[-limit:]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load experiment registry: {str(e)}")


# 14. Full Research Manuscript Report
@router.get("/report", summary="Phase 16: Comprehensive research synthesis report (Markdown or JSON)")
async def get_research_report(
    format: str = Query("json", description="Output format: 'json' or 'markdown'"),
):
    try:
        md_file = "results/research_report.md"
        if not os.path.exists(md_file):
            generate_full_research_report()

        with open(md_file, "r", encoding="utf-8") as f:
            md_text = f.read()

        if format.lower() == "markdown" or format.lower() == "md":
            return PlainTextResponse(content=md_text, media_type="text/markdown")

        return {
            "status": "success",
            "title": "Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction",
            "markdown_content": md_text,
            "generated_at": datetime.utcnow().isoformat() + "Z",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load research report: {str(e)}")
