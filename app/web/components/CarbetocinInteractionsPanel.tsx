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
    id: "other-uterotonics",
    name: "Other uterotonic agents",
    aliases: ["misoprostol", "methylergonovine", "ergometrine", "oxytocin", "dinoprostone", "Cytotec", "Methergine"],
    category: "Obstetric",
    tier: "watch",
    summary:
      "Carbetocin is itself a uterotonic. Combining it with other uterotonic agents \u2014 misoprostol " +
      "(a prostaglandin), methylergonovine (an ergot alkaloid), or supplemental oxytocin \u2014 produces " +
      "additive or synergistic uterotonic effects. PPH treatment protocols sometimes use sequential or " +
      "combination uterotonic therapy when first-line agents fail, but combinations require careful " +
      "monitoring for uterine hyperstimulation, maternal hypotension, and ergot-related vasoconstriction.",
    mitigation: [
      "Combination uterotonic therapy for refractory PPH should be directed by the obstetric team",
      "Methylergonovine is contraindicated in hypertension; monitor BP when adding ergot agents",
      "Misoprostol combined with carbetocin may increase GI side effects (nausea, vomiting, diarrhea)",
      "Document the sequence and doses of all uterotonics used for accurate hemorrhage management",
    ],
  },
  {
    id: "vasodilators-antihypertensives",
    name: "Vasodilators and antihypertensives",
    aliases: ["nifedipine", "labetalol", "hydralazine", "magnesium sulfate", "methyldopa"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "Women with preeclampsia or gestational hypertension often receive antihypertensive therapy " +
      "at the time of cesarean delivery. Carbetocin\u2019s vasodilatory effect (via OTR on vascular " +
      "smooth muscle) combined with antihypertensive agents can produce additive hypotension. " +
      "Magnesium sulfate used for eclampsia prophylaxis has mild vasodilatory and tocolytic properties " +
      "that may also interact.",
    mitigation: [
      "Monitor BP closely after carbetocin administration in patients on antihypertensive therapy",
      "Magnesium sulfate\u2019s tocolytic effect may slightly attenuate carbetocin\u2019s uterotonic " +
      "response \u2014 ensure uterine tone is confirmed clinically",
      "Hypotension in the context of preeclampsia and carbetocin requires rapid fluid resuscitation " +
      "or vasopressor support if hemodynamically significant",
    ],
  },
  {
    id: "standard-obstetric",
    name: "Standard obstetric medications",
    aliases: ["ondansetron", "dexamethasone", "oxytocin infusion", "neuraxial anesthesia", "ephedrine", "phenylephrine"],
    category: "Obstetric",
    tier: "low",
    summary:
      "Standard medications used in cesarean delivery \u2014 antiemetics (ondansetron), prophylactic " +
      "corticosteroids, neuraxial anesthetic agents, and vasopressors used to manage spinal " +
      "hypotension (phenylephrine, ephedrine) \u2014 do not have clinically significant pharmacokinetic " +
      "interactions with carbetocin. Vasopressors used after spinal anesthesia may partially " +
      "counteract carbetocin\u2019s hemodynamic effects, which is generally favorable.",
    mitigation: [
      "No dose adjustment needed for carbetocin with standard co-administered obstetric medications",
      "Vasopressor use for spinal hypotension may mitigate carbetocin\u2019s vasodilatory effects \u2014 " +
      "this is clinically beneficial in the intraoperative setting",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function CarbetocinInteractionsPanel() {
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
      <div className="reta-interactions__context">
        Carbetocin interactions are limited to the obstetric intraoperative setting. All clinically
        relevant interactions involve agents co-administered during cesarean delivery. No community-use
        interaction context exists.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound\u2026"
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
