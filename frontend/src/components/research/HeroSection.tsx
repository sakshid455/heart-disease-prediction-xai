import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, HeartPulse, Sparkles, Activity, Layers, Database, ShieldCheck } from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#F7F4ED] border-b border-[#D9C7A5]/40 overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
      {/* Warm Ambient Radial Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#E8EEE8]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D9C7A5]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[#17352D] text-xs font-bold tracking-widest uppercase font-sans">
              <span className="w-2 h-2 rounded-full bg-[#3D8068] animate-pulse" />
              <span>HEART AI RESEARCH</span>
            </div>

            {/* Large Editorial Heading: Playfair Display */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.12]">
              Reimagining Heart Disease Prediction Through Synthetic Data
            </h1>

            {/* Supporting Text: DM Sans */}
            <p className="text-lg sm:text-xl text-[#4A5550] font-sans font-normal leading-relaxed max-w-2xl">
              Exploring CTGAN-based synthetic healthcare data, adaptive augmentation, machine learning and explainable AI.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/research"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-[14px] font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 border border-[#D9C7A5]/30 focus:outline-none"
              >
                <span>Explore Research</span>
                <ArrowRight className="w-4 h-4 text-[#D9C7A5]" />
              </Link>

              <Link
                to="/prediction"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#FAF8F4] text-[#17352D] border border-[#17352D]/30 hover:border-[#17352D] text-[14px] font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 focus:outline-none"
              >
                Try the Model
              </Link>
            </div>

            {/* Empirical Summary Strip */}
            <div className="pt-8 border-t border-[#D9C7A5]/40 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="font-serif text-3xl font-bold text-[#17352D]">68,612</div>
                <div className="text-xs text-[#4A5550] font-sans mt-0.5">Clinical Cohort Records</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-[#3D8068]">+7.29%</div>
                <div className="text-xs text-[#4A5550] font-sans mt-0.5">Sensitivity Surge (Recall)</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-serif text-3xl font-bold text-[#17352D]">ρ = +0.8455</div>
                <div className="text-xs text-[#4A5550] font-sans mt-0.5">SHAP Rank Concordance</div>
              </div>
            </div>

          </div>

          {/* RIGHT: Cardiovascular Research Artistic Visual Container */}
          <div className="lg:col-span-5">
            <div className="relative group">
              
              {/* Outer Decorative Card Container */}
              <div className="bg-[#FFFFFF] border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-elevated transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8EEE8]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#17352D] flex items-center justify-center">
                      <HeartPulse className="w-4 h-4 text-[#C87868]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#17352D] uppercase font-sans">
                        Cardiovascular Manifold
                      </div>
                      <div className="text-[11px] text-[#4A5550] font-sans">
                        Multi-Biomarker Physiological Synthesis
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                    CTGAN 200%
                  </span>
                </div>

                {/* Center Anatomical & Generative Manifold Visual */}
                <div className="relative h-64 sm:h-72 w-full bg-[#FAF8F4] rounded-2xl border border-[#D9C7A5]/30 flex items-center justify-center overflow-hidden p-4">
                  
                  {/* Subtle Geometric Medical Lines */}
                  <svg className="absolute inset-0 w-full h-full text-[#3D8068]/20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="cardio-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.75" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cardio-grid)" />
                  </svg>

                  {/* Anatomical Heart Center Graphic with ECG waves */}
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[#17352D] text-[#F7F4ED] flex items-center justify-center shadow-elevated border-2 border-[#D9C7A5] transition-transform duration-500 group-hover:scale-105">
                      <Activity className="w-12 h-12 text-[#C87868] stroke-[1.5]" />
                    </div>

                    <div className="space-y-1">
                      <div className="font-serif font-bold text-base text-[#17352D]">
                        Adaptive Decision Boundary
                      </div>
                      <div className="text-[11px] font-mono text-[#3D8068] font-semibold">
                        Wasserstein Distance W₁ = 0.0624
                      </div>
                    </div>
                  </div>

                  {/* Animated / Floating Biomarker Data Nodes */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#17352D] shadow-subtle">
                    <span className="text-[#3D8068] font-bold">ap_hi:</span> 138 mmHg
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#17352D] shadow-subtle">
                    <span className="text-[#3D8068] font-bold">chol:</span> Level 2 (Borderline)
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#17352D] shadow-subtle">
                    <span className="text-[#C87868] font-bold">SHAP:</span> +0.6783
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-[#D9C7A5]/50 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#17352D] shadow-subtle">
                    <span className="text-[#3D8068] font-bold">DCR:</span> 0.4782
                  </div>
                </div>

                {/* Footer Flow Nodes */}
                <div className="mt-5 pt-4 border-t border-[#E8EEE8] grid grid-cols-3 gap-2 text-center text-[11px] font-sans">
                  <div className="p-2 rounded-lg bg-[#FAF8F4] border border-[#D9C7A5]/30">
                    <span className="text-[#4A5550] block text-[10px]">Cohort</span>
                    <span className="font-bold text-[#17352D]">54,889 Train</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#E8EEE8] border border-[#D8E2D8]">
                    <span className="text-[#3D8068] block text-[10px]">Synthesis</span>
                    <span className="font-bold text-[#17352D]">109,778 Synthetic</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF8F4] border border-[#D9C7A5]/30">
                    <span className="text-[#4A5550] block text-[10px]">Inference</span>
                    <span className="font-bold text-[#17352D]">13,723 Test</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
