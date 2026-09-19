"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  FileText,
  CheckCircle,
  CalendarCheck,
} from "@phosphor-icons/react";

interface SupplierEvidenceProps {
  company: Company;
}

export function SupplierEvidence({ company }: SupplierEvidenceProps) {
  const records = company.evidenceRecords;

  if (!records || records.length === 0) return null;

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            AUDIT TELEMETRY & DOCUMENTATION
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            Evidence Records on File ({records.length} Documents)
          </h2>
        </div>
        <SampleDataTag />
      </div>

      <div className="space-y-3">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl border border-ink/[0.08] bg-paper/50 space-y-2 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-copper shrink-0" />
                <span className="font-bold text-ink text-sm">{rec.title}</span>
              </div>
              <span className="text-[10px] font-mono text-slate/70 flex items-center gap-1">
                <CalendarCheck size={12} />
                Verified {rec.verificationDate}
              </span>
            </div>

            <p className="text-slate/80 leading-relaxed text-[11px] sm:text-xs">
              {rec.summary}
            </p>

            <div className="pt-2 border-t border-ink/[0.05] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate/70">
              <span>Methodology: {rec.verificationMethod}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle size={11} weight="fill" />
                Audit Evidence Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
