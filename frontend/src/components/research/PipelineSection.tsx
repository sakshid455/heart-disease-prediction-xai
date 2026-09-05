import React, { useState } from 'react'
import {
  Database,
  Filter,
  Split,
  Sparkles,
  Layers,
  CheckCircle,
  Sliders,
  Cpu,
  BarChart3,
  Lightbulb,
  ArrowRight,
  ArrowDown,
  Info,
  Check,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { ResearchBadge } from '../ui/ResearchBadge'

interface PipelineStage {
  id: string
  step: string
  title: string
  subtitle: string
  icon: React.ReactNode
  tag: string
  purpose: string
  input: string
  output: string
  metric: string
  category: 'data' | 'generative' | 'modeling' | 'xai'
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'dataset',
    step: '01',
    title: 'Dataset',
    subtitle: 'Population Cohort',
    icon: <Database className="w-5 h-5" />,
    tag: 'Cohort',
    purpose: 'Assemble high-scale clinical cohort for cardiovascular risk prediction.',
    input: 'Multi-institutional cardiovascular clinical records',
    output: 'Raw cohort of 70,000 patient records across 11 biomarkers',
    metric: 'N = 70,000 raw samples',
    category: 'data',
  },
  {
    id: 'preprocessing',
    step: '02',
    title: 'Preprocessing',
    subtitle: 'Physiological Curation',
    icon: <Filter className="w-5 h-5" />,
    tag: 'Cleaning',
    purpose: 'Remove physiological impossibilities and standardize feature encodings.',
    input: 'Raw clinical records (blood pressures, cholesterol, age, BMI)',
    output: '68,612 clean records with zero missing values and physiologically valid ranges',
    metric: '1,388 invalid records removed (1.98%)',
    category: 'data',
  },
  {
    id: 'split',
    step: '03',
    title: 'Train/Test Split',
    subtitle: 'Quarantine Isolation',
    icon: <Split className="w-5 h-5" />,
    tag: 'Quarantine',
    purpose: 'Enforce strict 80/20 stratified split to eliminate any data leakage.',
    input: '68,612 clean records (50.5% Neg / 49.5% Pos)',
    output: '54,889 training samples quarantined; 13,723 test samples locked',
    metric: '80/20 Stratified Partition (Seed 42)',
    category: 'data',
  },
  {
    id: 'ctgan',
    step: '04',
    title: 'CTGAN Training',
    subtitle: 'Conditional Generative AI',
    icon: <Sparkles className="w-5 h-5" />,
    tag: 'Synthesis',
    purpose: 'Train Conditional GAN on training partition to learn joint probability manifolds.',
    input: '54,889 quarantined training records (strictly zero test access)',
    output: 'Trained Generator & Discriminator networks with PacGAN (pac=10)',
    metric: '2-Layer Generator (256x256), 150 Epochs',
    category: 'generative',
  },
  {
    id: 'synthetic-pool',
    step: '05',
    title: 'Synthetic Data',
    subtitle: 'Generative Reservoir',
    icon: <Layers className="w-5 h-5" />,
    tag: 'Reservoir',
    purpose: 'Sample synthetic records up to 200% capacity with physiological clipping.',
    input: 'Trained CTGAN conditional generator',
    output: '109,778 synthetic patient records (200% capacity reservoir)',
    metric: 'N = 109,778 synthetic samples',
    category: 'generative',
  },
  {
    id: 'validation',
    step: '06',
    title: 'Validation',
    subtitle: 'Fidelity & Privacy Audit',
    icon: <CheckCircle className="w-5 h-5" />,
    tag: 'Verification',
    purpose: 'Statistically verify marginal fidelity, correlation structures, and privacy bounds.',
    input: 'Real training partition vs. 109,778 synthetic records',
    output: 'Wasserstein W1 = 0.0624, Delta r = 0.0792, DCR privacy distance = 0.4782',
    metric: '98.2% smooth manifold interpolation',
    category: 'generative',
  },
  {
    id: 'augmentation',
    step: '07',
    title: 'Adaptive Augmentation',
    subtitle: 'Parametric Scaling',
    icon: <Sliders className="w-5 h-5" />,
    tag: 'Scaling',
    purpose: 'Construct systematic training datasets across 7 progressive augmentation ratios.',
    input: 'Real training set (54,889) + synthetic subsets (0% to 200%)',
    output: '7 training cohorts ranging from 54,889 to 164,667 total samples',
    metric: '7 Ratios: 0%, 25%, 50%, 75%, 100%, 150%, 200%',
    category: 'modeling',
  },
  {
    id: 'models',
    step: '08',
    title: 'ML Models',
    subtitle: 'Supervised Classifiers',
    icon: <Cpu className="w-5 h-5" />,
    tag: 'Training',
    purpose: 'Train 4 diverse machine learning model families across all augmentation ratios.',
    input: '7 augmented training cohorts with StandardScaler pipelines',
    output: '28 fitted model artifacts (Logistic Regression, Random Forest, SVM, XGBoost)',
    metric: '28 total benchmark model runs',
    category: 'modeling',
  },
  {
    id: 'evaluation',
    step: '09',
    title: 'Evaluation',
    subtitle: 'Held-out Benchmarking',
    icon: <BarChart3 className="w-5 h-5" />,
    tag: 'Benchmarking',
    purpose: 'Evaluate all 28 models strictly on the 13,723 held-out test cohort.',
    input: '13,723 untouched test records with true ground truth',
    output: 'Full metric scorecard: Recall, Precision, Accuracy, F1-score, ROC-AUC',
    metric: '+7.29% Sensitivity Gain (Recall: 73.87%)',
    category: 'modeling',
  },
  {
    id: 'shap',
    step: '10',
    title: 'SHAP Explainability',
    subtitle: 'Feature Attributions',
    icon: <Lightbulb className="w-5 h-5" />,
    tag: 'Interpretability',
    purpose: 'Compute Shapley values to verify feature importance preservation and local attribution.',
    input: 'Fitted augmented models + 2,000 held-out test patient profiles',
    output: 'Global biomarker rank concordance (rho = +0.8455) & local waterfall explanations',
    metric: 'Spearman rho = +0.8455, 100% sign agreement',
    category: 'xai',
  },
]

