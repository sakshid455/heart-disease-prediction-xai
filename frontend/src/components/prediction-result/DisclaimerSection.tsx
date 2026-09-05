import React from 'react'
import { ShieldAlert, AlertCircle, PhoneCall, Stethoscope } from 'lucide-react'

export const DisclaimerSection: React.FC = () => {
  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F4] border-2 border-[#D9C7A5]/70 shadow-xs space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#C87868]/15 border border-[#C87868]/30 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5 text-[#C87868]" />
        </div>
        <div className="space-y-2">
          <h4 className="text-base font-serif font-bold text-[#17352D]">
            Important Medical & Research Disclaimer
          </h4>
          <p className="text-sm font-semibold text-[#2A483E] leading-relaxed">
            This tool is for educational and research purposes and should not be used as a substitute for professional medical diagnosis or treatment.
          </p>
          <p className="text-xs text-[#5C6661] leading-relaxed">
            The numerical risk estimates and feature importance values displayed above reflect statistical associations learned from experimental tabular datasets. They do not constitute clinical findings, medical advice, or therapeutic recommendations. Always seek the direct evaluation of a qualified physician, cardiologist, or healthcare provider for any cardiac symptoms or health questions.
          </p>
        </div>
      </div>

      {/* Emergency Callout */}
      <div className="pt-3 border-t border-[#D9C7A5]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C6661]">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>Experiencing severe chest pressure, radiating arm pain, or sudden shortness of breath?</span>
        </div>
        <div className="font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-lg shrink-0">
          Contact Emergency Medical Services (911 / 112) immediately
        </div>
      </div>
    </section>
  )
}
