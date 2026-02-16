# Fix Supabase Schema Cache Error

## The Problem
You're seeing: **"Could not query the database for the schema cache"**

This means:
- ✅ The `trees` table EXISTS in Supabase
- ❌ But your app CAN'T connect to it

**Root Cause:** The URL or anon key in `lib/supabase.ts` doesn't match your actual Supabase project.

---

## Solution: Verify Your Credentials

### Step 1: Get the CORRECT credentials from Supabase

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project (the one where you created the `trees` table)
3. Click **Settings** (⚙️ icon) → **API**
4. You'll see:
   - **Project URL**: Copy this (should start with `https://`)
   - **Project API keys** → **anon/public**: Copy this (long string starting with `eyJ...`)

### Step 2: Compare with your code

Open `lib/supabase.ts` and compare:

**Current values in your code:**
```typescript
"https://mibuomqkudqypvojwtlp.supabase.co"  // URL
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // anon key
```

**Do they EXACTLY match what you see in Supabase Dashboard?**

### Step 3: If they DON'T match

1. Open `lib/supabase.ts`
2. Replace BOTH the URL and anon key with the correct values from Supabase Dashboard
3. Save the file
4. Restart your dev server:
   - Stop: `Ctrl+C` in terminal
   - Start: `npm run dev`
5. Refresh browser

---

## Common Mistakes

❌ **Wrong project**: You created the table in Project A but your code points to Project B
❌ **Old anon key**: You regenerated the key but didn't update the code
❌ **Typo**: Missing a character when copying the key

---

## After Fixing

Once you update the credentials:
1. Go to http://localhost:3000/test-supabase
2. You should see: **"Connection successful! ✅"**
3. Then go to http://localhost:3000/trees
4. The error should be GONE

---

## Still Not Working?

If you've verified the credentials match and it still doesn't work:
1. Take a screenshot of your Supabase Dashboard → Settings → API page
2. Take a screenshot of your `lib/supabase.ts` file
3. Share both with me so I can compare
