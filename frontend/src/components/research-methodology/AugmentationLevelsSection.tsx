import React from 'react'
import { Layers, Sliders, TrendingUp, CheckCircle2, Award } from 'lucide-react'

interface AugmentationLevel {
  level: string
  ratioNum: number
  real: number
  synthetic: number
  total: number
  description: string
  role: string
}

const AUGMENTATION_LEVELS: AugmentationLevel[] = [
  {
    level: '0%',
    ratioNum: 0,
    real: 242,
    synthetic: 0,
    total: 242,
    description: 'Natural clinical baseline. Standard empirical training on raw Cleveland records only.',
    role: 'Benchmark Control',
  },
  {
    level: '25%',
    ratioNum: 25,
    real: 242,
    synthetic: 60,
    total: 302,
    description: 'Conservative augmentation injecting mild synthetic support along sparse feature margins.',
    role: 'Low Perturbation',
  },
  {
    level: '50%',
    ratioNum: 50,
    real: 242,
    synthetic: 121,
    total: 363,
    description: 'Moderate data expansion balancing empirical patient weight with generative samples.',
    role: 'Intermediate Scaling',
  },
  {
    level: '75%',
    ratioNum: 75,
    real: 242,
    synthetic: 181,
    total: 423,
    description: 'Substantial synthetic volume stabilizing non-linear gradient boosting models.',
    role: 'Optimal Stability Zone',
  },
  {
    level: '100%',
    ratioNum: 100,
    real: 242,
    synthetic: 242,
    total: 484,
    description: '1:1 Parity. Equal weighting between real clinical records and CTGAN synthetic profiles.',
    role: 'Balanced Parity (Recommended)',
  },
  {
    level: '150%',
    ratioNum: 150,
    real: 242,
    synthetic: 363,
    total: 605,
    description: 'Synthetic-dominant regime prioritizing high screening sensitivity and low false negative rates.',
    role: 'High Sensitivity Regimen',
  },
  {
    level: '200%',
    ratioNum: 200,
    real: 242,
    synthetic: 484,
    total: 726,
    description: 'Maximum evaluated scaling ratio. Triples total training size; yields peak recall (96.43%).',
    role: 'Peak Sensitivity Benchmark',
  },
]

export const AugmentationLevelsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 4 &bull; Adaptive Augmentation Spectrum</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Evaluated Augmentation Levels
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Rather than selecting an arbitrary data volume, we systematically assessed <strong>7 distinct augmentation ratios</strong> to empirically map the gradient of sensitivity gains versus potential precision saturation.
          </p>
        </div>

        {/* 7 Augmentation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-8">
          {AUGMENTATION_LEVELS.map((item) => (
            <div
              key={item.level}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                item.ratioNum === 100
                  ? 'bg-[#17352D] text-[#F7F4ED] border-[#17352D] shadow-elevated scale-102 ring-2 ring-[#3D8068]/30'
                  : item.ratioNum === 200
                  ? 'bg-white border-[#8B6534] shadow-sm'
                  : 'bg-white border-[#D9C7A5]/60 shadow-subtle hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-serif text-2xl font-bold font-mono ${
                      item.ratioNum === 100 ? 'text-[#D9C7A5]' : 'text-[#17352D]'
                    }`}
                  >
                    {item.level}
                  </span>
                  {item.ratioNum === 100 && (
                    <Award className="w-4 h-4 text-[#D9C7A5]" />
                  )}
                </div>

                <div
                  className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                    item.ratioNum === 100 ? 'text-white/80' : 'text-[#5C6B64]'
                  }`}
                >
                  {item.role}
                </div>

                <p
                  className={`text-[11px] leading-relaxed mb-4 ${
                    item.ratioNum === 100 ? 'text-white/90' : 'text-[#4A5550]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div
                className={`pt-3 border-t text-[11px] font-mono space-y-1 ${
                  item.ratioNum === 100 ? 'border-white/20 text-white/80' : 'border-[#D9C7A5]/40 text-[#5C6B64]'
                }`}
              >
                <div>Real: <strong className={item.ratioNum === 100 ? 'text-white' : 'text-[#17352D]'}>{item.real}</strong></div>
                <div>Synth: <strong className={item.ratioNum === 100 ? 'text-[#D9C7A5]' : 'text-[#C87868]'}>+{item.synthetic}</strong></div>
                <div>Total: <strong className={item.ratioNum === 100 ? 'text-white' : 'text-[#17352D]'}>{item.total}</strong></div>
              </div>
            </div>
          ))}
        </div>

        {/* Rationale explanation */}
        <div className="bg-white p-5 rounded-2xl border border-[#D9C7A5]/60 flex items-start gap-3.5 text-xs sm:text-sm text-[#4A5550]">
          <CheckCircle2 className="w-5 h-5 text-[#3D8068] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#17352D]">Experimental Protocol: </strong>
            For each of the 7 levels, four distinct classifier families were trained across 5-fold cross-validation, generating 28 distinct benchmark configurations. All models were tested strictly on the identical held-out test cohort ($N = 61$ real patients).
          </div>
        </div>

      </div>
    </section>
  )
}
