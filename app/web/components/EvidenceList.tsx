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

function extractPmid(e: any): string | null {
  const hay = [e?.url, e?.notes, e?.title].filter(Boolean).join(" ");
  const m =
    hay.match(/PMID\s*[:#]?\s*(\d{6,10})/i) ||
    hay.match(/\bpmid\b\s*(\d{6,10})/i);
  return m ? String(m[1]) : null;
}

function pubmedUrl(pmid: string) {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

function isUnknown(v?: string | null) {
  const s = String(v ?? "").trim().toLowerCase();
  return !s || s === "unknown" || s === "n/a" || s === "na";
}

export default function EvidenceList({ evidence }: Props) {
  const list = (evidence ?? []).filter(Boolean);

  // Empty state (don’t disappear; be honest)
  if (!list.length) {
    return (
      <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Evidence</h2>
        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85, lineHeight: 1.45 }}>
          No curated human clinical sources have been added yet.
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Evidence</h2>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {list.map((e) => {
          const pmid = extractPmid(e);
          const inferredUrl =
            e.url ||
            ((String(e.source_type || "").toLowerCase() === "pubmed" && pmid) ? pubmedUrl(pmid) : null);

          // Don’t emphasize placeholder ids like "E1"
          const rawId = String(e.id || "").trim();
          const idLabel = pmid ? `PMID ${pmid}` : (!/^E\d+$/i.test(rawId) ? rawId : "");

          const sourceType = String(e.source_type || "").trim();
          const showSourceType = !!inferredUrl && !isUnknown(sourceType);

          const metaParts = [
            showSourceType ? sourceType.toUpperCase() : null,
            !isUnknown(e.evidence_grade) ? `Grade: ${String(e.evidence_grade).trim()}` : null,
            e.year ? `Year: ${e.year}` : null,
          ].filter(Boolean);

          return (
            <div key={e.id} style={{ padding: 14, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 13, fontWeight: 900 }}>
                  {idLabel || ""}
                </div>
                {metaParts.length ? <div style={{ fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
              </div>

              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800 }}>{e.title}</div>

              {inferredUrl ? (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  <a href={inferredUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
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
