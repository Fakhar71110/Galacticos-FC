-- Seed initial data for the football club website

-- Insert default club settings
INSERT INTO public.club_settings (
  club_name,
  club_slogan,
  founded_year,
  home_ground,
  club_colors,
  about_text,
  contact_email
) VALUES (
  'Local FC',
  'Unity, Passion, Victory',
  2020,
  'Community Stadium',
  'Dark Green and Black',
  'A passionate local football club dedicated to excellence on and off the pitch. We believe in developing talent, building character, and bringing our community together through the beautiful game.',
  'info@localfc.com'
) ON CONFLICT DO NOTHING;

-- Insert current season
INSERT INTO public.seasons (
  name,
  start_date,
  end_date,
  is_current
) VALUES (
  '2024-25',
  '2024-08-01',
  '2025-05-31',
  true
) ON CONFLICT DO NOTHING;

-- Insert home team
INSERT INTO public.teams (
  name,
  is_home_team
) VALUES (
  'Local FC',
  true
) ON CONFLICT DO NOTHING;

-- Insert some opponent teams
INSERT INTO public.teams (name, is_home_team) VALUES 
  ('City Rovers', false),
  ('United FC', false),
  ('Athletic Club', false),
  ('Town FC', false),
  ('Rangers FC', false)
ON CONFLICT DO NOTHING;

-- Insert current kit
INSERT INTO public.kits (
  name,
  kit_type,
  season_id,
  description,
  is_current
) VALUES (
  'Home Kit 2024-25',
  'home',
  (SELECT id FROM public.seasons WHERE name = '2024-25'),
  'Dark green jersey with black shorts and green socks',
  true
) ON CONFLICT DO NOTHING;

-- Insert sample players (these can be updated via admin dashboard)
INSERT INTO public.players (
  name,
  jersey_number,
  position,
  bio,
  is_captain,
  date_joined,
  is_active
) VALUES 
  ('John Smith', 1, 'GK', 'Reliable goalkeeper with excellent shot-stopping ability.', false, '2024-01-15', true),
  ('Mike Johnson', 5, 'CB', 'Strong central defender and team captain.', true, '2023-08-01', true),
  ('David Wilson', 10, 'CAM', 'Creative midfielder with excellent passing range.', false, '2024-02-01', true),
  ('Chris Brown', 9, 'ST', 'Clinical striker with a keen eye for goal.', false, '2023-09-15', true),
  ('Alex Davis', 7, 'RW', 'Pacey winger who loves to take on defenders.', false, '2024-01-20', true)
ON CONFLICT (jersey_number) DO NOTHING;

-- Insert sample staff
INSERT INTO public.staff (
  name,
  role,
  bio,
  date_joined,
  is_active
) VALUES 
  ('Robert Martinez', 'Manager', 'Experienced manager with a passion for developing young talent.', '2023-07-01', true),
  ('Sarah Thompson', 'Assistant Manager', 'Former professional player turned coach.', '2023-07-15', true)
ON CONFLICT DO NOTHING;

-- Create initial player stats for current season
INSERT INTO public.player_stats (
  player_id,
  season_id,
  appearances,
  goals,
  assists,
  clean_sheets,
  yellow_cards,
  red_cards,
  minutes_played,
  man_of_the_match,
  average_rating
)
SELECT 
  p.id,
  s.id,
  0, 0, 0, 0, 0, 0, 0, 0, 0.0
FROM public.players p
CROSS JOIN public.seasons s
WHERE s.is_current = true
ON CONFLICT (player_id, season_id) DO NOTHING;
