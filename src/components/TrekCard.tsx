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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={trek.image_url} 
          alt={trek.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div 
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[trek.difficulty]}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {trek.difficulty}
        </motion.div>
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors"
          layout
        >
          {trek.title}
        </motion.h3>
        
        <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {trek.description}
        </p>
        
        <div className="space-y-3 mb-4">
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
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span className="text-2xl font-bold text-slate-800">{trek.price}</span>
            <span className="text-slate-500 ml-1">USD</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}