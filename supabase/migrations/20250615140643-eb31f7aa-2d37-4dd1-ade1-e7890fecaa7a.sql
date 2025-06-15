
ALTER TABLE public.events
ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN scheduled_publish TIMESTAMPTZ;
