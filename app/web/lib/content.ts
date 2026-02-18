import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

import * as fs from "fs";
export type EntityKind = "peptide" | "blend";

export type EntityListItem = {
  kind: EntityKind;
  slug: string;
  name: string;
  route?: string;
  aliases?: string[];
};

export type TopicListItem = {
  slug: string;
  title: string;
  summary?: string;
};

export type TopicCategory = {
  slug: string;
  title: string;
  topic_slugs: string[];
};

export type TopicCategoriesDoc = {
  schema_version: "topic_categories_v1";
  categories: TopicCategory[];
};

export type TopicPageDocV1 = {
  schema_version: "topic_page_v1";
  topic_page: {
    topic_id: string;
    title: string;
    intro?: any;
    how_to_use_this_page?: any;
    peptide_groups?: any[];
    safety_callouts?: any;
    evidence_notes?: any;
    last_reviewed?: string;
  };
};

function repoRoot(): string {
  // Next can run with cwd at repo root OR app/web depending on phase.
  // Find the repo root by walking upward until we see content/_index/entities_v1.json.
  const cwd = process.cwd();
  const candidates = [
    cwd,
    path.resolve(cwd, ".."),
    path.resolve(cwd, "..", ".."),
    path.resolve(cwd, "..", "..", ".."),
    path.resolve(cwd, "..", "..", "..", ".."),
  ];

  for (const base of candidates) {
    const marker = path.join(base, "content", "_index", "entities_v1.json");
    if (existsSync(marker)) return base;
  }

  // Fallback: previous behavior (best guess)
  return path.resolve(cwd, "..", "..");
}

function readJson<T>(fp: string): T {
  const raw = readFileSync(fp, "utf-8");
  return JSON.parse(raw) as T;
}

function safeString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function titleFromSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/**
 * entities_v1.json schema (confirmed):
 * { peptides: [...], blends: [...], topics: [...], counts: {...}, ... }
 */
export function listEntities(kind: EntityKind): EntityListItem[] {
  const root = repoRoot();
  const fp = path.join(root, "content", "_index", "entities_v1.json");

  let doc: any;
  try {
    doc = readJson<any>(fp);
  } catch {
    return [];
  }

  const rows: any[] =
    kind === "peptide"
      ? (Array.isArray(doc?.peptides) ? doc.peptides : [])
      : (Array.isArray(doc?.blends) ? doc.blends : []);

  const out: EntityListItem[] = rows
    .map((e) => {
      const slug = safeString(e?.slug);
      const route = safeString(e?.route);
      const canonical = safeString(e?.canonical_name) || safeString(e?.name);
      const short = safeString(e?.short_name);
      const name = short || canonical || titleFromSlug(slug);
      return { kind, slug, name, route: route || (kind === "peptide" ? `/peptide/${slug}` : `/blend/${slug}`), aliases: getAliasesForSlug(slug) };
    })
    .filter((x) => !!x.slug);

  out.sort((a, b) => a.name.localeCompare(b.name) || a.slug.localeCompare(b.slug));
  return out;
}

export function listPeptides(): EntityListItem[] {
  return listEntities("peptide");
}

export function listBlends(): EntityListItem[] {
  return listEntities("blend");
}

/* ------------------------------
   Load entity detail by slug
   (Used by /peptide/[slug] and /blend/[slug])
-------------------------------- */

