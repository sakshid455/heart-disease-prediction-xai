import React from 'react'
import { Database, TrendingUp, Sliders, Eye } from 'lucide-react'

const objectives = [
  {
    icon: Database,
    title: 'Improve Data Availability',
    desc: 'Use CTGAN to generate synthetic healthcare records that expand limited clinical datasets while preserving statistical integrity.',
    color: '#17352D',
  },
  {
    icon: TrendingUp,
    title: 'Improve Predictive Performance',
    desc: 'Evaluate whether augmented training data leads to measurable improvements in classification accuracy, sensitivity, and specificity.',
    color: '#3D8068',
  },
  {
    icon: Sliders,
    title: 'Find Optimal Augmentation',
    desc: 'Systematically test augmentation ratios from 0% to 200% to identify the optimal balance between data quantity and model quality.',
    color: '#C87868',
  },
  {
    icon: Eye,
    title: 'Increase Model Interpretability',
    desc: 'Apply SHAP explainability to verify that augmentation preserves physiologically meaningful feature attributions.',
    color: '#3D8068',
  },
]

/**
 * ObjectivesSection — Four project objective cards.
 */
export const ObjectivesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Research Goals
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Project Objectives
          </h2>
        </div>

        {/* Four cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {objectives.map((obj, idx) => {
            const Icon = obj.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-7 shadow-subtle hover:shadow-elevated hover:border-[#3D8068]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: `${obj.color}10`,
                      border: `1.5px solid ${obj.color}25`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: obj.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#17352D] mb-2">
                      {obj.title}
                    </h3>
                    <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                      {obj.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
