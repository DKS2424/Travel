import React from 'react'
import { motion } from 'framer-motion'
import { Mountain, User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { AuthModal } from './AuthModal'

interface HeaderProps {
  onAdminToggle?: () => void
  showAdminPanel?: boolean
}

export const Header: React.FC<HeaderProps> = ({ onAdminToggle, showAdminPanel }) => {
  const { user, isAdminUser, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = React.useState(false)

  return (
    <>
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Mountain className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-800">TrekZone</h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-slate-700">
                      {user.email}
                    </p>
                    {isAdminUser && (
                      <p className="text-xs text-emerald-600 font-medium">Admin</p>
                    )}
                  </div>
                </div>
                
                {isAdminUser && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAdminToggle}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showAdminPanel 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={signOut}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuthModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
    
    {showAuthModal && (
      <AuthModal onClose={() => setShowAuthModal(false)} />
    )}
    </>
  )
}