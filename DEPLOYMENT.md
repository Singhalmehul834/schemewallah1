# SchemeWallah - Deployment Guide

## Quick Deploy (Recommended)

### Deploy to Vercel (1 Click)

Vercel is the recommended deployment platform for Next.js applications.

#### Prerequisites
- GitHub account
- Vercel account (free)

#### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/schemewallah.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Project name: `schemewallah`
   - Framework: Next.js (auto-detected)
   - Environment Variables: Leave empty (no secrets needed)
   - Click "Deploy"

4. **Verify Deployment**
   - Vercel provides a live URL (e.g., `schemewallah.vercel.app`)
   - Visit the URL to confirm everything works
   - All pages should load correctly

#### Add Custom Domain (Optional)
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Alternative Deployment Options

### Deploy to Netlify

#### Prerequisites
- GitHub account
- Netlify account (free)

#### Steps

1. **Push code to GitHub** (same as above)

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Click "Connect"

3. **Build Configuration**
   - Build command: `pnpm build` (or `npm run build`)
   - Publish directory: `.next`
   - Click "Deploy"

4. **Verify Deployment**
   - Netlify provides a live URL
   - Visit to confirm working

---

### Deploy to AWS Amplify

#### Prerequisites
- AWS account
- GitHub account

#### Steps

1. **Push code to GitHub**

2. **Connect to Amplify**
   - Go to AWS Amplify Console
   - Click "New app"
   - Select "Host web app"
   - Choose GitHub
   - Select repository and branch
   - Click "Next"

3. **Build Settings**
   - Leave defaults or customize
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Deploy**
   - Click "Save and deploy"
   - Amplify builds and deploys automatically

---

### Self-Hosted Deployment

#### On VPS (Ubuntu/Debian)

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/schemewallah.git
   cd schemewallah
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Build application**
   ```bash
   npm run build
   ```

6. **Install PM2 (process manager)**
   ```bash
   npm install -g pm2
   ```

7. **Start application**
   ```bash
   pm2 start npm --name "schemewallah" -- start
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx (reverse proxy)**
   ```bash
   sudo apt-get install nginx
   ```

   Create `/etc/nginx/sites-available/default`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

9. **Setup SSL (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

10. **Verify**
    - Visit https://your-domain.com
    - Application should be live

---

### Docker Deployment

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy application
COPY . .

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "start"]
```

#### Build and Deploy

```bash
# Build image
docker build -t schemewallah:latest .

# Run container
docker run -d -p 3000:80 --name schemewallah schemewallah:latest

# Verify
curl http://localhost:3000
```

---

## Environment Variables

For production deployment, you typically don't need environment variables since all data is stored in localStorage. However, you can add these if needed:

```env
# .env.production
NEXT_PUBLIC_APP_NAME=SchemeWallah
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## Performance Optimization

### Before Going Live

1. **Enable compression**
   ```bash
   pnpm build
   ```

2. **Optimize images** (future)
   - Use next/image component
   - Compress all assets

3. **Minimize bundle size**
   - Review unused dependencies
   - Code splitting is automatic

4. **Enable caching**
   - Vercel enables this automatically
   - Configure via `next.config.mjs`

### Monitor Performance

- Use Vercel Analytics
- Check Web Vitals
- Monitor Core Web Vitals
- Review user experience metrics

---

## Security Checklist

### Before Production

- [ ] Remove all console.log statements
- [ ] Enable HTTPS (auto on Vercel)
- [ ] Set security headers
- [ ] Implement CORS if needed
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Add rate limiting
- [ ] Enable logging/monitoring

### Security Headers (next.config.mjs)

```javascript
export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

---

## Monitoring & Logging

### Vercel Analytics
- Built into Vercel deployment
- Track page views, errors
- Performance metrics
- Real user monitoring

### Error Tracking
- Consider adding Sentry
- Email alerts for errors
- User session replay
- Custom error handling

