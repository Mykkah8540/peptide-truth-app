type Block = {
  claim_type?: string;
  title?: string;
  population_group?: string;
  confidence?: string;
  evidence_grade?: string;
  text?: string;
  evidence_refs?: string[];
};

type Props = {
  heading: string;
  blocks?: Block[] | null;
};

export default function ContentBlocks({ heading, blocks }: Props) {
  const list = (blocks ?? []).filter(Boolean);
  if (!list.length) return null;

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{heading}</h2>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {list.map((b, idx) => {
          const title = (b.title || "").trim();
          const text = (b.text || "").trim();
          const metaParts = [
            b.population_group ? `Population: ${b.population_group}` : null,
            b.confidence ? `Confidence: ${b.confidence}` : null,
            b.evidence_grade ? `Evidence: ${b.evidence_grade}` : null,
          ].filter(Boolean);

          const refs = Array.isArray(b.evidence_refs) ? b.evidence_refs.filter(Boolean) : [];

          return (
            <div key={`${heading}-${idx}`} style={{ padding: 14, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              {title ? <div style={{ fontSize: 14, fontWeight: 900 }}>{title}</div> : null}
              {metaParts.length ? <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
              {text ? <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5 }}>{text}</div> : null}
              {refs.length ? <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>Refs: {refs.join(", ")}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
