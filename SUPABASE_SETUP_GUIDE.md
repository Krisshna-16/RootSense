# Supabase Setup Guide for Tree Monitoring App

## Prerequisites
- Supabase account and project created
- Project URL and API key already configured in `lib/supabase.ts`

## Step 1: Run SQL Setup Script

1. Open your **Supabase Dashboard** at https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the contents of `supabase_setup.sql` and paste into the editor
6. Click **Run** or press `Ctrl+Enter`

This will:
- Create the `trees` table with all required fields
- Create the `tree-images` storage bucket
- Set up public access policies for uploads and reads

## Step 2: Verify Storage Bucket

1. Go to **Storage** in the left sidebar
2. You should see a bucket named `tree-images`
3. Click on it to verify it exists
4. Check that it's set to **Public** (you should see a "Public" badge)

## Step 3: Verify Database Table

1. Go to **Table Editor** in the left sidebar
2. You should see a `trees` table
3. Click on it to view the schema
4. Verify these columns exist:
   - `id` (uuid, primary key)
   - `tree_id` (text)
   - `location` (text)
   - `species` (text)
   - `health` (text)
   - `green_coverage` (numeric)
   - `leaf_density` (numeric)
   - `water_needs` (text)
   - `recommendation` (text)
   - `image_url` (text)
   - `confidence` (numeric)
   - `created_at` (timestamp)

## Step 4: Test the Application

1. Make sure `npm run dev` is running
2. Navigate to http://localhost:3000/trees
3. Click **Upload Tree Photo**
4. Fill in:
   - Tree ID (optional, e.g., "TEST-001")
   - Location (select from dropdown)
   - Upload an image file
5. Wait for AI analysis to complete
6. Click **Save to Supabase**

### Expected Results:
- ✅ Alert: "Tree data saved successfully to Supabase!"
- ✅ New tree appears in the list immediately
- ✅ Image is visible (check the image URL in the tree card)

### If Upload Fails:
- Check browser console (F12) for error messages
- The alert will show the specific error message
- Common issues:
  - Bucket doesn't exist → Re-run SQL script
  - Permission denied → Check RLS policies
  - Invalid file type → Use JPG/PNG only

## Step 5: Verify Data in Supabase

1. Go back to **Table Editor** → `trees` table
2. You should see your newly uploaded tree record
3. Go to **Storage** → `tree-images` bucket
4. You should see the uploaded image file

## Troubleshooting

### Error: "Bucket not found"
- Re-run the SQL script, specifically the bucket creation part
- Verify the bucket name is exactly `tree-images` (case-sensitive)

### Error: "Permission denied"
- Check that RLS policies are set up correctly
- Verify the policies allow public insert/select

### Error: "Invalid file"
- Ensure you're uploading JPG, PNG, or other image formats
- Check file size is under 10MB

### Images not displaying
- Verify the bucket is set to **Public**
- Check the `image_url` field in the database contains a valid URL
- Test the URL directly in a browser

## Next Steps

Once everything is working:
- Consider adding authentication (Supabase Auth)
- Restrict upload policies to authenticated users only
- Add image optimization/resizing
- Implement pagination for large tree lists
