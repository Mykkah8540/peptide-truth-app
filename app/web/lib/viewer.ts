import { supabaseServer } from "@/lib/supabase/server";

export type ViewerProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  initials: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  is_pro: boolean;
};

export type Viewer = {
  user: { id: string; email: string | null } | null;
  profile: ViewerProfile | null;
  forceProOn: boolean;
};

export async function getViewer(): Promise<Viewer> {
  const supa = await supabaseServer();

  const { data: userData, error: userErr } = await supa.auth.getUser();
  const user = userData?.user ?? null;
  if (userErr || !user) {
    return { user: null, profile: null, forceProOn: false };
  }

  // profiles table in your project uses `id` (uuid) as the PK (not user_id)
  const { data: prof } = await supa
    .from("profiles")
    .select("id,email,display_name,initials,avatar_url,is_admin,is_pro")
    .eq("id", user.id)
    .maybeSingle();

  const { data: flag } = await supa
    .from("admin_flags")
    .select("key,value")
    .eq("key", "force_pro_on")
    .maybeSingle();

  return {
    user: { id: user.id, email: user.email ?? null },
    profile: (prof as any) ?? null,
    forceProOn: Boolean((flag as any)?.value),
  };
}

export async function requireAuthedViewer(): Promise<Viewer> {
  const v = await getViewer();
  if (!v.user) throw new Error("unauthorized");
  return v;
}

export async function requireAdminViewer(): Promise<Viewer> {
  const v = await requireAuthedViewer();
  if (!v.profile?.is_admin) throw new Error("forbidden");
  return v;
}
