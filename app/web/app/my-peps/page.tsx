import { listPeptides, listBlends } from "@/lib/content";
import MyPepsClient from "@/components/MyPepsClient";
import SavedStacksSection from "@/components/SavedStacksSection";
export default function MyPepsPage() {
  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">My Peps</h1>
        <p className="pt-card-subtext">
          My Peps is your personal workspace — a place to save peptides,
          blends, and stacks you want to revisit.
        </p>
        <p className="pt-card-subtext">
          Favorites and saved items will appear here as personalization features
          are rolled out.
        </p>
      </section>

      <section className="pt-card">
  <MyPepsClient peptides={listPeptides()} blends={listBlends()} />
</section>

<section className="pt-card">
  <SavedStacksSection />
</section>
    </main>
  );
}
