import React from 'react'
import {
  AboutHero,
  ChallengeSection,
  ApproachSection,
  CTGANSection,
  ExplainableAIAboutSection,
  ObjectivesSection,
  ContributionSection,
  DisclaimerSection,
} from '../components/about'

/**
 * AboutPage — Comprehensive about page for CardioAI.
 *
 * Composed of 7 modular sections + hero:
 * - Hero: Project introduction with medical/AI visual
 * - Section 1: The Challenge (research problem)
 * - Section 2: Our Approach (visual pipeline)
 * - Section 3: Why CTGAN? (beginner-friendly explanation)
 * - Section 4: Why Explainable AI? (SHAP visualization)
 * - Section 5: Project Objectives (four goal cards)
 * - Section 6: Research Contribution (highlighted section)
 * - Section 7: Disclaimer (research/educational clarification)
 */
export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#F7F4ED]">
      <AboutHero />
      <ChallengeSection />
      <ApproachSection />
      <CTGANSection />
      <ExplainableAIAboutSection />
      <ObjectivesSection />
      <ContributionSection />
      <DisclaimerSection />
    </div>
  )
}
