import React from 'react'
import { Check, User, Activity, Stethoscope, ClipboardCheck } from 'lucide-react'

export interface StepIndicatorProps {
  currentStep: number
  onStepClick?: (step: number) => void
  highestVisitedStep: number
}

const steps = [
  { number: 1, title: 'Patient', subtitle: 'Demographics', icon: User },
  { number: 2, title: 'Clinical', subtitle: 'Measurements', icon: Activity },
  { number: 3, title: 'Medical', subtitle: 'Indicators', icon: Stethoscope },
  { number: 4, title: 'Review', subtitle: 'Summary & Run', icon: ClipboardCheck },
]

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
  highestVisitedStep,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-2 sm:px-4">
      {/* Progress Bar Track */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-[#E0D8C8] -z-0 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-[#17352D] -z-0 rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Step Nodes */}
        <div className="relative flex justify-between items-center">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number
            const isCurrent = currentStep === step.number
            const isClickable = onStepClick && step.number <= highestVisitedStep
            const Icon = step.icon

            return (
              <button
                key={step.number}
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number)}
                className={`group flex flex-col items-center focus:outline-none transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                {/* Circle icon */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 font-semibold text-sm ${
                    isCompleted
                      ? 'bg-[#17352D] text-white border-[#17352D] shadow-sm'
                      : isCurrent
                      ? 'bg-white text-[#17352D] border-[#17352D] ring-4 ring-[#17352D]/15 shadow-md scale-105'
                      : 'bg-[#F7F4ED] text-[#808C85] border-[#D9C7A5]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-[#D9C7A5]" strokeWidth={2.5} />
                  ) : (
                    <Icon className={`w-5 h-5 ${isCurrent ? 'text-[#17352D]' : 'text-[#808C85]'}`} />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2.5 text-center">
                  <div
                    className={`text-xs sm:text-sm font-bold tracking-tight transition-colors ${
                      isCurrent
                        ? 'text-[#17352D]'
                        : isCompleted
                        ? 'text-[#23493E]'
                        : 'text-[#808C85]'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="hidden sm:block text-[11px] text-[#808C85]">
                    {step.subtitle}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
