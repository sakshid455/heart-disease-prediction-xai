import React, { useState } from 'react'
import {
  FileSpreadsheet,
  Cpu,
  BrainCircuit,
  Sparkles,
  ShieldAlert,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export const GenerationPipelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      id: 0,
      title: 'Real Dataset',
      stage: 'Step 1',
      icon: FileSpreadsheet,
      badge: 'N = 242 Records',
      summary: 'Baseline Cleveland & Framingham cardiovascular cohort records',
      details: [
        'Curated clinical patient cohort containing 13 verified diagnostic biomarkers',
        'Standardized patient demographic information (age, sex) and hemodynamic vitals',
        'Ground-truth clinical outcome: Presence or absence of coronary artery disease',
      ],
      color: '#17352D',
    },
    {
      id: 1,
      title: 'Preprocessing',
      stage: 'Step 2',
      icon: Cpu,
      badge: 'VGM Clustering',
      summary: 'Mode-specific transformation and discrete frequency encoding',
      details: [
        'Variational Gaussian Mixture modeling separates multimodal continuous columns (e.g. cholesterol, blood pressure)',
        'One-hot representation of discrete categories (chest pain types, ECG classifications, thal defects)',
        'Class frequency calculation for inverse conditional probability sampling',
      ],
      color: '#3D8068',
    },
    {
      id: 2,
      title: 'CTGAN Training',
      stage: 'Step 3',
      icon: BrainCircuit,
      badge: '300 Epochs',
      summary: 'Adversarial minimax game with PacGAN discriminator',
      details: [
        'Generator optimizes Wasserstein loss with gradient penalty (WGAN-GP) to prevent gradient vanishing',
        'PacGAN packs 10 patient vectors per discriminator step to suppress mode collapse',
        'Conditional generator is guided by specific class combinations to ensure rare symptom representation',
      ],
      color: '#8B6534',
    },
    {
      id: 3,
      title: 'Synthetic Generation',
      stage: 'Step 4',
      icon: Sparkles,
      badge: '109,778 Samples',
      summary: 'Sampling conditioned latent vectors to produce synthetic cohort',
      details: [
        'Random normal noise vectors z ~ N(0, I) are mapped through the trained generator',
        'Inverse VGM transform maps cluster components back into realistic continuous clinical values',
        'Generates massive candidate reservoirs for subsequent selective filtration and testing',
      ],
      color: '#C87868',
    },
    {
      id: 4,
      title: 'Quality Evaluation',
      stage: 'Step 5',
      icon: ShieldAlert,
      badge: 'DCR & KS Tests',
      summary: 'Rigorous empirical fidelity and distance-based privacy audit',
      details: [
        'Kolmogorov-Smirnov statistical goodness-of-fit tests verify marginal distribution alignment',
        'Duplicate inspection verifies exact row memorization is strictly below 0.5%',
        'Distance to Closest Record (DCR) and Nearest Neighbor Distance Ratio (NNDR) confirm smooth manifold interpolation',
      ],
      color: '#3D8068',
    },
    {
      id: 5,
      title: 'Model Training',
      stage: 'Step 6',
      icon: GraduationCap,
      badge: '28 Experiments',
      summary: 'Adaptive augmentation and held-out cross-validation testing',
      details: [
        'Real and synthetic data are merged at precise augmentation ratios (0%, 25%, 50%, 75%, 100%, 150%, 200%)',
        'Downstream classifiers (Logistic Regression, Random Forest, XGBoost, LightGBM) are trained',
        'Models are tested exclusively on held-out 100% REAL patient records to prevent test leakage',
      ],
      color: '#17352D',
    },
  ]

  return (
    <section id="generation-pipeline" className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40 scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 3 &bull; End-to-End Workflow</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Generation Pipeline
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            From raw clinical measurements to downstream augmented diagnostic models, each stage of our generative pipeline enforces strict empirical verification.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="relative mb-10">
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-1 bg-[#D9C7A5]/40 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isCurrent = activeStep === idx
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl transition-all border flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#17352D] text-[#F7F4ED] border-[#17352D] shadow-elevated scale-102 ring-2 ring-[#3D8068]/30'
                      : 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]/60 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-white/20 text-[#D9C7A5]' : 'bg-[#17352D]/10 text-[#5C6B64]'
                      }`}
                    >
                      {step.stage}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCurrent ? 'bg-white/10 text-white' : 'bg-[#E8EEE8] text-[#3D8068]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm leading-snug">{step.title}</h4>
                    <span
                      className={`text-[11px] font-mono mt-0.5 block ${
                        isCurrent ? 'text-[#D9C7A5]' : 'text-[#5C6B64]'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D9C7A5]/40 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: steps[activeStep].color }}
              >
                {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#3D8068]">
                    {steps[activeStep].stage} of 6
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-white font-mono text-[#17352D] border border-[#D9C7A5]/50">
                    {steps[activeStep].badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#17352D]">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-medium text-[#4A5550] max-w-md">
              {steps[activeStep].summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps[activeStep].details.map((detail, dIdx) => (
              <div
                key={dIdx}
                className="bg-white p-4 sm:p-5 rounded-xl border border-[#D9C7A5]/40 shadow-sm flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#E8EEE8] text-[#3D8068] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-[#4A5550] leading-relaxed">
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Pipeline sequence flow indicator */}
          <div className="mt-6 pt-5 border-t border-[#D9C7A5]/40 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C6B64]">
            <div className="flex items-center gap-1.5 font-medium">
              <span>Next Stage:</span>
              <strong className="text-[#17352D]">
                {steps[(activeStep + 1) % steps.length].title}
              </strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-[#D9C7A5] text-[#17352D] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all text-xs font-semibold"
              >
                Previous
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-[#17352D] text-[#F7F4ED] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#102721] transition-all text-xs font-semibold flex items-center gap-1"
              >
                <span>Next</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
