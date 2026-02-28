"use client";

/**
 * EpitalonInteractionsPanel — interaction intelligence for Epitalon.
 * Key frame: cancer medications and active cancer are a hard stop (telomerase mechanism
 * conflicts with most cancer treatments). Melatonin has additive circadian effects.
 * Longevity compound stacking (NAD+, rapamycin, senolytics) is common but poorly
 * characterized.
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
    id: "cancer-active",
    name: "Active cancer and cancer treatments (chemotherapy, targeted therapy, immunotherapy)",
    aliases: ["cancer", "chemotherapy", "chemo", "oncology", "targeted therapy", "immunotherapy", "cancer treatment", "checkpoint inhibitor"],
    category: "Oncology",
    tier: "flag",
    summary: "Hard stop — epitalon's telomerase activation mechanism conflicts directly with cancer treatment objectives. Most chemotherapy and targeted therapies work by inducing cancer cell death (apoptosis) or inhibiting proliferation. Telomerase activation promotes cancer cell survival and immortality — the pharmacological opposite direction. Using epitalon during active cancer treatment is contraindicated on mechanism.",
    mitigation: [
      "Any active cancer diagnosis: do not use epitalon — the telomerase mechanism directly conflicts with cancer treatment objectives",
      "Any personal cancer history: do not use epitalon even in remission — telomerase activation can promote residual cell growth",
      "Discuss with your oncologist if you have questions about the mechanism — do not self-manage this decision",
    ],
  },
  {
    id: "telomerase-inhibitors",
    name: "Telomerase inhibitors (imetelstat, investigational cancer drugs)",
    aliases: ["imetelstat", "telomerase inhibitor", "GRN163L", "anti-telomerase"],
    category: "Oncology",
    tier: "flag",
    summary: "Directly antagonistic pharmacology. Telomerase inhibitors are used in oncology to suppress the immortality mechanism in cancer cells. Using epitalon (telomerase activator) simultaneously with a telomerase inhibitor is pharmacologically incoherent and indicates active cancer context — which is itself a hard stop.",
    mitigation: [
      "Any telomerase inhibitor use means you are in an active oncology context — epitalon is absolutely contraindicated",
    ],
  },
  {
    id: "melatonin",
    name: "Melatonin",
    aliases: ["melatonin", "melatonin supplement", "sleep supplement"],
    category: "Circadian / Sleep",
    tier: "watch",
    summary: "Additive circadian and sleep effects. Epitalon's pineal/melatonin pathway effects overlap mechanistically with exogenous melatonin. Combining both may produce stronger circadian entrainment effects, more intense sleep deepening, or more pronounced vivid dreaming. The interaction is not dangerous but the combined effect may be more than intended at standard doses of both.",
    mitigation: [
      "If combining epitalon with melatonin: consider starting with lower melatonin dose than usual to assess the combined effect",
      "Evening administration of both is the typical protocol — the combined circadian signal is consistent with intended use",
      "If vivid dreams or sleep disruption is more intense than desired: reduce melatonin or epitalon dose",
    ],
  },
  {
    id: "rapamycin",
    name: "Rapamycin (sirolimus) — longevity use",
    aliases: ["rapamycin", "sirolimus", "Rapamune", "mTOR inhibitor"],
    category: "Longevity Compounds",
    tier: "watch",
    summary: "A common longevity compound stack — mechanistically complementary or potentially conflicting depending on context. Rapamycin inhibits mTOR, which extends lifespan in animal models. Epitalon activates telomerase. These pathways interact — mTOR inhibition can affect telomere biology and vice versa. The combination is used in the longevity community but the pharmacodynamic interaction is not characterized in humans.",
    mitigation: [
      "The rapamycin + epitalon combination is used by longevity researchers but is not characterized for safety or interaction in humans",
      "Rapamycin is immunosuppressive — this affects the immune modulation aspect of epitalon's proposed effects",
      "If combining: physician oversight is appropriate given rapamycin's significant pharmacological profile and immunosuppressive mechanism",
    ],
  },
  {
    id: "nad-plus",
    name: "NAD+ / NMN / NR",
    aliases: ["NAD+", "NAD", "NMN", "nicotinamide mononucleotide", "NR", "nicotinamide riboside"],
    category: "Longevity Compounds",
    tier: "watch",
    summary: "A common longevity stack — different longevity pathways (telomere vs. sirtuin/mitochondrial). No documented adverse interaction between epitalon and NAD+ precursors. The combination is mechanistically complementary in the sense that they work through distinct pathways. Whether the combined longevity effect exceeds either alone is unknown.",
    mitigation: [
      "No documented adverse interaction between epitalon and NAD+ precursors",
      "The cancer concern from epitalon's telomerase mechanism is not mitigated by NAD+ addition",
      "Both have PARP-related considerations: NAD+ is a PARP substrate; this intersection warrants awareness in cancer contexts (already hard stop for epitalon)",
    ],
  },
  {
    id: "senolytics",
    name: "Senolytics (quercetin, dasatinib, fisetin)",
    aliases: ["senolytic", "quercetin", "dasatinib", "fisetin", "navitoclax", "senescent cells"],
    category: "Longevity Compounds",
    tier: "watch",
    summary: "Mechanistically interesting combination — senolytics eliminate senescent cells; epitalon theoretically prevents cells from becoming senescent via telomere extension. The combination targets aging biology from two different angles. No human safety characterization of this combination exists. Quercetin and fisetin are OTC; dasatinib is a cancer drug and requires physician management.",
    mitigation: [
      "Quercetin/fisetin + epitalon: OTC components, low direct pharmacological risk from combination",
      "Dasatinib + epitalon: dasatinib is a cancer therapeutic — if you are taking dasatinib, you are in an oncology context where epitalon is contraindicated",
      "The interaction between senolysis and telomerase activation in human longevity contexts is theoretically interesting but completely uncharacterized",
    ],
  },
  {
    id: "immunosuppressants",
    name: "Immunosuppressants (cyclosporine, tacrolimus, azathioprine, mycophenolate)",
    aliases: ["cyclosporine", "tacrolimus", "azathioprine", "mycophenolate", "immunosuppressant", "transplant medication"],
    category: "Medications",
    tier: "watch",
    summary: "Epitalon has proposed immunomodulatory effects (immune parameter restoration in aged populations). The interaction between these immunomodulatory effects and deliberate pharmacological immunosuppression (transplant maintenance, autoimmune disease management) is not characterized. The potential for immune activation opposing immunosuppression is a real pharmacological concern.",
    mitigation: [
      "Organ transplant recipients on immunosuppression: do not use epitalon without transplant physician guidance",
      "Autoimmune disease managed with immunosuppressants: the immune modulation mechanism creates an uncertain and potentially problematic interaction",
    ],
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    aliases: ["BPC-157", "BPC157", "body protection compound"],
    category: "Peptide Stacks",
    tier: "low",
    summary: "Common longevity/recovery stack — no characterized pharmacological interaction. BPC-157 and epitalon work through different mechanisms; no adverse pharmacodynamic interaction is documented. The cancer concern applies to the stack as a whole if epitalon is part of it.",
    mitigation: [
      "No specific adverse interaction between BPC-157 and epitalon",
      "The cancer history hard stop applies to the full stack — not just individual compounds",
    ],
  },
  {
    id: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    aliases: ["thymosin alpha-1", "thymalfasin", "Zadaxin", "TA-1"],
    category: "Peptide Stacks",
    tier: "low",
    summary: "Complementary immune pathways — both have proposed immunomodulatory effects but via different mechanisms (epitalon: pineal/generalized; thymosin alpha-1: thymic T-cell maturation). Used together in the longevity-immune optimization space. No adverse pharmacological interaction is documented.",
    mitigation: [
      "No specific adverse interaction between thymosin alpha-1 and epitalon",
      "Both have immune modulation components — individuals with autoimmune disease or on immunosuppressants should approach this combination with caution",
    ],
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    aliases: ["vitamin D", "vitamin D3", "cholecalciferol", "D3"],
    category: "Supplements",
    tier: "low",
    summary: "No pharmacological interaction concern. Vitamin D is frequently supplemented alongside longevity peptides; it has its own effects on immune function, telomere length biology (low vitamin D is associated with shorter telomeres in epidemiological studies), and melatonin synthesis. No adverse interaction with epitalon.",
    mitigation: [
      "No adverse interaction — vitamin D supplementation and epitalon can be used concurrently without specific concern",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function EpitalonInteractionsPanel() {
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
        Epitalon&apos;s primary interaction risk class is oncology — cancer history, active cancer treatment, and telomerase inhibitors are all hard stops from the same mechanism. The longevity compound stacking interactions (rapamycin, NAD+, senolytics) are common in the community but poorly characterized. Melatonin has an additive circadian effect worth managing.
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
