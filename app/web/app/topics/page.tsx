import Link from "next/link";
import { listTopics, loadTopicCategories } from "@/lib/content";

export default function TopicsPage() {
  const topics = listTopics();
  const cats = loadTopicCategories();

  const topicBySlug = new Map(topics.map((t) => [t.slug, t]));
  const uncategorized = topics.filter((t) => !cats.some((c) => c.topic_slugs.includes(t.slug)));

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0 }}>Topics</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>
        Curated topic pages that group peptides and evidence by real-world goals. 
      </p>

      {cats.length ? (
        <section style={{ marginTop: 18 }}>
          <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>Explore by goal</h2>
          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {cats.map((c) => (
              <div key={c.slug} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 14 }}>
                <div style={{ fontWeight: 900 }}>{c.title}</div>

                {c.topic_slugs.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
                    {c.topic_slugs.map((slug) => {
                      const t = topicBySlug.get(slug);
                      if (!t) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/topic/${slug}`}
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
                          {t.title}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>
                    No pages mapped yet. Add slugs to <code>content/topics/categories_v1.json</code>.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section style={{ marginTop: 22 }}>
        <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>All topics</h2>

        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/topic/${t.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 900 }}>{t.title}</div>
              {t.summary ? <div style={{ marginTop: 6, fontSize: 13, opacity: 0.75 }}>{t.summary}</div> : null}
            </Link>
          ))}
        </div>

        {uncategorized.length ? (
          <div style={{ marginTop: 14, fontSize: 13, opacity: 0.7 }}>
            Note: {uncategorized.length} topic(s) are not mapped to any “Explore by goal” category yet.
          </div>
        ) : null}
      </section>
    </main>
  );
}
