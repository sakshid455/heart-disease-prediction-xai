import React, { useEffect, useState } from 'react'
import { Activity, ShieldCheck, AlertCircle } from 'lucide-react'
import { fetchHealth } from '../api'

export default function Navbar({ activeTab, setActiveTab }) {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHealth()
      .then(data => {
        setHealth(data)
        setLoading(false)
      })
      .catch(() => {
        setHealth({ status: 'offline' })
        setLoading(false)
      })
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'predict', label: 'Prediction' },
    { id: 'explain', label: 'Explainable AI' },
    { id: 'adaptive', label: 'Adaptive Augmentation' },
    { id: 'models', label: 'Model Comparison' },
    { id: 'dataset', label: 'Dataset Explorer' },
    { id: 'results', label: 'Research Results' },
  ]

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <Activity size={18} />
          </div>
          <div>
            <span className="brand-title">CardioPredict-XAI</span>
            <span className="brand-subtitle">Adaptive CTGAN & Explainability Benchmark</span>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="backend-status" title={health?.status === 'healthy' ? `FastAPI connected (Model: ${health.optimal_model_name})` : 'Backend offline'}>
          <div className={`status-dot ${health?.status === 'healthy' ? '' : 'offline'}`} />
          <span>{health?.status === 'healthy' ? 'API Active' : 'API Offline'}</span>
        </div>
      </div>
    </header>
  )
}
