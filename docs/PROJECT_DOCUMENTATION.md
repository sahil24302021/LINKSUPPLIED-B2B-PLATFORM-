# LINKSUPPLIED — Complete Technical Documentation

> **Status:** Production-Ready Frontend & Minimal Early Access Backend  
> **Target Audience:** Engineering, AI Agents, Devops & Product Contributors  
> **Last Updated:** September 2026

---

## 1. Project Overview & LINKSUPPLIED Purpose

**LINKSUPPLIED** is an industrial procurement and manufacturing discovery intelligence platform. It replaces outdated online directories, middlemen brokers, and unverified supplier databases with an **explainable, multi-tier verified capability-matching system**.

### The Core Problem It Solves
- **For Enterprise Procurement & Engineering Buyers:** Finding reliable, audited precision manufacturing plants (e.g., 5-axis CNC machining, titanium forging, ISO 9001/AS9100D certified facilities) usually requires dealing with unvetted brokers, trade fairs, or unreliable web listings claiming capabilities they do not possess.
- **For Advanced Manufacturers & Machine Shops:** High-precision manufacturing plants with expensive machine tools (DMG MORI, Mazak, Zeiss CMM) struggle with unpredictable capacity utilization and waste time quoting unqualified, low-intent inquiries.
- **The LINKSUPPLIED Solution:**
  1. **Structured Requirement Intake:** Sourcing briefs capture exact part dimensions, tolerances, materials, batch cadences, and delivery incoterms.
  2. **Multi-Tier Verification Framework:** Suppliers are verified across 6 distinct evidentiary layers (Entity, Facility, Capability, Quality, Trade, and Interaction).
  3. **Explainable Matching Engine:** Matches show clear percentage fit and transparent breakdown of capability, machine envelope, material compatibility, and certification alignment.
  4. **Two-Sided Platform Network:** Connects buyer demand directly to verified supplier capacity.

---

## 2. Current Product Status

| Area | Status | Description |
| :--- | :--- | :--- |
| **Frontend UI/UX** | **100% Finalized** | All 16 public and gated routes, responsive layout (Desktop 1440px + Mobile 390px), GSAP & Motion animations, typography, and theme tokens. |
| **Interactive Demo Mode** | **100% Finalized** | Client-side simulation mode allowing full walkthrough of Buyer and Supplier dashboards, RFQ workspaces, and quotation comparisons without credentials. |
| **Early Access Backend** | **100% Functional** | Dedicated production-grade endpoint (`POST /api/early-access`), PostgreSQL database (`EarlyAccessLead`), collision-safe reference codes, and Resend transactional confirmation emails. |
| **Full Product Backend** | **Intentionally Deferred** | User authentication, payment processing, live RFQ persistence, and automated matching algorithms are intentionally omitted at this stage. |

---

## 3. Technology Stack

