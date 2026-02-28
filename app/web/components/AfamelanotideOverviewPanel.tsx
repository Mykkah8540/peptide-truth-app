export default function AfamelanotideOverviewPanel() {
  return (
    <div className="reta-overview">
      <p className="reta-overview__lead">
        Afamelanotide (brand name Scenesse) is a synthetic analogue of alpha-melanocyte-stimulating
        hormone (alpha-MSH), FDA-approved in 2019 for the prevention of phototoxicity reactions
        in adults with erythropoietic protoporphyria (EPP), a rare genetic photodermatosis. It is
        the only approved melanocortin receptor agonist for a clinical indication.
      </p>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Mechanism</h3>
        <p>
          Afamelanotide is a 13-amino-acid peptide that acts as an agonist at the melanocortin 1
          receptor (MC1R). MC1R stimulation drives melanocyte differentiation and increased production
          of eumelanin (black/brown pigment) in the skin. Eumelanin absorbs ultraviolet and visible
          light, providing photoprotection by reducing the amount of light that reaches
          porphyrin-containing cells in EPP patients. The compound may also have melanin-independent
          photoprotective effects, though these are less well characterized.
        </p>
        <p>
          Afamelanotide differs from natural alpha-MSH by substitution of norleucine for methionine
          at position 4 and D-phenylalanine for phenylalanine at position 7, which confers
          substantially increased receptor binding affinity and metabolic stability, extending
          biological half-life well beyond the minutes-scale half-life of the natural hormone.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Administration</h3>
        <p>
          Afamelanotide is administered as a 16 mg biodegradable subcutaneous implant, inserted
          every 60 days. The implant releases the peptide slowly over approximately 2 months. This
          is a healthcare-provider procedure — it is not a self-administered injection. The route
          of administration fundamentally differs from the community &quot;melanotan&quot; injection
          practice.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Approved Indication: EPP</h3>
        <p>
          Erythropoietic protoporphyria is a rare autosomal dominant condition caused by
          ferrochelatase enzyme deficiency, leading to accumulation of protoporphyrin IX in red
          blood cells and plasma. Light exposure triggers protoporphyrin excitation and tissue
          damage, causing severe burning pain, erythema, and swelling. EPP patients often cannot
          tolerate outdoor sun exposure at all. Afamelanotide&apos;s FDA approval was supported by
          phase III RCTs demonstrating significantly increased pain-free sun exposure time.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">Relationship to Melanotan Compounds</h3>
        <p>
          Afamelanotide is related to but distinct from Melanotan-I and Melanotan-II, synthetic
          alpha-MSH analogues developed earlier at the University of Arizona. Melanotan-II (MT-II)
          is a cyclic peptide that is non-selective across melanocortin receptors (MC1R, MC3R, MC4R,
          MC5R), which accounts for its additional effects including sexual arousal (MC4R) and
          appetite suppression. Afamelanotide is more selective for MC1R. The community &quot;melanotan&quot;
          tanning practice uses primarily MT-II or MT-I via subcutaneous injection — these are
          distinct from the pharmaceutical afamelanotide implant, though mechanistically related.
        </p>
      </div>

      <div className="reta-overview__section">
        <h3 className="reta-overview__section-heading">General Population Tanning Use</h3>
        <p>
          Afamelanotide is not approved and not indicated for general-population aesthetic tanning.
          Its approval is strictly limited to EPP. General tanning use carries the full risk profile
          (including the melanoma monitoring concern) without the benefit justification that exists
          in EPP, where the drug addresses a severe, life-limiting disease.
        </p>
      </div>
    </div>
  );
}
