import Link from "next/link";

type Props = {
 safetyIds?: string[] | null;
 label?: string;
};

export default function SafetyLinks({ safetyIds, label }: Props) {
 const ids = (safetyIds || []).filter(Boolean);
 if (!ids.length) return null;

 return (
  <div style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
   <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>{label ?? "Safety references"}</div>
   <ul style={{ margin: 0, paddingLeft: 18 }}>
    {ids.map((id) => (
     <li key={id} style={{ marginBottom: 6 }}>
      <Link href={`/safety/${id}`}>{id}</Link>
     </li>
    ))}
   </ul>
  </div>
 );
}
