// LINKSUPPLIED — Discovery & Sourcing Types

export type DiscoveryPath = "buy" | "sell" | "partners" | "new-market";

export interface DiscoveryInput {
  path: DiscoveryPath;
  productOrCategory: string;
  quantityOrCapacity?: string;
  location?: string;
  targetMarket?: string;
  certifications?: string[];
}

export interface Requirement {
  id: string;
  productOrCategory: string;
  quantity?: string;
  location?: string;
  certificationsNeeded?: string[];
}

// ─── Legacy Structured Procurement Types (Preserved for compatibility) ─

export interface TechnicalSpec {
  partName: string;
  category: string;
  material: string;
  tolerance: string;
  surfaceFinish?: string;
  drawingFileName?: string;
  application?: string;
}

export interface CommercialTerms {
  initialBatch: string;
  monthlyVolume: string;
  targetDeliveryDate: string;
  incoterm: "FOB" | "CIF" | "DDP" | "EXW";
  destinationPort?: string;
}

export interface SupplierCriteria {
  certificationsNeeded: string[];
  requiresPhysicalAudit: boolean;
  preferredRegion: string;
}

export interface StructuredRequirement {
  id: string;
  spec: TechnicalSpec;
  commercial: CommercialTerms;
  criteria: SupplierCriteria;
  submittedAt?: string;
}

// ─── RFQ (Request for Quote) Types ────────────────────────────

export interface RFQSubmission {
  supplierId: string;
  supplierName: string;
  requirementId: string;
  partName: string;
  targetDeadline: string;
  includeSampleBatch: boolean;
  ndaRequired: boolean;
  notes?: string;
}

// ─── Production-Grade Phase B Buyer Requirement Types ──────────

export interface AttachedDocument {
  id: string;
  name: string;
  sizeBytes: number;
  type: string;
  uploadedAt: string;
  status: "uploading" | "uploaded" | "error";
  progress?: number;
  errorMessage?: string;
}

export interface BuyerContactInfo {
  contactName: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  designation?: string;
}

export type CadenceOption = "one-time" | "monthly" | "quarterly" | "annual";
export type CurrencyOption = "USD" | "INR" | "EUR";
export type IncotermOption = "FOB" | "CIF" | "DDP" | "EXW";

export interface BuyerRequirementForm {
  // Step 1: Part & Scope
  partName: string;
  category: string;
  description: string;
  internalReference?: string;

  // Step 2: Technical Specs
  material: string;
  process: string;
  dimensions?: string;
  tolerance: string;
  surfaceFinish?: string;
  certificationsNeeded: string[];
  qualityInspection: string[];
  packagingRequirements?: string;

  // Step 3: Volume & Commercial
  quantity: string;
  unit: string;
  cadence: CadenceOption;
  targetPrice?: string;
  currency: CurrencyOption;
  targetLeadTimeDays: string;

  // Step 4: Delivery & Location
  deliveryCity: string;
  deliveryCountry: string;
  incoterm: IncotermOption;
  preferredSupplierRegion: string;
  isExport: boolean;

  // Step 5: Documents
  documents: AttachedDocument[];

  // Step 6: Buyer Contact
  contact: BuyerContactInfo;
}

export interface RequirementSubmission {
  referenceId: string;
  requirement: BuyerRequirementForm;
  status: "under_review" | "qualified" | "matching" | "completed";
  submittedAt: string;
  estimatedReviewHours: number;
  timeline: {
    step: number;
    title: string;
    description: string;
    status: "completed" | "current" | "upcoming";
    timestamp?: string;
  }[];
}
