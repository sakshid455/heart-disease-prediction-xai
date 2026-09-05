import React from 'react'
import { Heart, ArrowRight, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ChatMessage as ChatMessageType } from '../../services/chatService'
import { SuggestedQuestions } from './SuggestedQuestions'

interface ChatMessageProps {
  message: ChatMessageType
  onSelectSuggestion?: (question: string) => void
  onCloseChat?: () => void
  isLatestAssistant?: boolean
  disabled?: boolean
}

/**
 * Simple markdown formatter for bolding, bullet points, headers, and line breaks.
 */
const FormattedContent: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n')

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed break-words">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />
        }

        // Headers: ### Header
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={lineIdx}
              className="font-bold text-slate-900 dark:text-navy-50 text-xs sm:text-sm mt-2 mb-1"
            >
              {formatInline(trimmed.replace(/^###\s+/, ''))}
            </h4>
          )
        }

        // Bullet point: - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^[-*]\s+/, '')
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
              <span className="text-crimson-500 font-bold leading-tight select-none">
                •
              </span>
              <span className="flex-1">{formatInline(bulletContent)}</span>
            </div>
          )
        }

        // Numbered list: 1.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 ml-1">
              <span className="text-slate-500 dark:text-navy-400 font-semibold text-[11px] leading-tight select-none min-w-[14px]">
                {numMatch[1]}.
              </span>
              <span className="flex-1">{formatInline(numMatch[2])}</span>
            </div>
          )
        }

        // Blockquote or Callout: >
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={lineIdx}
              className="border-l-2 border-crimson-500 pl-2.5 py-0.5 my-1 text-slate-600 dark:text-navy-300 italic text-[11px] sm:text-xs bg-crimson-50/40 dark:bg-navy-800/40 rounded-r"
            >
              {formatInline(trimmed.replace(/^>\s+/, ''))}
            </blockquote>
          )
        }

        return <p key={lineIdx}>{formatInline(trimmed)}</p>
      })}
    </div>
  )
}

/**
 * Parses bold **text** and code `code` within a line.
 */
function formatInline(str: string): React.ReactNode[] {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-navy-100">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="bg-slate-100 dark:bg-navy-800 text-crimson-600 dark:text-crimson-400 px-1 py-0.5 rounded text-[11px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSelectSuggestion,
  onCloseChat,
  isLatestAssistant = false,
  disabled = false,
}) => {
  const navigate = useNavigate()
  const isUser = message.role === 'user'

  const handleActionClick = (route: string) => {
    navigate(route)
    // On mobile or if user desires, keep or close chat. Keeping chat open allows them to read while on the new route!
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-3 pl-8">
        <div className="flex flex-col items-end">
          <div className="bg-forest dark:bg-navy-800 text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 shadow-md max-w-full border border-forest-light/20">
            <p className="text-xs sm:text-[13px] leading-relaxed break-words whitespace-pre-wrap text-white font-medium">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 mr-1 select-none">
            {message.timestamp}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2.5 mb-3.5 pr-4">
      {/* CardioAI Real Red Heart Avatar */}
      <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-navy-800 border border-red-200 dark:border-red-900/50 text-red-600 flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
        <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
      </div>

      <div className="flex-1 max-w-full">
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs text-slate-800 dark:text-navy-100">
          <FormattedContent text={message.content} />

          {/* Navigation Action Button */}
          {message.action && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-navy-800">
              <button
                type="button"
                onClick={() => handleActionClick(message.action!.route)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-crimson-600 hover:bg-crimson-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors group cursor-pointer"
              >
                <span>{message.action.label}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 mt-1 ml-1">
          <span className="text-[10px] text-slate-400 dark:text-navy-500">
            CardioAI • {message.timestamp}
          </span>
        </div>

        {/* Dynamic Contextual Suggestions (only displayed on the latest assistant message) */}
        {isLatestAssistant && message.suggestions && message.suggestions.length > 0 && onSelectSuggestion && (
          <SuggestedQuestions
            questions={message.suggestions}
            onSelect={onSelectSuggestion}
            disabled={disabled}
            compact
          />
        )}
      </div>
    </div>
  )
}
