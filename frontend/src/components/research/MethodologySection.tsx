import React, { useState } from 'react'
import {
  Database,
  Filter,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  Sliders,
  Cpu,
  BarChart2,
  Lightbulb,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

interface MethodologyStage {
  id: string
  step: string
  title: string
  purpose: string
  input: string
  process: string
  output: string
  icon: React.ReactNode
}

const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    id: 'stage-01',
    step: '01',
    title: 'Clinical Cohort Ingestion & Standardization',
    purpose: 'Standardize multi-institutional cardiovascular observations into structured continuous and discrete biomarker tensors.',
    input: '68,612 raw patient records across 11 primary physiological features (and 303 benchmark records).',
    process: 'Parsed physiological variables, standardized feature naming, and audited initial type boundaries.',
    output: 'Validated baseline clinical dataframe ready for missing value inspection.',
    icon: <Database className="w-4 h-4" />,
  },
  {
    id: 'stage-02',
    step: '02',
    title: 'Missing Value Auditing & Imputation',
    purpose: 'Address missing entries without introducing artificial distributional distortion.',
    input: 'Standardized clinical dataframe with 0.14% overall missing values (isolated to ca and thal attributes).',
    process: 'Applied modal imputation for discrete categorical columns and median imputation for continuous attributes.',
    output: 'Complete, zero-missing clinical cohort matrix.',
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: 'stage-03',
    step: '03',
    title: 'Physiological Outlier Cleaning',
    purpose: 'Remove clinically implausible physiological recording errors.',
    input: 'Imputed clinical dataframe.',
    process: 'Filtered blood pressure anomalies where diastolic exceeded systolic pressure (ap_lo > ap_hi) or values fell outside viable human ranges.',
    output: 'Curated, physiologically consistent patient dataset.',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    id: 'stage-04',
    step: '04',
    title: 'Quarantined 80/20 Stratified Split',
    purpose: 'Prevent data leakage by locking the held-out evaluation partition prior to downstream synthesis.',
    input: 'Cleaned patient records (N = 68,612).',
    process: 'Executed stratified split (random_state=42) preserving 50.5% / 49.5% class balance.',
    output: 'Quarantined Training Split (N = 54,889) and Locked Test Split (N = 13,723).',
    icon: <Lock className="w-4 h-4" />,
  },
  {
    id: 'stage-05',
    step: '05',
    title: 'CTGAN Training & Mode Normalization',
    purpose: 'Train Conditional Tabular GAN exclusively on the training partition.',
    input: 'Quarantined Training Split (N = 54,889). Zero access to test partition.',
    process: 'Trained generator/discriminator with Variational Gaussian Mixture mode-specific normalization and PacGAN (pac=10) for 150 epochs.',
    output: 'Trained CTGAN generator network.',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'stage-06',
    step: '06',
    title: 'Synthetic Reservoir Generation',
    purpose: 'Synthesize a 200% capacity synthetic data pool with post-generation boundary enforcement.',
    input: 'Trained CTGAN generator network.',
    process: 'Sampled 109,778 synthetic rows and applied physiological boundary clipping.',
    output: 'Synthetic data pool (N = 109,778).',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 'stage-07',
    step: '07',
    title: 'Synthetic Quality & Privacy Auditing',
    purpose: 'Statistically verify distribution fidelity and manifold spacing.',
    input: 'Real training rows vs. Generated synthetic rows.',
    process: 'Computed 1-Wasserstein distance (W1), correlation matrix difference (|Δr|), and Distance-to-Closest-Record (DCR).',
    output: 'Validated quality report (W1 = 0.0624, |Δr| = 0.0792, DCR = 0.4782).',
    icon: <FileCheck className="w-4 h-4" />,
  },
  {
    id: 'stage-08',
    step: '08',
    title: 'Adaptive Augmentation Dataset Construction',
    purpose: 'Construct systematic training cohorts across 7 progressive augmentation ratios.',
    input: 'Quarantined training set + Synthetic data pool.',
    process: 'Formulated 7 distinct training datasets: 0% (54,889 rows) to 200% (164,667 rows).',
    output: '7 standardized experimental training matrices.',
    icon: <Sliders className="w-4 h-4" />,
  },
  {
    id: 'stage-09',
    step: '09',
    title: 'Supervised Multi-Model Training',
    purpose: 'Train 4 diverse classifier families across all 7 augmentation cohorts.',
    input: '7 training matrices across 4 model families.',
    process: 'Trained Logistic Regression, Random Forest (100 estimators), SGD-SVM, and XGBoost across all ratios (28 total runs).',
    output: '28 trained classifier models.',
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: 'stage-10',
    step: '10',
    title: 'Held-Out Test Evaluation & Metrics',
    purpose: 'Evaluate all 28 models on the locked held-out test split.',
    input: '28 trained models and locked test split (N = 13,723).',
    process: 'Computed Accuracy, Precision, Recall, F1, and ROC-AUC for all 28 configurations.',
    output: 'Comprehensive 28-run benchmark performance matrix.',
    icon: <BarChart2 className="w-4 h-4" />,
  },
  {
    id: 'stage-11',
    step: '11',
    title: 'Game-Theoretic SHAP Interpretability',
    purpose: 'Quantify global and local feature importance hierarchies across real vs. augmented models.',
    input: 'Trained classifiers and test cohort records.',
    process: 'Computed TreeSHAP and LinearSHAP attributions; evaluated Spearman rank correlation across top biomarkers.',
    output: 'SHAP concordance verification (ρ = +0.8455, p = 1.05 × 10⁻³).',
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    id: 'stage-12',
    step: '12',
    title: 'Robustness, Sensitivity & Statistical Synthesis',
    purpose: 'Validate experimental replicability across 5 random seeds (140 runs) with Benjamini-Hochberg FDR correction.',
    input: 'Multi-seed benchmark outputs and ablation metrics.',
    process: 'Executed paired t-tests with FDR q-value adjustment; synthesized the Adaptive Augmentation Recommendation Engine.',
    output: 'Final peer-review evidence package and frozen model bundle.',
    icon: <Award className="w-4 h-4" />,
  },
]

