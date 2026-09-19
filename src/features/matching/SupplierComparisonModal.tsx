"use client";

import { useEffect } from "react";
import type { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { motion, AnimatePresence } from "motion/react";
import { FADE_VARIANTS, MODAL_VARIANTS } from "@/lib/animation";
import {
  X,
  ShieldCheck,
  ArrowRight,
  ArrowsLeftRight,
} from "@phosphor-icons/react";

interface SupplierComparisonModalProps {
  companies: Company[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCompany: (companyId: string) => void;
  onRequestQuote: (company: Company) => void;
}

export function SupplierComparisonModal({
  companies,
  isOpen,
  onClose,
  onRemoveCompany,
  onRequestQuote,
}: SupplierComparisonModalProps) {
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && companies.length > 0 && (
        <motion.div
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/50 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            variants={MODAL_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Supplier Comparison Benchmark"
            className="bg-surface rounded-2xl border border-ink/[0.12] w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-ink/[0.08] bg-paper flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                SIDE-BY-SIDE CAPABILITY BENCHMARK
              </span>
              <SampleDataTag />
            </div>
            <h3 className="text-xl font-bold text-ink mt-1 flex items-center gap-2">
              <ArrowsLeftRight size={20} className="text-copper" />
              Comparing {companies.length} Manufacturing Partners
            </h3>
          </div>

          <Button
            type="button"
            variant="icon"
            size="icon"
            onClick={onClose}
            aria-label="Close comparison view"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Mobile View (< 768px): Stacked Comparison Cards */}
        <div className="md:hidden p-4 overflow-y-auto flex-1 space-y-4">
          {companies.map((c) => (
            <div key={c.id} className="bg-paper p-4 rounded-xl border border-ink/[0.08] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                        c.type === "manufacturer"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-blue-50 text-blue-800"
                      }`}
                    >
                      {c.type === "manufacturer" ? "Manufacturer" : "Distributor"}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-copper bg-copper/10 border border-copper/25 px-1.5 py-0.5 rounded">
                      {c.id === "precisioncast" ? 94 : c.id === "abc-packaging" ? 92 : c.id === "steelcraft" ? 86 : 78} MATCH
                    </span>
                  </div>
                  <h4 className="font-bold text-ink text-sm mt-1">{c.name}</h4>
                  <span className="text-[11px] text-slate block">{c.city || c.location}, {c.country}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveCompany(c.id)}
                  className="p-1 text-slate/50 hover:text-rose-600 transition-colors"
                  aria-label="Remove supplier from comparison"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-surface rounded-lg border border-ink/[0.04]">
                  <span className="text-[10px] text-slate/70 font-mono uppercase block">Tolerance</span>
                  <strong className="text-ink font-mono">{c.technicalSpecs?.tightestTolerance || "±0.05 mm"}</strong>
                </div>
                <div className="p-2 bg-surface rounded-lg border border-ink/[0.04]">
                  <span className="text-[10px] text-slate/70 font-mono uppercase block">Lead Time</span>
                  <strong className="text-ink font-mono">{c.capacityDetails?.productionLeadTimeDays || "30–45 days"}</strong>
                </div>
                <div className="p-2 bg-surface rounded-lg border border-ink/[0.04]">
                  <span className="text-[10px] text-slate/70 font-mono uppercase block">Monthly Capacity</span>
                  <strong className="text-ink">{c.capacityDetails?.reportedMonthly || c.capacity || "10,000/mo"}</strong>
                </div>
                <div className="p-2 bg-surface rounded-lg border border-ink/[0.04]">
                  <span className="text-[10px] text-slate/70 font-mono uppercase block">Audit Level</span>
                  <strong className="text-emerald-700 font-medium">
                    {c.verification.some((v) => v.type.includes("Verified")) ? "Physically Audited" : "Document Verified"}
                  </strong>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote(c);
                }}
                variant="primary"
                size="md"
                className="w-full"
                iconTrailing={<ArrowRight size={13} weight="bold" />}
              >
                Request Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop View (>= 768px): Scrollable Matrix Table */}
        <div className="hidden md:block p-5 sm:p-6 overflow-x-auto flex-1 text-xs">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-ink/[0.08]">
                <th className="text-left font-mono uppercase text-[10px] text-slate p-3 w-48">
                  Criteria
                </th>
                {companies.map((c) => (
                  <th key={c.id} className="text-left p-3 min-w-[200px] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                            c.type === "manufacturer"
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-blue-50 text-blue-800"
                          }`}
                        >
                          {c.type === "manufacturer" ? "Manufacturer" : "Distributor"}
                        </span>
                        <h4 className="font-bold text-ink text-sm mt-1">{c.name}</h4>
                        <span className="text-[11px] text-slate block">{c.city || c.location}, {c.country}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveCompany(c.id)}
                        className="p-1 text-slate/50 hover:text-rose-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-ink/[0.05]">
              {/* Overall Match Score */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Overall Fit Score</td>
                {companies.map((c) => {
                  const score = c.id === "precisioncast" ? 94 : c.id === "abc-packaging" ? 92 : c.id === "steelcraft" ? 86 : 78;
                  return (
                    <td key={c.id} className="p-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-copper bg-copper/10 border border-copper/25 px-2.5 py-0.5 rounded-lg">
                        {score} MATCH
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Plant & Location */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Plant Footprint</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    {c.plantAreaSqFt || "Standard industrial unit"} · {c.facilityType || "Owned plant"}
                  </td>
                ))}
              </tr>

              {/* Core Processes */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Core Processes</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    {c.technicalSpecs?.processes.join(", ") || c.products.slice(0, 3).join(", ")}
                  </td>
                ))}
              </tr>

              {/* Tightest Tolerance */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Precision Tolerance</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-ink font-semibold">
                    {c.technicalSpecs?.tightestTolerance || "Standard ±0.05 mm"}
                  </td>
                ))}
              </tr>

              {/* Raw Materials */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Supported Materials</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    {c.technicalSpecs?.materials.slice(0, 3).join(", ") || "Standard alloys"}
                  </td>
                ))}
              </tr>

              {/* Monthly Capacity & MOQ */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Capacity & MOQ</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    <div>Cap: <strong className="text-ink">{c.capacityDetails?.reportedMonthly || c.capacity || "10,000/mo"}</strong></div>
                    <div>MOQ: {c.capacityDetails?.standardMoq || c.moq || "500 units"}</div>
                  </td>
                ))}
              </tr>

              {/* Production Lead Time */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Production Lead Time</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-ink">
                    {c.capacityDetails?.productionLeadTimeDays || "30–45 days"}
                  </td>
                ))}
              </tr>

              {/* Quality & Metrology */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">QA Systems</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    {c.qualitySystem?.inspectionEquipment.slice(0, 2).join(", ") || "In-house metrology lab"}
                  </td>
                ))}
              </tr>

              {/* Certifications */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Certifications</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3 text-slate">
                    <div className="flex flex-wrap gap-1">
                      {c.certifications.map((cert) => (
                        <span key={cert} className="px-1.5 py-0.5 rounded bg-ink/[0.05] font-mono text-[10px] text-ink">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Verification Level */}
              <tr>
                <td className="p-3 font-semibold text-ink bg-paper/50">Verification Status</td>
                {companies.map((c) => {
                  const isAudited = c.verification.some((v) => v.type.includes("Verified"));
                  return (
                    <td key={c.id} className="p-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <ShieldCheck size={14} className="text-copper" />
                        {isAudited ? "Physically Audited" : "Document Verified"}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Action Buttons Row */}
              <tr>
                <td className="p-3 bg-paper/50">Action</td>
                {companies.map((c) => (
                  <td key={c.id} className="p-3">
                    <Button
                      type="button"
                      onClick={() => {
                        onClose();
                        onRequestQuote(c);
                      }}
                      variant="primary"
                      size="sm"
                      className="w-full"
                      iconTrailing={<ArrowRight size={13} weight="bold" />}
                    >
                      Request Quote
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-ink/[0.08] bg-surface flex items-center justify-between text-xs text-slate">
          <span>You can compare up to 4 suppliers simultaneously.</span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close Comparison
          </Button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