function tryLoadJsonByCandidates(candidates: string[]): any | null {
  for (const fp of candidates) {
    if (existsSync(fp)) {
      try {
        return readJson<any>(fp);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export async function loadPeptideBySlug(slug: string): Promise<any | null> {
  const root = repoRoot();
  const s = (slug || "").trim();
  if (!s) return null;

  const candidates = [
    path.join(root, "content", "peptides", `${s}.json`),
  ];

  const doc = tryLoadJsonByCandidates(candidates);
  if (!doc) return null;
  if (!doc.slug) doc.slug = s;
  return doc;
}

export async function loadBlendBySlug(slug: string): Promise<any | null> {
  const root = repoRoot();
  const s = (slug || "").trim();
  if (!s) return null;

  const candidates = [
    path.join(root, "content", "blends", `${s}.json`),
  ];

  const doc = tryLoadJsonByCandidates(candidates);
  if (!doc) return null;
  if (!doc.slug) doc.slug = s;
  return doc;
}

/**
 * Topics live under content/topics/pages/*.json.
 */

type TopicPageV1 = {
  schema_version?: string;
  topic_page?: {
    topic_id?: string;
    title?: string;
    intro?: any;
    how_to_use_this_page?: any;
    peptide_groups?: any;
    safety_callouts?: any;
    evidence_notes?: any;
    last_reviewed?: any;
  };
};

function topicTitleFromDoc(doc: any, fallbackSlug: string): string {
  const tp = doc?.topic_page;
  const t = safeString(tp?.title) || safeString(doc?.title);
  return t || titleFromSlug(fallbackSlug);
}

function topicSummaryFromDoc(doc: any): string {
  // Prefer the first intro text if present; otherwise fallback to description/summary.
  const tp = doc?.topic_page;
  const intro = tp?.intro;
  if (Array.isArray(intro) && intro.length) {
    const first = intro[0];
    const t = safeString(first?.text) || safeString(first);
    if (t) return t;
  }
  return safeString(doc?.summary) || safeString(doc?.description);
}

export async function loadTopicBySlug(slug: string): Promise<any | null> {
  const root = repoRoot();
  const s = (slug || "").trim();
  if (!s) return null;

  const fp = path.join(root, "content", "topics", "pages", `${s}.json`);
  if (!existsSync(fp)) return null;

  try {
    const doc: any = readJson<any>(fp);
    // Normalize a slug field for convenience.
    if (!doc.slug) doc.slug = s;
    return doc;
  } catch {
    return null;
  }
}

export function listTopics(): TopicListItem[] {
  const root = repoRoot();
  const dir = path.join(root, "content", "topics", "pages");

  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const topics: TopicListItem[] = [];
  for (const f of files) {
    const fp = path.join(dir, f);
    try {
      const doc: any = readJson<any>(fp);
      const slug = f.replace(/\.json$/, "");
      const title = topicTitleFromDoc(doc, slug);
      const summary = topicSummaryFromDoc(doc);
      topics.push({ slug, title, summary: summary || undefined });
    } catch {
      // ignore bad topic file
    }
  }

  topics.sort((a, b) => a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug));
  return topics;
}

/**
 * Topic categories live at content/topics/categories_v1.json
 */
export function loadTopicCategories(): TopicCategory[] {
  const root = repoRoot();
  const fp = path.join(root, "content", "topics", "categories_v1.json");
  try {
    const doc = readJson<TopicCategoriesDoc>(fp);
    const cats = Array.isArray(doc?.categories) ? doc.categories : [];
    return cats
      .map((c) => ({
        slug: safeString((c as any)?.slug),
        title: safeString((c as any)?.title) || titleFromSlug(safeString((c as any)?.slug)),
        topic_slugs: Array.isArray((c as any)?.topic_slugs) ? (c as any).topic_slugs.map((x: any) => safeString(x)).filter(Boolean) : [],
      }))
      .filter((c) => !!c.slug);
  } catch {
    return [];
  }
}

/**
 * Returns full topic page docs normalized from topic_page_v1 schema.
 * Files: content/topics/pages/*.json
 */
export function listTopicPages(): { slug: string; title: string; topic_id: string; doc: TopicPageDocV1 }[] {
  const root = repoRoot();
  const dir = path.join(root, "content", "topics", "pages");

  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const out: any[] = [];
  for (const f of files) {
    const fp = path.join(dir, f);
    try {
      const raw: any = readJson<any>(fp);
      const slug = f.replace(/\.json$/, "");
      const schema = safeString(raw?.schema_version);
      if (schema !== "topic_page_v1" || !raw?.topic_page) continue;

      const tp = raw.topic_page;
      const title = safeString(tp?.title) || titleFromSlug(slug);
      const topic_id = safeString(tp?.topic_id) || slug;

      out.push({ slug, title, topic_id, doc: raw as TopicPageDocV1 });
    } catch {
      // ignore
    }
  }

  out.sort((a, b) => a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug));
  return out;
}

/* ------------------------------
   Alias / synonym support
   Source-of-truth: content/_taxonomy/search_synonyms_v1.json

   Schema (confirmed):
   - entity_synonyms: [{ term: string, slugs: string[] }]
   - blend_synonyms:  [{ term: string, slugs: string[] }]
   - category_synonyms exists but is not used by current list pages yet.
-------------------------------- */

function loadSynonymIndex(): any | null {
  const root = repoRoot();
  const candidates = [
    path.join(root, "content", "_taxonomy", "search_synonyms_v1.json"),
];

  for (const fp of candidates) {
    if (existsSync(fp)) {
      try {
        return readJson<any>(fp);
      } catch {
        return null;
      }
    }
  }
  return null;
}

function buildAliasMaps(): {
  // alias(lower) -> canonical slugs(lower)[]
  aliasToSlugs: Map<string, string[]>;
  // slug(lower) -> aliases(lower)[]
  slugToAliases: Map<string, string[]>;
} {
  const doc = loadSynonymIndex();
  const aliasToSlugs = new Map<string, string[]>();
  const slugToAliases = new Map<string, string[]>();
  if (!doc) return { aliasToSlugs, slugToAliases };

  const add = (alias: string, slug: string) => {
    const a = (alias || "").trim().toLowerCase();
    const s = (slug || "").trim().toLowerCase();
    if (!a) return;
    if (!s) return;

    // alias -> slugs[]
    const sl = aliasToSlugs.get(a) || [];
    if (!sl.includes(s)) sl.push(s);
    aliasToSlugs.set(a, sl);

    // slug -> aliases[]
    const al = slugToAliases.get(s) || [];
    if (!al.includes(a)) al.push(a);
    slugToAliases.set(s, al);
  };

  const ingestRows = (rows: any[]) => {
    for (const r of rows || []) {
      // Schema A (current): { term: string, slugs: string[] }
      const termA = safeString(r?.term);
      const slugsA: any[] = Array.isArray(r?.slugs) ? r.slugs : [];
      if (termA && slugsA.length) {
        for (const s0 of slugsA) {
          if (typeof s0 !== "string") continue;
          add(termA, s0);
        }
        continue;
      }

      // Schema B (fallback): { canonical_slug/slug, aliases/synonyms/terms... }
      const slug =
        safeString(r?.canonical_slug) ||
        safeString(r?.canonical) ||
        safeString(r?.slug) ||
        safeString(r?.target_slug);

      if (!slug) continue;

      const buckets: any[] = [];
      if (Array.isArray(r?.aliases)) buckets.push(...r.aliases);
      if (Array.isArray(r?.synonyms)) buckets.push(...r.synonyms);
      if (Array.isArray(r?.terms)) buckets.push(...r.terms);
      if (typeof r?.alias === "string") buckets.push(r.alias);
      if (typeof r?.synonym === "string") buckets.push(r.synonym);
      if (typeof r?.term === "string") buckets.push(r.term);

      for (const t of buckets) {
        if (typeof t !== "string") continue;
        add(t, slug);
      }
    }
  };


  // Ingest rows that look like: { term: "pt141", slugs: ["bremelanotide"] }
  const ingestTermRows = (rows: any[]) => {
    for (const r of rows || []) {
      const term = safeString(r?.term);
      const slugs = Array.isArray(r?.slugs) ? r.slugs : [];
      for (const s of slugs) {
        if (typeof s !== "string") continue;
        add(term, s);
      }
    }
  };

  // Entity + blend synonyms
  if (Array.isArray(doc?.entity_synonyms)) ingestTermRows(doc.entity_synonyms);
  if (Array.isArray(doc?.blend_synonyms)) ingestTermRows(doc.blend_synonyms);

  return { aliasToSlugs, slugToAliases };
}

const __aliasMaps = buildAliasMaps();


export function getAliasesForSlug(slug: string): string[] {
  const s = (slug || "").trim().toLowerCase();
  if (!s) return [];
  return __aliasMaps.slugToAliases.get(s) || [];
}
function expandQuery(q: string): string[] {
  const raw = (q || "").trim().toLowerCase();
  if (!raw) return [];

  const tokens = raw.split(/\s+/).filter(Boolean);
  const expanded: string[] = [];

  // include original tokens
  for (const t of tokens) expanded.push(t);

  // expand tokens via alias map -> slugs
  for (const t of tokens) {
    const slugs = __aliasMaps.aliasToSlugs.get(t) || [];
    for (const s of slugs) expanded.push(s);
  }

  // include full raw phrase too
  expanded.push(raw);

  // unique
  return Array.from(new Set(expanded));
}

export function filterByQuery<T extends { name?: string; title?: string; slug: string }>(
  rows: T[],
  q: string | null | undefined
): T[] {
  const expanded = expandQuery(q || "");
  if (!expanded.length) return rows;

  return rows.filter((r) => {
    const slug = (r.slug || "").toLowerCase();
    const base = `${r.slug} ${(r as any).name || ""} ${(r as any).title || ""}`.toLowerCase();
    const aliases = slug ? (__aliasMaps.slugToAliases.get(slug) || []) : [];
    const hay = (base + " " + aliases.join(" ")).toLowerCase();
    return expanded.some((term) => hay.includes(term));
  });
}


/* ------------------------------
   Stack Builder goals (V1)
   Source-of-truth: content/stack_builder/goals_v1.json
-------------------------------- */

type StackBuilderGoalsV1 = {
  schema_version?: string; // expected: "stack_builder_goals_v1" (kept optional for forward-compat)
  goals: Array<{
    goal_id: string;
    title: string;
    description?: string;
    // Goal routing (topic ids are the stable join key)
    primary_topic_id?: string;
    secondary_topic_ids?: string[];
  }>;
  updated_at?: string;
};


/*
  Stacks (V1)
  Source-of-truth: content/stacks/*.json
*/

export type StackV1 = {
  schema_version: "stack_v1";
  stack_id: string;
  slug: string;
  title: string;
  summary: string;
  goals: string[];
  peptides: string[];
  blends?: string[];
  cautions?: string[];
  goes_well_with?: string[];
};

export function listStacks(): Array<{ slug: string; title: string }> {
  const root = repoRoot();
  const dir = path.join(root, "content", "stacks");
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    const out: Array<{ slug: string; title: string }> = [];
    for (const f of files) {
      try {
        const doc = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
        if (doc?.schema_version !== "stack_v1") continue;
        if (!doc?.slug || !doc?.title) continue;
        out.push({ slug: String(doc.slug), title: String(doc.title) });
      } catch {}
    }
    out.sort((a, b) => a.title.localeCompare(b.title));
    return out;
  } catch {
    return [];
  }
}

export function loadStackV1BySlug(slug: string): StackV1 | null {
  const root = repoRoot();
  const dir = path.join(root, "content", "stacks");
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    for (const f of files) {
      try {
        const doc = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
        if (doc?.schema_version !== "stack_v1") continue;
        if (String(doc?.slug || "") !== slug) continue;
        return doc as StackV1;
      } catch {}
    }
    return null;
  } catch {
    return null;
  }
}

