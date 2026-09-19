"use client";

import Link from "next/link";
import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { VerificationStatus } from "@/features/verification/VerificationStatus";
import {
  Buildings,
  Factory,
  Cpu,
  Certificate,
  Airplane,
  ChartLine,
  ArrowRight,
} from "@phosphor-icons/react";

interface SupplierVerificationProps {
  company: Company;
}

export function SupplierVerification({ company }: SupplierVerificationProps) {
  const isManufacturer = company.type === "manufacturer";

  const verificationRows = [
    {
      domain: "01 Entity & Legal Standing",
      icon: Buildings,
      status: "verified" as const,
      auditType: "Government MCA Registry Cross-Check",
      detail:
        "Incorporation charter, CIN corporate ID, and active GST/tax filing standing validated via primary government records.",
    },
    {
      domain: "02 Physical Facility & Premises",
      icon: Factory,
      status: isManufacturer ? ("verified" as const) : ("verified" as const),
      auditType: isManufacturer ? "On-Site Walkthrough Audit" : "Registered Office Verification",
      detail: isManufacturer
        ? `Physical manufacturing plant in ${company.location} confirmed with GPS-stamped photo inspection and dedicated power utility deeds.`
        : "Registered corporate commercial office and logistics warehousing footprint confirmed.",
    },
    {
      domain: "03 Manufacturing Tooling & Capability",
      icon: Cpu,
      status: isManufacturer ? ("verified" as const) : ("not_available" as const),
      auditType: isManufacturer ? "Machine Serial Number Audit" : "Trading Desk (No Direct Machinery)",
      detail: isManufacturer
        ? "Machine tool invoices and shop floor serial plates verified against declared envelope and tolerance capabilities."
        : "Company operates as a materials distributor / stockist without in-house fabrication machinery.",
    },
    {
      domain: "04 Quality Systems & Metrology",
      icon: Certificate,
      status: company.certifications.length > 0 ? ("verified" as const) : ("under_review" as const),
      auditType: "Registrar Accreditation Verification",
      detail:
        "Accredited ISO standards and metrology calibration logbooks verified directly with issuing registrars (TÜV, UKAS).",
    },
    {
      domain: "05 Trade History & Compliance",
      icon: Airplane,
      status: company.verification.some((v) => v.type === "Trade Verified")
        ? ("verified" as const)
        : ("not_available" as const),
      auditType: "Customs Export Declaration Reconciliation",
      detail:
        "Cross-border shipping bills and port bill of lading records reconciled where authorized by supplier.",
    },
    {
      domain: "06 Platform Execution & SLA",
      icon: ChartLine,
      status: "reported" as const,
      auditType: "LINKSUPPLIED Telemetry & Self-Reported SLA",
      detail:
        "Reported quotation turnaround speed, technical query responsiveness, and order completion fidelity.",
    },
  ];

  const confirmedCount = verificationRows.filter((r) => r.status === "verified").length;

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold">
              LINKSUPPLIED VERIFICATION DOSSIER
            </span>
            <SampleDataTag />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-ink">
            Multi-Layer Trust & Verification Audit
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
            {confirmedCount} OF 6 LAYERS CONFIRMED
          </span>
          <Link
            href="/verification"
            className="text-xs font-mono font-semibold text-copper hover:underline inline-flex items-center gap-1"
          >
            <span>How it works</span>
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {verificationRows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.domain}
              className="p-3.5 sm:p-4 rounded-xl border border-ink/[0.06] bg-paper/60 hover:bg-paper transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-copper/10 text-copper flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} weight="duotone" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-ink text-sm">{row.domain}</p>
                    <span className="text-[10px] font-mono text-slate/70">
                      [{row.auditType}]
                    </span>
                  </div>
                  <p className="text-slate/80 mt-1 leading-relaxed">{row.detail}</p>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                <VerificationStatus status={row.status} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparency Note */}
      <div className="p-3 rounded-xl bg-ink/[0.02] border border-ink/[0.06] flex items-center justify-between text-xs text-slate">
        <span>
          Every confirmed layer is tied to documented physical audits and primary registry checks.
        </span>
        <Link
          href="/verification"
          className="font-mono text-[11px] font-bold text-copper hover:underline shrink-0 ml-2"
        >
          View Full Methodology →
        </Link>
      </div>
    </div>
  );
}

export default SupplierVerification;
