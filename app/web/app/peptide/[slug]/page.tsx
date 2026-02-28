import { getRiskForPeptide, evidenceGradeLabel } from "@/lib/riskIndex";
import MaturityPostureLabel from "@/components/MaturityPostureLabel";
import VialImage from "@/components/VialImage";
import AliasSequenceMini from "@/components/AliasSequenceMini";
import { loadPeptideBySlug, getAliasesForSlug } from "@/lib/content";
import { getSupportPack } from "@/lib/supportLayer";
import SupportLayerSection from "@/components/SupportLayerSection";

import ContentBlocks from "@/components/ContentBlocks";
import EvidenceList from "@/components/EvidenceList";
import InteractionsSection from "@/components/InteractionsSection";
import PDPContextualConsiderations from "@/components/PDPContextualConsiderations";
import PeptideCommentsSection from "@/components/PeptideCommentsSection";
import CollapsibleSection from "@/components/CollapsibleSection";
import PDPTabs from "@/components/PDPTabs";
import BodyClass from "@/components/BodyClass";
import RetaOverviewPanel from "@/components/RetaOverviewPanel";
import RetaEvidencePanel from "@/components/RetaEvidencePanel";
import RetaSafetyPanel from "@/components/RetaSafetyPanel";
import RetaInteractionsPanel from "@/components/RetaInteractionsPanel";
import NadPlusOverviewPanel from "@/components/NadPlusOverviewPanel";
import NadPlusEvidencePanel from "@/components/NadPlusEvidencePanel";
import NadPlusSafetyPanel from "@/components/NadPlusSafetyPanel";
import NadPlusInteractionsPanel from "@/components/NadPlusInteractionsPanel";
import BpcOverviewPanel from "@/components/BpcOverviewPanel";
import BpcEvidencePanel from "@/components/BpcEvidencePanel";
import BpcSafetyPanel from "@/components/BpcSafetyPanel";
import BpcInteractionsPanel from "@/components/BpcInteractionsPanel";
import Tb500OverviewPanel from "@/components/Tb500OverviewPanel";
import Tb500EvidencePanel from "@/components/Tb500EvidencePanel";
import Tb500SafetyPanel from "@/components/Tb500SafetyPanel";
import Tb500InteractionsPanel from "@/components/Tb500InteractionsPanel";
import Cjc1295OverviewPanel from "@/components/Cjc1295OverviewPanel";
import Cjc1295EvidencePanel from "@/components/Cjc1295EvidencePanel";
import Cjc1295SafetyPanel from "@/components/Cjc1295SafetyPanel";
import Cjc1295InteractionsPanel from "@/components/Cjc1295InteractionsPanel";
import IpamorelinOverviewPanel from "@/components/IpamorelinOverviewPanel";
import IpamorelinEvidencePanel from "@/components/IpamorelinEvidencePanel";
import IpamorelinSafetyPanel from "@/components/IpamorelinSafetyPanel";
import IpamorelinInteractionsPanel from "@/components/IpamorelinInteractionsPanel";
import SermorelinOverviewPanel from "@/components/SermorelinOverviewPanel";
import SermorelinEvidencePanel from "@/components/SermorelinEvidencePanel";
import SermorelinSafetyPanel from "@/components/SermorelinSafetyPanel";
import SermorelinInteractionsPanel from "@/components/SermorelinInteractionsPanel";
import Mk677OverviewPanel from "@/components/Mk677OverviewPanel";
import Mk677EvidencePanel from "@/components/Mk677EvidencePanel";
import Mk677SafetyPanel from "@/components/Mk677SafetyPanel";
import Mk677InteractionsPanel from "@/components/Mk677InteractionsPanel";
import Ghrp2OverviewPanel from "@/components/Ghrp2OverviewPanel";
import Ghrp2EvidencePanel from "@/components/Ghrp2EvidencePanel";
import Ghrp2SafetyPanel from "@/components/Ghrp2SafetyPanel";
import Ghrp2InteractionsPanel from "@/components/Ghrp2InteractionsPanel";
import Ghrp6OverviewPanel from "@/components/Ghrp6OverviewPanel";
import Ghrp6EvidencePanel from "@/components/Ghrp6EvidencePanel";
import Ghrp6SafetyPanel from "@/components/Ghrp6SafetyPanel";
import Ghrp6InteractionsPanel from "@/components/Ghrp6InteractionsPanel";
import HexarelinOverviewPanel from "@/components/HexarelinOverviewPanel";
import HexarelinEvidencePanel from "@/components/HexarelinEvidencePanel";
import HexarelinSafetyPanel from "@/components/HexarelinSafetyPanel";
import HexarelinInteractionsPanel from "@/components/HexarelinInteractionsPanel";
import TesamorelinOverviewPanel from "@/components/TesamorelinOverviewPanel";
import TesamorelinEvidencePanel from "@/components/TesamorelinEvidencePanel";
import TesamorelinSafetyPanel from "@/components/TesamorelinSafetyPanel";
import TesamorelinInteractionsPanel from "@/components/TesamorelinInteractionsPanel";
import BremelanotideOverviewPanel from "@/components/BremelanotideOverviewPanel";
import BremelanotideEvidencePanel from "@/components/BremelanotideEvidencePanel";
import BremelanotideSafetyPanel from "@/components/BremelanotideSafetyPanel";
import BremelanotideInteractionsPanel from "@/components/BremelanotideInteractionsPanel";
import SelankOverviewPanel from "@/components/SelankOverviewPanel";
import SelankEvidencePanel from "@/components/SelankEvidencePanel";
import SelankSafetyPanel from "@/components/SelankSafetyPanel";
import SelankInteractionsPanel from "@/components/SelankInteractionsPanel";
import SemaxOverviewPanel from "@/components/SemaxOverviewPanel";
import SemaxEvidencePanel from "@/components/SemaxEvidencePanel";
import SemaxSafetyPanel from "@/components/SemaxSafetyPanel";
import SemaxInteractionsPanel from "@/components/SemaxInteractionsPanel";
import ThymosinA1OverviewPanel from "@/components/ThymosinA1OverviewPanel";
import ThymosinA1EvidencePanel from "@/components/ThymosinA1EvidencePanel";
import ThymosinA1SafetyPanel from "@/components/ThymosinA1SafetyPanel";
import ThymosinA1InteractionsPanel from "@/components/ThymosinA1InteractionsPanel";
import GhkCuOverviewPanel from "@/components/GhkCuOverviewPanel";
import GhkCuEvidencePanel from "@/components/GhkCuEvidencePanel";
import GhkCuSafetyPanel from "@/components/GhkCuSafetyPanel";
import GhkCuInteractionsPanel from "@/components/GhkCuInteractionsPanel";
import Aod9604OverviewPanel from "@/components/Aod9604OverviewPanel";
import Aod9604EvidencePanel from "@/components/Aod9604EvidencePanel";
import Aod9604SafetyPanel from "@/components/Aod9604SafetyPanel";
import Aod9604InteractionsPanel from "@/components/Aod9604InteractionsPanel";
import MelanoranIiOverviewPanel from "@/components/MelanoranIiOverviewPanel";
import MelanoranIiEvidencePanel from "@/components/MelanoranIiEvidencePanel";
import MelanoranIiSafetyPanel from "@/components/MelanoranIiSafetyPanel";
import MelanoranIiInteractionsPanel from "@/components/MelanoranIiInteractionsPanel";
import MotsCOverviewPanel from "@/components/MotsCOverviewPanel";
import MotsCEvidencePanel from "@/components/MotsCEvidencePanel";
import MotsCSafetyPanel from "@/components/MotsCSafetyPanel";
import MotsCInteractionsPanel from "@/components/MotsCInteractionsPanel";
import OxytocinOverviewPanel from "@/components/OxytocinOverviewPanel";
import OxytocinEvidencePanel from "@/components/OxytocinEvidencePanel";
import OxytocinSafetyPanel from "@/components/OxytocinSafetyPanel";
import OxytocinInteractionsPanel from "@/components/OxytocinInteractionsPanel";
import SemaglutideOverviewPanel from "@/components/SemaglutideOverviewPanel";
import SemaglutideEvidencePanel from "@/components/SemaglutideEvidencePanel";
import SemaglutideSafetyPanel from "@/components/SemaglutideSafetyPanel";
import SemaglutideInteractionsPanel from "@/components/SemaglutideInteractionsPanel";
import TirzepatideOverviewPanel from "@/components/TirzepatideOverviewPanel";
import TirzepatideEvidencePanel from "@/components/TirzepatideEvidencePanel";
import TirzepatideSafetyPanel from "@/components/TirzepatideSafetyPanel";
import TirzepatideInteractionsPanel from "@/components/TirzepatideInteractionsPanel";
import LiraglutideOverviewPanel from "@/components/LiraglutideOverviewPanel";
import LiraglutideEvidencePanel from "@/components/LiraglutideEvidencePanel";
import LiraglutideSafetyPanel from "@/components/LiraglutideSafetyPanel";
import LiraglutideInteractionsPanel from "@/components/LiraglutideInteractionsPanel";
import EpitalonOverviewPanel from "@/components/EpitalonOverviewPanel";
import EpitalonEvidencePanel from "@/components/EpitalonEvidencePanel";
import EpitalonSafetyPanel from "@/components/EpitalonSafetyPanel";
import EpitalonInteractionsPanel from "@/components/EpitalonInteractionsPanel";
import GlutathioneOverviewPanel from "@/components/GlutathioneOverviewPanel";
import GlutathioneEvidencePanel from "@/components/GlutathioneEvidencePanel";
import GlutathioneSafetyPanel from "@/components/GlutathioneSafetyPanel";
import GlutathioneInteractionsPanel from "@/components/GlutathioneInteractionsPanel";
import Ll37OverviewPanel from "@/components/Ll37OverviewPanel";
import Ll37EvidencePanel from "@/components/Ll37EvidencePanel";
import Ll37SafetyPanel from "@/components/Ll37SafetyPanel";
import Ll37InteractionsPanel from "@/components/Ll37InteractionsPanel";
import Igf1OverviewPanel from "@/components/Igf1OverviewPanel";
import Igf1EvidencePanel from "@/components/Igf1EvidencePanel";
import Igf1SafetyPanel from "@/components/Igf1SafetyPanel";
import Igf1InteractionsPanel from "@/components/Igf1InteractionsPanel";

