import React from 'react'
import { ClinicalFormData, FormErrors } from './types'
import { Activity, Gauge, HeartPulse, TrendingDown, Info, HelpCircle } from 'lucide-react'

export interface Step2ClinicalProps {
  data: ClinicalFormData
  onChange: (field: keyof ClinicalFormData, value: number) => void
  errors: FormErrors
}

export const Step2Clinical: React.FC<Step2ClinicalProps> = ({
  data,
  onChange,
  errors,
}) => {
  // Classification helpers for visual feedback
  const getBpStatus = (val: number) => {
    if (val < 120) return { label: 'Optimal (<120)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
    if (val <= 129) return { label: 'Elevated (120-129)', color: 'text-amber-700 bg-amber-50 border-amber-200' }
    if (val <= 139) return { label: 'Stage 1 HTN (130-139)', color: 'text-orange-700 bg-orange-50 border-orange-200' }
    return { label: 'Stage 2 HTN (≥140)', color: 'text-red-700 bg-red-50 border-red-200' }
  }

  const getCholStatus = (val: number) => {
    if (val < 200) return { label: 'Desirable (<200)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
    if (val <= 239) return { label: 'Borderline High (200-239)', color: 'text-amber-700 bg-amber-50 border-amber-200' }
    return { label: 'High (≥240 mg/dL)', color: 'text-red-700 bg-red-50 border-red-200' }
  }

  const bpStatus = getBpStatus(data.trestbps)
  const cholStatus = getCholStatus(data.chol)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#D9C7A5]/40 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#17352D]">
          Step 2: Objective Clinical Measurements
        </h3>
        <p className="text-sm text-[#4A5550] mt-1">
          Hemodynamic and biochemical measurements captured during admission or diagnostic examination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Field 1: Resting Blood Pressure */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#3D8068]" />
              <label htmlFor="bp-input" className="text-sm font-bold text-[#17352D]">
                Resting Blood Pressure
              </label>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-semibold ${bpStatus.color}`}>
              {bpStatus.label}
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            Resting systolic arterial pressure in mmHg recorded upon clinical examination in sitting position. Normal target is below 120 mmHg.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <input
                id="bp-input"
                type="number"
                min={50}
                max={250}
                value={data.trestbps || ''}
                onChange={(e) => onChange('trestbps', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold transition-all focus:outline-none focus:ring-2 pr-16 ${
                  errors.trestbps
                    ? 'border-red-400 bg-red-50/50 focus:ring-red-400 text-red-900'
                    : 'border-[#D9C7A5] bg-[#FAF8F4] focus:ring-[#17352D] text-[#17352D]'
                }`}
                placeholder="e.g. 120"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#808C85]">
                mmHg
              </span>
            </div>

            {errors.trestbps && (
              <p className="text-xs text-red-600 font-medium">
                {errors.trestbps}
              </p>
            )}
          </div>
        </div>

        {/* Field 2: Cholesterol */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C87868]" />
              <label htmlFor="chol-input" className="text-sm font-bold text-[#17352D]">
                Serum Cholesterol
              </label>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border font-semibold ${cholStatus.color}`}>
              {cholStatus.label}
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            Total serum cholesterol in mg/dL. Elevated circulating lipoproteins promote atheroma formation within coronary vessel walls.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <input
                id="chol-input"
                type="number"
                min={50}
                max={600}
                value={data.chol || ''}
                onChange={(e) => onChange('chol', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold transition-all focus:outline-none focus:ring-2 pr-16 ${
                  errors.chol
                    ? 'border-red-400 bg-red-50/50 focus:ring-red-400 text-red-900'
                    : 'border-[#D9C7A5] bg-[#FAF8F4] focus:ring-[#17352D] text-[#17352D]'
                }`}
                placeholder="e.g. 200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#808C85]">
                mg/dL
              </span>
            </div>

            {errors.chol && (
              <p className="text-xs text-red-600 font-medium">
                {errors.chol}
              </p>
            )}
          </div>
        </div>

        {/* Field 3: Maximum Heart Rate */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-[#3D8068]" />
              <label htmlFor="hr-input" className="text-sm font-bold text-[#17352D]">
                Maximum Heart Rate (Thalach)
              </label>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D] font-semibold">
              {data.thalach} bpm
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            Peak heart rate in beats per minute (bpm) recorded during treadmill or bicycle exercise stress test. Sub-target maximum rate can indicate chronotropic incompetence.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <input
                id="hr-input"
                type="number"
                min={50}
                max={250}
                value={data.thalach || ''}
                onChange={(e) => onChange('thalach', parseInt(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold transition-all focus:outline-none focus:ring-2 pr-16 ${
                  errors.thalach
                    ? 'border-red-400 bg-red-50/50 focus:ring-red-400 text-red-900'
                    : 'border-[#D9C7A5] bg-[#FAF8F4] focus:ring-[#17352D] text-[#17352D]'
                }`}
                placeholder="e.g. 150"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#808C85]">
                bpm
              </span>
            </div>

            {errors.thalach && (
              <p className="text-xs text-red-600 font-medium">
                {errors.thalach}
              </p>
            )}
          </div>
        </div>

        {/* Field 4: Oldpeak (ST Depression) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#C87868]" />
              <label htmlFor="oldpeak-input" className="text-sm font-bold text-[#17352D]">
                ST Depression (Oldpeak)
              </label>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D] font-semibold">
              {data.oldpeak.toFixed(1)} mm
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            ST depression induced by exercise relative to resting baseline on electrocardiogram (ECG). Values above 1.0–2.0 mm strongly suggest subendocardial ischemia.
          </p>

          <div className="space-y-2">
            <div className="relative">
              <input
                id="oldpeak-input"
                type="number"
                step="0.1"
                min={0.0}
                max={10.0}
                value={data.oldpeak}
                onChange={(e) => onChange('oldpeak', parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border text-base font-semibold transition-all focus:outline-none focus:ring-2 pr-16 ${
                  errors.oldpeak
                    ? 'border-red-400 bg-red-50/50 focus:ring-red-400 text-red-900'
                    : 'border-[#D9C7A5] bg-[#FAF8F4] focus:ring-[#17352D] text-[#17352D]'
                }`}
                placeholder="e.g. 1.0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#808C85]">
                mm (mV)
              </span>
            </div>

            {errors.oldpeak && (
              <p className="text-xs text-red-600 font-medium">
                {errors.oldpeak}
              </p>
            )}
          </div>
        </div>

      </div>

      <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/60 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#C87868] shrink-0 mt-0.5" />
        <p className="text-xs text-[#4A5550] leading-relaxed">
          <strong>Measurement Note:</strong> Values should reflect standardized clinical resting state (for blood pressure and cholesterol) and peak exercise test parameters (for heart rate and ST depression).
        </p>
      </div>
    </div>
  )
}