export const PipelineSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3) // Default to CTGAN

  const activeStage = PIPELINE_STAGES[activeStageIndex]

  const categoryColors = {
    data: 'border-slate-300 text-navy-800 bg-slate-50',
    generative: 'border-accent-300 text-accent-800 bg-accent-50/60',
    modeling: 'border-blue-300 text-blue-800 bg-blue-50/60',
    xai: 'border-amber-300 text-amber-800 bg-amber-50/60',
  }

  const categoryBadges = {
    data: 'bg-slate-100 text-navy-700 border-slate-200',
    generative: 'bg-accent-50 text-accent-800 border-accent-200',
    modeling: 'bg-blue-50 text-blue-800 border-blue-200',
    xai: 'bg-amber-50 text-amber-800 border-amber-200',
  }

  return (
    <section id="pipeline" className="py-20 md:py-28 bg-white border-b border-slate-200/80 scroll-mt-16 overflow-hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="02"
          eyebrow="Scientific Workflow"
          title="From Healthcare Data to Explainable Prediction"
          description="An end-to-end experimental pipeline connecting multi-institutional clinical records, generative synthesis, adaptive scaling, and explainable AI."
        />

        {/* Pipeline Navigation / Stepper Grid (Horizontal on Desktop, Scrollable/Grid) */}
        <div className="mt-8 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-2">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isSelected = activeStageIndex === idx
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative text-left p-3 rounded-xl border transition-all duration-150 flex flex-col justify-between h-[104px] group focus:outline-none ${
                    isSelected
                      ? 'bg-accent-50/80 border-accent-600 shadow-subtle ring-2 ring-accent-600/20'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70 shadow-subtle'
                  }`}
                >
                  {/* Top row: step number + icon */}
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-mono text-[11px] font-bold ${
                      isSelected ? 'text-accent-800' : 'text-navy-400 group-hover:text-navy-600'
                    }`}>
                      {stage.step}
                    </span>
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-accent-700 text-white' : 'bg-slate-100 text-navy-600 group-hover:bg-slate-200'
                    }`}>
                      <div className="scale-75">{stage.icon}</div>
                    </div>
                  </div>

                  {/* Bottom row: Title */}
                  <div>
                    <div className={`text-[12px] font-semibold tracking-tight truncate ${
                      isSelected ? 'text-accent-900 font-bold' : 'text-navy-800'
                    }`}>
                      {stage.title}
                    </div>
                    <div className="text-[10px] text-navy-500 truncate mt-0.5">
                      {stage.subtitle}
                    </div>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-accent-600 z-10" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Detailed Inspection Card for Active Stage */}
        <div className="bg-canvas-subtle border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-subtle relative transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-200/80">
            
            {/* Stage Title & Meta */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-subtle flex items-center justify-center text-accent-700 shrink-0 mt-0.5">
                {activeStage.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-navy-700 border border-slate-200">
                    STAGE {activeStage.step} OF 10
                  </span>
                  <span className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded border ${categoryBadges[activeStage.category]}`}>
                    {activeStage.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  {activeStage.title} — <span className="text-navy-500 font-medium">{activeStage.subtitle}</span>
                </h3>
              </div>
            </div>

            {/* Key Metric Pill */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-subtle shrink-0">
              <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-navy-500">
                Verified Stage Output
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-accent-800 mt-0.5">
                {activeStage.metric}
              </div>
            </div>
          </div>

          {/* 3 Detailed Cards: Purpose, Input, Output */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            
            {/* Card 1: Purpose */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-subtle">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 font-mono mb-2">
                <Info className="w-4 h-4 text-accent-700" />
                <span>Purpose & Scope</span>
              </div>
              <p className="text-xs sm:text-[13px] text-navy-600 leading-relaxed font-normal">
                {activeStage.purpose}
              </p>
            </div>

            {/* Card 2: Input */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-subtle">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 font-mono mb-2">
                <ArrowRight className="w-4 h-4 text-navy-500" />
                <span>Input Data Flow</span>
              </div>
              <p className="text-xs sm:text-[13px] text-navy-600 leading-relaxed font-mono bg-slate-50 p-2.5 rounded border border-slate-200/60">
                {activeStage.input}
              </p>
            </div>

            {/* Card 3: Output */}
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-subtle">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-700 font-mono mb-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Standardized Output</span>
              </div>
              <p className="text-xs sm:text-[13px] text-navy-600 leading-relaxed font-mono bg-slate-50 p-2.5 rounded border border-slate-200/60">
                {activeStage.output}
              </p>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
            <button
              type="button"
              disabled={activeStageIndex === 0}
              onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-700 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-subtle transition-colors"
            >
              <span>← Previous Stage</span>
            </button>

            <div className="flex items-center gap-1">
              {PIPELINE_STAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeStageIndex === idx ? 'w-6 bg-accent-700' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Jump to stage ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              disabled={activeStageIndex === PIPELINE_STAGES.length - 1}
              onClick={() => setActiveStageIndex((prev) => Math.min(PIPELINE_STAGES.length - 1, prev + 1))}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-700 hover:text-navy-900 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-subtle transition-colors"
            >
              <span>Next Stage →</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
