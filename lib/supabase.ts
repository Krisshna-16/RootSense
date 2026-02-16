import { createClient } from "@supabase/supabase-js";

// IMPORTANT: Replace the second parameter with your ANON KEY (not publishable key)
// Get it from: Supabase Dashboard → Settings → API → Project API keys → anon/public
export const supabase = createClient(
    "https://mibuomqkudqypvojwtlp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pYnVvbXFrdWRxeXB2b2p3dGxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTI4MDAsImV4cCI6MjA4NjYyODgwMH0.JZZlf4adNV9JkEbsZxfJYSDkN_nSVVlgBbKpbYqleE4"  // ⚠️ REPLACE THIS with your actual anon key
);
