"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getBestContextMatches, CONTEXT_PACKS } from "@/lib/contextualConsiderations";

type Props = {
  peptideName: string;
  /** When true, skips the outer <section className="pt-card"> wrapper. */
  noWrap?: boolean;
};

const TITLE = "Things to Consider for Your Situation";
const SUBLINE =
  "Your health background changes what matters. Search your condition or medication to see what's relevant for you.";
const PLACEHOLDER = "Search your condition or medication…";
const FRAMING_LINE = "This adds context — it does not replace medical judgment.";
const SEARCH_HINT =
  "Try: thyroid, SSRI, long COVID, blood thinners, Adderall, autoimmune, POTS, gout, PTSD…";

const SIGNAL_CONFIG: Record<"low" | "watch" | "flag", { label: string; bg: string; border: string; text: string }> = {
  low:   { label: "Low concern",        bg: "rgba(21, 100, 58, 0.08)",  border: "rgba(21, 100, 58, 0.22)",  text: "#155e38" },
  watch: { label: "Worth watching",     bg: "rgba(124, 82, 0, 0.08)",  border: "rgba(124, 82, 0, 0.22)",  text: "#7c5200" },
  flag:  { label: "Real consideration", bg: "rgba(158, 56, 0, 0.08)", border: "rgba(158, 56, 0, 0.22)", text: "#9e3800" },
};

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

function fill(t: unknown, vars: Record<string, string>) {
  const s = typeof t === "string" ? t : "";
  return s.replace(/\{(peptide|query)\}/g, (_m, k) => vars[k] ?? "");
}

function callField(field: unknown, peptide: string, query: string): string {
  if (typeof field === "function") {
    return (field as (p: string, q: string) => string)(peptide, query) || "";
  }
  return fill(field, { peptide, query });
}

function getMatchLabel(m: any): string {
  return (
    String(m?.title || m?.label || m?.pack?.title || m?.pack?.label || m?.name || "Context").trim() || "Context"
  );
}