export const MethodologySection: React.FC = () => {
  const [expandedStage, setExpandedStage] = useState<string | null>('stage-01')

  const toggleStage = (id: string) => {
    setExpandedStage((prev) => (prev === id ? null : id))
  }

  return (
    <section id="methodology" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="16"
          eyebrow="Reproducible Experimental Protocol"
          title="Research Methodology Timeline"
          description="A complete 12-stage sequential audit of data curation, leakage quarantine, conditional generative modeling, and explainability verification."
        />

        {/* 12-Stage Expandable Accordion Timeline */}
        <div className="space-y-3 mb-12">
          {METHODOLOGY_STAGES.map((stage) => {
            const isExpanded = expandedStage === stage.id
            return (
              <div
                key={stage.id}
                className="bg-white border border-[#D9C7A5]/60 rounded-2xl shadow-subtle overflow-hidden transition-colors"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleStage(stage.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left focus:outline-none hover:bg-[#FAF8F4] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40 shrink-0">
                      STAGE {stage.step}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-[#17352D]">
                      {stage.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-[#17352D]">
                      {stage.icon}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#17352D]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#4A5550]" />
                    )}
                  </div>
                </button>

                {/* Accordion Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#E8EEE8] space-y-3 font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#D9C7A5]/30 space-y-1">
                        <span className="font-bold text-[#17352D] uppercase block text-[10px]">
                          Stage Purpose:
                        </span>
                        <p className="text-[#4A5550]">{stage.purpose}</p>
                      </div>

                      <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#D9C7A5]/30 space-y-1">
                        <span className="font-bold text-[#17352D] uppercase block text-[10px]">
                          Input Data & Specifications:
                        </span>
                        <p className="text-[#4A5550]">{stage.input}</p>
                      </div>

                      <div className="bg-[#FAF8F4] p-3.5 rounded-xl border border-[#D9C7A5]/30 space-y-1">
                        <span className="font-bold text-[#17352D] uppercase block text-[10px]">
                          Computational Process:
                        </span>
                        <p className="text-[#4A5550]">{stage.process}</p>
                      </div>

                      <div className="bg-[#E8EEE8]/70 p-3.5 rounded-xl border border-[#D8E2D8] space-y-1">
                        <span className="font-bold text-[#3D8068] uppercase block text-[10px]">
                          Verified Output Artifact:
                        </span>
                        <p className="text-[#17352D] font-mono">{stage.output}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
