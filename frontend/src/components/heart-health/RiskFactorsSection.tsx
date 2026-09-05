import React from 'react'
import {
  Clock,
  Gauge,
  Droplets,
  Pill,
  Cigarette,
  Armchair,
  Weight,
  Users,
} from 'lucide-react'

const riskFactors = [
  {
    icon: Clock,
    title: 'Age',
    desc: 'Risk increases as you get older. Men over 45 and women over 55 face higher cardiovascular risk.',
    color: '#17352D',
  },
  {
    icon: Gauge,
    title: 'Blood Pressure',
    desc: 'High blood pressure (hypertension) forces the heart to work harder, weakening it over time.',
    color: '#C87868',
  },
  {
    icon: Droplets,
    title: 'Cholesterol',
    desc: 'High LDL cholesterol leads to plaque buildup in arteries, narrowing them and restricting blood flow.',
    color: '#3D8068',
  },
  {
    icon: Pill,
    title: 'Diabetes',
    desc: 'High blood sugar damages blood vessels and nerves that control the heart, doubling cardiovascular risk.',
    color: '#C87868',
  },
  {
    icon: Cigarette,
    title: 'Smoking',
    desc: 'Tobacco damages blood vessel walls, raises blood pressure, and reduces oxygen in the blood.',
    color: '#17352D',
  },
  {
    icon: Armchair,
    title: 'Physical Inactivity',
    desc: 'A sedentary lifestyle weakens the heart muscle and contributes to obesity, diabetes, and high blood pressure.',
    color: '#3D8068',
  },
  {
    icon: Weight,
    title: 'Obesity',
    desc: 'Excess weight strains the heart and is linked to high blood pressure, diabetes, and high cholesterol.',
    color: '#C87868',
  },
  {
    icon: Users,
    title: 'Family History',
    desc: 'A close relative with early heart disease increases your own risk, especially if diagnosed before age 55 (men) or 65 (women).',
    color: '#17352D',
  },
]

/**
 * RiskFactorsSection — Attractive grid of 8 risk factor cards.
 */
export const RiskFactorsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Risk Factors
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            What Increases Your Risk?
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Understanding these factors is the first step toward reducing your cardiovascular risk.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {riskFactors.map((factor, idx) => {
            const Icon = factor.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 shadow-subtle hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${factor.color}10`,
                    border: `1.5px solid ${factor.color}20`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: factor.color }} />
                </div>
                <h3 className="text-base font-bold text-[#17352D] font-sans mb-1.5">
                  {factor.title}
                </h3>
                <p className="text-[13px] text-[#4A5550] leading-relaxed font-sans">
                  {factor.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
