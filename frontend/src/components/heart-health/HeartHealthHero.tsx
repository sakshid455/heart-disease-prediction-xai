import React from 'react'
import { HeartPulse } from 'lucide-react'

/**
 * HeartHealthHero — Premium medical education hero for the Heart Health page.
 */
export const HeartHealthHero: React.FC = () => {
  return (
    <section className="relative bg-[#F7F4ED] overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 border-b border-[#D9C7A5]/40">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[700px] bg-[#C87868]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8EEE8]/50 rounded-full blur-[100px] -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D9C7A5]/15 rounded-full blur-[100px] translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto animate-[fadeSlideUp_0.8s_ease-out_both]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C87868]/10 border border-[#C87868]/20 backdrop-blur-sm mb-6">
            <HeartPulse className="w-4 h-4 text-[#C87868] animate-[heartbeat_2s_ease-in-out_infinite]" />
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#C87868] font-sans">
              Heart Health Education
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.1] mb-6">
            Understand Your Heart.{' '}
            <span className="block mt-1 text-[#C87868]">Understand Your Risk.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#4A5550] font-sans leading-relaxed max-w-2xl mx-auto">
            Learn about heart disease, common risk factors, warning signs and practical prevention strategies.
          </p>
        </div>

        {/* Decorative ECG line */}
        <div className="mt-12 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]">
          <svg className="w-full max-w-xl mx-auto h-10 opacity-25" viewBox="0 0 600 40" preserveAspectRatio="none">
            <path
              d="M0,20 L100,20 L120,20 L130,18 L140,22 L150,6 L160,34 L170,2 L180,38 L190,14 L200,20 L300,20 L320,20 L330,18 L340,22 L350,6 L360,34 L370,2 L380,38 L390,14 L400,20 L500,20 L520,20 L530,18 L540,22 L550,6 L560,34 L570,2 L580,38 L590,14 L600,20"
              fill="none"
              stroke="#C87868"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
