import { User, Scheme, RecommendedScheme } from './types'
import { SCHEMES } from './schemes-data'

interface MatchCriteria {
  criteria: string
  weight: number
  check: (user: User, scheme: Scheme) => boolean
}

const MATCHING_CRITERIA: MatchCriteria[] = [
  {
    criteria: 'Age eligibility',
    weight: 2,
    check: (user, scheme) => {
      if (!user.age) return true
      const eligText = scheme.eligibility.join(' ').toLowerCase()
      if (user.age >= 60 && eligText.includes('senior')) return true
      if (user.age < 18 && eligText.includes('student')) return true
      if (user.age >= 18 && user.age <= 45 && eligText.includes('youth')) return true
      if (!eligText.match(/\d+/)) return true
      return false
    },
  },
  {
    criteria: 'Farmer status match',
    weight: 2.5,
    check: (user, scheme) =>
      user.isFarmer ? scheme.targetAudience.includes('Farmers') : true,
  },
  {
    criteria: 'Student status match',
    weight: 2,
    check: (user, scheme) =>
      user.isStudent ? scheme.targetAudience.includes('Students') || scheme.category === 'Education' : true,
  },
  {
    criteria: 'Women entrepreneur eligibility',
    weight: 2.5,
    check: (user, scheme) => {
      if (!user.isBusinessOwner) return true
      if (user.gender === 'Female' && scheme.targetAudience.includes('Women Entrepreneurs')) return true
      if (scheme.targetAudience.includes('Entrepreneurs')) return true
      return false
    },
  },
  {
    criteria: 'Senior citizen benefits',
    weight: 2,
    check: (user, scheme) =>
      user.isSeniorCitizen ? scheme.targetAudience.includes('Senior Citizens') || scheme.category === 'Social Security' : true,
  },
  {
    criteria: 'Disability support',
    weight: 2.5,
    check: (user, scheme) =>
      user.disability ? scheme.targetAudience.includes('Disabled') || scheme.category.includes('Disability') : true,
  },
  {
    criteria: 'Income level match',
    weight: 2,
    check: (user, scheme) => {
      if (!user.annualIncome) return true
      if (user.annualIncome <= 300000) return true
      return false
    },
  },
  {
    criteria: 'Occupation match',
    weight: 1.5,
    check: (user, scheme) => {
      if (!user.occupation) return true
      const relevantCategories = ['Employment', 'Skill Development', 'Business & Employment']
      return relevantCategories.includes(scheme.category)
    },
  },
  {
    criteria: 'Location eligibility',
    weight: 1,
    check: (user, scheme) =>
      !scheme.state || scheme.state === user.state || !user.state,
  },
]

export function getRecommendedSchemes(user: User): RecommendedScheme[] {
  const recommendedSchemes: RecommendedScheme[] = []

  for (const scheme of SCHEMES) {
    let totalScore = 0
    const matchedCriteria: string[] = []

    for (const criteria of MATCHING_CRITERIA) {
      if (criteria.check(user, scheme)) {
        totalScore += criteria.weight
        matchedCriteria.push(criteria.criteria)
      }
    }

    const maxScore = MATCHING_CRITERIA.reduce((sum, c) => sum + c.weight, 0)
    const matchScore = (totalScore / maxScore) * 100

    if (matchScore >= 40) {
      recommendedSchemes.push({
        ...scheme,
        matchScore: Math.round(matchScore),
        matchedCriteria,
      })
    }
  }

  return recommendedSchemes.sort((a, b) => b.matchScore - a.matchScore)
}

export function searchSchemes(query: string): Scheme[] {
  const lowerQuery = query.toLowerCase()
  return SCHEMES.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(lowerQuery) ||
      scheme.description.toLowerCase().includes(lowerQuery) ||
      scheme.category.toLowerCase().includes(lowerQuery) ||
      scheme.targetAudience.some((a) => a.toLowerCase().includes(lowerQuery))
  )
}

export function getSchemesByCategory(category: string): Scheme[] {
  return SCHEMES.filter((scheme) => scheme.category === category)
}

export function getAllCategories(): string[] {
  const categories = new Set(SCHEMES.map((s) => s.category))
  return Array.from(categories).sort()
}

export function getSchemeById(id: string): Scheme | undefined {
  return SCHEMES.find((scheme) => scheme.id === id)
}

export function calculateEligibilityScore(user: User, scheme: Scheme): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // Age check
  if (user.age) {
    if (user.age >= 60) {
      score += 10
      reasons.push('Senior citizen')
    } else if (user.age >= 18 && user.age <= 45) {
      score += 5
      reasons.push('Youth category')
    } else if (user.age < 18) {
      score += 5
      reasons.push('Student category')
    }
  }

  // Income check
  if (user.annualIncome) {
    if (user.annualIncome <= 300000) {
      score += 15
      reasons.push('Low income category')
    } else if (user.annualIncome <= 600000) {
      score += 10
      reasons.push('Lower middle income')
    } else if (user.annualIncome <= 1000000) {
      score += 5
      reasons.push('Middle income')
    }
  }

  // Occupation/Status checks
  if (user.isFarmer) {
    score += 10
    reasons.push('Farmer status')
  }

  if (user.isStudent) {
    score += 10
    reasons.push('Student status')
  }

  if (user.disability) {
    score += 15
    reasons.push('Disability support eligible')
  }

  if (user.isSeniorCitizen) {
    score += 15
    reasons.push('Senior citizen benefits')
  }

  if (user.isBusinessOwner && user.gender === 'Female') {
    score += 12
    reasons.push('Women entrepreneur')
  }

  return { score: Math.min(score, 100), reasons }
}
