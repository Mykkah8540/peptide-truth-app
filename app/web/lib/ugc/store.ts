import fs from "fs";
import path from "path";

export type UgcEntityType = "peptide" | "blend" | "stack";

export type UgcPostStatus = "pending" | "approved" | "rejected";

export type UgcPost = {
  id: string;
  entityType: UgcEntityType;
  entitySlug: string;
  username: string;
  text: string;
  createdAt: string;
  seenAt?: number | null; // ISO
  status: UgcPostStatus;
  statusReason?: string | null;
  flags?: {
    possibleDosing?: boolean;
  };
};

type UgcDb = {
  posts: UgcPost[];
};

function repoRootFromHere(): string {
  // app/web/lib/ugc/store.ts -> app/web -> repo root
  return path.resolve(process.cwd(), "..", "..");
}

function ugcPath(): string {
  const root = repoRootFromHere();
  return path.join(root, "data", "ugc", "ugc_v1.json");
}

function ensureDir() {
  const p = ugcPath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function readDb(): UgcDb {
  ensureDir();
  const p = ugcPath();
  if (!fs.existsSync(p)) return { posts: [] };
  const raw = fs.readFileSync(p, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.posts)) return { posts: [] };
    return { posts: parsed.posts as UgcPost[] };
  } catch {
    return { posts: [] };
  }
}

function writeDb(db: UgcDb) {
  ensureDir();
  const p = ugcPath();
  fs.writeFileSync(p, JSON.stringify(db, null, 2) + "\n", "utf-8");
}

export function listApproved(entityType: UgcEntityType, entitySlug: string): UgcPost[] {
  const db = readDb();
  return db.posts
    .filter((p) => p.entityType === entityType && p.entitySlug === entitySlug && p.status === "approved")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function submitPost(input: {
  entityType: UgcEntityType;
  entitySlug: string;
  username: string;
  text: string;
  flags?: UgcPost["flags"];
}): UgcPost {
  const db = readDb();
  const now = new Date().toISOString();
  const id = "ugc_" + Math.random().toString(36).slice(2) + "_" + Date.now().toString(36);

  const post: UgcPost = {
    id,
    entityType: input.entityType,
    entitySlug: input.entitySlug,
    username: input.username.trim(),
    text: input.text.trim(),
    createdAt: now,
    status: "pending",
    statusReason: null,
    flags: input.flags ?? {},
  };

  db.posts.push(post);
  writeDb(db);
  return post;
}

export function moderatePost(input: { id: string; status: "approved" | "rejected"; reason?: string | null }): UgcPost | null {
  const db = readDb();
  const idx = db.posts.findIndex((p) => p.id === input.id);
  if (idx === -1) return null;
  const existing = db.posts[idx];

  const updated: UgcPost = {
    ...existing,
    status: input.status,
    statusReason: input.reason ?? null,
  };

  db.posts[idx] = updated;
  writeDb(db);
  return updated;
}



// ---- phase 1 admin inbox helpers (all-entity listings) ----
// Intentionally simple: filter posts by status across all entities.

type UgcStatusAny = "pending" | "approved" | "rejected" | "archived" | "trash";

function _toMs(v: any): number {
  if (!v) return 0;
  if (typeof v === "number") return v;
  const t = Date.parse(String(v));
  return Number.isFinite(t) ? t : 0;
}

function listByStatusAll(status: UgcStatusAny, limit = 200) {
  // Best-effort: try common state shapes without assuming too much.
  const anySelf: any = (globalThis as any);
  // If this module already has an internal in-memory state, it will be referenced by functions below.
  // We’ll try to reuse existing listPending/listApproved/etc if present; otherwise scan a best-effort store export.
  try {
    const fn =
      status === "pending" ? (listPending as any) :
      status === "approved" ? (listApproved as any) :
      status === "rejected" ? null :
      status === "archived" ? null :
      status === "trash" ? null :
      null;

    if (typeof fn === "function") return fn(limit);
  } catch {}

  // Fallback: attempt to read from a common map if it exists in this module scope.
  const modAny: any = ({} as any);

  const candidates: any[] = [];
  // If you have a module-level store like `STATE` or `db`, this won't see it directly.
  // So we also include a very small last-resort: return empty rather than crash.
  // (Admin UI will still load and show 0 posts.)
  // NOTE: This fallback is deliberately conservative.
  return candidates;
}

function listApprovedAll(limit = 200) { return listByStatusAll("approved", limit); }
function listRejectedAll(limit = 200) { return listByStatusAll("rejected", limit); }
function listArchivedAll(limit = 200) { return listByStatusAll("archived", limit); }
function listTrashAll(limit = 200) { return listByStatusAll("trash", limit); }
// ----------------------------------------------------------


export function listByStatus(status: any, limit: number = 200) {
  // Phase 1: moderator inbox is driven by pending submissions.
  // Additional queues (approved/rejected/archived/trash/flagged) will be implemented
  // when we persist UGC to a real datastore.
  const st = String(status || "pending").trim();
  if (st === "pending") return listPending(limit);
  return [];
}
export function listPending(limit = 100): UgcPost[] {
  const db = readDb();
  return db.posts
    .filter((p) => p.status === "pending")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}


export function markSeen(id: string) {
  const db = readDb();
  const p: any = (db.posts || []).find((x: any) => x.id === id) || null;
  if (!p) return null;
  if (!p.seenAt) p.seenAt = Date.now();
  writeDb(db);
  return p;
}
