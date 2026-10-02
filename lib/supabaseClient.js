import { createClient } from "@supabase/supabase-js";

// Values come from .env.local (locally) or Vercel Environment Variables (live site)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// If the variables are missing, export null so the app can show a clear message
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
