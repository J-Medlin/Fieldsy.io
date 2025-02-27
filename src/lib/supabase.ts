import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // Disable URL detection since we're handling auth directly
      flowType: 'pkce', // Use PKCE flow for better security
      storage: localStorage // Explicitly set storage to localStorage
    }
  }
);

// Add debug logging
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Signed in successfully:', session?.user?.email);
  } else if (event === 'SIGNED_OUT') {
    console.log('Signed out successfully');
  } else if (event === 'USER_UPDATED') {
    console.log('User profile updated:', session?.user?.email);
  } else {
    console.log('Auth state changed:', event, session);
  }
});