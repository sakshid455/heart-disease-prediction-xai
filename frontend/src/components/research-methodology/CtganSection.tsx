import React from 'react'
import { Sparkles, BrainCircuit, ShieldAlert, Cpu, BarChart2, Layers } from 'lucide-react'

export const CtganSection: React.FC = () => {
  const pillars = [
    {
      icon: BrainCircuit,
      title: 'CTGAN Training',
      subtitle: 'Adversarial Minimax Game with PacGAN',
      color: '#17352D',
      description:
        'CTGAN trains two deep networks simultaneously: a Generator mapping latent noise vectors to synthetic patient profiles, and a Discriminator scoring clinical plausibility. Training is stabilized using Wasserstein loss with gradient penalty (WGAN-GP) and packed sampling (PacGAN = 10) across 300 epochs.',
      keyPoints: [
        'Variational Gaussian Mixture (VGM) mode-specific continuous clustering',
        'Training-by-sampling forces representation of rare symptom combinations',
        'Gradient penalty eliminates discriminator saturation and vanishing gradients',
      ],
    },
    {
      icon: Sparkles,
      title: 'Synthetic Generation',
      subtitle: 'Conditioned Manifold Sampling',
      color: '#3D8068',
      description:
        'Once adversarial equilibrium is reached, the generator samples conditioned vectors from normal latent distributions. The inverse VGM transformation reconstructs realistic continuous vitals while categorical outputs undergo discrete softmax probability mapping.',
      keyPoints: [
        'Reservoir of 109,778 synthetic patient vectors generated',
        'Balanced 50/50 conditioned sampling across disease-negative and positive classes',
        'Physiological coherence preserved (e.g. valid pulse pressure differences)',
      ],
    },
    {
      icon: ShieldAlert,
      title: 'Synthetic Evaluation',
      subtitle: 'Empirical Fidelity & Distance Privacy',
      color: '#8B6534',
      description:
        'Before synthetic records are utilized for downstream model training, they undergo a multi-tier empirical audit evaluating statistical fidelity, distribution divergence, and privacy preservation.',
      keyPoints: [
        'Statistical similarity: Relative Mean Error = 1.16% across all biomarkers',
        'Distribution fit: Mean KS statistic = 0.0764, Mean JS divergence = 0.1412',
        'Distance privacy: Exact duplicates = 0.41%, Mean NNDR = 0.7655 (non-memorized)',
      ],
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 3 &bull; Deep Generative Modeling</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Conditional Tabular GAN (CTGAN) Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Standard GAN architectures fail on medical tabular data due to mixed data types and non-Gaussian multimodal distributions. CTGAN overcomes these limitations via mode-specific normalization and conditional generator sampling.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={idx}
                className="bg-[#FAF8F4] rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm"
                    style={{ backgroundColor: pillar.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6B64] block mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-[#17352D] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#4A5550] leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#D9C7A5]/40 space-y-2 bg-white/70 p-4 rounded-xl border border-[#D9C7A5]/30">
                  {pillar.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-[#17352D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D8068] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
