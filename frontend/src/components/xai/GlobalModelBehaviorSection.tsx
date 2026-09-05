import React, { useState } from 'react'
import { Layers, Activity, Eye, Info, Sparkles } from 'lucide-react'

export const GlobalModelBehaviorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beeswarm' | 'distribution'>('beeswarm')

  // Top features for the beeswarm summary plot
  const beeswarmFeatures = [
    {
      name: 'Thallium Defect (Thal)',
      feature: 'thal',
      meanAbs: 0.1019,
      points: [
        { shap: +0.22, val: 'high', label: 'Reversible Defect (7)' },
        { shap: +0.18, val: 'high', label: 'Reversible Defect (7)' },
        { shap: +0.14, val: 'mid', label: 'Fixed Defect (6)' },
        { shap: -0.08, val: 'low', label: 'Normal (3)' },
        { shap: -0.12, val: 'low', label: 'Normal (3)' },
        { shap: -0.15, val: 'low', label: 'Normal (3)' },
      ],
    },
    {
      name: 'Major Vessels (CA)',
      feature: 'ca',
      meanAbs: 0.0942,
      points: [
        { shap: +0.20, val: 'high', label: '3 Vessels' },
        { shap: +0.15, val: 'high', label: '2 Vessels' },
        { shap: +0.09, val: 'mid', label: '1 Vessel' },
        { shap: -0.06, val: 'low', label: '0 Vessels' },
        { shap: -0.10, val: 'low', label: '0 Vessels' },
      ],
    },
    {
      name: 'Chest Pain Type (CP)',
      feature: 'cp',
      meanAbs: 0.0919,
      points: [
        { shap: +0.18, val: 'low', label: 'Typical Angina (1)' },
        { shap: +0.10, val: 'mid', label: 'Atypical Angina (2)' },
        { shap: -0.04, val: 'mid', label: 'Non-Anginal (3)' },
        { shap: -0.12, val: 'high', label: 'Asymptomatic (4)' },
      ],
    },
    {
      name: 'Maximum Heart Rate',
      feature: 'thalach',
      meanAbs: 0.0527,
      points: [
        { shap: +0.14, val: 'low', label: 'Low Peak (110 bpm)' },
        { shap: +0.07, val: 'low', label: 'Sub-target (132 bpm)' },
        { shap: -0.05, val: 'high', label: 'Normal Peak (160 bpm)' },
        { shap: -0.14, val: 'high', label: 'High Peak (185 bpm)' },
      ],
    },
    {
      name: 'ST Depression (Oldpeak)',
      feature: 'oldpeak',
      meanAbs: 0.0501,
      points: [
        { shap: +0.19, val: 'high', label: 'High ST Dep. (3.2 mm)' },
        { shap: +0.11, val: 'high', label: 'Mod ST Dep. (1.8 mm)' },
        { shap: -0.04, val: 'low', label: 'Normal ST (0.4 mm)' },
        { shap: -0.09, val: 'low', label: 'Zero ST (0.0 mm)' },
      ],
    },
    {
      name: 'Exercise Angina (Exang)',
      feature: 'exang',
      meanAbs: 0.0389,
      points: [
        { shap: +0.13, val: 'high', label: 'Induced (1)' },
        { shap: -0.07, val: 'low', label: 'None (0)' },
      ],
    },
  ]

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9C7A5]/40 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-mono">
            Model Diagnostic Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] tracking-tight mt-1">
            Global Model Behavior & Distribution
          </h2>
          <p className="text-sm text-[#4A5550] mt-1">
            Examines how clinical variables systematically shift probabilities across the entire patient validation cohort.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/70 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('beeswarm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'beeswarm'
                ? 'bg-[#17352D] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            SHAP Summary Plot (Beeswarm)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('distribution')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'distribution'
                ? 'bg-[#17352D] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            Ranking & Quantiles
          </button>
        </div>
      </div>

      {/* Main Plot Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/50 shadow-subtle space-y-6">
        
        {/* Color Legend for Beeswarm */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/50 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#17352D]">Feature Value Continuum:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
              <span className="text-slate-600 font-mono text-[11px]">Low Value</span>
              <span className="text-slate-400">→</span>
              <span className="w-3 h-3 rounded-full bg-[#C87868] inline-block" />
              <span className="text-slate-600 font-mono text-[11px]">High Value</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[#5C6661] text-[11px] font-mono">
            <span>← Decreased Risk Impact</span>
            <span>|</span>
            <span>Increased Risk Impact →</span>
          </div>
        </div>

        {activeTab === 'beeswarm' ? (
          /* BEESWARM REPRESENTATION */
          <div className="space-y-6 pt-2">
            {beeswarmFeatures.map((row) => (
              <div key={row.feature} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#17352D] font-sans">
                    {row.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#808C85]">
                    Mean |SHAP| = {row.meanAbs.toFixed(4)}
                  </span>
                </div>

                {/* Plot line with zero axis in center */}
                <div className="relative h-10 bg-[#FAF8F4] rounded-xl border border-[#D9C7A5]/40 flex items-center px-4 overflow-hidden">
                  
                  {/* Center vertical dashed line (SHAP = 0) */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px border-l-2 border-dashed border-[#D9C7A5]" />

                  {/* Feature sample scatter points */}
                  <div className="relative w-full flex items-center justify-center">
                    {row.points.map((pt, pIdx) => {
                      // Map shap value (-0.25 to +0.25) to percentage (0% to 100%)
                      const leftPos = Math.min(Math.max(50 + (pt.shap / 0.25) * 45, 5), 95)
                      const isHigh = pt.val === 'high'
                      const isLow = pt.val === 'low'

                      return (
                        <div
                          key={pIdx}
                          title={`${row.name}: ${pt.label} (SHAP: ${pt.shap > 0 ? '+' : ''}${pt.shap})`}
                          className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-xs transition-transform hover:scale-150 cursor-pointer ${
                            isHigh ? 'bg-[#C87868]' : isLow ? 'bg-blue-500' : 'bg-purple-500'
                          }`}
                          style={{ left: `${leftPos}%` }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* RANKING & QUANTILES VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-[#D9C7A5]/60 text-[#808C85] uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Biomarker Feature</th>
                  <th className="py-3 px-4">Mean |SHAP|</th>
                  <th className="py-3 px-4">High Feature Value Impact</th>
                  <th className="py-3 px-4">Directional Agreement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF8F4]">
                {beeswarmFeatures.map((row, idx) => (
                  <tr key={row.feature} className="hover:bg-[#FAF8F4]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#17352D]">#{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-[#17352D]">{row.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[#3D8068] font-bold">{row.meanAbs.toFixed(4)}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold">
                        Pushes Risk Higher (↑)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#17352D]">100% Robust</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Global Insight Note */}
        <div className="pt-4 border-t border-[#FAF8F4] flex items-start gap-2.5 text-xs text-[#5C6661]">
          <Info className="w-4 h-4 text-[#3D8068] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Biological Consistency:</strong> Notice that for protective biomarkers like <em>Maximum Heart Rate</em>, higher physical values (red) shift SHAP negative (protective), whereas for pathological biomarkers like <em>ST Depression</em> and <em>Thallium Defect</em>, higher values shift SHAP positive (risk-inducing).
          </p>
        </div>

      </div>
    </section>
  )
}
