import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  ResultHero,
  PatientSummarySection,
  RiskProfileSection,
  KeyContributorsSection,
  UnderstandingResultSection,
  NextActionsSection,
  DisclaimerSection,
} from '../components/prediction-result'
import { PredictionResult, ExplanationResult, api } from '../services/api'
import { ClinicalFormData } from '../components/prediction/types'
import { Loader2, ArrowLeft } from 'lucide-react'

export interface LocationState {
  result?: PredictionResult
  patient?: ClinicalFormData
  explanation?: ExplanationResult | null
  timestamp?: string
}

export const PredictionResultPage: React.FC = () => {
  const location = useLocation()
  const [data, setData] = useState<LocationState | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // 1. Check React Router location state
    if (location.state && (location.state as LocationState).result) {
      setData(location.state as LocationState)
      return
    }

    // 2. Check sessionStorage fallback
    const cached = sessionStorage.getItem('cardioai_last_prediction')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (parsed && parsed.result) {
          setData(parsed)
          return
        }
      } catch (e) {
        console.warn('Could not parse cached prediction:', e)
      }
    }

    // 3. Fallback: If user visits directly without assessment, evaluate standard clinical profile via live backend
    const loadDefaultBenchmark = async () => {
      setIsLoading(true)
      try {
        const samplePatient: ClinicalFormData = {
          age: 58,
          sex: 1,
          cp: 3,
          trestbps: 140,
          chol: 260,
          fbs: 0,
          restecg: 1,
          thalach: 145,
          exang: 1,
          oldpeak: 2.4,
          slope: 2,
          ca: 1,
          thal: 7,
        }

        const pred = await api.predictRisk(samplePatient)
        let expl = null
        try {
          expl = await api.explainRisk(samplePatient)
        } catch {}

        setData({
          result: pred,
          patient: samplePatient,
          explanation: expl,
          timestamp: new Date().toISOString(),
        })
      } catch (err) {
        console.error('Failed to load initial benchmark assessment:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadDefaultBenchmark()
  }, [location.state])

  if (isLoading || !data || !data.result) {
    return (
      <div className="min-h-[75vh] bg-[#F7F4ED] flex flex-col items-center justify-center p-6 space-y-4">
        <Loader2 className="w-8 h-8 text-[#17352D] animate-spin" />
        <div className="text-sm font-serif font-bold text-[#17352D]">
          Retrieving Machine Learning Assessment...
        </div>
        <p className="text-xs text-[#808C85]">
          Connecting to FastAPI inference service and computing Shapley values
        </p>
      </div>
    )
  }

  const { result, patient, explanation } = data

  return (
    <div className="min-h-screen bg-[#F7F4ED] pb-24">
      {/* SECTION 1: PAGE HERO & CENTRAL RESULT CARD */}
      <ResultHero result={result} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-12">
        
        {/* Navigation jump back */}
        <div className="flex items-center justify-between border-b border-[#D9C7A5]/40 pb-4">
          <Link
            to="/prediction"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#3D8068] hover:text-[#17352D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Assessment Parameters</span>
          </Link>
          <span className="text-xs font-mono text-[#808C85]">
            Evaluation ID: #{Math.abs(Math.round(result.probability * 98765))}
          </span>
        </div>

        {/* SECTION 2: PATIENT SUMMARY */}
        {patient && <PatientSummarySection patient={patient} />}

        {/* SECTION 3: RISK PROFILE */}
        {patient && <RiskProfileSection patient={patient} />}

        {/* SECTION 4: KEY CONTRIBUTORS (SHAP) */}
        {explanation && <KeyContributorsSection explanation={explanation} />}

        {/* SECTION 5: UNDERSTANDING THE RESULT */}
        <UnderstandingResultSection result={result} />

        {/* SECTION 6: NEXT ACTIONS */}
        <NextActionsSection />

        {/* SECTION 7: DISCLAIMER */}
        <DisclaimerSection />

      </div>
    </div>
  )
}
