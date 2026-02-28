/**
 * DSIPEvidencePanel — calibrated evidence for DSIP.
 * Key frame: The original sleep-induction story is overstated; the stress/HPA
 * effects have more consistent support. All human data is old (1980s-90s),
 * small, and methodologically variable. No modern RCTs exist.
 */

type Tier = "strong" | "moderate" | "none";

interface Signal {
  id: string;
  claim: string;
  tier: Tier;
  tierLabel: string;
  body: string;
  sources: string;
}

const SIGNALS: Signal[] = [
  {
    id: "original-isolation",
    claim: "DSIP induces slow-wave sleep when infused into rabbits",
    tier: "moderate",
    tierLabel: "Moderate — original finding; species-specific; methodological questions",
    body: "The 1977 Monnier isolation study found that cerebral venous blood collected during electrically-induced slow-wave sleep in rabbits, when infused into awake rabbits, induced sleep. The active fraction was identified as the 9-amino-acid peptide now called DSIP. This result established the compound but the original experimental design — using electricity to induce sleep states, collecting venous blood, infusing it into other rabbits — has significant methodological limitations. Subsequent attempts to reproducibly induce sleep with purified DSIP in naive animals produced inconsistent results.",
    sources: "Monnier et al. 1977 (Experientia — original isolation); Schoenenberger et al. 1977 (follow-up characterization)",
  },
  {
    id: "human-sleep-positive",
    claim: "DSIP improves sleep architecture in some human studies",
    tier: "moderate",
    tierLabel: "Moderate — small positive studies; not consistently replicated",
    body: "Several small European studies (10-30 participants) in the 1980s-1990s reported improvements in sleep architecture with IV or subcutaneous DSIP. Positive findings included increased slow-wave sleep time, improved sleep efficiency, and reduced waking in insomnia patients. A study in narcoleptic patients showed reduced daytime sleepiness with DSIP. These studies are methodologically variable — different routes of administration, doses, and patient populations — making meta-analysis difficult.",
    sources: "Schneider-Helmert et al. 1981; Schneider-Helmert & Gnirss 1981 (narcolepsy); Schoenenberger et al. 1981",
  },
  {
    id: "human-sleep-null",
    claim: "DSIP reliably induces or improves sleep in controlled human trials",
    tier: "none",
    tierLabel: "Inconsistent — null results in some controlled studies",
    body: "Not all human sleep studies showed positive results. Some controlled studies found no significant effect of DSIP on sleep architecture compared to placebo. The inconsistency across studies — in the same decade, using similar populations — suggests the effect is either small and variable, or dependent on undetermined moderating factors (preparation quality, route, dose, population characteristics). The null results have not been adequately resolved, and no consensus on DSIP's sleep efficacy emerged from this literature.",
    sources: "Conflicting results in the 1980s-90s European sleep literature; lack of consensus in systematic reviews",
  },
  {
    id: "hpa-stress",
    claim: "DSIP normalizes ACTH and cortisol stress responses",
    tier: "moderate",
    tierLabel: "Moderate — more consistent across studies than sleep induction",
    body: "Multiple studies, including some animal and small human work, found that DSIP modulates HPA axis reactivity — specifically blunting ACTH release in response to stressors and normalizing cortisol responses. This effect appears in both stressed and non-stressed states. The stress-modulating data is more consistent across studies than the sleep-induction data. Some researchers have proposed that DSIP's 'sleep effects' are actually downstream of stress reduction — a less specific but more reproducible mechanism.",
    sources: "Kastin et al. 1981; multiple HPA axis DSIP studies (1980s-90s); stress axis normalization literature",
  },
  {
    id: "opioid-withdrawal",
    claim: "DSIP reduces opioid withdrawal symptoms in controlled studies",
    tier: "moderate",
    tierLabel: "Moderate — small controlled studies; most consistent human evidence",
    body: "Several controlled studies in Europe (primarily Germany, 1980s-90s) examined DSIP in heroin-dependent patients during withdrawal. Compared to placebo or standard treatments, IV DSIP reduced subjective withdrawal symptoms, improved sleep during withdrawal, and showed measurable effects on autonomic parameters. Sample sizes were 10-40 patients. This is the most methodologically controlled human evidence for any DSIP effect. The mechanism may relate to opioid receptor interactions or HPA axis normalization during the stress of withdrawal.",
    sources: "Kren et al. 1983; Bjorum et al. opioid withdrawal studies; Hubner et al. German opioid withdrawal data",
  },
  {
    id: "antioxidant",
    claim: "DSIP has antioxidant properties",
    tier: "moderate",
    tierLabel: "Moderate — cell/animal data; mechanistically plausible",
    body: "DSIP has been shown to reduce oxidative stress markers and have free radical scavenging activity in cell culture and rodent studies. This antioxidant property is independent of its neuromodulatory effects and may contribute to its protective effects in stressed tissues. Whether this antioxidant activity is clinically meaningful at the doses achievable by community subcutaneous injection is not established.",
    sources: "Voronina et al. antioxidant studies; Khvatova et al. oxidative stress data",
  },
  {
    id: "modern-rct",
    claim: "DSIP improves sleep or stress outcomes in modern placebo-controlled human trials",
    tier: "none",
    tierLabel: "None — no modern RCTs; research effectively stalled",
    body: "No modern (post-2000) randomized controlled trials of DSIP for any indication have been published. The research trajectory peaked in the 1980s-1990s and has not been reinvigorated by drug development interest. The evidence base is entirely historical. Community use extrapolates from this dated literature and anecdotal reports — there is no modern evidence base to draw on.",
    sources: "Absence of post-2000 human RCT data; PubMed search confirms stalled research pipeline",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function DSIPEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        DSIP&apos;s evidence base is old, limited, and inconsistent. The sleep-induction data is mixed — positive in some small studies, null in others. The HPA axis/stress normalization data is more consistent. The opioid withdrawal studies are the most controlled human evidence. No modern RCTs exist. Community use should be calibrated to this evidence tier: historical small studies in sleep medicine and addiction, no contemporary validation.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div
              key={s.id}
              className="reta-evidence__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div
                  className="reta-evidence__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {s.tierLabel}
                </div>
              </div>
              <div className="reta-evidence__entry-body">{s.body}</div>
              <div className="reta-evidence__entry-sources">{s.sources}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
