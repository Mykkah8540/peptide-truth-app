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

function isPendingText(s?: string | null): boolean {
  const t = String(s ?? "").trim();
  if (!t) return false;
  const low = t.toLowerCase();
  return (
    low.includes("pep-talk curation pending") ||
    low.includes("we’re reviewing the evidence") ||
    low.includes("we're reviewing the evidence") ||
    low.includes("will expand this section soon")
  );
}

function isUnknown(v?: string | null) {
  const s = String(v ?? "").trim().toLowerCase();
  return !s || s === "unknown" || s === "n/a" || s === "na";
}

export default function EvidenceList({ evidence }: Props) {
  const list = (evidence ?? []).filter(Boolean).filter((e: any) => {
    const hay = [e?.title, e?.url, e?.notes].filter(Boolean).join(' ');
    return !isPendingText(hay);
  });

  // Empty state (don’t disappear; be honest)
  if (!list.length) {
    return (
      <section className="pt-card">
        <h2 className="pt-card-title">Evidence</h2>
        <div className="pt-item-note" style={{ marginTop: 10 }}>
          No curated human clinical sources have been added yet.
        </div>
      </section>
    );
  }

  return (
    <section className="pt-card">
      <h2 className="pt-card-title">Evidence</h2>

      <div className="pt-stack">
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
            <div key={e.id} className="pt-item">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ fontSize: 13, fontWeight: 900 }}>
                  {idLabel || ""}
                </div>
                {metaParts.length ? <div style={{ fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
              </div>

              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, lineHeight: 1.35 }}>{e.title}</div>

              {inferredUrl ? (
                <div style={{ marginTop: 6, fontSize: 12 }}>
                  <a href={inferredUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                    Source link
                  </a>
                </div>
              ) : null}

              {e.notes ? <div className="pt-item-note">{e.notes}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
