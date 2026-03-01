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
    id: "triptans",
    name: "Triptans",
    aliases: [
      "sumatriptan", "rizatriptan", "eletriptan", "zolmitriptan", "naratriptan",
      "almotriptan", "frovatriptan", "Imitrex", "Maxalt", "Relpax",
    ],
    category: "Migraine",
    tier: "watch",
    summary:
      "Triptans (5-HT1B/1D agonists) and CGRP-targeted drugs work via distinct mechanisms. CGRP " +
      "mAbs are preventive and have no pharmacokinetic interaction with triptans used acutely \u2014 " +
      "they can be co-prescribed safely. Gepants used acutely (rimegepant, ubrogepant) can also be " +
      "used alongside triptans, though combining two acute migraine drugs in the same attack has " +
      "limited study. The key concern is pharmacodynamic: both triptans and gepants target the " +
      "trigeminal pathway, and combinations have not been fully studied for all agents. " +
      "Cardiovascular patients who are triptan-contraindicated can switch to gepants, which lack " +
      "the vasoconstrictive mechanism of triptans.",
    mitigation: [
      "CGRP mAbs (preventive) + triptans (acute) is a well-accepted, guideline-supported combination",
      "Do not combine two acute migraine drugs (e.g., gepant + triptan) in the same attack without " +
      "prescriber guidance \u2014 evidence for this combination is limited",
      "Gepants are a triptan alternative for patients with cardiovascular contraindications; do not " +
      "substitute gepants for triptans without discussing with your neurologist",
    ],
  },
  {
    id: "ergotamine",
    name: "Ergotamine and dihydroergotamine (DHE)",
    aliases: ["ergotamine", "dihydroergotamine", "DHE", "Cafergot", "Migranal", "Trudhesa"],
    category: "Migraine",
    tier: "watch",
    summary:
      "Ergot alkaloids cause vasoconstriction via 5-HT and alpha-adrenergic receptor agonism. " +
      "Combining ergotamine or DHE with gepants raises a theoretical concern about additive or " +
      "opposing vascular effects. Gepants block CGRP-mediated vasodilation, while ergots cause " +
      "vasoconstriction \u2014 the combination is not well studied. CGRP mAbs (used monthly or " +
      "quarterly) are unlikely to have acute pharmacokinetic interactions with ergots, but the " +
      "theoretical cardiovascular risk of prolonged CGRP blockade in the context of ergot " +
      "vasoconstriction warrants caution.",
    mitigation: [
      "Avoid combining gepants with ergotamine or DHE in the same acute migraine attack without " +
      "prescriber guidance",
      "Patients using DHE for refractory migraine who are also on CGRP mAbs should discuss this " +
      "combination with their neurologist given the theoretical cardiovascular interaction",
      "Ergotamine is not recommended for frequent migraine use due to medication-overuse headache risk; " +
      "gepants are a safer long-term acute option",
    ],
  },
  {
    id: "co-preventives",
    name: "Co-preventive migraine medications",
    aliases: [
      "propranolol", "metoprolol", "topiramate", "valproate", "amitriptyline",
      "venlafaxine", "candesartan", "Topamax", "Depakote",
    ],
    category: "Migraine",
    tier: "low",
    summary:
      "Beta-blockers (propranolol, metoprolol), antiepileptics (topiramate, valproate), tricyclic " +
      "antidepressants (amitriptyline), and antihypertensives (candesartan) are commonly used " +
      "alongside CGRP mAbs or gepants as combination preventive therapy. There are no established " +
      "pharmacokinetic interactions between CGRP mAbs (which are large-molecule biologics cleared " +
      "by catabolism, not CYP450 hepatic metabolism) and these small-molecule co-preventives. " +
      "Combination is guideline-supported for patients who have partial response to a single agent.",
    mitigation: [
      "No dose adjustment needed for CGRP mAbs when co-prescribed with standard preventive medications",
      "Gepants are metabolized via CYP3A4; strong CYP3A4 inhibitors (certain azole antifungals, " +
      "some antiretrovirals) or inducers (rifampin, carbamazepine) may affect gepant exposure \u2014 " +
      "check prescribing information for the specific gepant",
      "Carbamazepine (a CYP3A4 inducer used for trigeminal neuralgia and seizures) may reduce " +
      "gepant plasma levels; monitor for reduced efficacy",
    ],
  },
  {
    id: "supplements",
    name: "Standard supplements",
    aliases: ["magnesium", "riboflavin", "vitamin B2", "CoQ10", "melatonin", "feverfew"],
    category: "Supplements",
    tier: "low",
    summary:
      "Evidence-based migraine supplements \u2014 magnesium (400\u2013600 mg/day), riboflavin " +
      "(vitamin B2, 400 mg/day), and CoQ10 \u2014 have no pharmacokinetic interactions with CGRP " +
      "mAbs or gepants. These supplements work via mitochondrial and ion channel mechanisms " +
      "orthogonal to the CGRP pathway. They can be safely combined with CGRP-targeted therapies " +
      "and are sometimes added when partial response to CGRP drugs is seen.",
    mitigation: [
      "Magnesium, riboflavin, and CoQ10 can be safely combined with CGRP mAbs or gepants",
      "No dose adjustment needed for either the supplement or the CGRP-targeted drug",
      "Feverfew has weak evidence for migraine prevention and no known interaction with CGRP drugs",
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

export default function CgrpInteractionsPanel() {
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
        Interactions here cover CGRP-targeted drugs \u2014 both monoclonal antibodies and gepants \u2014
        and how they interact with other migraine treatments and commonly co-prescribed medications.
        Exogenous CGRP itself has no interaction profile relevant to clinical use.
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
