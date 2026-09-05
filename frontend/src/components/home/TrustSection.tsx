import React from 'react'
import { Cpu, Database, Eye, FlaskConical } from 'lucide-react'

const trustCards = [
  {
    icon: Cpu,
    title: 'AI-Powered',
    desc: 'Machine learning models analyze clinical attributes to identify cardiovascular disease risk patterns.',
    color: '#3D8068',
  },
  {
    icon: Database,
    title: 'Data Augmentation',
    desc: 'CTGAN generates synthetic healthcare records to expand limited clinical datasets responsibly.',
    color: '#17352D',
  },
  {
    icon: Eye,
    title: 'Explainable',
    desc: 'SHAP reveals the features influencing predictions, making every decision transparent and auditable.',
    color: '#C87868',
  },
  {
    icon: FlaskConical,
    title: 'Research Driven',
    desc: 'Experiments evaluate models and augmentation strategies with rigorous statistical methodology.',
    color: '#3D8068',
  },
]

/**
 * TrustSection — Trust/Introduction section with four capability cards.
 */
export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EEE8] border border-[#D8E2D8] text-[11px] font-bold tracking-[0.15em] uppercase text-[#17352D] font-sans mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#17352D] tracking-tight leading-tight">
            Turning Healthcare Data Into Understandable Insights
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="group bg-white border border-[#D9C7A5]/50 rounded-2xl p-6 shadow-subtle hover:shadow-elevated hover:border-[#3D8068]/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}12`, border: `1px solid ${card.color}25` }}
                >
                  <Icon className="w-5.5 h-5.5" style={{ color: card.color }} />
                </div>

                <h3 className="text-lg font-serif font-bold text-[#17352D] mb-2">
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
