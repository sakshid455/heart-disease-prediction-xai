import React from 'react'
import { Database, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const WhySyntheticDataSection: React.FC = () => {
  const visualPoints = [
    {
      num: '01',
      tag: 'DATA SCARCITY',
      title: 'Data Scarcity & Privacy Silos',
      desc: 'Healthcare data collection is strictly bounded by institutional firewalls, patient consent mandates, and collection logistics, leaving machine learning models with constrained training cohorts.',
      icon: <Database className="w-5 h-5 text-[#17352D]" />,
      detail: 'Small sample sizes lead to fragile decision boundaries and high false-negative rates.',
    },
    {
      num: '02',
      tag: 'SYNTHETIC GENERATION',
      title: 'Conditional Tabular Synthesis',
      desc: 'CTGAN provides a principled deep generative method to synthesize realistic tabular records, modeling complex multimodal continuous distributions and discrete clinical categories.',
      icon: <Sparkles className="w-5 h-5 text-[#3D8068]" />,
      detail: 'Expands the training reservoir by up to 200% without accessing real patient test records.',
    },
    {
      num: '03',
      tag: 'QUALITY VALIDATION',
      title: 'Empirical Quality & Privacy Auditing',
      desc: 'Generated records must not be accepted blindly. Synthetic distributions must be verified using Wasserstein distance (W1), correlation fidelity (|Δr|), and distance-to-closest-record (DCR).',
      icon: <ShieldCheck className="w-5 h-5 text-[#17352D]" />,
      detail: 'Verified Wasserstein W1 = 0.0624 and duplicate rate below natural cohort baselines.',
    },
  ]

  const keyReasons = [
    'Healthcare data can be difficult and expensive to collect.',
    'Clinical datasets may be relatively small or demographically imbalanced.',
    'Stringent patient privacy regulations can limit cross-institutional data sharing.',
    'Synthetic data can provide additional experimental samples to expand decision boundaries.',
    'Generated data must be statistically evaluated before machine learning deployment.',
  ]

  return (
    <section id="why-synthetic" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="02"
          eyebrow="Generative Motivation"
          title="Why Synthetic Healthcare Data?"
          description="Exploring the computational and empirical rationale for using conditional generative networks to augment clinical decision systems."
        />

        {/* Editorial Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-16">
          
          {/* Left: Narrative Overview */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] leading-snug tracking-tight">
              Expanding clinical training cohorts while safeguarding patient privacy.
            </h3>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans font-normal">
              In clinical machine learning, sample size directly dictates model robustness. However, healthcare institutions cannot simply pool patient records due to privacy mandates (HIPAA, GDPR) and ethical boundaries. Generative synthetic data offers a mathematically rigorous alternative: learning the underlying multidimensional manifold of patient biomarkers to generate novel, non-identifiable experimental records.
            </p>

            <div className="bg-[#E8EEE8]/60 border border-[#D8E2D8] rounded-2xl p-5 space-y-2 font-sans">
              <div className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                The Generative Premise
              </div>
              <p className="text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal">
                By sampling from a trained generator network rather than replicating raw patient rows, researchers can evaluate classifier performance across diverse augmentation intensities while ensuring strict separation from evaluation test splits.
              </p>
            </div>
          </div>

          {/* Right: Key Rationale Checkpoints */}
          <div className="lg:col-span-6 space-y-3.5 font-sans">
            <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068] mb-2">
              Foundational Clinical Rationale
            </div>

            <div className="space-y-3">
              {keyReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 bg-white border border-[#D9C7A5]/50 rounded-xl p-4 shadow-subtle hover:border-[#3D8068]/40 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#E8EEE8] text-[#17352D] flex items-center justify-center shrink-0 mt-0.5 border border-[#D8E2D8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3D8068]" />
                  </div>
                  <p className="text-xs sm:text-[14px] font-medium text-[#17352D] leading-snug">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Three Visual Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          {visualPoints.map((point) => (
            <div
              key={point.num}
              className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                    POINT {point.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-[#3D8068] uppercase">
                    {point.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 shadow-subtle flex items-center justify-center mb-4">
                  {point.icon}
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-snug">
                  {point.title}
                </h4>

                <p className="mt-2 text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8EEE8] text-[11px] font-mono text-[#17352D] bg-[#E8EEE8]/40 p-2.5 rounded-lg border border-[#D8E2D8]/60">
                {point.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
