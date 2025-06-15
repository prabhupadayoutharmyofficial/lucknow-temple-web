
-- Create a storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true);

-- Create policy to allow authenticated users to upload event images
CREATE POLICY "Authenticated users can upload event images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'events');

-- Create policy to allow public read access to event images
CREATE POLICY "Public can view event images" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'events');

-- Create policy to allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update event images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'events');

-- Create policy to allow authenticated users to delete event images
CREATE POLICY "Authenticated users can delete event images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'events');
