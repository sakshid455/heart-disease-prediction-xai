import React from 'react'
import { Sparkles, Sliders, Cpu, Lightbulb, ShieldCheck, Database, HelpCircle, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const ResearchContributionSection: React.FC = () => {
  const contributions = [
    {
      num: '01',
      title: 'Synthetic Data via CTGAN',
      desc: 'Deep generative synthesis of 109,778 patient observations using mode-specific normalization and PacGAN discriminator stabilization.',
      tag: 'Generative Synthesis',
      icon: <Sparkles className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '02',
      title: 'Systematic Augmentation Scaling',
      desc: 'Empirical benchmarking across 7 progressive ratios (0% to 200%) uncovering the exact mathematical boundary of sensitivity expansion.',
      tag: 'Parametric Scaling',
      icon: <Sliders className="w-5 h-5 text-[#17352D]" />,
    },
    {
      num: '03',
      title: 'Multi-Model Comparative Audit',
      desc: 'Rigorous cross-architecture validation across 4 model families (Logistic Regression, Random Forest, SVM, XGBoost) over 28 benchmark runs.',
      tag: 'Supervised ML',
      icon: <Cpu className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '04',
      title: 'Explainable AI with SHAP',
      desc: 'Verifying game-theoretic feature attribution concordance (Spearman ρ = +0.8455) to ensure synthetic augmentation preserves biological logic.',
      tag: 'Model Interpretability',
      icon: <Lightbulb className="w-5 h-5 text-[#17352D]" />,
    },
    {
      num: '05',
      title: 'Empirical Quality & Privacy Auditing',
      desc: 'Wasserstein distance (W1 = 0.0624) and Distance-to-Closest-Record (DCR = 0.4782) verifying zero test set memorization or leakage.',
      tag: 'Statistical Auditing',
      icon: <ShieldCheck className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '06',
      title: 'Objective-Driven Recommendation',
      desc: 'Developing an automated decision engine matching clinical screening objectives (High Sensitivity vs. High Precision) to empirical ratios.',
      tag: 'Adaptive Engine',
      icon: <Database className="w-5 h-5 text-[#17352D]" />,
    },
  ]

  return (
    <section id="contributions" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="15"
          eyebrow="Scientific Distinction"
          title="What Makes This Research Different?"
          description="Six core computational and translational contributions distinguishing this study from conventional tabular classification benchmarks."
        />

        {/* Highlighted Primary Research Question Box */}
        <div className="mb-14 bg-gradient-to-br from-[#17352D] via-[#102721] to-[#23493E] text-white rounded-3xl p-8 sm:p-10 shadow-elevated border border-[#D9C7A5]/40 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/40 border border-[#3D8068]/60 text-[#D9C7A5] text-xs font-mono font-semibold uppercase">
            <HelpCircle className="w-4 h-4 text-[#D9C7A5]" />
            <span>Primary Research Question</span>
          </div>

          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug tracking-tight">
            “Can synthetic data augmentation improve heart disease prediction, and how should augmentation intensity be selected?”
          </blockquote>

          <p className="text-xs sm:text-sm text-[#E8EEE8] leading-relaxed font-sans font-normal max-w-3xl pt-1">
            Rather than relying on arbitrary data volume expansion, this work proves that synthetic tabular augmentation exhibits predictable sensitivity-specificity trade-offs, requiring objective-aligned ratio selection.
          </p>
        </div>

        {/* 6 Minimal Contribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {contributions.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                    CONTRIBUTION {item.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-[#3D8068] uppercase">
                    {item.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 shadow-subtle flex items-center justify-center mb-4">
                  {item.icon}
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-snug">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E8EEE8] flex items-center gap-1.5 text-[11px] font-mono text-[#3D8068]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Empirically Evaluated</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
