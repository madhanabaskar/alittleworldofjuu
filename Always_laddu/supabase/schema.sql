-- ==============================================================================
-- A LITTLE WORLD OF JUU — SUPABASE SCHEMA & RLS POLICIES
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.timeline (
    "id" TEXT PRIMARY KEY,
    "date" DATE NOT NULL,
    "displayDate" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,
    "photoCaption" TEXT,
    "category" TEXT NOT NULL,
    "location" TEXT,
    "ladduEmotion" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MEMORIES TABLE
CREATE TABLE IF NOT EXISTS public.memories (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "displayDate" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "isPlaceholder" BOOLEAN DEFAULT false,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LETTERS (OPEN WHEN) TABLE
CREATE TABLE IF NOT EXISTS public.letters (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT UNIQUE NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "triggerFeeling" TEXT NOT NULL,
    "envelopeColor" TEXT,
    "content" TEXT[] NOT NULL,
    "closing" TEXT NOT NULL,
    "previewExcerpt" TEXT NOT NULL,
    "isCustomizedByJuu" BOOLEAN DEFAULT true,
    "readCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VOICE NOTES TABLE
CREATE TABLE IF NOT EXISTS public.voice_notes (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "caption" TEXT NOT NULL,
    "audioUrl" TEXT,
    "syntheticVoiceType" TEXT,
    "isPlaceholder" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROMISES TABLE
CREATE TABLE IF NOT EXISTS public.promises (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isAccountabilityNote" BOOLEAN DEFAULT false,
    "incidentTitle" TEXT,
    "ladduFeelingAcknowledged" TEXT,
    "juuCommitment" TEXT,
    "isApprovedByJuu" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LITTLE THINGS TABLE
CREATE TABLE IF NOT EXISTS public.little_things (
    "id" TEXT PRIMARY KEY,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "tag" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FUTURE DREAMS TABLE
CREATE TABLE IF NOT EXISTS public.future_dreams (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "status" TEXT NOT NULL DEFAULT 'dreaming',
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    "id" TEXT PRIMARY KEY,
    "entrancePassphraseHint" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "welcomeMessage" TEXT,
    "bgMusicEnabled" BOOLEAN DEFAULT true,
    "lastUpdated" TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.little_things ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.future_dreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Read access: Anyone visiting the site (Anon or Authenticated) can read all memories
CREATE POLICY "Public read timeline" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Public read memories" ON public.memories FOR SELECT USING (true);
CREATE POLICY "Public read letters" ON public.letters FOR SELECT USING (true);
CREATE POLICY "Public read voice_notes" ON public.voice_notes FOR SELECT USING (true);
CREATE POLICY "Public read promises" ON public.promises FOR SELECT USING (true);
CREATE POLICY "Public read little_things" ON public.little_things FOR SELECT USING (true);
CREATE POLICY "Public read future_dreams" ON public.future_dreams FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- 2. Write access: Only authenticated Admin (Juu) can insert, update, or delete
CREATE POLICY "Admin manage timeline" ON public.timeline FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage memories" ON public.memories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage letters" ON public.letters FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage voice_notes" ON public.voice_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage promises" ON public.promises FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage little_things" ON public.little_things FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage future_dreams" ON public.future_dreams FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKETS SETUP (Private Buckets with Signed / RLS-Governed Access)
-- ==============================================================================
-- Create private storage buckets for photo memories and voice recordings
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('image-of_juu', 'image-of_juu', false),
    ('voice_notes', 'voice_notes', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Read policies: Allow reading objects from the media buckets
CREATE POLICY "Allow read memory images" ON storage.objects FOR SELECT USING (bucket_id = 'image-of_juu');
CREATE POLICY "Allow read voice recordings" ON storage.objects FOR SELECT USING (bucket_id = 'voice_notes');

-- Write policies: Only authenticated Juu (Admin) can upload or delete media
CREATE POLICY "Admin upload memory images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'image-of_juu');
CREATE POLICY "Admin upload voice recordings" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'voice_notes');
CREATE POLICY "Admin update memory images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'image-of_juu') WITH CHECK (bucket_id = 'image-of_juu');
CREATE POLICY "Admin update voice recordings" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'voice_notes') WITH CHECK (bucket_id = 'voice_notes');
CREATE POLICY "Admin delete memory images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'image-of_juu');
CREATE POLICY "Admin delete voice recordings" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'voice_notes');
