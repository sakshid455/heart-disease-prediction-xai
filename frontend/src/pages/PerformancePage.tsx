import React, { useEffect } from 'react'
import {
  PerformanceHero,
  KeyResultsSection,
  ModelComparisonSection,
  AugmentationAnalysisSection,
  PerformanceTradeoffSection,
  ConfusionMatrixSection,
  RocCurveSection,
  ResearchInsightSection,
} from '../components/performance'

export const PerformancePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Model Performance — CardioAI Research'
  }, [])

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <PerformanceHero />

      {/* Section 1 — Key Results */}
      <KeyResultsSection />

      {/* Section 2 — Model Comparison Table */}
      <ModelComparisonSection />

      {/* Section 3 — Augmentation Analysis Trajectory */}
      <AugmentationAnalysisSection />

      {/* Section 4 — Performance Trade-off Dynamic */}
      <PerformanceTradeoffSection />

      {/* Section 5 — Interactive Confusion Matrix */}
      <ConfusionMatrixSection />

      {/* Section 6 — ROC-AUC Curve Visualization */}
      <RocCurveSection />

      {/* Section 7 — Research Insight & Concluding Synthesis */}
      <ResearchInsightSection />
    </div>
  )
}
