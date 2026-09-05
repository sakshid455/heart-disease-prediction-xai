import React from 'react'
import { Database, Sparkles, Sliders, CheckCircle2, HelpCircle, ArrowDownRight } from 'lucide-react'
import { ResearchCard } from '../ui/ResearchCard'
import { SectionHeader } from '../ui/SectionHeader'

export const MotivationSection: React.FC = () => {
  const corePrinciples = [
    {
      title: 'Healthcare datasets can be relatively small',
      desc: 'Clinical cohorts are constrained by privacy regulations, patient consent, and collection logistics.',
    },
    {
      title: 'Machine learning models benefit from diverse training data',
      desc: 'Sufficient sample diversity is essential for robust decision boundaries and generalization.',
    },
    {
      title: 'Synthetic data can help expand training cohorts',
      desc: 'Generative models learn underlying multidimensional distributions to synthesize realistic records.',
    },
    {
      title: 'More synthetic data does not automatically mean better performance',
      desc: 'Oversaturating training distributions with synthetic samples can introduce noise and manifold drift.',
    },
    {
      title: 'Synthetic data must be statistically evaluated',
      desc: 'Generative fidelity requires rigorous density, distance, and correlation matrix verification.',
    },
    {
      title: 'Models must be evaluated across different augmentation levels',
      desc: 'Systematic scaling benchmarks are necessary to uncover the true precision-recall inflection point.',
    },
    {
      title: 'Predictions should remain clinically interpretable',
      desc: 'Biomarker attributions must preserve physiological plausibility and directional consistency.',
    },
  ]

  const motivationPillars = [
    {
      num: '01',
      tag: 'DATA SCARCITY',
      title: 'Data Scarcity',
      desc: 'Limited datasets can constrain machine learning experiments and impair model generalization across diverse clinical sub-populations.',
      icon: <Database className="w-5 h-5 text-navy-700" />,
      detail: 'Constrained sample sizes lead to fragile decision boundaries and high false negative rates in clinical screening.',
    },
    {
      num: '02',
      tag: 'SYNTHETIC DATA',
      title: 'Synthetic Data',
      desc: 'CTGAN provides a principled way to generate additional tabular records while preserving continuous and categorical distributions.',
      icon: <Sparkles className="w-5 h-5 text-accent-700" />,
      detail: 'Mode-specific normalization and conditional generator networks synthesize realistic patient biomarker profiles.',
    },
    {
      num: '03',
      tag: 'ADAPTIVE AUGMENTATION',
      title: 'Adaptive Augmentation',
      desc: 'The amount of synthetic data should be systematically evaluated rather than blindly maximized to avoid diminishing returns.',
      icon: <Sliders className="w-5 h-5 text-navy-700" />,
      detail: 'Empirical scaling from 0% to 200% reveals optimal performance thresholds tailored to specific clinical objectives.',
    },
  ]

  return (
    <section id="research" className="py-20 md:py-28 bg-canvas border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeader
          chapterNumber="01"
          eyebrow="Research Motivation & Context"
          title="Why This Research Matters"
          description="Addressing the fundamental trade-offs between generative synthetic data volume, classification sensitivity, and clinical explainability."
        />

        {/* Editorial Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Bold Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-l-4 border-accent-700 pl-5 sm:pl-6 py-2">
              <h3 className="text-3xl sm:text-4xl font-bold text-navy-900 leading-[1.2] tracking-tight">
                Healthcare data is valuable.
                <span className="block text-navy-500 font-normal mt-2">
                  But limited data creates challenges.
                </span>
              </h3>
            </div>

            <p className="text-[15px] text-navy-600 leading-relaxed">
              Cardiovascular disease remains the leading cause of mortality worldwide. While predictive machine learning algorithms offer immense screening potential, clinical data collection is inherently bounded by institutional silos, patient privacy mandates, and sampling imbalances.
            </p>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900 font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                The Core Research Dilemma
              </div>
              <p className="text-xs sm:text-[13px] text-navy-600 leading-relaxed">
                Prior literature routinely assumes that generating more synthetic samples universally improves predictive models. Our empirical research challenges this assumption by measuring the exact mathematical boundary where synthetic augmentation transitions from beneficial regularization to diminishing returns.
              </p>
            </div>
          </div>

          {/* Right Column: Structured Principles */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-navy-500 font-mono mb-2">
              Foundational Research Principles
            </div>

            <div className="space-y-3">
              {corePrinciples.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 bg-white border border-slate-200/90 rounded-xl p-4 shadow-subtle hover:border-slate-300 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center shrink-0 mt-0.5 border border-accent-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] sm:text-[15px] font-semibold text-navy-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-navy-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlighted Central Research Question Box */}
        <div className="mt-14 sm:mt-18">
          <div className="relative bg-gradient-to-r from-accent-900 to-navy-900 text-white rounded-2xl p-8 sm:p-12 shadow-elevated overflow-hidden">
            {/* Background Pattern Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-600/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent-800/80 border border-accent-600/40 text-accent-200 text-xs font-mono font-medium mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>PRIMARY INVESTIGATIVE HYPOTHESIS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                “How much synthetic data is actually useful?”
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                Rather than treating synthetic data generation as an uncontrolled volume maximizer, this study establishes an adaptive scaling framework to identify the precise augmentation ratio that maximizes clinical sensitivity while preserving model calibration, patient privacy, and explainable feature rankings.
              </p>
            </div>
          </div>
        </div>

        {/* Three Research Motivation Blocks Below */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {motivationPillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-white border border-slate-200/90 rounded-xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-2xl font-bold text-navy-300">
                    {pillar.num}
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 text-navy-700 border border-slate-200">
                    {pillar.tag}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>

                <h4 className="text-lg font-bold text-navy-900 tracking-tight">
                  {pillar.title}
                </h4>

                <p className="mt-2 text-sm text-navy-600 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-navy-500 leading-relaxed">
                {pillar.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
