import ContentBlocks from "@/components/ContentBlocks";
import Link from "next/link";

function firstText(blocks: any): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const t = blocks?.[0]?.text;
  return typeof t === "string" ? t : "";
}

function pick(obj: any, keys: string[]) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null) return v;
  }
  return undefined;
}

function normalizeInteraction(raw: any) {
  const slug = (pick(raw, ["slug", "id", "interaction_id", "key"]) ?? "").toString().trim();
  const title = (pick(raw, ["title", "name"]) ?? slug ?? "Interaction").toString().trim() || "Interaction";
  const category = (pick(raw, ["category", "group", "type"]) ?? "Other").toString().trim() || "Other";

  const risk = (pick(raw, ["risk_level", "risk", "risk_level_label"]) ?? "").toString().trim();
  const confidence = (pick(raw, ["confidence", "confidence_level"]) ?? "").toString().trim();
  const evidence = (pick(raw, ["evidence_grade", "evidence", "evidence_level"]) ?? "").toString().trim();

  const summaryBlocks =
    pick(raw, ["summary_blocks", "summaryBlocks", "summary", "overview_blocks", "overviewBlocks"]) ?? null;

  const notesBlocks =
    pick(raw, ["notes_blocks", "notesBlocks", "evidence_notes_blocks", "evidenceNotesBlocks"]) ?? null;

  const uncertaintyBlocks =
    pick(raw, ["uncertainty_blocks", "uncertaintyBlocks", "unknowns_blocks", "unknownsBlocks"]) ?? null;

  const cautions =
    pick(raw, ["cautions", "contraindications", "avoid_with", "avoidWith"]) ?? null;

  const shortDescription =
    (pick(raw, ["description", "short_description"]) ?? "").toString().trim() ||
    firstText(summaryBlocks) ||
    "";

  return {
    slug,
    title,
    category,
    risk,
    confidence,
    evidence,
    shortDescription,
    summaryBlocks,
    notesBlocks,
    uncertaintyBlocks,
    cautions,
  };
}

function Badge({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ padding: "6px 10px", borderRadius: 999, background: "rgba(0,0,0,0.06)", fontSize: 12, fontWeight: 800 }}>
      {label}: <span style={{ opacity: 0.8 }}>{value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: any }) {
  return (
    <section style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16, padding: 16, background: "#fff" }}>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 900 }}>{title}</h2>
      <div style={{ marginTop: 10 }}>{children}</div>
    </section>
  );
}

export default function InteractionDetail(props: {
  interaction: any;
  usedBy?: { slug: string; name: string }[];
}) {
  const it = normalizeInteraction(props.interaction);

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>{it.category}</div>
            <h1 style={{ margin: "6px 0 0 0", fontSize: 22, fontWeight: 950, letterSpacing: -0.2 }}>{it.title}</h1>
            {it.shortDescription ? (
              <p style={{ margin: "8px 0 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.82 }}>{it.shortDescription}</p>
            ) : null}
          </div>

          <Link
            href="/interactions"
            style={{ textDecoration: "none", fontWeight: 900, fontSize: 13, padding: "10px 12px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", color: "inherit" }}
          >
            ← All interactions
          </Link>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge label="Risk" value={it.risk} />
          <Badge label="Confidence" value={it.confidence} />
          <Badge label="Evidence" value={it.evidence} />
        </div>

        {it.summaryBlocks ? (
          <Card title="Summary">
            <ContentBlocks heading="" blocks={it.summaryBlocks} />
          </Card>
        ) : null}

        {it.cautions ? (
          <Card title="Cautions">
            <div style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
              {Array.isArray(it.cautions) ? (
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                  {it.cautions.map((x: any, i: number) => (
                    <li key={i}>{typeof x === "string" ? x : JSON.stringify(x)}</li>
                  ))}
                </ul>
              ) : (
                <div>{typeof it.cautions === "string" ? it.cautions : JSON.stringify(it.cautions)}</div>
              )}
            </div>
          </Card>
        ) : null}

        {it.notesBlocks ? (
          <Card title="Evidence notes">
            <ContentBlocks heading="" blocks={it.notesBlocks} />
          </Card>
        ) : null}

        {it.uncertaintyBlocks ? (
          <Card title="Uncertainty & gaps">
            <ContentBlocks heading="" blocks={it.uncertaintyBlocks} />
          </Card>
        ) : null}

        {Array.isArray(props.usedBy) && props.usedBy.length ? (
          <Card title="Used by peptides">
            <div style={{ display: "grid", gap: 10 }}>
              <p style={{ margin: 0, fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>
                These peptides reference this interaction class in their Interactions section.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {props.usedBy.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptide/${p.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid rgba(0,0,0,0.10)",
                      borderRadius: 999,
                      padding: "8px 10px",
                      fontSize: 13,
                      fontWeight: 900,
                    }}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
