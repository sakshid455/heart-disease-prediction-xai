/**
 * HeartAI TypeScript API Client
 * Connects frontend research dashboards and patient predictors directly to FastAPI endpoints.
 */

export interface HealthResponse {
  status: string
  service: string
  version: string
  model_loaded: boolean
  optimal_model: string
}

export interface DatasetSummary {
  dataset_name: string
  total_records: number
  number_of_features: number
  numerical_features_count: number
  categorical_features_count: number
  training_records: number
  testing_records: number
  missing_value_count: number
  target_distribution: {
    class_0_negative_count: number
    class_1_positive_count: number
    negative_percentage: number
    positive_percentage: number
    training_split?: {
      negative: number
      positive: number
      positive_percentage: number
    }
    testing_split?: {
      negative: number
      positive: number
      positive_percentage: number
    }
  }
  feature_names: string[]
}

export interface OptimalConfig {
  best_model: string
  optimal_augmentation_ratio: string
  training_size: number
  synthetic_training_size: number
  total_training_size: number
  accuracy: number
  precision: number
  recall: number
  f1_score: number
  roc_auc: number
  weighted_score?: number
  priorities?: string
}

export interface AugmentationResultItem {
  model: string
  augmentation_ratio: string | number
  real_train_size: number
  synthetic_train_size: number
  total_train_size: number
  accuracy: number
  precision: number
  recall: number
  f1_score: number
  roc_auc: number
}

export interface ModelComparisonResponse {
  total_experiments: number
  models_evaluated: string[]
  augmentation_ratios: string[]
  results: AugmentationResultItem[]
}

export interface PatientFeaturesPayload {
  age: number
  gender: number
  height: number
  weight: number
  ap_hi: number
  ap_lo: number
  cholesterol: number
  gluc: number
  smoke: number
  alco: number
  active: number
}

export interface ClinicalPatientPayload {
  age: number
  sex: number
  cp: number
  trestbps: number
  chol: number
  fbs: number
  restecg: number
  thalach: number
  exang: number
  oldpeak: number
  slope: number
  ca: number
  thal: number
}

export type AnyPatientPayload = PatientFeaturesPayload | ClinicalPatientPayload

export interface PredictionResult {
  prediction: number
  prediction_label: string
  probability: number
  probability_class_0?: number
  probability_class_1?: number
  decision_threshold?: number
  risk_category: string
  model: string
  model_name?: string
  model_version?: string
  augmentation_ratio: string
  is_research_prediction?: boolean
  medical_diagnosis?: boolean
}

export interface FeatureContribution {
  feature: string
  value: number
  shap_value: number
  impact: 'positive' | 'negative'
  clinical_interpretation: string
}

export interface ExplanationResult {
  prediction: number
  prediction_label: string
  probability: number
  model: string
  model_name?: string
  augmentation_ratio: string
  base_value: number
  top_shap_features?: FeatureContribution[]
  feature_contributions?: FeatureContribution[]
  features: FeatureContribution[]
  top_positive_contributors: FeatureContribution[]
  top_negative_contributors: FeatureContribution[]
  research_note: string
}

export interface ResearchResults {
  research_question: string
  dataset_statistics: any
  ctgan_statistics: any
  synthetic_data_quality: any
  adaptive_augmentation: any
  best_model: any
  optimal_ratio: string
  robustness_results: any
  statistical_analysis: any
  sensitivity_results?: any
  xai_findings: any
  fairness_results: any
  privacy_analysis: any
}

export interface RecommendationResponse {
  objective: string
  recommended_augmentation_ratio: string
  recommended_model: string
  expected_metrics: {
    accuracy: number
    precision: number
    recall: number
    f1_score: number
    roc_auc: number
    training_samples?: number
    synthetic_samples?: number
  }
  rationale: string
}

export type AugmentationRecommendationResponse = RecommendationResponse
export type PredictionResultResponse = PredictionResult
export type ExplanationResponse = ExplanationResult

const BASE_URL = '/api'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`
  const res = await fetch(url, options)
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || `HTTP Error ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

export interface GlobalShapFeature {
  feature: string
  name: string
  mean_abs_shap: number
  rank: number
  category: string
  direction: string
}

export interface GlobalShapResponse {
  clinical_features: GlobalShapFeature[]
  cohort_features: GlobalShapFeature[]
  spearman_rank_stability: number
  directional_consistency: string
}

export const api = {
  getHealth: () => request<HealthResponse>('/health'),
  getDatasetSummary: () => request<DatasetSummary>('/dataset-summary'),
  getOptimalConfiguration: () => request<OptimalConfig>('/optimal-configuration'),
  getAugmentationResults: (model?: string, metric?: string) => {
    const params = new URLSearchParams()
    if (model) params.append('model', model)
    if (metric) params.append('metric', metric)
    const qs = params.toString() ? `?${params.toString()}` : ''
    return request<AugmentationResultItem[]>(`/augmentation-results${qs}`)
  },
  getModelComparison: () => request<ModelComparisonResponse>('/model-comparison'),
  getResearchResults: () => request<ResearchResults>('/research-results'),
  getGlobalShap: () => request<GlobalShapResponse>('/shap-global'),
  getAugmentationRecommendation: (objective: string) => {
    const params = new URLSearchParams({ objective })
    return request<RecommendationResponse>(`/augmentation-recommendation?${params.toString()}`)
  },
  predictRisk: (patient: AnyPatientPayload) =>
    request<PredictionResult>('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    }),
  explainRisk: (patient: AnyPatientPayload) =>
    request<ExplanationResult>('/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    }),
}
