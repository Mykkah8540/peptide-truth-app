import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { markSeen } from "@/lib/ugc/store";

async function isAuthed(req: Request): Promise<boolean> {

 // Supabase session → profiles.is_admin
 const supa = await supabaseServer();
 const { data: auth } = await supa.auth.getUser();
 const user = auth?.user;
 if (!user) return false;

 const { data: prof } = await supa
  .from("profiles")
  .select("is_admin")
  .eq("id", user.id)
  .maybeSingle();

 return prof?.is_admin === true; // replaced below
}

export async function POST(req: Request) {
 if (!(await isAuthed(req))) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
 const body = await req.json().catch(() => null);
 const id = String(body?.id || "").trim();

 if (!id) {
  return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });
 }

 const ok = await markSeen(id);
 if (!ok) {
  return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
 }

 return NextResponse.json({ ok: true });
}
