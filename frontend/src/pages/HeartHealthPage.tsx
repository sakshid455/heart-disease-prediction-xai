import React from 'react'
import {
  HeartHealthHero,
  WhatIsHeartDisease,
  TypesSection,
  RiskFactorsSection,
  WarningSignsSection,
  PreventionSection,
  KnowYourNumbersSection,
  HeartHealthCTA,
} from '../components/heart-health'

/**
 * HeartHealthPage — Premium medical education page.
 *
 * Composed of 7 sections + hero:
 * - Hero: "Understand Your Heart. Understand Your Risk."
 * - Section 1: What Is Heart Disease?
 * - Section 2: Types of Heart Disease (5 cards)
 * - Section 3: Risk Factors (8 cards)
 * - Section 4: Warning Signs (6 cards + emergency disclaimer)
 * - Section 5: Prevention (MOVE / EAT / MONITOR)
 * - Section 6: Know Your Numbers (4 health metric cards)
 * - Section 7: CTA — "Start Risk Assessment"
 */
export const HeartHealthPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#F7F4ED]">
      <HeartHealthHero />
      <WhatIsHeartDisease />
      <TypesSection />
      <RiskFactorsSection />
      <WarningSignsSection />
      <PreventionSection />
      <KnowYourNumbersSection />
      <HeartHealthCTA />
    </div>
  )
}
