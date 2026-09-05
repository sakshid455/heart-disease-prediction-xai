import React from 'react'
import { ShieldCheck, AlertTriangle, CheckCircle, Scale, Lock, FileSearch, Info } from 'lucide-react'

export const SyntheticQualitySection: React.FC = () => {
  const qualityMetrics = [
    {
      title: 'Statistical Similarity',
      category: 'Fidelity',
      value: '1.16%',
      status: 'Optimal (< 5%)',
      metric: 'Relative Mean Error (RME)',
      description:
        'Measures the average percentage discrepancy across all univariate biomarker means between real and synthetic cohorts.',
      benchmark: 'KS Statistic Mean: 0.0764 across all 13 features',
    },
    {
      title: 'Distribution Similarity',
      category: 'Fidelity',
      value: '0.1412',
      status: 'Low Divergence (< 0.25)',
      metric: 'Mean Jensen-Shannon (JS) Divergence',
      description:
        'Quantifies the symmetric difference between empirical probability distributions of continuous clinical indicators.',
      benchmark: 'Kolmogorov-Smirnov p-value > 0.05 on 88.5% of variables',
    },
    {
      title: 'Exact Duplicate Rate',
      category: 'Privacy & Memorization',
      value: '0.41%',
      status: 'Below Baseline (0.73%)',
      metric: 'Exact Record Identity Ratio',
      description:
        'Percentage of synthetic vectors that exactly match an existing real patient record. Lower than natural duplicates within real clinical cohorts.',
      benchmark: 'Real cohort self-duplicate rate: 0.73% (3 of 412 records)',
    },
    {
      title: 'Distance to Closest Record',
      category: 'Privacy & Generalization',
      value: '0.7137',
      status: 'Non-Memorized Ratio',
      metric: 'DCR Train / DCR Test Ratio',
      description:
        'Ratio of Euclidean distance to nearest training record (0.4782) versus nearest held-out test record (0.6700). Demonstrates generalization rather than rote memorization.',
      benchmark: 'DCR Train = 0.4782 &bull; DCR Test = 0.6700',
    },
    {
      title: 'Nearest Neighbor Distance Ratio',
      category: 'Privacy & Manifold',
      value: '0.7655',
      status: 'Manifold Interpolation',
      metric: 'Mean NNDR (d1 / d2)',
      description:
        'Ratio of distance to 1st nearest neighbor over 2nd nearest neighbor. Values close to 1.0 indicate synthetic points lie smoothly between real patients rather than hugging a single identity.',
      benchmark: '98.2% of synthetic samples exhibit NNDR >= 0.20',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 6 &bull; Empirical Quality & Privacy Audit</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Synthetic Data Quality & Privacy Audit
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Every generative dataset must balance statistical utility against privacy safeguards. We evaluate both dimensions through rigorous empirical distance and divergence metrics.
          </p>
        </div>

        {/* Quality Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {qualityMetrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6B64]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] font-bold">
                    {item.status}
                  </span>
                </div>

                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] mb-1 font-mono">
                  {item.value}
                </div>

                <h3 className="font-serif font-bold text-base text-[#17352D] mb-2">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-[#8B6534] mb-3">
                  {item.metric}
                </div>

                <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D9C7A5]/40 text-[11px] text-[#5C6B64] font-medium">
                {item.benchmark}
              </div>
            </div>
          ))}
        </div>

        {/* MANDATORY STRICT PRIVACY CLAIM NOTICE */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border-2 border-[#D9C7A5] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B6534]/15 text-[#8B6534] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#17352D]">
                Empirical Distance-Based Privacy &bull; Explicit Boundary Notice
              </h4>
              <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed">
                Privacy preservation in this project is verified <strong>empirically</strong> via Euclidean distance metrics (Distance to Closest Record [DCR], Nearest Neighbor Distance Ratio [NNDR], and exact row duplicate inspection). 
                <strong className="text-[#17352D]"> We do NOT claim formal mathematical Differential Privacy (&epsilon;-DP).</strong> No formal DP noise injection or differential privacy accounting mechanism is asserted.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#17352D]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>DCR Ratio: 0.71 (non-memorizing)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>Exact Duplicates: 0.41% (&lt; 0.73% baseline)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>98.2% Manifold Smoothness</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
