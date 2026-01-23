import { filterByQuery, listPeptides } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const { q = \"\" } = (await searchParams) ?? {}; /* PEP_TALK__SEARCHPARAMS_PROMISE_FIX_V1 */
  const all = listPeptides();
  const rows = filterByQuery(all, q);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Peptides</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>
        Showing {rows.length} of {all.length}
      </div>

      <form method="get" style={{ marginBottom: 18 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search peptides…"
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #e5e5e5",
            fontSize: 16,
          }}
        />
      </form>

      <div style={{ display: "grid", gap: 10 }}>
        {rows.map((p) => (
          <a
            key={p.slug}
            href={p.route || `/peptide/${p.slug}`}
            style={{
              display: "block",
              border: "1px solid #eee",
              borderRadius: 14,
              padding: "12px 14px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 900 }}>{p.name}</div>
            <div style={{ color: "#777", fontSize: 13 }}>{p.slug}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