export function loadStackBuilderGoals(): StackBuilderGoalsV1 | null {
  const root = repoRoot();
  const fp = path.join(root, "content", "stack_builder", "goals_v1.json");
  try {
    const doc = readJson<any>(fp);
    if (doc?.schema_version !== "stack_builder_goals_v1") return null;
    if (!Array.isArray(doc?.goals)) return null;
    return doc as StackBuilderGoalsV1;
  } catch {
    return null;
  }
}

/* ------------------------------
   Topic page loader (topic_page_v1)
   Topics live under content/topics/pages/*.json
-------------------------------- */

/* -------------------------------
   Interactions taxonomy + index
-------------------------------- */

type InteractionClassesV1 = {
  schema_version: "interaction_classes_v1";
  updated_at?: string;
  drug_classes: Array<{ slug: string; title: string; aka?: string[]; notes?: string }>;
  supplement_classes: Array<{ slug: string; title: string; aka?: string[]; notes?: string }>;
};

type InteractionsIndexV1 = {
  schema_version: "interactions_index_v1";
  generated_at?: string;
  stats?: Record<string, any>;
  by_drug_class_name: Record<string, string[]>;
  by_supplement_class_name: Record<string, string[]>;
  by_peptide_name: Record<string, string[]>;
};
export type InteractionListItem = {
  slug: string;
  title: string;
  category?: string;
  summary?: string;
};

