-- Add media_type column to gallery_photos table to support videos
ALTER TABLE gallery_photos 
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video'));

-- Update existing rows to have 'image' as media_type
UPDATE gallery_photos SET media_type = 'image' WHERE media_type IS NULL;

-- Create storage bucket for videos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-videos', 'gallery-videos', true)
ON CONFLICT (id) DO NOTHING;