import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HeartPulse, Menu, X, ArrowRight, Activity } from 'lucide-react'

export interface NavRouteItem {
  label: string
  to: string
}

const NAV_ROUTES: NavRouteItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Heart Health', to: '/heart-health' },
  { label: 'Research', to: '/research' },
  { label: 'Dataset', to: '/dataset' },
  { label: 'CTGAN Lab', to: '/ctgan' },
  { label: 'Augmentation', to: '/augmentation' },
  { label: 'Performance', to: '/performance' },
  { label: 'XAI', to: '/explainable-ai' },
  { label: 'Find Care', to: '/find-care' },
  { label: 'Resources', to: '/resources' },
]

export const StickyNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#D9C7A5]/50 shadow-subtle py-3'
          : 'bg-[#F7F4ED] border-b border-[#D9C7A5]/30 py-4'
      }`}
    >
      <div className="max-w-[1460px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo Left: Small circular heart-inspired logo mark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-full bg-[#17352D] text-[#F7F4ED] flex items-center justify-center shadow-subtle group-hover:bg-[#102721] transition-all group-hover:scale-105 border border-[#D9C7A5]/40 shrink-0">
              <HeartPulse className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#C87868]" />
            </div>
            <div>
              <div className="font-serif font-bold text-[16px] 2xl:text-[17px] tracking-tight text-[#17352D] leading-tight whitespace-nowrap">
                HEART AI
              </div>
              <div className="text-[9.5px] 2xl:text-[10px] font-sans font-semibold tracking-widest text-[#3D8068] uppercase leading-none mt-0.5">
                RESEARCH
              </div>
            </div>
          </Link>

          {/* Navigation Links Center (Desktop) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 flex-nowrap shrink">
            {NAV_ROUTES.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap px-2 2xl:px-2.5 py-1.5 text-[12.5px] 2xl:text-[13.5px] font-medium rounded-lg transition-all relative ${
                    isActive
                      ? 'text-[#17352D] font-bold bg-[#E8EEE8]/80'
                      : 'text-[#4A5550] hover:text-[#17352D] hover:bg-[#FAF8F4]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#3D8068] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Primary CTA Right: Try Prediction */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/prediction"
              className="inline-flex items-center justify-center gap-2 px-4 2xl:px-5 py-2 2xl:py-2.5 bg-[#17352D] hover:bg-[#102721] text-[#F7F4ED] text-[12.5px] 2xl:text-[13px] font-semibold tracking-wide rounded-xl transition-all shadow-subtle hover:-translate-y-0.5 border border-[#D9C7A5]/30 focus:outline-none whitespace-nowrap"
            >
              <span>Try Prediction</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9C7A5]" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/prediction"
              className="sm:hidden inline-flex items-center px-3 py-1.5 bg-[#17352D] text-[#F7F4ED] text-xs font-semibold rounded-lg"
            >
              Predict
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#17352D] hover:bg-[#E8EEE8] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 pb-4 border-t border-[#D9C7A5]/40 space-y-1 bg-[#F7F4ED] rounded-b-2xl animate-fadeIn">
            {NAV_ROUTES.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#17352D] bg-[#E8EEE8] font-bold'
                      : 'text-[#4A5550] hover:bg-[#FAF8F4]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <Link
                to="/prediction"
                className="w-full text-center block px-4 py-2.5 bg-[#17352D] text-[#F7F4ED] text-xs font-bold uppercase tracking-wider rounded-xl shadow-subtle"
              >
                Try Prediction
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
