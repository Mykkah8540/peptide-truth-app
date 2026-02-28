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
  low: {
    label: "Low concern",
    bg: "rgba(21, 100, 58, 0.08)",
    border: "rgba(21, 100, 58, 0.22)",
    text: "#155e38",
  },
  watch: {
    label: "Worth watching",
    bg: "rgba(124, 82, 0, 0.08)",
    border: "rgba(124, 82, 0, 0.22)",
    text: "#7c5200",
  },
  flag: {
    label: "Real consideration",
    bg: "rgba(158, 56, 0, 0.08)",
    border: "rgba(158, 56, 0, 0.22)",
    text: "#9e3800",
  },
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
    String(
      m?.title || m?.label || m?.pack?.title || m?.pack?.label || m?.name || "Context"
    ).trim() || "Context"
  );
}

export default function PDPContextualConsiderations(props: Props) {
  const { noWrap = false } = props;
  const [q, setQ] = useState("");
  const query = normalize(q);

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (q.length < 1) return [];
    const ql = q.toLowerCase();
    return CONTEXT_PACKS
      .filter((p) =>
        p.label.toLowerCase().includes(ql) ||
        p.synonyms.some((s) => s.toLowerCase().includes(ql))
      )
      .slice(0, 6)
      .map((p) => p.label);
  }, [q]);

  const matches = useMemo(() => {
    if (!query) return [];
    try {
      const res = (getBestContextMatches as any)(query, 4);
      return Array.isArray(res) ? res.slice(0, 4) : [];
    } catch {
      return [];
    }
  }, [query]);

  useEffect(() => {
    setSelectedIdx(matches.length > 0 ? 0 : -1);
  }, [matches]);

  const selected = matches[selectedIdx] ?? null;
  const pack = (selected && (selected.pack || selected.context || selected.item || selected)) || null;

  const output = useMemo(() => {
    if (!pack) return null;

    const pn = props.peptideName;

    const signal = (pack.signal as "low" | "watch" | "flag" | undefined) ?? null;
    const signalNote = pack.signalNote
      ? callField(pack.signalNote, pn, query)
      : null;

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
  }, [pack, props.peptideName, query]);

  const showMatchTabs = matches.length > 1;

  const inner = (
    <>
      <h2 className="pt-card-title">{TITLE}</h2>
      <p className="pt-card-subtext">{SUBLINE}</p>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {/* Search input with custom suggestions */}
        <div style={{ position: "relative" }}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
            placeholder={PLACEHOLDER}
            autoComplete="off"
            style={{
              width: "100%",
              border: "1px solid rgba(0,0,0,0.14)",
              borderRadius: 14,
              padding: q ? "11px 40px 11px 14px" : "11px 14px",
              fontSize: 14,
              fontWeight: 700,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {q && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setQ(""); setSelectedIdx(-1); setShowSuggestions(false); }}
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
          {/* Custom suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 12,
                boxShadow: "0 6px 24px rgba(15,26,46,0.12)",
                zIndex: 200,
                overflow: "hidden",
              }}
            >
              {suggestions.map((label) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={() => { setQ(label); setShowSuggestions(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 14px",
                    border: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a2435",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {!query && (
          <div style={{ fontSize: 12, opacity: 0.55, lineHeight: 1.5 }}>{SEARCH_HINT}</div>
        )}

        {/* Match tabs (only when multiple results) */}
        {query && showMatchTabs && (
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

        {/* No match state */}
        {query && !matches.length && (
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
