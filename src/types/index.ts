export interface Trek {
  id: string
  title: string
  description: string
  location: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert'
  price: number
  image_url: string
  start_date: string
  end_date: string
  max_participants: number
  current_participants: number
  inclusions: string[]
  exclusions: string[]
  things_to_carry: string[]
  itinerary: ItineraryDay[]
  created_at: string
  created_by: string
}

export interface ItineraryDay {
  day: number
  title: string
  activities: ItineraryActivity[]
}

export interface ItineraryActivity {
  id: string
  time: string
  description: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
}

export interface Enquiry {
  id: string
  trek_id: string
  user_email: string
  user_name: string
  user_phone: string
  message: string
  status: 'pending' | 'responded' | 'rejected'
  created_at: string
}