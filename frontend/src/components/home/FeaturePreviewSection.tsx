import React from 'react'
import { Link } from 'react-router-dom'
import {
  HeartPulse,
  ShieldCheck,
  Eye,
  Database,
  GitCompare,
  FlaskConical,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: HeartPulse,
    title: 'Heart Risk Prediction',
    desc: 'Input clinical biomarkers and receive real-time cardiovascular risk predictions powered by trained ML models.',
    to: '/prediction',
    gradient: 'from-[#C87868]/10 to-[#C87868]/5',
    iconColor: '#C87868',
    borderHover: '#C87868',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment',
    desc: 'Comprehensive risk profiling using multiple clinical attributes with confidence-calibrated outputs.',
    to: '/prediction',
    gradient: 'from-[#17352D]/10 to-[#17352D]/5',
    iconColor: '#17352D',
    borderHover: '#17352D',
  },
  {
    icon: Eye,
    title: 'Explainable AI',
    desc: 'SHAP-powered explanations reveal which features drive each prediction, ensuring transparency.',
    to: '/explainability',
    gradient: 'from-[#3D8068]/10 to-[#3D8068]/5',
    iconColor: '#3D8068',
    borderHover: '#3D8068',
  },
  {
    icon: Database,
    title: 'Synthetic Data',
    desc: 'CTGAN-generated synthetic healthcare records expand limited clinical datasets while preserving distributions.',
    to: '/synthetic-data',
    gradient: 'from-[#C87868]/10 to-[#17352D]/5',
    iconColor: '#C87868',
    borderHover: '#C87868',
  },
  {
    icon: GitCompare,
    title: 'Model Comparison',
    desc: 'Benchmark Random Forest, XGBoost, LightGBM, and more across augmentation strategies.',
    to: '/models',
    gradient: 'from-[#3D8068]/10 to-[#3D8068]/5',
    iconColor: '#3D8068',
    borderHover: '#3D8068',
  },
  {
    icon: FlaskConical,
    title: 'Research Analytics',
    desc: 'Explore detailed experimental results, statistical analysis, and reproducible research findings.',
    to: '/results',
    gradient: 'from-[#17352D]/10 to-[#3D8068]/5',
    iconColor: '#17352D',
    borderHover: '#17352D',
  },
]

/**
 * FeaturePreviewSection — Six large feature cards with icons, descriptions, hover animations, and "Explore" actions.
 */
export const FeaturePreviewSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Explore the Platform
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] mt-3 font-sans">
            From prediction to explanation — every tool you need for transparent cardiovascular risk analysis.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Link
                key={idx}
                to={feature.to}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
                style={{ ['--border-hover' as string]: feature.borderHover }}
              >
                <div>
                  {/* Icon area */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 border border-[#D9C7A5]/30`}>
                    <Icon className="w-6 h-6" style={{ color: feature.iconColor }} />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#17352D] mb-2 group-hover:text-[#3D8068] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                    {feature.desc}
                  </p>
                </div>

                {/* Explore action */}
                <div className="mt-5 pt-4 border-t border-[#E8EEE8] flex items-center gap-2 text-sm font-semibold text-[#3D8068] group-hover:text-[#17352D] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
