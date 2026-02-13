import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { supabaseAdmin } from "@/lib/supabase/admin";

function supabaseRefFromUrl(u?: string | null) {
  const m = String(u || "").match(/^https:\/\/([a-z0-9-]+)\.supabase\.co/i);
  return m?.[1] ?? null;
}

export async function GET(req: Request) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const ref = supabaseRefFromUrl(url);

  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  const base: any = {
    ok: true,
    supabaseRef: ref,
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    userId: user?.id ?? null,
  };

  if (!user) {
    return NextResponse.json({ ...base, note: "not_signed_in" }, { status: 200 });
  }

  try {
    const admin = supabaseAdmin() as any;
    const { data, error } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ ...base, roles: [], dbError: error.message }, { status: 200 });
    }

    return NextResponse.json(
      { ...base, roles: (data ?? []).map((r: any) => String(r.role)) },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ ...base, roles: [], exception: String(e?.message ?? e) }, { status: 200 });
  }
}
