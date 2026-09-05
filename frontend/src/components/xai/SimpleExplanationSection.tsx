import React from 'react'
import { HelpCircle, Lightbulb, Users, ShieldAlert, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const SimpleExplanationSection: React.FC = () => {
  return (
    <section className="space-y-6">
      {/* HIGHLIGHTED CARD: "What does this mean?" */}
      <div className="bg-gradient-to-br from-[#17352D] to-[#23493E] text-white rounded-3xl p-6 sm:p-10 shadow-elevated relative overflow-hidden space-y-6">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#C87868]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D9C7A5]">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D9C7A5] block">
              Plain-Language Translation
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              What does this mean?
            </h3>
          </div>
        </div>

        {/* The Game Theory / Sports Team Analogy */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-[#D9C7A5] font-serif flex items-center gap-2">
              <Users className="w-4 h-4 text-[#D9C7A5]" />
              The Cooperative Team Analogy
            </h4>
            <p className="text-xs text-[#E8EEE8]/85 leading-relaxed font-sans">
              Think of the machine learning model as a sports team predicting a final score. Instead of simply saying "the score was 80 points," SHAP calculates exactly how many points each individual player contributed to the final outcome.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-[#D9C7A5] font-serif flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#D9C7A5]" />
              Positive vs. Negative Impact
            </h4>
            <p className="text-xs text-[#E8EEE8]/85 leading-relaxed font-sans">
              When a feature has a <strong className="text-[#C87868]">positive SHAP value</strong>, it pushed the predicted risk higher (like high blood pressure). When it has a <strong className="text-[#3D8068]">negative SHAP value</strong>, it protected the patient and pulled risk lower (like a high max heart rate).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-[#D9C7A5] font-serif flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#D9C7A5]" />
              Why It Protects Clinicians
            </h4>
            <p className="text-xs text-[#E8EEE8]/85 leading-relaxed font-sans">
              If an AI model ever predicts high risk for the wrong medical reason (for example, due to height rather than blood pressure), SHAP immediately exposes the error. It keeps artificial intelligence accountable to medical science.
            </p>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <p className="text-xs text-[#E8EEE8]/80 font-sans">
            Ready to test how clinical features affect real-time predictions?
          </p>
          <Link
            to="/prediction"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C87868] hover:bg-[#B36353] text-white text-xs font-bold transition-all shadow-md shrink-0"
          >
            <span>Run Personalized Risk Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  )
}
