# 🚀 Netlify Deployment Guide for RootSense

## Overview

This guide will help you deploy your **Next.js RootSense application** (frontend + backend API routes) to Netlify in one unified deployment.

---

## ✅ Prerequisites

- [ ] GitHub account
- [ ] Netlify account (free tier works)
- [ ] Environment variables ready (`.env.local`)
- [ ] Code pushed to GitHub repository

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Create `.gitignore` entry** (should already exist):
```gitignore
.env.local
node_modules
.next
```

2. **Push to GitHub**:
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### Step 2: Create `netlify.toml` Configuration

Create this file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 3: Connect to Netlify

1. **Go to Netlify**: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your repositories
5. Select your **RootSense repository**

### Step 4: Configure Build Settings

**Build command:**
```
npm run build
```

**Publish directory:**
```
.next
```

**Install command (optional):**
```
npm install
```

### Step 5: Add Environment Variables

In Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add all variables from your `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> [!IMPORTANT]
> Never commit `.env.local` to GitHub. Always add secrets via Netlify dashboard.

### Step 6: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://random-name-123.netlify.app`

### Step 7: Configure Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow instructions to connect your domain

---

## 🔧 Next.js + Netlify Integration

### How It Works

- **Frontend**: Static pages served from CDN
- **API Routes**: Deployed as Netlify serverless functions
- **Server Components**: Rendered on-demand via Edge Functions
- **Image Optimization**: Handled by Netlify Image CDN

### File Structure

```
your-app/
├── app/                    # Next.js App Router
│   ├── api/               # → Netlify Functions
│   ├── (app)/             # → Static/SSR pages
│   └── page.tsx           # → Static pages
├── public/                # → Static assets
└── netlify.toml           # → Netlify config
```

---

## 🌐 Update Clerk URLs

After deployment, update Clerk dashboard:

1. Go to **Clerk Dashboard** → Your Application
2. Navigate to **Paths** settings
3. Update URLs to your Netlify domain:
   - Sign-in URL: `https://your-site.netlify.app/sign-in`
   - Sign-up URL: `https://your-site.netlify.app/sign-up`
   - After sign-in: `https://your-site.netlify.app/dashboard`

4. Add Netlify domain to **Allowed Origins**:
   - `https://your-site.netlify.app`

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Build exceeded time limit"**
- Upgrade to Netlify Pro (longer build times)
- Or optimize build by removing unused dependencies

### Environment Variables Not Working

1. Check variable names match exactly (case-sensitive)
2. Redeploy after adding variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

### API Routes 404

- Ensure `netlify.toml` has correct redirects
- Check that `@netlify/plugin-nextjs` is installed
- Verify API routes are in `app/api/` directory

### Clerk Authentication Fails

1. Update Clerk dashboard with Netlify URL
2. Add Netlify domain to allowed origins
3. Check environment variables are set correctly

---

## 📊 Performance Optimization

### Enable Caching

Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-cache"
```

### Image Optimization

Next.js Image component automatically uses Netlify Image CDN:
```tsx
import Image from 'next/image'

<Image 
  src="/tree.jpg" 
  width={500} 
  height={300} 
  alt="Tree"
/>
```

---

## 🔄 Continuous Deployment

Every push to `main` branch automatically triggers:
1. Build on Netlify
2. Run tests (if configured)
3. Deploy to production

### Deploy Previews

- Every pull request gets a preview URL
- Test changes before merging
- Share with team for review

---

## 💰 Netlify Pricing

**Free Tier Includes:**
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Deploy previews

**Sufficient for hackathon demos!**

---

## 🎯 For Judges/Demo

### Share Your Live URL

After deployment, share:
```
https://rootsense.netlify.app
```

**Benefits:**
- ✅ No local setup required
- ✅ Works on any device
- ✅ Professional domain
- ✅ Always online
- ✅ Fast global CDN

### Demo Day Checklist

- [ ] Site deployed and accessible
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] AI analysis functional (check API key)
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)

---

## 📱 Alternative: Vercel Deployment

If you prefer Vercel (also excellent for Next.js):

1. Go to https://vercel.com
2. Import GitHub repository
3. Add environment variables
4. Deploy (zero configuration needed)

**Vercel is made by Next.js creators, so integration is seamless.**

---

## 🔐 Security Best Practices

1. **Never commit secrets** to Git
2. **Use environment variables** for all API keys
3. **Enable HTTPS** (automatic on Netlify)
4. **Rotate API keys** after hackathon if public
5. **Set CORS policies** for API routes

---

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Next.js on Netlify**: https://docs.netlify.com/frameworks/next-js/
- **Netlify Support**: https://answers.netlify.com

---

## ✅ Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `netlify.toml` created
- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site accessible via URL
- [ ] Clerk URLs updated
- [ ] All features tested on live site
- [ ] URL shared with judges

---

**🎉 Your RootSense app is now live and ready for demo!**
