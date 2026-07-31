import { SCHEMES } from './schemes-data'

interface SchemeContext {
  schemeId?: string
  schemeName?: string
  context?: string
}

const commonQuestions: Record<string, string> = {
  // General questions
  'how many schemes': 'We have 1000+ government schemes available. Currently displaying 50+ schemes in our database. Each scheme has specific eligibility criteria.',
  'how to apply': 'The application process varies for each scheme. You can use our Eligibility Checker to find suitable schemes and then follow the application link provided with each scheme recommendation.',
  'documents needed': 'Different schemes require different documents. You can use our Document Checker to instantly find all required documents for any scheme.',
  'what are the benefits': 'Benefits vary by scheme - from financial assistance, subsidies, training, insurance to loans. Use our Eligibility Checker to see which schemes and benefits you qualify for.',
  'deadline': 'Application deadlines vary by scheme and state. Browse all schemes to see their deadlines, or use our Deadline tracker to get reminders.',
  'eligibility': 'Each scheme has different eligibility criteria based on age, income, occupation, etc. Our AI Eligibility Checker can help you find schemes you qualify for.',
  'cost': 'Many schemes are free to apply. Some may have minimal fees. Check individual scheme details for specific information.',
  'registration': 'Registration links are provided with each scheme recommendation. You can also register directly through state/central government portals.',
  'offline': 'You can apply offline at your nearest government office or through authorized banks. Details are available on each scheme page.',
  'duration': 'Scheme duration varies from ongoing schemes to those with specific validity periods. Check individual scheme details.',

  // Specific scheme support
  'pmkvy': 'Pradhan Mantri Kaushal Vikas Yojana offers free skill training to youth aged 15-45. It provides ₹8000 assistance, industry certification, and job placement help.',
  'mudra': 'Pradhan Mantri Mudra Yojana provides loans up to ₹10 lakh for startups and small businesses without requiring collateral.',
  'awas': 'Pradhan Mantri Awas Yojana helps with affordable housing. It offers ₹2.67 lakh subsidy and easy home loans for low-income families.',
  'scholarship': 'National Scholarship Portal offers ₹6000-₹50000 annual scholarships for meritorious students from economically weaker sections.',
  'jan dhan': 'Jan Dhan Yojana provides zero-balance bank accounts with ₹3 lakh insurance coverage (life ₹1 lakh + accident ₹2 lakh) to all citizens.',
  'fasal bima': 'Pradhan Mantri Fasal Bima Yojana is crop insurance for farmers. It covers crop losses due to natural calamities at affordable premiums.',

  // Support
  'help': 'I can help you with: 1) Finding suitable schemes 2) Understanding eligibility 3) Checking required documents 4) Tracking applications 5) Answer scheme-specific questions',
  'support': 'For technical support, contact our helpline. For scheme-specific queries, use the respective scheme contact number provided.',
  'contact': 'You can find contact numbers for each scheme on its detail page. For app support, check our help section.',
}

const schemeMappings: Record<string, string> = {
  'skill': 'scheme-001',
  'training': 'scheme-001',
  'job': 'scheme-001',
  'employment': 'scheme-007',
  'house': 'scheme-002',
  'home': 'scheme-002',
  'housing': 'scheme-002',
  'loan': 'scheme-006',
  'business': 'scheme-006',
  'startup': 'scheme-006',
  'mudra': 'scheme-006',
  'education': 'scheme-003',
  'scholarship': 'scheme-003',
  'student': 'scheme-003',
  'bank': 'scheme-004',
  'account': 'scheme-004',
  'finance': 'scheme-004',
  'farmer': 'scheme-005',
  'crop': 'scheme-005',
  'insurance': 'scheme-005',
  'women': 'scheme-008',
  'girl': 'scheme-008',
  'child': 'scheme-008',
  'wifi': 'scheme-009',
  'internet': 'scheme-009',
  'digital': 'scheme-009',
  'insurance': 'scheme-010',
  'life': 'scheme-010',
}

export function generateChatResponse(userMessage: string, context?: SchemeContext): { response: string; schemeContext?: SchemeContext } {
  const messageLower = userMessage.toLowerCase()

  // Check if user is asking about a specific scheme
  for (const [keyword, schemeId] of Object.entries(schemeMappings)) {
    if (messageLower.includes(keyword)) {
      const scheme = SCHEMES.find(s => s.id === schemeId)
      if (scheme) {
        let response = ''
        if (messageLower.includes('eligib')) {
          response = `For ${scheme.name}:\n\nEligibility:\n${scheme.eligibility.join('\n')}`
        } else if (messageLower.includes('benefit')) {
          response = `${scheme.name} offers:\n\n${scheme.benefits.join('\n')}\n\nFinancial Assistance: ${scheme.financialAssistance}`
        } else if (messageLower.includes('document')) {
          response = `Documents needed for ${scheme.name}:\n\n${scheme.requiredDocuments.map(d => `• ${d.name}${d.optional ? ' (optional)' : ''}`).join('\n')}`
        } else if (messageLower.includes('deadline')) {
          response = `Application deadline for ${scheme.name}: ${scheme.applicationDeadline}`
        } else if (messageLower.includes('apply') || messageLower.includes('register')) {
          response = `To apply for ${scheme.name}:\n\n1. Visit: ${scheme.applicationUrl}\n2. Follow the application steps\n3. Submit required documents\n4. Wait for approval\n\nContact: ${scheme.contactPhone}`
        } else {
          response = `${scheme.name}\n\n${scheme.description}\n\nDepartment: ${scheme.department}\nDeadline: ${scheme.applicationDeadline}\nContact: ${scheme.contactPhone}`
        }
        return { response, schemeContext: { schemeId: scheme.id, schemeName: scheme.name } }
      }
    }
  }

  // Check common questions
  for (const [keyword, answer] of Object.entries(commonQuestions)) {
    if (messageLower.includes(keyword)) {
      return { response: answer }
    }
  }

  // Default response
  const defaultResponse = `I can help you with questions about government schemes! You can ask me about:
  
• Specific schemes (e.g., "Tell me about MUDRA")
• Eligibility for schemes
• Required documents
• Application deadlines
• How to apply
• Benefits and financial assistance

Or use our specialized tools:
• Eligibility Checker - Take a quiz to find suitable schemes
• Browse Schemes - View all 1000+ schemes
• Document Checker - Find documents needed for any scheme
• Application Tracker - Track your applications

What would you like to know?`

  return { response: defaultResponse }
}

export function extractSchemeKeyword(message: string): string | null {
  const messageLower = message.toLowerCase()
  for (const keyword of Object.keys(schemeMappings)) {
    if (messageLower.includes(keyword)) {
      return keyword
    }
  }
  return null
}

export function getSchemeSuggestions(query: string): string[] {
  const queryLower = query.toLowerCase()
  return SCHEMES.filter(scheme => 
    scheme.name.toLowerCase().includes(queryLower) ||
    scheme.description.toLowerCase().includes(queryLower) ||
    scheme.category.toLowerCase().includes(queryLower) ||
    scheme.targetAudience.some(audience => audience.toLowerCase().includes(queryLower))
  ).map(s => s.name)
}
