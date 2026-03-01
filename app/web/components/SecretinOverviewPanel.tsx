export default function SecretinOverviewPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Structure", value: "27 Amino Acids", sub: "GI hormone, S-cell origin", accent: "#2c5282" },
          { label: "FDA Status", value: "Approved", sub: "Diagnostic use only", accent: "#155e38" },
          { label: "Therapeutic Use", value: "None", sub: "No approved therapeutic indication", accent: "#9e3800" },
        ].map((c) => (
          <div key={c.label} style={{
            flex: "1 1 160px", background: "rgba(255,255,255,0.80)",
            border: "1px solid rgba(0,0,0,0.07)", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: c.accent, lineHeight: 1.2 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What it is</h3>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Secretin is a 27-amino-acid peptide hormone released by S cells in the duodenal and jejunal mucosa in response to acidic chyme entering the small intestine from the stomach. Its primary physiological role is stimulating pancreatic bicarbonate secretion to neutralize gastric acid and create an optimal pH environment for digestive enzymes. It also stimulates bile secretion from the liver and inhibits gastric acid production.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: "10px 0 0" }}>
          In clinical medicine, synthetic secretin (brand names ChiRhoStim and SecreFlo) is FDA-approved exclusively as a diagnostic agent \u2014 not a therapeutic one. The secretin stimulation test is used to evaluate suspected gastrinoma (Zollinger-Ellison syndrome) and pancreatic exocrine function. Secretin is administered intravenously in a clinical setting for these tests. There is no approved or evidence-supported therapeutic use. Community injection use is extremely rare and has no evidence base.
        </p>
      </div>

      {/* Diagnostic context */}
      <div style={{
        background: "linear-gradient(135deg,rgba(44,82,130,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(44,82,130,0.15)", borderRadius: 14, padding: "16px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#2c5282", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>This is a diagnostic tool, not a therapeutic one</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#334155", margin: 0 }}>
          Secretin\u2019s FDA approval is for a single clinical use case: stimulating the pancreas and gastrin-secreting tumors to assess function and diagnose disease. When a clinician orders a \u201csecretin stimulation test,\u201d they administer synthetic secretin IV and measure the response \u2014 either pancreatic fluid output (for pancreatic function testing) or serum gastrin rise (for gastrinoma). This is a single-dose, clinician-supervised procedure. There is no clinical rationale for repeated therapeutic secretin administration in healthy individuals.
        </p>
      </div>

      {/* The autism question */}
      <div style={{
        background: "#fff7f5", border: "1px solid rgba(158,56,0,0.15)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: "#9e3800", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>The autism claim \u2014 not supported</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#7c3a00", margin: 0 }}>
          In the late 1990s and early 2000s, there was significant public and some clinical interest in secretin as a treatment for autism spectrum disorder, following a case report of apparent improvement in autistic behaviors after secretin administration for a GI endoscopy. Multiple randomized controlled trials \u2014 including a Cochrane review \u2014 subsequently found no benefit of secretin over placebo for autism symptoms. This claim is not scientifically supported and should not be a basis for use.
        </p>
      </div>

      {/* Is it a fit? */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Is it a fit?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { icon: "\u2713", color: "#155e38", bg: "#f0fdf4", label: "Clinical secretin stimulation test (supervised)", note: "The only appropriate use \u2014 IV administration in a clinical setting for gastrinoma or pancreatic function evaluation" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Therapeutic self-administration", note: "No evidence, no approved indication, no rational mechanism for therapeutic benefit in a healthy individual" },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Autism treatment", note: "Multiple RCTs negative. Cochrane review: no evidence of benefit. Not a supported use." },
            { icon: "\u2717", color: "#9e3800", bg: "#fff7f5", label: "Digestive health enhancement", note: "Secretin\u2019s physiological role is acid neutralization response \u2014 not a recognized optimization target for healthy individuals" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: row.bg, borderRadius: 10, padding: "10px 14px",
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: row.color, flexShrink: 0, marginTop: 1 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{row.label}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What people discuss */}
      <div style={{
        background: "linear-gradient(135deg,rgba(26,92,58,0.07) 0%,rgba(15,26,46,0.04) 100%)",
        border: "1px solid rgba(26,92,58,0.15)", borderRadius: 14, padding: "18px 20px",
        boxShadow: "0 2px 8px rgba(15,26,46,0.06)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 10px" }}>What people discuss</h3>
        <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Historical autism claims and why the RCT evidence is negative \u2014 frequently resurfaces",
            "Understanding the secretin stimulation test for gastrinoma diagnosis",
            "Pancreatic exocrine insufficiency testing context",
            "GI hormone biology curiosity \u2014 secretin as a foundational endocrinology teaching case",
            "Very rare community questions about digestive enzyme support (no evidence basis)",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{t}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
