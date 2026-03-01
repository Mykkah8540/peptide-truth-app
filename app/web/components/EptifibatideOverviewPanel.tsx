export default function EptifibatideOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Eptifibatide (Integrilin) is a hospital IV drug used during heart attacks and cardiac procedures to prevent dangerous blood clots from forming in arteries. It is not a community compound and has no wellness or enhancement application. This page exists to help patients understand what they were given during a cardiac event, and to illustrate how a seven-amino-acid cyclic peptide can become a precision anticoagulant by mimicking the exact molecular sequence that fibrinogen uses to stick platelets together.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Patient or Caregiver &mdash; Received eptifibatide during a cardiac procedure</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I had a heart catheterization and they gave me something called Integrilin through an IV. What was it doing and is it still in my system?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it was used</p>
        <ol className="reta-overview__profile-why">
          <li><strong>During a coronary procedure, the risk of a clot forming at the treatment site is high</strong><br />When a stent is placed in a blocked coronary artery, the injury to the vessel wall &mdash; and the foreign surface of the stent itself &mdash; activates platelets powerfully. Without antiplatelet treatment, those activated platelets aggregate and can cause a new blockage right where the cardiologist just opened one up. Eptifibatide blocks the final step of platelet clumping so this can&rsquo;t happen while the procedure is underway.</li>
          <li><strong>It was chosen specifically because it wears off quickly</strong><br />Eptifibatide has a half-life of about two and a half hours. Within four to eight hours of stopping the infusion, platelet function returns toward normal. This rapid offset is essential in a cardiac procedure environment where unexpected bleeding complications require the option to reverse the antiplatelet effect quickly.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">If you received eptifibatide during your hospitalization, it is no longer active in your system within hours of when the infusion was stopped &mdash; it clears through the kidneys rapidly. The ongoing antiplatelet medication you take after a stent procedure (aspirin plus a P2Y12 inhibitor like clopidogrel or ticagrelor) is a different, longer-acting drug class. The eptifibatide was a short-term bridge used specifically around the procedure time. Net: it did its job acutely and is gone &mdash; your cardiologist&rsquo;s ongoing antiplatelet plan is what matters now.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Curious Reader &mdash; Interested in how anticoagulants actually work</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I understand blood clots happen when platelets aggregate, but I don&rsquo;t understand the molecular detail. How does a tiny peptide stop that, and why does eptifibatide work differently from aspirin?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s interesting</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Eptifibatide blocks the final common step that all platelet-activating triggers converge on</strong><br />Platelets can be activated by many things: damaged collagen, thrombin from the clotting cascade, ADP released from other platelets, thromboxane. All of these different triggers ultimately cause a receptor on the platelet&rsquo;s surface to change shape and grab onto fibrinogen &mdash; the molecular bridge that links platelets to each other. Eptifibatide outcompetes fibrinogen for that receptor. Regardless of what triggered the platelet, if that final binding site is blocked, the platelet can&rsquo;t aggregate. Aspirin, by contrast, blocks only the thromboxane production pathway &mdash; a much earlier and narrower intervention.</li>
          <li><strong>The peptide was designed to mimic fibrinogen&rsquo;s own binding sequence</strong><br />Eptifibatide is a seven-amino-acid cyclic peptide that contains a lysine-glycine-aspartate (KGD) sequence &mdash; a slight variation of the RGD sequence that fibrinogen uses to dock onto the platelet receptor. By mimicking the natural ligand, eptifibatide occupies the binding site competitively and reversibly. It&rsquo;s a peptide disguised as fibrinogen, doing nothing except sitting in the parking spot.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Blocking the final common pathway of platelet aggregation is powerful &mdash; but power comes with the expected consequence: the risk of bleeding is higher than with less comprehensive antiplatelet agents. This is why eptifibatide is only given in hospitals with monitoring, blood products on hand, and clinical teams prepared to manage bleeding complications. The very thing that makes it effective in preventing catastrophic clotting during procedures is what makes it unsuitable for any unmonitored use. Net: elegant molecular pharmacology that illustrates the principle of competitive inhibition applied to a specific integrin receptor.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Pharmacology-Minded Person &mdash; Integrin receptor pharmacology, peptide drug design</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I&rsquo;m interested in the integrin pharmacology angle &mdash; specifically how eptifibatide&rsquo;s KGD sequence achieves GPIIb/IIIa selectivity, how it compares to abciximab&rsquo;s irreversible binding, and why the class has declined in clinical practice with the rise of oral P2Y12 inhibitors.&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why it&rsquo;s interesting</p>
        <ol className="reta-overview__profile-why">
          <li><strong>The KGD vs RGD distinction is a clean example of receptor selectivity through sequence modification</strong><br />The integrin receptor family includes many members that bind RGD-containing sequences. Eptifibatide uses KGD (lysine substituted for arginine) specifically because this sequence has higher affinity for GPIIb/IIIa while reducing activity at other integrins like &alpha;v&beta;3. The cyclic peptide structure constrains the KGD sequence in a conformation that optimally fits the GPIIb/IIIa binding pocket. Abciximab, by contrast, is a monoclonal antibody fragment that binds irreversibly and non-competitively, with longer platelet effect duration because it stays bound even when redistributed to new platelets transfused for reversal.</li>
          <li><strong>The decline of GPIIb/IIIa inhibitors is a pharmacoepidemiology lesson</strong><br />The class was dominant in ACS management in the late 1990s and early 2000s. The rise of potent, predictable oral P2Y12 inhibitors &mdash; ticagrelor and prasugrel &mdash; with their own favorable trial data gradually displaced GPIIb/IIIa inhibitors as upfront therapy. The inhibitors are now primarily bail-out agents during PCI when large thrombus burden is encountered. Drug class displacement by better-tolerated oral alternatives is a recurring pattern in cardiovascular pharmacology.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Eptifibatide represents the peak era of peptide-based anticoagulant design from the 1990s &mdash; when integrin biology was newly characterized and cyclic peptides seemed like an elegant approach to receptor-specific blockade. The clinical trajectory since then &mdash; displacement by small molecules with better oral bioavailability &mdash; is a reminder that pharmacological elegance and clinical utility don&rsquo;t always map onto each other. Renal clearance is a critical consideration: dose adjustment for renal impairment is essential because the drug accumulates and prolongs the antiplatelet effect when creatinine clearance is reduced. Net: a pharmacologically instructive compound in the history of integrin-targeting peptide drugs, now occupying a narrower clinical niche than when it was introduced.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What Eptifibatide is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not appropriate outside a hospital setting with continuous monitoring &mdash; ever</li>
              <li>Not a cardiovascular supplement or enhancement compound of any kind</li>
              <li>Not reversible with a specific antidote &mdash; management of bleeding is stopping the infusion and waiting, or platelet transfusion for severe bleeding</li>
              <li>Not safe in significant renal impairment without dose adjustment &mdash; accumulation multiplies bleeding risk</li>
              <li>Not something that stays in your system &mdash; it clears within hours of stopping the infusion</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>A seven-amino-acid cyclic peptide that outcompetes the natural fibrinogen ligand for a specific integrin receptor &mdash; pharmacological precision from minimal molecular structure</li>
              <li>The KGD sequence is a natural fibrinogen binding sequence converted into a competitive inhibitor by cyclization</li>
              <li>Blocks platelet aggregation at the final obligatory step regardless of which upstream pathway activated the platelet</li>
              <li>The reversibility distinction from abciximab (competitive vs. irreversible binding) has direct clinical consequences for procedure planning</li>
              <li>Its displacement by oral P2Y12 inhibitors is a clean case study in how drug classes evolve when better alternatives emerge</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
