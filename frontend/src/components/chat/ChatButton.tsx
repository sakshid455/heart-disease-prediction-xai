import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

interface ChatButtonProps {
  isOpen: boolean
  onClick: () => void
  unreadCount?: number
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  isOpen,
  onClick,
  unreadCount = 0,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center select-none">
      {/* Tooltip on hover */}
      {showTooltip && !isOpen && (
        <div
          role="tooltip"
          className="absolute right-full mr-3.5 px-3 py-1.5 bg-navy-950 text-white text-xs font-semibold rounded-xl shadow-xl whitespace-nowrap pointer-events-none transition-all duration-200 border border-navy-800 flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Ask CardioAI</span>
          <span className="text-[10px] text-slate-400 font-normal ml-0.5">• AI Guide</span>
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-navy-950 rotate-45 border-t border-r border-navy-800" />
        </div>
      )}

      {/* Floating Action Button: Real Heart Shape in Vivid Red */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isOpen ? 'Close CardioAI Assistant' : 'Ask CardioAI'}
        aria-expanded={isOpen}
        className="relative group cursor-pointer focus:outline-hidden transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {/* Subtle glowing ambient pulse ring */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-md animate-heartbeat -z-10 pointer-events-none" />
        )}

        {/* Real Heart SVG */}
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 ${
            !isOpen ? 'animate-heartbeat' : ''
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full drop-shadow-xl transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 6px 14px rgba(225, 29, 72, 0.45))',
            }}
          >
            <defs>
              <linearGradient id="cardioHeartRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="40%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#cardioHeartRed)"
            />
          </svg>

          {/* Center Chat Bubble / Close Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-white pb-1.5 pointer-events-none">
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5] transition-transform duration-200" />
            ) : (
              <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white fill-white/25 stroke-[2.2] transition-transform duration-200 group-hover:scale-110" />
            )}
          </div>
        </div>

        {/* Unread badge if any */}
        {unreadCount > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-navy-950 text-white text-[11px] font-bold rounded-full border-2 border-white dark:border-navy-900 flex items-center justify-center shadow-md">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  )
}
