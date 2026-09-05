import React from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, ArrowRight, Activity, AlertCircle, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'

export const AboutProblemSection: React.FC = () => {
  return (
    <section id="about-problem" className="py-20 md:py-28 bg-[#F7F4ED] border-b border-[#D9C7A5]/40 scroll-mt-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="01"
          eyebrow="Clinical Context & Challenge"
          title="Understanding the Challenge"
          description="Addressing the fundamental limitations of clinical sample scarcity in modern cardiovascular predictive modeling."
        />

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-[#3D8068] pl-5 py-1">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] leading-snug tracking-tight">
                Heart disease remains an important healthcare challenge worldwide.
              </h3>
            </div>

            <p className="text-base sm:text-[17px] text-[#4A5550] leading-relaxed font-sans">
              Cardiovascular disease accounts for nearly 18 million deaths annually. While modern machine learning algorithms can assist clinicians in identifying subtle non-linear risk patterns within patient biomarkers, clinical healthcare datasets are often severely constrained in size, diversity, and availability due to privacy mandates and institutional silos.
            </p>

            {/* Research Question Callout Banner */}
            <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-6 sm:p-7 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3D8068] font-sans">
                <span className="w-2 h-2 rounded-full bg-[#3D8068]" />
                <span>The Core Research Question</span>
              </div>

              <blockquote className="text-lg sm:text-xl font-serif font-bold text-[#17352D] leading-snug">
                “Can synthetic healthcare data help expand training data without compromising predictive performance?”
              </blockquote>

              <p className="text-xs sm:text-[13px] text-[#4A5550] leading-relaxed font-normal font-sans pt-1">
                Rather than treating synthetic data as an unverified bulk addition, this research investigates how conditional generative models affect decision boundaries, clinical sensitivity, and biomarker interpretability.
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <Link
                to="/research"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle"
              >
                <span>Read the Research</span>
                <ArrowRight className="w-4 h-4 text-[#D9C7A5]" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Visual Medical Graphic Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#D9C7A5]/60 rounded-2xl p-7 shadow-subtle space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-[#C87868]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#17352D] font-sans">
                    Cardiovascular Risk Burden
                  </span>
                </div>
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                  Global Statistics
                </span>
              </div>

              <div className="space-y-4 font-sans">
                <div className="bg-[#FAF8F4] rounded-xl p-4 border border-[#D9C7A5]/30 space-y-1">
                  <div className="font-serif text-2xl font-bold text-[#17352D]">#1 Cause</div>
                  <div className="text-xs text-[#4A5550] font-medium">Of global mortality (17.9M annual deaths)</div>
                </div>

                <div className="bg-[#FAF8F4] rounded-xl p-4 border border-[#D9C7A5]/30 space-y-1">
                  <div className="font-serif text-2xl font-bold text-[#C87868]">High False Negatives</div>
                  <div className="text-xs text-[#4A5550] font-medium">Unaugmented baseline models miss up to 33.4% of positive risk cases</div>
                </div>

                <div className="bg-[#E8EEE8]/70 rounded-xl p-4 border border-[#D8E2D8] space-y-1">
                  <div className="font-serif text-2xl font-bold text-[#17352D]">+7.29% Sensitivity</div>
                  <div className="text-xs text-[#3D8068] font-semibold">Achieved by adaptive CTGAN augmentation at 200% capacity</div>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-[#4A5550] border-t border-[#E8EEE8] flex items-center justify-between">
                <span>Multi-Biomarker Profiling</span>
                <span>Interpretable AI</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
