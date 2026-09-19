"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { DetailedEvidenceItem } from "@/types";
import { DURATION, EASE } from "@/lib/animation";
import { SAMPLE_EVIDENCE_RECORDS } from "@/data/verification-layers";
import { VerificationStatus } from "./VerificationStatus";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  FileText,
  LockKey,
  Eye,
  X,
  Fingerprint,
  Calendar,
  Buildings,
  ShieldCheck,
} from "@phosphor-icons/react";

interface VerificationEvidenceStackProps {
  items?: DetailedEvidenceItem[];
  className?: string;
}

export function VerificationEvidenceStack({
  items = SAMPLE_EVIDENCE_RECORDS,
  className = "",
}: VerificationEvidenceStackProps) {
  const [selectedRecord, setSelectedRecord] = useState<DetailedEvidenceItem | null>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedRecord(null);
      }
    };
    if (selectedRecord) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedRecord]);

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-ink/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase">
              Audit Trail & Verification Records
            </span>
            <SampleDataTag label="Sample Evidence Logs" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            Cryptographically Anchored Evidence Stack
          </h3>
          <p className="text-sm text-slate mt-1 max-w-2xl">
            Every confirmed layer is tied to documented physical audits, registrar filings, or machine inspection logs. Select any record to inspect the audit summary.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-slate">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Verified
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-copper" />
            Under Review
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate/40" />
            Pending / N/A
          </span>
        </div>
      </div>

      {/* Evidence Items List */}
      <div className="space-y-3">
        {items.map((record) => {
          const isSelected = selectedRecord?.id === record.id;
          return (
            <div
              key={record.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedRecord(record)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedRecord(record);
                }
              }}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer group ${
                isSelected
                  ? "bg-copper/[0.04] border-copper/50 shadow-sm"
                  : "bg-paper/70 hover:bg-paper border-ink/[0.08] hover:border-copper/30 hover:shadow-2xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left: Icon & Meta */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-ink/[0.03] border border-ink/[0.08] text-copper group-hover:bg-copper/10 group-hover:border-copper/20 transition-colors">
                    <FileText size={18} weight="duotone" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate/70 uppercase tracking-wider font-semibold">
                        {record.category}
                      </span>
                      <span className="text-ink/20 font-mono text-xs">·</span>
                      <span className="text-xs font-mono text-slate/60">
                        {record.layerKey.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-copper transition-colors truncate mt-0.5">
                      {record.title}
                    </h4>
                    <p className="text-xs text-slate truncate mt-0.5 max-w-xl">
                      Source: {record.source}
                    </p>
                  </div>
                </div>

                {/* Right: Status, Hash snippet & Inspect CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/[0.05]">
                  <div className="text-left sm:text-right">
                    <VerificationStatus status={record.status} size="sm" />
                    <div className="font-mono text-[10px] text-slate/60 mt-1 hidden sm:block">
                      {record.submittedDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-ink/[0.08] text-xs font-medium text-ink group-hover:border-copper/40 group-hover:text-copper transition-all">
                    <Eye size={13} weight="bold" />
                    <span className="text-xs font-mono">Inspect</span>
                  </div>
                </div>
              </div>

              {/* Hash badge preview */}
              <div className="mt-2.5 pt-2.5 border-t border-ink/[0.04] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate/70">
                <span className="flex items-center gap-1.5 truncate max-w-md">
                  <Fingerprint size={12} className="text-copper shrink-0" />
                  <span className="truncate">{record.hashOrRef}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate/60">
                  {record.confidentiality === "public" && (
                    <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                      Public Record
                    </span>
                  )}
                  {record.confidentiality === "nda_required" && (
                    <span className="flex items-center gap-1 text-copper bg-copper/10 px-1.5 py-0.5 rounded border border-copper/20">
                      <LockKey size={10} /> NDA Required
                    </span>
                  )}
                  {record.confidentiality === "auditor_only" && (
                    <span className="flex items-center gap-1 text-slate bg-ink/[0.04] px-1.5 py-0.5 rounded border border-ink/[0.08]">
                      <ShieldCheck size={10} /> Auditor Access Only
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Drawer / Modal Inspection Panel */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: DURATION.normal, ease: EASE.out }}
              className="relative w-full max-w-xl bg-paper rounded-2xl border border-ink/[0.12] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-surface/80 border-b border-ink/[0.08] flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <VerificationStatus status={selectedRecord.status} size="sm" />
                    <SampleDataTag label="Audited Record" />
                  </div>
                  <h3 id="drawer-title" className="text-lg sm:text-xl font-bold text-ink">
                    {selectedRecord.title}
                  </h3>
                  <p className="text-xs font-mono text-slate mt-0.5">
                    Category: {selectedRecord.category} · Layer: {selectedRecord.layerKey.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 rounded-lg text-slate/70 hover:text-ink hover:bg-ink/[0.05] transition-colors"
                  aria-label="Close record inspection"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
                <div className="p-4 rounded-xl bg-surface border border-ink/[0.06] space-y-3">
                  <div className="text-xs font-mono text-slate/70 uppercase tracking-wider font-semibold">
                    Audit Verification Summary
                  </div>
                  <p className="text-sm text-ink leading-relaxed">
                    {selectedRecord.notes}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface border border-ink/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate/70 mb-1">
                      <Buildings size={13} className="text-copper" />
                      Verification Source
                    </div>
                    <div className="text-xs font-semibold text-ink">
                      {selectedRecord.source}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-ink/[0.06]">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate/70 mb-1">
                      <Calendar size={13} className="text-copper" />
                      Audit / Filing Date
                    </div>
                    <div className="text-xs font-semibold text-ink font-mono">
                      {selectedRecord.submittedDate}
                    </div>
                  </div>
                </div>

                {/* Cryptographic hash */}
                <div className="p-3.5 rounded-xl bg-surface border border-ink/[0.06]">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate/70 mb-1">
                    <Fingerprint size={13} className="text-copper" />
                    Cryptographic Document Hash / Reference
                  </div>
                  <div className="font-mono text-xs text-ink/80 break-all select-all bg-paper p-2 rounded border border-ink/[0.04]">
                    {selectedRecord.hashOrRef}
                  </div>
                  <p className="text-[11px] text-slate mt-1.5">
                    Guarantees document immutability; hash matches original registrar filing or engineering inspection log.
                  </p>
                </div>

                {/* Confidentiality Notice */}
                <div className="p-3.5 rounded-xl bg-ink/[0.02] border border-ink/[0.06] flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-copper shrink-0 mt-0.5" />
                  <div className="text-xs text-slate">
                    <span className="font-semibold text-ink">Confidentiality Tier: </span>
                    {selectedRecord.confidentiality === "public" && (
                      "Publicly disclosable record. Buyers can review this certificate without preliminary mutual NDA."
                    )}
                    {selectedRecord.confidentiality === "nda_required" && (
                      "Proprietary technical record. Available to qualified buyers upon mutual NDA execution."
                    )}
                    {selectedRecord.confidentiality === "auditor_only" && (
                      "Protected commercial record. Validated directly by LINKSUPPLIED audit engineers; redacted from public view to protect supplier commercial sensitivity."
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 bg-surface/80 border-t border-ink/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate/60">
                  Record ID: {selectedRecord.id.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 rounded-lg bg-ink text-paper text-xs font-medium hover:bg-ink/90 transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VerificationEvidenceStack;