- **Framework:** [Next.js 16.3.4](https://nextjs.org/) (App Router, Turbopack, React Server Components + Client Boundaries)
- **Runtime & UI Library:** React 19.2.8, React DOM 19.2.8
- **Language & Type System:** TypeScript 5.9.3 (Strict mode, Zero implicit `any`)
- **Styling & Design System:** Tailwind CSS v4 (`@tailwindcss/postcss` 4.3.3) with curated HSL color tokens (`bg-paper`, `text-ink`, `text-copper`, `text-slate`)
- **Icons:** `@phosphor-icons/react` 2.1.10 (Consistent duotone, bold, and regular weights)
- **Animation Orchestration:**
  - [GSAP 3.15.0](https://gsap.com/) + `ScrollTrigger` + `@gsap/react` for pinned desktop scroll sequences and coordinated entrances.
  - [Motion 13.2.0](https://motion.dev/) (Framer Motion) for UI spring micro-interactions, modal transitions, and drawer reveals.
- **Database & ORM:** PostgreSQL + [Prisma ORM 6.19.3](https://www.prisma.io/)
- **Transactional Email:** [Resend SDK 6.9.3](https://resend.com/)
- **Utilities:** `clsx` 2.1.1 + `tailwind-merge` 3.6.0 (`cn()` helper)

---

## 4. Architecture Maps & Information Flow

### High-Level Early Access Submission Flow
```text
                  USER
                   │
                   ▼
       LINKSUPPLIED APPLICATION
       (http://localhost:3000/early-access)
                   │
                   ▼
         [EarlyAccessWizard]
         5-Step Qualified Form
                   │
                   ▼
        POST /api/early-access
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
 Request Size Check      Server-Side Validation
   (< 64 KB)             (Email RFC, Required Fields,
                          Input Sanitization, ipHash)
                                │
                                ▼
                      [Prisma Client: db.ts]
                                │
                                ▼
                       PostgreSQL Database
                     Table: "EarlyAccessLead"
                                │
                   ┌────────────┴────────────┐
                   ▼                         ▼
             [DB Success]               [DB Failure]
                   │                         │
                   ▼                         ▼
        [sendConfirmationEmail]        Return HTTP 500
          (Resend SDK API)             (No email sent;
                   │                    safe user error)
        ┌──────────┴──────────┐
        ▼                     ▼
   [Email Sent]         [Email Failed]
   emailSent: true      emailSent: false
                        emailError logged
                        (Lead KEPT in DB)
        │                     │
        └──────────┬──────────┘
                   ▼
          Return HTTP 200 OK
        { success: true, referenceId }
                   │
                   ▼
          [EarlyAccessWizard]
          Display Confirmation
          "You're on the Priority List"
          (Ref: EA-2026-XXXX)
```

### Homepage Component Structure
```text
Home (src/app/page.tsx)
 ├── 01 + 02: HeroProblemTransition
 │     ├── HeroSection (Live query input, value propositions, badge)
 │     └── ProblemSection (Noise canvas, 4 structural supply friction cards)
 ├── 03: WhyLinksuppliedSection (Traditional vs LINKSUPPLIED comparison)
 ├── 04: PipelineSection -> PinnedPipeline (5-step interactive procurement pipeline)
 ├── 05: TwoSidedSection (Pinned desktop split panel / Mobile vertical stack)
 ├── 06: ProfilePreviewSection (Interactive audited machine shop dossier preview)
 ├── 07: MatchingSection (Explainable fit breakdown & factor bars)
 ├── 08: VerificationSection (Multi-tier evidence matrix)
 └── 09: CTASection -> cta69 (Dual intake pilot action)
```

---

## 5. Complete Folder & File Structure

```text
linksupplied-app/
├── docs/                        # Project technical documentation & audit reports
│   ├── CODEBASE_AUDIT.md        # Comprehensive codebase audit & cleanup report
│   └── PROJECT_DOCUMENTATION.md # Complete technical specification & architecture
├── prisma/                      # Prisma schema (PostgreSQL datasource + EarlyAccessLead model)
│   └── schema.prisma
├── public/                      # Static public assets (favicons, fonts, images)
├── src/
│   ├── app/                     # Next.js App Router routes & layouts
│   │   ├── api/
│   │   │   └── early-access/
│   │   │       └── route.ts     # POST /api/early-access endpoint
│   │   ├── about/page.tsx       # Company story, leadership, and operational philosophy
│   │   ├── dashboard/
│   │   │   ├── buyer/page.tsx   # Buyer procurement pipeline dashboard (Demo gated)
│   │   │   └── supplier/page.tsx# Supplier capacity & quotation dashboard (Demo gated)
│   │   ├── discover/page.tsx    # 6-step Buyer Sourcing Brief wizard
│   │   ├── early-access/page.tsx# Priority Access application page
│   │   ├── how-it-works/page.tsx# Complete deep-dive into platform mechanics
│   │   ├── login/page.tsx       # Workspace authentication portal
│   │   ├── matching/page.tsx    # Live explainable supplier matching explorer
│   │   ├── privacy/page.tsx     # Enterprise privacy policy & GDPR statements
│   │   ├── register/page.tsx    # Dual-intake buyer/supplier onboarding
│   │   ├── rfq/page.tsx         # RFQ negotiation & formal quote comparison workspace
│   │   ├── suppliers/
│   │   │   └── [id]/page.tsx    # SSG dynamic profile dossier for 10 verified suppliers
│   │   ├── terms/page.tsx       # Standard commercial terms & conditions
│   │   ├── verification/page.tsx# 6-tier evidentiary audit standards explorer
│   │   ├── waitlist/page.tsx    # Route alias redirecting to /early-access
│   │   ├── globals.css          # Design system variables, Tailwind layers, font classes
│   │   └── layout.tsx           # Global root layout, Navbar, Footer, GlobalModals, DemoBanner
│   ├── components/
│   │   ├── auth/
│   │   │   └── RouteGate.tsx    # Client gate prompting demo mode for protected workspaces
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Global navigation bar with desktop mega-menus & mobile drawer
│   │   │   └── Footer.tsx       # Global footer with platform links, status, and legal links
│   │   └── ui/                  # Design system atomic UI primitives
│   │       ├── Badge7.tsx       # Pill badge component with subtle border/dot
│   │       ├── Button.tsx       # Standard design system button with variants & sizes
│   │       ├── Button12.tsx     # Animated action button with rotating arrow pill
│   │       ├── Card.tsx         # Standard structural container with elevation states
│   │       ├── ComingSoonModal.tsx# Global early-access & pilot qualification modal
│   │       ├── DemoModeBanner.tsx# Top banner alerting users when Demo Mode is active
│   │       ├── EmptyState.tsx   # Standard empty state illustration with action button
│   │       ├── FactorBarChart.tsx# Horizontal capability factor alignment bar chart
│   │       ├── FormField.tsx    # Form field wrapper with label, hint, and error text
│   │       ├── GlobalModals.tsx # Global modal manager mounted in root layout
│   │       ├── Input.tsx        # Styled input, select, and textarea primitives
│   │       ├── InstantEvaluationModal.tsx # Quick tolerance & envelope fit calculator modal
│   │       ├── NoiseField.tsx   # Subtle canvas grain animation for problem section
│   │       ├── PinnedPipeline.tsx# GSAP-pinned 5-step desktop and mobile pipeline sequence
│   │       ├── SampleDataTag.tsx# Small pill highlighting simulated sample data
│   │       └── cta69.tsx        # High-impact CTA banner with dual intake buttons
│   ├── data/                    # Authentic industrial mock fixtures (zero placeholder slop)
│   │   ├── companies.ts         # 10 deep manufacturing plant profiles (machines, tolerances)
│   │   ├── discovery-paths.ts   # Category search presets and placeholder queries
│   │   ├── index.ts             # Barrel export for all mock data
│   │   ├── matches.ts           # Sample match calculations with explainable factor scores
│   │   ├── pipeline.ts          # 5-step sourcing pipeline sequence descriptions
│   │   ├── procurement-presets.ts# Standard industry sourcing presets (aerospace, medical)
│   │   ├── rfqs-quotes.ts       # Formal RFQ submissions and multi-supplier quote line items
│   │   └── verification-layers.ts# Detailed criteria for all 6 verification layers
│   ├── features/                # Domain-driven feature modules
│   │   ├── auth/                # Buyer and Supplier onboarding wizard implementations
│   │   ├── company/             # Supplier profile dossier, machine list, and capability tabs
│   │   ├── dashboard/           # Buyer and Supplier dashboard management views
│   │   ├── discovery/           # 6-step requirement wizard with validations and draft saving
│   │   ├── landing/             # 9 sections composing the homepage
│   │   ├── matching/            # Match cards, factor breakdown drawer, comparison modal
│   │   ├── rfq/                 # Quotation cards, line-item comparison matrix, quote modal
│   │   ├── verification/        # Verification matrix, timeline, and evidence stack
│   │   └── waitlist/            # EarlyAccessWizard (5-step priority access application)
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-demo-mode.ts     # Demo role state management and localStorage sync
│   │   └── use-isomorphic-layout-effect.ts # SSR-safe layout effect for GSAP animations
│   ├── lib/                     # Application utilities and server clients
│   │   ├── animation.ts         # Motion spring, easing, and duration constants
│   │   ├── coming-soon.ts       # Global event dispatchers for modals
│   │   ├── db.ts                # PrismaClient singleton instance for PostgreSQL
│   │   ├── demo-mode.ts         # Client helper functions for demo mode cookies/storage
│   │   ├── email.ts             # Resend transactional email dispatch service
│   │   └── utils.ts             # cn() classnames merger helper
│   ├── services/                # API client architecture placeholders for future backend
│   │   └── README.md
│   └── types/                   # TypeScript domain contracts and interfaces
│       ├── company.ts           # Company, machine tool, capacity, and quality types
│       ├── dashboard.ts         # Dashboard analytics and activity event types
│       ├── discovery.ts         # Sourcing brief and form state interfaces
│       ├── index.ts             # Barrel export for all types
│       ├── matching.ts          # MatchResult, factor scores, and filter state types
│       ├── onboarding.ts        # Registration wizard form types
│       ├── rfq.ts               # RFQRecord, SupplierQuote, and quote status types
│       ├── verification.ts      # VerificationLayer, audit standard, and evidence types
│       └── waitlist.ts          # EarlyAccessSubmission and role types
├── .env                         # Local environment variables (Gitignored)
├── .env.example                 # Documented environment variable template
├── .env.local                   # Local overrides (Gitignored)
├── .gitignore                   # Comprehensive gitignore (ignores all .env*, node_modules, build)
├── eslint.config.mjs            # Flat ESLint configuration with Next.js and TypeScript plugins
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependency definitions and scripts
├── postcss.config.mjs           # PostCSS configuration for Tailwind CSS v4
└── tsconfig.json                # TypeScript compiler configuration (strict mode)
```

---

## 6. Early Access Backend & Form Specification

### Form Field Mapping Table

| Form Field | Technical Key | PostgreSQL Column | Data Type | Constraint | Required in Form? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Full Name** | `fullName` | `fullName` | `TEXT` | `NOT NULL` | Yes (Min 2 chars) |
| **Work Email** | `workEmail` | `workEmail` | `TEXT` | `NOT NULL, INDEXED` | Yes (RFC Regex) |
| **Phone Number** | `phone` | `phone` | `TEXT` | `NULLABLE` | No |
| **Your Title** | `designation` | `designation` | `TEXT` | `NULLABLE` | No |
| **Company Name** | `companyName` | `companyName` | `TEXT` | `NOT NULL` | Yes (Min 2 chars) |
| **Industry** | `industry` | `industry` | `TEXT` | `NULLABLE` | No |
| **Company Size** | `companySize` | `companySize` | `TEXT` | `NULLABLE` | No |
| **HQ Location** | `location` | `location` | `TEXT` | `NULLABLE` | No |
| **Website** | `website` | `website` | `TEXT` | `NULLABLE` | No |
| **Operational Role** | `role` | `role` | `TEXT` | `NOT NULL` | Yes (`buyer` \| `manufacturer` \| `supplier` \| `consultant`) |
| **Buyer Commodities** | `buyerCommodities` | `buyerCommodities` | `TEXT` | `NULLABLE` | No |
| **Sourcing Method** | `buyerCurrentMethod` | `buyerCurrentMethod`| `TEXT` | `NULLABLE` | No |
| **Sourcing Frustration**| `buyerBiggestProblem`| `buyerBiggestProblem`| `TEXT` | `NULLABLE` | No |
| **Buyer Volume** | `buyerVolume` | `buyerVolume` | `TEXT` | `NULLABLE` | No |
| **Machine Tools** | `supplierProcesses` | `supplierProcesses` | `TEXT` | `NULLABLE` | No |
| **Monthly Capacity** | `supplierCapacity` | `supplierCapacity` | `TEXT` | `NULLABLE` | No |
| **Certifications Held**| `supplierCertifications`| `supplierCertifications`| `TEXT` | `NULLABLE` | No |
| **Supplier Products** | `supplierProducts` | `supplierProducts` | `TEXT` | `NULLABLE` | No |
| **Supplier Materials** | `supplierMaterials`| `supplierMaterials`| `TEXT` | `NULLABLE` | No |
| **Platform Intent** | `platformIntent` | `platformIntent` | `TEXT` | `NOT NULL` | Yes (Min 5 chars) |
| **Reference ID** | `referenceId` | `referenceId` | `TEXT` | `NOT NULL, UNIQUE` | Generated by API (`EA-2026-XXXX`) |
| **Submission Source** | `source` | `source` | `TEXT` | `DEFAULT 'early-access-page'` | Yes |
| **Client IP Hash** | `ipHash` | `ipHash` | `TEXT` | `NULLABLE` | One-way SHA-256 (Zero raw PII) |
| **User Agent** | `userAgent` | `userAgent` | `TEXT` | `NULLABLE` | Client Browser Header |
| **Email Sent Status** | `emailSent` | `emailSent` | `BOOLEAN` | `NOT NULL, DEFAULT false` | Set dynamically by email step |
| **Email Error Info** | `emailError` | `emailError` | `TEXT` | `NULLABLE` | Delivery error message if failed |
| **Created Timestamp** | `createdAt` | `createdAt` | `TIMESTAMP` | `NOT NULL, INDEXED` | Current UTC Timestamp |
| **Updated Timestamp** | `updatedAt` | `updatedAt` | `TIMESTAMP` | `NOT NULL` | Auto-updated on record update |

---

## 7. Database Architecture & Prisma Schema

The application uses PostgreSQL with Prisma ORM 6.19.3. Only one single table model exists: `EarlyAccessLead`.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model EarlyAccessLead {
  id                     String    @id @default(cuid())
  referenceId            String    @unique
  fullName               String
  workEmail              String
  phone                  String?
  designation            String?
  companyName            String
  website                String?
  industry               String?
  location               String?
  companySize            String?
  role                   String    // "buyer" | "manufacturer" | "supplier" | "consultant"
  buyerCommodities       String?
  buyerCurrentMethod     String?
  buyerVolume            String?
  buyerBiggestProblem    String?
  supplierProducts       String?
  supplierProcesses      String?
  supplierMaterials      String?
  supplierCapacity       String?
  supplierCertifications String?
  platformIntent         String
  source                 String?   @default("early-access-page")
  ipHash                 String?   // Privacy-compliant one-way hash for abuse prevention
  userAgent              String?
  emailSent              Boolean   @default(false)
  emailError             String?
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt

  @@index([workEmail])
  @@index([createdAt])
}
```

### Prisma Client Singleton (`src/lib/db.ts`)
To prevent connection leaks and exhausted PostgreSQL client pools during Next.js Turbopack development, the Prisma instance is cached globally:
```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

---

## 8. Transactional Email Architecture (Resend)

Confirmation emails are handled by [`src/lib/email.ts`](file:///Users/sahilkumar/Desktop/LINKSUPPLIED/linksupplied-app/src/lib/email.ts) using the official `resend` SDK.

### Email Copy & Standards
- **Subject:** `You're on the LINKSUPPLIED Early Access list`
- **Sender:** Configured via `EARLY_ACCESS_FROM_EMAIL` (e.g. `LINKSUPPLIED <hello@linksupplied.com>` or `LINKSUPPLIED <onboarding@resend.dev>`)
- **Body:**
  ```text
  Hi {{name}},

  Thanks for joining LINKSUPPLIED Early Access.

  We've received your details and will keep you updated as we open access to the platform.

  We'll be in touch soon.

  — Team LINKSUPPLIED
  ```
- **Fallback Guarantee:** If `RESEND_API_KEY` is not provided (e.g., in local development or before domain verification), the email step is logged safely, `emailSent: false` is recorded, but the database lead remains safely saved, and the user receives a success response.

---

## 9. Environment Variables Specification

All environment variables are declared in [`.env.example`](file:///Users/sahilkumar/Desktop/LINKSUPPLIED/linksupplied-app/.env.example):

```env
# 1. Database Connection URL (PostgreSQL)
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Example local: postgresql://sahilkumar@localhost:5432/linksupplied
# Example production: postgresql://user:pass@ep-cool-db.aws.neon.tech/linksupplied?sslmode=require
DATABASE_URL="postgresql://sahilkumar@localhost:5432/linksupplied"

# 2. Resend API Key
# Generated at https://resend.com/api-keys
# NEVER prefix this with NEXT_PUBLIC_! Keep strictly server-side.
RESEND_API_KEY=""

# 3. Transactional Email Sender Address
# In production after domain verification: "LINKSUPPLIED <hello@linksupplied.com>"
# For testing prior to domain verification: "LINKSUPPLIED <onboarding@resend.dev>"
EARLY_ACCESS_FROM_EMAIL="LINKSUPPLIED <onboarding@resend.dev>"

# 4. Optional IP Hash Salt (for GDPR privacy-compliant abuse hashing)
IP_HASH_SALT="linksupplied_privacy_salt"
```

> [!CAUTION]
> **Security Rule:** Never commit `.env` or `.env.local`. Both are strictly ignored in `.gitignore`. Real credentials must only be injected via your hosting environment settings (e.g., Vercel Project Settings).

---

## 10. Local Development & Operational Commands

### Prerequisites
- Node.js 20+ (Tested through Node v26.8.1)
- PostgreSQL 14+ running locally or a cloud database connection string.

### Initial Setup
```bash
# 1. Clone repository & enter app directory
cd linksupplied-app

# 2. Install dependencies
npm install

# 3. Create local PostgreSQL database
createdb linksupplied

# 4. Create your local .env file
cp .env.example .env
# Ensure DATABASE_URL points to your PostgreSQL database

# 5. Push Prisma schema to PostgreSQL
npx prisma db push

# 6. Start development server
npm run dev
# App will run at http://localhost:3000
```

### Essential Commands Reference
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production bundle and runs static page generation |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs flat ESLint audit across all files |
| `npx tsc --noEmit` | Runs full TypeScript type-checking without emitting files |
| `npx prisma db push` | Pushes `schema.prisma` updates to the PostgreSQL database |
| `npx prisma studio` | Opens interactive browser UI to inspect database records |

---

## 11. Testing Instructions

### 1. Test Valid Form Submission End-to-End
```bash
curl -X POST http://localhost:3000/api/early-access \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Engineer",
    "workEmail": "test.engineer@plant.de",
    "companyName": "Plant Engineering GmbH",
    "role": "manufacturer",
    "platformIntent": "Connect with buyers needing 5-axis CNC machining."
  }'
```
*Expected response:* `{"success":true,"referenceId":"EA-2026-XXXX"}` (HTTP 200).

### 2. Test Invalid Email Rejection
```bash
curl -X POST http://localhost:3000/api/early-access \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Engineer",
    "workEmail": "invalid-email-address",
    "companyName": "Plant Engineering GmbH",
    "role": "buyer",
    "platformIntent": "Looking for suppliers."
  }'
```
*Expected response:* `{"success":false,"message":"Please provide a valid corporate email address."}` (HTTP 400).

### 3. Test Missing Required Fields Rejection
```bash
curl -X POST http://localhost:3000/api/early-access \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Engineer",
    "workEmail": "test.engineer@plant.de",
    "companyName": "",
    "role": "buyer",
    "platformIntent": ""
  }'
```
*Expected response:* `{"success":false,"message":"Please provide your company name."}` (HTTP 400).

### 4. Test Deduplication
Submitting the same email address within 5 minutes returns their existing reference code without duplicating records in the database.

---

## 12. Deployment & Domain Configuration

When deploying LINKSUPPLIED to production (e.g. Vercel, Railway, Render):

### 1. Vercel Environment Configuration
In the Vercel Project Settings $\rightarrow$ Environment Variables:
1. `DATABASE_URL`: Add your production PostgreSQL connection string (Supabase, Neon, Railway, AWS RDS).
2. `RESEND_API_KEY`: Add your live API key from [resend.com](https://resend.com).
3. `EARLY_ACCESS_FROM_EMAIL`: Set to `LINKSUPPLIED <hello@linksupplied.com>`.

### 2. Build & Database Setup Step
In Vercel Build Settings:
- Build Command: `prisma generate && next build`
- Post-Deployment: Run `npx prisma db push` against the production database to create the `EarlyAccessLead` table.

### 3. Custom Domain Configuration
1. Point your domain DNS records (A and CNAME) to Vercel according to Vercel instructions.
2. In Resend $\rightarrow$ Domains:
   - Add `linksupplied.com`.
   - Add the 3 required DNS records (SPF, DKIM, and DMARC TXT/MX records) to your DNS registrar (Cloudflare, Namecheap, Route53, etc.).
   - Verify domain status in Resend before switching `EARLY_ACCESS_FROM_EMAIL` to `hello@linksupplied.com`.

---

## 13. Important Areas — Do Not Alter Unnecessarily

1. **`src/features/landing/HeroProblemTransition.tsx`:** Coordinates the desktop pinned curtain reveal and mobile natural scroll transition. The positioning and initial states (`scale: 1, filter: "blur(0px)"`) prevent background bleed.
2. **`src/features/landing/TwoSidedSection.tsx`:** Contains the desktop `top-[80px]` and mobile `top-[66px]` clearance offsets that keep the `05 — TWO-SIDED NETWORK` indicator visible below the 54px navbar.
3. **`src/components/ui/PinnedPipeline.tsx`:** Controls the pinned 5-step interactive horizontal/vertical pipeline sequence.
4. **`src/hooks/use-isomorphic-layout-effect.ts`:** Must always be used instead of standard `useLayoutEffect` for GSAP matchMedia to prevent Next.js SSR hydration mismatches.
5. **`src/app/api/early-access/route.ts`:** Enforces the strict rule that database persistence MUST succeed before attempting email dispatch.

---

## 14. Troubleshooting & FAQ

- **Database Connection Error (`P1001: Can't reach database server`):**
  - Check that PostgreSQL is running locally (`pg_isready`).
  - Verify your `DATABASE_URL` in `.env`.
- **Email Skipped Warning in Logs:**
  - If you see `[EarlyAccess Email] RESEND_API_KEY is not set`, this is expected in development when no API key is provided. The submission will still succeed and be saved in PostgreSQL.
- **Reference ID Collisions:**
  - Handled automatically. The generator checks the database up to 5 times for uniqueness and falls back to a randomized alphanumeric suffix if all 4-digit numbers collide.
