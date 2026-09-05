import React from 'react'
import {
  HospitalWithDistance,
  healthcareService,
} from '../../services/healthcareService'
import {
  Phone,
  Navigation,
  ExternalLink,
  ShieldAlert,
  Heart,
  Activity,
  CheckCircle2,
  Info,
} from 'lucide-react'

interface HospitalCardProps {
  hospital: HospitalWithDistance
  isSelected: boolean
  userLat?: number
  userLon?: number
  onSelect: (id: string) => void
  onViewDetails: (hospital: HospitalWithDistance) => void
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  isSelected,
  userLat,
  userLon,
  onSelect,
  onViewDetails,
}) => {
  const directionsUrl = healthcareService.getDirectionsUrl(
    hospital.latitude,
    hospital.longitude,
    userLat,
    userLon
  )

  const hasPhone = Boolean(hospital.phone && hospital.phone.trim().length > 0)

  return (
    <div
      onClick={() => onSelect(hospital.id)}
      className={`relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left bg-white ${
        isSelected
          ? 'border-[#17352D] ring-2 ring-[#17352D]/15 shadow-elevated bg-[#FAFBF9]'
          : 'border-[#D9C7A5]/60 hover:border-[#17352D]/50 hover:shadow-subtle'
      }`}
    >
      {/* Top Header: Type & Distance */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8EEE8] text-[#17352D]">
          <Activity className="w-3 h-3 text-[#3D8068]" />
          <span>{hospital.type}</span>
        </span>

        {hospital.distance_km > 0 ? (
          <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#3D8068] bg-[#E8EEE8]/70 px-2.5 py-0.5 rounded-lg">
            <span>{hospital.distance_km} km</span>
            <span className="text-[10px] font-normal text-[#808C85]">away</span>
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[#808C85]">Nearby</span>
        )}
      </div>

      {/* Hospital Name */}
      <h3 className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-snug line-clamp-2">
        {hospital.name}
      </h3>

      {/* Address */}
      <p className="text-xs text-[#5C6661] mt-1.5 line-clamp-2 leading-relaxed">
        {hospital.address}, {hospital.city}, {hospital.state}
      </p>

      {/* Capabilities Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#D9C7A5]/30">
        {hospital.cardiology && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#17352D] bg-[#E8EEE8] px-2 py-0.5 rounded-md">
            <Heart className="w-3 h-3 text-[#C87868] fill-[#C87868]/20" />
            <span>Cardiology Available</span>
          </span>
        )}

        {hospital.emergency_24_7 ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
            <ShieldAlert className="w-3 h-3 text-red-600" />
            <span>24/7 Emergency</span>
          </span>
        ) : hospital.emergency_available ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3 text-amber-600" />
            <span>Emergency Available</span>
          </span>
        ) : null}

        {hospital.cardiac_surgery && (
          <span className="inline-flex items-center text-[10px] font-medium text-[#4A5550] bg-[#F7F4ED] px-2 py-0.5 rounded-md">
            Cardiac Surgery
          </span>
        )}
      </div>

      {/* Phone Number Display */}
      <div className="mt-3 text-xs">
        {hasPhone ? (
          <div className="flex items-center gap-1.5 text-[#17352D] font-mono font-medium">
            <Phone className="w-3.5 h-3.5 text-[#3D8068]" />
            <span>{hospital.phone}</span>
          </div>
        ) : (
          <div className="text-[#808C85] italic text-[11px]">
            Contact number unavailable
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div
        className="mt-4 pt-3 border-t border-[#D9C7A5]/40 grid grid-cols-3 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CALL BUTTON */}
        {hasPhone ? (
          <a
            href={`tel:${hospital.phone}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#17352D] hover:bg-[#102721] text-white text-xs font-semibold rounded-xl transition-all shadow-2xs text-center"
          >
            <Phone className="w-3.5 h-3.5 text-[#D9C7A5]" />
            <span>Call</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-400 text-xs font-medium rounded-xl cursor-not-allowed"
            title="No verified phone number on file"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>No Phone</span>
          </button>
        )}

        {/* DIRECTIONS BUTTON */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#FAF8F4] text-[#17352D] border border-[#D9C7A5]/70 text-xs font-semibold rounded-xl transition-all shadow-2xs text-center"
        >
          <Navigation className="w-3.5 h-3.5 text-[#3D8068]" />
          <span>Directions</span>
        </a>

        {/* VIEW DETAILS BUTTON */}
        <button
          type="button"
          onClick={() => onViewDetails(hospital)}
          className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-[#FAF8F4] hover:bg-[#E8EEE8] text-[#17352D] text-xs font-semibold rounded-xl transition-all border border-[#D9C7A5]/50 text-center"
        >
          <Info className="w-3.5 h-3.5 text-[#808C85]" />
          <span>Details</span>
        </button>
      </div>
    </div>
  )
}
