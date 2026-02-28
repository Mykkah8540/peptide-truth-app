/**
 * Follistatin344OverviewPanel — decision-oriented overview for Follistatin-344.
 * Key frame: myostatin/activin antagonist with dramatic animal data and near-zero
 * human trial data. The bodybuilding hype is real; the human evidence is not.
 * Cancer concern from activin suppression is mechanistically serious.
 */

const STAT_CARDS = [
  {
    value: "Myostatin / Activin antagonist",
    label: "mechanism — binds and neutralizes TGF-β superfamily ligands that limit muscle growth",
    sub: "Follistatin-344 is a 344-amino-acid splice variant of follistatin, a glycoprotein that binds myostatin (GDF-8) and activin A/B with high affinity. Myostatin is the primary brake on skeletal muscle growth — it limits muscle fiber size and number. Activin also suppresses muscle growth and has roles in reproductive function, inflammation, and tumor suppression. Follistatin binds these ligands and prevents them from signaling through their receptors (ActRIIB). The result: removal of the muscle growth brake.",
    note: "Follistatin's biological role is endogenous — it is produced in muscle, liver, and other tissues as a natural myostatin counter-regulator. The question is whether exogenous follistatin-344 injection meaningfully raises systemic follistatin levels and sustains myostatin blockade long enough to produce hypertrophy — and whether the off-target activin suppression creates problems that outweigh any muscle benefit.",
  },
  {
    value: "Transgenic + gene therapy data",
    label: "animal evidence — dramatic muscle hypertrophy in mouse/primate models; human injection data essentially absent",
    sub: "Mice and cattle with myostatin knockout or follistatin overexpression show dramatic muscle hypertrophy — sometimes doubling muscle mass. These are the iconic images that drive community interest. Primate gene therapy studies (AAV-delivered follistatin) showed significant muscle gains in non-human primates. One investigational gene therapy trial (Nationwide Children's, muscular dystrophy) used follistatin gene delivery — this is the closest to human data, and it is gene therapy in a disease context, not peptide injection.",
    note: "The animal and gene therapy data are real — myostatin/follistatin pathway manipulation does produce dramatic effects in controlled models. The gap is the injection pharmacology: does subcutaneous or intramuscular follistatin-344 peptide reach muscle tissue at sufficient concentrations, survive proteolytic degradation, and sustain ActRIIB blockade? This pharmacokinetic bridge from gene therapy and transgenic models to peptide injection is not established.",
  },
  {
    value: "Activin suppression — cancer concern",
    label: "the underappreciated risk — activin has tumor-suppressive roles; follistatin overexpression is found in multiple cancers",
    sub: "Follistatin does not selectively block myostatin — it also blocks activin A, activin B, and GDF-11, among other TGF-β ligands. Activin A has tumor-suppressive signaling in several cancer types (endometrial, ovarian, prostate, colorectal). Follistatin overexpression is observed in endometrial carcinoma, ovarian cancer, and prostate cancer — suggesting that cancer cells exploit follistatin to escape activin-mediated growth suppression. Using exogenous follistatin in someone with occult or active malignancy may remove an endogenous cancer brake.",
    note: "This is not theoretical — the connection between follistatin overexpression and cancer progression is documented in peer-reviewed oncology literature. The bodybuilding community largely ignores this concern because the animal/aesthetic evidence is compelling. The risk is not 'follistatin causes cancer' — it is 'follistatin removes an activin brake that exists to suppress certain cancer cell populations.' The distinction matters.",
  },
  {
    value: "Investigational",
    label: "regulatory status — no FDA approval; gene therapy trials in disease context; peptide form is gray-market",
    sub: "Follistatin has no FDA approval for any indication. The investigational gene therapy applications (AAV-follistatin) are for Duchenne/Becker muscular dystrophy and inclusion body myositis — serious neuromuscular diseases. The research peptide sold as 'Follistatin-344' is a compounded/gray-market product with unverified identity. Whether community products actually contain intact, bioactive follistatin-344 at stated purity is unknown — follistatin is a 344-amino-acid glycoprotein with disulfide bonds that is difficult to manufacture correctly.",
    note: "Product quality is a particularly serious concern for follistatin. It is a large, complex glycoprotein — not a simple short peptide. Most synthetic peptide manufacturers are not equipped to produce correctly folded, glycosylated full-length follistatin. Products sold as 'follistatin-344' may be partially misfolded, truncated, or simply inactive. The risk of paying for inactive product is higher than for most compounds in this category.",
  },
];

