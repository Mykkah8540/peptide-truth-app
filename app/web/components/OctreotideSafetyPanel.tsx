/**
 * OctreotideSafetyPanel — proactive safety intelligence for Octreotide (Sandostatin).
 * Key frame: well-characterized class effects (GI, gallstones, glucose, cardiac).
 * Same class as lanreotide — same SSTR2-mediated safety mechanism profile.
 * Physician-managed monitoring is not optional; these are real surveillance endpoints.
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
    id: "gi-effects",
    heading: "GI effects \u2014 nausea, diarrhea, steatorrhea, abdominal cramping",
    tier: "watch",
    body: "GI adverse effects are the most common octreotide class effect and occur in 30\u201360% of patients, particularly early in treatment or after dose increases. SSTR2 agonism in the GI tract reduces motility, suppresses pancreatic enzyme secretion (contributing to fat malabsorption and steatorrhea), and alters GI hormone secretion. Diarrhea can occur paradoxically despite GI motility reduction via steatorrhea-related osmotic load.",
    context: "GI effects typically improve after weeks of treatment as tolerance develops to the acute GI effects. Dose timing in relation to meals affects GI tolerability: injecting 2 hours before or after meals reduces GI side effect burden. Steatorrhea may require pancreatic enzyme supplementation in chronic use.",
  },
  {
    id: "cholelithiasis",
    heading: "Cholelithiasis (gallstones) \u2014 15\u201320% rate in chronic use",
    tier: "watch",
    body: "Gallstone formation is the most important long-term safety concern for chronic octreotide use. SSTR2 agonism in the gallbladder reduces CCK-stimulated gallbladder motility, causing bile stasis \u2014 the same mechanism as lanreotide. Cumulative gallstone rate is 15\u201320% at 2 years of treatment. Most are asymptomatic cholesterol stones detected on surveillance imaging. Symptomatic cholelithiasis requiring cholecystectomy occurs in approximately 5\u201310% of chronic users.",
    context: "Annual gallbladder ultrasound is the standard monitoring approach in chronic octreotide use. Prophylactic ursodeoxycholic acid (UDCA) is sometimes prescribed to reduce cholesterol stone precipitation. This is a physician-managed monitoring endpoint \u2014 not self-monitored.",
  },
  {
    id: "glucose-effects",
    heading: "Glucose effects \u2014 bidirectional, requires monitoring",
    tier: "watch",
    body: "Octreotide has bidirectional effects on glucose metabolism via SSTR2/5 suppression of insulin and glucagon secretion. In most patients, insulin suppression predominates, causing mild hyperglycemia or worsening glucose control in diabetics. In some patients, glucagon suppression plus reduced counterregulatory response creates hypoglycemia risk \u2014 particularly in insulinoma (octreotide can paradoxically worsen hypoglycemia in insulinoma). In acromegaly, lowering IGF-1 may actually improve insulin sensitivity as part of the disease normalization.",
    context: "Glucose monitoring is standard in octreotide management, particularly for patients with existing diabetes or prediabetes. In acromegaly, the net glucose effect depends on the balance between insulin suppression (adverse) and GH/IGF-1 normalization (beneficial). HbA1c monitoring is recommended at baseline and during treatment.",
  },
  {
    id: "bradycardia",
    heading: "Bradycardia and cardiac conduction effects",
    tier: "low",
    body: "Somatostatin receptor agonism has documented cardiac effects including bradycardia, prolonged PR interval, and less commonly QT changes. The cardiac effects are generally mild and clinically significant only in patients with underlying cardiac conduction abnormalities or on other drugs that slow conduction. This is a class effect across all SSAs.",
    context: "Baseline ECG is reasonable before initiating octreotide in patients with known cardiac disease or on QT-prolonging medications. The cardiac effect is generally not a management barrier in most patients but warrants awareness.",
  },
  {
    id: "hypothyroidism",
    heading: "Hypothyroidism \u2014 TSH suppression in chronic use",
    tier: "low",
    body: "Octreotide suppresses TSH secretion (somatostatin inhibits TSH release from the pituitary). In chronic use, this can contribute to subclinical or overt hypothyroidism. The effect is generally mild and managed with thyroid function monitoring and levothyroxine supplementation if indicated.",
    context: "TSH and free T4 should be monitored at baseline and periodically during chronic octreotide treatment, particularly in patients with borderline thyroid function or on thyroid medications.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

const RED_LINES = [
  {
    signal: "Symptomatic gallstones (right upper quadrant pain, jaundice, fever)",
    action: "Stop octreotide and seek medical evaluation. Acute cholecystitis or choledocholithiasis are surgical emergencies. Do not manage independently.",
  },
  {
    signal: "Insulinoma and hypoglycemia worsening on octreotide",
    action: "Octreotide can paradoxically worsen hypoglycemia in insulinoma by suppressing glucagon (counterregulatory) more than insulin. Stop and reassess with your endocrinologist. The octreotide scan predicts which insulinomas will respond to GH suppression vs worsen.",
  },
  {
    signal: "Significant bradycardia or symptomatic conduction changes",
    action: "Stop and obtain an ECG. If HR < 50 or symptomatic (dizziness, syncope), seek emergency evaluation. Particularly important if on other drugs affecting heart rate (beta-blockers, calcium channel blockers, digoxin).",
  },
  {
    signal: "Using octreotide to suppress GH while on GH secretagogues",
    action: "Stop one or the other. You cannot pursue GH optimization and GH suppression simultaneously. These are pharmacological opposites. Consult with your endocrinologist about your actual treatment goal.",
  },
  {
    signal: "Self-administering octreotide for longevity or IGF-1 suppression without a clinical indication",
    action: "Stop and reassess the rationale. GH suppression in a GH-normal person produces adverse body composition (increased fat mass, decreased muscle mass), metabolic effects, and quality of life changes consistent with GH deficiency \u2014 not a longevity benefit.",
  },
];

export default function OctreotideSafetyPanel() {
  return (
    <div className="reta-safety">

      <div>
        <div className="reta-safety__section-label">What actually happens \u2014 and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SAFETY_ITEMS.map((item) => {
            const st = TIER_STYLE[item.tier];
            return (
              <div
                key={item.id}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{item.heading}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-note">{item.body}</div>
                <div className="reta-safety__effect-detail">{item.context}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reta-safety__redlines-block">
        <div className="reta-safety__section-label" style={{ opacity: 1, color: "#9e3800" }}>
          When to stop and get help
        </div>
        <div className="reta-safety__redlines-sub">
          These aren&apos;t &ldquo;maybe check in with your doctor&rdquo; situations. They&apos;re stop-now signals.
        </div>
        <div className="reta-safety__redlines">
          {RED_LINES.map((r, i) => (
            <div key={i} className="reta-safety__redline">
              <div className="reta-safety__redline-signal">{r.signal}</div>
              <div className="reta-safety__redline-action">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          Octreotide has a well-characterized and manageable safety profile in its approved indications under physician supervision. The class effects (GI, gallstones, glucose) are real but predictable and monitorable. For patients with acromegaly, carcinoid syndrome, or VIPomas, the risk-benefit calculation clearly favors treatment \u2014 the underlying diseases carry significant morbidity that octreotide addresses.
        </p>
        <p>
          The safety calculus is entirely different for off-label non-indication use: suppressing GH in a GH-normal person for longevity framing creates the adverse effects without the offsetting disease-control benefit. The monitoring requirements (gallbladder ultrasound, glucose, cardiac) exist because the risks are real. Without a clinical indication justifying them, those risks are simply costs without benefits.
        </p>
      </div>

    </div>
  );
}
