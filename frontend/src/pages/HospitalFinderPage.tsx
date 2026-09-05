import React, { useState, useEffect, useCallback } from 'react'
import {
  HospitalMap,
  HospitalList,
  LocationSearch,
  HospitalFilters,
  HospitalDetailsModal,
  EmergencyNotice,
} from '../components/healthcare'
import {
  HospitalWithDistance,
  LocationCoords,
  HealthcareFilterState,
  healthcareService,
} from '../services/healthcareService'
import { MapPin, Sparkles, Building2, Stethoscope, RefreshCw } from 'lucide-react'

// Reference coordinates
const CHENNAI_DEFAULT_COORDS: LocationCoords = {
  latitude: 13.0827,
  longitude: 80.2707,
  city_name: 'Chennai, Tamil Nadu',
}

const VELLORE_COORDS: LocationCoords = {
  latitude: 12.9165,
  longitude: 79.1325,
  city_name: 'Vellore, Tamil Nadu',
}

export const HospitalFinderPage: React.FC = () => {
  // Location States - Default to Chennai or saved user location
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null)
  const [searchCoords, setSearchCoords] = useState<LocationCoords>(CHENNAI_DEFAULT_COORDS)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLocating, setIsLocating] = useState<boolean>(false)

  // Data & Results States
  const [hospitals, setHospitals] = useState<HospitalWithDistance[]>([])
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null)
  const [detailedHospital, setDetailedHospital] = useState<HospitalWithDistance | null>(null)

  // Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Filters State
  const [filters, setFilters] = useState<HealthcareFilterState>({
    cardiologyOnly: true,
    cardiacSurgeryOnly: false,
    emergencyOnly: false,
    emergency24_7Only: false,
    hospitalType: 'All',
    radiusKm: 25,
  })

  // Map Center coordinate
  const mapCenter: [number, number] = [searchCoords.latitude, searchCoords.longitude]

  // Primary Fetch Function
  const loadNearbyHospitals = useCallback(
    async (coords: LocationCoords, filterState: HealthcareFilterState) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await healthcareService.getNearbyHospitals(
          coords.latitude,
          coords.longitude,
          filterState.radiusKm,
          filterState
        )
        setHospitals(response.results)

        // If currently selected hospital is not in results, clear selection
        if (selectedHospitalId && !response.results.some((h) => h.id === selectedHospitalId)) {
          setSelectedHospitalId(null)
        }
      } catch (err: any) {
        console.error('Failed to load hospitals:', err)
        setError(
          err.message ||
            'Could not retrieve nearby healthcare facilities. Please verify connectivity.'
        )
        setHospitals([])
      } finally {
        setIsLoading(false)
      }
    },
    [selectedHospitalId]
  )

  // Automatic Geolocation on Mount + Initial Load
  useEffect(() => {
    // 1. Check if user already set a location previously
    const saved = sessionStorage.getItem('cardioai_user_location')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed?.latitude && parsed?.longitude) {
          setUserLocation(parsed)
          setSearchCoords(parsed)
          return
        }
      } catch {}
    }

    // 2. Request browser geolocation automatically
    if (navigator.geolocation) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false)
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          
          // Check proximity to Chennai (within ~50 km)
          const isNearChennai = Math.abs(lat - 13.08) < 0.45 && Math.abs(lon - 80.27) < 0.45
          const isNearVellore = Math.abs(lat - 12.91) < 0.4 && Math.abs(lon - 79.13) < 0.4
          
          let cityTag = 'Your Current Location'
          if (isNearChennai) cityTag = 'Your Location (Chennai)'
          else if (isNearVellore) cityTag = 'Your Location (Vellore)'

          const userPos: LocationCoords = {
            latitude: lat,
            longitude: lon,
            city_name: cityTag,
          }
          setUserLocation(userPos)
          setSearchCoords(userPos)
          sessionStorage.setItem('cardioai_user_location', JSON.stringify(userPos))
        },
        () => {
          // If permission denied or unavailable, stay with Chennai default
          setIsLocating(false)
          setSearchCoords(CHENNAI_DEFAULT_COORDS)
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 300000 }
      )
    } else {
      setSearchCoords(CHENNAI_DEFAULT_COORDS)
    }
  }, [])

  // Load hospitals whenever coordinates or filters change
  useEffect(() => {
    loadNearbyHospitals(searchCoords, filters)
  }, [searchCoords.latitude, searchCoords.longitude, filters.radiusKm, filters.cardiologyOnly, filters.cardiacSurgeryOnly, filters.emergencyOnly, filters.emergency24_7Only, filters.hospitalType])

  // Handle Manual "Use Current Location" button click
  const handleRequestCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your current browser.')
      return
    }

    setIsLocating(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false)
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const isNearChennai = Math.abs(lat - 13.08) < 0.45 && Math.abs(lon - 80.27) < 0.45
        const isNearVellore = Math.abs(lat - 12.91) < 0.4 && Math.abs(lon - 79.13) < 0.4

        const coords: LocationCoords = {
          latitude: lat,
          longitude: lon,
          city_name: isNearChennai
            ? 'Your Location (Chennai)'
            : isNearVellore
            ? 'Your Location (Vellore)'
            : 'Your Detected Location',
        }
        setUserLocation(coords)
        setSearchCoords(coords)
        setSearchQuery('')
        sessionStorage.setItem('cardioai_user_location', JSON.stringify(coords))
      },
      (err) => {
        setIsLocating(false)
        let msg = 'Could not acquire device location. You can select Chennai or enter an area manually.'
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Tap "Chennai" or search your area manually.'
        }
        setError(msg)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    )
  }

  // Handle Text Search (City, Area, or Hospital Name)
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) {
      loadNearbyHospitals(searchCoords, filters)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // First attempt to resolve query as city/location coordinates
      try {
        const resolved = await healthcareService.geocodeLocation(q)
        if (resolved) {
          setSearchCoords(resolved)
          return // This triggers the useEffect to load hospitals around new coords
        }
      } catch {
        // Not a pure city coordinate, continue to text search across hospitals
      }

      // Perform text search across hospital database
      const results = await healthcareService.searchHospitals(
        q,
        searchCoords,
        filters.radiusKm,
        filters
      )

      setHospitals(results)
      if (results.length === 0) {
        setError(`No facilities found matching "${q}". Try searching for "Vellore", "CMC", or expanding your radius.`)
      }
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try another query.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectCoords = (lat: number, lon: number, name?: string) => {
    const coords: LocationCoords = {
      latitude: lat,
      longitude: lon,
      city_name: name || `Coords (${lat.toFixed(3)}, ${lon.toFixed(3)})`,
    }
    setSearchCoords(coords)
    setSearchQuery('')
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    loadNearbyHospitals(searchCoords, filters)
  }

  const handleIncreaseRadius = () => {
    setFilters((prev) => ({
      ...prev,
      radiusKm: Math.min(prev.radiusKm * 2, 100),
    }))
  }

  return (
    <div className="min-h-screen bg-[#F7F4ED] pb-16">
      {/* Top Banner & Header */}
      <section className="bg-gradient-to-b from-[#E8EEE8]/70 via-[#F7F4ED] to-[#F7F4ED] pt-8 pb-6 border-b border-[#D9C7A5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D9C7A5]/60 shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5 text-[#3D8068]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#17352D] font-mono">
              Healthcare Navigation Directory
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#17352D] tracking-tight">
                Find Cardiology Care
              </h1>
              <p className="text-sm text-[#4A5550] mt-1 max-w-2xl">
                Locate verified cardiac centers, heart specialists, and 24/7 emergency facilities near you with real-time distance calculations and verified telephone numbers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5C6661] bg-white px-3.5 py-2 rounded-xl border border-[#D9C7A5]/60 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#C87868]" />
                <span>Center: <strong>{searchCoords.city_name || 'Chennai, Tamil Nadu'}</strong></span>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#D9C7A5]/60 shadow-2xs text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectCoords(CHENNAI_DEFAULT_COORDS.latitude, CHENNAI_DEFAULT_COORDS.longitude, 'Chennai, Tamil Nadu')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    searchCoords.city_name?.includes('Chennai')
                      ? 'bg-[#17352D] text-white shadow-2xs'
                      : 'text-[#5C6661] hover:bg-[#FAF8F4]'
                  }`}
                >
                  Chennai
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectCoords(VELLORE_COORDS.latitude, VELLORE_COORDS.longitude, 'Vellore, Tamil Nadu')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    searchCoords.city_name?.includes('Vellore')
                      ? 'bg-[#17352D] text-white shadow-2xs'
                      : 'text-[#5C6661] hover:bg-[#FAF8F4]'
                  }`}
                >
                  Vellore
                </button>
              </div>
            </div>
          </div>

          {/* Prominent Emergency Notice Banner */}
          <div className="pt-2">
            <EmergencyNotice />
          </div>
        </div>
      </section>

      {/* Main Dual-Panel Layout: Results List (Left) + Interactive Map (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Search, Filters & Hospital Cards (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Location & Search Controls */}
            <LocationSearch
              searchQuery={searchQuery}
              isLocating={isLocating}
              currentLocation={userLocation}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              onRequestCurrentLocation={handleRequestCurrentLocation}
              onSelectCoords={handleSelectCoords}
              onClearSearch={handleClearSearch}
            />

            {/* Filter Drawer / Chips */}
            <HospitalFilters
              filters={filters}
              onChange={setFilters}
              totalCount={hospitals.length}
            />

            {/* Hospital Results List */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#17352D] font-serif">
                  Cardiology Facilities ({hospitals.length})
                </span>
                <span className="text-[11px] text-[#808C85] font-mono">
                  Sorted by nearest
                </span>
              </div>

              <HospitalList
                hospitals={hospitals}
                selectedHospitalId={selectedHospitalId}
                isLoading={isLoading}
                error={error}
                userLat={searchCoords.latitude}
                userLon={searchCoords.longitude}
                radiusKm={filters.radiusKm}
                onSelectHospital={(id) => setSelectedHospitalId(id)}
                onViewDetails={(h) => setDetailedHospital(h)}
                onIncreaseRadius={handleIncreaseRadius}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Leaflet Map (7 Cols on Desktop) */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white p-3 rounded-3xl border border-[#D9C7A5]/60 shadow-elevated">
              <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#D9C7A5]/30 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#17352D]"></span>
                  <span className="font-semibold text-[#17352D]">Interactive Facility Map</span>
                </div>
                <span className="text-[11px] text-[#808C85]">
                  Click marker to view hospital details
                </span>
              </div>

              <div className="h-[520px] lg:h-[680px]">
                <HospitalMap
                  hospitals={hospitals}
                  selectedHospitalId={selectedHospitalId}
                  userLocation={userLocation || searchCoords}
                  mapCenter={mapCenter}
                  onSelectHospital={(id) => setSelectedHospitalId(id)}
                  onDirections={(h) => {
                    const url = healthcareService.getDirectionsUrl(
                      h.latitude,
                      h.longitude,
                      searchCoords.latitude,
                      searchCoords.longitude
                    )
                    window.open(url, '_blank')
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hospital Full Details Modal */}
      {detailedHospital && (
        <HospitalDetailsModal
          hospital={detailedHospital}
          userLat={searchCoords.latitude}
          userLon={searchCoords.longitude}
          onClose={() => setDetailedHospital(null)}
        />
      )}
    </div>
  )
}
