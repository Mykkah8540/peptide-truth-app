export type FavoriteKind = "peptide" | "blend";

type FavoritesDocV1 = {
  schema_version: "pt_favs_v1";
  peptides: string[];
  blends: string[];
};

const KEY = "pt_favs_v1";

function empty(): FavoritesDocV1 {
  return { schema_version: "pt_favs_v1", peptides: [], blends: [] };
}

function safeParse(raw: string | null): FavoritesDocV1 {
  if (!raw) return empty();
  try {
    const j: any = JSON.parse(raw);
    if (j?.schema_version !== "pt_favs_v1") return empty();
    return {
      schema_version: "pt_favs_v1",
      peptides: Array.isArray(j?.peptides) ? j.peptides.map(String) : [],
      blends: Array.isArray(j?.blends) ? j.blends.map(String) : [],
    };
  } catch {
    return empty();
  }
}

export function loadFavorites(): FavoritesDocV1 {
  if (typeof window === "undefined") return empty();
  return safeParse(window.localStorage.getItem(KEY));
}

export function saveFavorites(doc: FavoritesDocV1) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(doc));
  } catch {
    // ignore
  }
}

export function isFavorited(kind: FavoriteKind, slug: string): boolean {
  const s = String(slug || "").trim();
  if (!s) return false;
  const doc = loadFavorites();
  return kind === "peptide" ? doc.peptides.includes(s) : doc.blends.includes(s);
}

export function toggleFavorite(kind: FavoriteKind, slug: string): FavoritesDocV1 {
  const s = String(slug || "").trim();
  const doc = loadFavorites();
  if (!s) return doc;

  const list = kind === "peptide" ? doc.peptides : doc.blends;
  const has = list.includes(s);

  const nextList = has ? list.filter((x) => x !== s) : [...list, s];

  const next: FavoritesDocV1 =
    kind === "peptide"
      ? { ...doc, peptides: nextList }
      : { ...doc, blends: nextList };

  // normalize uniqueness + stable order
  next.peptides = Array.from(new Set(next.peptides)).sort();
  next.blends = Array.from(new Set(next.blends)).sort();

  saveFavorites(next);
  return next;
}
