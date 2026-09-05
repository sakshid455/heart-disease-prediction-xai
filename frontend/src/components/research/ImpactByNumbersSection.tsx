import React from 'react'
import { Database, Layers, Activity, TrendingUp, Award, ShieldCheck, Sparkles, Lightbulb } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const ImpactByNumbersSection: React.FC = () => {
  const statCards = [
    {
      number: '68,612',
      label: 'Curated Clinical Cohort',
      sub: '303 in UCI Benchmark',
      icon: <Database className="w-5 h-5 text-[#17352D]" />,
      desc: 'Quarantined real patient observations across continuous & categorical biomarkers.',
    },
    {
      number: '109,778',
      label: 'Synthetic Records Pool',
      sub: '200% Generation Reservoir',
      icon: <Layers className="w-5 h-5 text-[#3D8068]" />,
      desc: 'Synthesized via conditional CTGAN trained exclusively on the training split.',
    },
    {
      number: '+7.29%',
      label: 'Sensitivity Surge (Recall)',
      sub: '66.58% → 73.87%',
      icon: <TrendingUp className="w-5 h-5 text-[#3D8068]" />,
      desc: 'Observed sensitivity gain on held-out test cohort under 200% augmentation.',
    },
    {
      number: '0.8053',
      label: 'Peak ROC-AUC Score',
      sub: 'XGBoost Baseline',
      icon: <Activity className="w-5 h-5 text-[#17352D]" />,
      desc: 'High rank-order discriminative capability preserved across all model families.',
    },
    {
      number: '200%',
      label: 'Max Augmentation Ratio',
      sub: '7 Evaluated Ratios (0–200%)',
      icon: <Award className="w-5 h-5 text-[#C4AE88]" />,
      desc: 'Systematic parametric scaling revealing the exact precision-recall inflection point.',
    },
    {
      number: 'ρ = +0.8455',
      label: 'SHAP Rank Concordance',
      sub: 'p = 1.05 × 10⁻³ (FDR q < 0.05)',
      icon: <Lightbulb className="w-5 h-5 text-[#3D8068]" />,
      desc: 'Spearman rank stability confirming synthetic data does not corrupt feature logic.',
    },
    {
      number: '0.4117%',
      label: 'Exact Duplicate Match Rate',
      sub: 'Natural Baseline: 0.7342%',
      icon: <ShieldCheck className="w-5 h-5 text-[#17352D]" />,
      desc: 'Empirical distance auditing confirming smooth manifold spacing without memorization.',
    },
    {
      number: '140',
      label: 'Repeated Replications',
      sub: '5-Seed Robustness Audit',
      icon: <Sparkles className="w-5 h-5 text-[#3D8068]" />,
      desc: 'Cross-seed evaluation demonstrating metric stability with variance CV < 0.6%.',
    },
  ]

  return (
    <section id="impact-numbers" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="08"
          eyebrow="Empirical Quantitative Scorecard"
          title="Impact by the Numbers"
          description="Key verified experimental metrics and quantitative outcomes establishing the empirical foundation of the research."
        />

        {/* 8-Card Quantitative Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[#4A5550]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
                    {stat.sub}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>

                <div className="font-serif text-3xl font-bold text-[#17352D] tracking-tight">
                  {stat.number}
                </div>

                <h4 className="text-sm font-bold text-[#17352D] mt-1">
                  {stat.label}
                </h4>

                <p className="mt-2 text-xs text-[#4A5550] leading-relaxed font-normal">
                  {stat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8EEE8] text-[10px] font-mono text-[#4A5550]">
                Verified in Frozen Results
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
