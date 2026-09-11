// LINKSUPPLIED - Core TypeScript Interfaces
// Backed by mock data (lib/data.ts), designed to swap for real API responses.

export type BusinessType =
  | "manufacturer"
  | "supplier"
  | "distributor"
  | "buyer"
  | "wholesaler";

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

export interface Company {
  id: string;
  name: string;
  type: BusinessType;
  products: string[];
  industries: string[];
  capacity?: string;
  moq?: string;
  location: string;
  marketsServed: string[];
  certifications: string[];
  verification: VerificationStatus[];
  yearsInBusiness?: number;
  description: string;
}

export interface Requirement {
  id: string;
  productOrCategory: string;
  quantity?: string;
  location?: string;
  certificationsNeeded?: string[];
}

export interface MatchFactor {
  label: string;
  value: number; // 0–100
}

export interface MatchResult {
  company: Company;
  matchScore: number;
  reasons: string[];
  factors?: MatchFactor[];
}

export type DiscoveryPath = "buy" | "sell" | "partners" | "new-market";

export interface DiscoveryInput {
  path: DiscoveryPath;
  productOrCategory: string;
  quantityOrCapacity?: string;
  location?: string;
  targetMarket?: string;
  certifications?: string[];
}

export interface VerificationLayer {
  type: VerificationType;
  title: string;
  description: string;
  evidenceRequired: string[];
  whyItMatters: string;
}
