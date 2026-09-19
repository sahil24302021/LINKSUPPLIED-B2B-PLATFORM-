// LINKSUPPLIED — Matching & Discovery Types

import type { Company } from "./company";

export type FactorStatus = "confirmed" | "reported" | "needs_review" | "not_matched";
export type FactorEvidence = "verified" | "reported" | "none";

export interface ExplainableMatchFactor {
  id: string;
  name: string; // e.g. "Material Compatibility", "Tolerance Capability"
  status: FactorStatus;
  explanation: string;
  evidence: FactorEvidence;
  targetRequirement?: string; // what the buyer requested
  supplierCapability?: string; // what the supplier can do
}

export interface MatchFactor {
  label: string;
  value: number; // 0–100 legacy support
}

export interface MatchResult {
  company: Company;
  matchScore: number;
  reasons: string[];
  factors?: MatchFactor[];
  explainableFactors?: ExplainableMatchFactor[];
  matchTier?: "high_confidence" | "qualified" | "partial_match";
}

export interface MatchingFilterState {
  companyType: "all" | "manufacturer" | "distributor";
  region: string;
  process: string;
  material: string;
  verificationLevel: "all" | "audited" | "document";
  certification: string;
  maxLeadTimeDays?: number;
  maxMoq?: number;
}

export type MatchingSortOption =
  | "fit"
  | "capacity"
  | "lead_time"
  | "proximity"
  | "score";
