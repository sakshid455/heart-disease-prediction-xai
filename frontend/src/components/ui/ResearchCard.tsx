import React from 'react'
import { clsx } from 'clsx'

export interface ResearchCardProps {
  children: React.ReactNode
  variant?: 'surface' | 'subtle' | 'accent' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect?: boolean
  className?: string
  id?: string
}

export const ResearchCard: React.FC<ResearchCardProps> = ({
  children,
  variant = 'surface',
  padding = 'md',
  hoverEffect = false,
  className,
  id,
}) => {
  const variantStyles = {
    surface: 'bg-white border border-slate-200/90 shadow-subtle',
    subtle: 'bg-canvas-subtle border border-slate-200/80',
    accent: 'bg-accent-50/50 border border-accent-200/60',
    outlined: 'bg-transparent border border-slate-200/90',
  }

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10',
  }

  return (
    <div
      id={id}
      className={clsx(
        'rounded-xl transition-all duration-150',
        variantStyles[variant],
        paddingStyles[padding],
        hoverEffect && 'hover:border-slate-300 hover:shadow-elevated',
        className
      )}
    >
      {children}
    </div>
  )
}
