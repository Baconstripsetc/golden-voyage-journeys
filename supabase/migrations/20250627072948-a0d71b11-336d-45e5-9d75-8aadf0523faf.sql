
-- Create storage bucket for package images
INSERT INTO storage.buckets (id, name, public) VALUES ('package-images', 'package-images', true);

-- Create RLS policies for package images storage
CREATE POLICY "Anyone can view package images" ON storage.objects
  FOR SELECT USING (bucket_id = 'package-images');

CREATE POLICY "Authenticated users can upload package images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'package-images');

CREATE POLICY "Authenticated users can update package images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'package-images');

CREATE POLICY "Authenticated users can delete package images" ON storage.objects
  FOR DELETE USING (bucket_id = 'package-images');

-- Update travel_packages table to ensure proper data structure
ALTER TABLE public.travel_packages 
  ALTER COLUMN images SET DEFAULT '[]'::jsonb,
  ALTER COLUMN highlights SET DEFAULT '[]'::jsonb,
  ALTER COLUMN itinerary SET DEFAULT '[]'::jsonb,
  ALTER COLUMN inclusions SET DEFAULT '[]'::jsonb,
  ALTER COLUMN exclusions SET DEFAULT '[]'::jsonb;

-- Update discovery_packages table to ensure proper data structure  
ALTER TABLE public.discovery_packages 
  ALTER COLUMN images SET DEFAULT '[]'::jsonb,
  ALTER COLUMN highlights SET DEFAULT '[]'::jsonb,
  ALTER COLUMN itinerary SET DEFAULT '[]'::jsonb,
  ALTER COLUMN inclusions SET DEFAULT '[]'::jsonb,
  ALTER COLUMN exclusions SET DEFAULT '[]'::jsonb;

-- Add function to generate unique slugs
CREATE OR REPLACE FUNCTION generate_unique_slug(title_text TEXT, table_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
  exists_check BOOLEAN := TRUE;
BEGIN
  -- Generate base slug
  base_slug := lower(regexp_replace(title_text, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  
  final_slug := base_slug;
  
  -- Check if slug exists and increment if needed
  WHILE exists_check LOOP
    IF table_name = 'travel_packages' THEN
      SELECT EXISTS(SELECT 1 FROM travel_packages WHERE slug = final_slug) INTO exists_check;
    ELSIF table_name = 'discovery_packages' THEN
      SELECT EXISTS(SELECT 1 FROM discovery_packages WHERE slug = final_slug) INTO exists_check;
    END IF;
    
    IF exists_check THEN
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END IF;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;
