import Link from "next/link";

type Props = {
  safetyIds?: string[] | null;
};

export default function SafetyLinks({ safetyIds }: Props) {
  const ids = (safetyIds || []).filter(Boolean);
  if (!ids.length) return null;

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Safety references</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {ids.map((id) => (
          <li key={id} style={{ marginBottom: 4 }}>
            <Link href={`/safety/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
