import React from 'react'
import { AlertTriangle, Database, HelpCircle, Lock, TrendingDown } from 'lucide-react'

const challenges = [
  {
    icon: Database,
    title: 'Limited Dataset Size',
    desc: 'Healthcare datasets can be limited in size due to privacy regulations, collection costs, and institutional barriers.',
  },
  {
    icon: HelpCircle,
    title: 'Missing & Imbalanced Data',
    desc: 'Clinical data can contain missing values and imbalanced distributions, making it difficult for models to learn reliable patterns.',
  },
  {
    icon: TrendingDown,
    title: 'Training Data Constraints',
    desc: 'Machine learning models can struggle when training data is limited, leading to overfitting and poor generalization on unseen patients.',
  },
  {
    icon: Lock,
    title: 'Black-Box Predictions',
    desc: 'Black-box predictions can be difficult to interpret, making it hard for clinicians and researchers to trust or validate model outputs.',
  },
  {
    icon: AlertTriangle,
    title: 'Quantity ≠ Quality',
    desc: 'Simply increasing data quantity does not guarantee better model performance. The augmentation strategy must be carefully designed and evaluated.',
  },
]

/**
 * ChallengeSection — "The Challenge" section explaining the research problem in a two-column layout.
 */
export const ChallengeSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: Visual */}
          <div>
            <div className="sticky top-32">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight mb-4">
                The Challenge
              </h2>
              <p className="text-base text-[#4A5550] leading-relaxed font-sans mb-8 max-w-md">
                Building reliable cardiovascular risk models faces fundamental obstacles at the intersection of data availability, model complexity, and clinical transparency.
              </p>

              {/* Illustration: Abstract data challenge visual */}
              <div className="bg-gradient-to-br from-[#17352D] to-[#23493E] rounded-2xl p-8 relative overflow-hidden shadow-elevated">
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="chal-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#chal-grid)" />
                </svg>

                <div className="relative z-10 space-y-4">
                  {/* Mini data quality bars */}
                  <div className="text-xs font-mono text-[#D9C7A5] uppercase tracking-wider mb-3">Data Quality Challenges</div>
                  {[
                    { label: 'Completeness', pct: 68, color: '#C87868' },
                    { label: 'Balance', pct: 45, color: '#C87868' },
                    { label: 'Volume', pct: 35, color: '#C87868' },
                    { label: 'Interpretability', pct: 30, color: '#C87868' },
                  ].map((bar, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-white/80">{bar.label}</span>
                        <span className="text-[#D9C7A5] font-mono">{bar.pct}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${bar.pct}%`, backgroundColor: bar.color }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <div className="text-[11px] text-white/50 font-sans">These gaps motivate our research approach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Challenge cards */}
          <div className="space-y-5">
            {challenges.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 shadow-subtle hover:shadow-elevated hover:border-[#C87868]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#C87868]/10 border border-[#C87868]/20 flex items-center justify-center shrink-0 group-hover:bg-[#C87868]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#C87868]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17352D] font-sans mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
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
