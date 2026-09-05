import React, { useState } from 'react'
import { Sliders, Sparkles, Award, ArrowRight, ShieldAlert, CheckCircle2, Activity, Info } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { api, AugmentationRecommendationResponse } from '../../services/api'

export const AugmentationAdvisorSection: React.FC = () => {
  const [selectedObjective, setSelectedObjective] = useState<string>('Balanced Performance')
  const [isLoading, setIsLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<AugmentationRecommendationResponse | null>({
    objective: 'Balanced Performance',
    recommended_augmentation_ratio: '50%',
    recommended_model: 'XGBoost',
    expected_metrics: {
      accuracy: 0.7356,
      precision: 0.7487,
      recall: 0.7007,
      f1_score: 0.7239,
      roc_auc: 0.8022,
    },
    rationale: 'Maximizes harmonic F1 (72.39%) with strong precision (74.87%) and high ROC-AUC (0.8022) at an efficient 50% synthetic augmentation level, maintaining optimal balance between sensitivity and specificity.',
  })

  const objectives = [
    { id: 'Balanced Performance', label: 'Balanced Performance', desc: 'Harmonic balance between false alarms and missed cases' },
    { id: 'High Sensitivity', label: 'Maximum Recall (Sensitivity)', desc: 'Primary screening to capture the maximum number of true CVD cases' },
    { id: 'High Precision', label: 'Maximum Precision', desc: 'Minimizing false positives for low false-alarm confirmation' },
    { id: 'Maximum F1', label: 'Maximum F1-Score', desc: 'Optimal harmonic mean of precision and recall' },
    { id: 'Maximum ROC-AUC', label: 'Maximum ROC-AUC', desc: 'Highest overall rank-order separability' },
  ]

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      const res = await api.getAugmentationRecommendation(selectedObjective)
      setRecommendation(res)
    } catch (err) {
      console.error('Failed to fetch recommendation:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="augmentation-advisor" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="10"
          eyebrow="Objective-Driven Recommendation"
          title="Find the Right Augmentation Strategy"
          description="Automatic empirical recommendation engine matching synthetic data augmentation volume and model family to your clinical optimization goal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start font-sans">
          
          {/* LEFT: Objective Selector Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-7 shadow-subtle space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#17352D] pb-2 border-b border-[#E8EEE8]">
              <Sliders className="w-4 h-4 text-[#3D8068]" />
              <span>What matters most?</span>
            </div>

            <div className="space-y-2.5">
              {objectives.map((obj) => (
                <label
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj.id)}
                  className={`block p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedObjective === obj.id
                      ? 'bg-[#E8EEE8]/70 border-[#17352D] shadow-subtle ring-2 ring-[#3D8068]/30'
                      : 'bg-[#FAF8F4] border-[#D9C7A5]/40 hover:bg-white hover:border-[#3D8068]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      selectedObjective === obj.id ? 'text-[#17352D] font-bold' : 'text-[#28302D]'
                    }`}>
                      {obj.label}
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      selectedObjective === obj.id
                        ? 'border-[#17352D] bg-[#17352D]'
                        : 'border-[#D9C7A5] bg-white'
                    }`}>
                      {selectedObjective === obj.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9C7A5]" />
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4A5550] mt-1 leading-normal">
                    {obj.desc}
                  </p>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full py-3.5 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle flex items-center justify-center gap-2 focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-[#D9C7A5]" />
              <span>{isLoading ? 'Analyzing Benchmarks...' : 'Analyze Objective'}</span>
            </button>
          </div>

          {/* RIGHT: Recommendation Output Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#3D8068]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                  Recommended Augmentation Strategy
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                EVALUATED BENCHMARK
              </span>
            </div>

            {recommendation && (
              <div className="space-y-6">
                
                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30">
                    <span className="text-[10px] font-mono text-[#4A5550] uppercase block">Recommended Model</span>
                    <span className="text-lg font-serif font-bold text-[#17352D] mt-0.5 block">
                      {recommendation.recommended_model}
                    </span>
                  </div>

                  <div className="bg-[#E8EEE8]/70 p-4 rounded-2xl border border-[#D8E2D8]">
                    <span className="text-[10px] font-mono text-[#3D8068] uppercase block font-semibold">Recommended Augmentation</span>
                    <span className="text-xl font-serif font-bold text-[#17352D] mt-0.5 block">
                      {recommendation.recommended_augmentation_ratio}
                    </span>
                  </div>
                </div>

                {/* Scorecard Strip */}
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4A5550] mb-2">
                    Expected Empirical Metrics (Held-out Test Cohort)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 font-mono text-xs">
                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#D9C7A5]/30 text-center">
                      <span className="text-[10px] text-[#4A5550] block uppercase">Accuracy</span>
                      <span className="font-bold text-[#17352D] mt-0.5 block">
                        {(recommendation.expected_metrics.accuracy * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#D9C7A5]/30 text-center">
                      <span className="text-[10px] text-[#4A5550] block uppercase">Precision</span>
                      <span className="font-bold text-[#C87868] mt-0.5 block">
                        {(recommendation.expected_metrics.precision * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#D9C7A5]/30 text-center">
                      <span className="text-[10px] text-[#4A5550] block uppercase">Recall</span>
                      <span className="font-bold text-[#3D8068] mt-0.5 block">
                        {(recommendation.expected_metrics.recall * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#D9C7A5]/30 text-center">
                      <span className="text-[10px] text-[#4A5550] block uppercase">F1-Score</span>
                      <span className="font-bold text-[#17352D] mt-0.5 block">
                        {(recommendation.expected_metrics.f1_score * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#D9C7A5]/30 text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-[#4A5550] block uppercase">ROC-AUC</span>
                      <span className="font-bold text-[#17352D] mt-0.5 block">
                        {recommendation.expected_metrics.roc_auc.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rationale */}
                <div className="bg-[#FAF8F4] rounded-2xl p-4 border border-[#D9C7A5]/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#17352D] block">
                    Computational Rationale
                  </span>
                  <p className="text-xs text-[#4A5550] leading-relaxed font-normal">
                    {recommendation.rationale}
                  </p>
                </div>
              </div>
            )}

            {/* Mandatory Non-Clinical Label */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#4A5550] font-mono border-t border-[#E8EEE8]">
              <Info className="w-3.5 h-3.5 text-[#3D8068] shrink-0" />
              <span>Research analysis only — not a clinical recommendation.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
