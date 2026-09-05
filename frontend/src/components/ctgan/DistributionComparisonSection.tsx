import React, { useState } from 'react'
import { BarChart3, PieChart, Activity, Sliders, CheckCircle2 } from 'lucide-react'

interface FeatureDistribution {
  id: string
  name: string
  unit: string
  realMean: string
  synthMean: string
  realStd: string
  synthStd: string
  ksScore: string
  bins: {
    label: string
    realPct: number
    synthPct: number
  }[]
}

const DISTRIBUTIONS: FeatureDistribution[] = [
  {
    id: 'age',
    name: 'Patient Age',
    unit: 'years',
    realMean: '54.4 yrs',
    synthMean: '54.1 yrs',
    realStd: '&plusmn; 9.0',
    synthStd: '&plusmn; 8.8',
    ksScore: '0.042 (p = 0.89)',
    bins: [
      { label: '< 40 yrs', realPct: 6.2, synthPct: 6.9 },
      { label: '40 - 49 yrs', realPct: 23.1, synthPct: 24.2 },
      { label: '50 - 59 yrs', realPct: 37.2, synthPct: 36.1 },
      { label: '60 - 69 yrs', realPct: 27.7, synthPct: 26.8 },
      { label: '70+ yrs', realPct: 5.8, synthPct: 6.0 },
    ],
  },
  {
    id: 'chol',
    name: 'Serum Cholesterol',
    unit: 'mg/dL',
    realMean: '246.3 mg/dL',
    synthMean: '245.8 mg/dL',
    realStd: '&plusmn; 51.8',
    synthStd: '&plusmn; 49.6',
    ksScore: '0.058 (p = 0.76)',
    bins: [
      { label: '< 200 (Desirable)', realPct: 17.4, synthPct: 18.2 },
      { label: '200 - 239 (Borderline)', realPct: 34.3, synthPct: 35.1 },
      { label: '240 - 279 (High)', realPct: 28.5, synthPct: 27.9 },
      { label: '280+ (Very High)', realPct: 19.8, synthPct: 18.8 },
    ],
  },
  {
    id: 'trestbps',
    name: 'Resting Blood Pressure',
    unit: 'mmHg',
    realMean: '131.6 mmHg',
    synthMean: '131.2 mmHg',
    realStd: '&plusmn; 17.5',
    synthStd: '&plusmn; 16.9',
    ksScore: '0.049 (p = 0.84)',
    bins: [
      { label: '< 120 (Normal)', realPct: 21.1, synthPct: 22.0 },
      { label: '120 - 139 (Pre-HTN)', realPct: 50.8, synthPct: 49.7 },
      { label: '140 - 159 (Stage 1 HTN)', realPct: 20.2, synthPct: 20.5 },
      { label: '160+ (Stage 2 HTN)', realPct: 7.9, synthPct: 7.8 },
    ],
  },
  {
    id: 'thalach',
    name: 'Maximum Heart Rate',
    unit: 'bpm',
    realMean: '149.6 bpm',
    synthMean: '148.9 bpm',
    realStd: '&plusmn; 22.9',
    synthStd: '&plusmn; 22.1',
    ksScore: '0.063 (p = 0.71)',
    bins: [
      { label: '< 120 bpm', realPct: 11.2, synthPct: 12.1 },
      { label: '120 - 139 bpm', realPct: 22.3, synthPct: 23.4 },
      { label: '140 - 159 bpm', realPct: 33.9, synthPct: 32.8 },
      { label: '160 - 179 bpm', realPct: 24.8, synthPct: 24.1 },
      { label: '180+ bpm', realPct: 7.8, synthPct: 7.6 },
    ],
  },
]

