export interface ClinicalFormData {
  // Step 1: Patient
  age: number
  sex: number // 0 = Female, 1 = Male

  // Step 2: Clinical
  trestbps: number // Resting BP (mmHg)
  chol: number // Cholesterol (mg/dL)
  thalach: number // Max Heart Rate (bpm)
  oldpeak: number // ST depression

  // Step 3: Medical
  cp: number // Chest Pain Type (1, 2, 3, 4)
  fbs: number // Fasting Blood Sugar > 120 (0 = No, 1 = Yes)
  restecg: number // Resting ECG (0, 1, 2)
  exang: number // Exercise Induced Angina (0 = No, 1 = Yes)
  slope: number // ST Slope (1, 2, 3)
  ca: number // Major Vessels (0, 1, 2, 3)
  thal: number // Thalassemia (3, 6, 7)
}

export const INITIAL_CLINICAL_DATA: ClinicalFormData = {
  age: 54,
  sex: 1,
  trestbps: 130,
  chol: 240,
  thalach: 150,
  oldpeak: 1.2,
  cp: 1,
  fbs: 0,
  restecg: 0,
  exang: 0,
  slope: 2,
  ca: 0,
  thal: 3,
}

export interface FormErrors {
  [key: string]: string | undefined
}
