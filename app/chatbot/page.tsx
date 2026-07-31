'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getRecommendedSchemes } from '@/lib/recommendation-engine'
import { saveUserResponses } from '@/lib/storage'
import { User } from '@/lib/types'
import { Send, ArrowLeft, CheckCircle } from 'lucide-react'

const ELIGIBILITY_QUESTIONS = [
  { key: 'age', question: 'What is your age?', type: 'number', placeholder: 'Enter your age' },
  { key: 'gender', question: 'What is your gender?', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
  { key: 'state', question: 'Which state are you from?', type: 'select', options: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'] },
  { key: 'isFarmer', question: 'Are you a farmer or engaged in agriculture?', type: 'boolean' },
  { key: 'isStudent', question: 'Are you currently a student?', type: 'boolean' },
  { key: 'annualIncome', question: 'What is your approximate annual family income?', type: 'select', options: ['Below ₹3 lakh', '₹3-6 lakh', '₹6-10 lakh', '₹10-15 lakh', 'Above ₹15 lakh'] },
  { key: 'disability', question: 'Do you have any disability?', type: 'select', options: ['None', 'Physical', 'Visual', 'Hearing', 'Intellectual', 'Multiple', 'Prefer not to say'] },
  { key: 'isBusinessOwner', question: 'Are you a business owner or self-employed?', type: 'boolean' },
  { key: 'isSeniorCitizen', question: 'Are you a senior citizen (60 years or above)?', type: 'boolean' },
  { key: 'educationLevel', question: 'What is your highest education level?', type: 'select', options: ['Below 10th', '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Postgraduate', 'Other'] },
]

export default function ChatbotPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [stage, setStage] = useState<'questions' | 'results'>('questions')
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
    } else {
      setUser(currentUser)
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [responses])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleAnswerSubmit()
    }
  }

  const handleAnswerSubmit = () => {
    if (!inputValue.trim()) return

    const currentQuestion = ELIGIBILITY_QUESTIONS[currentQuestionIndex]
    const key = currentQuestion.key

    let value: any = inputValue

    // Parse income ranges to numeric values
    if (key === 'annualIncome') {
      const incomeMap: Record<string, number> = {
        'Below ₹3 lakh': 200000,
        '₹3-6 lakh': 450000,
        '₹6-10 lakh': 800000,
        '₹10-15 lakh': 1200000,
        'Above ₹15 lakh': 1600000,
      }
      value = incomeMap[value] || 0
    }

    // Parse age to number
    if (key === 'age') {
      value = parseInt(value, 10)
      if (isNaN(value) || value < 0 || value > 150) {
        setInputValue('')
        return
      }
    }

    // Handle disability selection
    if (key === 'disability') {
      value = value === 'None' ? undefined : value
    }

    setResponses((prev) => ({ ...prev, [key]: value }))
    setInputValue('')

    if (currentQuestionIndex < ELIGIBILITY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      generateRecommendations({ ...responses, [key]: value })
    }
  }

  const generateRecommendations = (userResponses: Record<string, any>) => {
    const userProfile: User = {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      age: userResponses.age,
      gender: userResponses.gender,
      state: userResponses.state,
      isFarmer: userResponses.isFarmer,
      isStudent: userResponses.isStudent,
      annualIncome: userResponses.annualIncome,
      disability: userResponses.disability,
      isBusinessOwner: userResponses.isBusinessOwner,
      isSeniorCitizen: userResponses.isSeniorCitizen,
      educationLevel: userResponses.educationLevel,
    }

    const recommended = getRecommendedSchemes(userProfile)
    setRecommendations(recommended)
    setStage('results')
    
    // Save responses
    saveUserResponses(user?.id, userResponses)
  }

  const handleSkipQuestion = () => {
    setResponses((prev) => ({ ...prev, [ELIGIBILITY_QUESTIONS[currentQuestionIndex].key]: null }))
    if (currentQuestionIndex < ELIGIBILITY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      generateRecommendations(responses)
    }
  }

  const handleRestart = () => {
    setResponses({})
    setCurrentQuestionIndex(0)
    setStage('questions')
    setRecommendations([])
    setInputValue('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (stage === 'results') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Your Personalized Recommendations</h1>
              <p className="text-foreground/70">
                Based on your profile, we found {recommendations.length} schemes you may be eligible for
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-card rounded-lg transition flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            {recommendations.length > 0 ? (
              recommendations.map((scheme, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{scheme.name}</h3>
                      <p className="text-sm text-foreground/70">{scheme.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <p className="font-bold text-primary text-lg">{scheme.matchScore}%</p>
                        <p className="text-xs text-foreground/70">Match</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-4">{scheme.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground/70 mb-2">Why You Qualify</h4>
                      <div className="space-y-1">
                        {scheme.matchedCriteria.slice(0, 3).map((criteria, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            {criteria}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground/70 mb-2">Key Benefits</h4>
                      <div className="space-y-1">
                        {scheme.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6">
                    <p className="text-sm">
                      <strong>Financial Assistance:</strong> {scheme.financialAssistance}
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Application Deadline:</strong> {scheme.applicationDeadline}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
                      Get Details
                    </button>
                    <button className="px-6 py-2 rounded-lg border border-border hover:bg-background transition">
                      Save Scheme
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">No schemes found matching your profile</p>
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-2 rounded-lg border border-border hover:bg-background transition"
            >
              Retake Assessment
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = ELIGIBILITY_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / ELIGIBILITY_QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-foreground">
              Question {currentQuestionIndex + 1} of {ELIGIBILITY_QUESTIONS.length}
            </div>
            <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">{currentQuestion.question}</h2>
            <p className="text-foreground/70">Your response will help us find schemes perfectly matched to your needs</p>
          </div>

          {/* Question Input */}
          <div className="space-y-4">
            {currentQuestion.type === 'number' && (
              <div className="flex gap-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={currentQuestion.placeholder}
                  className="flex-1 px-4 py-4 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  autoFocus
                  min="0"
                  max="150"
                />
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!inputValue.trim()}
                  className="px-6 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}

            {currentQuestion.type === 'select' && (
              <div>
                <select
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                  autoFocus
                >
                  <option value="">Select an option</option>
                  {currentQuestion.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!inputValue.trim()}
                  className="w-full mt-4 px-6 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Continue
                </button>
              </div>
            )}

            {currentQuestion.type === 'boolean' && (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setInputValue('Yes')
                    setResponses((prev) => ({ ...prev, [currentQuestion.key]: true }))
                    if (currentQuestionIndex < ELIGIBILITY_QUESTIONS.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                    } else {
                      generateRecommendations({ ...responses, [currentQuestion.key]: true })
                    }
                  }}
                  className="flex-1 px-6 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition font-semibold text-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setInputValue('No')
                    setResponses((prev) => ({ ...prev, [currentQuestion.key]: false }))
                    if (currentQuestionIndex < ELIGIBILITY_QUESTIONS.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1)
                    } else {
                      generateRecommendations({ ...responses, [currentQuestion.key]: false })
                    }
                  }}
                  className="flex-1 px-6 py-4 rounded-lg border border-border hover:bg-background transition font-semibold text-lg"
                >
                  No
                </button>
              </div>
            )}

            {/* Skip Button */}
            <button
              onClick={handleSkipQuestion}
              className="w-full px-4 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-background transition text-sm"
            >
              Skip this question
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
