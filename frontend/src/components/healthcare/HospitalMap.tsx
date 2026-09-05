import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { HospitalWithDistance, LocationCoords } from '../../services/healthcareService'
import { Maximize2, Navigation } from 'lucide-react'

// Fix standard default icon path issues in Vite / bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom Leaflet DivIcons for stateful styling
const createHospitalIcon = (isSelected: boolean, hasEmergency: boolean) => {
  const bgColor = isSelected ? '#C87868' : '#17352D'
  const ringColor = isSelected ? 'rgba(200, 120, 104, 0.45)' : 'rgba(23, 53, 45, 0.2)'
  const scale = isSelected ? 'scale-110 shadow-elevated z-50' : 'hover:scale-105 shadow-md'

  return L.divIcon({
    className: 'custom-hospital-marker',
    html: `
      <div style="transform: translate(-50%, -50%);" class="relative group cursor-pointer transition-transform duration-200 ${scale}">
        <div style="background-color: ${ringColor};" class="absolute -inset-2 rounded-full ${isSelected ? 'animate-ping' : ''}"></div>
        <div style="background-color: ${bgColor};" class="w-9 h-9 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
        ${
          hasEmergency
            ? `<div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" title="24/7 Emergency"></div>`
            : ''
        }
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

const createUserLocationIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="transform: translate(-50%, -50%);" class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping"></div>
        <div class="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

interface HospitalMapProps {
  hospitals: HospitalWithDistance[]
  selectedHospitalId: string | null
  userLocation: LocationCoords | null
  mapCenter: [number, number]
  onSelectHospital: (id: string) => void
  onDirections: (hospital: HospitalWithDistance) => void
}

export const HospitalMap: React.FC<HospitalMapProps> = ({
  hospitals,
  selectedHospitalId,
  userLocation,
  mapCenter,
  onSelectHospital,
  onDirections,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [id: string]: L.Marker }>({})
  const userMarkerRef = useRef<L.Marker | null>(null)

  // 1. Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return // Already initialized

    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: 13,
      zoomControl: false,
    })

    // OpenStreetMap Carto Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Leaflet Zoom Control placed top-right
    L.control.zoom({ position: 'topright' }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // 2. Update Map Center when prop changes and not currently selected
  useEffect(() => {
    if (mapInstanceRef.current && mapCenter) {
      // Smooth flyTo if distance is reasonable
      mapInstanceRef.current.panTo(mapCenter, { animate: true, duration: 0.8 })
    }
  }, [mapCenter[0], mapCenter[1]])

  // 3. Render / Update User Location Marker
  useEffect(() => {
    if (!mapInstanceRef.current) return

    if (userLocation) {
      const userLatLng = L.latLng(userLocation.latitude, userLocation.longitude)
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker(userLatLng, {
          icon: createUserLocationIcon(),
          zIndexOffset: 1000,
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; padding: 4px;">
              <strong style="color: #1d4ed8;">Your Location</strong>
              <div style="color: #64748b; font-size: 11px;">${
                userLocation.city_name || 'Active search coordinates'
              }</div>
            </div>
          `)
      } else {
        userMarkerRef.current.setLatLng(userLatLng)
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove()
      userMarkerRef.current = null
    }
  }, [userLocation?.latitude, userLocation?.longitude])

  // 4. Render / Update Hospital Markers
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clean up markers not in new hospitals array
    const newHospitalIds = new Set(hospitals.map((h) => h.id))
    Object.keys(markersRef.current).forEach((id) => {
      if (!newHospitalIds.has(id)) {
        markersRef.current[id].remove()
        delete markersRef.current[id]
      }
    })

    // Create or update markers
    hospitals.forEach((hospital) => {
      const isSelected = hospital.id === selectedHospitalId
      const latLng = L.latLng(hospital.latitude, hospital.longitude)

      if (!markersRef.current[hospital.id]) {
        const marker = L.marker(latLng, {
          icon: createHospitalIcon(isSelected, hospital.emergency_available),
          riseOnHover: true,
        }).addTo(map)

        // Bind popup with informative card
        const popupContent = document.createElement('div')
        popupContent.style.fontFamily = 'serif'
        popupContent.innerHTML = `
          <div style="min-width: 220px; font-family: system-ui, sans-serif; padding: 2px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="background: #E8EEE8; color: #17352D; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">
                ${hospital.type}
              </span>
              <span style="font-size: 11px; font-weight: 700; color: #3D8068;">
                ${hospital.distance_km > 0 ? `${hospital.distance_km} km away` : 'Near you'}
              </span>
            </div>
            <h4 style="font-size: 14px; font-weight: bold; color: #17352D; margin: 4px 0 2px 0; line-height: 1.2;">
              ${hospital.name}
            </h4>
            <p style="font-size: 11px; color: #64748b; margin: 0 0 6px 0;">
              ${hospital.address}, ${hospital.city}
            </p>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              ${
                hospital.emergency_24_7
                  ? '<span style="color: #dc2626; font-size: 10px; font-weight: 700;">● 24/7 Emergency</span>'
                  : hospital.emergency_available
                  ? '<span style="color: #ea580c; font-size: 10px; font-weight: 600;">● Emergency Care</span>'
                  : ''
              }
              <span style="color: #16a34a; font-size: 10px; font-weight: 600;">● Cardiology</span>
            </div>
            <button id="btn-popup-${hospital.id}" style="width: 100%; background: #17352D; color: #F7F4ED; font-size: 11px; font-weight: 600; padding: 5px 8px; border-radius: 6px; border: none; cursor: pointer;">
              Select & View Details
            </button>
          </div>
        `

        marker.bindPopup(popupContent, { offset: [0, -10] })

        marker.on('click', () => {
          onSelectHospital(hospital.id)
        })

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-popup-${hospital.id}`)
          if (btn) {
            btn.onclick = () => onSelectHospital(hospital.id)
          }
        })

        markersRef.current[hospital.id] = marker
      } else {
        // Update icon state
        const marker = markersRef.current[hospital.id]
        marker.setIcon(createHospitalIcon(isSelected, hospital.emergency_available))
      }
    })
  }, [hospitals, selectedHospitalId])

  // 5. Handle Marker Highlighting & Center on selection
  useEffect(() => {
    if (!selectedHospitalId || !mapInstanceRef.current) return

    const marker = markersRef.current[selectedHospitalId]
    const hospital = hospitals.find((h) => h.id === selectedHospitalId)

    if (marker && hospital) {
      mapInstanceRef.current.flyTo([hospital.latitude, hospital.longitude], 14, {
        duration: 1.0,
      })
      marker.openPopup()
    }
  }, [selectedHospitalId])

  // Helper: Fit all visible markers in view
  const handleFitBounds = () => {
    if (!mapInstanceRef.current || hospitals.length === 0) return

    const group = L.featureGroup(Object.values(markersRef.current))
    if (userMarkerRef.current) {
      group.addLayer(userMarkerRef.current)
    }
    mapInstanceRef.current.fitBounds(group.getBounds(), {
      padding: [40, 40],
      maxZoom: 15,
    })
  }

  // Helper: Center on user
  const handleCenterUser = () => {
    if (!mapInstanceRef.current || !userLocation) return
    mapInstanceRef.current.flyTo([userLocation.latitude, userLocation.longitude], 14, {
      duration: 1.0,
    })
  }

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#D9C7A5]/50 shadow-subtle bg-[#EAE7DF]">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px] z-10" />

      {/* Floating Map Utility Bar Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-[#D9C7A5]/60 shadow-elevated">
        <button
          type="button"
          onClick={handleFitBounds}
          disabled={hospitals.length === 0}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17352D] hover:text-[#3D8068] transition-colors disabled:opacity-40"
          title="Fit all hospitals in view"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fit All</span>
        </button>

        {userLocation && (
          <>
            <div className="w-px h-4 bg-[#D9C7A5]" />
            <button
              type="button"
              onClick={handleCenterUser}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
              title="Center on current location"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>My Location</span>
            </button>
          </>
        )}
      </div>

      {/* Map Tile Info Badge Bottom Right */}
      <div className="absolute bottom-1 right-2 z-20 pointer-events-none">
        <span className="text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.5 rounded shadow-2xs font-mono">
          © OpenStreetMap
        </span>
      </div>
    </div>
  )
}
