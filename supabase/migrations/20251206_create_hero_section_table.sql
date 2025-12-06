-- Create hero_section table
CREATE TABLE IF NOT EXISTS public.hero_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL DEFAULT 'Shri Shri Radha Raman Bihari',
  subtitle VARCHAR(255) NOT NULL DEFAULT 'Iskcon Lucknow Temple',
  background_image TEXT,
  cta_primary_text VARCHAR(100) DEFAULT 'Visit the Temple',
  cta_primary_link VARCHAR(255) DEFAULT '/visit',
  cta_secondary_text VARCHAR(100) DEFAULT 'View Schedule',
  cta_secondary_link VARCHAR(255) DEFAULT '/darshan',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;

-- Create policies for hero_section (public read, authenticated write)
CREATE POLICY "Public can view hero section" 
ON public.hero_section 
FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Authenticated users can manage hero section" 
ON public.hero_section 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Insert default hero section data
INSERT INTO public.hero_section (title, subtitle, background_image, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link)
VALUES (
  'Shri Shri Radha Raman Bihari',
  'Iskcon Lucknow Temple',
  'https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/background.jpg',
  'Visit the Temple',
  '/visit',
  'View Schedule',
  '/darshan'
)
ON CONFLICT DO NOTHING;
