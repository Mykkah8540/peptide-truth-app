import { listBlends } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

export const dynamic = "force-dynamic";

function ProPill() {
  return (
    <span
      aria-label="Pro"
      title="Pro"
      style={{
        marginLeft: 10,
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid rgba(0,0,0,0.18)",
        borderRadius: 999,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 0.9,
        lineHeight: 1,
        opacity: 0.92,
      }}
    >
      PRO
    </span>
  );
}

export default async function BlendsPage() {
  await requirePaid();

  const all = listBlends();
  const rows = all;

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Blends</h1>
        <ProPill />
      </div>

      <div style={{ color: "#666", marginBottom: 16 }}>
        Showing {rows.length} of {all.length}
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {rows.map((b) => (
          <a
            key={b.slug}
            href={b.route || `/blend/${b.slug}`}
            style={{
              display: "block",
              border: "1px solid #eee",
              borderRadius: 14,
              padding: "12px 14px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 900 }}>{b.name}</div>
            <div style={{ color: "#777", fontSize: 13 }}>{b.slug}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
