/**
 * SemaxInteractionsPanel — interaction intelligence for Semax.
 * Primary concerns: psychiatric medications (dopamine/serotonin pathways),
 * MAOIs (significant serotonergic interaction), stimulants (additive dopaminergic).
 * Selank co-use: watch (common; not a pharmacological danger but both are CNS-active).
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
    name: "MAOIs (phenelzine, tranylcypromine, selegiline, linezolid)",
    tier: "flag",
    detail: "Monoamine oxidase inhibitors — significant serotonergic interaction with semax's serotonin pathway activation",
    why: "MAOIs prevent the breakdown of monoamines (serotonin, dopamine, norepinephrine), increasing monoamine levels. Semax activates serotonergic and dopaminergic pathways. Combining a compound that activates these pathways with a drug that prevents their breakdown creates the conditions for serotonin syndrome and dopaminergic toxicity — real risks, not theoretical. MAOIs have significant drug-drug interaction potential generally; semax adds to that burden.",
    action: "Do not combine. If on MAOI therapy: stop semax and discuss with your prescribing physician before any CNS peptide use.",
  },
  {
    name: "Antipsychotics (risperidone, haloperidol, quetiapine, olanzapine, aripiprazole)",
    tier: "flag",
    detail: "Dopamine receptor antagonists/partial agonists — semax dopaminergic activation works counter to antipsychotic dopamine blockade",
    why: "Antipsychotics primarily work by blocking dopamine receptors (particularly D2). Semax activates dopaminergic signaling. Combining a dopamine activator with a dopamine blocker creates pharmacological opposition — and, importantly, may reduce antipsychotic efficacy. For people with conditions managed by antipsychotics (psychosis, schizophrenia, bipolar disorder), this is not a nuanced interaction — it's a direct conflict.",
    action: "Do not combine without explicit psychiatrist guidance. If on antipsychotics for an active psychiatric condition: this interaction is not safe to manage independently.",
  },
  {
    name: "Stimulant medications (amphetamine salts, methylphenidate, modafinil)",
    tier: "flag",
    detail: "Dopaminergic stimulants — additive dopaminergic activation with semax",
    why: "Prescription stimulants (Adderall, Ritalin, etc.) and modafinil work via dopaminergic (and noradrenergic) pathway activation. Semax also activates dopaminergic pathways. Combining additive dopaminergic stimulation creates heightened anxiety, agitation, and cardiovascular stimulation risk. The combined stimulatory burden is greater than either alone.",
    action: "Do not combine without physician guidance. If on stimulant medications for ADHD or other conditions: discuss with your prescribing physician before adding semax.",
  },

  // ── WATCHES ──
  {
    name: "SSRIs and SNRIs (sertraline, escitalopram, fluoxetine, venlafaxine, duloxetine)",
    tier: "watch",
    detail: "Serotonin-active medications — additive serotonergic effect from semax's serotonin pathway activation",
    why: "SSRIs and SNRIs raise synaptic serotonin levels. Semax activates serotonergic pathways. Combining two serotonergic inputs isn't automatically dangerous (unlike MAOIs, which cause exponential serotonin accumulation) — but serotonin syndrome risk increases as serotonergic agents are combined. At typical SSRI therapeutic doses and community semax doses, severe serotonin syndrome is unlikely. Monitoring for serotonin syndrome early signs (agitation, tremor, diarrhea, diaphoresis) is prudent.",
    action: "Not an absolute contraindication. Discuss with your prescribing physician. Observe for serotonin syndrome early warning signs. If on high-dose SSRI or multiple serotonergic drugs: the combination warrants more careful physician evaluation.",
  },
  {
    name: "Selank",
    tier: "watch",
    detail: "Common co-use for anxiety buffering — GABAergic/anxiolytic counterbalancing semax's stimulatory profile",
    why: "Selank + Semax is the most commonly used peptide combination in the Russian biohacking and clinical communities. The rationale is mechanistically sound: Semax's stimulatory/dopaminergic activation is balanced by Selank's anxiolytic/GABAergic modulation. This combination is not a pharmacological danger — it's a widely used protocol with a reasonable mechanistic basis and favorable community tolerability data. The watch rating reflects that both are CNS-active and the combined profile is not formally characterized in Western RCTs.",
    action: "The combination is commonly reported as well-tolerated with synergistic effects. Assess each independently before combining. If on other CNS medications, the combined interaction landscape is more complex.",
  },
  {
    name: "Tricyclic antidepressants (amitriptyline, nortriptyline, clomipramine)",
    tier: "watch",
    detail: "Older antidepressants with significant serotonergic and noradrenergic activity",
    why: "TCAs affect serotonin and norepinephrine reuptake with additional anticholinergic effects. The serotonergic interaction concern from semax applies similarly to TCAs as to SSRIs/SNRIs. TCAs have narrower therapeutic windows and more interaction potential generally.",
    action: "Discuss with your prescribing physician before combining. TCAs have more interaction potential than SSRIs — the uncertainty is greater.",
  },
  {
    name: "Alcohol (regular or heavy use)",
    tier: "watch",
    detail: "CNS depressant — opposing the stimulatory profile of semax",
    why: "Alcohol is a CNS depressant; semax is CNS stimulatory. The opposing effects create a complex interaction pattern — not additive CNS depression (as with selank + alcohol) but competing signals. Heavy alcohol use also disrupts serotonin and dopamine systems — potentially interfering with the mechanisms semax is meant to support.",
    action: "Not a hard stop. Heavy or regular alcohol use during semax use undermines the mechanism and creates complex CNS dynamics.",
  },
  {
    name: "Caffeine and other xanthines",
    tier: "watch",
    detail: "Adenosine antagonist stimulant — additive stimulatory effect with semax",
    why: "Caffeine is an adenosine receptor antagonist that produces CNS stimulation. Combined with semax's dopaminergic/serotonergic activation, the total stimulatory burden is greater. For anxiety-prone individuals, the combination amplifies anxious arousal risk. For most non-anxiety-prone users, the combination is manageable — but notable.",
    action: "Monitor anxiety and stimulatory effects when combining with caffeine. If anxiety-prone: be particularly careful with this combination.",
  },

  // ── LOWS ──
  {
    name: "BPC-157 or TB-500",
    tier: "low",
    detail: "Recovery peptides — tissue repair mechanism, different from semax's CNS pathways",
    why: "Different mechanism. No known pharmacological interaction with semax's BDNF, dopaminergic, or serotonergic pathways.",
    action: "No specific concern. Verify each compound independently.",
  },
  {
    name: "GH-axis compounds (CJC-1295, ipamorelin, etc.)",
    tier: "low",
    detail: "GH secretagogues — GH-axis mechanism independent of semax's CNS pathways",
    why: "No documented pharmacological interaction between GH-axis compounds and semax's mechanism.",
    action: "No specific interaction concern. GH-axis safety gates apply independently.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy pathway — different mechanism",
    why: "No known interaction with semax's CNS mechanism.",
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

export default function SemaxInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Semax&apos;s interaction profile is driven by its dopaminergic and serotonergic mechanism. MAOIs, antipsychotics, and stimulants are flags — real mechanism-based conflicts. SSRIs/SNRIs are watches — serotonergic interaction is real but less severe than MAOI-level risk. The Selank + Semax combination is a watch because both are CNS-active — not because the combination is dangerous; it&apos;s the most common and best-characterized peptide co-use pattern.
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
        Semax&apos;s interaction landscape is more complex than selank&apos;s because the stimulatory dopaminergic profile creates direct conflicts with antipsychotics (which block dopamine) and dangerous interactions with MAOIs (which amplify monoamine accumulation). For someone not on psychiatric medications, the interaction profile is significantly simpler. The Selank + Semax stack is the standard community approach — the anxiolytic profile of selank buffers semax&apos;s stimulatory risks.
      </div>

    </div>
  );
}
