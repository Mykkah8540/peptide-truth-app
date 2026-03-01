type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "ace-angioedema",
    heading: "ACE inhibitor\u2013induced angioedema \u2014 life-threatening bradykinin accumulation",
    tier: "flag",
    body:
      "ACE inhibitors (enalapril, lisinopril, ramipril, and all others in class) block bradykinin degradation " +
      "by kininase II. In susceptible individuals, bradykinin accumulates and causes angioedema \u2014 swelling " +
      "of the face, lips, tongue, larynx, and gut. Laryngeal angioedema is life-threatening. Onset can occur " +
      "at any point during treatment, including years after initiation. ACE inhibitor angioedema is the " +
      "mechanism-driven prototype for bradykinin excess toxicity.",
    context:
      "If you are on an ACE inhibitor and experience facial swelling, tongue swelling, or throat tightness, " +
      "seek emergency care immediately. ARBs (e.g., losartan, valsartan) are the standard switch \u2014 they " +
      "do not inhibit bradykinin metabolism and have a substantially lower angioedema risk.",
  },
  {
    id: "b2-hypersensitivity",
    heading: "B2 receptor hypersensitivity \u2014 exaggerated vasodilatory response",
    tier: "watch",
    body:
      "In states of elevated bradykinin (HAE attacks, ACE inhibitor use, tissue injury), B2 receptor " +
      "activation produces pronounced vasodilation, hypotension, and pain sensitization. Patients with " +
      "known B2 receptor hypersensitivity or prior angioedema episodes are at higher risk for severe " +
      "responses. Icatibant injection site reactions (local pain, erythema) occur in most patients but " +
      "are self-limiting.",
    context:
      "HAE patients on prophylaxis (lanadelumab, C1-inhibitor concentrate) should maintain an acute " +
      "rescue medication (icatibant or ecallantide) and an action plan for breakthrough attacks.",
  },
  {
    id: "no-community-use",
    heading: "No therapeutic exogenous bradykinin use exists",
    tier: "low",
    body:
      "Exogenous bradykinin administration in humans would cause rapid systemic vasodilation, hypotension, " +
      "and pain \u2014 it has a plasma half-life of seconds and no pharmacological rationale for injection. " +
      "There is no documented community use, no gray-market supply, and no development program. " +
      "The safety concern here is essentially zero because the scenario does not arise in practice.",
    context:
      "Bradykinin is included in this database as pharmacology education, not as a compound people are " +
      "using. If you encountered it listed somewhere as a \u201cperformance peptide,\u201d that is misinformation.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function BradykininSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Bradykinin itself is not used therapeutically or in community peptide stacks. Safety concerns here
        relate to bradykinin excess caused by ACE inhibitors and to HAE pathophysiology \u2014 contexts where
        understanding bradykinin directly affects clinical decisions.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
