/**
 * LanreotideSafetyPanel — proactive safety intelligence for lanreotide.
 * Key frame: GI effects are front-loaded and class-effect.
 * Cholelithiasis is the key long-term monitoring target.
 * Glucose effects are bidirectional depending on baseline condition.
 * Bradycardia: mild, class effect.
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
    heading: "GI effects \u2014 nausea, diarrhea, steatorrhea, flatulence, abdominal pain",
    tier: "watch",
    body: "Gastrointestinal symptoms are the most common adverse effects of lanreotide and are a class effect of somatostatin analogues. They result from reduced gastrointestinal and pancreatic secretion (somatostatin inhibits secretin, CCK, pancreatic enzymes, and intestinal motility). Nausea and loose stools are most common in the first weeks of therapy and typically improve over 1\u20133 months as the GI tract adapts. Steatorrhea (fat malabsorption due to reduced pancreatic lipase secretion) can be persistent and may cause weight loss or nutritional deficiencies. Diarrhea in patients with carcinoid syndrome may paradoxically improve (because the tumor\u2019s serotonin secretion is being suppressed) while diarrhea in non-carcinoid patients is more likely drug-related.",
    context: "For GI adaptation: low-fat diet reduces steatorrhea during the adaptation period. Smaller, more frequent meals reduce nausea. Pancreatic enzyme supplementation (pancrelipase) can be added for persistent steatorrhea. Persistent GI symptoms after 3 months should prompt evaluation for bile acid malabsorption (exacerbated by cholelithiasis and reduced bile flow) and nutritional assessment. In GEP-NET patients, distinguishing drug-related diarrhea from tumor-related diarrhea (carcinoid) requires clinical judgment and 5-HIAA monitoring.",
  },
  {
    id: "cholelithiasis",
    heading: "Cholelithiasis (gallstones) \u2014 SSTR2 agonism reduces gallbladder motility; monitor with ultrasound",
    tier: "watch",
    body: "Gallstone formation is a well-established, class-specific adverse effect of somatostatin analogues. SSTR2 agonism reduces gallbladder contractility, impairing normal bile emptying between meals. Bile becomes concentrated and supersaturated with cholesterol, promoting gallstone nucleation and growth. Prevalence of cholelithiasis increases with duration of SSA therapy: in long-term octreotide studies, approximately 50% of patients develop gallstones after several years. Most are asymptomatic sludge or small stones; symptomatic cholecystitis requiring cholecystectomy occurs in a minority. Pre-existing gallstone disease (even asymptomatic) is worsened by SSA therapy.",
    context: "Monitoring protocol: baseline gallbladder ultrasound before starting lanreotide (document pre-existing disease). Repeat ultrasound every 6\u201312 months during therapy or if biliary symptoms develop (right upper quadrant pain, nausea after fatty meals). Ursodeoxycholic acid (UDCA) is sometimes prescribed prophylactically or for asymptomatic sludge/small stones during SSA therapy, though evidence for prevention is limited. Symptomatic cholecystitis during lanreotide therapy requires surgical consultation; laparoscopic cholecystectomy is appropriate if stones are symptomatic and therapy must continue.",
  },
  {
    id: "glucose-effects",
    heading: "Glucose metabolism \u2014 bidirectional effects; worsening or improvement depending on baseline",
    tier: "watch",
    body: "Lanreotide has complex, bidirectional effects on glucose. SSTR2/5 agonism inhibits insulin secretion (raising glucose) and inhibits glucagon secretion (lowering glucose). The net effect depends on baseline: in acromegaly, where GH-induced insulin resistance is the dominant glucose-dysregulating factor, GH suppression from lanreotide often IMPROVES glucose tolerance (reduction in GH-driven insulin resistance outweighs insulin secretion inhibition). In patients without acromegaly (e.g., NETs), lanreotide more commonly causes WORSENING of glucose control through insulin secretion inhibition. New-onset hyperglycemia or worsening diabetes requiring medication adjustment is a recognized complication of SSA therapy.",
    context: "Baseline fasting glucose and HbA1c before starting lanreotide. In patients with pre-existing diabetes: anticipate possible worsening; increase glucose monitoring frequency during the first 3 months; diabetes medication dose adjustment (often upward) may be required. In acromegaly patients: glucose typically improves; watch for hypoglycemia if the patient is on insulin or secretagogues for acromegaly-induced diabetes that may now be over-treated. Communicate glucose monitoring plan with endocrinologist at initiation.",
  },
  {
    id: "bradycardia",
    heading: "Bradycardia and QT effects \u2014 mild class effect; clinically relevant in susceptible patients",
    tier: "low",
    body: "Somatostatin analogues can cause sinus bradycardia (heart rate reduction) via a class effect. In clinical trials, bradycardia is reported in approximately 3\u20135% of lanreotide patients; it is usually mild and asymptomatic. The mechanism involves somatostatin receptor-mediated effects on cardiac pacemaker cells and autonomic tone. Minor QT prolongation has been reported as a class effect but is not typically clinically significant at recommended doses in patients without pre-existing cardiac conduction disease. In acromegaly patients with pre-existing cardiomyopathy (a common complication of chronic GH excess), baseline cardiac evaluation is important.",
    context: "Baseline EKG is reasonable, particularly in acromegaly patients with known cardiomyopathy or conduction disease. In patients on other medications that prolong QT or reduce heart rate (beta-blockers, digoxin, antiarrhythmics), the additive effect on heart rate or QT should be considered. Symptomatic bradycardia during lanreotide therapy (dizziness, syncope, exertional limitation) warrants EKG and cardiology evaluation.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function LanreotideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Lanreotide\u2019s safety profile is well-characterized from large clinical trials and long-term clinical use. GI effects are common and front-loaded but usually manageable. Cholelithiasis is the key long-term monitoring concern \u2014 gallbladder ultrasound at baseline and periodically during therapy is a clinical standard. Glucose effects are real and bidirectional \u2014 direction depends on baseline. Bradycardia is mild. No \u201cstop signal\u201d concerns in patients with appropriate monitoring \u2014 this is a well-tolerated drug in the context of its approved indications.
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
