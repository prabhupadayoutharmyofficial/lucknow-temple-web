-- Create RLS policies for photo_collections table
-- Allow everyone to view photo collections (public access)
CREATE POLICY "Anyone can view photo collections" 
ON public.photo_collections 
FOR SELECT 
USING (true);

-- Allow authenticated users to create photo collections
CREATE POLICY "Authenticated users can create photo collections" 
ON public.photo_collections 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update photo collections
CREATE POLICY "Authenticated users can update photo collections" 
ON public.photo_collections 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete photo collections
CREATE POLICY "Authenticated users can delete photo collections" 
ON public.photo_collections 
FOR DELETE 
USING (auth.uid() IS NOT NULL);