export default function BivalirudinOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Bivalirudin (Angiomax) is a synthetic peptide used in hospitals to prevent dangerous clotting during heart procedures — it grabs thrombin, the key clot-building protein, and shuts it down precisely and temporarily. It&rsquo;s an intravenous drug administered in cardiac catheterization labs, with no community use, no off-label enhancement application, and no reason for anyone outside of a medical context to encounter it as a therapeutic. This page is for understanding the pharmacology.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient or Caregiver — Going through a cardiac procedure and wanting to understand what&rsquo;s being given</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My cardiologist said they&rsquo;d use bivalirudin during my stent procedure instead of heparin. I know heparin is a blood thinner. What&rsquo;s the difference and why does it matter for me?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It may mean lower bleeding risk during the procedure</strong><br />Heart procedures involve threading catheters into arteries and inflating balloons or placing stents. Anticoagulation is necessary to prevent clots forming on the equipment — but too much anticoagulation means dangerous bleeding at the access site. Bivalirudin has been shown in clinical trials to produce less bleeding than heparin combined with additional clot-preventing drugs, which matters most for patients at higher bleeding risk. Your doctor may have chosen it specifically to protect you from that complication.</li>
          <li><strong>It works well in patients who can&rsquo;t use heparin</strong><br />Some patients develop a dangerous condition called heparin-induced thrombocytopenia — their immune system attacks platelets in response to heparin, paradoxically causing clotting rather than preventing it. Bivalirudin works through a completely different mechanism that doesn&rsquo;t trigger this reaction, making it a safe alternative for these patients. If you&rsquo;ve had a reaction to heparin before, this distinction is directly relevant to your care.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The evidence for bivalirudin versus heparin combinations is nuanced and context-dependent. Some trials show better bleeding outcomes with bivalirudin; others show similar efficacy with higher rates of acute clotting in the stent. The choice your cardiologist makes depends on your specific situation — the urgency of your procedure, your bleeding risk, whether you&rsquo;ve had prior heparin reactions, and what additional drugs will be given alongside. This is a sophisticated clinical decision made for each patient individually. Net: if your doctor chose bivalirudin, there is a specific reason based on your profile — the drug is legitimate, well-studied, and appropriate for the right patient in the right procedure.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader — Interested in how anticoagulant drugs work and how peptides can be drugs</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I know that blood clots are proteins forming a mesh. I had no idea a peptide could be used to prevent them. How does bivalirudin actually work at a molecular level, and what makes it better than heparin for some people?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It works by directly grabbing and disabling the clot-building engine</strong><br />When you get a cut, a cascade of proteins activates until thrombin is produced — thrombin is what converts liquid fibrinogen into solid fibrin, the mesh that forms a clot. Bivalirudin grabs thrombin at two sites simultaneously, disabling it like blocking both hands of someone trying to work. The clotting process stops precisely at that step. It doesn&rsquo;t require any other proteins to work the way heparin does, which is why it works even when heparin fails.</li>
          <li><strong>It&rsquo;s derived from a leech protein — which is genuinely fascinating</strong><br />Bivalirudin is based on hirudin, the anticoagulant peptide that medicinal leeches secrete to keep blood flowing while they feed. Hirudin was one of the first natural anticoagulants identified, and bivalirudin is a synthetic shorter version engineered for better pharmaceutical properties. The fact that a leech secretion became the template for a modern cardiac drug is a striking example of how nature reveals useful molecular solutions that pharmacology then improves.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Anticoagulation is inherently a balance between clotting too much and bleeding too much — there is no drug in this class that is without risk. Bivalirudin can cause bleeding, requires dose adjustment in kidney impairment because of how it is cleared, and in some situations has been associated with higher rates of stent clotting than heparin. It is also significantly more expensive than heparin. These tradeoffs are managed in the hospital setting with monitoring and clinical judgment — they are not risks that can be managed outside of that context. Net: fascinating pharmacology that illustrates how understanding biology leads to drug design, with no personal application beyond the clinical setting it is designed for.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Pharmacology-Minded Person — Interested in bivalirudin as a case study in precision peptide drug design</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;Bivalirudin&rsquo;s bivalent design — one domain binding the catalytic site, another binding the fibrin-binding exosite — is elegant peptide engineering. What does the self-limiting mechanism (thrombin cleaves its own inhibitor) tell us about designing reversibility into a drug by using the target&rsquo;s own activity?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The bivalent binding mechanism is precision pharmacology</strong><br />Bivalirudin engages thrombin at two distinct sites — the active site (where clotting chemistry happens) and exosite 1 (where fibrin binds). Occupying both simultaneously produces tight, specific inhibition that is independent of any cofactor. This design contrasts with heparin, which requires antithrombin as a carrier to reach thrombin at all — a cofactor-dependent mechanism that fails when antithrombin is depleted, as it sometimes is in critically ill patients. The bivalent direct design is architecturally superior for certain failure states.</li>
          <li><strong>The self-limiting mechanism is mechanistically elegant</strong><br />Thrombin cleaves the N-terminal sequence of bivalirudin as part of its natural proteolytic activity — and this cleavage partially inactivates the drug, weakening its grip on the active site. This means thrombin itself degrades its own inhibitor, creating a self-limiting pharmacokinetic loop where drug activity decreases as thrombin becomes free again. It&rsquo;s a built-in reversibility mechanism: the target&rsquo;s activity determines how long inhibition lasts. No reversal agent is required, and the half-life is short (about 25 minutes IV), enabling tight clinical titration.</li>
          <li><strong>It illustrates the minimal-sequence principle in therapeutic peptide design</strong><br />Hirudin is 65 amino acids. Bivalirudin is 20 amino acids. The reduction preserved the essential binding information — the N-terminal exosite engagement sequence from hirudin and the C-terminal active site sequence — and discarded everything else. This &ldquo;minimum pharmacophore&rdquo; approach reduced immunogenicity, improved pharmaceutical properties, and maintained clinical potency. It is a textbook example of how understanding binding domains enables rational peptide miniaturization.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The clinical evidence base for bivalirudin versus heparin is more contested than its elegant mechanism might suggest. HORIZONS-AMI and ACUITY showed better bleeding outcomes but raised concerns about stent thrombosis rates in some analyses. Subsequent large trials (MATRIX, VALIDATE-SWEDEHEART) produced more nuanced and sometimes conflicting results — the net benefit varies considerably by patient population, procedure type, and concurrent antithrombotic use. The mechanistic elegance does not automatically translate into a universally superior clinical profile. This is a useful reminder that pharmacological sophistication and clinical outcome are distinct dimensions: understanding the mechanism tells you what the drug does, not necessarily that it outperforms alternatives in every scenario. Net: exemplary peptide engineering as a case study; contested but real clinical utility; no application outside of supervised cardiology procedures.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Bivalirudin is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a community compound — hospital-only IV drug with no off-label or wellness use</li>
              <li>Not a general blood thinner for everyday anticoagulation needs</li>
              <li>Not self-administrable — continuous IV infusion with hemodynamic monitoring required</li>
              <li>Not without risk — bleeding and, in some settings, stent clotting are real concerns</li>
              <li>Not the same as heparin — different mechanism, different risk profile, different patient populations</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The bivalent binding mechanism — two-site simultaneous engagement — is an example of precision peptide pharmacology</li>
              <li>Self-limiting reversibility: thrombin degrades its own inhibitor, creating built-in offset without a reversal agent</li>
              <li>Derived from hirudin, a leech anticoagulant — one of the earliest known natural anticoagulants and still pharmacologically instructive</li>
              <li>The minimum pharmacophore engineering: 20 amino acids from a 65-amino-acid natural protein, preserving full activity</li>
              <li>Works when heparin cannot — cofactor-independent mechanism for patients where antithrombin-dependent drugs fail</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
