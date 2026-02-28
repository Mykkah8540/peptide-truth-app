"use client";

/**
 * Bpc157ArginateInteractionsPanel — interaction intelligence for BPC-157 Arginate.
 * Key frame: same interactions as standard BPC-157 — the arginate form does not
 * create new interactions. NSAIDs, anticoagulants, immunosuppressants, and cancer
 * therapies are the primary interaction categories. The arginine component at
 * peptide doses is not a meaningful interaction risk.
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
    id: "cancer-therapies",
    name: "Anti-cancer therapies — chemotherapy, radiation, anti-angiogenic agents (bevacizumab, sunitinib)",
    aliases: ["cancer", "chemotherapy", "bevacizumab", "Avastin", "sunitinib", "Sutent", "sorafenib", "radiation", "anti-angiogenic", "oncology", "tumor"],
    category: "Medications",
    tier: "flag",
    summary: "BPC-157 promotes angiogenesis and upregulates VEGF and other growth factor receptors — the exact mechanisms that anti-angiogenic cancer therapies (bevacizumab, sunitinib, sorafenib) are designed to suppress. Using BPC-157 arginate alongside anti-angiogenic cancer therapy creates direct pharmacological antagonism: BPC-157 promotes the vascular growth that the anti-angiogenic drug is trying to block. Beyond the interaction with anti-angiogenic drugs, BPC-157's growth-promoting properties are contraindicated in any cancer context regardless of the specific therapy being used.",
    mitigation: [
      "Active cancer treatment of any kind: BPC-157 in any form is absolutely contraindicated — disclose any peptide use to your oncologist",
      "On bevacizumab, sunitinib, sorafenib, or any anti-angiogenic therapy: BPC-157 directly opposes the therapeutic mechanism; this is not a theoretical concern",
      "Cancer history (even in remission): discuss with oncologist before any BPC-157 use; the angiogenesis mechanism remains relevant in surveillance settings",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs — ibuprofen, naproxen, aspirin, indomethacin, diclofenac",
    aliases: ["NSAID", "ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "aspirin", "indomethacin", "diclofenac", "Voltaren", "meloxicam", "celecoxib", "Celebrex", "anti-inflammatory"],
    category: "Medications",
    tier: "watch",
    summary: "BPC-157's most robust animal model evidence is GI cytoprotection against NSAID-induced gastropathy. Some community users combine BPC-157 with NSAIDs specifically for this gastroprotective purpose — and the animal data supports this use case. The interaction is not an adverse interaction in this context; rather, it represents BPC-157's target indication in the animal literature. The caveat: combining BPC-157 with NSAIDs for cytoprotection is using animal model data to justify human use, which has not been validated in human trials. Additionally, both BPC-157 and NSAIDs affect wound healing — NSAIDs suppress prostaglandin synthesis and can slow repair; BPC-157 promotes repair — the net effect on healing is uncertain.",
    mitigation: [
      "Using NSAIDs long-term for pain management: BPC-157 has documented gastroprotective effects in animal models against NSAID injury — this is a rational combination from a mechanistic standpoint, but not validated in human trials",
      "Using NSAIDs for musculoskeletal injury alongside BPC-157 for tissue repair: the prostaglandin-suppressing effect of NSAIDs theoretically conflicts with some repair mechanisms; consider whether NSAIDs are necessary or whether non-NSAID analgesia is an option",
      "Monitor for any changes in GI tolerability when starting or stopping either compound",
    ],
  },
  {
    id: "anticoagulants",
    name: "Anticoagulants and antiplatelets — warfarin, apixaban, rivaroxaban, clopidogrel, aspirin",
    aliases: ["anticoagulant", "warfarin", "Coumadin", "apixaban", "Eliquis", "rivaroxaban", "Xarelto", "clopidogrel", "Plavix", "dabigatran", "Pradaxa", "heparin", "blood thinner", "antiplatelet"],
    category: "Medications",
    tier: "watch",
    summary: "BPC-157 affects the NO system and promotes angiogenesis, which can influence platelet aggregation and clotting dynamics. In some animal studies, BPC-157 has shown effects on bleeding time and coagulation parameters. The arginate form delivers the same active peptide and the same coagulation-relevant mechanisms. In patients on anticoagulants (warfarin, apixaban, rivaroxaban) or antiplatelets (clopidogrel, aspirin), BPC-157 could theoretically alter bleeding risk — the direction (pro-coagulant or anti-coagulant) is not clearly established from the available animal data.",
    mitigation: [
      "On warfarin: INR monitoring more frequently when starting or stopping BPC-157; BPC-157 could affect warfarin sensitivity through NO and GI absorption effects",
      "On antiplatelet therapy post-cardiac event: disclose BPC-157 use to cardiologist; coagulation-relevant effects are not fully characterized",
      "Monitor for unusual bruising or bleeding when combining BPC-157 with any anticoagulant or antiplatelet medication",
    ],
  },
  {
    id: "immunosuppressants",
    name: "Immunosuppressants — cyclosporine, tacrolimus, mycophenolate, prednisone",
    aliases: ["immunosuppressant", "cyclosporine", "tacrolimus", "mycophenolate", "CellCept", "prednisone", "prednisolone", "azathioprine", "Imuran", "transplant", "autoimmune"],
    category: "Medications",
    tier: "watch",
    summary: "BPC-157 has documented immune-modulatory effects in animal models — it influences macrophage and neutrophil function, and modulates inflammatory cytokines. Combining BPC-157 with pharmaceutical immunosuppression (in transplant patients or autoimmune disease) creates uncertain effects on immune function that could work in either direction: potentially reducing immunosuppressant efficacy through immune activation, or potentially interacting with the specific cellular pathways targeted by the immunosuppressant.",
    mitigation: [
      "On immunosuppressants for organ transplant: disclose BPC-157 use to transplant team; immune-modulatory effects could affect rejection risk",
      "On immunosuppressants for autoimmune disease: discuss with prescribing physician before adding BPC-157; the immune activation effects could flare some autoimmune conditions",
      "Do not discontinue prescribed immunosuppressants in favor of BPC-157; these are not interchangeable",
    ],
  },
  {
    id: "growth-factors-peptides",
    name: "Other growth-promoting peptides — TB-500, thymosin beta-4, IGF-1, HGH",
    aliases: ["TB-500", "thymosin beta-4", "TB4", "IGF-1", "HGH", "human growth hormone", "growth factor", "GH", "BPC-157 stack", "peptide stack"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "BPC-157 promotes healing through multiple growth factor pathways (VEGF, EGF, FGF). Stacking it with other growth-promoting peptides (TB-500, IGF-1, GH) creates additive growth factor stimulation. In healthy tissue repair contexts, this stacking may be additive in beneficial effects. In any context involving cancer risk, the combined growth-promoting effects amplify the cancer contraindication. No combination pharmacokinetic or pharmacodynamic data exists.",
    mitigation: [
      "Cancer history or risk factors: stacking growth-promoting peptides multiplies the angiogenesis and growth factor risk — each additional compound adds to the aggregate risk",
      "Establish individual response to each compound before combining — stack effects are uncharacterized and adverse effects cannot be attributed to the correct compound if multiple are started simultaneously",
      "The arginate form creates no new interaction risk beyond standard BPC-157 in any stacking context",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, omega-3, collagen peptides, protein",
    aliases: ["vitamin", "omega-3", "fish oil", "collagen", "protein", "creatine", "zinc", "magnesium", "glucosamine", "chondroitin"],
    category: "Supplements",
    tier: "low",
    summary: "No meaningful adverse interactions between BPC-157 arginate and standard supplements are anticipated. Standard supplements and BPC-157 operate through different mechanisms. Arginine at supplement doses (grams per day) from arginine supplementation has HSV reactivation associations in susceptible individuals — but the arginine from the BPC-157 arginate counterion at peptide doses is orders of magnitude lower and not a meaningful arginine supplementation.",
    mitigation: [
      "No adverse interaction between BPC-157 arginate and standard supplement regimens",
      "Collagen peptides are often combined with BPC-157 for connective tissue repair — no adverse interaction; both target the same tissue systems through different mechanisms",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Bpc157ArginateInteractionsPanel() {
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
        BPC-157 arginate has identical interactions to standard BPC-157 — the arginate salt form does not create new interactions. Anti-cancer therapies and cancer history are a hard stop due to the angiogenesis mechanism. NSAIDs have a nuanced interaction: BPC-157&apos;s most replicated animal model evidence is actually GI cytoprotection against NSAID injury, making this an intentional combination context in some cases. Anticoagulants and immunosuppressants warrant monitoring and physician disclosure. The arginine counterion at peptide doses is not an independent interaction risk.
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
