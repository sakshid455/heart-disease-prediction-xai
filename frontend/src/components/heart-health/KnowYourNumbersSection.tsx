import React from 'react'
import { Gauge, Droplets, Activity, Pill } from 'lucide-react'

const numbers = [
  {
    icon: Gauge,
    title: 'Blood Pressure',
    color: '#C87868',
    ranges: [
      { label: 'Normal', value: 'Below 120/80 mmHg', status: 'good' },
      { label: 'Elevated', value: '120–129 / <80 mmHg', status: 'warn' },
      { label: 'High', value: '130/80 mmHg or higher', status: 'bad' },
    ],
    tip: 'Measured in millimeters of mercury (mmHg). The top number (systolic) measures pressure when the heart beats; the bottom (diastolic) measures pressure between beats.',
  },
  {
    icon: Droplets,
    title: 'Cholesterol',
    color: '#17352D',
    ranges: [
      { label: 'Desirable', value: 'Below 200 mg/dL', status: 'good' },
      { label: 'Borderline', value: '200–239 mg/dL', status: 'warn' },
      { label: 'High', value: '240 mg/dL or above', status: 'bad' },
    ],
    tip: 'Total cholesterol includes LDL ("bad"), HDL ("good"), and other components. Regular testing helps track changes over time.',
  },
  {
    icon: Activity,
    title: 'Heart Rate',
    color: '#3D8068',
    ranges: [
      { label: 'Resting', value: '60–100 bpm', status: 'good' },
      { label: 'Athletic', value: '40–60 bpm', status: 'good' },
      { label: 'Tachycardia', value: 'Above 100 bpm', status: 'bad' },
    ],
    tip: 'Resting heart rate is measured when you are calm and sitting. A lower resting rate generally indicates better cardiovascular fitness.',
  },
  {
    icon: Pill,
    title: 'Blood Glucose',
    color: '#C87868',
    ranges: [
      { label: 'Normal (fasting)', value: 'Below 100 mg/dL', status: 'good' },
      { label: 'Pre-diabetes', value: '100–125 mg/dL', status: 'warn' },
      { label: 'Diabetes', value: '126 mg/dL or above', status: 'bad' },
    ],
    tip: 'Fasting blood sugar is measured after not eating for at least 8 hours. High glucose damages blood vessels and increases heart disease risk.',
  },
]

const statusColors = {
  good: { bg: 'bg-[#3D8068]/10', text: 'text-[#3D8068]', dot: 'bg-[#3D8068]' },
  warn: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  bad: { bg: 'bg-[#C87868]/10', text: 'text-[#C87868]', dot: 'bg-[#C87868]' },
}

/**
 * KnowYourNumbersSection — Cards explaining key health measurements with ranges.
 */
export const KnowYourNumbersSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Health Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Know Your Numbers
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Understanding these key measurements helps you monitor and protect your heart health.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {numbers.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 sm:p-7 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}10`,
                      border: `1.5px solid ${item.color}20`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#17352D]">
                    {item.title}
                  </h3>
                </div>

                {/* Ranges */}
                <div className="space-y-2 mb-4">
                  {item.ranges.map((range, ri) => {
                    const colors = statusColors[range.status as keyof typeof statusColors]
                    return (
                      <div
                        key={ri}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl ${colors.bg}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <span className={`text-sm font-semibold font-sans ${colors.text}`}>
                            {range.label}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#4A5550]">
                          {range.value}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Tip */}
                <p className="text-xs text-[#4A5550] leading-relaxed font-sans border-t border-[#E8EEE8] pt-4">
                  {item.tip}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
