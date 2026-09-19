"use client";

import { useEffect } from "react";
import type { MatchResult } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { motion, AnimatePresence } from "motion/react";
import { FADE_VARIANTS, SPRING, DURATION } from "@/lib/animation";
import {
  X,
  CheckCircle,
  Clock,
  WarningCircle,
  ShieldCheck,
  ArrowRight,
} from "@phosphor-icons/react";

interface ExplainableMatchDrawerProps {
  result: MatchResult | null;
  onClose: () => void;
  onRequestQuote?: (companyId: string) => void;
}

export function ExplainableMatchDrawer({
  result,
  onClose,
  onRequestQuote,
}: ExplainableMatchDrawerProps) {
  useEffect(() => {
    if (!result) return;
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
  }, [result, onClose]);

  const company = result?.company;

  const factors = company
    ? [
        {
          name: "Material",
          status: "confirmed",
          explanation: `Supplier stocks and machines ${company.technicalSpecs?.materials.slice(0, 3).join(", ") || "requested materials"}. Raw material test certificates (MTR EN 10204 3.1) are supplied as standard.`,
          evidence: "verified",
          source: "Material Invoices & MTR Audit Records",
        },
        {
          name: "Tolerance",
          status: "confirmed",
          explanation: `Achievable tolerance rated to ${company.technicalSpecs?.tightestTolerance || "±0.02 mm"}. Verified quality laboratory operates CMM coordinate measuring apparatus.`,
          evidence: "verified",
          source: "Metrology Equipment Calibration Logbooks",
        },
        {
          name: "Equipment & Tooling",
          status: "confirmed",
          explanation: `Verified machinery includes ${company.machinery?.length || "multiple"} machine tools (${company.machinery?.[0]?.make || "CNC"} ${company.machinery?.[0]?.model || "Machining Centers"}) with adequate working envelopes.`,
          evidence: "verified",
          source: "Facility Walkthrough & Machine Nameplate Audits",
        },
        {
          name: "Capacity",
          status: "needs_review",
          explanation: `Reported baseline capacity is ${company.capacityDetails?.reportedMonthly || company.capacity || "10,000 units/month"}. Exact machine scheduling requires review prior to production sign-off.`,
          evidence: "reported",
          source: "Supplier Production Schedule Declaration",
        },
        {
          name: "Quality System",
          status: company.certifications.length > 0 ? "confirmed" : "needs_review",
          explanation: `Holds ${company.certifications.join(", ") || "ISO 9001:2015"}. Audited certificates on file with validity verified against issuing accredited registrars.`,
          evidence: "verified",
          source: "Accredited Registrar Verification",
        },
        {
          name: "Logistics",
          status: "reported",
          explanation: `Facility located in ${company.city || company.location}, with standard freight routing to major sea and air cargo terminals.`,
          evidence: "reported",
          source: "Trade History & Bill of Lading Logs",
        },
      ]
    : [];

  return (
    <AnimatePresence>
      {result && company && (
        <motion.div
          variants={FADE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 flex justify-end bg-ink/40 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ...SPRING.gentle, duration: DURATION.modalEnter }}
            role="dialog"
            aria-modal="true"
            aria-label="Explainable Match Report"
            className="w-full max-w-xl bg-surface h-full shadow-2xl flex flex-col border-l border-ink/[0.08] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Drawer Header */}
        <div className="p-6 border-b border-ink/[0.08] bg-paper">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                EXPLAINABLE MATCH REPORT
              </span>
              <SampleDataTag />
            </div>
            <Button
              type="button"
              variant="icon"
              size="icon"
              onClick={onClose}
              aria-label="Close explainable match drawer"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex items-start justify-between gap-4 mt-3">
            <div>
              <h3 className="text-xl font-bold text-ink">
                {company.name}
              </h3>
              <p className="text-xs text-slate mt-0.5">
                Breakdown of technical alignment against your active requirement brief.
              </p>
            </div>
            {/* Prominent Match Score in Drawer */}
            <div className="flex items-center gap-2 bg-copper/10 border border-copper/25 px-3 py-1.5 rounded-xl shadow-2xs shrink-0">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-copper leading-none tabular-nums">
                {result.matchScore}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold leading-none">
                  MATCH
                </span>
                <span className="text-[8px] font-mono uppercase text-slate/70 leading-none mt-0.5">
                  SCORE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Factors List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="bg-paper p-3.5 rounded-xl border border-ink/[0.06] text-slate">
            <p className="text-[11px] leading-relaxed">
              <strong className="text-ink">Explainable Score Modeling:</strong> The overall {result.matchScore} Match Score is deterministically evaluated from factual machine envelope, alloy certifications, tolerance holds, and logistics compliance.
            </p>
          </div>

          {factors.map((factor, i) => (
            <div
              key={i}
              className="bg-paper rounded-xl p-4 border border-ink/[0.06] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {factor.status === "confirmed" ? (
                    <CheckCircle size={16} className="text-emerald-600" weight="fill" />
                  ) : factor.status === "reported" ? (
                    <Clock size={16} className="text-blue-600" weight="fill" />
                  ) : (
                    <WarningCircle size={16} className="text-amber-600" weight="fill" />
                  )}
                  <h4 className="font-bold text-ink text-sm">
                    {factor.name}
                  </h4>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                    factor.status === "confirmed"
                      ? "bg-emerald-100 text-emerald-800"
                      : factor.status === "reported"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {factor.status === "confirmed"
                    ? "Confirmed"
                    : factor.status === "reported"
                    ? "Reported"
                    : "Needs review"}
                </span>
              </div>

              <p className="text-xs text-slate leading-relaxed">
                {factor.explanation}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-ink/[0.04] text-[11px] text-slate/70">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-copper" />
                  Evidence source: <span className="font-medium text-ink">{factor.source}</span>
                </span>
                <span className="font-mono text-[10px] uppercase font-semibold">
                  {factor.evidence === "verified" ? "Audit Verified" : "Self Reported"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-ink/[0.08] bg-surface flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Close Report
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              if (onRequestQuote) onRequestQuote(company.id);
            }}
            iconTrailing={<ArrowRight size={13} weight="bold" />}
          >
            Proceed to Request a Quote
          </Button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
