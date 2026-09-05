import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import {
  chatService,
  ChatMessage as ChatMessageType,
  WELCOME_MESSAGE,
  INITIAL_SUGGESTIONS,
} from '../../services/chatService'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { TypingIndicator } from './TypingIndicator'
import { SuggestedQuestions } from './SuggestedQuestions'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  onMinimize,
}) => {
  const location = useLocation()
  const [messages, setMessages] = useState<ChatMessageType[]>(() =>
    chatService.getStoredMessages()
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sync with storage on mount and when messages change
  useEffect(() => {
    chatService.saveMessages(messages)
  }, [messages])

  // Auto-scroll to bottom when messages or loading state changes
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isLoading, isOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSend = async (userText: string) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: timeStr,
    }

    const updated = [...messages, userMessage]
    setMessages(updated)
    setIsLoading(true)

    try {
      const response = await chatService.sendMessage(
        userText,
        updated,
        location.pathname
      )

      const assistantMessage: ChatMessageType = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        action: response.action,
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: ChatMessageType = {
        id: `assistant-err-${Date.now()}`,
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isError: true,
        suggestions: [
          'What are the symptoms of heart disease?',
          'How does CardioAI predict risk?',
          'What is SHAP?',
        ],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    const reset = chatService.clearHistory()
    setMessages(reset)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed z-50 bottom-18 sm:bottom-20 right-3 sm:right-6 w-[calc(100vw-24px)] max-w-[calc(100vw-24px)] ${
            isExpanded
              ? 'sm:w-[480px] h-[min(620px,calc(100dvh-95px))]'
              : 'sm:w-[390px] h-[min(480px,calc(100dvh-95px))]'
          } max-h-[calc(100dvh-95px)] flex flex-col bg-white dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-2xl overflow-hidden font-sans transition-all duration-200`}
          role="dialog"
          aria-modal="true"
          aria-label="CardioAI Assistant"
        >
          {/* Header */}
          <ChatHeader
            onMinimize={onMinimize}
            onClose={onClose}
            onClear={handleClear}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />

          {/* Conversation Message List */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1 bg-gradient-to-b from-slate-50 via-slate-50 to-white dark:from-navy-950 dark:via-navy-950 dark:to-navy-900 scroll-smooth"
          >
            {messages.map((msg, index) => {
              const isLatestAssistant =
                msg.role === 'assistant' &&
                index ===
                  messages.map((m) => m.role).lastIndexOf('assistant')

              return (
                <div key={msg.id}>
                  <ChatMessage
                    message={msg}
                    onSelectSuggestion={handleSend}
                    onCloseChat={onClose}
                    isLatestAssistant={isLatestAssistant}
                    disabled={isLoading}
                  />

                  {/* If this is the welcome message and no user messages follow yet, show suggested questions */}
                  {msg.id === WELCOME_MESSAGE.id && messages.length === 1 && (
                    <div className="pl-9 pr-2 mb-2">
                      <SuggestedQuestions
                        questions={INITIAL_SUGGESTIONS}
                        onSelect={handleSend}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Thinking Indicator */}
            {isLoading && (
              <div className="pl-1">
                <TypingIndicator />
              </div>
            )}
          </div>

          {/* Input & Medical Disclaimer */}
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
