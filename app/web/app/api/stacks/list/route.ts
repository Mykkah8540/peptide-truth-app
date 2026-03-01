import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;

  if (!user) {
    // Graceful: not an error, just no stacks for unauthenticated users
    return NextResponse.json({ ok: true, stacks: [] });
  }

  const { data, error } = await supa
    .from("user_stacks")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: "db_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stacks: data ?? [] });
}
