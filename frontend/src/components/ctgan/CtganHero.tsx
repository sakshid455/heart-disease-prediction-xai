import React from 'react'
import { Sparkles, Database, ShieldCheck, Cpu, ArrowDown } from 'lucide-react'

export const CtganHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F7F4ED] to-[#EFEAE1] border-b border-[#D9C7A5]/40 py-16 lg:py-24">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3D8068]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C87868]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17352D]/5 border border-[#17352D]/15 text-[#17352D] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C87868]" />
              <span>Generative Deep Learning &bull; Synthetic Healthcare</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17352D] tracking-tight leading-[1.12]">
              Synthetic Healthcare Data Lab
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed max-w-2xl font-light">
              Explore how CTGAN can generate realistic synthetic records for machine learning experimentation.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-[#D9C7A5]/50">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#17352D]">109,778</div>
                <div className="text-xs text-[#5C6B64] font-medium mt-0.5">Synthetic Patient Records</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#3D8068]">1.16%</div>
                <div className="text-xs text-[#5C6B64] font-medium mt-0.5">Relative Mean Error</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C87868]">0.41%</div>
                <div className="text-xs text-[#5C6B64] font-medium mt-0.5">Exact Duplicate Rate</div>
              </div>
            </div>

            {/* Jump down buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#real-vs-synthetic"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17352D] text-[#F7F4ED] text-sm font-semibold hover:bg-[#102721] transition-all shadow-subtle hover:-translate-y-0.5"
              >
                <span>Compare Real vs Synthetic</span>
                <ArrowDown className="w-4 h-4 text-[#D9C7A5]" />
              </a>
              <a
                href="#generation-pipeline"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-[#D9C7A5] text-[#17352D] text-sm font-medium hover:bg-white transition-all shadow-sm"
              >
                <span>View Pipeline</span>
              </a>
            </div>
          </div>

          {/* Right Visual: Generative Adversarial Loop Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 rounded-2xl p-6 sm:p-7 border border-[#D9C7A5]/60 shadow-elevated relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-[#D9C7A5]/40 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#17352D]/10 flex items-center justify-center text-[#17352D]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#17352D]">Adversarial Equilibrium</h3>
                    <p className="text-[11px] text-[#5C6B64]">Wasserstein Loss with Gradient Penalty</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#E8EEE8] text-[#17352D]">
                  300 Epochs
                </span>
              </div>

              {/* Generator vs Discriminator mini diagram */}
              <div className="space-y-4">
                {/* Generator Box */}
                <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#17352D] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3D8068]" />
                      Generator Network G(z, cond)
                    </span>
                    <span className="text-[10px] text-[#5C6B64] font-mono">Dense(256) &times; 2</span>
                  </div>
                  <p className="text-xs text-[#5C6B64]">
                    Transforms latent noise <span className="font-mono text-[#17352D]">z ~ N(0,I)</span> conditioned on clinical targets into realistic biomarker vectors.
                  </p>
                </div>

                {/* Adversarial arrow */}
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8B6534]">
                  <span className="h-px w-12 bg-[#D9C7A5]" />
                  <span>Adversarial Minimax Game</span>
                  <span className="h-px w-12 bg-[#D9C7A5]" />
                </div>

                {/* Discriminator Box */}
                <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#17352D] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C87868]" />
                      PacGAN Discriminator D(x)
                    </span>
                    <span className="text-[10px] text-[#5C6B64] font-mono">Pac = 10 samples</span>
                  </div>
                  <p className="text-xs text-[#5C6B64]">
                    Evaluates packed batches to identify mode collapse and scores clinical authenticity against real cohort distributions.
                  </p>
                </div>
              </div>

              {/* Equilibrium Footer */}
              <div className="mt-5 pt-4 border-t border-[#D9C7A5]/40 flex items-center justify-between text-xs">
                <span className="text-[#5C6B64]">Target Distribution Fit:</span>
                <span className="font-bold text-[#17352D] font-mono">46.4% Synth vs 45.9% Real</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
