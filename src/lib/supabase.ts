import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

// Admin email - in production, this would be managed through environment variables
export const ADMIN_EMAIL = 'admin@trekzone.com'

export const isAdmin = (email: string | undefined): boolean => {
  return email === ADMIN_EMAIL
}