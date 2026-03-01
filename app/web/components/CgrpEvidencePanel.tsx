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
    id: "migraine-mediator",
    claim: "CGRP is a key mediator of migraine pathophysiology \u2014 trigeminal release, vasodilation, neurogenic inflammation",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "CGRP levels in jugular venous blood are elevated during migraine attacks and normalize after " +
      "triptan treatment. Intravenous CGRP infusion provokes migraine-like headache in susceptible " +
      "individuals. CGRP is co-released with substance P from trigeminal nerve terminals, driving " +
      "meningeal vasodilation and neurogenic plasma protein extravasation. This causal chain is " +
      "established through decades of human provocation studies, CSF measurement, and validated " +
      "by the therapeutic success of CGRP-targeting drugs.",
    sources:
      "Goadsby et al., Ann Neurol 1990; Lassen et al., Cephalalgia 2002; " +
      "Edvinsson & Haanes, Nat Rev Neurol 2019",
  },
  {
    id: "mab-prevention",
    claim: "CGRP monoclonal antibodies (erenumab, fremanezumab, galcanezumab, eptinezumab) prevent migraine",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "All four FDA-approved CGRP mAbs have demonstrated statistically significant and clinically " +
      "meaningful reductions in monthly migraine days (MMD) vs. placebo in multiple Phase 3 RCTs. " +
      "Across trials, the reduction in MMD ranges from approximately 1.5\u20134.5 days/month more than " +
      "placebo \u2014 meaningful for a condition with major disability burden. Responder rates (50% " +
      "reduction in MMD) of 40\u201360% are consistently reported. Long-term extension studies show " +
      "durable benefit and no new safety signals.",
    sources:
      "Goadsby et al., NEJM 2017 (erenumab); Stauffer et al., NEJM 2018 (fremanezumab); " +
      "Dodick et al., NEJM 2019 (galcanezumab); Ashina et al., Lancet 2020 (eptinezumab)",
  },
  {
    id: "gepants",
    claim: "Gepants (rimegepant, ubrogepant, atogepant) are effective for acute and preventive migraine treatment",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Rimegepant (Nurtec ODT) demonstrated superiority to placebo for 2-hour pain freedom and " +
      "sustained pain freedom in Phase 3 trials; it also received FDA approval for prevention. " +
      "Ubrogepant (Ubrelvy) met primary endpoints in two Phase 3 trials (ACHIEVE I and II). " +
      "Atogepant (Qulipta) met primary endpoints for both episodic and chronic migraine prevention. " +
      "Gepants offer a triptan-free option for patients with cardiovascular contraindications to " +
      "triptans and can be used on consecutive days without medication-overuse headache risk.",
    sources:
      "Croop et al., NEJM 2019 (rimegepant); Dodick et al., Neurology 2019 (ubrogepant ACHIEVE I); " +
      "Ailani et al., NEJM 2021 (atogepant episodic); Lipton et al., NEJM 2021 (atogepant chronic)",
  },
  {
    id: "cluster",
    claim: "CGRP plays a role in cluster headache; galcanezumab has demonstrated benefit",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Elevated CGRP levels are observed during cluster headache attacks, mirroring the migraine " +
      "pattern. Galcanezumab received FDA approval for episodic cluster headache based on a Phase 3 " +
      "trial showing significant reduction in weekly cluster headache attack frequency vs. placebo. " +
      "However, chronic cluster headache remains harder to treat, and other CGRP mAbs have not yet " +
      "shown consistent benefit in cluster. The evidence base is smaller than for migraine.",
    sources:
      "Goadsby et al., NEJM 2019 (galcanezumab in cluster); Vollesen et al., Headache 2018 (CGRP in cluster)",
  },
  {
    id: "community-injection",
    claim: "Exogenous CGRP injection has performance, wellness, or enhancement use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no scientific or community basis for exogenous CGRP injection in wellness or " +
      "performance contexts. Systemic CGRP administration causes profound vasodilation and " +
      "migraine-like headache in susceptible individuals \u2014 its pharmacological effects are " +
      "the opposite of therapeutically desirable outside its physiological niche. No development " +
      "program, no gray-market supply, and no rationale for non-research use exists.",
    sources: "No relevant literature",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Strong",
    labelColor: "#155e38",
  },
  moderate: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Moderate",
    labelColor: "#7c5200",
  },
  none: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.18)",
    label: "No evidence",
    labelColor: "#9e3800",
  },
};

export default function CgrpEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        CGRP evidence spans basic neuroscience, biomarker research, and one of the most robustly
        validated drug target classes in modern neurology. Evidence below covers both the biology
        and the approved therapeutic agents targeting the CGRP pathway.
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
