import Link from "next/link";
import { listInteractions } from "@/lib/content";
import InteractionsClient from "@/components/InteractionsClient";

export default function InteractionsPage() {
  const rawList = listInteractions();

  const items =
    (rawList ?? []).map((it: any) => ({
      slug: it.slug,
      title: it.title ?? it.name ?? it.slug,
      category: it.category ?? "other",
      summary: it.summary ?? "",
    })) ?? [];

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
