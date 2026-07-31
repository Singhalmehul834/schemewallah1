# SchemeWallah - Setup & Development Guide

## Getting Started

### 1. Prerequisites

- **Node.js** 18.17 or higher
- **npm**, **yarn**, **pnpm**, or **bun** (pnpm recommended)
- **Git** (optional, for version control)

### 2. Installation

#### Clone or Download

```bash
# If using git
git clone https://github.com/yourusername/schemewallah.git
cd schemewallah

# Or download and extract the ZIP file
unzip schemewallah.zip
cd schemewallah
```

#### Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

### 3. Run Development Server

```bash
# Using pnpm
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 4. Open in Browser

Open your browser and navigate to:
- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/auth/login
- **Signup**: http://localhost:3000/auth/signup
- **Dashboard**: http://localhost:3000/dashboard
- **Chatbot**: http://localhost:3000/chatbot
- **Browse Schemes**: http://localhost:3000/schemes

## Project Structure

```
schemewallah/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles & design tokens
│   ├── not-found.tsx            # 404 page
│   ├── auth/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx       # Main dashboard
│   ├── chatbot/page.tsx         # AI eligibility checker
│   └── schemes/page.tsx         # Browse schemes
│
├── lib/                         # Business logic
│   ├── types.ts                 # TypeScript interfaces
│   ├── schemes-data.ts          # 21 sample schemes
│   ├── recommendation-engine.ts # Matching algorithm
│   ├── auth.ts                  # Authentication logic
│   └── storage.ts               # localStorage utilities
│
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── README.md
└── SETUP.md (this file)
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Next.js 16** - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Icon library

### Storage
- **localStorage** - Browser storage for user data
- **JSON** - Scheme database format

