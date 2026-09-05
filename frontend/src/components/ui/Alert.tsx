import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'danger' | 'success'
  title?: string
  icon?: React.ReactNode
}

export function Alert({
  children,
  variant = 'info',
  title,
  icon,
  className,
  ...props
}: AlertProps) {
  const configs = {
    info: {
      bg: 'bg-brand-50/80 border-brand-200 text-brand-900',
      icon: <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-50/90 border-amber-200 text-amber-950',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-rose-50/80 border-rose-200 text-rose-950',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
    },
  }

  const current = configs[variant]

  return (
    <div
      className={twMerge(
        'p-4 rounded-xl border flex items-start gap-3.5 text-sm leading-relaxed mb-4 shadow-sm',
        current.bg,
        className
      )}
      {...props}
    >
      {icon || current.icon}
      <div className="flex-1">
        {title && <h4 className="font-bold mb-1 text-sm tracking-tight">{title}</h4>}
        <div className="text-xs sm:text-sm">{children}</div>
      </div>
    </div>
  )
}
