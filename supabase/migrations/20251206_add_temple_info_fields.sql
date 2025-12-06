-- Add missing temple info fields
DELETE FROM public.temple_info WHERE field_name IN ('address', 'email', 'phone', 'timings', 'website', 'opening_hours');

INSERT INTO public.temple_info (field_name, field_value, display_label) VALUES
  ('address', 'Plot No. 1, Sector 7, Vrindavan Yojana, Lucknow, Uttar Pradesh 226029', 'Address'),
  ('email', 'info@iskconlucknow.org', 'Email'),
  ('phone', '+91 522 2345678', 'Phone'),
  ('timings', 'Daily: 4:30 AM - 12:30 PM, 4:00 PM - 8:30 PM', 'Temple Timings'),
  ('website', 'www.iskconlucknow.org', 'Website');
