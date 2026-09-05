import React from 'react'
import {
  HospitalWithDistance,
  healthcareService,
} from '../../services/healthcareService'
import {
  X,
  Phone,
  Navigation,
  ExternalLink,
  ShieldAlert,
  Heart,
  Activity,
  CheckCircle2,
  Calendar,
  Database,
  MapPin,
  Building,
} from 'lucide-react'

interface HospitalDetailsModalProps {
  hospital: HospitalWithDistance | null
  userLat?: number
  userLon?: number
  onClose: () => void
}

export const HospitalDetailsModal: React.FC<HospitalDetailsModalProps> = ({
  hospital,
  userLat,
  userLon,
  onClose,
}) => {
  if (!hospital) return null

  const directionsUrl = healthcareService.getDirectionsUrl(
    hospital.latitude,
    hospital.longitude,
    userLat,
    userLon
  )

  const hasPhone = Boolean(hospital.phone && hospital.phone.trim().length > 0)
  const hasEmergencyPhone = Boolean(
    hospital.emergency_phone && hospital.emergency_phone.trim().length > 0
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-[#FAF8F4] rounded-3xl border border-[#D9C7A5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#17352D] text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#23493E] text-[#D9C7A5] border border-[#D9C7A5]/30">
                {hospital.type}
              </span>
              {hospital.distance_km > 0 && (
                <span className="text-xs font-mono text-[#D9C7A5]">
                  {hospital.distance_km} km from search location
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-tight">
              {hospital.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Location & Address Section */}
          <div className="bg-white p-5 rounded-2xl border border-[#D9C7A5]/60 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#808C85] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3D8068]" />
              <span>Full Address & Geographic Coordinates</span>
            </h4>
            <p className="text-sm font-medium text-[#17352D] leading-relaxed">
              {hospital.address}, {hospital.city}, {hospital.state}{' '}
              {hospital.postal_code ? `- ${hospital.postal_code}` : ''},{' '}
              {hospital.country}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-[#5C6661] bg-[#F7F4ED] p-2.5 rounded-xl border border-[#D9C7A5]/40">
              <div>
                <span className="text-[#808C85]">Lat:</span> {hospital.latitude.toFixed(4)}° N
              </div>
              <div>
                <span className="text-[#808C85]">Lon:</span> {hospital.longitude.toFixed(4)}° E
              </div>
            </div>
          </div>

          {/* Cardiology & Clinical Services Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-[#D9C7A5]/60 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#808C85] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#C87868]" />
              <span>Cardiology & Clinical Capabilities</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-between">
                <span className="text-xs font-medium text-[#17352D]">
                  Cardiology Department
                </span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                  {hospital.cardiology ? 'Verified Available' : 'Unavailable'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-between">
                <span className="text-xs font-medium text-[#17352D]">
                  Cardiac Surgery
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    hospital.cardiac_surgery
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {hospital.cardiac_surgery ? 'Available' : 'Unconfirmed'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-between">
                <span className="text-xs font-medium text-[#17352D]">
                  Emergency Department
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    hospital.emergency_available
                      ? 'text-orange-700 bg-orange-50'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {hospital.emergency_available ? 'Available' : 'Not listed'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 flex items-center justify-between">
                <span className="text-xs font-medium text-[#17352D]">
                  24/7 Casualty Status
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    hospital.emergency_24_7
                      ? 'text-red-700 bg-red-50 border border-red-200'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  {hospital.emergency_24_7 ? '24/7 Verified' : 'Standard hours'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Numbers & Website */}
          <div className="bg-white p-5 rounded-2xl border border-[#D9C7A5]/60 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#808C85] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#3D8068]" />
              <span>Contact & Online Services</span>
            </h4>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-[#D9C7A5]/30">
                <span className="text-xs text-[#5C6661]">Primary Telephone:</span>
                <span className="font-mono font-bold text-[#17352D]">
                  {hasPhone ? hospital.phone : 'Contact number unavailable'}
                </span>
              </div>

              {hasEmergencyPhone && (
                <div className="flex items-center justify-between py-1 border-b border-[#D9C7A5]/30">
                  <span className="text-xs text-red-700 font-semibold">
                    Emergency Hotline:
                  </span>
                  <span className="font-mono font-bold text-red-700">
                    {hospital.emergency_phone}
                  </span>
                </div>
              )}

              {hospital.website && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-[#5C6661]">Official Portal:</span>
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D8068] hover:underline"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Verification & Metadata Source */}
          <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#D9C7A5]/70 text-xs text-[#5C6661] space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-[#17352D]">
              <Database className="w-3.5 h-3.5 text-[#3D8068]" />
              <span>Data Source:</span>
              <span className="font-normal">{hospital.source}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#808C85]">
              <Calendar className="w-3 h-3" />
              <span>Last verified: {hospital.last_verified}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-5 bg-white border-t border-[#D9C7A5]/60 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5C6661] hover:text-[#17352D] transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {hasPhone && (
              <a
                href={`tel:${hospital.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17352D] hover:bg-[#102721] text-white text-xs font-semibold rounded-xl transition-all shadow-subtle"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9C7A5]" />
                <span>Call Hospital</span>
              </a>
            )}

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3D8068] hover:bg-[#2F6753] text-white text-xs font-semibold rounded-xl transition-all shadow-subtle"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            {hospital.website && (
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#F7F4ED] hover:bg-[#E8EEE8] text-[#17352D] border border-[#D9C7A5]/70 text-xs font-semibold rounded-xl transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
