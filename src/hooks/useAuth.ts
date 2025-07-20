import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isAdmin } from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      console.error('Supabase client is not initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsAdminUser(isAdmin(session?.user?.email))
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setIsAdminUser(isAdmin(session?.user?.email))
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase client not configured.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.error('Error logging in:', error.message)
      return { error: error.message }
    }
    return { error: null }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      return { error: 'Supabase client not configured.' }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) {
      console.error('Error signing up:', error.message)
      return { error: error.message }
    }
    return { error: null }
  }

  const signOut = async () => {
    if (!supabase) {
      console.error('Supabase client not configured, cannot sign out.')
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error logging out:', error.message)
  }

  return {
    user,
    loading,
    isAdminUser,
    signInWithEmail,
    signUpWithEmail,
    signOut
  }
}