import React, { useState } from 'react'
import {
  Database,
  Filter,
  Sparkles,
  Layers,
  Sliders,
  Cpu,
  Lightbulb,
  FileText,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

interface ApproachNode {
  id: string
  step: string
  title: string
  short: string
  explanation: string
  metric: string
  icon: React.ReactNode
}

const APPROACH_NODES: ApproachNode[] = [
  {
    id: 'real-data',
    step: '01',
    title: 'REAL DATA',
    short: 'Clinical Cohort',
    explanation: 'Multi-institutional cardiovascular clinical records comprising 68,612 curated patient observations across 11 primary physiological biomarkers.',
    metric: 'N = 68,612 records (50.5% Neg / 49.5% Pos)',
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: 'preprocessing',
    step: '02',
    title: 'PREPROCESSING',
    short: 'Leak-Free Pipeline',
    explanation: 'Filtering invalid physiological outliers, applying modal median imputation, and enforcing a strictly quarantined 80/20 stratified train/test split.',
    metric: '80% Train (54,889) / 20% Test (13,723)',
    icon: <Filter className="w-5 h-5" />,
  },
  {
    id: 'ctgan',
    step: '03',
    title: 'CTGAN',
    short: 'Generative AI',
    explanation: 'Training Conditional Tabular GAN exclusively on the quarantined training partition using mode-specific normalization and PacGAN (pac=10) for 150 epochs.',
    metric: '2-Layer MLP (256x256), Adam lr=2e-4',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 'synthetic-data',
    step: '04',
    title: 'SYNTHETIC DATA',
    short: 'Generative Pool',
    explanation: 'Synthesizing a 200% capacity synthetic data reservoir with boundary enforcement, statistically audited for Wasserstein density and DCR spacing.',
    metric: 'N = 109,778 synthetic records (W1 = 0.0624)',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 'adaptive-augmentation',
    step: '05',
    title: 'ADAPTIVE AUGMENTATION',
    short: 'Parametric Scaling',
    explanation: 'Constructing systematic training datasets across 7 progressive augmentation ratios (0%, 25%, 50%, 75%, 100%, 150%, 200%) to study performance scaling.',
    metric: '7 cohorts (54,889 to 164,667 rows)',
    icon: <Sliders className="w-5 h-5" />,
  },
  {
    id: 'ml-models',
    step: '06',
    title: 'ML MODELS',
    short: 'Supervised Classifiers',
    explanation: 'Training 4 diverse classifier families (Logistic Regression, Random Forest, SGD-SVM, XGBoost) across all 7 augmentation cohorts for 28 total runs.',
    metric: '28 benchmark model runs evaluated on locked test split',
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: 'shap',
    step: '07',
    title: 'SHAP',
    short: 'Explainable AI',
    explanation: 'Computing Shapley additive explanations to audit biomarker importance preservation and generate individualized patient risk attributions.',
    metric: 'Spearman rank correlation ρ = +0.8455 (p = 1.05e-3)',
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: 'research-findings',
    step: '08',
    title: 'RESEARCH FINDINGS',
    short: 'Scientific Synthesis',
    explanation: 'Uncovering the precision-recall trade-off, identifying the optimal configuration, and developing the Adaptive Augmentation Recommendation Engine.',
    metric: '+7.29% Sensitivity surge (Recall: 73.87% @ 200%)',
    icon: <FileText className="w-5 h-5" />,
  },
]

export const ResearchApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2) // Default to CTGAN
  const activeNode = APPROACH_NODES[activeStepIndex]

  return (
    <section id="research-approach" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="03"
          eyebrow="Scientific Workflow"
          title="Our Research Approach"
          description="An educational overview of the 8-step end-to-end framework connecting clinical data curation, generative synthesis, supervised machine learning, and explainable AI."
        />

        {/* 8-Step Interactive Infographic Stepper */}
        <div className="mb-10 font-sans">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-2">
            {APPROACH_NODES.map((node, idx) => {
              const isSelected = activeStepIndex === idx
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`text-left p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-[110px] focus:outline-none ${
                    isSelected
                      ? 'bg-white border-[#17352D] shadow-elevated ring-2 ring-[#3D8068]/30 -translate-y-1'
                      : 'bg-white/80 border-[#D9C7A5]/40 hover:border-[#3D8068]/40 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-[11px] font-bold ${
                      isSelected ? 'text-[#17352D]' : 'text-[#4A5550]'
                    }`}>
                      {node.step}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#17352D] text-[#F7F4ED]' : 'bg-[#E8EEE8] text-[#17352D]'
                    }`}>
                      <div className="scale-75">{node.icon}</div>
                    </div>
                  </div>

                  <div>
                    <div className={`text-[11px] font-bold tracking-tight truncate ${
                      isSelected ? 'text-[#17352D]' : 'text-[#28302D]'
                    }`}>
                      {node.title}
                    </div>
                    <div className="text-[10px] text-[#4A5550] truncate mt-0.5">
                      {node.short}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Step Explanation Card */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-9 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#E8EEE8]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#17352D] text-[#F7F4ED] flex items-center justify-center shrink-0 border border-[#D9C7A5]/40 shadow-subtle">
                {activeNode.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                    STAGE {activeNode.step} OF 08
                  </span>
                  <span className="font-sans text-[12px] text-[#3D8068] font-bold uppercase tracking-wider">
                    {activeNode.short}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D] tracking-tight">
                  {activeNode.title}
                </h3>
              </div>
            </div>

            <div className="bg-[#FAF8F4] border border-[#D9C7A5]/40 rounded-xl px-4 py-2 text-xs font-mono shrink-0">
              <span className="text-[#4A5550] block text-[10px] uppercase">Verified Implementation</span>
              <span className="font-bold text-[#17352D]">{activeNode.metric}</span>
            </div>
          </div>

          <div className="mt-5 space-y-3 font-sans">
            <div className="text-xs font-bold uppercase tracking-widest text-[#3D8068]">
              Process & Methodology Description
            </div>
            <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed font-normal">
              {activeNode.explanation}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
