import { readFileSync } from "node:fs";
import path from "node:path";

function repoRoot(): string {
  return path.resolve(process.cwd(), "..", "..");
}

type TopicPage = {
  topic: { slug: string; title?: string };
  top_entities?: Array<{ route: string; label?: string; risk_score?: number | null }>;
};

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const root = repoRoot();
  const fp = path.join(root, "content", "topics", "pages", `${slug}.json`);
  let page: TopicPage | null = null;

  try {
    page = JSON.parse(readFileSync(fp, "utf-8")) as TopicPage;
  } catch {
    page = null;
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Topic: {slug}</h1>
      <p style={{ opacity: 0.75 }}>Educational resource. Not medical advice. No dosing or instructions.</p>

      {!page ? (
        <p style={{ marginTop: 14 }}>Topic page JSON not found for this slug.</p>
      ) : (
        <>
          <h2 style={{ marginTop: 18, fontSize: 18 }}>Top entities</h2>
          <ul style={{ paddingLeft: 18 }}>
            {(page.top_entities || []).map((e) => (
              <li key={e.route}>
                {e.label || e.route} {typeof e.risk_score === "number" ? `— risk ${e.risk_score}/10` : ""}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
