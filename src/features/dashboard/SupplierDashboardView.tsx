"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Company, InboundSupplierRfq, SupplierQuote, ActivityEvent } from "@/types";
import { SubmitSupplierQuoteModal } from "./SubmitSupplierQuoteModal";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  Factory,
  ShieldCheck,
  CheckCircle,
  PaperPlaneRight,
  ChatCircleText,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

import { useEffect } from "react";

interface SupplierDashboardViewProps {
  company: Company;
  inboundRfqs: InboundSupplierRfq[];
  submittedQuotes: SupplierQuote[];
  recentActivity: ActivityEvent[];
  isDemo?: boolean;
}

export function SupplierDashboardView({
  company,
  inboundRfqs: initialInbound,
  submittedQuotes,
  recentActivity: _recentActivity,
  isDemo: _isDemo = false,
}: SupplierDashboardViewProps) {
  const [inboundRfqs, setInboundRfqs] = useState(initialInbound);
  const [activeTab, setActiveTab] = useState<"inbox" | "quotes" | "verification">("inbox");
  const [selectedRfqToQuote, setSelectedRfqToQuote] = useState<InboundSupplierRfq | null>(null);
  const [clarificationNotice, setClarificationNotice] = useState<string | null>(null);
  const [expandedInboundIds, setExpandedInboundIds] = useState<Record<string, boolean>>({});
  const [expandedSubmittedIds, setExpandedSubmittedIds] = useState<Record<string, boolean>>({});

  const toggleInboundExpand = (id: string) => {
    setExpandedInboundIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSubmittedExpand = (id: string) => {
    setExpandedSubmittedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setInboundRfqs(initialInbound);
  }, [initialInbound]);

  const handleQuoteSubmitted = (rfqId: string) => {
    setInboundRfqs((prev) =>
      prev.map((r) => (r.id === rfqId ? { ...r, status: "quoted" } : r))
    );
  };

  const handleAskClarification = (referenceId: string) => {
    setClarificationNotice(`Clarification request ticket registered for ${referenceId}. Sourcing desk will notify the buyer.`);
    setTimeout(() => setClarificationNotice(null), 4000);
  };

  const newRfqsCount = inboundRfqs.filter((r) => r.status === "new").length;
  const isCompanyVerified = Boolean(company.verifiedAuditDate || (company.verification && company.verification.length > 0));

  return (
    <div className="space-y-8">
      {/* ── Supplier Header ─────────────────────────────────── */}
      <div className="border-b border-ink/[0.06] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              SUPPLIER & FACTORY DESK
            </span>
            <span className="text-xs font-mono font-bold text-ink">
              {company.name}
            </span>
            <SampleDataTag />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Manufacturing Opportunity Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate mt-1">
            Manage qualified buyer inquiries, evaluate machine bed tolerances, and submit binding quotations.
          </p>
        </div>

        <Button
          href={isCompanyVerified ? `/suppliers/${company.id}` : "/register?role=supplier"}
          variant="secondary"
          size="sm"
          className="self-start sm:self-auto"
          iconLeading={<Factory size={15} className="text-copper" />}
        >
          {isCompanyVerified ? "Preview Live Capability Dossier →" : "Complete Capability Onboarding →"}
        </Button>
      </div>

      {/* Clarification alert notice */}
      {clarificationNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle size={16} weight="fill" />
          <span>{clarificationNotice}</span>
        </div>
      )}

      {/* ── Status & Opportunities Strip (Prioritizing Business Opportunities) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: New RFQ Opportunities (DOMINANT) */}
        <Card level="supporting" className="border-copper/30 p-4 space-y-1 ring-1 ring-copper/15">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-mono uppercase text-copper block font-bold">
              New Inbound RFQ Opportunities
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-copper/10 text-copper font-bold">
              {inboundRfqs.length > 0 ? "High Fit" : "Standby"}
            </span>
          </div>
          <span className="text-2xl font-bold text-ink block">
            {newRfqsCount} Pending Action
          </span>
          <span className="text-[10px] text-slate">
            {inboundRfqs.length > 0 ? "Directly matched against your certified machinery" : "Awaiting matched buyer requirements"}
          </span>
        </Card>

        {/* Metric 2: Response Deadlines & SLA */}
        <Card level="supporting" className="p-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-mono uppercase text-slate/70 block font-semibold">
              Response Deadlines
            </span>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
              24–48h SLA
            </span>
          </div>
          <span className="text-2xl font-bold text-amber-700 font-mono block">
            {inboundRfqs.length > 0 ? "3 Days Earliest" : "—"}
          </span>
          <span className="text-[10px] text-slate">
            {inboundRfqs.length > 0 ? "Maintain >90% response rate for priority ranking" : "No active inquiries awaiting response"}
          </span>
        </Card>

        {/* Metric 3: Verification & Profile Completeness */}
        <Card level="supporting" className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-copper" weight="bold" />
              Verification Status
            </span>
            <span
              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                isCompanyVerified
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-paper text-slate border border-ink/[0.08]"
              }`}
            >
              {isCompanyVerified ? "Facility Audited" : "Pending Onboarding"}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-ink/[0.08] overflow-hidden">
            <div
              className="h-full bg-copper rounded-full"
              style={{ width: isCompanyVerified ? "85%" : "0%" }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate">
            <span>{isCompanyVerified ? "Profile 85% Complete" : "Profile 0% Complete"}</span>
            <span className="text-copper font-medium">
              {isCompanyVerified ? `Audited ${company.verifiedAuditDate || "2026-06-12"}` : "Audit Pending"}
            </span>
          </div>
        </Card>
      </div>

      {/* ── Tabs Navigation ─────────────────────────────────── */}
      <div className="border-b border-ink/[0.08] pb-1">
        {/* Desktop Tabs (>= 768px): 100% Pixel-Equivalent & Untouched */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("inbox")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "inbox"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Inbound Opportunities ({inboundRfqs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quotes")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "quotes"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Submitted Quotations ({submittedQuotes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("verification")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "verification"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Audit Pack & Compliance
          </button>
        </div>

        {/* Mobile Tabs (< 768px): Unified Pill Dock matching Section A */}
        <div className="md:hidden overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <div className="h-[36px] p-0.5 rounded-full bg-ink/[0.04] border border-ink/[0.06] inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("inbox")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Inbound ({inboundRfqs.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("quotes")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "quotes"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Quotes ({submittedQuotes.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("verification")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "verification"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Compliance
            </button>
          </div>
        </div>
      </div>

      {/* ── TAB 1: Inbound RFQ Inbox ────────────────────────── */}
      {activeTab === "inbox" && (
        inboundRfqs.length === 0 ? (
          <EmptyState
            icon={<Factory size={22} />}
            badge="OPPORTUNITY INBOX"
            title="No Matched Inquiries Yet"
            description="Complete your capability profile with verified machine axes, materials, and envelope specs to receive qualified buyer requirements directly into your desk."
            action={{
              label: isCompanyVerified ? "View Capability Profile" : "Complete Capability Profile",
              href: isCompanyVerified ? `/suppliers/${company.id}` : "/register?role=supplier",
              variant: "primary",
              iconLeading: <ShieldCheck size={15} weight="bold" />,
            }}
          />
        ) : (
          <div className="space-y-4">
            {/* Desktop View (>= 768px): Unchanged multi-column */}
            <div className="hidden md:block space-y-4">
              {inboundRfqs.map((rfq) => {
                const isQuoted = rfq.status === "quoted";

                return (
                  <div
                    key={rfq.id}
                    className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-6 shadow-xs space-y-4 text-xs"
                  >
                    <div className="flex flex-row items-start justify-between gap-2.5 pb-3 border-b border-ink/[0.06]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-copper/10 text-copper font-bold">
                            MATCHED INQUIRY
                          </span>
                          <span className="font-mono text-xs font-bold text-ink">
                            {rfq.referenceId}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                              isQuoted
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-blue-50 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {isQuoted ? "QUOTATION SUBMITTED" : "ACTION REQUIRED"}
                          </span>
                          <SampleDataTag />
                        </div>

                        <h3 className="text-lg font-bold text-ink">
                          {rfq.partName}
                        </h3>
                        <p className="text-xs text-slate mt-0.5">
                          Buyer: <strong className="text-ink">{rfq.buyerType}</strong> ({rfq.buyerRegion}) · Delivery to {rfq.deliveryDestination}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase text-slate/70 block">
                          Response SLA
                        </span>
                        <span className="text-sm font-bold text-amber-700 font-mono">
                          {rfq.responseDeadlineDays} Days Remaining
                        </span>
                      </div>
                    </div>

                    {/* Specs breakdown */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-paper p-2.5 rounded-lg border border-ink/[0.04]">
                        <span className="text-[10px] font-mono uppercase text-slate/70 block">
                          Material Spec
                        </span>
                        <span className="font-semibold text-ink mt-0.5 block truncate">
                          {rfq.material}
                        </span>
                      </div>

                      <div className="bg-paper p-2.5 rounded-lg border border-ink/[0.04]">
                        <span className="text-[10px] font-mono uppercase text-slate/70 block">
                          Critical Tolerance
                        </span>
                        <span className="font-semibold text-ink mt-0.5 block font-mono">
                          {rfq.tolerance}
                        </span>
                      </div>

                      <div className="bg-paper p-2.5 rounded-lg border border-ink/[0.04]">
                        <span className="text-[10px] font-mono uppercase text-slate/70 block">
                          Batch Volume
                        </span>
                        <span className="font-semibold text-ink mt-0.5 block">
                          {rfq.quantity} {rfq.unit}
                        </span>
                      </div>

                      <div className="bg-paper p-2.5 rounded-lg border border-ink/[0.04]">
                        <span className="text-[10px] font-mono uppercase text-slate/70 block">
                          CAD Model
                        </span>
                        <span className="font-mono text-copper mt-0.5 block truncate">
                          {rfq.drawingFileName || "3D-MODEL.step"}
                        </span>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-slate text-[11px]">
                        Matched because your 5-axis Mazak machine inventory meets envelope ({rfq.dimensions || "180x120mm"}).
                      </span>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => handleAskClarification(rfq.referenceId)}
                          variant="secondary"
                          size="sm"
                          iconLeading={<ChatCircleText size={14} />}
                        >
                          Ask Clarification
                        </Button>

                        {!isQuoted && (
                          <Button
                            type="button"
                            onClick={() => setSelectedRfqToQuote(rfq)}
                            variant="primary"
                            size="sm"
                            iconLeading={<PaperPlaneRight size={14} weight="bold" />}
                          >
                            Submit Formal Quotation
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile View (< 768px): Stacked summary cards + chips + tap-to-expand */}
            <div className="md:hidden space-y-3">
              {inboundRfqs.map((rfq) => {
                const isQuoted = rfq.status === "quoted";
                const isExpanded = Boolean(expandedInboundIds[rfq.id]);

                return (
                  <div
                    key={rfq.id}
                    className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono text-[10px] font-bold text-ink">{rfq.referenceId}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${
                            isQuoted
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {isQuoted ? "QUOTED" : "ACTION REQ"}
                        </span>
                        <SampleDataTag />
                      </div>
                      <h4 className="text-sm font-bold text-ink leading-snug">{rfq.partName}</h4>
                      <p className="text-[11px] text-slate mt-0.5">
                        {rfq.buyerType} · Destination: {rfq.deliveryDestination}
                      </p>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        {rfq.material}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-mono">
                        {rfq.tolerance}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        {rfq.quantity} {rfq.unit}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono font-bold">
                        {rfq.responseDeadlineDays}d SLA
                      </span>
                    </div>

                    {/* Tap to expand */}
                    <button
                      type="button"
                      onClick={() => toggleInboundExpand(rfq.id)}
                      className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "View CAD Specs & Machinery Fit"}</span>
                      {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-2 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span>CAD Drawing:</span>
                          <strong className="text-copper font-mono">{rfq.drawingFileName || "3D-MODEL.step"}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Envelope:</span>
                          <strong className="text-ink">{rfq.dimensions || "180x120mm"}</strong>
                        </div>
                        <p className="text-[11px] text-slate bg-paper p-2 rounded-lg border border-ink/[0.04]">
                          Matched because your 5-axis CNC inventory meets envelope requirements.
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/[0.06]">
                      <Button
                        type="button"
                        onClick={() => handleAskClarification(rfq.referenceId)}
                        variant="secondary"
                        size="sm"
                        className="w-full text-center"
                        iconLeading={<ChatCircleText size={13} />}
                      >
                        Clarify
                      </Button>

                      {!isQuoted ? (
                        <Button
                          type="button"
                          onClick={() => setSelectedRfqToQuote(rfq)}
                          variant="primary"
                          size="sm"
                          className="w-full text-center"
                          iconLeading={<PaperPlaneRight size={13} weight="bold" />}
                        >
                          Quote
                        </Button>
                      ) : (
                        <span className="w-full py-1.5 text-center text-emerald-700 text-xs font-semibold bg-emerald-50 rounded-lg flex items-center justify-center">
                          Quoted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── TAB 2: Submitted Quotations ─────────────────────── */}
      {activeTab === "quotes" && (
        submittedQuotes.length === 0 ? (
          <EmptyState
            icon={<PaperPlaneRight size={22} />}
            badge="QUOTATION DESK"
            title="No Quotations Submitted Yet"
            description="When new inbound RFQ opportunities arrive in your inbox, review the technical drawings, verify machine envelopes, and submit binding commercial bids here."
            action={{
              label: "View Inbound RFQs",
              onClick: () => setActiveTab("inbox"),
              variant: "secondary",
              iconLeading: <Factory size={14} />,
            }}
          />
        ) : (
          <div className="space-y-3">
            {/* Desktop View (>= 768px): Unchanged multi-column row */}
            <div className="hidden md:block space-y-3">
              {submittedQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-xs flex flex-row items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-ink">{q.referenceId}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                        {q.status.toUpperCase()}
                      </span>
                      <SampleDataTag />
                    </div>
                    <h4 className="text-base font-bold text-ink">Quotation for RFQ {q.rfqId}</h4>
                    <p className="text-xs text-slate mt-0.5">
                      Quoted: <strong className="text-ink">₹{q.unitPrice.toFixed(2)}/unit</strong> + ₹{q.toolingCost.toLocaleString()} NRE · SLA: {q.productionLeadTimeDays} days
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate block">Valid until {q.validUntil}</span>
                    <span className="text-emerald-700 font-semibold text-xs">Under Buyer Review</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View (< 768px): Stacked summary cards + chips + tap-to-expand */}
            <div className="md:hidden space-y-3">
              {submittedQuotes.map((q) => {
                const isExpanded = Boolean(expandedSubmittedIds[q.id]);

                return (
                  <div
                    key={q.id}
                    className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-mono text-[10px] font-bold text-ink">{q.referenceId}</span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                            {q.status.toUpperCase()}
                          </span>
                          <SampleDataTag />
                        </div>
                        <h4 className="text-sm font-bold text-ink leading-snug">
                          Quotation for RFQ {q.rfqId}
                        </h4>
                      </div>

                      <span className="text-sm font-bold font-mono text-copper shrink-0">
                        ₹{q.unitPrice.toFixed(2)}/pc
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-mono font-medium">
                        NRE: ₹{q.toolingCost.toLocaleString()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        SLA: {q.productionLeadTimeDays}d
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-slate font-medium">
                        Valid: {q.validUntil}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSubmittedExpand(q.id)}
                      className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Commercial Status"}</span>
                      {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-1.5 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span>Status:</span>
                          <strong className="text-emerald-700 font-semibold">Under Buyer Review</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Payment Terms:</span>
                          <strong className="text-ink">{q.paymentTerms || "Net 30"}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── TAB 3: Audit Pack & Compliance ───────────────────── */}
      {activeTab === "verification" && (
        !isCompanyVerified ? (
          <EmptyState
            icon={<ShieldCheck size={22} />}
            badge="PLANT AUDIT"
            title="Capability Dossier Pending Audit"
            description="Submit machine specifications, tool axes, and ISO documentation to unlock verified manufacturer ranking."
            action={{
              label: "Register Manufacturing Plant",
              href: "/register?role=supplier",
              variant: "primary",
              iconLeading: <ShieldCheck size={15} weight="bold" />,
            }}
          />
        ) : (
          <div className="bg-surface rounded-2xl border border-ink/[0.08] p-6 shadow-xs space-y-5 text-xs">
            <div>
              <h3 className="text-base font-bold text-ink">
                Verified Compliance & Plant Audit Dossier
              </h3>
              <p className="text-xs text-slate mt-0.5">
                These records are visible to qualified enterprise buyers on your public capability dossier.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-ink/[0.06] bg-paper space-y-1">
                <span className="text-[10px] font-mono uppercase text-copper font-bold">Entity & Premises</span>
                <p className="font-bold text-ink text-sm">Industrial Unit Incorporation</p>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle size={14} weight="fill" />
                  Verified by Government Registry Cross-Check
                </span>
              </div>

              <div className="p-4 rounded-xl border border-ink/[0.06] bg-paper space-y-1">
                <span className="text-[10px] font-mono uppercase text-copper font-bold">Equipment Registry</span>
                <p className="font-bold text-ink text-sm">5-Axis Machine Tooling Verification</p>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle size={14} weight="fill" />
                  Serial Number & Nameplate Audit Confirmed
                </span>
              </div>
            </div>
          </div>
        )
      )}

      {/* ── Quote Modal ─────────────────────────────────────── */}
      <SubmitSupplierQuoteModal
        rfq={selectedRfqToQuote}
        isOpen={Boolean(selectedRfqToQuote)}
        onClose={() => setSelectedRfqToQuote(null)}
        onSubmit={handleQuoteSubmitted}
      />
    </div>
  );
}
