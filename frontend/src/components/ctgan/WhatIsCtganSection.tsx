import React from 'react'
import { Brain, Layers, GitMerge, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const WhatIsCtganSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 1 &bull; Core Concept</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            What is CTGAN?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            <strong className="text-[#17352D]">CTGAN</strong> stands for <strong className="text-[#17352D]">Conditional Tabular Generative Adversarial Network</strong>. 
            Unlike traditional GANs built for continuous pixel matrices in images, CTGAN is specifically engineered to model structured tabular healthcare datasets with mixed column types, skewed multimodal distributions, and class imbalance.
          </p>
        </div>

        {/* Intuitive 4-Block Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Two Competing Networks */}
          <div className="p-7 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 shadow-subtle hover:border-[#3D8068]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#17352D] text-[#F7F4ED] flex items-center justify-center mb-5">
              <Brain className="w-6 h-6 text-[#D9C7A5]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Two Cooperating & Competing Networks
            </h3>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              CTGAN consists of two deep neural networks: a <strong>Generator</strong> that creates synthetic patient records, and a <strong>Discriminator</strong> that evaluates whether each record resembles the real clinical population. Through rounds of adversarial training, the generator becomes adept at producing clinically coherent biomarker profiles.
            </p>
            <div className="mt-4 pt-4 border-t border-[#D9C7A5]/40 flex items-center gap-2 text-xs font-medium text-[#3D8068]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Learns multivariate correlations between age, cholesterol & ECG</span>
            </div>
          </div>

          {/* Card 2: Mode-Specific Normalization */}
          <div className="p-7 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 shadow-subtle hover:border-[#3D8068]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#3D8068] text-[#F7F4ED] flex items-center justify-center mb-5">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Mode-Specific Normalization
            </h3>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              Standard neural networks assume continuous values follow a simple bell curve. Clinical biomarkers (like fasting blood sugar or cholesterol) often have multi-modal peaks. CTGAN uses a <strong>Variational Gaussian Mixture Model (VGM)</strong> to identify underlying clusters, encoding each value as both its cluster index and its relative offset.
            </p>
            <div className="mt-4 pt-4 border-t border-[#D9C7A5]/40 flex items-center gap-2 text-xs font-medium text-[#3D8068]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Prevents unnatural rounding or loss of multi-peak distributions</span>
            </div>
          </div>

          {/* Card 3: Conditional Generator & Sampling */}
          <div className="p-7 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 shadow-subtle hover:border-[#3D8068]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#C87868] text-[#F7F4ED] flex items-center justify-center mb-5">
              <GitMerge className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Conditional Generator & Training-by-Sampling
            </h3>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              In real medical data, high-risk categories or severe symptoms may appear infrequently. CTGAN conditions the generator on specific category combinations during training, forcing the model to learn and reproduce underrepresented patient cohorts rather than ignoring them.
            </p>
            <div className="mt-4 pt-4 border-t border-[#D9C7A5]/40 flex items-center gap-2 text-xs font-medium text-[#3D8068]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Equalizes clinical risk sub-strata without synthetic distortion</span>
            </div>
          </div>

          {/* Card 4: PacGAN Mode Collapse Prevention */}
          <div className="p-7 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 shadow-subtle hover:border-[#3D8068]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#8B6534] text-[#F7F4ED] flex items-center justify-center mb-5">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              PacGAN Mode Collapse Prevention
            </h3>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              Standard GANs often suffer from &ldquo;mode collapse,&rdquo; generating the same few patient profiles repeatedly. CTGAN employs <strong>PacGAN (packed sample discrimination)</strong>, feeding batches of 10 rows simultaneously to the discriminator so it can penalize repetitive outputs and guarantee diverse population coverage.
            </p>
            <div className="mt-4 pt-4 border-t border-[#D9C7A5]/40 flex items-center gap-2 text-xs font-medium text-[#3D8068]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Maintains realistic population variance across all 13 biomarkers</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
