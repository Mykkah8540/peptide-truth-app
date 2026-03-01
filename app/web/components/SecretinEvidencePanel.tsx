export default function SecretinEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "GI physiology", value: "Well-established", color: "#155e38" },
          { label: "Diagnostic use", value: "FDA-approved", color: "#155e38" },
          { label: "Autism RCTs", value: "Negative", color: "#9e3800" },
          { label: "Therapeutic use", value: "No evidence", color: "#9e3800" },
        ].map((t) => (
          <div key={t.label} style={{
            flex: "1 1 110px", background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12,
            padding: "12px 14px", textAlign: "center",
            boxShadow: "0 1px 4px rgba(15,26,46,0.06)",
          }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: t.color, lineHeight: 1.2 }}>{t.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Evidence signals */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Evidence signals</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "strong",
              claim: "GI physiology: bicarbonate secretion and pancreatic function",
              status: "Strong \u2014 foundational physiology",
              color: "#155e38",
              bg: "rgba(21,100,58,0.05)",
              borderColor: "rgba(21,100,58,0.13)",
              note: "Secretin\u2019s role in gastrointestinal physiology is among the most thoroughly characterized peptide hormone functions in medicine. Released by duodenal S cells in response to acid, secretin stimulates pancreatic ductal bicarbonate secretion, bile flow, and inhibits gastric acid. This mechanism has been studied since the early 20th century (secretin was the first hormone ever described, by Bayliss and Starling in 1902) and is firmly established.",
            },
            {
              tier: "strong",
              claim: "Secretin stimulation test for gastrinoma (Zollinger-Ellison syndrome)",
              status: "Strong \u2014 FDA-approved diagnostic standard",
              color: "#155e38",
              bg: "rgba(21,100,58,0.05)",
              borderColor: "rgba(21,100,58,0.13)",
              note: "The secretin stimulation test is the standard diagnostic test for gastrinoma. IV secretin administration paradoxically raises serum gastrin in gastrinoma patients (by stimulating the gastrin-secreting tumor) while suppressing gastrin in normal individuals. FDA has approved synthetic secretin for this indication. Sensitivity and specificity are well-characterized in published diagnostic studies.",
            },
            {
              tier: "moderate",
              claim: "Pancreatic exocrine function testing",
              status: "Moderate \u2014 useful but not universally standardized",
              color: "#7c5200",
              bg: "rgba(124,82,0,0.06)",
              borderColor: "rgba(124,82,0,0.17)",
              note: "Secretin-enhanced MRCP (magnetic resonance cholangiopancreatography) and direct pancreatic function testing using secretin stimulation are established clinical techniques for evaluating pancreatic exocrine function. Diagnostic accuracy depends on technique and reference standards used, and testing is not uniformly available or standardized across centers.",
            },
            {
              tier: "none",
              claim: "Autism spectrum disorder treatment",
              status: "None \u2014 multiple RCTs negative",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "Following an anecdotal case report in 1998, multiple double-blind randomized controlled trials evaluated secretin for autism symptoms. All found no benefit compared to placebo. A Cochrane systematic review (Roberts et al.) concluded there is no evidence that single or multiple doses of secretin are effective for autism. This is one of the cleaner negative trial records in peptide literature.",
            },
            {
              tier: "none",
              claim: "Community injection or therapeutic self-use",
              status: "None",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "There is no evidence base, no established protocol, and no plausible mechanism for therapeutic benefit from self-administered secretin in healthy individuals. Secretin is an acute GI hormone response to acid \u2014 exogenous administration without an underlying diagnostic or therapeutic rationale has no evidence support.",
            },
          ].map((e) => (
            <div key={e.claim} style={{
              background: e.bg, border: `1px solid ${e.borderColor}`,
              borderRadius: 10, padding: "12px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{e.claim}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: e.color, background: `${e.color}15`, borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap" }}>{e.status}</span>
              </div>
              <div className="reta-evidence__entry-body" style={{ fontSize: 12.5, color: "#475569", margin: "8px 0 0", lineHeight: 1.55 }}>{e.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mechanism */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Mechanism pathways</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pathway: "Pancreatic bicarbonate secretion via secretin receptor (SCTR)", detail: "Secretin binds SCTR on pancreatic ductal cells, activating adenylyl cyclase \u2192 cAMP \u2192 CFTR-mediated bicarbonate secretion. This dramatically increases pancreatic juice pH, neutralizing acidic chyme entering the duodenum and creating optimal conditions for pancreatic enzyme function." },
            { pathway: "Bile flow stimulation", detail: "Secretin stimulates biliary ductal cells (cholangiocytes) to secrete bicarbonate-rich fluid, increasing bile volume and flow. This effect is used in secretin-enhanced MRCP imaging to visualize biliary and pancreatic duct anatomy." },
            { pathway: "Gastric acid inhibition", detail: "Secretin inhibits gastrin release from G cells and directly suppresses parietal cell acid secretion. In Zollinger-Ellison syndrome, gastrin-secreting tumors paradoxically respond to secretin by increasing gastrin output \u2014 the physiologic basis of the diagnostic stimulation test." },
          ].map((p) => (
            <div key={p.pathway} style={{
              background: "rgba(15,26,46,0.03)", borderRadius: 10,
              padding: "12px 14px", borderLeft: "3px solid rgba(15,26,46,0.15)",
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f1a2e", marginBottom: 4 }}>{p.pathway}</div>
              <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Key sources</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "E1", title: "FDA label \u2014 ChiRhoStim / SecreFlo (synthetic secretin)", grade: "Prescribing information \u2014 approved diagnostic indications", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2004/020777s005lbl.pdf" },
            { id: "E2", title: "Secretin stimulation test for Zollinger-Ellison syndrome (review)", grade: "Diagnostic test accuracy \u2014 gastrinoma", url: "https://pubmed.ncbi.nlm.nih.gov/16682572/" },
            { id: "E3", title: "Cochrane review: secretin for autism spectrum disorder (Roberts et al.)", grade: "Systematic review \u2014 negative; RCT synthesis", url: "https://pubmed.ncbi.nlm.nih.gov/16625567/" },
            { id: "E4", title: "Secretin-enhanced MRCP for pancreatic function", grade: "Diagnostic technique \u2014 pancreatic exocrine evaluation", url: "https://pubmed.ncbi.nlm.nih.gov/16604424/" },
          ].map((s) => (
            <div key={s.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: "rgba(15,26,46,0.03)", borderRadius: 10, padding: "10px 12px",
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, background: "#0f1a2e", color: "#fff", borderRadius: 5, padding: "2px 6px", flexShrink: 0, marginTop: 1 }}>{s.id}</span>
              <div>
                <div style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>{s.grade}</div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11.5, color: "#2563eb", marginTop: 2, display: "block", wordBreak: "break-all" }}>{s.url}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
