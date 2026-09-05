import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Stethoscope, Activity, HeartPulse, Gauge, TrendingDown, Zap, User } from 'lucide-react'

interface FeatureDetail {
  id: string
  name: string
  icon: any
  patientValue: string
  contribution: string
  direction: 'increased' | 'decreased'
  definition: string
  clinicalMechanism: string
}

export const FeatureExplanationsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('thal')

  const features: FeatureDetail[] = [
    {
      id: 'thal',
      name: 'Thallium Stress Scintigraphy (Thal)',
      icon: Stethoscope,
      patientValue: 'Code 7 — Reversible Perfusion Defect',
      contribution: '+0.150 Shapley Impact (High Contribution)',
      direction: 'increased',
      definition: 'A nuclear cardiac stress test utilizing radioactive thallium-201 or technetium-99m to visualize myocardial microvascular blood flow during peak stress and resting recovery.',
      clinicalMechanism: 'Reversible defects indicate transient exercise-induced ischemia where viable myocardium experiences perfusion reduction that resolves at rest, marking significant epicardial coronary artery stenosis.',
    },
    {
      id: 'ca',
      name: 'Number of Major Vessels (CA)',
      icon: Stethoscope,
      patientValue: '1 Major Coronary Artery with Stenosis',
      contribution: '+0.110 Shapley Impact (High Contribution)',
      direction: 'increased',
      definition: 'The count (0 to 3) of major coronary vessels (Left Anterior Descending, Circumflex, Right Coronary Artery) visualized with ≥50% luminal narrowing on fluoroscopy.',
      clinicalMechanism: 'Each additional anatomically stenosed vessel compounds the likelihood of ischemic events, reduced ejection fraction, and long-term adverse cardiovascular endpoints.',
    },
    {
      id: 'cp',
      name: 'Chest Pain Type (CP)',
      icon: Activity,
      patientValue: 'Type 1 — Typical Exertional Angina',
      contribution: '+0.092 Shapley Impact (High Contribution)',
      direction: 'increased',
      definition: 'Categorization of chest discomfort according to Diamond-Forrester criteria (substernal location, exertional provocation, relief with rest or nitroglycerin).',
      clinicalMechanism: 'Typical angina has an 85–95% pre-test probability of obstructive coronary artery disease in adult patients undergoing non-invasive diagnostic evaluation.',
    },
    {
      id: 'thalach',
      name: 'Maximum Heart Rate Achieved (Thalach)',
      icon: HeartPulse,
      patientValue: '142 bpm (Sub-target Peak Rate)',
      contribution: '+0.035 Shapley Impact (Moderate Contribution)',
      direction: 'increased',
      definition: 'The highest heart rate in beats per minute achieved by the patient during a standardized treadmill or bicycle Bruce protocol stress test.',
      clinicalMechanism: 'Inability to reach target heart rate (chronotropic incompetence) strongly correlates with autonomic dysfunction, subclinical ischemia, and heightened overall cardiovascular mortality.',
    },
    {
      id: 'oldpeak',
      name: 'ST Depression (Oldpeak)',
      icon: TrendingDown,
      patientValue: '2.4 mm (Marked Depression)',
      contribution: '+0.063 Shapley Impact (Moderate Contribution)',
      direction: 'increased',
      definition: 'Electrocardiographic horizontal or downsloping ST-segment depression measured in millimeters at 60–80 ms past the J-point relative to the resting PR baseline.',
      clinicalMechanism: 'ST depression directly reflects subendocardial ischemia induced by exercise workload when myocardial oxygen demand outpaces coronary perfusion capacity.',
    },
    {
      id: 'exang',
      name: 'Exercise-Induced Angina',
      icon: Zap,
      patientValue: 'Yes (Induced during stress test)',
      contribution: '+0.053 Shapley Impact (Moderate Contribution)',
      direction: 'increased',
      definition: 'Subjective onset of characteristic retrosternal pain or chest tightness during physical exertion on the stress test treadmill.',
      clinicalMechanism: 'Provocation of angina during physical exertion demonstrates physiological threshold limitation and corroborates anatomical stenosis findings on imaging.',
    },
    {
      id: 'trestbps',
      name: 'Resting Blood Pressure',
      icon: Gauge,
      patientValue: '140 mmHg (Stage 2 Hypertension)',
      contribution: '+0.016 Shapley Impact (Low Contribution)',
      direction: 'increased',
      definition: 'Arterial blood pressure in millimeters of mercury recorded in the seated patient prior to exercise or pharmacological stress induction.',
      clinicalMechanism: 'Chronic hypertension causes progressive endothelial shear injury, accelerates atheromatous plaque formation, and induces compensatory left ventricular wall thickening.',
    },
    {
      id: 'chol',
      name: 'Serum Cholesterol',
      icon: Activity,
      patientValue: '260 mg/dL (Elevated Circulating Lipids)',
      contribution: '+0.024 Shapley Impact (Low Contribution)',
      direction: 'increased',
      definition: 'Total concentration of circulating serum cholesterol (LDL, HDL, and VLDL fractions) in milligrams per deciliter of blood.',
      clinicalMechanism: 'Apoprotein B-containing lipoproteins penetrate the damaged vascular intima, undergo oxidative modification, and provoke foam cell macrophage accumulation.',
    },
    {
      id: 'age',
      name: 'Patient Age',
      icon: User,
      patientValue: '58 years (Progressive Vascular Aging)',
      contribution: '+0.028 Shapley Impact (Low Contribution)',
      direction: 'increased',
      definition: 'Completed chronological age in whole years establishing cumulative lifetime vascular and metabolic exposure.',
      clinicalMechanism: 'Advancing age is accompanied by progressive loss of arterial elastin, calcification of internal elastic lamina, and cumulative lifetime exposure to metabolic risk factors.',
    },
  ]

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="space-y-6">
      <div className="border-b border-[#D9C7A5]/40 pb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-mono">
          Clinical Feature Glossary
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] tracking-tight mt-1">
          Detailed Feature Explanations
        </h2>
        <p className="text-sm text-[#4A5550] mt-1">
          Expand any clinical parameter to explore what it measures, the representative patient value, its algorithmic contribution, and physiological rationale.
        </p>
      </div>

      {/* Expandable Cards List */}
      <div className="space-y-3">
        {features.map((feat) => {
          const Icon = feat.icon
          const isExpanded = expandedId === feat.id
          const isIncreased = feat.direction === 'increased'

          return (
            <div
              key={feat.id}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'border-[#17352D] shadow-subtle ring-1 ring-[#17352D]/10'
                  : 'border-[#D9C7A5]/50 hover:border-[#17352D]/40 shadow-xs'
              }`}
            >
              {/* Card Summary Header (Clickable) */}
              <button
                type="button"
                onClick={() => toggleExpand(feat.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/50 flex items-center justify-center text-[#17352D] shrink-0">
                    <Icon className="w-5 h-5 text-[#3D8068]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#17352D]">
                      {feat.name}
                    </h3>
                    <div className="text-xs text-[#808C85] font-mono mt-0.5">
                      Patient Value: <span className="font-bold text-[#17352D]">{feat.patientValue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`hidden sm:inline-block text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      isIncreased
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {isIncreased ? '↑ Increased Model Risk' : '↓ Decreased Model Risk'}
                  </span>

                  <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-center text-[#17352D]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-[#FAF8F4] space-y-4 animate-fadeIn">
                  
                  {/* Contribution Callout */}
                  <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[#808C85] block font-mono text-[11px]">Algorithmic Contribution</span>
                      <strong className="text-[#17352D] font-mono">{feat.contribution}</strong>
                    </div>
                    <span
                      className={`inline-block sm:hidden text-xs font-mono font-bold px-2.5 py-1 rounded-lg border w-fit ${
                        isIncreased
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {isIncreased ? '↑ Increased Model Risk' : '↓ Decreased Model Risk'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-[#17352D] uppercase tracking-wider text-[11px] block">
                        What This Feature Represents
                      </span>
                      <p className="text-[#5C6661] leading-relaxed">
                        {feat.definition}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-[#17352D] uppercase tracking-wider text-[11px] block">
                        Cardiovascular Mechanism
                      </span>
                      <p className="text-[#5C6661] leading-relaxed">
                        {feat.clinicalMechanism}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
