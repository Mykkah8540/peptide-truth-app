import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Role checks MUST be deterministic server-side.
 * We use a server-only admin client (service role key) to read public.user_roles.
 *
 * Backwards-compatible call shapes:
 *   hasAnyRole(userId, ["admin"])
 *   hasAnyRole(_ignoredSupa, userId, ["admin"])
 */
export async function hasAnyRole(a: any, b: any, c?: any): Promise<boolean> {
  const { userId, roles } = normalizeArgs(a, b, c);
  if (!userId || roles.length === 0) return false;

  const admin = supabaseAdmin() as any;
  const { data, error } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) return false;

  const have = new Set((data ?? []).map((r: any) => String(r.role)));
  return roles.some((r) => have.has(r));
}

export async function getUserRoles(a: any, b?: any): Promise<string[]> {
  const { userId } = normalizeArgs(a, b, []);
  if (!userId) return [];

  const admin = supabaseAdmin() as any;
  const { data, error } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) return [];
  return (data ?? []).map((r: any) => String(r.role));
}

function normalizeArgs(a: any, b: any, c: any) {
  // Case 1: (userId, roles)
  if (typeof a === "string") {
    const userId = a;
    const roles = Array.isArray(b) ? b.map(String) : [String(b)];
    return { userId, roles };
  }

  // Case 2: (_ignoredSupa, userId, roles) — supa is ignored (admin client is used)
  const userId = typeof b === "string" ? b : String(b ?? "");
  const roles = Array.isArray(c) ? c.map(String) : (c ? [String(c)] : []);
  return { userId, roles };
}
