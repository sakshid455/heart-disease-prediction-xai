import React from 'react'
import {
  Heart,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Brain,
  Eye,
  Sparkles,
  FileText,
  Database,
  ArrowRight,
} from 'lucide-react'
import { ResourceCategory } from './types'

interface FeaturedTopic {
  title: string
  category: ResourceCategory
  icon: any
  count: number
  description: string
}

const TOPICS: FeaturedTopic[] = [
  {
    title: 'Heart Disease Basics',
    category: 'Heart Health',
    icon: Heart,
    count: 1,
    description: 'Pathophysiology of CAD, coronary arterial stenosis, and myocardial demand.',
  },
  {
    title: 'Risk Factors',
    category: 'Heart Health',
    icon: Activity,
    count: 1,
    description: 'Hypertension, dyslipidemia, diabetes, smoking, and metabolic syndrome.',
  },
  {
    title: 'Warning Signs & Symptoms',
    category: 'Heart Health',
    icon: AlertTriangle,
    count: 1,
    description: 'Substernal angina, atypical presentations, and exercise-induced pain.',
  },
  {
    title: 'Prevention (Life’s Essential 8)',
    category: 'Heart Health',
    icon: ShieldCheck,
    count: 1,
    description: 'Primary lifestyle, pharmacological, and dietary interventions.',
  },
  {
    title: 'Understanding ML Predictions',
    category: 'Machine Learning',
    icon: Brain,
    count: 2,
    description: 'Probability calibration, clinical decision thresholds, and gradient boosting.',
  },
  {
    title: 'Understanding SHAP',
    category: 'Explainable AI',
    icon: Eye,
    count: 2,
    description: 'Axiomatic game theory, additive local factor breakdown, and global ranks.',
  },
  {
    title: 'Understanding CTGAN',
    category: 'Synthetic Data',
    icon: Sparkles,
    count: 2,
    description: 'Mode-specific VGM normalization, PacGAN discrimination, and sampling.',
  },
  {
    title: 'Research Papers',
    category: 'Research',
    icon: FileText,
    count: 1,
    description: '28-run empirical augmentation audit and sensitivity surge findings.',
  },
  {
    title: 'Dataset Resources',
    category: 'Research',
    icon: Database,
    count: 1,
    description: 'UCI Cleveland cardiac benchmark dictionary, attributes, and splits.',
  },
]

interface FeaturedTopicsSectionProps {
  onSelectCategory: (cat: ResourceCategory) => void
}

export const FeaturedTopicsSection: React.FC<FeaturedTopicsSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
              Topic Directory
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17352D] mt-0.5">
              Knowledge Hub Sections
            </h2>
          </div>
          <span className="text-xs text-[#5C6B64] hidden sm:block">
            Click any section to filter resources
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((topic, idx) => {
            const Icon = topic.icon
            return (
              <button
                key={idx}
                onClick={() => onSelectCategory(topic.category)}
                className="bg-white p-5 rounded-2xl border border-[#D9C7A5]/50 shadow-2xs hover:shadow-subtle hover:border-[#17352D] transition-all text-left flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/50 text-[#17352D] flex items-center justify-center shrink-0 group-hover:bg-[#17352D] group-hover:text-[#D9C7A5] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-[#17352D] group-hover:text-[#3D8068] transition-colors truncate">
                      {topic.title}
                    </h4>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5C6B64] group-hover:text-[#17352D] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                  </div>

                  <p className="text-[11px] text-[#5C6B64] mt-1 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