export const DistributionComparisonSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('age')
  const current = DISTRIBUTIONS.find((d) => d.id === selectedFeature) || DISTRIBUTIONS[0]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D8068]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 5 &bull; Empirical Fidelity</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Distribution Comparison
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Verify how closely CTGAN preserves the population-level statistics and empirical frequency distributions of vital cardiovascular indicators.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {DISTRIBUTIONS.map((feat) => (
            <button
              key={feat.id}
              onClick={() => setSelectedFeature(feat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFeature === feat.id
                  ? 'bg-[#17352D] text-[#F7F4ED] shadow-sm'
                  : 'bg-[#FAF8F4] text-[#4A5550] border border-[#D9C7A5]/50 hover:bg-[#F2ECE1] hover:text-[#17352D]'
              }`}
            >
              {feat.name}
            </button>
          ))}
        </div>

        {/* Main Distribution Comparison Card */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle mb-10">
          {/* Header info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D9C7A5]/40 pb-5 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                Binned Density Histogram &bull; {current.name}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#17352D] mt-0.5">
                Real Cohort vs. CTGAN Synthetic Density
              </h3>
            </div>

            {/* Statistical Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#17352D]" />
                <span className="font-semibold text-[#17352D]">Real Cohort</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#C87868]" />
                <span className="font-semibold text-[#17352D]">CTGAN Synthetic</span>
              </div>
            </div>
          </div>

          {/* Side-by-side Binned Bars */}
          <div className="space-y-6">
            {current.bins.map((bin, bIdx) => (
              <div key={bIdx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-[#17352D]">
                  <span className="font-semibold">{bin.label}</span>
                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <span className="text-[#17352D]">Real: {bin.realPct}%</span>
                    <span className="text-[#C87868]">Synth: {bin.synthPct}%</span>
                    <span className="text-[#5C6B64]">
                      &Delta; {Math.abs(bin.realPct - bin.synthPct).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bars comparison */}
                <div className="grid grid-cols-1 gap-1.5 bg-white p-2 rounded-xl border border-[#D9C7A5]/40">
                  {/* Real Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#17352D] w-12 shrink-0">Real</span>
                    <div className="flex-1 bg-[#E8EEE8] h-3.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#17352D] h-full rounded-full transition-all duration-500"
                        style={{ width: `${bin.realPct * 2}%` }}
                      />
                    </div>
                  </div>

                  {/* Synthetic Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#C87868] w-12 shrink-0">Synth</span>
                    <div className="flex-1 bg-[#F5E6E3] h-3.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C87868] h-full rounded-full transition-all duration-500"
                        style={{ width: `${bin.synthPct * 2}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Statistical Metric Row */}
          <div className="mt-8 pt-6 border-t border-[#D9C7A5]/40 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3.5 rounded-xl border border-[#D9C7A5]/40">
              <div className="text-[11px] text-[#5C6B64] font-medium uppercase tracking-wider">Real Population Mean</div>
              <div className="text-base font-bold text-[#17352D] font-mono mt-1">{current.realMean}</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#D9C7A5]/40">
              <div className="text-[11px] text-[#5C6B64] font-medium uppercase tracking-wider">Synthetic Generation Mean</div>
              <div className="text-base font-bold text-[#C87868] font-mono mt-1">{current.synthMean}</div>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#D9C7A5]/40">
              <div className="text-[11px] text-[#5C6B64] font-medium uppercase tracking-wider">Kolmogorov-Smirnov Test</div>
              <div className="text-base font-bold text-[#3D8068] font-mono mt-1">{current.ksScore}</div>
            </div>
          </div>
        </div>

        {/* Target Class Distribution Comparison (Dedicated Block) */}
        <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-8 border border-[#D9C7A5]/60 shadow-subtle">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C87868]">
              Target Ratio Fidelity
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#17352D] mt-0.5">
              Heart Disease Prevalence Balance
            </h3>
            <p className="text-sm text-[#4A5550] mt-1">
              CTGAN preserves binary clinical target prevalence with minimal divergence, preventing artificial class skewing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real Distribution */}
            <div className="bg-white p-5 rounded-xl border border-[#D9C7A5]/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[#17352D] text-sm">Real Cohort (N = 242)</span>
                <span className="text-xs font-mono text-[#5C6B64]">Cleveland Benchmark</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#17352D]">No Disease (0)</span>
                    <span className="font-mono font-bold text-[#17352D]">54.1% (131)</span>
                  </div>
                  <div className="w-full bg-[#E8EEE8] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#3D8068] h-full rounded-full" style={{ width: '54.1%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#C87868]">Heart Disease (+1)</span>
                    <span className="font-mono font-bold text-[#C87868]">45.9% (111)</span>
                  </div>
                  <div className="w-full bg-[#F5E6E3] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#C87868] h-full rounded-full" style={{ width: '45.9%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Synthetic Distribution */}
            <div className="bg-white p-5 rounded-xl border border-[#D9C7A5]/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[#17352D] text-sm">CTGAN Synthetic (N = 109,778)</span>
                <span className="text-xs font-mono text-[#C87868]">Generated Reservoir</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#17352D]">No Disease (0)</span>
                    <span className="font-mono font-bold text-[#17352D]">53.6% (58,841)</span>
                  </div>
                  <div className="w-full bg-[#E8EEE8] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#3D8068] h-full rounded-full" style={{ width: '53.6%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[#C87868]">Heart Disease (+1)</span>
                    <span className="font-mono font-bold text-[#C87868]">46.4% (50,937)</span>
                  </div>
                  <div className="w-full bg-[#F5E6E3] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#C87868] h-full rounded-full" style={{ width: '46.4%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#3D8068]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Target ratio delta is strictly within 0.53% between real and synthetic cohorts.</span>
          </div>
        </div>

      </div>
    </section>
  )
}
