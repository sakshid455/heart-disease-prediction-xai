import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SegmentedOption<T extends string | number> {
  value: T
  label: string
  icon?: React.ReactNode
}

export interface SegmentedControlProps<T extends string | number> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={twMerge(
        'inline-flex p-1 bg-slate-100/90 border border-slate-200/80 rounded-lg w-full gap-1',
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={clsx(
              'flex-1 font-semibold rounded-md transition-all duration-150 flex items-center justify-center gap-1.5 select-none',
              size === 'sm' ? 'py-1 px-2 text-xs' : 'py-1.5 px-3 text-xs sm:text-sm',
              isActive
                ? 'bg-white text-brand-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
