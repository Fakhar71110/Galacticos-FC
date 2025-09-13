-- Football Club Database Schema
-- This script creates all the necessary tables for the football club website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'fan' CHECK (role IN ('admin', 'player', 'staff', 'fan')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Players table
CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  jersey_number INTEGER UNIQUE,
  position TEXT NOT NULL CHECK (position IN ('GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF')),
  bio TEXT,
  photo_url TEXT,
  is_captain BOOLEAN DEFAULT FALSE,
  is_vice_captain BOOLEAN DEFAULT FALSE,
  date_joined DATE,
  date_of_birth DATE,
  nationality TEXT,
  height INTEGER, -- in cm
  weight INTEGER, -- in kg
  preferred_foot TEXT CHECK (preferred_foot IN ('Left', 'Right', 'Both')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE IF NOT EXISTS public.staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Manager', 'Assistant Manager', 'Coach', 'Goalkeeper Coach', 'Fitness Coach', 'Physio', 'Kit Manager')),
  bio TEXT,
  photo_url TEXT,
  date_joined DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams/Opponents table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  is_home_team BOOLEAN DEFAULT FALSE, -- TRUE for our club
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seasons table
CREATE TABLE IF NOT EXISTS public.seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g., "2024-25"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
  opponent_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  match_date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT NOT NULL, -- 'Home' or 'Away' or specific venue name
  competition TEXT, -- League, Cup, Friendly, etc.
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished', 'postponed', 'cancelled')),
  home_score INTEGER DEFAULT 0,
  away_score INTEGER DEFAULT 0,
  is_home BOOLEAN NOT NULL,
  match_report TEXT,
  formation TEXT, -- e.g., "4-4-2"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match Events table (goals, cards, substitutions)
CREATE TABLE IF NOT EXISTS public.match_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('goal', 'assist', 'yellow_card', 'red_card', 'substitution_in', 'substitution_out')),
  minute INTEGER NOT NULL,
  additional_info TEXT, -- e.g., penalty, own goal, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match Lineups table
CREATE TABLE IF NOT EXISTS public.match_lineups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  is_starter BOOLEAN DEFAULT TRUE,
  is_captain BOOLEAN DEFAULT FALSE,
  is_vice_captain BOOLEAN DEFAULT FALSE,
  minutes_played INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player Ratings table (for post-match ratings by authorized players)
CREATE TABLE IF NOT EXISTS public.player_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating DECIMAL(3,1) CHECK (rating >= 1.0 AND rating <= 10.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(match_id, player_id, rater_id)
);

-- Player Statistics table (aggregated stats per season)
CREATE TABLE IF NOT EXISTS public.player_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
  appearances INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  clean_sheets INTEGER DEFAULT 0, -- for goalkeepers
  yellow_cards INTEGER DEFAULT 0,
  red_cards INTEGER DEFAULT 0,
  minutes_played INTEGER DEFAULT 0,
  man_of_the_match INTEGER DEFAULT 0,
  average_rating DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, season_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  achievement_type TEXT NOT NULL CHECK (achievement_type IN ('club', 'individual')),
  recipient_id UUID, -- player_id for individual achievements, NULL for club achievements
  season_id UUID REFERENCES public.seasons(id) ON DELETE SET NULL,
  date_achieved DATE,
  trophy_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Kits table
CREATE TABLE IF NOT EXISTS public.kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g., "Home Kit 2024-25"
  kit_type TEXT NOT NULL CHECK (kit_type IN ('home', 'away', 'third', 'goalkeeper')),
  season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
  image_url TEXT,
  description TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  gallery_type TEXT DEFAULT 'general' CHECK (gallery_type IN ('match', 'training', 'event', 'general')),
  match_id UUID REFERENCES public.matches(id) ON DELETE SET NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE
);

