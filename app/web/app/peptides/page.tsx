import { listPeptides } from "@/lib/content";
export const dynamic = "force-dynamic";

export default async function PeptidesPage() {
  const all = listPeptides();
  const rows = all;
  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Peptides</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>
        Showing {rows.length} of {all.length}
      </div>

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
