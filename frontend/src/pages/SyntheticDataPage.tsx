import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { CTGANSection } from '../components/research/CTGANSection'
import { SyntheticDataSection } from '../components/research/SyntheticDataSection'
import { WhySyntheticDataSection } from '../components/research/WhySyntheticDataSection'

export const SyntheticDataPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Generative Deep Learning"
        title="Conditional Tabular GAN (CTGAN) & Synthetic Data"
        subtitle="Synthesizing multi-modal clinical biomarker records with Variational Gaussian Mixture mode-specific normalization and PacGAN discriminator stabilization."
        badge="N = 109,778 SYNTHETIC SAMPLES"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Generative Motivation */}
        <WhySyntheticDataSection />

        {/* CTGAN Architecture & Flow */}
        <CTGANSection />

        {/* 4-Tab Interactive Quality & Privacy Audit */}
        <SyntheticDataSection />
      </div>
    </div>
  )
}
