// LINKSUPPLIED — Authentication & Onboarding Types

export type UserRole = "buyer" | "supplier";

export interface BuyerOnboardingForm {
  // Step 1: Account
  fullName: string;
  workEmail: string;
  password: string;

  // Step 2: Company
  companyName: string;
  website: string;
  industry: string;
  location: string;
  companySize: "" | "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  designation: string;

  // Step 3: Sourcing Profile
  sourcedCommodities: string[];
  annualSourcingVolume: string;
  preferredSupplierRegions: string[];
  mandatoryCertifications: string[];
}

export interface SupplierOnboardingForm {
  // Step 1: Account
  fullName: string;
  workEmail: string;
  password: string;

  // Step 2: Company Identity
  companyName: string;
  website: string;
  yearEstablished: string;
  plantCity: string;
  plantCountry: string;
  plantAreaSqFt: string;

  // Step 3: Manufacturing Profile
  businessType: "" | "manufacturer" | "trader" | "distributor";
  primaryProcesses: string[];
  primaryMaterials: string[];
  targetIndustries: string[];

  // Step 4: Capability & Equipment
  keyMachineryTypes: string[];
  monthlyCapacityMetric: string;
  standardMoq: string;
  standardLeadTimeDays: string;
  certificationsHeld: string[];

  // Step 5: Verification Checklist
  hasIncorporationDoc: boolean;
  hasIsoCertificates: boolean;
  hasMachineInvoices: boolean;
  hasFacilityPhotos: boolean;
}
