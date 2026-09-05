import React from 'react'
import { HeartPulse, Activity, Brain } from 'lucide-react'

/**
 * AboutHero — Page hero with heading, subtitle, and a medical/AI visual on the right.
 */
export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-[#F7F4ED] overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 border-b border-[#D9C7A5]/40">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8EEE8]/50 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D9C7A5]/15 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <div className="space-y-6 animate-[fadeSlideUp_0.8s_ease-out_both]">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EEE8]/80 border border-[#D8E2D8] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#3D8068] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans">
                About CardioAI
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.12]">
              Making Heart Disease Prediction More Transparent, Robust and Data-Efficient
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5550] font-sans leading-relaxed max-w-xl">
              CardioAI brings together machine learning, synthetic healthcare data and Explainable AI in one research-driven platform.
            </p>
          </div>

          {/* RIGHT: Medical/AI Visual */}
          <div className="animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]">
            <div className="relative w-full max-w-[440px] mx-auto aspect-square">
              {/* Soft circles */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-br from-[#E8EEE8]/70 to-[#D8E2D8]/30 animate-[softPulse_6s_ease-in-out_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full bg-white/60 shadow-subtle" />
              </div>

              {/* Dot grid */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="about-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#17352D" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-dots)" />
              </svg>

              {/* Center icon cluster */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-[floatY_4s_ease-in-out_infinite]">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-[#17352D] flex items-center justify-center shadow-elevated border-2 border-[#D9C7A5]/40">
                    <HeartPulse className="w-14 h-14 text-[#C87868] animate-[heartbeat_2s_ease-in-out_infinite]" />
                  </div>
                  {/* Pulse rings */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-[#C87868]/20 animate-[pulseRing_2s_ease-out_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#C87868]/10 animate-[pulseRing_2s_ease-out_infinite_0.5s]" />
                </div>
              </div>

              {/* Orbiting icons */}
              <div className="absolute top-[12%] left-[15%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl p-3 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]">
                <Brain className="w-6 h-6 text-[#3D8068]" />
                <div className="text-[9px] font-bold text-[#17352D] mt-1 font-sans">ML Models</div>
              </div>
              <div className="absolute top-[15%] right-[12%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl p-3 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]">
                <Activity className="w-6 h-6 text-[#C87868]" />
                <div className="text-[9px] font-bold text-[#17352D] mt-1 font-sans">ECG Data</div>
              </div>
              <div className="absolute bottom-[18%] left-[10%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3 py-2 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]">
                <div className="text-[10px] font-mono text-[#4A5550]">SHAP</div>
                <div className="text-sm font-bold text-[#3D8068] font-serif">ρ = 0.85</div>
              </div>
              <div className="absolute bottom-[12%] right-[15%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3 py-2 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_1s_both]">
                <div className="text-[10px] font-mono text-[#4A5550]">Accuracy</div>
                <div className="text-sm font-bold text-[#17352D] font-serif">90.16%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
