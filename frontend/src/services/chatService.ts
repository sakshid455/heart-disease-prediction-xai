/**
 * CardioAI Chat Assistant Service
 * Manages conversational state, session persistence, and API calls.
 */

export interface ChatAction {
  label: string
  route: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  action?: ChatAction | null
  suggestions?: string[]
  isError?: boolean
}

export interface ChatRequestPayload {
  message: string
  history: Array<{ role: string; content: string }>
  page_context: string
}

export interface ChatResponsePayload {
  response: string
  suggestions: string[]
  action: ChatAction | null
}

const STORAGE_KEY = 'cardioai_chat_session_history_v1'
const WELCOME_ID = 'welcome-message-cardioai'

export const INITIAL_SUGGESTIONS = [
  'What are the symptoms of heart disease?',
  'What are the major risk factors?',
  'How does CardioAI predict risk?',
  'What is SHAP?',
  'What is CTGAN?',
  'How does synthetic data help?',
  'How accurate is the model?',
]

export const WELCOME_MESSAGE: ChatMessage = {
  id: WELCOME_ID,
  role: 'assistant',
  content:
    "Hi! I'm CardioAI Assistant. I can help you understand heart disease, risk factors, symptoms, prevention, machine learning predictions, SHAP explanations, CTGAN, synthetic healthcare data, and this research project.",
  timestamp: 'Just now',
  suggestions: INITIAL_SUGGESTIONS,
}

export const chatService = {
  /**
   * Loads persisted conversation from sessionStorage, initializing with welcome message if empty.
   */
  getStoredMessages(): ChatMessage[] {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
      // Ignore sessionStorage read errors
    }
    return [WELCOME_MESSAGE]
  },

  /**
   * Persists message history into sessionStorage.
   */
  saveMessages(messages: ChatMessage[]): void {
    try {
      // Store at most 50 recent messages to keep sessionStorage lean
      const trimmed = messages.slice(-50)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    } catch {
      // Ignore quota/access errors
    }
  },

  /**
   * Resets conversation to initial welcome message.
   */
  clearHistory(): ChatMessage[] {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
    return [WELCOME_MESSAGE]
  },

  /**
   * Sends a message to the CardioAI backend conversational endpoint.
   */
  async sendMessage(
    message: string,
    history: ChatMessage[],
    pageContext: string
  ): Promise<ChatResponsePayload> {
    // Extract recent conversational context for multi-turn coherence
    const historyPayload = history
      .filter((m) => m.id !== WELCOME_ID && !m.isError)
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }))

    const payload: ChatRequestPayload = {
      message: message.trim(),
      history: historyPayload,
      page_context: pageContext,
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`)
      }

      const data: ChatResponsePayload = await res.json()
      return data
    } catch (err) {
      // Friendly healthcare fallback message if network fails
      return {
        response:
          "I'm having trouble connecting right now. Please try again in a moment.",
        suggestions: [
          'What are the symptoms of heart disease?',
          'How does CardioAI predict risk?',
          'What is SHAP?',
        ],
        action: null,
      }
    }
  },
}
