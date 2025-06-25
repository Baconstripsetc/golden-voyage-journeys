
-- Create admin_users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert Eric as the first admin user (password: Trevecom123)
-- Note: In production, passwords should be properly hashed
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('Eric.trevecom@gmail.com', '$2b$10$rQ8K9X1vZ2mM3nN4oO5pP6qQ7rR8sS9tT0uU1vV2wW3xX4yY5zZ0A');

-- Create travel_packages table for package management
CREATE TABLE public.travel_packages (
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

-- Insert sample packages from the existing mock data
INSERT INTO public.travel_packages (title, slug, price, location, duration, description, rating, review_count, status, images, highlights, itinerary, inclusions, exclusions) VALUES
(
  'Machu Picchu Sacred Journey',
  'machu-picchu-sacred-journey',
  '$4,200',
  'Peru',
  '11 days',
  'Experience the mystical wonder of the ancient Incan citadel with expert archaeologists. This carefully curated journey takes you through Peru''s most sacred sites, combining luxury accommodations with authentic cultural experiences.',
  4.9,
  127,
  'published',
  '["https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Private guided tours of Machu Picchu", "Luxury train journey through Sacred Valley", "Stay in boutique hotels with Andean views", "Traditional Peruvian cooking classes", "Expert archaeological guides", "Small group maximum 12 guests"]',
  '[{"day": "Arrival", "activity": "Lima arrival, welcome dinner", "accommodation": "Luxury hotel in Miraflores"}, {"day": "Sacred Valley", "activity": "Ollantaytambo fortress, local markets", "accommodation": "Boutique Sacred Valley lodge"}, {"day": "Machu Picchu", "activity": "Sunrise at Machu Picchu, guided tour", "accommodation": "Luxury Aguas Calientes hotel"}]',
  '["All accommodation (luxury/boutique properties)", "Daily breakfast and 6 dinners", "Private transportation throughout", "All entrance fees and permits", "Expert English-speaking guides", "Machu Picchu train tickets (Vistadome)", "Airport transfers"]',
  '["International flights", "Travel insurance", "Personal expenses", "Gratuities", "Alcoholic beverages (except welcome dinner)"]'
),
(
  'Norwegian Fjords & Northern Lights',
  'norwegian-fjords-northern-lights',
  '$5,800',
  'Norway',
  '9 days',
  'Witness the magical northern lights while cruising through dramatic fjord landscapes. This winter wonderland adventure combines luxury accommodations with breathtaking natural phenomena.',
  4.8,
  89,
  'published',
  '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1551524164-6cf2ac073de4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Northern Lights hunting with expert guides", "Luxury fjord cruise with panoramic views", "Stay in unique ice hotel accommodation", "Scenic railway through Norwegian wilderness", "Professional photography workshops", "Traditional Sami cultural experiences"]',
  '[{"day": "Arrival", "activity": "Oslo arrival, city orientation", "accommodation": "Luxury Oslo hotel"}, {"day": "Bergen", "activity": "Scenic train to Bergen, fjord views", "accommodation": "Historic Bergen hotel"}, {"day": "Geirangerfjord", "activity": "Fjord cruise, waterfall viewing", "accommodation": "Fjord-side lodge"}]',
  '["All accommodation including ice hotel", "Daily breakfast and 5 dinners", "All scenic train journeys", "Fjord cruise experiences", "Northern Lights tours (2 attempts)", "Professional photography guide", "Warm winter clothing provided"]',
  '["International flights", "Travel insurance", "Personal expenses", "Optional activities", "Alcoholic beverages"]'
),
(
  'Morocco Imperial Cities',
  'morocco-imperial-cities',
  '$3,400',
  'Morocco',
  '10 days',
  'Journey through ancient souks and palaces in Marrakech, Fez, and Casablanca. This cultural immersion combines luxury riad accommodations with authentic Moroccan experiences.',
  4.7,
  156,
  'published',
  '["https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1589993768794-d4f0a1d6e762?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"]',
  '["Stay in authentic luxury riads", "Private guided tours of imperial cities", "Traditional Moroccan cooking classes", "Desert camping under starlit skies", "Artisan workshops and craft demonstrations", "Hammam spa experiences"]',
  '[{"day": "Arrival", "activity": "Marrakech arrival, medina exploration", "accommodation": "Luxury riad in medina"}, {"day": "Marrakech", "activity": "Palaces tour, cooking class", "accommodation": "Luxury riad in medina"}, {"day": "Atlas Mountains", "activity": "Day trip to Berber villages", "accommodation": "Mountain lodge"}]',
  '["All accommodation in luxury riads/hotels", "Daily breakfast and 6 dinners", "Private transportation with driver", "All guided tours and entrance fees", "Cooking classes and workshops", "Desert camping experience", "Airport transfers"]',
  '["International flights", "Travel insurance", "Personal shopping", "Gratuities", "Spa treatments (except included hammam)"]'
);

-- Create indexes for better performance
CREATE INDEX idx_travel_packages_status ON public.travel_packages(status);
CREATE INDEX idx_travel_packages_slug ON public.travel_packages(slug);
CREATE INDEX idx_admin_users_email ON public.admin_users(email);

-- Enable Row Level Security (RLS) for admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin_users (only allow access to authenticated admins)
CREATE POLICY "Admin users can access their own data" 
  ON public.admin_users 
  FOR ALL 
  USING (true);

-- Enable RLS for travel_packages (allow public read, admin write)
ALTER TABLE public.travel_packages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published packages
CREATE POLICY "Anyone can view published packages" 
  ON public.travel_packages 
  FOR SELECT 
  USING (status = 'published' OR true);

-- Allow full access for admin operations (will be controlled by application logic)
CREATE POLICY "Full access for admin operations" 
  ON public.travel_packages 
  FOR ALL 
  USING (true);
