# 🚀 Vercel Deployment Guide for RootSense

## Overview
This guide will help you deploy your **Next.js RootSense application** to Vercel, the creators of Next.js. This is the **easiest and best** way to deploy this app.

---

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub
Ensure your latest code (including your fixes) is on GitHub.

1.  Open your terminal.
2.  Run these commands:
    ```bash
    git add .
    git commit -m "Ready for Vercel deployment"
    git push origin main
    ```

### Step 2: Import Project to Vercel
1.  Go to **[vercel.com/new](https://vercel.com/new)**.
2.  **Sign Up / Log In** with GitHub.
3.  Find your `rootsense` repository in the list.
4.  Click **"Import"**.

### Step 3: Configure Project
1.  **Framework Preset**: It should auto-detect **Next.js**.
2.  **Root Directory**: Leave as `./` (or select `RootSense-main` if your code is in a subfolder).
    *   *Note: Based on your setup, if your `package.json` is inside `RootSense-main/RootSense-main`, ensure you select that nested directory.*

### Step 4: Add Environment Variables (CRITICAL)
**This is the most important step.** The app will NOT work without these.

Expand the **"Environment Variables"** section and add the following keys from your `.env.local` file:

| Key | Value Source |
| :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Copy from `.env.local` |
| `CLERK_SECRET_KEY` | Copy from `.env.local` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Copy from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_URL` | Copy from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Copy from `.env.local` |

*Note: You do not need to add quotes around values.*

### Step 5: Deploy
1.  Click **"Deploy"**.
2.  Wait about 1-2 minutes.
3.  Confetti! 🎉 Your site is live.

---

## 🌐 Post-Deployment Setup (Clerk)

After deployment, your authentication needs to know about your new `vercel.app` domain.

1.  **Copy your new Vercel URL** (e.g., `https://rootsense-tau.vercel.app`).
2.  Go to **[Clerk Dashboard](https://dashboard.clerk.com)**.
3.  Select your application.
4.  Go to **Configure** -> **Domains** (or **Paths**).
5.  Allows specific CORS or just ensure your production instance allows this domain.
6.  **Crucially**: Go to **API Keys** -> **Allowed Origins** and add your Vercel URL.

---

## 🐛 Troubleshooting

### Build Failures
If the build fails, check the "Build Logs" tab in Vercel.
- **"Command not found"**: Ensure Vercel is looking at the correct root directory (`RootSense-main`).
- **"Missing dependencies"**: Run `npm install` locally and push `package-lock.json`.

### 500 Errors on Login
This usually means an environment variable is missing or incorrect.
1.  Go to Vercel Project Settings -> Environment Variables.
2.  Verify values match your local `.env.local`.
3.  **Redeploy** after changing variables (Deployments -> three dots -> Redeploy).
