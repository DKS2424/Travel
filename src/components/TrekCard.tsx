import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, DollarSign, X, Star, Shield, Camera, Mountain } from 'lucide-react'
import { Trek } from '../types'

interface TrekCardProps {
  trek: Trek
  index: number
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-orange-100 text-orange-800',
  Expert: 'bg-red-100 text-red-800'
}

const difficultyIcons = {
  Easy: '🌱',
  Moderate: '⚡',
  Hard: '🔥',
  Expert: '💀'
}

export const TrekCard: React.FC<TrekCardProps> = ({ trek, index }) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    hover: { 
      y: -4, 
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover="hover"
        variants={hoverVariants}
        className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        <div className="relative overflow-hidden">
          <motion.img 
            src={trek.image_url} 
            alt={trek.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div 
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${difficultyColors[trek.difficulty]}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
          >
            <span className="mr-1">{difficultyIcons[trek.difficulty]}</span>
            {trek.difficulty}
          </motion.div>
          
          <motion.div
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <div className="flex items-center space-x-1">
              <DollarSign className="h-3 w-3 text-emerald-600" />
              <span className="text-sm font-bold text-slate-800">{trek.price}</span>
            </div>
          </motion.div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-200"
          >
            {trek.title}
          </motion.h3>
          
          <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
            {trek.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
              <span>{trek.location}</span>
            </div>
            
            <div className="flex items-center text-slate-500 text-sm">
              <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
              <span>{formatDate(trek.start_date)} - {formatDate(trek.end_date)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-slate-500">
                <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                <span>{trek.duration}</span>
              </div>
              
              <div className="flex items-center text-slate-500">
                <Users className="h-4 w-4 mr-2 text-emerald-600" />
                <span>{trek.current_participants}/{trek.max_participants}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2 flex-1 mr-4">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(trek.current_participants / trek.max_participants) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                />
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {Math.round((trek.current_participants / trek.max_participants) * 100)}%
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <img 
                  src={trek.image_url} 
                  alt={trek.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <button
                  onClick={() => setShowDetails(false)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <div className="absolute bottom-6 left-6 text-white">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold mb-2"
                  >
                    {trek.title}
                  </motion.h1>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center space-x-4"
                  >
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[trek.difficulty]} bg-opacity-90`}>
                      <span className="mr-1">{difficultyIcons[trek.difficulty]}</span>
                      {trek.difficulty}
                    </div>
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">${trek.price}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Quick Info Grid */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <MapPin className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-semibold text-slate-800">{trek.location}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Duration</p>
                    <p className="font-semibold text-slate-800">{trek.duration}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Participants</p>
                    <p className="font-semibold text-slate-800">{trek.current_participants}/{trek.max_participants}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Rating</p>
                    <p className="font-semibold text-slate-800">4.8/5</p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Mountain className="h-5 w-5 mr-2 text-emerald-600" />
                    About This Trek
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {trek.description}
                  </p>
                </motion.div>

                {/* Dates */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                    Trek Schedule
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 rounded-xl">
                      <p className="text-emerald-600 font-medium mb-1">Start Date</p>
                      <p className="text-slate-800 font-semibold">{formatFullDate(trek.start_date)}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <p className="text-blue-600 font-medium mb-1">End Date</p>
                      <p className="text-slate-800 font-semibold">{formatFullDate(trek.end_date)}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-emerald-600" />
                    What's Included
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Professional guide',
                      'Safety equipment',
                      'Meals during trek',
                      'Accommodation',
                      'Transportation',
                      'First aid kit',
                      'Photography service',
                      'Certificate of completion'
                    ].map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + idx * 0.05 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-slate-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Booking Section */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Ready to Book?</h4>
                      <p className="text-slate-600">
                        {trek.max_participants - trek.current_participants} spots remaining
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(trek.current_participants / trek.max_participants) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-500">
                          {Math.round((trek.current_participants / trek.max_participants) * 100)}% full
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-slate-800 mb-2">
                        ${trek.price}
                        <span className="text-lg text-slate-500 font-normal"> /person</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={trek.current_participants >= trek.max_participants}
                      >
                        {trek.current_participants >= trek.max_participants ? 'Fully Booked' : 'Book Now'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}