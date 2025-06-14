
-- Create admin_popup table
CREATE TABLE public.admin_popup (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.admin_popup ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read enabled popups
CREATE POLICY "Anyone can view enabled popups" 
  ON public.admin_popup 
  FOR SELECT 
  USING (is_enabled = true);

-- Create policy that allows admins to manage all popups
CREATE POLICY "Admins can manage all popups" 
  ON public.admin_popup 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
