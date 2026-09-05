import React from 'react'
import { PredictionHero, ClinicalAssessmentForm } from '../components/prediction'

/**
 * PredictionPage — Multi-step clinical assessment interface for Heart Disease Risk Prediction.
 * Route: /prediction
 */
export const PredictionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F4ED] pb-16">
      {/* Page Hero */}
      <PredictionHero />

      {/* Multi-Step Clinical Form */}
      <div className="mt-4">
        <ClinicalAssessmentForm />
      </div>
    </div>
  )
}
