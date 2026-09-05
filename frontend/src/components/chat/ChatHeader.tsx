import React from 'react'
import { Heart, Minus, X, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'

interface ChatHeaderProps {
  onMinimize: () => void
  onClose: () => void
  onClear: () => void
  isExpanded?: boolean
  onToggleExpand?: () => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMinimize,
  onClose,
  onClear,
  isExpanded = false,
  onToggleExpand,
}) => {
  return (
    <header className="px-4 py-3 bg-gradient-to-r from-forest via-forest-light to-forest text-white rounded-t-2xl flex items-center justify-between border-b border-forest-muted/50 select-none shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-xs flex-shrink-0">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-sm text-white tracking-tight leading-none">
              CardioAI Assistant
            </h3>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-200 leading-tight mt-0.5">
            Your AI-powered heart health guide
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-slate-200">
        <button
          type="button"
          onClick={onClear}
          title="Reset conversation"
          aria-label="Reset conversation"
          className="p-1.5 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {onToggleExpand && (
          <button
            type="button"
            onClick={onToggleExpand}
            title={isExpanded ? 'Collapse size' : 'Expand size'}
            aria-label={isExpanded ? 'Collapse size' : 'Expand size'}
            className="p-1.5 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer hidden sm:inline-flex"
          >
            {isExpanded ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onMinimize}
          title="Minimize chat"
          aria-label="Minimize chat"
          className="p-1.5 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          title="Close chat"
          aria-label="Close chat"
          className="p-1.5 hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
