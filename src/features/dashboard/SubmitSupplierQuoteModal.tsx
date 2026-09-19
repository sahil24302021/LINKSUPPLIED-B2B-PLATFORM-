"use client";

import { useState, useEffect } from "react";
import type { InboundSupplierRfq } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  X,
  PaperPlaneRight,
} from "@phosphor-icons/react";

interface SubmitSupplierQuoteModalProps {
  rfq: InboundSupplierRfq | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rfqId: string, quoteData: Record<string, unknown>) => void;
}

export function SubmitSupplierQuoteModal({
  rfq,
  isOpen,
  onClose,
  onSubmit,
}: SubmitSupplierQuoteModalProps) {
  const [unitPrice, setUnitPrice] = useState("38.50");
  const [toolingCost, setToolingCost] = useState("3200");
  const [leadTimeDays, setLeadTimeDays] = useState("38");
  const [paymentTerms, setPaymentTerms] = useState("30% advance, 70% against BL / Net 30");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen || !rfq) return;
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
  }, [isOpen, rfq, onClose]);

  if (!isOpen || !rfq) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(rfq.id, {
        unitPrice: parseFloat(unitPrice),
        toolingCost: parseFloat(toolingCost),
        leadTimeDays: parseInt(leadTimeDays),
        paymentTerms,
        notes,
      });
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Submit Supplier Quotation"
        className="bg-surface rounded-2xl border border-ink/[0.12] w-full max-w-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 border-b border-ink/[0.08] bg-paper flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                SUPPLIER QUOTE SUBMISSION
              </span>
              <span className="font-mono text-xs font-bold text-ink">
                {rfq.referenceId}
              </span>
              <SampleDataTag />
            </div>
            <h3 className="text-xl font-bold text-ink mt-1">
              Quote for {rfq.partName}
            </h3>
            <p className="text-xs text-slate">
              Buyer: {rfq.buyerType} · Destination: {rfq.deliveryDestination}
            </p>
          </div>

          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onClose}
            aria-label="Close quote submission modal"
          >
            <X size={18} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Quoted Unit Price (INR ₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Tooling / NRE Cost (INR ₹)
              </label>
              <input
                type="number"
                value={toolingCost}
                onChange={(e) => setToolingCost(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Production Lead Time (Days)
              </label>
              <input
                type="number"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink mb-1">
                Payment Terms
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1">
              Engineering Feasibility & DFM Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 5-axis Mazak machine slot confirmed for Q4. Raw material 6061-T6 on-site. Bore tolerances verified."
              className="w-full px-3 py-2 rounded-lg border border-ink/[0.12] bg-paper text-ink outline-none resize-none"
            />
          </div>

          <div className="bg-paper p-3 rounded-lg border border-ink/[0.06] text-[11px] text-slate space-y-1">
            <span className="font-bold text-ink block">Quality Commitment:</span>
            <p>Submitting this quotation commits your factory to provide EN 10204 3.1 MTR test certs and 100% CMM inspection reports upon dispatch.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-ink/[0.06]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={submitted}
              iconLeading={<PaperPlaneRight size={14} weight="bold" />}
            >
              Submit Formal Quotation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
