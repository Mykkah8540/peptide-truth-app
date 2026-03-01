export default function AnpOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        Atrial Natriuretic Peptide (ANP) is a hormone released by the heart when it senses that too much fluid is circulating — it signals the kidney to dump sodium and water, widens blood vessels, and tells other hormonal systems to stand down. It&rsquo;s one of the heart&rsquo;s own pressure-relief valves. ANP has a half-life of about two minutes, which makes injecting it pointless — it degrades before it can do anything meaningful. This is a pharmacology reference page, not a compound with a community use case.
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Cardiovascular-Curious Person — Trying to understand how the heart manages blood pressure</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;I keep seeing &lsquo;natriuretic peptide&rsquo; mentioned in relation to heart failure. What does it actually do, and what does it mean when a doctor says your BNP levels are elevated?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>It&rsquo;s one of the heart&rsquo;s own built-in safety systems</strong><br />Most people know the heart as a pump. Fewer realize it&rsquo;s also a hormone-secreting organ. When the atria (the upper chambers) are stretched by too much blood volume, they release ANP as a signal to the rest of the body: reduce the load. The kidney responds by excreting sodium and water, blood vessels relax, and the volume drops. It&rsquo;s an elegant self-regulating feedback loop built into the cardiovascular system.</li>
          <li><strong>Understanding ANP explains what elevated BNP means in the clinic</strong><br />BNP (a related cardiac hormone released by the ventricles) is one of the most commonly ordered tests in emergency medicine for suspected heart failure. When the heart is struggling and chambers are overloaded, BNP shoots up as the heart tries to activate this relief system. Elevated BNP is a diagnostic marker for heart failure severity — and understanding what ANP and BNP do makes that test make sense.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">There is nothing to do with this information in a personal health context beyond understanding what your lab values mean or why heart failure develops. ANP is not something to supplement, optimize, or enhance — it degrades within two minutes. The relevant drugs in this space (sacubitril/valsartan, sold as Entresto) work by blocking the enzyme that breaks down endogenous ANP and BNP, extending their natural action — but that&rsquo;s a prescription heart failure medication, not a wellness compound. Net: foundational biology that makes cardiac diagnostics and heart failure pharmacology make sense, with no personal action implied.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Heart Health-Focused Person — Researching fluid retention, blood pressure, or heart failure management</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;My father has heart failure and retains a lot of fluid. The doctors are managing it with diuretics. I read that the heart makes its own fluid-clearing hormone — why isn&rsquo;t that being used instead?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>ANP is exactly the signal the failing heart is trying to make</strong><br />In heart failure, the heart is chronically under volume overload. ANP and BNP levels are elevated — the heart is desperately sending the &ldquo;clear this fluid&rdquo; signal — but the signal isn&rsquo;t strong enough to overcome the degree of dysfunction. Giving additional natriuretic peptide to help amplify that signal is a medically logical concept, and it is exactly what was tried clinically.</li>
          <li><strong>There were actual drugs based on this concept</strong><br />Nesiritide (recombinant BNP) was FDA-approved for acute decompensated heart failure and used intravenously in hospitals. Carperitide (recombinant ANP) is still approved in Japan for the same indication. These drugs represent the direct therapeutic application of natriuretic peptide biology that your intuition correctly predicted.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">Nesiritide was withdrawn from the US market in 2013 after the large ASCEND-HF trial showed no mortality benefit and raised concerns about worsening kidney function at higher doses. The clinical story of natriuretic peptide therapy illustrates how intuitive mechanisms don&rsquo;t always translate to improved outcomes — more of the &ldquo;right&rdquo; signal isn&rsquo;t necessarily better if the underlying system is too compromised. The more successful approach turned out to be blocking the enzyme that breaks down endogenous ANP (neprilysin) — sacubitril/valsartan does this and has strong mortality evidence in heart failure. Net: the biology was right, the direct replacement approach underdelivered, and the smarter pharmacological strategy protects what the heart is already making rather than adding more from outside.</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Systems Biohacker — Interested in the natriuretic peptide axis as a pressure regulation network</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;The sacubitril in Entresto blocks neprilysin to extend ANP and BNP half-life. That&rsquo;s a much smarter pharmacological strategy than injecting ANP. What does the success of that approach tell us about when blocking clearance is a better lever than direct replacement?&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>Neprilysin inhibition as a principle: protect, don&rsquo;t replace</strong><br />The two-minute half-life of ANP exists because neprilysin (the clearance enzyme) and the NPR-C clearance receptor are constantly active. Instead of fighting that clearance system by injecting large amounts of peptide that immediately degrade, sacubitril blocks neprilysin and allows endogenous ANP and BNP — secreted in the right place, at the right time, in response to the right signals — to persist longer. The pharmacological elegance is that the body&rsquo;s own regulatory output gets amplified rather than bypassed.</li>
          <li><strong>The PARADIGM-HF landmark trial result validates the biology</strong><br />Sacubitril/valsartan (Entresto) reduced cardiovascular death and heart failure hospitalization by about 20% compared to enalapril in the PARADIGM-HF trial — a landmark result that made it first-line therapy for heart failure with reduced ejection fraction. That outcome validates not just the specific drug but the entire mechanistic hypothesis that preserving natriuretic peptide signaling improves outcomes. It&rsquo;s a clean proof of concept for the axis.</li>
          <li><strong>ANP&rsquo;s two-minute half-life is a case study in why pharmacokinetics shape strategy</strong><br />The impracticality of injecting ANP is a useful model for thinking about any endogenous peptide with rapid clearance. Subcutaneous injection requires a compound to absorb slowly enough that it maintains systemic levels before degradation eliminates it. A two-minute half-life means essentially zero therapeutic exposure from intermittent dosing of any kind. Understanding why this matters here illuminates why analog engineering (extending half-life) or clearance blocking (neprilysin inhibition) are the rational approaches for any short-lived endogenous peptide.</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">The natriuretic peptide axis is a cardiovascular system, not a general wellness target. Blood pressure and fluid regulation are tightly controlled through multiple parallel systems — the renin-angiotensin axis, sympathetic nervous system, antidiuretic hormone — that compensate for each other. Manipulating ANP in isolation in a healthy person has no defined benefit and unpredictable downstream effects on the other systems. Sacubitril/valsartan is a prescription heart failure drug with a specific indication and patient population — extending its logic to healthy optimization use is conceptually thin and practically inaccessible. Net: the pharmacological design principles here are genuinely instructive for thinking about peptide biology broadly; the specific compound has no community use case and the axis has no actionable wellness target at this time.</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What ANP is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>Not a community compound — no rational injection use case; two-minute half-life makes it pointless</li>
              <li>Not a blood pressure management tool for home use — requires continuous IV infusion even in clinical settings</li>
              <li>Not the same as BNP, nesiritide, or carperitide — those are related but distinct peptides with different properties</li>
              <li>Not something to supplement or optimize in healthy people — no established benefit outside heart failure</li>
              <li>Not something nesiritide&rsquo;s withdrawal from the market should be dismissed — that safety signal is real</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>The heart is a hormone-secreting organ — ANP is a clean example of how organs signal to manage system-wide physiology</li>
              <li>Two-minute half-life is a pharmacokinetically instructive extreme: a case study in why delivery route determines whether a peptide is useful</li>
              <li>The sacubitril story demonstrates that blocking clearance can outperform direct replacement as a pharmacological strategy</li>
              <li>Elevated BNP in clinical labs directly measures the failing activation of this system — understanding ANP makes the most important heart failure biomarker make sense</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
