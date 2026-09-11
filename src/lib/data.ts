import type {
  Company,
  MatchResult,
  VerificationLayer,
} from "./types";

// ─── Mock Companies ──────────────────────────────────────────
// 10 realistic companies across 3 industries

export const companies: Company[] = [
  {
    id: "abc-packaging",
    name: "ABC Packaging Industries",
    type: "manufacturer",
    products: [
      "Glass cosmetic bottles",
      "Glass jars",
      "Cosmetic containers",
      "Dropper bottles",
    ],
    industries: ["Cosmetics & Personal Care", "Pharmaceuticals"],
    capacity: "80,000 units/month",
    moq: "5,000 units",
    location: "Mumbai, India",
    marketsServed: ["India", "Middle East", "Southeast Asia", "Europe"],
    certifications: ["ISO 9001:2015", "ISO 22716", "GMP Certified"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "GST registration and company incorporation documents verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "Factory facility in Mumbai confirmed via on-site documentation",
      },
      {
        type: "Capability Verified",
        evidenceSummary:
          "Production capacity of 80,000 units/month validated through equipment records",
      },
    ],
    yearsInBusiness: 14,
    description:
      "Specializes in precision glass packaging for the cosmetics and pharmaceutical industries. Operates two manufacturing lines with automated quality inspection.",
  },
  {
    id: "prism-glass",
    name: "Prism Glassworks",
    type: "manufacturer",
    products: [
      "Perfume bottles",
      "Cosmetic jars",
      "Luxury glass packaging",
      "Custom moulded glass",
    ],
    industries: ["Cosmetics & Personal Care", "Luxury Goods"],
    capacity: "120,000 units/month",
    moq: "10,000 units",
    location: "Firozabad, India",
    marketsServed: ["Europe", "North America", "Middle East"],
    certifications: ["ISO 9001:2015", "SEDEX", "BRC Packaging"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Company registration and tax documents verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "Manufacturing facility verified through third-party audit report",
      },
      {
        type: "Trade Verified",
        evidenceSummary:
          "Export records for 3+ years confirmed through customs documentation",
      },
    ],
    yearsInBusiness: 22,
    description:
      "Premium glass packaging manufacturer with dedicated export lines serving luxury cosmetics and fragrance brands across three continents.",
  },
  {
    id: "orient-cosmetics",
    name: "Orient Cosmetics Packaging",
    type: "supplier",
    products: [
      "Plastic cosmetic tubes",
      "Airless pump bottles",
      "Compact cases",
      "Lipstick tubes",
    ],
    industries: ["Cosmetics & Personal Care"],
    capacity: "200,000 units/month",
    moq: "20,000 units",
    location: "Guangzhou, China",
    marketsServed: ["Global"],
    certifications: ["ISO 9001:2015", "ISO 14001", "FDA Registered"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Business license and registration verified through official records",
      },
      {
        type: "Capability Verified",
        evidenceSummary:
          "Factory audit confirming 4 production lines and QC laboratory",
      },
    ],
    yearsInBusiness: 11,
    description:
      "Full-range cosmetics packaging supplier with in-house design, tooling, and production capabilities. Serves mid-to-large cosmetics brands globally.",
  },
  {
    id: "verdant-labels",
    name: "Verdant Labels & Packaging",
    type: "manufacturer",
    products: [
      "Cosmetic labels",
      "Shrink sleeves",
      "Flexible packaging",
      "Eco-friendly pouches",
    ],
    industries: ["Cosmetics & Personal Care", "Food & Beverage"],
    capacity: "500,000 labels/month",
    moq: "10,000 labels",
    location: "Noida, India",
    marketsServed: ["India", "South Asia", "Africa"],
    certifications: ["ISO 9001:2015", "FSC Certified"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "GST and MSME registration documents verified",
      },
      {
        type: "Identity Verified",
        evidenceSummary:
          "Director identity verified through government ID documentation",
      },
    ],
    yearsInBusiness: 7,
    description:
      "Specializes in sustainable and eco-certified labeling and flexible packaging for cosmetics and FMCG companies.",
  },
  {
    id: "sapphire-textiles",
    name: "Sapphire Textile Mills",
    type: "manufacturer",
    products: [
      "Cotton fabrics",
      "Blended fabrics",
      "Dyed fabrics",
      "Garment-ready textiles",
    ],
    industries: ["Textiles & Apparel", "Home Furnishing"],
    capacity: "150,000 meters/month",
    moq: "5,000 meters",
    location: "Surat, India",
    marketsServed: ["Europe", "North America", "Middle East"],
    certifications: ["OEKO-TEX Standard 100", "GOTS Certified", "ISO 9001:2015"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Company incorporation and GST registration verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "Two mill facilities in Surat verified through site documentation",
      },
      {
        type: "Trade Verified",
        evidenceSummary:
          "5+ years of export documentation to EU and North American markets",
      },
      {
        type: "Capability Verified",
        evidenceSummary:
          "Weaving, dyeing, and finishing capabilities confirmed through equipment inventory",
      },
    ],
    yearsInBusiness: 31,
    description:
      "Vertically integrated textile mill with weaving, dyeing, and finishing capabilities. Exports organic and conventional cotton fabrics to garment manufacturers worldwide.",
  },
  {
    id: "meridian-fabrics",
    name: "Meridian Fabric Solutions",
    type: "supplier",
    products: [
      "Performance fabrics",
      "Activewear textiles",
      "Moisture-wicking fabrics",
      "Recycled polyester",
    ],
    industries: ["Textiles & Apparel", "Sportswear"],
    capacity: "80,000 meters/month",
    moq: "3,000 meters",
    location: "Istanbul, Turkey",
    marketsServed: ["Europe", "United Kingdom", "Scandinavia"],
    certifications: ["OEKO-TEX Standard 100", "GRS Certified", "bluesign"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Turkish trade registry and tax registration verified",
      },
      {
        type: "Trade Verified",
        evidenceSummary:
          "Export history to 12 EU countries confirmed through trade documentation",
      },
    ],
    yearsInBusiness: 9,
    description:
      "Technical textile supplier focused on sustainable performance fabrics for the European activewear and sportswear market.",
  },
  {
    id: "weavetech",
    name: "WeaveTech Industries",
    type: "manufacturer",
    products: [
      "Home textile fabrics",
      "Upholstery fabrics",
      "Curtain fabrics",
      "Bed linen textiles",
    ],
    industries: ["Home Furnishing", "Textiles & Apparel"],
    capacity: "100,000 meters/month",
    moq: "2,000 meters",
    location: "Karur, India",
    marketsServed: ["Europe", "Australia", "North America"],
    certifications: ["OEKO-TEX Standard 100", "ISO 9001:2015", "BSCI"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Company registration and trade license verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "Manufacturing facility verified through third-party audit",
      },
    ],
    yearsInBusiness: 18,
    description:
      "Home textile manufacturer specializing in woven and printed fabrics for global home furnishing brands and retailers.",
  },
  {
    id: "precisioncast",
    name: "PrecisionCast Engineering",
    type: "manufacturer",
    products: [
      "Investment castings",
      "CNC machined components",
      "Precision-turned parts",
      "Custom metal components",
    ],
    industries: ["Automotive", "Industrial Machinery", "Aerospace"],
    capacity: "50,000 components/month",
    moq: "500 components",
    location: "Rajkot, India",
    marketsServed: ["Europe", "North America", "Japan"],
    certifications: ["ISO 9001:2015", "IATF 16949", "AS9100D"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Company incorporation and GST registration verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "CNC machining center and foundry verified through detailed facility report",
      },
      {
        type: "Capability Verified",
        evidenceSummary:
          "Precision capabilities (tolerance +/-0.01mm) verified through sample inspection reports",
      },
      {
        type: "Trade Verified",
        evidenceSummary:
          "10+ years of export records to automotive OEMs in Germany and Japan",
      },
      {
        type: "Identity Verified",
        evidenceSummary:
          "Managing director identity verified through official government documents",
      },
    ],
    yearsInBusiness: 27,
    description:
      "Precision engineering manufacturer serving automotive and aerospace OEMs with investment castings and CNC machined components to tight tolerances.",
  },
  {
    id: "steelcraft",
    name: "SteelCraft Industrial",
    type: "manufacturer",
    products: [
      "Sheet metal fabrications",
      "Welded assemblies",
      "Pressed components",
      "Industrial enclosures",
    ],
    industries: ["Industrial Machinery", "Electronics", "Energy"],
    capacity: "30,000 components/month",
    moq: "200 components",
    location: "Pune, India",
    marketsServed: ["India", "Middle East", "Africa"],
    certifications: ["ISO 9001:2015", "ISO 14001"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "GST registration and company PAN verified",
      },
      {
        type: "Manufacturer Verified",
        evidenceSummary:
          "Sheet metal fabrication facility in Pune MIDC verified on-site",
      },
    ],
    yearsInBusiness: 12,
    description:
      "Sheet metal fabrication and welding specialist for industrial machinery OEMs, electrical panel manufacturers, and energy equipment companies.",
  },
  {
    id: "europarts",
    name: "EuroParts Distribution",
    type: "distributor",
    products: [
      "Bearings",
      "Hydraulic components",
      "Pneumatic fittings",
      "Industrial fasteners",
    ],
    industries: ["Industrial Machinery", "Automotive", "Manufacturing"],
    capacity: "Warehouse: 15,000+ SKUs",
    moq: "No minimum",
    location: "Rotterdam, Netherlands",
    marketsServed: ["Europe", "United Kingdom"],
    certifications: ["ISO 9001:2015"],
    verification: [
      {
        type: "Business Verified",
        evidenceSummary:
          "Dutch Chamber of Commerce (KVK) registration verified",
      },
      {
        type: "Trade Verified",
        evidenceSummary:
          "Distribution agreements with 3 major bearing manufacturers on file",
      },
      {
        type: "Interaction Verified",
        evidenceSummary:
          "Active platform usage with 40+ completed profile interactions",
      },
    ],
    yearsInBusiness: 16,
    description:
      "Industrial parts distributor with a 15,000+ SKU warehouse in Rotterdam, serving manufacturing and maintenance operations across Europe.",
  },
];

