import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepIndicator } from './StepIndicator'
import { Step1Patient } from './Step1Patient'
import { Step2Clinical } from './Step2Clinical'
import { Step3Medical } from './Step3Medical'
import { Step4Review } from './Step4Review'
import { ClinicalFormData, INITIAL_CLINICAL_DATA, FormErrors } from './types'
import { api } from '../../services/api'
import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'

export const ClinicalAssessmentForm: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [highestVisitedStep, setHighestVisitedStep] = useState<number>(1)
  const [formData, setFormData] = useState<ClinicalFormData>(INITIAL_CLINICAL_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Field change handler
  const handleFieldChange = (field: keyof ClinicalFormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for field if present
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Validate individual steps
  const validateStep = (step: number): boolean => {
    const stepErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.age || formData.age < 18 || formData.age > 120) {
        stepErrors.age = 'Patient age must be an integer between 18 and 120 years.'
      }
      if (formData.sex !== 0 && formData.sex !== 1) {
        stepErrors.sex = 'Please select biological sex (Female or Male).'
      }
    } else if (step === 2) {
      if (!formData.trestbps || formData.trestbps < 50 || formData.trestbps > 250) {
        stepErrors.trestbps = 'Resting blood pressure must be between 50 and 250 mmHg.'
      }
      if (!formData.chol || formData.chol < 50 || formData.chol > 600) {
        stepErrors.chol = 'Serum cholesterol must be between 50 and 600 mg/dL.'
      }
      if (!formData.thalach || formData.thalach < 50 || formData.thalach > 250) {
        stepErrors.thalach = 'Maximum heart rate must be between 50 and 250 bpm.'
      }
      if (formData.oldpeak < 0 || formData.oldpeak > 10) {
        stepErrors.oldpeak = 'ST depression (oldpeak) must be between 0.0 and 10.0 mm.'
      }
    } else if (step === 3) {
      if (![1, 2, 3, 4].includes(formData.cp)) {
        stepErrors.cp = 'Please select a valid chest pain classification (Type 1 to 4).'
      }
      if (![0, 1].includes(formData.fbs)) {
        stepErrors.fbs = 'Please specify fasting blood sugar status.'
      }
      if (![0, 1, 2].includes(formData.restecg)) {
        stepErrors.restecg = 'Please select a resting ECG category.'
      }
      if (![0, 1].includes(formData.exang)) {
        stepErrors.exang = 'Please select exercise angina status.'
      }
      if (![1, 2, 3].includes(formData.slope)) {
        stepErrors.slope = 'Please select an ST slope classification.'
      }
      if (![0, 1, 2, 3].includes(formData.ca)) {
        stepErrors.ca = 'Please select major vessels count (0-3).'
      }
      if (![3, 6, 7].includes(formData.thal)) {
        stepErrors.thal = 'Please select a valid thalassemia status.'
      }
    }

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      if (nextStep > highestVisitedStep) {
        setHighestVisitedStep(nextStep)
      }
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  const handleStepClick = (step: number) => {
    if (step < currentStep || validateStep(currentStep)) {
      setCurrentStep(step)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  // Final Inference Submission
  const handleSubmit = async () => {
    // Validate all steps prior to dispatch
    for (let s = 1; s <= 3; s++) {
      if (!validateStep(s)) {
        setCurrentStep(s)
        return
      }
    }

    setIsLoading(true)
    setApiError(null)

    try {
      // Dispatch real prediction request to the backend
      const predictionResponse = await api.predictRisk(formData)

      // Also proactively fetch SHAP feature contributions for the result page
      let explanationResponse = null
      try {
        explanationResponse = await api.explainRisk(formData)
      } catch (explainErr) {
        console.warn('Optional SHAP explanation call failed:', explainErr)
      }

      // Persist to session storage for resilience on reload
      const resultPayload = {
        result: predictionResponse,
        patient: formData,
        explanation: explanationResponse,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem('cardioai_last_prediction', JSON.stringify(resultPayload))

      // Route to /prediction-result passing actual prediction response
      navigate('/prediction-result', {
        state: resultPayload,
      })
    } catch (err: any) {
      console.error('Prediction API Error:', err)
      setApiError(
        err.message || 'Failed to communicate with prediction service. Please ensure backend is running.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        highestVisitedStep={highestVisitedStep}
        onStepClick={handleStepClick}
      />

      {/* Main Step Form Card */}
      <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 border border-[#D9C7A5]/50 shadow-subtle">
        
        {currentStep === 1 && (
          <Step1Patient
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <Step2Clinical
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <Step3Medical
            data={formData}
            onChange={handleFieldChange}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <Step4Review
            data={formData}
            onEditStep={(s) => setCurrentStep(s)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={apiError}
          />
        )}

        {/* Step Navigation Bar (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="mt-10 pt-6 border-t border-[#D9C7A5]/40 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D9C7A5] text-[#4A5550] text-sm font-semibold hover:bg-white hover:text-[#17352D] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="text-xs text-[#808C85] font-medium hidden sm:block">
              Step {currentStep} of 4 · {currentStep === 1 ? 'Patient' : currentStep === 2 ? 'Clinical' : 'Medical'}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-sm font-semibold shadow-xs hover:shadow transition-all"
            >
              <span>{currentStep === 3 ? 'Review Profile' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
