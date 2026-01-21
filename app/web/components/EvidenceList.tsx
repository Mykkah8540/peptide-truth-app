type Evidence = {
  id: string;
  title: string;
  source_type?: string;
  url?: string;
  year?: number;
  published_date?: string;
  evidence_grade?: string;
  notes?: string;
};

type Props = {
  evidence?: Evidence[] | null;
};

export default function EvidenceList({ evidence }: Props) {
  const list = (evidence ?? []).filter(Boolean);
  if (!list.length) return null;

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Evidence</h2>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {list.map((e) => {
          const metaParts = [
            e.source_type ? e.source_type.toUpperCase() : null,
            e.evidence_grade ? `Grade: ${e.evidence_grade}` : null,
            e.year ? `Year: ${e.year}` : null,
          ].filter(Boolean);

          return (
            <div key={e.id} style={{ padding: 14, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 13, fontWeight: 900 }}>{e.id}</div>
                {metaParts.length ? <div style={{ fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
              </div>

              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>{e.title}</div>

              {e.url ? (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  <a href={e.url} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                    Source link
                  </a>
                </div>
              ) : null}

              {e.notes ? <div style={{ marginTop: 8, fontSize: 13, opacity: 0.85, lineHeight: 1.45 }}>{e.notes}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
