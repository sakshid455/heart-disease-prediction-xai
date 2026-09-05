import React from 'react'
import { Award, Zap, AlertCircle, TrendingUp, CheckCircle, ShieldAlert } from 'lucide-react'

export const KeyResultsSection: React.FC = () => {
  const metrics = [
    {
      label: 'Accuracy',
      value: '90.16%',
      sub: '55 of 61 test cases correctly classified',
      highlight: false,
    },
    {
      label: 'Precision',
      value: '84.38%',
      sub: 'Positive predictive value for cardiac risk',
      highlight: false,
    },
    {
      label: 'Recall (Sensitivity)',
      value: '96.43%',
      sub: '27 of 28 cardiac disease cases identified',
      highlight: true,
      badge: 'Peak Sensitivity',
    },
    {
      label: 'F1-Score',
      value: '90.00%',
      sub: 'Harmonic mean of precision & recall',
      highlight: false,
    },
    {
      label: 'ROC-AUC',
      value: '93.72%',
      sub: 'Area under receiver operating curve',
      highlight: true,
      badge: 'Strong Discrimination',
    },
  ]

  return (
    <section id="key-results" className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40 scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Section 1 &bull; Best Experimental Configuration</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
              Top Experimental Configuration
            </h2>
            <p className="mt-2 text-base text-[#4A5550] max-w-2xl">
              Across all evaluated model architectures and augmentation scaling ratios, the strongest empirical performance was achieved by <strong>XGBoost</strong> with <strong>200% CTGAN augmentation</strong>.
            </p>
          </div>

          {/* Model & Augmentation Badge Card */}
          <div className="bg-[#FAF8F4] border border-[#D9C7A5]/70 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#17352D] text-[#D9C7A5] flex items-center justify-center font-serif font-bold text-xl">
              <Zap className="w-6 h-6 text-[#D9C7A5]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64]">
                Architecture &bull; Scaling
              </div>
              <div className="font-serif text-xl font-bold text-[#17352D]">
                XGBoost @ 200% Augmentation
              </div>
              <div className="text-xs text-[#3D8068] font-medium mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D8068]" />
                <span>N = 726 Training Vectors (242 Real + 484 CTGAN)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                item.highlight
                  ? 'bg-[#17352D] text-[#F7F4ED] border-[#17352D] shadow-elevated'
                  : 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]/60 shadow-subtle hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      item.highlight ? 'text-[#D9C7A5]' : 'text-[#5C6B64]'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-[#D9C7A5]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div
                  className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2 font-mono ${
                    item.highlight ? 'text-white' : 'text-[#17352D]'
                  }`}
                >
                  {item.value}
                </div>
              </div>

              <div
                className={`text-xs pt-3 border-t leading-relaxed ${
                  item.highlight
                    ? 'border-white/20 text-white/80'
                    : 'border-[#D9C7A5]/40 text-[#5C6B64]'
                }`}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* MANDATORY RESEARCH DISCLAIMER NOTICE */}
        <div className="bg-[#FAF8F4] border border-[#D9C7A5]/70 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#8B6534]/15 text-[#8B6534] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-[#17352D]">
                Experimental Research Benchmark Results
              </h4>
              <p className="text-xs text-[#5C6B64] mt-0.5 max-w-2xl leading-relaxed">
                These figures represent offline experimental metrics evaluated on held-out retrospective test splits (N = 61). 
                They are presented to illustrate generative data augmentation dynamics and do <strong>NOT</strong> constitute certified diagnostic accuracy in live clinical environments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D9C7A5] text-[11px] font-bold text-[#17352D] shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
              <span>Verified Experimental Data</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
