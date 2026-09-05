import React from 'react'
import { Activity, Gauge, HeartPulse, TrendingDown, User, Zap, AlertCircle } from 'lucide-react'
import { ClinicalFormData } from '../prediction/types'

export interface RiskProfileSectionProps {
  patient: ClinicalFormData
}

export const RiskProfileSection: React.FC<RiskProfileSectionProps> = ({ patient }) => {
  // Factors evaluation
  const factors = [
    {
      name: 'Age',
      value: `${patient.age} yrs`,
      icon: User,
      status: patient.age >= 60 ? 'Higher Risk (≥60)' : patient.age >= 50 ? 'Moderate (50-59)' : 'Lower Risk (<50)',
      statusColor: patient.age >= 60 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: Math.min(Math.max(((patient.age - 20) / (80 - 20)) * 100, 5), 100),
      note: 'Cardiovascular risk scales with vascular aging and arterial compliance loss.',
    },
    {
      name: 'Resting Blood Pressure',
      value: `${patient.trestbps} mmHg`,
      icon: Gauge,
      status: patient.trestbps >= 140 ? 'Stage 2 HTN (≥140)' : patient.trestbps >= 130 ? 'Stage 1 HTN (130-139)' : patient.trestbps >= 120 ? 'Elevated (120-129)' : 'Optimal (<120)',
      statusColor: patient.trestbps >= 130 ? 'bg-red-100 text-red-800 border-red-300' : patient.trestbps >= 120 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: Math.min(Math.max(((patient.trestbps - 90) / (180 - 90)) * 100, 5), 100),
      note: 'Elevated arterial pressure increases cardiac afterload and endothelial shear stress.',
    },
    {
      name: 'Serum Cholesterol',
      value: `${patient.chol} mg/dL`,
      icon: Activity,
      status: patient.chol >= 240 ? 'High (≥240)' : patient.chol >= 200 ? 'Borderline (200-239)' : 'Desirable (<200)',
      statusColor: patient.chol >= 240 ? 'bg-red-100 text-red-800 border-red-300' : patient.chol >= 200 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: Math.min(Math.max(((patient.chol - 120) / (320 - 120)) * 100, 5), 100),
      note: 'Excess circulating atherogenic lipoproteins foster subintimal plaque accumulation.',
    },
    {
      name: 'Maximum Heart Rate',
      value: `${patient.thalach} bpm`,
      icon: HeartPulse,
      status: patient.thalach < 130 ? 'Low Peak Achieved (<130)' : patient.thalach >= 160 ? 'Robust Exertion (≥160)' : 'Moderate Exertion (130-159)',
      statusColor: patient.thalach < 130 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: Math.min(Math.max(((patient.thalach - 80) / (200 - 80)) * 100, 5), 100),
      note: 'Sub-target peak rate during exercise stress can signal chronotropic incompetence.',
    },
    {
      name: 'Exercise-Induced Angina',
      value: patient.exang === 1 ? 'Yes (Induced)' : 'No (None)',
      icon: Zap,
      status: patient.exang === 1 ? 'Positive Stress Angina' : 'Negative (No Angina)',
      statusColor: patient.exang === 1 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: patient.exang === 1 ? 85 : 15,
      note: 'Provocative chest discomfort during stress strongly indicates myocardium under supply-demand mismatch.',
    },
    {
      name: 'ST Depression (Oldpeak)',
      value: `${patient.oldpeak.toFixed(1)} mm`,
      icon: TrendingDown,
      status: patient.oldpeak >= 2.0 ? 'Severe Depression (≥2.0 mm)' : patient.oldpeak >= 1.0 ? 'Significant (1.0-1.9 mm)' : 'Minimal / Normal (<1.0 mm)',
      statusColor: patient.oldpeak >= 1.5 ? 'bg-red-100 text-red-800 border-red-300' : patient.oldpeak >= 1.0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
      percent: Math.min(Math.max((patient.oldpeak / 4.0) * 100, 5), 100),
      note: 'Electrocardiographic ST depression indicates subendocardial ischemia during workload.',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2.5 border-b border-[#D9C7A5]/40 pb-3">
        <Activity className="w-5 h-5 text-[#C87868]" />
        <div>
          <h3 className="text-xl font-serif font-bold text-[#17352D]">
            Risk Profile & Clinical Factor Indicators
          </h3>
          <p className="text-xs text-[#5C6661]">
            Visual mapping of key clinical biomarkers against standard cardiology benchmark thresholds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {factors.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#D9C7A5]/50 shadow-xs space-y-3.5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-center text-[#17352D]">
                      <Icon className="w-4 h-4 text-[#3D8068]" />
                    </div>
                    <span className="text-xs font-bold text-[#17352D] font-sans">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#17352D]">
                    {item.value}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="pt-2">
                  <span className={`inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>

                {/* Range Bar */}
                <div className="pt-3 space-y-1">
                  <div className="w-full h-2 bg-[#FAF8F4] rounded-full overflow-hidden border border-[#D9C7A5]/40">
                    <div
                      className="h-full bg-[#17352D] rounded-full transition-all duration-700"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Explanatory Note */}
              <p className="text-[11px] text-[#5C6661] leading-relaxed pt-2 border-t border-[#FAF8F4]">
                {item.note}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
