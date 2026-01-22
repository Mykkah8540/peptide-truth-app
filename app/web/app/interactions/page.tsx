import Link from "next/link";
import { listInteractions, loadInteractionClassesV1 } from "@/lib/content";
import InteractionsClient from "@/components/InteractionsClient";

export default function InteractionsPage() {
  const interactions = listInteractions();

  const classes = loadInteractionClassesV1();
  const categories = (
    (((classes as any)?.categories ??
      (classes as any)?.classes ??
      (classes as any)?.interaction_classes ??
      []) as any[])
      .map((c: any) => ({
        id: String(c?.id ?? c?.category_id ?? c?.slug ?? "").trim(),
        title: String(c?.title ?? c?.name ?? c?.id ?? c?.slug ?? "").trim(),
      }))
      .filter((x: any) => x.id && x.title)
  ) ?? [];

  // Normalize interaction items for the client
  const items =
    (interactions ?? []).map((it: any) => ({
      slug: it.slug,
      title: it.title ?? it.slug,
      category: it.category ?? "other",
      summary: it.summary ?? "",
    })) ?? [];

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Interactions</h1>
        <Link href="/safety/safety_interactions" style={{ fontSize: 13, fontWeight: 800, textDecoration: "none" }}>
          Safety: interactions overview →
        </Link>
      </div>

      <p style={{ marginTop: 10, opacity: 0.8, lineHeight: 1.45 }}>
        Browse interaction classes (medications, supplements, and other peptides). These pages explain why an interaction matters,
        what the evidence looks like, and what uncertainty remains.
      </p>

      <div style={{ marginTop: 16 }}>
        <InteractionsClient interactions={items} categories={categories} />
      </div>
    </main>
  );
}
