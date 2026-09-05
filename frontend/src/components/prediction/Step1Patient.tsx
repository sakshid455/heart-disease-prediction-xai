import React from 'react'
import { ClinicalFormData, FormErrors } from './types'
import { Info, User, HelpCircle } from 'lucide-react'

export interface Step1PatientProps {
  data: ClinicalFormData
  onChange: (field: keyof ClinicalFormData, value: number) => void
  errors: FormErrors
}

export const Step1Patient: React.FC<Step1PatientProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#D9C7A5]/40 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#17352D]">
          Step 1: Patient Demographic Profile
        </h3>
        <p className="text-sm text-[#4A5550] mt-1">
          Baseline physiological parameters that establish demographic cardiovascular risk strata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Field: Age */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="patient-age" className="block text-sm font-bold text-[#17352D]">
              Patient Age
            </label>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#E8EEE8] text-[#17352D] font-semibold">
              {data.age} years
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            Age in completed years. Cardiovascular risk increases progressively after age 45 for men and 55 for women due to arterial stiffening.
          </p>

          <div className="space-y-3">
            <input
              id="patient-age"
              type="number"
              min={18}
              max={120}
              value={data.age || ''}
              onChange={(e) => onChange('age', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-xl border text-base font-semibold transition-all focus:outline-none focus:ring-2 ${
                errors.age
                  ? 'border-red-400 bg-red-50/50 focus:ring-red-400 text-red-900'
                  : 'border-[#D9C7A5] bg-[#FAF8F4] focus:ring-[#17352D] text-[#17352D]'
              }`}
              placeholder="Enter age (18 - 120)"
            />

            {/* Quick Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-[#808C85] font-medium">Quick pick:</span>
              {[35, 45, 55, 65, 75].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange('age', preset)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    data.age === preset
                      ? 'bg-[#17352D] text-white border-[#17352D]'
                      : 'bg-white text-[#4A5550] border-[#D9C7A5]/60 hover:border-[#17352D]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {errors.age && (
              <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.age}
              </p>
            )}
          </div>
        </div>

        {/* Field: Biological Sex */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-[#17352D]">
              Biological Sex
            </label>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#E8EEE8] text-[#17352D] font-semibold">
              {data.sex === 1 ? 'Male (1)' : 'Female (0)'}
            </span>
          </div>

          <p className="text-xs text-[#5C6661] leading-relaxed">
            Biological sex at birth. Epidemiological evidence indicates differences in coronary artery caliber, microvascular presentation, and estrogen cardioprotection.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-1">
            {/* Female Option */}
            <button
              type="button"
              onClick={() => onChange('sex', 0)}
              className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                data.sex === 0
                  ? 'bg-[#E8EEE8]/60 border-[#17352D] text-[#17352D] ring-2 ring-[#17352D]/10 shadow-sm'
                  : 'bg-[#FAF8F4] border-[#D9C7A5]/60 text-[#4A5550] hover:border-[#17352D]/40'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#D9C7A5]/40 text-[#17352D] font-bold">
                ♀
              </div>
              <div>
                <div className="text-sm font-bold">Female</div>
                <div className="text-[11px] text-[#808C85]">Cleveland Code: 0</div>
              </div>
            </button>

            {/* Male Option */}
            <button
              type="button"
              onClick={() => onChange('sex', 1)}
              className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                data.sex === 1
                  ? 'bg-[#E8EEE8]/60 border-[#17352D] text-[#17352D] ring-2 ring-[#17352D]/10 shadow-sm'
                  : 'bg-[#FAF8F4] border-[#D9C7A5]/60 text-[#4A5550] hover:border-[#17352D]/40'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#D9C7A5]/40 text-[#17352D] font-bold">
                ♂
              </div>
              <div>
                <div className="text-sm font-bold">Male</div>
                <div className="text-[11px] text-[#808C85]">Cleveland Code: 1</div>
              </div>
            </button>
          </div>

          {errors.sex && (
            <p className="text-xs text-red-600 font-medium mt-1">
              {errors.sex}
            </p>
          )}
        </div>

      </div>

      {/* Clinical guidance note */}
      <div className="p-4 rounded-xl bg-[#E8EEE8]/40 border border-[#D8E2D8] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
        <p className="text-xs text-[#2A483E] leading-relaxed">
          <strong>Clinical Context:</strong> Demographic factors form the baseline prior for Bayesian and tree-based heart disease models. Next, you will enter objective clinical measurements (blood pressure, cholesterol, stress heart rate, and ST depression).
        </p>
      </div>
    </div>
  )
}
