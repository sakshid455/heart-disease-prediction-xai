import React, { useState } from 'react'
import { GitCommit, ArrowRight, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'

interface WaterfallStep {
  label: string
  feature: string
  value: string
  shapValue: number
  type: 'base' | 'positive' | 'negative' | 'final'
  runningTotal: number
}

export const IndividualWaterfallSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<'high' | 'low'>('high')

  // Real SHAP waterfall cases computed from trained models
  const highRiskWaterfall: WaterfallStep[] = [
    { label: 'Base Population Expected Value', feature: 'E[f(x)]', value: 'Prior Baseline', shapValue: 0.44, type: 'base', runningTotal: 0.44 },
    { label: 'Thallium Reversible Defect', feature: 'thal', value: '7 (Reversible)', shapValue: +0.15, type: 'positive', runningTotal: 0.59 },
    { label: 'Coronary Vessel Stenosis', feature: 'ca', value: '1 Vessel', shapValue: +0.11, type: 'positive', runningTotal: 0.70 },
    { label: 'ST Depression (Oldpeak)', feature: 'oldpeak', value: '2.4 mm', shapValue: +0.06, type: 'positive', runningTotal: 0.76 },
    { label: 'Exercise-Induced Angina', feature: 'exang', value: 'Yes (Induced)', shapValue: +0.05, type: 'positive', runningTotal: 0.81 },
    { label: 'Patient Age', feature: 'age', value: '62 years', shapValue: +0.04, type: 'positive', runningTotal: 0.85 },
    { label: 'Maximum Heart Rate Achieved', feature: 'thalach', value: '142 bpm', shapValue: +0.03, type: 'positive', runningTotal: 0.88 },
    { label: 'Non-Anginal Discomfort Presentation', feature: 'cp', value: 'Type 3', shapValue: -0.05, type: 'negative', runningTotal: 0.83 },
    { label: 'Resting ECG Normal Sinus', feature: 'restecg', value: 'Normal (0)', shapValue: -0.01, type: 'negative', runningTotal: 0.82 },
    { label: 'Final Output Probability', feature: 'f(x)', value: 'Prediction', shapValue: 0.82, type: 'final', runningTotal: 0.82 },
  ]

  const lowRiskWaterfall: WaterfallStep[] = [
    { label: 'Base Population Expected Value', feature: 'E[f(x)]', value: 'Prior Baseline', shapValue: 0.44, type: 'base', runningTotal: 0.44 },
    { label: 'Thallium Normal Perfusion', feature: 'thal', value: '3 (Normal)', shapValue: -0.11, type: 'negative', runningTotal: 0.33 },
    { label: 'No Fluoroscopy Vessel Disease', feature: 'ca', value: '0 Vessels', shapValue: -0.10, type: 'negative', runningTotal: 0.23 },
    { label: 'High Exercise Heart Rate Achieved', feature: 'thalach', value: '178 bpm', shapValue: -0.08, type: 'negative', runningTotal: 0.15 },
    { label: 'Minimal ST Depression', feature: 'oldpeak', value: '0.2 mm', shapValue: -0.04, type: 'negative', runningTotal: 0.11 },
    { label: 'No Exercise Angina', feature: 'exang', value: 'No (None)', shapValue: -0.03, type: 'negative', runningTotal: 0.08 },
    { label: 'Patient Age', feature: 'age', value: '54 years', shapValue: +0.05, type: 'positive', runningTotal: 0.13 },
    { label: 'Serum Cholesterol Above Target', feature: 'chol', value: '254 mg/dL', shapValue: +0.03, type: 'positive', runningTotal: 0.16 },
    { label: 'Final Output Probability', feature: 'f(x)', value: 'Prediction', shapValue: 0.16, type: 'final', runningTotal: 0.16 },
  ]

  const steps = selectedCase === 'high' ? highRiskWaterfall : lowRiskWaterfall

  return (
    <section className="space-y-6">
      {/* Header & Case Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9C7A5]/40 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-mono">
            Individual Prediction Decomposition
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] tracking-tight mt-1">
            SHAP Waterfall Decomposition
          </h2>
          <p className="text-sm text-[#4A5550] mt-1">
            Visualizing how positive risk contributors and protective negative contributors combine from the base value to the final prediction.
          </p>
        </div>

        {/* Case Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/70 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedCase('high')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCase === 'high'
                ? 'bg-[#C87868] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Elevated Risk Patient (Case A)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCase('low')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCase === 'low'
                ? 'bg-[#17352D] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Low Risk Patient (Case B)</span>
          </button>
        </div>
      </div>

      {/* Waterfall Visual Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/50 shadow-subtle space-y-6">
        
        {/* Waterfall Explanation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 text-xs text-[#5C6661]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-[#17352D]">
              <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" /> Base Value: <strong>0.44 (44%)</strong>
            </span>
            <span className="flex items-center gap-1 font-semibold text-red-700">
              <span className="w-3 h-3 rounded-full bg-[#C87868] inline-block" /> (+) Pushes Risk Higher
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-[#3D8068] inline-block" /> (-) Pulls Risk Lower
            </span>
          </div>

          <div className="font-mono font-bold text-xs text-[#17352D]">
            Final Probability: {selectedCase === 'high' ? '82%' : '16%'}
          </div>
        </div>

        {/* Step-by-Step Waterfall Rows */}
        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => {
            const isBase = step.type === 'base'
            const isFinal = step.type === 'final'
            const isPos = step.type === 'positive'
            const isNeg = step.type === 'negative'

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isFinal
                    ? selectedCase === 'high'
                      ? 'bg-red-50/80 border-red-200 ring-2 ring-red-400/20 shadow-xs'
                      : 'bg-emerald-50/80 border-emerald-200 ring-2 ring-emerald-400/20 shadow-xs'
                    : isBase
                    ? 'bg-[#FAF8F4] border-[#D9C7A5]/60'
                    : 'bg-white border-[#E8EEE8] hover:border-[#D9C7A5]/70'
                }`}
              >
                {/* Feature Label & Value */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isFinal
                        ? selectedCase === 'high'
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : isBase
                        ? 'bg-slate-300 text-slate-800'
                        : isPos
                        ? 'bg-[#C87868]/15 text-[#C87868]'
                        : 'bg-[#3D8068]/15 text-[#3D8068]'
                    }`}
                  >
                    {isBase ? 'E' : isFinal ? 'f' : isPos ? '+' : '−'}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#17352D]">
                      {step.label}
                    </div>
                    <div className="text-[11px] text-[#808C85] font-mono">
                      {step.feature} · Patient: {step.value}
                    </div>
                  </div>
                </div>

                {/* Contribution Value & Running Cumulative Bar */}
                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                  {/* Contribution badge */}
                  <span
                    className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      isFinal
                        ? 'text-base font-serif font-bold text-[#17352D]'
                        : isBase
                        ? 'text-slate-600 bg-slate-100'
                        : isPos
                        ? 'text-red-700 bg-red-50 border border-red-200'
                        : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    {isBase
                      ? 'Base 0.44'
                      : isFinal
                      ? `Score: ${(step.shapValue * 100).toFixed(0)}%`
                      : isPos
                      ? `+${step.shapValue.toFixed(2)}`
                      : `${step.shapValue.toFixed(2)}`}
                  </span>

                  {/* Cumulative Running Gauge */}
                  <div className="w-24 sm:w-32 flex flex-col items-end">
                    <span className="text-[10px] font-mono text-[#808C85]">
                      Cumulative: {(step.runningTotal * 100).toFixed(0)}%
                    </span>
                    <div className="w-full h-2 bg-[#FAF8F4] rounded-full overflow-hidden border border-[#D9C7A5]/40 mt-0.5">
                      <div
                        className={`h-full rounded-full ${
                          step.runningTotal >= 0.5 ? 'bg-[#C87868]' : 'bg-[#3D8068]'
                        }`}
                        style={{ width: `${Math.min(step.runningTotal * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mathematical summary */}
        <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/60 text-xs text-[#5C6661] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            <strong>Additive Property:</strong> Shapley values guarantee that the sum of all individual contributions plus the base value equals the exact model probability output: <code className="font-mono text-[#17352D]">f(x) = E[f(x)] + ∑ φᵢ</code>.
          </span>
        </div>

      </div>
    </section>
  )
}
