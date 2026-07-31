export interface User {
  id: string
  email: string
  name: string
  age?: number
  gender?: string
  state?: string
  district?: string
  occupation?: string
  isStudent?: boolean
  isFarmer?: boolean
  annualIncome?: number
  disability?: string
  isBusinessOwner?: boolean
  isSeniorCitizen?: boolean
  educationLevel?: string
}

export interface Scheme {
  id: string
  name: string
  department: string
  description: string
  eligibility: string[]
  benefits: string[]
  financialAssistance: string
  requiredDocuments: string[]
  applicationDeadline: string
  targetAudience: string[]
  category: string
  state?: string
  applicationUrl?: string
  contactPhone?: string
  emailId?: string
}

export interface UserResponse {
  question: string
  answer: string
  category: string
}

export interface RecommendedScheme extends Scheme {
  matchScore: number
  matchedCriteria: string[]
}

export interface SavedScheme {
  userId: string
  schemeId: string
  savedAt: string
  status: 'saved' | 'applied' | 'completed'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
