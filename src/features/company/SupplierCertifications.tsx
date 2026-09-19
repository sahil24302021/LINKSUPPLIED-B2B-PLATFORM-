"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  Certificate,
  CheckCircle,
  FileText,
} from "@phosphor-icons/react";

interface SupplierCertificationsProps {
  company: Company;
}

export function SupplierCertifications({ company }: SupplierCertificationsProps) {
  const detailed = company.detailedCertifications;

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            COMPLIANCE & AUDIT CREDENTIALS
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            International Quality & Environmental Certifications
          </h2>
        </div>
        <SampleDataTag />
      </div>

      {detailed && detailed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {detailed.map((cert) => {
            const isVerified = cert.status === "verified";
            return (
              <div
                key={cert.name}
                className="p-4 rounded-xl border border-ink/[0.08] bg-paper/50 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-copper/10 text-copper flex items-center justify-center shrink-0">
                      <Certificate size={16} weight="duotone" />
                    </div>
                    <span className="font-bold text-ink text-sm">
                      {cert.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${
                      isVerified
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {isVerified ? "Registry Verified" : "Under Review"}
                  </span>
                </div>

                <div className="pt-1 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate">
                    <span>Issuing Registrar:</span>
                    <span className="font-medium text-ink">{cert.issuingBody}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate font-mono">
                    <span>Certificate No:</span>
                    <span className="text-ink">{cert.certificateNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate font-mono">
                    <span>Valid Until:</span>
                    <span className="text-ink">{cert.validUntil}</span>
                  </div>
                </div>

                {cert.evidenceOnFile && (
                  <div className="pt-2 border-t border-ink/[0.06] flex items-center gap-1.5 text-[10px] font-mono text-copper">
                    <FileText size={12} />
                    <span>Audit certificate & scope documentation on file</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {company.certifications.map((c) => (
            <span
              key={c}
              className="text-xs px-3 py-1.5 rounded-lg bg-paper border border-ink/[0.08] text-ink font-medium flex items-center gap-1.5"
            >
              <CheckCircle size={13} className="text-copper" weight="fill" />
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
