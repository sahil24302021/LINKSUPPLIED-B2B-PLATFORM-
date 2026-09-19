"use client";

import type { SupplierQuote } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { motion, AnimatePresence } from "motion/react";
import { FADE_VARIANTS, MODAL_VARIANTS } from "@/lib/animation";
import {
  X,
  ShieldCheck,
  CheckCircle,
  FileText,
  DownloadSimple,
  Check,
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface QuoteDetailModalProps {
  quote: SupplierQuote | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (quoteId: string) => void;
}

export function QuoteDetailModal({
  quote,
  isOpen,
  onClose,
  onAccept,
}: QuoteDetailModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !quote) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, quote, onClose]);

  const handleDownloadQuotation = () => {
    const text = `=====================================================
LINKSUPPLIED — FORMAL SUPPLIER COMMERCIAL QUOTATION
Quotation Reference: ${quote?.referenceId}
RFQ Reference: ${quote?.rfqId}
Supplier: ${quote?.supplierName} (${quote?.supplierType?.toUpperCase()})
Date: ${quote?.submittedAt}
Validity: Valid through ${quote?.validUntil}
=====================================================

1. COMMERCIAL PRICING STRUCTURE
- Quoted Unit Price: ₹${quote?.unitPrice.toFixed(2)} / unit
- One-Time Tooling / NRE: ₹${quote?.toolingCost.toLocaleString()}
- Prototype / Sample Batch: ${quote?.sampleBatchPrice ? `₹${quote.sampleBatchPrice.toLocaleString()}` : "Included"}
- Minimum Order Quantity (MOQ): ${quote?.moq.toLocaleString()} units
- Monthly Dedicated Capacity: ${quote?.productionCapacityMonthly}

2. PRODUCTION & DELIVERY TIMELINES
- Sample / First Article Lead Time: ${quote?.sampleLeadTimeDays} calendar days
- Full Production Lead Time: ${quote?.productionLeadTimeDays} calendar days
- Shipping Incoterms: ${quote?.incoterms}
- Payment Terms: ${quote?.paymentTerms}

3. DFM & ENGINEERING OBSERVATIONS
${(quote?.dfmObservations || ["All engineering dimensions confirmed"]).map((o) => `* ${o}`).join("\n")}

4. QUALITY ASSURANCE & TEST DOCUMENTATION
- Quality Inspection Plan Included: ${quote?.qualityPlanIncluded ? "Yes" : "Standard"}
- Provided Certificates:
${quote?.testCertificatesOffered.map((c) => `  * ${c}`).join("\n")}

5. SUPPLIER NOTES
"${quote?.supplierNotes}"

=====================================================
LINKSUPPLIED Platform — Certified B2B Sourcing
=====================================================`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LINKSUPPLIED-${quote?.referenceId}-QUOTATION.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && quote && (
        <motion.div
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            variants={MODAL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Technical Quotation Dossier"
            className="bg-surface rounded-2xl border border-ink/[0.12] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Modal Header */}
        <div className="p-6 border-b border-ink/[0.08] bg-paper flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                TECHNICAL QUOTATION DOSSIER
              </span>
              <span className="font-mono text-xs font-bold text-ink">
                {quote.referenceId}
              </span>
              <SampleDataTag />
            </div>
            <h3 className="text-xl font-bold text-ink mt-1">
              {quote.supplierName}
            </h3>
            <p className="text-xs text-slate">
              Response for RFQ {quote.rfqId} · Submitted {quote.submittedAt}
            </p>
          </div>

          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onClose}
            aria-label="Close quotation details"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Top Commercial Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-paper p-4 rounded-xl border border-ink/[0.06]">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate/70 block">
                Unit Piece Price
              </span>
              <span className="text-2xl font-bold text-ink font-mono mt-0.5 block">
                ₹{quote.unitPrice.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate/70 block">
                Tooling / NRE
              </span>
              <span className="text-2xl font-bold text-ink font-mono mt-0.5 block">
                ₹{quote.toolingCost.toLocaleString()}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate/70 block">
                Production Lead Time
              </span>
              <span className="text-base font-bold text-ink mt-1 block">
                {quote.productionLeadTimeDays} Days
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-slate/70 block">
                Minimum Batch (MOQ)
              </span>
              <span className="text-base font-bold text-ink mt-1 block">
                {quote.moq.toLocaleString()} Units
              </span>
            </div>
          </div>

          {/* Detailed Commercial Terms */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider">
              Commercial Terms & Payment Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-ink/[0.06] bg-surface">
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Payment Schedule
                </span>
                <p className="font-semibold text-ink mt-0.5">{quote.paymentTerms}</p>
              </div>

              <div className="p-3 rounded-lg border border-ink/[0.06] bg-surface">
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Shipping Terms & Validity
                </span>
                <p className="font-semibold text-ink mt-0.5">
                  {quote.incoterms} · Valid until {quote.validUntil}
                </p>
              </div>
            </div>
          </div>

          {/* DFM & Engineering Observations */}
          {quote.dfmObservations && quote.dfmObservations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider flex items-center gap-1.5">
                <FileText size={15} className="text-copper" />
                Design for Manufacturability (DFM) Feedback
              </h4>
              <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] space-y-2 text-slate">
                {quote.dfmObservations.map((obs, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-copper/10 text-copper font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-ink">{obs}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Test Certificates */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-copper" />
              Test Certificates & Inspection Deliverables
            </h4>
            <div className="bg-surface rounded-xl border border-ink/[0.06] p-4 space-y-1.5">
              {quote.testCertificatesOffered.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-ink">
                  <CheckCircle size={15} className="text-emerald-600 shrink-0" weight="fill" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Factory Engineering Statement */}
          <div className="space-y-2">
            <h4 className="font-mono uppercase text-[11px] font-bold text-ink tracking-wider">
              Supplier Statement
            </h4>
            <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] text-slate italic leading-relaxed text-xs">
              &ldquo;{quote.supplierNotes}&rdquo;
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-ink/[0.08] bg-surface flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadQuotation}
              iconLeading={
                downloaded ? (
                  <Check size={14} className="text-emerald-600" weight="bold" />
                ) : (
                  <DownloadSimple size={14} />
                )
              }
            >
              {downloaded ? "Quotation Downloaded" : "Download Quotation (.txt)"}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                onAccept(quote.id);
                onClose();
              }}
              iconLeading={<CheckCircle size={14} weight="bold" />}
            >
              Accept Quotation
            </Button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
