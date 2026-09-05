import React from 'react'
import { ClinicalFormData, FormErrors } from './types'
import { Stethoscope, Activity, Zap, Eye, HelpCircle, Layers } from 'lucide-react'

export interface Step3MedicalProps {
  data: ClinicalFormData
  onChange: (field: keyof ClinicalFormData, value: number) => void
  errors: FormErrors
}

export const Step3Medical: React.FC<Step3MedicalProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-[#D9C7A5]/40 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#17352D]">
          Step 3: Medical Diagnostics & Electrocardiography
        </h3>
        <p className="text-sm text-[#4A5550] mt-1">
          Specialized cardiac biomarkers including chest discomfort typology, resting ECG morphology, fluoroscopy, and perfusion imaging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Chest Pain Type (cp) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="cp-select" className="text-sm font-bold text-[#17352D]">
              Chest Pain Type (CP)
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              Type {data.cp}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Characterizes the sensation, radiation, and triggers of chest discomfort according to Diamond-Forrester classification.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {[
              { val: 1, title: 'Typical Angina', desc: 'Substernal pressure provoked by exertion, relieved by rest or nitroglycerin.' },
              { val: 2, title: 'Atypical Angina', desc: 'Meets 2 of 3 classical criteria (e.g. non-exertional discomfort).' },
              { val: 3, title: 'Non-Anginal Pain', desc: 'Meets ≤1 criterion; likely musculoskeletal, gastrointestinal, or pleuritic.' },
              { val: 4, title: 'Asymptomatic', desc: 'No overt chest pain symptoms reported during assessment.' },
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => onChange('cp', item.val)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                  data.cp === item.val
                    ? 'bg-[#E8EEE8]/70 border-[#17352D] text-[#17352D] shadow-xs ring-2 ring-[#17352D]/10'
                    : 'bg-[#FAF8F4] border-[#D9C7A5]/60 text-[#4A5550] hover:border-[#17352D]/40'
                }`}
              >
                <div>
                  <div className="text-xs font-bold font-sans">
                    {item.val}. {item.title}
                  </div>
                  <div className="text-[11px] text-[#5C6661] mt-1 leading-snug">
                    {item.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Fasting Blood Sugar (fbs) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#17352D]">
              Fasting Blood Sugar &gt; 120 mg/dL
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              {data.fbs === 1 ? 'Yes (>120)' : 'No (≤120)'}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Indicates impaired fasting glycemia or diabetes, which accelerates vascular atherogenesis and autonomic neuropathy.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => onChange('fbs', 0)}
              className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all ${
                data.fbs === 0
                  ? 'bg-[#17352D] text-white border-[#17352D] shadow-xs'
                  : 'bg-[#FAF8F4] text-[#4A5550] border-[#D9C7A5]/70 hover:border-[#17352D]'
              }`}
            >
              No (≤ 120 mg/dL)
            </button>
            <button
              type="button"
              onClick={() => onChange('fbs', 1)}
              className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all ${
                data.fbs === 1
                  ? 'bg-[#C87868] text-white border-[#C87868] shadow-xs'
                  : 'bg-[#FAF8F4] text-[#4A5550] border-[#D9C7A5]/70 hover:border-[#C87868]'
              }`}
            >
              Yes (&gt; 120 mg/dL)
            </button>
          </div>
        </div>

        {/* 3. Exercise Induced Angina (exang) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#17352D]">
              Exercise-Induced Angina
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              {data.exang === 1 ? 'Yes (1)' : 'No (0)'}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Development of ischemic chest angina during stress testing due to myocardial oxygen demand exceeding stenotic coronary supply.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => onChange('exang', 0)}
              className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all ${
                data.exang === 0
                  ? 'bg-[#17352D] text-white border-[#17352D] shadow-xs'
                  : 'bg-[#FAF8F4] text-[#4A5550] border-[#D9C7A5]/70 hover:border-[#17352D]'
              }`}
            >
              No Angina
            </button>
            <button
              type="button"
              onClick={() => onChange('exang', 1)}
              className={`py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all ${
                data.exang === 1
                  ? 'bg-[#C87868] text-white border-[#C87868] shadow-xs'
                  : 'bg-[#FAF8F4] text-[#4A5550] border-[#D9C7A5]/70 hover:border-[#C87868]'
              }`}
            >
              Yes, Induced
            </button>
          </div>
        </div>

        {/* 4. Resting ECG (restecg) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="restecg-select" className="text-sm font-bold text-[#17352D]">
              Resting Electrocardiogram (Resting ECG)
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              Code {data.restecg}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Resting 12-lead baseline rhythm assessment before cardiac stress exertion.
          </p>
          <select
            id="restecg-select"
            value={data.restecg}
            onChange={(e) => onChange('restecg', parseInt(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C7A5] bg-[#FAF8F4] text-[#17352D] text-xs font-medium focus:ring-2 focus:ring-[#17352D] focus:outline-none"
          >
            <option value={0}>0 — Normal Sinus Rhythm (No significant ST-T changes)</option>
            <option value={1}>1 — ST-T Wave Abnormality (T-wave inversions / ST elevation/depression &gt; 0.05 mV)</option>
            <option value={2}>2 — Left Ventricular Hypertrophy (Probable or definite LVH by Estes criteria)</option>
          </select>
        </div>

        {/* 5. ST Slope (slope) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="slope-select" className="text-sm font-bold text-[#17352D]">
              ST Slope at Peak Exercise
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              Slope {data.slope}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Slope trajectory of the ST segment at peak exercise exertion. Downsloping and flat profiles correlate heavily with severe coronary ischemia.
          </p>
          <select
            id="slope-select"
            value={data.slope}
            onChange={(e) => onChange('slope', parseInt(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C7A5] bg-[#FAF8F4] text-[#17352D] text-xs font-medium focus:ring-2 focus:ring-[#17352D] focus:outline-none"
          >
            <option value={1}>1 — Upsloping (Rapid upsloping ST; physiological variant)</option>
            <option value={2}>2 — Flat (Horizontal ST depression; frequent ischemic marker)</option>
            <option value={3}>3 — Downsloping (Downward sloping ST; severe ischemic marker)</option>
          </select>
        </div>

        {/* 6. Number of Major Vessels (ca) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-[#17352D]">
              Major Vessels Colored by Fluoroscopy (CA)
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              {data.ca} {data.ca === 1 ? 'Vessel' : 'Vessels'}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Count of primary epicardial coronary vessels (LAD, LCx, RCA) visualized with luminal reduction on fluoroscopy (0 to 3).
          </p>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[0, 1, 2, 3].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange('ca', count)}
                className={`py-2.5 rounded-xl border font-mono font-bold text-xs transition-all ${
                  data.ca === count
                    ? 'bg-[#17352D] text-white border-[#17352D] shadow-xs'
                    : 'bg-[#FAF8F4] text-[#4A5550] border-[#D9C7A5]/70 hover:border-[#17352D]'
                }`}
              >
                {count} {count === 0 ? 'None' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* 7. Thalassemia Indicator (thal) */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="thal-select" className="text-sm font-bold text-[#17352D]">
              Thallium Stress Scintigraphy (Thalassemia)
            </label>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FAF8F4] border border-[#D9C7A5] text-[#17352D]">
              Code {data.thal}
            </span>
          </div>
          <p className="text-xs text-[#5C6661]">
            Nuclear myocardial perfusion scan revealing intact blood flow, fixed scar (infarction), or reversible perfusion defect.
          </p>
          <select
            id="thal-select"
            value={data.thal}
            onChange={(e) => onChange('thal', parseInt(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C7A5] bg-[#FAF8F4] text-[#17352D] text-xs font-medium focus:ring-2 focus:ring-[#17352D] focus:outline-none"
          >
            <option value={3}>3 — Normal Perfusion (Homogeneous radiotracer uptake)</option>
            <option value={6}>6 — Fixed Defect (Persistent hypoperfusion; previous infarct / fibrosis)</option>
            <option value={7}>7 — Reversible Defect (Stress-induced hypoperfusion resolving at rest; inducible ischemia)</option>
          </select>
        </div>

      </div>
    </div>
  )
}
