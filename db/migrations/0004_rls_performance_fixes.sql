-- Migration 0004: RLS performance fixes
--
-- Part A: auth_rls_initplan
--   Wrap auth.uid() / auth.role() in (select ...) so Postgres evaluates
--   them once per query (init plan) rather than once per row.
--
-- Part B: multiple_permissive_policies
--   sponsors  — consolidate 3 overlapping SELECT policies into 1 SELECT + write policies
--   user_roles — "no direct access" (USING false, PERMISSIVE) is a no-op in OR logic;
--                drop it and merge the two SELECT policies into one

BEGIN;

-- ============================================================
-- PART A: auth_rls_initplan
-- ============================================================

-- profiles (roles: public)
DROP POLICY "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT TO public
  USING ((select auth.uid()) = id);

DROP POLICY "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE TO public
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- account_deletion_requests (roles: authenticated)
DROP POLICY "adr_select_own" ON public.account_deletion_requests;
CREATE POLICY "adr_select_own"
  ON public.account_deletion_requests FOR SELECT TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY "adr_insert_own" ON public.account_deletion_requests;
CREATE POLICY "adr_insert_own"
  ON public.account_deletion_requests FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- peptide_comments (roles: authenticated)
DROP POLICY "peptide_comments_insert_authenticated" ON public.peptide_comments;
CREATE POLICY "peptide_comments_insert_authenticated"
  ON public.peptide_comments FOR INSERT TO authenticated
  WITH CHECK (
    ((select auth.uid()) = user_id) AND
    (deleted_at IS NULL) AND
    (removed = false) AND
    (char_length(content) <= 2000)
  );

DROP POLICY "peptide_comments_update_author" ON public.peptide_comments;
CREATE POLICY "peptide_comments_update_author"
  ON public.peptide_comments FOR UPDATE TO authenticated
  USING (((select auth.uid()) = user_id) AND (removed = false))
  WITH CHECK (
    ((select auth.uid()) = user_id) AND
    (removed = false) AND
    (char_length(content) <= 2000)
  );

-- billing_entitlements (roles: authenticated) — also created in 0003, fix here
DROP POLICY "billing_entitlements_select_own" ON public.billing_entitlements;
CREATE POLICY "billing_entitlements_select_own"
  ON public.billing_entitlements FOR SELECT TO authenticated
  USING ((select auth.uid()) = user_id);

-- sponsor_events (roles: public)
DROP POLICY "Service role inserts sponsor events" ON public.sponsor_events;
CREATE POLICY "Service role inserts sponsor events"
  ON public.sponsor_events FOR INSERT TO public
  WITH CHECK ((select auth.role()) = 'service_role'::text);

-- user_roles "read own roles" — dropped and replaced in Part B below


-- ============================================================
-- PART B: multiple_permissive_policies
-- ============================================================

-- --- sponsors ---
-- Before: 3 SELECT policies all evaluate for every query:
--   "Admins manage sponsors"        (ALL,    public, USING is_admin())
--   "Public can read active sponsors" (SELECT, public, USING is_active = true)
--   "public read active sponsors"   (SELECT, anon+auth, USING is_active = true)  ← duplicate
-- After: 1 SELECT + separate write policies for admins

DROP POLICY "Admins manage sponsors" ON public.sponsors;
DROP POLICY "Public can read active sponsors" ON public.sponsors;
DROP POLICY "public read active sponsors" ON public.sponsors;

-- Single SELECT: active sponsors visible to everyone; admins see all
CREATE POLICY "sponsors_select"
  ON public.sponsors FOR SELECT TO public
  USING ((is_active = true) OR is_admin());

-- Admin writes (split so SELECT above is the only SELECT policy)
CREATE POLICY "sponsors_insert_admin"
  ON public.sponsors FOR INSERT TO public
  WITH CHECK (is_admin());

CREATE POLICY "sponsors_update_admin"
  ON public.sponsors FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "sponsors_delete_admin"
  ON public.sponsors FOR DELETE TO public
  USING (is_admin());


-- --- user_roles ---
-- Before:
--   "no direct access" (ALL, anon+auth, USING false)  ← PERMISSIVE no-op: false OR other = other
--   "read own roles"   (SELECT, authenticated, USING user_id = auth.uid())
--   "roles_select_admin" (SELECT, public, USING is_admin())  ← both SELECT policies fire per query
--   "roles_insert_admin" (INSERT, public, WITH CHECK is_admin())
--   "roles_delete_admin" (DELETE, public, USING is_admin())
-- After: drop no-op, merge the two SELECT policies into one

DROP POLICY "no direct access" ON public.user_roles;
DROP POLICY "read own roles" ON public.user_roles;
DROP POLICY "roles_select_admin" ON public.user_roles;

-- Single SELECT: users see own rows; admins see all
CREATE POLICY "user_roles_select"
  ON public.user_roles FOR SELECT TO authenticated
  USING ((user_id = (select auth.uid())) OR is_admin());

-- roles_insert_admin and roles_delete_admin are unchanged (single policy each, no fix needed)

COMMIT;
