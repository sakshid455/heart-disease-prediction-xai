import React from 'react'
import { Sparkles, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react'
import { ExplanationResult, FeatureContribution } from '../../services/api'

export interface KeyContributorsSectionProps {
  explanation?: ExplanationResult | null
}

export const KeyContributorsSection: React.FC<KeyContributorsSectionProps> = ({
  explanation,
}) => {
  if (!explanation || !explanation.features || explanation.features.length === 0) {
    return null
  }

  const featureNameMap: Record<string, string> = {
    chol: 'Serum Cholesterol',
    trestbps: 'Resting Blood Pressure',
    thalach: 'Maximum Heart Rate',
    oldpeak: 'ST Depression (Oldpeak)',
    cp: 'Chest Pain Type',
    fbs: 'Fasting Blood Sugar',
    restecg: 'Resting ECG',
    exang: 'Exercise-Induced Angina',
    slope: 'Peak ST Slope',
    ca: 'Major Coronary Vessels (CA)',
    thal: 'Thallium Perfusion Defect',
    age: 'Patient Age',
    sex: 'Biological Sex',
    ap_hi: 'Systolic Blood Pressure',
    ap_lo: 'Diastolic Blood Pressure',
    cholesterol: 'Cholesterol Level',
    gluc: 'Blood Glucose',
    smoke: 'Smoking Status',
    alco: 'Alcohol Consumption',
    active: 'Physical Activity',
  }

  // Determine contribution tier based on absolute Shapley attribution
  const getContributionTier = (shapVal: number) => {
    const absVal = Math.abs(shapVal)
    if (absVal >= 0.07) return { label: 'High contribution', color: 'text-red-700 bg-red-50 border-red-200' }
    if (absVal >= 0.025) return { label: 'Moderate contribution', color: 'text-amber-700 bg-amber-50 border-amber-200' }
    return { label: 'Low contribution', color: 'text-slate-700 bg-slate-50 border-slate-200' }
  }

  // Sort by absolute SHAP impact and take the top 6
  const sortedFeatures = [...explanation.features]
    .sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value))
    .slice(0, 6)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#D9C7A5]/40 pb-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[#3D8068]" />
          <div>
            <h3 className="text-xl font-serif font-bold text-[#17352D]">
              Key Algorithmic Contributors (SHAP)
            </h3>
            <p className="text-xs text-[#5C6661]">
              Shapley additive attributions reveal which specific clinical features drove this prediction.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D] font-semibold hidden sm:inline">
          Game-Theoretic XAI
        </span>
      </div>

      {/* Grid of Key Contributor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedFeatures.map((item: FeatureContribution, idx: number) => {
          const isRiskIncreasing = item.impact === 'positive'
          const tier = getContributionTier(item.shap_value)
          const friendlyName = featureNameMap[item.feature] || item.feature

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#D9C7A5]/50 shadow-xs space-y-4 hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Feature Name & Direction Indicator */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#808C85] tracking-wider block font-mono">
                      Feature
                    </span>
                    <h4 className="text-sm font-bold text-[#17352D] font-sans mt-0.5">
                      {friendlyName}
                    </h4>
                  </div>

                  {/* Direction Badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                      isRiskIncreasing
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {isRiskIncreasing ? (
                      <>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>↑ Risk</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        <span>↓ Risk</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Values & Contribution Tier */}
                <div className="pt-4 grid grid-cols-2 gap-3 border-t border-[#FAF8F4] mt-3 text-xs">
                  <div>
                    <span className="text-[#808C85] block text-[11px]">Patient Value</span>
                    <span className="font-bold text-[#17352D] font-mono text-sm">
                      {typeof item.value === 'number'
                        ? Number.isInteger(item.value)
                          ? item.value
                          : item.value.toFixed(1)
                        : item.value}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#808C85] block text-[11px]">Contribution</span>
                    <span className={`inline-block font-semibold text-[11px] px-2 py-0.5 rounded-md border ${tier.color}`}>
                      {tier.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical note */}
              <div className="pt-2 border-t border-[#FAF8F4] text-[11px] text-[#5C6661] leading-relaxed">
                {item.clinical_interpretation}
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 rounded-xl bg-[#E8EEE8]/40 border border-[#D8E2D8] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
        <p className="text-xs text-[#2A483E] leading-relaxed">
          <strong>How to read these contributions:</strong> Features marked with <strong className="text-red-700">↑ Risk</strong> shifted the model’s prediction toward disease likelihood, while features marked with <strong className="text-emerald-700">↓ Risk</strong> lowered the estimated probability relative to the training baseline.
        </p>
      </div>
    </section>
  )
}
