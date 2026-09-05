import React from 'react'
import { Activity, Target, ShieldCheck, BarChart2, CheckCircle2 } from 'lucide-react'

export const EvaluationMetricsSection: React.FC = () => {
  const metrics = [
    {
      name: 'Accuracy',
      formula: '(TP + TN) / (TP + TN + FP + FN)',
      clinicalMeaning:
        'The overall fraction of patients whose cardiac status was correctly predicted. While useful as a high-level summary, accuracy can obscure catastrophic diagnostic misses if the test cohort exhibits class imbalance.',
      benchmarkRole: 'Overall system reliability baseline.',
    },
    {
      name: 'Precision (PPV)',
      formula: 'TP / (TP + FP)',
      clinicalMeaning:
        'Positive Predictive Value measures the likelihood that a patient flagged with heart disease truly has coronary stenosis. High precision prevents unnecessary psychological distress and avoidable invasive catheterizations.',
      benchmarkRole: 'Guards against costly diagnostic false alarms.',
    },
    {
      name: 'Recall (Sensitivity)',
      formula: 'TP / (TP + FN)',
      clinicalMeaning:
        'The proportion of actual heart disease patients successfully flagged by the system. In clinical cardiovascular screening, recall is the most critical metric because a False Negative means an untreated ischemic event.',
      benchmarkRole: 'Primary optimization priority in clinical triage.',
    },
    {
      name: 'F1-Score',
      formula: '2 * (Precision * Recall) / (Precision + Recall)',
      clinicalMeaning:
        'The harmonic mean of precision and recall. Because it penalizes extreme imbalances between sensitivity and specificity, the F1-score serves as the definitive composite metric for model selection.',
      benchmarkRole: 'Primary objective function for tuning augmentation.',
    },
    {
      name: 'ROC-AUC',
      formula: '∫ TPR(FPR) d(FPR) from 0 to 1',
      clinicalMeaning:
        'Area Under the Receiver Operating Characteristic curve measures the probability that the model ranks a randomly chosen cardiac patient higher than a healthy individual, independent of the selected classification threshold.',
      benchmarkRole: 'Threshold-agnostic discrimination capability.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 6 &bull; Statistical Validation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Evaluation Metrics & Clinical Significance
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            In medical artificial intelligence, standard accuracy is insufficient. We evaluate models through a multi-dimensional clinical lens that weighs patient safety against resource utilization.
          </p>
        </div>

        {/* 5 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-bold text-lg text-[#17352D]">
                    {m.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#D9C7A5]/50 text-[#8B6534]">
                    Formula
                  </span>
                </div>

                {/* Formula box */}
                <div className="font-mono text-xs text-[#17352D] bg-[#FAF8F4] p-2.5 rounded-lg border border-[#D9C7A5]/40 mb-3 overflow-x-auto">
                  {m.formula}
                </div>

                <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
                  {m.clinicalMeaning}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D9C7A5]/40 text-[11px] font-medium text-[#3D8068] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{m.benchmarkRole}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
