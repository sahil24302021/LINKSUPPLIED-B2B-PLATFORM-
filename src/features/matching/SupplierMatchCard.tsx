"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Company, MatchResult } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  ShieldCheck,
  CheckCircle,
  MapPin,
  CheckSquare,
  Square,
  ArrowRight,
  Info,
} from "@phosphor-icons/react";

interface SupplierMatchCardProps {
  result: MatchResult;
  isSelectedForCompare: boolean;
  onToggleCompare: (companyId: string) => void;
  onViewDossier: (company: Company) => void;
  onRequestQuote: (company: Company) => void;
  onInspectExplainableFit: (result: MatchResult) => void;
}

export function SupplierMatchCard({
  result,
  isSelectedForCompare,
  onToggleCompare,
  onViewDossier,
  onRequestQuote,
  onInspectExplainableFit,
}: SupplierMatchCardProps) {
  const { company, reasons } = result;
  const isManufacturer = company.type === "manufacturer";

  // Check verification level
  const isPhysicallyAudited = company.verification.some(
    (v) => v.type === "Manufacturer Verified" || v.type === "Capability Verified"
  );

  // Factual Fit Badge
  const fitBadge =
    result.matchScore >= 90
      ? { label: "Strong fit", color: "bg-emerald-50 text-emerald-800 border-emerald-200" }
      : result.matchScore >= 80
      ? { label: "Technical fit confirmed", color: "bg-blue-50 text-blue-800 border-blue-200" }
      : { label: "Reported capability", color: "bg-amber-50 text-amber-800 border-amber-200" };

  const capacityBadge =
    isPhysicallyAudited
      ? { label: "Capacity verified", color: "bg-emerald-50 text-emerald-800 border-emerald-200" }
      : { label: "Capacity requires confirmation", color: "bg-amber-50 text-amber-800 border-amber-200" };

  return (
    <div
      className={`bg-surface rounded-2xl border transition-all duration-200 p-5 sm:p-6 shadow-xs relative overflow-hidden ${
        isSelectedForCompare
          ? "border-copper ring-2 ring-copper/15"
          : "border-ink/[0.08] hover:border-ink/[0.18]"
      }`}
    >
      {/* Top Identity & Comparison Checkbox Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-ink/[0.06]">
        <div className="flex items-start gap-3">
          {/* Compare Checkbox */}
          <button
            type="button"
            onClick={() => onToggleCompare(company.id)}
            className={`mt-1 flex items-center justify-center p-1 rounded-md transition-colors ${
              isSelectedForCompare
                ? "text-copper bg-copper/10"
                : "text-slate/60 hover:text-ink"
            }`}
            title={isSelectedForCompare ? "Remove from comparison" : "Select to compare"}
            aria-label={`Select ${company.name} for comparison`}
          >
            {isSelectedForCompare ? (
              <CheckSquare size={20} weight="fill" />
            ) : (
              <Square size={20} />
            )}
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* Prominent Numeric Match Score Badge in meta strip */}
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-copper/10 text-copper border border-copper/25">
                {result.matchScore} MATCH
              </span>

              {/* Classification Badge */}
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded ${
                  isManufacturer
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                {isManufacturer ? "VERIFIED MANUFACTURER" : "DISTRIBUTOR / STOCKIST"}
              </span>

              {/* Factual Fit Badge */}
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${fitBadge.color}`}
              >
                {fitBadge.label}
              </span>

              {/* Capacity Status Badge */}
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${capacityBadge.color}`}
              >
                {capacityBadge.label}
              </span>

              {/* Physical Audit Tag */}
              {isPhysicallyAudited && (
                <Link
                  href="/verification"
                  className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-ink/[0.05] hover:bg-copper/10 text-ink hover:text-copper font-semibold transition-colors"
                  title="Learn how LINKSUPPLIED audits facilities"
                >
                  <ShieldCheck size={13} className="text-copper" weight="bold" />
                  Facility Audited
                </Link>
              )}

              <SampleDataTag />
            </div>

            <div className="flex items-baseline gap-2.5">
              <h2 className="text-xl font-bold text-ink hover:text-copper transition-colors">
                <button
                  type="button"
                  onClick={() => onViewDossier(company)}
                  className="text-left font-bold text-ink hover:text-copper"
                >
                  {company.name}
                </button>
              </h2>
              <span className="text-xs text-slate flex items-center gap-1">
                <MapPin size={13} className="text-slate/70" />
                {company.city || company.location}, {company.country || ""}
              </span>
            </div>
          </div>
        </div>

        {/* Match Score & Explainable Fit Rating Badge */}
        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-2.5 self-start sm:self-auto shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/[0.06]">
          {/* Prominent Numeric Match Score Display */}
          <div className="flex items-center gap-2 bg-copper/10 border border-copper/25 px-3 py-1.5 rounded-xl shadow-2xs">
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

          <button
            type="button"
            onClick={() => onInspectExplainableFit(result)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-paper hover:bg-copper/5 border border-ink/[0.08] hover:border-copper/30 text-xs font-semibold text-ink hover:text-copper transition-all cursor-pointer"
            title="Inspect explainable matching criteria"
          >
            <Info size={14} className="text-copper" />
            <span>Why This Matches</span>
          </button>
        </div>
      </div>

      {/* Decision-Useful Technical Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-ink/[0.06] text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Core Processes
          </span>
          <p className="font-semibold text-ink mt-0.5 truncate">
            {company.technicalSpecs?.processes.slice(0, 2).join(", ") || company.products.slice(0, 2).join(", ")}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Achievable Tolerance
          </span>
          <p className="font-semibold text-ink mt-0.5">
            {company.technicalSpecs?.tightestTolerance || "Standard commercial"}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Capacity & MOQ
          </span>
          <p className="font-semibold text-ink mt-0.5 truncate">
            {company.capacityDetails?.reportedMonthly || company.capacity || "Reported per batch"} · MOQ: {company.capacityDetails?.standardMoq || company.moq || "100"}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Production Lead Time
          </span>
          <p className="font-semibold text-ink mt-0.5">
            {company.capacityDetails?.productionLeadTimeDays || "30–45 calendar days"}
          </p>
        </div>
      </div>

      {/* "Why This Matches" Factual Signals */}
      <div className="pt-3.5 pb-2 space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-mono text-slate/70 uppercase font-semibold mr-1">
            Factual Signals:
          </span>
          {[
            { label: "Material: Confirmed", state: "confirmed" },
            { label: "Tolerance: Within stated capability", state: "confirmed" },
            { label: "Capacity: Reported", state: "reported" },
            { label: "Verification: 4 of 6 layers confirmed", state: "confirmed" },
            { label: "Logistics: Standard Delivery", state: "neutral" },
          ].map((f) => (
            <span
              key={f.label}
              className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded font-semibold ${
                f.state === "confirmed"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                  : f.state === "reported"
                  ? "bg-blue-50 text-blue-800 border border-blue-200/60"
                  : "bg-paper text-slate border border-ink/[0.06]"
              }`}
            >
              {f.state === "confirmed" && <CheckCircle size={12} weight="fill" className="text-emerald-600" />}
              <span>{f.label}</span>
            </span>
          ))}
        </div>

        {reasons.length > 0 && (
          <p className="text-xs text-slate/80 leading-relaxed pl-0.5">
            <span className="font-semibold text-ink">Engineering fit:</span> {reasons[0]}
          </p>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 mt-1 border-t border-ink/[0.06]">
        {/* Certifications Roster */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate">
          <span className="text-[10px] font-mono uppercase text-slate/60 mr-1">
            Certifications:
          </span>
          {company.certifications.slice(0, 3).map((cert) => (
            <span
              key={cert}
              className="px-2 py-0.5 rounded bg-ink/[0.04] text-[11px] font-mono text-ink font-medium"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Primary CTAs */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            type="button"
            onClick={() => onRequestQuote(company)}
            variant="secondary"
            size="sm"
          >
            Request a Quote
          </Button>
          <Button
            type="button"
            onClick={() => onViewDossier(company)}
            variant="dark"
            size="sm"
            iconTrailing={<ArrowRight size={13} weight="bold" />}
          >
            Inspect capability
          </Button>
        </div>
      </div>
    </div>
  );
}
