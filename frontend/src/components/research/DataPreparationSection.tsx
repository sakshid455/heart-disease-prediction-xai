import React from 'react'
import { Filter, Lock, CheckCircle2, ShieldCheck, ArrowRight, Activity } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const DataPreparationSection: React.FC = () => {
  const prepSteps = [
    { step: '01', title: 'Raw Ingestion', desc: 'Loaded multi-institutional clinical records across continuous and categorical biomarker columns.' },
    { step: '02', title: 'Outlier & Missing Audit', desc: 'Verified 0.14% total missing rate; conducted median and modal imputation on ca and thal attributes.' },
    { step: '03', title: 'Physiological Cleaning', desc: 'Filtered physically impossible diastolic/systolic blood pressure anomalies (ap_lo <= ap_hi).' },
    { step: '04', title: 'Quarantined 80/20 Split', desc: 'Executed stratified partition strictly before standard scaling or generative synthesis.' },
    { step: '05', title: 'StandardScaler Normalization', desc: 'Fit scaler parameters exclusively on training records; transformed test split without leakage.' },
  ]

  return (
    <section id="preparation" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16 font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="05"
          eyebrow="Reproducible Pipeline"
          title="Data Preparation & Leakage Isolation"
          description="A strictly quarantined 5-step preparation protocol ensuring that test data remains isolated from synthetic data generation."
        />

        {/* 5-Step Visual Transformation Flow */}
        <div className="bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-9 shadow-subtle mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#3D8068] mb-6">
            Data Preparation Architecture
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {prepSteps.map((s, idx) => (
              <div
                key={s.step}
                className="bg-[#FAF8F4] border border-[#D9C7A5]/40 rounded-2xl p-5 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#17352D] border border-[#D9C7A5]/40">
                      STEP {s.step}
                    </span>
                  </div>

                  <h4 className="text-sm font-serif font-bold text-[#17352D] leading-snug">
                    {s.title}
                  </h4>

                  <p className="mt-2 text-xs text-[#4A5550] leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#D9C7A5]/30 text-[10px] font-mono text-[#3D8068]">
                  • Verified Protocol
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Data Leakage Prevention Quarantine Card */}
        <div className="bg-[#17352D] text-[#F7F4ED] rounded-3xl p-8 sm:p-10 shadow-elevated border border-[#D9C7A5]/40 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#D9C7A5]">
            <Lock className="w-4 h-4 text-[#D9C7A5]" />
            <span>Data Leakage Prevention Quarantine</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
            Zero Test Split Contamination Guarantee
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 text-xs text-[#E8EEE8] font-sans">
            <div className="bg-[#23493E] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
              <strong className="text-white block text-sm">1. Isolated CTGAN Training</strong>
              <p className="text-[#E8EEE8]/80 leading-relaxed">
                The generative adversarial network is fitted exclusively on the 80% training partition without access to held-out test rows.
              </p>
            </div>

            <div className="bg-[#23493E] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
              <strong className="text-white block text-sm">2. Train-Only Augmentation</strong>
              <p className="text-[#E8EEE8]/80 leading-relaxed">
                Synthetic samples are merged solely with training data; the held-out 20% test partition contains exclusively real patients.
              </p>
            </div>

            <div className="bg-[#23493E] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1">
              <strong className="text-white block text-sm">3. Preprocessing Quarantine</strong>
              <p className="text-[#E8EEE8]/80 leading-relaxed">
                StandardScaler mean/variance parameters are computed on training records and applied to test records as an out-of-sample transformation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
