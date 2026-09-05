import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PredictionPage from './pages/PredictionPage'
import ExplainabilityPage from './pages/ExplainabilityPage'
import AdaptiveAugmentationPage from './pages/AdaptiveAugmentationPage'
import ModelComparisonPage from './pages/ModelComparisonPage'
import DatasetExplorerPage from './pages/DatasetExplorerPage'
import ResearchResultsPage from './pages/ResearchResultsPage'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [patientState, setPatientState] = useState(null)

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'predict' && (
          <PredictionPage
            patientState={patientState}
            setPatientState={setPatientState}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'explain' && (
          <ExplainabilityPage
            patientState={patientState}
          />
        )}
        {activeTab === 'adaptive' && <AdaptiveAugmentationPage />}
        {activeTab === 'models' && <ModelComparisonPage />}
        {activeTab === 'dataset' && <DatasetExplorerPage />}
        {activeTab === 'results' && <ResearchResultsPage setActiveTab={setActiveTab} />}
      </main>

      <Footer />
    </div>
  )
}
