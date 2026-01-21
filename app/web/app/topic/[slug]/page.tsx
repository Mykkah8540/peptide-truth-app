import Link from "next/link";
import { loadTopicBySlug } from "@/lib/content";

function safeString(v: any): string {
  return typeof v === "string" ? v : "";
}

function isNonEmptyArray(v: any): v is any[] {
  return Array.isArray(v) && v.length > 0;
}

function renderBlocks(blocks: any) {
  if (!isNonEmptyArray(blocks)) return null;
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {blocks.map((b, i) => {
        const text = safeString(b?.text);
        if (!text) return null;
        return (
          <div key={i} style={{ lineHeight: 1.55, opacity: 0.92 }}>
            {text}
          </div>
        );
      })}
    </div>
  );
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await loadTopicBySlug(slug);

  // Supports topic_page_v1: { schema_version, topic_page: {...} }
  const tp = doc?.topic_page ?? null;
  if (!tp) {
    return (
      <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Topic not found</h1>
        <p style={{ marginTop: 10 }}>
          <Link href="/topics">Back to Topics</Link>
        </p>
      </main>
    );
  }

  const title = safeString(tp?.title) || slug;
  const groups = isNonEmptyArray(tp?.peptide_groups) ? tp.peptide_groups : [];
  const lastReviewed = safeString(tp?.last_reviewed);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <p style={{ margin: 0, opacity: 0.75, fontSize: 13 }}>
        <Link href="/topics" style={{ color: "inherit" }}>Topics</Link> <span style={{ opacity: 0.5 }}>/</span> {title}
      </p>

      <h1 style={{ fontSize: 30, fontWeight: 900, margin: "8px 0 0 0" }}>{title}</h1>
      {lastReviewed ? <div style={{ marginTop: 6, fontSize: 12, opacity: 0.65 }}>Last reviewed: {lastReviewed}</div> : null}

      <section style={{ marginTop: 16, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16 }}>
        {renderBlocks(tp?.intro)}
      </section>

      {isNonEmptyArray(tp?.safety_callouts) ? (
        <section style={{ marginTop: 14, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 16, padding: 16, background: "rgba(255, 196, 0, 0.08)" }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Safety callouts</div>
          {renderBlocks(tp?.safety_callouts)}
        </section>
      ) : null}

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>Peptide groups</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {groups.map((g: any, idx: number) => {
            const gTitle = safeString(g?.title) || `Group ${idx + 1}`;
            const gIntro = g?.intro;
            const peptides = isNonEmptyArray(g?.peptides) ? g.peptides : [];

            return (
              <details key={idx} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 14 }}>
                <summary style={{ cursor: "pointer", fontWeight: 900, listStyle: "none" }}>
                  {gTitle} <span style={{ fontWeight: 700, opacity: 0.6 }}>({peptides.length})</span>
                </summary>

                <div style={{ marginTop: 12 }}>
                  {renderBlocks(gIntro)}

                  {peptides.length ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                      {peptides.map((pSlug: any) => {
                        const s = safeString(pSlug);
                        if (!s) return null;
                        return (
                          <Link
                            key={s}
                            href={`/peptide/${s}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              border: "1px solid rgba(0,0,0,0.10)",
                              borderRadius: 999,
                              padding: "7px 11px",
                              fontSize: 13,
                              fontWeight: 800,
                              background: "rgba(0,0,0,0.02)",
                            }}
                          >
                            {s}
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ marginTop: 10, fontSize: 13, opacity: 0.7 }}>No peptides listed in this group yet.</div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {isNonEmptyArray(tp?.evidence_notes) ? (
        <section style={{ marginTop: 18, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Evidence notes</div>
          {renderBlocks(tp?.evidence_notes)}
        </section>
      ) : null}
    </main>
  );
}
