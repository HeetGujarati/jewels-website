import { createClient } from '@supabase/supabase-js';

// Supabase Project Credentials
const SUPABASE_URL = 'https://nkspzzlmucfiuetzbhur.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rc3B6emxtdWNmaXVldHpiaHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDI1MjYsImV4cCI6MjA5ODU3ODUyNn0.sUm1FEoWuQBvaFP91Pj3hoyp7HqlYESJ9-MvpBgBQLQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
