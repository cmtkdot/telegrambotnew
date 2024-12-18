import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import type { Database } from '@/scripts/supabase-types';

// Create a Supabase client with admin privileges
export const supabaseAdmin = createClient<Database>(
  env.supabase.url,
  env.supabase.serviceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);