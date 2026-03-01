/**
 * Endothelin1SafetyPanel — proactive safety intelligence for ET-1 / ERA pharmacology.
 * Key frame: exogenous ET-1 as agonist is not used therapeutically.
 * Safety content covers ERA medications (bosentan, ambrisentan, macitentan):
 * hepatotoxicity (bosentan black box), teratogenicity (all ERAs, category X),
 * and drug interactions (CYP3A4/2C9 induction by bosentan).
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
    id: "vasoconstriction-agonist",
    heading: "Exogenous ET-1 agonist use \u2014 severe vasoconstriction, hypertensive crisis, ischemia",
    tier: "flag",
    body: "Administering exogenous endothelin-1 as an agonist would cause dose-dependent, prolonged vasoconstriction of systemic and pulmonary vasculature via ETA receptor activation. Expected effects include severe hypertension (hypertensive crisis), coronary artery spasm, myocardial ischemia, renal vasoconstriction with acute kidney injury, and cerebrovascular compromise. There is no therapeutic window for ET-1 agonist use in humans. ET-1 is used in research settings (isolated vessel preparations, animal models) under controlled laboratory conditions \u2014 not in living humans.",
    context: "This is the reason ET-1 has no therapeutic or community use as an agonist. The pharmacology predicts extreme harm. Anyone who has encountered a source suggesting injectable ET-1 for any wellness or performance purpose should treat that information as pharmacologically dangerous misinformation.",
  },
  {
    id: "era-hepatotoxicity",
    heading: "ERA hepatotoxicity \u2014 bosentan black box warning for dose-dependent liver injury",
    tier: "flag",
    body: "Bosentan (Tracleer) carries a black box warning for hepatotoxicity. Dose-dependent elevations in liver transaminases (ALT, AST) occur in approximately 10% of patients, including values exceeding 8\u00d7 the upper limit of normal. Hepatotoxicity can cause liver failure requiring transplantation in rare cases. Monthly liver function tests are mandatory during bosentan therapy. The mechanism is likely hepatic bile salt transporter inhibition (OATP and MRP2/3) leading to intrahepatic cholestasis and hepatocellular damage. Ambrisentan and macitentan have lower hepatotoxicity rates \u2014 ambrisentan\u2019s black box was removed in 2011 after post-marketing data showed lower rates than bosentan.",
    context: "Monthly ALT/AST monitoring is a mandatory regulatory requirement for bosentan through the Tracleer REMS program. Elevations to 3\u20135\u00d7 ULN: confirm and consider dose reduction. Elevations >8\u00d7 ULN or any elevation with symptoms of liver injury (jaundice, abdominal pain, fatigue): discontinue immediately and evaluate. Any baseline liver impairment reduces ERA tolerability and may be a contraindication.",
  },
  {
    id: "era-teratogenicity",
    heading: "ERA teratogenicity \u2014 pregnancy category X, mandatory contraception, REMS enrollment",
    tier: "flag",
    body: "All ERAs (bosentan, ambrisentan, macitentan) are teratogenic and classified as pregnancy category X. Animal studies demonstrate dose-related teratogenicity including craniofacial malformations, cardiovascular defects, and fetal death at exposures approximating therapeutic human doses. Human teratogenicity data is limited by the contraindication itself, but the preclinical signal is strong enough that all ERAs are contraindicated in pregnancy. For women of reproductive potential, mandatory contraception (two reliable methods for bosentan \u2014 because bosentan reduces hormonal contraceptive efficacy) and monthly pregnancy testing are required through REMS programs.",
    context: "Bosentan specifically reduces hormonal contraceptive efficacy through CYP3A4 and CYP2C9 induction \u2014 a pill alone is insufficient contraception during bosentan therapy. Two methods (one barrier method plus another reliable method) are required. Women with PAH who become pregnant face a particularly difficult situation: PAH itself carries high maternal and fetal mortality during pregnancy, and ERA discontinuation risks PAH deterioration. This requires specialized cardiology and maternal-fetal medicine management.",
  },
  {
    id: "era-cyp-interactions",
    heading: "Bosentan CYP3A4/2C9 induction \u2014 significant drug interaction burden",
    tier: "watch",
    body: "Bosentan is a moderate-to-strong inducer of CYP3A4 and CYP2C9, which substantially reduces plasma concentrations of co-administered drugs metabolized by these pathways. Clinically significant: cyclosporine (contraindicated due to major OATP1B1 + CYP3A4 interaction causing 30\u00d7 increase in bosentan exposure and markedly reduced cyclosporine levels); hormonal contraceptives (efficacy reduced; two-method contraception required); warfarin (INR monitoring intensification needed); tacrolimus (plasma level monitoring essential); certain statins (simvastatin and atorvastatin levels reduced). Ambrisentan and macitentan have substantially lower CYP induction burden than bosentan.",
    context: "When counseling patients on bosentan, a full medication reconciliation is essential. The cyclosporine interaction is contraindicated \u2014 not a dose-adjustment situation. For patients on warfarin, bosentan initiation typically causes INR reduction (CYP2C9 induction metabolizes warfarin faster); warfarin dose increase and close INR monitoring are required. Sildenafil levels are also reduced by bosentan (CYP3A4 induction) \u2014 relevant since PAH combination therapy with PDE5 inhibitors is standard.",
  },
  {
    id: "era-fluid-retention",
    heading: "Peripheral edema and fluid retention \u2014 class effect of ERAs",
    tier: "watch",
    body: "All ERAs can cause peripheral edema and fluid retention, likely via ETB receptor blockade on renal collecting duct cells (ETB normally promotes sodium and water excretion). Edema rates vary by ERA: ambrisentan has higher rates (~17\u201327% in ARIES trials); bosentan and macitentan rates are lower. Significant fluid retention can worsen right heart failure in PAH patients \u2014 a serious concern in a disease where right ventricular function is the primary determinant of survival. Dose reduction or diuretic augmentation may be needed.",
    context: "Fluid retention on ERA therapy requires assessment of right heart function. Weight gain >2 kg in a week warrants evaluation for right heart decompensation in PAH. Diuretic dose may need upward adjustment. The fluid retention mechanism (ETB blockade in kidney) makes ETA-selective ERAs (ambrisentan) potentially more problematic for fluid retention than dual ERAs, though clinical data shows mixed results.",
  },
  {
    id: "era-pah-combination",
    heading: "PAH combination therapy \u2014 riociguat contraindicated with PDE5 inhibitors",
    tier: "low",
    body: "ERA combination with sildenafil (Revatio), tadalafil (Adcirca), or riociguat (Adempas) is guideline-recommended standard of care in PAH. Sildenafil + bosentan: bosentan reduces sildenafil levels by ~50% via CYP3A4 induction; dose adjustment may be needed. Ambrisentan + tadalafil: AMBITION trial demonstrated superiority of upfront combination vs monotherapy. Important: riociguat is absolutely contraindicated with PDE5 inhibitors (both act on cGMP \u2014 combined hypotension risk is severe). This is an ERA-adjacent drug interaction that PAH patients commonly need to understand.",
    context: "PAH is managed by specialists (pulmonologists, cardiologists with PAH expertise) who are familiar with the combination therapy landscape. Patients can advocate for themselves by understanding why certain combinations are used and what the interaction concerns are. The ERA + PDE5 inhibitor combination is standard; ERA + prostacyclin (treprostinil, selexipag, iloprost) is advanced therapy for patients with inadequate response to oral combination.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function Endothelin1SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Safety content here covers two distinct domains: (1) the acute danger of exogenous ET-1 as an agonist \u2014 which no one should ever administer outside a research laboratory; and (2) the real-world safety considerations for patients on ERA medications (bosentan, ambrisentan, macitentan) for PAH. Hepatotoxicity, teratogenicity, and drug interactions are the clinically actionable safety concerns for ERA patients.
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
