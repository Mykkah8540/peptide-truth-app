import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type CookieStore = {
  get: (name: string) => { value?: string } | undefined;
  set: (opts: any) => void;
};

export async function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anon) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");

  // In this Next.js version, cookies() is typed as returning a Promise.
  const cookieStore = (await cookies()) as unknown as CookieStore;

  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // Next.js App Router: cookies can only be *mutated* in a Route Handler or Server Action.
      // During Server Component render (including dev), attempts to set cookies will throw.
      // We treat cookie writes as best-effort here to avoid crashing render/dev.
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // no-op outside Route Handlers / Server Actions
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        } catch {
          // no-op outside Route Handlers / Server Actions
        }
      },
    },
  });
}
