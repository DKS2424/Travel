import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, X, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEnquiries } from '../hooks/useEnquiries'

interface EnquiryFormProps {
  trekId: string
  trekTitle: string
  onClose: () => void
  onSuccess: () => void
}

interface EnquiryFormData {
  user_name: string
  user_email: string
  user_phone: string
  message: string
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ trekId, trekTitle, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EnquiryFormData>()
  const { submitEnquiry } = useEnquiries()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: EnquiryFormData) => {
    setError(null)
    const result = await submitEnquiry({
      trek_id: trekId,
      ...data
    })

    if (!result.success) {
      setError(result.error || 'Failed to submit enquiry')
      return
    }

    setSuccess(true)
    reset()
    setTimeout(() => {
      onSuccess()
      onClose()
    }, 2000)
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Send className="h-8 w-8 text-emerald-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Enquiry Submitted!</h3>
          <p className="text-slate-600 mb-4">
            Thank you! We've received your enquiry for <strong>{trekTitle}</strong>. Our team will get back to you soon.
          </p>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-emerald-600 text-sm"
          >
            Redirecting...
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 flex items-center justify-between border-b border-emerald-700">
          <div>
            <h2 className="text-2xl font-bold">Send Enquiry</h2>
            <p className="text-emerald-100 text-sm mt-1">{trekTitle}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('user_name', { required: 'Name is required' })}
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="Your name"
            />
            {errors.user_name && (
              <p className="text-red-600 text-sm mt-1">{errors.user_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('user_email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="your@email.com"
            />
            {errors.user_email && (
              <p className="text-red-600 text-sm mt-1">{errors.user_email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register('user_phone', { required: 'Phone number is required' })}
              type="tel"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              placeholder="+1 (555) 000-0000"
            />
            {errors.user_phone && (
              <p className="text-red-600 text-sm mt-1">{errors.user_phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Message *
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              placeholder="Tell us about your interest..."
              rows={4}
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
          </motion.button>

          <p className="text-xs text-slate-500 text-center">
            We'll get back to you within 24 hours
          </p>
        </form>
      </motion.div>
    </motion.div>
  )
}
