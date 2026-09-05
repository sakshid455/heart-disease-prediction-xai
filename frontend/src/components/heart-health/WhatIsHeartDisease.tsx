import React from 'react'
import { HeartPulse } from 'lucide-react'

/**
 * WhatIsHeartDisease — Illustrated section explaining heart disease in simple, accessible language.
 */
export const WhatIsHeartDisease: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#17352D] to-[#23493E] rounded-3xl p-10 sm:p-12 relative overflow-hidden shadow-elevated">
              {/* Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hd-grid)" />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#C87868]/15 rounded-full blur-[60px]" />

              <div className="relative z-10 text-center space-y-6">
                {/* Heart SVG */}
                <div className="mx-auto w-32 h-32 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <defs>
                      <linearGradient id="hd-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C87868" />
                        <stop offset="100%" stopColor="#B06050" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50 88 C25 68, 5 52, 5 35 C5 20, 18 10, 30 10 C38 10, 45 15, 50 22 C55 15, 62 10, 70 10 C82 10, 95 20, 95 35 C95 52, 75 68, 50 88Z"
                      fill="url(#hd-heart-grad)"
                      className="animate-[heartbeat_2s_ease-in-out_infinite]"
                    />
                    {/* Arteries */}
                    <path d="M50 30 C48 40, 42 48, 38 58 M50 30 C52 44, 58 50, 62 58 M50 30 L50 52" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-[#C87868]/20 animate-[pulseRing_2s_ease-out_infinite]" />
                </div>

                {/* ECG */}
                <svg className="w-full h-8 mx-auto" viewBox="0 0 400 32" preserveAspectRatio="none">
                  <path d="M0,16 L80,16 L100,14 L110,18 L120,4 L130,28 L140,2 L150,30 L160,12 L170,16 L250,16 L270,14 L280,18 L290,4 L300,28 L310,2 L320,30 L330,12 L340,16 L400,16" fill="none" stroke="#3D8068" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                </svg>

                <div className="text-white font-serif text-lg font-bold">The Human Heart</div>
                <div className="text-[#D9C7A5] text-sm font-sans">Pumps ~2,000 gallons of blood daily</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C87868]/10 border border-[#C87868]/20 text-[11px] font-bold tracking-[0.15em] uppercase text-[#C87868] font-sans">
              Understanding the Basics
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#17352D] tracking-tight leading-tight">
              What Is Heart Disease?
            </h2>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans">
              Heart disease is a broad term for a range of conditions that affect your heart's structure and function. It is the <strong className="text-[#17352D]">leading cause of death globally</strong>, responsible for approximately 17.9 million lives each year.
            </p>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans">
              At its core, heart disease often involves the <strong className="text-[#17352D]">narrowing or blockage of blood vessels</strong> that supply the heart muscle with oxygen and nutrients. When blood flow is restricted, the heart cannot function properly, which can lead to serious complications.
            </p>

            <p className="text-base text-[#4A5550] leading-relaxed font-sans">
              The good news is that many forms of heart disease are <strong className="text-[#3D8068]">preventable or manageable</strong> through lifestyle choices, regular monitoring, and early detection. Understanding your heart is the first step toward protecting it.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {['17.9M deaths/year', '#1 global killer', 'Often preventable'].map((stat, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-[#E8EEE8] border border-[#D8E2D8] text-xs font-bold text-[#17352D] font-sans">
                  {stat}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
