import type {
  VerificationLayer,
  VerificationLayerDetail,
  DetailedEvidenceItem,
  VerificationType,
} from "@/types";

// ─── Six Canonical Verification Layers ─────────────────────────

export const VERIFICATION_LAYER_DETAILS: VerificationLayerDetail[] = [
  {
    key: "entity",
    number: "01",
    title: "Entity & Legal Standing",
    tagline: "Corporate existence, tax registration & officer identity",
    description:
      "Confirms that the business legally exists, maintains good standing with government corporate registries, and is registered for corporate taxation.",
    whatWeExamine: [
      "Government-issued certificate of incorporation",
      "Corporate Identification Number (CIN / CRN)",
      "Active GST / VAT / Tax compliance standing",
      "Registered business address and corporate charter",
      "Director and designated officer identification",
    ],
    evidenceRequired: [
      "Ministry of Corporate Affairs / Registrar filing",
      "Valid Tax Identification and return certificates",
      "Direct identity verification of company officers",
    ],
    sampleStatus: "verified",
    auditMethodology: "Primary government registry API cross-check & document hash verification",
    whyItMatters:
      "Guarantees you are contracting with a legitimate legal entity, eliminating shell corporations and fraudulent broker entities.",
    sampleEvidenceRef: "DOC-REG-MCA-2026-0814",
  },
  {
    key: "facility",
    number: "02",
    title: "Physical Facility & Premises",
    tagline: "Operational plant location, floor area & industrial zoning",
    description:
      "Examines evidence relating to the physical manufacturing plant, industrial premises, operating footprint, and physical infrastructure.",
    whatWeExamine: [
      "Physical plant address and industrial park zoning",
      "Total operating plant area (e.g., 25,000 sq. ft.)",
      "Factory ownership or long-term registered lease deed",
      "Industrial electrical power allocation & grid connection",
      "GPS-stamped on-site photographic evidence of premises",
    ],
    evidenceRequired: [
      "On-site auditor walkthrough inspection report",
      "Factory building title or industrial lease contract",
      "Local municipal industrial operating license",
    ],
    sampleStatus: "verified",
    auditMethodology: "Physical engineering site inspection with geo-tagged photographic evidence",
    whyItMatters:
      "Differentiates genuine manufacturing facilities from virtual trading desks operating out of residential or commercial office suites.",
    sampleEvidenceRef: "AUD-FAC-PUN-2026-0612",
  },
  {
    key: "capability",
    number: "03",
    title: "Manufacturing Capability & Tooling",
    tagline: "Machine tools, working envelopes & achievable tolerances",
    description:
      "Reviews whether the supplier's claimed machine tools, process capabilities, dimensional envelopes, and precision tolerances match reality.",
    whatWeExamine: [
      "Verified machine tools inventory (makes, models, axes)",
      "Maximum machining bed envelope (X, Y, Z dimensions)",
      "Tightest achievable tolerance thresholds (e.g. ±0.008 mm)",
      "Supported raw material alloys (aluminum, stainless, titanium)",
      "Reported vs audited monthly capacity parameters",
    ],
    evidenceRequired: [
      "Original machine tool purchase invoices and serial numbers",
      "Physical machine nameplate inspection logs",
      "Operating line video verification and toolpath review",
    ],
    sampleStatus: "verified",
    auditMethodology: "Equipment serial number audit and on-site machine tool verification",
    whyItMatters:
      "Ensures the supplier actually owns the machine tools required to manufacture your parts, preventing unauthorized subcontracting.",
    sampleEvidenceRef: "EQUIP-CNC-MAZAK-2026",
  },
  {
    key: "quality",
    number: "04",
    title: "Quality Systems & Metrology",
    tagline: "QA gates, metrology apparatus & calibration traceability",
    description:
      "Examines the factory's quality assurance framework, inspection gates, metrology testing equipment, and accredited ISO certifications.",
    whatWeExamine: [
      "ISO 9001:2015, IATF 16949, AS9100D registrar accreditation",
      "In-house inspection laboratory and metrology apparatus",
      "Zeiss / Hexagon Coordinate Measuring Machine (CMM) reports",
      "Annual calibration logbooks for micrometers and bore gauges",
      "Traceability system from raw material heat numbers to dispatch",
    ],
    evidenceRequired: [
      "Certificates from accredited registrars (UKAS, ANAB, NABCB)",
      "Valid NABL / ISO 17025 external calibration certificates",
      "First Article Inspection Reports (FAIR) and CMM data logs",
    ],
    sampleStatus: "under_review",
    auditMethodology: "Direct registrar accreditation verification and calibration logbook audit",
    whyItMatters:
      "Confirms that components will be dimensionally inspected to specification before dispatch, reducing scrap rates and delivery rejections.",
    sampleEvidenceRef: "QA-CMM-ZEISS-CAL-2026",
  },
  {
    key: "trade",
    number: "05",
    title: "Trade History & Compliance",
    tagline: "Historical customs declarations, export shipping & freight",
    description:
      "Reviews commercial trade records, customs bills of export, and cross-border shipping compliance only where legitimate evidence exists.",
    whatWeExamine: [
      "Customs export declarations and shipping bills",
      "Port of export clearance and bill of lading archives",
      "Incoterms fulfillment history (FOB, CIF, DDP)",
      "Authorized Economic Operator (AEO) status where applicable",
    ],
    evidenceRequired: [
      "Authenticated customs bills of export",
      "Verified shipping manifests from ocean / air carriers",
      "Anonymized commercial reference letters (under NDA)",
    ],
    sampleStatus: "not_available",
    auditMethodology: "Direct customs filing reconciliation where authorized by supplier",
    whyItMatters:
      "Protects buyers against unexpected customs delays, demurrage charges, or export compliance violations.",
    sampleEvidenceRef: "CUST-EXP-BOM-PENDING",
  },
  {
    key: "interaction",
    number: "06",
    title: "Platform Execution & Performance",
    tagline: "Quotation responsiveness, lead-time adherence & SLA fidelity",
    description:
      "Tracks verifiable on-platform execution metrics including RFQ responsiveness, quotation accuracy, and lead-time fidelity over time.",
    whatWeExamine: [
      "Average quotation turnaround SLA (e.g. 2.4 days)",
      "Technical specification query accuracy",
      "Historical quotation price stability",
      "Buyer-confirmed order completion records",
    ],
    evidenceRequired: [
      "System timestamp logs of RFQ submissions and responses",
      "Contractually confirmed purchase orders and delivery notes",
    ],
    sampleStatus: "reported",
    auditMethodology: "LINKSUPPLIED platform audit telemetry and verified buyer milestone receipts",
    whyItMatters:
      "Provides empirical evidence of communication reliability and commercial professionalism before issuing formal RFQs.",
    sampleEvidenceRef: "LOG-SLA-RFQ-2026",
  },
];

