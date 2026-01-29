type Props = {
  text?: string | null;
};

export default function DisclaimerSection({ text }: Props) {
  const t = (text ?? "").trim();
  if (!t) return null;

  return (
    <section className="pt-card">
      <h2 className="pt-card-title">Disclaimer</h2>
      <div className="pt-item-text" style={{ marginTop: 10 }}>
        {t}
      </div>
      <div className="pt-item-note" style={{ marginTop: 10 }}>
        Pep-Talk is informational only and not medical advice. We make no warranties and are not liable for actions you take.
        You are responsible for your decisions and outcomes.
      </div>
    </section>
  );
}
