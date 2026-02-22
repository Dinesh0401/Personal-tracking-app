create table if not exists users (
  id uuid primary key,
  email text not null unique,
  created_at timestamptz default now()
);

create table if not exists tasks (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  date date not null,
  dsa_solved int default 0,
  ai_minutes int default 0,
  commit_count int default 0,
  xp int default 0,
  completed_tasks_count int default 0,
  unique (user_id, date)
);

create table if not exists streaks (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0
);

create table if not exists forest (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  date date not null,
  tree_type text check (tree_type in ('healthy', 'dry')) not null,
  unique (user_id, date)
);

create table if not exists github_events (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  event_id text not null,
  created_at timestamptz not null,
  commit_count int not null default 0,
  unique (user_id, event_id)
);
