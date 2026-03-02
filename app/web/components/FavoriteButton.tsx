"use client";

import { useRouter } from "next/navigation";
import { useFavorites, type FavKind } from "@/lib/favoritesContext";

interface Props {
  kind: FavKind;
  slug: string;
  label?: string;
  /** Compact mode: icon only, no text label */
  compact?: boolean;
}

export default function FavoriteButton({ kind, slug, label, compact }: Props) {
  const { isSaved, toggle, isAuthed, isPro } = useFavorites();
  const router = useRouter();
  const s = String(slug || "").trim();
  const saved = s ? isSaved(kind, s) : false;
  const gated = isAuthed && !isPro;

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!s) return;

    if (!isAuthed) {
      router.push(`/login?next=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/")}`);
      return;
    }
    if (!isPro) {
      router.push("/upgrade");
      return;
    }

    await toggle(kind, s);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label ? `${saved ? "Remove" : "Save"} ${label}` : saved ? "Remove from My Peps" : "Save to My Peps"}
      className={[
        "pt-favbtn",
        saved ? "pt-favbtn--on" : "",
        compact ? "pt-favbtn--compact" : "",
        gated ? "pt-favbtn--gated" : "",
      ].filter(Boolean).join(" ")}
    >
      <span className="pt-favbtn__icon">{saved ? "♥" : "♡"}</span>
      {!compact && <span className="pt-favbtn__label">{saved ? "Saved" : "Save"}</span>}
      {gated && !compact && <span className="pt-favbtn__pro-badge">Pro</span>}
    </button>
  );
}

// Re-export for components that previously imported from here
export { useFavorites } from "@/lib/favoritesContext";
