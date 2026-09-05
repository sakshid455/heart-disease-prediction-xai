import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, HeartPulse } from 'lucide-react'

export const FinalCtaSection: React.FC = () => {
  return (
    <section id="final-cta" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-gradient-to-br from-[#17352D] via-[#102721] to-[#23493E] text-white rounded-3xl p-8 sm:p-14 lg:p-16 shadow-elevated border border-[#D9C7A5]/40 overflow-hidden text-center sm:text-left">
          
          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D8068]/40 border border-[#3D8068]/50 text-[#D9C7A5] text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D9C7A5]" />
              <span>HEART AI RESEARCH PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Explore the Research
            </h2>

            <p className="text-base sm:text-lg text-[#E8EEE8] leading-relaxed font-normal max-w-2xl">
              Discover how synthetic data, adaptive augmentation and explainable AI come together in an experimental heart disease prediction framework.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link
                to="/prediction"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#3D8068] hover:bg-[#326B57] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle border border-[#D9C7A5]/30"
              >
                <span>Try the Model</span>
                <ArrowRight className="w-4 h-4 text-[#D9C7A5]" />
              </Link>

              <Link
                to="/methodology"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Explore Methodology
              </Link>
            </div>

            <div className="pt-6 border-t border-[#23493E] flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-[#D9C7A5] font-mono">
              <span>N = 68,612 Clinical Cohort</span>
              <span>•</span>
              <span>109,778 Synthetic Pool</span>
              <span>•</span>
              <span>+7.29% Recall Surge</span>
              <span>•</span>
              <span>SHAP ρ = +0.8455</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
