import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'underline' | 'pills'
  className?: string
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className,
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={twMerge('flex border-b border-slate-200 gap-6', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={clsx(
                'pb-3 pt-1 text-sm font-bold flex items-center gap-2 border-b-2 transition-all -mb-px',
                isActive
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        'inline-flex p-1 bg-slate-100 border border-slate-200/80 rounded-xl gap-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 select-none',
              isActive
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full bg-brand-50 text-brand-700 font-semibold text-[10px]">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
