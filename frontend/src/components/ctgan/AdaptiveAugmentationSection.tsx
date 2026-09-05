import React, { useState, useEffect } from 'react'
import { TrendingUp, Layers, Award, CheckCircle, Sliders, BarChart3, AlertCircle } from 'lucide-react'

interface AugmentationStepData {
  ratio: number
  ratioLabel: string
  totalSamples: number
  realSamples: number
  syntheticSamples: number
  lrRecall: number
  lrAccuracy: number
  rfAccuracy: number
  rfF1: number
  xgbRocAuc: number
  keyFinding: string
}

const AUGMENTATION_TRAJECTORY: AugmentationStepData[] = [
  {
    ratio: 0,
    ratioLabel: '0% (Baseline)',
    totalSamples: 242,
    realSamples: 242,
    syntheticSamples: 0,
    lrRecall: 66.58,
    lrAccuracy: 84.15,
    rfAccuracy: 83.82,
    rfF1: 82.10,
    xgbRocAuc: 0.885,
    keyFinding: 'Baseline training on authentic patient records only. High precision, moderate screening sensitivity.',
  },
  {
    ratio: 25,
    ratioLabel: '25% Augmentation',
    totalSamples: 302,
    realSamples: 242,
    syntheticSamples: 60,
    lrRecall: 68.51,
    lrAccuracy: 84.42,
    rfAccuracy: 84.05,
    rfF1: 82.90,
    xgbRocAuc: 0.891,
    keyFinding: 'Early generalization gains begin appearing in peripheral biomarker boundary regions.',
  },
  {
    ratio: 50,
    ratioLabel: '50% Augmentation',
    totalSamples: 363,
    realSamples: 242,
    syntheticSamples: 121,
    lrRecall: 70.46,
    lrAccuracy: 84.85,
    rfAccuracy: 84.50,
    rfF1: 83.65,
    xgbRocAuc: 0.898,
    keyFinding: 'Significant sensitivity jump (+3.88 pp recall) while maintaining clinical accuracy above 84.8%.',
  },
  {
    ratio: 75,
    ratioLabel: '75% Augmentation',
    totalSamples: 423,
    realSamples: 242,
    syntheticSamples: 181,
    lrRecall: 71.28,
    lrAccuracy: 85.05,
    rfAccuracy: 84.92,
    rfF1: 84.15,
    xgbRocAuc: 0.903,
    keyFinding: 'Optimal trade-off zone: high cardiovascular sensitivity with maximum cross-validation stability.',
  },
  {
    ratio: 100,
    ratioLabel: '100% Augmentation (Recommended)',
    totalSamples: 484,
    realSamples: 242,
    syntheticSamples: 242,
    lrRecall: 72.15,
    lrAccuracy: 85.25,
    rfAccuracy: 85.10,
    rfF1: 84.40,
    xgbRocAuc: 0.908,
    keyFinding: 'Balanced 1:1 real-to-synthetic parity. Yields highest overall composite F1-score and ROC-AUC.',
  },
  {
    ratio: 150,
    ratioLabel: '150% Augmentation',
    totalSamples: 605,
    realSamples: 242,
    syntheticSamples: 363,
    lrRecall: 73.23,
    lrAccuracy: 84.70,
    rfAccuracy: 84.45,
    rfF1: 83.80,
    xgbRocAuc: 0.901,
    keyFinding: 'Recall continues climbing (+6.65 pp), but marginal precision begins plateauing due to synthetic density.',
  },
  {
    ratio: 200,
    ratioLabel: '200% Augmentation',
    totalSamples: 726,
    realSamples: 242,
    syntheticSamples: 484,
    lrRecall: 73.87,
    lrAccuracy: 84.20,
    rfAccuracy: 83.90,
    rfF1: 83.25,
    xgbRocAuc: 0.895,
    keyFinding: 'Peak sensitivity achieved (+7.29 pp recall), ideal for conservative first-line screening triage.',
  },
]

