// LINKSUPPLIED — Company & Business types

export type BusinessType =
  | "manufacturer"
  | "supplier"
  | "distributor"
  | "buyer"
  | "wholesaler";

export interface MachineryItem {
  id: string;
  name: string;
  make: string;
  model: string;
  quantity: number;
  envelope: string;
  tolerance: string;
  yearInstalled?: number;
  status: "active" | "maintenance" | "idle";
  verified: boolean;
}

export interface TechnicalSpecMatrix {
  materials: string[];
  processes: string[];
  minDiameterMm?: number;
  maxDiameterMm?: number;
  maxEnvelopeMm?: string;
  tightestTolerance: string;
  surfaceFinishRange: string;
  batchSizeRange: string;
}

export interface ProductionCapacityDetails {
  reportedMonthly: string;
  verifiedMonthly?: string;
  availableMonthly?: string;
  standardMoq: string;
  prototypeLeadTimeDays: string;
  productionLeadTimeDays: string;
  shifts: string;
  plantAreaSqFt?: string;
}

export interface QualitySystemDetails {
  qcTeamSize: number;
  inspectionEquipment: string[];
  incomingInspection: boolean;
  inProcessInspection: boolean;
  finalInspection: boolean;
  calibrationStatus: string;
  traceabilitySystem: string;
}

export interface DetailedCertification {
  name: string;
  issuingBody: string;
  certificateNumber: string;
  validUntil: string;
  status: "verified" | "under_review" | "reported" | "expired";
  evidenceOnFile: boolean;
}

export interface EvidenceRecord {
  id: string;
  title: string;
  category: "entity" | "facility" | "machinery" | "quality" | "trade";
  type: "audit_report" | "facility_photo" | "machinery_invoice" | "certificate" | "tax_doc" | "export_bill";
  verificationDate: string;
  verificationMethod: string;
  status: "verified" | "reported" | "pending";
  summary: string;
}

export interface Company {
  id: string;
  name: string;
  type: BusinessType;
  products: string[];
  industries: string[];
  capacity?: string;
  moq?: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  marketsServed: string[];
  certifications: string[];
  verification: import("./verification").VerificationStatus[];
  yearsInBusiness?: number;
  description: string;
  website?: string;
  plantAreaSqFt?: string;
  facilityType?: string;
  machinery?: MachineryItem[];
  technicalSpecs?: TechnicalSpecMatrix;
  capacityDetails?: ProductionCapacityDetails;
  qualitySystem?: QualitySystemDetails;
  detailedCertifications?: DetailedCertification[];
  evidenceRecords?: EvidenceRecord[];
  verifiedAuditDate?: string;
  auditedBy?: string;
}
