import { listPeptides, listBlends, loadStackBuilderGoals } from "@/lib/content";
import { getRiskIndex } from "@/lib/riskIndex";
import { requirePaid } from "@/lib/gate";
import { supabaseServer } from "@/lib/supabase/server";
import StackBuilderV2, { type CompoundOption } from "@/components/StackBuilderV2";

export const dynamic = "force-dynamic";

export default async function StackBuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ load?: string }>;
}) {
  await requirePaid();

  const { load: loadId } = await searchParams;

  const peptides = listPeptides();
  const blends = listBlends();
  const riskIndex = getRiskIndex();
  const goalsDoc = loadStackBuilderGoals();

  // Build enriched compound list from in-memory indexes — no individual JSON reads
  const riskMap = new Map(riskIndex.map((e) => [e.slug, e]));

  const compounds: CompoundOption[] = [
    ...peptides.map((p) => ({
      slug: p.slug,
      name: p.name,
      kind: "peptide" as const,
      taxonomy_keys: p.taxonomy_keys ?? [],
      risk_score: riskMap.get(p.slug)?.risk.risk_score ?? 5,
      risk_tier: riskMap.get(p.slug)?.risk.risk_tier ?? null,
      evidence_grade: riskMap.get(p.slug)?.risk.evidence_grade ?? null,
    })),
    ...blends.map((b) => ({
      slug: b.slug,
      name: b.name,
      kind: "blend" as const,
      taxonomy_keys: b.taxonomy_keys ?? [],
      risk_score: riskMap.get(b.slug)?.risk.risk_score ?? 5,
      risk_tier: riskMap.get(b.slug)?.risk.risk_tier ?? null,
      evidence_grade: riskMap.get(b.slug)?.risk.evidence_grade ?? null,
    })),
  ];

  const goals = (goalsDoc?.goals ?? []).map((g) => ({
    goal_id: g.goal_id,
    title: g.title,
  }));

  // If ?load=<id>, fetch that stack from Supabase for pre-hydration
  let initialStack = null;
  if (loadId) {
    try {
      const supa = await supabaseServer();
      const { data: auth } = await supa.auth.getUser();
      if (auth?.user) {
        const { data } = await supa
          .from("user_stacks")
          .select("*")
          .eq("id", loadId)
          .eq("user_id", auth.user.id)
          .maybeSingle();
        if (data) initialStack = data;
      }
    } catch {
      // Non-fatal: builder just opens empty
    }
  }

  return (
    <StackBuilderV2
      compounds={compounds}
      goals={goals}
      initialStack={initialStack}
    />
  );
}
