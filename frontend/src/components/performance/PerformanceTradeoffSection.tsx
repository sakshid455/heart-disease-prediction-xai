import React from 'react'
import { Scale, AlertCircle, TrendingUp, CheckCircle, ShieldAlert } from 'lucide-react'

export const PerformanceTradeoffSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B6534]/15 text-[#8B6534] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 4 &bull; Clinical Trade-Off Analysis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            The Augmentation Trade-Off Dynamic
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            A key scientific finding of this investigation is that <strong>synthetic data augmentation does not act as a uniform &ldquo;free boost&rdquo; across all metrics</strong>. 
            Instead, scaling synthetic samples introduces a distinct trade-off between clinical sensitivity and positive predictive precision.
          </p>
        </div>

        {/* 2-Column Comparative Dynamics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Card 1: The Sensitivity Gain (Recall) */}
          <div className="bg-white rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                  Observed Benefit
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] font-bold">
                  Recall +7.14 pp
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#17352D] mb-3">
                Higher Sensitivity & Screening Recall
              </h3>

              <p className="text-sm text-[#4A5550] leading-relaxed mb-5">
                As CTGAN synthetic records are added (75% to 200%), the model encounters more synthetic variations of borderline pathological profiles. This expands the classifier&rsquo;s decision boundaries, driving test recall from <strong>89.29% to 96.43%</strong>.
              </p>

              <div className="space-y-2.5 bg-[#FAF8F4] p-4 rounded-xl border border-[#D9C7A5]/40 text-xs">
                <div className="flex items-start gap-2 text-[#17352D]">
                  <CheckCircle className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <span><strong>Drastically fewer missed diagnoses:</strong> False negatives drop from 3 cases to only 1 case on held-out tests.</span>
                </div>
                <div className="flex items-start gap-2 text-[#17352D]">
                  <CheckCircle className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
                  <span><strong>Sub-population coverage:</strong> Rare combinations of atypical chest pain and elevated cholesterol receive adequate representation.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9C7A5]/40 text-xs text-[#5C6B64]">
              Ideal clinical setting: <em>First-line preventative screening clinics where missing a cardiac condition is high risk.</em>
            </div>
          </div>

          {/* Card 2: The Precision Trade-off */}
          <div className="bg-white rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6534]">
                  Research Observation
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FFF2DE] text-[#8B6534] font-bold">
                  Precision Plateau / Dip
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#17352D] mb-3">
                Marginal Precision Dilution
              </h3>

              <p className="text-sm text-[#4A5550] leading-relaxed mb-5">
                Because CTGAN introduces generative variance along decision margins, very high augmentation ratios (150% to 200%) can lead the model to flag more borderline patients as potentially positive, resulting in a moderate increase in false alarms.
              </p>

              <div className="space-y-2.5 bg-[#FAF8F4] p-4 rounded-xl border border-[#D9C7A5]/40 text-xs">
                <div className="flex items-start gap-2 text-[#17352D]">
                  <AlertCircle className="w-4 h-4 text-[#8B6534] shrink-0 mt-0.5" />
                  <span><strong>Synthetic boundary density:</strong> Overpopulating sparse regions can blur clean separation margins in simple linear classifiers.</span>
                </div>
                <div className="flex items-start gap-2 text-[#17352D]">
                  <AlertCircle className="w-4 h-4 text-[#8B6534] shrink-0 mt-0.5" />
                  <span><strong>Precision variance:</strong> In Logistic Regression, precision dropped from 80.0% to 78.8% at 200% augmentation.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9C7A5]/40 text-xs text-[#5C6B64]">
              Ideal clinical setting: <em>Confirmatory diagnostic testing where unnecessary invasive procedures must be minimized.</em>
            </div>
          </div>

        </div>

        {/* Highlighted Research Insight Box */}
        <div className="bg-[#17352D] rounded-2xl p-6 sm:p-8 text-[#F7F4ED] shadow-elevated">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D9C7A5]/20 text-[#D9C7A5] flex items-center justify-center shrink-0 mt-0.5">
              <Scale className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-white">
                No Single Augmentation Ratio is Universally Optimal
              </h4>
              <p className="text-xs sm:text-sm text-[#F7F4ED]/80 leading-relaxed max-w-3xl">
                Rather than treating 200% or 100% as an absolute standard, the optimal synthetic data ratio depends strictly on the <strong>deployment objective</strong>. 
                When the cost of a false negative is severe (early coronary detection), higher ratios (150%–200%) optimize patient safety. When downstream resources are constrained, parity augmentation (100%) or baseline training maintains peak precision.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
