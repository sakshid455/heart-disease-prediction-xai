import React from 'react'
import { AlertTriangle, Wind, Battery, Activity, CircleDot, Droplets } from 'lucide-react'

const warningSigns = [
  {
    icon: AlertTriangle,
    title: 'Chest Discomfort',
    desc: 'Pressure, squeezing, fullness, or pain in the center of the chest that lasts more than a few minutes or comes and goes.',
  },
  {
    icon: Wind,
    title: 'Shortness of Breath',
    desc: 'Difficulty breathing or feeling breathless, even during normal activities or while resting, with or without chest discomfort.',
  },
  {
    icon: Battery,
    title: 'Unusual Fatigue',
    desc: 'Extreme tiredness or exhaustion that is not explained by activity level, sleep, or other conditions.',
  },
  {
    icon: Activity,
    title: 'Irregular Heartbeat',
    desc: 'Heart pounding, fluttering, or beating too hard or too fast. Noticeable changes in heart rhythm that feel abnormal.',
  },
  {
    icon: CircleDot,
    title: 'Dizziness',
    desc: 'Feeling lightheaded, faint, or unsteady. May occur suddenly and can be accompanied by other symptoms.',
  },
  {
    icon: Droplets,
    title: 'Swelling',
    desc: 'Swelling in the legs, ankles, feet, or abdomen caused by fluid retention when the heart cannot pump effectively.',
  },
]

/**
 * WarningSignsSection — Visually distinct warning signs cards with coral accents and emergency disclaimer.
 */
export const WarningSignsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C87868]/10 border border-[#C87868]/20 text-[11px] font-bold tracking-[0.15em] uppercase text-[#C87868] font-sans mb-4">
            Warning Signs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Know the Warning Signs
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            Recognizing these symptoms early can be life-saving. Always take them seriously.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {warningSigns.map((sign, idx) => {
            const Icon = sign.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#C87868]/15 rounded-2xl p-6 shadow-subtle hover:shadow-elevated hover:border-[#C87868]/40 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Subtle coral top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C87868]/40 via-[#C87868]/60 to-[#C87868]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-xl bg-[#C87868]/10 border border-[#C87868]/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[#C87868]" />
                </div>
                <h3 className="text-base font-bold text-[#17352D] font-sans mb-2">
                  {sign.title}
                </h3>
                <p className="text-[13px] text-[#4A5550] leading-relaxed font-sans">
                  {sign.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Emergency Disclaimer */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#C87868]/8 border-2 border-[#C87868]/30 rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#C87868]/15 border border-[#C87868]/25 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-[#C87868]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#C87868] mb-2">
              Emergency Warning
            </h3>
            <p className="text-sm text-[#4A5550] leading-relaxed font-sans max-w-lg mx-auto">
              <strong className="text-[#17352D]">Severe or sudden symptoms require immediate professional medical attention.</strong> If you or someone around you is experiencing chest pain, difficulty breathing, or loss of consciousness, call emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
