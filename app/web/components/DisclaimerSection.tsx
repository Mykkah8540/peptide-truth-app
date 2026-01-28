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
        <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, opacity: 0.75 }}>Pep-Talk is informational only and not medical advice. We make no warranties and are not liable for actions you take. You are responsible for your decisions and outcomes.</div>
    </section>
  );
}

// NOTE: liability sentence requested by Micah — add in render block if structure changes.
