import React from 'react'
import { Database, TrendingUp, FlaskConical, AlertCircle, ArrowUpRight } from 'lucide-react'

export const WhySyntheticDataSection: React.FC = () => {
  const cards = [
    {
      icon: Database,
      title: 'Limited Data',
      subtitle: 'Scarcity & Clinical Privacy Constraints',
      color: '#17352D',
      accentColor: '#D9C7A5',
      description:
        'Healthcare datasets can be difficult to obtain and may be small. Patient health records are strictly regulated by HIPAA and GDPR, and clinical trials often yield only a few hundred curated patient records due to stringent inclusion criteria.',
      points: [
        'Small sample sizes restrict modern deep learning model convergence',
        'Sharing sensitive medical data across institutions poses severe privacy risks',
        'Label imbalance occurs when positive disease cases are relatively rare',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Data Augmentation',
      subtitle: 'Expanding Training Reservoirs Responsibly',
      color: '#3D8068',
      accentColor: '#3D8068',
      description:
        'Synthetic records can increase the amount of training data. By augmenting real cohorts with realistic CTGAN-generated profiles, machine learning classifiers can generalize better across complex multivariate clinical boundaries.',
      points: [
        'Increases clinical screening recall by +7.29 percentage points',
        'Populates sparse decision boundaries between borderline biomarkers',
        'Stabilizes high-capacity models like XGBoost and Random Forests',
      ],
    },
    {
      icon: FlaskConical,
      title: 'Research',
      subtitle: 'Controlled Machine Learning Experimentation',
      color: '#C87868',
      accentColor: '#C87868',
      description:
        'Synthetic data enables controlled experimentation. Investigators can test varying augmentation ratios, evaluate model bias under different demographic proportions, and share synthetic benchmarks openly with the broader research community.',
      points: [
        'Facilitates systematic exploration across 0% to 200% augmentation',
        'Allows reproducible open-science benchmarking without privacy violations',
        'Enables stress-testing model resilience against synthetic boundary noise',
      ],
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 2 &bull; Motivation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Why Synthetic Data?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Machine learning in cardiology faces a chronic tension between the data volume required for robust generalizability and the stringent ethical constraints safeguarding patient records. Generative modeling bridges this divide.
          </p>
        </div>

        {/* 3 Prominent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#D9C7A5]/60 shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-sm"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-1">
                    {card.subtitle}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#17352D] mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#4A5550] leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#D9C7A5]/40 space-y-2">
                  {card.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-[#5C6B64]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3D8068] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Regulatory note banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#E8EEE8]/60 border border-[#3D8068]/30 flex items-center gap-3 text-xs sm:text-sm text-[#17352D]">
          <AlertCircle className="w-5 h-5 text-[#3D8068] shrink-0" />
          <span>
            <strong>Research Compliance Notice:</strong> Synthetic patient profiles generated by CTGAN do not correspond to individual human identities. They reproduce aggregate multivariate distributions to support exploratory model validation.
          </span>
        </div>

      </div>
    </section>
  )
}
