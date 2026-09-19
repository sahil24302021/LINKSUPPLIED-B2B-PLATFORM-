"use client";

import { useState } from "react";
import type { SupplierQuote } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  ArrowsLeftRight,
  ShieldCheck,
  ArrowRight,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

interface QuoteComparisonViewProps {
  quotes: SupplierQuote[];
  onAcceptQuote: (quoteId: string) => void;
  onViewDetails: (quote: SupplierQuote) => void;
}

export function QuoteComparisonView({
  quotes,
  onAcceptQuote,
  onViewDetails,
}: QuoteComparisonViewProps) {
  const [mobileFilter, setMobileFilter] = useState<string | "all">("all");
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedQuotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (quotes.length === 0) {
    return (
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-8 text-center text-xs text-slate">
        No formal quotations received yet. Quotations will appear here once submitted by matching suppliers.
      </div>
    );
  }

  const displayedMobileQuotes =
    mobileFilter === "all" ? quotes : quotes.filter((q) => q.id === mobileFilter);

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-ink/[0.06] bg-paper flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              COMMERCIAL BENCHMARK
            </span>
            <SampleDataTag />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-ink mt-1 flex items-center gap-2">
            <ArrowsLeftRight size={18} className="text-copper shrink-0" />
            <span>Comparing {quotes.length} Formal Commercial Quotations</span>
          </h3>
        </div>
      </div>

      {/* ── MOBILE BREAKPOINT (< 768px): Pill Tabs + Stacked Summary Cards ── */}
      <div className="md:hidden p-4 space-y-4">
        {/* Pill Tabs for Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setMobileFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              mobileFilter === "all"
                ? "bg-ink text-surface shadow-xs"
                : "bg-paper text-slate hover:text-ink border border-ink/[0.08]"
            }`}
          >
            All Quotes ({quotes.length})
          </button>
          {quotes.map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setMobileFilter(q.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                mobileFilter === q.id
                  ? "bg-ink text-surface shadow-xs"
                  : "bg-paper text-slate hover:text-ink border border-ink/[0.08]"
              }`}
            >
              {q.supplierName}
            </button>
          ))}
        </div>

        {/* Stacked Summary Cards */}
        <div className="space-y-3">
          {displayedMobileQuotes.map((q) => {
            const isExpanded = Boolean(expandedQuotes[q.id]);

            return (
              <div
                key={q.id}
                className="bg-paper rounded-xl border border-ink/[0.08] p-4 space-y-3 shadow-2xs"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-surface border border-ink/[0.08] text-ink">
                        {q.referenceId}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate">
                        {q.incoterms}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-ink mt-1">
                      {q.supplierName}
                    </h4>
                  </div>

                  <span className="text-lg font-bold font-mono text-copper">
                    ₹{q.unitPrice.toFixed(2)}
                    <span className="text-[10px] font-sans text-slate block text-right font-normal">
                      per unit
                    </span>
                  </span>
                </div>

                {/* Key Metrics as Chips */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-ink/[0.06] text-ink font-mono font-medium">
                    Tooling: <strong>₹{q.toolingCost.toLocaleString()}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-ink/[0.06] text-ink font-medium">
                    Lead: <strong>{q.productionLeadTimeDays}d</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface border border-ink/[0.06] text-ink font-medium">
                    MOQ: <strong>{q.moq.toLocaleString()}</strong>
                  </span>
                </div>

                {/* Tap to Expand Disclosure */}
                <button
                  type="button"
                  onClick={() => toggleExpand(q.id)}
                  className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                >
                  <span>{isExpanded ? "Hide Details" : "Show Full Breakdown & Terms"}</span>
                  {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="pt-2 space-y-2.5 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span>Sample Lead Time:</span>
                      <strong className="text-ink font-medium">{q.sampleLeadTimeDays} days</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Capacity:</span>
                      <strong className="text-ink font-medium">{q.productionCapacityMonthly}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Terms:</span>
                      <strong className="text-ink font-medium">{q.paymentTerms}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>QA Documentation:</span>
                      <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <ShieldCheck size={14} className="text-copper" weight="bold" />
                        Full Reports Included
                      </span>
                    </div>
                    {q.supplierNotes && (
                      <div className="p-2.5 rounded-lg bg-surface border border-ink/[0.04] text-[11px] leading-relaxed">
                        <span className="text-slate font-medium block mb-0.5">Engineering Note:</span>
                        <p className="text-ink">{q.supplierNotes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/[0.06]">
                  <button
                    type="button"
                    onClick={() => onViewDetails(q)}
                    className="w-full py-2 rounded-lg border border-ink/[0.12] hover:bg-surface text-ink text-xs font-semibold text-center transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onAcceptQuote(q.id)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-copper hover:bg-copper-muted text-surface text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Accept Quote</span>
                    <ArrowRight size={12} weight="bold" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP BREAKPOINT (>= 768px): Multi-column Comparison Table ── */}
      <div className="hidden md:block overflow-x-auto p-4 sm:p-6 text-xs">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-ink/[0.08]">
              <th className="text-left font-mono uppercase text-[10px] text-slate p-3 w-44">
                Metric
              </th>
              {quotes.map((q) => (
                <th key={q.id} className="text-left p-3 min-w-[200px] align-top">
                  <div>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-paper border border-ink/[0.1] font-bold text-ink">
                      {q.referenceId}
                    </span>
                    <h4 className="font-bold text-ink text-sm mt-1">{q.supplierName}</h4>
                    <span className="text-[11px] text-slate block">{q.incoterms}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-ink/[0.05]">
            {/* Unit Price */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">Unit Piece Price</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3">
                  <span className="text-lg font-bold font-mono text-ink">
                    ₹{q.unitPrice.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate block">{q.currency}</span>
                </td>
              ))}
            </tr>

            {/* Tooling / NRE */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">Tooling Cost</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3 text-ink font-mono font-semibold">
                  ₹{q.toolingCost.toLocaleString()}
                </td>
              ))}
            </tr>

            {/* Production SLA */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">Lead Time</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3 text-slate">
                  <div>Production: <strong className="text-ink">{q.productionLeadTimeDays} days</strong></div>
                  <div>Sample: {q.sampleLeadTimeDays} days</div>
                </td>
              ))}
            </tr>

            {/* Minimum Order */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">MOQ & Capacity</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3 text-slate">
                  <div>MOQ: <strong className="text-ink">{q.moq.toLocaleString()} units</strong></div>
                  <div>Cap: {q.productionCapacityMonthly}</div>
                </td>
              ))}
            </tr>

            {/* Payment Schedule */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">Payment Terms</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3 text-slate">
                  {q.paymentTerms}
                </td>
              ))}
            </tr>

            {/* Quality Deliverables */}
            <tr>
              <td className="p-3 font-semibold text-ink bg-paper/50">QA Documentation</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3 text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} className="text-copper" weight="bold" />
                  Inspection Reports Included
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-3 bg-paper/50">Decide</td>
              {quotes.map((q) => (
                <td key={q.id} className="p-3">
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onViewDetails(q)}
                      className="px-3 py-1.5 rounded-lg border border-ink/[0.1] hover:bg-paper text-ink font-semibold transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onAcceptQuote(q.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-copper hover:bg-copper-muted text-surface font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Accept Quote
                      <ArrowRight size={12} weight="bold" />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
