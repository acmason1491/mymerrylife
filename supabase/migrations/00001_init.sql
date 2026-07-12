-- My Merry Life — Database Schema
-- Run this in Supabase SQL Editor after creating the project.

-- 0. Extensions
create extension if not exists "pgcrypto";

-- 1. Enums
create type user_role as enum ('USER', 'AUTHOR', 'ADMIN');
create type course_level as enum ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- 2. Users (auth.users is already created by Supabase Auth; we extend it)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  image       text,
  role        user_role not null default 'USER',
  bio         text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- 3. Categories
create table public.categories (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  slug        text not null unique,
  description text,
  created_at  timestamptz not null default now()
);
alter table public.categories enable row level security;

-- 4. Tags
create table public.tags (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  slug        text not null unique,
  created_at  timestamptz not null default now()
);
alter table public.tags enable row level security;

-- 5. Posts
create table public.posts (
  id           bigint generated always as identity primary key,
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text not null,
  cover_image  text,
  published    boolean not null default false,
  featured     boolean not null default false,
  author_id    uuid not null references public.profiles(id),
  category_id  bigint references public.categories(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz
);
create index idx_posts_slug on public.posts(slug);
create index idx_posts_published on public.posts(published);
create index idx_posts_category on public.posts(category_id);
alter table public.posts enable row level security;

-- 6. Tags on Posts (junction table)
create table public.tags_on_posts (
  post_id bigint not null references public.posts(id) on delete cascade,
  tag_id  bigint not null references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);
alter table public.tags_on_posts enable row level security;

-- 7. Courses
create table public.courses (
  id          bigint generated always as identity primary key,
  title       text not null,
  slug        text not null unique,
  description text,
  excerpt     text,
  cover_image text,
  price       float not null default 0,
  level       course_level not null default 'BEGINNER',
  published   boolean not null default false,
  featured    boolean not null default false,
  duration    int,
  category_id bigint references public.categories(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index idx_courses_slug on public.courses(slug);
create index idx_courses_published on public.courses(published);
alter table public.courses enable row level security;

-- 8. Lessons
create table public.lessons (
  id         bigint generated always as identity primary key,
  title      text not null,
  slug       text not null unique,
  content    text,
  video_url  text,
  duration   int,
  "order"    int not null,
  published  boolean not null default false,
  course_id  bigint not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index idx_lessons_course on public.lessons(course_id);
create index idx_lessons_slug on public.lessons(slug);
alter table public.lessons enable row level security;

-- 9. Enrollments
create table public.enrollments (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  course_id  bigint not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);
alter table public.enrollments enable row level security;

-- 10. Progress
create table public.progress (
  id         bigint generated always as identity primary key,
  completed  boolean not null default false,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  lesson_id  bigint not null references public.lessons(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);
alter table public.progress enable row level security;

-- 11. Comments
create table public.comments (
  id         bigint generated always as identity primary key,
  content    text not null,
  post_id    bigint not null references public.posts(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_comments_post on public.comments(post_id);
alter table public.comments enable row level security;

-- 12. Bookmarks
create table public.bookmarks (
  id         bigint generated always as identity primary key,
  post_id    bigint not null references public.posts(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, post_id)
);
alter table public.bookmarks enable row level security;

-- 13. Reviews
create table public.reviews (
  id         bigint generated always as identity primary key,
  rating     int not null check (rating >= 1 and rating <= 5),
  content    text,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  post_id    bigint references public.posts(id) on delete cascade,
  course_id  bigint references public.courses(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;

-- 14. Newsletter
create table public.newsletters (
  id         bigint generated always as identity primary key,
  email      text not null unique,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.newsletters enable row level security;

-- 15. Contacts
create table public.contacts (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.contacts enable row level security;

-- ── Row Level Security Policies ──

-- Profiles: users can read any profile, update their own
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Categories & Tags: publicly readable
create policy "Categories are publicly readable"
  on public.categories for select using (true);

create policy "Tags are publicly readable"
  on public.tags for select using (true);

-- Posts: published posts are publicly readable
create policy "Published posts are publicly readable"
  on public.posts for select using (published = true);

-- Courses: published courses are publicly readable
create policy "Published courses are publicly readable"
  on public.courses for select using (published = true);

-- Lessons: lessons of published courses are publicly readable
create policy "Lessons of published courses are publicly readable"
  on public.lessons for select using (
    exists (select 1 from public.courses c where c.id = course_id and c.published = true)
  );

-- Comments: publicly readable, authenticated users can insert/update their own
create policy "Comments are publicly readable"
  on public.comments for select using (true);

create policy "Authenticated users can insert comments"
  on public.comments for insert with check (auth.role() = 'authenticated');

create policy "Users can update their own comments"
  on public.comments for update using (auth.uid() = user_id);

-- Bookmarks: users can read/insert/delete their own bookmarks
create policy "Users can read their own bookmarks"
  on public.bookmarks for select using (auth.uid() = user_id);

create policy "Users can insert bookmarks"
  on public.bookmarks for insert with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on public.bookmarks for delete using (auth.uid() = user_id);

-- Progress: users can read/insert/update their own progress
create policy "Users can read their own progress"
  on public.progress for select using (auth.uid() = user_id);

create policy "Users can insert progress"
  on public.progress for insert with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress for update using (auth.uid() = user_id);

-- Enrollments: users can read/insert their own
create policy "Users can read their own enrollments"
  on public.enrollments for select using (auth.uid() = user_id);

create policy "Users can enroll"
  on public.enrollments for insert with check (auth.uid() = user_id);

-- Newsletter: anyone can insert
create policy "Anyone can subscribe to newsletter"
  on public.newsletters for insert with check (true);

-- Contacts: anyone can insert
create policy "Anyone can submit contact"
  on public.contacts for insert with check (true);

-- ── Triggers ──

-- Auto-create profile when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, image)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.email), new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update profiles.updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger set_posts_updated_at
  before update on public.posts
  for each row execute function public.update_updated_at();

create trigger set_courses_updated_at
  before update on public.courses
  for each row execute function public.update_updated_at();

create trigger set_comments_updated_at
  before update on public.comments
  for each row execute function public.update_updated_at();
