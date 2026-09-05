import React from 'react'
import { HealthcareFilterState } from '../../services/healthcareService'
import { SlidersHorizontal, Filter, ShieldCheck, Heart, Clock } from 'lucide-react'

interface HospitalFiltersProps {
  filters: HealthcareFilterState
  onChange: (newFilters: HealthcareFilterState) => void
  totalCount: number
}

export const HospitalFilters: React.FC<HospitalFiltersProps> = ({
  filters,
  onChange,
  totalCount,
}) => {
  const distanceOptions = [5, 10, 25, 50, 100]
  const hospitalTypes = ['All', 'Specialty Hospital', 'Hospital']

  const handleToggle = (key: keyof HealthcareFilterState) => {
    onChange({
      ...filters,
      [key]: !filters[key],
    })
  }

  const handleRadiusChange = (radius: number) => {
    onChange({
      ...filters,
      radiusKm: radius,
    })
  }

  const handleTypeChange = (type: string) => {
    onChange({
      ...filters,
      hospitalType: type,
    })
  }

  return (
    <div className="bg-white p-4 rounded-2xl border border-[#D9C7A5]/60 shadow-2xs space-y-3.5">
      {/* Filters Title & Count */}
      <div className="flex items-center justify-between text-xs border-b border-[#D9C7A5]/30 pb-2">
        <span className="font-serif font-bold text-[#17352D] flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#3D8068]" />
          <span>Filters & Distance Radius</span>
        </span>
        <span className="text-[11px] font-mono text-[#808C85]">
          {totalCount} {totalCount === 1 ? 'facility' : 'facilities'} found
        </span>
      </div>

      {/* Distance Radius Selector */}
      <div>
        <label className="block text-[11px] font-bold text-[#17352D] uppercase tracking-wider mb-1.5">
          Search Radius:
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {distanceOptions.map((radius) => (
            <button
              key={radius}
              type="button"
              onClick={() => handleRadiusChange(radius)}
              className={`py-1.5 text-xs font-semibold rounded-xl transition-all text-center ${
                filters.radiusKm === radius
                  ? 'bg-[#17352D] text-white shadow-2xs'
                  : 'bg-[#FAF8F4] text-[#4A5550] border border-[#D9C7A5]/50 hover:bg-[#E8EEE8]'
              }`}
            >
              {radius} km
            </button>
          ))}
        </div>
      </div>

      {/* Specialty & Service Chips */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold text-[#17352D] uppercase tracking-wider">
          Specialty & Services:
        </label>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {/* Cardiology Toggle */}
          <button
            type="button"
            onClick={() => handleToggle('cardiologyOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              filters.cardiologyOnly
                ? 'bg-[#E8EEE8] text-[#17352D] border-[#3D8068] font-semibold'
                : 'bg-white text-[#5C6661] border-[#D9C7A5]/60 hover:bg-[#FAF8F4]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#C87868]" />
            <span>Cardiology Care</span>
          </button>

          {/* Cardiac Surgery Toggle */}
          <button
            type="button"
            onClick={() => handleToggle('cardiacSurgeryOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              filters.cardiacSurgeryOnly
                ? 'bg-[#E8EEE8] text-[#17352D] border-[#3D8068] font-semibold'
                : 'bg-white text-[#5C6661] border-[#D9C7A5]/60 hover:bg-[#FAF8F4]'
            }`}
          >
            <span>Cardiac Surgery</span>
          </button>

          {/* Emergency 24/7 Toggle */}
          <button
            type="button"
            onClick={() => handleToggle('emergency24_7Only')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              filters.emergency24_7Only
                ? 'bg-red-50 text-red-800 border-red-300 font-semibold'
                : 'bg-white text-[#5C6661] border-[#D9C7A5]/60 hover:bg-[#FAF8F4]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-red-600" />
            <span>24/7 Emergency Only</span>
          </button>

          {/* Emergency Care General Toggle */}
          <button
            type="button"
            onClick={() => handleToggle('emergencyOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              filters.emergencyOnly
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                : 'bg-white text-[#5C6661] border-[#D9C7A5]/60 hover:bg-[#FAF8F4]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Emergency Department</span>
          </button>
        </div>
      </div>

      {/* Hospital Type Filter */}
      <div>
        <label className="block text-[11px] font-bold text-[#17352D] uppercase tracking-wider mb-1.5">
          Facility Type:
        </label>
        <div className="flex flex-wrap gap-1.5 text-xs">
          {hospitalTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1 rounded-xl border transition-all ${
                filters.hospitalType === type
                  ? 'bg-[#17352D] text-white font-semibold'
                  : 'bg-white text-[#4A5550] border-[#D9C7A5]/60 hover:bg-[#FAF8F4]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
