
-- Create festival_calendar table
CREATE TABLE public.festival_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  month TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.festival_calendar ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" 
  ON public.festival_calendar 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policy to allow authenticated users to insert (admin check can be added later)
CREATE POLICY "Allow authenticated users to insert" 
  ON public.festival_calendar 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated users to update" 
  ON public.festival_calendar 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete" 
  ON public.festival_calendar 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Insert some sample festival data
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
