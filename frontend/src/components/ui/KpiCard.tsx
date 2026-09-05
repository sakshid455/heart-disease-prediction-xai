import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LucideIcon } from 'lucide-react'

export interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
    label?: string
  }
  badge?: string
  accentColor?: string
  className?: string
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  badge,
  accentColor = '#2563eb',
  className,
}: KpiCardProps) {
  return (
    <div
      className={twMerge(
        'relative bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between',
        className
      )}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${accentColor}, #60a5fa)`
        }}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {badge}
          </span>
        )}
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
          {value}
        </span>
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          {trend && (
            <span
              className={clsx(
                'font-bold inline-flex items-center gap-0.5',
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
