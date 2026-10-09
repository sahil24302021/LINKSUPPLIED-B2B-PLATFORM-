# AI Discoverability and Local Audit — 9 October 2026

## Purpose

This record documents the machine-readable identity improvements for LINKSUPPLIED and the accompanying local-project audit. The work intentionally makes no changes to the product UI, visual design, layout, customer-facing page copy, application flows, or dependencies.

## Brand and AI discoverability

LINKSUPPLIED is an industrial B2B discovery, intelligence, and capability-matching platform. It helps procurement teams find relevant manufacturing partners through structured requirements, verification evidence, and explainable fit criteria.

The root layout now provides a canonical URL, Open Graph and Twitter metadata, crawler directives, and Schema.org data for the Organization, WebSite, and SoftwareApplication. The public `llms.txt` file provides a concise, crawler-readable description, canonical links, and a deliberate distinction from unrelated businesses called “Link Supply” or similar names.

These improvements help search engines and AI systems that crawl the public web understand the correct brand. They cannot guarantee immediate inclusion or the same answer from every AI model.

## Local hydration warning

The reported Next.js development overlay was reproduced from the existing local development log. The mismatch is not produced by LINKSUPPLIED source code. Before React hydrates, a browser extension adds the following attributes to the DOM:

- `bis_skin_checked="1"`
- `bis_register="…"`
- `__processed_…="true"`

React reports those extension-injected attributes as a hydration mismatch because they do not exist in the server-rendered HTML. No source file contains `bis_skin_checked`. The correct resolution is to disable the extension for `localhost:3000`, use an incognito/profile with extensions disabled, or test a production deployment. Do not add `suppressHydrationWarning`: doing so would only hide genuine application hydration errors in the future.

## Audit results

| Check | Result | Notes |
| --- | --- | --- |
| ESLint (`npm run lint`) | Passed | No ESLint errors or warnings. |
| TypeScript (`tsc --noEmit`) | Passed | No TypeScript errors. |
| Production build (`next build --webpack`) | Passed | Compiled, type-checked, and generated all 33 static pages. |
| Default Turbopack build (`npm run build`) | Environment-limited | Local Turbopack could not bind a helper process/port while the development server was active; this was not a code error. An earlier isolated run also could not reach Google Fonts because network DNS was unavailable. |
| Public route checks | Passed | All static public routes returned HTTP 200; `/waitlist` correctly redirects to `/early-access`; all 10 generated supplier routes returned HTTP 200; an invalid supplier returned HTTP 404. |
| Metadata and crawler endpoints | Passed | `/robots.txt`, `/sitemap.xml`, and `/llms.txt` returned HTTP 200. The homepage renders canonical, description, Open Graph, Twitter, and JSON-LD markup. |
| Secrets and Git review | Passed | No environment file is tracked or included in the intended change set. |

## Deployment follow-up

After deployment, verify `https://linksupplied-b2b.vercel.app/llms.txt`, `robots.txt`, and `sitemap.xml` are live. In Google Search Console, inspect the homepage, `/about`, and `/llms.txt`, then request indexing for the homepage and submit or refresh the sitemap. Search and AI discovery can take days or weeks to update.
