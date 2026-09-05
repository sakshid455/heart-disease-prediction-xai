import React from 'react'
import { Database, Layers, GitCompare, BarChart3, Eye } from 'lucide-react'

const contributions = [
  { icon: Database, text: 'CTGAN synthetic data generation for clinical healthcare records' },
  { icon: Layers, text: 'Multiple augmentation levels evaluated (0% to 200% of original data)' },
  { icon: GitCompare, text: 'Multiple ML models benchmarked across augmentation strategies' },
  { icon: BarChart3, text: 'Comprehensive performance comparison with statistical analysis' },
  { icon: Eye, text: 'SHAP explanations ensuring transparency and interpretability' },
]

/**
 * ContributionSection — Highlighted section explaining the project's research contribution.
 */
export const ContributionSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#17352D] via-[#1A3D33] to-[#0F2A23] border-b border-[#D9C7A5]/20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/20 border border-[#3D8068]/30 text-[11px] font-bold tracking-[0.15em] uppercase text-[#D9C7A5] font-sans">
            Research Contribution
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            "Adaptive CTGAN-Based Synthetic Data Augmentation for Explainable Heart Disease Prediction"
          </h2>

          <p className="text-base sm:text-lg text-[#D8E2D8] leading-relaxed font-sans max-w-2xl mx-auto">
            This research project contributes a systematic framework that bridges synthetic data generation, adaptive augmentation strategies, and explainable artificial intelligence for cardiovascular risk assessment.
          </p>

          {/* Contribution points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto">
            {contributions.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-left hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3D8068]/20 border border-[#3D8068]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#3D8068]" />
                    </div>
                    <p className="text-sm text-[#E8EEE8]/90 leading-relaxed font-sans">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
