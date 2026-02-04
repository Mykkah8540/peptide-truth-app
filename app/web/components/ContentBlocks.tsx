import Link from "next/link";

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
  wrapCard?: boolean;
  hideHeading?: boolean;
};

const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

function renderInlineText(text: string) {
  const t = String(text || "");
  // supports: ... [label](href) ...
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out: any[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(t)) !== null) {
    const start = m.index;
    const end = re.lastIndex;
    if (start > last) out.push(t.slice(last, start));

    const label = String(m[1] || "").trim();
    const href = String(m[2] || "").trim();

    const isInternal = href.startsWith("/");
    if (label && href) {
      out.push(
        isInternal ? (
          <Link key={out.length} href={href} style={{ textDecoration: "underline" }}>
            {label}
          </Link>
        ) : (
          <a key={out.length} href={href} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
            {label}
          </a>
        )
      );
    } else {
      out.push(t.slice(start, end));
    }

    last = end;
  }

  if (last < t.length) out.push(t.slice(last));
  return out;
}


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


export default function ContentBlocks({ heading, blocks, showEmpty = false, emptyText, wrapCard = true, hideHeading = false }: Props) {
  const Wrapper: any = wrapCard ? "section" : "div";
  const wrapperProps = wrapCard ? { className: "pt-card" } : {};
  const list = (blocks ?? []).filter(Boolean).filter((b) => !isPlaceholderBlock(b));
  const allPending = list.length > 0 && list.every((b) => isPendingBlock(b));
  if (!list.length) {
    const shouldRenderEmpty = !!showEmpty;
    if (!shouldRenderEmpty) return null;
    return (
      <div>
        {!hideHeading && String(heading || "").trim() ? <h2 className="pt-card-title">{heading}</h2> : null}
        <div className="pt-item-note" style={{ marginTop: 10 }}>
          {String(emptyText || "No content has been added yet.")}
        </div>
      </div>
    );
  }
  if (allPending) {
  const shouldRenderEmpty = !!showEmpty;
  if (!shouldRenderEmpty) return null;
  return (
    <div>
      {!hideHeading && String(heading || "").trim() ? <h2 className="pt-card-title">{heading}</h2> : null}
      <div className="pt-item-note" style={{ marginTop: 10 }}>
        {String(emptyText || "No content has been added yet.")}
      </div>
    </div>
  );
}



  return (
    <div>
      {!hideHeading && String(heading || "").trim() ? <h2 className="pt-card-title">{heading}</h2> : null}

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
              {text ? <div className="pt-item-text">{renderInlineText(text)}</div> : null}
              {refs.length ? <div className="pt-meta">Refs: {refs.join(", ")}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
