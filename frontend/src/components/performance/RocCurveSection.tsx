import React, { useState } from 'react'
import { TrendingUp, Award, Layers, ShieldCheck } from 'lucide-react'

interface RocModelCurve {
  id: string
  name: string
  auc: number
  color: string
  points: { fpr: number; tpr: number }[]
}

const ROC_MODELS: RocModelCurve[] = [
  {
    id: 'xgb200',
    name: 'XGBoost @ 200% Augmentation',
    auc: 0.9372,
    color: '#17352D',
    points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.03, tpr: 0.54 },
      { fpr: 0.06, tpr: 0.75 },
      { fpr: 0.09, tpr: 0.86 },
      { fpr: 0.12, tpr: 0.93 },
      { fpr: 0.15, tpr: 0.96 },
      { fpr: 0.24, tpr: 0.98 },
      { fpr: 0.45, tpr: 1.0 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
  {
    id: 'rf100',
    name: 'Random Forest @ 100% Augmentation',
    auc: 0.9399,
    color: '#3D8068',
    points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.03, tpr: 0.50 },
      { fpr: 0.06, tpr: 0.71 },
      { fpr: 0.12, tpr: 0.86 },
      { fpr: 0.18, tpr: 0.93 },
      { fpr: 0.27, tpr: 0.96 },
      { fpr: 0.48, tpr: 1.0 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
  {
    id: 'lr0',
    name: 'Logistic Regression @ Baseline',
    auc: 0.8852,
    color: '#C87868',
    points: [
      { fpr: 0.0, tpr: 0.0 },
      { fpr: 0.06, tpr: 0.39 },
      { fpr: 0.12, tpr: 0.61 },
      { fpr: 0.18, tpr: 0.75 },
      { fpr: 0.27, tpr: 0.86 },
      { fpr: 0.42, tpr: 0.93 },
      { fpr: 0.61, tpr: 0.96 },
      { fpr: 1.0, tpr: 1.0 },
    ],
  },
]

export const RocCurveSection: React.FC = () => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)

  const size = 300
  const pad = 45

  const toSvgX = (fpr: number) => pad + fpr * (size - pad * 1.5)
  const toSvgY = (tpr: number) => size - pad - tpr * (size - pad * 1.5)

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F4] border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 6 &bull; Discrimination Capability</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Receiver Operating Characteristic (ROC-AUC)
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            The ROC curve illustrates true positive rate against false positive rate across all decision thresholds. High area under the curve (AUC &gt; 0.90) demonstrates superior discrimination between low-risk and elevated-risk cardiac patients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SVG ROC Plot */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4 text-xs font-bold text-[#5C6B64]">
              <span>ROC Space &bull; Held-Out Test Cohort</span>
              <span>Random Guessing (AUC = 0.50)</span>
            </div>

            <svg
              viewBox={`0 0 ${size + 40} ${size + 20}`}
              className="w-full max-w-[480px] h-auto select-none"
            >
              {/* Axes */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(0)}
                x2={toSvgX(1)}
                y2={toSvgY(0)}
                stroke="#D9C7A5"
                strokeWidth="1.5"
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(0)}
                x2={toSvgX(0)}
                y2={toSvgY(1)}
                stroke="#D9C7A5"
                strokeWidth="1.5"
              />

              {/* Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((tick) => (
                <g key={tick}>
                  <line
                    x1={toSvgX(tick)}
                    y1={toSvgY(0)}
                    x2={toSvgX(tick)}
                    y2={toSvgY(1)}
                    stroke="#D9C7A5"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(tick)}
                    x2={toSvgX(1)}
                    y2={toSvgY(tick)}
                    stroke="#D9C7A5"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                    opacity="0.5"
                  />
                  <text
                    x={toSvgX(tick)}
                    y={toSvgY(0) + 16}
                    fontSize="10"
                    textAnchor="middle"
                    fill="#5C6B64"
                    fontFamily="monospace"
                  >
                    {tick.toFixed(1)}
                  </text>
                  <text
                    x={toSvgX(0) - 8}
                    y={toSvgY(tick) + 3}
                    fontSize="10"
                    textAnchor="end"
                    fill="#5C6B64"
                    fontFamily="monospace"
                  >
                    {tick.toFixed(1)}
                  </text>
                </g>
              ))}

              {/* Diagonal No-Skill Reference Line */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(0)}
                x2={toSvgX(1)}
                y2={toSvgY(1)}
                stroke="#B8AAA0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Model Curves */}
              {ROC_MODELS.map((m) => {
                const isFocused = hoveredModel === null || hoveredModel === m.id
                const pathString = m.points
                  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.fpr)} ${toSvgY(p.tpr)}`)
                  .join(' ')

                return (
                  <path
                    key={m.id}
                    d={pathString}
                    fill="none"
                    stroke={m.color}
                    strokeWidth={m.id === 'xgb200' ? 3.5 : 2.5}
                    opacity={isFocused ? 1 : 0.25}
                    className="transition-all duration-300"
                  />
                )
              })}

              {/* Axis Titles */}
              <text
                x={toSvgX(0.5)}
                y={size + 15}
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                fill="#17352D"
              >
                False Positive Rate (1 - Specificity)
              </text>
              <text
                x="12"
                y={toSvgY(0.5)}
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                fill="#17352D"
                transform={`rotate(-90 12 ${toSvgY(0.5)})`}
              >
                True Positive Rate (Sensitivity)
              </text>
            </svg>
          </div>

          {/* Model Curves Legend & AUC Badges */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif font-bold text-xl text-[#17352D]">
              Evaluated ROC Curves
            </h4>
            <p className="text-xs text-[#5C6B64] leading-relaxed">
              Hover over a model to highlight its trajectory. Notice how CTGAN-augmented models exhibit rapid sensitivity ascent even at conservative false alarm tolerances (FPR &lt; 0.10).
            </p>

            <div className="space-y-3">
              {ROC_MODELS.map((m) => {
                const isHovered = hoveredModel === m.id
                return (
                  <div
                    key={m.id}
                    onMouseEnter={() => setHoveredModel(m.id)}
                    onMouseLeave={() => setHoveredModel(null)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-white border-[#17352D] shadow-md scale-102'
                        : 'bg-white/80 border-[#D9C7A5]/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        <span className="font-serif font-bold text-sm text-[#17352D]">
                          {m.name}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#17352D]">
                        {(m.auc * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="text-[11px] text-[#5C6B64] flex justify-between pl-5">
                      <span>Area Under Curve: {(m.auc).toFixed(4)}</span>
                      {m.id === 'xgb200' && (
                        <span className="text-[#3D8068] font-bold">Strongest Overall</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D9C7A5]/50 flex items-center gap-2.5 text-xs text-[#5C6B64]">
              <ShieldCheck className="w-4 h-4 text-[#3D8068] shrink-0" />
              <span>
                Both <strong>Random Forest (93.99%)</strong> and <strong>XGBoost (93.72%)</strong> cross the 93% AUC threshold with synthetic augmentation.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
