import React from 'react'
import {
  XaiHero,
  WhatIsXaiSection,
  GlobalFeatureImportanceSection,
  IndividualWaterfallSection,
  FeatureExplanationsSection,
  GlobalModelBehaviorSection,
  SimpleExplanationSection,
} from '../components/xai'

/**
 * ExplainableAIPage — The signature Explainable AI experience of CardioAI.
 * Route: /explainable-ai
 *
 * Composed of 6 core sections + hero:
 * 1. Hero ("Don't Just Get a Prediction. Understand It.")
 * 2. Section 1: What is XAI? (Transparency, Feature Influence, Trust)
 * 3. Section 2: Global Feature Importance (Interactive SHAP visualization)
 * 4. Section 3: Individual Prediction (SHAP waterfall decomposition)
 * 5. Section 4: Feature Explanations (Expandable cards for important clinical variables)
 * 6. Section 5: Global Model Behavior (SHAP summary beeswarm & distribution)
 * 7. Section 6: Simple Explanation (Highlighted card "What does this mean?")
 */
export const ExplainableAIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F4ED] pb-24 space-y-16">
      {/* PAGE HERO */}
      <XaiHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* SECTION 1 — WHAT IS XAI? */}
        <WhatIsXaiSection />

        {/* SECTION 2 — GLOBAL FEATURE IMPORTANCE */}
        <GlobalFeatureImportanceSection />

        {/* SECTION 3 — INDIVIDUAL PREDICTION */}
        <IndividualWaterfallSection />

        {/* SECTION 4 — FEATURE EXPLANATIONS */}
        <FeatureExplanationsSection />

        {/* SECTION 5 — GLOBAL MODEL BEHAVIOR */}
        <GlobalModelBehaviorSection />

        {/* SECTION 6 — SIMPLE EXPLANATION */}
        <SimpleExplanationSection />

        {/* User Journey Progression CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9C7A5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3D8068]">
              Next Step in Research Journey
            </span>
            <h4 className="font-serif font-bold text-xl text-[#17352D]">
              Explore the CTGAN Synthetic Data Lab
            </h4>
            <p className="text-xs text-[#5C6B64] max-w-xl leading-relaxed">
              Discover how Conditional Tabular GANs synthesize realistic patient profiles with mode-specific normalization and PacGAN stabilization.
            </p>
          </div>

          <a
            href="/ctgan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-semibold tracking-wide transition-all shadow-subtle shrink-0 hover:-translate-y-0.5"
          >
            <span>Proceed to CTGAN Lab</span>
            <span className="text-[#D9C7A5]">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
