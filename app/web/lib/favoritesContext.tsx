"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
// favorites.ts kept for legacy localStorage reads only — no writes for non-Pro

export type FavKind = "peptide" | "blend" | "stack";

type FavCtx = {
  ready: boolean;
  isPro: boolean;
  isAuthed: boolean;
  isSaved: (kind: FavKind, slug: string) => boolean;
  toggle: (kind: FavKind, slug: string) => Promise<void>;
};

const FavoritesContext = createContext<FavCtx>({
  ready: false,
  isPro: false,
  isAuthed: false,
  isSaved: () => false,
  toggle: async () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [peptides, setPeptides] = useState<Set<string>>(new Set());
  const [blends, setBlends] = useState<Set<string>>(new Set());
  const [stacks, setStacks] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const me = await fetch("/api/me", { cache: "no-store" }).then((r) => r.json());
        if (cancelled) return;

        const authed = !!me?.isAuthed;
        const pro = !!me?.isPro;
        setIsAuthed(authed);
        setIsPro(pro);

        if (authed && pro) {
          const favs = await fetch("/api/favorites", { cache: "no-store" }).then((r) =>
            r.json()
          );
          if (cancelled) return;
          if (favs?.ok) {
            setPeptides(new Set(favs.peptides ?? []));
            setBlends(new Set(favs.blends ?? []));
            setStacks(new Set(favs.stacks ?? []));
          }
        }
      } catch {
        // Network error — sets stay empty
      }

      if (!cancelled) setReady(true);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const isSaved = useCallback(
    (kind: FavKind, slug: string): boolean => {
      if (kind === "peptide") return peptides.has(slug);
      if (kind === "blend") return blends.has(slug);
      return stacks.has(slug);
    },
    [peptides, blends, stacks]
  );

  const toggle = useCallback(
    async (kind: FavKind, slug: string) => {
      if (isPro) {
        const res = await fetch("/api/favorites/toggle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, slug }),
        })
          .then((r) => r.json())
          .catch(() => null);

        if (!res?.ok) return;

        const nowSaved: boolean = res.saved;
        const update = (prev: Set<string>) => {
          const next = new Set(prev);
          if (nowSaved) next.add(slug);
          else next.delete(slug);
          return next;
        };
        if (kind === "peptide") setPeptides(update);
        else if (kind === "blend") setBlends(update);
        else setStacks(update);
      }
      // Non-Pro: toggle is a no-op — callers should redirect to /upgrade instead
    },
    [isPro]
  );

  return (
    <FavoritesContext.Provider value={{ ready, isPro, isAuthed, isSaved, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
