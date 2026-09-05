import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface Column<T> {
  key: string
  header: string
  render?: (item: T, index: number) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T, index: number) => string | number
  highlightRow?: (item: T) => boolean
  emptyMessage?: string
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  highlightRow,
  emptyMessage = 'No records available.',
  className,
}: DataTableProps<T>) {
  return (
    <div className={twMerge('overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm', className)}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  'px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-slate-400 text-xs italic"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const isHighlighted = highlightRow ? highlightRow(item) : false
              return (
                <tr
                  key={keyExtractor(item, idx)}
                  className={clsx(
                    'transition-colors duration-100 hover:bg-slate-50/60',
                    isHighlighted && 'bg-brand-50/70 font-semibold'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx(
                        'px-4 py-3 text-slate-800',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.className
                      )}
                    >
                      {col.render ? col.render(item, idx) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
