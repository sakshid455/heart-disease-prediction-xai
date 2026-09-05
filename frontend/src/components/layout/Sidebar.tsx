import React from 'react'
import {
  LayoutDashboard,
  Activity,
  Sparkles,
  TrendingUp,
  Layers,
  Database,
  BookOpen,
  GitBranch,
  Settings,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Compass,
  Info
} from 'lucide-react'
import { clsx } from 'clsx'

export type NavRoute =
  | 'dashboard'
  | 'prediction'
  | 'explainability'
  | 'adaptive'
  | 'advisor'
  | 'models'
  | 'dataset'
  | 'results'
  | 'methodology'

export interface SidebarProps {
  currentRoute: NavRoute
  onNavigate: (route: NavRoute) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  onOpenSettings: () => void
}

interface NavItemConfig {
  id: NavRoute
  label: string
  icon: React.ReactNode
  badge?: string
}

export function Sidebar({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  onOpenSettings,
}: SidebarProps) {
  const navItems: NavItemConfig[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 shrink-0" /> },
    { id: 'prediction', label: 'Prediction', icon: <Activity className="w-5 h-5 shrink-0" /> },
    { id: 'explainability', label: 'Explainable AI', icon: <Sparkles className="w-5 h-5 shrink-0" />, badge: 'SHAP' },
    { id: 'adaptive', label: 'Adaptive Augmentation', icon: <TrendingUp className="w-5 h-5 shrink-0" />, badge: 'Core' },
    { id: 'advisor', label: 'Augmentation Advisor', icon: <Compass className="w-5 h-5 shrink-0" />, badge: 'Advisor' },
    { id: 'models', label: 'Model Comparison', icon: <Layers className="w-5 h-5 shrink-0" /> },
    { id: 'dataset', label: 'Dataset Explorer', icon: <Database className="w-5 h-5 shrink-0" /> },
    { id: 'results', label: 'Research Results', icon: <BookOpen className="w-5 h-5 shrink-0" /> },
    { id: 'methodology', label: 'Methodology', icon: <GitBranch className="w-5 h-5 shrink-0" /> },
  ]

  return (
    <aside
      className={clsx(
        'fixed top-0 bottom-0 left-0 z-40 bg-slate-900 text-slate-100 flex flex-col transition-all duration-300 border-r border-slate-800 select-none shadow-xl',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
        <div
          className="flex items-center gap-3 cursor-pointer overflow-hidden"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 shrink-0">
            <HeartPulse className="w-5 h-5 animate-pulse text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-extrabold tracking-tight text-base text-white">
                Heart<span className="text-brand-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate">
                Adaptive CTGAN Benchmark
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.id === currentRoute
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 relative group',
                isActive
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}
              {!isCollapsed && item.badge && (
                <span
                  className={clsx(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider',
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-brand-400'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-1 shrink-0">
        {isCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-full flex justify-center py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mb-1"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <button
          type="button"
          onClick={onOpenSettings}
          className={clsx(
            'w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all',
            isCollapsed && 'justify-center'
          )}
          title="Platform Settings"
        >
          <Settings className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Settings & Diagnostics</span>}
        </button>
      </div>
    </aside>
  )
}
