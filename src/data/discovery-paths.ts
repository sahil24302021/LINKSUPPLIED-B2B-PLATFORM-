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
