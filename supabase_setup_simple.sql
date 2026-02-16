-- Step 1: Create the trees table
CREATE TABLE IF NOT EXISTS public.trees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tree_id TEXT,
  location TEXT,
  species TEXT,
  health TEXT,
  green_coverage NUMERIC,
  leaf_density NUMERIC,
  water_needs TEXT,
  recommendation TEXT,
  image_url TEXT,
  confidence NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Step 2: Enable RLS on trees table
ALTER TABLE public.trees ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for trees table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.trees;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.trees;

CREATE POLICY "Enable read access for all users"
ON public.trees FOR SELECT
USING (true);

CREATE POLICY "Enable insert access for all users"
ON public.trees FOR INSERT
WITH CHECK (true);
