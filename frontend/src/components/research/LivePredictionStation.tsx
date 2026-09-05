import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Activity,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  User,
  Sliders,
  Stethoscope,
} from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { api, PatientFeaturesPayload, PredictionResultResponse } from '../../services/api'

export interface LivePredictionStationProps {
  patientState: PatientFeaturesPayload
  setPatientState: React.Dispatch<React.SetStateAction<PatientFeaturesPayload>>
}

export const LivePredictionStation: React.FC<LivePredictionStationProps> = ({
  patientState,
  setPatientState,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResultResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleInputChange = (field: keyof PatientFeaturesPayload, value: number) => {
    setPatientState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const res = await api.predictRisk(patientState)
      setPredictionResult(res)
    } catch (err: any) {
      console.error('Prediction API Error:', err)
      setErrorMessage(err.message || 'Failed to communicate with prediction service.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadPreset = (preset: 'high' | 'moderate' | 'low') => {
    if (preset === 'high') {
      setPatientState({
        age: 62,
        gender: 2,
        height: 168,
        weight: 92,
        ap_hi: 155,
        ap_lo: 98,
        cholesterol: 3,
        gluc: 2,
        smoke: 1,
        alco: 1,
        active: 0,
      })
    } else if (preset === 'moderate') {
      setPatientState({
        age: 54,
        gender: 1,
        height: 162,
        weight: 74,
        ap_hi: 135,
        ap_lo: 85,
        cholesterol: 2,
        gluc: 1,
        smoke: 0,
        alco: 0,
        active: 1,
      })
    } else {
      setPatientState({
        age: 38,
        gender: 1,
        height: 170,
        weight: 64,
        ap_hi: 115,
        ap_lo: 75,
        cholesterol: 1,
        gluc: 1,
        smoke: 0,
        alco: 0,
        active: 1,
      })
    }
  }

  return (
    <section id="prediction-station" className="py-12 bg-[#F7F4ED] font-sans">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          chapterNumber="11"
          eyebrow="Interactive Clinical Inference"
          title="Try the Model"
          description="Explore how the 200% CTGAN-augmented optimal classifier evaluates individualized patient physiological profiles."
        />

        {/* Preset Cohort Selector Strip */}
        <div className="bg-white border border-[#D9C7A5]/50 rounded-2xl p-4 sm:p-5 shadow-subtle mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17352D]">
            <User className="w-4 h-4 text-[#3D8068]" />
            <span>Load Evaluated Patient Profile:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => loadPreset('high')}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#E8EEE8] text-xs font-semibold text-[#C87868] border border-[#D9C7A5]/40 transition-colors"
            >
              High Risk Profile (Age 62)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('moderate')}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#E8EEE8] text-xs font-semibold text-[#17352D] border border-[#D9C7A5]/40 transition-colors"
            >
              Moderate Risk Profile (Age 54)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('low')}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#E8EEE8] text-xs font-semibold text-[#3D8068] border border-[#D9C7A5]/40 transition-colors"
            >
              Low Risk Baseline (Age 38)
            </button>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Input Form (7 cols) */}
          <form
            onSubmit={handlePredict}
            className="lg:col-span-7 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#3D8068]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                  Patient Biomarker Inputs
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                11 Physiological Variables
              </span>
            </div>

            {/* Group 1: Patient Information */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068] font-sans">
                Group A · Patient Profile
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={patientState.age}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-mono font-bold text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Biological Sex
                  </label>
                  <select
                    value={patientState.gender}
                    onChange={(e) => handleInputChange('gender', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={1}>1: Female</option>
                    <option value={2}>2: Male</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="220"
                    value={patientState.height}
                    onChange={(e) => handleInputChange('height', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-mono font-bold text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="35"
                    max="200"
                    value={patientState.weight}
                    onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-mono font-bold text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Group 2: Clinical Measurements */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068] font-sans">
                Group B · Clinical Measurements
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Systolic BP (ap_hi)
                  </label>
                  <input
                    type="number"
                    min="70"
                    max="240"
                    value={patientState.ap_hi}
                    onChange={(e) => handleInputChange('ap_hi', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-mono font-bold text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Diastolic BP (ap_lo)
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="150"
                    value={patientState.ap_lo}
                    onChange={(e) => handleInputChange('ap_lo', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-mono font-bold text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Cholesterol Level
                  </label>
                  <select
                    value={patientState.cholesterol}
                    onChange={(e) => handleInputChange('cholesterol', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={1}>1: Normal</option>
                    <option value={2}>2: Above Normal</option>
                    <option value={3}>3: Well Above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Glucose Level
                  </label>
                  <select
                    value={patientState.gluc}
                    onChange={(e) => handleInputChange('gluc', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={1}>1: Normal</option>
                    <option value={2}>2: Above Normal</option>
                    <option value={3}>3: Well Above</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Group 3: Behavioral Indicators */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068] font-sans">
                Group C · Lifestyle Factors
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Smoking
                  </label>
                  <select
                    value={patientState.smoke}
                    onChange={(e) => handleInputChange('smoke', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={0}>0: Non-smoker</option>
                    <option value={1}>1: Smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Alcohol Intake
                  </label>
                  <select
                    value={patientState.alco}
                    onChange={(e) => handleInputChange('alco', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={0}>0: No</option>
                    <option value={1}>1: Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17352D] mb-1">
                    Physical Activity
                  </label>
                  <select
                    value={patientState.active}
                    onChange={(e) => handleInputChange('active', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D9C7A5]/50 rounded-xl text-xs font-sans font-medium text-[#17352D] focus:outline-none focus:ring-2 focus:ring-[#3D8068]"
                  >
                    <option value={1}>1: Active</option>
                    <option value={0}>0: Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                {errorMessage}
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle flex items-center justify-center gap-2 focus:outline-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#D9C7A5] animate-spin" />
                    <span>Running model inference...</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4 text-[#D9C7A5]" />
                    <span>Analyze Patient</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* RIGHT COLUMN: Prediction Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#D9C7A5]/60 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3D8068]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#17352D]">
                  Model Output
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/40">
                Live Server
              </span>
            </div>

            {predictionResult ? (
              <div className="space-y-6">
                
                {/* Result Hero Box */}
                <div className={`p-5 rounded-2xl border ${
                  predictionResult.prediction === 1
                    ? 'bg-[#FAEEEB] border-[#C87868]/60 text-[#17352D]'
                    : 'bg-[#E8EEE8]/70 border-[#D8E2D8] text-[#17352D]'
                }`}>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#4A5550]">
                    Diagnostic Risk Assessment
                  </div>
                  <div className="font-serif text-2xl font-bold mt-1">
                    {predictionResult.prediction_label}
                  </div>
                  <div className="font-mono text-xs mt-1 text-[#3D8068] font-bold">
                    Risk Category: {predictionResult.risk_category}
                  </div>
                </div>

                {/* Probability Gauge */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#4A5550]">Estimated Probability:</span>
                    <span className="font-bold text-[#17352D]">
                      {(predictionResult.probability * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div className="w-full bg-[#FAF8F4] rounded-full h-3 border border-[#D9C7A5]/40 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        predictionResult.prediction === 1 ? 'bg-[#C87868]' : 'bg-[#3D8068]'
                      }`}
                      style={{ width: `${predictionResult.probability * 100}%` }}
                    />
                  </div>
                </div>

                {/* Model Metadata */}
                <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#D9C7A5]/30 space-y-1 text-xs font-mono text-[#4A5550]">
                  <div className="flex justify-between">
                    <span>Model Architecture:</span>
                    <span className="font-bold text-[#17352D]">{predictionResult.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Augmentation Level:</span>
                    <span className="font-bold text-[#3D8068]">{predictionResult.augmentation_ratio}</span>
                  </div>
                </div>

                {/* CTA: View SHAP Explanation */}
                <div className="pt-2">
                  <Link
                    to="/explainability"
                    className="w-full py-3 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-subtle flex items-center justify-center gap-2"
                  >
                    <span>View Explanation (SHAP)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
                  </Link>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-center text-[#4A5550]">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="text-sm font-serif font-bold text-[#17352D]">
                  No Analysis Run Yet
                </div>
                <p className="text-xs text-[#4A5550] max-w-xs mx-auto leading-relaxed">
                  Adjust the patient biomarker inputs on the left or select a preset cohort, then click <strong>Analyze Patient</strong>.
                </p>
              </div>
            )}

            {/* Academic Disclaimer */}
            <div className="pt-4 border-t border-[#E8EEE8] flex items-start gap-2 text-[11px] text-[#4A5550]">
              <ShieldAlert className="w-4 h-4 text-[#C87868] shrink-0 mt-0.5" />
              <span>
                Research and educational use only. This tool is not a medical diagnostic system.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
