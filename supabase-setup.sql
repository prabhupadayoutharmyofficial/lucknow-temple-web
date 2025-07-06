-- COMPLETE SUPABASE SETUP FOR ISKCON LUCKNOW TEMPLE WEBSITE
-- Run this entire script in your Supabase SQL Editor

-- ============================================
-- 1. FUNCTIONS
-- ============================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$;

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================
-- 2. TABLES
-- ============================================

-- Profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user'::text
);

-- Devotee registrations table
CREATE TABLE public.devotee_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  reference_devotee TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT,
  image TEXT NOT NULL,
  highlights TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT true,
  scheduled_publish TIMESTAMP WITH TIME ZONE
);

-- Festival calendar table
CREATE TABLE public.festival_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Darshan schedule table
CREATE TABLE public.darshan_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week TEXT NOT NULL,
  morning_time TEXT,
  evening_time TEXT,
  special_notes TEXT,
  updated_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Temple info table
CREATE TABLE public.temple_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  field_name TEXT NOT NULL,
  field_value TEXT NOT NULL,
  display_label TEXT NOT NULL,
  updated_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Hero section table
CREATE TABLE public.hero_section (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  background_image TEXT NOT NULL,
  cta_primary_text TEXT NOT NULL,
  cta_primary_link TEXT NOT NULL,
  cta_secondary_text TEXT NOT NULL,
  cta_secondary_link TEXT NOT NULL,
  updated_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Admin popup table
CREATE TABLE public.admin_popup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Photo collections table
CREATE TABLE public.photo_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Gallery photos table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  collection_id UUID,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- 3. FOREIGN KEYS
-- ============================================

ALTER TABLE public.events 
ADD CONSTRAINT events_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(id);

ALTER TABLE public.darshan_schedule 
ADD CONSTRAINT darshan_schedule_updated_by_fkey 
FOREIGN KEY (updated_by) REFERENCES public.profiles(id);

ALTER TABLE public.temple_info 
ADD CONSTRAINT temple_info_updated_by_fkey 
FOREIGN KEY (updated_by) REFERENCES public.profiles(id);

ALTER TABLE public.hero_section 
ADD CONSTRAINT hero_section_updated_by_fkey 
FOREIGN KEY (updated_by) REFERENCES public.profiles(id);

ALTER TABLE public.gallery_photos 
ADD CONSTRAINT gallery_photos_collection_id_fkey 
FOREIGN KEY (collection_id) REFERENCES public.photo_collections(id);

-- ============================================
-- 4. TRIGGERS
-- ============================================

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_devotee_registrations_updated_at
  BEFORE UPDATE ON public.devotee_registrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_festival_calendar_updated_at
  BEFORE UPDATE ON public.festival_calendar
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_popup_updated_at
  BEFORE UPDATE ON public.admin_popup
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotee_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festival_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.darshan_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temple_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_popup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Devotee registrations policies
CREATE POLICY "Users can view their own registration" 
ON public.devotee_registrations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registration" 
ON public.devotee_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registration" 
ON public.devotee_registrations FOR UPDATE USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Anyone can view events" 
ON public.events FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" 
ON public.events FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Festival calendar policies
CREATE POLICY "Allow public read access" 
ON public.festival_calendar FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert" 
ON public.festival_calendar FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" 
ON public.festival_calendar FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated users to delete" 
ON public.festival_calendar FOR DELETE USING (true);

-- Darshan schedule policies
CREATE POLICY "Anyone can view darshan schedule" 
ON public.darshan_schedule FOR SELECT USING (true);

CREATE POLICY "Admins can manage darshan schedule" 
ON public.darshan_schedule FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Temple info policies
CREATE POLICY "Anyone can view temple info" 
ON public.temple_info FOR SELECT USING (true);

CREATE POLICY "Admins can manage temple info" 
ON public.temple_info FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Hero section policies
CREATE POLICY "Anyone can view hero section" 
ON public.hero_section FOR SELECT USING (true);

CREATE POLICY "Admins can manage hero section" 
ON public.hero_section FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Admin popup policies
CREATE POLICY "Anyone can view enabled popups" 
ON public.admin_popup FOR SELECT USING (is_enabled = true);

CREATE POLICY "Admins can manage all popups" 
ON public.admin_popup FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Gallery photos policies
CREATE POLICY "Anyone can view gallery photos" 
ON public.gallery_photos FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create gallery photos" 
ON public.gallery_photos FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery photos" 
ON public.gallery_photos FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete gallery photos" 
ON public.gallery_photos FOR DELETE USING (true);

-- ============================================
-- 6. STORAGE BUCKETS
-- ============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('events', 'events', true);

-- Storage policies for gallery-images bucket
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images');

-- Storage policies for events bucket
CREATE POLICY "Event images are publicly accessible" 
ON storage.objects FOR SELECT USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'events');

