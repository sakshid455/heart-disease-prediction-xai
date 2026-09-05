import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * ExplainableAIAboutSection — "Prediction Is Only Half the Story" with SHAP visualization.
 */
export const ExplainableAIAboutSection: React.FC = () => {
  const shapFeatures = [
    { name: 'ap_hi', label: 'Systolic BP', value: +0.42, color: '#C87868' },
    { name: 'age', label: 'Age', value: +0.31, color: '#C87868' },
    { name: 'cholesterol', label: 'Cholesterol', value: +0.18, color: '#C87868' },
    { name: 'weight', label: 'Weight', value: +0.09, color: '#C87868' },
    { name: 'active', label: 'Active', value: -0.15, color: '#3D8068' },
    { name: 'height', label: 'Height', value: -0.08, color: '#3D8068' },
  ]

  const maxAbs = Math.max(...shapFeatures.map((f) => Math.abs(f.value)))

  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans">
              Explainable AI
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
              Prediction Is Only Half the Story
            </h2>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans max-w-lg">
              A model should not only provide an output — researchers and users should be able to understand <strong className="text-[#17352D]">which features influenced that output</strong> and by how much.
            </p>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans max-w-lg">
              CardioAI uses <strong className="text-[#17352D]">SHAP</strong> (SHapley Additive exPlanations), a game-theoretic framework that assigns each feature a contribution score for every individual prediction. This transforms opaque model outputs into transparent, auditable decisions.
            </p>

            <div className="space-y-3 text-sm text-[#4A5550] font-sans">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C87868] mt-2 shrink-0" />
                <span>Features pushing the prediction toward <strong className="text-[#C87868]">higher risk</strong> are shown in red</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3D8068] mt-2 shrink-0" />
                <span>Features pushing toward <strong className="text-[#3D8068]">lower risk</strong> are shown in green</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/explainability"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3D8068] hover:text-[#17352D] transition-colors"
              >
                <span>Explore Explainability</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: SHAP Visualization */}
          <div className="bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 sm:p-8 shadow-elevated">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8EEE8]">
              <div>
                <div className="text-sm font-bold text-[#17352D] font-sans">SHAP Waterfall</div>
                <div className="text-xs text-[#4A5550] font-sans mt-0.5">Individual feature contributions</div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#C87868]/10 text-[#C87868] border border-[#C87868]/20">
                f(x) = 0.73
              </span>
            </div>

            <div className="space-y-3">
              {shapFeatures.map((feature, idx) => {
                const barWidth = (Math.abs(feature.value) / maxAbs) * 100
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-24 sm:w-28 text-right text-xs font-sans text-[#4A5550] truncate shrink-0">
                      {feature.label}
                    </div>
                    <div className="flex-1 relative h-7 bg-[#FAF8F4] rounded-lg border border-[#D9C7A5]/30 overflow-hidden">
                      {/* Center line */}
                      <div className="absolute top-0 left-1/2 w-px h-full bg-[#D9C7A5]/60" />
                      <div
                        className="absolute top-1 bottom-1 rounded"
                        style={{
                          width: `${barWidth / 2}%`,
                          backgroundColor: feature.color,
                          left: feature.value >= 0 ? '50%' : `${50 - barWidth / 2}%`,
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    <div
                      className="w-12 text-right text-xs font-mono font-bold shrink-0"
                      style={{ color: feature.color }}
                    >
                      {feature.value > 0 ? '+' : ''}{feature.value.toFixed(2)}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-[#E8EEE8] flex items-center justify-center gap-6 text-xs font-sans text-[#4A5550]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#C87868]" />
                <span>↑ Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#3D8068]" />
                <span>↓ Risk</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
