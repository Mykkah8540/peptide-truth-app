import ContentBlocks from "@/components/ContentBlocks";

type Block = {
  title?: string;
  population_group?: string;
  confidence?: string;
  evidence_grade?: string;
  text?: string;
  evidence_refs?: string[];
};

type Props = {
  blocks?: Block[] | null;
  outlookText?: string | null;
  interestBullets?: string[] | null;
};

export default function OutlookSection({ blocks, outlookText, interestBullets }: Props) {
  const list = (blocks ?? []).filter(Boolean);
  const t = (outlookText ?? "").trim();
  const bullets = (interestBullets ?? []).filter(Boolean);

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
        Current outlook and intended use
      </h2>

      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, opacity: 0.8, lineHeight: 1.45 }}>
        Why people are interested in this peptide and how it is commonly discussed in real-world wellness,
        rehabilitation, and athletic communities.
      </p>

      {t ? (
        <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55 }}>
          {t}
        </div>
      ) : null}

      {bullets.length ? (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>
            Why people are interested
          </div>
          <ul style={{ paddingLeft: 22, margin: 0, listStyleType: "disc", listStylePosition: "outside" }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ marginBottom: 6, fontSize: 14, lineHeight: 1.45 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ marginTop: 14, fontSize: 13, opacity: 0.75 }}>
          This section has not yet been populated for this peptide.
        </div>
      )}

      {list.length ? (
        <div style={{ marginTop: 14 }}>
          <ContentBlocks heading="" blocks={list} />
        </div>
      ) : null}
    </section>
  );
}
