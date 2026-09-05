import React from 'react'
import { Link } from 'react-router-dom'
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
import { Lightbulb, ArrowRight, ShieldCheck, CheckCircle2, Award, Sparkles } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

const GLOBAL_SHAP_DATA = [
  { feature: 'ap_hi (Systolic BP)', realMean: 0.684, augMean: 0.678, diff: '-0.006' },
  { feature: 'age (Patient Age)', realMean: 0.452, augMean: 0.449, diff: '-0.003' },
  { feature: 'cholesterol (Serum Chol)', realMean: 0.389, augMean: 0.395, diff: '+0.006' },
  { feature: 'weight (Body Weight)', realMean: 0.298, augMean: 0.304, diff: '+0.006' },
  { feature: 'ap_lo (Diastolic BP)', realMean: 0.245, augMean: 0.241, diff: '-0.004' },
  { feature: 'gluc (Glucose Level)', realMean: 0.187, augMean: 0.191, diff: '+0.004' },
  { feature: 'active (Physical Activity)', realMean: 0.124, augMean: 0.120, diff: '-0.004' },
  { feature: 'smoke (Smoking Status)', realMean: 0.089, augMean: 0.086, diff: '-0.003' },
]

export const ExplainabilitySection: React.FC = () => {
  return (
    <section id="explainability" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="08"
          eyebrow="Game-Theoretic Interpretability"
          title="Don't Just Predict. Understand Why."
          description="SHAP (SHapley Additive exPlanations) estimates how individual clinical biomarkers contribute to model predictions relative to expected baseline values."
        />

        {/* 1. Global Feature Importance Concordance */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-6 border-b border-[#E8EEE8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] block">
                Global Feature Concordance
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D] mt-0.5">
                Mean |SHAP| Comparison: Real Baseline vs. 200% Augmented Model
              </h3>
            </div>

            <div className="bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#D9C7A5]/40 text-xs font-mono shrink-0">
              <span className="text-[#4A5550] block text-[10px] uppercase">Rank Preservation</span>
              <span className="font-bold text-[#17352D]">Spearman ρ = +0.8455 (p = 1.05 × 10⁻³)</span>
            </div>
          </div>

          <div className="h-80 sm:h-96 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={GLOBAL_SHAP_DATA}
                margin={{ top: 10, right: 30, left: 120, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEE8" />
                <XAxis type="number" stroke="#4A5550" tick={{ fill: '#4A5550', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="#4A5550"
                  tick={{ fill: '#17352D', fontSize: 11, fontWeight: 500 }}
                />
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
                <Bar dataKey="realMean" name="Real-Only Baseline Model" fill="#17352D" radius={[0, 4, 4, 0]} />
                <Bar dataKey="augMean" name="200% CTGAN Augmented Model" fill="#3D8068" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 text-xs text-[#4A5550] leading-relaxed">
            <strong>Biological Plausibility Verified:</strong> Both models identify systolic blood pressure (ap_hi), patient age, and serum cholesterol as the top 3 drivers of cardiovascular risk, confirming that synthetic data augmentation preserves underlying pathophysiology without introducing spurious feature artifacts.
          </div>
        </div>

        {/* 2. Exemplar Patient Waterfall Attribution Breakdown */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle mb-10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] block">
                Local Patient Attribution
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#17352D] mt-0.5">
                Exemplar Patient Risk Attribution (Male, Age 56)
              </h3>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
              Estimated Probability: 85.75%
            </span>
          </div>

          <div className="space-y-3">
            {[
              { feat: 'ap_hi (Systolic BP = 138 mmHg)', impact: '+0.6783', dir: 'pos', pct: 85, desc: 'Elevated systolic pressure increases stroke risk and cardiac workload.' },
              { feat: 'age (56 Years)', impact: '+0.4215', dir: 'pos', pct: 60, desc: 'Patient age places profile above median demographic risk baseline.' },
              { feat: 'cholesterol (Level 2: Borderline)', impact: '+0.2841', dir: 'pos', pct: 40, desc: 'Elevated serum lipid density promotes atheroma development.' },
              { feat: 'active (Physical Activity = 1: Active)', impact: '-0.1542', dir: 'neg', pct: 25, desc: 'Regular exercise reduces cardiovascular mortality hazard.' },
              { feat: 'smoke (Non-Smoker = 0)', impact: '-0.0894', dir: 'neg', pct: 15, desc: 'Absence of tobacco use mitigates endothelial inflammation.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17352D]">{item.feat}</span>
                  <span className={`font-mono text-xs font-bold ${item.dir === 'pos' ? 'text-[#C87868]' : 'text-[#3D8068]'}`}>
                    SHAP: {item.impact} ({item.dir === 'pos' ? '+ Increases Risk' : '− Decreases Risk'})
                  </span>
                </div>
                <div className="w-full bg-[#E8EEE8] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.dir === 'pos' ? 'bg-[#C87868]' : 'bg-[#3D8068]'}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#4A5550]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CTA to Try Prediction */}
        <div className="text-center">
          <Link
            to="/prediction"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle border border-[#D9C7A5]/30"
          >
            <span>Try an Explainable Prediction</span>
            <ArrowRight className="w-4 h-4 text-[#D9C7A5]" />
          </Link>
        </div>

      </div>
    </section>
  )
}
