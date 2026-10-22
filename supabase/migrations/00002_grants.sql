-- My Merry Life — Data API grants
-- Supabase stops auto-granting Data API access to new public tables on 2026-10-30.
-- Existing tables keep their grants, but schema re-creation (new project, preview
-- branch, `supabase db reset`) no longer inherits them, so state them explicitly.
-- RLS remains the security boundary; these grants mirror Supabase's legacy defaults.

grant usage on schema public to anon, authenticated, service_role;

-- Public read tables
grant select on public.categories, public.tags, public.posts, public.tags_on_posts,
  public.courses, public.lessons, public.comments, public.profiles
  to anon;

-- Authenticated users (RLS policies restrict rows/columns)
grant select, insert, update, delete on
  public.profiles, public.categories, public.tags, public.posts, public.tags_on_posts,
  public.courses, public.lessons, public.enrollments, public.progress, public.comments,
  public.bookmarks, public.reviews, public.newsletters, public.contacts
  to authenticated;

-- Service role (server-side / edge functions)
grant select, insert, update, delete on
  public.profiles, public.categories, public.tags, public.posts, public.tags_on_posts,
  public.courses, public.lessons, public.enrollments, public.progress, public.comments,
  public.bookmarks, public.reviews, public.newsletters, public.contacts
  to service_role;

-- Identity columns need sequence access for inserts via PostgREST
grant usage, select on all sequences in schema public to anon, authenticated, service_role;

-- Future tables created by migrations (run as postgres) inherit the same grants.
-- Any table created by another role still needs an explicit GRANT in its own migration.
alter default privileges in schema public
  grant select on tables to anon;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated, service_role;
alter default privileges in schema public
  grant usage, select on sequences to anon, authenticated, service_role;
