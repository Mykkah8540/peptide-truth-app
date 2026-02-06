import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LogoutPage() {
  const supa = await supabaseServer();
  await supa.auth.signOut();
  redirect("/");
}
