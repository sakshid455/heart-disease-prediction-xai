import React from 'react'
import { Globe2, Lock, Activity, Cpu, ArrowRight } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const FutureResearchSection: React.FC = () => {
  const roadmapSteps = [
    {
      step: '01',
      title: 'MULTI-CENTER VALIDATION',
      target: 'External Healthcare Datasets',
      desc: 'Benchmarking the adaptive CTGAN pipeline across heterogeneous multi-hospital cohorts (e.g. MIMIC-IV, eICU, and global registries) to test generalization against covariate shift.',
      icon: <Globe2 className="w-5 h-5 text-[#3D8068]" />,
      tag: 'Prospective Validation',
    },
    {
      step: '02',
      title: 'DIFFERENTIAL PRIVACY',
      target: 'DP-CTGAN Integration',
      desc: 'Incorporating Differentially Private Stochastic Gradient Descent (DP-SGD) with Rényi privacy accounting to establish formal (ε, δ)-differential privacy guarantees.',
      icon: <Lock className="w-5 h-5 text-[#17352D]" />,
      tag: 'Formal Guarantees',
    },
    {
      step: '03',
      title: 'MULTI-MODAL DATA',
      target: 'ECG + Tabular Data',
      desc: 'Extending conditional generative architectures from purely tabular biomarkers to joint multimodal generation combining 12-lead electrocardiogram time-series waveforms.',
      icon: <Activity className="w-5 h-5 text-[#3D8068]" />,
      tag: 'Multimodal Synthesis',
    },
    {
      step: '04',
      title: 'AUTOMATED OPTIMIZATION',
      target: 'Bayesian Augmentation Search',
      desc: 'Deploying Gaussian Process Bayesian Optimization to automatically discover optimal continuous augmentation ratios tailored to clinical loss functions.',
      icon: <Cpu className="w-5 h-5 text-[#17352D]" />,
      tag: 'AutoML Search',
    },
  ]

  return (
    <section id="future-research" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="18"
          eyebrow="Research Trajectory"
          title="Where Can This Research Go Next?"
          description="A structured roadmap outlining prospective future research directions in generative healthcare modeling and clinical AI."
        />

        {/* Visual Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {roadmapSteps.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle flex flex-col justify-between hover:border-[#3D8068]/50 transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                    PHASE {item.step}
                  </span>
                  <span className="text-[10px] font-bold text-[#4A5550]">
                    Future Scope
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 shadow-subtle flex items-center justify-center mb-4">
                  {item.icon}
                </div>

                <h4 className="text-xs font-bold text-[#17352D] uppercase tracking-wider font-mono">
                  {item.title}
                </h4>

                <div className="text-xs font-bold text-[#3D8068] mt-1 mb-2 font-sans">
                  ↓ {item.target}
                </div>

                <p className="text-xs text-[#4A5550] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#E8EEE8] flex items-center justify-between text-[11px] font-mono text-[#17352D]">
                <span>{item.tag}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs font-mono text-[#4A5550]">
          * Note: Roadmap trajectories represent prospective research directions and are not claimed as completed features.
        </div>

      </div>
    </section>
  )
}
