import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { AdaptiveAugmentationSection } from '../components/research/AdaptiveAugmentationSection'
import { AugmentationAdvisorSection } from '../components/research/AugmentationAdvisorSection'

export const AugmentationPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Parametric Scaling Study"
        title="Adaptive Synthetic Data Augmentation"
        subtitle="Evaluating 7 progressive augmentation ratios from 0% to 200% across 4 classifier architectures to identify precision-recall inflection points."
        badge="0% TO 200% CONTINUUM"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Core Augmentation Interactive Visualizer & Tradeoff Analysis */}
        <AdaptiveAugmentationSection />

        {/* Objective-Driven Augmentation Advisor */}
        <AugmentationAdvisorSection />
      </div>
    </div>
  )
}
