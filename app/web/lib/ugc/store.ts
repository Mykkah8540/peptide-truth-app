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
  createdAt: string; // ISO
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

export function listPending(limit = 100): UgcPost[] {
  const db = readDb();
  return db.posts
    .filter((p) => p.status === "pending")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}
