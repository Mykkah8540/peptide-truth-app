export default function PlecanatideEvidencePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Stat tiles */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { label: "Best study type", value: "Phase 3 RCT", color: "#155e38" },
          { label: "FDA Approval", value: "CIC + IBS-C", color: "#155e38" },
          { label: "Mechanism", value: "Well-established", color: "#155e38" },
          { label: "Systemic use", value: "No evidence", color: "#9e3800" },
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
              claim: "GC-C mechanism and CIC/IBS-C efficacy",
              status: "FDA-approved \u2014 multiple Phase 3 RCTs",
              color: "#155e38",
              bg: "rgba(21,100,58,0.05)",
              borderColor: "rgba(21,100,58,0.13)",
              note: "Plecanatide is FDA-approved for CIC (2017) and IBS-C (2018) based on multiple Phase 3 randomized controlled trials demonstrating statistically significant improvement in complete spontaneous bowel movement frequency and stool consistency. The GC-C \u2192 cGMP \u2192 chloride/bicarbonate secretion \u2192 intestinal fluid mechanism is well-characterized.",
            },
            {
              tier: "strong",
              claim: "Uroguanylin analogue design with pH-dependent activation",
              status: "Mechanistically established",
              color: "#155e38",
              bg: "rgba(21,100,58,0.05)",
              borderColor: "rgba(21,100,58,0.13)",
              note: "Plecanatide is structurally designed to mirror uroguanylin, the endogenous GC-C ligand. Its pH-dependent activation \u2014 greatest activity in the acidic duodenal microenvironment \u2014 has been confirmed in both in vitro receptor studies and clinical pharmacology. This distinguishes it from linaclotide (guanylin analogue), which lacks this pH gating.",
            },
            {
              tier: "moderate",
              claim: "Comparison to linaclotide: similar efficacy, modestly different tolerability",
              status: "Moderate \u2014 no head-to-head RCT",
              color: "#7c5200",
              bg: "rgba(124,82,0,0.06)",
              borderColor: "rgba(124,82,0,0.17)",
              note: "No published head-to-head RCT compares plecanatide to linaclotide directly. Network meta-analyses and systematic reviews suggest broadly similar efficacy for CIC and IBS-C. Observational and clinical experience data suggest plecanatide\u2019s diarrhea rate may be modestly lower, consistent with the pH-dependent mechanism hypothesis \u2014 but this is not definitively proven in comparative trial data.",
            },
            {
              tier: "none",
              claim: "Systemic, enhancement, or off-label use",
              status: "No evidence",
              color: "#9e3800",
              bg: "rgba(158,56,0,0.06)",
              borderColor: "rgba(158,56,0,0.18)",
              note: "Plecanatide has negligible systemic absorption. There is no plausible mechanism for systemic effects and no evidence for any use outside of local GI tract secretagogue activity. Community interest in this compound is limited to its approved GI indication context.",
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

      {/* Mechanism pathway */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Mechanism pathway</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { pathway: "GC-C receptor activation in intestinal epithelium", detail: "Plecanatide binds guanylate cyclase-C on the luminal surface of intestinal epithelial cells. This triggers increased intracellular cGMP. The receptor is the same as that targeted by natural guanylin and uroguanylin hormones, and by linaclotide." },
            { pathway: "cGMP-driven chloride and bicarbonate secretion", detail: "Elevated cGMP activates CFTR (cystic fibrosis transmembrane conductance regulator) chloride channels and inhibits NHE3 (sodium-hydrogen exchanger), driving chloride and bicarbonate secretion into the intestinal lumen along with water. This increases luminal fluid volume and accelerates intestinal transit." },
            { pathway: "pH-dependent receptor activation (uroguanylin mimicry)", detail: "Plecanatide\u2019s receptor affinity increases in an acidic pH environment, matching the duodenal microenvironment right after gastric emptying. This mimics the behavior of endogenous uroguanylin and concentrates secretory activity in the proximal small intestine, which may account for the somewhat different diarrhea profile compared to linaclotide." },
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
            { id: "E1", title: "Plecanatide for CIC: Phase 3 RCT (Miner et al., 2017)", grade: "Phase 3 RCT \u2014 primary efficacy", url: "https://pubmed.ncbi.nlm.nih.gov/28256384/" },
            { id: "E2", title: "Plecanatide for IBS-C: Phase 3 RCT (Brenner et al., 2018)", grade: "Phase 3 RCT \u2014 IBS-C efficacy", url: "https://pubmed.ncbi.nlm.nih.gov/29385605/" },
            { id: "E3", title: "Uroguanylin and GC-C receptor pharmacology (Forte et al.)", grade: "Mechanism review \u2014 pH-dependent activation", url: "https://pubmed.ncbi.nlm.nih.gov/21044950/" },
            { id: "E4", title: "FDA label \u2014 Trulance (plecanatide)", grade: "Prescribing information, black box, contraindications", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/208745s000lbl.pdf" },
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
