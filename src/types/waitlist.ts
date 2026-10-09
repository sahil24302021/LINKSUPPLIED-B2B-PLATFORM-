// LINKSUPPLIED - Early Access & Waitlist Types

export const RESPONSE_WINDOW = "2 working days";
export const EARLY_ACCESS_COST_COPY = "Creating your early access profile is free.";

export type EarlyAccessRole = "buyer" | "manufacturer" | "both";

export interface EarlyAccessSubmission {
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  location: string;
  role: EarlyAccessRole | "";
  buyerCommodities: string;
  buyerCurrentMethod: string;
  buyerBiggestProblem: string;
  supplierProducts: string;
  supplierProcesses: string;
  companyUrl: string;
}