// ─── Pre-built Match Results ─────────────────────────────────
// Used in hero preview and /discover page

export const heroMatchResults: MatchResult[] = [
  {
    company: companies[0], // ABC Packaging
    matchScore: 92,
    reasons: [
      "Strong product fit",
      "Capacity matches requirement",
      "Supports required MOQ",
      "Relevant certifications",
    ],
    factors: [
      { label: "Product fit", value: 95 },
      { label: "Capacity", value: 88 },
      { label: "Certifications", value: 92 },
      { label: "Market experience", value: 85 },
      { label: "Location", value: 78 },
    ],
  },
  {
    company: companies[1], // Prism Glassworks
    matchScore: 87,
    reasons: [
      "Strong product fit",
      "Exceeds capacity requirement",
      "Export experience to target markets",
    ],
    factors: [
      { label: "Product fit", value: 90 },
      { label: "Capacity", value: 94 },
      { label: "Certifications", value: 82 },
      { label: "Market experience", value: 88 },
      { label: "Location", value: 72 },
    ],
  },
  {
    company: companies[2], // Orient Cosmetics
    matchScore: 64,
    reasons: [
      "Partial product fit",
      "High capacity available",
    ],
    factors: [
      { label: "Product fit", value: 58 },
      { label: "Capacity", value: 96 },
      { label: "Certifications", value: 70 },
      { label: "Market experience", value: 55 },
      { label: "Location", value: 42 },
    ],
  },
];

