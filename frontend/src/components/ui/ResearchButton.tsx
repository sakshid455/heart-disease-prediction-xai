import React from 'react'
import { clsx } from 'clsx'

export interface ResearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
}

export const ResearchButton: React.FC<ResearchButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variantStyles = {
    primary: 'bg-accent-700 hover:bg-accent-800 text-white shadow-subtle border border-accent-800/20',
    secondary: 'bg-white hover:bg-slate-50 text-navy-800 border border-slate-300 hover:border-slate-400 shadow-subtle',
    ghost: 'text-navy-600 hover:text-navy-900 hover:bg-slate-100/80 border border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-subtle border border-rose-700/20',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
    md: 'px-4 py-2.5 text-[14px] rounded-lg gap-2',
    lg: 'px-6 py-3 text-[15px] rounded-lg gap-2.5',
  }

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  )
}
