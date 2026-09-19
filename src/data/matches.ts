import type { MatchResult } from "@/types";
import { companies } from "./companies";

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
      { label: "Material & Product fit", value: 95 },
      { label: "Production capacity", value: 88 },
      { label: "Certifications & Audit", value: 92 },
      { label: "Machinery & Tooling", value: 85 },
      { label: "Location & Logistics", value: 78 },
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
      { label: "Material & Product fit", value: 90 },
      { label: "Production capacity", value: 94 },
      { label: "Certifications & Audit", value: 82 },
      { label: "Machinery & Tooling", value: 88 },
      { label: "Location & Logistics", value: 72 },
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
      { label: "Material & Product fit", value: 58 },
      { label: "Production capacity", value: 96 },
      { label: "Certifications & Audit", value: 70 },
      { label: "Machinery & Tooling", value: 55 },
      { label: "Location & Logistics", value: 42 },
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
    factors: [
      { label: "Material & Product fit", value: 96 },
      { label: "Production capacity", value: 92 },
      { label: "Certifications & Audit", value: 95 },
      { label: "Machinery & Tooling", value: 88 },
      { label: "Location & Logistics", value: 84 },
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
    factors: [
      { label: "Material & Product fit", value: 84 },
      { label: "Production capacity", value: 78 },
      { label: "Certifications & Audit", value: 89 },
      { label: "Machinery & Tooling", value: 80 },
      { label: "Location & Logistics", value: 85 },
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
    factors: [
      { label: "Material & Product fit", value: 75 },
      { label: "Production capacity", value: 70 },
      { label: "Certifications & Audit", value: 78 },
      { label: "Machinery & Tooling", value: 72 },
      { label: "Location & Logistics", value: 68 },
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
    factors: [
      { label: "Material & Product fit", value: 94 },
      { label: "Production capacity", value: 86 },
      { label: "Certifications & Audit", value: 92 },
      { label: "Machinery & Tooling", value: 90 },
      { label: "Location & Logistics", value: 76 },
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
    factors: [
      { label: "Material & Product fit", value: 72 },
      { label: "Production capacity", value: 76 },
      { label: "Certifications & Audit", value: 70 },
      { label: "Machinery & Tooling", value: 68 },
      { label: "Location & Logistics", value: 70 },
    ],
  },
  {
    company: companies[9], // EuroParts
    matchScore: 58,
    reasons: [
      "Stocks related industrial components",
      "No MOQ requirement",
    ],
    factors: [
      { label: "Material & Product fit", value: 55 },
      { label: "Production capacity", value: 62 },
      { label: "Certifications & Audit", value: 60 },
      { label: "Machinery & Tooling", value: 52 },
      { label: "Location & Logistics", value: 64 },
    ],
  },
];
