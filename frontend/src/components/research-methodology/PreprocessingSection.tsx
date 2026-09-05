import React from 'react'
import { Filter, CheckCircle2, ShieldCheck, Split, Cpu, AlertCircle } from 'lucide-react'

export const PreprocessingSection: React.FC = () => {
  const steps = [
    {
      title: 'Missing Value Handling',
      code: 'Step 2.1',
      description:
        'In the raw Cleveland cohort, 6 records contained missing markers ("?") across ca (4 cases) and thal (2 cases). Missing values were addressed via domain-aware median and mode imputation, followed by sensitivity validation verifying that imputation did not distort parameter distributions.',
      rule: 'Preserves statistical power across all 303 retrospective patient entries without data loss.',
    },
    {
      title: 'Data Cleaning & Biological Plausibility',
      code: 'Step 2.2',
      description:
        'Clinical validity screening verified that all biomarkers adhered strictly to human physiological bounds: resting blood pressure (94–200 mm Hg), serum cholesterol (126–564 mg/dL), and maximum exercise heart rate (71–202 bpm). Erroneous negative values or unit anomalies were strictly excluded.',
      rule: 'Guarantees that downstream generative models learn valid physiological trajectories.',
    },
    {
      title: 'Feature Preparation & Transformation',
      code: 'Step 2.3',
      description:
        'Continuous numerical variables (age, trestbps, chol, thalach, oldpeak) underwent Z-score standardization (zero mean, unit variance) to ensure scale-invariant optimization for gradient descent and margin-based classifiers. Discrete indicators (cp, restecg, slope, thal) were numerically aligned and one-hot encoded.',
      rule: 'Prevents high-magnitude vitals (e.g. cholesterol ~250) from dominating low-magnitude metrics (oldpeak ~1.5).',
    },
    {
      title: 'Strict Train/Test Partitioning',
      code: 'Step 2.4',
      description:
        'The cohort was partitioned into an 80% training set (N = 242) and a 20% test set (N = 61) using stratified sampling to preserve exact disease prevalence. The held-out test split consists 100% of real clinical records; zero synthetic data is ever allowed into the test partition.',
      rule: 'Eliminates data leakage and ensures benchmark scores reflect real-world generalization.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 2 &bull; Data Engineering</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Rigorous Data Preprocessing Pipeline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Clinical data contains nuances that require deliberate statistical handling. Every transformation is engineered to preserve epidemiological validity and prevent test set leakage.
          </p>
        </div>

        {/* 4 Detailed Engineering Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3D8068] bg-[#E8EEE8] px-2.5 py-0.5 rounded">
                    {item.code}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#3D8068]" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#17352D] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#4A5550] leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9C7A5]/40 text-xs font-medium text-[#17352D] bg-[#FAF8F4] p-3 rounded-xl border border-[#D9C7A5]/30">
                <strong className="text-[#8B6534]">Methodological Guarantee: </strong>
                {item.rule}
              </div>
            </div>
          ))}
        </div>

        {/* Data Leakage Prevention Highlight Banner */}
        <div className="bg-[#17352D] text-[#F7F4ED] rounded-2xl p-6 sm:p-7 border border-[#17352D] shadow-elevated flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D9C7A5]/20 text-[#D9C7A5] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">
              Strict Test Set Isolation Protocol
            </h4>
            <p className="text-xs sm:text-sm text-[#F7F4ED]/80 mt-1 leading-relaxed">
              In accordance with medical machine learning reporting guidelines, all synthetic data generation via CTGAN and adaptive training augmentation was applied <strong>exclusively to the 242 training records</strong>. The 61 held-out test patients remained pristine, untouched, and unobserved by the generative models, guaranteeing that evaluated accuracy directly reflects generalization to unseen real individuals.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
