import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * ExplainableAISection — Visually impressive promotion section for XAI.
 * Left: Text content about explainability
 * Right: Mock SHAP waterfall visualization
 */
export const ExplainableAISection: React.FC = () => {
  const shapFeatures = [
    { name: 'ap_hi (Systolic BP)', value: +0.42, color: '#C87868' },
    { name: 'age', value: +0.31, color: '#C87868' },
    { name: 'cholesterol', value: +0.18, color: '#C87868' },
    { name: 'weight', value: +0.09, color: '#C87868' },
    { name: 'active', value: -0.15, color: '#3D8068' },
    { name: 'height', value: -0.08, color: '#3D8068' },
    { name: 'gluc', value: +0.06, color: '#C87868' },
    { name: 'smoke', value: -0.03, color: '#3D8068' },
  ]

  const maxAbsValue = Math.max(...shapFeatures.map(f => Math.abs(f.value)))

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#17352D] via-[#1A3D33] to-[#0F2A23] border-b border-[#D9C7A5]/20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/20 border border-[#3D8068]/30 text-[11px] font-bold tracking-[0.15em] uppercase text-[#D9C7A5] font-sans">
              Explainable AI
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-white tracking-tight leading-[1.12]">
              Don't Just Get a Prediction.{' '}
              <span className="block mt-1 text-[#C87868]">Understand Why.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#D8E2D8] leading-relaxed font-sans max-w-lg">
              Our system uses SHAP (SHapley Additive exPlanations) to identify the most important clinical features contributing to each individual prediction. Every decision is transparent, auditable, and grounded in game-theoretic attribution.
            </p>

            <div className="space-y-3 text-sm text-[#E8EEE8]/80 font-sans">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3D8068] mt-2 shrink-0" />
                <span>Individual feature attribution for every prediction</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C87868] mt-2 shrink-0" />
                <span>Waterfall charts show how each feature pushes the prediction</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D9C7A5] mt-2 shrink-0" />
                <span>Global feature importance analysis across the dataset</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/explainability"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#3D8068] hover:bg-[#326B57] text-white text-[15px] font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 border border-[#D9C7A5]/20"
              >
                <span>Explore Explainable AI</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Mock SHAP Visualization */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-elevated">
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="text-sm font-bold text-white font-sans">SHAP Feature Importance</div>
                <div className="text-xs text-[#D9C7A5] font-sans mt-0.5">Individual prediction breakdown</div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#C87868]/20 text-[#C87868] border border-[#C87868]/25">
                HIGH RISK
              </span>
            </div>

            {/* SHAP Bars */}
            <div className="space-y-3">
              {shapFeatures.map((feature, idx) => {
                const barWidth = (Math.abs(feature.value) / maxAbsValue) * 100
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-28 sm:w-36 text-right text-xs font-mono text-[#E8EEE8]/80 truncate shrink-0">
                      {feature.name}
                    </div>
                    <div className="flex-1 relative h-6 bg-white/5 rounded overflow-hidden">
                      <div
                        className="absolute top-0 h-full rounded transition-all duration-1000 ease-out"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: feature.color,
                          left: feature.value >= 0 ? '50%' : `${50 - barWidth}%`,
                          opacity: 0.85,
                        }}
                      />
                      {/* Center line */}
                      <div className="absolute top-0 left-1/2 w-px h-full bg-white/20" />
                    </div>
                    <div className="w-14 text-right text-xs font-mono font-bold shrink-0" style={{ color: feature.color }}>
                      {feature.value > 0 ? '+' : ''}{feature.value.toFixed(2)}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-6 text-xs font-sans text-[#E8EEE8]/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#C87868]" />
                <span>Increases Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#3D8068]" />
                <span>Decreases Risk</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
