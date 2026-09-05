import React from 'react'
import {
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldAlert,
  Globe2,
  Lock,
  Activity,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const LimitationsFutureWorkSection: React.FC = () => {
  const limitations = [
    {
      title: 'Demographic & Cohort Specificity',
      desc: 'The primary cohort (N=68,612), while large, reflects specific clinical collection settings. Findings may exhibit geographic or demographic distribution shifts when applied to distinct international patient populations.',
      tag: 'Generalization',
    },
    {
      title: 'External Multi-Center Validation',
      desc: 'Models were evaluated on a held-out test split quarantined from the primary dataset. Prospective multi-center clinical validation on independent external health systems remains necessary.',
      tag: 'Clinical Transfer',
    },
    {
      title: 'Empirical vs. Formal Privacy Guarantees',
      desc: 'Privacy was evaluated through empirical duplicate rates, distance-to-closest-record (DCR), and nearest neighbor distance ratios. Formal (ε, δ)-differential privacy is not claimed by the current implementation.',
      tag: 'Privacy Framework',
    },
    {
      title: 'Dataset & Model Family Dependence',
      desc: 'The observed +7.29% sensitivity gain and 200% augmentation peak were established for tabular cardiovascular biomarkers under evaluated classifiers and may vary across other medical domains.',
      tag: 'Domain Scope',
    },
    {
      title: 'Statistical Fidelity vs. Clinical Validity',
      desc: 'High statistical concordance (Wasserstein W1 = 0.0624) verifies marginal and correlation fidelity but does not automatically guarantee physiological ground truth for every synthetic edge case.',
      tag: 'Clinical Grounding',
    },
  ]

  const roadmapItems = [
    {
      step: '01',
      title: 'Multi-Center Validation',
      target: 'External Healthcare Datasets',
      desc: 'Cross-evaluating generative augmentation protocols across heterogeneous hospital registries (e.g., MIMIC-IV, eICU, and multi-country cohorts) to evaluate out-of-distribution robustness.',
      icon: <Globe2 className="w-5 h-5 text-accent-700" />,
      tag: 'Prospective Validation',
    },
    {
      step: '02',
      title: 'Differential Privacy',
      target: 'DP-CTGAN Integration',
      desc: 'Incorporating DP-SGD (Differentially Private Stochastic Gradient Descent) with Rényi differential privacy accountants to provide formal (ε, δ) mathematical bounds against membership inference.',
      icon: <Lock className="w-5 h-5 text-navy-700" />,
      tag: 'Formal Guarantees',
    },
    {
      step: '03',
      title: 'Multi-Modal Data',
      target: 'Tabular + Raw 12-Lead ECG Waveforms',
      desc: 'Extending conditional generative architectures from purely tabular clinical indicators to joint multi-modal synthesis incorporating continuous 12-lead electrocardiogram time-series.',
      icon: <Activity className="w-5 h-5 text-accent-700" />,
      tag: 'Multi-Modal Synthesis',
    },
    {
      step: '04',
      title: 'Automated Optimization',
      target: 'Bayesian Adaptive Augmentation Search',
      desc: 'Replacing discrete grid exploration with continuous Gaussian Process Bayesian Optimization to automatically identify optimal clinical-utility augmentation frontiers.',
      icon: <Cpu className="w-5 h-5 text-navy-700" />,
      tag: 'AutoML Search',
    },
  ]

  return (
    <section id="limitations" className="py-20 md:py-28 bg-canvas border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="13"
          eyebrow="Scientific Rigor & Future Horizons"
          title="Limitations & Research Roadmap"
          description="Maintaining transparency regarding experimental scope and defining future trajectories for generative healthcare AI."
        />

        {/* LIMITATIONS: Honest Research-Oriented Cards */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
              Study Limitations & Boundary Conditions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {limitations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-navy-700 border border-slate-200">
                      LIMITATION 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-[14px] font-bold text-navy-900 leading-snug">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-xs sm:text-[13px] text-navy-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FUTURE WORK: Visually Connected Research Roadmap */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent-700" />
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                Future Research Roadmap
              </h3>
            </div>
            <span className="text-xs font-mono text-navy-500">
              Prospective Investigation Trajectory (Not Claimed as Current Scope)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {roadmapItems.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-subtle flex flex-col justify-between relative hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent-50 text-accent-800 border border-accent-200">
                      PHASE {item.step}
                    </span>
                    <span className="text-[10px] font-mono text-navy-400">
                      Future Scope
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>

                  <h4 className="text-sm font-bold text-navy-900 leading-tight">
                    {item.title}
                  </h4>
                  <div className="text-xs font-mono font-semibold text-accent-800 mt-1">
                    ↓ {item.target}
                  </div>

                  <p className="mt-3 text-xs text-navy-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-navy-400">
                  <span>{item.tag}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