export const textileMatchResults: MatchResult[] = [
  {
    company: companies[4], // Sapphire
    matchScore: 94,
    reasons: [
      "Strong product fit",
      "OEKO-TEX and GOTS certified",
      "Established export history to Europe",
      "Capacity matches requirement",
    ],
  },
  {
    company: companies[5], // Meridian
    matchScore: 81,
    reasons: [
      "Performance fabric expertise",
      "GRS and bluesign certified",
      "Based in Turkey - proximity to EU",
    ],
  },
  {
    company: companies[6], // WeaveTech
    matchScore: 73,
    reasons: [
      "Home textile specialist",
      "OEKO-TEX certified",
      "Low MOQ available",
    ],
  },
];

export const industrialMatchResults: MatchResult[] = [
  {
    company: companies[7], // PrecisionCast
    matchScore: 89,
    reasons: [
      "Precision machining capabilities",
      "IATF 16949 automotive certified",
      "10+ years serving automotive OEMs",
      "Tolerance spec matches requirement",
    ],
  },
  {
    company: companies[8], // SteelCraft
    matchScore: 71,
    reasons: [
      "Sheet metal fabrication capability",
      "Located in India - competitive pricing",
      "ISO 14001 environmental certification",
    ],
  },
  {
    company: companies[9], // EuroParts
    matchScore: 58,
    reasons: [
      "Stocks related industrial components",
      "No MOQ requirement",
    ],
  },
];

