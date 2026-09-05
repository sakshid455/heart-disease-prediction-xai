import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const LimitationsSection: React.FC = () => {
  const limitations = [
    {
      num: '01',
      title: 'Limited Original Dataset Size & Scope',
      desc: 'While evaluated on a substantial clinical cohort (N=68,612) and standardized on the UCI benchmark (N=303), clinical observations reflect specific institutional practices and demographic contexts.',
      tag: 'Demographic Scope',
    },
    {
      num: '02',
      title: 'External Multi-Center Validation Remains Future Work',
      desc: 'All models were evaluated strictly on held-out quarantined test partitions. Prospective cross-institutional clinical validation on heterogeneous hospital EHRs remains necessary.',
      tag: 'Clinical Transfer',
    },
    {
      num: '03',
      title: 'Privacy Evaluation Is Empirical',
      desc: 'Privacy auditing relies on empirical duplicate match rates, distance-to-closest-record (DCR), and nearest neighbor distance ratios. Formal (ε, δ)-differential privacy is not claimed by the current implementation.',
      tag: 'Privacy Framework',
    },
    {
      num: '04',
      title: 'Statistical Quality Does Not Automatically Imply Clinical Validity',
      desc: 'Low Wasserstein distance (W1 = 0.0624) proves marginal distribution and correlation matrix fidelity, but does not guarantee that every synthetic patient combination reflects plausible clinical pathophysiology.',
      tag: 'Clinical Grounding',
    },
    {
      num: '05',
      title: 'Results Depend on Evaluated Datasets & Models',
      desc: 'The observed +7.29% sensitivity gain and 200% peak augmentation ratio are empirical outcomes under the tested supervised classifiers (Logistic Regression, Random Forest, SVM, XGBoost) and may differ in other medical domains.',
      tag: 'Domain Boundary',
    },
  ]

  return (
    <section id="limitations" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="17"
          eyebrow="Scientific Transparency"
          title="Understanding the Limitations"
          description="Maintaining rigorous scientific honesty regarding experimental boundaries, empirical privacy evaluations, and clinical scope."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitations.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                    LIMITATION {item.num}
                  </span>
                  <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-snug">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E8EEE8] flex items-center gap-1.5 text-[11px] font-mono text-[#C87868]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Boundary Condition</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
