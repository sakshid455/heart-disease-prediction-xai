import React, { useState, useEffect, useRef } from 'react'
import {
  Database,
  Settings,
  Layers,
  Shuffle,
  Brain,
  Eye,
  ArrowDown,
} from 'lucide-react'

const pipelineSteps = [
  {
    icon: Database,
    title: 'Real Healthcare Data',
    desc: 'Clinical cardiovascular records with demographic, lifestyle, and biomarker attributes.',
    color: '#17352D',
    bg: 'bg-[#17352D]/8',
  },
  {
    icon: Settings,
    title: 'Preprocessing',
    desc: 'Feature engineering, normalization, outlier handling, and stratified train-test splitting.',
    color: '#3D8068',
    bg: 'bg-[#3D8068]/8',
  },
  {
    icon: Layers,
    title: 'CTGAN',
    desc: 'Conditional Tabular GAN learns the joint distribution and generates synthetic patient records.',
    color: '#C87868',
    bg: 'bg-[#C87868]/8',
  },
  {
    icon: Shuffle,
    title: 'Synthetic Healthcare Data',
    desc: 'Generated records that preserve statistical properties and multivariate correlations of the original data.',
    color: '#17352D',
    bg: 'bg-[#17352D]/8',
  },
  {
    icon: Shuffle,
    title: 'Adaptive Augmentation',
    desc: 'Progressive blending of synthetic records at ratios from 0% to 200% of the original training set.',
    color: '#3D8068',
    bg: 'bg-[#3D8068]/8',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Multiple classifiers trained and benchmarked to evaluate augmentation impact on predictive performance.',
    color: '#C87868',
    bg: 'bg-[#C87868]/8',
  },
  {
    icon: Eye,
    title: 'SHAP Explainability',
    desc: 'Game-theoretic feature attribution ensures predictions are transparent, auditable, and clinically meaningful.',
    color: '#17352D',
    bg: 'bg-[#17352D]/8',
  },
]

/**
 * ApproachSection — Large visual pipeline showing the research approach as a vertical flow.
 */
export const ApproachSection: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step-index'))
            setVisibleSteps((prev) => new Set([...prev, idx]))
          }
        })
      },
      { threshold: 0.3 }
    )
    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Our Approach
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            A structured end-to-end pipeline from raw clinical data to explainable predictions.
          </p>
        </div>

        {/* Vertical Pipeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Connecting vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-[#D9C7A5]/40">
            <div
              className="w-full bg-gradient-to-b from-[#17352D] via-[#3D8068] to-[#C87868] origin-top transition-transform duration-[2s] ease-out"
              style={{
                height: '100%',
                transform: visibleSteps.size > 0 ? `scaleY(${visibleSteps.size / pipelineSteps.length})` : 'scaleY(0)',
              }}
            />
          </div>

          <div className="space-y-0">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon
              const isVisible = visibleSteps.has(idx)
              const isLast = idx === pipelineSteps.length - 1

              return (
                <div key={idx}>
                  <div
                    ref={(el) => { stepsRef.current[idx] = el }}
                    data-step-index={idx}
                    className="relative flex items-start gap-5 sm:gap-6 pl-0"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                    }}
                  >
                    {/* Step circle */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center bg-white shadow-subtle transition-all duration-300"
                        style={{ borderColor: `${step.color}40` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 bg-white border border-[#D9C7A5]/50 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md text-white" style={{ backgroundColor: step.color }}>
                          STEP {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#17352D] font-sans">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {!isLast && (
                    <div className="flex justify-start pl-[18px] sm:pl-[26px] py-1">
                      <ArrowDown
                        className="w-4 h-4 text-[#D9C7A5]"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transition: `opacity 0.4s ease ${idx * 80 + 300}ms`,
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
