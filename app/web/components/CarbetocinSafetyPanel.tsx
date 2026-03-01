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
    id: "hypotension-tachy",
    heading: "Hypotension and tachycardia \u2014 vasodilatory effects via oxytocin receptors",
    tier: "watch",
    body:
      "Carbetocin, like oxytocin, activates oxytocin receptors on vascular smooth muscle, producing " +
      "vasodilation, transient hypotension, and reflex tachycardia. In the CHAMPION trial, hypotension " +
      "was reported in a meaningful proportion of patients. The effect is typically transient and " +
      "self-limiting given the obstetric context (IV bolus), but patients with baseline hemodynamic " +
      "instability or cardiac disease require closer monitoring.",
    context:
      "Carbetocin is administered in a hospital operating room setting where BP and heart rate " +
      "monitoring is standard. If you are scheduled for a cesarean delivery and have pre-existing " +
      "cardiovascular conditions, discuss the choice of uterotonic agent with your obstetric team " +
      "in advance.",
  },
  {
    id: "nausea-flushing",
    heading: "Nausea, vomiting, and flushing \u2014 common but transient",
    tier: "watch",
    body:
      "Nausea, vomiting, facial flushing, headache, and abdominal pain are the most commonly " +
      "reported adverse effects of carbetocin in clinical trials, occurring in 10\u201330% of " +
      "patients depending on the definition and population. These are class effects shared with " +
      "oxytocin and other uterotonics. They are generally short-lived and do not require dose " +
      "modification in the obstetric setting, though they add to post-operative discomfort.",
    context:
      "These side effects are expected and manageable in the operating room. Antiemetics " +
      "(ondansetron, metoclopramide) are routinely co-administered with uterotonics during " +
      "cesarean delivery and help mitigate nausea. Inform your anesthesiologist if you have " +
      "a history of severe postoperative nausea.",
  },
  {
    id: "single-dose-safety",
    heading: "Single-dose obstetric use \u2014 well-characterized safety profile",
    tier: "low",
    body:
      "In the obstetric context, carbetocin is administered as a single IV bolus at the time of " +
      "cord clamping or immediately after delivery of the baby. This single-dose, monitored " +
      "setting means most adverse effects are rapidly identifiable and manageable. Long-term " +
      "or repeated exposure safety is not a concern given the indication. No teratogenicity data " +
      "are relevant (it is given after delivery).",
    context:
      "Carbetocin\u2019s safety in the obstetric context is supported by the largest uterotonic " +
      "RCT ever conducted (CHAMPION, n=29,645). For the vast majority of patients undergoing " +
      "planned cesarean delivery, it represents a safe and practical option where approved.",
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

export default function CarbetocinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Carbetocin safety data come exclusively from the obstetric setting. It is administered as a
        single monitored IV bolus. There is no community-use or off-label safety dimension to address.
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
