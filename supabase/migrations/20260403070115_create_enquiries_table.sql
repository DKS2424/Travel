/*
  # Create enquiries table

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `trek_id` (uuid, foreign key to treks)
      - `user_email` (text, enquirer email)
      - `user_name` (text, enquirer name)
      - `user_phone` (text, enquirer phone number)
      - `message` (text, enquiry message)
      - `status` (text, enquiry status: pending, responded, rejected)
      - `created_at` (timestamptz, when enquiry was made)

  2. Security
    - Enable RLS on `enquiries` table
    - Add policy for anyone to create enquiries (public)
    - Add policy for authenticated users to view their own enquiries
    - Add policy for admin users to view all enquiries
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trek_id uuid NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  user_phone text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create enquiries"
  ON enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (user_email = auth.jwt()->>'email');

CREATE POLICY "Admins can view all enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' = 'admin@trekzone.com'
  );

CREATE POLICY "Admins can update enquiry status"
  ON enquiries
  FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@trekzone.com')
  WITH CHECK (auth.jwt()->>'email' = 'admin@trekzone.com');