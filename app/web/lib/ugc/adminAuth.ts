import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole } from "@/lib/auth/roles";

export type UgcAdminContext = {
  ok: boolean;
  actorKind: "supabase" | "token";
  actorUserId?: string | null;
};

function timingSafeEqual(a: string, b: string): boolean {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

function tokenAuthed(req: Request): boolean {
  const expected = String(process.env.PEP_TALK_ADMIN_TOKEN || "").trim();
  if (!expected) return false;

  const got = String(req.headers.get("x-admin-token") || "").trim();
  if (!got) return false;

  try {
    return timingSafeEqual(got, expected);
  } catch {
    return false;
  }
}

export async function getUgcAdminContext(req: Request): Promise<UgcAdminContext> {
  // Token auth (non-user automation / emergency access)
  if (tokenAuthed(req)) return { ok: true, actorKind: "token", actorUserId: null };

  // Supabase session → user_roles contains admin/moderator
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);
  if (!user) return { ok: false, actorKind: "supabase", actorUserId: null };

  const ok = await hasAnyRole(supa, user.id, ["admin", "moderator"]);
  return { ok, actorKind: "supabase", actorUserId: user.id };
}

export async function isUgcAdmin(req: Request): Promise<boolean> {
  const ctx = await getUgcAdminContext(req);
  return ctx.ok;
}
