import { filterByQuery, listTopics } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function TopicsPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? "";
  const all = listTopics();
  const rows = filterByQuery(all as any, q);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Topics</h1>
      <div style={{ color: "#666", marginBottom: 16 }}>
        Showing {rows.length} of {all.length}
      </div>

      <form method="get" style={{ marginBottom: 18 }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search topics…"
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
        {rows.map((t: any) => (
          <a
            key={t.slug}
            href={`/topic/${t.slug}`}
            style={{
              display: "block",
              border: "1px solid #eee",
              borderRadius: 14,
              padding: "12px 14px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 900 }}>{t.title}</div>
            {t.summary ? <div style={{ color: "#666", marginTop: 4 }}>{t.summary}</div> : null}
            <div style={{ color: "#777", fontSize: 13, marginTop: 4 }}>{t.slug}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
