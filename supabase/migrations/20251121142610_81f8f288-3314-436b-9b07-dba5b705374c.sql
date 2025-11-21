-- Create event_media table for storing multiple images/videos per event
CREATE TABLE public.event_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;

-- Create policies for event_media
CREATE POLICY "Anyone can view event media"
  ON public.event_media
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage event media"
  ON public.event_media
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create index for better query performance
CREATE INDEX idx_event_media_event_id ON public.event_media(event_id);
CREATE INDEX idx_event_media_display_order ON public.event_media(display_order);