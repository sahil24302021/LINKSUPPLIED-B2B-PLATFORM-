// LINKSUPPLIED — Verification & Trust System Types

export type VerificationStatusType =
  | "verified"
  | "reported"
  | "under_review"
  | "not_available"
  | "expired";

export type VerificationLayerKey =
  | "entity"
  | "facility"
  | "capability"
  | "quality"
  | "trade"
  | "interaction";

export interface VerificationLayerDetail {
  key: VerificationLayerKey;
  number: string; // "01" - "06"
  title: string;
  tagline: string;
  description: string;
  whatWeExamine: string[];
  evidenceRequired: string[];
  sampleStatus: VerificationStatusType;
  auditMethodology: string;
  whyItMatters: string;
  sampleEvidenceRef: string;
}

export interface DetailedEvidenceItem {
  id: string;
  layerKey: VerificationLayerKey;
  title: string;
  category: string;
  submittedDate: string;
  source: string;
  status: VerificationStatusType;
  confidentiality: "public" | "nda_required" | "auditor_only";
  hashOrRef: string;
  notes: string;
}

// ─── Legacy compatibility exports ─────────────────────────────
export type VerificationType =
  | "Business Verified"
  | "Manufacturer Verified"
  | "Trade Verified"
  | "Capability Verified"
  | "Identity Verified"
  | "Interaction Verified";

export interface VerificationStatus {
  type: VerificationType;
  evidenceSummary: string;
}

export interface VerificationLayer {
  type: VerificationType;
  title: string;
  description: string;
  evidenceRequired: string[];
  whyItMatters: string;
}