-- News/Blog table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fantasy League table (optional feature)
CREATE TABLE IF NOT EXISTS public.fantasy_leagues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  season_id UUID REFERENCES public.seasons(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fantasy Teams table
CREATE TABLE IF NOT EXISTS public.fantasy_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_id UUID REFERENCES public.fantasy_leagues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fantasy Team Players table
CREATE TABLE IF NOT EXISTS public.fantasy_team_players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fantasy_team_id UUID REFERENCES public.fantasy_teams(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(fantasy_team_id, player_id, week_number)
);

-- Club Settings table (for general club information)
CREATE TABLE IF NOT EXISTS public.club_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_name TEXT NOT NULL,
  club_logo_url TEXT,
  club_slogan TEXT,
  founded_year INTEGER,
  home_ground TEXT,
  club_colors TEXT,
  about_text TEXT,
  contact_email TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_youtube TEXT,
  social_tiktok TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_lineups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fantasy_leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fantasy_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fantasy_team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (most content should be publicly viewable)
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Players policies (public read, admin write)
CREATE POLICY "Players are viewable by everyone" ON public.players FOR SELECT USING (true);
CREATE POLICY "Only admins can manage players" ON public.players FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Staff policies (public read, admin write)
CREATE POLICY "Staff are viewable by everyone" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Only admins can manage staff" ON public.staff FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Teams policies (public read, admin write)
CREATE POLICY "Teams are viewable by everyone" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Only admins can manage teams" ON public.teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Seasons policies (public read, admin write)
CREATE POLICY "Seasons are viewable by everyone" ON public.seasons FOR SELECT USING (true);
CREATE POLICY "Only admins can manage seasons" ON public.seasons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Matches policies (public read, admin write)
CREATE POLICY "Matches are viewable by everyone" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Only admins can manage matches" ON public.matches FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Match events policies (public read, admin write)
CREATE POLICY "Match events are viewable by everyone" ON public.match_events FOR SELECT USING (true);
CREATE POLICY "Only admins can manage match events" ON public.match_events FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Match lineups policies (public read, admin write)
CREATE POLICY "Match lineups are viewable by everyone" ON public.match_lineups FOR SELECT USING (true);
CREATE POLICY "Only admins can manage match lineups" ON public.match_lineups FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Player ratings policies (public read, players and admins can rate)
CREATE POLICY "Player ratings are viewable by everyone" ON public.player_ratings FOR SELECT USING (true);
CREATE POLICY "Players and admins can rate players" ON public.player_ratings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('player', 'admin'))
);
CREATE POLICY "Users can update their own ratings" ON public.player_ratings FOR UPDATE USING (auth.uid() = rater_id);
CREATE POLICY "Users can delete their own ratings" ON public.player_ratings FOR DELETE USING (auth.uid() = rater_id);

-- Player stats policies (public read, admin write)
CREATE POLICY "Player stats are viewable by everyone" ON public.player_stats FOR SELECT USING (true);
CREATE POLICY "Only admins can manage player stats" ON public.player_stats FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Achievements policies (public read, admin write)
CREATE POLICY "Achievements are viewable by everyone" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Only admins can manage achievements" ON public.achievements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Kits policies (public read, admin write)
CREATE POLICY "Kits are viewable by everyone" ON public.kits FOR SELECT USING (true);
CREATE POLICY "Only admins can manage kits" ON public.kits FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Gallery policies (public read, admin write)
CREATE POLICY "Gallery is viewable by everyone" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Only admins can manage gallery" ON public.gallery FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- News policies (public read published articles, admin write)
CREATE POLICY "Published news are viewable by everyone" ON public.news FOR SELECT USING (is_published = true OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Only admins can manage news" ON public.news FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Fantasy league policies (public read, users can manage their own teams)
CREATE POLICY "Fantasy leagues are viewable by everyone" ON public.fantasy_leagues FOR SELECT USING (true);
CREATE POLICY "Only admins can manage fantasy leagues" ON public.fantasy_leagues FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Fantasy teams are viewable by everyone" ON public.fantasy_teams FOR SELECT USING (true);
CREATE POLICY "Users can manage their own fantasy teams" ON public.fantasy_teams FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Fantasy team players are viewable by everyone" ON public.fantasy_team_players FOR SELECT USING (true);
CREATE POLICY "Users can manage their own fantasy team players" ON public.fantasy_team_players FOR ALL USING (
  EXISTS (SELECT 1 FROM public.fantasy_teams WHERE id = fantasy_team_id AND user_id = auth.uid())
);

-- Club settings policies (public read, admin write)
CREATE POLICY "Club settings are viewable by everyone" ON public.club_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can manage club settings" ON public.club_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    'fan'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_position ON public.players(position);
CREATE INDEX IF NOT EXISTS idx_players_active ON public.players(is_active);
CREATE INDEX IF NOT EXISTS idx_matches_date ON public.matches(match_date);
CREATE INDEX IF NOT EXISTS idx_matches_season ON public.matches(season_id);
CREATE INDEX IF NOT EXISTS idx_match_events_match ON public.match_events(match_id);
CREATE INDEX IF NOT EXISTS idx_match_events_player ON public.match_events(player_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_season ON public.player_stats(season_id);
CREATE INDEX IF NOT EXISTS idx_player_ratings_match ON public.player_ratings(match_id);
CREATE INDEX IF NOT EXISTS idx_news_published ON public.news(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_gallery_type ON public.gallery(gallery_type);
