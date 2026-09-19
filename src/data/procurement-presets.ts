import type { StructuredRequirement } from "@/types";

export interface SourcingPreset {
  id: string;
  label: string;
  badge: string;
  requirement: StructuredRequirement;
}

export const SOURCING_PRESETS: SourcingPreset[] = [
  {
    id: "cosmetics-glass",
    label: "Cosmetic Glass Packaging",
    badge: "Cosmetics & Packaging",
    requirement: {
      id: "req-cosmetic-glass-50ml",
      spec: {
        partName: "50ml Heavy-Base Cosmetic Glass Bottle",
        category: "Cosmetics & Personal Care Packaging",
        material: "Type III Borosilicate Flint Glass",
        tolerance: "±0.15 mm (Wall & Neck Thread)",
        surfaceFinish: "Frosted Acid-Etched & 2-Color Screen Print",
        drawingFileName: "PKG-GLS-50ML-SPEC-REV2.pdf",
        application: "Luxury Skincare Serum Container with 18/415 Dispenser Finish",
      },
      commercial: {
        initialBatch: "15,000 units",
        monthlyVolume: "50,000 units/month",
        targetDeliveryDate: "60 calendar days",
        incoterm: "FOB",
        destinationPort: "Nhava Sheva / Mumbai",
      },
      criteria: {
        certificationsNeeded: ["ISO 9001:2015", "ISO 22716 (GMP)"],
        requiresPhysicalAudit: true,
        preferredRegion: "India (Western/Northern Hubs)",
      },
      submittedAt: "2026-09-16",
    },
  },
  {
    id: "cnc-machining",
    label: "Precision CNC Valve Housing",
    badge: "Industrial & Precision",
    requirement: {
      id: "req-cnc-valve-housing",
      spec: {
        partName: "5-Axis Milled Hydraulic Valve Housing",
        category: "Precision Machining & Assemblies",
        material: "Aluminum 6061-T6 (Aerospace Billet)",
        tolerance: "±0.015 mm (Bore & Port Centering)",
        surfaceFinish: "Mil-A-8625 Type III Hard Anodized (Black, 25µm)",
        drawingFileName: "HYD-VALVE-HSG-3D.step",
        application: "High-Pressure Hydraulic Manifold Assembly (350 Bar)",
      },
      commercial: {
        initialBatch: "2,500 units",
        monthlyVolume: "10,000 units/month",
        targetDeliveryDate: "45 calendar days",
        incoterm: "CIF",
        destinationPort: "Hamburg / Rotterdam",
      },
      criteria: {
        certificationsNeeded: ["ISO 9001:2015", "AS9100D"],
        requiresPhysicalAudit: true,
        preferredRegion: "Global / Asia-Pacific",
      },
      submittedAt: "2026-09-16",
    },
  },
  {
    id: "automotive-stamping",
    label: "Automotive Structural Stamping",
    badge: "Automotive & Mobility",
    requirement: {
      id: "req-auto-bracket-chassis",
      spec: {
        partName: "EV Battery Enclosure Mounting Bracket",
        category: "Automotive Stamping & Welded Assemblies",
        material: "High-Strength Low-Alloy Steel (HSLA 350)",
        tolerance: "±0.05 mm (Mounting Hole True Position)",
        surfaceFinish: "Cathodic Electro-Deposition (E-Coat) + Zn-Ni",
        drawingFileName: "EV-BRKT-CHAS-V1.dxf",
        application: "Structural Underbody Protection Frame",
      },
      commercial: {
        initialBatch: "50,000 units",
        monthlyVolume: "120,000 units/month",
        targetDeliveryDate: "90 calendar days",
        incoterm: "DDP",
        destinationPort: "Detroit / Chicago Logistics Hub",
      },
      criteria: {
        certificationsNeeded: ["IATF 16949", "ISO 14001"],
        requiresPhysicalAudit: true,
        preferredRegion: "India / Southeast Asia",
      },
      submittedAt: "2026-09-16",
    },
  },
];
