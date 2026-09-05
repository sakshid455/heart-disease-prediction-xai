import React from 'react'
import {
  TrendingUp,
  Sparkles,
  Sliders,
  Scale,
  Lightbulb,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const ResearchResultsSection: React.FC = () => {
  const findings = [
    {
      num: '01',
      title: 'Predictive Performance Expansion',
      conclusion: 'Under evaluated experimental conditions, CTGAN synthetic augmentation systematically expands classifier sensitivity (+7.29% recall in Logistic Regression).',
      metric: 'Recall: 66.58% → 73.87%',
      icon: <TrendingUp className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '02',
      title: 'High Synthetic Tabular Fidelity',
      conclusion: 'Wasserstein distance auditing (W1 = 0.0624) and low mean correlation error (|Δr| = 0.0792) establish that CTGAN faithfully replicates clinical biomarker dependencies.',
      metric: 'W1 = 0.0624 · |Δr| = 0.0792',
      icon: <Sparkles className="w-5 h-5 text-[#17352D]" />,
    },
    {
      num: '03',
      title: 'Diminishing Precision Returns',
      conclusion: 'Beyond 100% augmentation, overall accuracy and precision plateau, demonstrating that synthetic data cannot be expanded indefinitely without domain-specific loss weighting.',
      metric: 'Peak F1 = 72.39% @ 50% XGBoost',
      icon: <Sliders className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '04',
      title: 'Precision–Recall Trade-off Shift',
      conclusion: 'Generative augmentation populates peripheral boundary regions, effectively shifting decision thresholds to prioritize capturing true positive cardiovascular cases.',
      metric: 'Missed cases reduced by 21.8%',
      icon: <Scale className="w-5 h-5 text-[#17352D]" />,
    },
    {
      num: '05',
      title: 'Attribution Hierarchy Concordance',
      conclusion: 'SHAP game-theoretic analysis proves strong global feature importance preservation (Spearman ρ = +0.8455, p = 1.05 × 10⁻³), confirming biological logic is preserved.',
      metric: 'ρ = +0.8455 (p < 0.005)',
      icon: <Lightbulb className="w-5 h-5 text-[#3D8068]" />,
    },
    {
      num: '06',
      title: 'Empirical Privacy & Manifold Spacing',
      conclusion: 'Distance-to-closest-record (DCR = 0.4782) and duplicate rates below real baseline confirm synthetic samples do not replicate or memorize individual training records.',
      metric: 'Duplicate Rate: 0.4117%',
      icon: <ShieldCheck className="w-5 h-5 text-[#17352D]" />,
    },
  ]

  return (
    <section id="results" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="14"
          eyebrow="Empirical Discoveries"
          title="What Did We Discover?"
          description="Six core empirical findings synthesized from 28 benchmark runs and multi-seed robustness evaluations, presented with scientifically cautious framing."
        />

        {/* Core Scientific Conclusion Hero Banner */}
        <div className="bg-gradient-to-br from-[#17352D] via-[#102721] to-[#23493E] text-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-[#D9C7A5]/40 mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D9C7A5]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9C7A5]">
              Core Empirical Synthesis
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
            Adaptive CTGAN augmentation expands clinical screening sensitivity without compromising biomarker interpretability.
          </h3>

          <p className="text-sm sm:text-base text-[#E8EEE8] leading-relaxed font-normal max-w-3xl">
            Under the evaluated experimental conditions, incorporating conditional generative synthetic data shifts classifier decision thresholds toward higher sensitivity (+7.29% recall in Logistic Regression). Game-theoretic SHAP auditing confirms that biomarker attributions remain biologically plausible (ρ = +0.8455), while distance-to-closest-record metrics indicate non-trivial manifold spacing.
          </p>
        </div>

        {/* 6 Finding Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {findings.map((f) => (
            <div
              key={f.num}
              className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                    FINDING {f.num}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-center">
                    {f.icon}
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-snug">
                  {f.title}
                </h4>

                <p className="mt-2 text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal">
                  {f.conclusion}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8EEE8] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#4A5550]">Evidence:</span>
                <span className="font-bold text-[#3D8068]">{f.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
