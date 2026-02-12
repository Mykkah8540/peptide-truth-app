import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

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

async function supabaseAdminAuthed(): Promise<boolean> {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;
  if (!user) return false;

  const { data: prof } = await supa
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return prof?.is_admin === true;
}

export async function isUgcAdmin(req: Request): Promise<boolean> {
  if (tokenAuthed(req)) return true;
  return await supabaseAdminAuthed();
}
