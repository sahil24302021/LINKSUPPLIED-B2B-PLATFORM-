# Early Access form

## Purpose and routes

`/early-access` is a mobile-first three-step intake for Indian manufacturers, suppliers and buyers. `/waitlist` redirects to it. The page is in `src/app/early-access/page.tsx`, the client experience wrapper is `src/features/waitlist/EarlyAccessExperience.tsx`, the wizard is `src/features/waitlist/EarlyAccessWizard.tsx`, and the POST handler is `src/app/api/early-access/route.ts`.

## Flow

1. **About you** (required): manufacturer/supplier, buyer, or both.
2. **Contact** (all required): company name (2-100), name (2-80), WhatsApp number, email, and city/state (2-80). India numbers require ten digits starting 6-9; other country numbers require 6-14 digits.
3. **Your business**: manufacturers/both provide products (required, 150 max) and one or more process chips (required); manufacturers may provide customer-finding methods. Buyers provide sourcing need (required, 150 max), supplier-finding method (required), and may provide a sourcing problem. Both may provide a sourcing need. `Other` needs a short value (80 max).

Successful submission shows an animated confirmation, with reduced motion respected. The client persists a draft in session storage and clears it on success. Inputs have labels, inline errors, focus transfer, `aria-live`, and keyboard-operable chips.

| Answer | Database column |
| --- | --- |
| What they make | `supplierProducts` |
| Processes | `supplierProcesses` |
| What they need | `buyerCommodities` |
| Finding customers/suppliers | `buyerCurrentMethod` |
| Buyer sourcing problem | `buyerBiggestProblem` |
| Generated server summary | `platformIntent` |

`buyerCurrentMethod` is intentionally reused: it means customer-finding method for manufacturers and supplier-finding method for buyers. `platformIntent` is generated server-side because the database requires it.

## API and abuse controls

`POST /api/early-access` accepts the wizard fields plus `company_url` honeypot. It returns success and a reference ID; duplicate email/phone returns success with `isExisting`. Invalid fields return 400, oversized JSON returns 413, more than ten non-duplicate requests from one salted `ipHash` in one hour returns 429, and unexpected failures return 500. Legacy `supplier` and `consultant` roles remain accepted by the API.

Strings are trimmed, whitespace-normalized, control characters removed, and capped server-side. `ipHash` stores a salted hash, not an IP. Environment variables: `DATABASE_URL`, `IP_HASH_SALT`, `GMAIL_APP_SCRIPT_URL`, `RESEND_API_KEY`, `EARLY_ACCESS_FROM_EMAIL`, and optional `EARLY_ACCESS_REPLY_TO`.

## Email and deliverability

Confirmation sends plain text and HTML through Gmail Apps Script, with Resend fallback. Database write happens before email dispatch. Missing email credentials do not prevent signup; email status is recorded. To improve inbox placement, verify a sending domain in Resend, publish SPF and DKIM, then add aligned DMARC. Code alone cannot guarantee inbox placement.

## Analytics and copy

When Vercel Analytics is available, events are `ea_step_view`, `ea_step_complete`, `ea_submit_success`, and `ea_submit_error`, without PII. `RESPONSE_WINDOW` and the Free-to-join string are in `src/types/waitlist.ts`.

## Local testing and limitations

Run `npx tsc --noEmit`, `npm run lint`, and `npx next build --webpack`. Do not use the configured database for test writes unless confirmed as non-production. The repository has no committed automated API/browser test harness; validation-only requests may be tested without writing rows.

## Change log

2026-10-10: Replaced the five-step enterprise intake with the three-step Early Access flow, role-specific questions, WhatsApp contact, confirmation animation, honeypot, and database-backed rate limit.
