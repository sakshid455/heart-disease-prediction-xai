import React from 'react'
import { HeartPulse, ShieldAlert, Sparkles } from 'lucide-react'

export const PredictionHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#E8EEE8]/60 via-[#F7F4ED] to-[#F7F4ED] pt-12 pb-8 border-b border-[#D9C7A5]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D9C7A5]/50 shadow-xs mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#3D8068]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#17352D]">
            Multi-Step Clinical Protocol
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-bold text-[#17352D] tracking-tight leading-tight mb-3">
          Heart Disease Risk Assessment
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#4A5550] max-w-2xl mx-auto font-sans leading-relaxed mb-6">
          Enter the available clinical information to generate a machine-learning risk estimate.
        </p>

        {/* Research Disclaimer Box */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/60 text-xs text-[#5C6661] text-left max-w-2xl">
          <ShieldAlert className="w-4 h-4 text-[#C87868] shrink-0" />
          <span>
            <strong>Research & Educational Use Only:</strong> This evaluation tool provides statistical risk scores derived from trained machine learning benchmarks. It is not an approved medical device and does not substitute for certified physician diagnosis.
          </span>
        </div>

      </div>
    </section>
  )
}
