import React from 'react'
import {
  HeroSection,
  TrustSection,
  HeartDiseaseSection,
  StatisticsSection,
  HowItWorksSection,
  FeaturePreviewSection,
  ExplainableAISection,
  FinalCTASection,
} from '../components/home'

/**
 * HomePage — The CardioAI landing page.
 *
 * Composed of 8 modular sections:
 * 1. Hero (split-screen with medical visualization)
 * 2. Trust / Introduction (capability cards)
 * 3. Heart Disease Introduction (why early assessment matters)
 * 4. Statistics (animated count-up numbers)
 * 5. How It Works (process timeline)
 * 6. Feature Preview (six feature cards)
 * 7. Explainable AI Promotion (SHAP visualization)
 * 8. Final CTA
 */
export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#F7F4ED]">
      <HeroSection />
      <TrustSection />
      <HeartDiseaseSection />
      <StatisticsSection />
      <HowItWorksSection />
      <FeaturePreviewSection />
      <ExplainableAISection />
      <FinalCTASection />
    </div>
  )
}
