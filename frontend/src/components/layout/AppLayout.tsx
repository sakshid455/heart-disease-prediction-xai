import React, { useState } from 'react'
import { Sidebar, NavRoute } from './Sidebar'
import { Navbar } from './Navbar'
import { clsx } from 'clsx'

export interface AppLayoutProps {
  currentRoute: NavRoute
  onNavigate: (route: NavRoute) => void
  onOpenSettings: () => void
  children: React.ReactNode
}

export function AppLayout({
  currentRoute,
  onNavigate,
  onOpenSettings,
  children,
}: AppLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onOpenSettings={onOpenSettings}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-64 h-full bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              currentRoute={currentRoute}
              onNavigate={(r) => {
                onNavigate(r)
                setIsMobileOpen(false)
              }}
              isCollapsed={false}
              onToggleCollapse={() => setIsMobileOpen(false)}
              onOpenSettings={() => {
                onOpenSettings()
                setIsMobileOpen(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={clsx(
          'flex-1 flex flex-col transition-all duration-300 min-h-screen',
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <Navbar
          currentRoute={currentRoute}
          onToggleMobileSidebar={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Research Disclaimer Footer */}
        <footer className="border-t border-slate-200 bg-white/80 py-4 px-6 text-center text-xs text-slate-500">
          <p className="font-medium text-slate-600">
            <span className="inline-block px-2 py-0.5 mr-2 rounded bg-amber-100 text-amber-800 font-bold uppercase tracking-wider text-[10px]">Research Disclaimer</span>
            This application is intended for research and educational purposes and is not a medical diagnostic tool.
          </p>
        </footer>
      </div>
    </div>
  )
}
