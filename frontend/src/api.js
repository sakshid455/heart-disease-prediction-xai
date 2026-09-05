/**
 * API Client for interacting with the FastAPI backend
 */

const BASE_URL = '' // Uses Vite dev server proxy or direct path

export async function fetchHealth() {
  const res = await fetch(`${BASE_URL}/health`)
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`)
  return res.json()
}

export async function fetchDatasetSummary() {
  const res = await fetch(`${BASE_URL}/dataset-summary`)
  if (!res.ok) throw new Error(`Dataset summary request failed: ${res.statusText}`)
  return res.json()
}

export async function fetchAugmentationResults() {
  const res = await fetch(`${BASE_URL}/augmentation-results`)
  if (!res.ok) throw new Error(`Augmentation results request failed: ${res.statusText}`)
  return res.json()
}

export async function fetchOptimalConfiguration() {
  const res = await fetch(`${BASE_URL}/optimal-configuration`)
  if (!res.ok) throw new Error(`Optimal configuration request failed: ${res.statusText}`)
  return res.json()
}

export async function predictRisk(patientData) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData)
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || `Prediction failed: ${res.statusText}`)
  }
  return res.json()
}

export async function explainRisk(patientData) {
  const res = await fetch(`${BASE_URL}/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData)
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || `Explainability generation failed: ${res.statusText}`)
  }
  return res.json()
}

export async function fetchModelComparison() {
  const res = await fetch(`${BASE_URL}/model-comparison`)
  if (!res.ok) throw new Error(`Model comparison request failed: ${res.statusText}`)
  return res.json()
}
