# Supabase Setup Troubleshooting

## Current Issue
You're seeing: **"Could not query the database for the schema cache_key.rng"**

This means the `trees` table doesn't exist in your Supabase database yet.

## Step-by-Step Verification

### ✅ Step 1: Confirm SQL Was Run
Did you see **"Success"** or green checkmarks after running the SQL in Supabase?

- **YES** → Continue to Step 2
- **NO** → You need to run the SQL first (see instructions below)

### ✅ Step 2: Verify Table Exists
1. In Supabase Dashboard, go to **Table Editor** (left sidebar)
2. Look for a table named `trees`
3. Click on it to see columns

**Do you see the `trees` table?**
- **YES** → Continue to Step 3
- **NO** → The SQL didn't run properly. Try again.

### ✅ Step 3: Verify Storage Bucket
1. In Supabase Dashboard, go to **Storage** (left sidebar)
2. Look for a bucket named `tree-images`

**Do you see the `tree-images` bucket?**
- **YES** → Continue to Step 4
- **NO** → The SQL didn't run properly. Try again.

### ✅ Step 4: Check Supabase URL Match
1. Open `lib/supabase.ts`
2. Check the URL: `https://mibuomqkudqypvojwtlp.supabase.co`
3. In Supabase Dashboard, go to **Settings** → **API**
4. Compare the **Project URL**

**Do they match exactly?**
- **YES** → Continue to Step 5
- **NO** → Update `lib/supabase.ts` with the correct URL

### ✅ Step 5: Refresh and Test
1. Close the error dialog in your app
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check if the error is gone

---

## How to Run the SQL (If Not Done Yet)

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. **Click "SQL Editor"** in left sidebar
4. **Click "New Query"**
5. **Copy ALL 53 lines** from `supabase_setup.sql`
6. **Paste** into the SQL editor
7. **Click RUN** (or Ctrl+Enter)
8. **Wait for success message**

## Expected Success Output
```
✓ Success. No rows returned
```

## If You Get Errors
- **"policy already exists"** → This is fine, the script handles it now
- **"permission denied"** → Make sure you're the project owner
- **"syntax error"** → Make sure you copied the entire script

## Still Not Working?
Please tell me:
1. Did you see "Success" after running the SQL?
2. Do you see the `trees` table in Table Editor?
3. Do you see the `tree-images` bucket in Storage?
4. What exact error message do you see in Supabase when running SQL?
