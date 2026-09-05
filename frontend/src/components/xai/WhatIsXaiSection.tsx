import React from 'react'
import { Eye, Sliders, ShieldCheck, HelpCircle } from 'lucide-react'

export const WhatIsXaiSection: React.FC = () => {
  const cards = [
    {
      icon: Eye,
      title: 'Transparency',
      tagline: 'Understand model decisions.',
      desc: 'Traditional machine learning models act like black boxes where numbers go in and a prediction comes out. XAI opens the black box so clinicians can see exactly which parameters drove the calculation.',
      color: 'bg-[#E8EEE8] text-[#17352D] border-[#3D8068]/30',
      iconColor: 'text-[#3D8068]',
    },
    {
      icon: Sliders,
      title: 'Feature Influence',
      tagline: 'Identify important clinical variables.',
      desc: 'Not every biomarker contributes equally. XAI quantifies the mathematical weight of individual features — separating critical indicators like blood pressure and chest pain from minor fluctuations.',
      color: 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]/50',
      iconColor: 'text-[#C87868]',
    },
    {
      icon: ShieldCheck,
      title: 'Trust',
      tagline: 'Make machine learning outputs easier to interpret.',
      desc: 'Healthcare requires rigorous validation. Transparent explanations ensure models conform to known physiological mechanisms rather than relying on spurious statistical artifacts.',
      color: 'bg-[#E8EEE8] text-[#17352D] border-[#3D8068]/30',
      iconColor: 'text-[#3D8068]',
    },
  ]

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-mono">
          Foundational Principle
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] tracking-tight mt-1">
          What is Explainable AI?
        </h2>
        <p className="text-sm text-[#4A5550] mt-2 leading-relaxed">
          In medical machine learning, a raw probability number alone is never enough. Clinicians need to understand <em>why</em> an algorithm predicted high or low risk before acting on the insight.
        </p>
      </div>

      {/* The 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center border shadow-2xs`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#17352D]">
                    {card.title}
                  </h3>
                  <div className="text-xs font-bold text-[#3D8068] font-sans mt-0.5">
                    {card.tagline}
                  </div>
                </div>
                <p className="text-xs text-[#5C6661] leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#FAF8F4] flex items-center gap-1.5 text-[11px] font-mono text-[#808C85]">
                <span>Principle #{idx + 1}</span>
                <span>·</span>
                <span>SHAP Formulation</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
