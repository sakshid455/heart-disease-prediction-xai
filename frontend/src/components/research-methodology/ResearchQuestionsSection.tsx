import React from 'react'
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'

export const ResearchQuestionsSection: React.FC = () => {
  const questions = [
    {
      q: 'Can synthetic data improve prediction?',
      sub: 'Generative Augmentation Hypothesis',
      answer:
        'Yes. In sample-constrained clinical settings, CTGAN synthetic augmentation expands sparse decision boundaries across atypical presentations, driving test recall from 89.29% to 96.43% (+7.14 pp) on strictly held-out real patient test splits.',
      badge: 'Empirically Validated',
    },
    {
      q: 'What augmentation ratio works best?',
      sub: 'Adaptive Scaling Dynamics',
      answer:
        'The optimal ratio depends strictly on the clinical objective. For first-line screening triage where missing a cardiac condition is catastrophic, 200% augmentation maximizes sensitivity (96.43%). For balanced diagnostic utility, 100% parity augmentation delivers the most stable precision-recall equilibrium.',
      badge: 'Objective-Dependent',
    },
    {
      q: 'Which model performs best?',
      sub: 'Comparative Architecture Audit',
      answer:
        'XGBoost with 200% augmentation achieved the highest composite experimental benchmark (90.16% accuracy, 96.43% recall, 93.72% ROC-AUC), while Random Forest @ 100% achieved the highest ROC-AUC (93.99%). Linear models showed stability but lower non-linear capacity.',
      badge: 'XGBoost @ 200%',
    },
    {
      q: 'How can predictions be explained?',
      sub: 'Interpretability & Trust',
      answer:
        'Through SHAP (Shapley Additive exPlanations) grounded in cooperative game theory. Each clinical biomarker receives an exact additive attribution score, providing clinicians with transparent factor breakdowns for individual patients and verifying global biological plausibility.',
      badge: 'TreeSHAP Auditing',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 9 &bull; Core Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Central Research Questions Answered
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            The study was structured around four foundational hypotheses addressing data scarcity, scaling trade-offs, model selection, and algorithmic transparency.
          </p>
        </div>

        {/* 4 Research Questions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {questions.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F4] rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068] bg-[#E8EEE8] px-2.5 py-0.5 rounded">
                    RQ 0{idx + 1} &bull; {item.sub}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#8B6534] bg-[#FFF2DE] px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#17352D] mb-3">
                  {item.q}
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed mb-6">
                  {item.answer}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9C7A5]/40 flex items-center gap-2 text-xs font-semibold text-[#17352D]">
                <CheckCircle className="w-4 h-4 text-[#3D8068]" />
                <span>Addressed through empirical experimentation on held-out tests</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
