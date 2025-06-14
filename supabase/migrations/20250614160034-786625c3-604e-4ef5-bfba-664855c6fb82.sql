
-- Create a storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'gallery-images');

-- Create policy to allow public read access to gallery images
CREATE POLICY "Public can view gallery images" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'gallery-images');

-- Create policy to allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'gallery-images');

-- Create policy to allow authenticated users to delete gallery images
CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'gallery-images');
