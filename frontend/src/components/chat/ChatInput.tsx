import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setSpeechSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        if (transcript) {
          setText((prev) => (prev ? `${prev} ${transcript}` : transcript))
        }
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        setIsListening(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // Auto-expand textarea up to max 100px
    const target = e.target
    target.style.height = 'auto'
    target.style.height = `${Math.min(target.scrollHeight, 100)}px`
  }

  return (
    <div className="p-3 bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 rounded-b-2xl">
      <div className="relative flex items-end gap-1.5 bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-crimson-500/20 focus-within:border-crimson-500 transition-all">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={isListening ? 'Listening... speak now' : 'Ask me anything about heart health...'}
          rows={1}
          className="w-full text-xs sm:text-[13px] bg-transparent text-slate-800 dark:text-navy-100 placeholder-slate-400 dark:placeholder-navy-400 resize-none px-2.5 py-1.5 focus:outline-hidden max-h-24 leading-relaxed disabled:opacity-50"
        />

        <div className="flex items-center gap-1 self-end pb-0.5">
          {speechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              disabled={disabled}
              title={isListening ? 'Stop voice input' : 'Voice input'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isListening
                  ? 'bg-crimson-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-crimson-600 hover:bg-slate-200 dark:hover:bg-navy-800'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim() || disabled}
            aria-label="Send message"
            className="p-1.5 bg-crimson-600 hover:bg-crimson-700 disabled:bg-slate-200 dark:disabled:bg-navy-800 text-white disabled:text-slate-400 dark:disabled:text-navy-500 rounded-lg transition-all duration-150 cursor-pointer disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Required Medical Disclaimer */}
      <p className="text-[10px] text-slate-400 dark:text-navy-400 text-center mt-2 leading-tight px-1 select-none">
        CardioAI Assistant provides educational and research information and is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
    </div>
  )
}
