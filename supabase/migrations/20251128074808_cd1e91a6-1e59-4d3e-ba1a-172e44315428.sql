-- Allow authenticated users to manage objects in the 'gallery-videos' bucket
CREATE POLICY "Authenticated can upload gallery videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-videos');

CREATE POLICY "Authenticated can update gallery videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-videos')
WITH CHECK (bucket_id = 'gallery-videos');

CREATE POLICY "Authenticated can delete gallery videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-videos');

-- Ensure public read access to gallery videos
CREATE POLICY "Public can view gallery videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery-videos');