import React from 'react'
import { Sparkles, Eye, ShieldCheck, ArrowDown } from 'lucide-react'

export const XaiHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#E8EEE8]/70 via-[#F7F4ED] to-[#F7F4ED] pt-16 pb-14 border-b border-[#D9C7A5]/40 overflow-hidden">
      {/* Background ambient medical glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#3D8068]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#C87868]/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D9C7A5]/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#3D8068]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#17352D] font-mono">
            Explainable AI (SHAP) Protocol
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.15]">
          Don't Just Get a Prediction.{' '}
          <span className="block text-[#3D8068] mt-1">Understand It.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#4A5550] max-w-2xl mx-auto leading-relaxed font-sans">
          Explainable AI reveals which clinical features influenced the model's decision, ensuring that cardiovascular predictions are transparent, auditable, and clinically coherent.
        </p>

        {/* Floating stat pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9C7A5]/50 text-xs font-mono text-[#17352D] shadow-2xs">
            Game-Theoretic Shapley Values
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9C7A5]/50 text-xs font-mono text-[#17352D] shadow-2xs">
            Bidirectional Risk Attribution
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9C7A5]/50 text-xs font-mono text-[#17352D] shadow-2xs">
            100% Primary Directional Agreement
          </span>
        </div>

      </div>
    </section>
  )
}
