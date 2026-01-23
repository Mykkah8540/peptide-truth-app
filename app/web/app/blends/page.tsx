import { filterByQuery, listBlends } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlendsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }> | { q?: string };
}) {
  const sp = await Promise.resolve(searchParams ?? {}); /* PEP_TALK__SEARCHPARAMS_PROMISE_FIX_V2 */
  const { q = "" } = sp as any;
  const all = listBlends();
  const rows = filterByQuery(all, q);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Stacks / Blends</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>
        Showing {rows.length} of {all.length}
      </div>

      <form method="get" style={{ marginBottom: 18 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search stacks / blends…"
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
