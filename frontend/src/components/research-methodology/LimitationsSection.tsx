import React from 'react'
import { AlertTriangle, ShieldAlert, FileText, Ban, CheckCircle } from 'lucide-react'

export const LimitationsSection: React.FC = () => {
  const limitations = [
    {
      title: 'Modest Primary Dataset Size',
      subtitle: 'N = 303 Retrospective Patient Records',
      description:
        'While the UCI Cleveland cohort is a gold-standard machine learning benchmark, 303 patient records represent a modest sample size relative to modern epidemiological registries. Statistical uncertainty intervals remain wider than in million-patient health systems.',
    },
    {
      title: 'Single Primary Geographic Cohort',
      subtitle: 'Potential Demographic & Referral Bias',
      description:
        'The primary clinical records originate from a single tertiary cardiovascular center collected during the late 20th century. Diagnostic practice, baseline cholesterol norms, and surgical thresholds have evolved substantially.',
    },
    {
      title: 'Inherent Synthetic Data Boundaries',
      subtitle: 'Generative Manifold Approximation',
      description:
        'CTGAN models the multivariate joint probability distribution present in the training set. It cannot infer biological interactions or novel clinical syndromes that were completely unobserved in the real source data.',
    },
    {
      title: 'Need for Multi-Center External Validation',
      subtitle: 'Cross-Institutional Generalizability',
      description:
        'Models trained and tested on splits from a single data collection protocol must be validated across diverse geographic, ethnic, socioeconomic, and contemporary electronic health record (EHR) systems before generalizability can be established.',
    },
    {
      title: 'Absence of Prospective Clinical Trials',
      subtitle: 'Offline In Silico Testing Only',
      description:
        'All reported performance metrics reflect offline, retrospective experimental benchmarks. The platform has not undergone prospective randomized clinical trials or medical device certification (FDA/CE-MDR), and cannot replace clinical judgment.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B6534]/15 text-[#8B6534] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 10 &bull; Scientific Transparency</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Methodological Limitations & Scientific Integrity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Responsible medical machine learning demands absolute candor regarding the boundaries of experimental research. We explicitly document the constraints governing this study.
          </p>
        </div>

        {/* Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {limitations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#8B6534] uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4 text-[#8B6534]" />
                  <span>Constraint 0{idx + 1}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-[#17352D] mb-1">
                  {item.title}
                </h3>

                <div className="text-xs text-[#5C6B64] font-mono mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs text-[#4A5550] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Clinical Claims Disclaimer */}
        <div className="bg-white p-5 rounded-2xl border-2 border-[#D9C7A5] flex items-start gap-4 text-xs sm:text-sm text-[#17352D]">
          <Ban className="w-5 h-5 text-[#C87868] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Explicit Policy on Clinical Claims: </strong>
            CardioAI does not claim medical diagnostic readiness, non-inferiority to cardiologists, or clinical superiority over standard risk calculators (e.g. Framingham, SCORE2, ACC/AHA ASCVD). The project is an academic investigation into synthetic data augmentation dynamics and explainability.
          </div>
        </div>

      </div>
    </section>
  )
}