const FIT_YES = [
  "You have a diagnosed muscle-wasting condition (sarcopenia, muscular dystrophy, cachexia) and are working with a specialist who has reviewed follistatin as an investigational option — the disease-context evidence is more relevant here",
  "You understand the evidence ceiling: animal/gene therapy data is real; subcutaneous peptide injection data does not exist; you are treating this as extreme-edge investigational",
  "You have had recent full-panel cancer screening and have no personal or strong family history of hormone-sensitive cancers — activin suppression requires this baseline before considering",
  "You have a specific reason to suspect myostatin excess is limiting your response to training (rare myostatin mutations exist; this is not a common scenario)",
];

const FIT_NO = [
  "You have any active cancer diagnosis or are in remission — follistatin suppresses activin, which has tumor-suppressive roles in several cancer types; this is not a compound for cancer contexts",
  "You have estrogen-sensitive conditions, uterine fibroids, or PCOS — activin suppression has reproductive axis effects; follistatin modulates FSH and has downstream estrogen effects",
  "You are expecting results like the transgenic mouse images — the dramatic muscle doubling shown in knockout/gene therapy models requires sustained, systemic myostatin blockade that peptide injection may not achieve",
  "You have not had recent cancer screening — adding activin suppression without baseline cancer status is inadvisable given the documented cancer connection",
  "You are looking for a myostatin inhibitor with any human trial evidence — you should look at enobosarm (sarcopenia trials), bimagrumab (anti-ActRIIB antibody), or clinical-context options; follistatin-344 injection is not supported by human RCTs",
];

const TIMELINE = [
  {
    phase: "Immediate",
    heading: "Pharmacokinetic reality — large protein, limited bioavailability data",
    body: "Follistatin-344 is a 344-amino-acid glycoprotein. Subcutaneous injection of large proteins faces significant challenges: enzymatic degradation at the injection site, limited lymphatic uptake, neutralization by endogenous binding proteins. Whether injected follistatin-344 reaches circulating levels sufficient to measurably suppress myostatin is not established in human pharmacokinetic studies. The half-life of injected follistatin in humans is not characterized.",
  },
  {
    phase: "Weeks to months",
    heading: "Muscle response — if bioavailability is achieved",
    body: "If sufficient follistatin reaches muscle tissue and sustains ActRIIB ligand blockade, myostatin suppression would theoretically shift the muscle protein synthesis/breakdown balance toward hypertrophy. The timeline for visible muscle effects in responders (if any) would likely require weeks of consistent dosing. No human data characterizes this timeline. Community reports are anecdotal and confounded by training, nutrition, and concurrent compound use.",
  },
  {
    phase: "Long-term concern",
    heading: "Activin suppression — reproductive and oncological consequences",
    body: "Activin A and B regulate FSH secretion (activin stimulates FSH; follistatin suppresses FSH). Long-term follistatin use would be expected to suppress FSH, potentially reducing sperm production in males and disrupting the menstrual cycle in females. The oncological concern (activin escape in occult cancers) is not acutely symptomatic — it would manifest as progression of cancer that would otherwise have been suppressed. Neither of these long-term consequences is characterized in the injection peptide context.",
  },
];

