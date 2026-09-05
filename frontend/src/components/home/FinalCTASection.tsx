import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, HeartPulse } from 'lucide-react'

/**
 * FinalCTASection — Large centered call-to-action at the bottom of the homepage.
 */
export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED]">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#17352D] via-[#1A3D33] to-[#23493E] rounded-3xl p-10 sm:p-16 lg:p-20 text-center shadow-elevated border border-[#D9C7A5]/20 overflow-hidden">
          
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#3D8068]/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C87868]/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
          
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          <div className="relative z-10 space-y-6">
            {/* Heart icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#C87868]/20 border border-[#C87868]/30 flex items-center justify-center mb-4">
              <HeartPulse className="w-8 h-8 text-[#C87868] animate-[heartbeat_2s_ease-in-out_infinite]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-serif font-bold text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
              Take the First Step Toward Understanding Your Heart
            </h2>

            <p className="text-base sm:text-lg text-[#D8E2D8] font-sans leading-relaxed max-w-xl mx-auto">
              Explore your risk profile using our research-based machine learning system with transparent, explainable predictions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#3D8068] hover:bg-[#326B57] text-white text-[15px] font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 hover:shadow-2xl border border-[#D9C7A5]/20"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-[15px] font-semibold tracking-wide rounded-xl transition-all hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
