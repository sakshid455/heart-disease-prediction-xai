import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface FormFieldProps {
  label: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  hint,
  error,
  required = false,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={twMerge('flex flex-col space-y-1.5 mb-4', className)}>
      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
        <label className="flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
        {hint && <span className="text-slate-400 font-normal">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  )
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  unit?: string
}

export function Input({ className, error, unit, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      <input
        className={twMerge(
          'w-full px-3.5 py-2 text-sm bg-white border rounded-lg outline-none transition-all duration-150',
          'border-slate-200 text-slate-900 placeholder:text-slate-400',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
          unit && 'pr-12',
          className
        )}
        {...props}
      />
      {unit && (
        <span className="absolute right-3 text-xs font-semibold text-slate-400 select-none pointer-events-none">
          {unit}
        </span>
      )}
    </div>
  )
}
