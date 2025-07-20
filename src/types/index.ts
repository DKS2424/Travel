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
  created_at: string
  created_by: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
}