/**
 * VasopressinEvidencePanel — calibrated evidence for Vasopressin (ADH/AVP).
 * Key frame: V2 antidiuretic mechanism and V1a vasopressor mechanism are
 * FDA-approved and well-characterized. Cognitive/social bonding human data
 * is inconsistent — the oxytocin parallel narrative overstates the evidence.
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
    id: "v2-antidiuretic",
    claim: "Vasopressin V2 receptor activation mediates renal water reabsorption and antidiuretic effect",
    tier: "strong",
    tierLabel: "Strong — FDA-approved mechanism; well-characterized receptor pharmacology",
    body: "The V2 receptor-mediated antidiuretic mechanism of vasopressin is among the most thoroughly characterized in endocrinology. V2 receptor activation in renal collecting duct cells stimulates cAMP production and protein kinase A activation, which phosphorylates aquaporin-2 water channels and drives their insertion into the apical membrane — dramatically increasing water permeability and concentrating urine. Vasopressin deficiency causes diabetes insipidus (DI); vasopressin injection and the synthetic analog desmopressin are FDA-approved for DI treatment. This mechanism is validated across decades of clinical practice.",
    sources: "FDA approval: vasopressin injection (multiple formulations); Knepper et al. 2015 (NEJM — aquaporin-2 mechanism); Robertson 2001 (antidiuretic physiology review)",
  },
  {
    id: "v1a-vasopressor",
    claim: "Vasopressin V1a receptor activation produces vasoconstriction and increases blood pressure",
    tier: "strong",
    tierLabel: "Strong — FDA-approved for vasodilatory shock; well-characterized mechanism",
    body: "V1a receptor-mediated vasoconstriction is the basis for vasopressin's use in vasodilatory shock (septic shock, post-cardiac surgery vasoplegic syndrome). When catecholamines (norepinephrine) are insufficient, vasopressin at low doses (0.03-0.04 units/minute IV) restores vascular tone. The VASST trial (Russell et al. 2008, NEJM) compared vasopressin to norepinephrine in septic shock. Multiple meta-analyses have examined vasopressin in shock states. V1a vasoconstriction is a well-established pharmacological effect with documented clinical evidence.",
    sources: "Russell et al. 2008 (NEJM — VASST trial); Dünser et al. vasopressin in shock meta-analyses; FDA approval: Vasostrict (vasopressin injection) for distributive shock",
  },
  {
    id: "v1b-hpa",
    claim: "V1b receptor stimulation increases ACTH and cortisol release — stress response modulation",
    tier: "moderate",
    tierLabel: "Moderate — well-characterized neuroendocrine mechanism; less clinical evidence",
    body: "V1b (V3) receptors in the anterior pituitary corticotroph cells respond to AVP by stimulating ACTH release, which drives cortisol production from the adrenal cortex. This is part of the HPA axis stress response — CRH and AVP act synergistically to drive ACTH release. The V1b mechanism is pharmacologically well-characterized and forms the basis for V1b antagonist drug development for stress-related conditions (nelivaptan). However, the therapeutic significance of community vasopressin use targeting V1b specifically is not established — native vasopressin cannot selectively target V1b over V1a and V2.",
    sources: "Nelivaptan V1b antagonist development literature; Griebel et al. V1b pharmacology reviews; HPA axis vasopressin-CRH synergy research",
  },
  {
    id: "memory-rodent",
    claim: "AVP facilitates memory consolidation and spatial memory in rodent models",
    tier: "moderate",
    tierLabel: "Moderate — consistent rodent data; human translation uncertain",
    body: "Rodent research has consistently shown that AVP microinjections into hippocampal and amygdala regions facilitate memory consolidation and retrieval. AVP-immunoreactive neurons in limbic structures, V1a and V1b receptors in hippocampus, and AVP's role in social recognition memory are well-characterized in animal models. Brattleboro rats (which lack endogenous AVP) show memory deficits that are reversed by AVP administration. This mechanistic and animal model data is strong — but rodent-to-human translation in neuropeptide cognition research has a poor track record.",
    sources: "De Wied 1976-1984 (foundational AVP memory research); Alescio-Lautier et al. 2000; social recognition memory AVP literature; Brattleboro rat model studies",
  },
  {
    id: "human-cognition",
    claim: "Intranasal vasopressin improves memory or social cognition in humans",
    tier: "none",
    tierLabel: "Inconsistent — mixed human data; some null, some unexpected negative findings",
    body: "Human studies of intranasal vasopressin for cognition and social processing have produced inconsistent results. Some studies found improved memory performance; others found null effects; some found unexpected results — one prominent study (Thompson et al. 2006) found that intranasal vasopressin reduced the recognition of friendly facial expressions in men. A meta-analysis of intranasal vasopressin effects on social cognition found no reliable effect. The inconsistency may reflect dose, sex, individual differences in baseline AVP tone, or fundamental limitations in translating rodent models to human social cognition.",
    sources: "Thompson et al. 2006 (Psychopharmacology — unexpected social cognition effects); Guastella et al. meta-analyses; Bakermans-Kranenburg & van IJzendoorn systematic review 2013",
  },
  {
    id: "varices-bleeding",
    claim: "Vasopressin controls bleeding from esophageal varices in portal hypertension",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; established clinical evidence in gastroenterology",
    body: "Vasopressin reduces portal venous pressure through splanchnic vasoconstriction, decreasing blood flow to the portal system and controlling bleeding from esophageal varices in portal hypertension (typically cirrhosis-related). This V1a mechanism is clinically validated and FDA-approved. Terlipressin (a vasopressin analog) is used internationally for variceal bleeding. The cardiovascular risks (coronary vasoconstriction, angina, myocardial infarction) have been documented with vasopressin infusion and limit its use without concurrent nitroglycerin in some protocols.",
    sources: "FDA approval: vasopressin for esophageal variceal hemorrhage; Garcia-Tsao et al. variceal bleeding guidelines; terlipressin meta-analyses",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function VasopressinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Vasopressin has a bifurcated evidence profile. The clinical evidence for V2-mediated antidiuresis (diabetes insipidus) and V1a-mediated vasoconstriction (shock) is strong — FDA-approved with well-characterized mechanisms across decades of clinical use. The community-interest evidence for cognitive and social bonding effects is weak and inconsistent — human studies of intranasal vasopressin for cognition have produced mixed results, and some have found unexpected negative effects. The rodent memory data is solid but translates poorly to human social cognition. Do not conflate the clinical evidence base with the community use case.
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
