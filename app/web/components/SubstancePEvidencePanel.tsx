/**
 * SubstancePEvidencePanel — calibrated evidence for Substance P.
 * Key frame: SP pharmacology is extensively characterized (strong evidence for the
 * biology); NK1 antagonists (aprepitant) have robust FDA approval data; SP injection
 * for any therapeutic purpose has no supporting evidence because the mechanism
 * is counterproductive.
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
    id: "nk1-pharmacology",
    claim: "Substance P activates NK1 receptors and mediates pain signal transmission in C-fiber nociception",
    tier: "strong",
    tierLabel: "Strong — foundational neuroscience; characterized over 50+ years; not in dispute",
    body: "The role of substance P in pain signal transmission is one of the best-characterized peptide pharmacologies in neuroscience. SP was discovered by von Euler and Gaddum in 1931 and identified as a peptide by Chang and Leeman in 1970. Its role in C-fiber nociception (primary afferent pain signaling), dorsal horn transmission, and the NK1 receptor pharmacology has been established by decades of animal and human studies. The NK1 receptor was cloned and characterized in the early 1990s. SP's pro-nociceptive function — activating NK1 receptors on dorsal horn neurons to amplify pain signal transmission — is mechanistically established at a foundational level. This is not investigational — it is textbook neuropharmacology.",
    sources: "Chang and Leeman 1970 (SP isolation and sequence); Regoli et al. 1994 (tachykinin receptor classification); Hökfelt et al. 1975 (SP in primary afferents); Neugebauer 2015 (tachykinin review)",
  },
  {
    id: "neurogenic-inflammation",
    claim: "Substance P mediates neurogenic inflammation: vasodilation, plasma extravasation, mast cell degranulation",
    tier: "strong",
    tierLabel: "Strong — well-characterized peripheral mechanism; reproducible in animal and human studies",
    body: "The peripheral inflammatory effects of substance P are well characterized. SP released from C-fiber peripheral terminals causes: direct vasodilation via endothelial NK1R activation; plasma extravasation (edema) via postcapillary venule permeability; and mast cell degranulation (histamine, prostaglandins, leukotrienes release). This aggregate neurogenic inflammation response — the triple response of Lewis — is reproducible in human skin when SP or compound 48/80 (a mast cell degranulator) is injected. The SP role in the flare-and-wheal response is well-established. These effects are not subtle or subject to replication concerns — they are observable pharmacological endpoints with clear NK1R mechanistic basis.",
    sources: "Brain and Williams 1985 (SP and neurogenic inflammation review); Louis et al. 1989; Holzer 1998 (neurogenic inflammation mechanisms); Lewis triple response characterization",
  },
  {
    id: "nk1-antagonists-cinv",
    claim: "NK1 receptor antagonists (aprepitant, netupitant) prevent chemotherapy-induced nausea and vomiting",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; Phase 3 RCTs across multiple chemotherapy regimens; guideline-standard of care",
    body: "Aprepitant (Emend) received FDA approval in 2003 for prevention of acute and delayed CINV associated with highly emetogenic chemotherapy. Its approval was based on multiple Phase 3 trials showing significant superiority over ondansetron/dexamethasone alone for complete response rates (no emesis, no rescue medication). Netupitant (in fixed combination with palonosetron as Akynzeo/Netu-Palo) received FDA approval in 2014. NK1 antagonist + 5-HT3 antagonist + dexamethasone is the current guideline-standard triplet antiemetic regimen for highly emetogenic chemotherapy (ASCO, MASCC/ESMO guidelines). This is robust Phase 3 evidence with clear clinical deployment — the pharmacological direction (NK1 antagonism) is validated.",
    sources: "Hesketh et al. 2003 (aprepitant Phase 3 NEJM); Warr et al. 2005 (aprepitant delayed CINV); FDA NDA approval 2003; ASCO CINV guidelines; Akynzeo FDA approval 2014",
  },
  {
    id: "sp-fibromyalgia",
    claim: "Elevated CSF substance P levels are found in fibromyalgia and other chronic pain states",
    tier: "moderate",
    tierLabel: "Moderate — consistent observational finding; causality and therapeutic direction require interpretation",
    body: "Multiple studies have found elevated cerebrospinal fluid (CSF) substance P concentrations in patients with fibromyalgia compared to healthy controls. Similar findings have been reported in other chronic pain conditions including chronic low back pain and complex regional pain syndrome. The mechanistic interpretation is that central sensitization in chronic pain involves increased SP release in the dorsal horn and spinal cord — effectively turning up the pain amplification circuit. This is an argument for NK1 antagonist therapy in chronic pain (blocking the elevated SP signal), not for SP administration. The finding that elevated SP correlates with pain severity in fibromyalgia is reproducible but the therapeutic direction derived from it is antagonism.",
    sources: "Vaeroy et al. 1988 (SP in fibromyalgia CSF — original finding); Russell et al. 1994 (CSF SP fibromyalgia replication); Bradley et al. 1996; Clauw 2014 (fibromyalgia review)",
  },
  {
    id: "nk1-depression",
    claim: "NK1 receptor antagonists have antidepressant effects",
    tier: "moderate",
    tierLabel: "Moderate — early trials promising; Phase 3 results mixed; mechanism plausible",
    body: "The 1998 Science paper by Kramer et al. reported that the NK1 antagonist MK-869 (aprepitant) had antidepressant efficacy comparable to paroxetine in a Phase 2 trial with fewer sexual side effects. This generated substantial excitement about a non-monoamine antidepressant mechanism. Subsequent Phase 3 trials of NK1 antagonists for depression had mixed results — some showing efficacy, others not, with Merck ultimately abandoning the depression development program. Subsequent research with different NK1 antagonists (casopitant, vestipitant) produced inconsistent results. The mechanistic rationale (SP/NK1 in limbic system stress and mood circuits) remains scientifically interesting, and NK1 antagonist antidepressant development is ongoing in some programs. The evidence is promising but not established for a depression indication.",
    sources: "Kramer et al. 1998 (Science — NK1 antagonist MK-869 antidepressant); Rupniak 2002 (NK1 antagonist depression review); failed Phase 3 programs Merck; Keller et al. 2006",
  },
  {
    id: "sp-injection-therapeutic",
    claim: "Community injection of substance P produces a therapeutic benefit",
    tier: "none",
    tierLabel: "None — no evidence; mechanism predicts harm (pain and inflammation), not benefit",
    body: "There is no clinical evidence, research basis, or mechanistic rationale for community injection of substance P as a therapeutic compound. Every established aspect of SP pharmacology predicts that peripheral injection would produce pain, vasodilation, and neurogenic inflammation at the injection site — because NK1R activation in peripheral tissue is what SP does. No human trials have examined therapeutic SP injection for any wellness, recovery, or performance indication. No research group has proposed a therapeutic rationale for exogenous SP administration. This is not a compound where the evidence is sparse but promising — it is a compound where the mechanism itself predicts harm from injection.",
    sources: "Absence of any clinical evidence for therapeutic SP injection; SP pharmacological mechanism literature; standard tachykinin pharmacology references",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function SubstancePEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Substance P has one of the strongest underlying pharmacological evidence bases of any compound in this database — but the evidence strongly supports its role as a pain mediator and the therapeutic utility of its ANTAGONISTS, not its administration. The NK1 pharmacology is foundational neuroscience. Aprepitant (Emend) is FDA-approved with robust Phase 3 data. The NK1 antagonist antidepressant story is promising but mixed. Community injection of SP has no evidence base and a mechanism that predicts harm — this is the rare case where the pharmacological evidence is both strong and clearly directional against use.
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
