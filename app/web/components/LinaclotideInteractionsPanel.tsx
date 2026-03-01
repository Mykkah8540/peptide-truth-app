"use client";

/**
 * LinaclotideInteractionsPanel — interaction intelligence for linaclotide.
 * Key frame: essentially no pharmacokinetic interactions (not systemically absorbed,
 * no CYP metabolism). Pharmacodynamic interactions are limited to GI motility agents.
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
    id: "laxatives-stimulant",
    name: "Stimulant laxatives (bisacodyl, senna, castor oil)",
    aliases: ["bisacodyl", "Dulcolax", "senna", "Senokot", "Ex-Lax", "castor oil", "stimulant laxative", "contact laxative"],
    category: "GI Motility Agents",
    tier: "watch",
    summary: "Additive pharmacodynamic GI motility effect \u2014 combining linaclotide with stimulant laxatives can produce excessive diarrhea beyond what either drug alone would cause. Stimulant laxatives increase intestinal peristalsis through direct action on intestinal smooth muscle; linaclotide increases luminal fluid via GC-C secretion. The combination produces both more fluid in the lumen and faster transit \u2014 a potentially uncomfortable degree of diarrhea. This is not a pharmacokinetic interaction (linaclotide has no systemic exposure to interact with), but a pharmacodynamic one at the gut level.",
    mitigation: [
      "Taper stimulant laxatives when starting linaclotide \u2014 you likely won\u2019t need both at full doses simultaneously",
      "If linaclotide is adequately controlling bowel habits, stimulant laxatives can typically be discontinued",
      "If a stimulant laxative is needed for breakthrough constipation during linaclotide therapy, use the lowest effective dose",
      "Severe diarrhea from the combination: pause stimulant laxative; if diarrhea persists, consider linaclotide dose interruption",
    ],
  },
  {
    id: "osmotic-laxatives",
    name: "Osmotic laxatives (polyethylene glycol, magnesium hydroxide, lactulose)",
    aliases: ["polyethylene glycol", "PEG", "MiraLax", "GlycoLax", "magnesium hydroxide", "milk of magnesia", "lactulose", "Kristalose", "sorbitol", "osmotic laxative", "Miralax"],
    category: "GI Motility Agents",
    tier: "watch",
    summary: "Additive fluid-drawing effect in the intestinal lumen. Osmotic laxatives draw water into the colon osmotically; linaclotide actively secretes chloride and water via GC-C. Combined use produces more luminal fluid than either alone \u2014 typically manageable but can produce excessive diarrhea if doses of both agents are not adjusted. As linaclotide takes full effect (within 1\u20132 weeks), osmotic laxative doses typically need to be reduced or eliminated.",
    mitigation: [
      "Reduce osmotic laxative dose progressively as linaclotide takes effect over the first 1\u20132 weeks",
      "Using full-dose PEG (17g daily) concurrently with linaclotide: expect significantly looser stools; most patients will not need both at standard doses",
      "If stool consistency becomes too loose on the combination, reduce or eliminate the osmotic laxative before adjusting linaclotide",
      "Magnesium-containing osmotic laxatives: relevant in patients with renal impairment who may retain magnesium; keep this in mind if using with linaclotide in elderly patients with reduced renal function",
    ],
  },
  {
    id: "fiber-supplements",
    name: "Fiber supplements (psyllium, methylcellulose, inulin, FOS)",
    aliases: ["psyllium", "Metamucil", "methylcellulose", "Citrucel", "inulin", "FOS", "fructooligosaccharides", "fiber supplement", "soluble fiber", "bulk-forming laxative"],
    category: "GI Motility Agents",
    tier: "low",
    summary: "Fiber supplements add bulk and water-holding capacity to stool, complementing linaclotide\u2019s luminal fluid secretion. The combination is generally well-tolerated and additive in a positive sense \u2014 fiber provides bulk and consistency, linaclotide provides active fluid secretion. However, very high fiber doses combined with linaclotide can produce excessive gas, bloating, and loose stools in patients with IBS-C who are sensitive to fermentable fibers.",
    mitigation: [
      "Low-to-moderate fiber supplementation (5\u201310g/day psyllium or equivalent) is compatible with and complementary to linaclotide",
      "In IBS-C patients sensitive to fermentable fibers: avoid high doses of inulin, FOS, or other highly fermentable fibers that can worsen bloating and gas",
      "If starting both linaclotide and a fiber supplement simultaneously, begin one at a time to identify the source of any GI side effects",
    ],
  },
  {
    id: "antidiarrheal-agents",
    name: "Antidiarrheal agents (loperamide, bismuth subsalicylate)",
    aliases: ["loperamide", "Imodium", "bismuth subsalicylate", "Pepto-Bismol", "kaolin-pectin", "antidiarrheal"],
    category: "GI Motility Agents",
    tier: "low",
    summary: "Pharmacodynamically opposed to linaclotide \u2014 antidiarrheal agents reduce GI motility and fluid secretion while linaclotide increases fluid secretion and accelerates transit. Concurrent use blunts linaclotide\u2019s intended effect. For most patients on linaclotide, regular antidiarrheal use is counterproductive and self-defeating. However, antidiarrheal agents may be useful transiently if linaclotide-induced diarrhea is excessive before the decision to interrupt the dose.",
    mitigation: [
      "Avoid routine use of loperamide or other antidiarrheal agents while on linaclotide \u2014 they counteract the drug\u2019s intended GI effect",
      "Transient loperamide use for excessive linaclotide-induced diarrhea: reasonable as a short-term measure while deciding whether to interrupt or continue the drug",
      "If antidiarrheal agents are frequently needed to tolerate linaclotide, this suggests the dose is producing more secretion than is comfortable \u2014 discuss whether linaclotide is the right agent for your symptom pattern with your gastroenterologist",
    ],
  },
  {
    id: "nsaids-aspirin",
    name: "NSAIDs and aspirin",
    aliases: ["NSAID", "ibuprofen", "Advil", "naproxen", "Aleve", "aspirin", "aspirin", "diclofenac", "celecoxib", "anti-inflammatory", "cox-2 inhibitor"],
    category: "Anti-inflammatory / Analgesics",
    tier: "low",
    summary: "No pharmacokinetic interaction with linaclotide (which is not systemically absorbed). NSAIDs can cause GI mucosal irritation and may worsen GI symptoms in patients with IBS-C or CIC, but this is an independent NSAID GI effect, not an interaction with linaclotide\u2019s mechanism. In IBS patients, NSAIDs may worsen abdominal symptoms through their GI mucosal effects; this is worth noting but is not a linaclotide-specific interaction.",
    mitigation: [
      "No specific pharmacokinetic interaction between linaclotide and NSAIDs",
      "In IBS-C patients: NSAIDs can independently worsen GI symptoms and abdominal discomfort through prostaglandin inhibition and mucosal effects; acetaminophen is preferred for pain management in IBS patients when possible",
      "Concurrent PPI use reduces NSAID GI mucosal effects if NSAIDs cannot be avoided",
    ],
  },
  {
    id: "standard-medications",
    name: "Standard systemic medications (cardiovascular, psychiatric, hormonal drugs)",
    aliases: ["metformin", "metoprolol", "lisinopril", "atorvastatin", "sertraline", "SSRIs", "oral contraceptives", "levothyroxine", "antihypertensive", "antidepressant"],
    category: "Systemic Medications",
    tier: "low",
    summary: "No pharmacokinetic interactions between linaclotide and any systemically absorbed medication. Linaclotide never enters the systemic circulation at measurable concentrations, does not inhibit or induce CYP450 enzymes, does not affect protein binding, and is not renally or hepatically cleared as an active drug. The interaction database for linaclotide with systemic drugs is essentially empty by pharmacological necessity \u2014 there is no systemic exposure to create an interaction.",
    mitigation: [
      "No drug interaction screening is required for linaclotide against systemic medications",
      "Continue all systemic medications at their established doses when starting linaclotide \u2014 no adjustments are expected",
      "The only practical consideration: GI transit changes from linaclotide may theoretically alter absorption timing of medications that rely on small intestinal absorption \u2014 this is not clinically significant for most drugs, but patients taking narrow-therapeutic-index drugs with food-timing requirements (levothyroxine, etc.) should maintain consistent timing relative to meals",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function LinaclotideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return e.name.toLowerCase().includes(q) || e.aliases.some((a) => a.toLowerCase().includes(q)) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Linaclotide has the simplest interaction profile of any drug on this site. It is not systemically absorbed, has no CYP450 metabolism, and produces no systemic pharmacology. The only interactions worth knowing about are pharmacodynamic GI motility interactions: concurrent laxatives or stool softeners may produce additive diarrhea, and antidiarrheal agents pharmacologically oppose linaclotide\u2019s intended effect. Systemic drugs of all classes can be used without any pharmacokinetic concern specific to linaclotide.
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
              <div key={entry.id} className="reta-interactions__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span className="reta-interactions__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</span>
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