export default function PDPContextualConsiderations(props: Props) {
  const { noWrap = false } = props;

  // `q` = live input; `committed` = what results are shown for (set on Enter)
  const [q, setQ] = useState("");
  const [committed, setCommitted] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inline typeahead: find first pack label/synonym that starts with the typed string
  const suggestion = useMemo(() => {
    if (q.length < 2) return "";
    const ql = q.toLowerCase();
    for (const p of CONTEXT_PACKS) {
      if (p.label.toLowerCase().startsWith(ql)) return p.label;
      const syn = p.synonyms.find((s) => s.toLowerCase().startsWith(ql));
      if (syn) return syn;
    }
    return "";
  }, [q]);

  // Only the completion portion (everything after what user has typed)
  const ghostSuffix =
    suggestion && suggestion.toLowerCase().startsWith(q.toLowerCase())
      ? suggestion.slice(q.length)
      : "";

  // Results are driven solely by `committed`, not live `q`
  const matches = useMemo(() => {
    if (!committed) return [];
    try {
      const res = (getBestContextMatches as any)(normalize(committed), 4);
      return Array.isArray(res) ? res.slice(0, 4) : [];
    } catch {
      return [];
    }
  }, [committed]);

  useEffect(() => {
    setSelectedIdx(matches.length > 0 ? 0 : -1);
  }, [matches]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQ(e.target.value);
    // Clear any displayed results when user edits the query
    if (committed) setCommitted("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const val = normalize(q);
      if (val) setCommitted(val);
    } else if ((e.key === "Tab" || e.key === "ArrowRight") && ghostSuffix) {
      // Accept the inline suggestion
      e.preventDefault();
      setQ(suggestion);
    } else if (e.key === "Escape") {
      setQ("");
      setCommitted("");
    }
  }

  function handleClear() {
    setQ("");
    setCommitted("");
    setSelectedIdx(-1);
    inputRef.current?.focus();
  }

  const selected = matches[selectedIdx] ?? null;
  const pack = (selected && (selected.pack || selected.context || selected.item || selected)) || null;

  const output = useMemo(() => {
    if (!pack) return null;
    const pn = props.peptideName;
    const query = committed;
    const signal = (pack.signal as "low" | "watch" | "flag" | undefined) ?? null;
    const signalNote = pack.signalNote ? callField(pack.signalNote, pn, query) : null;
    const contextSummary =
      callField(pack.contextSummary ?? pack.context_summary ?? pack.summary ?? "", pn, query) ||
      `If you have "${query}", it's worth thinking about how ${pn} might interact with your baseline — the picture can look different depending on your starting point.`;
    const whatIsKnown =
      callField(pack.whatIsKnown ?? pack.what_is_known ?? pack.known ?? "", pn, query) ||
      `The most consistent finding is that people with "${query}" should track closely in the first 4-6 weeks. Early effects on energy, appetite, and sleep are the clearest signals worth noting.`;
    const whatIsUnclear =
      callField(pack.whatIsUnclear ?? pack.what_is_unclear ?? pack.unclear ?? pack.limits ?? "", pn, query) ||
      `Most studies didn't include people with "${query}", so the evidence is extrapolated rather than direct.`;
    return { signal, signalNote, contextSummary, whatIsKnown, whatIsUnclear };
  }, [pack, props.peptideName, committed]);

  const showMatchTabs = committed && matches.length > 1;

  const inner = (
    <>
      <h2 className="pt-card-title">{TITLE}</h2>
      <p className="pt-card-subtext">{SUBLINE}</p>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {/* Search input with inline ghost text */}
        <div style={{ position: "relative" }}>
          {/* Ghost completion overlay — sits behind the input */}
          {ghostSuffix && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "11px 40px 11px 14px",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0,
                pointerEvents: "none",
                overflow: "hidden",
                whiteSpace: "pre",
                display: "flex",
                alignItems: "center",
                lineHeight: 1.4,
              }}
            >
              {/* Transparent typed portion keeps ghost text properly offset */}
              <span style={{ color: "transparent" }}>{q}</span>
              <span style={{ color: "rgba(15,26,46,0.28)" }}>{ghostSuffix}</span>
            </div>
          )}

          <input
            ref={inputRef}
            value={q}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={ghostSuffix ? "" : PLACEHOLDER}
            autoComplete="off"
            spellCheck={false}
            style={{
              position: "relative",
              width: "100%",
              border: "1px solid rgba(0,0,0,0.14)",
              borderRadius: 14,
              padding: q ? "11px 40px 11px 14px" : "11px 14px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 0,
              outline: "none",
              boxSizing: "border-box",
              background: "transparent",
              color: "#0f1a2e",
            }}
          />

          {/* Clear button */}
          {q && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
              aria-label="Clear search"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                opacity: 0.35,
                padding: 4,
                lineHeight: 1,
                color: "#0f1a2e",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Contextual hint below input */}
        {!committed && q.length >= 2 && (
          <div style={{ fontSize: 11.5, opacity: 0.45, lineHeight: 1.4 }}>
            {ghostSuffix
              ? <>Tab to complete · ↵ Enter to search</>
              : <>↵ Enter to search</>}
          </div>
        )}

        {/* Empty state */}
        {!q && !committed && (
          <div style={{ fontSize: 12, opacity: 0.55, lineHeight: 1.5 }}>{SEARCH_HINT}</div>
        )}

        {/* Match chips — only when multiple results, only after Enter */}
        {showMatchTabs && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {matches.map((m: any, idx: number) => {
              const label = getMatchLabel(m);
              const active = idx === selectedIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    border: active ? "1.5px solid rgba(15,26,46,0.38)" : "1px solid rgba(0,0,0,0.12)",
                    background: active ? "rgba(15,26,46,0.06)" : "rgba(255,255,255,0.7)",
                    borderRadius: 999,
                    padding: "5px 13px",
                    fontSize: 12,
                    fontWeight: active ? 900 : 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  aria-label={`Select: ${label}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* No match — only after Enter */}
        {committed && !matches.length && (
          <div style={{ fontSize: 12.5, opacity: 0.65, lineHeight: 1.5 }}>
            No close match found. Try a simpler term — e.g., "thyroid", "SSRI", "blood pressure".
          </div>
        )}

        {/* Result card */}
        {output && (
          <div
            style={{
              background: "rgba(255,255,255,0.82)",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Signal stripe */}
            {output.signal && SIGNAL_CONFIG[output.signal] && (() => {
              const cfg = SIGNAL_CONFIG[output.signal!];
              return (
                <div
                  style={{
                    background: cfg.bg,
                    borderBottom: `1px solid ${cfg.border}`,
                    padding: "13px 18px 14px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "2px 10px",
                      borderRadius: 999,
                      fontSize: 10.5,
                      fontWeight: 900,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: cfg.text,
                      border: `1px solid ${cfg.border}`,
                      background: "rgba(255,255,255,0.55)",
                    }}
                  >
                    ● {cfg.label}
                  </span>
                  {output.signalNote && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1.42,
                        color: "#1a2435",
                      }}
                    >
                      {output.signalNote}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Content sections */}
            <div style={{ padding: "16px 18px 4px", display: "grid", gap: 0 }}>
              <div style={{ paddingBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.07em", textTransform: "uppercase", opacity: 0.4, marginBottom: 6 }}>
                  What this means with {props.peptideName}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.58, color: "#2c3e52" }}>
                  {output.contextSummary}
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginBottom: 14 }} />

              <div style={{ paddingBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.07em", textTransform: "uppercase", opacity: 0.4, marginBottom: 6 }}>
                  What to track
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.58, color: "#2c3e52" }}>
                  {output.whatIsKnown}
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginBottom: 14 }} />

              <div style={{ paddingBottom: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: "0.07em", textTransform: "uppercase", opacity: 0.4, marginBottom: 6 }}>
                  The honest gap
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.58, color: "#2c3e52" }}>
                  {output.whatIsUnclear}
                </div>
              </div>
            </div>

            {/* Framing footer */}
            <div
              style={{
                padding: "10px 18px 13px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                fontSize: 11.5,
                fontWeight: 700,
                opacity: 0.42,
              }}
            >
              {FRAMING_LINE}
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (noWrap) return <div aria-label={TITLE}>{inner}</div>;
  return <section className="pt-card" aria-label={TITLE}>{inner}</section>;
}
