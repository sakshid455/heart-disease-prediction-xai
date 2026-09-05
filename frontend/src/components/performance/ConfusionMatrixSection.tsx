import React, { useState } from 'react'
import { Grid, CheckCircle, AlertTriangle, Info, Sliders } from 'lucide-react'

interface MatrixConfig {
  id: string
  name: string
  ratio: string
  tn: number
  fp: number
  fn: number
  tp: number
}

const CONFIGURATIONS: MatrixConfig[] = [
  {
    id: 'xgb200',
    name: 'XGBoost @ 200% Augmentation',
    ratio: '200%',
    tn: 28,
    fp: 5,
    fn: 1,
    tp: 27,
  },
  {
    id: 'xgb100',
    name: 'XGBoost @ 100% Augmentation',
    ratio: '100%',
    tn: 28,
    fp: 5,
    fn: 2,
    tp: 26,
  },
  {
    id: 'xgb0',
    name: 'XGBoost @ 0% Baseline',
    ratio: '0%',
    tn: 27,
    fp: 6,
    fn: 3,
    tp: 25,
  },
  {
    id: 'rf100',
    name: 'Random Forest @ 100% Augmentation',
    ratio: '100%',
    tn: 27,
    fp: 6,
    fn: 2,
    tp: 26,
  },
  {
    id: 'lr0',
    name: 'Logistic Regression @ 0% Baseline',
    ratio: '0%',
    tn: 27,
    fp: 6,
    fn: 4,
    tp: 24,
  },
]

