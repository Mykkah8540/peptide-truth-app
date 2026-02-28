"use client";

/**
 * CalcitoninInteractionsPanel — interaction intelligence for Calcitonin.
 * Key frame: bisphosphonate concurrent use is usually not clinically combined (both
 * anti-resorptive); lithium levels can be affected by calcitonin's renal calcium effects;
 * cardiac glycoside toxicity is potentiated by calcitonin-induced hypocalcemia.
 * Calcium and vitamin D are standard co-supplementation.
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
    id: "cardiac-glycosides",
    name: "Cardiac glycosides — digoxin (Lanoxin)",
    aliases: ["digoxin", "Lanoxin", "digitalis", "cardiac glycoside", "digitoxin"],
    category: "Medications",
    tier: "watch",
    summary: "Calcitonin lowers serum calcium, and hypocalcemia increases cardiac glycoside (digoxin) toxicity. The mechanism: digoxin's cardiac effects depend on calcium handling in cardiomyocytes — hypocalcemia alters the calcium-dependent Na+/K+ ATPase inhibition in a way that potentiates digoxin's narrow therapeutic window effects. Clinically significant hypocalcemia from calcitonin could shift digoxin from therapeutic to toxic range. This interaction is most relevant in acute hypercalcemia management where rapid calcium lowering from IV calcitonin could transiently cause hypocalcemia in a patient with pre-existing digitalis use.",
    mitigation: [
      "Monitor serum calcium and digoxin levels if calcitonin is being used in a patient on digoxin",
      "In acute hypercalcemia management: check for digoxin use before initiating IV calcitonin; monitor cardiac rhythm during calcium reduction",
      "Avoid over-aggressive calcium lowering — the goal in hypercalcemia is to bring calcium to near-normal range, not to cause hypocalcemia",
      "If digoxin toxicity symptoms emerge (bradycardia, visual changes, nausea) during calcitonin treatment: check serum calcium and digoxin level simultaneously",
    ],
  },
  {
    id: "bisphosphonates-concurrent",
    name: "Bisphosphonates — zoledronic acid, alendronate, risedronate (concurrent anti-resorptive therapy)",
    aliases: ["bisphosphonate", "zoledronic acid", "Zometa", "alendronate", "Fosamax", "risedronate", "Actonel", "ibandronate", "Boniva", "pamidronate", "Aredia"],
    category: "Medications",
    tier: "watch",
    summary: "Calcitonin and bisphosphonates are both anti-resorptive agents targeting osteoclast activity. In clinical practice, they are rarely prescribed simultaneously because bisphosphonates are substantially more potent anti-resorptives with more durable effects. In acute hypercalcemia management, calcitonin and bisphosphonates are used sequentially (calcitonin for rapid initial effect; bisphosphonate for sustained control) — this sequential combination is appropriate and standard. Concurrent chronic use for osteoporosis or Paget's would represent redundant anti-resorptive therapy without additive benefit evidence.",
    mitigation: [
      "Sequential use in acute hypercalcemia (calcitonin first for rapid effect, bisphosphonate added for sustained control) is standard — this is not a harmful interaction but a planned therapeutic sequence",
      "Chronic concurrent use of calcitonin and bisphosphonates for osteoporosis or Paget's is not clinically supported — if bisphosphonates are used, calcitonin is typically not added",
      "Monitor calcium during the combination use in hypercalcemia to avoid overcorrection to hypocalcemia",
    ],
  },
  {
    id: "lithium",
    name: "Lithium — mood stabilizer affected by renal cation handling",
    aliases: ["lithium", "Lithobid", "Eskalith", "lithium carbonate", "mood stabilizer", "bipolar medication"],
    category: "Medications",
    tier: "watch",
    summary: "Calcitonin affects renal calcium and (at high pharmacological doses) sodium handling through its renal tubular effects. Lithium is renally cleared and its serum levels are sensitive to renal tubular function and cation handling — sodium depletion increases lithium reabsorption (raising levels); sodium loading reduces lithium levels. The interaction with calcitonin is indirect and mechanism-based rather than directly pharmacokinetically characterized, but the clinical principle — that any compound affecting renal tubular cation handling can shift lithium levels — applies. The concern is greatest during acute parenteral calcitonin use.",
    mitigation: [
      "Lithium level check within 1 week of starting injectable calcitonin therapy",
      "Alert the prescribing psychiatrist when calcitonin is being initiated in a patient on lithium",
      "Monitor for signs of lithium toxicity (tremor, cognitive slowing, GI symptoms) during calcitonin treatment",
    ],
  },
  {
    id: "denosumab-concurrent",
    name: "Denosumab (Prolia, Xgeva) — concurrent RANK-L inhibitor anti-resorptive",
    aliases: ["denosumab", "Prolia", "Xgeva", "RANK-L", "RANKL inhibitor"],
    category: "Medications",
    tier: "watch",
    summary: "Denosumab and calcitonin are both anti-resorptive agents. Denosumab (RANK-L inhibitor) is substantially more potent and durable than calcitonin as an anti-resorptive. Concurrent use for osteoporosis or Paget's disease is not standard and would represent redundant anti-resorptive therapy. In acute hypercalcemia management, denosumab has shown utility alongside or instead of bisphosphonates — calcitonin's role in that setting is for rapid initial calcium lowering while either bisphosphonate or denosumab provides sustained control.",
    mitigation: [
      "Concurrent chronic denosumab + calcitonin for osteoporosis is not clinically supported — if denosumab is being used, calcitonin is not typically added",
      "In acute hypercalcemia: calcitonin for immediate calcium lowering, denosumab (if bisphosphonate resistant) for sustained control — sequential use is appropriate",
    ],
  },
  {
    id: "calcium-vitamin-d",
    name: "Calcium and Vitamin D — standard co-supplementation with any anti-resorptive",
    aliases: ["calcium", "vitamin D", "calcium carbonate", "calcium citrate", "cholecalciferol", "D3", "calcitriol"],
    category: "Supplements",
    tier: "low",
    summary: "Calcium and vitamin D supplementation is standard co-management with any anti-resorptive therapy including calcitonin. Adequate calcium and vitamin D are required for bone health and to prevent secondary hyperparathyroidism (which occurs when calcium intake is insufficient and PTH rises to mobilize bone calcium). This is not an adverse interaction — it is standard supportive care. Monitoring serum calcium during calcitonin treatment ensures supplementation does not combine with calcitonin calcium-lowering effects to cause hypocalcemia.",
    mitigation: [
      "Calcium 1200 mg/day (diet + supplement total) and vitamin D 800-1000 IU/day are standard with calcitonin treatment",
      "Monitor serum calcium 2-4 weeks after starting to confirm calcium is remaining in normal range with combined supplementation",
      "No adverse interaction — this is standard bone management co-supplementation",
    ],
  },
  {
    id: "antacids-calcium",
    name: "Calcium-containing antacids (Tums, Rolaids) — incidental calcium supplementation",
    aliases: ["Tums", "Rolaids", "calcium carbonate antacid", "antacid"],
    category: "Supplements",
    tier: "low",
    summary: "Calcium-containing antacids provide supplemental calcium that can partially counteract calcitonin's calcium-lowering effect — in most clinical contexts, this is a minor beneficial effect (supporting serum calcium during anti-resorptive treatment). Not an adverse interaction. Simply factor in calcium antacid intake when assessing total daily calcium intake.",
    mitigation: [
      "No adverse interaction between calcitonin and calcium antacids",
      "Count calcium antacid intake as part of total daily calcium when assessing supplementation needs during calcitonin treatment",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function CalcitoninInteractionsPanel() {
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
        Calcitonin&apos;s interaction profile is relatively straightforward: the most important clinical interaction is with cardiac glycosides (digoxin) through hypocalcemia-potentiated toxicity. Bisphosphonates and denosumab are not combined chronically with calcitonin (redundant anti-resorptive therapy) but are used sequentially in acute hypercalcemia. Lithium requires monitoring due to renal tubular cation handling effects. Calcium and vitamin D are standard co-supplementation. Most medications have no meaningful interaction with calcitonin.
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
