/*
  # Initial Schema Setup for Fieldsy

  1. Extensions
    - Enable PostGIS for location data

  2. New Tables
    - profiles: Extended user information and reputation
    - categories: Product and workshop categories
    - products: Marketplace listings with location
    - workshops: Class/event listings with location

  3. Security
    - RLS enabled on all tables
    - Policies for data access control
*/

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create custom types
CREATE TYPE user_role AS ENUM ('seller', 'buyer', 'admin');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role user_role DEFAULT 'buyer',
  reputation_score integer DEFAULT 0,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('product', 'workshop')),
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id),
  images text[] DEFAULT ARRAY[]::text[],
  location geography(Point, 4326) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id),
  date timestamptz NOT NULL,
  duration interval NOT NULL,
  location geography(Point, 4326) NOT NULL,
  address text NOT NULL,
  price decimal(10,2) NOT NULL,
  capacity integer NOT NULL,
  current_attendees integer DEFAULT 0,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Sellers can create products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  USING (auth.uid() = seller_id);

-- Workshops policies
CREATE POLICY "Workshops are viewable by everyone"
  ON workshops FOR SELECT
  USING (true);

CREATE POLICY "Hosts can create workshops"
  ON workshops FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update own workshops"
  ON workshops FOR UPDATE
  USING (auth.uid() = host_id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Insert initial categories
INSERT INTO categories (name, type) VALUES
  ('Vegetables', 'product'),
  ('Fruits', 'product'),
  ('Eggs', 'product'),
  ('Livestock', 'product'),
  ('Handmade Goods', 'product'),
  ('Preserves', 'product'),
  ('Gardening', 'workshop'),
  ('Animal Husbandry', 'workshop'),
  ('Food Preservation', 'workshop'),
  ('Crafts', 'workshop')
ON CONFLICT (name) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create spatial indexes for faster geo-queries
CREATE INDEX IF NOT EXISTS products_location_idx ON products USING GIST (location);
CREATE INDEX IF NOT EXISTS workshops_location_idx ON workshops USING GIST (location);