import React from 'react'
import { BookOpen, Sparkles, FileText, ArrowDown, Binary } from 'lucide-react'

export const ResearchHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F7F4ED] to-[#EFEAE1] border-b border-[#D9C7A5]/40 py-16 lg:py-24">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3D8068]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C87868]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17352D]/5 border border-[#17352D]/15 text-[#17352D] text-xs font-semibold uppercase tracking-wider font-mono">
            <BookOpen className="w-3.5 h-3.5 text-[#3D8068]" />
            <span>Academic Methodology &bull; Experimental Design</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17352D] tracking-tight leading-[1.12]">
            From Healthcare Data to Explainable Prediction
          </h1>

          <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed max-w-2xl font-light">
            A comprehensive, step-by-step scientific overview of the data engineering, conditional generative deep learning, adaptive augmentation, machine learning benchmarks, and game-theoretic explainability underpinning CardioAI.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5C6B64]">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#17352D]" />
              <span>UCI Cleveland Heart Disease Cohort</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#3D8068]" />
              <span>CTGAN Generative Modeling</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#C87868]" />
              <span>TreeSHAP Attribution Audit</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-sm font-semibold hover:bg-[#102721] transition-all shadow-subtle hover:-translate-y-0.5"
            >
              <span>View System Architecture</span>
              <ArrowDown className="w-4 h-4 text-[#D9C7A5]" />
            </a>
            <a
              href="#dataset-specs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-[#D9C7A5] text-[#17352D] text-sm font-medium hover:bg-white transition-all shadow-sm"
            >
              <span>Dataset & Preprocessing</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
