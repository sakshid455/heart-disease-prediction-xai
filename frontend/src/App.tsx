import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StickyNavbar } from './components/layout/StickyNavbar'
import { EditorialFooter } from './components/layout/EditorialFooter'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ResearchPage } from './pages/ResearchPage'
import { DatasetPage } from './pages/DatasetPage'
import { SyntheticDataPage } from './pages/SyntheticDataPage'
import { CtganLabPage } from './pages/CtganLabPage'
import { AugmentationPage } from './pages/AugmentationPage'
import { ModelsPage } from './pages/ModelsPage'
import { PerformancePage } from './pages/PerformancePage'
import { ExplainabilityPage } from './pages/ExplainabilityPage'
import { ExplainableAIPage } from './pages/ExplainableAIPage'
import { PredictionPage } from './pages/PredictionPage'
import { ResultsPage } from './pages/ResultsPage'
import { MethodologyPage } from './pages/MethodologyPage'
import { FutureWorkPage } from './pages/FutureWorkPage'
import { HeartHealthPage } from './pages/HeartHealthPage'
import { PredictionResultPage } from './pages/PredictionResultPage'
import { HospitalFinderPage } from './pages/HospitalFinderPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PatientFeaturesPayload } from './services/api'
import { GlobalChat } from './components/chat'

export default function App() {
  // Shared state for patient risk prediction & interactive XAI exploration
  const [patientState, setPatientState] = useState<PatientFeaturesPayload>({
    age: 56,
    gender: 2,
    height: 175,
    weight: 84,
    ap_hi: 138,
    ap_lo: 88,
    cholesterol: 2,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1,
  })

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas text-navy-900 font-sans selection:bg-accent-100 selection:text-accent-950 flex flex-col justify-between relative">
        
        {/* Global Multi-Page Sticky Navigation */}
        <StickyNavbar />

        {/* Dedicated Route Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/heart-health" element={<HeartHealthPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/dataset" element={<DatasetPage />} />
            <Route path="/ctgan" element={<CtganLabPage />} />
            <Route path="/synthetic-data" element={<CtganLabPage />} />
            <Route path="/augmentation" element={<AugmentationPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/models" element={<PerformancePage />} />
            <Route path="/explainable-ai" element={<ExplainableAIPage />} />
            <Route path="/explainability" element={<ExplainableAIPage />} />
            <Route path="/prediction" element={<PredictionPage />} />
            <Route path="/prediction-result" element={<PredictionResultPage />} />
            <Route path="/find-care" element={<HospitalFinderPage />} />
            <Route path="/hospitals" element={<HospitalFinderPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/methodology" element={<ResearchPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/future-work" element={<FutureWorkPage />} />
            {/* Fallback for any unknown route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Multi-Column Editorial Footer */}
        <EditorialFooter />

        {/* Global AI-Powered CardioAI Chat Assistant */}
        <GlobalChat />
      </div>
    </BrowserRouter>
  )
}
