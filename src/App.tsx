import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mountain } from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrekCard } from './components/TrekCard'
import { AdminPanel } from './components/AdminPanel'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useAuth } from './hooks/useAuth'
import { useTreks } from './hooks/useTreks'

function App() {
  const { loading: authLoading, user, isAdminUser } = useAuth()
  const { treks, loading: treksLoading } = useTreks()
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  if (authLoading || treksLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        onAdminToggle={() => setShowAdminPanel(!showAdminPanel)}
        showAdminPanel={showAdminPanel}
      />
      
      <Hero />
      
      <main className="container mx-auto px-4 py-16">
        {user && isAdminUser && showAdminPanel && (
          <AdminPanel />
        )}
        
        <motion.section
          id="treks"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-slate-800 mb-4"
            >
              Upcoming Treks
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Choose from our carefully curated selection of adventures, each designed to 
              challenge and inspire while providing unforgettable experiences.
            </motion.p>
          </div>
          
          {treks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-xl text-slate-500">
                {treksLoading ? 'Loading treks...' : 'No treks available at the moment.'}
              </p>
              {isAdminUser && (
                <p className="text-slate-400 mt-2">Add some treks using the admin panel!</p>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treks.map((trek, index) => (
                <TrekCard key={trek.id} trek={trek} index={index} />
              ))}
            </div>
          )}
        </motion.section>
        
        {!user && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-white rounded-xl shadow-lg"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Sign in to book your trek and join our community of adventurers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl transition-colors"
            >
              Sign In to Book
            </motion.button>
          </motion.section>
        )}
      </main>
      
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Mountain className="h-8 w-8 text-emerald-400" />
            <h3 className="text-2xl font-bold">TrekZone</h3>
          </div>
          <p className="text-slate-400">
            © 2025 TrekZone. Discover the world, one step at a time.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App