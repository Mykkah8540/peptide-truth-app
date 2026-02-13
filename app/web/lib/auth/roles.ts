import { supabaseServer } from "@/lib/supabase/server";

/**
 * Backwards-compatible helper:
 * Supports either:
 *   hasAnyRole(userId, ["admin"])
 *   hasAnyRole(supa, userId, ["admin"])
 */
export async function hasAnyRole(
  a: any,
  b: any,
  c?: any
): Promise<boolean> {
  const { supa, userId, roles } = await normalizeArgs(a, b, c);
  if (!userId || roles.length === 0) return false;

  const { data, error } = await supa
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) return false;
  const have = new Set((data ?? []).map((r: any) => String(r.role)));
  return roles.some((r) => have.has(r));
}

export async function getUserRoles(a: any, b?: any): Promise<string[]> {
  // supports: getUserRoles(userId) OR getUserRoles(supa, userId)
  const { supa, userId } = await normalizeArgs(a, b, []);
  if (!userId) return [];

  const { data, error } = await supa
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) return [];
  return (data ?? []).map((r: any) => String(r.role));
}

async function normalizeArgs(a: any, b: any, c: any) {
  // Case 1: (userId, roles)
  if (typeof a === "string") {
    const supa = await supabaseServer();
    const userId = a;
    const roles = Array.isArray(b) ? b.map(String) : [String(b)];
    return { supa, userId, roles };
  }

  // Case 2: (supa, userId, roles)
  const supa = a ?? (await supabaseServer());
  const userId = typeof b === "string" ? b : String(b ?? "");
  const roles = Array.isArray(c) ? c.map(String) : (c ? [String(c)] : []);
  return { supa, userId, roles };
}
