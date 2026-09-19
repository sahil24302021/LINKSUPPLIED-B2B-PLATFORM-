import type { BuyerRequirementForm } from "@/types";

export const CATEGORIES = [
  "Precision Machining & Assemblies",
  "Industrial Polymers & Injection Molding",
  "Cosmetics & Personal Care Packaging",
  "Automotive Stamping & Welded Assemblies",
  "Electronics Enclosures & Sheet Metal",
  "Castings & Forgings",
  "Technical Textiles & Industrial Fabrics",
  "Piping, Flanges & Flow Control",
  "Fasteners & Hardware Components",
];

export const MANUFACTURING_PROCESSES = [
  "CNC Milling (3/4/5-Axis)",
  "CNC Turning & Swiss Machining",
  "Plastic Injection Molding",
  "Sheet Metal Stamping & Deep Draw",
  "High-Pressure Die Casting",
  "Investment / Sand Casting",
  "Hot / Cold Precision Forging",
  "Extrusion (Aluminum / Polymer)",
  "Laser Cutting, Bending & Welded Assembly",
];

export const CERT_OPTIONS = [
  "ISO 9001:2015",
  "IATF 16949",
  "AS9100D",
  "ISO 13485",
  "ISO 14001",
  "ISO 22716 (GMP)",
  "RoHS / REACH",
  "CE Certified",
];

export const QUALITY_INSPECTIONS = [
  "Material Test Report (MTR / Mill Cert)",
  "CMM Dimensional Inspection Report",
  "First Article Inspection (FAIR / AS9102)",
  "Surface Roughness Verification (Ra)",
  "Non-Destructive Testing (NDT / Ultrasonic)",
  "Third-Party Pre-Shipment Inspection",
];

export const QUANTITY_UNITS = [
  "Pieces (pcs)",
  "Sets / Assemblies",
  "Metric Tons (MT)",
  "Kilograms (kg)",
  "Meters (m)",
  "Liters (L)",
];

export const INCOTERMS: { code: "FOB" | "CIF" | "DDP" | "EXW"; label: string; desc: string }[] = [
  {
    code: "FOB",
    label: "FOB · Free on Board",
    desc: "Supplier loads goods onto vessel/truck at departure port; buyer handles shipping & import.",
  },
  {
    code: "CIF",
    label: "CIF · Cost, Insurance & Freight",
    desc: "Supplier arranges ocean/air freight and basic insurance to destination port.",
  },
  {
    code: "DDP",
    label: "DDP · Delivered Duty Paid",
    desc: "Supplier handles full door-to-door transit, customs clearance, and import duties.",
  },
  {
    code: "EXW",
    label: "EXW · Ex Works",
    desc: "Buyer assumes all transport costs and risks from supplier's factory gate.",
  },
];

export const DEFAULT_FORM_DATA: BuyerRequirementForm = {
  partName: "",
  category: "",
  description: "",
  internalReference: "",

  material: "",
  process: "",
  dimensions: "",
  tolerance: "",
  surfaceFinish: "",
  certificationsNeeded: [],
  qualityInspection: [],
  packagingRequirements: "",

  quantity: "",
  unit: "",
  cadence: "one-time",
  targetPrice: "",
  currency: "INR",
  targetLeadTimeDays: "",

  deliveryCity: "",
  deliveryCountry: "",
  incoterm: "FOB",
  preferredSupplierRegion: "",
  isExport: false,

  documents: [],

  contact: {
    contactName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    designation: "",
  },
};

export interface EngineeringPreset {
  id: string;
  label: string;
  industry: string;
  data: BuyerRequirementForm;
}