### Logs
- View in Vercel dashboard
- Real-time log streaming
- Historical logs for debugging

---

## Rollback Procedures

### If Something Goes Wrong

#### On Vercel
1. Go to Vercel project dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "Promote to Production"
5. Confirm rollback

#### On Self-Hosted
```bash
# Stop current deployment
pm2 stop schemewallah

# Checkout previous version
git checkout previous-commit

# Rebuild and restart
npm run build
pm2 start schemewallah
```

---

## Scaling Strategy

### Phase 1: Current (MVP)
- Deployed on Vercel or similar
- Handles ~1,000 concurrent users
- localStorage for persistence
- Single region deployment

### Phase 2: Scaling (Future)
- Add database (PostgreSQL, MongoDB)
- Implement backend API
- Multi-region deployment
- CDN for static assets
- Caching layer (Redis)

### Phase 3: Global (Enterprise)
- Multiple regions
- Load balancing
- Replication
- Auto-scaling
- Advanced monitoring

---

## Continuous Deployment

### Automated Deployments

#### GitHub Actions (Vercel)
```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

#### GitHub Actions (Manual Build)
```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication (signup, login, guest)
- [ ] Test chatbot functionality
- [ ] Test scheme browser and filters
- [ ] Check mobile responsiveness
- [ ] Verify dark mode works
- [ ] Test on different browsers
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Share with testers/judges
- [ ] Gather feedback
- [ ] Plan improvements

---

## Support & Troubleshooting

### Common Issues

#### Build fails on Vercel
- Check `pnpm-lock.yaml` is committed
- Verify Node.js version compatibility
- Clear build cache: Project > Settings > General > Delete Build Cache

#### Slow performance
- Check if images are optimized
- Review bundle size
- Enable compression
- Check database queries (if applicable)

#### Authentication not working
- Verify localStorage is enabled
- Check browser console for errors
- Clear browser cache
- Try incognito mode

#### Deployment stuck
- Check GitHub Actions logs
- Verify repository access
- Check for failed builds
- Contact platform support

---

## Performance Benchmarks

### Expected Metrics (Lighthouse)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### Expected Load Times
- First contentful paint: <2s
- Largest contentful paint: <3s
- Cumulative layout shift: <0.1
- Time to interactive: <4s

---

## Cost Estimation

### Vercel (Recommended)
- **Free Tier**: Unlimited deployments, 100 GB bandwidth
- **Pro**: $20/month for advanced features
- **Business**: Custom pricing

### Netlify
- **Free Tier**: Unlimited builds, 100 GB bandwidth
- **Pro**: $19/month
- **Business**: Custom pricing

### AWS
- **EC2**: $5-50/month depending on instance
- **S3**: ~$0.023/GB
- **CloudFront**: $0.085/GB

### Self-Hosted VPS
- **DigitalOcean**: $4-24/month
- **Linode**: $4-24/month
- **Vultr**: $2.50-24/month

---

## Next Steps

1. **Choose deployment platform**
   - Recommended: Vercel (easiest)
   - Alternative: Netlify, AWS Amplify
   - Self-hosted: DigitalOcean, Linode

2. **Setup domain name** (optional)
   - Buy from GoDaddy, Namecheap, etc.
   - Configure DNS

3. **Enable monitoring**
   - Setup error tracking
   - Configure analytics
   - Set up alerts

4. **Plan improvements**
   - User feedback
   - Analytics review
   - Feature prioritization

---

## Resources

- [Vercel Deployment](https://vercel.com/docs/deployments/overview)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify Guide](https://docs.netlify.com/)
- [Docker Docs](https://docs.docker.com/)
- [PM2 Guide](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

## Support

For deployment help:
- Check Vercel documentation
- Review Next.js deployment guide
- Check platform-specific support
- Reach out to community

---

**Ready to deploy? Start with Vercel - it takes 5 minutes!**

Last Updated: July 31, 2025
