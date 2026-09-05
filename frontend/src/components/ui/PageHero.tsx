import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface PageHeroProps {
  category?: string
  title: string
  subtitle: string
  badge?: string
  breadcrumbs?: { label: string; href?: string }[]
  children?: React.ReactNode
}

export const PageHero: React.FC<PageHeroProps> = ({
  category,
  title,
  subtitle,
  badge,
  breadcrumbs = [{ label: 'Home', href: '/' }],
  children,
}) => {
  return (
    <div className="relative bg-[#F7F4ED] border-b border-[#D9C7A5]/40 pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden">
      {/* Subtle Warm Sand Top Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8EEE8]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#4A5550] mb-6">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#C4AE88] shrink-0" />}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-[#17352D] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#17352D] font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-[#C4AE88] shrink-0" />
          <span className="text-[#17352D] font-bold truncate max-w-[200px] sm:max-w-none">{title}</span>
        </nav>

        <div className="max-w-3xl space-y-4">
          
          {/* Eyebrow & Badge */}
          <div className="flex flex-wrap items-center gap-3">
            {category && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#3D8068] font-sans">
                {category}
              </span>
            )}
            {badge && (
              <span className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-[#E8EEE8] text-[#17352D] border border-[#D8E2D8]">
                {badge}
              </span>
            )}
          </div>

          {/* Editorial Playfair Display Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold text-[#17352D] tracking-tight leading-[1.18]">
            {title}
          </h1>

          {/* DM Sans Subtitle */}
          <p className="text-base sm:text-lg text-[#4A5550] leading-relaxed font-normal font-sans">
            {subtitle}
          </p>

          {children && <div className="pt-3">{children}</div>}
        </div>

      </div>
    </div>
  )
}
