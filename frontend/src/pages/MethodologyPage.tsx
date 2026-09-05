import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { MethodologySection } from '../components/research/MethodologySection'

export const MethodologyPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Reproducible Protocol"
        title="12-Stage Experimental Research Methodology"
        subtitle="A step-by-step audit of data quarantine, conditional generative synthesis, parametric scaling, and explainability verification."
        badge="STRICT LEAKAGE ISOLATION"
      />

      <div className="py-12 md:py-16">
        <MethodologySection />
      </div>
    </div>
  )
}
