/**
 * GlucagonEvidencePanel — calibrated evidence for Glucagon.
 * Key frame: strong evidence for hypoglycemia rescue (multiple FDA-approved formulations),
 * hepatic glucose output mechanism (foundational endocrinology), and GLP-1 suppression
 * of glucagon mechanism. Moderate evidence for beta-blocker/CCB overdose management.
 * No evidence for any enhancement or community injection use.
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
    id: "hypoglycemia-rescue",
    claim: "Glucagon rescues severe hypoglycemia by restoring blood glucose in insulin-using diabetics",
    tier: "strong",
    tierLabel: "Strong — multiple FDA-approved formulations; abundant clinical trial and real-world evidence",
    body: "Severe hypoglycemia (blood glucose < 54 mg/dL with altered consciousness, seizures, or loss of consciousness preventing self-treatment) is a medical emergency in insulin-using diabetics. Glucagon rescue is the established standard of care when IV access is not available for dextrose administration. Multiple RCTs and extensive real-world evidence demonstrate that IM or SC glucagon injection raises blood glucose to safe levels within 10-15 minutes in > 90% of cases (when hepatic glycogen stores are adequate). The nasal powder formulation (Baqsimi) has been shown non-inferior to injectable glucagon in multiple controlled crossover studies — providing equivalent rescue without needle reconstitution. Gvoke autoinjector similarly demonstrated non-inferiority to traditional glucagon kit in clinical trials.",
    sources: "Rickels et al. 2016 (Baqsimi Phase 3 trial); Sherr et al. 2020 (Gvoke crossover); multiple glucagon rescue RCTs; FDA approvals for Baqsimi (2019), Gvoke (2019), GlucaGen (1998); JDRF Hypoglycemia guidelines",
  },
  {
    id: "hepatic-glucose-mechanism",
    claim: "Glucagon stimulates hepatic glycogenolysis and gluconeogenesis through GCGR",
    tier: "strong",
    tierLabel: "Strong — foundational endocrinology; receptor structure solved; mechanism fully characterized",
    body: "Glucagon's mechanism of action represents foundational endocrinology established across decades of biochemistry and pharmacology. The GCGR (glucagon receptor) is a class B GPCR; crystal structure resolved (2017). Gs-coupled cAMP signaling activates protein kinase A, which phosphorylates glycogen phosphorylase (activating glycogenolysis) and phosphoenolpyruvate carboxykinase (activating gluconeogenesis). The downstream biochemical pathway is fully characterized from receptor engagement to hepatic glucose output. This mechanistic understanding is the basis for glucagon rescue use and underpins all GCGR-targeted drug development.",
    sources: "Unger & Orci 1975 (foundational glucagon biology); Zhang et al. 2017 (GCGR crystal structure, Nature); Berg et al. 2001 (Stryer Biochemistry — glycogen regulation); Jiang & Zhang 2003 (glucagon receptor signaling review)",
  },
  {
    id: "glp1-suppresses-glucagon",
    claim: "GLP-1 receptor activation suppresses glucagon secretion from pancreatic alpha cells",
    tier: "strong",
    tierLabel: "Strong — well-established mechanism of GLP-1 drugs; confirmed in human studies; mechanistically characterized",
    body: "Glucagon-like peptide-1 (GLP-1) and glucagon are paradoxically co-products of the same proglucagon gene — GLP-1 from intestinal L cells, glucagon from pancreatic alpha cells. GLP-1 receptor agonists suppress alpha-cell glucagon secretion in a glucose-dependent manner (reducing hyperglucagonemia without causing problematic glucagon suppression during hypoglycemia). This glucagon-suppressing effect is a major contributor to the glucose-lowering mechanism of GLP-1 drugs — reducing the excess hepatic glucose output that is a pathological feature of type 2 diabetes. Multiple human studies with GLP-1 receptor agonists confirm significant reductions in postprandial glucagon levels.",
    sources: "Holst 2007 (GLP-1 physiology review, Physiological Reviews); Nauck et al. 2011 (GLP-1 and glucagon in type 2 diabetes); Drucker 2006 (Diabetes Care — GLP-1 mechanisms); clinical pharmacology data from semaglutide and liraglutide trials",
  },
  {
    id: "beta-blocker-overdose",
    claim: "Glucagon restores cardiac function in beta-blocker and calcium channel blocker overdose",
    tier: "moderate",
    tierLabel: "Moderate — clinical evidence for efficacy; used in toxicology management; not RCT-level evidence for all parameters",
    body: "Beta-blocker and calcium channel blocker overdose cause life-threatening bradycardia and cardiogenic shock. The established toxicology management algorithm includes IV glucagon (1-10 mg bolus, followed by infusion) as a second-line or adjunctive intervention. Glucagon's mechanism — cAMP generation through GCGR bypassing the beta-adrenergic blockade — is pharmacologically sound. Case series and observational data support hemodynamic improvement with glucagon in these overdoses. RCT-level evidence is limited by the nature of toxicology emergencies (small numbers, heterogeneous overdoses). High-dose insulin euglycemic therapy has emerged as an alternative with comparable evidence.",
    sources: "Kerns 2007 (Medical Toxicology — glucagon for beta-blocker overdose); Engebretsen et al. 2011 (glucagon vs high-dose insulin for CCB overdose); AACT/EAPCCT position statements on beta-blocker and CCB overdose management",
  },
  {
    id: "gi-radiology",
    claim: "Glucagon inhibits GI motility for improved radiological visualization",
    tier: "moderate",
    tierLabel: "Moderate — established clinical use; FDA-approved; well-supported by imaging practice evidence",
    body: "IV glucagon at pharmacological doses (0.25-2 mg) produces temporary GI smooth muscle relaxation through cAMP-mediated effects on intestinal smooth muscle. This motility inhibition is used in barium contrast studies (small bowel follow-through, enteroclysis), ERCP, and other GI imaging procedures to reduce peristaltic motion and allow better visualization. The onset is rapid (< 1 minute IV) and duration is 15-30 minutes — well-matched to imaging procedure needs. This clinical use is FDA-approved and well-established in GI radiology practice.",
    sources: "FDA prescribing information for glucagon (GI motility inhibition indication); American College of Radiology guidelines for GI contrast procedures; Herlinger 1994 (GI radiology review)",
  },
  {
    id: "gcgr-triple-agonist",
    claim: "GCGR agonism contributes to weight loss and energy expenditure in triple agonist drugs",
    tier: "moderate",
    tierLabel: "Moderate — mechanistic and clinical data from triple agonist trials; not from standalone glucagon use",
    body: "The glucagon receptor is a component of retatrutide (GLP-1R/GIPR/GCGR triple agonist) and other triple agonists in development. Phase 2 data for retatrutide showed weight loss exceeding that of GLP-1/GIP dual agonists — the GCGR component is hypothesized to contribute through increased hepatic fat oxidation, adipose tissue thermogenesis, and energy expenditure effects mediated by GCGR on adipocytes and other tissues. This mechanistic role for glucagon in energy metabolism is supported by preclinical data and emerging clinical evidence from triple agonist trials. It is distinct from — and should not be conflated with — standalone glucagon injection for weight loss (which has no evidence and would cause hyperglycemia).",
    sources: "Jastreboff et al. 2023 (NEJM — retatrutide Phase 2); Finan et al. 2015 (glucagon/GLP-1 co-agonism mechanism, Nature Medicine); Borner et al. 2021 (GCGR energy expenditure review)",
  },
  {
    id: "enhancement-community",
    claim: "Standalone glucagon injection provides enhancement, weight loss, or performance benefits",
    tier: "none",
    tierLabel: "None — no evidence; standalone glucagon would cause hyperglycemia, not weight loss",
    body: "Standalone glucagon injection raises blood glucose — it does not lower it. The glucose-raising effect is the entire pharmacological action in rescue use. Any community protocol involving glucagon injection for enhancement, weight loss, or performance would: cause hyperglycemia (the opposite of the glucose-lowering effect sought in GLP-1 drug use); produce nausea and vomiting as common adverse effects; and have no mechanism by which meaningful anabolic, ergogenic, or lipolytic effects would be achieved at doses not causing cardiovascular or metabolic harm. The GCGR's energy expenditure role in triple agonists operates through coordinated receptor pharmacology that requires co-agonism — not standalone glucagon.",
    sources: "No evidence base; mechanistic reasoning from glucagon pharmacology; glucagon receptor effects are context-dependent and require co-agonist context for favorable metabolic outcomes",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function GlucagonEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Glucagon&apos;s evidence profile is strong where it counts clinically: hypoglycemia rescue has multiple FDA-approved formulations and controlled trial evidence; the hepatic glucose mechanism is foundational endocrinology; GLP-1 suppression of glucagon is mechanistically well-established and clinically important for understanding GLP-1 drug action. Beta-blocker overdose management has moderate observational evidence. Enhancement or community injection has no evidence and would cause hyperglycemia — standalone glucagon is not the GCGR pharmacology that produces beneficial metabolic effects; that requires the coordinated triple agonist context.
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
