-- 0002_admin_events.sql
-- Purpose: audit log for admin/operator actions (read-only to clients; written by server/service role)

create table if not exists public.admin_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  actor_user_id uuid null,
  actor_email text null,
  actor_role text null,

  action text not null,
  entity_type text null,
  entity_id text null,

  ip inet null,
  user_agent text null,
  request_id text null,

  details jsonb not null default '{}'::jsonb
);

create index if not exists admin_events_created_at_idx
  on public.admin_events (created_at desc);

create index if not exists admin_events_action_idx
  on public.admin_events (action);

create index if not exists admin_events_entity_idx
  on public.admin_events (entity_type, entity_id);

alter table public.admin_events enable row level security;

comment on table public.admin_events is 'Append-only audit log for admin/operator actions.';
comment on column public.admin_events.details is 'Arbitrary JSON payload: inputs, diffs, metadata (never secrets).';
