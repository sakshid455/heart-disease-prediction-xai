import React from 'react'
import { Footprints, Apple, Stethoscope } from 'lucide-react'

const pillars = [
  {
    icon: Footprints,
    keyword: 'MOVE',
    title: 'Regular Physical Activity',
    color: '#3D8068',
    points: [
      'Aim for at least 150 minutes of moderate activity per week',
      'Walking, cycling, swimming, or dancing all count',
      'Even small amounts of movement benefit your heart',
      'Regular exercise lowers blood pressure and cholesterol',
    ],
  },
  {
    icon: Apple,
    keyword: 'EAT',
    title: 'Balanced Nutrition',
    color: '#17352D',
    points: [
      'Eat plenty of fruits, vegetables, and whole grains',
      'Choose lean proteins and healthy fats',
      'Limit salt, sugar, and processed foods',
      'Stay hydrated and moderate alcohol intake',
    ],
  },
  {
    icon: Stethoscope,
    keyword: 'MONITOR',
    title: 'Regular Health Checks',
    color: '#C87868',
    points: [
      'Check blood pressure and cholesterol regularly',
      'Monitor blood sugar levels, especially if at risk',
      'Track your weight and body mass index',
      'Discuss your heart health with your doctor annually',
    ],
  },
]

/**
 * PreventionSection — Three large prevention pillar cards.
 */
export const PreventionSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Prevention
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Protect Your Heart
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Simple daily habits can significantly reduce your cardiovascular risk.
          </p>
        </div>

        {/* Three pillar cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Top colored banner */}
                <div
                  className="px-7 pt-8 pb-6 relative overflow-hidden"
                  style={{ backgroundColor: `${pillar.color}08` }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: pillar.color }}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${pillar.color}12`,
                        border: `1.5px solid ${pillar.color}25`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <div
                        className="text-2xl font-serif font-bold tracking-tight"
                        style={{ color: pillar.color }}
                      >
                        {pillar.keyword}
                      </div>
                      <div className="text-sm text-[#4A5550] font-sans">{pillar.title}</div>
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="px-7 pb-7 pt-4 space-y-3">
                  {pillar.points.map((point, pi) => (
                    <div key={pi} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: pillar.color }}
                      />
                      <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
