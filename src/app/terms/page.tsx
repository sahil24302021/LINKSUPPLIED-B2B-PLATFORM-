import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Terms of Service | LINKSUPPLIED",
  description: "B2B platform rules, matching protocols, and service terms at LINKSUPPLIED.",
};

export default function TermsPage() {
  return (
    <div className="py-20 md:py-28 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content max-w-3xl mx-auto space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-copper hover:text-copper-muted transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Overview
          </Link>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              LEGAL & GOVERNANCE
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-2">
              Platform Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate mt-1">
              Effective Date: September 2026 · Standard Enterprise Sourcing Protocols
            </p>
          </div>

          <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-slate">
            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">1. Platform Scope & Matching Protocol</h2>
              <p>
                LINKSUPPLIED provides technical discovery, capability verification, and quotation coordination between industrial purchasers and qualified manufacturers. LINKSUPPLIED operates as an independent sourcing intelligence system and is not an undisclosed broker.
              </p>
            </section>

            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">2. Supplier Verification Integrity</h2>
              <p>
                Participating manufacturers represent and warrant that submitted machine specifications, facility documentation, quality certifications, and capacity figures reflect actual shop-floor operational realities. False or unverified submissions result in immediate dossier revocation.
              </p>
            </section>

            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">3. Commercial Quotations & Contracts</h2>
              <p>
                Formal purchase orders, quality assurance agreements, tooling amortization agreements, and delivery commitments remain binding bilateral agreements executed between the buyer and the verified supplier.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
