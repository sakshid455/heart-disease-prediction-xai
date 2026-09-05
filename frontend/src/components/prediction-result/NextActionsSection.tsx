import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, RotateCcw, HeartPulse, ArrowRight } from 'lucide-react'

export const NextActionsSection: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="border-b border-[#D9C7A5]/40 pb-3">
        <h3 className="text-xl font-serif font-bold text-[#17352D]">
          Recommended Next Steps
        </h3>
        <p className="text-xs text-[#5C6661]">
          Explore the machine learning methodology, test another clinical scenario, or review cardiovascular prevention resources.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Button 1: View AI Explanation */}
        <Link
          to="/explainability"
          className="group p-6 rounded-2xl bg-white border border-[#D9C7A5]/60 hover:border-[#17352D] hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#E8EEE8] flex items-center justify-center text-[#17352D] group-hover:bg-[#17352D] group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5 text-[#3D8068] group-hover:text-[#D9C7A5]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#17352D] font-serif">
                View AI Explanation
              </h4>
              <p className="text-xs text-[#5C6661] mt-1 leading-relaxed">
                Inspect population-level SHAP summary plots, waterfall decompositions, and interactive feature impact visualizations.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#3D8068] group-hover:text-[#17352D]">
            <span>Explore SHAP Dashboard</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Button 2: Run Another Assessment */}
        <Link
          to="/prediction"
          className="group p-6 rounded-2xl bg-[#17352D] text-white hover:bg-[#102721] hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#23493E] flex items-center justify-center text-[#D9C7A5]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-serif">
                Run Another Assessment
              </h4>
              <p className="text-xs text-[#E8EEE8]/80 mt-1 leading-relaxed">
                Adjust clinical measurements or test a different patient demographic to observe real-time model sensitivity.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#D9C7A5]">
            <span>Start Fresh Assessment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Button 3: Learn About Heart Health */}
        <Link
          to="/heart-health"
          className="group p-6 rounded-2xl bg-white border border-[#D9C7A5]/60 hover:border-[#17352D] hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#FAF8F4] flex items-center justify-center text-[#C87868] group-hover:bg-[#C87868] group-hover:text-white transition-colors border border-[#D9C7A5]/50">
              <HeartPulse className="w-5 h-5 text-[#C87868] group-hover:text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#17352D] font-serif">
                Learn About Heart Health
              </h4>
              <p className="text-xs text-[#5C6661] mt-1 leading-relaxed">
                Discover evidence-based prevention guidelines (MOVE, EAT, MONITOR) and cardiovascular warning signs.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#C87868] group-hover:text-[#17352D]">
            <span>Educational Guide</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

      </div>

      {/* Professional Medical Guidance Navigation Card (Non-diagnostic) */}
      <div className="p-6 rounded-2xl bg-[#F7F4ED] border-2 border-[#D9C7A5]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17352D] font-mono">
            <HeartPulse className="w-4 h-4 text-[#C87868]" />
            <span>Need professional medical guidance?</span>
          </div>
          <p className="text-xs text-[#5C6661] max-w-xl leading-relaxed">
            Your result is a research model prediction. If you would like professional medical guidance, you can find nearby cardiology services.
          </p>
        </div>

        <Link
          to="/find-care"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#17352D] hover:bg-[#102721] text-white text-xs font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 shrink-0"
        >
          <span>Find Cardiology Care</span>
          <ArrowRight className="w-4 h-4 text-[#D9C7A5]" />
        </Link>
      </div>
    </section>
  )
}
