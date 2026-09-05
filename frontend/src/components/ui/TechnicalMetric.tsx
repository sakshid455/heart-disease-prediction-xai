import React from 'react'
import { clsx } from 'clsx'

export interface TechnicalMetricProps {
  label: string
  value: string | number
  unit?: string
  baseline?: string | number
  delta?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
  badge?: string
  caption?: string
  monoValue?: boolean
  className?: string
}

export const TechnicalMetric: React.FC<TechnicalMetricProps> = ({
  label,
  value,
  unit,
  baseline,
  delta,
  deltaType = 'positive',
  badge,
  caption,
  monoValue = true,
  className,
}) => {
  const deltaColor = {
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    negative: 'text-rose-700 bg-rose-50 border-rose-200/80',
    neutral: 'text-navy-700 bg-slate-100 border-slate-200/80',
  }

  return (
    <div className={clsx('bg-white border border-slate-200/90 rounded-xl p-5 shadow-subtle', className)}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[13px] font-medium text-navy-600 truncate">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 text-navy-700 border border-slate-200/70">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span
          className={clsx(
            'text-2xl sm:text-3xl font-bold tracking-tight text-navy-900',
            monoValue && 'font-mono'
          )}
        >
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-navy-500">{unit}</span>}
      </div>

      {(delta || baseline) && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
          {delta && (
            <span
              className={clsx(
                'inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border font-mono',
                deltaColor[deltaType]
              )}
            >
              {delta}
            </span>
          )}
          {baseline && (
            <span className="text-navy-500 font-mono text-[11px]">
              vs. {baseline} baseline
            </span>
          )}
        </div>
      )}

      {caption && <p className="text-xs text-navy-500 mt-2">{caption}</p>}
    </div>
  )
}