CREATE POLICY "Authenticated users can update event images" 
ON storage.objects FOR UPDATE USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can delete event images" 
ON storage.objects FOR DELETE USING (bucket_id = 'events');

-- ============================================
-- 7. SAMPLE DATA
-- ============================================

-- Insert sample festival data
INSERT INTO public.festival_calendar (name, date, month, description) VALUES
('Vaikuntha Ekadashi', 'January 2, 2025', 'January', 'Important Ekadashi for spiritual advancement'),
('Putrada Ekadashi', 'January 16, 2025', 'January', 'Ekadashi for blessing of children'),
('Vasant Panchami', 'February 4, 2025', 'February', 'Festival of spring and learning'),
('Nityananda Trayodashi', 'February 12, 2025', 'February', 'Appearance day of Lord Nityananda'),
('Gaura Purnima', 'March 14, 2025', 'March', 'Appearance day of Lord Chaitanya'),
('Ram Navami', 'March 30, 2025', 'March', 'Appearance day of Lord Rama'),
('Narsimha Chaturdasi', 'April 23, 2025', 'April', 'Appearance day of Lord Narsimha'),
('Panihati Cida Dahi Festival', 'May 10, 2025', 'May', 'Festival of chipped rice and yogurt'),
('Ratha Yatra', 'June 29, 2025', 'June', 'Festival of chariots'),
('Guru Purnima', 'July 12, 2025', 'July', 'Day to honor spiritual teachers'),
('Janmashtami', 'August 15, 2025', 'August', 'Appearance day of Lord Krishna'),
('Srila Prabhupada Appearance Day', 'August 29, 2025', 'August', 'Founder-Acharya appearance day'),
('Radhastami', 'September 5, 2025', 'September', 'Appearance day of Srimati Radharani'),
('Kartik Month Begins', 'October 15, 2025', 'October', 'Most sacred month begins'),
('Govardhan Puja', 'October 31, 2025', 'October', 'Celebration of Govardhan Hill'),
('Tulasi-Saligram Vivaha', 'November 11, 2025', 'November', 'Marriage ceremony of Tulasi and Saligram'),
('Gita Jayanti', 'December 2, 2025', 'December', 'Appearance day of Bhagavad Gita');

-- Insert default darshan schedule
INSERT INTO public.darshan_schedule (day_of_week, morning_time, evening_time) VALUES
('Monday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Tuesday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Wednesday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Thursday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Friday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Saturday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM'),
('Sunday', '4:30 AM - 12:30 PM', '4:30 PM - 9:00 PM');

-- Insert default temple info
INSERT INTO public.temple_info (field_name, field_value, display_label) VALUES
('address', 'Sector 7, Vrindavan Yojana, Lucknow, Uttar Pradesh 226029', 'Temple Address'),
('phone', '+91-522-2234567', 'Phone Number'),
('email', 'info@iskconlucknow.org', 'Email Address'),
('website', 'www.iskconlucknow.org', 'Website');

-- Insert default hero section
INSERT INTO public.hero_section (title, subtitle, background_image, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link) VALUES
('Welcome to ISKCON Lucknow', 'Sri Sri Radha Krishna Temple', '/background.jpg', 'Visit Temple', '/visit', 'Upcoming Events', '/events');

-- Create an admin user (you'll need to update this with your actual user ID after creating an account)
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin-email@example.com';