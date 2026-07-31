import { User } from './types'

const USERS_KEY = 'scheme_wallah_users'
const CURRENT_USER_KEY = 'scheme_wallah_current_user'
const GUEST_ID = 'guest_user'

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function saveUser(user: User): void {
  if (typeof window === 'undefined') return
  const users = getAllUsers()
  const existingIndex = users.findIndex((u) => u.id === user.id)

  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getUserById(id: string): User | null {
  if (typeof window === 'undefined') return null
  const users = getAllUsers()
  return users.find((u) => u.id === id) || null
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const currentUserId = localStorage.getItem(CURRENT_USER_KEY)
  if (!currentUserId) return null
  return getUserById(currentUserId)
}

export function setCurrentUser(userId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CURRENT_USER_KEY, userId)
}

export function logout(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers()
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  // In a real app, this would hash the password
  if (password.length < 6) {
    return { success: false, error: 'Invalid password' }
  }

  setCurrentUser(user.id)
  return { success: true, user }
}

export function signupUser(email: string, password: string, name: string): {
  success: boolean
  user?: User
  error?: string
} {
  const users = getAllUsers()

  if (users.some((u) => u.email === email)) {
    return { success: false, error: 'Email already exists' }
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' }
  }

  if (!email.includes('@')) {
    return { success: false, error: 'Invalid email address' }
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
    name,
  }

  saveUser(newUser)
  setCurrentUser(newUser.id)
  return { success: true, user: newUser }
}

export function loginAsGuest(): User {
  const guestUser: User = {
    id: GUEST_ID,
    email: 'guest@schemewallah.local',
    name: 'Guest User',
  }

  setCurrentUser(GUEST_ID)
  return guestUser
}

export function isGuestUser(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CURRENT_USER_KEY) === GUEST_ID
}

export function updateUserProfile(userId: string, updates: Partial<User>): { success: boolean; user?: User; error?: string } {
  const user = getUserById(userId)

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  const updatedUser = { ...user, ...updates }
  saveUser(updatedUser)

  // If this is the current user, update the reference
  if (getCurrentUser()?.id === userId) {
    setCurrentUser(userId)
  }

  return { success: true, user: updatedUser }
}
