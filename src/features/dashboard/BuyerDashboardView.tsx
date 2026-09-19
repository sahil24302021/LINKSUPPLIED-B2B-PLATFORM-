"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type {
  RequirementSummaryItem,
  RFQRecord,
  SupplierQuote,
  ActivityEvent,
  Company,
} from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  FileText,
  Clock,
  CheckCircle,
  PaperPlaneRight,
  ArrowsLeftRight,
  PlusCircle,
  Eye,
  BookmarkSimple,
  ArrowRight,
  Factory,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

interface BuyerDashboardViewProps {
  requirements: RequirementSummaryItem[];
  rfqs: RFQRecord[];
  quotes: SupplierQuote[];
  savedSuppliers: Company[];
  recentActivity: ActivityEvent[];
  isDemo?: boolean;
}

export function BuyerDashboardView({
  requirements: initialReqs,
  rfqs,
  quotes,
  savedSuppliers,
  recentActivity,
  isDemo = false,
}: BuyerDashboardViewProps) {
  const [requirements, setRequirements] = useState(initialReqs);
  const [activeTab, setActiveTab] = useState<"requirements" | "rfqs" | "saved" | "activity">("requirements");
  const [expandedReqIds, setExpandedReqIds] = useState<Record<string, boolean>>({});
  const [expandedRfqIds, setExpandedRfqIds] = useState<Record<string, boolean>>({});
  const [expandedSupplierIds, setExpandedSupplierIds] = useState<Record<string, boolean>>({});

  const toggleReqExpand = (id: string) => {
    setExpandedReqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleRfqExpand = (id: string) => {
    setExpandedRfqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleSupplierExpand = (id: string) => {
    setExpandedSupplierIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sync state when props change (e.g. exit demo mode)
  useEffect(() => {
    setRequirements(initialReqs);
  }, [initialReqs]);

  const activeReqsCount = requirements.length;
  const pendingQuotesCount = quotes.filter((q) => q.status === "submitted").length;

  return (
    <div className="space-y-8">
      {/* ── Top Dashboard Header ───────────────────────────── */}
      <div className="border-b border-ink/[0.06] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              BUYER OPERATIONAL WORKSPACE
            </span>
            <SampleDataTag />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            Procurement Sourcing Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate mt-1">
            Manage part specifications, engineering feasibility reviews, and commercial quotation pipelines.
          </p>
        </div>

        <Button
          href="/discover"
          variant="primary"
          size="sm"
          className="self-start sm:self-auto"
          iconLeading={<PlusCircle size={15} weight="bold" />}
        >
          Submit Requirement
        </Button>
      </div>

      {/* ── Operational Metric Tiles ────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block font-semibold">
            Active requirements
          </span>
          <span className="text-2xl font-bold text-ink mt-1 block">
            {activeReqsCount}
          </span>
          <span className="text-[10px] text-slate">Qualified engineering briefs</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block font-semibold">
            RFQs awaiting response
          </span>
          <span className="text-2xl font-bold text-ink mt-1 block">
            {rfqs.length}
          </span>
          <span className="text-[10px] text-slate">Dispatched to audited plants</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block font-semibold">
            Quotes received
          </span>
          <span className="text-2xl font-bold text-copper mt-1 block">
            {quotes.length}
          </span>
          <span className="text-[10px] text-slate">{pendingQuotesCount} awaiting review</span>
        </Card>

        <Card level="supporting" className="p-4">
          <span className="text-[10px] font-mono uppercase text-slate/70 block font-semibold">
            Suppliers saved
          </span>
          <span className="text-2xl font-bold text-ink mt-1 block">
            {savedSuppliers.length}
          </span>
          <span className="text-[10px] text-slate">Benchmarked manufacturing plants</span>
        </Card>
      </div>

      {/* ── Needs Your Attention Strip (Gated to Demo with Active Items) ── */}
      {isDemo && requirements.length > 0 && (
        <div className="bg-surface rounded-2xl border border-ink/[0.08] p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-ink">
                Needs Your Attention (3 Actionable Items)
              </h2>
            </div>
            <span className="text-[11px] text-slate">Live pipeline status</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-paper p-3.5 rounded-xl border border-ink/[0.06] flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    Quotes Awaiting Review
                  </span>
                  <span className="text-[10px] font-mono text-slate">2 received</span>
                </div>
                <p className="font-bold text-ink text-xs">REQ-2026-084 · CNC Titanium Valve Body</p>
                <p className="text-[11px] text-slate mt-0.5">2 bids submitted by audited European facilities awaiting commercial review.</p>
              </div>
              <Link
                href="/rfq"
                className="text-copper hover:text-copper-muted font-bold text-xs inline-flex items-center gap-1"
              >
                Compare Quotations →
              </Link>
            </div>

            <div className="bg-paper p-3.5 rounded-xl border border-ink/[0.06] flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    Clarification Requested
                  </span>
                  <span className="text-[10px] font-mono text-slate">1 inquiry</span>
                </div>
                <p className="font-bold text-ink text-xs">REQ-2026-082 · Medical Grade Manifold</p>
                <p className="text-[11px] text-slate mt-0.5">Apex Precision Ltd requested clarification on internal bore surface finish (Ra &lt; 0.4µm).</p>
              </div>
              <Link
                href="/rfq"
                className="text-copper hover:text-copper-muted font-bold text-xs inline-flex items-center gap-1"
              >
                Answer Engineering Note →
              </Link>
            </div>

            <div className="bg-paper p-3.5 rounded-xl border border-ink/[0.06] flex flex-col justify-between gap-2.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Engineering Feasibility
                  </span>
                  <span className="text-[10px] font-mono text-slate">Ready to dispatch</span>
                </div>
                <p className="font-bold text-ink text-xs">REQ-2026-085 · Aerospace Bracket</p>
                <p className="text-[11px] text-slate mt-0.5">Geometry checks passed. 4 matched facilities ready for structured RFQ dispatch.</p>
              </div>
              <Link
                href="/matching"
                className="text-copper hover:text-copper-muted font-bold text-xs inline-flex items-center gap-1"
              >
                Inspect 4 Matched Facilities →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs Navigation ─────────────────────────────────── */}
      <div className="border-b border-ink/[0.08] pb-1">
        {/* Desktop Tabs (>= 768px): 100% Pixel-Equivalent & Untouched */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("requirements")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "requirements"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Active Requirements ({requirements.length})
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
            RFQs & Quotations ({rfqs.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "saved"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Shortlisted Facilities ({savedSuppliers.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("activity")}
            className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
              activeTab === "activity"
                ? "text-ink bg-surface border border-ink/[0.1] shadow-xs"
                : "text-slate hover:text-ink"
            }`}
          >
            Activity Timeline
          </button>
        </div>

        {/* Mobile Tabs (< 768px): Unified Pill Dock matching Section A */}
        <div className="md:hidden overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          <div className="h-[36px] p-0.5 rounded-full bg-ink/[0.04] border border-ink/[0.06] inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("requirements")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "requirements"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Requirements ({requirements.length})
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
              onClick={() => setActiveTab("saved")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "saved"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Saved ({savedSuppliers.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={`h-[30px] px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center shrink-0 cursor-pointer ${
                activeTab === "activity"
                  ? "bg-surface text-ink shadow-xs border border-ink/[0.06]"
                  : "text-slate hover:text-ink font-medium"
              }`}
            >
              Timeline
            </button>
          </div>
        </div>
      </div>

      {/* ── TAB 1: Requirements Workspace ───────────────────── */}
      {activeTab === "requirements" && (
        requirements.length === 0 ? (
          <EmptyState
            icon={<FileText size={22} />}
            badge="SOURCING PIPELINE"
            title="No Active Requirements Yet"
            description="Create your first structured sourcing brief with material, tolerance, and delivery specs to begin capability matching with verified manufacturing plants."
            action={{
              label: "Submit a Requirement",
              href: "/discover",
              variant: "primary",
              iconLeading: <PlusCircle size={15} weight="bold" />,
            }}
          />
        ) : (
          <div className="space-y-3">
            {/* Desktop View (>= 768px): Unchanged multi-column row */}
            <div className="hidden md:block space-y-3">
              {requirements.map((req) => (
                <div
                  key={req.id}
                  className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-xs flex flex-row items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-ink bg-paper px-2 py-0.5 rounded border border-ink/[0.08]">
                        {req.referenceId}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          req.status === "quotes_received"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : req.status === "matching"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : "bg-paper text-slate"
                        }`}
                      >
                        {req.status.replace("_", " ").toUpperCase()}
                      </span>
                      <SampleDataTag />
                    </div>

                    <h3 className="text-base font-bold text-ink">
                      {req.partName}
                    </h3>
                    <p className="text-xs text-slate mt-0.5">
                      Category: <strong className="text-ink">{req.category}</strong> · Tolerance: <strong className="text-ink">{req.tolerance}</strong>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate">
                      <span>Batch Volume: <strong className="text-ink">{req.quantity} {req.unit}</strong></span>
                      <span>·</span>
                      <span>Destination: <strong className="text-ink">{req.destination}</strong></span>
                      <span>·</span>
                      <span>Matched Facilities: <strong className="text-copper font-bold">{req.matchesCount}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      href="/matching"
                      variant="secondary"
                      size="sm"
                      iconLeading={<Eye size={14} />}
                    >
                      Inspect Matches ({req.matchesCount})
                    </Button>

                    <Button
                      href="/rfq"
                      variant="primary"
                      size="sm"
                      iconTrailing={<ArrowRight size={13} weight="bold" />}
                    >
                      Manage RFQs
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View (< 768px): Stacked summary cards + chips + tap-to-expand */}
            <div className="md:hidden space-y-3">
              {requirements.map((req) => {
                const isExpanded = Boolean(expandedReqIds[req.id]);

                return (
                  <div
                    key={req.id}
                    className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono text-[10px] font-bold text-ink bg-paper px-2 py-0.5 rounded border border-ink/[0.08]">
                          {req.referenceId}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${
                            req.status === "quotes_received"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : req.status === "matching"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : "bg-paper text-slate"
                          }`}
                        >
                          {req.status.replace("_", " ").toUpperCase()}
                        </span>
                        <SampleDataTag />
                      </div>
                      <h4 className="text-sm font-bold text-ink leading-snug">
                        {req.partName}
                      </h4>
                    </div>

                    {/* Key numbers as chips */}
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        {req.quantity} {req.unit}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-mono">
                        {req.tolerance}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        {req.material}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/20 text-copper font-bold">
                        {req.matchesCount} Matches
                      </span>
                    </div>

                    {/* Tap to expand */}
                    <button
                      type="button"
                      onClick={() => toggleReqExpand(req.id)}
                      className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Specifications & SLA"}</span>
                      {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-2 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span>Process Category:</span>
                          <strong className="text-ink">{req.category}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Destination:</span>
                          <strong className="text-ink">{req.destination}</strong>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/[0.06]">
                      <Button
                        href="/matching"
                        variant="secondary"
                        size="sm"
                        className="w-full text-center"
                        iconLeading={<Eye size={13} />}
                      >
                        Matches ({req.matchesCount})
                      </Button>
                      <Button
                        href="/rfq"
                        variant="primary"
                        size="sm"
                        className="w-full text-center"
                        iconTrailing={<ArrowRight size={12} weight="bold" />}
                      >
                        Manage RFQs
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── TAB 2: RFQs & Quotes Workspace ──────────────────── */}
      {activeTab === "rfqs" && (
        rfqs.length === 0 ? (
          <EmptyState
            icon={<PaperPlaneRight size={22} />}
            badge="RFQ DISPATCH"
            title="No RFQs Dispatched Yet"
            description="Once you review matched suppliers, dispatch RFQs with 1 click to collect structured quotations."
            action={{
              label: "Find Matched Suppliers",
              href: "/matching",
              variant: "secondary",
              iconLeading: <ArrowsLeftRight size={14} />,
            }}
          />
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-paper p-3 rounded-xl border border-ink/[0.06] text-xs">
              <span className="text-slate">
                Active RFQs and commercial bids received from verified suppliers.
              </span>
              <Link
                href="/rfq"
                className="text-copper hover:text-copper-muted font-bold text-xs flex items-center gap-1"
              >
                Open Full Quotation Workspace →
              </Link>
            </div>

            {/* Desktop View (>= 768px): Unchanged multi-column row */}
            <div className="hidden md:block space-y-3">
              {rfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-xs flex flex-row items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-ink">{rfq.referenceId}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-paper border border-ink/[0.08] text-slate">
                        {rfq.status.replace("_", " ").toUpperCase()}
                      </span>
                      <SampleDataTag />
                    </div>
                    <h4 className="text-base font-bold text-ink">{rfq.partName}</h4>
                    <p className="text-xs text-slate">Supplier: <strong className="text-ink">{rfq.supplierName}</strong> ({rfq.supplierLocation})</p>
                  </div>

                  <Button
                    href="/rfq"
                    variant="primary"
                    size="sm"
                    iconTrailing={<ArrowRight size={13} weight="bold" />}
                  >
                    Review Details
                  </Button>
                </div>
              ))}
            </div>

            {/* Mobile View (< 768px): Stacked summary cards + chips + tap-to-expand */}
            <div className="md:hidden space-y-3">
              {rfqs.map((rfq) => {
                const isExpanded = Boolean(expandedRfqIds[rfq.id]);

                return (
                  <div
                    key={rfq.id}
                    className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono text-[10px] font-bold text-ink">{rfq.referenceId}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-paper border border-ink/[0.08] text-slate">
                          {rfq.status.replace("_", " ").toUpperCase()}
                        </span>
                        <SampleDataTag />
                      </div>
                      <h4 className="text-sm font-bold text-ink leading-snug">{rfq.partName}</h4>
                      <p className="text-xs text-slate mt-0.5">{rfq.supplierName} · {rfq.supplierLocation}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        Target Vol: {rfq.quantity || 1500} {rfq.unit || "pcs"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        Lead: {rfq.targetLeadTimeDays || 14}d
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleRfqExpand(rfq.id)}
                      className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Details" : "View Logistics & Terms"}</span>
                      {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                    </button>

                    {isExpanded && (
                      <div className="pt-2 space-y-2 text-xs text-slate border-t border-ink/[0.04] animate-in fade-in duration-150">
                        <div className="flex items-center justify-between">
                          <span>Delivery Destination:</span>
                          <strong className="text-ink">{rfq.deliveryCity || "Hamburg, DE"}</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Incoterm:</span>
                          <strong className="text-ink">{rfq.incoterm || "DAP"}</strong>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 border-t border-ink/[0.06]">
                      <Button
                        href="/rfq"
                        variant="primary"
                        size="sm"
                        className="w-full text-center"
                        iconTrailing={<ArrowRight size={13} weight="bold" />}
                      >
                        Review Quotations
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── TAB 3: Saved Suppliers ──────────────────────────── */}
      {activeTab === "saved" && (
        savedSuppliers.length === 0 ? (
          <EmptyState
            icon={<BookmarkSimple size={22} />}
            badge="VENDOR POOL"
            title="No Saved Suppliers Yet"
            description="Bookmark high-fit facilities while reviewing capability dossiers to build your preferred vendor pool."
            action={{
              label: "Explore Supplier Dossiers",
              href: "/suppliers/sup-001",
              variant: "secondary",
              iconLeading: <Factory size={14} />,
            }}
          />
        ) : (
          <div>
            {/* Desktop Layout (>= 768px): Unchanged 2-column grid */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              {savedSuppliers.map((sup) => (
                <div
                  key={sup.id}
                  className="bg-surface rounded-2xl border border-ink/[0.08] p-5 shadow-xs space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                        {sup.type.toUpperCase()}
                      </span>
                      <h4 className="font-bold text-ink text-base mt-1">{sup.name}</h4>
                      <span className="text-slate text-xs">{sup.city || sup.location}, {sup.country}</span>
                    </div>
                    <BookmarkSimple size={18} className="text-copper" weight="fill" />
                  </div>

                  <p className="text-xs text-slate line-clamp-2">
                    {sup.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-ink/[0.06]">
                    <span className="text-[11px] text-slate font-medium">
                      Tol: <strong className="text-ink">{sup.technicalSpecs?.tightestTolerance || "±0.02 mm"}</strong>
                    </span>
                    <Link
                      href={`/suppliers/${sup.id}`}
                      className="text-copper hover:text-copper-muted font-bold text-xs flex items-center gap-1"
                    >
                      View Dossier →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Layout (< 768px): Stacked summary cards */}
            <div className="md:hidden space-y-3">
              {savedSuppliers.map((sup) => {
                const isExpanded = Boolean(expandedSupplierIds[sup.id]);

                return (
                  <div
                    key={sup.id}
                    className="bg-surface rounded-xl border border-ink/[0.08] p-4 shadow-2xs space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                          {sup.type.toUpperCase()}
                        </span>
                        <h4 className="font-bold text-ink text-sm mt-1">{sup.name}</h4>
                        <span className="text-slate text-[11px]">{sup.city || sup.location}, {sup.country}</span>
                      </div>
                      <BookmarkSimple size={16} className="text-copper" weight="fill" />
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-mono font-medium">
                        Tol: {sup.technicalSpecs?.tightestTolerance || "±0.02 mm"}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-paper border border-ink/[0.06] text-ink font-medium">
                        Verified Facility
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSupplierExpand(sup.id)}
                      className="w-full flex items-center justify-between text-xs text-copper hover:text-copper-muted font-semibold pt-2 border-t border-ink/[0.06] cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Overview" : "View Plant Overview"}</span>
                      {isExpanded ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                    </button>

                    {isExpanded && (
                      <p className="text-xs text-slate pt-2 border-t border-ink/[0.04] leading-relaxed animate-in fade-in duration-150">
                        {sup.description}
                      </p>
                    )}

                    <div className="pt-2 border-t border-ink/[0.06]">
                      <Link
                        href={`/suppliers/${sup.id}`}
                        className="w-full block py-2 rounded-lg bg-paper border border-ink/[0.1] text-center text-xs font-semibold text-ink hover:text-copper transition-colors"
                      >
                        View Full Capability Dossier →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ── TAB 4: Activity Timeline ────────────────────────── */}
      {activeTab === "activity" && (
        recentActivity.length === 0 ? (
          <EmptyState
            icon={<Clock size={22} />}
            badge="PROCUREMENT AUDIT"
            title="No Activity Events Yet"
            description="Procurement milestones, engineering feasibility notes, and quotation submissions will be chronologically logged here."
            action={{
              label: "Submit a Requirement",
              href: "/discover",
              variant: "primary",
              iconLeading: <PlusCircle size={15} weight="bold" />,
            }}
          />
        ) : (
          <div className="bg-surface rounded-2xl border border-ink/[0.08] p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-ink text-sm uppercase tracking-wider font-mono">
              Recent Procurement Events
            </h3>

            <div className="space-y-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-ink/[0.04] last:border-0">
                  <div className="w-7 h-7 rounded-full bg-paper border border-ink/[0.1] text-copper flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={15} weight="fill" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-ink text-xs">{act.title}</p>
                      <span className="text-[10px] text-slate/70 font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate mt-0.5">{act.description}</p>
                    {act.linkHref && (
                      <Link
                        href={act.linkHref}
                        className="text-copper hover:text-copper-muted font-semibold text-[11px] mt-1 inline-block"
                      >
                        {act.linkLabel} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
