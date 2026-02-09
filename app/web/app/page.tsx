import { getSponsors } from "@/lib/sponsors";
import { listStacks } from "@/lib/content";
import { requirePaid } from "@/lib/gate";
import Link from "next/link";

async function isPaid(): Promise<boolean> {
 try {
  await requirePaid();
  return true
 } catch {
  return false
 }
}
import SponsorBanner from "@/components/SponsorBanner";

function ProPill() {
 return (
  <span
   aria-label="Pro"
   title="Pro"
   style={{
    marginLeft: 8,
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 0.9,
    lineHeight: 1,
    opacity: 0.92,
   }}
  >
   PRO
  </span>
 );
}

function HomeLink(props: {
 href: string;
 label: string;
 pro?: boolean;
 subtext: string;
}) {
 const { href, label, pro, subtext } = props;

 return (
  <a
   href={href}
   style={{
    border: "1px solid #e5e5e5",
    background: "#fff",
    padding: "12px 12px",
    borderRadius: 14,
    fontWeight: 900,
    textDecoration: "none",
    display: "grid",
    gap: 4,
   }}
  >
   <div style={{ display: "inline-flex", alignItems: "center" }}>
    <span>{label}</span>
    {pro ? <ProPill /> : null}
   </div>
   <div style={{ fontSize: 13, fontWeight: 700, color: "#666", lineHeight: 1.35 }}>
    {subtext}
   </div>
  </a>
 );
}

export default async function Home() {
 const sponsors = getSponsors();
 const paid = await isPaid();
 const recent = listStacks().slice(0, 4);

return (
  <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
   <main className="mx-auto w-full max-w-3xl px-4 py-10">
    <div style={{ display: "grid", gap: 14 }}>
     <div style={{ display: "grid", gap: 6 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.4, margin: 0 }}>Pep-Talk</h1>
      <p style={{ margin: 0, color: "#666", fontSize: 14, lineHeight: 1.5 }}>
 Science-backed education for curious humans at every level.
</p>
       <div style={ display: "grid", gap: 6, marginTop: 6 }>
        <div style={ fontSize: 14, fontWeight: 900, letterSpacing: -0.2 }>Understand peptides — without the hype.</div>
        <div style={ fontSize: 13, color: "#666", lineHeight: 1.5 }>We don’t tell you what to do. We help you understand what’s happening.</div>
       </div>

     </div>

     <section className="pt-card" style={{ padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.6, textTransform: "uppercase", color: "#555" }}>
       Start here
      </div>
      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
       <HomeLink href="/peptides" label="Browse Peptides" subtext="Find individual peptides and learn the basics safely." />
       <HomeLink href="/resources" label="Resources" subtext="Guides, definitions, and platform context." />
      </div>
     </section>

     <section className="pt-card" style={{ padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 0.6, textTransform: "uppercase", color: "#555" }}>
       Pro features
      </div>
      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
       <HomeLink href="/blends" label="Blends" pro subtext="Common blend products and what they contain." />
       <HomeLink href="/stacks" label="Browse Stacks" pro subtext="Goal-based groupings to compare how items are discussed together." />
       <HomeLink href="/categories" label="Browse Categories" pro subtext="Browse by category and discovery lens." />
       <HomeLink href="/my-peps" label="My Peps" pro subtext="Save peptides and blends for later." />
      </div>

      <p style={{ marginTop: 10, color: "#666", fontSize: 13, lineHeight: 1.5, marginBottom: 0 }}>
       Educational content remains free. Pro unlocks guided discovery and community stack tools.
      </p>
     </section>

     <div style={{ marginTop: 2 }}>
      <SponsorBanner sponsors={sponsors} rotateMs={3000} />
     </div>
    </div>
   </main>
  </div>
 );
}
