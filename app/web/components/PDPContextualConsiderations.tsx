"use client";

import { useEffect, useMemo, useState } from "react";
import { getBestContextMatches } from "@/lib/contextualConsiderations";

type Props = {
  peptideName: string;
  /** When true, skips the outer <section className="pt-card"> wrapper.
   *  Use when the parent already provides a container (e.g. reta-g-card). */
  noWrap?: boolean;
};

const TITLE = "Things to Consider for Your Situation";
const SUBLINE =
  "People respond differently to the same compound. Age, health conditions, medications, and baseline biology can all change what matters most in research discussions and real-world experiences.";

const PLACEHOLDER = "Search: thyroid, SSRI, autoimmune, older adults…";
const FRAMING_LINE = "This adds context — it does not decide what’s right for any individual.";

const EXAMPLES = ["Thyroid conditions", "Antidepressants (SSRIs)", "Autoimmune conditions", "Hormonal conditions", "Older adults", "Pregnancy"];

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

function fill(t: unknown, vars: Record<string, string>) {
  const s = typeof t === "string" ? t : "";
  return s.replace(/\{(peptide|query)\}/g, (_m, k) => vars[k] ?? "");
}

export default function PDPContextualConsiderations(props: Props) {
  const { noWrap = false } = props;
  const [q, setQ] = useState("");
  const query = normalize(q);

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

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
    setSelectedIdx(-1);
  }, [query]);

  const selected = matches[selectedIdx] ?? null;
  const pack = (selected && (selected.pack || selected.context || selected.item || selected)) || null;

  const vars = useMemo(
    () => ({
      peptide: props.peptideName,
      query,
    }),
    [props.peptideName, query]
  );

  const output = useMemo(() => {
    if (!pack) return null;

    const contextSummary =
      fill(pack.contextSummary ?? pack.context_summary ?? pack.summary ?? "", vars) ||
      `People often ask how "${query}" relates to ${props.peptideName}. This context matters because physiology, co-medications, and baseline health can change which mechanisms are emphasized and how experiences are described.`;

    const whatIsKnown =
      fill(pack.whatIsKnown ?? pack.what_is_known ?? pack.known ?? "", vars) ||
      `What’s discussed most consistently is how ${props.peptideName} may overlap with pathways relevant to "${query}". Evidence strength varies and may be limited or indirect.`;

    const whatIsUnclear =
      fill(pack.whatIsUnclear ?? pack.what_is_unclear ?? pack.unclear ?? pack.limits ?? "", vars) ||
      `It may be unclear how well general findings translate to people with "${query}", especially when studies exclude certain populations or don’t account for co-medications and comorbidities.`;

    const whyExperiencesVary =
      fill(pack.whyExperiencesVary ?? pack.why_experiences_vary ?? pack.variance ?? "", vars) ||
      `Variability can come from baseline biology, coexisting conditions, concurrent medications, lifestyle factors, and how outcomes are measured or reported.`;

    return { contextSummary, whatIsKnown, whatIsUnclear, whyExperiencesVary };
  }, [pack, props.peptideName, query, vars]);

  const inner = (
    <>
      <h2 className="pt-card-title">{TITLE}</h2>
      <p className="pt-card-subtext">{SUBLINE}</p>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={PLACEHOLDER}
          style={{
            width: "100%",
            border: "1px solid rgba(0,0,0,0.14)",
            borderRadius: 14,
            padding: "12px 12px",
            fontSize: 14,
            fontWeight: 800,
            outline: "none",
          }}
        />

        {!query ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setQ(ex)}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fff",
                  borderRadius: 999,
                  padding: "8px 10px",
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                  opacity: 0.9,
                }}
                aria-label={`Search: ${ex}`}
                title={`Search: ${ex}`}
              >
                {ex}
              </button>
            ))}
          </div>
        ) : matches.length ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 950, opacity: 0.85 }}>Top matches</div>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setSelectedIdx(-1);
                }}
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fff",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: "pointer",
                  opacity: 0.85,
                }}
                aria-label="Clear"
                title="Clear"
              >
                Clear
              </button>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              {matches.map((m: any, idx: number) => {
                const label =
                  String(m?.title || m?.label || m?.pack?.title || m?.pack?.label || m?.name || "Context").trim() ||
                  "Context";
                const active = idx === selectedIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    style={{
                      textAlign: "left",
                      border: active ? "1px solid rgba(0,0,0,0.35)" : "1px solid rgba(0,0,0,0.12)",
                      background: active ? "rgba(0,0,0,0.03)" : "#fff",
                      borderRadius: 12,
                      padding: "10px 12px",
                      cursor: "pointer",
                      display: "grid",
                      gap: 4,
                    }}
                    aria-label={`Select match: ${label}`}
                    title={`Select match: ${label}`}
                  >
                    <div style={{ fontSize: 13, fontWeight: 950, letterSpacing: -0.1 }}>{label}</div>
                    {typeof m?.why === "string" && m.why.trim() ? (
                      <div style={{ fontSize: 12, opacity: 0.72, lineHeight: 1.35 }}>{m.why}</div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {output ? (
              <div style={{ display: "grid", gap: 12, marginTop: 4 }}>
                <div>
                  <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>1. Context Summary</div>
                  <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{output.contextSummary}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>2. What Is Known</div>
                  <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{output.whatIsKnown}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>3. What Is Unclear or Limited</div>
                  <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{output.whatIsUnclear}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>4. Why Experiences Vary</div>
                  <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{output.whyExperiencesVary}</div>
                </div>

                <div style={{ marginTop: 2, fontSize: 13, fontWeight: 900, opacity: 0.9 }}>5. {FRAMING_LINE}</div>
              </div>
            ) : (
              <div style={{ fontSize: 12, opacity: 0.72, lineHeight: 1.35 }}>
                Select a match to view the context structure.
              </div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: 12, opacity: 0.72, lineHeight: 1.35 }}>
            No close matches found yet. Try a simpler term (e.g., “thyroid”, “SSRI”, “autoimmune”).
          </div>
        )}
      </div>
    </>
  );

  if (noWrap) return <div aria-label={TITLE}>{inner}</div>;
  return <section className="pt-card" aria-label={TITLE}>{inner}</section>;
}
