"use client";

export type StackItemType = "peptide" | "blend";

export type SavedStackItem = {
  type: StackItemType;
  slug: string;
};

export type SavedStack = {
  id: string;
  name: string;
  goal_id?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  items: SavedStackItem[];
};

type SavedStacksDocV1 = {
  schema_version: "saved_stacks_v1";
  stacks: SavedStack[];
};

const KEY = "pt_saved_stacks_v1";

function safeParse(raw: string | null): any {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function normalizeSlug(s: string): string {
  return String(s || "").trim();
}

function normalizeName(s: string): string {
  return String(s || "").trim().slice(0, 80);
}

function clampItems(items: SavedStackItem[]): SavedStackItem[] {
  const out: SavedStackItem[] = [];
  const seen = new Set<string>();
  for (const it of Array.isArray(items) ? items : []) {
    const type = it?.type === "blend" ? "blend" : "peptide";
    const slug = normalizeSlug(it?.slug);
    if (!slug) continue;
    const k = `${type}:${slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ type, slug });
    if (out.length >= 24) break; // keep stacks readable
  }
  return out;
}

export function readSavedStacks(): SavedStack[] {
  if (typeof window === "undefined") return [];
  const doc = safeParse(window.localStorage.getItem(KEY));
  if (!doc || doc.schema_version !== "saved_stacks_v1" || !Array.isArray(doc.stacks)) return [];

  const stacks: SavedStack[] = doc.stacks
    .map((s: any) => {
      const id = normalizeSlug(s?.id);
      const name = normalizeName(s?.name);
      if (!id || !name) return null;

      const createdAt = String(s?.createdAt || "");
      const updatedAt = String(s?.updatedAt || "");
      const goal_id = s?.goal_id ? String(s.goal_id) : null;
      const items = clampItems(Array.isArray(s?.items) ? s.items : []);

      return {
        id,
        name,
        goal_id,
        createdAt: createdAt || new Date().toISOString(),
        updatedAt: updatedAt || new Date().toISOString(),
        items,
      } as SavedStack;
    })
    .filter(Boolean) as SavedStack[];

  // newest first
  stacks.sort((a: any, b: any) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  return stacks;
}

function writeSavedStacks(stacks: SavedStack[]) {
  if (typeof window === "undefined") return;
  const doc: SavedStacksDocV1 = { schema_version: "saved_stacks_v1", stacks };
  window.localStorage.setItem(KEY, JSON.stringify(doc));
}

export function upsertSavedStack(input: {
  id?: string | null;
  name: string;
  goal_id?: string | null;
  items: SavedStackItem[];
}): SavedStack | null {
  if (typeof window === "undefined") return null;

  const now = new Date().toISOString();
  const name = normalizeName(input.name);
  if (!name) return null;

  const items = clampItems(input.items);
  if (!items.length) return null;

  const stacks = readSavedStacks();
  const id = input.id ? normalizeSlug(input.id) : `stk_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;

  const idx = stacks.findIndex((s) => s.id === id);
  const base: SavedStack = idx >= 0 ? stacks[idx] : { id, name, createdAt: now, updatedAt: now, items, goal_id: null };

  const next: SavedStack = {
    ...base,
    name,
    goal_id: input.goal_id ? String(input.goal_id) : null,
    updatedAt: now,
    items,
  };

  const nextStacks = idx >= 0 ? stacks.map((s) => (s.id === id ? next : s)) : [next, ...stacks];
  writeSavedStacks(nextStacks);
  return next;
}

export function deleteSavedStack(id: string): boolean {
  if (typeof window === "undefined") return false;
  const rid = normalizeSlug(id);
  if (!rid) return false;
  const stacks = readSavedStacks();
  const next = stacks.filter((s) => s.id !== rid);
  if (next.length === stacks.length) return false;
  writeSavedStacks(next);
  return true;
}

export function getSavedStack(id: string): SavedStack | null {
  const rid = normalizeSlug(id);
  if (!rid) return null;
  return readSavedStacks().find((s) => s.id === rid) ?? null;
}


// ---- v1 helpers (appended) ----
export function listSavedStacks(): any[] {
  if (typeof window === "undefined") return [];
  const items = safeParse(window.localStorage.getItem(KEY));
  return items
    .map((x: any) => ({ ...x, savedAt: x.savedAt || "" }))
    .sort((a: any, b: any) => String(b.savedAt).localeCompare(String(a.savedAt)));
}
export function isStackSaved(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const items = safeParse(window.localStorage.getItem(KEY));
  return items.some((x: any) => String(x?.slug || "") === String(slug || ""));
}
export function saveStack(input: any) {
  if (typeof window === "undefined") return;
  const items = safeParse(window.localStorage.getItem(KEY));
  const slug = String(input?.slug || "").trim();
  if (!slug) return;

  const next = items.filter((x: any) => String(x?.slug || "") !== slug);
  next.unshift({
    slug,
    title: String(input?.title || slug),
    summary: typeof input?.summary === "string" ? input.summary : "",
    peptides: Array.isArray(input?.peptides) ? input.peptides : [],
    blends: Array.isArray(input?.blends) ? input.blends : [],
    savedAt: new Date().toISOString(),
  });

  window.localStorage.setItem(KEY, JSON.stringify(next.slice(0, 200)));
}
export function removeStack(slug: string) {
  if (typeof window === "undefined") return;
  const items = safeParse(window.localStorage.getItem(KEY));
  const next = items.filter((x: any) => String(x?.slug || "") !== String(slug || ""));
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
