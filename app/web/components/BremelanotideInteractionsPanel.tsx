/**
 * BremelanotideInteractionsPanel — interaction intelligence for Bremelanotide.
 * Key interactions from prescribing information:
 * - Antihypertensives: BP elevation from bremelanotide vs BP-lowering medications — complex
 * - Naltrexone: pharmacokinetic interaction documented in prescribing information
 * - Alcohol: CNS depressant concern + BP interaction
 * - Serotonergic drugs: theoretical (melanocortin system interfaces with serotonin signaling)
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── FLAGS ──
  {
    name: "Antihypertensive medications (beta-blockers, ACE inhibitors, ARBs, calcium channel blockers, diuretics)",
    tier: "flag",
    detail: "Blood pressure-lowering medications — interacts with bremelanotide's transient BP elevation mechanism",
    why: "Bremelanotide produces a documented transient BP elevation (peaking ~30 min post-injection). People on antihypertensive medications have managed blood pressure dynamics that can interact complexly with this acute elevation. Additionally, if BP drops when the bremelanotide effect resolves in someone whose BP is already pharmacologically managed, orthostatic hypotension is a real concern. The prescribing information flags cardiovascular medications in the context of the BP effect.",
    action: "Discuss with your prescribing physician before combining. Do not add bremelanotide to antihypertensive therapy without physician guidance. Monitor blood pressure response on first use.",
  },
  {
    name: "Naltrexone (opioid antagonist / alcohol use disorder treatment)",
    tier: "flag",
    detail: "Pharmacokinetic drug interaction documented in prescribing information",
    why: "The bremelanotide prescribing information documents a pharmacokinetic interaction with naltrexone — bremelanotide can affect the absorption and Cmax of naltrexone. This is a documented interaction with quantified pharmacokinetic effects, not a theoretical concern. People on naltrexone for alcohol use disorder or as part of LDN therapy need to be aware of this interaction.",
    action: "Do not combine without physician guidance. The pharmacokinetic interaction affects naltrexone levels — discuss with your prescribing physician.",
  },

  // ── WATCHES ──
  {
    name: "Serotonergic medications (SSRIs, SNRIs, triptans, lithium, tramadol)",
    tier: "watch",
    detail: "Serotonin-active medications — melanocortin system interfaces with serotonin signaling",
    why: "The melanocortin system in the hypothalamus interacts with serotonergic signaling pathways. Bremelanotide is not a serotonergic drug in the direct sense — it doesn't act on 5-HT receptors. However, melanocortin and serotonin pathways modulate overlapping behavioral circuits (appetite, motivation, sexual behavior). The interaction is theoretical at low serotonin burden but becomes a more meaningful consideration with multiple serotonergic drugs or at doses where serotonin syndrome risk exists.",
    action: "Not an absolute contraindication. If on SSRIs or SNRIs: note the mechanistic intersection; report any unusual effects. Multiple serotonergic drugs simultaneously: discuss with physician.",
  },
  {
    name: "Alcohol",
    tier: "watch",
    detail: "CNS depressant — sexual behavior and motivation interplay, plus cardiovascular consideration",
    why: "Alcohol use in the context of bremelanotide use is a multifactorial concern: alcohol has CNS depressant effects that can interact with bremelanotide's CNS mechanism; alcohol causes vasodilation and can worsen nausea; and alcohol is commonly consumed in sexual contexts, meaning the co-use pattern is realistic. The BP elevation from bremelanotide combined with alcohol's vasodilation creates an unpredictable cardiovascular dynamic.",
    action: "Moderate alcohol use: be aware of nausea compounding and cardiovascular dynamics. Heavy alcohol use in the context of bremelanotide use: not recommended. If on naltrexone for alcohol use disorder: the naltrexone pharmacokinetic interaction is the primary concern.",
  },
  {
    name: "Nitrates (nitroglycerin, isosorbide)",
    tier: "watch",
    detail: "Vasodilating cardiovascular medications — potentially complex BP dynamics with bremelanotide's BP elevation",
    why: "Nitrates cause significant vasodilation and BP reduction — this is the opposite of bremelanotide's transient BP elevation. The combination creates unpredictable cardiovascular dynamics. Anyone on nitrates for cardiac disease has a cardiovascular history that makes bremelanotide's use more complicated than the prescribing information's general population allows.",
    action: "If on nitrates: the underlying cardiovascular indication is likely a contraindication to bremelanotide use independently. Discuss with your cardiologist.",
  },
  {
    name: "PDE5 inhibitors (sildenafil, tadalafil, vardenafil)",
    tier: "watch",
    detail: "Co-use for sexual function — different mechanism, potential BP interaction",
    why: "PDE5 inhibitors cause vasodilation and BP reduction. Bremelanotide causes transient BP elevation. The mechanisms are opposite and the context of use (sexual activity) often leads to co-use. The combination has cardiovascular dynamics that need to be considered — particularly for anyone using PDE5 inhibitors for actual erectile dysfunction with any cardiovascular comorbidity.",
    action: "The mechanisms target different sexual function problems (desire vs blood flow). Co-use has cardiovascular dynamics worth being aware of — the BP effects can partially offset each other, but in the context of sexual exertion, this isn't necessarily predictable. Discuss with physician if on PDE5 inhibitors for actual erectile dysfunction management.",
  },

  // ── LOWS ──
  {
    name: "BPC-157 or TB-500",
    tier: "low",
    detail: "Recovery peptides — different mechanisms",
    why: "Different mechanism. No known pharmacological interaction with melanocortin system.",
    action: "No specific concern. Verify each compound independently.",
  },
  {
    name: "GH-axis compounds (CJC-1295, ipamorelin, etc.)",
    tier: "low",
    detail: "GH secretagogues — different mechanism from melanocortin system",
    why: "No known pharmacological interaction between GH-axis compounds and the melanocortin system. Both GH and MC4R circuits operate in the hypothalamus but through different signaling pathways.",
    action: "No specific interaction concern. GH-axis safety gates apply to those compounds independently.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy pathway — different mechanism",
    why: "No known interaction with melanocortin receptor system.",
    action: "No concern.",
  },
];

const TIER_CONFIG: Record<Tier, { label: string; labelColor: string; border: string; bg: string; dot: string }> = {
  flag:  { label: "Flag",         labelColor: "#9e3800", border: "rgba(158,56,0,0.22)",  bg: "rgba(158,56,0,0.06)",  dot: "#9e3800" },
  watch: { label: "Watch",        labelColor: "#7c5200", border: "rgba(124,82,0,0.18)",  bg: "rgba(124,82,0,0.05)",  dot: "#7c5200" },
  low:   { label: "Low concern",  labelColor: "#155e38", border: "rgba(21,100,58,0.15)", bg: "rgba(21,100,58,0.04)", dot: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags — stop and consult before combining",
  watch: "Worth watching — monitor and use judgment",
  low:   "Low concern — proceed with standard awareness",
};

export default function BremelanotideInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Bremelanotide&apos;s interaction profile centers on its cardiovascular effect (transient BP elevation) and a documented pharmacokinetic interaction with naltrexone. The prescribing information is the primary source — it specifically flags antihypertensive medications and cardiovascular disease as contraindication contexts. The serotonergic and PDE5 inhibitor interactions are worth monitoring in real-world co-use patterns.
      </div>

      {TIER_ORDER.map((tier) => {
        const entries = ENTRIES.filter((e) => e.tier === tier);
        const cfg = TIER_CONFIG[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        Bremelanotide&apos;s most important interaction context is cardiovascular: antihypertensive medications and any cardiac history make the BP elevation more consequential. The naltrexone pharmacokinetic interaction is a documented prescribing-information finding — not theoretical. For most people without cardiovascular disease or naltrexone use, the interaction profile is relatively clean compared to GH-axis or metabolic compounds.
      </div>

    </div>
  );
}
