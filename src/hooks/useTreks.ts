import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Trek } from '../types'

export const useTreks = () => {
  const [treks, setTreks] = useState<Trek[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTreks = async () => {
    try {
      if (!supabase) {
        setError('Supabase client is not initialized. Cannot fetch treks.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('treks')
        .select('*')
        .order('start_date', { ascending: true })

      if (error) {
        throw error
      }
      setTreks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching treks:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTrek = async (trek: Omit<Trek, 'id' | 'created_at'>) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Supabase client not configured. Cannot add trek.' }
      }

      const { data, error } = await supabase
        .from('treks')
        .insert([trek])
        .select()
        .single()

      if (error) throw error
      setTreks(prev => [...prev, data])
      return { success: true, data }
    } catch (err) {
      console.error('Error adding trek:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add trek' }
    }
  }

  const updateTrek = async (id: string, updates: Partial<Trek>) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Supabase client not configured. Cannot update trek.' }
      }

      const { data, error } = await supabase
        .from('treks')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTreks(prev => prev.map(trek => trek.id === id ? data : trek))
      return { success: true, data }
    } catch (err) {
      console.error('Error updating trek:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update trek' }
    }
  }

  const deleteTrek = async (id: string) => {
    try {
      if (!supabase) {
        return { success: false, error: 'Supabase client not configured. Cannot delete trek.' }
      }

      const { error } = await supabase
        .from('treks')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTreks(prev => prev.filter(trek => trek.id !== id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting trek:', err)
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete trek' }
    }
  }

  useEffect(() => {
    fetchTreks()
  }, [])

  return {
    treks,
    loading,
    error,
    addTrek,
    updateTrek,
    deleteTrek,
    refetch: fetchTreks
  }
}