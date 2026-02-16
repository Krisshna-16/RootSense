-- 1. Create the 'trees' table if it doesn't exist
create table if not exists trees (
  id uuid default gen_random_uuid() primary key,
  tree_id text,
  location text,
  species text,
  health text,
  green_coverage numeric,
  leaf_density numeric,
  water_needs text,
  recommendation text,
  image_url text,
  confidence numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create the Storage Bucket 'tree-images'
insert into storage.buckets (id, name, public)
values ('tree-images', 'tree-images', true)
on conflict (id) do nothing;

-- 3. Drop existing storage policies if they exist (to avoid conflicts)
drop policy if exists "Allow public uploads" on storage.objects;
drop policy if exists "Allow public viewing" on storage.objects;

-- 4. Set up Storage Policy to allow public uploads (for demo purposes)
-- WARNING: In production, you should restrict this to authenticated users.
create policy "Allow public uploads"
on storage.objects for insert
with check ( bucket_id = 'tree-images' );

-- 5. Set up Storage Policy to allow public viewing of images
create policy "Allow public viewing"
on storage.objects for select
using ( bucket_id = 'tree-images' );

-- 6. Enable Row Level Security (RLS) on trees table (optional but recommended)
alter table trees enable row level security;

-- 7. Drop existing table policies if they exist
drop policy if exists "Enable read access for all users" on trees;
drop policy if exists "Enable insert access for all users" on trees;

-- 8. policy to allow anyone to read trees
create policy "Enable read access for all users"
on trees for select
using (true);

-- 9. policy to allow anyone to insert trees (for demo purposes)
create policy "Enable insert access for all users"
on trees for insert
with check (true);
