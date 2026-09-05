import React from 'react'
import { Award, AlertTriangle, CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ResearchInsightSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 7 &bull; Concluding Synthesis</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Research Insight & Synthesis
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Synthesizing findings from 28 benchmark runs across linear, bagging, boosting, and generative synthetic pipelines.
          </p>
        </div>

        {/* Major Highlighted Conclusion Banner */}
        <div className="bg-[#FAF8F4] border-2 border-[#17352D] rounded-3xl p-8 sm:p-10 shadow-elevated mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3D8068]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#17352D] text-[#D9C7A5] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3D8068]">
                Primary Empirical Takeaway
              </span>
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#17352D] leading-snug mb-6">
              &ldquo;XGBoost with 200% augmentation achieved the strongest experimental configuration in the current evaluation.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#D9C7A5]/60 text-xs sm:text-sm text-[#4A5550]">
              <div className="space-y-1">
                <strong className="text-[#17352D] block font-serif text-base">
                  1. Peak Screening Sensitivity
                </strong>
                <span>
                  96.43% test recall minimizes missed pathology, crucial in cardiovascular triage.
                </span>
              </div>
              <div className="space-y-1">
                <strong className="text-[#17352D] block font-serif text-base">
                  2. Balanced Decision Margins
                </strong>
                <span>
                  Achieved 90.16% accuracy and 90.00% F1 without destabilizing classification boundaries.
                </span>
              </div>
              <div className="space-y-1">
                <strong className="text-[#17352D] block font-serif text-base">
                  3. Non-Universal Trade-Off
                </strong>
                <span>
                  100% augmentation remains the conservative choice when equal precision weighting is required.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MANDATORY CLINICAL DISCLAIMER NOTICE */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border-2 border-[#D9C7A5] shadow-sm mb-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B6534]/15 text-[#8B6534] flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#17352D]">
                Important Research Boundary &bull; Clinical Superiority Disclaimer
              </h4>
              <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed">
                <strong>This experimental finding does NOT establish clinical superiority in real-world healthcare settings.</strong> 
                The benchmarks were conducted on retrospective cohort data (UCI Cleveland & Framingham splits) under controlled offline conditions. 
                Before any machine learning model or synthetic data pipeline can be adopted for patient care, prospective multi-center clinical trials, external demographic validation, and regulatory clearance (FDA/CE) are strictly required.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-[#17352D]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>Retrospective validation only</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>No prospective clinical deployment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3D8068]" />
                  <span>Transparent XAI audit recommended</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Footer CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#D9C7A5]/40">
          <div className="text-xs text-[#5C6B64]">
            Ready to test live patient inputs or inspect SHAP explainability?
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/explainable-ai"
              className="px-4 py-2 rounded-xl bg-white border border-[#D9C7A5] text-[#17352D] text-xs font-semibold hover:bg-[#FAF8F4] transition-all shadow-sm"
            >
              Explore SHAP XAI
            </Link>
            <Link
              to="/prediction"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17352D] text-[#F7F4ED] text-xs font-semibold hover:bg-[#102721] transition-all shadow-subtle"
            >
              <span>Try Live Prediction</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
            </Link>
          </div>
        </div>

        {/* User Journey Progression CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border border-[#D9C7A5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
              Next Step in Research Journey
            </span>
            <h4 className="font-serif font-bold text-xl text-[#17352D]">
              Research & Methodology Specifications
            </h4>
            <p className="text-xs text-[#5C6B64] max-w-xl leading-relaxed">
              Examine the 14-attribute clinical dictionary, data preprocessing protocols, WGAN-GP training equations, and formal limitations.
            </p>
          </div>

          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-semibold tracking-wide transition-all shadow-subtle shrink-0 hover:-translate-y-0.5"
          >
            <span>Proceed to Methodology</span>
            <span className="text-[#D9C7A5]">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
