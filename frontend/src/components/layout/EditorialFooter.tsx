import React from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, ShieldAlert, ArrowRight } from 'lucide-react'

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="bg-[#17352D] text-[#F7F4ED] pt-16 pb-12 border-t border-[#D9C7A5]/30">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#23493E]">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#23493E] text-[#F7F4ED] flex items-center justify-center border border-[#D9C7A5]/30 shadow-subtle">
                <HeartPulse className="w-5 h-5 text-[#C87868]" />
              </div>
              <div>
                <span className="text-lg font-serif font-bold tracking-tight text-white block">
                  HEART AI
                </span>
                <span className="text-[10px] font-sans font-semibold tracking-widest text-[#D9C7A5] uppercase block">
                  RESEARCH INITIATIVE
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-[#E8EEE8]/80 leading-relaxed max-w-sm">
              An experimental healthcare AI research platform exploring conditional generative adversarial networks (CTGAN), adaptive tabular data augmentation, supervised machine learning, and game-theoretic explainability (SHAP).
            </p>

            <div className="pt-2 text-xs font-mono text-[#D9C7A5]">
              Open Scientific Demonstration · Peer Review Benchmark
            </div>
          </div>

          {/* Column 3: Research Areas */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D9C7A5]">
              Research Modules
            </div>
            <ul className="space-y-2 text-xs text-[#E8EEE8]/80">
              <li>
                <Link to="/ctgan" className="hover:text-white transition-colors">
                  Synthetic Data (CTGAN)
                </Link>
              </li>
              <li>
                <Link to="/augmentation" className="hover:text-white transition-colors">
                  Adaptive Augmentation
                </Link>
              </li>
              <li>
                <Link to="/performance" className="hover:text-white transition-colors">
                  Model Performance
                </Link>
              </li>
              <li>
                <Link to="/explainable-ai" className="hover:text-white transition-colors">
                  Explainable AI (SHAP)
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Knowledge Hub & Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D9C7A5]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#E8EEE8]/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About CardioAI
                </Link>
              </li>
              <li>
                <Link to="/heart-health" className="hover:text-white transition-colors">
                  Heart Health Education
                </Link>
              </li>
              <li>
                <Link to="/prediction" className="hover:text-white transition-colors">
                  Clinical Assessment
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-white transition-colors">
                  Research & Methodology
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Scientific Integrity & Portal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#D9C7A5]">
              Portal & Ethics
            </div>
            <ul className="space-y-2 text-xs text-[#E8EEE8]/80">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Investigator Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Register for Research Access
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-white transition-colors">
                  Methodology Specifications
                </Link>
              </li>
              <li>
                <Link to="/future-work" className="hover:text-white transition-colors">
                  Limitations & Roadmap
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs font-mono text-[#E8EEE8]/70">
          
          <div className="flex items-start sm:items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C87868] shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-semibold text-white">
              Research / Educational Use Only
            </span>
            <span className="hidden sm:inline">—</span>
            <span className="text-[#E8EEE8]/70 font-sans text-xs">
              This platform is an academic experimental demonstrator and is not a certified medical diagnostic system.
            </span>
          </div>

          <div className="text-[#D9C7A5] text-[11px] shrink-0">
            FastAPI + React · Frozen Benchmark Submission
          </div>
        </div>

      </div>
    </footer>
  )
}
