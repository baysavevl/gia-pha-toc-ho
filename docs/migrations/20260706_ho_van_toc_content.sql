-- ============================================================
-- HO VAN TOC CONTENT AND BRANCH MODEL
-- Adds first-release schema for public content modules and
-- branch-scoped genealogy management groundwork.
-- ============================================================

-- ENUMS
DO $$ BEGIN
    CREATE TYPE public.branch_type_enum AS ENUM ('chi', 'phai', 'nhanh');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.branch_permission_enum AS ENUM ('manage_members', 'manage_events', 'review_requests');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.content_type_enum AS ENUM ('pha_ky', 'post', 'notable_person');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.publish_status_enum AS ENUM ('draft', 'published', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.contact_submission_type_enum AS ENUM ('contact', 'genealogy_update', 'feedback');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.contact_status_enum AS ENUM ('new', 'in_review', 'resolved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- TABLES
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type public.branch_type_enum NOT NULL,
  parent_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.profile_branch_permissions (
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  permission public.branch_permission_enum NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (profile_id, branch_id, permission)
);

ALTER TABLE public.persons
  ADD COLUMN IF NOT EXISTS common_name TEXT,
  ADD COLUMN IF NOT EXISTS dharma_name TEXT,
  ADD COLUMN IF NOT EXISTS birth_place TEXT,
  ADD COLUMN IF NOT EXISTS hometown TEXT,
  ADD COLUMN IF NOT EXISTS education TEXT,
  ADD COLUMN IF NOT EXISTS position_title TEXT,
  ADD COLUMN IF NOT EXISTS merits TEXT,
  ADD COLUMN IF NOT EXISTS biography TEXT,
  ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.content_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type public.content_type_enum NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.content_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type public.content_type_enum NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  status public.publish_status_enum NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.content_categories(id) ON DELETE SET NULL,
  related_person_id UUID REFERENCES public.persons(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  content TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  location TEXT,
  organizer TEXT,
  audience TEXT,
  event_type TEXT,
  banner_url TEXT,
  status public.publish_status_enum NOT NULL DEFAULT 'draft',
  is_public BOOLEAN NOT NULL DEFAULT false,
  registration_enabled BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_email TEXT,
  guest_phone TEXT,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type public.contact_submission_type_enum NOT NULL DEFAULT 'contact',
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  related_person_id UUID REFERENCES public.persons(id) ON DELETE SET NULL,
  status public.contact_status_enum NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_branches_parent_id ON public.branches(parent_id);
CREATE INDEX IF NOT EXISTS idx_branches_type ON public.branches(type);
CREATE INDEX IF NOT EXISTS idx_profile_branch_permissions_profile ON public.profile_branch_permissions(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_branch_permissions_branch ON public.profile_branch_permissions(branch_id);
CREATE INDEX IF NOT EXISTS idx_persons_branch_id ON public.persons(branch_id);
CREATE INDEX IF NOT EXISTS idx_content_categories_type ON public.content_categories(type);
CREATE INDEX IF NOT EXISTS idx_content_entries_type_status ON public.content_entries(type, status);
CREATE INDEX IF NOT EXISTS idx_content_entries_published_at ON public.content_entries(published_at);
CREATE INDEX IF NOT EXISTS idx_events_public_status_starts_at ON public.events(is_public, status, starts_at);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_type ON public.contact_submissions(type);

-- RLS
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_branch_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Branches: public read, admin/editor manage.
DROP POLICY IF EXISTS "Branches are publicly readable" ON public.branches;
CREATE POLICY "Branches are publicly readable" ON public.branches
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins and editors can manage branches" ON public.branches;
CREATE POLICY "Admins and editors can manage branches" ON public.branches
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

-- Branch permissions: users can see their own, admin can manage all.
DROP POLICY IF EXISTS "Users can view own branch permissions" ON public.profile_branch_permissions;
CREATE POLICY "Users can view own branch permissions" ON public.profile_branch_permissions
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage branch permissions" ON public.profile_branch_permissions;
CREATE POLICY "Admins can manage branch permissions" ON public.profile_branch_permissions
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Content categories and entries.
DROP POLICY IF EXISTS "Content categories are publicly readable" ON public.content_categories;
CREATE POLICY "Content categories are publicly readable" ON public.content_categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins and editors can manage content categories" ON public.content_categories;
CREATE POLICY "Admins and editors can manage content categories" ON public.content_categories
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

DROP POLICY IF EXISTS "Published content is publicly readable" ON public.content_entries;
CREATE POLICY "Published content is publicly readable" ON public.content_entries
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins and editors can manage content entries" ON public.content_entries;
CREATE POLICY "Admins and editors can manage content entries" ON public.content_entries
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

-- Public events and registrations.
DROP POLICY IF EXISTS "Published public events are readable" ON public.events;
CREATE POLICY "Published public events are readable" ON public.events
  FOR SELECT USING (is_public = true AND status = 'published');

DROP POLICY IF EXISTS "Admins and editors can manage events" ON public.events;
CREATE POLICY "Admins and editors can manage events" ON public.events
  FOR ALL TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

DROP POLICY IF EXISTS "Open event registrations can be created" ON public.event_registrations;
CREATE POLICY "Open event registrations can be created" ON public.event_registrations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_id
        AND e.status = 'published'
        AND e.is_public = true
        AND e.registration_enabled = true
    )
  );

DROP POLICY IF EXISTS "Admins and editors can view event registrations" ON public.event_registrations;
CREATE POLICY "Admins and editors can view event registrations" ON public.event_registrations
  FOR SELECT TO authenticated
  USING (public.is_admin() OR public.is_editor() OR profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins and editors can manage event registrations" ON public.event_registrations;
CREATE POLICY "Admins and editors can manage event registrations" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

-- Contact submissions: public insert, admin/editor review.
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact messages" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins and editors can view contact messages" ON public.contact_submissions;
CREATE POLICY "Admins and editors can view contact messages" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (public.is_admin() OR public.is_editor());

DROP POLICY IF EXISTS "Admins and editors can update contact messages" ON public.contact_submissions;
CREATE POLICY "Admins and editors can update contact messages" ON public.contact_submissions
  FOR UPDATE TO authenticated
  USING (public.is_admin() OR public.is_editor())
  WITH CHECK (public.is_admin() OR public.is_editor());

-- UPDATED_AT TRIGGERS
DROP TRIGGER IF EXISTS tr_branches_updated_at ON public.branches;
CREATE TRIGGER tr_branches_updated_at BEFORE UPDATE ON public.branches
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_profile_branch_permissions_updated_at ON public.profile_branch_permissions;
CREATE TRIGGER tr_profile_branch_permissions_updated_at BEFORE UPDATE ON public.profile_branch_permissions
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_content_categories_updated_at ON public.content_categories;
CREATE TRIGGER tr_content_categories_updated_at BEFORE UPDATE ON public.content_categories
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_content_entries_updated_at ON public.content_entries;
CREATE TRIGGER tr_content_entries_updated_at BEFORE UPDATE ON public.content_entries
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_events_updated_at ON public.events;
CREATE TRIGGER tr_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_event_registrations_updated_at ON public.event_registrations;
CREATE TRIGGER tr_event_registrations_updated_at BEFORE UPDATE ON public.event_registrations
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_contact_submissions_updated_at ON public.contact_submissions;
CREATE TRIGGER tr_contact_submissions_updated_at BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