export const ConfusionMatrixSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('xgb200')
  const current = CONFIGURATIONS.find((c) => c.id === selectedId) || CONFIGURATIONS[0]

  const total = current.tn + current.fp + current.fn + current.tp // 61
  const accuracy = ((current.tn + current.tp) / total) * 100
  const sensitivity = (current.tp / (current.tp + current.fn)) * 100
  const specificity = (current.tn / (current.tn + current.fp)) * 100
  const ppv = (current.tp / (current.tp + current.fp)) * 100
  const npv = (current.tn / (current.tn + current.fn)) * 100

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 5 &bull; Diagnostic Classification Table</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Confusion Matrix Analysis
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Examine the exact test cohort counts (N = 61 held-out patients). Compare True Positives, False Positives, False Negatives, and True Negatives to understand clinical error profiles.
          </p>
        </div>

        {/* Model Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CONFIGURATIONS.map((cfg) => (
            <button
              key={cfg.id}
              onClick={() => setSelectedId(cfg.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedId === cfg.id
                  ? 'bg-[#17352D] text-[#F7F4ED] shadow-sm'
                  : 'bg-[#FAF8F4] text-[#4A5550] border border-[#D9C7A5]/60 hover:bg-[#F2ECE1] hover:text-[#17352D]'
              }`}
            >
              {cfg.name}
            </button>
          ))}
        </div>

        {/* Confusion Matrix Interactive Grid + Diagnostic Readouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Matrix Container */}
          <div className="lg:col-span-7 bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                2 &times; 2 Classification Outcome
              </span>
              <h3 className="font-serif text-xl font-bold text-[#17352D] mt-0.5">
                {current.name}
              </h3>
            </div>

            {/* Matrix Visual Layout */}
            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-3 gap-3 text-center mb-3">
                <div />
                <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] py-1">
                  Pred: No Disease
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#5C6B64] py-1">
                  Pred: Disease
                </div>
              </div>

              {/* Row 1: Actual No Disease */}
              <div className="grid grid-cols-3 gap-3 mb-3 items-stretch">
                <div className="flex items-center justify-end text-xs font-bold uppercase tracking-wider text-[#5C6B64] pr-2 text-right">
                  Actual: No Disease
                </div>
                
                {/* True Negative */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#3D8068]/30 text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#3D8068] block">
                    True Negative (TN)
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#17352D] font-mono my-1">
                    {current.tn}
                  </div>
                  <span className="text-[11px] text-[#5C6B64]">
                    {((current.tn / total) * 100).toFixed(1)}% of cohort
                  </span>
                </div>

                {/* False Positive */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#C87868]/30 text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#C87868] block">
                    False Positive (FP)
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#C87868] font-mono my-1">
                    {current.fp}
                  </div>
                  <span className="text-[11px] text-[#5C6B64]">
                    Type I Error (False Alarm)
                  </span>
                </div>
              </div>

              {/* Row 2: Actual Disease */}
              <div className="grid grid-cols-3 gap-3 items-stretch">
                <div className="flex items-center justify-end text-xs font-bold uppercase tracking-wider text-[#5C6B64] pr-2 text-right">
                  Actual: Disease
                </div>

                {/* False Negative */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#C87868]/30 text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#C87868] block">
                    False Negative (FN)
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#C87868] font-mono my-1">
                    {current.fn}
                  </div>
                  <span className="text-[11px] text-[#5C6B64]">
                    Type II Error (Missed)
                  </span>
                </div>

                {/* True Positive */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#17352D]/30 text-center shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-[#17352D] block">
                    True Positive (TP)
                  </span>
                  <div className="font-serif text-3xl font-bold text-[#17352D] font-mono my-1">
                    {current.tp}
                  </div>
                  <span className="text-[11px] text-[#5C6B64]">
                    {((current.tp / total) * 100).toFixed(1)}% of cohort
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9C7A5]/40 text-center text-xs text-[#5C6B64]">
              Held-Out Test Sample Size: <strong className="text-[#17352D]">N = {total}</strong> (33 Non-disease, 28 Heart Disease)
            </div>
          </div>

          {/* Diagnostic Derivatives Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FAF8F4] rounded-2xl p-6 border border-[#D9C7A5]/60 shadow-subtle space-y-4">
              <h4 className="font-serif font-bold text-lg text-[#17352D] border-b border-[#D9C7A5]/40 pb-3">
                Calculated Clinical Derivatives
              </h4>

              {/* Sensitivity */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9C7A5]/40">
                <div>
                  <div className="text-xs font-bold text-[#17352D]">Sensitivity (Recall)</div>
                  <div className="text-[10px] text-[#5C6B64]">TP / (TP + FN)</div>
                </div>
                <div className="font-mono text-base font-bold text-[#3D8068]">
                  {sensitivity.toFixed(2)}%
                </div>
              </div>

              {/* Specificity */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9C7A5]/40">
                <div>
                  <div className="text-xs font-bold text-[#17352D]">Specificity</div>
                  <div className="text-[10px] text-[#5C6B64]">TN / (TN + FP)</div>
                </div>
                <div className="font-mono text-base font-bold text-[#17352D]">
                  {specificity.toFixed(2)}%
                </div>
              </div>

              {/* PPV */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9C7A5]/40">
                <div>
                  <div className="text-xs font-bold text-[#17352D]">Precision (PPV)</div>
                  <div className="text-[10px] text-[#5C6B64]">TP / (TP + FP)</div>
                </div>
                <div className="font-mono text-base font-bold text-[#17352D]">
                  {ppv.toFixed(2)}%
                </div>
              </div>

              {/* NPV */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#D9C7A5]/40">
                <div>
                  <div className="text-xs font-bold text-[#17352D]">Negative Predictive Value (NPV)</div>
                  <div className="text-[10px] text-[#5C6B64]">TN / (TN + FN)</div>
                </div>
                <div className="font-mono text-base font-bold text-[#3D8068]">
                  {npv.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Insight card */}
            <div className="p-4 rounded-xl bg-white border border-[#D9C7A5]/60 flex items-start gap-3 text-xs text-[#4A5550]">
              <CheckCircle className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
              <div>
                Under <strong>XGBoost @ 200%</strong>, false negatives dropped to just <strong>1 patient</strong> out of 28 real positive cases, reaching a high negative predictive value of <strong>96.55%</strong>.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
