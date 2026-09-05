import React from 'react'
import { BookOpen, Cpu, PlusCircle } from 'lucide-react'

const ctganCards = [
  {
    icon: BookOpen,
    title: 'Learn',
    desc: 'Learns the complex relationships between clinical variables — how blood pressure relates to age, how cholesterol interacts with lifestyle factors, and more.',
    color: '#17352D',
  },
  {
    icon: Cpu,
    title: 'Generate',
    desc: 'Creates entirely new synthetic patient records that statistically resemble the original data distribution without copying any real patient information.',
    color: '#3D8068',
  },
  {
    icon: PlusCircle,
    title: 'Augment',
    desc: 'Provides additional training data for experimentation, enabling researchers to evaluate how augmentation ratios affect model performance.',
    color: '#C87868',
  },
]

/**
 * CTGANSection — "Why CTGAN?" section with beginner-friendly explanation and three cards.
 */
export const CTGANSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Synthetic Data Generation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Why CTGAN?
          </h2>
        </div>

        {/* Explanation paragraph */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-base text-[#4A5550] leading-relaxed font-sans">
            <strong className="text-[#17352D]">CTGAN</strong> (Conditional Tabular Generative Adversarial Network) is a deep learning model designed specifically for tabular data. Unlike image-focused GANs, CTGAN understands the unique challenges of healthcare tables — mixing continuous measurements like blood pressure with categorical values like cholesterol levels. It learns the underlying patterns in real patient data and uses them to generate new, realistic synthetic records.
          </p>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctganCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-7 shadow-subtle hover:shadow-elevated hover:border-[#3D8068]/40 transition-all duration-300 hover:-translate-y-1.5 text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${card.color}10`,
                    border: `1.5px solid ${card.color}25`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>

                <h3 className="text-xl font-serif font-bold text-[#17352D] mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#4A5550] leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
