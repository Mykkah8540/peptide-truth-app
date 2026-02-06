import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supa = await supabaseServer();
    await supa.auth.signOut();
  } catch {
    // Never block logout UX on server auth issues.
  }

  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "https://pep-talk.health"));
}
