"use client";

/**
 * Endothelin1InteractionsPanel — interaction intelligence for ERA medications.
 * Key frame: interactions here are for ERA drugs (bosentan, ambrisentan, macitentan),
 * NOT for exogenous ET-1 (which has no legitimate use as an agonist).
 * Primary concerns: cyclosporine (contraindicated with bosentan), CYP3A4/2C9 substrates,
 * hormonal contraceptives, and PAH co-medications.
 */

import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";

interface Entry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  tier: Tier;
  summary: string;
  mitigation: string[];
}

const INTERACTIONS: Entry[] = [
  {
    id: "cyclosporine",
    name: "Cyclosporine A (Sandimmune, Neoral, Gengraf)",
    aliases: ["cyclosporine", "cyclosporin", "Sandimmune", "Neoral", "Gengraf", "calcineurin inhibitor", "tacrolimus"],
    category: "Immunosuppressants",
    tier: "flag",
    summary: "Contraindicated with bosentan \u2014 major bidirectional interaction via CYP3A4 and OATP1B1 transporters. Cyclosporine inhibits OATP1B1 uptake of bosentan into the liver while also inhibiting CYP3A4 metabolism, raising bosentan plasma levels approximately 30-fold. Simultaneously, bosentan as a CYP3A4 inducer reduces cyclosporine levels. The net result: dramatically elevated bosentan exposure (toxicity risk) and unpredictably reduced cyclosporine levels (immunosuppression failure risk in transplant patients).",
    mitigation: [
      "Bosentan + cyclosporine is absolutely contraindicated \u2014 not a dose-adjustment situation",
      "If PAH occurs in a transplant patient on cyclosporine, alternative ERAs (ambrisentan, macitentan) have less severe interactions and may be considered with specialist guidance",
      "Ambrisentan does not significantly induce CYP3A4 and has a more manageable interaction profile with cyclosporine compared to bosentan",
      "Tacrolimus has similar transporter-mediated interaction risks with bosentan; monitor tacrolimus levels closely if bosentan is used",
    ],
  },
  {
    id: "hormonal-contraceptives",
    name: "Hormonal contraceptives",
    aliases: ["birth control pill", "oral contraceptive", "OCP", "estrogen", "progesterone", "Yaz", "Yasmin", "NuvaRing", "patch", "Nexplanon", "implant", "depo", "Depo-Provera", "levonorgestrel", "norethindrone"],
    category: "Reproductive / Hormonal",
    tier: "flag",
    summary: "Bosentan reduces hormonal contraceptive efficacy through CYP3A4 and CYP2C9 induction, which accelerates metabolism of ethinyl estradiol and progestin components. This is a critical safety concern given that all ERAs are pregnancy category X (teratogenic). Relying on hormonal contraception alone while on bosentan is pharmacologically inadequate \u2014 the REMS programs for bosentan explicitly require two reliable contraceptive methods, one of which must be a barrier method.",
    mitigation: [
      "Never rely on hormonal contraception alone during bosentan therapy \u2014 two methods are required by the Tracleer REMS program",
      "Copper IUD or barrier method (condom, diaphragm with spermicide) as a non-hormonal option in addition to any hormonal method",
      "Levonorgestrel IUD (Mirena): lower systemic hormone exposure; less affected by CYP induction than oral pills \u2014 may be suitable as a primary method with a backup",
      "Ambrisentan and macitentan have lower CYP induction burden than bosentan; discuss contraceptive plan with prescriber for any ERA",
      "Monthly pregnancy testing is required by REMS programs for all ERAs in women of reproductive potential",
    ],
  },
  {
    id: "rifampin",
    name: "Rifampin (Rifadin) and rifamycin antibiotics",
    aliases: ["rifampin", "rifampicin", "Rifadin", "rifabutin", "rifapentine", "rifaximin", "rifamycin"],
    category: "Antibiotics / Antimycobacterials",
    tier: "flag",
    summary: "Rifampin is a potent CYP3A4 inducer that dramatically reduces macitentan and ambrisentan plasma levels, likely rendering ERA therapy ineffective for PAH control. Bosentan levels are also further reduced, though bosentan itself is also a CYP inducer. For patients on rifampin-based tuberculosis regimens who also have PAH, ERA efficacy is severely compromised.",
    mitigation: [
      "Concurrent rifampin + ERA therapy is expected to substantially reduce ERA efficacy \u2014 specialist management required",
      "Alternative antibiotics for tuberculosis or other indications should be considered where possible in ERA-treated PAH patients",
      "If rifampin cannot be avoided, close PAH hemodynamic monitoring is required; ERA dose escalation may be considered under specialist guidance",
    ],
  },
  {
    id: "riociguat",
    name: "Riociguat (Adempas)",
    aliases: ["riociguat", "Adempas", "soluble guanylate cyclase stimulator", "sGC stimulator"],
    category: "PAH Medications",
    tier: "watch",
    summary: "ERA + riociguat is an emerging combination approach in PAH. Riociguat acts on the NO/cGMP pathway (soluble guanylate cyclase stimulator) \u2014 a different pathway than ERAs. Combination is pharmacologically complementary. Riociguat is absolutely contraindicated with PDE5 inhibitors (sildenafil, tadalafil) due to severe combined hypotension \u2014 this is not an ERA interaction, but PAH patients who switch between pathway combinations need to understand it. Bosentan reduces riociguat exposure via CYP3A4 induction; dose adjustment of riociguat may be needed.",
    mitigation: [
      "ERA + riociguat combination is a specialist decision for PAH patients with inadequate response to PDE5 inhibitor + ERA",
      "NEVER combine riociguat with sildenafil or tadalafil \u2014 severe hypotension risk; this contraindication is absolute",
      "Bosentan reduces riociguat plasma levels; riociguat dose may need upward titration when used with bosentan",
      "Blood pressure monitoring is important during ERA + riociguat initiation and titration",
    ],
  },
  {
    id: "pde5-inhibitors",
    name: "PDE5 inhibitors (sildenafil, tadalafil)",
    aliases: ["sildenafil", "tadalafil", "Revatio", "Adcirca", "Cialis", "Viagra", "PDE5 inhibitor", "phosphodiesterase inhibitor"],
    category: "PAH Medications",
    tier: "watch",
    summary: "ERA + PDE5 inhibitor is standard combination therapy in PAH. Bosentan reduces sildenafil plasma levels by approximately 50% through CYP3A4 induction \u2014 higher sildenafil doses or tadalafil (less CYP3A4-sensitive) may be preferred in combination with bosentan. Ambrisentan + tadalafil (AMBITION trial) showed superiority over monotherapy with favorable tolerability. The interaction is manageable; the combination is recommended.",
    mitigation: [
      "ERA + PDE5 inhibitor is guideline-recommended combination therapy in PAH \u2014 the interaction is manageable, not a contraindication",
      "When combining bosentan with sildenafil: sildenafil levels are reduced ~50%; consider tadalafil instead for less CYP3A4-mediated reduction",
      "Ambrisentan + tadalafil: the AMBITION trial combination; lower CYP interaction burden than bosentan + sildenafil",
      "Blood pressure monitoring during initiation; combined vasodilatory effects can cause symptomatic hypotension especially with volume depletion",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin (Coumadin, Jantoven)",
    aliases: ["warfarin", "Coumadin", "Jantoven", "anticoagulant", "blood thinner", "INR", "vitamin K antagonist"],
    category: "Anticoagulants",
    tier: "watch",
    summary: "Bosentan induces CYP2C9, which is the primary enzyme metabolizing the active S-warfarin enantiomer. Bosentan initiation typically reduces warfarin\u2019s anticoagulant effect (INR decreases), requiring warfarin dose increase to maintain therapeutic INR. Many PAH patients are anticoagulated (historically recommended in idiopathic PAH, though evidence has evolved); this interaction requires close INR monitoring during bosentan initiation, dose changes, and discontinuation.",
    mitigation: [
      "Intensify INR monitoring during bosentan initiation and any bosentan dose changes \u2014 weekly initially until stable INR is re-established",
      "Expect INR decrease (warfarin effect reduced) with bosentan initiation; warfarin dose will likely need to increase",
      "If bosentan is discontinued, the inductive effect is lost \u2014 INR will rise; reduce warfarin dose and monitor closely",
      "Ambrisentan and macitentan have substantially lower CYP2C9 induction; switch from bosentan may reduce warfarin interaction burden",
    ],
  },
  {
    id: "statins",
    name: "Statins (simvastatin, atorvastatin, rosuvastatin)",
    aliases: ["statin", "simvastatin", "atorvastatin", "rosuvastatin", "Zocor", "Lipitor", "Crestor", "pravastatin", "fluvastatin", "HMG-CoA reductase inhibitor"],
    category: "Cardiovascular",
    tier: "watch",
    summary: "Bosentan reduces plasma levels of simvastatin and atorvastatin (both CYP3A4 substrates) through enzyme induction, potentially reducing their lipid-lowering efficacy. Simvastatin levels are reduced by approximately 50% with bosentan co-administration. Rosuvastatin and pravastatin (not primarily CYP3A4 substrates) are less affected and may be preferred in patients on bosentan who require statin therapy.",
    mitigation: [
      "Prefer rosuvastatin or pravastatin over simvastatin or atorvastatin in patients on bosentan if statin therapy is needed",
      "If simvastatin or atorvastatin are continued with bosentan, lipid monitoring to confirm efficacy is appropriate",
      "Ambrisentan and macitentan have lower statin interaction potential than bosentan",
    ],
  },
  {
    id: "azole-antifungals",
    name: "Azole antifungals (fluconazole, ketoconazole, itraconazole)",
    aliases: ["fluconazole", "ketoconazole", "itraconazole", "voriconazole", "Diflucan", "Nizoral", "Sporanox", "antifungal", "azole"],
    category: "Antifungals",
    tier: "watch",
    summary: "Azole antifungals are CYP3A4 inhibitors that can increase ERA plasma levels. Fluconazole is also a potent CYP2C9 inhibitor, which increases bosentan exposure (bosentan is partially CYP2C9-metabolized). Elevated ERA levels increase hepatotoxicity risk. The clinical significance depends on the specific ERA and azole used, but monitoring is appropriate during any concurrent azole course.",
    mitigation: [
      "Monitor for ERA side effects (edema, hepatotoxicity symptoms) during azole antifungal courses",
      "Check liver function tests if azole treatment is prolonged during ERA therapy",
      "Fluconazole + bosentan: increased bosentan levels via CYP2C9 inhibition; hepatotoxicity monitoring is prudent",
      "Discuss azole antifungal choice with pharmacist or prescriber \u2014 some azoles have more CYP interaction burden than others",
    ],
  },
  {
    id: "prostacyclins",
    name: "Prostacyclin analogues (treprostinil, iloprost, epoprostenol, selexipag)",
    aliases: ["treprostinil", "Remodulin", "Tyvaso", "iloprost", "Ventavis", "epoprostenol", "Flolan", "selexipag", "Uptravi", "prostacyclin", "prostanoid"],
    category: "PAH Medications",
    tier: "low",
    summary: "ERA + prostacyclin combination is advanced therapy for PAH patients with inadequate response to oral combination therapy. The combination addresses three distinct pathways simultaneously: ET-1 pathway (ERA), NO/cGMP pathway (PDE5 inhibitor or riociguat), and prostacyclin pathway (prostacyclin analogue or receptor agonist). No pharmacokinetic interactions of clinical significance exist between ERAs and prostacyclin analogues. Combined vasodilatory effect on systemic blood pressure requires monitoring.",
    mitigation: [
      "ERA + prostacyclin combination is specialist-managed in PAH centers; no direct pharmacokinetic interactions of significance",
      "Blood pressure and right heart function monitoring during initiation of any additional PAH therapy",
      "Selexipag (Uptravi, an oral prostacyclin receptor agonist) is metabolized by CYP3A4 and CYP2C8; bosentan may reduce selexipag levels \u2014 discuss with prescriber",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle / Recreational",
    tier: "low",
    summary: "Alcohol is independently hepatotoxic and may amplify ERA-related liver toxicity risk, particularly with bosentan. In patients on bosentan with its black box hepatotoxicity warning, alcohol adds additional hepatic burden. No direct pharmacokinetic interaction between alcohol and ERAs, but the combined hepatic stress is a reasonable concern during bosentan therapy.",
    mitigation: [
      "Minimize alcohol consumption during bosentan therapy given the additive hepatic burden with bosentan\u2019s hepatotoxicity risk",
      "Heavy alcohol use should be disclosed to the prescriber \u2014 it may be a reason to prefer ambrisentan or macitentan over bosentan",
      "Liver function test elevation during bosentan therapy warrants evaluation for alcohol-related contribution",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Endothelin1InteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return e.name.toLowerCase().includes(q) || e.aliases.some((a) => a.toLowerCase().includes(q)) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Interactions here cover ERA medications (bosentan, ambrisentan, macitentan) \u2014 the drugs used to block ET-1 in PAH. Bosentan has the highest drug interaction burden of the three due to strong CYP3A4/2C9 induction: cyclosporine is contraindicated, hormonal contraceptives alone are insufficient, and many co-medications have reduced efficacy. Ambrisentan and macitentan have lower induction burden. If you are on an ERA, a full medication reconciliation with your pharmacist or prescriber is essential.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="reta-interactions__cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`reta-interactions__cat${activeCat === cat ? " reta-interactions__cat--active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">No interactions found for that search.</div>
        ) : (
          results.map((entry) => {
            const st = TIER_STYLE[entry.tier];
            return (
              <div key={entry.id} className="reta-interactions__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span className="reta-interactions__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</span>
                  </div>
                </div>
                <div className="reta-interactions__entry-summary">{entry.summary}</div>
                <ul className="reta-interactions__entry-mit">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
