type Props = {
  text?: string | null;
};

export default function DisclaimerSection({ text }: Props) {
  const t = (text ?? "").trim();
  if (!t) return null;

  return (
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Disclaimer</h2>
      <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, opacity: 0.9 }}>{t}</div>
    </section>
  );
}
