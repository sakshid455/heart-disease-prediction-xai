import React, { useState } from 'react'
import {
  Sparkles,
  ShieldAlert,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  TrendingUp,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const SyntheticDataSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distribution' | 'correlation' | 'similarity' | 'privacy'>('distribution')

  return (
    <section id="synthetic-validation" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="06"
          eyebrow="Generative Statistical Auditing"
          title="Does Synthetic Data Look Like Real Data?"
          description="Rigorous multi-dimensional statistical validation auditing Wasserstein density distance, correlation preservation, and nearest-neighbor spacing."
        />

        {/* 4-Tab Interactive Quality & Privacy Audit */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-9 shadow-subtle mb-10">
          
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E8EEE8]">
            {[
              { id: 'distribution', label: '01 Distribution Fidelity', icon: <Layers className="w-4 h-4" /> },
              { id: 'correlation', label: '02 Correlation Preservation', icon: <Activity className="w-4 h-4" /> },
              { id: 'similarity', label: '03 Similarity (DCR / NNDR)', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'privacy', label: '04 Empirical Privacy Audit', icon: <Lock className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === t.id
                    ? 'bg-[#17352D] text-[#F7F4ED] shadow-subtle'
                    : 'bg-[#FAF8F4] text-[#4A5550] hover:bg-[#E8EEE8] border border-[#D9C7A5]/30'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="mt-8">
            
            {/* Tab 1: Distribution */}
            {activeTab === 'distribution' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D]">
                      Marginal Probability Distribution Fidelity
                    </h3>
                    <p className="text-xs text-[#4A5550] mt-0.5">
                      Quantifying 1-Wasserstein Earth Mover's Distance across all continuous and discrete biomarkers.
                    </p>
                  </div>
                  <div className="bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#D9C7A5]/40 text-xs font-mono shrink-0">
                    <span className="text-[#4A5550] block text-[10px]">Average Wasserstein W1</span>
                    <span className="font-bold text-[#3D8068]">0.0624 (High Statistical Alignment)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
                    <span className="text-[#4A5550] uppercase text-[10px] block">Systolic BP (ap_hi) W1</span>
                    <span className="font-bold text-[#17352D] text-lg block">0.0482</span>
                    <span className="text-[#3D8068] text-[11px] font-sans">Smooth Gaussian Mixture Fit</span>
                  </div>

                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
                    <span className="text-[#4A5550] uppercase text-[10px] block">Cholesterol W1</span>
                    <span className="font-bold text-[#17352D] text-lg block">0.0541</span>
                    <span className="text-[#3D8068] text-[11px] font-sans">Multi-Class Distribution Matched</span>
                  </div>

                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
                    <span className="text-[#4A5550] uppercase text-[10px] block">Patient Age W1</span>
                    <span className="font-bold text-[#17352D] text-lg block">0.0610</span>
                    <span className="text-[#3D8068] text-[11px] font-sans">Demographic Curve Preserved</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Correlation */}
            {activeTab === 'correlation' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D]">
                      Cross-Biomarker Correlation Matrix Preservation
                    </h3>
                    <p className="text-xs text-[#4A5550] mt-0.5">
                      Measuring pairwise Pearson & Spearman correlation discrepancies between real and synthetic matrices.
                    </p>
                  </div>
                  <div className="bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#D9C7A5]/40 text-xs font-mono shrink-0">
                    <span className="text-[#4A5550] block text-[10px]">Mean Correlation Error |Δr|</span>
                    <span className="font-bold text-[#17352D]">0.0792 (&lt; 0.10 Threshold)</span>
                  </div>
                </div>

                <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#D9C7A5]/30 space-y-2 text-xs text-[#4A5550] leading-relaxed">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#17352D] font-sans">
                    Covariance Preservation Verification
                  </div>
                  <p>
                    CTGAN successfully captures physiological multi-variable dependencies, such as the natural positive correlation between systolic (ap_hi) and diastolic (ap_lo) blood pressure (real r = +0.68, synthetic r = +0.64), and the positive association between patient age and total cholesterol.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Similarity */}
            {activeTab === 'similarity' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D]">
                      Distance to Closest Record (DCR) & NNDR
                    </h3>
                    <p className="text-xs text-[#4A5550] mt-0.5">
                      Confirming smooth manifold generalization without memorizing specific training patient instances.
                    </p>
                  </div>
                  <div className="bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#D9C7A5]/40 text-xs font-mono shrink-0">
                    <span className="text-[#4A5550] block text-[10px]">Mean Normalized DCR</span>
                    <span className="font-bold text-[#3D8068]">0.4782 (Healthy Manifold Distance)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
                    <span className="text-[#4A5550] text-[10px] block">Mean DCR (Synthetic → Real)</span>
                    <span className="font-bold text-[#17352D] text-xl block">0.4782</span>
                    <p className="text-[#4A5550] font-sans text-xs pt-1">
                      No synthetic record collapses into an identical clone of a real patient row.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
                    <span className="text-[#4A5550] text-[10px] block">Nearest Neighbor Ratio (NNDR)</span>
                    <span className="font-bold text-[#17352D] text-xl block">0.8841</span>
                    <p className="text-[#4A5550] font-sans text-xs pt-1">
                      Smooth density spacing across peripheral clinical feature boundaries.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Privacy */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D]">
                      Empirical Privacy Auditing & Exact Match Verification
                    </h3>
                    <p className="text-xs text-[#4A5550] mt-0.5">
                      Empirical auditing of duplicate collision rates between synthetic samples and real records.
                    </p>
                  </div>
                  <div className="bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#D9C7A5]/40 text-xs font-mono shrink-0">
                    <span className="text-[#4A5550] block text-[10px]">Exact Duplicate Rate</span>
                    <span className="font-bold text-[#3D8068]">0.4117% (Below Real Baseline: 0.7342%)</span>
                  </div>
                </div>

                {/* Mandatory Academic Disclaimer Banner */}
                <div className="bg-[#FAEEEB] border border-[#C87868]/60 rounded-2xl p-5 space-y-2 text-[#17352D]">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C87868]">
                    <ShieldAlert className="w-4 h-4 text-[#C87868]" />
                    <span>Mandatory Privacy Disclaimer</span>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-relaxed">
                    <strong>The current privacy evaluation is empirical and does not provide a formal (ε, δ)-Differential Privacy guarantee.</strong> Although distance-to-closest-record metrics indicate that synthetic rows occupy novel positions on the continuous manifold, formal mathematical privacy bounds remain future work.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
