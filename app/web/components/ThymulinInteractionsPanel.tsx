"use client";
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
    id: "thymulin-immunosuppressants",
    name: "Immunosuppressants (calcineurin inhibitors, mTOR inhibitors, mycophenolate)",
    aliases: ["cyclosporine", "tacrolimus", "prograf", "sirolimus", "rapamune", "mycophenolate", "cellcept", "azathioprine", "imuran", "immunosuppressant", "transplant medications"],
    category: "Immunosuppressive therapy",
    tier: "flag",
    summary:
      "Immunosuppressants are prescribed to deliberately suppress T-cell activity \u2014 for organ transplant protection, autoimmune disease management, and prevention of graft-versus-host disease. Thymulin promotes T-cell differentiation and immune activation. The functional opposition between these pharmacological goals is direct: thymulin may partially counteract the immunosuppression, potentially triggering rejection episodes, autoimmune flares, or transplant complications. The severity of this interaction cannot be quantified from existing data, but the theoretical conflict is serious and the consequences of rejection are life-threatening.",
    mitigation: [
      "Thymulin should not be co-administered with immunosuppressive regimens in transplant recipients without explicit specialist approval.",
      "In patients on immunosuppressants for autoimmune disease, the risk-benefit ratio is similarly unfavorable without clinical trial guidance.",
      "If thymulin is being considered for immune support in an immunocompromised patient, this requires direct communication with the transplant or rheumatology team managing the immunosuppression.",
    ],
  },
  {
    id: "thymulin-corticosteroids-systemic",
    name: "Systemic corticosteroids (prednisone, dexamethasone, methylprednisolone)",
    aliases: ["prednisone", "prednisolone", "dexamethasone", "decadron", "methylprednisolone", "medrol", "hydrocortisone systemic", "corticosteroid"],
    category: "Immunosuppressive \u2014 corticosteroid",
    tier: "watch",
    summary:
      "Systemic corticosteroids broadly suppress immune function \u2014 including T-cell activity, cytokine production, and lymphocyte proliferation. Thymulin is intended to promote T-cell differentiation and immune activation. These goals are in functional conflict. The practical significance depends on the corticosteroid dose and indication: low-dose prednisone (e.g., 5\u20137.5 mg/day for rheumatoid arthritis) presents a different risk calculus than high-dose pulse therapy for acute exacerbations. Short-term topical corticosteroids present negligible systemic interaction risk.",
    mitigation: [
      "Avoid thymulin during high-dose systemic corticosteroid courses.",
      "For patients on stable low-dose corticosteroids for chronic disease management, discuss the potential interaction and immune goals with prescribing physician before adding thymulin.",
    ],
  },
  {
    id: "thymulin-biologics-immune",
    name: "Biologic immunomodulators (TNF inhibitors, IL-6 inhibitors, JAK inhibitors)",
    aliases: ["adalimumab", "humira", "etanercept", "enbrel", "infliximab", "remicade", "tocilizumab", "actemra", "tofacitinib", "xeljanz", "baricitinib", "olumiant", "tnf inhibitor", "biologic"],
    category: "Biologic \u2014 immunomodulatory",
    tier: "watch",
    summary:
      "Biologic immunomodulators used for autoimmune and inflammatory diseases target specific immune pathways (TNF-alpha, IL-6, JAK-STAT signaling). Adding a T-cell-activating peptide like thymulin to a regimen designed to suppress immune activity creates a complex and unpredictable immunological environment. TNF inhibitors in particular already carry elevated infection risk; thymulin\u2019s effect on T-cell activation in the context of TNF pathway suppression is unknown and could be either additive to infection risk or produce off-target immune consequences.",
    mitigation: [
      "Discuss with rheumatologist or specialist managing the biologic therapy before considering thymulin.",
      "If infection risk is a primary concern with the biologic therapy, thymulin\u2019s unknown immune activation profile adds an unquantified variable.",
    ],
  },
  {
    id: "thymulin-zinc",
    name: "Zinc supplementation",
    aliases: ["zinc", "zinc gluconate", "zinc picolinate", "zinc citrate", "zinc sulfate", "zinc acetate"],
    category: "Mineral supplement",
    tier: "low",
    summary:
      "Zinc is not just compatible with thymulin \u2014 it is mechanistically required for thymulin\u2019s biological activity. The zinc-thymulin complex (FTS-Zn) is the active form. For individuals with documented zinc deficiency, zinc repletion is expected to enhance endogenous thymulin bioactivity. This is the most evidence-grounded intervention in the thymulin space, and zinc supplementation to achieve zinc sufficiency is a reasonable first step before considering exogenous thymulin. The low concern designation reflects that this is a beneficial pairing at physiological doses \u2014 not a risk interaction.",
    mitigation: [
      "Assess zinc status before supplementing. Target repletion of deficiency, not megadosing.",
      "Stay within the tolerable upper intake level for zinc (40 mg/day elemental zinc for adults) to avoid copper displacement and secondary immune impairment.",
      "Serum zinc plus serum copper and ceruloplasmin provide a fuller picture of zinc-copper balance.",
    ],
  },
  {
    id: "thymulin-thymosin-alpha1",
    name: "Thymosin alpha-1 (Ta1, Zadaxin)",
    aliases: ["thymosin alpha 1", "ta1", "zadaxin", "thymic peptides", "thymosin"],
    category: "Thymic peptide",
    tier: "watch",
    summary:
      "Thymosin alpha-1 is a distinct thymic peptide with its own immunomodulatory mechanisms, approved in some countries for chronic hepatitis B and cancer immunotherapy adjuvant use. Some individuals in research communities combine thymulin with thymosin alpha-1 seeking additive thymic immune support. The combination has no published clinical safety or pharmacology data. Both compounds modulate T-cell immunity through different mechanisms; their potential for additive or synergistic immune activation, and whether that could produce unwanted immune consequences (e.g., autoimmune activation), is unknown.",
    mitigation: [
      "If combining thymic peptides, proceed with increased awareness that the combined immunomodulatory effect is uncharacterized.",
      "Baseline immune function panels (complete blood count with differential, immunoglobulin levels) provide a starting reference point.",
    ],
  },
  {
    id: "thymulin-vaccines",
    name: "Vaccines (live-attenuated and inactivated)",
    aliases: ["vaccine", "immunization", "live vaccine", "mmr", "varicella", "flu shot", "covid vaccine", "shingles vaccine"],
    category: "Immunological \u2014 vaccine",
    tier: "watch",
    summary:
      "Thymulin promotes T-cell differentiation, which is also the immune process that generates vaccine-mediated immunity. In theory, thymulin might enhance vaccine immunogenicity by supporting the T-helper cell responses necessary for durable antibody production and cytotoxic T-cell memory. This is an interesting hypothesis but not validated in human vaccine studies. The concern with live-attenuated vaccines is theoretical but real: in any context of immune activation or modulation, the response to live-attenuated organisms can be altered unpredictably.",
    mitigation: [
      "Avoid live-attenuated vaccines (MMR, varicella, yellow fever, nasal flu) while using thymulin until more is known about its immunomodulatory profile.",
      "Inactivated vaccines (flu shot, COVID-19 mRNA, hepatitis B) are lower risk and may in theory benefit from thymulin-enhanced T-cell support \u2014 but this has not been validated.",
      "Do not alter vaccine schedules based on speculative thymulin benefits without physician guidance.",
    ],
  },
  {
    id: "thymulin-anticancer-therapy",
    name: "Checkpoint inhibitors and cancer immunotherapy",
    aliases: ["pembrolizumab", "keytruda", "nivolumab", "opdivo", "ipilimumab", "yervoy", "atezolizumab", "checkpoint inhibitor", "pd-1", "pd-l1", "ctla-4", "immunotherapy"],
    category: "Oncologic \u2014 immune checkpoint inhibitor",
    tier: "flag",
    summary:
      "Cancer checkpoint inhibitors work by releasing brakes on T-cell activity, often resulting in potent immune activation that can cause serious immune-related adverse events (colitis, pneumonitis, hepatitis, endocrinopathies). Adding a T-cell-activating peptide like thymulin to this context could theoretically amplify the immune activation, worsening immune-related adverse events, or could interfere with the checkpoint mechanism in unpredictable ways. Oncologic immunotherapy is a carefully calibrated treatment and any immune modulator introduced without trial evidence could destabilize the therapeutic balance.",
    mitigation: [
      "Do not combine thymulin with checkpoint inhibitor therapy or other cancer immunotherapy without explicit oncology team approval.",
      "This is one of the highest-risk interaction contexts given the severity of potential checkpoint inhibitor adverse events.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.22)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.05)",
    border: "rgba(124,82,0,0.18)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.04)",
    border: "rgba(21,100,58,0.15)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function ThymulinInteractionsPanel() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return INTERACTIONS;
    return INTERACTIONS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.category.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__search">
        <input
          type="text"
          className="reta-interactions__input"
          placeholder="Search a drug, supplement, or category\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search interactions"
        />
      </div>
      <div className="reta-interactions__list">
        {filtered.length === 0 && (
          <div className="reta-interactions__empty">
            No interactions found for \u201c{query}\u201d. That doesn\u2019t mean none exist \u2014 it means
            this database doesn\u2019t have a specific entry.
          </div>
        )}
        {filtered.map((entry) => {
          const st = TIER_STYLE[entry.tier];
          return (
            <div
              key={entry.id}
              className="reta-interactions__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-interactions__entry-top">
                <div className="reta-interactions__entry-left">
                  <span className="reta-interactions__dot" style={{ background: st.dot }} />
                  <div>
                    <div className="reta-interactions__entry-name">{entry.name}</div>
                    {entry.aliases.length > 0 && (
                      <div className="reta-interactions__entry-aliases">{entry.aliases.join(", ")}</div>
                    )}
                  </div>
                </div>
                <div
                  className="reta-interactions__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-interactions__entry-summary">{entry.summary}</div>
              {entry.mitigation.length > 0 && (
                <ul className="reta-interactions__entry-mitigation">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
