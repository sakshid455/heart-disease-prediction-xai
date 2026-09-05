import React from 'react'

/**
 * HeroVisual — A sophisticated medical visualization with:
 * - SVG anatomical heart illustration
 * - Animated ECG waveform
 * - Floating clinical data cards
 * - Subtle AI/data grid elements
 * - Soft circular background elements
 */
export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      {/* Soft circular background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#E8EEE8]/80 to-[#D8E2D8]/40 animate-[softPulse_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full bg-gradient-to-br from-[#FAF8F4] to-[#E8EEE8]/60 animate-[softPulse_6s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] rounded-full bg-white/80 shadow-subtle" />
      </div>

      {/* AI Grid Pattern Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#17352D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* ECG Waveform running across the center */}
      <svg
        className="absolute top-[46%] left-0 w-full h-20 -translate-y-1/2 opacity-30"
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 L80,40 L100,40 L110,38 L120,42 L130,20 L140,60 L150,10 L160,70 L170,30 L180,40 L200,40 L280,40 L300,40 L310,38 L320,42 L330,18 L340,62 L350,8 L360,72 L370,28 L380,40 L400,40 L480,40 L500,40 L510,38 L520,42 L530,20 L540,60 L550,10 L560,70 L570,30 L580,40 L600,40"
          fill="none"
          stroke="#3D8068"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="1200"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 1200;600 600;1200 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Central Real Anatomical Heart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative animate-[floatY_4s_ease-in-out_infinite] flex items-center justify-center">
          {/* Subtle Ambient Pulse Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[190px] rounded-full border border-rose-500/20 animate-[pulseRing_2s_ease-out_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-rose-500/10 animate-[pulseRing_2s_ease-out_infinite_0.5s] pointer-events-none" />

          {/* Real Anatomical Heart with Heartbeat Animation */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center animate-[heartbeat_2.5s_ease-in-out_infinite]">
            <img
              src="/images/anatomical_heart.png"
              alt="Real Anatomical Human Heart - CardioAI"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(180,30,50,0.28)] hover:scale-105 transition-transform duration-300 select-none"
              draggable="false"
              onError={(e) => {
                // Fallback to jpg if png has issue
                (e.target as HTMLImageElement).src = '/images/anatomical_heart.jpg'
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Clinical Data Cards */}
      <div className="absolute top-[8%] left-[5%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3.5 py-2.5 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]">
        <div className="text-[10px] font-mono text-[#4A5550] uppercase tracking-wider">Systolic BP</div>
        <div className="text-base font-bold text-[#17352D] font-serif">138 <span className="text-xs font-sans text-[#4A5550] font-normal">mmHg</span></div>
        <div className="w-full h-1 mt-1 rounded-full bg-[#E8EEE8] overflow-hidden">
          <div className="h-full w-[72%] bg-gradient-to-r from-[#3D8068] to-[#C87868] rounded-full" />
        </div>
      </div>

      <div className="absolute top-[12%] right-[3%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3.5 py-2.5 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]">
        <div className="text-[10px] font-mono text-[#4A5550] uppercase tracking-wider">Risk Score</div>
        <div className="text-base font-bold text-[#C87868] font-serif">0.73</div>
        <div className="text-[10px] text-[#3D8068] font-semibold mt-0.5">▲ Elevated</div>
      </div>

      <div className="absolute bottom-[18%] left-[3%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3.5 py-2.5 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]">
        <div className="text-[10px] font-mono text-[#4A5550] uppercase tracking-wider">Cholesterol</div>
        <div className="text-base font-bold text-[#17352D] font-serif">Level 2</div>
        <div className="text-[10px] text-[#4A5550]">Borderline</div>
      </div>

      <div className="absolute bottom-[12%] right-[5%] bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 rounded-xl px-3.5 py-2.5 shadow-subtle z-20 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]">
        <div className="text-[10px] font-mono text-[#4A5550] uppercase tracking-wider">SHAP Value</div>
        <div className="text-base font-bold text-[#3D8068] font-serif">+0.678</div>
        <div className="flex gap-1 mt-1">
          {[0.8, 0.6, 0.4, 0.9, 0.3].map((v, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-[#3D8068]"
              style={{ height: `${v * 16}px`, opacity: 0.3 + v * 0.7 }}
            />
          ))}
        </div>
      </div>

      {/* AI Neural connection dots */}
      <div className="absolute top-[38%] left-[18%] z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#3D8068]/60 animate-[softPulse_3s_ease-in-out_infinite_0.5s]" />
      </div>
      <div className="absolute top-[32%] right-[22%] z-10">
        <div className="w-2 h-2 rounded-full bg-[#17352D]/40 animate-[softPulse_3s_ease-in-out_infinite_1s]" />
      </div>
      <div className="absolute bottom-[35%] left-[25%] z-10">
        <div className="w-2 h-2 rounded-full bg-[#C87868]/50 animate-[softPulse_3s_ease-in-out_infinite_1.5s]" />
      </div>
      <div className="absolute bottom-[30%] right-[18%] z-10">
        <div className="w-3 h-3 rounded-full bg-[#3D8068]/30 animate-[softPulse_3s_ease-in-out_infinite_2s]" />
      </div>
    </div>
  )
}
