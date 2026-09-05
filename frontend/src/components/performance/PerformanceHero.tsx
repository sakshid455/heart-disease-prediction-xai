import React from 'react'
import { Award, BarChart2, ShieldCheck, ArrowDown, Sparkles } from 'lucide-react'

export const PerformanceHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F7F4ED] to-[#EFEAE1] border-b border-[#D9C7A5]/40 py-16 lg:py-24">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3D8068]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C87868]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17352D]/5 border border-[#17352D]/15 text-[#17352D] text-xs font-semibold uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5 text-[#3D8068]" />
            <span>Empirical Model Validation &bull; 28 Benchmark Runs</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17352D] tracking-tight leading-[1.12]">
            Measuring What the Model Can Actually Do
          </h1>

          <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed max-w-2xl font-light">
            Compare machine learning models and evaluate the impact of adaptive synthetic data augmentation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5C6B64]">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#3D8068]" />
              <span>Held-Out Real Patient Test Split (N = 61)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#C87868]" />
              <span>Zero Synthetic Contamination in Test Split</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#D9C7A5]/50">
              <span className="w-2 h-2 rounded-full bg-[#8B6534]" />
              <span>5-Fold Cross-Validation Audit</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <a
              href="#key-results"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-sm font-semibold hover:bg-[#102721] transition-all shadow-subtle hover:-translate-y-0.5"
            >
              <span>Explore Benchmark Results</span>
              <ArrowDown className="w-4 h-4 text-[#D9C7A5]" />
            </a>
            <a
              href="#model-comparison"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-[#D9C7A5] text-[#17352D] text-sm font-medium hover:bg-white transition-all shadow-sm"
            >
              <span>Model Comparison</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
