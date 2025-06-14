
-- Create photo_collections table
CREATE TABLE public.photo_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add collection_id column to gallery_photos table
ALTER TABLE public.gallery_photos 
ADD COLUMN collection_id UUID REFERENCES public.photo_collections(id) ON DELETE SET NULL;

-- Create index for better performance when filtering by collection
CREATE INDEX idx_gallery_photos_collection_id ON public.gallery_photos(collection_id);
