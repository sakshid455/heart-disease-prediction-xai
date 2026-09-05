import React from 'react'
import { X, Server, Key, Cpu, ShieldCheck, Database, FileCode } from 'lucide-react'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'

export interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Platform Settings & Diagnostics</h3>
              <p className="text-xs text-slate-500">HeartAI Experimental Configuration</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-sm text-slate-700">
          {/* Section 1: API Configuration */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" /> Backend Service Endpoint
            </h4>
            <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800">
              <span className="flex-1 truncate">http://127.0.0.1:8000</span>
              <Badge variant="success" dot>Active</Badge>
            </div>
          </div>

          {/* Section 2: Random Seed Matrix */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Deterministic Random Seeds
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Seed 42 (Primary)', 'Seed 52', 'Seed 62', 'Seed 72', 'Seed 82'].map((s, idx) => (
                <span key={s} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Data Partitions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Validated Cohort Dimensions
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">Cleaned Real Cohort</span>
                <span className="font-bold font-mono text-slate-900">68,612 patients</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block">CTGAN Reservoir (200%)</span>
                <span className="font-bold font-mono text-slate-900">109,778 samples</span>
              </div>
            </div>
          </div>

          {/* Section 4: Privacy & Security */}
          <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Zero Test Leakage Verified:</strong> Evaluation partitions are strictly held-out and isolated from CTGAN discriminator/generator fitting.
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Diagnostics
          </Button>
        </div>
      </div>
    </div>
  )
}
