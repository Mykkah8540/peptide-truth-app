create table if not exists public.admin_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  actor_user_id uuid,
  actor_roles jsonb,

  action text not null,
  target_type text,
  target_id text,

  request_id text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists admin_events_created_at_idx on public.admin_events (created_at desc);
create index if not exists admin_events_action_idx on public.admin_events (action);
create index if not exists admin_events_target_idx on public.admin_events (target_type, target_id);

comment on table public.admin_events is 'Server-side admin audit log. Inserted by service role only. No medical guidance.';
