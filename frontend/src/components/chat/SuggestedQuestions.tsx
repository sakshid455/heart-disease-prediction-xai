import React from 'react'
import { Sparkles } from 'lucide-react'

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
  disabled?: boolean
  compact?: boolean
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onSelect,
  disabled = false,
  compact = false,
}) => {
  if (!questions || questions.length === 0) return null

  return (
    <div className={`flex flex-col gap-1.5 ${compact ? 'mt-2' : 'my-2.5'}`}>
      {!compact && (
        <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-navy-400 px-1">
          <Sparkles className="w-3 h-3 text-crimson-500" />
          <span>Suggested Inquiries</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(q)}
            className="text-left text-xs bg-slate-100 hover:bg-crimson-50 dark:bg-navy-800/80 dark:hover:bg-crimson-950/40 text-slate-700 dark:text-navy-200 hover:text-crimson-700 dark:hover:text-crimson-400 border border-slate-200/80 dark:border-navy-700/80 hover:border-crimson-200 dark:hover:border-crimson-800 rounded-lg px-2.5 py-1.5 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-98"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
