import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Privacy Policy | LINKSUPPLIED",
  description: "Enterprise B2B data confidentiality and privacy principles at LINKSUPPLIED.",
};

export default function PrivacyPage() {
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
              Confidentiality & Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate mt-1">
              Effective Date: September 2026 · Standard Enterprise Sourcing Protocols
            </p>
          </div>

          <div className="prose prose-slate text-sm leading-relaxed space-y-6 text-slate">
            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">1. Technical Intellectual Property Protection</h2>
              <p>
                All engineering drawings, CAD files, precision tolerances, material compositions, and proprietary part geometries submitted through the LINKSUPPLIED intake system remain the exclusive intellectual property of the purchasing organization.
              </p>
            </section>

            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">2. Supplier Data Verification & Auditing</h2>
              <p>
                Machinery registrations, factory property deeds, quality certificates, and testing laboratory records submitted by manufacturers are utilized strictly for capability verification, capacity calibration, and deterministic matching.
              </p>
            </section>

            <section className="bg-surface p-6 rounded-2xl border border-ink/[0.08] shadow-xs space-y-3">
              <h2 className="text-base font-bold text-ink">3. No Unsolicited Contact Distribution</h2>
              <p>
                LINKSUPPLIED does not sell, rent, or distribute contact lists to third-party telemarketers or unauthorized broker networks. Communication is initiated solely when a verified matching threshold is met.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
