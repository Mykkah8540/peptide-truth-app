"use client";

/**
 * Ll37InteractionsPanel — interaction intelligence for LL-37.
 * Key frame: immunosuppressants are a hard stop (immune activation vs.
 * immunosuppression conflict). Antibiotics have an interesting combination
 * context. Thymosin Alpha-1 stacks are common but additive immune concern.
 */

import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";

interface Entry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  tier: Tier;
  summary: string;
  mitigation: string[];
}

const INTERACTIONS: Entry[] = [
  {
    id: "immunosuppressants",
    name: "Immunosuppressants (cyclosporine, tacrolimus, azathioprine, mycophenolate, prednisone at immunosuppressive doses)",
    aliases: ["cyclosporine", "tacrolimus", "azathioprine", "mycophenolate", "prednisone", "immunosuppressant", "transplant medication", "corticosteroid"],
    category: "Medications",
    tier: "flag",
    summary: "Direct pharmacological conflict. Immunosuppressants deliberately suppress immune activation; LL-37 activates innate immune pathways. Using an immune activator alongside an immunosuppressant creates competing pharmacological signals. In transplant recipients, LL-37's immune activation could trigger rejection responses that immunosuppressants are designed to prevent. In autoimmune disease patients on immunosuppressants, LL-37 amplifies the same pathology being suppressed.",
    mitigation: [
      "Do not use LL-37 while on immunosuppressive medications — the mechanistic conflict is not manageable through dose adjustment",
      "If you are on immunosuppressants for a transplant or autoimmune disease: do not add any immune-activating compound without your transplant physician or rheumatologist's explicit guidance",
    ],
  },
  {
    id: "cancer-treatment",
    name: "Cancer treatments (chemotherapy, targeted therapy, immunotherapy)",
    aliases: ["chemo", "chemotherapy", "cancer treatment", "immunotherapy", "checkpoint inhibitor", "targeted therapy", "oncology"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "LL-37 has documented cancer-promoting effects in some cancer types (gastric, ovarian, lung adenocarcinoma). Using LL-37 during cancer treatment compounds the oncological concern from two directions: the cancer promotion mechanism and the potential interference with immune-based cancer treatments (checkpoint inhibitors rely on specific immune dynamics that LL-37's immune modulation could disrupt).",
    mitigation: [
      "Any active cancer diagnosis: do not use LL-37 — the cancer promotion mechanism and treatment interaction are not self-manageable",
      "On immunotherapy for cancer (checkpoint inhibitors): explicit oncology guidance required before any immune-active compound",
    ],
  },
  {
    id: "antibiotics",
    name: "Antibiotics (systemic)",
    aliases: ["antibiotic", "antibiotics", "amoxicillin", "doxycycline", "ciprofloxacin", "azithromycin", "vancomycin"],
    category: "Medications",
    tier: "watch",
    summary: "Additive antimicrobial mechanisms with unstudied combination pharmacology. LL-37's direct membrane-disrupting antimicrobial activity is mechanistically distinct from most antibiotic mechanisms (cell wall synthesis, protein synthesis, DNA replication inhibition). In theory, LL-37 could be synergistic with some antibiotics (membrane disruption may enhance antibiotic penetration). In practice, the combination is not clinically characterized and the community use for this rationale is not evidence-based.",
    mitigation: [
      "Antibiotic + LL-37 combination rationale exists mechanistically but is not clinically supported",
      "If on systemic antibiotics for a documented infection: notify your prescribing physician about LL-37 use",
      "Do not use LL-37 to 'enhance' antibiotic treatment of a serious infection without medical guidance",
    ],
  },
  {
    id: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    aliases: ["thymosin alpha-1", "thymalfasin", "Zadaxin", "TA-1"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Common immune optimization stack — additive immune activation from two different pathways. Thymosin Alpha-1 works primarily via T-cell maturation and adaptive immune function; LL-37 works via innate immune activation. The combination produces broader immune activation than either alone. For people without autoimmune disease or immunosuppressive context, the additive immune activation may be the goal — but it increases the overall immune stimulus.",
    mitigation: [
      "The autoimmune contraindication for LL-37 also applies to this stack — LL-37 cannot be made safe by adding thymosin alpha-1",
      "If using both: be attentive to any inflammatory symptoms that could indicate immune overactivation",
      "For pure immune support goals, thymosin alpha-1 alone has more human clinical evidence than either LL-37 alone or the combination",
    ],
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    aliases: ["BPC-157", "BPC157", "body protection compound"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Commonly stacked for healing contexts — different mechanisms (BPC-157: angiogenesis and GI protection; LL-37: antimicrobial and immunomodulatory). No direct pharmacological interaction. The healing stack rationale is the combination of BPC-157's tissue regeneration with LL-37's antimicrobial properties for wound healing. This combination is not clinically studied; the individual autoimmune and cancer contraindications for LL-37 apply to the stack.",
    mitigation: [
      "The LL-37 contraindications (autoimmune, cancer, immunosuppressants) apply to the full stack — BPC-157 does not mitigate LL-37's risks",
      "For wound healing goals without the LL-37 concerns: BPC-157 alone has more animal evidence for tissue repair without the immunological risk profile",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (ibuprofen, naproxen, aspirin)",
    aliases: ["ibuprofen", "Advil", "naproxen", "Aleve", "aspirin", "NSAID", "anti-inflammatory"],
    category: "Medications",
    tier: "watch",
    summary: "Potentially counteracting. NSAIDs reduce inflammation by inhibiting cyclooxygenase (COX) enzymes; LL-37 can promote local inflammation. Concurrent use for injection site reaction management may reduce the local inflammatory response — which could be useful for symptom management but also potentially dampens the immunomodulatory effects LL-37 is intended to produce. The interaction is not clinically characterized.",
    mitigation: [
      "NSAIDs for injection site pain are a reasonable symptom management approach",
      "Chronic NSAID use alongside LL-37: the anti-inflammatory and pro-inflammatory signals may partially counteract",
    ],
  },
  {
    id: "corticosteroids-topical",
    name: "Topical corticosteroids (for psoriasis or skin conditions)",
    aliases: ["topical steroid", "hydrocortisone", "triamcinolone", "betamethasone", "clobetasol", "topical corticosteroid"],
    category: "Medications",
    tier: "watch",
    summary: "Conflicting signals in psoriasis context. Topical corticosteroids suppress the inflammatory cascade that LL-37 participates in driving in psoriasis. If you are using topical steroids for psoriasis and considering LL-37: LL-37 is contraindicated in psoriasis specifically — topical steroid use for psoriasis is a signal of the underlying condition that makes LL-37 inappropriate.",
    mitigation: [
      "Using topical steroids for psoriasis: LL-37 is contraindicated — the psoriasis diagnosis itself is the stop signal",
      "Using topical steroids for non-psoriatic skin conditions: lower direct pharmacological concern, but LL-37's immune effects are systemic, not targeted to the skin",
    ],
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    aliases: ["vitamin D", "vitamin D3", "cholecalciferol", "D3"],
    category: "Supplements",
    tier: "low",
    summary: "Vitamin D regulates the expression of cathelicidins including LL-37 endogenously — vitamin D deficiency reduces the body's natural LL-37 production. The combination of vitamin D supplementation and exogenous LL-37 doesn't create an adverse pharmacological interaction. Ensuring vitamin D adequacy is a reasonable co-strategy for immune support.",
    mitigation: [
      "No adverse interaction between vitamin D supplementation and LL-37",
      "Vitamin D adequacy supports natural cathelicidin expression — a nutritional complement to the immune support goal",
    ],
  },
  {
    id: "zinc",
    name: "Zinc",
    aliases: ["zinc", "zinc gluconate", "zinc picolinate", "zinc acetate"],
    category: "Supplements",
    tier: "low",
    summary: "Zinc supports innate immunity and antimicrobial defense via multiple mechanisms. No direct interaction with LL-37. Zinc deficiency impairs innate immune function; adequate zinc is a reasonable nutritional co-strategy for immune support goals.",
    mitigation: [
      "No adverse interaction between zinc supplementation and LL-37",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Ll37InteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">

      {/* ── Context note ── */}
      <div className="reta-interactions__context">
        LL-37&apos;s primary interaction risk classes are immunosuppressants (direct pharmacological conflict — stop signal) and cancer treatment (cancer promotion mechanism + treatment interference). If you are on immunosuppressants for any reason, or have any active cancer, stop here. For everyone else, the interaction profile is manageable with awareness.
      </div>

      {/* ── Search + filter ── */}
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="reta-interactions__cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`reta-interactions__cat${activeCat === cat ? " reta-interactions__cat--active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">No interactions found for that search.</div>
        ) : (
          results.map((entry) => {
            const st = TIER_STYLE[entry.tier];
            return (
              <div
                key={entry.id}
                className="reta-interactions__entry"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span
                      className="reta-interactions__entry-tier"
                      style={{ color: st.labelColor, borderColor: st.border }}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>
                <div className="reta-interactions__entry-summary">{entry.summary}</div>
                <ul className="reta-interactions__entry-mit">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
