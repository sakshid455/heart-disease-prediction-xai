import React from 'react'
import { PageHero } from '../components/ui/PageHero'
import { ModelComparisonSection } from '../components/research/ModelComparisonSection'

export const ModelsPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <PageHero
        category="Supervised Classifiers"
        title="Machine Learning Classifiers & Comparative Benchmark"
        subtitle="Rigorous empirical evaluation of linear, bagging, margin-based, and boosting architectures trained on real vs. CTGAN-augmented clinical cohorts."
        badge="28 BENCHMARK RUNS"
      />

      <div className="py-12 md:py-16 space-y-16">
        {/* Model Comparison Cards, BarChart, and 28-Run Matrix */}
        <ModelComparisonSection />
      </div>
    </div>
  )
}