const COMPARISON = [
  {
    name: "Follistatin-344",
    badge: "TGF-β antagonist / Investigational peptide",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Binds myostatin + activin A/B → ActRIIB ligand blockade → removes muscle growth brake" },
      { label: "Evidence", value: "Transgenic models (dramatic); primate gene therapy (significant); human peptide injection (absent)" },
      { label: "Cancer concern", value: "High — activin suppression documented in cancer progression pathways" },
      { label: "FSH/fertility impact", value: "Expected — activin regulates FSH; long-term suppression likely" },
      { label: "Status", value: "No FDA approval; gray-market peptide; gene therapy in clinical trials (disease context)" },
    ],
    highlight: true,
  },
  {
    name: "Bimagrumab",
    badge: "Anti-ActRIIB antibody / Clinical development",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Anti-ActRIIB monoclonal antibody — blocks receptor, not ligands; affects same downstream pathway" },
      { label: "Evidence", value: "Phase 2 RCT data in obesity/sarcopenia; muscle gain + fat loss in human trials" },
      { label: "Cancer concern", value: "Present — same pathway; less characterized than follistatin (receptor vs. ligand blockade differs)" },
      { label: "FSH/fertility impact", value: "Less direct — receptor blockade affects ActRIIB signaling but follistatin's ligand binding affects more pathways" },
      { label: "Status", value: "Investigational — not FDA-approved; clinical trial access only" },
    ],
    highlight: false,
  },
  {
    name: "Myostatin propeptide / YK11",
    badge: "Myostatin-specific antagonist / Research compound",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Myostatin propeptide: binds myostatin specifically (not activin). YK11: myostatin inhibitor + SARM activity" },
      { label: "Evidence", value: "Animal models; no human trial data for either; YK11 has significant androgen receptor risk" },
      { label: "Cancer concern", value: "Lower for propeptide (myostatin-specific; activin not suppressed). YK11 has androgen-related cancer concerns." },
      { label: "FSH/fertility impact", value: "Myostatin propeptide: minimal (FSH not affected). YK11: androgen axis suppression expected." },
      { label: "Status", value: "Both gray-market research compounds; no clinical development pathway" },
    ],
    highlight: false,
  },
];

export default function Follistatin344OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Compelling animal data, near-zero human peptide evidence, and an activin suppression risk profile that the bodybuilding community systematically underweights.
        </div>
        <div className="reta-overview__headline-sub">
          Follistatin-344 blocks myostatin and activin — the TGF-β superfamily ligands that limit muscle growth. Transgenic mouse and primate gene therapy data show dramatic muscle hypertrophy. The gap: none of that evidence comes from subcutaneous peptide injection in humans. The pharmacokinetic bridge from gene therapy models to injected peptide does not exist. The activin suppression concern is real and documented in oncology literature — activin has tumor-suppressive roles in several cancer types, and follistatin overexpression is found in multiple cancers. This is not a compound to approach casually.
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="reta-overview__stats">
        {STAT_CARDS.map((s) => (
          <div key={s.value} className="reta-overview__stat">
            <div className="reta-overview__stat-value">{s.value}</div>
            <div className="reta-overview__stat-label">{s.label}</div>
            <div className="reta-overview__stat-sub">{s.sub}</div>
            <div className="reta-overview__stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Fit matrix ── */}
      <div className="reta-overview__section-label">Is this the right call for you?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✓</span> Fits your situation if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✗</span> Look elsewhere if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to actually expect</div>
      <div className="reta-overview__timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className="reta-overview__timeline-item">
            <div className="reta-overview__timeline-phase">{t.phase}</div>
            <div className="reta-overview__timeline-heading">{t.heading}</div>
            <div className="reta-overview__timeline-body">{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <div className="reta-overview__section-label">Follistatin-344 vs Bimagrumab vs Myostatin Propeptide</div>
      <div className="reta-overview__compare-note">
        Three approaches to myostatin pathway inhibition. Follistatin-344 acts as a ligand trap (myostatin + activin). Bimagrumab blocks the receptor (ActRIIB). Myostatin propeptide is more specific. Only bimagrumab has human RCT data. All carry the limitation that the dramatic muscle effects from transgenic/gene therapy models have not translated to peptide/antibody injection in healthy humans.
      </div>
      <div className="reta-overview__compare">
        {COMPARISON.map((col) => (
          <div
            key={col.name}
            className={`reta-overview__compare-col${col.highlight ? " reta-overview__compare-col--active" : ""}`}
          >
            <div className="reta-overview__compare-name">
              {col.name}
              <span
                className="reta-overview__compare-badge"
                style={{ color: col.badgeColor, background: col.badgeBg }}
              >
                {col.badge}
              </span>
            </div>
            {col.rows.map((row) => (
              <div key={row.label} className="reta-overview__compare-row">
                <div className="reta-overview__compare-row-label">{row.label}</div>
                <div className="reta-overview__compare-row-value">{row.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
