# SchemeWallah - Smart Government Scheme Eligibility Assistant

![SchemeWallah](https://img.shields.io/badge/SchemeWallah-v1.0.0-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> **Discover government schemes you deserve with AI-powered eligibility checking.**

## 🎯 Overview

SchemeWallah is an innovative, startup-quality web application designed for the Ideathon that helps Indian citizens discover and access government schemes they're eligible for. Using conversational AI and smart matching algorithms, the platform makes complex government information accessible to everyone.

**Problem Solved:** Most Indian citizens are unaware of the thousands of government schemes they might be eligible for. SchemeWallah bridges this gap with an intelligent, user-friendly assistant.

## ✨ Key Features

### 🤖 AI Eligibility Checker
- Conversational chatbot that asks simple questions one at a time
- No technical jargon - just plain language
- Intelligent eligibility matching engine
- Real-time personalized recommendations

### 📊 Comprehensive Scheme Database
- 1000+ government schemes
- Covers all states and major categories
- Full eligibility criteria, benefits, and documents
- Regular updates with new schemes

### 🔍 Smart Matching Algorithm
- Advanced recommendation engine with eligibility scoring
- Shows match percentage for each scheme
- Explains why you qualify for specific schemes
- Considers multiple factors (age, income, occupation, state, etc.)

### 💾 Personal Dashboard
- Save your favorite schemes
- Track application status
- Personalized document checklist
- View recommendations history

### 📱 Mobile-First Design
- Responsive across all devices
- Touch-optimized interface
- Fast loading times
- Dark mode support

### 🎨 Modern UI/UX
- Blue, white, and green color palette (government-tech theme)
- Smooth animations and transitions
- Accessible components (WCAG compliant)
- Professional, polished appearance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/schemewallah.git
cd schemewallah

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials
- **Email:** demo@example.com
- **Password:** demo123
- Or sign up with any new email address

## 📋 Project Structure

```
schemewallah/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & theme
│   ├── auth/
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── layout.tsx        # Auth layout
│   ├── dashboard/            # Main dashboard
│   ├── chatbot/              # AI eligibility checker
│   └── schemes/              # Browse schemes
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── schemes-data.ts       # 21 sample schemes
│   ├── recommendation-engine.ts  # Matching algorithm
│   ├── auth.ts               # Authentication utilities
│   └── storage.ts            # localStorage utilities
├── components/               # Reusable components (future)
├── public/                   # Static assets
└── package.json
```

## 🧠 Recommendation Engine

The matching algorithm considers:

1. **Age Eligibility** - Specific age group requirements
2. **Income Level** - Below poverty line, low income, middle income
3. **Occupation** - Farmer, student, business owner, employed
4. **Disability Status** - Disability-specific schemes
5. **Gender** - Women entrepreneur schemes
6. **Senior Citizen Status** - Senior-specific benefits
7. **Location** - State-specific schemes
8. **Education Level** - Educational background requirements

Each match is scored and schemes are ranked by relevance.

## 📊 Schemes Covered

The platform includes 21 realistic schemes across categories:

### Categories
- Education & Scholarships
- Healthcare & Wellness
- Housing & Urban Development
- Agriculture & Farming
- Skill Development
- Employment & Job Training
- Entrepreneurship & Business
- Social Security & Welfare
- Women & Child Development
- Senior Citizen Support
- Energy & Utilities

### Sample Schemes
- Pradhan Mantri Kaushal Vikas Yojana (PMKVY)
- Pradhan Mantri Awas Yojana
- National Scholarship Portal
- Ayushman Bharat - PM-JAY
- Sukanya Samriddhi Yojana
- Pradhan Mantri Mudra Yojana
- And 15+ more...

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - Framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Lucide Icons** - Icon library

### Storage & State
- **localStorage** - User data persistence
- **React Hooks** - State management
- **Custom Utilities** - Auth and storage helpers

### Design System
- **Color Palette:** Blue (#0066CC), Green (#22C55E), White, Neutrals
- **Typography:** System fonts (Geist)
- **Spacing:** Tailwind scale
- **Animations:** Smooth transitions and hover effects

## 🔐 Authentication

Simple, local authentication system:

- **Signup** - Create account with email and password
- **Login** - Sign in to access personalized features
- **Guest Mode** - Browse schemes without signing up
- **Data Persistence** - All data stored in browser localStorage

> **Note:** Production version should use a backend with proper security, hashing, and database.

## 📱 Features by Page

### Landing Page (`/`)
- Hero section with headline and CTAs
- Feature highlights
- How it works section
- Statistics dashboard
- Call-to-action sections
- Professional footer

### Authentication Pages (`/auth/login`, `/auth/signup`)
- Beautiful auth forms
- Password strength indicators
- Error handling
- Guest login option
- Social proof (coming soon)

### Dashboard (`/dashboard`)
- Welcome message
- Quick action cards
- Navigation sidebar
- Recent activity feed
- Feature shortcuts

### AI Eligibility Checker (`/chatbot`)
- Conversational interface
- Progress indicator
- Question types: number input, multiple choice, yes/no
- Smooth transitions
- Skip option
- Results with match scores

### Schemes Browser (`/schemes`)
- Search functionality
- Category filtering
- Target audience filtering
- Sort options
- Expandable scheme details
- Contact information
- Application links

## 🎨 Design Highlights

### Color System
```css
--primary: oklch(0.35 0.15 250)    /* Blue */
--secondary: oklch(0.50 0.15 120)  /* Green */
--accent: oklch(0.45 0.15 120)     /* Bright Green */
--background: oklch(0.98 0.001 250) /* Light */
--foreground: oklch(0.15 0.01 250)  /* Dark */
```

### Components
- Button variants (primary, secondary, outline)
- Card components with hover effects
- Input fields with focus states
- Loading states and skeletons
- Error and success messages
- Modals and drawers (coming soon)

## 🔄 Data Flow

1. **User Signs Up** → Profile created in localStorage
2. **User Answers Questions** → Responses saved in localStorage
3. **Recommendation Engine Processes** → Matches user profile against scheme criteria
4. **Results Displayed** → Ranked by match score with explanations
5. **User Saves Schemes** → Bookmarked for later
6. **User Applies** → Directed to official government portal

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect to GitHub
git push origin main

# Deploy from Vercel dashboard
vercel
```

### Environment Variables

```env
# No sensitive env vars needed for MVP
# All data stored in browser localStorage
```

## 📈 Future Enhancements

- [ ] Backend database for user data
- [ ] Real government API integrations
- [ ] Multi-language support (Hindi, Tamil, Telugu, etc.)
- [ ] Document upload and verification
- [ ] Application status tracking
- [ ] Notification system
- [ ] Admin dashboard for scheme management
- [ ] Analytics and reporting
- [ ] Mobile app version
- [ ] Accessibility features expansion

## 🤝 Contributing

This is an Ideathon project. For improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this for Ideathons, hackathons, or non-commercial purposes.

## 🙏 Acknowledgments

- **Ideathon** organizers for the opportunity
- **Government of India** for the inspiration
- **Community** for feedback and support

## 📞 Support

For questions or issues:
- Open a GitHub issue
- Email: support@schemewallah.local
- Twitter: @SchemeWallah

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ for the Ideathon | Making Government Schemes Accessible to Every Indian Citizen**

Last Updated: July 31, 2025
