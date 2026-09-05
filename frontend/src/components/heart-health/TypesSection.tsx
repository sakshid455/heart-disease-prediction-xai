import React from 'react'
import { HeartPulse, Activity, Heart, Waves, Settings } from 'lucide-react'

const types = [
  {
    icon: HeartPulse,
    title: 'Coronary Artery Disease',
    desc: 'The most common type — caused by plaque buildup in the arteries that supply blood to the heart, leading to reduced blood flow.',
    color: '#C87868',
    accent: '#C87868',
  },
  {
    icon: Activity,
    title: 'Arrhythmia',
    desc: 'Irregular heartbeat patterns where the heart beats too fast, too slow, or with an irregular rhythm, affecting blood circulation.',
    color: '#17352D',
    accent: '#17352D',
  },
  {
    icon: Heart,
    title: 'Heart Failure',
    desc: 'A condition where the heart cannot pump blood efficiently enough to meet the body\'s needs, causing fatigue and fluid retention.',
    color: '#3D8068',
    accent: '#3D8068',
  },
  {
    icon: Waves,
    title: 'Cardiomyopathy',
    desc: 'Disease of the heart muscle that makes it harder for the heart to pump blood. Can be inherited or caused by other conditions.',
    color: '#C87868',
    accent: '#C87868',
  },
  {
    icon: Settings,
    title: 'Valvular Heart Disease',
    desc: 'When one or more heart valves don\'t open or close properly, disrupting normal blood flow through the heart chambers.',
    color: '#17352D',
    accent: '#17352D',
  },
]

/**
 * TypesSection — Five interactive cards for types of heart disease.
 */
export const TypesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Types of Heart Disease
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Heart Disease Takes Many Forms
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Understanding the different types helps you recognize how varied cardiovascular conditions can be.
          </p>
        </div>

        {/* Cards — first row of 3, second row of 2 centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, idx) => {
            const Icon = type.icon
            return (
              <div
                key={idx}
                className={`group bg-white border border-[#D9C7A5]/50 rounded-2xl p-7 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 ${
                  idx >= 3 ? 'lg:col-span-1 lg:last:col-start-auto' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    backgroundColor: `${type.color}10`,
                    border: `1.5px solid ${type.color}25`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: type.color }} />
                </div>

                <h3 className="text-lg font-serif font-bold text-[#17352D] mb-2 group-hover:text-[#3D8068] transition-colors">
                  {type.title}
                </h3>
                <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                  {type.desc}
                </p>

                {/* Subtle bottom accent bar on hover */}
                <div className="mt-5 h-1 rounded-full bg-[#E8EEE8] overflow-hidden">
                  <div
                    className="h-full w-0 group-hover:w-full rounded-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: type.accent }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
