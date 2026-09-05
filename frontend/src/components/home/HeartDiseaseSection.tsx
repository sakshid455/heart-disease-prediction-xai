import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, HeartPulse, AlertTriangle, Activity, BarChart3 } from 'lucide-react'

const riskFactors = [
  {
    icon: HeartPulse,
    title: 'Heart Disease Risk',
    desc: 'Cardiovascular disease remains the leading cause of mortality worldwide, claiming 17.9 million lives annually.',
  },
  {
    icon: AlertTriangle,
    title: 'Common Clinical Risk Factors',
    desc: 'Blood pressure, cholesterol levels, glucose, smoking status, and physical activity are key measurable indicators.',
  },
  {
    icon: Activity,
    title: 'Early Assessment Importance',
    desc: 'Early detection can reduce mortality by up to 50%. Timely intervention transforms outcomes for at-risk individuals.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decision Support',
    desc: 'Machine learning models can analyze complex biomarker interactions that manual assessment may miss.',
  },
]

/**
 * HeartDiseaseSection — Two-column section about heart disease and why early risk assessment matters.
 */
export const HeartDiseaseSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Clinical Context
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Why Early Risk Assessment Matters
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Medical Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#17352D] via-[#1E3F35] to-[#23493E] rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-elevated">
              {/* Grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="med-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#med-grid)" />
              </svg>

              {/* Circular glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#C87868]/15 rounded-full blur-[60px]" />

              {/* Heart icon center */}
              <div className="relative z-10 text-center py-8">
                <div className="w-28 h-28 mx-auto rounded-full bg-[#C87868]/20 border-2 border-[#C87868]/30 flex items-center justify-center mb-6">
                  <HeartPulse className="w-14 h-14 text-[#C87868] animate-[heartbeat_2s_ease-in-out_infinite]" />
                </div>
                
                {/* ECG Line */}
                <svg className="w-full h-12 mx-auto" viewBox="0 0 400 48" preserveAspectRatio="none">
                  <path
                    d="M0,24 L60,24 L80,24 L90,22 L100,26 L110,8 L120,40 L130,4 L140,44 L150,18 L160,24 L240,24 L260,24 L270,22 L280,26 L290,8 L300,40 L310,4 L320,44 L330,18 L340,24 L400,24"
                    fill="none"
                    stroke="#3D8068"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>

                <div className="mt-6 text-white font-serif text-xl font-bold">
                  Cardiovascular Risk Analysis
                </div>
                <div className="text-[#D9C7A5] text-sm font-sans mt-1">
                  17.9M annual global mortality
                </div>

                {/* Stat pills */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white/90">
                    11 Clinical Features
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-white/90">
                    ML + SHAP
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[#C87868]/25 border border-[#C87868]/30 text-xs font-mono text-[#C87868]">
                    Early Detection
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Risk Factor Cards */}
          <div className="space-y-5">
            {riskFactors.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="group flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-subtle transition-all duration-300 border border-transparent hover:border-[#D9C7A5]/40"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#E8EEE8] border border-[#D8E2D8] flex items-center justify-center shrink-0 group-hover:bg-[#17352D] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#3D8068] group-hover:text-[#C87868] transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#17352D] font-sans mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}

            <div className="pt-2 pl-4">
              <Link
                to="/heart-health"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3D8068] hover:text-[#17352D] transition-colors"
              >
                <span>Learn About Heart Health</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
