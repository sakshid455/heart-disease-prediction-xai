import React from 'react'
import { Sparkles, Eye, ShieldCheck, Award, Network, CheckCircle } from 'lucide-react'

export const XaiShapSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#D9C7A5]/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17352D]/10 text-[#17352D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Section 7 &bull; Explainable Artificial Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#17352D] tracking-tight">
            Explainability via SHAP (Shapley Additive exPlanations)
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5550] leading-relaxed">
            Machine learning models are frequently criticized as opaque &ldquo;black boxes.&rdquo; To ensure clinical auditability, CardioAI embeds <strong>SHAP</strong>, a mathematically rigorous framework grounded in cooperative game theory.
          </p>
        </div>

        {/* 3 Core XAI Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          
          {/* Card 1: Axiomatic Foundation */}
          <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-7 border border-[#D9C7A5]/60 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-[#17352D] text-[#D9C7A5] flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Cooperative Game Theory
            </h3>
            <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
              Derived from Lloyd Shapley&rsquo;s Nobel-winning formulation (1953), SHAP treats each clinical biomarker (e.g. cholesterol, ST slope) as a player in a cooperative coalition whose &ldquo;payout&rdquo; is the final predicted disease probability.
            </p>
            <div className="bg-white p-3 rounded-xl border border-[#D9C7A5]/40 font-mono text-[11px] text-[#17352D]">
              &sum; &phi;<sub>i</sub>(x) = f(x) - E[f(X)]
            </div>
          </div>

          {/* Card 2: Local Patient Attribution */}
          <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-7 border border-[#D9C7A5]/60 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-[#3D8068] text-white flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Local Patient Attribution
            </h3>
            <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
              For any individual assessment, SHAP decomposes the prediction into positive factors (pushing risk higher, e.g. asymptomatic chest pain +0.14) and negative factors (pushing risk lower, e.g. normal ECG -0.08) relative to population base risk.
            </p>
            <div className="text-[11px] text-[#3D8068] font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Enables clinician validation of individual cases</span>
            </div>
          </div>

          {/* Card 3: Global Model Auditing */}
          <div className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-7 border border-[#D9C7A5]/60 shadow-subtle">
            <div className="w-10 h-10 rounded-xl bg-[#8B6534] text-white flex items-center justify-center mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#17352D] mb-2">
              Global Cohort Importance
            </h3>
            <p className="text-xs text-[#4A5550] leading-relaxed mb-4">
              By averaging absolute SHAP values across all patients, we obtain an unshakeable ranking of global feature influence. This confirmed that thallium defect, fluoroscopy major vessels, and chest pain type dominate diagnostic predictions.
            </p>
            <div className="text-[11px] text-[#3D8068] font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Concordance with established clinical cardiology</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
