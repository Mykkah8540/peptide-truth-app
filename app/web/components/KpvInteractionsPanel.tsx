"use client";

/**
 * KpvInteractionsPanel — interaction intelligence for KPV (Lys-Pro-Val).
 * Key frame: immunosuppressive IBD medications are the most clinically
 * relevant interaction category; corticosteroids and biologics interact
 * through overlapping anti-inflammatory mechanisms; most interactions
 * are pharmacodynamic, not pharmacokinetic.
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
    id: "immunosuppressives-ibd",
    name: "IBD immunosuppressives — azathioprine, 6-mercaptopurine, methotrexate",
    aliases: ["azathioprine", "Imuran", "6-mercaptopurine", "6-MP", "methotrexate", "Rheumatrex", "thiopurine", "immunosuppressant", "immunosuppressive"],
    category: "Medications",
    tier: "watch",
    summary: "Azathioprine, 6-mercaptopurine, and methotrexate are maintenance immunosuppressives used in IBD for steroid-sparing remission maintenance. KPV's anti-inflammatory mechanism (NF-κB inhibition, MC1R immune modulation) operates through different pathways than these medications (thiopurines inhibit purine synthesis affecting lymphocyte proliferation; methotrexate inhibits folate metabolism). The combined immunosuppressive burden from multiple anti-inflammatory agents with different mechanisms is not characterized for KPV. The primary concern is not a direct pharmacokinetic interaction but the difficulty of attributing disease activity changes to any single agent when multiple are used simultaneously.",
    mitigation: [
      "Inform the gastroenterologist of KPV use — disease activity monitoring may need adjustment when additional anti-inflammatory agents are added",
      "Do not use KPV as a substitute for prescribed IBD maintenance therapy — if prescribed azathioprine or methotrexate, discuss any desire to modify the regimen before adding investigational peptides",
      "If KPV is started as adjunct, maintain current IBD medication doses and monitor for adverse effects of over-immunosuppression (infection risk, complete blood count changes)",
    ],
  },
  {
    id: "biologics-ibd",
    name: "Biologics for IBD — anti-TNF, anti-integrin, anti-IL-12/23 agents",
    aliases: ["infliximab", "Remicade", "adalimumab", "Humira", "certolizumab", "Cimzia", "golimumab", "Simponi", "vedolizumab", "Entyvio", "ustekinumab", "Stelara", "risankizumab", "Skyrizi", "biologic", "anti-TNF", "JAK inhibitor", "tofacitinib", "Xeljanz", "upadacitinib", "Rinvoq"],
    category: "Medications",
    tier: "watch",
    summary: "Biologic therapies for IBD (anti-TNF: infliximab, adalimumab; anti-integrin: vedolizumab; anti-IL-12/23: ustekinumab; JAK inhibitors: tofacitinib, upadacitinib) are the current standard-of-care for moderate-to-severe IBD. KPV's NF-κB inhibition reduces TNF-α and IL-6 — cytokines targeted by some biologics. The combination may produce additive anti-inflammatory effects on overlapping cytokine pathways or create unpredictable immunosuppressive burden. There is no direct interaction study. The more practical concern is that adding an investigational compound alongside biologic therapy complicates attribution of clinical response or adverse effects.",
    mitigation: [
      "On biologic IBD therapy: discuss KPV use with the prescribing gastroenterologist before starting",
      "Biologic therapy monitoring (therapeutic drug levels, antibody formation) should continue as prescribed — KPV does not affect biologic pharmacokinetics but may confound assessment of biologic efficacy if disease activity changes",
      "Watch for signs of over-immunosuppression: increased infection frequency, unusual infections, slow wound healing",
    ],
  },
  {
    id: "corticosteroids",
    name: "Corticosteroids — prednisone, budesonide, methylprednisolone",
    aliases: ["prednisone", "prednisolone", "budesonide", "Entocort", "Uceris", "methylprednisolone", "Medrol", "dexamethasone", "corticosteroid", "steroid"],
    category: "Medications",
    tier: "watch",
    summary: "Corticosteroids are the primary induction therapy for IBD flares. Their anti-inflammatory mechanism includes NF-κB inhibition (via glucocorticoid receptor-NF-κB interaction) — an overlapping mechanism with KPV. Combining KPV with active corticosteroid therapy creates additive NF-κB inhibition with unknown clinical benefit vs. increased immunosuppressive burden. During active corticosteroid IBD therapy, adding KPV is unlikely to add meaningful benefit and may complicate the steroid taper.",
    mitigation: [
      "During active corticosteroid IBD flare treatment: KPV is unlikely to add meaningful benefit and adds complexity — focus on established therapy first",
      "KPV as an investigational adjunct is more relevant in the maintenance (remission) phase rather than the active corticosteroid induction phase",
      "After steroid taper and during maintenance: discuss with gastroenterologist whether KPV as an adjunct to maintenance therapy is reasonable to trial",
    ],
  },
  {
    id: "mesalamine-aminosalicylates",
    name: "Mesalamine and aminosalicylates — 5-ASA compounds for mild-moderate UC",
    aliases: ["mesalamine", "Asacol", "Pentasa", "Lialda", "Apriso", "sulfasalazine", "Azulfidine", "balsalazide", "Colazal", "olsalazine", "Dipentum", "5-ASA", "aminosalicylate"],
    category: "Medications",
    tier: "watch",
    summary: "Mesalamine (5-aminosalicylic acid) and related compounds are the first-line therapy for mild-moderate ulcerative colitis. Their anti-inflammatory mechanism is partially through NF-κB pathway inhibition in intestinal epithelial cells — the same pathway as KPV. Combining KPV with mesalamine creates mechanistic overlap that may be additive (beneficial) or may not provide meaningful additional benefit over mesalamine alone. No interaction data exists. The population most likely to use KPV for IBD is likely already on mesalamine.",
    mitigation: [
      "If on mesalamine for UC: KPV might be considered as an adjunct if disease activity is not fully controlled — discuss with gastroenterologist",
      "The mechanistic overlap (both inhibit NF-κB in intestinal tissue) may mean the combination provides less incremental benefit than expected",
      "Maintain mesalamine therapy — do not substitute KPV for mesalamine, which has strong human evidence for UC",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — probiotics, omega-3, curcumin, vitamin D",
    aliases: ["probiotic", "omega-3", "fish oil", "curcumin", "turmeric", "vitamin D", "supplement", "zinc", "glutamine", "butyrate"],
    category: "Supplements",
    tier: "low",
    summary: "Multiple supplements are used by IBD patients for adjunct support — probiotics (gut microbiome support), omega-3 (anti-inflammatory prostaglandin modulation), curcumin (NF-κB inhibition — overlapping mechanism with KPV), vitamin D (immune regulation), butyrate (colonocyte fuel, barrier support), glutamine (intestinal epithelial fuel). No direct adverse interactions with KPV are expected. Curcumin has overlapping NF-κB inhibitory activity — the combination may be additive for anti-inflammatory effects but is not characterized.",
    mitigation: [
      "No adverse interactions between KPV and standard IBD supplements",
      "Curcumin's NF-κB inhibitory mechanism overlaps with KPV — the combination may have additive effects on inflammatory pathways but is not specifically studied",
      "Probiotics and butyrate support intestinal barrier function, which is complementary to KPV's barrier-supportive effects",
    ],
  },
  {
    id: "nsaids-ibd",
    name: "NSAIDs — ibuprofen, naproxen (caution in IBD regardless of KPV)",
    aliases: ["NSAID", "ibuprofen", "Advil", "naproxen", "Aleve", "aspirin", "anti-inflammatory", "indomethacin"],
    category: "Medications",
    tier: "low",
    summary: "NSAIDs are generally cautioned against in IBD patients because they can trigger IBD flares and worsen intestinal inflammation through prostaglandin inhibition (prostaglandins have protective roles in intestinal mucosa). This caution is independent of KPV — NSAIDs are inadvisable in IBD regardless of KPV use. KPV does not specifically change the NSAID-IBD interaction, but this is worth flagging in the IBD population context.",
    mitigation: [
      "Avoid NSAIDs in IBD when possible, regardless of KPV use — IBD guidelines caution against NSAID use due to flare risk",
      "For pain management in IBD patients, discuss alternatives with the gastroenterologist — acetaminophen is generally preferred over NSAIDs",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function KpvInteractionsPanel() {
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
        KPV&apos;s interactions are primarily pharmacodynamic — mechanistic overlaps with IBD medications that share anti-inflammatory pathways. The most clinically relevant interactions are with IBD maintenance therapy (azathioprine, biologics, mesalamine) where combining anti-inflammatory mechanisms without physician awareness complicates disease monitoring. NSAIDs are cautioned in IBD populations regardless of KPV. Standard IBD supplements (probiotics, curcumin, omega-3) are low concern. No pharmacokinetic interactions are established because no human pharmacokinetic data for KPV exists.
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
