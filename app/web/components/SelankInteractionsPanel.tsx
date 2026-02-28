/**
 * SelankInteractionsPanel — interaction intelligence for Selank.
 * Primary concerns: CNS depressant class (benzos, opioids, alcohol) via additive mechanism.
 * Psychiatric medications: less characterized but worth flagging.
 * Most other interactions: low concern — selank's mechanism is relatively specific.
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
    name: "Benzodiazepines (diazepam, alprazolam, lorazepam, clonazepam)",
    tier: "flag",
    detail: "Direct GABA-A agonists — additive to selank's GABAergic modulation",
    why: "Benzodiazepines are direct positive allosteric modulators of GABA-A receptors, producing strong sedation and CNS depression. Selank modulates GABAergic signaling via a different pathway. The combination creates additive CNS inhibitory tone — the combined effect is stronger than either alone and less predictable. The sedation risk from combined use is real: the 'no sedation' profile of selank alone does not hold in combination with benzodiazepines.",
    action: "Do not combine without physician guidance. If on benzodiazepines for an anxiety disorder or sleep condition: selank is not a safe add-on without discussing the interaction and your medication plan with your prescribing physician.",
  },
  {
    name: "Opioid medications (oxycodone, hydrocodone, morphine, fentanyl, tramadol, buprenorphine)",
    tier: "flag",
    detail: "Mu-opioid receptor agonists — additive to selank's enkephalinase inhibition (raised endogenous enkephalins)",
    why: "Selank inhibits enkephalinase, raising endogenous enkephalin levels in the CNS. Enkephalins act on mu and delta opioid receptors — the same receptors that prescription opioids act on. Adding a compound that raises endogenous opioid peptide tone to an exogenous opioid creates additive opioid system loading: more combined effect than either alone, with unpredictable respiratory and CNS depression risk. This interaction is mechanism-based and real.",
    action: "Do not combine without physician guidance. If on opioid medications: discuss with your prescribing physician before adding selank. This is not a theoretical concern — the mechanism is direct.",
  },
  {
    name: "Alcohol (regular or heavy use)",
    tier: "flag",
    detail: "CNS depressant — additive GABAergic depression with selank's modulatory effect",
    why: "Alcohol has GABAergic CNS depressant effects (potentiates GABA-A) and is commonly used socially. Combining alcohol with selank adds two compounds working on overlapping CNS inhibitory pathways. The combined sedation and coordination impairment may exceed what either produces alone. Heavy alcohol use creates persistent GABAergic system burden that interacts with selank's ongoing modulatory effect.",
    action: "Avoid co-use or heavy alcohol use during selank use. Occasional moderate alcohol use carries lower risk than heavy or regular use — but the CNS depressant combination should not be treated as routine.",
  },

  // ── WATCHES ──
  {
    name: "SSRIs and SNRIs (sertraline, fluoxetine, escitalopram, venlafaxine, duloxetine)",
    tier: "watch",
    detail: "Serotonin-active medications — selank has documented serotonergic effects",
    why: "Selank has documented effects on serotonin metabolism in animal models and some human pharmacology research. SSRIs and SNRIs act on the serotonin system — combining compounds with overlapping serotonergic effects requires attention, particularly as serotonin syndrome risk increases when multiple serotonergic drugs are combined. At therapeutic SSRI/SNRI doses and community selank doses, severe serotonin syndrome is unlikely — but the mechanistic interaction is real and worth tracking.",
    action: "If on SSRIs or SNRIs for depression or anxiety: note the serotonergic interaction; observe for any unusual effects (agitation, tremor, diaphoresis). The combination is not an absolute contraindication but warrants awareness and physician communication.",
  },
  {
    name: "Antipsychotics (risperidone, haloperidol, quetiapine, olanzapine)",
    tier: "watch",
    detail: "CNS-active psychiatric medications — selank's neuropsychiatric interaction profile is incompletely characterized",
    why: "Antipsychotics interact with dopamine, serotonin, and GABAergic systems — multiple mechanistic intersections with selank's pharmacology. The interaction profile in this combination is not characterized in available literature. People on antipsychotics have neuropsychiatric conditions where adding CNS-active compounds without physician guidance creates meaningful risk.",
    action: "Do not add selank to antipsychotic therapy without discussing with your psychiatrist. The interaction profile is insufficiently characterized to assess risk independently.",
  },
  {
    name: "Semax (ACTH fragment peptide)",
    tier: "watch",
    detail: "Common co-use — stimulatory peptide combined with selank's anxiolytic; balancing CNS effects",
    why: "Selank + Semax is a commonly used combination in Russian research communities and biohacking circles. The rationale: Semax is more stimulatory (BDNF, dopamine, serotonin activation) while selank is anxiolytic. They're often described as complementary — cognitive activation balanced by anxiolytic tone. This combination is not a pharmacological danger in the way benzos + selank would be. The watch rating reflects that combining two CNS-active compounds without full characterization of the combined effect warrants attention, not that the combination is contraindicated.",
    action: "The combination is commonly reported as well-tolerated. Observe the effects of each independently before combining. If on any other CNS medications, the interaction complexity increases.",
  },
  {
    name: "Z-drugs and sleep medications (zolpidem, eszopiclone, zaleplon)",
    tier: "watch",
    detail: "GABA-A modulating sleep medications — additive CNS depression risk",
    why: "Z-drugs work via GABA-A modulation (like benzodiazepines, though with more specificity to the ω1 receptor subunit). The additive GABAergic concern from combining with selank applies similarly to benzodiazepines. The sedation risk when combining is real. This is the same class-level concern as benzodiazepines, at potentially lower severity due to Z-drug receptor specificity.",
    action: "If on sleep medications: discuss with your physician before adding selank. Avoid combining selank with Z-drugs close to bedtime.",
  },

  // ── LOWS ──
  {
    name: "BPC-157 or TB-500",
    tier: "low",
    detail: "Recovery peptides — tissue repair mechanism, different from selank's CNS pathways",
    why: "Different mechanism. No known pharmacological interaction with selank's GABAergic or enkephalin pathways.",
    action: "No specific concern. Verify each compound independently.",
  },
  {
    name: "GH-axis compounds (CJC-1295, ipamorelin, etc.)",
    tier: "low",
    detail: "GH secretagogues — GH-axis mechanism independent of CNS GABAergic/enkephalin pathways",
    why: "No documented pharmacological interaction between GH-axis compounds and selank's mechanism.",
    action: "No specific interaction concern. GH-axis safety gates apply independently.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy pathway — different mechanism",
    why: "No known interaction with selank's CNS mechanism.",
    action: "No concern.",
  },
  {
    name: "Creatine",
    tier: "low",
    detail: "Ergogenic — ATP regeneration",
    why: "No interaction with CNS mechanism.",
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

export default function SelankInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Selank&apos;s interaction profile is driven by its CNS mechanism: GABAergic modulation and enkephalinase inhibition (raising endogenous enkephalins) create real additive risks with benzodiazepines, opioids, and alcohol. These are the flags — they&apos;re mechanism-based, not theoretical. Serotonergic medications (SSRIs/SNRIs) and psychiatric medications are watches due to overlapping neurochemical mechanisms. Selank alone in a person without CNS-active medications has a clean interaction profile.
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
        The Selank + Semax combination (a watch, not a flag) is the most commonly discussed co-use pattern in community protocols — the anxiolytic and cognitive enhancement profiles are described as complementary. This is a watch because both are CNS-active, not because the combination is inherently problematic. The flags are the standard CNS depressant class: benzos, opioids, alcohol. Those aren&apos;t negotiable without physician guidance.
      </div>

    </div>
  );
}
