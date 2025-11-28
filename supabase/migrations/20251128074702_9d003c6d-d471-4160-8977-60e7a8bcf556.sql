-- Drop the existing combined policy
DROP POLICY IF EXISTS "Admins and moderators can manage event media" ON event_media;

-- Create separate policies for better clarity
CREATE POLICY "Admins and moderators can insert event media"
ON event_media
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Admins and moderators can update event media"
ON event_media
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Admins and moderators can delete event media"
ON event_media
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);