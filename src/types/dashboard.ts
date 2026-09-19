// LINKSUPPLIED — Dashboard Types

import type { RFQRecord, SupplierQuote } from "./rfq";
import type { Company } from "./company";

export type RequirementWorkflowStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "matching"
  | "matches_ready"
  | "rfq_sent"
  | "quotes_received"
  | "completed";

export interface RequirementSummaryItem {
  id: string;
  referenceId: string;
  partName: string;
  category: string;
  material: string;
  quantity: string;
  unit: string;
  tolerance: string;
  destination: string;
  status: RequirementWorkflowStatus;
  createdAt: string;
  matchesCount: number;
  rfqsSentCount: number;
  quotesReceivedCount: number;
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "requirement" | "match" | "rfq" | "quote" | "verification" | "system";
  linkHref?: string;
  linkLabel?: string;
}

export interface BuyerDashboardData {
  requirements: RequirementSummaryItem[];
  rfqs: RFQRecord[];
  quotes: SupplierQuote[];
  savedSuppliers: Company[];
  recentActivity: ActivityEvent[];
}

export interface InboundSupplierRfq {
  id: string;
  referenceId: string;
  buyerType: string; // e.g. "Aerospace Tier-1 OEM", "Cosmetics Brand"
  buyerRegion: string;
  partName: string;
  category: string;
  material: string;
  dimensions?: string;
  tolerance: string;
  quantity: string;
  unit: string;
  targetLeadTimeDays: string;
  deliveryDestination: string;
  incoterm: string;
  receivedAt: string;
  responseDeadlineDays: number;
  status: "new" | "reviewing" | "clarification_requested" | "quoted" | "declined";
  drawingFileName?: string;
}

export interface SupplierDashboardData {
  company: Company;
  profileCompletenessPercentage: number;
  verificationLevel: string;
  inboundRfqs: InboundSupplierRfq[];
  submittedQuotes: SupplierQuote[];
  recentActivity: ActivityEvent[];
}
