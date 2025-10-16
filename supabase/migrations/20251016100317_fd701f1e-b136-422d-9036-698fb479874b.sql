-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule keep-alive function to run every 6 hours
SELECT cron.schedule(
  'keep-alive-job',
  '0 */6 * * *',
  $$
  SELECT
    net.http_post(
      url := 'https://eovhdckcbrjiaadogehk.supabase.co/functions/v1/keep-alive',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvdmhkY2tjYnJqaWFhZG9nZWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzM1ODMsImV4cCI6MjA2NTMwOTU4M30.QMGJAmdrxWiKfkuiaIqbDXwBCGAGzhg_cHZOo33gt6g"}'::jsonb,
      body := concat('{"timestamp": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);
