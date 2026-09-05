import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { LimitationsSection } from '../components/research/LimitationsSection'
import { FutureResearchSection } from '../components/research/FutureResearchSection'

export const FutureWorkPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Critical Appraisal & Trajectory"
        title="Research Limitations & Prospective Roadmap"
        subtitle="Transparent evaluation of study boundary conditions and future directions in multi-center validation, differential privacy, and multimodal modeling."
        badge="FUTURE DIRECTIONS"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* 5 Honest Research Limitations */}
        <LimitationsSection />

        {/* 4-Phase Connected Future Roadmap */}
        <FutureResearchSection />
      </div>
    </div>
  )
}
