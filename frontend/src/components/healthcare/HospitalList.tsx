import React, { useEffect, useRef } from 'react'
import { HospitalWithDistance } from '../../services/healthcareService'
import { HospitalCard } from './HospitalCard'
import { SearchX, AlertCircle, Loader2 } from 'lucide-react'

interface HospitalListProps {
  hospitals: HospitalWithDistance[]
  selectedHospitalId: string | null
  isLoading: boolean
  error: string | null
  userLat?: number
  userLon?: number
  radiusKm: number
  onSelectHospital: (id: string) => void
  onViewDetails: (hospital: HospitalWithDistance) => void
  onIncreaseRadius: () => void
}

export const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  selectedHospitalId,
  isLoading,
  error,
  userLat,
  userLon,
  radiusKm,
  onSelectHospital,
  onViewDetails,
  onIncreaseRadius,
}) => {
  const cardRefs = useRef<{ [id: string]: HTMLDivElement | null }>({})

  // Auto-scroll selected hospital card into view when selected via map marker
  useEffect(() => {
    if (selectedHospitalId && cardRefs.current[selectedHospitalId]) {
      cardRefs.current[selectedHospitalId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [selectedHospitalId])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-3 bg-white rounded-2xl border border-[#D9C7A5]/60">
        <Loader2 className="w-8 h-8 text-[#17352D] animate-spin" />
        <div className="text-sm font-serif font-bold text-[#17352D]">
          Locating Verified Cardiology Facilities...
        </div>
        <p className="text-xs text-[#808C85] max-w-xs">
          Computing distances and checking verified emergency capabilities
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2 text-left">
        <div className="flex items-center gap-2 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Notice</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">{error}</p>
      </div>
    )
  }

  if (hospitals.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-[#D9C7A5]/60 space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#FAF8F4] flex items-center justify-center mx-auto text-[#808C85] border border-[#D9C7A5]/40">
          <SearchX className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-serif font-bold text-[#17352D]">
            No cardiology facilities found
          </h4>
          <p className="text-xs text-[#5C6661] mt-1 max-w-sm mx-auto leading-relaxed">
            No cardiology facilities were found within {radiusKm} km matching your filters. Try increasing the search radius or adjusting filter criteria.
          </p>
        </div>
        <button
          type="button"
          onClick={onIncreaseRadius}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#17352D] hover:bg-[#102721] text-white text-xs font-semibold rounded-xl transition-all shadow-subtle"
        >
          <span>Expand Radius to {radiusKm * 2} km</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3.5">
      {hospitals.map((hospital) => (
        <div
          key={hospital.id}
          ref={(el) => (cardRefs.current[hospital.id] = el)}
        >
          <HospitalCard
            hospital={hospital}
            isSelected={hospital.id === selectedHospitalId}
            userLat={userLat}
            userLon={userLon}
            onSelect={onSelectHospital}
            onViewDetails={onViewDetails}
          />
        </div>
      ))}
    </div>
  )
}
