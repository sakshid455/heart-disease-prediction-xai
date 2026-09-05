import React from 'react'
import { Sparkles, Database, Layers } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const CTGANSection: React.FC = () => {
  return (
    <section id="ctgan" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="06"
          eyebrow="Deep Generative Modeling"
          title="Generating Synthetic Healthcare Data"
          description="Conditional Tabular GAN (CTGAN) models non-linear joint probability distributions across clinical biomarkers to synthesize non-identifiable patient records."
        />

        {/* Large Visual Architecture: Real Data -> CTGAN -> Synthetic Data */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-8 sm:p-12 shadow-subtle mb-14 font-sans">
          <div className="text-xs font-bold uppercase tracking-widest text-[#3D8068] mb-8 text-center sm:text-left">
            Generative Tabular Transformation Flow
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-stretch">
            
            {/* Box 1: Real Training Data */}
            <div className="bg-[#FAF8F4] border border-[#D9C7A5]/40 rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#17352D] border border-[#D9C7A5]/40">
                    STAGE 01
                  </span>
                  <span className="font-mono text-[10px] text-[#4A5550] uppercase">Input</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-[#D9C7A5]/40 flex items-center justify-center mb-4">
                  <Database className="w-5 h-5 text-[#17352D]" />
                </div>

                <h4 className="text-base font-serif font-bold text-[#17352D] leading-snug">
                  Real Training Data
                </h4>
                <div className="font-mono text-xs font-bold text-[#17352D] mt-1">
                  54,889 Patient Records (80%)
                </div>

                <p className="mt-2 text-xs text-[#4A5550] leading-relaxed">
                  Strictly quarantined clinical training partition containing real patient continuous and discrete biomarkers.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9C7A5]/30 text-[11px] font-mono text-[#3D8068] font-medium">
                • Zero test leakage access
              </div>
            </div>

            {/* Box 2: CTGAN Generator */}
            <div className="bg-[#17352D] text-[#F7F4ED] border border-[#D9C7A5]/60 rounded-2xl p-6 shadow-elevated flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#3D8068] text-[#F7F4ED]">
                    STAGE 02
                  </span>
                  <span className="font-mono text-[10px] text-[#D9C7A5] font-bold uppercase">Engine</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#23493E] text-[#D9C7A5] flex items-center justify-center mb-4 shadow-subtle border border-[#D9C7A5]/30">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h4 className="text-base font-serif font-bold text-white leading-snug">
                  CTGAN Architecture
                </h4>
                <div className="font-mono text-xs font-bold text-[#D9C7A5] mt-1">
                  PacGAN (pac=10) · 150 Epochs
                </div>

                <p className="mt-2 text-xs text-[#E8EEE8] leading-relaxed">
                  Mode-specific normalization fits Variational Gaussian Mixtures to continuous columns; conditional generator balances discrete categories.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#23493E] text-[11px] font-mono text-[#D9C7A5] font-medium">
                • 2-Layer MLP (256 × 256)
              </div>
            </div>

            {/* Box 3: Synthetic Data */}
            <div className="bg-[#FAF8F4] border border-[#D9C7A5]/40 rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#17352D] border border-[#D9C7A5]/40">
                    STAGE 03
                  </span>
                  <span className="font-mono text-[10px] text-[#4A5550] uppercase">Output</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-white border border-[#D9C7A5]/40 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-[#17352D]" />
                </div>

                <h4 className="text-base font-serif font-bold text-[#17352D] leading-snug">
                  Synthetic Healthcare Data
                </h4>
                <div className="font-mono text-xs font-bold text-[#17352D] mt-1">
                  109,778 Synthetic Samples (200%)
                </div>

                <p className="mt-2 text-xs text-[#4A5550] leading-relaxed">
                  Generated experimental reservoir with physiological boundary enforcement, ready for adaptive augmentation scaling.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D9C7A5]/30 text-[11px] font-mono text-[#3D8068] font-medium">
                • Wasserstein W1 = 0.0624
              </div>
            </div>

          </div>
        </div>

        {/* CTGAN Plain Explanation + Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center font-sans">
          
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#17352D] tracking-tight leading-snug">
              Why Standard GANs Fail on Clinical Tabular Data
            </h3>
            <p className="text-[15px] text-[#4A5550] leading-relaxed font-normal">
              Standard Generative Adversarial Networks were engineered for continuous grid structures like pixel images. In healthcare, tabular patient records combine highly multimodal continuous variables (blood pressures, serum lipids) with discrete categorical indicators (sex, smoking status, chest pain classes).
            </p>
            <p className="text-[15px] text-[#4A5550] leading-relaxed font-normal">
              <strong>CTGAN overcomes this via two innovations:</strong>
            </p>
            <ul className="space-y-2 text-xs sm:text-[14px] text-[#17352D] list-disc list-inside">
              <li><strong>Mode-Specific Normalization:</strong> Decomposes complex multimodal continuous distributions into Gaussian mixture components.</li>
              <li><strong>Conditional Generator with PacGAN:</strong> Feeds packed samples to the discriminator to prevent mode collapse on minority clinical cohorts.</li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle space-y-3 font-mono text-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#17352D] pb-2 border-b border-[#E8EEE8] font-sans">
              CTGAN Experimental Blueprint
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#FAF8F4]">
              <span className="text-[#4A5550]">Real Training Records:</span>
              <span className="font-bold text-[#17352D]">54,889 (80% Partition)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#FAF8F4]">
              <span className="text-[#4A5550]">Synthetic Pool Capacity:</span>
              <span className="font-bold text-[#3D8068]">109,778 (200% Augmentation)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#FAF8F4]">
              <span className="text-[#4A5550]">Biomarker Feature Space:</span>
              <span className="font-bold text-[#17352D]">11 Clinical Features</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#FAF8F4]">
              <span className="text-[#4A5550]">Generator / Discriminator:</span>
              <span className="font-bold text-[#17352D]">MLP (256 × 256)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#4A5550]">PacGAN Discriminator (pac):</span>
              <span className="font-bold text-[#17352D]">10 (Stabilized)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
