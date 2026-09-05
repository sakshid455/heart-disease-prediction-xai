import React, { useState } from 'react'
import {
  Search,
  Navigation,
  MapPin,
  SlidersHorizontal,
  Compass,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react'
import { LocationCoords } from '../../services/healthcareService'

interface LocationSearchProps {
  searchQuery: string
  isLocating: boolean
  currentLocation: LocationCoords | null
  onSearchChange: (query: string) => void
  onSearchSubmit: (e: React.FormEvent) => void
  onRequestCurrentLocation: () => void
  onSelectCoords: (lat: number, lon: number, name?: string) => void
  onClearSearch: () => void
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  searchQuery,
  isLocating,
  currentLocation,
  onSearchChange,
  onSearchSubmit,
  onRequestCurrentLocation,
  onSelectCoords,
  onClearSearch,
}) => {
  const [showCoordModal, setShowCoordModal] = useState(false)
  const [customLat, setCustomLat] = useState('')
  const [customLon, setCustomLon] = useState('')
  const [coordError, setCoordError] = useState<string | null>(null)

  const handleCoordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCoordError(null)
    const lat = parseFloat(customLat)
    const lon = parseFloat(customLon)

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setCoordError('Please enter a valid latitude between -90 and 90.')
      return
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      setCoordError('Please enter a valid longitude between -180 and 180.')
      return
    }

    onSelectCoords(lat, lon, `Coords (${lat.toFixed(3)}, ${lon.toFixed(3)})`)
    setShowCoordModal(false)
  }

  const quickPresets = [
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Vellore', lat: 12.9165, lon: 79.1325 },
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Katpadi', lat: 12.9833, lon: 79.1333 },
    { name: 'Ranipet', lat: 12.9272, lon: 79.3331 },
  ]

  return (
    <div className="space-y-3">
      {/* Main Search Input Form */}
      <form onSubmit={onSearchSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#808C85]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search city, area or hospital (e.g. Vellore, CMC, Cardiology)..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-[#D9C7A5]/70 focus:border-[#17352D] focus:ring-2 focus:ring-[#17352D]/10 text-sm text-[#17352D] placeholder-[#808C85] outline-none shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#808C85] hover:text-[#17352D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          className="px-4 py-3 bg-[#17352D] hover:bg-[#102721] text-white text-xs font-semibold rounded-2xl transition-all shadow-subtle flex items-center gap-1.5 shrink-0"
        >
          <span>Search</span>
        </button>
      </form>

      {/* Location Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Option A: Browser Geolocation */}
        <button
          type="button"
          onClick={onRequestCurrentLocation}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-all font-semibold disabled:opacity-60"
          title="Detect your device location"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
          ) : (
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span>{isLocating ? 'Detecting Location...' : 'Use Current Location'}</span>
        </button>

        {/* Option C: Manual Lat/Lon Dialog Toggle */}
        <button
          type="button"
          onClick={() => setShowCoordModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F4] text-[#4A5550] border border-[#D9C7A5]/60 transition-all font-medium"
        >
          <Compass className="w-3.5 h-3.5 text-[#3D8068]" />
          <span>Enter Lat / Long</span>
        </button>
      </div>

      {/* Quick Location Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        <span className="text-[#808C85] font-semibold shrink-0">Quick presets:</span>
        {quickPresets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onSelectCoords(preset.lat, preset.lon, preset.name)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#E8EEE8] text-[#17352D] border border-[#D9C7A5]/50 transition-colors shrink-0 font-medium"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Manual Coordinates Modal */}
      {showCoordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#D9C7A5] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#17352D] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#3D8068]" />
                <span>Enter Coordinates</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCoordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5C6661]">
              Enter precise latitude and longitude to center hospital search and calculate distances.
            </p>

            <form onSubmit={handleCoordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#17352D] mb-1">
                  Latitude (-90 to 90)
                </label>
                <input
                  type="number"
                  step="any"
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  placeholder="e.g. 12.9165"
                  className="w-full px-3 py-2 rounded-xl border border-[#D9C7A5] text-sm focus:border-[#17352D] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17352D] mb-1">
                  Longitude (-180 to 180)
                </label>
                <input
                  type="number"
                  step="any"
                  value={customLon}
                  onChange={(e) => setCustomLon(e.target.value)}
                  placeholder="e.g. 79.1325"
                  className="w-full px-3 py-2 rounded-xl border border-[#D9C7A5] text-sm focus:border-[#17352D] outline-none"
                  required
                />
              </div>

              {coordError && (
                <div className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{coordError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCoordModal(false)}
                  className="px-3 py-1.5 text-xs text-[#5C6661] hover:text-[#17352D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#17352D] text-white text-xs font-semibold rounded-xl"
                >
                  Set Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
