import React, { useEffect } from 'react'
import {
  ResearchHero,
  DatasetSection,
  PreprocessingSection,
  CtganSection,
  AugmentationLevelsSection,
  MachineLearningModelsSection,
  EvaluationMetricsSection,
  XaiShapSection,
  CompleteArchitectureDiagram,
  ResearchQuestionsSection,
  LimitationsSection,
  FutureWorkSection,
} from '../components/research-methodology'

export const ResearchPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Research & Methodology — CardioAI'
  }, [])

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <ResearchHero />

      {/* Section 1 — Dataset */}
      <DatasetSection />

      {/* Section 2 — Preprocessing */}
      <PreprocessingSection />

      {/* Section 3 — CTGAN */}
      <CtganSection />

      {/* Section 4 — Adaptive Augmentation */}
      <AugmentationLevelsSection />

      {/* Section 5 — Machine Learning Models */}
      <MachineLearningModelsSection />

      {/* Section 6 — Evaluation Metrics */}
      <EvaluationMetricsSection />

      {/* Section 7 — Explainable AI (SHAP) */}
      <XaiShapSection />

      {/* Section 8 — Complete System Architecture */}
      <CompleteArchitectureDiagram />

      {/* Section 9 — Research Questions */}
      <ResearchQuestionsSection />

      {/* Section 10 — Limitations */}
      <LimitationsSection />

      {/* Section 11 — Future Work */}
      <FutureWorkSection />
    </div>
  )
}
