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
  requiredDocuments: Document[]
  applicationDeadline: string
  targetAudience: string[]
  category: string
  state?: string
  applicationUrl?: string
  contactPhone?: string
  emailId?: string
  image?: string
  detailedInfo?: string
  applicationProcess?: string[]
  faq?: FAQ[]
}

export interface Document {
  name: string
  description: string
  optional?: boolean
}

export interface FAQ {
  question: string
  answer: string
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
  schemeContext?: string
}

export interface ApplicationTracker {
  id: string
  userId: string
  schemeId: string
  schemeName: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'completed'
  submittedDate: string
  updatedDate: string
  progress: number
  documents: ApplicationDocument[]
  notes?: string
}

export interface ApplicationDocument {
  id: string
  name: string
  status: 'pending' | 'submitted' | 'verified'
  uploadedAt?: string
}

export interface SchemeCategory {
  id: string
  name: string
  description: string
  icon: string
}
