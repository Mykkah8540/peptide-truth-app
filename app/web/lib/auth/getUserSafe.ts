import type { User } from "@supabase/supabase-js";

/**
 * Supabase can throw on SSR when cookies/refresh token are missing or stale.
 * In those cases we treat the user as signed-out (return null) and avoid render loops.
 */
export async function getUserSafe(supa: any): Promise<User | null> {
  try {
    const { data, error } = await supa.auth.getUser();
    if (error) return null;
    return data?.user ?? null;
  } catch {
    return null;
  }
}