export const ENGINEERING_PRESETS: EngineeringPreset[] = [
  {
    id: "cnc-valve",
    label: "5-Axis CNC Valve Housing",
    industry: "Industrial & Precision",
    data: {
      partName: "5-Axis Milled Hydraulic Valve Housing",
      category: "Precision Machining & Assemblies",
      description: "High-pressure hydraulic manifold block operating at 350 Bar. Critical internal porting channels with zero porosity allowance.",
      internalReference: "PO-HYD-2026-B8",
      material: "Aluminum 6061-T6 (Aerospace Billet)",
      process: "CNC Milling (3/4/5-Axis)",
      dimensions: "180mm x 140mm x 95mm",
      tolerance: "±0.015 mm (Bore & Port Centering)",
      surfaceFinish: "Mil-A-8625 Type III Hard Anodized (Black, 25µm)",
      certificationsNeeded: ["ISO 9001:2015", "AS9100D"],
      qualityInspection: [
        "Material Test Report (MTR / Mill Cert)",
        "CMM Dimensional Inspection Report",
        "First Article Inspection (FAIR / AS9102)",
      ],
      packagingRequirements: "VCI corrosion-inhibiting paper with individual compartments in wooden export crates",
      quantity: "2,500",
      unit: "Pieces (pcs)",
      cadence: "monthly",
      targetPrice: "68.50",
      currency: "INR",
      targetLeadTimeDays: "45 calendar days",
      deliveryCity: "Hamburg / Rotterdam Hub",
      deliveryCountry: "Germany",
      incoterm: "CIF",
      preferredSupplierRegion: "India (Pune / Bengaluru Hubs)",
      isExport: true,
      documents: [
        {
          id: "doc-sample-1",
          name: "HYD-VALVE-HSG-3D-REV3.step",
          sizeBytes: 8420000,
          type: "application/step",
          uploadedAt: "Just now",
          status: "uploaded",
        },
        {
          id: "doc-sample-2",
          name: "TECHNICAL-SPEC-TOLERANCE-SHEET.pdf",
          sizeBytes: 1240000,
          type: "application/pdf",
          uploadedAt: "Just now",
          status: "uploaded",
        },
      ],
      contact: {
        contactName: "David Sterling",
        workEmail: "d.sterling@aero-hydraulics-corp.com",
        companyName: "AeroHydraulics Dynamics Inc.",
        phone: "+1 (555) 482-9901",
        designation: "VP Procurement & Supply Chain",
      },
    },
  },
  {
    id: "cosmetic-bottle",
    label: "Cosmetic Borosilicate Bottles",
    industry: "Packaging & Luxury",
    data: {
      partName: "50ml Heavy-Base Cosmetic Glass Bottle",
      category: "Cosmetics & Personal Care Packaging",
      description: "Ultra-clear heavy base glass containers with 18/415 thread finish for premium facial serum line.",
      internalReference: "SKU-SERUM-PKG-2026",
      material: "Type III Borosilicate Flint Glass",
      process: "Plastic Injection Molding",
      dimensions: "38mm Dia x 112mm Height",
      tolerance: "±0.15 mm (Wall & Neck Thread)",
      surfaceFinish: "Frosted Acid-Etched & 2-Color Screen Print",
      certificationsNeeded: ["ISO 9001:2015", "ISO 22716 (GMP)"],
      qualityInspection: [
        "Material Test Report (MTR / Mill Cert)",
        "Surface Roughness Verification (Ra)",
      ],
      packagingRequirements: "Egg-crate grid partitions in moisture-sealed export cartons",
      quantity: "50,000",
      unit: "Pieces (pcs)",
      cadence: "quarterly",
      targetPrice: "0.82",
      currency: "INR",
      targetLeadTimeDays: "60 calendar days",
      deliveryCity: "Long Beach, California",
      deliveryCountry: "United States",
      incoterm: "FOB",
      preferredSupplierRegion: "India (Western Hubs)",
      isExport: true,
      documents: [
        {
          id: "doc-sample-3",
          name: "BOTTLE-CAD-2D-PRINT.pdf",
          sizeBytes: 2450000,
          type: "application/pdf",
          uploadedAt: "Just now",
          status: "uploaded",
        },
      ],
      contact: {
        contactName: "Elena Vance",
        workEmail: "elena.vance@lumina-organics.com",
        companyName: "Lumina Organics Ltd.",
        phone: "+1 (415) 302-8841",
        designation: "Head of Packaging Procurement",
      },
    },
  },
  {
    id: "auto-bracket",
    label: "EV Battery Structural Stamping",
    industry: "Automotive & Clean Energy",
    data: {
      partName: "EV Battery Pack Mounting Stamping Bracket",
      category: "Automotive Stamping & Welded Assemblies",
      description: "Structural high-tensile stamped steel brackets to secure high-voltage traction battery packs to vehicle chassis.",
      internalReference: "EV-CHASSIS-BRKT-REV2",
      material: "High-Strength Low-Alloy Steel (HSLA 350)",
      process: "Sheet Metal Stamping & Deep Draw",
      dimensions: "320mm x 85mm x 4.0mm thickness",
      tolerance: "±0.05 mm (Hole True Position)",
      surfaceFinish: "Cathodic Electro-Deposition (E-Coat) 20µm + Zinc-Nickel",
      certificationsNeeded: ["IATF 16949", "ISO 14001"],
      qualityInspection: [
        "Material Test Report (MTR / Mill Cert)",
        "CMM Dimensional Inspection Report",
        "First Article Inspection (FAIR / AS9102)",
      ],
      packagingRequirements: "Returnable steel dunnage bins with plastic layer pads",
      quantity: "120,000",
      unit: "Pieces (pcs)",
      cadence: "annual",
      targetPrice: "4.15",
      currency: "INR",
      targetLeadTimeDays: "90 calendar days",
      deliveryCity: "Detroit Logistics Corridor",
      deliveryCountry: "United States",
      incoterm: "DDP",
      preferredSupplierRegion: "India / Southeast Asia",
      isExport: true,
      documents: [
        {
          id: "doc-sample-4",
          name: "BRACKET-STAMPING-DRAWING.dxf",
          sizeBytes: 4120000,
          type: "application/dxf",
          uploadedAt: "Just now",
          status: "uploaded",
        },
      ],
      contact: {
        contactName: "Marcus Thorne",
        workEmail: "m.thorne@hyperion-motors.io",
        companyName: "Hyperion Electric Mobility",
        phone: "+1 (313) 772-4019",
        designation: "Direct Sourcing Manager",
      },
    },
  },
];
