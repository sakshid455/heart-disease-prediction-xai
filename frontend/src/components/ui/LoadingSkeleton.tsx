import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string | number
  width?: string | number
}

export function Skeleton({ className, style, height, width, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge('animate-pulse bg-slate-200 rounded-md', className)}
      style={{
        height,
        width,
        ...style,
      }}
      {...props}
    />
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-7 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-3 w-36" />
    </div>
  )
}
