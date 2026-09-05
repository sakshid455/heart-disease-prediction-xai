import React, { useState } from 'react'
import {
  Database,
  Cpu,
  Sparkles,
  Layers,
  Sliders,
  Brain,
  BarChart2,
  Eye,
  Activity,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

interface ArchitectureNode {
  id: string
  title: string
  subtitle: string
  icon: any
  inputs: string
  outputs: string
  mechanism: string
  color: string
}

const ARCHITECTURE_STAGES: ArchitectureNode[] = [
  {
    id: 'dataset',
    title: 'Dataset',
    subtitle: 'Stage 1',
    icon: Database,
    inputs: 'Clinical medical intake & catheterization labs',
    outputs: '303 patient records &bull; 14 attributes',
    mechanism: 'Cleveland Clinic & Hungarian Institute cardiac benchmark cohort.',
    color: '#17352D',
  },
  {
    id: 'preprocessing',
    title: 'Preprocessing',
    subtitle: 'Stage 2',
    icon: Cpu,
    inputs: 'Raw patient records with missing markers',
    outputs: 'Normalized vectors &bull; 80/20 stratified split',
    mechanism: 'Domain median/mode imputation, Z-score scaling, one-hot categorical encoding.',
    color: '#3D8068',
  },
  {
    id: 'ctgan',
    title: 'CTGAN',
    subtitle: 'Stage 3',
    icon: Sparkles,
    inputs: '242 real training vectors only',
    outputs: 'Trained Generative Neural Network model',
    mechanism: 'Variational Gaussian Mixture mode normalization with PacGAN discrimination.',
    color: '#8B6534',
  },
  {
    id: 'synthetic-data',
    title: 'Synthetic Data',
    subtitle: 'Stage 4',
    icon: Layers,
    inputs: 'Trained CTGAN Generator & latent noise z',
    outputs: '109,778 synthetic candidate records',
    mechanism: 'Conditioned sampling preserving multivariate biomarker joint distributions.',
    color: '#C87868',
  },
  {
    id: 'adaptive-aug',
    title: 'Adaptive Augmentation',
    subtitle: 'Stage 5',
    icon: Sliders,
    inputs: 'Real training cohort + Synthetic reservoir',
    outputs: '7 scaled training cohorts (0% to 200%)',
    mechanism: 'Systematic scaling to discover optimal sensitivity vs precision ratio.',
    color: '#3D8068',
  },
  {
    id: 'ml-models',
    title: 'ML Models',
    subtitle: 'Stage 6',
    icon: Brain,
    inputs: 'Augmented training sets',
    outputs: 'Trained XGBoost, Random Forest, LogReg',
    mechanism: 'Second-order gradient boosting, bagging ensembles, and linear hyperplanes.',
    color: '#17352D',
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    subtitle: 'Stage 7',
    icon: BarChart2,
    inputs: 'Trained models & held-out real test set',
    outputs: 'Accuracy, Precision, Recall, F1, ROC-AUC',
    mechanism: 'Cross-validated testing on untouched, real patient records only.',
    color: '#8B6534',
  },
  {
    id: 'shap',
    title: 'SHAP Explainability',
    subtitle: 'Stage 8',
    icon: Eye,
    inputs: 'Trained tree ensemble models & patient vector',
    outputs: 'Local factor breakdown & global feature ranks',
    mechanism: 'TreeSHAP cooperative game theory attribution with exact additivity.',
    color: '#3D8068',
  },
  {
    id: 'prediction-ui',
    title: 'Prediction Interface',
    subtitle: 'Stage 9',
    icon: Activity,
    inputs: 'Interactive patient clinical inputs',
    outputs: 'Risk probability gauge & audited factors',
    mechanism: 'Real-time REST API serving validated predictions with transparent XAI insights.',
    color: '#17352D',
  },
]

export const CompleteArchitectureDiagram: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('adaptive-aug')
  const activeStage =
    ARCHITECTURE_STAGES.find((s) => s.id === activeStageId) || ARCHITECTURE_STAGES[4]

  return (
    <section id="architecture" className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40 scroll-mt-20">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 8 &bull; System Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Complete End-to-End System Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Click any node along the 9-stage pipeline to inspect data inputs, computational transformations, and algorithmic outputs.
          </p>
        </div>

        {/* Interactive Diagram Pipeline Nodes */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle mb-8 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
            {ARCHITECTURE_STAGES.map((stage, idx) => {
              const Icon = stage.icon
              const isSelected = activeStageId === stage.id
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#17352D] text-[#F7F4ED] border-[#17352D] shadow-elevated scale-102 ring-2 ring-[#3D8068]/40'
                      : 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]/50 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-[#D9C7A5]' : 'bg-[#17352D]/10 text-[#5C6B64]'
                      }`}
                    >
                      {stage.subtitle}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D9C7A5]' : 'text-[#3D8068]'}`} />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-xs leading-snug">
                      {stage.title}
                    </h4>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detailed Inspection Box for Selected Stage */}
          <div className="mt-8 pt-6 border-t border-[#D9C7A5]/40 bg-[#FAF8F4] p-6 rounded-2xl border border-[#D9C7A5]/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: activeStage.color }}
                >
                  {React.createElement(activeStage.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#3D8068]">
                    Pipeline {activeStage.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#17352D]">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              <span className="text-xs text-[#5C6B64] font-mono bg-white px-3 py-1.5 rounded-lg border border-[#D9C7A5]/40 self-start sm:self-center">
                Stage {activeStage.subtitle.replace('Stage ', '')} of 9
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-[#D9C7A5]/40">
                <div className="font-bold text-[#5C6B64] uppercase tracking-wider text-[10px] mb-1">
                  Inputs
                </div>
                <div className="text-[#17352D] font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: activeStage.inputs }} />
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#D9C7A5]/40">
                <div className="font-bold text-[#5C6B64] uppercase tracking-wider text-[10px] mb-1">
                  Transformation Mechanism
                </div>
                <div className="text-[#17352D] leading-relaxed">
                  {activeStage.mechanism}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#D9C7A5]/40">
                <div className="font-bold text-[#5C6B64] uppercase tracking-wider text-[10px] mb-1">
                  Outputs
                </div>
                <div className="text-[#3D8068] font-bold font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: activeStage.outputs }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
