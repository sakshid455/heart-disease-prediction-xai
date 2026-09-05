import React, { useState } from 'react'
import { BarChart3, TrendingUp, Sliders, Layers } from 'lucide-react'

type MetricKey = 'accuracy' | 'precision' | 'recall' | 'f1' | 'rocAuc'

interface AugmentationPoint {
  ratio: string
  ratioNum: number
  xgboost: Record<MetricKey, number>
  randomForest: Record<MetricKey, number>
  logisticRegression: Record<MetricKey, number>
}

const TRAJECTORY_DATA: AugmentationPoint[] = [
  {
    ratio: '0%',
    ratioNum: 0,
    xgboost: { accuracy: 85.25, precision: 81.25, recall: 89.29, f1: 85.07, rocAuc: 90.15 },
    randomForest: { accuracy: 85.25, precision: 80.65, recall: 89.29, f1: 84.75, rocAuc: 91.88 },
    logisticRegression: { accuracy: 84.15, precision: 80.00, recall: 85.71, f1: 82.76, rocAuc: 88.52 },
  },
  {
    ratio: '25%',
    ratioNum: 25,
    xgboost: { accuracy: 86.89, precision: 82.35, recall: 91.07, f1: 86.50, rocAuc: 91.20 },
    randomForest: { accuracy: 85.80, precision: 81.20, recall: 89.80, f1: 85.25, rocAuc: 92.40 },
    logisticRegression: { accuracy: 84.42, precision: 79.50, recall: 87.50, f1: 83.31, rocAuc: 89.10 },
  },
  {
    ratio: '50%',
    ratioNum: 50,
    xgboost: { accuracy: 87.50, precision: 83.00, recall: 92.10, f1: 87.30, rocAuc: 91.90 },
    randomForest: { accuracy: 86.20, precision: 82.10, recall: 90.20, f1: 85.95, rocAuc: 92.95 },
    logisticRegression: { accuracy: 84.85, precision: 79.20, recall: 89.29, f1: 83.95, rocAuc: 89.80 },
  },
  {
    ratio: '75%',
    ratioNum: 75,
    xgboost: { accuracy: 88.10, precision: 83.50, recall: 92.86, f1: 87.90, rocAuc: 92.20 },
    randomForest: { accuracy: 86.60, precision: 82.90, recall: 90.50, f1: 86.50, rocAuc: 93.40 },
    logisticRegression: { accuracy: 85.05, precision: 79.00, recall: 91.07, f1: 84.60, rocAuc: 90.30 },
  },
  {
    ratio: '100%',
    ratioNum: 100,
    xgboost: { accuracy: 88.52, precision: 83.87, recall: 92.86, f1: 88.14, rocAuc: 92.45 },
    randomForest: { accuracy: 86.89, precision: 83.33, recall: 89.29, f1: 86.21, rocAuc: 93.99 },
    logisticRegression: { accuracy: 85.25, precision: 81.25, recall: 89.29, f1: 85.07, rocAuc: 91.45 },
  },
  {
    ratio: '150%',
    ratioNum: 150,
    xgboost: { accuracy: 89.34, precision: 84.00, recall: 94.64, f1: 89.00, rocAuc: 93.10 },
    randomForest: { accuracy: 86.10, precision: 81.00, recall: 92.86, f1: 86.55, rocAuc: 93.10 },
    logisticRegression: { accuracy: 84.70, precision: 78.90, recall: 92.00, f1: 84.95, rocAuc: 90.10 },
  },
  {
    ratio: '200%',
    ratioNum: 200,
    xgboost: { accuracy: 90.16, precision: 84.38, recall: 96.43, f1: 90.00, rocAuc: 93.72 },
    randomForest: { accuracy: 85.25, precision: 79.41, recall: 96.43, f1: 87.10, rocAuc: 92.12 },
    logisticRegression: { accuracy: 84.20, precision: 78.79, recall: 92.86, f1: 85.25, rocAuc: 89.50 },
  },
]

