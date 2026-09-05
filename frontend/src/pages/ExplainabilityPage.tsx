import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { ExplainabilitySection } from '../components/research/ExplainabilitySection'

export const ExplainabilityPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Game-Theoretic Interpretability"
        title="Explainable AI & Feature Attribution (SHAP)"
        subtitle="Verifying that CTGAN data augmentation preserves biological feature importance hierarchies and providing patient-level risk factor attributions."
        badge="SPEARMAN ρ = +0.8455 (p = 1.05 × 10⁻³)"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Core SHAP Concept, Local Patient Waterfall, and Global Importance */}
        <ExplainabilitySection />
      </div>
    </div>
  )
}
