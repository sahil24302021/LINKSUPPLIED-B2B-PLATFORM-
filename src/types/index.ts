// LINKSUPPLIED — Barrel export for all types
// Import from "@/types" in any file.

export type {
  BusinessType,
  Company,
  MachineryItem,
  TechnicalSpecMatrix,
  ProductionCapacityDetails,
  QualitySystemDetails,
  DetailedCertification,
  EvidenceRecord,
} from "./company";

export type {
  VerificationType,
  VerificationStatus,
  VerificationLayer,
  VerificationStatusType,
  VerificationLayerKey,
  VerificationLayerDetail,
  DetailedEvidenceItem,
} from "./verification";

export type {
  FactorStatus,
  FactorEvidence,
  ExplainableMatchFactor,
  MatchFactor,
  MatchResult,
  MatchingFilterState,
  MatchingSortOption,
} from "./matching";

export type {
  DiscoveryPath,
  DiscoveryInput,
  Requirement,
  TechnicalSpec,
  CommercialTerms,
  SupplierCriteria,
  StructuredRequirement,
  RFQSubmission,
  AttachedDocument,
  BuyerContactInfo,
  CadenceOption,
  CurrencyOption,
  IncotermOption,
  BuyerRequirementForm,
  RequirementSubmission,
} from "./discovery";

export type {
  RFQStatus,
  RFQRecord,
  QuoteStatus,
  SupplierQuote,
} from "./rfq";

export type {
  RequirementWorkflowStatus,
  RequirementSummaryItem,
  ActivityEvent,
  BuyerDashboardData,
  InboundSupplierRfq,
  SupplierDashboardData,
} from "./dashboard";

export type {
  UserRole,
  BuyerOnboardingForm,
  SupplierOnboardingForm,
} from "./onboarding";

export type {
  EarlyAccessRole,
  EarlyAccessSubmission,
} from "./waitlist";
