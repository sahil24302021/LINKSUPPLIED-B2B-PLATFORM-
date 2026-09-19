"use client";

import { useState } from "react";
import Link from "next/link";
import type { RFQRecord, SupplierQuote } from "@/types";
import { QuoteCard } from "./QuoteCard";
import { QuoteDetailModal } from "./QuoteDetailModal";
import { QuoteComparisonView } from "./QuoteComparisonView";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Clock,
  CheckCircle,
  PaperPlaneRight,
  ArrowsLeftRight,
  PlusCircle,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

import { useEffect } from "react";

interface RfqWorkspaceProps {
  rfqs: RFQRecord[];
  quotes: SupplierQuote[];
  onAcceptQuote?: (quoteId: string) => void;
  isDemo?: boolean;
}

export function RfqWorkspace({
  rfqs: initialRfqs,
  quotes: initialQuotes,
  onAcceptQuote,
  isDemo = false,
}: RfqWorkspaceProps) {
  const [rfqs, setRfqs] = useState<RFQRecord[]>(initialRfqs);
  const [quotes, setQuotes] = useState<SupplierQuote[]>(initialQuotes);
  const [activeTab, setActiveTab] = useState<"quotes" | "rfqs" | "compare">("quotes");
  const [selectedQuote, setSelectedQuote] = useState<SupplierQuote | null>(null);
  const [expandedRfqId, setExpandedRfqId] = useState<string | null>(null);

  useEffect(() => {
    setRfqs(initialRfqs);
    setQuotes(initialQuotes);
  }, [initialRfqs, initialQuotes]);

  const handleAcceptQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: "accepted" } : q))
    );
    if (onAcceptQuote) onAcceptQuote(quoteId);
  };

  const pendingRfqsCount = rfqs.filter((r) => r.status === "sent").length;
  const quotesCount = quotes.length;
  const acceptedQuotesCount = quotes.filter((q) => q.status === "accepted").length;

  return (
    <div className="space-y-6">
      {/* ── Persistent Sourcing Requirement Reference Bar ───────────────────────── */}
      {isDemo ? (
        <div className="bg-surface rounded-2xl border border-ink/[0.08] p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-ink text-surface flex items-center justify-center shrink-0 font-mono text-xs font-bold">
              REQ
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded border border-ink/[0.08]">
                  REQ-2026-0841
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ACTIVE SOURCING WORKSPACE
                </span>
                <SampleDataTag />
              </div>
              <h2 className="text-base font-bold text-ink mt-1">
                Precision Bright Drawn Round Bars (EN1A / 11SMn30)
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate mt-0.5">
                <span>Volume: <strong className="text-ink">2,000 kg / mo</strong></span>
                <span>·</span>
                <span>Tolerance: <strong className="text-ink">ISO h9 (±0.030mm)</strong></span>
                <span>·</span>
                <span>Destination: <strong className="text-ink">Mumbai, India (DAP)</strong></span>
                <span>·</span>
                <span>Target Lead Time: <strong className="text-ink">14 Days</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-ink/[0.06] w-full lg:w-auto">
            <Link
              href="/matching"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-paper hover:bg-surface border border-ink/[0.1] text-xs font-semibold text-slate hover:text-ink transition-colors"
            >
              <ArrowsLeftRight size={14} />
              Capability Matching (3)
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-paper hover:bg-surface border border-ink/[0.1] text-xs font-semibold text-slate hover:text-ink transition-colors"
            >
              <FileText size={14} />
              Edit Requirement
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-2xl border border-ink/[0.08] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-paper border border-ink/[0.1] text-slate flex items-center justify-center shrink-0 font-mono text-xs font-bold">
              RFQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold bg-paper text-slate border border-ink/[0.08]">
                  NO ACTIVE RFQS TRANSMITTED
                </span>
              </div>
              <h2 className="text-base font-bold text-ink mt-1">
                Commercial RFQ Workspace
              </h2>
              <p className="text-xs text-slate mt-0.5">
                Submit a sourcing brief to dispatch requests and compare binding supplier bids.
              </p>
            </div>
          </div>

          <Button
            href="/discover"
            variant="primary"
            size="sm"
            iconLeading={<PlusCircle size={14} weight="bold" />}
            className="self-start sm:self-auto shrink-0"
          >
            Create Sourcing Brief
          </Button>
        </div>
      )}

      {/* ── Summary Stats Metric Strip ───────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Dispatched RFQs
          </span>
          <span className="text-2xl font-bold text-ink mt-1 block">
            {rfqs.length}
          </span>
          <span className="text-[10px] text-slate">{pendingRfqsCount} awaiting response</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Quotations Received
          </span>
          <span className="text-2xl font-bold text-copper mt-1 block">
            {quotesCount}
          </span>
          <span className="text-[10px] text-slate">Ready for commercial review</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Accepted Contracts
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {acceptedQuotesCount}
          </span>
          <span className="text-[10px] text-slate">Moving to PO & tooling</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Average Response SLA
          </span>
          <span className="text-2xl font-bold text-ink mt-1 block">
            {rfqs.length > 0 ? "3.2 Days" : "—"}
          </span>
          <span className="text-[10px] text-slate">
            {rfqs.length > 0 ? "Verified manufacturing desk" : "No active inquiries"}
          </span>
        </Card>
      </div>

      {/* ── Navigation Tabs ──────────────────────────────────── */}
      <div className="border-b border-ink/[0.08] pb-1">
        <div className="flex items-center justify-between gap-3">
          {/* Desktop Tabs (>= 768px): 100% Pixel-Equivalent & Untouched */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                activeTab === "quotes"
                  ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                  : "text-slate hover:text-ink"
              }`}
            >
              Received Quotations ({quotes.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rfqs")}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                activeTab === "rfqs"
                  ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                  : "text-slate hover:text-ink"
              }`}
            >
              Dispatched RFQs ({rfqs.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("compare")}
              className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                activeTab === "compare"
                  ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                  : "text-slate hover:text-ink"
              }`}
            >
              Compare Matrix ({quotes.length})
            </button>
          </div>

          {/* Mobile Tabs (< 768px): Unified Pill Dock matching Section A */}
          <div className="md:hidden overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            <div className="h-[36px] p-0.5 rounded-full bg-ink/[0.04] border border-ink/[0.06] inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("quotes")}
                className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                  activeTab === "quotes"
                    ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                    : "text-slate hover:text-ink font-medium"
                }`}
              >
                Quotes ({quotes.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("rfqs")}
                className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                  activeTab === "rfqs"
                    ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                    : "text-slate hover:text-ink font-medium"
                }`}
              >
                RFQs ({rfqs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("compare")}
                className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                  activeTab === "compare"
                    ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                    : "text-slate hover:text-ink font-medium"
                }`}
              >
                Compare ({quotes.length})
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Link
              href="/matching"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-paper hover:bg-surface border border-ink/[0.1] text-xs font-semibold text-slate hover:text-ink transition-colors"
            >
              <PlusCircle size={14} />
              Source Another Supplier
            </Link>
          </div>
        </div>
      </div>

      {/* ── Tab Content: Received Quotes ─────────────────────── */}
      {activeTab === "quotes" && (
        <div className="space-y-4">
          {quotes.length > 0 ? (
            quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onViewDetails={(q) => setSelectedQuote(q)}
                onAcceptQuote={handleAcceptQuote}
                onCompareQuotes={() => setActiveTab("compare")}
              />
            ))
          ) : (
            <EmptyState
              icon={<FileText size={22} />}
              badge="PROCUREMENT QUEUE"
              title="No Quotations Received Yet"
              description="Your RFQ has been transmitted to vetted supplier engineering desks. Quotations detailing piece price, NRE tooling amortization, and lead times will populate here upon receipt."
              action={{
                label: "Browse Matched Suppliers",
                href: "/matching",
                variant: "primary",
                iconLeading: <ArrowsLeftRight size={14} />,
              }}
            />
          )}
        </div>
      )}

      {/* ── Tab Content: Dispatched RFQs ─────────────────────── */}
      {activeTab === "rfqs" && (
        <div className="space-y-3">
          {rfqs.length > 0 ? (
            <>
              {/* Desktop Layout (>= 768px): Unchanged multi-column row */}
              <div className="hidden md:block space-y-3">
                {rfqs.map((rfq) => {
                  const hasQuote = rfq.status === "quote_received";
                  return (
                    <div
                      key={rfq.id}
                      className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-xs flex flex-row items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded border border-ink/[0.08]">
                            {rfq.referenceId}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                              hasQuote
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {hasQuote ? "QUOTE RECEIVED" : "AWAITING SUPPLIER RESPONSE"}
                          </span>
                          <SampleDataTag />
                        </div>

                        <h4 className="text-base font-bold text-ink">
                          {rfq.partName}
                        </h4>
                        <p className="text-xs text-slate mt-0.5">
                          Supplier: <strong className="text-ink">{rfq.supplierName}</strong> ({rfq.supplierLocation})
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate">
                          <span>Target Volume: <strong className="text-ink">{rfq.quantity} {rfq.unit}</strong></span>
                          <span>·</span>
                          <span>Target Lead Time: <strong className="text-ink">{rfq.targetLeadTimeDays}</strong></span>
                          <span>·</span>
                          <span>Incoterm: <strong className="text-ink">{rfq.incoterm} ({rfq.deliveryCity})</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {hasQuote ? (
                          <Button
                            type="button"
                            onClick={() => setActiveTab("quotes")}
                            variant="primary"
                            size="sm"
                            iconLeading={<CheckCircle size={14} weight="bold" />}
                          >
                            View Received Quote
                          </Button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate px-3 py-1.5 rounded-lg bg-paper border border-ink/[0.06]">
                            <Clock size={13} className="text-amber-600" />
                            Response due by {rfq.targetResponseDate}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Layout (< 768px): Stacked summary card + chips + tap-to-expand */}
              <div className="md:hidden space-y-3">
                {rfqs.map((rfq) => {
                  const hasQuote = rfq.status === "quote_received";
                  const isExpanded = expandedRfqId === rfq.id;

                  return (
                    <div
                      key={rfq.id}
                      className="bg-surface rounded-2xl border border-ink/[0.08] p-4 shadow-xs space-y-3"
                    >
                      {/* Top meta row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded border border-ink/[0.08]">
                            {rfq.referenceId}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                              hasQuote
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                            }`}
                          >
                            {hasQuote ? "QUOTE RECEIVED" : "AWAITING RESPONSE"}
                          </span>
                        </div>
                        <SampleDataTag />
                      </div>

                      {/* Part & Supplier */}
                      <div>
                        <h4 className="text-sm font-bold text-ink leading-snug">
                          {rfq.partName}
                        </h4>
                        <p className="text-xs text-slate mt-0.5">
                          {rfq.supplierName} · {rfq.supplierLocation}
                        </p>
                      </div>

                      {/* Key Numbers as Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.08] text-[10px] font-mono text-ink">
                          Vol: {rfq.quantity} {rfq.unit}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.08] text-[10px] font-mono text-ink">
                          Lead: {rfq.targetLeadTimeDays}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.08] text-[10px] font-mono text-ink">
                          {rfq.incoterm}
                        </span>
                      </div>

                      {/* Tap-to-expand button */}
                      <button
                        type="button"
                        onClick={() => setExpandedRfqId(isExpanded ? null : rfq.id)}
                        className="w-full pt-2 border-t border-ink/[0.06] flex items-center justify-between text-xs font-semibold text-slate hover:text-ink cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Full Specs & Status"}</span>
                        {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                      </button>

                      {/* Expanded Disclosure */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-ink/[0.06] space-y-2.5 text-xs text-slate bg-paper/50 -mx-4 -mb-4 p-4 rounded-b-2xl">
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-slate/70 block">Destination</span>
                              <span className="font-semibold text-ink">{rfq.deliveryCity}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase text-slate/70 block">Target Response</span>
                              <span className="font-semibold text-ink">{rfq.targetResponseDate}</span>
                            </div>
                          </div>

                          <div className="pt-1">
                            {hasQuote ? (
                              <Button
                                type="button"
                                onClick={() => setActiveTab("quotes")}
                                variant="primary"
                                size="sm"
                                className="w-full justify-center"
                                iconLeading={<CheckCircle size={14} weight="bold" />}
                              >
                                View Received Quote
                              </Button>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5 text-xs text-slate py-2 rounded-lg bg-paper border border-ink/[0.06]">
                                <Clock size={13} className="text-amber-600" />
                                <span>Awaiting quote by {rfq.targetResponseDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <EmptyState
              icon={<PaperPlaneRight size={22} />}
              badge="DISPATCH DESK"
              title="No Dispatched RFQs"
              description="You have not requested formal quotations from matched suppliers yet. Review capability dossiers to trigger technical RFQs."
              action={{
                label: "Inspect Matched Capabilities",
                href: "/matching",
                variant: "primary",
                iconLeading: <ArrowsLeftRight size={14} />,
              }}
            />
          )}
        </div>
      )}

      {/* ── Tab Content: Comparison Matrix ───────────────────── */}
      {activeTab === "compare" && (
        quotes.length > 0 ? (
          <QuoteComparisonView
            quotes={quotes}
            onAcceptQuote={handleAcceptQuote}
            onViewDetails={(q) => setSelectedQuote(q)}
          />
        ) : (
          <EmptyState
            icon={<ArrowsLeftRight size={22} />}
            badge="SIDE-BY-SIDE MATRIX"
            title="Comparison Matrix Requires Quotations"
            description="At least one formal quotation is required to generate the side-by-side commercial and tolerance comparison matrix."
            action={{
              label: "Review Capability Matching",
              href: "/matching",
              variant: "secondary",
            }}
          />
        )
      )}

      {/* ── Quote Detail Modal ───────────────────────────────── */}
      <QuoteDetailModal
        quote={selectedQuote}
        isOpen={Boolean(selectedQuote)}
        onClose={() => setSelectedQuote(null)}
        onAccept={handleAcceptQuote}
      />
    </div>
  );
}
