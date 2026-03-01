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
import CagrilintideOverviewPanel from "@/components/CagrilintideOverviewPanel";
import CagrilintideEvidencePanel from "@/components/CagrilintideEvidencePanel";
import CagrilintideSafetyPanel from "@/components/CagrilintideSafetyPanel";
import CagrilintideInteractionsPanel from "@/components/CagrilintideInteractionsPanel";
import ThymosinBeta4OverviewPanel from "@/components/ThymosinBeta4OverviewPanel";
import ThymosinBeta4EvidencePanel from "@/components/ThymosinBeta4EvidencePanel";
import ThymosinBeta4SafetyPanel from "@/components/ThymosinBeta4SafetyPanel";
import ThymosinBeta4InteractionsPanel from "@/components/ThymosinBeta4InteractionsPanel";
import FiveAmino1MQOverviewPanel from "@/components/FiveAmino1MQOverviewPanel";
import FiveAmino1MQEvidencePanel from "@/components/FiveAmino1MQEvidencePanel";
import FiveAmino1MQSafetyPanel from "@/components/FiveAmino1MQSafetyPanel";
import FiveAmino1MQInteractionsPanel from "@/components/FiveAmino1MQInteractionsPanel";
import KisspeptinOverviewPanel from "@/components/KisspeptinOverviewPanel";
import KisspeptinEvidencePanel from "@/components/KisspeptinEvidencePanel";
import KisspeptinSafetyPanel from "@/components/KisspeptinSafetyPanel";
import KisspeptinInteractionsPanel from "@/components/KisspeptinInteractionsPanel";
import GonadorelinOverviewPanel from "@/components/GonadorelinOverviewPanel";
import GonadorelinEvidencePanel from "@/components/GonadorelinEvidencePanel";
import GonadorelinSafetyPanel from "@/components/GonadorelinSafetyPanel";
import GonadorelinInteractionsPanel from "@/components/GonadorelinInteractionsPanel";
import Follistatin344OverviewPanel from "@/components/Follistatin344OverviewPanel";
import Follistatin344EvidencePanel from "@/components/Follistatin344EvidencePanel";
import Follistatin344SafetyPanel from "@/components/Follistatin344SafetyPanel";
import Follistatin344InteractionsPanel from "@/components/Follistatin344InteractionsPanel";
import HumaninOverviewPanel from "@/components/HumaninOverviewPanel";
import HumaninEvidencePanel from "@/components/HumaninEvidencePanel";
import HumaninSafetyPanel from "@/components/HumaninSafetyPanel";
import HumaninInteractionsPanel from "@/components/HumaninInteractionsPanel";
import DSIPOverviewPanel from "@/components/DSIPOverviewPanel";
import DSIPEvidencePanel from "@/components/DSIPEvidencePanel";
import DSIPSafetyPanel from "@/components/DSIPSafetyPanel";
import DSIPInteractionsPanel from "@/components/DSIPInteractionsPanel";
import PramlintideOverviewPanel from "@/components/PramlintideOverviewPanel";
import PramlintideEvidencePanel from "@/components/PramlintideEvidencePanel";
import PramlintideSafetyPanel from "@/components/PramlintideSafetyPanel";
import PramlintideInteractionsPanel from "@/components/PramlintideInteractionsPanel";
import HCGOverviewPanel from "@/components/HCGOverviewPanel";
import HCGEvidencePanel from "@/components/HCGEvidencePanel";
import HCGSafetyPanel from "@/components/HCGSafetyPanel";
import HCGInteractionsPanel from "@/components/HCGInteractionsPanel";
import SS31OverviewPanel from "@/components/SS31OverviewPanel";
import SS31EvidencePanel from "@/components/SS31EvidencePanel";
import SS31SafetyPanel from "@/components/SS31SafetyPanel";
import SS31InteractionsPanel from "@/components/SS31InteractionsPanel";
import IGF1LR3OverviewPanel from "@/components/IGF1LR3OverviewPanel";
import IGF1LR3EvidencePanel from "@/components/IGF1LR3EvidencePanel";
import IGF1LR3SafetyPanel from "@/components/IGF1LR3SafetyPanel";
import IGF1LR3InteractionsPanel from "@/components/IGF1LR3InteractionsPanel";
import SomatostatinOverviewPanel from "@/components/SomatostatinOverviewPanel";
import SomatostatinEvidencePanel from "@/components/SomatostatinEvidencePanel";
import SomatostatinSafetyPanel from "@/components/SomatostatinSafetyPanel";
import SomatostatinInteractionsPanel from "@/components/SomatostatinInteractionsPanel";
import Bpc157ArginateOverviewPanel from "@/components/Bpc157ArginateOverviewPanel";
import Bpc157ArginateEvidencePanel from "@/components/Bpc157ArginateEvidencePanel";
import Bpc157ArginaleSafetyPanel from "@/components/Bpc157ArginaleSafetyPanel";
import Bpc157ArginateInteractionsPanel from "@/components/Bpc157ArginateInteractionsPanel";
import ThymosinBeta4FullOverviewPanel from "@/components/ThymosinBeta4FullOverviewPanel";
import ThymosinBeta4FullEvidencePanel from "@/components/ThymosinBeta4FullEvidencePanel";
import ThymosinBeta4FullSafetyPanel from "@/components/ThymosinBeta4FullSafetyPanel";
import ThymosinBeta4FullInteractionsPanel from "@/components/ThymosinBeta4FullInteractionsPanel";
import Cjc1295DacOverviewPanel from "@/components/Cjc1295DacOverviewPanel";
import Cjc1295DacEvidencePanel from "@/components/Cjc1295DacEvidencePanel";
import Cjc1295DacSafetyPanel from "@/components/Cjc1295DacSafetyPanel";
import Cjc1295DacInteractionsPanel from "@/components/Cjc1295DacInteractionsPanel";
import VasopressinOverviewPanel from "@/components/VasopressinOverviewPanel";
import VasopressinEvidencePanel from "@/components/VasopressinEvidencePanel";
import VasopressinSafetyPanel from "@/components/VasopressinSafetyPanel";
import VasopressinInteractionsPanel from "@/components/VasopressinInteractionsPanel";
import TriptorelinOverviewPanel from "@/components/TriptorelinOverviewPanel";
import TriptorelinEvidencePanel from "@/components/TriptorelinEvidencePanel";
import TriptorelinSafetyPanel from "@/components/TriptorelinSafetyPanel";
import TriptorelinInteractionsPanel from "@/components/TriptorelinInteractionsPanel";
import KpvOverviewPanel from "@/components/KpvOverviewPanel";
import KpvEvidencePanel from "@/components/KpvEvidencePanel";
import KpvSafetyPanel from "@/components/KpvSafetyPanel";
import KpvInteractionsPanel from "@/components/KpvInteractionsPanel";
import AnpOverviewPanel from "@/components/AnpOverviewPanel";
import AnpEvidencePanel from "@/components/AnpEvidencePanel";
import AnpSafetyPanel from "@/components/AnpSafetyPanel";
import AnpInteractionsPanel from "@/components/AnpInteractionsPanel";
import LeuprolideOverviewPanel from "@/components/LeuprolideOverviewPanel";
import LeuprolideEvidencePanel from "@/components/LeuprolideEvidencePanel";
import LeuprolideSafetyPanel from "@/components/LeuprolideSafetyPanel";
import LeuprolideInteractionsPanel from "@/components/LeuprolideInteractionsPanel";
import DesmopressinOverviewPanel from "@/components/DesmopressinOverviewPanel";
import DesmopressinEvidencePanel from "@/components/DesmopressinEvidencePanel";
import DesmopressinSafetyPanel from "@/components/DesmopressinSafetyPanel";
import DesmopressinInteractionsPanel from "@/components/DesmopressinInteractionsPanel";
import CalcitoninOverviewPanel from "@/components/CalcitoninOverviewPanel";
import CalcitoninEvidencePanel from "@/components/CalcitoninEvidencePanel";
import CalcitoninSafetyPanel from "@/components/CalcitoninSafetyPanel";
import CalcitoninInteractionsPanel from "@/components/CalcitoninInteractionsPanel";
import GlucagonOverviewPanel from "@/components/GlucagonOverviewPanel";
import GlucagonEvidencePanel from "@/components/GlucagonEvidencePanel";
import GlucagonSafetyPanel from "@/components/GlucagonSafetyPanel";
import GlucagonInteractionsPanel from "@/components/GlucagonInteractionsPanel";
import ExenatideOverviewPanel from "@/components/ExenatideOverviewPanel";
import ExenatideEvidencePanel from "@/components/ExenatideEvidencePanel";
import ExenatideSafetyPanel from "@/components/ExenatideSafetyPanel";
import ExenatideInteractionsPanel from "@/components/ExenatideInteractionsPanel";
import SubstancePOverviewPanel from "@/components/SubstancePOverviewPanel";
import SubstancePEvidencePanel from "@/components/SubstancePEvidencePanel";
import SubstancePSafetyPanel from "@/components/SubstancePSafetyPanel";
import SubstancePInteractionsPanel from "@/components/SubstancePInteractionsPanel";
import OrexinAOverviewPanel from "@/components/OrexinAOverviewPanel";
import OrexinAEvidencePanel from "@/components/OrexinAEvidencePanel";
import OrexinASafetyPanel from "@/components/OrexinASafetyPanel";
import OrexinAInteractionsPanel from "@/components/OrexinAInteractionsPanel";
import NeuropeptideYOverviewPanel from "@/components/NeuropeptideYOverviewPanel";
import NeuropeptideYEvidencePanel from "@/components/NeuropeptideYEvidencePanel";
import NeuropeptideYSafetyPanel from "@/components/NeuropeptideYSafetyPanel";
import NeuropeptideYInteractionsPanel from "@/components/NeuropeptideYInteractionsPanel";
import AbaloparatideOverviewPanel from "@/components/AbaloparatideOverviewPanel";
import AbaloparatideEvidencePanel from "@/components/AbaloparatideEvidencePanel";
import AbaloparatideSafetyPanel from "@/components/AbaloparatideSafetyPanel";
import AbaloparatideInteractionsPanel from "@/components/AbaloparatideInteractionsPanel";
import AcetylHexapeptide8OverviewPanel from "@/components/AcetylHexapeptide8OverviewPanel";
import AcetylHexapeptide8EvidencePanel from "@/components/AcetylHexapeptide8EvidencePanel";
import AcetylHexapeptide8SafetyPanel from "@/components/AcetylHexapeptide8SafetyPanel";
import AcetylHexapeptide8InteractionsPanel from "@/components/AcetylHexapeptide8InteractionsPanel";
import AdipotideOverviewPanel from "@/components/AdipotideOverviewPanel";
import AdipotideEvidencePanel from "@/components/AdipotideEvidencePanel";
import AdipotideSafetyPanel from "@/components/AdipotideSafetyPanel";
import AdipotideInteractionsPanel from "@/components/AdipotideInteractionsPanel";
import AfamelanotideOverviewPanel from "@/components/AfamelanotideOverviewPanel";
import AfamelanotideEvidencePanel from "@/components/AfamelanotideEvidencePanel";
import AfamelanotideSafetyPanel from "@/components/AfamelanotideSafetyPanel";
import AfamelanotideInteractionsPanel from "@/components/AfamelanotideInteractionsPanel";
import AmylinOverviewPanel from "@/components/AmylinOverviewPanel";
import AmylinEvidencePanel from "@/components/AmylinEvidencePanel";
import AmylinSafetyPanel from "@/components/AmylinSafetyPanel";
import AmylinInteractionsPanel from "@/components/AmylinInteractionsPanel";
import AngiotensinIiOverviewPanel from "@/components/AngiotensinIiOverviewPanel";
import AngiotensinIiEvidencePanel from "@/components/AngiotensinIiEvidencePanel";
import AngiotensinIiSafetyPanel from "@/components/AngiotensinIiSafetyPanel";
import AngiotensinIiInteractionsPanel from "@/components/AngiotensinIiInteractionsPanel";
import Ara290OverviewPanel from "@/components/Ara290OverviewPanel";
import Ara290EvidencePanel from "@/components/Ara290EvidencePanel";
import Ara290SafetyPanel from "@/components/Ara290SafetyPanel";
import Ara290InteractionsPanel from "@/components/Ara290InteractionsPanel";
import BivalirudinOverviewPanel from "@/components/BivalirudinOverviewPanel";
import BivalirudinEvidencePanel from "@/components/BivalirudinEvidencePanel";
import BivalirudinSafetyPanel from "@/components/BivalirudinSafetyPanel";
import BivalirudinInteractionsPanel from "@/components/BivalirudinInteractionsPanel";
import BradykininOverviewPanel from "@/components/BradykininOverviewPanel";
import BradykininEvidencePanel from "@/components/BradykininEvidencePanel";
import BradykininSafetyPanel from "@/components/BradykininSafetyPanel";
import BradykininInteractionsPanel from "@/components/BradykininInteractionsPanel";
import BrainNatriureticPeptideOverviewPanel from "@/components/BrainNatriureticPeptideOverviewPanel";
import BrainNatriureticPeptideEvidencePanel from "@/components/BrainNatriureticPeptideEvidencePanel";
import BrainNatriureticPeptideSafetyPanel from "@/components/BrainNatriureticPeptideSafetyPanel";
import BrainNatriureticPeptideInteractionsPanel from "@/components/BrainNatriureticPeptideInteractionsPanel";
import CarbetocinOverviewPanel from "@/components/CarbetocinOverviewPanel";
import CarbetocinEvidencePanel from "@/components/CarbetocinEvidencePanel";
import CarbetocinSafetyPanel from "@/components/CarbetocinSafetyPanel";
import CarbetocinInteractionsPanel from "@/components/CarbetocinInteractionsPanel";
import CgrpOverviewPanel from "@/components/CgrpOverviewPanel";
import CgrpEvidencePanel from "@/components/CgrpEvidencePanel";
import CgrpSafetyPanel from "@/components/CgrpSafetyPanel";
import CgrpInteractionsPanel from "@/components/CgrpInteractionsPanel";

