# SchemeWallah - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
pnpm install
# or: npm install / yarn install
```

### Step 2: Start Development Server
```bash
pnpm dev
# or: npm run dev / yarn dev
```

### Step 3: Open in Browser
Visit **http://localhost:3000**

---

## 📍 Where to Go First

### For Demo/Testing
1. **Landing Page** - http://localhost:3000
   - See full product overview
   - Click "Get Started Free"

2. **Sign Up** - http://localhost:3000/auth/signup
   - Create account (any email, password 6+ chars)
   - OR continue as guest

3. **AI Eligibility Check** - http://localhost:3000/chatbot
   - Answer 10 simple questions
   - Get personalized recommendations
   - See match percentages

4. **Browse All Schemes** - http://localhost:3000/schemes
   - Search and filter 21+ schemes
   - Expand for full details
   - View requirements

5. **Dashboard** - http://localhost:3000/dashboard
   - View personalized content
   - Access all features

---

## 🧪 Test Accounts

### Option 1: Create New Account
- Email: `test@example.com`
- Password: `demo123` (6+ characters required)

### Option 2: Continue as Guest
- Click "Continue as Guest" on login page
- No signup needed
- All features available

---

## 📂 Key Files to Know

### Main Features
| File | Purpose | Size |
|------|---------|------|
| `app/page.tsx` | Landing page | 292 lines |
| `app/auth/signup/page.tsx` | Signup form | 169 lines |
| `app/auth/login/page.tsx` | Login form | 127 lines |
| `app/dashboard/page.tsx` | Main dashboard | 322 lines |
| `app/chatbot/page.tsx` | AI chatbot | 404 lines |
| `app/schemes/page.tsx` | Schemes browser | 364 lines |

### Business Logic
| File | Purpose | Size |
|------|---------|------|
| `lib/recommendation-engine.ts` | Matching algorithm | 197 lines |
| `lib/schemes-data.ts` | 21 schemes | 320 lines |
| `lib/auth.ts` | Authentication | 130 lines |
| `lib/storage.ts` | localStorage helpers | 121 lines |
| `lib/types.ts` | TypeScript types | 61 lines |

### Styling
| File | Purpose |
|------|---------|
| `app/globals.css` | Design tokens & theme |
| `tailwind.config.js` | Tailwind config |

---

## 🎨 Quick Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.35 0.15 250);    /* Blue */
  --secondary: oklch(0.50 0.15 120);  /* Green */
  --accent: oklch(0.45 0.15 120);     /* Bright Green */
}
```

### Add New Scheme
Edit `lib/schemes-data.ts`:
```typescript
{
  id: 'scheme-022',
  name: 'Your Scheme Name',
  department: 'Ministry',
  description: 'Description',
  eligibility: ['Criterion 1', 'Criterion 2'],
  benefits: ['Benefit 1', 'Benefit 2'],
  financialAssistance: '₹Amount',
  requiredDocuments: ['Doc 1', 'Doc 2'],
  applicationDeadline: 'Date',
  targetAudience: ['Audience'],
  category: 'Category',
}
```

### Add Questions to Chatbot
Edit `app/chatbot/page.tsx` - find `ELIGIBILITY_QUESTIONS`:
```typescript
const ELIGIBILITY_QUESTIONS = [
  { key: 'fieldName', question: 'Your question?', type: 'text' | 'select' | 'boolean' },
  // Add more...
]
```

---

## 📱 Responsive Design

The app works great on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (320px-767px)
- ✅ All modern browsers
- ✅ Dark mode (auto-detect)

---

## 🔧 Common Tasks

### Run Tests
```bash
npm run test          # Run tests
npm run test:watch   # Watch mode
```

### Build for Production
```bash
pnpm build           # Build
pnpm start          # Run production server
```

### Check Formatting
```bash
npm run lint        # Check linting
npm run format      # Auto-format code
```

### Clean Cache
```bash
rm -rf .next        # Clear Next.js cache
pnpm dev            # Restart
```

---

## 🎯 Key Features to Try

### 1. Authentication
- Sign up with email
- Login to dashboard
- Continue as guest
- Data persists across sessions

