import React from 'react'
import { User, Activity, Stethoscope, FileText } from 'lucide-react'
import { ClinicalFormData } from '../prediction/types'

export interface PatientSummarySectionProps {
  patient: ClinicalFormData
}

export const PatientSummarySection: React.FC<PatientSummarySectionProps> = ({ patient }) => {
  const cpMap: Record<number, string> = {
    1: 'Typical Angina (1)',
    2: 'Atypical Angina (2)',
    3: 'Non-Anginal Pain (3)',
    4: 'Asymptomatic (4)',
  }

  const restecgMap: Record<number, string> = {
    0: 'Normal Sinus Rhythm (0)',
    1: 'ST-T Abnormality (1)',
    2: 'LV Hypertrophy (2)',
  }

  const slopeMap: Record<number, string> = {
    1: 'Upsloping (1)',
    2: 'Flat (2)',
    3: 'Downsloping (3)',
  }

  const thalMap: Record<number, string> = {
    3: 'Normal Perfusion (3)',
    6: 'Fixed Defect (6)',
    7: 'Reversible Defect (7)',
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2.5 border-b border-[#D9C7A5]/40 pb-3">
        <FileText className="w-5 h-5 text-[#3D8068]" />
        <div>
          <h3 className="text-xl font-serif font-bold text-[#17352D]">
            Patient Clinical Summary
          </h3>
          <p className="text-xs text-[#5C6661]">
            Overview of clinical metrics provided for this algorithmic evaluation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Patient Demographics */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8EEE8]">
              <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                <User className="w-4 h-4 text-[#3D8068]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#17352D]">
                Demographics
              </h4>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Patient Age</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.age} years</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Biological Sex</dt>
                <dd className="font-bold text-[#17352D]">
                  {patient.sex === 1 ? 'Male (1)' : 'Female (0)'}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] text-[11px] text-[#808C85]">
            Baseline demographic stratification
          </div>
        </div>

        {/* Card 2: Clinical Vitals */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8EEE8]">
              <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                <Activity className="w-4 h-4 text-[#C87868]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#17352D]">
                Clinical Measurements
              </h4>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Resting BP</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.trestbps} mmHg</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Serum Cholesterol</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.chol} mg/dL</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Max Heart Rate</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.thalach} bpm</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">ST Depression</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.oldpeak.toFixed(1)} mm</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] text-[11px] text-[#808C85]">
            Objective physiological testing
          </div>
        </div>

        {/* Card 3: Medical Diagnostics */}
        <div className="bg-white rounded-2xl p-6 border border-[#D9C7A5]/50 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8EEE8]">
              <div className="w-8 h-8 rounded-lg bg-[#E8EEE8] flex items-center justify-center text-[#17352D]">
                <Stethoscope className="w-4 h-4 text-[#3D8068]" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#17352D]">
                Diagnostic Indicators
              </h4>
            </div>

            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Chest Pain Type</dt>
                <dd className="font-bold text-[#17352D] truncate max-w-[120px]">{cpMap[patient.cp] || patient.cp}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Fasting Glucose &gt; 120</dt>
                <dd className="font-bold text-[#17352D]">{patient.fbs === 1 ? 'Yes (>120)' : 'No (≤120)'}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Resting ECG</dt>
                <dd className="font-bold text-[#17352D] truncate max-w-[120px]" title={restecgMap[patient.restecg]}>
                  {restecgMap[patient.restecg] || patient.restecg}
                </dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Exercise Angina</dt>
                <dd className="font-bold text-[#17352D]">{patient.exang === 1 ? 'Yes' : 'No'}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">ST Slope</dt>
                <dd className="font-bold text-[#17352D]">{slopeMap[patient.slope] || patient.slope}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Major Vessels (CA)</dt>
                <dd className="font-bold text-[#17352D] font-mono">{patient.ca}</dd>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[#FAF8F4]">
                <dt className="text-[#808C85]">Thalassemia</dt>
                <dd className="font-bold text-[#17352D]">{thalMap[patient.thal] || patient.thal}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 pt-3 border-t border-[#FAF8F4] text-[11px] text-[#808C85]">
            Electrocardiographic & imaging markers
          </div>
        </div>

      </div>
    </section>
  )
}
