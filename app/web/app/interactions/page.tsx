import Link from "next/link";
import { listInteractions, loadInteractionsToPeptidesIndexV1 } from "@/lib/content";
import InteractionsClient from "@/components/InteractionsClient";

export default function InteractionsPage() {
  const rawList = listInteractions();
  const rev = loadInteractionsToPeptidesIndexV1();
  const mapping = (rev && typeof rev === "object" && (rev as any).mapping && typeof (rev as any).mapping === "object")
    ? (rev as any).mapping
    : {};
  const countFor = (slug: string) => Array.isArray(mapping?.[slug]) ? mapping[slug].length : 0;


  const items =
    (rawList ?? []).map((it: any) => ({
      slug: it.slug,
      title: it.title ?? it.name ?? it.slug,
      category: it.category ?? "other",
      summary: it.summary ?? "",
      count: countFor(it.slug),
    })) ?? [];

  // Sort by coverage (desc), then title
  items.sort((a: any, b: any) => {
    const ca = Number(a?.count ?? 0);
    const cb = Number(b?.count ?? 0);
    if (cb !== ca) return cb - ca;
    return String(a?.title ?? "").localeCompare(String(b?.title ?? ""));
  });

  // Derive categories from items (no dependency on taxonomy schema)
  const categories = Array.from(
    new Map(
      items.map((it) => [
        it.category || "other",
        {
          id: it.category || "other",
          title:
            (it.category || "other")
              .replace(/[-_]+/g, " ")
              .replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Other",
        },
      ])
    ).values()
  );

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Interactions</h1>
        <Link
          href="/safety/safety_interactions"
          style={{ fontSize: 13, fontWeight: 800, textDecoration: "none" }}
        >
          Safety: interactions overview →
        </Link>
      </div>

      <p style={{ marginTop: 10, opacity: 0.85, lineHeight: 1.5 }}>
        Interaction classes are <strong>educational context tags</strong> that help you review peptide content with safety in mind
        (e.g., “anticoagulants/antiplatelets”, “SSRIs/SNRIs”, “immunosuppressants”). This is <strong>not</strong> medical advice.
      </p>

      <div style={{ marginTop: 16 }}>
        <InteractionsClient interactions={items} categories={categories} />
      </div>
    </main>
  );
}
