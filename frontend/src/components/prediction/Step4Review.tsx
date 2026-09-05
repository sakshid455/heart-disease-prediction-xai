import React from 'react'
import { ClinicalFormData } from './types'
import {
  User,
  Activity,
  Stethoscope,
  Edit2,
  ArrowRight,
  Loader2,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react'

export interface Step4ReviewProps {
  data: ClinicalFormData
  onEditStep: (step: number) => void
  onSubmit: () => void
  isLoading: boolean
  error?: string | null
}

export const Step4Review: React.FC<Step4ReviewProps> = ({
  data,
  onEditStep,
  onSubmit,
  isLoading,
  error,
}) => {
  const cpLabels: Record<number, string> = {
    1: 'Typical Angina',
    2: 'Atypical Angina',
    3: 'Non-Anginal Pain',
    4: 'Asymptomatic',
  }

  const restecgLabels: Record<number, string> = {
    0: 'Normal Sinus Rhythm',
    1: 'ST-T Abnormality',
    2: 'Left Ventricular Hypertrophy',
  }

  const slopeLabels: Record<number, string> = {
    1: 'Upsloping',
    2: 'Flat',
    3: 'Downsloping',
  }

  const thalLabels: Record<number, string> = {
    3: 'Normal Perfusion',
    6: 'Fixed Defect',
    7: 'Reversible Defect',
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#D9C7A5]/40 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#17352D]">
          Step 4: Clinical Profile Review
        </h3>
        <p className="text-sm text-[#4A5550] mt-1">
          Verify the entered parameters prior to dispatching inference to the predictive model.
        </p>
      </div>

      {/* Error Banner if any */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Prediction Request Failed</div>
            <div className="text-xs text-red-700 mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {/* 3 Structured Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. Patient Profile */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E8EEE8] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                  <User className="w-4 h-4 text-[#3D8068]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#17352D]">
                  Patient Info
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-semibold text-[#3D8068] hover:text-[#17352D] flex items-center gap-1 hover:underline"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Patient Age</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.age} years</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Biological Sex</dt>
                <dd className="font-bold text-[#17352D]">
                  {data.sex === 1 ? 'Male' : 'Female'}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F7F4ED] text-[11px] text-[#808C85]">
            Established baseline demographics
          </div>
        </div>

        {/* 2. Clinical Vitals */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E8EEE8] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                  <Activity className="w-4 h-4 text-[#C87868]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#17352D]">
                  Clinical Vitals
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-xs font-semibold text-[#3D8068] hover:text-[#17352D] flex items-center gap-1 hover:underline"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Resting BP</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.trestbps} mmHg</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Cholesterol</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.chol} mg/dL</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Max Heart Rate</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.thalach} bpm</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">ST Depression</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.oldpeak.toFixed(1)} mm</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F7F4ED] text-[11px] text-[#808C85]">
            Objective hemodynamic measurements
          </div>
        </div>

        {/* 3. Medical Diagnostics */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E8EEE8] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                  <Stethoscope className="w-4 h-4 text-[#3D8068]" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#17352D]">
                  Diagnostics
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-semibold text-[#3D8068] hover:text-[#17352D] flex items-center gap-1 hover:underline"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>

            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Chest Pain Type</dt>
                <dd className="font-bold text-[#17352D]">{cpLabels[data.cp] || `Type ${data.cp}`}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Fasting Sugar &gt; 120</dt>
                <dd className="font-bold text-[#17352D]">{data.fbs === 1 ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Resting ECG</dt>
                <dd className="font-bold text-[#17352D] truncate max-w-[120px]" title={restecgLabels[data.restecg]}>
                  {restecgLabels[data.restecg] || `Code ${data.restecg}`}
                </dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Ex. Induced Angina</dt>
                <dd className="font-bold text-[#17352D]">{data.exang === 1 ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">ST Slope</dt>
                <dd className="font-bold text-[#17352D]">{slopeLabels[data.slope] || `Slope ${data.slope}`}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Major Vessels (CA)</dt>
                <dd className="font-bold text-[#17352D] font-mono">{data.ca}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#F7F4ED]">
                <dt className="text-[#808C85]">Thalassemia</dt>
                <dd className="font-bold text-[#17352D]">{thalLabels[data.thal] || `Code ${data.thal}`}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F7F4ED] text-[11px] text-[#808C85]">
            Diagnostic imaging & markers
          </div>
        </div>

      </div>

      {/* Submission CTA Block */}
      <div className="bg-[#17352D] rounded-2xl p-6 sm:p-8 text-white shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-lg font-serif font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#D9C7A5]" />
            Clinical Assessment Ready for Inference
          </div>
          <p className="text-xs text-[#E8EEE8]/80 max-w-lg">
            Clicking analyze sends the 13 clinical biomarkers to the validated machine learning pipeline. Results are computed in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C87868] hover:bg-[#B36353] text-white text-sm font-bold tracking-wide rounded-xl shadow-md transition-all hover:scale-[1.02] disabled:opacity-75 disabled:cursor-not-allowed shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Clinical Profile...</span>
            </>
          ) : (
            <>
              <span>Analyze Heart Disease Risk</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  )
}
