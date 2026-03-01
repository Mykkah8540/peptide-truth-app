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
    id: "ang2-raas-mech",
    claim: "Angiotensin-II RAAS mechanism and cardiovascular physiology",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The renin-angiotensin-aldosterone system is one of the most comprehensively characterized endocrine axes in medicine. Angiotensin-II's role in vascular tone, sodium homeostasis, and aldosterone release is foundational pharmacology underpinning the mechanism of ACE inhibitors, ARBs, and mineralocorticoid antagonists used by tens of millions of patients worldwide. AT1 receptor signaling and its downstream effectors are fully mapped.",
    sources: "Fyhrquist & Saijonmaa, J Intern Med 2008; Paul et al., Physiol Rev 2006",
  },
  {
    id: "ang2-athos3",
    claim: "Vasopressor efficacy in distributive shock (ATHOS-3 RCT)",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The ATHOS-3 trial (321 patients, multicenter RCT) demonstrated that angiotensin-II significantly improved MAP response at 3 hours in catecholamine-refractory distributive shock versus placebo (69.9% vs. 23.4% responders; p < 0.001). The catecholamine-sparing effect allowed norepinephrine dose reduction in the treatment arm. FDA approved Giapreza based on this trial and a supportive pharmacokinetic/pharmacodynamic program.",
    sources: "Khanna et al., NEJM 2017 (ATHOS-3); FDA approval 2017",
  },
  {
    id: "ang2-mortality",
    claim: "Mortality benefit in high-renin distributive shock subgroups",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Post-hoc analyses of ATHOS-3 and the ATHOS-3 extension identified patients with elevated renin-to-angiotensin-II ratios (high renin state) who appeared to derive greater mortality benefit from angiotensin-II supplementation. The biological rationale is that these patients have relative angiotensin-II deficiency underlying their vasopressor resistance. Prospective validation in renin-stratified trials is ongoing.",
    sources: "Tumlin et al., Critical Care Medicine 2018; Leisman et al., Crit Care Med 2020",
  },
  {
    id: "ang2-community",
    claim: "Community, enhancement, or non-ICU use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Angiotensin-II has no evidence base or rational purpose outside of IV vasopressor use in monitored ICU settings. It is a potent vasoconstrictor requiring invasive hemodynamic monitoring (arterial line, central venous access), carries a black box thrombosis warning, and must be continuously titrated. There is no plausible enhancement, recovery, or supplementation application.",
    sources: "Giapreza prescribing information (La Jolla Pharmaceutical, 2017)",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function AngiotensinIiEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Angiotensin-II has robust evidence as a vasopressor in distributive shock — one RCT
        powered for a clinically meaningful endpoint plus FDA approval. Evidence for mortality
        benefit is promising but subgroup-derived. Evidence for any non-ICU use is absent by
        definition.
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
