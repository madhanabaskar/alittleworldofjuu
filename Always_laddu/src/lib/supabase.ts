import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation helper
const validateCredentials = (url?: string, key?: string): boolean => {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('placeholder')) {
    return false;
  }
  if (!key || typeof key !== 'string' || key.trim() === '' || key.includes('placeholder')) {
    return false;
  }
  return true;
};

export const isSupabaseConfigured: boolean = validateCredentials(supabaseUrl, supabasePublishableKey);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Warning: Missing or invalid Supabase credentials in environment variables.\n' +
    'Please verify that VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in .env.local.'
  );
}

/**
 * Reusable Supabase client instance configured with:
 * - Persistent authentication sessions (persistSession: true)
 * - Automatic token refresh (autoRefreshToken: true)
 * - URL session detection (detectSessionInUrl: true)
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Safe status inspect helper for Admin Dashboard and Developer diagnostic view.
 * IMPORTANT: Never prints or exposes secret keys or credentials.
 */
export const getSupabaseStatus = () => {
  return {
    isConfigured: isSupabaseConfigured,
    urlConfigured: Boolean(supabaseUrl),
    publishableKeyConfigured: Boolean(supabasePublishableKey),
    urlPreview: supabaseUrl
      ? supabaseUrl.replace(/^(https?:\/\/[^.]+).*/, '$1.supabase.co')
      : 'Not Set',
    hasAnonKey: Boolean(supabasePublishableKey),
    recommendedTables: [
      'memories (id, title, date, location, image_url, caption, created_at)',
      'letters (id, slug, title, content, closing, trigger_feeling, updated_at)',
      'voice_notes (id, title, category, duration, file_path, caption)',
      'promises (id, title, summary, detail, category, is_accountability, juu_approved)',
      'future_dreams (id, title, description, status, category)',
      'site_settings (id, entrance_code_hash, hero_text, updated_at)',
    ],
    storageBuckets: [
      'private-memories (RLS enabled, authenticated download URLs only)',
      'voice-recordings (private bucket for Juu voice audio files)',
    ],
  };
};

export default supabase;
