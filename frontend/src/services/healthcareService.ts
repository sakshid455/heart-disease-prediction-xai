/**
 * Healthcare Facility & Cardiology Service API Client
 * Connects frontend hospital finder directly to /api/healthcare endpoints.
 */

export interface Hospital {
  id: string
  name: string
  type: string
  address: string
  city: string
  state: string
  country: string
  postal_code?: string
  latitude: number
  longitude: number
  phone?: string
  emergency_phone?: string
  website?: string
  cardiology: boolean
  cardiac_surgery: boolean
  emergency_available: boolean
  emergency_24_7: boolean
  cardiac_icu?: boolean
  cath_lab?: boolean
  source: string
  last_verified: string
}

export interface HospitalWithDistance extends Hospital {
  distance_km: number
}

export interface LocationCoords {
  latitude: number
  longitude: number
  city_name?: string
}

export interface NearbyHospitalsResponse {
  location: LocationCoords
  radius_km: number
  total: number
  results: HospitalWithDistance[]
}

export interface HealthcareFilterState {
  cardiologyOnly: boolean
  cardiacSurgeryOnly: boolean
  emergencyOnly: boolean
  emergency24_7Only: boolean
  hospitalType: string
  radiusKm: number
}

const BASE_URL = '/api/healthcare'

export const healthcareService = {
  /**
   * Search facilities by query string with optional distance computation from coordinates
   */
  async searchHospitals(
    q: string,
    coords?: { latitude: number; longitude: number },
    radiusKm?: number,
    filters?: Partial<HealthcareFilterState>
  ): Promise<HospitalWithDistance[]> {
    const params = new URLSearchParams()
    params.set('q', q)
    if (coords) {
      params.set('latitude', coords.latitude.toString())
      params.set('longitude', coords.longitude.toString())
    }
    if (radiusKm) {
      params.set('radius_km', radiusKm.toString())
    }
    if (filters?.cardiologyOnly) {
      params.set('cardiology_only', 'true')
    }
    if (filters?.emergencyOnly) {
      params.set('emergency_only', 'true')
    }

    const response = await fetch(`${BASE_URL}/search?${params.toString()}`)
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`)
    }
    return response.json()
  },

  /**
   * Retrieve nearby hospitals sorted by Haversine distance from coordinates
   */
  async getNearbyHospitals(
    lat: number,
    lon: number,
    radiusKm: number = 25,
    filters?: Partial<HealthcareFilterState>
  ): Promise<NearbyHospitalsResponse> {
    const params = new URLSearchParams()
    params.set('latitude', lat.toString())
    params.set('longitude', lon.toString())
    params.set('radius_km', radiusKm.toString())
    params.set('cardiology', filters?.cardiologyOnly ? 'true' : 'false')

    if (filters?.emergencyOnly) {
      params.set('emergency', 'true')
    }
    if (filters?.emergency24_7Only) {
      params.set('emergency_24_7', 'true')
    }
    if (filters?.cardiacSurgeryOnly) {
      params.set('cardiac_surgery', 'true')
    }
    if (filters?.hospitalType && filters.hospitalType !== 'All') {
      params.set('hospital_type', filters.hospitalType)
    }

    const response = await fetch(`${BASE_URL}/hospitals/nearby?${params.toString()}`)
    if (!response.ok) {
      throw new Error(`Failed to load nearby hospitals: ${response.statusText}`)
    }
    return response.json()
  },

  /**
   * Get single verified hospital details
   */
  async getHospitalById(id: string): Promise<Hospital> {
    const response = await fetch(`${BASE_URL}/hospitals/${encodeURIComponent(id)}`)
    if (!response.ok) {
      throw new Error(`Hospital details unavailable (${response.status})`)
    }
    return response.json()
  },

  /**
   * Geocode a city or landmark name to coordinates
   */
  async geocodeLocation(query: string): Promise<LocationCoords> {
    const params = new URLSearchParams({ query })
    const response = await fetch(`${BASE_URL}/geocode?${params.toString()}`)
    if (!response.ok) {
      throw new Error(`Location '${query}' could not be resolved. Please try entering coordinates directly.`)
    }
    return response.json()
  },

  /**
   * Generate map directions URL (Google Maps or OpenStreetMap)
   */
  getDirectionsUrl(
    destLat: number,
    destLon: number,
    userLat?: number,
    userLon?: number
  ): string {
    if (userLat !== undefined && userLon !== undefined) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${destLat},${destLon}&travelmode=driving`
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLon}`
  },
}
