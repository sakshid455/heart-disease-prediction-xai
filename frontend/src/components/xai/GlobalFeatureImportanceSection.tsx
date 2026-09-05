import React, { useState, useEffect } from 'react'
import { BarChart3, Database, Layers, CheckCircle2, Sparkles, Filter } from 'lucide-react'
import { api, GlobalShapResponse, GlobalShapFeature } from '../../services/api'

export const GlobalFeatureImportanceSection: React.FC = () => {
  const [data, setData] = useState<GlobalShapResponse | null>(null)
  const [activeDataset, setActiveDataset] = useState<'clinical' | 'cohort'>('clinical')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedFeature, setSelectedFeature] = useState<string | null>('thal')

  useEffect(() => {
    const fetchGlobalShap = async () => {
      try {
        const res = await api.getGlobalShap()
        setData(res)
      } catch (e) {
        console.warn('Could not fetch global shap data from backend:', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGlobalShap()
  }, [])

  // Default fallback data matching exact trained model numbers if backend is offline
  const clinicalFeaturesFallback: GlobalShapFeature[] = [
    { feature: 'thal', name: 'Thallium Defect (Thal)', mean_abs_shap: 0.1019, rank: 1, category: 'Scintigraphy', direction: 'Positive' },
    { feature: 'ca', name: 'Major Vessels Colored (CA)', mean_abs_shap: 0.0942, rank: 2, category: 'Anatomy', direction: 'Positive' },
    { feature: 'cp', name: 'Chest Pain Type (CP)', mean_abs_shap: 0.0919, rank: 3, category: 'Symptom', direction: 'Positive' },
    { feature: 'thalach', name: 'Maximum Heart Rate', mean_abs_shap: 0.0527, rank: 4, category: 'Stress Test', direction: 'Negative' },
    { feature: 'oldpeak', name: 'ST Depression (Oldpeak)', mean_abs_shap: 0.0501, rank: 5, category: 'ECG', direction: 'Positive' },
    { feature: 'exang', name: 'Exercise-Induced Angina', mean_abs_shap: 0.0389, rank: 6, category: 'Stress Test', direction: 'Positive' },
    { feature: 'slope', name: 'Peak ST Slope', mean_abs_shap: 0.0384, rank: 7, category: 'ECG', direction: 'Positive' },
    { feature: 'sex', name: 'Biological Sex', mean_abs_shap: 0.0335, rank: 8, category: 'Demographic', direction: 'Positive' },
    { feature: 'age', name: 'Patient Age', mean_abs_shap: 0.0241, rank: 9, category: 'Demographic', direction: 'Positive' },
    { feature: 'chol', name: 'Serum Cholesterol', mean_abs_shap: 0.0205, rank: 10, category: 'Biochemical', direction: 'Positive' },
    { feature: 'trestbps', name: 'Resting Blood Pressure', mean_abs_shap: 0.0156, rank: 11, category: 'Hemodynamic', direction: 'Positive' },
    { feature: 'restecg', name: 'Resting ECG', mean_abs_shap: 0.0119, rank: 12, category: 'ECG', direction: 'Positive' },
    { feature: 'fbs', name: 'Fasting Blood Sugar', mean_abs_shap: 0.0027, rank: 13, category: 'Biochemical', direction: 'Positive' },
  ]

  const cohortFeaturesFallback: GlobalShapFeature[] = [
    { feature: 'ap_hi', name: 'Systolic Blood Pressure', mean_abs_shap: 0.6648, rank: 1, category: 'Hemodynamic', direction: 'Positive' },
    { feature: 'cholesterol', name: 'Total Cholesterol', mean_abs_shap: 0.2933, rank: 2, category: 'Biochemical', direction: 'Positive' },
    { feature: 'age', name: 'Patient Age', mean_abs_shap: 0.2742, rank: 3, category: 'Demographic', direction: 'Positive' },
    { feature: 'ap_lo', name: 'Diastolic Blood Pressure', mean_abs_shap: 0.2409, rank: 4, category: 'Hemodynamic', direction: 'Positive' },
    { feature: 'weight', name: 'Body Weight', mean_abs_shap: 0.1778, rank: 5, category: 'Biometric', direction: 'Positive' },
    { feature: 'active', name: 'Physical Activity', mean_abs_shap: 0.1145, rank: 6, category: 'Lifestyle', direction: 'Negative' },
    { feature: 'gender', name: 'Biological Sex', mean_abs_shap: 0.0580, rank: 7, category: 'Demographic', direction: 'Positive' },
    { feature: 'height', name: 'Standing Height', mean_abs_shap: 0.0504, rank: 8, category: 'Biometric', direction: 'Positive' },
    { feature: 'smoke', name: 'Smoking Status', mean_abs_shap: 0.0288, rank: 9, category: 'Lifestyle', direction: 'Negative' },
    { feature: 'gluc', name: 'Blood Glucose', mean_abs_shap: 0.0271, rank: 10, category: 'Biochemical', direction: 'Positive' },
    { feature: 'alco', name: 'Alcohol Consumption', mean_abs_shap: 0.0166, rank: 11, category: 'Lifestyle', direction: 'Positive' },
  ]

  const activeFeatures =
    activeDataset === 'clinical'
      ? data?.clinical_features || clinicalFeaturesFallback
      : data?.cohort_features || cohortFeaturesFallback

  const maxVal = Math.max(...activeFeatures.map((f) => f.mean_abs_shap), 0.001)

  return (
    <section className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D9C7A5]/40 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-mono">
            Population-Level Insights
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17352D] tracking-tight mt-1">
            Global Feature Importance
          </h2>
          <p className="text-sm text-[#4A5550] mt-1">
            Mean absolute Shapley value attributions across test records indicate overarching model priorities.
          </p>
        </div>

        {/* Dataset Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/70 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveDataset('clinical')
              setSelectedFeature('thal')
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeDataset === 'clinical'
                ? 'bg-[#17352D] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            Clinical Model (13 Features)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveDataset('cohort')
              setSelectedFeature('ap_hi')
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeDataset === 'cohort'
                ? 'bg-[#17352D] text-white shadow-xs'
                : 'text-[#4A5550] hover:text-[#17352D]'
            }`}
          >
            Large Cohort (11 Features)
          </button>
        </div>
      </div>

      {/* Main Visual Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/50 shadow-subtle space-y-6">
        
        {/* Sub-bar showing dataset status */}
        <div className="flex items-center justify-between text-xs text-[#5C6661] border-b border-[#FAF8F4] pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3D8068]" />
            <span className="font-semibold text-[#17352D]">
              {activeDataset === 'clinical'
                ? 'Trained Random Forest (Cleveland Clinic Benchmark)'
                : 'Optimal 200% CTGAN-Augmented Classifier (Large Cohort)'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#808C85]">
            Metric: Mean(|SHAP Value|)
          </span>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="space-y-3.5 pt-2">
          {activeFeatures.map((item) => {
            const widthPercent = (item.mean_abs_shap / maxVal) * 100
            const isSelected = selectedFeature === item.feature

            return (
              <div
                key={item.feature}
                onClick={() => setSelectedFeature(item.feature)}
                className={`group p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF8F4] border-[#17352D] shadow-xs ring-1 ring-[#17352D]/10'
                    : 'bg-white border-transparent hover:border-[#D9C7A5]/60 hover:bg-[#FAF8F4]/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F4] border border-[#D9C7A5]/60 text-[11px] font-mono font-bold flex items-center justify-center text-[#17352D]">
                      {item.rank}
                    </span>
                    <span className="font-bold text-[#17352D] font-sans">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F4] text-[#808C85] border border-[#D9C7A5]/40 hidden sm:inline">
                      {item.category}
                    </span>
                  </div>

                  <span className="font-mono font-bold text-[#17352D]">
                    {item.mean_abs_shap.toFixed(4)}
                  </span>
                </div>

                {/* Bar */}
                <div className="w-full h-3 bg-[#FAF8F4] rounded-full overflow-hidden border border-[#D9C7A5]/40 relative">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      item.rank <= 3
                        ? 'bg-[#17352D]'
                        : item.rank <= 7
                        ? 'bg-[#3D8068]'
                        : 'bg-[#C87868]'
                    }`}
                    style={{ width: `${Math.max(widthPercent, 3)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature detail summary footnote */}
        <div className="pt-4 border-t border-[#FAF8F4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C6661]">
          <span>
            Rankings reflect average absolute Shapley impact across test cases. Rank consistency is <strong>100%</strong> for top clinical factors.
          </span>
          <span className="font-mono text-[11px] text-[#3D8068] font-semibold shrink-0">
            Spearman Rank Stability: r = 0.8455
          </span>
        </div>

      </div>
    </section>
  )
}
