/*
  # Wedding Website Database Schema

  1. New Tables
    - `rsvp`
      - `id` (uuid, primary key) - Unique identifier for each RSVP
      - `name` (text) - Guest's full name
      - `email` (text) - Guest's email address
      - `guests` (integer) - Number of guests attending
      - `attending` (boolean) - Whether guest will attend
      - `dietary_requirements` (text) - Any dietary restrictions
      - `message` (text) - Message to the couple
      - `created_at` (timestamptz) - When RSVP was submitted

    - `guest_book`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Guest's name
      - `message` (text) - Wishes and blessings for the couple
      - `created_at` (timestamptz) - When message was posted

  2. Security
    - Enable RLS on both tables
    - Allow anyone to insert new records (public RSVP and guest book)
    - Allow anyone to read guest book messages
    - Only allow reading RSVP data for now (can be adjusted for admin access)
*/

-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  attending boolean NOT NULL DEFAULT true,
  dietary_requirements text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create Guest Book table
CREATE TABLE IF NOT EXISTS guest_book (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_book ENABLE ROW LEVEL SECURITY;

-- RSVP Policies
CREATE POLICY "Anyone can insert RSVP"
  ON rsvp FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view RSVPs"
  ON rsvp FOR SELECT
  TO anon
  USING (true);

-- Guest Book Policies
CREATE POLICY "Anyone can insert guest book messages"
  ON guest_book FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view guest book messages"
  ON guest_book FOR SELECT
  TO anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guest_book_created_at ON guest_book(created_at DESC);