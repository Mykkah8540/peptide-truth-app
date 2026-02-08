"use client";

import { useEffect, useMemo, useState } from "react";
import type { FavoriteKind } from "@/lib/favorites";
import { isFavorited, toggleFavorite, loadFavorites } from "@/lib/favorites";

export default function FavoriteButton({
 kind,
 slug,
 label,
}: {
 kind: FavoriteKind;
 slug: string;
 label?: string;
}) {
 const s = String(slug || "").trim();
 const [on, setOn] = useState(false);

 useEffect(() => {
  if (!s) return;
  setOn(isFavorited(kind, s));
 }, [kind, s]);

 const text = useMemo(() => {
  if (!s) return "☆ Save";
  return on ? "★ Saved" : "☆ Save";
 }, [on, s]);

 return (
  <button
   type="button"
   onClick={() => {
    if (!s) return;
    const next = toggleFavorite(kind, s);
    const nowOn = kind === "peptide" ? next.peptides.includes(s) : next.blends.includes(s);
    setOn(nowOn);
   }}
   aria-label={label ? `Save ${label}` : "Save"}
   style={{
    border: "1px solid rgba(0,0,0,0.10)",
    background: on ? "rgba(0,0,0,0.04)" : "#fff",
    borderRadius: 12,
    padding: "8px 10px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1,
   }}
  >
   {text}
  </button>
 );
}

/**
 * Small helper for client pages that want the full doc.
 * Keeping it here avoids other files importing window directly.
 */
export function useFavoritesDoc() {
 const [doc, setDoc] = useState(() => loadFavorites());

 useEffect(() => {
  // simple "refresh on focus" pattern (no heavy event bus)
  const onFocus = () => setDoc(loadFavorites());
  window.addEventListener("focus", onFocus);
  return () => window.removeEventListener("focus", onFocus);
 }, []);

 return { doc, refresh: () => setDoc(loadFavorites()) };
}
