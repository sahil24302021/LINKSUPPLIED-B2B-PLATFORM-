// LINKSUPPLIED — RFQ & Quotation Types

import type { AttachedDocument } from "./discovery";

export type RFQStatus =
  | "draft"
  | "sent"
  | "acknowledged"
  | "quote_received"
  | "under_negotiation"
  | "accepted"
  | "declined"
  | "cancelled";

export interface RFQRecord {
  id: string;
  referenceId: string; // e.g. "RFQ-2026-4412"
  requirementId: string;
  supplierId: string;
  supplierName: string;
  supplierType: "manufacturer" | "distributor";
  supplierLocation: string;
  partName: string;
  category: string;
  material: string;
  quantity: string;
  unit: string;
  cadence: string;
  targetPrice?: string;
  currency: string;
  targetLeadTimeDays: string;
  targetResponseDate: string;
  deliveryCity: string;
  deliveryCountry: string;
  incoterm: string;
  status: RFQStatus;
  sentAt: string;
  notes?: string;
  attachedDocuments?: AttachedDocument[];
  ndaRequired: boolean;
  sampleBatchRequested: boolean;
}

export type QuoteStatus =
  | "submitted"
  | "under_review"
  | "negotiating"
  | "accepted"
  | "declined"
  | "expired";

export interface SupplierQuote {
  id: string;
  rfqId: string;
  referenceId: string; // e.g. "QT-2026-8801"
  supplierId: string;
  supplierName: string;
  supplierType: "manufacturer" | "distributor";
  unitPrice: number;
  currency: string;
  toolingCost: number;
  sampleBatchPrice?: number;
  sampleLeadTimeDays: number;
  productionLeadTimeDays: number;
  moq: number;
  productionCapacityMonthly: string;
  paymentTerms: string; // e.g. "30% advance, 70% against BL / Net 30"
  incoterms: string;
  validUntil: string;
  status: QuoteStatus;
  submittedAt: string;
  supplierNotes: string;
  dfmObservations?: string[];
  qualityPlanIncluded: boolean;
  testCertificatesOffered: string[];
}