export function listInteractions(): InteractionListItem[] {
  // Canonical source of interaction classes is the registry (taxonomy), not the index.
  // The index (content/_index/interactions_v1.json) is term→peptide mapping and is not a list of classes.
  const classesDoc = loadInteractionClassesV1();
  if (!classesDoc) return [];

  const out: InteractionListItem[] = [];
  for (const c of (classesDoc.drug_classes ?? [])) {
    out.push({ slug: c.slug, title: c.title, category: "medication", summary: c.notes });
  }
  for (const c of (classesDoc.supplement_classes ?? [])) {
    out.push({ slug: c.slug, title: c.title, category: "supplement", summary: c.notes });
  }

  // Stable sort: category then title
  out.sort((a, b) => {
    const ca = String(a.category ?? "");
    const cb = String(b.category ?? "");
    if (ca != cb) return ca.localeCompare(cb);
    return String(a.title ?? "").localeCompare(String(b.title ?? ""));
  });

  return out; 
}


export function loadInteractionClassesV1(): InteractionClassesV1 | null {
  const root = repoRoot();
  const fp = path.join(root, "content", "_taxonomy", "interaction_classes_v1.json");
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    const doc = JSON.parse(raw);
    return doc as InteractionClassesV1;
  } catch {
    return null;
  }
}