const METRIC_LABELS: Record<MetricKey, { name: string; desc: string }> = {
  accuracy: { name: 'Accuracy', desc: 'Overall percentage of correct predictions' },
  precision: { name: 'Precision', desc: 'Positive predictive value (minimizing false positives)' },
  recall: { name: 'Recall (Sensitivity)', desc: 'True positive detection rate (minimizing missed cardiac events)' },
  f1: { name: 'F1-Score', desc: 'Harmonic balance between precision and sensitivity' },
  rocAuc: { name: 'ROC-AUC', desc: 'Area under the receiver operating characteristic curve' },
}

export const AugmentationAnalysisSection: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('recall')
  const [activeModel, setActiveModel] = useState<'all' | 'xgboost' | 'randomForest' | 'logisticRegression'>('all')

  const minVal = 75
  const maxVal = 100

  const getYCoord = (val: number) => {
    // Map value between minVal and maxVal to SVG height (300 to 40)
    const normalized = (val - minVal) / (maxVal - minVal)
    return 280 - normalized * 230
  }

  const getXCoord = (idx: number) => {
    // 7 points across width 700
    const step = 640 / (TRAJECTORY_DATA.length - 1)
    return 60 + idx * step
  }

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 3 &bull; Augmentation Analysis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Augmentation Scaling Trajectory
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Examine how classification performance evolves across scaling ratios (<strong>0%, 25%, 50%, 75%, 100%, 150%, 200%</strong>). Select individual metrics to isolate sensitivity gains and precision trade-offs.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(METRIC_LABELS) as MetricKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeMetric === key
                    ? 'bg-[#17352D] text-[#F7F4ED] shadow-sm'
                    : 'bg-[#FAF8F4] text-[#4A5550] border border-[#D9C7A5]/60 hover:bg-[#F2ECE1] hover:text-[#17352D]'
                }`}
              >
                {METRIC_LABELS[key].name}
              </button>
            ))}
          </div>

          {/* Model Focus Toggle */}
          <div className="flex items-center gap-2 bg-[#FAF8F4] p-1 rounded-xl border border-[#D9C7A5]/60 text-xs">
            <span className="font-semibold text-[#5C6B64] px-2">Focus:</span>
            <button
              onClick={() => setActiveModel('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeModel === 'all' ? 'bg-white text-[#17352D] shadow-xs' : 'text-[#5C6B64]'
              }`}
            >
              All Models
            </button>
            <button
              onClick={() => setActiveModel('xgboost')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeModel === 'xgboost' ? 'bg-[#17352D] text-[#F7F4ED]' : 'text-[#5C6B64]'
              }`}
            >
              XGBoost
            </button>
            <button
              onClick={() => setActiveModel('randomForest')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeModel === 'randomForest' ? 'bg-[#3D8068] text-[#F7F4ED]' : 'text-[#5C6B64]'
              }`}
            >
              Random Forest
            </button>
            <button
              onClick={() => setActiveModel('logisticRegression')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeModel === 'logisticRegression' ? 'bg-[#8B6534] text-[#F7F4ED]' : 'text-[#5C6B64]'
              }`}
            >
              LogReg
            </button>
          </div>
        </div>

        {/* Interactive Chart Card */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9C7A5]/40 pb-4 mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#17352D]">
                {METRIC_LABELS[activeMetric].name} across Augmentation Levels
              </h3>
              <p className="text-xs text-[#5C6B64] mt-0.5">
                {METRIC_LABELS[activeMetric].desc}
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#17352D]" />
                <span className="font-semibold text-[#17352D]">XGBoost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#3D8068]" />
                <span className="font-semibold text-[#3D8068]">Random Forest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#C87868]" />
                <span className="font-semibold text-[#C87868]">Logistic Reg</span>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 760 320"
              className="w-full min-w-[650px] h-72 select-none"
            >
              {/* Grid Lines */}
              {[80, 85, 90, 95, 100].map((level) => {
                const y = getYCoord(level)
                return (
                  <g key={level}>
                    <line
                      x1="50"
                      y1={y}
                      x2="720"
                      y2={y}
                      stroke="#D9C7A5"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                    <text
                      x="42"
                      y={y + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill="#5C6B64"
                      fontFamily="monospace"
                    >
                      {level}%
                    </text>
                  </g>
                )
              })}

              {/* X-Axis Labels */}
              {TRAJECTORY_DATA.map((pt, idx) => {
                const x = getXCoord(idx)
                return (
                  <g key={pt.ratio}>
                    <line
                      x1={x}
                      y1="50"
                      x2={x}
                      y2="280"
                      stroke="#D9C7A5"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                    <text
                      x={x}
                      y="305"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#17352D"
                      fontFamily="sans-serif"
                    >
                      {pt.ratio}
                    </text>
                  </g>
                )
              })}

              {/* Path 1: Logistic Regression */}
              {(activeModel === 'all' || activeModel === 'logisticRegression') && (
                <polyline
                  fill="none"
                  stroke="#C87868"
                  strokeWidth="2.5"
                  points={TRAJECTORY_DATA.map((d, i) => `${getXCoord(i)},${getYCoord(d.logisticRegression[activeMetric])}`).join(' ')}
                />
              )}

              {/* Path 2: Random Forest */}
              {(activeModel === 'all' || activeModel === 'randomForest') && (
                <polyline
                  fill="none"
                  stroke="#3D8068"
                  strokeWidth="2.5"
                  points={TRAJECTORY_DATA.map((d, i) => `${getXCoord(i)},${getYCoord(d.randomForest[activeMetric])}`).join(' ')}
                />
              )}

              {/* Path 3: XGBoost */}
              {(activeModel === 'all' || activeModel === 'xgboost') && (
                <polyline
                  fill="none"
                  stroke="#17352D"
                  strokeWidth="3.5"
                  points={TRAJECTORY_DATA.map((d, i) => `${getXCoord(i)},${getYCoord(d.xgboost[activeMetric])}`).join(' ')}
                />
              )}

              {/* Data points for XGBoost */}
              {(activeModel === 'all' || activeModel === 'xgboost') &&
                TRAJECTORY_DATA.map((d, i) => {
                  const x = getXCoord(i)
                  const y = getYCoord(d.xgboost[activeMetric])
                  return (
                    <g key={`xgb-${i}`} className="group cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#17352D"
                        stroke="#F7F4ED"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#17352D"
                        fontFamily="monospace"
                      >
                        {d.xgboost[activeMetric].toFixed(1)}%
                      </text>
                    </g>
                  )
                })}

              {/* Data points for Random Forest */}
              {(activeModel === 'all' || activeModel === 'randomForest') &&
                TRAJECTORY_DATA.map((d, i) => {
                  const x = getXCoord(i)
                  const y = getYCoord(d.randomForest[activeMetric])
                  return (
                    <circle
                      key={`rf-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3D8068"
                      stroke="#FAF8F4"
                      strokeWidth="2"
                    />
                  )
                })}

              {/* Data points for Logistic Regression */}
              {(activeModel === 'all' || activeModel === 'logisticRegression') &&
                TRAJECTORY_DATA.map((d, i) => {
                  const x = getXCoord(i)
                  const y = getYCoord(d.logisticRegression[activeMetric])
                  return (
                    <circle
                      key={`lr-${i}`}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#C87868"
                      stroke="#FAF8F4"
                      strokeWidth="2"
                    />
                  )
                })}
            </svg>
          </div>

          {/* Quick trajectory summary */}
          <div className="mt-4 pt-4 border-t border-[#D9C7A5]/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C6B64]">
            <div>
              <strong className="text-[#17352D]">Baseline (0% Augmentation):</strong>{' '}
              XGBoost achieves {TRAJECTORY_DATA[0].xgboost[activeMetric]}% {activeMetric}.
            </div>
            <div>
              <strong className="text-[#17352D]">Parity Point (100% Augmentation):</strong>{' '}
              XGBoost reaches {TRAJECTORY_DATA[4].xgboost[activeMetric]}% {activeMetric}.
            </div>
            <div>
              <strong className="text-[#17352D]">Peak Point (200% Augmentation):</strong>{' '}
              XGBoost achieves {TRAJECTORY_DATA[6].xgboost[activeMetric]}% {activeMetric}.
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
