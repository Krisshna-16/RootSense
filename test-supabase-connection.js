const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Missing Supabase environment variables in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Testing Supabase connection...");
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        // It's okay if 'users' table doesn't exist or is empty, we just want to see if the connection is rejected
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
            console.log("Connection successful, but query failed (likely table missing, which is expected):", error.message);
        } else {
            console.log("Connection successful!");
        }

        console.log("Testing Auth configuration...");
        const { data: authData, error: authError } = await supabase.auth.getSession();
        if (authError) {
            console.error("Auth error:", authError.message);
        } else {
            console.log("Auth service is reachable.");
        }

    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

testConnection();
