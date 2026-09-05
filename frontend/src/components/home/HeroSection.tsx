import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { HeroVisual } from './HeroVisual'

/**
 * HeroSection — Large split-screen hero for the CardioAI Home page.
 * Left: Badge, heading, supporting text, CTAs
 * Right: Sophisticated medical visualization
 */
export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#F7F4ED] overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-36 border-b border-[#D9C7A5]/40">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8EEE8]/60 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D9C7A5]/15 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3D8068]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div className="space-y-7 animate-[fadeSlideUp_0.8s_ease-out_both]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8EEE8]/80 border border-[#D8E2D8] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#3D8068] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans">
                AI-Powered Heart Health
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.1]">
              Understand Your Heart.{' '}
              <span className="block mt-1">Predict Risk.</span>
              <span className="block mt-1 text-[#3D8068]">
                Explain Every Decision.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg sm:text-xl text-[#4A5550] font-sans leading-relaxed max-w-xl">
              CardioAI combines machine learning, adaptive synthetic data augmentation, CTGAN, and Explainable AI to provide transparent and research-driven heart disease risk insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-[15px] font-semibold tracking-wide rounded-xl transition-all shadow-elevated hover:-translate-y-0.5 hover:shadow-2xl border border-[#D9C7A5]/30"
              >
                <span>Start Risk Assessment</span>
                <ArrowRight className="w-4.5 h-4.5 text-[#D9C7A5]" />
              </Link>

              <Link
                to="/research"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#FAF8F4] text-[#17352D] border-2 border-[#17352D]/20 hover:border-[#17352D]/50 text-[15px] font-semibold tracking-wide rounded-xl transition-all hover:-translate-y-0.5"
              >
                Explore How It Works
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Medical Visualization */}
          <div className="animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  )
}
