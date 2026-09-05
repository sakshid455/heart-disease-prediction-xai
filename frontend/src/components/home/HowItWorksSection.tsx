import React, { useState, useEffect, useRef } from 'react'
import { Database, Settings, Layers, Shuffle, Brain, Eye } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Patient Data',
    desc: 'Clinical records with cardiovascular biomarkers collected from healthcare datasets.',
    icon: Database,
    color: '#17352D',
  },
  {
    num: '02',
    title: 'Preprocessing',
    desc: 'Feature engineering, normalization, and stratified train-test splitting with data leak prevention.',
    icon: Settings,
    color: '#3D8068',
  },
  {
    num: '03',
    title: 'CTGAN',
    desc: 'Conditional Tabular GAN generates synthetic patient records preserving statistical distributions.',
    icon: Layers,
    color: '#C87868',
  },
  {
    num: '04',
    title: 'Adaptive Augmentation',
    desc: 'Progressive synthetic-to-real ratios (0%–200%) to find optimal augmentation boundaries.',
    icon: Shuffle,
    color: '#17352D',
  },
  {
    num: '05',
    title: 'Machine Learning',
    desc: 'Multiple classifiers (Random Forest, XGBoost, LightGBM, etc.) trained and benchmarked.',
    icon: Brain,
    color: '#3D8068',
  },
  {
    num: '06',
    title: 'SHAP Explainability',
    desc: 'Game-theoretic SHAP values reveal feature contributions for transparent, auditable predictions.',
    icon: Eye,
    color: '#C87868',
  },
]

/**
 * HowItWorksSection — Process timeline with connected lines and scroll-triggered animations.
 */
export const HowItWorksSection: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Research Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            An end-to-end pipeline from clinical data collection to explainable predictions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-gradient-to-r from-[#17352D]/20 via-[#3D8068]/30 to-[#C87868]/20">
            <div
              className="h-full bg-gradient-to-r from-[#17352D] via-[#3D8068] to-[#C87868] rounded-full origin-left"
              style={{
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={idx}
                  className="relative group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(32px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${300 + idx * 150}ms`,
                  }}
                >
                  {/* Step card */}
                  <div className="bg-white border border-[#D9C7A5]/50 rounded-2xl p-5 shadow-subtle hover:shadow-elevated hover:border-[#3D8068]/40 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {/* Number circle */}
                    <div className="relative z-10 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${step.color}10`,
                          borderColor: `${step.color}30`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: step.color }} />
                      </div>
                    </div>

                    <div className="text-[11px] font-mono font-bold text-[#3D8068] uppercase tracking-wider mb-1">
                      Step {step.num}
                    </div>
                    <h3 className="text-base font-bold text-[#17352D] font-sans mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#4A5550] leading-relaxed font-sans flex-grow">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
