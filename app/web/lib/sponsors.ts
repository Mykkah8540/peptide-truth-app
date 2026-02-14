import { createClient } from "@supabase/supabase-js";

export type Sponsor = {
  id: string;
  name: string;
  href: string;
  logoSrc?: string;
  label?: string;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !anon) return null;

  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = getSupabase();
  if (!supabase) {
    // Do not break build/prerender if env isn't present.
    console.warn("[sponsors] missing SUPABASE env; returning []");
    return [];
  }

  const { data, error } = await supabase
    .from("sponsors")
    .select("id, name, href, image_url, label")
    .eq("is_active", true)
    .order("sort_order", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("[sponsors-fetch-error]", error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    href: row.href,
    logoSrc: row.image_url || undefined,
    label: row.label || undefined,
  }));
}
