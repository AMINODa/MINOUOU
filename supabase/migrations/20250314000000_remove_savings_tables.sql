-- Script to remove savings tables and data

-- First, drop the savings_goals table policies
DROP POLICY IF EXISTS "Public read access" ON savings_goals;
DROP POLICY IF EXISTS "Public insert access" ON savings_goals;
DROP POLICY IF EXISTS "Public update access" ON savings_goals;

-- Remove from realtime publication
ALTER publication supabase_realtime DROP TABLE IF EXISTS savings_goals;

-- Delete all data from savings_goals table
DELETE FROM savings_goals;

-- Drop the savings_goals table
DROP TABLE IF EXISTS savings_goals;

-- Note: This migration script should be applied with caution in a production environment
-- It will permanently delete all savings-related data
