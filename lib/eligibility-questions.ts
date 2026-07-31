export interface EligibilityQuestion {
  id: string
  question: string
  type: 'select' | 'radio' | 'number' | 'text'
  options?: { label: string; value: string }[]
  category: string
}

export interface UserResponse {
  questionId: string
  answer: string
}

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    id: 'age',
    question: 'What is your age?',
    type: 'number',
    category: 'personal',
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'radio',
    category: 'personal',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'state',
    question: 'Which state are you from?',
    type: 'select',
    category: 'location',
    options: [
      { label: 'Andhra Pradesh', value: 'AP' },
      { label: 'Arunachal Pradesh', value: 'AR' },
      { label: 'Assam', value: 'AS' },
      { label: 'Bihar', value: 'BR' },
      { label: 'Chhattisgarh', value: 'CG' },
      { label: 'Goa', value: 'GA' },
      { label: 'Gujarat', value: 'GJ' },
      { label: 'Haryana', value: 'HR' },
      { label: 'Himachal Pradesh', value: 'HP' },
      { label: 'Jharkhand', value: 'JH' },
      { label: 'Karnataka', value: 'KA' },
      { label: 'Kerala', value: 'KL' },
      { label: 'Madhya Pradesh', value: 'MP' },
      { label: 'Maharashtra', value: 'MH' },
      { label: 'Manipur', value: 'MN' },
      { label: 'Meghalaya', value: 'ML' },
      { label: 'Mizoram', value: 'MZ' },
      { label: 'Nagaland', value: 'NL' },
      { label: 'Odisha', value: 'OD' },
      { label: 'Punjab', value: 'PB' },
      { label: 'Rajasthan', value: 'RJ' },
      { label: 'Sikkim', value: 'SK' },
      { label: 'Tamil Nadu', value: 'TN' },
      { label: 'Telangana', value: 'TG' },
      { label: 'Tripura', value: 'TR' },
      { label: 'Uttar Pradesh', value: 'UP' },
      { label: 'Uttarakhand', value: 'UT' },
      { label: 'West Bengal', value: 'WB' },
    ],
  },
  {
    id: 'occupation',
    question: 'What is your primary occupation?',
    type: 'radio',
    category: 'professional',
    options: [
      { label: 'Student', value: 'student' },
      { label: 'Farmer', value: 'farmer' },
      { label: 'Business Owner', value: 'business_owner' },
      { label: 'Employed', value: 'employed' },
      { label: 'Self-Employed', value: 'self_employed' },
      { label: 'Unemployed', value: 'unemployed' },
      { label: 'Homemaker', value: 'homemaker' },
      { label: 'Senior Citizen', value: 'senior_citizen' },
    ],
  },
  {
    id: 'income',
    question: 'What is your annual family income?',
    type: 'radio',
    category: 'financial',
    options: [
      { label: 'Below ₹1 lakh', value: '0-100000' },
      { label: '₹1 lakh - ₹3 lakh', value: '100000-300000' },
      { label: '₹3 lakh - ₹6 lakh', value: '300000-600000' },
      { label: '₹6 lakh - ₹10 lakh', value: '600000-1000000' },
      { label: 'Above ₹10 lakh', value: '1000000+' },
    ],
  },
  {
    id: 'education',
    question: 'What is your highest education level?',
    type: 'radio',
    category: 'education',
    options: [
      { label: 'Below 10th', value: 'below_10' },
      { label: '10th Pass', value: '10th' },
      { label: '12th Pass', value: '12th' },
      { label: 'Diploma', value: 'diploma' },
      { label: 'Bachelor\'s', value: 'bachelor' },
      { label: 'Master\'s', value: 'master' },
      { label: 'Professional Degree', value: 'professional' },
    ],
  },
  {
    id: 'disability',
    question: 'Do you have any registered disability?',
    type: 'radio',
    category: 'health',
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes - Physical', value: 'physical' },
      { label: 'Yes - Visual', value: 'visual' },
      { label: 'Yes - Hearing', value: 'hearing' },
      { label: 'Yes - Mental', value: 'mental' },
      { label: 'Yes - Multiple', value: 'multiple' },
    ],
  },
  {
    id: 'category',
    question: 'What is your social category?',
    type: 'radio',
    category: 'demographic',
    options: [
      { label: 'General', value: 'general' },
      { label: 'SC (Scheduled Caste)', value: 'sc' },
      { label: 'ST (Scheduled Tribe)', value: 'st' },
      { label: 'OBC (Other Backward Class)', value: 'obc' },
    ],
  },
  {
    id: 'business_type',
    question: 'Do you own a business or startup?',
    type: 'radio',
    category: 'professional',
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes - Micro (Annual turnover < ₹5 crore)', value: 'micro' },
      { label: 'Yes - Small (Annual turnover ₹5-50 crore)', value: 'small' },
      { label: 'Yes - Medium (Annual turnover > ₹50 crore)', value: 'medium' },
    ],
  },
]