### 2. Eligibility Checker
- Answer questions conversationally
- Get personalized recommendations
- See match percentages
- View why you qualify

### 3. Scheme Browser
- Search by name
- Filter by category
- Filter by audience
- Expand for full details
- View documents needed
- Get contact info

### 4. Recommendations
- 21 realistic schemes
- 11 categories
- Smart matching
- Detailed explanations

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Complete overview |
| `SETUP.md` | Development guide |
| `DEPLOYMENT.md` | Deploy to production |
| `PROJECT_SUMMARY.md` | Project details |
| `QUICKSTART.md` | This file |

---

## 🐛 Troubleshooting

### Port 3000 in Use?
```bash
lsof -i :3000           # Find process
kill -9 <PID>          # Kill it
pnpm dev               # Try again
```

### Changes Not Showing?
```bash
rm -rf .next           # Clear cache
pnpm dev               # Restart
# Or: Press Ctrl+C and pnpm dev again
```

### localStorage Issues?
- Try incognito mode
- Check browser console (F12)
- Clear browser cache
- Use different browser

### Build Errors?
```bash
rm -rf node_modules pnpm-lock.yaml    # Clean install
pnpm install
pnpm build
```

---

## 🚀 Deploy in 5 Minutes

### Simplest: Vercel
1. Push code to GitHub
2. Go to vercel.com/new
3. Select repository
4. Click "Deploy"
5. Done!

See `DEPLOYMENT.md` for more options.

---

## 📊 Project Stats

- **Lines of Code**: 2,500+
- **Pages**: 7 main pages
- **Schemes**: 21 examples
- **Questions**: 10 eligibility Q&A
- **Categories**: 11 types
- **Colors**: 5 primary colors
- **Icons**: 20+ unique

---

## 🎓 Learning Path

### Beginner (Day 1)
- [ ] Run `pnpm dev`
- [ ] Explore landing page
- [ ] Sign up and login
- [ ] Take eligibility quiz
- [ ] Browse schemes

### Intermediate (Day 2)
- [ ] Review code structure
- [ ] Read `SETUP.md`
- [ ] Modify a scheme
- [ ] Change colors
- [ ] Add a question

### Advanced (Day 3)
- [ ] Review recommendation engine
- [ ] Understand matching algorithm
- [ ] Modify auth system
- [ ] Add new features
- [ ] Deploy to production

---

## 💡 Tips & Tricks

### Navigation Tips
- Use sidebar on desktop
- Use mobile menu on phone
- Keyboard: Tab to navigate
- Dark mode: System preference

### Testing Tips
- Try different screen sizes (F12 DevTools)
- Test incognito mode
- Try different browsers
- Check console for errors

### Customization Tips
- Search `TODO` for extension points
- Look for `// Customize here` comments
- Review component props
- Check TypeScript types

---

## 🤝 Contributing

Want to improve SchemeWallah?

1. Fork repository
2. Create feature branch
3. Make changes
4. Test locally
5. Submit pull request

Areas for contribution:
- [ ] Add more schemes
- [ ] Improve UI/UX
- [ ] Add animations
- [ ] Improve algorithm
- [ ] Better documentation
- [ ] Bug fixes
- [ ] Performance optimization

---

## 📞 Need Help?

### Documentation
- See `README.md` for overview
- See `SETUP.md` for setup issues
- See `DEPLOYMENT.md` for deployment

### Debugging
1. Check browser console (F12)
2. Look for error messages
3. Clear cache and restart
4. Check `SETUP.md` troubleshooting

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## ✨ What's Next?

### Immediate Next Steps
1. Explore the app
2. Try the features
3. Customize colors/schemes
4. Deploy to Vercel
5. Share with others

### Future Enhancements
- [ ] Add backend database
- [ ] Connect to real APIs
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Admin interface

---

## 🎉 Ready?

```bash
# Let's go!
pnpm install
pnpm dev

# Then visit http://localhost:3000
```

---

**Built with ❤️ for the Ideathon**  
**Making Government Schemes Accessible to Every Indian Citizen**

Happy coding! 🚀
