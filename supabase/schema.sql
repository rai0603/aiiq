-- Enable UUID extension
create extension if not exists "uuid-ossp";

create table public.test_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  test_id text not null,
  score integer not null,
  percentile integer not null,
  dimension_scores jsonb not null default '{}',
  answers jsonb not null default '[]',
  personality_type_id text,
  time_taken integer default 0,
  unlocked boolean default false,
  paid_at timestamptz,
  payment_id text,
  created_at timestamptz default now()
);

alter table public.test_results enable row level security;

create policy "Users can read own results"
  on public.test_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own results"
  on public.test_results for insert
  with check (auth.uid() = user_id);

create policy "Users can update own results"
  on public.test_results for update
  using (auth.uid() = user_id);