const V3_SLUGS = new Set(["retatrutide", "nad-plus", "bpc-157", "tb-500", "cjc-1295", "ipamorelin", "sermorelin", "mk-677", "ghrp-2", "ghrp-6", "hexarelin", "tesamorelin", "bremelanotide", "selank", "semax", "thymosin-alpha-1", "ghk-cu", "aod-9604", "melanotan-ii", "mots-c", "oxytocin", "semaglutide", "tirzepatide", "igf-1", "liraglutide", "epitalon", "glutathione", "ll-37", "cagrilintide", "thymosin-beta-4", "5-amino-1mq", "kisspeptin", "gonadorelin", "follistatin-344", "humanin", "dsip", "pramlintide", "hcg", "ss-31", "igf-1-lr3", "somatostatin", "bpc-157-arginate", "thymosin-beta-4-full", "cjc-1295-dac", "vasopressin", "triptorelin", "kpv", "atrial-natriuretic-peptide", "leuprolide", "desmopressin", "calcitonin", "glucagon", "exenatide", "substance-p", "orexin-a", "neuropeptide-y", "abaloparatide", "acetyl-hexapeptide-8", "adipotide", "afamelanotide", "amylin", "angiotensin-ii", "ara-290", "bivalirudin", "bradykinin", "brain-natriuretic-peptide", "carbetocin", "cgrp"]);

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
  cagrilintide: {
    Overview: CagrilintideOverviewPanel,
    Evidence: CagrilintideEvidencePanel,
    Safety: CagrilintideSafetyPanel,
    Interactions: CagrilintideInteractionsPanel,
  },
  "thymosin-beta-4": {
    Overview: ThymosinBeta4OverviewPanel,
    Evidence: ThymosinBeta4EvidencePanel,
    Safety: ThymosinBeta4SafetyPanel,
    Interactions: ThymosinBeta4InteractionsPanel,
  },
  "5-amino-1mq": {
    Overview: FiveAmino1MQOverviewPanel,
    Evidence: FiveAmino1MQEvidencePanel,
    Safety: FiveAmino1MQSafetyPanel,
    Interactions: FiveAmino1MQInteractionsPanel,
  },
  kisspeptin: {
    Overview: KisspeptinOverviewPanel,
    Evidence: KisspeptinEvidencePanel,
    Safety: KisspeptinSafetyPanel,
    Interactions: KisspeptinInteractionsPanel,
  },
  gonadorelin: {
    Overview: GonadorelinOverviewPanel,
    Evidence: GonadorelinEvidencePanel,
    Safety: GonadorelinSafetyPanel,
    Interactions: GonadorelinInteractionsPanel,
  },
  "follistatin-344": {
    Overview: Follistatin344OverviewPanel,
    Evidence: Follistatin344EvidencePanel,
    Safety: Follistatin344SafetyPanel,
    Interactions: Follistatin344InteractionsPanel,
  },
  humanin: {
    Overview: HumaninOverviewPanel,
    Evidence: HumaninEvidencePanel,
    Safety: HumaninSafetyPanel,
    Interactions: HumaninInteractionsPanel,
  },
  dsip: {
    Overview: DSIPOverviewPanel,
    Evidence: DSIPEvidencePanel,
    Safety: DSIPSafetyPanel,
    Interactions: DSIPInteractionsPanel,
  },
  pramlintide: {
    Overview: PramlintideOverviewPanel,
    Evidence: PramlintideEvidencePanel,
    Safety: PramlintideSafetyPanel,
    Interactions: PramlintideInteractionsPanel,
  },
  hcg: {
    Overview: HCGOverviewPanel,
    Evidence: HCGEvidencePanel,
    Safety: HCGSafetyPanel,
    Interactions: HCGInteractionsPanel,
  },
  "ss-31": {
    Overview: SS31OverviewPanel,
    Evidence: SS31EvidencePanel,
    Safety: SS31SafetyPanel,
    Interactions: SS31InteractionsPanel,
  },
  "igf-1-lr3": {
    Overview: IGF1LR3OverviewPanel,
    Evidence: IGF1LR3EvidencePanel,
    Safety: IGF1LR3SafetyPanel,
    Interactions: IGF1LR3InteractionsPanel,
  },
  somatostatin: {
    Overview: SomatostatinOverviewPanel,
    Evidence: SomatostatinEvidencePanel,
    Safety: SomatostatinSafetyPanel,
    Interactions: SomatostatinInteractionsPanel,
  },
  "bpc-157-arginate": {
    Overview: Bpc157ArginateOverviewPanel,
    Evidence: Bpc157ArginateEvidencePanel,
    Safety: Bpc157ArginaleSafetyPanel,
    Interactions: Bpc157ArginateInteractionsPanel,
  },
  "thymosin-beta-4-full": {
    Overview: ThymosinBeta4FullOverviewPanel,
    Evidence: ThymosinBeta4FullEvidencePanel,
    Safety: ThymosinBeta4FullSafetyPanel,
    Interactions: ThymosinBeta4FullInteractionsPanel,
  },
  "cjc-1295-dac": {
    Overview: Cjc1295DacOverviewPanel,
    Evidence: Cjc1295DacEvidencePanel,
    Safety: Cjc1295DacSafetyPanel,
    Interactions: Cjc1295DacInteractionsPanel,
  },
  vasopressin: {
    Overview: VasopressinOverviewPanel,
    Evidence: VasopressinEvidencePanel,
    Safety: VasopressinSafetyPanel,
    Interactions: VasopressinInteractionsPanel,
  },
  triptorelin: {
    Overview: TriptorelinOverviewPanel,
    Evidence: TriptorelinEvidencePanel,
    Safety: TriptorelinSafetyPanel,
    Interactions: TriptorelinInteractionsPanel,
  },
  kpv: {
    Overview: KpvOverviewPanel,
    Evidence: KpvEvidencePanel,
    Safety: KpvSafetyPanel,
    Interactions: KpvInteractionsPanel,
  },
  "atrial-natriuretic-peptide": {
    Overview: AnpOverviewPanel,
    Evidence: AnpEvidencePanel,
    Safety: AnpSafetyPanel,
    Interactions: AnpInteractionsPanel,
  },
  leuprolide: {
    Overview: LeuprolideOverviewPanel,
    Evidence: LeuprolideEvidencePanel,
    Safety: LeuprolideSafetyPanel,
    Interactions: LeuprolideInteractionsPanel,
  },
  desmopressin: {
    Overview: DesmopressinOverviewPanel,
    Evidence: DesmopressinEvidencePanel,
    Safety: DesmopressinSafetyPanel,
    Interactions: DesmopressinInteractionsPanel,
  },
  calcitonin: {
    Overview: CalcitoninOverviewPanel,
    Evidence: CalcitoninEvidencePanel,
    Safety: CalcitoninSafetyPanel,
    Interactions: CalcitoninInteractionsPanel,
  },
  glucagon: {
    Overview: GlucagonOverviewPanel,
    Evidence: GlucagonEvidencePanel,
    Safety: GlucagonSafetyPanel,
    Interactions: GlucagonInteractionsPanel,
  },
  exenatide: {
    Overview: ExenatideOverviewPanel,
    Evidence: ExenatideEvidencePanel,
    Safety: ExenatideSafetyPanel,
    Interactions: ExenatideInteractionsPanel,
  },
  "substance-p": {
    Overview: SubstancePOverviewPanel,
    Evidence: SubstancePEvidencePanel,
    Safety: SubstancePSafetyPanel,
    Interactions: SubstancePInteractionsPanel,
  },
  "orexin-a": {
    Overview: OrexinAOverviewPanel,
    Evidence: OrexinAEvidencePanel,
    Safety: OrexinASafetyPanel,
    Interactions: OrexinAInteractionsPanel,
  },
  "neuropeptide-y": {
    Overview: NeuropeptideYOverviewPanel,
    Evidence: NeuropeptideYEvidencePanel,
    Safety: NeuropeptideYSafetyPanel,
    Interactions: NeuropeptideYInteractionsPanel,
  },
  abaloparatide: {
    Overview: AbaloparatideOverviewPanel,
    Evidence: AbaloparatideEvidencePanel,
    Safety: AbaloparatideSafetyPanel,
    Interactions: AbaloparatideInteractionsPanel,
  },
  "acetyl-hexapeptide-8": {
    Overview: AcetylHexapeptide8OverviewPanel,
    Evidence: AcetylHexapeptide8EvidencePanel,
    Safety: AcetylHexapeptide8SafetyPanel,
    Interactions: AcetylHexapeptide8InteractionsPanel,
  },
  adipotide: {
    Overview: AdipotideOverviewPanel,
    Evidence: AdipotideEvidencePanel,
    Safety: AdipotideSafetyPanel,
    Interactions: AdipotideInteractionsPanel,
  },
  afamelanotide: {
    Overview: AfamelanotideOverviewPanel,
    Evidence: AfamelanotideEvidencePanel,
    Safety: AfamelanotideSafetyPanel,
    Interactions: AfamelanotideInteractionsPanel,
  },
  amylin: {
    Overview: AmylinOverviewPanel,
    Evidence: AmylinEvidencePanel,
    Safety: AmylinSafetyPanel,
    Interactions: AmylinInteractionsPanel,
  },
  "angiotensin-ii": {
    Overview: AngiotensinIiOverviewPanel,
    Evidence: AngiotensinIiEvidencePanel,
    Safety: AngiotensinIiSafetyPanel,
    Interactions: AngiotensinIiInteractionsPanel,
  },
  "ara-290": {
    Overview: Ara290OverviewPanel,
    Evidence: Ara290EvidencePanel,
    Safety: Ara290SafetyPanel,
    Interactions: Ara290InteractionsPanel,
  },
  bivalirudin: {
    Overview: BivalirudinOverviewPanel,
    Evidence: BivalirudinEvidencePanel,
    Safety: BivalirudinSafetyPanel,
    Interactions: BivalirudinInteractionsPanel,
  },
  bradykinin: {
    Overview: BradykininOverviewPanel,
    Evidence: BradykininEvidencePanel,
    Safety: BradykininSafetyPanel,
    Interactions: BradykininInteractionsPanel,
  },
  "brain-natriuretic-peptide": {
    Overview: BrainNatriureticPeptideOverviewPanel,
    Evidence: BrainNatriureticPeptideEvidencePanel,
    Safety: BrainNatriureticPeptideSafetyPanel,
    Interactions: BrainNatriureticPeptideInteractionsPanel,
  },
  carbetocin: {
    Overview: CarbetocinOverviewPanel,
    Evidence: CarbetocinEvidencePanel,
    Safety: CarbetocinSafetyPanel,
    Interactions: CarbetocinInteractionsPanel,
  },
  cgrp: {
    Overview: CgrpOverviewPanel,
    Evidence: CgrpEvidencePanel,
    Safety: CgrpSafetyPanel,
    Interactions: CgrpInteractionsPanel,
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
  cagrilintide: {
    considerSub: "Thyroid/MEN2 history, pancreatitis, pregnancy, insulin or sulfonylurea users\u2026",
    startHere: [
      "Cagrilintide is a long-acting amylin analog whose clinical story is primarily about the combination with semaglutide (CagriSema) \u2014 Phase 2 showed ~25% weight loss, exceeding either monotherapy. As a monotherapy it performs similarly to liraglutide (~10%).",
      "What matters most: the thyroid C-cell and MEN2 class contraindication applies \u2014 same as the GLP-1 family. If on insulin or sulfonylureas, Interactions is your first stop. The gastric slowing from amylin + GLP-1 combined amplifies GI side effects \u2014 titrate slowly.",
      "How to use this page: Interactions first if on insulin or diabetes medications. Evidence explains why the Phase 2 CagriSema data is real but not Phase 3 confirmed. Overview has the comparison to pramlintide (the only approved amylin analog) and tirzepatide.",
    ],
  },
  "thymosin-beta-4": {
    considerSub: "Cancer history (hard stop \u2014 angiogenesis), pregnancy, TB4 vs TB-500 distinction\u2026",
    startHere: [
      "Thymosin Beta-4 (TB4) is the full 43-amino acid protein; TB-500 is the synthetic active fragment (Ac-SDKP). Most community use is TB-500. The most rigorous human evidence is in cardiac ischemia repair \u2014 not the musculoskeletal injury context that drives community use.",
      "What matters most: the angiogenesis mechanism applies to both the full protein and the fragment. Cancer history is a hard stop. The musculoskeletal injury-healing community use case has animal model support but no human RCTs.",
      "How to use this page: Safety first if you have cancer history. Evidence explains the cardiac trial data vs. the extrapolated injury use case. Overview compares TB4, TB-500, and BPC-157 to clarify the differences.",
    ],
  },
  "5-amino-1mq": {
    considerSub: "Active liver disease, cancer treatment, SAMe or NAD+ supplement stacking\u2026",
    startHere: [
      "5-Amino-1MQ is an NNMT inhibitor \u2014 it blocks the enzyme that consumes NAD+ and SAM in adipose tissue, shifting fat cell metabolism. The preclinical fat loss data in mice is real and peer-reviewed.",
      "What matters most: there are no published human clinical trials. Zero. The evidence ceiling is mouse studies and community anecdote. This is the most evidence-thin compound on this site. The mechanism is interesting; the human translation is genuinely unknown.",
      "How to use this page: Safety before anything else \u2014 there is no human safety data; the liver monitoring recommendation exists because NNMT is highly expressed in liver. Evidence is honest about what mouse data does and doesn\u2019t mean for humans.",
    ],
  },
  kisspeptin: {
    considerSub: "ER-positive cancer, endometriosis, PCOS, exogenous testosterone (TRT) users\u2026",
    startHere: [
      "Kisspeptin is the upstream master regulator of the reproductive axis \u2014 it drives GnRH, which drives LH and FSH, which drives testosterone and estrogen. The IVF trigger evidence (KP-54) is real and peer-reviewed. Community use targets testosterone optimization and post-TRT axis recovery.",
      "What matters most: continuous dosing suppresses the axis rather than stimulating it \u2014 the same desensitization mechanism that GnRH agonists use for medical castration. Pulsatile administration is not optional. Monitor LH and testosterone; declining testosterone during use means stop immediately.",
      "How to use this page: Safety first if you have ER-positive cancer, endometriosis, or PCOS \u2014 kisspeptin drives sex steroid production, which exacerbates these conditions. Evidence explains the pulsatile constraint and the gap between IVF evidence and testosterone optimization use.",
    ],
  },
  gonadorelin: {
    considerSub: "On GnRH agonists (leuprolide, triptorelin), prostate cancer, TRT users\u2026",
    startHere: [
      "Gonadorelin is synthetic GnRH \u2014 the same 10-amino-acid signal the hypothalamus uses to drive LH and FSH from the pituitary. Community use is almost entirely as a TRT adjunct for testicular preservation. Compounding pharmacy access (prescription) makes it more accessible than most investigational peptides.",
      "What matters most: GnRH agonists (leuprolide, triptorelin) are a hard stop \u2014 same receptor, continuous stimulation causes the opposite effect. Pulsatile dosing is the mechanism; continuous use suppresses the axis.",
      "How to use this page: Interactions first if you\u2019re on any GnRH agonist or TRT. Evidence covers what\u2019s established (GnRH mechanism and pump protocols) vs. what\u2019s extrapolated (twice-daily injection).",
    ],
  },
  "follistatin-344": {
    considerSub: "Cancer history, estrogen-sensitive conditions, fertility planning, anyone on anti-activin medications\u2026",
    startHere: [
      "Follistatin-344 is a myostatin/activin antagonist with dramatic animal and gene therapy data. The bodybuilding hype is real \u2014 the human peptide injection evidence is not. No human RCTs for subcutaneous injection exist.",
      "What matters most: the activin suppression cancer concern is documented in oncology literature, not theoretical. Any cancer history is a hard stop. FSH suppression (via activin blockade) is a predictable consequence affecting fertility in both sexes.",
      "How to use this page: Safety first if you have any cancer history, estrogen-sensitive conditions, or are planning fertility treatment. Evidence explains the gap between gene therapy models and peptide injection.",
    ],
  },
  humanin: {
    considerSub: "On JAK inhibitors, active cancer, STAT3-dependent conditions, insulin users\u2026",
    startHere: [
      "Humanin is the first identified mitokine \u2014 a mitochondria-encoded peptide that declines with age and is lower in people with Alzheimer\u2019s disease, cardiovascular disease, and type 2 diabetes. Centenarians and their offspring have higher levels.",
      "What matters most: the mechanistic story is unusually coherent for an investigational compound; the evidence is cell/rodent + human observational only \u2014 no human RCTs exist. JAK inhibitor conflict is the primary drug interaction.",
      "How to use this page: Interactions first if you\u2019re on a JAK inhibitor. Evidence explains the centenarian correlation and the gap between rodent data and human interventional evidence.",
    ],
  },
  dsip: {
    considerSub: "On opioid medications, benzodiazepines, HPA axis medications\u2026",
    startHere: [
      "DSIP was isolated from rabbit sleep states in 1977. The \u2018delta sleep-inducing\u2019 name overpromises \u2014 the human sleep induction studies are mixed. The HPA axis normalization story (ACTH/cortisol modulation) has more consistent support. The opioid withdrawal evidence is the most controlled human data.",
      "What matters most: no modern RCTs exist; all evidence is from 1980s\u201390s European studies. No dedicated receptor has been identified. Opioid medications are a flag due to receptor overlap. CNS depressants (benzodiazepines, alcohol) are additive.",
      "How to use this page: Interactions first if you\u2019re on opioids or benzodiazepines. Evidence explains why the sleep claim is weaker than the name suggests and what the HPA data actually shows.",
    ],
  },
  pramlintide: {
    considerSub: "On insulin (50% dose reduction required), gastroparesis, hypoglycemia unawareness\u2026",
    startHere: [
      "Pramlintide (Symlin) is the only FDA-approved amylin analog \u2014 used as an adjunct to insulin in both T1D and T2D. It slows gastric emptying, suppresses post-meal glucagon, and reduces caloric intake.",
      "What matters most: mandatory 50% reduction in rapid-acting insulin at initiation \u2014 this is in the prescribing information for a reason; the additive glucose-lowering is real and predictable.",
      "How to use this page: if you are on insulin, Interactions is your first stop before anything else. Safety has the gastroparesis and hypoglycemia unawareness contraindication screens.",
    ],
  },
  hcg: {
    considerSub: "Hormone-sensitive cancer, OHSS risk (females), TRT users, prostate screening\u2026",
    startHere: [
      "hCG (human chorionic gonadotropin) is an LH mimetic \u2014 it activates the same Leydig cell receptor as LH to drive testosterone production. FDA-approved for hypogonadotropic hypogonadism and ovulation induction. Community use is primarily as a TRT adjunct for testicular preservation.",
      "What matters most: hormone-sensitive cancer history is a hard stop \u2014 hCG drives sex steroid production that fuels androgen-sensitive and estrogen-sensitive tumors. Estradiol management (not just testosterone) is the ongoing monitoring obligation.",
      "How to use this page: Safety first if you have any cancer history. Interactions covers the TRT combination and the aromatase inhibitor context.",
    ],
  },
  "ss-31": {
    considerSub: "Active cardiac disease, D-amino acid product verification, mitochondrial disease\u2026",
    startHere: [
      "SS-31 (elamipretide) is a cardiolipin-targeting tetrapeptide that stabilizes the inner mitochondrial membrane. The HARP trial (Phase 2) showed improved mitochondrial energy production in heart failure with preserved ejection fraction (HFpEF). Barth syndrome (rare genetic cardiolipin disorder) has Phase 3 evidence.",
      "What matters most: D-amino acid verification is the quality gate \u2014 SS-31 contains D-Arg and D-Phe, which standard HPLC cannot verify; most research suppliers lack chiral LC-MS capability. Cardiac disease requires physician oversight.",
      "How to use this page: if you have active cardiac disease, physician oversight is required before proceeding. Evidence explains what the HARP trial showed and what the gap is to healthy adult use.",
    ],
  },
  "igf-1-lr3": {
    considerSub: "Cancer history (hard stop), diabetes, insulin users, any GH peptide stack\u2026",
    startHere: [
      "IGF-1 LR3 is an IGFBP-resistant IGF-1 analog with a 20-30 hour half-life \u2014 engineered to evade the binding proteins that clear native IGF-1, producing sustained systemic IGF-1 receptor activation. The extended half-life is the defining feature: unlike native IGF-1 where glucose-lowering lasts 2-3 hours, LR3\u2019s effect spans the full day and overnight.",
      "What matters most: cancer history is an absolute permanent hard stop \u2014 IGF-1R is a validated cancer treatment target. The 24-hour hypoglycemia window is the acute life-safety concern; it requires food, fast-acting glucose, and no insulin or alcohol on injection day and the next day.",
      "How to use this page: Safety before anything else. If you have cancer history or diabetes, stop there. Overview compares LR3 to native IGF-1 and GH secretagogues \u2014 a substantially lower-risk alternative worth understanding first.",
    ],
  },
  somatostatin: {
    considerSub: "On insulin or hypoglycemics, using GH secretagogues, using octreotide/lanreotide\u2026",
    startHere: [
      "Somatostatin is an endogenous cyclic 14-AA peptide that inhibits GH, glucagon, insulin, TSH, and GI secretions. Its 90-second plasma half-life makes native somatostatin impractical as a clinical compound \u2014 octreotide and lanreotide are the long-acting analogs used clinically.",
      "What matters most: subcutaneous injection of native somatostatin does not achieve sustained systemic levels \u2014 the half-life is too short; if somatostatin receptor activity is the goal, an analog (octreotide, lanreotide) is the rational compound.",
      "How to use this page: Evidence explains the pharmacokinetic reality. Interactions covers the glucagon counter-regulatory impairment \u2014 the most clinically important concern if combining with glucose-lowering medications.",
    ],
  },
  "bpc-157-arginate": {
    considerSub: "Cancer history, anticoagulants, pregnancy, NSAIDs, injectable vs oral route\u2026",
    startHere: [
      "BPC-157 arginate is the same pentadecapeptide (GEPPPGKPADDAGLV) as standard BPC-157 in an arginine salt formulation for improved water solubility. The active peptide sequence is unchanged. All BPC-157 evidence, safety considerations, and protocols apply.",
      "What matters most: the BPC-157 safety framework applies unchanged \u2014 cancer history is the same concern; arginate does not alter the mechanism. Third-party CoA is required for either form.",
      "How to use this page: same as the BPC-157 page \u2014 Safety for cancer history and pregnancy screens; Interactions for anticoagulants and NSAIDs; Overview for route selection (oral vs injectable).",
    ],
  },
  "thymosin-beta-4-full": {
    considerSub: "Cancer history (hard stop \u2014 angiogenesis), cardiac disease, TB-500 product confusion\u2026",
    startHere: [
      "Thymosin Beta-4 full (Tβ4) is the complete 43-amino acid protein. Most community 'TB4' products are actually TB-500, a synthetic Ac-SDKP fragment \u2014 distinguishable only by mass spectrometry. The full protein has cardiac repair (TOPCARE-AMI pilot) and dry eye (Phase 2 NDA-stage) evidence.",
      "What matters most: cancer history is a hard stop \u2014 the ILK/angiogenesis mechanism applies to both full TB4 and TB-500; there is no safe dose for anyone with cancer history. Cold chain integrity is critical for the full 43-AA protein.",
      "How to use this page: Safety first if you have cancer history. Evidence explains the TOPCARE cardiac pilot and the gap between full TB4 evidence and the TB-500 fragment. Overview clarifies the TB4 vs TB-500 distinction.",
    ],
  },
  "cjc-1295-dac": {
    considerSub: "Cancer history, diabetes, DAC vs no-DAC confusion, long-term GH axis use\u2026",
    startHere: [
      "CJC-1295 DAC contains the Drug Affinity Complex modification that enables albumin binding and an ~8-day half-life. This is fundamentally different from CJC-1295 without DAC \u2014 not just more convenient dosing. Steady-state accumulation takes 5-6 weeks; you cannot rapidly reduce exposure after a problematic dose.",
      "What matters most: the 8-day half-life means continuous, not pulsatile, IGF-1 elevation \u2014 the same GH-axis cancer gate as no-DAC CJC-1295, but amplified by persistent exposure. Glucose monitoring is more important here than with daily short-acting GH compounds.",
      "How to use this page: if you have cancer history, Safety first \u2014 stop there. Overview explains the DAC vs no-DAC pharmacokinetic distinction. Interactions covers glucose-lowering medications and the ipamorelin+DAC stack considerations.",
    ],
  },
  vasopressin: {
    considerSub: "Hypertension, cardiovascular disease, SSRIs, pregnancy, on antihypertensives\u2026",
    startHere: [
      "Vasopressin (ADH) is an endogenous 9-AA peptide with three receptor subtypes: V1a (vasoconstriction), V1b (HPA/ACTH), and V2 (renal water retention). FDA-approved uses include diabetes insipidus, vasodilatory shock, and bleeding varices. Community interest targets V1b memory and cognitive effects.",
      "What matters most: vasopressin is NOT interchangeable with oxytocin \u2014 the vasoconstriction from V1a activation is pharmacologically real and creates cardiovascular risk that oxytocin does not. Hypertension and cardiovascular disease require physician clearance.",
      "How to use this page: Safety first if you have hypertension or cardiovascular history. Interactions covers SSRIs and NSAIDs (additive hyponatremia). Evidence frames the memory/cognition claim honestly.",
    ],
  },
  triptorelin: {
    considerSub: "Prostate cancer, precocious puberty, endometriosis, depot duration, PCT confusion\u2026",
    startHere: [
      "Triptorelin (Trelstar) is a GnRH agonist \u2014 continuous GnRH receptor stimulation causes receptor downregulation and chemical castration (testosterone/estrogen suppression). This is the pharmacological OPPOSITE of gonadorelin's pulsatile axis stimulation. FDA-approved for prostate cancer, precocious puberty.",
      "What matters most: if you are expecting triptorelin to stimulate testosterone or help with PCT recovery, you have the mechanism backwards \u2014 it suppresses the axis. Depot formulations persist for 1-6 months; you cannot quickly undo a dose.",
      "How to use this page: if you are on triptorelin for prostate cancer or precocious puberty, Safety covers the flare management and bone loss monitoring requirements. If you encountered this compound in a PCT context, read Overview first.",
    ],
  },
  kpv: {
    considerSub: "IBD (Crohn's, UC), immunosuppressive medications, cancer history, oral vs injectable route\u2026",
    startHere: [
      "KPV (Lys-Pro-Val) is the C-terminal tripeptide of alpha-MSH with anti-inflammatory and NF-\u03baB inhibitory properties. Most research is in IBD (Crohn's, ulcerative colitis) using oral or targeted colonic delivery. No human RCTs have been published.",
      "What matters most: the evidence is oral/colonic delivery for IBD \u2014 not systemic injection. Injectable KPV is outside the evidence base. If you have IBD managed by a gastroenterologist, disclose KPV use before combining with biologics or immunosuppressants.",
      "How to use this page: Evidence explains the IBD animal data and what has not been demonstrated in humans. Interactions covers the IBD medication context.",
    ],
  },
  "atrial-natriuretic-peptide": {
    considerSub: "Cardiovascular disease, antihypertensives, diuretics, heart failure context\u2026",
    startHere: [
      "ANP (Atrial Natriuretic Peptide) is a 28-AA cardiac hormone released in response to atrial volume overload. It drives natriuresis, vasodilation, and RAAS inhibition via NPR-A. Its 2-3 minute plasma half-life makes native ANP subcutaneous injection pharmacokinetically irrational \u2014 the clinical applications are IV infusion only (carperitide in Japan).",
      "What matters most: the 2-3 minute half-life is the defining constraint \u2014 no sustained effect is achievable from subcutaneous injection. Clinical use of natriuretic peptides requires IV infusion in a monitored cardiac setting.",
      "How to use this page: Evidence frames the pharmacokinetic reality. Safety covers hypotension \u2014 the primary adverse effect. Interactions covers antihypertensives and diuretics.",
    ],
  },
  leuprolide: {
    considerSub: "Prostate cancer, endometriosis, depot duration, PCT confusion, GnRH agonist mechanism\u2026",
    startHere: [
      "Leuprolide (Lupron) is a GnRH agonist \u2014 continuous GnRH receptor stimulation causes receptor downregulation and sex hormone suppression (chemical castration). This is pharmacologically the OPPOSITE of pulsatile gonadorelin stimulation. FDA-approved for prostate cancer, endometriosis, uterine fibroids, precocious puberty.",
      "What matters most: if you are expecting leuprolide to stimulate testosterone or help with PCT, you have the mechanism backwards. Depot formulations persist for 1-6 months \u2014 you cannot undo a dose. Flare management (anti-androgen cover) is mandatory at initiation for prostate cancer.",
      "How to use this page: Safety first if on leuprolide for prostate cancer \u2014 covers flare management and bone loss monitoring. Overview explains the suppression mechanism vs. gonadorelin's stimulation mechanism.",
    ],
  },
  desmopressin: {
    considerSub: "Heart failure (contraindicated), SSRIs, elderly, hyponatremia risk, DI/enuresis/nocturia\u2026",
    startHere: [
      "Desmopressin (DDAVP) is a V2-selective vasopressin analog \u2014 modified to remove V1a vasoconstriction, retaining only antidiuretic and hemostatic (vWD Type 1, hemophilia A) effects. FDA-approved for central diabetes insipidus, nocturnal enuresis, nocturia, and hemostasis.",
      "What matters most: hyponatremia is the dominant safety concern. Fluid restriction during use is required \u2014 excessive fluid intake causes dilutional hyponatremia. Heart failure is a contraindication (water retention worsens volume overload). SSRIs cause additive antidiuretic effect.",
      "How to use this page: Safety covers hyponatremia recognition and the heart failure contraindication. Interactions covers SSRIs and the other hyponatremia-amplifying drugs. Evidence explains the five FDA-approved use contexts.",
    ],
  },
  calcitonin: {
    considerSub: "Osteoporosis (cancer signal), Paget's disease, hypercalcemia, bisphosphonate comparison\u2026",
    startHere: [
      "Calcitonin is a 32-AA thyroid C-cell hormone that inhibits osteoclasts. FDA-approved for Paget's disease and hypercalcemia of malignancy. The FDA withdrew the calcitonin nasal spray for osteoporosis in 2013 citing a pooled clinical trial cancer signal (higher malignancy rates in calcitonin-treated patients).",
      "What matters most: the 2013 FDA cancer signal for osteoporosis use is a real regulatory evidence-based finding. Bisphosphonates have better established safety and fracture reduction evidence for osteoporosis.",
      "How to use this page: Safety first covers the cancer signal context. Evidence explains the Paget's and hypercalcemia indications vs. the withdrawn osteoporosis indication. Overview compares calcitonin to bisphosphonates and denosumab.",
    ],
  },
  glucagon: {
    considerSub: "Insulin users (rescue kit), hypoglycemia management, pheochromocytoma, GLP-1 mechanism\u2026",
    startHere: [
      "Glucagon is the counter-regulatory hormone to insulin \u2014 it drives hepatic glucose output via glycogenolysis and gluconeogenesis. FDA-approved for severe hypoglycemia rescue (GlucaGen, Gvoke, Baqsimi). Every insulin user should have a rescue kit accessible at all times.",
      "What matters most: glucagon's primary clinical importance is as a rescue medication for severe hypoglycemia. Its community relevance is largely educational \u2014 understanding why GLP-1 drugs work (they suppress glucagon) and why insulin users need the rescue kit.",
      "How to use this page: Overview explains the GLP-1/glucagon axis connection. Safety covers why the rescue kit must be available and the pheochromocytoma contraindication.",
    ],
  },
  exenatide: {
    considerSub: "GLP-1 receptor agonist (first approved), weight loss, T2D, Byetta vs Ozempic comparison\u2026",
    startHere: [
      "Exenatide was the first GLP-1 receptor agonist approved for type 2 diabetes (Byetta, 2005). It mimics GLP-1 to stimulate insulin secretion, suppress glucagon, slow gastric emptying, and reduce appetite. Bydureon (weekly exenatide) extended dosing convenience.",
      "What matters most: exenatide is largely superseded by once-weekly semaglutide for weight and CV outcomes \u2014 but understanding exenatide explains the foundational GLP-1 mechanism that all newer agents build on.",
      "How to use this page: Evidence compares exenatide to modern GLP-1 agents. Safety covers the pancreatitis signal and thyroid C-cell concerns shared across GLP-1 drug class.",
    ],
  },
  "substance-p": {
    considerSub: "Pain signaling, neuroinflammation, NK1 receptor, research context, no established community use\u2026",
    startHere: [
      "Substance P is an 11-amino acid neuropeptide that acts as a key neurotransmitter and neuromodulator in pain signaling, neuroinflammation, and the stress response. It acts primarily on NK1 (neurokinin-1) receptors in the central and peripheral nervous system.",
      "What matters most: substance P is a research and pharmacology reference compound \u2014 it has no established therapeutic application as an exogenous injectable. NK1 receptor antagonists (aprepitant) that block substance P signaling are used clinically.",
      "How to use this page: Evidence covers what is known from research; Safety explains why exogenous administration is not a clinically or community-endorsed practice.",
    ],
  },
  "orexin-a": {
    considerSub: "Wakefulness, narcolepsy mechanism, orexin system, no established community use\u2026",
    startHere: [
      "Orexin-A (hypocretin-1) is a 33-amino acid neuropeptide produced in the lateral hypothalamus that promotes wakefulness, regulates appetite, and modulates reward pathways via OX1R and OX2R receptors. Loss of orexin neurons causes narcolepsy with cataplexy.",
      "What matters most: orexin-A itself has no approved therapeutic application. Suvorexant and lemborexant are OX2R antagonists approved for insomnia \u2014 blocking, not agonizing, orexin. Intranasal orexin research for narcolepsy exists but is not clinical-grade.",
      "How to use this page: Evidence covers the research landscape. Safety explains why community administration lacks any established safety profile.",
    ],
  },
  "neuropeptide-y": {
    considerSub: "Appetite regulation, NPY system, sympathetic nervous system, research context\u2026",
    startHere: [
      "Neuropeptide Y (NPY) is one of the most abundant neuropeptides in the brain \u2014 a 36-amino acid peptide acting on Y1\u2013Y5 receptors to potently stimulate appetite, reduce energy expenditure, promote fat storage, and modulate stress and anxiety responses.",
      "What matters most: NPY is a research target (Y receptor antagonists for obesity are in development) rather than a therapeutic agent itself. No approved exogenous NPY formulations exist for any indication.",
      "How to use this page: Evidence covers NPY's mechanistic role in appetite and metabolism. Safety explains the absence of any established use case for exogenous administration.",
    ],
  },
  abaloparatide: {
    considerSub: "Osteoporosis, PTHrP analogue, PTH1R, fracture risk, vs teriparatide, sequential therapy\u2026",
    startHere: [
      "Abaloparatide (Tymlos) is a synthetic PTHrP analogue FDA-approved for osteoporosis in postmenopausal women at high fracture risk. It reduces vertebral and non-vertebral fractures via anabolic PTH1R activation. Cumulative lifetime limit: 2 years across all PTH/PTHrP analogues.",
      "What matters most: the osteosarcoma black box warning and hypercalcemia monitoring are real constraints. Sequential antiresorptive therapy after the anabolic course is required to maintain bone gains.",
      "How to use this page: Evidence covers the ACTIVE trial fracture data. Safety covers the osteosarcoma limit and calcium monitoring requirements.",
    ],
  },
  "acetyl-hexapeptide-8": {
    considerSub: "Argireline, topical cosmetic peptide, SNARE mechanism, fine lines, vs Botox\u2026",
    startHere: [
      "Acetyl hexapeptide-8 (Argireline) is a cosmetic ingredient sold in skincare products. It is proposed to reduce fine lines by inhibiting SNARE complex assembly. It is not a drug, not FDA-approved for any indication, and not equivalent to Botox.",
      "What matters most: the evidence is small, industry-funded cosmetic studies. Transdermal absorption sufficient to reach neuromuscular junctions is pharmacologically implausible for a peptide of this size.",
      "How to use this page: Evidence calibrates the cosmetic study data. Safety addresses injection misconceptions and the cosmetic-only appropriate use context.",
    ],
  },
  adipotide: {
    considerSub: "FTPP, prohibitin targeting, primate fat loss study, renal toxicity, no human trials\u2026",
    startHere: [
      "Adipotide (FTPP) is a research compound that selectively kills adipose vasculature via prohibitin-targeted pro-apoptotic delivery. A 2011 primate study showed striking weight loss \u2014 but also significant kidney toxicity. No human clinical trials have been completed.",
      "What matters most: the renal toxicity observed in the only primate efficacy study is a serious barrier. Zero human pharmacokinetic or safety data exist.",
      "How to use this page: Safety covers the nephrotoxicity signal in detail. Evidence calibrates what the primate study actually shows vs. what is extrapolated.",
    ],
  },
  afamelanotide: {
    considerSub: "Scenesse, EPP, MC1R agonist, melanin, photoprotection, melanoma surveillance\u2026",
    startHere: [
      "Afamelanotide (Scenesse) is an FDA-approved MC1R agonist administered as a subcutaneous implant for erythropoietic protoporphyria (EPP) \u2014 a rare, severely disabling photodermatosis. It is not approved for general tanning.",
      "What matters most: this is a REMS-program drug requiring specialist prescribing and mandatory dermatology melanoma surveillance every 6 months. It is not a peptide for community or aesthetic use.",
      "How to use this page: Evidence covers the EPP RCT data. Safety covers the melanoma surveillance requirement and the skin darkening effects.",
    ],
  },
  amylin: {
    considerSub: "IAPP, pramlintide (Symlin), amyloid fibrillation, T1DM, cagrilintide pipeline\u2026",
    startHere: [
      "Amylin (IAPP) is a 37-AA peptide co-secreted with insulin from pancreatic beta cells. It suppresses glucagon, slows gastric emptying, and reduces food intake. Pramlintide (Symlin) is the FDA-approved amylin analogue \u2014 proline substitutions prevent the fibrillation that raw amylin undergoes.",
      "What matters most: injecting unformulated human amylin risks amyloid deposition. Pramlintide is the appropriate pharmaceutical option. It requires prandial insulin dose reduction (50%) to prevent hypoglycemia.",
      "How to use this page: Safety covers the fibrillation hazard of raw amylin and the hypoglycemia risk with pramlintide. Evidence covers pramlintide RCTs and cagrilintide pipeline data.",
    ],
  },
  "angiotensin-ii": {
    considerSub: "Giapreza, RAAS, distributive shock vasopressor, ATHOS-3, thrombosis risk\u2026",
    startHere: [
      "Angiotensin-II (Giapreza) is an FDA-approved vasopressor for septic and distributive shock \u2014 the endogenous RAAS octapeptide used as a catecholamine-sparing agent in ICU patients refractory to norepinephrine. ATHOS-3 RCT basis.",
      "What matters most: this is an ICU-only IV drug with a black box thrombosis warning. Not a community peptide \u2014 included here as pharmacological education on RAAS physiology.",
      "How to use this page: Evidence covers ATHOS-3 and the MAP response data. Safety covers the thrombosis black box and hemodynamic monitoring requirements.",
    ],
  },
  "ara-290": {
    considerSub: "EPO-derived peptide, innate repair receptor, small fiber neuropathy, sarcoidosis, research\u2026",
    startHere: [
      "ARA-290 is a synthetic peptide derived from the tissue-protective domain of EPO, targeting the innate repair receptor (IRR) without activating the hematopoietic EPO receptor. Small trials in sarcoidosis-associated small fiber neuropathy showed modest benefit.",
      "What matters most: not FDA-approved; small trial evidence only; research compound with limited human safety data. Promising mechanism, insufficient evidence for standard clinical use.",
      "How to use this page: Evidence calibrates the sarcoidosis SFN trial data. Safety covers the limited human safety database and the research compound quality issue.",
    ],
  },
  bivalirudin: {
    considerSub: "Angiomax, direct thrombin inhibitor, PCI anticoagulation, HIT, bivalent mechanism\u2026",
    startHere: [
      "Bivalirudin (Angiomax) is a synthetic 20-AA direct thrombin inhibitor \u2014 FDA-approved for anticoagulation during PCI and for patients with HIT. It bivalently binds thrombin active site and exosite-1, with a short half-life via thrombin-mediated cleavage.",
      "What matters most: major bleeding is the primary risk; no reversal agent exists. Hospital-only IV medication \u2014 not relevant as a community peptide.",
      "How to use this page: Evidence covers the REPLACE-2, ACUITY, and HORIZONS-AMI trial data. Safety covers bleeding risk and renal dose adjustment.",
    ],
  },
  bradykinin: {
    considerSub: "Kallikrein-kinin system, ACE inhibitor angioedema, HAE, icatibant, pain signaling\u2026",
    startHere: [
      "Bradykinin is an endogenous vasodilatory peptide generated by kallikrein from kininogens. It is central to ACE inhibitor-induced angioedema \u2014 ACE normally degrades bradykinin; ACE inhibitor blockade causes bradykinin accumulation and potentially life-threatening airway swelling.",
      "What matters most: bradykinin itself is not a therapeutic agent \u2014 it is a pharmacology education reference. The drugs that matter here are those that modulate it: ACE inhibitors (increase bradykinin), icatibant (blocks B2 receptor in HAE).",
      "How to use this page: Safety covers the ACE inhibitor angioedema risk in detail. Evidence covers the kinin system physiology and HAE treatment context.",
    ],
  },
  "brain-natriuretic-peptide": {
    considerSub: "BNP, NT-proBNP, heart failure biomarker, nesiritide, ASCEND-HF, natriuretic peptide system\u2026",
    startHere: [
      "BNP (B-type natriuretic peptide) is secreted by ventricular myocytes under volume overload \u2014 the gold-standard heart failure biomarker. Nesiritide (recombinant BNP) is FDA-approved for acute decompensated HF, though its clinical use has declined after ASCEND-HF showed no mortality benefit.",
      "What matters most: BNP and NT-proBNP as biomarkers are clinically essential for HF diagnosis and monitoring. Nesiritide is a declining-use IV drug \u2014 not a community peptide.",
      "How to use this page: Evidence covers the biomarker standard and nesiritide trial data. Safety covers nesiritide\u2019s hypotension and renal concerns.",
    ],
  },
  carbetocin: {
    considerSub: "Long-acting oxytocin analogue, PPH prevention, CHAMPION trial, WHO essential medicine\u2026",
    startHere: [
      "Carbetocin is a synthetic long-acting oxytocin analogue used for postpartum hemorrhage prevention after cesarean delivery. Single dose replaces repeated oxytocin infusions. CHAMPION trial (Lancet 2018) demonstrated non-inferiority to oxytocin across 23 countries.",
      "What matters most: obstetric use only. No community or enhancement application \u2014 oxytocin receptor agonism outside of obstetric context causes uterine cramping, hypotension, and nausea.",
      "How to use this page: Evidence covers the CHAMPION trial. Safety covers the cardiovascular monitoring requirements in the obstetric setting.",
    ],
  },
  cgrp: {
    considerSub: "CGRP mAbs (Aimovig, Ajovy, Emgality, Vyepti), gepants, migraine prevention, trigeminal neuropeptide\u2026",
    startHere: [
      "CGRP (calcitonin gene-related peptide) is released from trigeminal nerve terminals during migraine attacks and is the key molecular driver of migraine pain. Four FDA-approved CGRP monoclonal antibodies prevent migraines; gepants treat acute attacks and also prevent.",
      "What matters most: CGRP-targeted drugs represent the most mechanism-validated advance in migraine treatment in decades. If you have 4+ migraine days/month, these options are worth discussing with a headache neurologist.",
      "How to use this page: Evidence covers the mAb and gepant trial data. Safety covers the cardiovascular monitoring considerations and common tolerability issues.",
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