// ─── Verification Layers ─────────────────────────────────────

export const verificationLayers: VerificationLayer[] = [
  {
    type: "Business Verified",
    title: "Business Verified",
    description:
      "Confirms the business is a registered, legitimate entity with valid legal documentation.",
    evidenceRequired: [
      "Government-issued business registration certificate",
      "Tax registration (GST, VAT, or equivalent)",
      "Registered business address",
    ],
    whyItMatters:
      "You know the company legally exists and is registered with the relevant authorities before you engage.",
  },
  {
    type: "Manufacturer Verified",
    title: "Manufacturer Verified",
    description:
      "Confirms the company operates its own manufacturing or production facility.",
    evidenceRequired: [
      "Factory or facility documentation",
      "On-site or third-party audit report",
      "Equipment and production line records",
    ],
    whyItMatters:
      "You can confirm whether a company actually makes what it claims to make, rather than just trading.",
  },
  {
    type: "Trade Verified",
    title: "Trade Verified",
    description:
      "Confirms the company has an established history of domestic or international trade activity.",
    evidenceRequired: [
      "Export/import documentation or customs records",
      "Trade references or shipping records",
      "Minimum trade history threshold (typically 2+ years)",
    ],
    whyItMatters:
      "You can trust that the company has real trade experience and is not listing capabilities it has never fulfilled.",
  },
  {
    type: "Capability Verified",
    title: "Capability Verified",
    description:
      "Confirms that claimed production capabilities, capacities, and technical specifications are accurate.",
    evidenceRequired: [
      "Capacity documentation or production records",
      "Equipment specifications and inventory",
      "Quality control or sample inspection reports",
    ],
    whyItMatters:
      "The production capacity and technical specs listed on a profile are backed by documented evidence, not self-reported estimates.",
  },
  {
    type: "Identity Verified",
    title: "Identity Verified",
    description:
      "Confirms the identity of key individuals (directors, managers) behind the business.",
    evidenceRequired: [
      "Government-issued personal identification",
      "Role verification within the company",
      "Contact information validation",
    ],
    whyItMatters:
      "You know who you are actually dealing with. The people behind the business are identified, adding personal accountability.",
  },
  {
    type: "Interaction Verified",
    title: "Interaction Verified",
    description:
      "Reflects active, genuine engagement on the platform over time.",
    evidenceRequired: [
      "Consistent platform activity over a sustained period",
      "Profile completeness and maintenance",
      "Responsiveness and engagement metrics",
    ],
    whyItMatters:
      "Active, engaged businesses are more likely to respond promptly and maintain accurate, up-to-date profiles.",
  },
];