const V3_SLUGS = new Set(["retatrutide", "nad-plus", "bpc-157", "tb-500", "cjc-1295", "ipamorelin", "sermorelin", "mk-677", "ghrp-2", "ghrp-6", "hexarelin", "tesamorelin", "bremelanotide", "selank", "semax", "thymosin-alpha-1", "ghk-cu", "aod-9604", "melanotan-ii", "mots-c", "oxytocin", "semaglutide", "tirzepatide", "igf-1", "liraglutide", "epitalon", "glutathione", "ll-37"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PanelComponent = () => any;
const PANEL_MAP: Record<string, {
  Overview: PanelComponent;
  Evidence: PanelComponent;
  Safety: PanelComponent;
  Interactions: PanelComponent;
}> = {
  retatrutide: {
    Overview: RetaOverviewPanel,
    Evidence: RetaEvidencePanel,
    Safety: RetaSafetyPanel,
    Interactions: RetaInteractionsPanel,
  },
  "nad-plus": {
    Overview: NadPlusOverviewPanel,
    Evidence: NadPlusEvidencePanel,
    Safety: NadPlusSafetyPanel,
    Interactions: NadPlusInteractionsPanel,
  },
  "bpc-157": {
    Overview: BpcOverviewPanel,
    Evidence: BpcEvidencePanel,
    Safety: BpcSafetyPanel,
    Interactions: BpcInteractionsPanel,
  },
  "tb-500": {
    Overview: Tb500OverviewPanel,
    Evidence: Tb500EvidencePanel,
    Safety: Tb500SafetyPanel,
    Interactions: Tb500InteractionsPanel,
  },
  "cjc-1295": {
    Overview: Cjc1295OverviewPanel,
    Evidence: Cjc1295EvidencePanel,
    Safety: Cjc1295SafetyPanel,
    Interactions: Cjc1295InteractionsPanel,
  },
  ipamorelin: {
    Overview: IpamorelinOverviewPanel,
    Evidence: IpamorelinEvidencePanel,
    Safety: IpamorelinSafetyPanel,
    Interactions: IpamorelinInteractionsPanel,
  },
  sermorelin: {
    Overview: SermorelinOverviewPanel,
    Evidence: SermorelinEvidencePanel,
    Safety: SermorelinSafetyPanel,
    Interactions: SermorelinInteractionsPanel,
  },
  "mk-677": {
    Overview: Mk677OverviewPanel,
    Evidence: Mk677EvidencePanel,
    Safety: Mk677SafetyPanel,
    Interactions: Mk677InteractionsPanel,
  },
  "ghrp-2": {
    Overview: Ghrp2OverviewPanel,
    Evidence: Ghrp2EvidencePanel,
    Safety: Ghrp2SafetyPanel,
    Interactions: Ghrp2InteractionsPanel,
  },
  "ghrp-6": {
    Overview: Ghrp6OverviewPanel,
    Evidence: Ghrp6EvidencePanel,
    Safety: Ghrp6SafetyPanel,
    Interactions: Ghrp6InteractionsPanel,
  },
  hexarelin: {
    Overview: HexarelinOverviewPanel,
    Evidence: HexarelinEvidencePanel,
    Safety: HexarelinSafetyPanel,
    Interactions: HexarelinInteractionsPanel,
  },
  tesamorelin: {
    Overview: TesamorelinOverviewPanel,
    Evidence: TesamorelinEvidencePanel,
    Safety: TesamorelinSafetyPanel,
    Interactions: TesamorelinInteractionsPanel,
  },
  bremelanotide: {
    Overview: BremelanotideOverviewPanel,
    Evidence: BremelanotideEvidencePanel,
    Safety: BremelanotideSafetyPanel,
    Interactions: BremelanotideInteractionsPanel,
  },
  selank: {
    Overview: SelankOverviewPanel,
    Evidence: SelankEvidencePanel,
    Safety: SelankSafetyPanel,
    Interactions: SelankInteractionsPanel,
  },
  semax: {
    Overview: SemaxOverviewPanel,
    Evidence: SemaxEvidencePanel,
    Safety: SemaxSafetyPanel,
    Interactions: SemaxInteractionsPanel,
  },
  "thymosin-alpha-1": {
    Overview: ThymosinA1OverviewPanel,
    Evidence: ThymosinA1EvidencePanel,
    Safety: ThymosinA1SafetyPanel,
    Interactions: ThymosinA1InteractionsPanel,
  },
  "ghk-cu": {
    Overview: GhkCuOverviewPanel,
    Evidence: GhkCuEvidencePanel,
    Safety: GhkCuSafetyPanel,
    Interactions: GhkCuInteractionsPanel,
  },
  "aod-9604": {
    Overview: Aod9604OverviewPanel,
    Evidence: Aod9604EvidencePanel,
    Safety: Aod9604SafetyPanel,
    Interactions: Aod9604InteractionsPanel,
  },
  "melanotan-ii": {
    Overview: MelanoranIiOverviewPanel,
    Evidence: MelanoranIiEvidencePanel,
    Safety: MelanoranIiSafetyPanel,
    Interactions: MelanoranIiInteractionsPanel,
  },
  "mots-c": {
    Overview: MotsCOverviewPanel,
    Evidence: MotsCEvidencePanel,
    Safety: MotsCSafetyPanel,
    Interactions: MotsCInteractionsPanel,
  },
  oxytocin: {
    Overview: OxytocinOverviewPanel,
    Evidence: OxytocinEvidencePanel,
    Safety: OxytocinSafetyPanel,
    Interactions: OxytocinInteractionsPanel,
  },
  semaglutide: {
    Overview: SemaglutideOverviewPanel,
    Evidence: SemaglutideEvidencePanel,
    Safety: SemaglutideSafetyPanel,
    Interactions: SemaglutideInteractionsPanel,
  },
  tirzepatide: {
    Overview: TirzepatideOverviewPanel,
    Evidence: TirzepatideEvidencePanel,
    Safety: TirzepatideSafetyPanel,
    Interactions: TirzepatideInteractionsPanel,
  },
  "igf-1": {
    Overview: Igf1OverviewPanel,
    Evidence: Igf1EvidencePanel,
    Safety: Igf1SafetyPanel,
    Interactions: Igf1InteractionsPanel,
  },
  liraglutide: {
    Overview: LiraglutideOverviewPanel,
    Evidence: LiraglutideEvidencePanel,
    Safety: LiraglutideSafetyPanel,
    Interactions: LiraglutideInteractionsPanel,
  },
  epitalon: {
    Overview: EpitalonOverviewPanel,
    Evidence: EpitalonEvidencePanel,
    Safety: EpitalonSafetyPanel,
    Interactions: EpitalonInteractionsPanel,
  },
  glutathione: {
    Overview: GlutathioneOverviewPanel,
    Evidence: GlutathioneEvidencePanel,
    Safety: GlutathioneSafetyPanel,
    Interactions: GlutathioneInteractionsPanel,
  },
  "ll-37": {
    Overview: Ll37OverviewPanel,
    Evidence: Ll37EvidencePanel,
    Safety: Ll37SafetyPanel,
    Interactions: Ll37InteractionsPanel,
  },
};

// Per-peptide hero content for v3 PDPs
const V3_HERO_CONTENT: Record<string, {
  considerSub: string;
  startHere: string[];
}> = {
  retatrutide: {
    considerSub: "Thyroid, SSRIs, autoimmune, older adults\u2026",
    startHere: [
      "Investigational incretin drug being studied for weight and metabolic outcomes.",
      "What matters most: real effects vs. tolerability, and what long-term data still hasn\u2019t been proven.",
      "How to use this page: pick a tab, skim what\u2019s open, expand when you want detail.",
    ],
  },
  "nad-plus": {
    considerSub: "Cancer history, cancer therapy, longevity goals\u2026",
    startHere: [
      "NAD+ is a coenzyme that declines with age — supplementation is aimed at restoring cellular energy and longevity pathways.",
      "What matters most: the mechanism is real, but human outcome data is still thin — manage expectations accordingly.",
      "How to use this page: pick a tab, understand what\u2019s known vs. what\u2019s still theoretical.",
    ],
  },
  "bpc-157": {
    considerSub: "Pregnant, adolescents, autoimmune conditions, NSAID users\u2026",
    startHere: [
      "BPC-157 is a research-grade peptide with 30+ years of animal data and essentially no published human trials.",
      "What matters most: supply chain quality is the primary real-world risk \u2014 the compound\u2019s own side effect profile is mild.",
      "How to use this page: pick a tab, but start with Safety or Interactions if you\u2019re making an active decision.",
    ],
  },
  "tb-500": {
    considerSub: "Cancer history, anticoagulants, pregnant, adolescents\u2026",
    startHere: [
      "TB-500 is a research-grade peptide marketed as a thymosin beta-4 fragment \u2014 most evidence comes from Tβ4 biology, not TB-500 directly.",
      "What matters most: cancer history and anticoagulant status are elevated concerns compared to similar peptides \u2014 check these first.",
      "How to use this page: if you have cancer history or take blood thinners, start with Safety before anything else.",
    ],
  },
  "cjc-1295": {
    considerSub: "Diabetes, prediabetes, cancer history, thyroid therapy, adolescents\u2026",
    startHere: [
      "CJC-1295 is a GHRH analog \u2014 it amplifies GH pulses and elevates IGF-1. It has actual human endocrine evidence (PMID 16352683, 2006).",
      "What matters most: know your variant (DAC vs no-DAC), know your metabolic and cancer history before starting.",
      "How to use this page: if you have diabetes, prediabetes, or cancer history, Safety is your first stop.",
    ],
  },
  ipamorelin: {
    considerSub: "Diabetes, sleep apnea, cancer history, adolescents\u2026",
    startHere: [
      "Ipamorelin is a GHRP \u2014 it stimulates GH release via the ghrelin receptor. Selective relative to older GHRPs; same GH-axis considerations as CJC-1295.",
      "What matters most: metabolic baseline, sleep apnea status, and cancer history \u2014 check all three before starting.",
      "How to use this page: commonly used with CJC-1295 \u2014 read both pages if you\u2019re running the stack.",
    ],
  },
  sermorelin: {
    considerSub: "Diabetes, thyroid disease, cancer history, adolescents\u2026",
    startHere: [
      "Sermorelin is the original GHRH analog \u2014 FDA-approved for pediatric GH deficiency, discontinued due to manufacturing (not safety), now used via compounding pharmacy.",
      "What matters most: the GH-axis considerations are identical to CJC-1295 \u2014 metabolic status, thyroid function, and cancer history before starting.",
      "How to use this page: if you have a prescription context, the physician oversight already frames this \u2014 use the labs that come with it.",
    ],
  },
  "mk-677": {
    considerSub: "Diabetes, heart failure, cancer history, adolescents\u2026",
    startHere: [
      "MK-677 (ibutamoren) is an oral ghrelin receptor agonist \u2014 the same GH-axis mechanism as ipamorelin but taken as a capsule with a 24-hour half-life.",
      "What matters most: sustained GH elevation amplifies glucose, appetite, edema, and carpal tunnel risks vs injectable GHRPs \u2014 same flags, more persistent exposure.",
      "How to use this page: if you have diabetes, heart failure, or are on cardiac medications, Safety is your first stop.",
    ],
  },
  "ghrp-2": {
    considerSub: "Diabetes, corticosteroids, cancer history, cardiovascular disease\u2026",
    startHere: [
      "GHRP-2 is an original research GHRP \u2014 it established the ghrelin receptor GH-release proof of concept but elevates cortisol and prolactin alongside GH (ipamorelin was developed to fix this).",
      "What matters most: the cortisol elevation creates a compounded glucose risk and catabolic counter-pressure that ipamorelin avoids \u2014 consider ipamorelin first if it fits your goals.",
      "How to use this page: if you have diabetes or are on corticosteroids, Safety and Interactions are your first stops.",
    ],
  },
  "ghrp-6": {
    considerSub: "Eating disorder history, diabetes, cancer history, weight management goals\u2026",
    startHere: [
      "GHRP-6 is the 'hunger bomb' GHRP \u2014 strongest appetite stimulation of any GHRP class compound; also elevates cortisol and prolactin like GHRP-2.",
      "What matters most: eating disorder history is a hard stop; if your goal isn\u2019t aggressive caloric surplus, the extreme appetite is more liability than asset.",
      "How to use this page: if you have eating disorder history or are pursuing fat loss, read Overview and Safety before anything else.",
    ],
  },
  hexarelin: {
    considerSub: "Cardiovascular history, diabetes, cancer history, cycling protocols\u2026",
    startHere: [
      "Hexarelin is the highest-potency GHRP for acute GH pulse amplitude \u2014 but also desensitizes faster than any other GHRP (tachyphylaxis). Continuous use loses effect; cycling is required.",
      "What matters most: cardiovascular history requires extra screening due to hexarelin\u2019s unique CD36 receptor binding (not present in any other GHRP); and cycling must be planned before starting.",
      "How to use this page: if you have cardiac history or are considering long-term use, Safety and Interactions are your first stops.",
    ],
  },
  tesamorelin: {
    considerSub: "HIV lipodystrophy, diabetes, cancer history, joint disease, prescription access\u2026",
    startHere: [
      "Tesamorelin (Egrifta) is the only FDA-approved GHRH analog \u2014 approved for visceral fat in HIV-associated lipodystrophy. The enhancement community uses it off-label with the same evidence gap as CJC-1295.",
      "What matters most: the FDA approval means formal prescribing information with stated contraindications (cancer, pregnancy, uncontrolled diabetes) \u2014 and arthralgia/myalgia are the most distinctive side effects vs other GHRH analogs.",
      "How to use this page: same GH-axis safety gates as CJC-1295, plus the arthralgia watch and the on-label vs off-label evidence framing in Overview.",
    ],
  },
  bremelanotide: {
    considerSub: "Cardiovascular disease, hypertension, naltrexone, pregnancy, adolescents\u2026",
    startHere: [
      "Bremelanotide (Vyleesi / PT-141) is FDA-approved for HSDD in premenopausal women \u2014 a CNS desire pathway drug, not a hormone and not a blood flow drug like PDE5 inhibitors.",
      "What matters most: nausea (~40% in trials) requires a management plan before first use; cardiovascular caution is real \u2014 uncontrolled hypertension is a prescribing information contraindication.",
      "How to use this page: if you have cardiovascular history, hypertension, or are on naltrexone, Interactions is your first stop.",
    ],
  },
  selank: {
    considerSub: "Benzodiazepines, opioids, alcohol, psychiatric medications, adolescents\u2026",
    startHere: [
      "Selank is a Russian-developed synthetic peptide (tuftsin analog) used as a non-sedating anxiolytic \u2014 GABAergic modulation + enkephalinase inhibition; intranasal primarily.",
      "What matters most: CNS drug interactions (benzos, opioids, alcohol) are the primary real risk; selank alone in a person without CNS-active medications has a favorable safety profile.",
      "How to use this page: screen for CNS medications first (Interactions), then assess the evidence context (Evidence) for the Russian clinical data framing.",
    ],
  },
  semax: {
    considerSub: "Psychiatric medications, MAOIs, stimulants, anxiety history, adolescents\u2026",
    startHere: [
      "Semax is a Russian ACTH-fragment peptide used for cognitive enhancement and neuroprotection \u2014 BDNF upregulation + dopaminergic/serotonergic activation; more stimulatory than Selank.",
      "What matters most: psychiatric medication interactions (MAOIs, antipsychotics, stimulants) are flags; anxiety-prone individuals risk worsening \u2014 Selank co-use is the standard buffer.",
      "How to use this page: screen psychiatric medications first (Interactions), then anxiety baseline; the Evidence page frames the Russian clinical evidence context honestly.",
    ],
  },
  "thymosin-alpha-1": {
    considerSub: "Autoimmune disease, immunosuppressants, organ transplant, active infection\u2026",
    startHere: [
      "Thymosin Alpha-1 (Zadaxin / Thymalfasin) is approved in ~35 countries for chronic hepatitis B, hepatitis C, and oncology-adjunct contexts \u2014 not US FDA-approved, widely discussed for immune support.",
      "What matters most: autoimmune disease and immunosuppressive therapy are direct pharmacological conflicts \u2014 immune activation in the wrong direction. Check these first.",
      "How to use this page: if you have any autoimmune diagnosis or are on immunosuppressive medications, Safety and Interactions are your mandatory first stops.",
    ],
  },
  "ghk-cu": {
    considerSub: "Copper sensitivity, Wilson\u2019s disease, injectable use, prescription retinoids\u2026",
    startHere: [
      "GHK-Cu (Copper Tripeptide-1) is primarily a topical cosmetic ingredient \u2014 widely used in skincare, not an FDA-approved drug. Topical risk is genuinely low; injectable GHK-Cu is a different profile entirely.",
      "What matters most: the topical vs injectable distinction \u2014 all the cosmetic safety data does not apply to injectable use. Copper sensitivity is the one flag that applies to both.",
      "How to use this page: if you\u2019re evaluating topical GHK-Cu products, Overview and Safety have what you need. If you\u2019re considering injectable use, treat it as a research peptide and read the Interactions page carefully.",
    ],
  },
  "aod-9604": {
    considerSub: "Diabetes, glucose-lowering medications, cardiovascular disease, adolescents\u2026",
    startHere: [
      "AOD-9604 is a synthetic fragment of hGH (amino acids 176\u2013191) designed to isolate fat-metabolizing effects without IGF-1 or growth-axis stimulation. It completed Phase II human trials \u2014 which did not show significant weight loss.",
      "What matters most: the Phase II trial did not get FDA approval, so the real-world expectations ceiling is modest. Diabetes medications are the primary interaction flag due to the metabolic mechanism.",
      "How to use this page: if you have diabetes or are on glucose-lowering medications, Interactions is your first stop. Evidence is worth reading for the Phase II context before forming expectations.",
    ],
  },
  "melanotan-ii": {
    considerSub: "Melanoma history, atypical moles, cardiovascular disease, pregnancy, adolescents\u2026",
    startHere: [
      "Melanotan II (MT-2) is an unregulated synthetic melanocortin agonist \u2014 not FDA-approved, sold as a research chemical. It produces tanning, libido effects, and appetite suppression through non-selective MC receptor activation.",
      "What matters most: the melanoma association signal (case reports) is real enough to be a hard stop for anyone with melanoma history or multiple atypical moles. Nausea is extremely common and needs a management plan.",
      "How to use this page: melanoma/skin cancer history or multiple moles \u2014 Safety first, then stop. Everyone else: read the Evidence page for an honest view of what the data shows vs. what the community narrative says.",
    ],
  },
  "mots-c": {
    considerSub: "Diabetes, metformin, glucose-lowering medications, adolescents\u2026",
    startHere: [
      "MOTS-c is a mitochondrial-derived peptide discovered in 2015 \u2014 the only peptide encoded by mitochondrial DNA in common wellness discussion. Natural levels rise with exercise and decline with age.",
      "What matters most: no human RCTs exist as of 2025 \u2014 all evidence is animal studies and observational biomarker data. AMPK activation overlaps with metformin mechanism; diabetes medication interaction is the primary clinical flag.",
      "How to use this page: if you\u2019re on diabetes medications or metformin, Interactions first. Evidence is the most important tab for calibrating expectations given the pre-clinical evidence ceiling.",
    ],
  },
  oxytocin: {
    considerSub: "Pregnancy, seizure disorders, SSRIs/serotonergic meds, cardiovascular disease\u2026",
    startHere: [
      "Oxytocin (Pitocin) is an FDA-approved hormone for obstetric use. The wellness community uses intranasal formulations for social bonding/mood \u2014 the evidence for these effects in healthy adults is substantially less consistent than the \u2018love hormone\u2019 narrative suggests.",
      "What matters most: pregnancy is an absolute contraindication (oxytocin causes uterine contractions \u2014 this is literally how it\u2019s used clinically). Seizure disorders and serotonergic medications are the other key flags.",
      "How to use this page: pregnancy must be excluded before anything else. Then read Evidence for the honest view on the social cognition replication crisis before forming expectations about the intranasal wellness use case.",
    ],
  },
  semaglutide: {
    considerSub: "Insulin, sulfonylureas, thyroid cancer history, pancreatitis history, pregnancy\u2026",
    startHere: [
      "Semaglutide (Ozempic for T2D, Wegovy for weight) is the GLP-1 drug that set the modern benchmark — ~15% body weight reduction in STEP 1. It\u2019s also the compound with the deepest evidence base, including cardiovascular outcome data from the SELECT trial.",
      "What matters most: GI tolerability (nausea ~40-44% during titration) is the primary practical challenge — the titration schedule manages it. Thyroid cancer/MEN2 history and pancreatitis history are hard stops.",
      "How to use this page: if you\u2019re comparing semaglutide to tirzepatide, Overview has the head-to-head. If you have diabetes or are on insulin/sulfonylureas, Interactions is your first stop.",
    ],
  },
  tirzepatide: {
    considerSub: "Insulin, sulfonylureas, thyroid cancer history, pancreatitis history, pregnancy\u2026",
    startHere: [
      "Tirzepatide (Mounjaro for T2D, Zepbound for weight) is the first dual GLP-1/GIP agonist — ~22% body weight reduction in SURMOUNT-1, meaningfully more than semaglutide, with generally less nausea.",
      "What matters most: same class contraindications as semaglutide (thyroid cancer/MEN2, pancreatitis, pregnancy). The lean mass management challenge is greater given more powerful appetite suppression.",
      "How to use this page: if you\u2019re deciding between tirzepatide and semaglutide, Overview has the comparison. If on insulin or sulfonylureas, Interactions is your first stop before starting.",
    ],
  },
  "igf-1": {
    considerSub: "Cancer history, diabetes, insulin, cancer medications, physician oversight required\u2026",
    startHere: [
      "IGF-1 (Insulin-like Growth Factor 1) is the highest-risk compound reviewed on this site for healthy adult use. Hypoglycemia (acute, documented, has caused hospitalizations) and mitogenic cancer concern are the two defining risks. The clinical evidence base is pediatric deficiency, not healthy adult enhancement.",
      "What matters most: cancer history is an absolute hard stop. Diabetes is a hard stop. Injecting fasted is the most preventable acute risk \u2014 eat a carbohydrate meal 20-30 minutes before every injection. The safety evidence is stronger than the efficacy evidence for enhancement use.",
      "How to use this page: read Safety before anything else. If you have cancer history or diabetes, stop there. Overview has the comparison to GH secretagogues \u2014 a substantially lower-risk alternative worth understanding before committing to exogenous IGF-1.",
    ],
  },
  liraglutide: {
    considerSub: "Thyroid/MEN2 history, pancreatitis, pregnancy, insulin or sulfonylurea users\u2026",
    startHere: [
      "Liraglutide is the original GLP-1 agonist benchmark \u2014 FDA-approved (Victoza for T2D, Saxenda for weight), daily injection, ~5-8% body weight reduction in SCALE trials.",
      "What matters most: if you are starting fresh and maximum weight loss is the goal, weekly semaglutide (~15%) or tirzepatide (~22%) outperform liraglutide by a wide margin. Liraglutide makes sense if you are already stable on it, or specifically need daily dosing flexibility.",
      "How to use this page: if you are on insulin or sulfonylureas, Interactions is your first stop. Safety has the thyroid/pancreatitis contraindication screen. Overview has the head-to-head comparison.",
    ],
  },
  epitalon: {
    considerSub: "Cancer history (hard stop), pregnancy, adolescents, unverified source\u2026",
    startHere: [
      "Epitalon is a Soviet-era synthetic tetrapeptide from pineal gland research. The evidence base is small Russian trials (Khavinson group) showing reduced mortality in elderly cohorts \u2014 real data, not independently replicated at Western RCT scale.",
      "What matters most: the telomerase activation mechanism is the defining tension. The same pathway that could slow cellular aging is the same pathway that makes cancer cells immortal. Cancer history is a hard stop \u2014 this is not a theoretical concern to rationalize around.",
      "How to use this page: Safety first if you have any cancer history. Evidence has the honest calibration of what the Russian trials do and don\u2019t show. Overview has the comparison to NAD+, which has more independent Western replication.",
    ],
  },
  glutathione: {
    considerSub: "Active chemotherapy/radiation, asthma (inhaled form), NAC users\u2026",
    startHere: [
      "Glutathione is the body\u2019s master antioxidant. Route determines everything: oral standard-form has poor bioavailability; liposomal is better; IV is clinical-grade. The evidence base mostly reflects IV administration.",
      "What matters most: NAC is the more evidence-supported, better-bioavailable oral alternative for most people. Chemotherapy and radiation are the critical interaction \u2014 the antioxidant/pro-oxidant conflict requires oncology guidance before any glutathione supplementation during active cancer treatment.",
      "How to use this page: if you are on chemotherapy or radiation, Interactions first \u2014 full stop. Evidence explains why the route matters and what IV vs. oral evidence actually shows. Overview has the comparison to NAC and ALA.",
    ],
  },
  "ll-37": {
    considerSub: "Autoimmune conditions (hard stop), cancer history, immunosuppressant users\u2026",
    startHere: [
      "LL-37 is a human host-defense peptide (cathelicidin) with extraordinary in vitro antimicrobial and immunomodulatory data \u2014 and essentially zero human RCTs for enhancement use in healthy adults.",
      "What matters most: the dual-edge immunology is not a nuance. LL-37 is elevated in psoriatic lesions and causally drives the pathology \u2014 it is an autoimmune trigger, not a bystander. Any autoimmune condition is a mechanism-based hard stop, not a general precaution.",
      "How to use this page: Safety first if you have any autoimmune condition or cancer history. Evidence is honest about the in vitro vs. human gap. Overview explains why thymosin alpha-1 is a substantially safer immune support option for most people.",
    ],
  },
};

export default async function PeptidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const isV3 = V3_SLUGS.has(slug);
  // Keep isRetatrutide for reta-specific hero content that's still hardcoded (mobile vial src)
  const isRetatrutide = slug === "retatrutide";

  const riskHit = getRiskForPeptide(slug);
  const safetyLinks = (riskHit?.safety_links ?? []).filter(Boolean);
  const hasSafetyFlags = Boolean(
    riskHit && (
      riskHit.risk?.severity ||
      riskHit.risk?.likelihood ||
      riskHit.risk?.developmental_risk ||
      riskHit.risk?.unknowns_penalty ||
      safetyLinks.length
    )
  );

  const doc = await loadPeptideBySlug(slug);
  const supportPack = getSupportPack(doc as any);

  const p = doc?.peptide ?? {};
  const sections = p?.sections ?? {};

  const peptideName = String(p?.canonical_name ?? slug);

  const statusCategory = String(p?.status?.category ?? p?.classification?.category ?? "").trim();

  function titleize(x: string) {
    return x
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }

  const statusLabel = statusCategory ? titleize(statusCategory) : "";

  const topicSlug = String(p?.topics?.primary?.[0] ?? "").trim();
  function topicLabelFor(slug: string) {
    const clean = slug.replace(/^topic_/, "").trim();
    if (!clean) return "";
    if (clean == "fat_loss_metabolism") return "Fat loss & metabolism";
    return titleize(clean);
  }
  const topicLabel = topicLabelFor(topicSlug);

  const evidenceLabel = evidenceGradeLabel(riskHit?.risk?.evidence_grade ?? null);

  const mergedAliases = Array.from(
    new Set([...(Array.isArray(p?.aliases) ? p.aliases : []), ...getAliasesForSlug(slug)])
  );

  const panels = PANEL_MAP[slug] ?? PANEL_MAP["retatrutide"];
  const heroContent = V3_HERO_CONTENT[slug] ?? V3_HERO_CONTENT["retatrutide"];

  return (
    <main className={`pt-page${isV3 ? " pt-benchmark" : ""}`}>
      {isV3 ? (
        /* RETA_HERO_V2_GLASS — full-width gradient container with 3-column inner grid */
        <div className="reta-hero-v2">
          <div className="reta-hero-v2__inner">
            {/* Column 1: Vial */}
            <div className="reta-hero-v2__vial">
              <VialImage kind="peptide" slug={slug} alt={`${peptideName} vial`} size={190} />
            </div>

            {/* Column 2: Title + Frame + Quick jumps */}
            <div className="reta-hero-v2__main">
              {/* Mobile: small vial inline with title */}
              <div className="reta-hero-v2__title-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="reta-hero-v2__vial-sm"
                  src={`/vials/peptide/${slug}-sm.png`}
                  alt=""
                  aria-hidden="true"
                  width={70}
                  height={105}
                />
                <h1 className="reta-hero-v2__title">{peptideName}</h1>
              </div>
              <p className="reta-hero-v2__frame">
                What it is, why people care, what to watch for, and what&apos;s still uncertain — presented calmly and with explicit uncertainty where evidence is thin.
              </p>
              <nav className="reta-hero-v2__jumps">
                <span className="reta-hero-v2__jumps-label">Quick jumps:</span>
                <a className="reta-hero-v2__jump" href="#evidence">Evidence</a>
                <a className="reta-hero-v2__jump" href="#safety">Safety</a>
                <a className="reta-hero-v2__jump" href="#interactions">Interactions</a>
                <a className="reta-hero-v2__jump" href="#community">Community</a>
              </nav>
            </div>

            {/* Column 3: Single posture glass card */}
            <div className="reta-hero-v2__rail">
              <div className="reta-glass-card">
                {statusLabel ? (
                  <div className="reta-glass-card__row">
                    <span className="reta-glass-card__label">Status</span>
                    <span className="reta-glass-card__chip">{statusLabel}</span>
                  </div>
                ) : null}
                {topicLabel ? (
                  <div className="reta-glass-card__row">
                    <span className="reta-glass-card__label">Context</span>
                    <span className="reta-glass-card__chip">{topicLabel}</span>
                  </div>
                ) : null}
                <div className="reta-glass-card__body">
                  <div className="reta-glass-card__evidence">{evidenceLabel}.</div>
                  <p className="reta-glass-card__disclaimer">
                    This page is a descriptive overview — it does not provide protocols or personalized instruction.
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: Consider banner — spans cols 1-2, extends under vial */}
            <a className="reta-hero-v2__consider-btn" href="#considerations">
              <span className="reta-hero-v2__consider-main">For your situation</span>
              <span className="reta-hero-v2__consider-sub">{heroContent.considerSub}</span>
              <span className="reta-hero-v2__consider-arrow">→</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="pt-hero">
          <VialImage kind="peptide" slug={slug} alt={`${peptideName} vial`} />

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1>{peptideName}</h1>

              <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <a
                  href="#community"
                  style={{
                    textDecoration: "none",
                    fontWeight: 900,
                    opacity: 0.88,
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: 999,
                    padding: "8px 10px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Join the Conversation →
                  <span style={{ fontSize: 12, opacity: 0.72, fontWeight: 700, marginLeft: 10 }}>
                    See real-world experiences
                  </span>
                </a>
              </div>
              <nav className="pt-hero-jumps">
                <a className="pt-hero-jump" href="#evidence">Evidence</a>
                <a className="pt-hero-jump" href="#interactions">Interactions</a>
                <a className="pt-hero-jump" href="#considerations">For your situation</a>
                <a className="pt-hero-jump" href="#community">Community</a>
              </nav>
            </div>
            <div className="w-full sm:max-w-[420px] flex flex-col gap-3">
              {riskHit ? (
                <div>
                  <MaturityPostureLabel evidenceGrade={riskHit?.risk?.evidence_grade ?? null} />
                </div>
              ) : null}
              <AliasSequenceMini aliases={mergedAliases} />
            </div>
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      {isV3 && <BodyClass className="reta-page" />}
      {isV3 ? (
        <div className="reta-body-tabs">
          {/* Start Here strip — full width, above tabs */}
          <div className="reta-start-strip">
            <h2 className="reta-start-strip__heading">Start here</h2>
            <ul className="reta-start-strip__list">
              {heroContent.startHere.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>

          <PDPTabs tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <section className="reta-g-card">
                  <panels.Overview />
                </section>
              ),
            },
            {
              id: "evidence",
              label: "Evidence",
              content: (
                <section className="reta-g-card">
                  <panels.Evidence />
                </section>
              ),
            },
            {
              id: "safety",
              label: "Safety",
              content: (
                <section className="reta-g-card">
                  <panels.Safety />
                </section>
              ),
            },
            {
              id: "interactions",
              label: "Interactions",
              content: (
                <section className="reta-g-card">
                  <panels.Interactions />
                </section>
              ),
            },
            {
              id: "considerations",
              label: "For You",
              content: (
                <>
                  <section className="reta-g-card">
                    <PDPContextualConsiderations peptideName={peptideName} noWrap />
                  </section>
                  {supportPack ? <SupportLayerSection pack={supportPack} /> : null}
                </>
              ),
            },
            {
              id: "community",
              label: "Community",
              content: null,
            },
          ]} />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left / main column */}
          <div className="grid gap-6">
            <section className="pt-card">
              <ContentBlocks
                heading="Overview"
                blocks={sections?.overview ?? null}
                showEmpty
                emptyText="No overview has been added yet."
                wrapCard={false}
              />
            </section>
            <a className="pt-mid-cta" href="#community">
              Join the conversation →
              <span className="pt-mid-cta__sub">Real-world notes from people who&apos;ve tried it</span>
            </a>
            <section className="pt-card">
              <ContentBlocks
                heading="What people discuss and why it matters"
                blocks={sections?.use_cases ?? null}
                showEmpty
                emptyText="No discussion framing has been added yet."
                wrapCard={false}
              />
            </section>
            <section id="evidence" className="pt-card">
              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <h2 style={{ margin: 0 }}>Evidence</h2>
                  <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.78, maxWidth: 760 }}>
                    This is a living snapshot of what&apos;s been studied, what&apos;s been observed, and what remains unclear — without hype framing. Expand &ldquo;Deep dive&rdquo; for the full structure and nuance.
                  </p>
                </div>
                {/* PT_EVIDENCE_DEEP_DIVE_V1 */}
                <CollapsibleSection title="Deep dive" defaultCollapsedMobile defaultCollapsed>
                  <div style={{ display: "grid", gap: 12 }}>
                    <CollapsibleSection title="What the evidence includes" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                      <div style={{ marginTop: 10 }}>
                        <ContentBlocks
                          heading="Evidence posture"
                          blocks={sections?.evidence_posture ?? null}
                          showEmpty
                          emptyText="No evidence posture has been added yet."
                          wrapCard={false}
                        />
                      </div>
                    </CollapsibleSection>
                    <CollapsibleSection title="How to read this" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                      <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.65, opacity: 0.92, maxWidth: 760 }}>
                        Favor human data over animal-only findings. Look for replication, duration, and whether outcomes are clinically meaningful
                        (not just surrogate markers). If results are short-term, single-site, or based on small samples, treat conclusions as provisional.
                      </div>
                    </CollapsibleSection>
                    <CollapsibleSection title="What&apos;s missing" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                      <ul className="pt-safety__list" style={{ marginTop: 10 }}>
                        <li>Long-duration follow-up in diverse populations.</li>
                        <li>Clear comparisons versus established alternatives on outcomes people actually care about.</li>
                        <li>Better understanding of who benefits most, who tolerates it poorly, and why.</li>
                      </ul>
                    </CollapsibleSection>
                    <CollapsibleSection title="Study list" defaultCollapsedMobile defaultCollapsed titleClassName="pt-collapse-title--nested">
                      <div style={{ marginTop: 10 }}>
                        <EvidenceList evidence={p?.evidence ?? []} wrapCard={false} />
                      </div>
                    </CollapsibleSection>
                  </div>
                </CollapsibleSection>
              </div>
            </section>
            <section id="interactions" className="pt-card">
              <InteractionsSection
                hideHeading={false}
                drugClasses={doc?.interactions?.drug_classes}
                supplementClasses={doc?.interactions?.supplement_classes}
                peptides={doc?.interactions?.peptides}
                interactionSummaryBlocks={sections?.interaction_summary}
              />
            </section>
            <section id="considerations" className="pt-card">
              <PDPContextualConsiderations peptideName={peptideName} noWrap={false} />
            </section>
          </div>
          {/* Right column */}
          <div className="grid gap-6">
            {supportPack ? <SupportLayerSection pack={supportPack} /> : null}
          </div>
        </div>
      )}

      {/* NOTE: Community read is public; write requires auth. */}
      <div className={isV3 ? "reta-community" : ""}>
        <PeptideCommentsSection slug={slug} />
      </div>
    </main>
  );
}
