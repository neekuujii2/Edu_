create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'student',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text not null,
  course text not null,
  created_at timestamptz not null default now()
);

alter table if exists public.leads
add column if not exists course text;

update public.leads
set course = 'General Inquiry'
where course is null;

alter table if exists public.leads
alter column course set not null;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  course text,
  rating integer,
  message text not null,
  approved boolean not null default false,
  status text,
  created_at timestamptz not null default now()
);

alter table if exists public.testimonials
add column if not exists course text;

alter table if exists public.testimonials
add column if not exists rating integer;

alter table if exists public.testimonials
add column if not exists status text;

update public.testimonials
set course = coalesce(course, 'General')
where course is null;

update public.testimonials
set rating = coalesce(rating, 5)
where rating is null;

update public.testimonials
set status = case
  when approved = true then 'approved'
  else 'pending'
end
where status is null;

alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.testimonials enable row level security;

create policy "users can view own profile"
on public.users for select
using (auth.uid() = id);

create policy "users can insert own profile"
on public.users for insert
with check (auth.uid() = id);

create policy "authenticated can insert leads"
on public.leads for insert
to authenticated
with check (auth.uid() = user_id);

create policy "authenticated can view own leads"
on public.leads for select
to authenticated
using (auth.uid() = user_id);

create policy "authenticated can insert testimonials"
on public.testimonials for insert
to authenticated
with check (auth.uid() = user_id);

create policy "everyone can view approved testimonials"
on public.testimonials for select
using (approved = true or auth.uid() = user_id);

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
