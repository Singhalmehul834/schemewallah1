'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronRight, BarChart3, Star, AlertCircle } from 'lucide-react'
import { ELIGIBILITY_QUESTIONS, UserResponse, calculateEligibilityScore } from '@/lib/eligibility-questions'
import { SCHEMES } from '@/lib/schemes-data'

export default function EligibilityCheckerPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<UserResponse[]>([])
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = ELIGIBILITY_QUESTIONS[currentStep]

  const handleAnswer = (answer: string) => {
    const newResponses = responses.filter(r => r.questionId !== currentQuestion.id)
    newResponses.push({ questionId: currentQuestion.id, answer })
    setResponses(newResponses)

    if (currentStep < ELIGIBILITY_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const recommendedSchemes = useMemo(() => {
    if (!showResults) return []

    const scored = SCHEMES.map(scheme => ({
      ...scheme,
      score: calculateEligibilityScore(responses, scheme),
    }))

    return scored.filter(s => s.score > 40).sort((a, b) => b.score - a.score)
  }, [showResults, responses])

  const progress = showResults ? 100 : Math.round(((currentStep + 1) / ELIGIBILITY_QUESTIONS.length) * 100)

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold gradient-text mb-2">Your Recommended Schemes</h1>
            <p className="text-foreground/60">Based on your eligibility, here are schemes you can apply for</p>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {recommendedSchemes.length > 0 ? (
            <>
              {/* Summary */}
              <div className="card-premium p-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Schemes Matched</p>
                  <p className="text-4xl font-bold gradient-text">{recommendedSchemes.length}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Average Match Score</p>
                  <p className="text-4xl font-bold gradient-text">
                    {Math.round(recommendedSchemes.reduce((a, b) => a + b.score, 0) / recommendedSchemes.length)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Total Financial Assistance</p>
                  <p className="text-lg font-bold text-secondary">Multiple Options Available</p>
                </div>
              </div>

              {/* Schemes List */}
              <div className="space-y-6">
                {recommendedSchemes.map(scheme => (
                  <div key={scheme.id} className="card-premium p-6 hover-lift">
                    {/* Top Bar */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{scheme.name}</h3>
                        <p className="text-sm text-foreground/60">{scheme.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-lg">
                          <Star className="w-5 h-5 text-secondary fill-secondary" />
                          <span className="font-bold text-secondary">{scheme.score}% Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Visualization */}
                    <div className="mb-4">
                      <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-500"
                          style={{ width: `${scheme.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-border/30 mb-4">
                      <div>
                        <p className="text-xs text-foreground/50 mb-1">Financial Assistance</p>
                        <p className="font-semibold text-foreground">{scheme.financialAssistance}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 mb-1">Deadline</p>
                        <p className="font-semibold text-foreground">{scheme.applicationDeadline}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground/50 mb-1">Documents Needed</p>
                        <p className="font-semibold text-foreground">{scheme.requiredDocuments.length} documents</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/60 mb-4">{scheme.description}</p>

                    {/* Why Eligible */}
                    <div className="bg-foreground/5 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-foreground mb-2">Why you&apos;re eligible:</p>
                      <ul className="space-y-2">
                        {scheme.eligibility.slice(0, 3).map((criterion, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/70">
                            <Check className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Link href={`/scheme/${scheme.id}`} className="btn-primary flex-1">
                        View Full Details
                      </Link>
                      <Link href="/document-checker" className="btn-secondary flex-1">
                        Check Documents
                      </Link>
                      <button className="px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-medium">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card-premium p-12 text-center">
              <AlertCircle className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
              <p className="text-foreground/60 mb-4">No schemes matched based on your responses</p>
              <button
                onClick={() => {
                  setCurrentStep(0)
                  setResponses([])
                  setShowResults(false)
                }}
                className="btn-primary"
              >
                Retake Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50"></div>
              <div className="relative bg-background p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Eligibility Checker</h1>
              <p className="text-sm text-foreground/60 mt-1">Step {currentStep + 1} of {ELIGIBILITY_QUESTIONS.length}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-foreground/60">Your Progress</p>
            <p className="text-sm font-semibold text-foreground">{progress}%</p>
          </div>
          <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card-premium p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">{currentQuestion.question}</h2>

          {currentQuestion.type === 'number' && (
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Enter your age..."
                className="input-premium flex-1"
                onKeyPress={e => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    handleAnswer(e.currentTarget.value)
                  }
                }}
              />
              <button
                onClick={e => {
                  const input = (e.currentTarget.previousElementSibling as HTMLInputElement)
                  if (input.value) {
                    handleAnswer(input.value)
                  }
                }}
                className="btn-primary px-6"
              >
                Next
              </button>
            </div>
          )}

          {(currentQuestion.type === 'radio' || currentQuestion.type === 'select') && (
            <div className="space-y-3">
              {currentQuestion.options?.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 rounded-lg border-2 border-border/50 hover:border-primary hover:bg-primary/5 transition-all text-left font-medium text-foreground hover:text-primary group"
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1)
              }
            }}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            Previous
          </button>

          {currentStep === ELIGIBILITY_QUESTIONS.length - 1 && (
            <button
              onClick={() => setShowResults(true)}
              className="btn-primary flex-1"
            >
              Get Recommendations
            </button>
          )}
        </div>

        {/* Question Indicators */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {ELIGIBILITY_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentStep(idx)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                idx === currentStep
                  ? 'bg-primary text-white shadow-lg scale-110'
                  : responses.some(r => r.questionId === q.id)
                    ? 'bg-secondary/20 text-secondary border border-secondary/50'
                    : 'bg-foreground/10 text-foreground/50'
              }`}
            >
              {responses.some(r => r.questionId === q.id) ? <Check className="w-5 h-5 mx-auto" /> : idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
