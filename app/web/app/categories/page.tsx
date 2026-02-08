import BackHomeLink from "@/components/BackHomeLink";

function ProPill() {
 return (
  <span
   aria-label="Pro"
   title="Pro"
   style={{
    marginLeft: 10,
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid rgba(0,0,0,0.16)",
    borderRadius: 999,
    padding: "2px 6px",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.7,
    lineHeight: 1,
    background: "rgba(255,255,255,0.9)",
    color: "rgba(0,0,0,0.88)",
    whiteSpace: "nowrap",
   }}
  >
   PRO
  </span>
 );
}

export default function CategoriesPage() {
 return (
  <main className="pt-page">
   <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <BackHomeLink />
   </div>

   <section className="pt-card">
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
     <h1 className="pt-card-title" style={{ margin: 0 }}>
      Wellness Paths
     </h1>
     <ProPill />
    </div>

    <p className="pt-card-subtext" style={{ marginTop: 10 }}>
     Wellness Paths group peptides by a shared goal or theme — a simpler way to explore than one compound at a time.
    </p>
    <p className="pt-card-subtext"></p>
   </section>

   <section className="pt-card">
    <p className="pt-card-subtext">More paths will appear here as curation continues.</p>
   </section>
  </main>
 );
}
