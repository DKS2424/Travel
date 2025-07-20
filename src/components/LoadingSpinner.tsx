import React from 'react'
import { motion } from 'framer-motion'
import { Mountain } from 'lucide-react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex items-center justify-center"
      >
        <Mountain className="h-12 w-12 text-emerald-600" />
      </motion.div>
    </div>
  )
}