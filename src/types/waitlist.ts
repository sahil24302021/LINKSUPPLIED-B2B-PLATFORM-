// LINKSUPPLIED — Early Access & Waitlist Types

export type EarlyAccessRole = "buyer" | "manufacturer" | "supplier" | "consultant";

export interface EarlyAccessSubmission {
  // Step 1: Contact
  fullName: string;
  workEmail: string;
  phone: string;
  designation: string;

  // Step 2: Company
  companyName: string;
  website: string;
  industry: string;
  location: string;
  companySize: string;

  // Step 3: Role
  role: EarlyAccessRole;

  // Step 4: Role-specific responses
  buyerCommodities?: string;
  buyerCurrentMethod?: string;
  buyerVolume?: string;
  buyerBiggestProblem?: string;

  supplierProducts?: string;
  supplierProcesses?: string;
  supplierMaterials?: string;
  supplierCapacity?: string;
  supplierCertifications?: string;

  // Step 5: Platform intent
  platformIntent: string; // "What would you want LINKSUPPLIED to help you do?"

  // Submission metadata
  referenceId: string;
  submittedAt: string;
}
