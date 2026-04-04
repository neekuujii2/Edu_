-- =========================
-- EXTENSION
-- =========================
create extension if not exists "pgcrypto";

-- =========================
-- USERS TABLE
-- =========================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'student',
  created_at timestamptz not null default now()
);

-- सुनिश्चित करो सारे columns exist kare
alter table public.users add column if not exists password_hash text;
alter table public.users add column if not exists otp_code text;
alter table public.users add column if not exists otp_expires_at timestamptz;
alter table public.users add column if not exists is_verified boolean default false;
alter table public.users add column if not exists signup_method text default 'password';
alter table public.users add column if not exists password_reset_token text;
alter table public.users add column if not exists password_reset_expires_at timestamptz;

-- =========================
-- LEADS TABLE
-- =========================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  course text not null default 'General Inquiry',
  created_at timestamptz not null default now()
);

-- Ensure columns
alter table public.leads add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.leads add column if not exists course text;
alter table public.leads add column if not exists email text;
alter table public.leads add column if not exists location text;
alter table public.leads add column if not exists course_interest text;

-- Fix NULL data
update public.leads
set course = 'General Inquiry'
where course is null;

alter table public.leads alter column course set not null;

-- =========================
-- TESTIMONIALS TABLE
-- =========================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Ensure columns
alter table public.testimonials add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.testimonials add column if not exists course text;
alter table public.testimonials add column if not exists rating integer default 5;
alter table public.testimonials add column if not exists approved boolean default false;
alter table public.testimonials add column if not exists status text;

-- Fix NULL data
update public.testimonials set course = coalesce(course, 'General');
update public.testimonials set rating = coalesce(rating, 5);

update public.testimonials
set status = case
  when approved = true then 'approved'
  else 'pending'
end
where status is null;

-- =========================
-- ENABLE RLS
-- =========================
alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;

-- =========================
-- POLICIES (DROP + CREATE SAFE)
-- =========================

-- USERS
drop policy if exists "users can view own profile" on public.users;
create policy "users can view own profile"
on public.users for select
using (auth.uid() = id);

drop policy if exists "users can insert own profile" on public.users;
create policy "users can insert own profile"
on public.users for insert
with check (auth.uid() = id);

-- LEADS
drop policy if exists "insert leads" on public.leads;
create policy "insert leads"
on public.leads for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "view own leads" on public.leads;
create policy "view own leads"
on public.leads for select
to authenticated
using (auth.uid() = user_id);

-- TESTIMONIALS
drop policy if exists "insert testimonials" on public.testimonials;
create policy "insert testimonials"
on public.testimonials for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "view testimonials" on public.testimonials;
create policy "view testimonials"
on public.testimonials for select
using (approved = true OR auth.uid() = user_id);

-- =========================
-- TRIGGER FUNCTION
-- =========================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, role)
  values (new.id, new.email, 'student')
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop + recreate trigger safely
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();