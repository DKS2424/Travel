/*
  # Create treks management system

  1. New Tables
    - `treks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `location` (text)
      - `duration` (text)
      - `difficulty` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `max_participants` (integer)
      - `current_participants` (integer)
      - `created_at` (timestamp)
      - `created_by` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `treks` table
    - Add policies for public read access
    - Add policies for authenticated users to create treks (admin only in app logic)
    - Add policies for creators to update/delete their treks
*/

CREATE TABLE IF NOT EXISTS treks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  duration text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Hard', 'Expert')),
  price numeric NOT NULL DEFAULT 0,
  image_url text DEFAULT 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
  start_date date NOT NULL,
  end_date date NOT NULL,
  max_participants integer DEFAULT 20,
  current_participants integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE treks ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read treks
CREATE POLICY "Treks are viewable by everyone"
  ON treks
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create treks
CREATE POLICY "Authenticated users can create treks"
  ON treks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Allow creators to update their treks
CREATE POLICY "Users can update their own treks"
  ON treks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow creators to delete their treks
CREATE POLICY "Users can delete their own treks"
  ON treks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Insert some sample data
INSERT INTO treks (title, description, location, duration, difficulty, price, start_date, end_date, image_url) VALUES
  (
    'Himalayan Base Camp Trek',
    'An incredible journey to the base camp of the world''s highest peaks. Experience breathtaking views, diverse landscapes, and rich cultural encounters with local communities.',
    'Nepal, Himalayas',
    '14 days',
    'Hard',
    2999,
    '2025-03-15',
    '2025-03-29',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg'
  ),
  (
    'Inca Trail Adventure',
    'Follow the ancient paths of the Incas through cloud forests and archaeological wonders, culminating at the magnificent Machu Picchu.',
    'Peru, Andes',
    '4 days',
    'Moderate',
    899,
    '2025-04-10',
    '2025-04-14',
    'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg'
  ),
  (
    'Patagonia Wilderness Trek',
    'Explore the wild beauty of Patagonia with its dramatic landscapes, glacial lakes, and towering granite peaks in this unforgettable adventure.',
    'Chile/Argentina, Patagonia',
    '10 days',
    'Hard',
    2199,
    '2025-02-20',
    '2025-03-02',
    'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg'
  ),
  (
    'Alpine Lakes Circuit',
    'A scenic trek through pristine alpine lakes, meadows filled with wildflowers, and charming mountain villages in the heart of the Alps.',
    'Switzerland, Alps',
    '7 days',
    'Moderate',
    1599,
    '2025-06-01',
    '2025-06-08',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
  ),
  (
    'Kilimanjaro Summit Challenge',
    'Conquer Africa''s highest peak through diverse ecosystems, from tropical forests to arctic conditions at the summit.',
    'Tanzania, East Africa',
    '8 days',
    'Hard',
    1899,
    '2025-05-15',
    '2025-05-23',
    'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg'
  ),
  (
    'Japanese Mountain Trail',
    'Experience Japan''s sacred mountains, ancient temples, and hot springs while trekking through some of the country''s most beautiful landscapes.',
    'Japan, Honshu',
    '6 days',
    'Easy',
    1299,
    '2025-04-05',
    '2025-04-11',
    'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
  );