### Design
- **Color Palette**: Blue (#0066CC), Green (#22C55E), Neutrals
- **Fonts**: System fonts (Geist)
- **Responsive**: Mobile-first design

## Features Overview

### Landing Page (`/`)
- Modern hero section with CTAs
- Features showcase
- How it works guide
- Statistics dashboard
- Professional footer

### Authentication (`/auth/*`)
- **Login** - Sign in with email and password
- **Signup** - Create new account
- **Guest Mode** - Browse without account
- All data stored in localStorage

### Dashboard (`/dashboard`)
- Personalized welcome
- Quick action cards
- Sidebar navigation
- Feature shortcuts
- Dashboard coming soon

### AI Eligibility Checker (`/chatbot`)
- Conversational interface
- 10 eligibility questions
- Smart recommendation engine
- Results with match scores
- Progress indicator

### Schemes Browser (`/schemes`)
- Search functionality
- Filter by category
- Filter by target audience
- Expandable scheme details
- Contact information
- Application links

## Data Management

### User Data Flow

1. **User Signup** → Profile created in localStorage
2. **User Answers Questions** → Responses saved in localStorage
3. **Recommendations Generated** → Cached in localStorage
4. **Schemes Saved** → Bookmark status in localStorage

### localStorage Keys

```javascript
{
  "scheme_wallah_users": "[...]",                    // All users
  "scheme_wallah_current_user": "user_123",          // Current session
  "scheme_wallah_saved_schemes": "[...]",            // Saved/applied schemes
  "scheme_wallah_responses_user_123": "{...}",       // User eligibility responses
  "scheme_wallah_chat_history_session_123": "[...]"  // Chat history
}
```

## Development Workflow

### 1. Making Changes

#### Modify a Component
```bash
# Edit any file in app/ or lib/
# Changes auto-reload thanks to HMR

# Example: Edit landing page
vim app/page.tsx
```

#### Add a New Scheme
```bash
# Edit lib/schemes-data.ts and add to SCHEMES array
vim lib/schemes-data.ts
```

#### Modify Authentication
```bash
# Edit lib/auth.ts for auth logic
# Edit app/auth/login/page.tsx and app/auth/signup/page.tsx for UI
vim lib/auth.ts
vim app/auth/login/page.tsx
```

### 2. Testing Locally

#### Test User Authentication
1. Go to http://localhost:3000/auth/signup
2. Sign up with any email and password
3. Should redirect to dashboard
4. Data persists after page reload

#### Test Recommendation Engine
1. Go to http://localhost:3000/chatbot
2. Answer all eligibility questions
3. View personalized recommendations
4. Check match percentages

#### Test Scheme Browser
1. Go to http://localhost:3000/schemes
2. Search for "Mudra" or "Scholarship"
3. Filter by category
4. Expand schemes to see details

### 3. Building for Production

```bash
# Build the production bundle
pnpm build

# Start production server
pnpm start

# Or deploy to Vercel (recommended)
vercel
```

## Deployment

### Deploy to Vercel (Easiest)

```bash
# Login to Vercel
npm i -g vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts to connect GitHub and deploy
```

### Deploy to Other Platforms

#### Netlify
```bash
# Connect GitHub repo to Netlify
# Set build command: pnpm build
# Set publish directory: .next
```

#### Self-Hosted (VPS/Cloud)
```bash
# Build locally
pnpm build

# Upload build files to server
# Install Node.js on server
# Run: pnpm start
```

## Customization

### Change Color Scheme

Edit `/app/globals.css` and update the theme colors:

```css
:root {
  --primary: oklch(0.35 0.15 250);    /* Blue */
  --secondary: oklch(0.50 0.15 120);  /* Green */
  --accent: oklch(0.45 0.15 120);     /* Bright Green */
  /* ... other colors ... */
}
```

### Add More Schemes

Edit `/lib/schemes-data.ts`:

```typescript
const SCHEMES: Scheme[] = [
  // ... existing schemes ...
  {
    id: 'scheme-022',
    name: 'Your New Scheme',
    department: 'Ministry Name',
    description: 'Scheme description',
    eligibility: ['Criterion 1', 'Criterion 2'],
    benefits: ['Benefit 1', 'Benefit 2'],
    financialAssistance: '₹Amount',
    requiredDocuments: ['Doc 1', 'Doc 2'],
    applicationDeadline: 'Date',
    targetAudience: ['Category 1', 'Category 2'],
    category: 'Category Name',
  },
]
```

### Modify Eligibility Questions

Edit `/app/chatbot/page.tsx` - update `ELIGIBILITY_QUESTIONS` array:

```typescript
const ELIGIBILITY_QUESTIONS = [
  { key: 'newQuestion', question: 'Your question?', type: 'text' | 'select' | 'boolean' | 'number' },
  // ... more questions ...
]
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use a different port
pnpm dev -- -p 3001
```

### Changes Not Appearing

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
pnpm dev
```

### localStorage Not Working

- This is a browser feature, only works in browser environment
- Not available during SSR
- Use `if (typeof window !== 'undefined')` for client-side checks

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm build
```

## Performance Optimization

### Current Status
- ✅ Server-side rendering for landing page
- ✅ Client-side rendering for dynamic pages
- ✅ Lazy loading of routes
- ✅ Optimized Tailwind CSS

### Future Improvements
- [ ] Image optimization with next/image
- [ ] Code splitting
- [ ] Service workers for offline support
- [ ] Database caching
- [ ] CDN integration

## Security Best Practices

### Current Implementation
- ✅ Type safety with TypeScript
- ✅ Input validation on forms
- ✅ No sensitive data in URLs
- ✅ No hardcoded credentials

### For Production
- [ ] Add backend authentication
- [ ] Use HTTPS everywhere
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Add security headers

## Contributing

### Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and test locally
   ```bash
   pnpm dev
   ```

3. Commit changes
   ```bash
   git add .
   git commit -m "Add: Your feature description"
   ```

4. Push to GitHub
   ```bash
   git push origin feature/your-feature
   ```

5. Create a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and focused
- Write descriptive variable names
- Add comments for complex logic

## Resources

### Documentation
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Lucide React Icons](https://lucide.dev)

### Learning
- [React Patterns](https://react-patterns.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [CSS-in-JS Best Practices](https://styled-components.com/)

## Support

### Having Issues?

1. **Check the README** - Common questions answered
2. **Review the code** - Comments explain key logic
3. **Check browser console** - Look for error messages
4. **Clear cache** - `rm -rf .next && pnpm dev`

### Report Issues

- Open a GitHub issue with details
- Include error messages and steps to reproduce
- Attach screenshots if applicable

## Changelog

### v1.0.0 (Current)
- ✅ Landing page with hero section
- ✅ Authentication (signup, login, guest)
- ✅ Dashboard with navigation
- ✅ AI eligibility chatbot
- ✅ Schemes browser with filtering
- ✅ 21 sample government schemes
- ✅ Recommendation engine
- ✅ Dark mode support
- ✅ Mobile-responsive design
- ✅ Accessibility features

## License

MIT License - See LICENSE file for details

## Credits

- Built with ❤️ for the Ideathon
- Inspired by Indian government schemes
- Design inspired by modern government tech

---

**Last Updated**: July 31, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
