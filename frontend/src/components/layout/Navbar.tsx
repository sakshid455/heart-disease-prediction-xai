import React from 'react'
import { Menu, Activity, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react'
import { NavRoute } from './Sidebar'

export interface NavbarProps {
  currentRoute: NavRoute
  onToggleMobileSidebar: () => void
  isApiConnected?: boolean
}

export function Navbar({
  currentRoute,
  onToggleMobileSidebar,
  isApiConnected = true,
}: NavbarProps) {
  const routeTitles: Record<NavRoute, { title: string; category: string }> = {
    dashboard: { title: 'Executive Research Dashboard', category: 'Overview' },
    prediction: { title: 'Cardiovascular Disease Prediction', category: 'Clinical Inference' },
    explainability: { title: 'SHAP Explainable AI Analysis', category: 'Interpretability' },
    adaptive: { title: 'Adaptive Synthetic Data Augmentation', category: 'Core Research Contribution' },
    advisor: { title: 'Adaptive Augmentation Advisor', category: 'Optimization Engine' },
    models: { title: 'Cross-Model Performance Benchmarking', category: 'Machine Learning' },
    dataset: { title: 'Dataset Explorer & Feature Glossary', category: 'Data Provenance' },
    results: { title: 'Empirical Findings & Research Synthesis', category: 'Academic Report' },
    methodology: { title: 'End-to-End Methodology Flowchart', category: 'Viva & Demonstration' },
  }

  const current = routeTitles[currentRoute] || { title: 'Dashboard', category: 'HeartAI' }

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-[11px] font-bold text-brand-600 tracking-wider uppercase">
            {current.category}
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
            {current.title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Backend Connectivity Status */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
          <span className={`w-2 h-2 rounded-full ${isApiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span>{isApiConnected ? 'FastAPI Connected' : 'Mock/Offline Mode'}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200/80 rounded-full text-xs font-bold text-brand-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v1.0 Research Edition</span>
        </div>
      </div>
    </header>
  )
}
