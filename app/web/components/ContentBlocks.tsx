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
  showEmpty?: boolean;
  emptyText?: string;
};

const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

function isPlaceholderBlock(b: any): boolean {
  const t = String(b?.title || "").toLowerCase();
  const x = String(b?.text || "").toLowerCase();
  return t.includes("pep-talk curation pending") || x.includes("pep-talk curation pending");
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

function isPendingBlock(b: any): boolean {
  const text = String(b?.text ?? "").trim();
  return isPendingText(text);
}


export default function ContentBlocks({ heading, blocks, showEmpty = false, emptyText }: Props) {
  const list = (blocks ?? []).filter(Boolean).filter((b) => !isPlaceholderBlock(b));
  const allPending = list.length > 0 && list.every((b) => isPendingBlock(b));
  if (!list.length) {
    const shouldRenderEmpty = showEmpty && String(heading || "").trim().length > 0;
    if (!shouldRenderEmpty) return null;
    return (
      <section className="pt-card">
        <h2 className="pt-card-title">{heading}</h2>
        <div className="pt-item-note" style={{ marginTop: 10 }}>
          {String(emptyText || "No content has been added yet.")}
        </div>
      </section>
    );
  }
  if (allPending) {
    return (
      <section className="pt-card">
        <h2 className="pt-card-title">{heading}</h2>
        <div className="pt-item-note" style={{ marginTop: 10 }}>
          {String(emptyText || "Pep-Talk curation pending. We avoid speculative claims; this section will be populated as evidence is reviewed.")}
        </div>
      </section>
    );
  }


  return (
    <section className="pt-card">
      <h2 className="pt-card-title">{heading}</h2>

      <div className="pt-stack">
        {list.map((b, idx) => {
          const title = (b.title || "").trim();
          const text = (b.text || "").trim();
          const metaParts = [
          ].filter(Boolean);

          const refs = Array.isArray(b.evidence_refs) ? b.evidence_refs.filter(Boolean) : [];

          return (
            <div key={`${heading}-${idx}`} className="pt-item">
              {title ? <div className="pt-item-title">{title}</div> : null}
              {metaParts.length ? <div className="pt-meta">{metaParts.join(" · ")}</div> : null}
              {text ? <div className="pt-item-text">{text}</div> : null}
              {refs.length ? <div className="pt-meta">Refs: {refs.join(", ")}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
