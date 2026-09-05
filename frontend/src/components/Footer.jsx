import React from 'react'
import { ShieldAlert } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#b45309' }}>
          <ShieldAlert size={16} />
          <strong>Research & Educational Disclaimer:</strong>
          <span>This system is an academic research demonstration for synthetic healthcare data augmentation and XAI. It is not certified for medical diagnosis or clinical treatment.</span>
        </div>
        <div>
          <span>Cardiovascular Disease Prediction & Explainable AI Benchmark • Built with FastAPI + React + Vite</span>
        </div>
      </div>
    </footer>
  )
}
