import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Enquiry } from '../types'

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchEnquiries = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching enquiries:', error)
          setEnquiries([])
        } else {
          setEnquiries(data || [])
        }
      } catch (error) {
        console.error('Error:', error)
        setEnquiries([])
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [])

  const submitEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>) => {
    if (!supabase) {
      return { success: false, error: 'Supabase client not configured' }
    }

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{ ...enquiry, status: 'pending' }])

      if (error) {
        console.error('Error submitting enquiry:', error)
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error:', error)
      return { success: false, error: message }
    }
  }

  const updateEnquiryStatus = async (enquiryId: string, status: 'pending' | 'responded' | 'rejected') => {
    if (!supabase) {
      return { success: false, error: 'Supabase client not configured' }
    }

    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', enquiryId)

      if (error) {
        console.error('Error updating enquiry:', error)
        return { success: false, error: error.message }
      }

      setEnquiries(enquiries.map(e => e.id === enquiryId ? { ...e, status } : e))
      return { success: true, error: null }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('Error:', error)
      return { success: false, error: message }
    }
  }

  return {
    enquiries,
    loading,
    submitEnquiry,
    updateEnquiryStatus
  }
}
