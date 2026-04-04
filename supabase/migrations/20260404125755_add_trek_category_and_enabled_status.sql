/*
  # Add Trek Category and Enabled Status
  
  ## Changes Made
  
  1. New Columns Added to `treks` table:
    - `category` (text) - Trek category (summer, winter, seasonal, all-season)
    - `is_enabled` (boolean) - Whether the trek is visible/bookable
  
  2. Default Values:
    - `category` defaults to 'all-season'
    - `is_enabled` defaults to true
  
  ## Notes
  - Existing treks will automatically get category='all-season' and is_enabled=true
  - Category constraint ensures only valid categories are used
*/

-- Add category column with constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'treks' AND column_name = 'category'
  ) THEN
    ALTER TABLE treks ADD COLUMN category text DEFAULT 'all-season';
    ALTER TABLE treks ADD CONSTRAINT treks_category_check 
      CHECK (category IN ('summer', 'winter', 'seasonal', 'all-season'));
  END IF;
END $$;

-- Add is_enabled column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'treks' AND column_name = 'is_enabled'
  ) THEN
    ALTER TABLE treks ADD COLUMN is_enabled boolean DEFAULT true;
  END IF;
END $$;
