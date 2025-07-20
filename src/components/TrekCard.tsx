import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, DollarSign, Star } from 'lucide-react'
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

export const TrekCard: React.FC<TrekCardProps> = ({ trek, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={trek.image_url} 
          alt={trek.title}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[trek.difficulty]}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.3 + index * 0.1, 
            type: "spring", 
            stiffness: 200 
          }}
          whileHover={{ scale: 1.1 }}
        >
          {trek.difficulty}
        </motion.div>
        
        {/* Floating price badge */}
        <motion.div
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">{trek.price}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300"
          layout
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {trek.title}
        </motion.h3>
        
        <motion.p 
          className="text-slate-600 mb-4 line-clamp-3 leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {trek.description}
        </motion.p>
        
        <div className="space-y-3 mb-4">
          <motion.div 
            className="flex items-center text-slate-500 text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{trek.location}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-slate-500 text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{formatDate(trek.start_date)} - {formatDate(trek.end_date)}</span>
          </motion.div>
          
          <div className="flex items-center justify-between text-sm">
            <motion.div 
              className="flex items-center text-slate-500"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Clock className="h-4 w-4 mr-2 text-emerald-600" />
              <span>{trek.duration}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center text-slate-500"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-4 w-4 mr-2 text-emerald-600" />
              <span>{trek.current_participants}/{trek.max_participants}</span>
            </motion.div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(trek.current_participants / trek.max_participants) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </motion.div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {Math.round((trek.current_participants / trek.max_participants) * 100)}%
            </span>
          </motion.div>
          
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}