export function calculateEligibilityScore(responses: UserResponse[], scheme: any): number {
  let score = 0
  let totalChecks = 0

  // Check age
  const ageResponse = responses.find(r => r.questionId === 'age')
  if (ageResponse) {
    const age = parseInt(ageResponse.answer)
    totalChecks++

    const ageRanges = scheme.eligibility.filter((e: string) => e.includes('age') || e.includes('Age'))
    if (ageRanges.length > 0) {
      if (
        (ageRanges[0].includes('15-45') && age >= 15 && age <= 45) ||
        (ageRanges[0].includes('18-50') && age >= 18 && age <= 50) ||
        (ageRanges[0].includes('21-55') && age >= 21 && age <= 55) ||
        (ageRanges[0].includes('18-65') && age >= 18 && age <= 65) ||
        age >= 18
      ) {
        score += 10
      }
    } else {
      score += 10
    }
  }

  // Check income
  const incomeResponse = responses.find(r => r.questionId === 'income')
  if (incomeResponse) {
    totalChecks++
    const incomeMatch = scheme.eligibility.find((e: string) => e.includes('income') || e.includes('Income'))
    if (incomeMatch) {
      if (
        (incomeMatch.includes('₹6 lakh') && incomeResponse.answer.includes('0-600000')) ||
        (incomeMatch.includes('₹8 lakh') && ['0-100000', '100000-300000', '300000-600000'].includes(incomeResponse.answer)) ||
        (incomeMatch.includes('₹10 lakh') && ['0-100000', '100000-300000', '300000-600000', '600000-1000000'].includes(incomeResponse.answer))
      ) {
        score += 15
      }
    } else {
      score += 15
    }
  }

  // Check occupation
  const occupationResponse = responses.find(r => r.questionId === 'occupation')
  if (occupationResponse) {
    totalChecks++
    const occupationMatch = scheme.eligibility.find((e: string) => e.toLowerCase().includes('farmer') || e.toLowerCase().includes('student'))

    if (occupationMatch) {
      if (
        (occupationMatch.toLowerCase().includes('farmer') && occupationResponse.answer === 'farmer') ||
        (occupationMatch.toLowerCase().includes('student') && occupationResponse.answer === 'student') ||
        (occupationMatch.toLowerCase().includes('entrepreneur') && occupationResponse.answer === 'business_owner') ||
        (occupationMatch.toLowerCase().includes('individual') && occupationResponse.answer === 'self_employed')
      ) {
        score += 20
      } else if (occupationMatch) {
        score += 5
      }
    } else {
      score += 20
    }
  }

  // Check education
  const educationResponse = responses.find(r => r.questionId === 'education')
  if (educationResponse) {
    totalChecks++
    const educationMatch = scheme.eligibility.find((e: string) => e.includes('educational') || e.includes('Education'))
    if (educationMatch) {
      score += 10
    } else {
      score += 10
    }
  }

  // Check category
  const categoryResponse = responses.find(r => r.questionId === 'category')
  if (categoryResponse) {
    totalChecks++
    const categoryMatch = scheme.eligibility.find((e: string) => e.includes('SC') || e.includes('ST') || e.includes('OBC'))
    if (categoryMatch && categoryResponse.answer !== 'general') {
      score += 15
    } else if (!categoryMatch) {
      score += 15
    }
  }

  // Calculate percentage
  const maxScore = totalChecks * 15 + 20 + 15 + 10
  return Math.min(100, Math.round((score / maxScore) * 100))
}
