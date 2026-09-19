"use client";

import { useState } from "react";
import type { SupplierQuote } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  FileText,
  ShieldCheck,
  ArrowRight,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

interface QuoteCardProps {
  quote: SupplierQuote;
  onViewDetails: (quote: SupplierQuote) => void;
  onAcceptQuote: (quoteId: string) => void;
  onCompareQuotes?: () => void;
}

export function QuoteCard({ quote, onViewDetails, onAcceptQuote: _onAcceptQuote, onCompareQuotes }: QuoteCardProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const isAccepted = quote.status === "accepted";

  return (
    <>
      {/* ── DESKTOP VIEW (>= 768px): 100% Pixel-Equivalent & Untouched ── */}
      <div className="hidden md:block bg-surface rounded-2xl border border-ink/[0.08] hover:border-ink/[0.16] p-6 shadow-xs transition-all space-y-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-2.5 pb-3 border-b border-ink/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                FORMAL QUOTATION
              </span>
              <span className="text-xs font-mono font-bold text-ink">
                {quote.referenceId}
              </span>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                  isAccepted
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-paper text-slate border border-ink/[0.08]"
                }`}
              >
                {quote.status.toUpperCase()}
              </span>
              <SampleDataTag />
            </div>

            <h3 className="text-lg font-bold text-ink hover:text-copper transition-colors">
              <button
                type="button"
                onClick={() => onViewDetails(quote)}
                className="text-left font-bold text-ink hover:text-copper cursor-pointer"
              >
                {quote.supplierName}
              </button>
            </h3>
            <p className="text-xs text-slate">
              Submitted on {quote.submittedAt} · Valid until {quote.validUntil}
            </p>
          </div>

          {/* Big Unit Price */}
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Quoted Unit Price
            </span>
            <span className="text-2xl font-bold text-ink font-mono">
              ₹{quote.unitPrice.toFixed(2)}
            </span>
            <span className="text-[11px] text-slate block">
              + ₹{quote.toolingCost.toLocaleString()} One-time Tooling (NRE)
            </span>
          </div>
        </div>

        {/* Commercial Breakdown Grid */}
        <div className="grid grid-cols-4 gap-4 py-3.5 border-y border-ink/[0.06] text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Production SLA
            </span>
            <span className="font-semibold text-ink mt-0.5 block">
              {quote.productionLeadTimeDays} Calendar Days
            </span>
            <span className="text-[10px] text-slate">Sample: {quote.sampleLeadTimeDays} days</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Minimum Order (MOQ)
            </span>
            <span className="font-semibold text-ink mt-0.5 block">
              {quote.moq.toLocaleString()} Units
            </span>
            <span className="text-[10px] text-slate">Cap: {quote.productionCapacityMonthly}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Payment Terms
            </span>
            <span className="font-semibold text-ink mt-0.5 block truncate">
              {quote.paymentTerms}
            </span>
            <span className="text-[10px] text-slate">{quote.incoterms}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Quality Guarantee
            </span>
            <span className="font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
              <ShieldCheck size={13} weight="bold" />
              CMM & MTR Included
            </span>
            <span className="text-[10px] text-slate">Quality Plan on file</span>
          </div>
        </div>

        {/* Supplier Note Preview */}
        <div className="text-xs text-slate space-y-1 pl-3 border-l-2 border-copper/50">
          <span className="font-mono text-[10px] uppercase font-bold text-ink block">
            Supplier Engineering Note:
          </span>
          <p className="text-xs line-clamp-2 leading-relaxed text-slate/90 italic">
            &ldquo;{quote.supplierNotes}&rdquo;
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate">
            {quote.dfmObservations && quote.dfmObservations.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-copper bg-copper/10 px-2.5 py-0.5 rounded-full">
                <FileText size={13} />
                {quote.dfmObservations.length} DFM Observations Available
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onCompareQuotes && (
              <Button
                type="button"
                onClick={onCompareQuotes}
                variant="secondary"
                size="sm"
              >
                Compare quotations
              </Button>
            )}

            <Button
              type="button"
              onClick={() => onViewDetails(quote)}
              variant="dark"
              size="sm"
              iconTrailing={<ArrowRight size={13} weight="bold" />}
            >
              Review quotation
            </Button>
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW (< 768px): Stacked Summary Card with Tap-to-Expand ── */}
      <div className="md:hidden bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                FORMAL BID
              </span>
              <span className="text-[10px] font-mono font-bold text-ink">
                {quote.referenceId}
              </span>
              <SampleDataTag />
            </div>

            <h3 className="text-sm font-bold text-ink">
              <button
                type="button"
                onClick={() => onViewDetails(quote)}
                className="text-left font-bold text-ink hover:text-copper"
              >
                {quote.supplierName}
              </button>
            </h3>
          </div>

          <div className="text-right shrink-0">
            <span className="text-base font-bold font-mono text-copper block">
              ₹{quote.unitPrice.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate block">
              +₹{quote.toolingCost.toLocaleString()} NRE
            </span>
          </div>
        </div>

        {/* Chips with consistent rounded-full pill styling */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
            SLA: {quote.productionLeadTimeDays}d
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
            MOQ: {quote.moq.toLocaleString()}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            CMM Verified
          </span>
        </div>

        {/* Tap to expand button */}
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
        >
          <span>{mobileExpanded ? "Hide Details" : "View Commercial Terms & Notes"}</span>
          {mobileExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
        </button>

        {/* Expanded Content */}
        {mobileExpanded && (
          <div className="pt-2 space-y-2 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span>Sample Lead Time:</span>
              <strong className="text-ink">{quote.sampleLeadTimeDays} days</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment Terms:</span>
              <strong className="text-ink">{quote.paymentTerms}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Incoterm:</span>
              <strong className="text-ink">{quote.incoterms}</strong>
            </div>
            {quote.supplierNotes && (
              <div className="p-2.5 rounded-lg bg-paper border border-ink/[0.04] text-[11px] leading-relaxed">
                <span className="text-ink font-bold block mb-0.5">Engineering Note:</span>
                <p className="italic text-slate">{quote.supplierNotes}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/[0.06]">
          {onCompareQuotes ? (
            <Button
              type="button"
              onClick={onCompareQuotes}
              variant="secondary"
              size="sm"
              className="w-full text-center"
            >
              Compare
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            onClick={() => onViewDetails(quote)}
            variant="dark"
            size="sm"
            className="w-full text-center"
            iconTrailing={<ArrowRight size={12} weight="bold" />}
          >
            Review Quote
          </Button>
        </div>
      </div>
    </>
  );
}
