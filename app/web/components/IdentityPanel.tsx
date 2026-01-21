import RiskBadge from "@/components/RiskBadge";
type Props = {
  kind?: "peptide" | "blend" | "topic" | null;
  slug?: string | null;
  riskScore?: number | null;
canonicalName?: string | null;
  shortName?: string | null;
  aliases?: string[] | null;
  aminoAcidSeq?: string | null;
  molecularFormula?: string | null;
  molecularWeight?: number | string | null;
};

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, padding: "6px 0" }}>
      <div style={{ opacity: 0.7, fontSize: 13 }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: 13, wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}

export default function IdentityPanel(props: Props) {
    const aliases = Array.from(
    new Set((props.aliases ?? []).map((a) => (a || "").trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Identity</h2>

      {props.riskScore !== undefined && props.riskScore !== null ? (
        <div style={{ marginTop: 10 }}>
          <RiskBadge score={props.riskScore} />
        </div>
      ) : null}


      <div style={{ marginTop: 10 }}>
        <Row label="Canonical name" value={props.canonicalName ?? null} />
                <Row label="Kind" value={props.kind ?? null} />
        <Row label="Slug" value={props.slug ?? null} />
<Row label="Short name" value={props.shortName ?? null} />

        {aliases.length ? (
          <div style={{ padding: "8px 0" }}>
            <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 8 }}>Also known as</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {aliases.map((a) => (
                <span
                  key={a}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "rgba(0,0,0,0.02)",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <Row label="AA sequence" value={props.aminoAcidSeq ?? null} />
        <Row label="Molecular formula" value={props.molecularFormula ?? null} />
        <Row label="Molecular weight" value={props.molecularWeight ?? null} />
      </div>
    </section>
  );
}
