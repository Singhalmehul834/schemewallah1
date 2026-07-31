import { SavedScheme } from './types'

const SAVED_SCHEMES_KEY = 'scheme_wallah_saved_schemes'
const CHAT_HISTORY_KEY = 'scheme_wallah_chat_history'

export function getSavedSchemes(userId: string): SavedScheme[] {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem(SAVED_SCHEMES_KEY)
  if (!saved) return []
  
  const allSaved: SavedScheme[] = JSON.parse(saved)
  return allSaved.filter((s) => s.userId === userId)
}

export function saveScheme(userId: string, schemeId: string, status: 'saved' | 'applied' | 'completed' = 'saved'): void {
  if (typeof window === 'undefined') return
  
  const saved = localStorage.getItem(SAVED_SCHEMES_KEY)
  const allSaved: SavedScheme[] = saved ? JSON.parse(saved) : []

  const existingIndex = allSaved.findIndex((s) => s.userId === userId && s.schemeId === schemeId)

  const newSavedScheme: SavedScheme = {
    userId,
    schemeId,
    savedAt: new Date().toISOString(),
    status,
  }

  if (existingIndex >= 0) {
    allSaved[existingIndex] = newSavedScheme
  } else {
    allSaved.push(newSavedScheme)
  }

  localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(allSaved))
}

export function isSchemesSaved(userId: string, schemeId: string): boolean {
  const saved = getSavedSchemes(userId)
  return saved.some((s) => s.schemeId === schemeId)
}

export function unsaveScheme(userId: string, schemeId: string): void {
  if (typeof window === 'undefined') return
  
  const saved = localStorage.getItem(SAVED_SCHEMES_KEY)
  if (!saved) return

  const allSaved: SavedScheme[] = JSON.parse(saved)
  const filtered = allSaved.filter((s) => !(s.userId === userId && s.schemeId === schemeId))

  localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(filtered))
}

export function updateSchemeStatus(
  userId: string,
  schemeId: string,
  status: 'saved' | 'applied' | 'completed'
): void {
  if (typeof window === 'undefined') return
  
  const saved = localStorage.getItem(SAVED_SCHEMES_KEY)
  if (!saved) return

  const allSaved: SavedScheme[] = JSON.parse(saved)
  const scheme = allSaved.find((s) => s.userId === userId && s.schemeId === schemeId)

  if (scheme) {
    scheme.status = status
    localStorage.setItem(SAVED_SCHEMES_KEY, JSON.stringify(allSaved))
  }
}

export function getChatHistory(sessionId: string): any[] {
  if (typeof window === 'undefined') return []
  const history = localStorage.getItem(`${CHAT_HISTORY_KEY}_${sessionId}`)
  return history ? JSON.parse(history) : []
}

export function saveChatMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): void {
  if (typeof window === 'undefined') return
  
  const key = `${CHAT_HISTORY_KEY}_${sessionId}`
  const history = getChatHistory(sessionId)

  history.push({
    id: `msg_${Date.now()}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  })

  localStorage.setItem(key, JSON.stringify(history))
}

export function clearChatHistory(sessionId: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(`${CHAT_HISTORY_KEY}_${sessionId}`)
}

export function getUserResponses(userId: string): Record<string, any> {
  if (typeof window === 'undefined') return {}
  const responses = localStorage.getItem(`scheme_wallah_responses_${userId}`)
  return responses ? JSON.parse(responses) : {}
}

export function saveUserResponses(userId: string, responses: Record<string, any>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`scheme_wallah_responses_${userId}`, JSON.stringify(responses))
}

export function clearUserResponses(userId: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(`scheme_wallah_responses_${userId}`)
}
