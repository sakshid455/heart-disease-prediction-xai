import React from 'react'
import { AlertOctagon, PhoneCall } from 'lucide-react'

export const EmergencyNotice: React.FC = () => {
  return (
    <div className="bg-red-50/90 border-2 border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-red-100 text-red-700 shrink-0 mt-0.5">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
            <span>Experiencing a Medical Emergency?</span>
            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-red-200 text-red-900">
              Immediate Care
            </span>
          </h4>
          <p className="text-xs text-red-800 mt-1 max-w-2xl leading-relaxed">
            Do not rely on this research portal or machine learning algorithms for emergency decisions. If you or someone around you is experiencing chest pain, shortness of breath, sudden numbness, or collapse, immediately call emergency medical services or proceed to the nearest emergency room.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
        <a
          href="tel:108"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-subtle"
          title="National Ambulance Service in India"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call 108 (Ambulance)</span>
        </a>
        <a
          href="tel:112"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-red-50 text-red-700 border border-red-300 text-xs font-bold rounded-xl transition-all"
          title="National Emergency Number"
        >
          <span>112</span>
        </a>
      </div>
    </div>
  )
}
