export default function ThymosinA1InteractionsPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Thymosin Alpha-1 interaction concerns are almost entirely about <strong>immune direction conflict</strong> — medications that suppress immunity are in direct pharmacological opposition to a compound designed to upregulate it. This creates both efficacy and safety concerns, not just one or the other.
        </p>
      </div>

      {/* Drug class flags */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Drug class flags</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "flag", cls: "Immunosuppressants (calcineurin inhibitors, antimetabolites, biologics)",
              examples: "Tacrolimus, cyclosporine, mycophenolate, azathioprine, TNF inhibitors, IL-6 inhibitors, JAK inhibitors",
              why: "Direct pharmacological opposition. These drugs suppress the T-cell and immune activation that TA1 is designed to upregulate. The combination is neither safe nor logical without specialist oversight and a defined clinical rationale.",
            },
            {
              tier: "flag", cls: "Corticosteroids",
              examples: "Prednisone, dexamethasone, methylprednisolone",
              why: "Corticosteroids broadly suppress immune function. TA1 is designed to stimulate immune function. The combination blunts TA1's intended effect and complicates monitoring of immune status.",
            },
            {
              tier: "watch", cls: "Anti-infectives / Antimicrobials",
              examples: "Antibiotics, antivirals (notably in hepatitis B/C context: tenofovir, entecavir)",
              why: "On-label: TA1 is approved in some countries as an adjunct to antiviral therapy in hepatitis. In that context the combination is intentional. In research/wellness contexts, this class is a flag to review timing and indication.",
            },
            {
              tier: "watch", cls: "Checkpoint inhibitors (oncology immunotherapy)",
              examples: "Pembrolizumab, nivolumab, ipilimumab",
              why: "Both TA1 and checkpoint inhibitors activate immune response through different mechanisms. Additive immune activation creates unpredictable risk for immune-related adverse events (irAEs). Specialist-only territory.",
            },
          ].map((f) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[f.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={f.cls} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.tier}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{f.cls}</span>
                </div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}><strong>Examples:</strong> {f.examples}</div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{f.why}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peptide combinations */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f1a2e", margin: "0 0 12px" }}>Peptide combinations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              tier: "low", name: "BPC-157",
              note: "Common combination in recovery and general wellness stacks. Both have immune-adjacent and healing-adjacent narratives. No known direct conflict. Both are research-grade compounds — quality and sourcing is the primary shared risk.",
            },
            {
              tier: "low", name: "TB-500",
              note: "Discussed together in immune/healing stacks. TB-500 is primarily tissue repair (thymosin beta-4 fragment); TA1 is immune signaling. Different mechanisms with no known direct interaction.",
            },
            {
              tier: "watch", name: "KPV (anti-inflammatory tripeptide)",
              note: "Both discussed in immune-related wellness contexts. KPV is anti-inflammatory; TA1 is immune-activating. In theory the directions are somewhat opposite — combining for 'immune optimization' requires clarity on the specific goal.",
            },
          ].map((p) => {
            const colors = {
              flag: { bg: "#fff7f5", border: "#9e380022", tag: "#9e3800", tagBg: "#fde8e0" },
              watch: { bg: "#fffbf0", border: "#7c520022", tag: "#7c5200", tagBg: "#fef9ed" },
              low: { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" },
            }[p.tier] ?? { bg: "rgba(15,26,46,0.03)", border: "rgba(15,26,46,0.08)", tag: "#155e38", tagBg: "#f0fdf4" };
            return (
              <div key={p.name} style={{
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 10, padding: "12px 14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, background: colors.tagBg, color: colors.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.tier}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{p.name}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{p.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: "rgba(15,26,46,0.04)", border: "1px solid rgba(15,26,46,0.10)",
        borderRadius: 12, padding: "14px 18px",
      }}>
        <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.6 }}>
          <strong>These are category flags, not a complete interaction list.</strong> If you are on any immunosuppressive medication for any reason — transplant, autoimmune disease, oncology — do not add TA1 without explicit specialist guidance. The immune direction conflict is direct and the consequences of immune status destabilization can be serious.
        </p>
      </div>

    </div>
  );
}
