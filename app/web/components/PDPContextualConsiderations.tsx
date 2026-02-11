"use client";

import { useMemo, useState } from "react";

type Props = {
  peptideName: string;
};

const LOCKED_TITLE = "Things to Consider for Your Situation";
const LOCKED_SUBLINE =
  "People respond differently to the same peptide. Age, health conditions, medications, and biology can all change how this compound is discussed and experienced.";

const LOCKED_PLACEHOLDER = "Search by condition, medication, age, or situation";

const LOCKED_FRAMING_LINE =
  "This information is meant to add context — not to decide what’s right for any individual.";

const EXAMPLES = [
  "Thyroid conditions",
  "Autoimmune conditions",
  "Antidepressants (SSRIs)",
  "Hormonal conditions",
  "Older adults",
  "Women / men",
  "Metabolic conditions",
  "Pregnancy",
];

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

export default function PDPContextualConsiderations(props: Props) {
  const [q, setQ] = useState("");
  const query = normalize(q);

  // This v1 is intentionally conservative:
  // - No recommendations
  // - No suitability
  // - No risk scoring
  // - No safe/unsafe language
  // - Always uses the mandated 5-part structure
  const response = useMemo(() => {
    if (!query) return null;

    const peptide = props.peptideName;

    return {
      contextSummary: `People often ask how "${query}" relates to ${peptide}. This context matters because physiology, concurrent medications, and baseline health can change which mechanisms are emphasized in research discussions and how experiences are described.`,
      whatIsKnown: `What’s discussed most consistently is *mechanistic overlap*—how ${peptide} is theorized to interact with pathways that may be relevant to "${query}". The strength of evidence varies by peptide and by context, and may be limited to preclinical or early human data in many areas.`,
      whatIsUnclear: `It’s often unclear how well general findings translate to people with "${query}", especially when studies exclude certain populations, use different endpoints, or don’t account for co-medications and comorbidities. In many cases, there is not enough direct data to make confident, individualized claims.`,
      whyExperiencesVary: `Variability can come from differences in baseline biology, coexisting conditions, concurrent medications, lifestyle factors, and how outcomes are measured or reported. Two people describing the “same” outcome may be referencing different physiological changes or different expectations.`,
      framingLine: LOCKED_FRAMING_LINE,
    };
  }, [query, props.peptideName]);

  return (
    <section className="pt-card" aria-label={LOCKED_TITLE}>
      <h2 className="pt-card-title">{LOCKED_TITLE}</h2>
      <p className="pt-card-subtext">{LOCKED_SUBLINE}</p>

      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={LOCKED_PLACEHOLDER}
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

        {!response ? (
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
        ) : (
          <div style={{ display: "grid", gap: 12, marginTop: 6 }}>
            <div>
              <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>1. Context Summary</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{response.contextSummary}</div>
            </div>

            <div>
              <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>2. What Is Known</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{response.whatIsKnown}</div>
            </div>

            <div>
              <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>3. What Is Unclear or Limited</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{response.whatIsUnclear}</div>
            </div>

            <div>
              <div style={{ fontWeight: 950, fontSize: 13, letterSpacing: -0.1 }}>4. Why Experiences Vary</div>
              <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.45, opacity: 0.92 }}>{response.whyExperiencesVary}</div>
            </div>

            <div style={{ marginTop: 2, fontSize: 13, fontWeight: 900, opacity: 0.9 }}>
              5. {response.framingLine}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
