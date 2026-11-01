-- ==============================================================================
-- MAKE STORAGE BUCKETS PUBLIC
-- Run this in Supabase Dashboard: SQL Editor -> New Query -> Run
-- This enables public streaming so your audio files and images play directly
-- ==============================================================================

UPDATE storage.buckets
SET public = true
WHERE id IN ('voice_notes', 'image-of_juu');
