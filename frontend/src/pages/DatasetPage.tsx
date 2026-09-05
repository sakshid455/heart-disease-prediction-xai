import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { DatasetSection } from '../components/research/DatasetSection'
import { DataPreparationSection } from '../components/research/DataPreparationSection'

export const DatasetPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Clinical Cohort & Preprocessing"
        title="Dataset Architecture & Preprocessing"
        subtitle="Exploring the multi-dimensional clinical biomarker space, missing value auditing, and strict data leakage prevention protocols."
        badge="N = 303 BENCHMARK / 68,612 COHORT"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Section 1: 14-Feature Dataset Explorer */}
        <DatasetSection />

        {/* Section 2: Data Preparation & Leakage Isolation */}
        <DataPreparationSection />
      </div>
    </div>
  )
}
