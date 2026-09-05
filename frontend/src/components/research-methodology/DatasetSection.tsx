import React from 'react'
import { Database, FileSpreadsheet, Activity, CheckCircle, Info } from 'lucide-react'

interface AttributeSpec {
  code: string
  name: string
  type: string
  range: string
  description: string
}

const DATASET_ATTRIBUTES: AttributeSpec[] = [
  {
    code: 'age',
    name: 'Patient Age',
    type: 'Continuous',
    range: '29 – 77 yrs',
    description: 'Age of the individual in completed years at time of clinical assessment.',
  },
  {
    code: 'sex',
    name: 'Biological Sex',
    type: 'Binary',
    range: '0 = Female, 1 = Male',
    description: 'Biological sex assigned at clinical intake.',
  },
  {
    code: 'cp',
    name: 'Chest Pain Type',
    type: 'Categorical',
    range: '1: Typical, 2: Atypical, 3: Non-anginal, 4: Asymptomatic',
    description: 'Clinical symptomatic classification of thoracic discomfort during exertion or rest.',
  },
  {
    code: 'trestbps',
    name: 'Resting Blood Pressure',
    type: 'Continuous',
    range: '94 – 200 mm Hg',
    description: 'Resting systolic arterial pressure recorded in mm Hg upon hospital admission.',
  },
  {
    code: 'chol',
    name: 'Serum Cholesterol',
    type: 'Continuous',
    range: '126 – 564 mg/dL',
    description: 'Fasting total serum cholesterol level measured via venous biochemical assay.',
  },
  {
    code: 'fbs',
    name: 'Fasting Blood Sugar',
    type: 'Binary',
    range: '1 = >120 mg/dL, 0 = <=120 mg/dL',
    description: 'Biochemical indicator of impaired fasting glucose or underlying diabetes.',
  },
  {
    code: 'restecg',
    name: 'Resting ECG Results',
    type: 'Categorical',
    range: '0: Normal, 1: ST-T wave abnormality, 2: LVH',
    description: 'Baseline 12-lead electrocardiographic evaluation in the resting state.',
  },
  {
    code: 'thalach',
    name: 'Maximum Heart Rate',
    type: 'Continuous',
    range: '71 – 202 bpm',
    description: 'Highest peak chronotropic response achieved during treadmill exercise stress testing.',
  },
  {
    code: 'exang',
    name: 'Exercise-Induced Angina',
    type: 'Binary',
    range: '1 = Yes, 0 = No',
    description: 'Transient precordial pain provoked by standardized physical exertion protocols.',
  },
  {
    code: 'oldpeak',
    name: 'ST Depression (Oldpeak)',
    type: 'Continuous',
    range: '0.0 – 6.2 mm',
    description: 'Electrocardiographic ST-segment depression induced by exercise relative to resting baseline.',
  },
  {
    code: 'slope',
    name: 'Peak ST Slope',
    type: 'Categorical',
    range: '1: Upsloping, 2: Flat, 3: Downsloping',
    description: 'Morphological trajectory of the ST segment at peak cardiac workload.',
  },
  {
    code: 'ca',
    name: 'Major Vessels (Fluoroscopy)',
    type: 'Ordinal',
    range: '0 – 3 vessels',
    description: 'Number of major epicardial coronary vessels visualized with significant contrast coloring.',
  },
  {
    code: 'thal',
    name: 'Thallium Defect',
    type: 'Categorical',
    range: '3 = Normal, 6 = Fixed defect, 7 = Reversible defect',
    description: 'Myocardial radionuclide perfusion status during cardiac stress and recovery imaging.',
  },
  {
    code: 'num / target',
    name: 'Angiographic Disease Status',
    type: 'Binary (Target)',
    range: '0 = <50% stenosis, 1 = >50% stenosis',
    description: 'Ground-truth presence of clinically significant coronary artery stenosis via angiography.',
  },
]

export const DatasetSection: React.FC = () => {
  return (
    <section id="dataset-specs" className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40 scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 1 &bull; Clinical Data Cohort</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            The UCI Heart Disease Benchmark Cohort
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            The research utilizes the standardized <strong>UCI Machine Learning Repository Heart Disease dataset</strong> (originally collected by the Cleveland Clinic Foundation, V.A. Medical Center, Long Beach, and Hungarian Institute of Cardiology).
          </p>
        </div>

        {/* 2-Card Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#FAF8F4] p-6 rounded-2xl border border-[#D9C7A5]/60 shadow-subtle">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-1">
              Sample Population
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D]">
              303
            </div>
            <div className="text-xs text-[#5C6B64] mt-1">
              Total Clinical Patient Records
            </div>
          </div>

          <div className="bg-[#FAF8F4] p-6 rounded-2xl border border-[#D9C7A5]/60 shadow-subtle">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-1">
              Dimensionality
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#3D8068]">
              14
            </div>
            <div className="text-xs text-[#5C6B64] mt-1">
              Clinical Biomarker Attributes
            </div>
          </div>

          <div className="bg-[#FAF8F4] p-6 rounded-2xl border border-[#D9C7A5]/60 shadow-subtle">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-1">
              Diagnostic Split
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8B6534]">
              80 / 20
            </div>
            <div className="text-xs text-[#5C6B64] mt-1">
              242 Train &bull; 61 Held-Out Test
            </div>
          </div>

          <div className="bg-[#FAF8F4] p-6 rounded-2xl border border-[#D9C7A5]/60 shadow-subtle">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-1">
              Target Prevalence
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C87868]">
              45.9%
            </div>
            <div className="text-xs text-[#5C6B64] mt-1">
              Angiographically Confirmed CVD
            </div>
          </div>
        </div>

        {/* Clean 14-Attribute Clinical Specification Table */}
        <div className="bg-white rounded-2xl border border-[#D9C7A5]/70 shadow-subtle overflow-hidden">
          <div className="p-5 bg-[#FAF8F4] border-b border-[#D9C7A5]/50 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-[#17352D]">
                Complete Clinical Attribute Dictionary
              </h3>
              <p className="text-xs text-[#5C6B64]">
                Detailed variable names, mathematical scale types, normal clinical ranges, and descriptions.
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white border border-[#D9C7A5]/60 text-[#17352D] font-bold">
              14 / 14 Attributes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F4]/80 border-b border-[#D9C7A5]/40 text-[#17352D] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Feature Code</th>
                  <th className="py-3 px-4">Clinical Name</th>
                  <th className="py-3 px-3">Data Type</th>
                  <th className="py-3 px-4">Reference Range</th>
                  <th className="py-3 px-4">Physiological & Diagnostic Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7A5]/30">
                {DATASET_ATTRIBUTES.map((attr, idx) => (
                  <tr
                    key={attr.code}
                    className={`hover:bg-[#FAF8F4] transition-colors ${
                      attr.code.includes('target') ? 'bg-[#E8EEE8]/40 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#17352D]">
                      {attr.code}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#17352D]">
                      {attr.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FAF8F4] border border-[#D9C7A5]/40 text-[#5C6B64]">
                        {attr.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#5C6B64] text-[11px]">
                      {attr.range}
                    </td>
                    <td className="py-3 px-4 text-[#4A5550] leading-relaxed">
                      {attr.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
