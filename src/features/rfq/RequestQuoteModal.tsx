"use client";

import { useEffect, useRef, useState } from "react";
import type { Company, StructuredRequirement, RFQSubmission } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  X,
  Buildings,
  CheckCircle,
  PaperPlaneRight,
  Package,
  FileLock,
  ArrowRight,
} from "@phosphor-icons/react";

interface RequestQuoteModalProps {
  company: Company | null;
  requirement?: StructuredRequirement;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRFQ?: (submission: RFQSubmission) => void;
}

export function RequestQuoteModal({
  company,
  requirement,
  isOpen,
  onClose,
  onSubmitRFQ,
}: RequestQuoteModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [targetDeadline, setTargetDeadline] = useState("7 business days");
  const [includeSampleBatch, setIncludeSampleBatch] = useState(true);
  const [ndaRequired, setNdaRequired] = useState(true);
  const [notes, setNotes] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && company) {
      setSubmitted(false);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, company]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!company || !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitRFQ) {
      onSubmitRFQ({
        supplierId: company.id,
        supplierName: company.name,
        requirementId: requirement?.id || "req-direct",
        partName: requirement?.spec.partName || "Specified Component",
        targetDeadline,
        includeSampleBatch,
        ndaRequired,
        notes,
      });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full backdrop:bg-ink/60 backdrop-blur-xs"
      onClick={handleBackdropClick}
      aria-label={`Request for Quote: ${company.name}`}
    >
      <div className="flex items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-xl bg-surface rounded-2xl border border-ink/[0.08] shadow-2xl overflow-hidden">
          {/* Close button */}
          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
            aria-label="Close dialog"
          >
            <X size={18} />
          </Button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-3.5 mb-6 pr-8">
                <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center text-copper shrink-0 mt-0.5">
                  <Buildings size={20} weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
                      OFFICIAL RFQ DISPATCH
                    </span>
                    <SampleDataTag />
                  </div>
                  <h3 className="text-xl font-bold text-ink mt-0.5">
                    Request formal quote from {company.name}
                  </h3>
                  <p className="text-xs text-slate mt-1">
                    Facility located in {company.location} · Verified Manufacturer
                  </p>
                </div>
              </div>

              {/* Requirement Context Snapshot */}
              {requirement && (
                <div className="bg-paper rounded-xl p-3.5 border border-ink/[0.06] mb-6">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-ink">
                      {requirement.spec.partName}
                    </span>
                    <span className="font-mono text-slate text-[11px]">
                      {requirement.commercial.initialBatch || "Batch as required"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate">
                    <span>Material: {requirement.spec.material}</span>
                    <span>Tolerance: {requirement.spec.tolerance}</span>
                    <span>Terms: {requirement.commercial.incoterm}</span>
                  </div>
                </div>
              )}

              {/* Form Controls */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                      Quote Response SLA *
                    </label>
                    <select
                      value={targetDeadline}
                      onChange={(e) => setTargetDeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-paper border border-ink/[0.12] rounded-lg text-xs text-ink focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all"
                    >
                      <option value="3 business days">3 business days (Urgent)</option>
                      <option value="7 business days">7 business days (Standard)</option>
                      <option value="14 business days">14 business days (Complex tooling)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                      Your Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="procurement@yourcompany.com"
                      className="w-full px-3.5 py-2.5 bg-paper border border-ink/[0.12] rounded-lg text-xs text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Scope Toggles */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-ink/[0.08] bg-paper/60 cursor-pointer hover:border-copper/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Package size={18} className="text-copper" />
                      <div>
                        <span className="text-xs font-semibold text-ink block">
                          Include Pre-Production Sample Batch Quote
                        </span>
                        <span className="text-[11px] text-slate block">
                          Require 3–5 golden samples for dimension & tolerance sign-off
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeSampleBatch}
                      onChange={(e) => setIncludeSampleBatch(e.target.checked)}
                      className="w-4 h-4 rounded text-copper accent-copper"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-ink/[0.08] bg-paper/60 cursor-pointer hover:border-copper/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <FileLock size={18} className="text-copper" />
                      <div>
                        <span className="text-xs font-semibold text-ink block">
                          Require Mutual NDA Prior to CAD Dispatch
                        </span>
                        <span className="text-[11px] text-slate block">
                          Factory must execute standard mutual NDA before accessing 3D CAD files
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={ndaRequired}
                      onChange={(e) => setNdaRequired(e.target.checked)}
                      className="w-4 h-4 rounded text-copper accent-copper"
                    />
                  </label>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Engineering Notes & Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify any quality certificates required with shipment (e.g. Mill Test Certificates, CMM dimensional reports)..."
                    className="w-full px-3.5 py-2 bg-paper border border-ink/[0.12] rounded-lg text-xs text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-6 pt-4 border-t border-ink/[0.06] flex items-center justify-end gap-3">
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
                  iconLeading={<PaperPlaneRight size={14} weight="bold" />}
                >
                  Dispatch Structured RFQ
                </Button>
              </div>
            </form>
          ) : (
            /* Post-Submission State: What happens next */
            <div className="p-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                <CheckCircle size={32} weight="fill" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-success font-bold">
                  RFQ DISPATCHED SUCCESSFULLY
                </span>
                <h3 className="text-2xl font-bold text-ink mt-1">
                  RFQ transmitted to {company.name}
                </h3>
                <p className="text-xs text-slate max-w-[42ch] mx-auto mt-2 leading-relaxed">
                  Your structured technical requirement has been queued for engineering evaluation.
                </p>
              </div>

              {/* Operational Next Steps Timeline */}
              <div className="bg-paper rounded-xl p-5 border border-ink/[0.06] text-left space-y-3.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate block border-b border-ink/[0.06] pb-1.5">
                  Expected Fulfillment Sequence:
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-copper/10 text-copper font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Plant Feasibility & Capacity Review
                    </p>
                    <p className="text-[11px] text-slate">
                      Engineering lead reviews tooling specifications and line availability (SLA: 48 hours).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-copper/10 text-copper font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Mutual NDA Execution
                    </p>
                    <p className="text-[11px] text-slate">
                      Standard bilateral NDA sent to your business email for digital countersigning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-copper/10 text-copper font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Formal Commercial Quote & Lead Time
                    </p>
                    <p className="text-[11px] text-slate">
                      Detailed itemized quote will be presented in your quote comparison inbox.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="dark"
                  size="md"
                  iconTrailing={<ArrowRight size={14} />}
                >
                  Return to Sourcing Workspace
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
