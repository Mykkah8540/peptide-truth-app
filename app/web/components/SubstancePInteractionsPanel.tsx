"use client";

/**
 * SubstancePInteractionsPanel — interaction intelligence for Substance P.
 * Key frame: the interaction landscape for SP is structured around pharmacological
 * opposition (NK1 antagonists directly block SP's mechanism) and additive harm
 * (pain medications, pro-inflammatory contexts). No beneficial interaction exists
 * because there is no beneficial use case for SP injection.
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
    id: "nk1-antagonists",
    name: "NK1 receptor antagonists — aprepitant (Emend), netupitant (Akynzeo), fosaprepitant",
    aliases: ["aprepitant", "Emend", "netupitant", "Akynzeo", "fosaprepitant", "Emend IV", "NK1 antagonist", "neurokinin antagonist", "Varubi", "rolapitant"],
    category: "Medications",
    tier: "flag",
    summary: "Aprepitant and netupitant are FDA-approved NK1 receptor antagonists. They work by competitively blocking the NK1R, preventing substance P from binding and activating the receptor. Exogenous SP administration while on an NK1 antagonist would directly compete with the antagonist at the receptor — potentially overcoming the antagonist's therapeutic blockade depending on SP concentration. This is direct pharmacological opposition of a prescribed therapeutic. The most common clinical context for NK1 antagonists is CINV prevention during chemotherapy — administering SP during an active chemotherapy cycle would undermine both the antiemetic therapy and potentially worsen nausea.",
    mitigation: [
      "Do not administer substance P in any form while on aprepitant, netupitant, fosaprepitant, or any NK1 receptor antagonist",
      "NK1 antagonists are prescribed for chemotherapy-associated nausea — undermining them during active chemotherapy has serious clinical consequences",
      "Disclose all peptide use to the oncology team managing CINV — any compound affecting NK1R activity is relevant to antiemetic regimen management",
    ],
  },
  {
    id: "pain-medications",
    name: "Opioid analgesics and pain management regimens",
    aliases: ["opioid", "pain medication", "oxycodone", "hydrocodone", "morphine", "fentanyl", "buprenorphine", "tramadol", "codeine", "pain management"],
    category: "Medications",
    tier: "flag",
    summary: "Opioid analgesics work by activating opioid receptors (primarily mu-opioid receptors) in the pain processing circuit, including at the same dorsal horn synapses where SP mediates pain amplification. Opioids and SP have opposing actions at dorsal horn pain circuits: opioids suppress nociceptive transmission while SP amplifies it. Administering SP to a patient on a pain management regimen would pharmacologically oppose the analgesic mechanism — increasing pain signal transmission in a patient who requires pain control. Additionally, in patients with chronic pain requiring opioid therapy, the pre-existing central sensitization makes SP's pro-nociceptive effects particularly harmful.",
    mitigation: [
      "Substance P administration is contraindicated in any patient on chronic pain management — the mechanism directly opposes therapeutic goals",
      "Patients managing chronic pain with any analgesic regimen (opioid, non-opioid, adjuvant) should be counseled that SP administration is mechanistically harmful",
      "Disclose to the pain management team if any SP use has occurred — it could explain unexpected analgesic failure or pain exacerbation",
    ],
  },
  {
    id: "antihistamines",
    name: "Antihistamines — diphenhydramine, cetirizine, loratadine, fexofenadine",
    aliases: ["antihistamine", "diphenhydramine", "Benadryl", "cetirizine", "Zyrtec", "loratadine", "Claritin", "fexofenadine", "Allegra", "H1 blocker"],
    category: "Medications",
    tier: "watch",
    summary: "SP induces mast cell degranulation, releasing histamine as a primary mediator of the neurogenic inflammatory response (flare-and-wheal). Antihistamines (H1 blockers) would partially attenuate the histamine-mediated component of SP's inflammatory effect — but would not block the direct NK1R-mediated effects on nociceptors or the vasodilation component. This interaction is relevant in the context of someone who might theoretically attempt SP injection and then try to treat the resulting inflammation with antihistamines. Antihistamines would be partially but not fully mitigating.",
    mitigation: [
      "Antihistamines do not prevent the pain and direct NK1R-mediated effects of SP injection — they only partially attenuate the histamine component of mast cell degranulation",
      "Using antihistamines to manage SP injection reactions is not an adequate safety strategy — the core pain and neurogenic inflammation from direct NK1R activation is not histamine-mediated",
    ],
  },
  {
    id: "triptans",
    name: "Triptans — sumatriptan, rizatriptan, eletriptan (migraine medications)",
    aliases: ["triptan", "sumatriptan", "Imitrex", "rizatriptan", "Maxalt", "eletriptan", "Relpax", "zolmitriptan", "Zomig", "naratriptan", "Amerge", "migraine medication"],
    category: "Medications",
    tier: "watch",
    summary: "Triptans (5-HT1B/1D receptor agonists) work for migraine in part by reducing CGRP and substance P release from trigeminal C-fibers. SP and triptans are mechanistically linked in migraine pathophysiology — triptans reduce SP release, which reduces neurogenic inflammation in the meningeal vessels. Exogenous SP administration would counteract this aspect of triptan action by providing exogenous SP that bypasses the triptan-mediated presynaptic inhibition. For a migraine patient, SP administration during a triptan-managed episode would be counterproductive.",
    mitigation: [
      "Migraine patients on triptan therapy should not consider SP administration — it directly opposes part of the triptan mechanism (reduction of SP-mediated neurogenic inflammation)",
      "Patients with frequent migraine (including those on preventive therapy) have sensitized trigeminal pain circuits — SP administration would be particularly counterproductive in this context",
    ],
  },
  {
    id: "corticosteroids",
    name: "Corticosteroids — prednisone, methylprednisolone, dexamethasone (anti-inflammatory therapy)",
    aliases: ["corticosteroid", "prednisone", "methylprednisolone", "dexamethasone", "steroid", "hydrocortisone", "prednisolone", "anti-inflammatory steroid"],
    category: "Medications",
    tier: "watch",
    summary: "Corticosteroids are broad anti-inflammatory agents that suppress multiple components of the inflammatory cascade, including mast cell activation and cytokine release. In the context of SP injection (which would induce neurogenic inflammation), corticosteroids would partially attenuate the inflammatory response — but would not block the direct NK1R-mediated pain and vasodilation. Corticosteroids are used alongside NK1 antagonists in CINV regimens (dexamethasone + aprepitant + ondansetron is the standard triplet) — an appropriate combination where corticosteroids complement NK1 antagonism. Combining corticosteroids with SP injection is not a mitigation strategy for the core pain problem.",
    mitigation: [
      "Corticosteroids do not adequately block the pain-promoting mechanism of SP injection",
      "In a CINV context: dexamethasone is appropriate alongside aprepitant (NK1 antagonist) as part of the standard regimen — this is complementary, not related to SP administration",
    ],
  },
  {
    id: "research-context",
    name: "Research-context compounds — capsaicin, CGRP, neurokinin A",
    aliases: ["capsaicin", "CGRP", "calcitonin gene-related peptide", "neurokinin A", "neurokinin B", "tachykinin", "research peptide", "TRPV1"],
    category: "Research Context",
    tier: "low",
    summary: "In a research context only: SP is commonly co-studied with capsaicin (TRPV1 agonist that triggers SP release from C-fibers), CGRP (co-released with SP from C-fibers), and neurokinin A (another tachykinin that activates NK2 receptors). These compounds interact in the pain and neurogenic inflammation circuit. Understanding these interactions is relevant to pain research but has no community therapeutic application. CGRP antagonists (rimegepant, ubrogepant) are FDA-approved for migraine — a related but distinct pharmacological target from the SP/NK1R system.",
    mitigation: [
      "Research context only — no community therapeutic application",
      "CGRP antagonists (migraine medications: rimegepant, ubrogepant, erenumab) are not affected by SP pharmacology in a clinically meaningful way for community users",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function SubstancePInteractionsPanel() {
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
        Substance P&apos;s interaction profile reflects its pharmacological character: a pro-inflammatory pain mediator. NK1 antagonists (aprepitant, netupitant) are direct pharmacological opponents — administering SP while on these medications undermines their therapeutic mechanism. Pain management regimens are also directly opposed by SP&apos;s pro-nociceptive action. Antihistamines and corticosteroids partially attenuate the inflammatory consequence but do not address the core NK1R-mediated pain promotion. There are no beneficial co-use scenarios for community SP injection because there is no beneficial use case for SP injection.
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
