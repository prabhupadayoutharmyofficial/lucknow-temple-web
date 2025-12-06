-- Create temple_info table
CREATE TABLE IF NOT EXISTS public.temple_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_name VARCHAR(255) NOT NULL UNIQUE,
      field_value TEXT NOT NULL,
        display_label VARCHAR(255),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );

            -- Create darshan_schedule table
            CREATE TABLE IF NOT EXISTS public.darshan_schedule (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                day_of_week VARCHAR(20) NOT NULL UNIQUE,
                  morning_time VARCHAR(50),
                    evening_time VARCHAR(50),
                      special_notes TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                          updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
                          );

                          -- Enable RLS
                          ALTER TABLE public.temple_info ENABLE ROW LEVEL SECURITY;
                          ALTER TABLE public.darshan_schedule ENABLE ROW LEVEL SECURITY;

                          -- Create policies for temple_info (public read, authenticated write)
                          CREATE POLICY "Public can view temple info" 
                          ON public.temple_info 
                          FOR SELECT 
                          TO public 
                          USING (true);

                          CREATE POLICY "Authenticated users can manage temple info" 
                          ON public.temple_info 
                          FOR ALL 
                          TO authenticated 
                          USING (true)
                          WITH CHECK (true);

                          -- Create policies for darshan_schedule (public read, authenticated write)
                          CREATE POLICY "Public can view darshan schedule" 
                          ON public.darshan_schedule 
                          FOR SELECT 
                          TO public 
                          USING (true);

                          CREATE POLICY "Authenticated users can manage darshan schedule" 
                          ON public.darshan_schedule 
                          FOR ALL 
                          TO authenticated 
                          USING (true)
                          WITH CHECK (true);

                          -- Insert sample data for temple_info
                          INSERT INTO public.temple_info (field_name, field_value, display_label) VALUES
                            ('address', 'ISKCON Temple, Amar Shaheed Path, Golf City, Sector-F, Ansal, Lucknow, Uttar Pradesh, India - 226030', 'Address'),
                              ('phone', '+91 123 456 7890', 'Phone'),
                                ('email', 'info@iskconlucknow.org', 'Email'),
                                  ('opening_hours', '4:30 AM - 12:30 PM, 4:00 PM - 8:30 PM', 'Opening Hours')
                                  ON CONFLICT (field_name) DO NOTHING;

                                  -- Insert sample data for darshan_schedule
                                  INSERT INTO public.darshan_schedule (day_of_week, morning_time, evening_time, special_notes) VALUES
                                    ('Monday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Regular darshan'),
                                      ('Tuesday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Regular darshan'),
                                        ('Wednesday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Regular darshan'),
                                          ('Thursday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Regular darshan'),
                                            ('Friday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Regular darshan'),
                                              ('Saturday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Special feast program'),
                                                ('Sunday', '4:30 AM - 12:30 PM', '4:00 PM - 8:30 PM', 'Bhagavad Gita class')
                                                ON CONFLICT (day_of_week) DO NOTHING;
                                                