// ─── Concrete Sample Evidence Records for Verification Stack ───

export const SAMPLE_EVIDENCE_RECORDS: DetailedEvidenceItem[] = [
  {
    id: "ev-01",
    layerKey: "facility",
    title: "On-Site Factory Walkthrough Audit Report",
    category: "Physical Plant Audit",
    submittedDate: "2026-06-12",
    source: "LINKSUPPLIED Engineering Audit Desk (Auditor: K. Mehta)",
    status: "verified",
    confidentiality: "public",
    hashOrRef: "SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    notes:
      "Physical plant inspection conducted at Plot 42, Bhosari Industrial Area, Pune. 25,000 sq. ft. operating area, 500 kVA dedicated transformer, and active manufacturing cells verified.",
  },
  {
    id: "ev-02",
    layerKey: "capability",
    title: "Machine Tool Serial Registry & Purchase Invoices",
    category: "Equipment Audit",
    submittedDate: "2026-06-14",
    source: "Supplier Purchase Records & Nameplate Spot-Check",
    status: "verified",
    confidentiality: "auditor_only",
    hashOrRef: "SHA256: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945",
    notes:
      "Verified original capital invoices for Mazak Variaxis i-700 (5-Axis VMC) and Doosan Puma GT2600. Machine serials match factory floor nameplates.",
  },
  {
    id: "ev-03",
    layerKey: "quality",
    title: "IATF 16949:2016 Automotive Quality Certificate",
    category: "Registrar Accreditation",
    submittedDate: "2026-07-02",
    source: "TÜV SÜD Accreditation Register (Cert #12 111 48291)",
    status: "verified",
    confidentiality: "public",
    hashOrRef: "SHA256: 8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    notes:
      "Certificate authenticity validated against TÜV SÜD primary database. Scope: Precision machining and assembly of automotive hydraulic components. Valid through Oct 2027.",
  },
  {
    id: "ev-04",
    layerKey: "quality",
    title: "Zeiss CMM Annual Calibration Certificate",
    category: "Metrology Calibration",
    submittedDate: "2026-08-10",
    source: "Carl Zeiss India Metrology Services",
    status: "under_review",
    confidentiality: "nda_required",
    hashOrRef: "SHA256: 2c624232cdd221771294dfbb310aca000a0df6ac9b66b0d199f43f34f6bb78e0",
    notes:
      "Calibration certificate for Zeiss DuraMax CMM currently undergoing optical standard review by LINKSUPPLIED quality desk.",
  },
  {
    id: "ev-05",
    layerKey: "trade",
    title: "Customs Export Shipping Bill Record",
    category: "Cross-Border Trade",
    submittedDate: "2026-08-20",
    source: "Supplier Self-Reported Customs Filing",
    status: "not_available",
    confidentiality: "auditor_only",
    hashOrRef: "REF: PENDING_EDI_RECONCILIATION",
    notes:
      "Supplier reported historical exports to Germany and Japan; electronic customs reconciliation is pending direct ICEGATE authorization.",
  },
];

// ─── Legacy compatibility export ──────────────────────────────
export const verificationLayers: VerificationLayer[] = VERIFICATION_LAYER_DETAILS.map(
  (d) => ({
    type: (d.title === "Entity & Legal Standing"
      ? "Business Verified"
      : d.title === "Physical Facility & Premises"
      ? "Manufacturer Verified"
      : d.title === "Manufacturing Capability & Tooling"
      ? "Capability Verified"
      : d.title === "Trade History & Compliance"
      ? "Trade Verified"
      : d.title === "Platform Execution & Performance"
      ? "Interaction Verified"
      : "Identity Verified") as VerificationType,
    title: d.title,
    description: d.description,
    evidenceRequired: d.evidenceRequired,
    whyItMatters: d.whyItMatters,
  })
);
