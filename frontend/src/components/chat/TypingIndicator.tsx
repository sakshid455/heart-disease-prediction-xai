import React from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 mb-3" aria-live="polite">
      <div className="w-7 h-7 rounded-full bg-crimson-100 dark:bg-crimson-950/60 border border-crimson-200 dark:border-crimson-800 flex items-center justify-center flex-shrink-0 text-crimson-600">
        <Activity className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 dark:text-navy-400 font-medium mr-1.5">
            CardioAI is thinking
          </span>
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-crimson-600 inline-block"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-crimson-600 inline-block"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-crimson-600 inline-block"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}
