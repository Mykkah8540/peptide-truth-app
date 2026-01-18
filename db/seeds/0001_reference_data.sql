-- Seed reference data for v1.
-- Keep it minimal: drug/supplement classes are starter sets, expandable later.

BEGIN;

-- Drug classes (starter set)
INSERT INTO drug_classes (name, description) VALUES
  ('insulin_and_secretagogues', 'Insulin, sulfonylureas, meglitinides and other strong glucose-lowering agents'),
  ('glp1_and_incretins', 'GLP-1 receptor agonists, dual/triple agonists, DPP-4 inhibitors'),
  ('antihypertensives', 'ACE inhibitors, ARBs, beta blockers, calcium channel blockers'),
  ('diuretics', 'Loop, thiazide, potassium-sparing diuretics'),
  ('anticoagulants_antiplatelets', 'Warfarin, DOACs, aspirin, P2Y12 inhibitors'),
  ('ssri_snri_tca', 'Common antidepressant classes affecting serotonin/norepinephrine'),
  ('stimulants', 'Amphetamine/methylphenidate and related'),
  ('corticosteroids', 'Systemic corticosteroids and similar immunomodulators'),
  ('immunosuppressants_biologics', 'DMARDs, biologics, JAK inhibitors and transplant meds')
ON CONFLICT (name) DO NOTHING;

-- Supplement classes (starter set)
INSERT INTO supplement_classes (name, description) VALUES
  ('caffeine_stimulants', 'Caffeine and stimulant-like preworkouts'),
  ('fish_oil_bleeding', 'Fish oil and other supplements that may influence bleeding risk'),
  ('electrolytes_sodium_potassium', 'Electrolyte loading, sodium/potassium/magnesium strategies'),
  ('creatine', 'Creatine monohydrate and variants'),
  ('vasodilators_nitrates', 'Citrulline/arginine/nitrate-based vasodilators'),
  ('herbal_sedatives', 'Sedating botanicals and sleep aids'),
  ('melatonin', 'Melatonin and sleep timing supplements')
ON CONFLICT (name) DO NOTHING;

COMMIT;
