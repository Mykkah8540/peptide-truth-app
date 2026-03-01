/**
 * LinaclotideSafetyPanel — proactive safety intelligence for linaclotide.
 * Key frame: pediatric black box is the hard stop.
 * Diarrhea is the primary adverse effect and dose-interruption reason.
 * Systemic side effects are minimal (negligible absorption).
 * Drug interactions are essentially absent.
 */

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
    id: "pediatric-black-box",
    heading: "Pediatric black box \u2014 contraindicated under 6 years; fatal intestinal obstruction risk",
    tier: "flag",
    body: "Linaclotide is contraindicated in pediatric patients under 6 years of age based on animal studies demonstrating fatal intestinal obstruction in neonatal and juvenile mice given clinically equivalent doses. The mechanism: immature GI tracts in very young animals lack the compensatory mechanisms to handle the degree of fluid secretion produced by GC-C agonism, resulting in intraluminal fluid accumulation and potentially fatal distension or obstruction. FDA extended this contraindication to humans under age 6 on the basis of this neonatal animal data, applying precautionary extrapolation given the severity of the finding. Use in patients aged 6\u201317 should be avoided as the drug has not been studied in this age group and the juvenile animal data warrants caution.",
    context: "This black box has practical implications for household safety, not just pediatric prescribing. Linaclotide capsules should be stored out of reach of children with the same priority as all prescription medications. Accidental ingestion by a young child is a medical emergency \u2014 contact Poison Control immediately (1-800-222-1222 in the US) and seek emergency medical evaluation without waiting for symptoms to develop. The rapid-onset fluid secretion mechanism means symptoms, if they develop, can progress quickly.",
  },
  {
    id: "diarrhea",
    heading: "Diarrhea \u2014 most common adverse effect; can be severe enough to require dose interruption",
    tier: "watch",
    body: "Diarrhea is the most frequent adverse effect of linaclotide, occurring in approximately 20% of IBS-C trial patients vs 3% in placebo. Severe diarrhea (defined by the need for dose interruption) occurred in approximately 2% of patients. Diarrhea is a direct, dose-dependent consequence of the mechanism \u2014 GC-C-mediated fluid secretion into the intestinal lumen produces loose, watery stools when secretion exceeds the colon\u2019s absorptive capacity. Most cases are mild to moderate and reflect the drug working as intended, but for some patients the degree of loosening exceeds what they find acceptable. Severe or prolonged diarrhea can cause electrolyte loss (sodium, potassium, chloride) and dehydration.",
    context: "Management: if diarrhea is intolerable, the first step is dose interruption (not dose reduction \u2014 there is no lower available dose in standard formulations; some patients halve capsule content by opening the capsule). Restarting at the same dose after several days is appropriate if the diarrhea was the drug working but was excessive in degree. If diarrhea develops suddenly after a period of tolerating the drug well, rule out other causes (infection, other dietary changes). Severe diarrhea with dehydration symptoms (dizziness, decreased urination, rapid heart rate) warrants medical evaluation. Electrolyte replacement (oral rehydration solution) is appropriate for significant diarrhea.",
  },
  {
    id: "systemic-effects",
    heading: "Systemic side effects \u2014 minimal; negligible systemic absorption",
    tier: "low",
    body: "Because linaclotide is not measurably absorbed into the systemic circulation, systemic adverse effects are essentially absent. Headache, upper respiratory tract infections, and sinusitis reported in clinical trials occurred at rates comparable to placebo and are not considered drug-related. There is no central nervous system exposure, no renal exposure, no cardiac exposure, and no immunologic systemic activation from linaclotide. This pharmacokinetic profile means standard drug interaction screening concerns (CYP450, renal dosing, cardiac monitoring) do not apply.",
    context: "The absence of systemic effects is a genuine feature of linaclotide, not a gap in knowledge. Clinical trials specifically studied systemic exposure and found none at therapeutic doses. This makes linaclotide unusual among drugs in that its tolerability outside the GI tract is essentially the same as placebo \u2014 all the action (beneficial and adverse) happens in the gut.",
  },
  {
    id: "drug-interactions",
    heading: "Drug interactions \u2014 minimal; no pharmacokinetic interactions from CYP450 or renal clearance",
    tier: "low",
    body: "Linaclotide is not systemically absorbed and does not undergo CYP450 metabolism in the systemic circulation. It does not inhibit or induce CYP enzymes. It is not renally cleared as an intact drug. As a result, standard pharmacokinetic drug interaction mechanisms (CYP inhibition/induction, renal competition, protein binding displacement) do not apply. Laxatives and stool softeners used concurrently may produce additive GI motility effects \u2014 combined use can produce excessive diarrhea, but this is a pharmacodynamic effect (additive GI motility) rather than a pharmacokinetic interaction, and is manageable by adjusting laxative use when linaclotide is started.",
    context: "When a patient starting linaclotide is also on stimulant laxatives (bisacodyl, senna) or high-dose osmotic laxatives (polyethylene glycol, magnesium), tapering the laxatives as linaclotide takes effect is a practical clinical approach. Using multiple GI motility agents simultaneously at full doses risks excessive diarrhea. Discuss your full GI medication list \u2014 including OTC laxatives and fiber supplements \u2014 with your prescriber or pharmacist when starting linaclotide.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function LinaclotideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Linaclotide has a clean systemic safety profile because it isn\u2019t systemically absorbed. The safety story is almost entirely GI: diarrhea is the primary clinical concern and is directly dose-mechanism-related. The pediatric black box is the hard stop and the only categorical contraindication. For adults, the safety profile in clinical trials was favorable, with diarrhea as the primary dose-limiting adverse effect. No systemic monitoring (hepatic, renal, cardiac, hematologic) is required during linaclotide therapy.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div key={item.id} className="reta-safety__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div className="reta-safety__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</div>
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
