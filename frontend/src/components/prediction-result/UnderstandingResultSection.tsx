import React from 'react'
import { BookOpen, CheckCircle, HelpCircle, ShieldCheck, AlertTriangle } from 'lucide-react'
import { PredictionResult } from '../../services/api'

export interface UnderstandingResultSectionProps {
  result: PredictionResult
}

export const UnderstandingResultSection: React.FC<UnderstandingResultSectionProps> = ({
  result,
}) => {
  const probPercent = Math.round(result.probability * 100)
  const isHigh = result.probability >= 0.70
  const isModerate = result.probability >= 0.45 && result.probability < 0.70
  const isLow = result.probability < 0.45

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2.5 border-b border-[#D9C7A5]/40 pb-3">
        <BookOpen className="w-5 h-5 text-[#3D8068]" />
        <div>
          <h3 className="text-xl font-serif font-bold text-[#17352D]">
            Understanding Your Assessment
          </h3>
          <p className="text-xs text-[#5C6661]">
            Plain-language interpretation of what this computational evaluation means.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C7A5]/50 shadow-subtle space-y-6">
        
        {/* Main Plain Language Statement */}
        <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#D9C7A5]/70 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#3D8068] font-mono">
            Model Interpretation Summary
          </div>
          <p className="text-base sm:text-lg font-serif font-bold text-[#17352D] leading-relaxed">
            {isHigh
              ? 'The model estimates an elevated likelihood of coronary artery disease based on prominent risk indicators.'
              : isModerate
              ? 'The model estimates a moderate / borderline likelihood due to mixed clinical signals.'
              : 'The model estimates a low likelihood based on the supplied clinical features.'}
          </p>
          <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed">
            {isHigh
              ? `Across trained comparative populations, patients with similar hemodynamic markers, electrocardiographic changes, or stress test indicators exhibited a high statistical probability of ${probPercent}%. This indicates that your clinical profile contains substantial risk factors warranting comprehensive physician consultation.`
              : isModerate
              ? `Your assessment computed an intermediate probability of ${probPercent}%. In clinical machine learning, this occurs when vascular stress markers (such as elevated blood pressure, cholesterol, or fluoroscopy vessels) are offset by favorable physiological tests (such as a normal myocardial perfusion scan or high exertion capacity). In medicine, this intermediate zone is typically evaluated with confirmatory diagnostic imaging.`
              : `Across trained benchmark cohorts, individuals with your clinical profile displayed a favorable probability score of ${probPercent}%, indicating minimal presence of classical ischemic indicators within the evaluated parameters.`}
          </p>
        </div>

        {/* 3 Interpretation Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 space-y-2">
            <h4 className="text-sm font-bold text-[#17352D] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3D8068]" />
              Probability vs. Diagnosis
            </h4>
            <p className="text-xs text-[#5C6661] leading-relaxed">
              Machine learning algorithms evaluate statistical correlations, not biological certainty. Even scores in the borderline or elevated zone flag risk patterns for clinical review; they are never a definitive diagnosis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 space-y-2">
            <h4 className="text-sm font-bold text-[#17352D] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#C87868]" />
              Balancing Protective & Risk Markers
            </h4>
            <p className="text-xs text-[#5C6661] leading-relaxed">
              Diagnostic tests like thallium scans or stress ECGs carry heavy predictive weight. A normal perfusion scan can moderate the statistical probability even when baseline hypertension or cholesterol is high.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#D9C7A5]/40 space-y-2">
            <h4 className="text-sm font-bold text-[#17352D] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#3D8068]" />
              Next Clinical Steps
            </h4>
            <p className="text-xs text-[#5C6661] leading-relaxed">
              Share these parameters with your primary care doctor or cardiologist. Professional diagnostic pathways include stress echocardiography, CT coronary angiography, and comprehensive lipid profiling.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

