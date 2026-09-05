import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { ResearchResultsSection } from '../components/research/ResearchResultsSection'
import { ImpactByNumbersSection } from '../components/research/ImpactByNumbersSection'

export const ResultsPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Empirical Research Findings"
        title="Comprehensive Experimental Results & Evidence"
        subtitle="Detailed statistical synthesis, multi-seed robustness analysis, distance auditing, and Benjamini-Hochberg FDR significance testing."
        badge="FROZEN EVIDENCE PACKAGE"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Core Statistical Scorecard */}
        <ImpactByNumbersSection />

        {/* 6 Structured Empirical Finding Cards & Core Conclusion */}
        <ResearchResultsSection />
      </div>
    </div>
  )
}
