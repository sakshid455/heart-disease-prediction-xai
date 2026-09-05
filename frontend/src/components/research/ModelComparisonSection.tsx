import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Cpu, Award, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

const COMPARISON_BAR_DATA = [
  {
    model: 'Logistic Regression',
    short: 'LogReg',
    accuracy: 69.95,
    precision: 68.25,
    recall: 73.87,
    f1: 70.95,
    auc: 76.74,
    color: '#17352D',
  },
  {
    model: 'Random Forest',
    short: 'RF',
    accuracy: 70.95,
    precision: 72.90,
    recall: 66.15,
    f1: 69.36,
    auc: 77.80,
    color: '#3D8068',
  },
  {
    model: 'SGD-SVM',
    short: 'SVM',
    accuracy: 68.90,
    precision: 69.40,
    recall: 66.50,
    f1: 67.92,
    auc: 75.30,
    color: '#28302D',
  },
  {
    model: 'XGBoost',
    short: 'XGB',
    accuracy: 71.45,
    precision: 72.30,
    recall: 68.80,
    f1: 70.51,
    auc: 78.10,
    color: '#C4AE88',
  },
]

export const ModelComparisonSection: React.FC = () => {
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0)
  const activeModel = COMPARISON_BAR_DATA[selectedModelIdx]

  return (
    <section id="models" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="07"
          eyebrow="Multi-Model Predictive Benchmark"
          title="Comparing Machine Learning Models"
          description="Empirical evaluation across linear, bagging, margin-based, and boosting architectures trained under 200% CTGAN data augmentation."
        />

        {/* 4 Model Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {COMPARISON_BAR_DATA.map((m, idx) => {
            const isSelected = selectedModelIdx === idx
            return (
              <button
                key={m.model}
                type="button"
                onClick={() => setSelectedModelIdx(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 focus:outline-none flex flex-col justify-between h-[150px] ${
                  isSelected
                    ? 'bg-white border-[#17352D] shadow-elevated ring-2 ring-[#3D8068]/30 -translate-y-1'
                    : 'bg-white/80 border-[#D9C7A5]/40 hover:border-[#3D8068]/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
                    {m.short} Architecture
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-[#FAF8F4] flex items-center justify-center text-[#17352D] border border-[#D9C7A5]/40">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-serif font-bold text-[#17352D] leading-snug">
                    {m.model}
                  </h4>
                  <div className="font-mono text-xs text-[#4A5550] mt-1">
                    Recall: <strong className="text-[#3D8068]">{m.recall}%</strong> · F1: {m.f1}%
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Comparative Bar Chart */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle mb-10">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8EEE8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] block">
                Comparative Bar Chart
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D] mt-0.5">
                Evaluation Metrics Across 4 Classifiers (@ 200% Augmentation)
              </h3>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
              Held-Out Split (N = 13,723)
            </span>
          </div>

          <div className="h-80 sm:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPARISON_BAR_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEE8" />
                <XAxis dataKey="short" stroke="#4A5550" tick={{ fill: '#4A5550', fontSize: 12 }} />
                <YAxis domain={[60, 80]} stroke="#4A5550" tick={{ fill: '#4A5550', fontSize: 12 }} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#D9C7A5',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(23,53,45,0.1)',
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontFamily: 'DM Sans', fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="recall" name="Recall (Sensitivity)" fill="#3D8068" radius={[4, 4, 0, 0]} />
                <Bar dataKey="precision" name="Precision" fill="#C87868" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1" name="F1-Score" fill="#17352D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="accuracy" name="Accuracy" fill="#4A5550" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deep Dive Profile Card */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8EEE8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#17352D] text-[#F7F4ED] flex items-center justify-center border border-[#D9C7A5]/40 shadow-subtle">
                <Cpu className="w-5 h-5 text-[#D9C7A5]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#17352D]">
                  {activeModel.model} Profile
                </h3>
                <span className="text-xs text-[#3D8068] font-mono">
                  Augmented at 200% Capacity
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="bg-[#FAF8F4] px-3 py-1.5 rounded-xl border border-[#D9C7A5]/40">
                Sensitivity: <strong>{activeModel.recall}%</strong>
              </span>
              <span className="bg-[#FAF8F4] px-3 py-1.5 rounded-xl border border-[#D9C7A5]/40">
                ROC-AUC: <strong>{(activeModel.auc / 100).toFixed(4)}</strong>
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#17352D]">
              Architectural Rationale
            </div>
            <p className="text-sm text-[#4A5550] leading-relaxed font-normal">
              {activeModel.model === 'Logistic Regression' &&
                'Linear decision boundaries are especially receptive to CTGAN synthetic density expansion. By interpolating complex joint modes, Logistic Regression expands true positive recall (+7.29%) while preserving strict mathematical interpretability and computational efficiency.'}
              {activeModel.model === 'Random Forest' &&
                'Ensemble bagging builds 100 decorrelated decision trees, achieving robust resistance to overfitting with strong precision (72.90%) across complex non-linear clinical feature interactions.'}
              {activeModel.model === 'SGD-SVM' &&
                'Support vector margin optimization with stochastic gradient descent maps non-linear support vectors across high-dimensional continuous biomarker dimensions.'}
              {activeModel.model === 'XGBoost' &&
                'Gradient boosting with regularized depth optimization achieves the highest baseline discriminative ranking (ROC-AUC 0.8053), serving as the peak benchmark model.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
