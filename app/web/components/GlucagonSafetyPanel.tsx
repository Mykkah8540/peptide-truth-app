/**
 * GlucagonSafetyPanel — safety calibration for Glucagon.
 * Key frame: glucagon rescue kits are safe for their intended use; the primary
 * safety concern is the ABSENCE of a glucagon rescue kit in an insulin user.
 * Hyperglycemia is an expected pharmacological effect (not a problem in rescue context).
 * Pheochromocytoma is a contraindication. Nausea/vomiting is common post-rescue.
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
    id: "absent-rescue-kit",
    heading: "Absence of glucagon rescue kit in insulin users — the most important safety gap",
    tier: "flag",
    body: "The most clinically significant 'safety concern' for glucagon is not the compound itself but its absence when needed. Severe hypoglycemia in an insulin-using diabetic (type 1 diabetes, or type 2 on insulin or sulfonylurea) that causes unconsciousness, seizure, or incapacitation requires exogenous glucagon rescue — without it, the only alternative is emergency medical response for IV dextrose, which may not be fast enough. Multiple deaths and serious hypoglycemia-related brain injuries occur annually in insulin users who do not have glucagon rescue available. This is a failure of preparation, not a property of glucagon itself.",
    context: "Every person using insulin should have: a current (non-expired) glucagon rescue kit — preferably Baqsimi nasal powder or Gvoke autoinjector for ease of use under emergency conditions; at least one household member or caregiver who knows where the kit is kept and how to use it; a medical alert identification indicating insulin use. Traditional glucagon kits (requiring reconstitution under pressure) are more error-prone in true emergencies — modern formulations (nasal powder, autoinjector) reduce the error risk and are strongly preferred. Check kit expiration annually.",
  },
  {
    id: "pheo",
    heading: "Pheochromocytoma — glucagon can precipitate hypertensive crisis",
    tier: "flag",
    body: "Pheochromocytoma (pheochromocytoma) is a catecholamine-secreting adrenal tumor. Glucagon stimulates catecholamine release from pheochromocytoma tissue, potentially precipitating a life-threatening hypertensive crisis. IV glucagon was historically used as a pharmacological provocation test for pheochromocytoma diagnosis — it reliably triggers catecholamine release in affected patients. This is a real and serious contraindication: in a patient with known or suspected pheochromocytoma, glucagon administration should be avoided except in life-threatening hypoglycemia where it is the only available rescue.",
    context: "Known pheochromocytoma: avoid glucagon unless the hypoglycemic emergency is immediately life-threatening. In patients with known or suspected pheochromocytoma requiring peri-operative management: have alpha-blocker (phentolamine) immediately available if glucagon is given for any reason. This contraindication is for elective or semi-elective use — in true severe hypoglycemia with altered consciousness, glucagon rescue takes priority over pheochromocytoma concerns.",
  },
  {
    id: "hyperglycemia",
    heading: "Hyperglycemia after rescue — expected pharmacological effect; requires follow-up glucose management",
    tier: "watch",
    body: "Glucagon rescue causes hepatic glucose output — blood glucose rises to above-normal levels after the rescue, often 200-300 mg/dL or higher. This hyperglycemia is the expected pharmacological response and is not harmful in the acute rescue context. However, it should not be ignored: insulin-using diabetics will need insulin adjustment after glucagon rescue to return glucose to target range. For Type 1 diabetics: a small correction dose of rapid-acting insulin may be appropriate once consciousness is fully restored and the person can eat. Failing to manage post-rescue hyperglycemia over hours causes ketoacidosis risk in type 1 diabetes.",
    context: "After glucagon rescue: give fast-acting carbohydrates once consciousness is restored (glucose tablets, juice) to sustain blood glucose while glucagon effect wanes. Check blood glucose every 15-30 minutes. If glucose exceeds 250 mg/dL: small correction insulin dose per the patient's correction factor, once they are fully awake and can manage their insulin. Call emergency services or go to an emergency room for any glucagon rescue — follow-up medical evaluation is appropriate after severe hypoglycemia to identify and address the precipitating cause.",
  },
  {
    id: "nausea-vomiting",
    heading: "Nausea and vomiting — common adverse effect after glucagon administration",
    tier: "watch",
    body: "Nausea and vomiting occur frequently (approximately 20-30%) after glucagon administration, particularly with the higher doses used for rescue (1 mg IM/SC). The mechanism is multi-factorial — glucagon directly affects GI motility and activates central nausea pathways. In the post-rescue context, vomiting is relevant because: aspiration risk in a patient who is not fully conscious; difficulty administering oral carbohydrates if vomiting is severe; and the vomiting may delay glucose restoration. Baqsimi nasal powder (which avoids injection) has similar nausea/vomiting rates to injectable glucagon in trials.",
    context: "Patient positioned on their side (recovery position) after glucagon administration until fully conscious — reduces aspiration risk if vomiting occurs. Oral carbohydrates (glucose tablets, juice) are given only when the patient is fully awake and has protective airway reflexes. Antiemetics can be administered in hospital or EMS settings if vomiting is severe. Caregivers should be aware that post-rescue nausea is expected and does not indicate glucagon failed.",
  },
  {
    id: "glycogen-depletion-rescue-failure",
    heading: "Glucagon rescue may be less effective if hepatic glycogen is depleted",
    tier: "watch",
    body: "Glucagon raises blood glucose by triggering glycogenolysis — breaking down hepatic glycogen stores. If glycogen stores are depleted (prolonged fasting before hypoglycemia, alcohol-induced hypoglycemia, prolonged severe hypoglycemia, or glycogen storage diseases), glucagon rescue produces a blunted or absent blood glucose response. Alcohol-related hypoglycemia is a specific high-risk scenario: ethanol blocks gluconeogenesis in addition to depleting glycogen, severely limiting glucagon's effectiveness. In these circumstances, IV dextrose (emergency medical services) is the rescue of choice.",
    context: "Alcohol-related hypoglycemia requires emergency medical services — glucagon rescue is less reliable. For any glucagon rescue that does not produce blood glucose recovery within 15 minutes: call emergency services immediately for IV dextrose. Caregivers should not delay calling 911 if an insulin user does not regain consciousness within 10-15 minutes of glucagon administration. Glucagon is a first response, not a definitive treatment — EMS evaluation after any severe hypoglycemia episode is appropriate.",
  },
  {
    id: "injection-tolerability",
    heading: "Injection site and formulation tolerability — rescue kits are safe for their intended use",
    tier: "low",
    body: "The glucagon rescue formulations are safe for their intended acute use. GlucaGen and Gvoke injections (IM or SC) have minimal injection site adverse effects given the emergency context. Baqsimi nasal powder may cause transient nasal irritation but avoids injection entirely. These are acute single-use formulations, not compounds used repeatedly — tolerability concerns are minimal. Traditional glucagon kit reconstitution under emergency conditions is error-prone (wrong diluent volume, incomplete reconstitution) — modern ready-to-use formulations are preferred.",
    context: "No long-term tolerability concerns for the intended rescue use. Proper storage per package insert is important — traditional glucagon kits require refrigeration while some formulations can be stored at room temperature; check package insert and expiration date annually. Replace expired rescue kits promptly.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function GlucagonSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Glucagon rescue kits are safe and effective for their intended use — the compound itself has minimal toxicity in rescue doses. The dominant safety concern is the ABSENCE of glucagon rescue availability in an insulin user, not its presence. Pheochromocytoma is the primary contraindication (catecholamine release risk). Post-rescue hyperglycemia and nausea require management but are expected pharmacological effects. Glucagon rescue may be less effective in glycogen-depleted states (alcohol use, prolonged fasting) — EMS backup is essential if rescue does not work within 15 minutes.
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
