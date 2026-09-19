"use client";

import { VerificationStatus } from "./VerificationStatus";
import { Lightbulb } from "@phosphor-icons/react";

interface StatusDefinition {
  status: "verified" | "reported" | "under_review" | "not_available" | "expired";
  title: string;
  summary: string;
  evidentiaryStandard: string;
  buyerAction: string;
  concreteExample: string;
}

const MATRIX_DEFINITIONS: StatusDefinition[] = [
  {
    status: "verified",
    title: "Verified by LINKSUPPLIED",
    summary:
      "Directly validated by LINKSUPPLIED audit engineers through primary government registries, on-site physical inspections, or accredited registrars.",
    evidentiaryStandard:
      "Primary registry cross-check, GPS-stamped site visit, or registrar cert lookup",
    buyerAction:
      "High commercial confidence. Proceed with technical RFQ or factory visit planning.",
    concreteExample:
      "Entity CIN confirmed via MCA registrar; 5-axis CNC serial numbers matched to shop floor nameplates.",
  },
  {
    status: "reported",
    title: "Self-Reported by Manufacturer",
    summary:
      "Information provided directly by the supplier. Acknowledged by LINKSUPPLIED but pending independent documentary or physical validation.",
    evidentiaryStandard: "Supplier self-declaration without external counter-party audit",
    buyerAction:
      "Treat as preliminary. Request documentary evidence or request an expedited LINKSUPPLIED audit before contract signoff.",
    concreteExample:
      "Supplier claims monthly capacity of 50,000 units and 2.4-day quotation turnaround SLA.",
  },
  {
    status: "under_review",
    title: "Desk or Physical Audit Active",
    summary:
      "Evidence has been submitted by the supplier and is currently queued or undergoing verification by LINKSUPPLIED audit personnel.",
    evidentiaryStandard:
      "Document received; awaiting registrar authentication or engineering inspection signoff",
    buyerAction:
      "Audit is in flight. Usually resolved within 3–5 business days. Check back or subscribe for updates.",
    concreteExample:
      "TÜV SÜD IATF 16949 certificate uploaded; optical calibration log undergoing engineering desk review.",
  },
  {
    status: "not_available",
    title: "No Verifiable Evidence",
    summary:
      "No verifiable documentation has been submitted or authorized for this parameter. We refuse to display fictional or speculative data.",
    evidentiaryStandard: "No documentary proof or data sharing agreement established",
    buyerAction:
      "Do not assume capability exists. Clarify directly during technical RFQ discussions.",
    concreteExample:
      "Cross-border customs shipping bills not connected via ICEGATE/customs EDI portal.",
  },
  {
    status: "expired",
    title: "Previously Audited, Now Expired",
    summary:
      "The supplier previously held verified status, but the associated certificate, inspection cycle, or audit report has passed its validity date.",
    evidentiaryStandard: "Expired certificate or recurring annual audit overdue",
    buyerAction:
      "Do not place orders relying on this certification without requesting an updated valid certificate.",
    concreteExample:
      "ISO 9001:2015 accreditation expired on May 31, 2026; renewal audit pending submission.",
  },
];

export function VerificationMatrix({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-ink/[0.08]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase">
            Trust Nomenclature
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          Verified vs. Reported: How to Read Statuses
        </h3>
        <p className="text-sm text-slate mt-1 max-w-2xl">
          Unlike directories that award binary &quot;100% verified&quot; badges based solely on paid subscriptions, LINKSUPPLIED uses explicit, multi-tiered status definitions for complete transparency.
        </p>
      </div>

      {/* Desktop & Tablet Scannable Table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-surface/90 border-b border-ink/[0.08] text-slate font-mono uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 font-semibold w-48">Status Tier</th>
              <th className="py-3.5 px-4 font-semibold">What It Means</th>
              <th className="py-3.5 px-4 font-semibold">Evidentiary Standard</th>
              <th className="py-3.5 px-4 font-semibold">Buyer Guidance</th>
              <th className="py-3.5 px-4 font-semibold">Sample Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/[0.06]">
            {MATRIX_DEFINITIONS.map((def) => (
              <tr
                key={def.status}
                className="hover:bg-ink/[0.015] transition-colors"
              >
                <td className="py-4 px-4 align-top">
                  <VerificationStatus status={def.status} size="md" />
                  <div className="font-bold text-ink mt-1.5 text-xs">
                    {def.title}
                  </div>
                </td>
                <td className="py-4 px-4 align-top text-slate leading-relaxed">
                  {def.summary}
                </td>
                <td className="py-4 px-4 align-top font-mono text-[11px] text-ink/80 leading-relaxed">
                  {def.evidentiaryStandard}
                </td>
                <td className="py-4 px-4 align-top text-ink leading-relaxed">
                  <span className="font-semibold text-copper block mb-0.5">
                    Recommended action:
                  </span>
                  {def.buyerAction}
                </td>
                <td className="py-4 px-4 align-top text-slate/80 font-mono text-[11px] bg-surface/40 leading-relaxed">
                  {def.concreteExample}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Scannable Cards (under 768px) */}
      <div className="md:hidden space-y-4">
        {MATRIX_DEFINITIONS.map((def) => (
          <div
            key={def.status}
            className="p-4 rounded-xl bg-paper border border-ink/[0.08] shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <VerificationStatus status={def.status} size="sm" />
              <span className="text-[11px] font-mono text-slate uppercase font-bold">
                {def.title}
              </span>
            </div>

            <p className="text-xs text-ink leading-relaxed">
              {def.summary}
            </p>

            <div className="p-3 rounded-lg bg-surface border border-ink/[0.04] space-y-2 text-xs">
              <div>
                <span className="font-mono text-[10px] uppercase text-slate/70 block">
                  Evidentiary Standard
                </span>
                <span className="font-mono text-[11px] text-ink font-medium">
                  {def.evidentiaryStandard}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-copper block font-semibold">
                  Buyer Action
                </span>
                <span className="text-ink">
                  {def.buyerAction}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate/70 block">
                  Example
                </span>
                <span className="font-mono text-[11px] text-slate">
                  {def.concreteExample}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Philosophy Callout */}
      <div className="mt-6 p-4 rounded-xl bg-copper/[0.06] border border-copper/20 flex items-start gap-3">
        <Lightbulb size={20} weight="duotone" className="text-copper shrink-0 mt-0.5" />
        <div className="text-xs text-ink/90 leading-relaxed">
          <strong className="font-semibold text-ink">The LINKSUPPLIED Integrity Commitment: </strong>
          If a manufacturer has not submitted evidence for physical equipment or cross-border trade records, we clearly label it as <span className="font-mono font-bold text-copper">REPORTED</span> or <span className="font-mono font-bold text-slate">NOT AVAILABLE</span>. We never inflate supplier scores or fabricate customs documents.
        </div>
      </div>
    </div>
  );
}

export default VerificationMatrix;
