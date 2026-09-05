import React from 'react'
import { Compass, Sparkles, ShieldCheck, HeartPulse, Scale, Database, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const FutureWorkSection: React.FC = () => {
  const directions = [
    {
      icon: Database,
      title: 'Larger Multi-Center Cohorts',
      description:
        'Expanding validation from the 303-patient Cleveland benchmark to contemporary population registries such as the UK Biobank (N > 500,000), All of Us Research Program, and MIMIC-IV intensive care databases.',
    },
    {
      icon: Compass,
      title: 'Global External Validation',
      description:
        'Conducting rigorous out-of-domain cross-dataset testing on cohorts from diverse geographic and socioeconomic regions to quantify model transferability and domain adaptation robustness.',
    },
    {
      icon: Scale,
      title: 'Demographic Fairness & Parity Analysis',
      description:
        'Evaluating whether synthetic augmentation equalizes or exacerbates disparities across biological sex, older age strata, and underrepresented baseline biomarker profiles.',
    },
    {
      icon: ShieldCheck,
      title: 'Formal Differential Privacy (DP-CTGAN)',
      description:
        'Transitioning from empirical distance-based privacy metrics (DCR, NNDR) to formal mathematical (ε, δ)-Differential Privacy using noisy stochastic gradient descent (DP-SGD) and Renyi DP accountant bounds.',
    },
    {
      icon: HeartPulse,
      title: 'Prospective Clinical Usability Trials',
      description:
        'Conducting structured physician-in-the-loop qualitative usability audits to assess whether interactive SHAP waterfall explanations improve clinician diagnostic efficiency or diagnostic confidence.',
    },
    {
      icon: Sparkles,
      title: 'Tabular Diffusion Models (TabDDPM)',
      description:
        'Exploring continuous and score-based generative diffusion models for tabular data (e.g. TabDDPM) to evaluate whether reverse diffusion processes yield sharper correlation modeling than adversarial minimax networks.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 11 &bull; Research Roadmap</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Future Research Horizons
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            The trajectory of generative modeling and explainable machine learning in cardiovascular medicine extends across six key research frontiers.
          </p>
        </div>

        {/* 6 Future Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {directions.map((d, idx) => {
            const Icon = d.icon
            return (
              <div
                key={idx}
                className="bg-[#FAF8F4] rounded-2xl p-6 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#17352D] text-[#D9C7A5] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#17352D] mb-2">
                    {d.title}
                  </h3>

                  <p className="text-xs text-[#4A5550] leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Concluding CTA Bar */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#17352D]">
              Explore the Project&rsquo;s Interactive Modules
            </h4>
            <p className="text-xs text-[#5C6B64]">
              Inspect the empirical benchmarks, evaluate synthetic data quality, or simulate patient predictions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/ctgan"
              className="px-4 py-2 rounded-xl bg-white border border-[#D9C7A5] text-[#17352D] text-xs font-semibold hover:bg-[#FAF8F4] transition-all shadow-sm"
            >
              CTGAN Lab
            </Link>
            <Link
              to="/performance"
              className="px-4 py-2 rounded-xl bg-white border border-[#D9C7A5] text-[#17352D] text-xs font-semibold hover:bg-[#FAF8F4] transition-all shadow-sm"
            >
              Model Performance
            </Link>
            <Link
              to="/prediction"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all shadow-subtle"
            >
              <span>Try Prediction</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
