import React, { useState } from 'react'
import { Database, Filter, Layers, Info, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

interface FeatureDetail {
  name: string
  label: string
  type: 'Continuous' | 'Categorical' | 'Binary'
  unit: string
  range: string
  description: string
  clinicalRelevance: string
  category: 'Demographic' | 'Vascular' | 'Metabolic' | 'Electrophysiological'
}

const CLINICAL_FEATURES: FeatureDetail[] = [
  {
    name: 'age',
    label: 'Patient Age',
    type: 'Continuous',
    unit: 'Years',
    range: '29 – 77',
    description: 'Chronological age in years at the time of clinical examination.',
    clinicalRelevance: 'Primary baseline cardiovascular risk factor; arterial stiffness and plaque accumulation increase progressively with age.',
    category: 'Demographic',
  },
  {
    name: 'sex',
    label: 'Biological Sex',
    type: 'Binary',
    unit: '0/1',
    range: '0 = Female, 1 = Male',
    description: 'Biological sex assigned at clinical intake.',
    clinicalRelevance: 'Significant demographic risk modulator; biological males exhibit earlier onset of coronary artery disease.',
    category: 'Demographic',
  },
  {
    name: 'cp',
    label: 'Chest Pain Type',
    type: 'Categorical',
    unit: '1 – 4',
    range: '1: Typical Angina, 2: Atypical, 3: Non-anginal, 4: Asymptomatic',
    description: 'Symptomatic chest pain classification recorded during patient interview.',
    clinicalRelevance: 'Cardinal symptom of myocardial ischemia; asymptomatic presentations (Type 4) frequently correlate with advanced silent ischemia.',
    category: 'Vascular',
  },
  {
    name: 'trestbps',
    label: 'Resting Blood Pressure',
    type: 'Continuous',
    unit: 'mmHg',
    range: '94 – 200',
    description: 'Resting systolic blood pressure upon hospital admission.',
    clinicalRelevance: 'Hypertension induces endothelial shear stress, accelerating atheroma formation and left ventricular hypertrophy.',
    category: 'Vascular',
  },
  {
    name: 'chol',
    label: 'Serum Cholesterol',
    type: 'Continuous',
    unit: 'mg/dL',
    range: '126 – 564',
    description: 'Total fasting serum cholesterol measurement.',
    clinicalRelevance: 'Circulating low-density lipoproteins penetrate arterial intima, driving inflammatory atherogenesis.',
    category: 'Metabolic',
  },
  {
    name: 'fbs',
    label: 'Fasting Blood Sugar > 120 mg/dL',
    type: 'Binary',
    unit: '0/1',
    range: '0 = False, 1 = True (> 120 mg/dL)',
    description: 'Fasting blood glucose concentration exceeding diabetic threshold.',
    clinicalRelevance: 'Chronic hyperglycemia promotes microvascular and macrovascular angiopathy.',
    category: 'Metabolic',
  },
  {
    name: 'restecg',
    label: 'Resting ECG Results',
    type: 'Categorical',
    unit: '0 – 2',
    range: '0: Normal, 1: ST-T Wave Abnormality, 2: Left Ventricular Hypertrophy',
    description: 'Baseline resting 12-lead electrocardiographic interpretation.',
    clinicalRelevance: 'Identifies conduction delays, subclinical repolarization abnormalities, and structural myocardial remodeling.',
    category: 'Electrophysiological',
  },
  {
    name: 'thalach',
    label: 'Maximum Heart Rate Achieved',
    type: 'Continuous',
    unit: 'bpm',
    range: '71 – 202',
    description: 'Peak heart rate recorded during treadmill stress testing.',
    clinicalRelevance: 'Chronotropic incompetence and diminished peak heart rate indicate coronary circulatory insufficiency.',
    category: 'Electrophysiological',
  },
  {
    name: 'exang',
    label: 'Exercise-Induced Angina',
    type: 'Binary',
    unit: '0/1',
    range: '0 = No, 1 = Yes',
    description: 'Precipitation of angina pectoris during physical exertion.',
    clinicalRelevance: 'Direct clinical evidence of exercise-induced mismatch between myocardial oxygen demand and coronary perfusion.',
    category: 'Vascular',
  },
  {
    name: 'oldpeak',
    label: 'ST Depression Induced by Exercise',
    type: 'Continuous',
    unit: 'mm',
    range: '0.0 – 6.2',
    description: 'Horizontal or downsloping ST segment depression relative to resting baseline.',
    clinicalRelevance: 'Strong electrocardiographic marker of subendocardial myocardial ischemia.',
    category: 'Electrophysiological',
  },
  {
    name: 'slope',
    label: 'Slope of Peak Exercise ST Segment',
    type: 'Categorical',
    unit: '1 – 3',
    range: '1: Upsloping, 2: Flat, 3: Downsloping',
    description: 'Trajectory orientation of the ST segment during peak treadmill exercise.',
    clinicalRelevance: 'Horizontal and downsloping profiles demonstrate high specificity for severe multi-vessel coronary obstruction.',
    category: 'Electrophysiological',
  },
  {
    name: 'ca',
    label: 'Major Vessels Colored by Fluoroscopy',
    type: 'Categorical',
    unit: '0 – 3',
    range: '0 to 3 major coronary arteries',
    description: 'Number of major coronary vessels visualized with significant luminal opacification during cardiac catheterization.',
    clinicalRelevance: 'Direct angiographic quantification of multi-vessel coronary artery disease burden.',
    category: 'Vascular',
  },
  {
    name: 'thal',
    label: 'Thallium Scintigraphy',
    type: 'Categorical',
    unit: '3, 6, 7',
    range: '3 = Normal, 6 = Fixed Defect, 7 = Reversible Defect',
    description: 'Thallium-201 nuclear myocardial perfusion imaging status.',
    clinicalRelevance: 'Differentiates viable ischemic myocardium (reversible defect) from non-viable infarcted fibrotic tissue (fixed defect).',
    category: 'Electrophysiological',
  },
  {
    name: 'target',
    label: 'Heart Disease Status (Diagnosis)',
    type: 'Binary',
    unit: '0/1',
    range: '0 = No Disease (< 50% stenosis), 1 = Disease Present (≥ 50% stenosis)',
    description: 'Binary clinical endpoint determined by coronary angiography.',
    clinicalRelevance: 'Ground truth outcome indicating presence of angiographically significant coronary artery narrowing.',
    category: 'Demographic',
  },
]

export const DatasetSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail>(CLINICAL_FEATURES[0])

  const categories = ['All', 'Demographic', 'Vascular', 'Metabolic', 'Electrophysiological']

  const filteredFeatures = selectedCategory === 'All'
    ? CLINICAL_FEATURES
    : CLINICAL_FEATURES.filter(f => f.category === selectedCategory)

  return (
    <section id="dataset" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="04"
          eyebrow="Clinical Biomarkers"
          title="The Dataset Architecture"
          description="Standardized clinical benchmark cohort comprising 14 physiological biomarkers and coronary angiography ground-truth outcomes."
        />

        {/* 4 Quantitative Cohort Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 font-sans">
          <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-5 shadow-subtle text-center">
            <span className="text-[11px] font-mono text-[#4A5550] uppercase block">Benchmark Cohort</span>
            <span className="font-serif text-3xl font-bold text-[#17352D] mt-1 block">303</span>
            <span className="text-xs text-[#3D8068] font-medium mt-0.5 block">Standard Records</span>
          </div>

          <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-5 shadow-subtle text-center">
            <span className="text-[11px] font-mono text-[#4A5550] uppercase block">Feature Space</span>
            <span className="font-serif text-3xl font-bold text-[#17352D] mt-1 block">14</span>
            <span className="text-xs text-[#3D8068] font-medium mt-0.5 block">Clinical Biomarkers</span>
          </div>

          <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-5 shadow-subtle text-center">
            <span className="text-[11px] font-mono text-[#4A5550] uppercase block">Outcome Balance</span>
            <span className="font-serif text-3xl font-bold text-[#17352D] mt-1 block">54% / 46%</span>
            <span className="text-xs text-[#3D8068] font-medium mt-0.5 block">Target 1 vs. Target 0</span>
          </div>

          <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-5 shadow-subtle text-center">
            <span className="text-[11px] font-mono text-[#4A5550] uppercase block">Missing Values</span>
            <span className="font-serif text-3xl font-bold text-[#3D8068] mt-1 block">0.14%</span>
            <span className="text-xs text-[#4A5550] font-medium mt-0.5 block">6 Cells Modal Imputed</span>
          </div>
        </div>

        {/* Feature Explorer Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Filters & 14-Feature Table (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle space-y-5 font-sans">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-[#E8EEE8]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#17352D] text-[#F7F4ED]'
                      : 'bg-[#FAF8F4] text-[#4A5550] hover:bg-[#E8EEE8] border border-[#D9C7A5]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Feature Table Rows */}
            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredFeatures.map((feat) => {
                const isSelected = selectedFeature.name === feat.name
                return (
                  <div
                    key={feat.name}
                    onClick={() => setSelectedFeature(feat)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8EEE8]/70 border-[#17352D] shadow-subtle'
                        : 'bg-[#FAF8F4]/80 border-[#D9C7A5]/30 hover:border-[#3D8068]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#17352D] w-16 truncate">
                        {feat.name}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#17352D] leading-tight">
                          {feat.label}
                        </div>
                        <div className="text-[10px] text-[#4A5550] mt-0.5">
                          {feat.category} · {feat.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white text-[#17352D] border border-[#D9C7A5]/40">
                        {feat.unit}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#17352D] translate-x-0.5' : 'text-[#D9C7A5]'}`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Selected Feature Deep Dive Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#3D8068] block">
                  Biomarker Deep Dive
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D] mt-0.5">
                  {selectedFeature.label}
                </h3>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                {selectedFeature.name}
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#D9C7A5]/30 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                  Variable Characteristics
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[#4A5550] block text-[10px]">Data Type:</span>
                    <span className="font-bold text-[#17352D]">{selectedFeature.type}</span>
                  </div>
                  <div>
                    <span className="text-[#4A5550] block text-[10px]">Clinical Range:</span>
                    <span className="font-bold text-[#17352D]">{selectedFeature.range}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                  Measurement Description
                </div>
                <p className="text-xs text-[#4A5550] leading-relaxed font-normal">
                  {selectedFeature.description}
                </p>
              </div>

              <div className="space-y-1.5 bg-[#E8EEE8]/40 p-4 rounded-xl border border-[#D8E2D8]/60">
                <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                  Cardiovascular Relevance
                </div>
                <p className="text-xs text-[#17352D] leading-relaxed font-medium">
                  {selectedFeature.clinicalRelevance}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