export const AdaptiveAugmentationSection: React.FC = () => {
  const [selectedRatio, setSelectedRatio] = useState<number>(100)
  const [activeMetric, setActiveMetric] = useState<'recall' | 'accuracy' | 'rocAuc'>('recall')

  const current = AUGMENTATION_TRAJECTORY.find((item) => item.ratio === selectedRatio) || AUGMENTATION_TRAJECTORY[4]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 7 &bull; Empirical Trajectory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Adaptive Augmentation Experiments
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Rather than assuming more synthetic data is universally beneficial, we evaluated <strong>7 distinct augmentation ratios (0% to 200%)</strong> across 4 model architectures to discover the optimal training configuration on held-out real patient records.
          </p>
        </div>

        {/* Ratio Selector Buttons (0% to 200%) */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] mb-3">
            Select Augmentation Ratio:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {AUGMENTATION_TRAJECTORY.map((item) => {
              const isSelected = selectedRatio === item.ratio
              return (
                <button
                  key={item.ratio}
                  onClick={() => setSelectedRatio(item.ratio)}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    isSelected
                      ? 'bg-[#17352D] text-[#F7F4ED] border-[#17352D] shadow-elevated scale-102 ring-2 ring-[#3D8068]/40'
                      : 'bg-[#FAF8F4] text-[#17352D] border-[#D9C7A5]/60 hover:bg-[#F2ECE1]'
                  }`}
                >
                  <div className="font-serif font-bold text-lg">{item.ratio}%</div>
                  <div
                    className={`text-[10px] font-mono mt-0.5 ${
                      isSelected ? 'text-[#D9C7A5]' : 'text-[#5C6B64]'
                    }`}
                  >
                    {item.ratio === 0 ? 'Baseline' : item.ratio === 100 ? 'Optimal' : `+${item.syntheticSamples} synth`}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Deep-Dive Card */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9C7A5]/40 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                  Configuration Analysis
                </span>
                {current.ratio === 100 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3D8068] text-[#F7F4ED] text-[10px] font-bold">
                    <Award className="w-3 h-3" />
                    Recommended Benchmark
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#17352D] mt-0.5">
                {current.ratioLabel} &bull; N = {current.totalSamples} Training Vectors
              </h3>
            </div>

            {/* Sample proportion badge */}
            <div className="flex items-center gap-3 text-xs bg-white px-3.5 py-2 rounded-xl border border-[#D9C7A5]/50">
              <span className="text-[#17352D] font-semibold">
                Real: <strong>{current.realSamples}</strong>
              </span>
              <span className="text-[#D9C7A5]">&bull;</span>
              <span className="text-[#C87868] font-semibold">
                Synthetic: <strong>{current.syntheticSamples}</strong>
              </span>
            </div>
          </div>

          {/* Metric Comparison Bar Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Logistic Regression Recall */}
            <div className="bg-white p-5 rounded-xl border border-[#D9C7A5]/50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#17352D]">Screening Recall (LR)</span>
                <span className="font-mono text-base font-bold text-[#3D8068]">
                  {current.lrRecall}%
                </span>
              </div>
              <div className="w-full bg-[#E8EEE8] h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-[#3D8068] h-full rounded-full transition-all duration-500"
                  style={{ width: `${current.lrRecall}%` }}
                />
              </div>
              <div className="text-[11px] text-[#5C6B64] flex justify-between">
                <span>Baseline: 66.58%</span>
                <span className="font-bold text-[#3D8068]">
                  +{ (current.lrRecall - 66.58).toFixed(2) } pp
                </span>
              </div>
            </div>

            {/* Random Forest Accuracy */}
            <div className="bg-white p-5 rounded-xl border border-[#D9C7A5]/50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#17352D]">Model Accuracy (RF)</span>
                <span className="font-mono text-base font-bold text-[#17352D]">
                  {current.rfAccuracy}%
                </span>
              </div>
              <div className="w-full bg-[#E8EEE8] h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-[#17352D] h-full rounded-full transition-all duration-500"
                  style={{ width: `${current.rfAccuracy}%` }}
                />
              </div>
              <div className="text-[11px] text-[#5C6B64] flex justify-between">
                <span>Baseline: 83.82%</span>
                <span className="font-bold text-[#17352D]">
                  +{ (current.rfAccuracy - 83.82).toFixed(2) } pp
                </span>
              </div>
            </div>

            {/* XGBoost ROC-AUC */}
            <div className="bg-white p-5 rounded-xl border border-[#D9C7A5]/50 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#17352D]">ROC-AUC (XGBoost)</span>
                <span className="font-mono text-base font-bold text-[#8B6534]">
                  {current.xgbRocAuc.toFixed(3)}
                </span>
              </div>
              <div className="w-full bg-[#E8EEE8] h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-[#8B6534] h-full rounded-full transition-all duration-500"
                  style={{ width: `${current.xgbRocAuc * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-[#5C6B64] flex justify-between">
                <span>Baseline: 0.885</span>
                <span className="font-bold text-[#8B6534]">
                  +{ (current.xgbRocAuc - 0.885).toFixed(3) }
                </span>
              </div>
            </div>
          </div>

          {/* Finding summary box */}
          <div className="p-4 rounded-xl bg-white border border-[#D9C7A5]/60 flex items-start gap-3 text-xs sm:text-sm text-[#4A5550]">
            <CheckCircle className="w-5 h-5 text-[#3D8068] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#17352D]">Empirical Insight: </strong>
              {current.keyFinding}
            </div>
          </div>
        </div>

        {/* Trajectory Trajectory Table Summary */}
        <div className="bg-white rounded-2xl border border-[#D9C7A5]/60 shadow-subtle overflow-hidden">
          <div className="p-5 border-b border-[#D9C7A5]/40 flex items-center justify-between">
            <h4 className="font-serif font-bold text-[#17352D] text-base">
              Complete Augmentation Benchmark Matrix (Held-out Test Cohort)
            </h4>
            <span className="text-xs text-[#5C6B64] font-mono">28 Evaluated Configurations</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F4] border-b border-[#D9C7A5]/50 text-[#17352D] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Augmentation Ratio</th>
                  <th className="py-3 px-3">Total Size</th>
                  <th className="py-3 px-3">LR Recall</th>
                  <th className="py-3 px-3">LR Accuracy</th>
                  <th className="py-3 px-3">RF Accuracy</th>
                  <th className="py-3 px-3">RF F1-Score</th>
                  <th className="py-3 px-3">XGB ROC-AUC</th>
                  <th className="py-3 px-4 text-right">Clinical Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7A5]/30">
                {AUGMENTATION_TRAJECTORY.map((row) => (
                  <tr
                    key={row.ratio}
                    onClick={() => setSelectedRatio(row.ratio)}
                    className={`cursor-pointer transition-colors ${
                      row.ratio === selectedRatio
                        ? 'bg-[#E8EEE8]/60 font-semibold'
                        : 'hover:bg-[#FAF8F4]'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#17352D]">
                      {row.ratio}% {row.ratio === 100 && '🏆 Optimal'}
                    </td>
                    <td className="py-3 px-3 font-mono">{row.totalSamples}</td>
                    <td className="py-3 px-3 font-mono text-[#3D8068] font-bold">{row.lrRecall}%</td>
                    <td className="py-3 px-3 font-mono">{row.lrAccuracy}%</td>
                    <td className="py-3 px-3 font-mono">{row.rfAccuracy}%</td>
                    <td className="py-3 px-3 font-mono">{row.rfF1}%</td>
                    <td className="py-3 px-3 font-mono text-[#8B6534]">{row.xgbRocAuc.toFixed(3)}</td>
                    <td className="py-3 px-4 text-right text-[11px] text-[#5C6B64]">
                      {row.ratio === 0 ? 'Real Baseline' : row.ratio === 100 ? 'Highest F1' : row.ratio === 200 ? 'Peak Recall' : 'Stable'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Journey Progression CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#D9C7A5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
              Next Step in Research Journey
            </span>
            <h4 className="font-serif font-bold text-xl text-[#17352D]">
              Model Performance Benchmarks
            </h4>
            <p className="text-xs text-[#5C6B64] max-w-xl leading-relaxed">
              Explore the held-out test matrix comparing XGBoost, Random Forest, Logistic Regression, and SVM across sensitivity, specificity, and ROC-AUC.
            </p>
          </div>

          <a
            href="/performance"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-semibold tracking-wide transition-all shadow-subtle shrink-0 hover:-translate-y-0.5"
          >
            <span>Proceed to Performance</span>
            <span className="text-[#D9C7A5]">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  )
}
