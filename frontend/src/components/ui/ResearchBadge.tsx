import React from 'react'
import { clsx } from 'clsx'

export interface ResearchBadgeProps {
  children: React.ReactNode
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'mono'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  className?: string
}

export const ResearchBadge: React.FC<ResearchBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}) => {
  const variantStyles = {
    neutral: 'bg-slate-100 text-navy-700 border-slate-200/80',
    accent: 'bg-accent-50 text-accent-800 border-accent-200/80',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-800 border-rose-200/80',
    mono: 'bg-slate-50 text-navy-800 border-slate-200 font-mono text-[11px]',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-md border tracking-tight',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
