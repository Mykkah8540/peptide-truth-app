import { ugcPool } from "@/lib/ugc/db";

export type UgcEntityType = "peptide" | "blend" | "stack";
export type UgcPostStatus = "pending" | "approved" | "rejected" | "archived" | "trash";

export type UgcPost = {
  id: string;
  entityType: UgcEntityType;
  entitySlug: string;
  username: string;
  text: string;

  status: UgcPostStatus;
  statusReason?: string | null;

  flags?: Record<string, any>;

  createdAt: string;       // ISO string
  updatedAt?: string | null;
  seenAt?: string | null;
};

function rowToPost(r: any): UgcPost {
  return {
    id: String(r.id),
    entityType: String(r.entity_type) as UgcEntityType,
    entitySlug: String(r.entity_slug),
    username: String(r.username),
    text: String(r.text),
    status: String(r.status) as UgcPostStatus,
    statusReason: r.status_reason ?? null,
    flags: r.flags ?? {},
    createdAt: (r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at)),
    updatedAt: r.updated_at ? (r.updated_at instanceof Date ? r.updated_at.toISOString() : String(r.updated_at)) : null,
    seenAt: r.seen_at ? (r.seen_at instanceof Date ? r.seen_at.toISOString() : String(r.seen_at)) : null,
  };
}

export async function listApproved(entityType: UgcEntityType, entitySlug: string): Promise<UgcPost[]> {
  const pool = ugcPool();
  const res = await pool.query(
    `
      select id, entity_type, entity_slug, username, text, status, status_reason, flags, created_at, updated_at, seen_at
      from public.ugc_posts
      where entity_type = $1 and entity_slug = $2 and status = 'approved'
      order by created_at desc
      limit 200
    `,
    [entityType, entitySlug]
  );
  return res.rows.map(rowToPost);
}

export async function submitPost(input: {
  entityType: UgcEntityType;
  entitySlug: string;
  username: string;
  text: string;
  flags?: Record<string, any>;
}): Promise<UgcPost> {
  const pool = ugcPool();
  const id = "ugc_" + Math.random().toString(36).slice(2) + "_" + Date.now().toString(36);

  const entityType = input.entityType;
  const entitySlug = input.entitySlug.trim();
  const username = input.username.trim();
  const text = input.text.trim();
  const flags = input.flags ?? {};

  const res = await pool.query(
    `
      insert into public.ugc_posts (id, entity_type, entity_slug, username, text, status, status_reason, flags)
      values ($1, $2, $3, $4, $5, 'pending', null, $6::jsonb)
      returning id, entity_type, entity_slug, username, text, status, status_reason, flags, created_at, updated_at, seen_at
    `,
    [id, entityType, entitySlug, username, text, JSON.stringify(flags)]
  );

  return rowToPost(res.rows[0]);
}

export async function moderatePost(input: {
  id: string;
  status: UgcPostStatus;
  reason?: string | null;
}): Promise<UgcPost | null> {
  const pool = ugcPool();

  const id = input.id.trim();
  const status = input.status;
  const reason = input.reason ? input.reason.trim() : null;

  const res = await pool.query(
    `
      update public.ugc_posts
      set status = $2,
          status_reason = $3,
          updated_at = now()
      where id = $1
      returning id, entity_type, entity_slug, username, text, status, status_reason, flags, created_at, updated_at, seen_at
    `,
    [id, status, reason]
  );

  if (!res.rows.length) return null;
  return rowToPost(res.rows[0]);
}

export async function listByStatus(status: any, limit: number = 200): Promise<UgcPost[]> {
  const st = String(status || "pending").trim() as UgcPostStatus;
  const lim = Math.max(1, Math.min(1000, Number(limit || 200)));

  const pool = ugcPool();
  const res = await pool.query(
    `
      select id, entity_type, entity_slug, username, text, status, status_reason, flags, created_at, updated_at, seen_at
      from public.ugc_posts
      where status = $1
      order by created_at desc
      limit $2
    `,
    [st, lim]
  );

  return res.rows.map(rowToPost);
}

export async function listPending(limit = 100): Promise<UgcPost[]> {
  return listByStatus("pending", limit);
}

export async function markSeen(id: string): Promise<boolean> {
  const pool = ugcPool();
  const res = await pool.query(
    `
      update public.ugc_posts
      set seen_at = coalesce(seen_at, now())
      where id = $1
    `,
    [String(id || "").trim()]
  );
  return (res.rowCount || 0) > 0;
}
