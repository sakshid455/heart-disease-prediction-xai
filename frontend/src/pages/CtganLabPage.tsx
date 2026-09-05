import React, { useEffect } from 'react'
import {
  CtganHero,
  WhatIsCtganSection,
  WhySyntheticDataSection,
  GenerationPipelineSection,
  RealVsSyntheticTable,
  DistributionComparisonSection,
  SyntheticQualitySection,
  AdaptiveAugmentationSection,
} from '../components/ctgan'

export const CtganLabPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'CTGAN Synthetic Data Lab — CardioAI Research'
  }, [])

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <CtganHero />

      {/* Section 1 — What is CTGAN? */}
      <WhatIsCtganSection />

      {/* Section 2 — Why Synthetic Data? */}
      <WhySyntheticDataSection />

      {/* Section 3 — Generation Pipeline */}
      <GenerationPipelineSection />

      {/* Section 4 — Real vs Synthetic Comparison Table */}
      <RealVsSyntheticTable />

      {/* Section 5 — Distribution Comparison */}
      <DistributionComparisonSection />

      {/* Section 6 — Synthetic Data Quality & Privacy Audit */}
      <SyntheticQualitySection />

      {/* Section 7 — Adaptive Augmentation Trajectory */}
      <AdaptiveAugmentationSection />
    </div>
  )
}