export function loadInteractionsIndexV1(): InteractionsIndexV1 | null {
  const root = repoRoot();
  const fp = path.join(root, "content", "_index", "interactions_v1.json");
  try {
    const raw = fs.readFileSync(fp, "utf-8");
    const doc = JSON.parse(raw);
    return doc as InteractionsIndexV1;
  } catch {
    return null;
  }
}

export type InteractionsToPeptidesIndexV1 = {
  schema_version: "interactions_to_peptides_v1";
  generated_at: string;
  mapping: Record<string, { peptide_slug: string; peptide_name: string }[]>;
};

export function loadInteractionsToPeptidesIndexV1(): InteractionsToPeptidesIndexV1 | null {
  try {
    const root = repoRoot();
    const fp = path.join(root, "content", "_index", "interactions_to_peptides_v1.json");
    const doc = readJson<any>(fp);
    return doc as InteractionsToPeptidesIndexV1;
  } catch {
    return null;
  }
}


export function loadTopicPageV1BySlug(slug: string): TopicPageDocV1 | null {
  const root = repoRoot();
  const s = (slug || "").trim();
  if (!s) return null;

  const fp = path.join(root, "content", "topics", "pages", `${s}.json`);
  if (!existsSync(fp)) return null;

  try {
    const doc = readJson<any>(fp);
    if (doc?.schema_version !== "topic_page_v1") return null;
    if (!doc?.topic_page?.topic_id) return null;
    return doc as TopicPageDocV1;
  } catch {
    return null;
  }
}
