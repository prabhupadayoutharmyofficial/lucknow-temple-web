-- Drop existing policy and create new one to allow moderators
DROP POLICY IF EXISTS "Admins can manage event media" ON event_media;

-- Create new policy that allows both admins and moderators
CREATE POLICY "Admins and moderators can manage event media"
ON event_media
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);

-- Ensure the select policy remains unchanged
-- (Anyone can view event media policy already exists)