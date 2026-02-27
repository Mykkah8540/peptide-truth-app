-- Migration 0003: RLS security fixes
-- Addresses Supabase security linter findings (ERROR + WARN level).
--
-- Tables fixed:
--   billing_entitlements  — users read own row only; all writes via service role
--   billing_webhook_events — service role only (no user access)
--   admin_flags            — authenticated users can read (global config used by getViewer)
--   ugc_posts              — public can read approved posts; writes go through direct DB pool (bypass RLS)
--   ugc_admin_events       — service role only (no user access)
--
-- Functions fixed (mutable search_path → pinned to 'public'):
--   pt_touch_updated_at, set_profiles_updated_at, is_admin, handle_new_user
--
-- NOT addressed here (dashboard-only):
--   auth_leaked_password_protection — toggle in Supabase Dashboard:
--     Authentication → Providers → Email → "Enable Leaked Password Protection"
--
-- admin_events (INFO: RLS enabled, no policy) is intentionally left as-is.
--   Deny-all for anon/authenticated is correct — it is append-only via service role.

BEGIN;

-- ============================================================
-- 1. billing_entitlements
--    Users may read only their own entitlement row.
--    INSERT/UPDATE via service role (bypasses RLS).
-- ============================================================
ALTER TABLE public.billing_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "billing_entitlements_select_own"
  ON public.billing_entitlements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);


-- ============================================================
-- 2. billing_webhook_events
--    Written by service role only. No user access.
--    (No policies = deny-all for anon/authenticated.)
-- ============================================================
ALTER TABLE public.billing_webhook_events ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. admin_flags
--    Global config table. All authenticated users may read.
--    (getViewer() reads force_pro_on flag on every server request.)
--    Writes are service-role / admin only.
-- ============================================================
ALTER TABLE public.admin_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_flags_select_authenticated"
  ON public.admin_flags
  FOR SELECT
  TO authenticated
  USING (true);


-- ============================================================
-- 4. ugc_posts
--    Approved posts are publicly readable (anon + authenticated).
--    All writes go through ugcPool (direct Postgres connection,
--    bypasses RLS), so no INSERT/UPDATE/DELETE policies needed here.
-- ============================================================
ALTER TABLE public.ugc_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ugc_posts_select_approved"
  ON public.ugc_posts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');


-- ============================================================
-- 5. ugc_admin_events
--    Admin/operator events. Service role only.
--    (No policies = deny-all for anon/authenticated.)
-- ============================================================
ALTER TABLE public.ugc_admin_events ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 6. Fix mutable search_path on functions
--    Pins search_path to 'public' so a session-level SET search_path
--    cannot redirect function calls to a malicious schema.
--
--    NOTE: These assume each function takes no arguments (the typical
--    signature for trigger functions and simple helper functions).
--    If Supabase reports a signature mismatch, check the exact argument
--    list in Dashboard → Database → Functions and adjust accordingly.
-- ============================================================
ALTER FUNCTION public.pt_touch_updated_at()      SET search_path = 'public';
ALTER FUNCTION public.set_profiles_updated_at()  SET search_path = 'public';
ALTER FUNCTION public.is_admin()                  SET search_path = 'public';
ALTER FUNCTION public.handle_new_user()           SET search_path = 'public';

COMMIT;
