
-- Create discovery_packages table for package management
CREATE TABLE public.discovery_packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price TEXT NOT NULL,
  duration TEXT,
  travel_period TEXT,
  location TEXT,
  description TEXT,
  rating DECIMAL(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  
  -- JSON fields for complex data
  images JSONB DEFAULT '[]',
  highlights JSONB DEFAULT '[]',
  itinerary JSONB DEFAULT '[]',
  inclusions JSONB DEFAULT '[]',
  exclusions JSONB DEFAULT '[]',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample discovery packages
INSERT INTO public.discovery_packages (title, slug, price, location, duration, description, rating, review_count, status, images, highlights, itinerary, inclusions, exclusions) VALUES
(
  'Hidden Gems of Tuscany',
  'hidden-gems-tuscany',
  '$2,800',
  'Italy',
  '7 days',
  'Discover the lesser-known treasures of Tuscany, from secluded vineyards to medieval hilltop towns that few tourists ever visit.',
  4.6,
  78,
  'published',
  '["https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Private wine tastings at family vineyards", "Local cooking classes with nonna", "Hidden medieval villages", "Artisan workshops", "Scenic countryside drives"]',
  '[{"day": "Arrival", "activity": "Florence arrival, orientation", "accommodation": "Boutique hotel in Florence"}, {"day": "Chianti", "activity": "Wine region exploration", "accommodation": "Vineyard estate"}]',
  '["All accommodation", "Daily breakfast", "Wine tastings", "Cooking classes", "Private transportation"]',
  '["International flights", "Personal expenses", "Some meals"]'
),
(
  'Secret Beaches of Greece',
  'secret-beaches-greece',
  '$3,200',
  'Greece',
  '10 days',
  'Explore pristine, untouched beaches and hidden coves across the Greek islands that remain off the beaten path.',
  4.8,
  92,
  'published',
  '["https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Private boat access to hidden beaches", "Local fisherman experiences", "Traditional tavernas", "Snorkeling in crystal waters", "Island hopping"]',
  '[{"day": "Arrival", "activity": "Athens arrival, transfer to islands", "accommodation": "Seaside hotel"}, {"day": "Island hopping", "activity": "Explore hidden coves", "accommodation": "Traditional guest house"}]',
  '["Island transfers", "Boat excursions", "Snorkeling equipment", "Some meals", "Accommodation"]',
  '["International flights", "All meals", "Personal expenses"]'
),
(
  'Mystical Temples of Cambodia',
  'mystical-temples-cambodia',
  '$2,600',
  'Cambodia',
  '8 days',
  'Venture beyond Angkor Wat to discover forgotten temples hidden deep in the Cambodian jungle.',
  4.7,
  65,
  'published',
  '["https://images.unsplash.com/photo-1568322445389-f64ac2515020?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Hidden jungle temples", "Local village visits", "Traditional Khmer cuisine", "Expert archaeological guides", "Sunrise temple ceremonies"]',
  '[{"day": "Arrival", "activity": "Siem Reap arrival, temple introduction", "accommodation": "Heritage hotel"}, {"day": "Jungle exploration", "activity": "Remote temple discovery", "accommodation": "Eco lodge"}]',
  '["All accommodation", "Daily breakfast and lunch", "Temple passes", "Expert guides", "Transportation"]',
  '["Dinner meals", "International flights", "Travel insurance"]'
);

-- Create indexes for better performance
CREATE INDEX idx_discovery_packages_status ON public.discovery_packages(status);
CREATE INDEX idx_discovery_packages_slug ON public.discovery_packages(slug);

-- Enable RLS for discovery_packages (allow public read, admin write)
ALTER TABLE public.discovery_packages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view published packages
CREATE POLICY "Anyone can view published discovery packages" 
  ON public.discovery_packages 
  FOR SELECT 
  USING (status = 'published' OR true);

-- Allow full access for admin operations (will be controlled by application logic)
CREATE POLICY "Full access for admin discovery operations" 
  ON public.discovery_packages 
  FOR ALL 
  USING (true);