// ─── Discovery Path Content ──────────────────────────────────

export const discoveryPathContent = {
  buy: {
    title: "I need to buy",
    subtitle: "Find suppliers that match your specific requirements",
    description:
      "Describe what you need - product, quantity, quality standards, target market - and LINKSUPPLIED identifies the suppliers worth talking to, with reasons for each match.",
    fields: [
      { label: "What do you need?", placeholder: "e.g. Glass cosmetic bottles", key: "product" },
      { label: "Quantity or volume", placeholder: "e.g. 50,000 units/month", key: "quantity" },
      { label: "Your location", placeholder: "e.g. Germany", key: "location" },
      { label: "Required certifications", placeholder: "e.g. ISO 9001, GMP", key: "certifications" },
    ],
  },
  sell: {
    title: "I want to sell",
    subtitle: "Discover buyers actively looking for what you make",
    description:
      "Tell LINKSUPPLIED what you manufacture or supply - products, capacity, certifications - and it surfaces the buyers and procurement teams whose requirements match your capabilities.",
    fields: [
      { label: "What do you make or sell?", placeholder: "e.g. Cotton woven fabrics", key: "product" },
      { label: "Your production capacity", placeholder: "e.g. 150,000 meters/month", key: "quantity" },
      { label: "Your location", placeholder: "e.g. Surat, India", key: "location" },
      { label: "Target markets", placeholder: "e.g. Europe, North America", key: "certifications" },
    ],
  },
  partners: {
    title: "Find partners",
    subtitle: "Identify complementary businesses for collaboration",
    description:
      "Looking for distributors, co-manufacturers, or supply chain partners? Describe the kind of partnership you need and the industries you operate in.",
    fields: [
      { label: "What partnership do you need?", placeholder: "e.g. Distribution partner for EU market", key: "product" },
      { label: "Your industry", placeholder: "e.g. Industrial Components", key: "quantity" },
      { label: "Target region", placeholder: "e.g. Western Europe", key: "location" },
      { label: "Key requirements", placeholder: "e.g. Warehouse capability, existing retailer network", key: "certifications" },
    ],
  },
  "new-market": {
    title: "Enter a new market",
    subtitle: "Discover opportunities in markets you want to grow into",
    description:
      "Planning to expand into a new geography or industry? LINKSUPPLIED maps the relevant businesses, potential partners, and competitive landscape in your target market.",
    fields: [
      { label: "What do you offer?", placeholder: "e.g. Precision CNC machined components", key: "product" },
      { label: "Current markets", placeholder: "e.g. India, Middle East", key: "quantity" },
      { label: "Target market", placeholder: "e.g. Germany, automotive sector", key: "location" },
      { label: "Differentiators", placeholder: "e.g. AS9100D certified, tight tolerance capability", key: "certifications" },
    ],
  },
};

// ─── Hero placeholder examples ──────────────────────────────

export const heroPlaceholders = [
  "I manufacture cosmetic packaging",
  "I need 50,000 glass bottles per month",
  "I'm looking for textile buyers in Europe",
  "I make precision CNC components",
  "I need sustainable fabric suppliers",
  "I want to export industrial parts to Germany",
];

// ─── Pipeline steps ─────────────────────────────────────────

export const pipelineSteps = [
  {
    title: "Business",
    description: "You describe what your business needs or what it makes.",
  },
  {
    title: "Intelligence",
    description: "LINKSUPPLIED builds a deep profile of your requirements and capabilities.",
  },
  {
    title: "Match",
    description: "Relevant businesses are identified and ranked with clear reasons.",
  },
  {
    title: "Connection",
    description: "You explore matched profiles and connect with the businesses worth your time.",
  },
];
