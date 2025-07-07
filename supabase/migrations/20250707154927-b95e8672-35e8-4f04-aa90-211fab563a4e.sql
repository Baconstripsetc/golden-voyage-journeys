
-- Add videos column to travel_packages table
ALTER TABLE public.travel_packages 
ADD COLUMN videos jsonb DEFAULT '[]'::jsonb;

-- Add videos column to discovery_packages table  
ALTER TABLE public.discovery_packages 
ADD COLUMN videos jsonb DEFAULT '[]'::jsonb;

-- Create a function to validate video data structure
CREATE OR REPLACE FUNCTION validate_videos_array(videos jsonb)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if it's an array
  IF jsonb_typeof(videos) != 'array' THEN
    RETURN false;
  END IF;
  
  -- Check each video object has required fields
  FOR i IN 0..(jsonb_array_length(videos) - 1) LOOP
    IF NOT (
      videos->i ? 'id' AND
      videos->i ? 'type' AND
      videos->i ? 'url' AND
      videos->i ? 'order'
    ) THEN
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$;

-- Add check constraint to ensure videos array is valid
ALTER TABLE public.travel_packages 
ADD CONSTRAINT videos_format_check 
CHECK (validate_videos_array(videos));

ALTER TABLE public.discovery_packages 
ADD CONSTRAINT videos_format_check 
CHECK (validate_videos_array(videos));
