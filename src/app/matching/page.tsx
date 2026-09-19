"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import type {
  Company,
  MatchResult,
  MatchingFilterState,
  MatchingSortOption,
  BuyerRequirementForm,
} from "@/types";
import { RequirementSummaryHeader } from "@/features/matching/RequirementSummaryHeader";
import { MatchingLifecycleBanner } from "@/features/matching/MatchingLifecycleBanner";
import { MatchingFilterToolbar } from "@/features/matching/MatchingFilterToolbar";
import { SupplierMatchCard } from "@/features/matching/SupplierMatchCard";
import { ExplainableMatchDrawer } from "@/features/matching/ExplainableMatchDrawer";
import { SupplierComparisonModal } from "@/features/matching/SupplierComparisonModal";
import { MatchingEmptyState } from "@/features/matching/MatchingEmptyState";
import { BusinessProfilePreview } from "@/features/company/BusinessProfilePreview";
import { RequestQuoteModal } from "@/features/rfq/RequestQuoteModal";
import { RouteGate } from "@/components/auth/RouteGate";
import { companies, SOURCING_PRESETS } from "@/data";
import {
  ArrowsLeftRight,
  ArrowRight,
} from "@phosphor-icons/react";

const DEFAULT_FILTERS: MatchingFilterState = {
  companyType: "all",
  region: "all",
  process: "all",
  material: "all",
  verificationLevel: "all",
  certification: "all",
};

const CANONICAL_REQUIREMENT: BuyerRequirementForm = {
  partName: "CNC Stainless Steel Valve Body",
  category: "CNC Machining & Precision Milling",
  description: "5-axis precision CNC machined valve body in stainless steel SS316L for high-pressure fluid control, ±0.010 mm tolerance.",
  material: "Stainless Steel 316L (SS316L)",
  process: "5-Axis CNC Milling & Precision Turning",
  tolerance: "±0.010 mm",
  certificationsNeeded: ["ISO 9001:2015", "AS9100D"],
  qualityInspection: ["Dimensional CMM Report", "Material Test Certificate (MTR)"],
  quantity: "2,000",
  unit: "pcs / month",
  cadence: "monthly",
  currency: "INR",
  targetLeadTimeDays: "30-45 calendar days",
  deliveryCity: "Hamburg",
  deliveryCountry: "Germany",
  incoterm: "DDP",
  preferredSupplierRegion: "India (Western Hub)",
  isExport: true,
  documents: [],
  contact: {
    contactName: "Procurement Lead",
    workEmail: "procurement@client.com",
    companyName: "Industrial Flow Controls GmbH",
  },
};

import { Suspense } from "react";
import { useDemoMode } from "@/hooks/use-demo-mode";

function MatchingContent() {
  const { isDemo } = useDemoMode();
  // ── Active Requirement State ────────────────────────────────
  const [activeReq, setActiveReq] = useState<BuyerRequirementForm | null>(null);
  const [activeReqId, setActiveReqId] = useState<string>("REQ-2026-084");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("linksupplied_requirement_form");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.partName) {
          setActiveReq(parsed);
          setActiveReqId("REQ-2026-" + Math.floor(1000 + Math.random() * 9000));
          return;
        }
      }
    } catch {
      // ignore
    }

    if (isDemo) {
      setActiveReq(CANONICAL_REQUIREMENT);
      setActiveReqId("REQ-2026-084");
    } else {
      setActiveReq(null);
    }
  }, [isDemo]);

  // ── Modals & Drawer States ──────────────────────────────────
  const [selectedDossierCompany, setSelectedDossierCompany] = useState<Company | null>(null);
  const [selectedExplainableResult, setSelectedExplainableResult] = useState<MatchResult | null>(null);
  const [rfqTargetCompany, setRfqTargetCompany] = useState<Company | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // ── Filters & Sorting ───────────────────────────────────────
  const [filters, setFilters] = useState<MatchingFilterState>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<MatchingSortOption>("fit");

  // Build match results based on existing companies dataset
  const baseMatchResults: MatchResult[] = useMemo(() => {
    return companies.map((comp) => {
      // Find matching preset or construct explainable reasons
      const isPrecision = comp.id === "precisioncast";
      const isSteel = comp.id === "steelcraft";
      const isPkg = comp.id === "abc-packaging";

      return {
        company: comp,
        matchScore: isPrecision ? 94 : isPkg ? 92 : isSteel ? 86 : 78,
        reasons: isPrecision
          ? [
              "5-Axis CNC milling beds support valve housing envelope",
              "Direct inventory of Aerospace Billet 6061-T6 stocked",
              "±0.015 mm bore tolerances verified by Zeiss CMM laboratory",
              "AS9100D & IATF 16949 certificates audited",
            ]
          : isPkg
          ? [
              "High-speed automated packaging lines match required throughput",
              "Food & industrial packaging certifications on file",
              "Multi-layer barrier material capacity verified",
              "ISO 9001 & BRCGS packaging audit confirmed",
            ]
          : isSteel
          ? [
              "Heavy fabrication and CNC finishing lines available",
              "ISO 9001 certified plant in industrial corridor",
              "Competitive lead times for recurring monthly batches",
            ]
          : [
              "Manufacturing facility verified on-site",
              "Established container and component export experience",
            ],
      };
    });
  }, []);

  // Filter & sort
  const filteredMatches = useMemo(() => {
    return baseMatchResults
      .filter((res) => {
        const comp = res.company;

        if (filters.companyType !== "all" && comp.type !== filters.companyType) {
          return false;
        }

        if (filters.verificationLevel === "audited") {
          const hasPhysical = comp.verification.some(
            (v) => v.type.includes("Verified") || v.type.includes("Manufacturer")
          );
          if (!hasPhysical) return false;
        }

        if (filters.region !== "all") {
          const loc = (comp.location + " " + (comp.country || "")).toLowerCase();
          if (!loc.includes(filters.region.toLowerCase())) return false;
        }

        if (filters.certification !== "all") {
          if (!comp.certifications.some((c) => c.includes(filters.certification))) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "fit" || sortOption === "score") {
          return b.matchScore - a.matchScore;
        }
        if (sortOption === "capacity") {
          return (b.company.yearsInBusiness || 0) - (a.company.yearsInBusiness || 0);
        }
        return 0;
      });
  }, [baseMatchResults, filters, sortOption]);

  // Comparison selection toggler
  const handleToggleCompare = useCallback((companyId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      }
      if (prev.length >= 4) {
        alert("You can select up to 4 suppliers to compare.");
        return prev;
      }
      return [...prev, companyId];
    });
  }, []);

  const comparedCompanies = useMemo(() => {
    return companies.filter((c) => compareIds.includes(c.id));
  }, [compareIds]);

  if (!activeReq) {
    return (
      <div className="py-10 md:py-16 bg-paper min-h-screen">
        <div className="grid-page">
          <div className="col-content">
            <div className="bg-surface rounded-2xl border border-ink/[0.08] p-8 sm:p-12 text-center max-w-xl mx-auto my-12 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-full bg-copper/10 text-copper flex items-center justify-center mx-auto mb-2">
                <ArrowsLeftRight size={28} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2.5 py-1 rounded bg-copper/10">
                CAPABILITY MATCHING ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                No Active Sourcing Requirement
              </h3>
              <p className="text-xs sm:text-sm text-slate leading-relaxed">
                Submit your part specifications, tolerances, and batch volume once in Discover to algorithmically match verified manufacturing facilities and compare technical capabilities.
              </p>
              <div className="pt-2">
                <Button
                  href="/discover"
                  variant="primary"
                  size="md"
                  iconTrailing={<ArrowRight size={14} weight="bold" />}
                >
                  Submit a Requirement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content space-y-6">
          {/* ── 1. Sourcing Brief Header ───────────────────────── */}
          {activeReq && (
            <RequirementSummaryHeader
              referenceId={activeReqId}
              partName={activeReq.partName}
              category={activeReq.category}
              material={activeReq.material}
              quantity={activeReq.quantity}
              unit={activeReq.unit}
              tolerance={activeReq.tolerance}
              deliveryCity={activeReq.deliveryCity}
              deliveryCountry={activeReq.deliveryCountry}
              incoterm={activeReq.incoterm}
              status="Engineering Feasibility Confirmed"
              matchesCount={filteredMatches.length}
            />
          )}

          {/* ── 2. Sourcing Lifecycle Stepper ─────────────────── */}
          <MatchingLifecycleBanner currentStage={3} />

          {/* ── 3. Filters & Sorting Toolbar ───────────────────── */}
          <MatchingFilterToolbar
            filters={filters}
            sortOption={sortOption}
            onFilterChange={setFilters}
            onSortChange={setSortOption}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            totalMatches={filteredMatches.length}
          />

          {/* ── 4. Supplier Results Cards ──────────────────────── */}
          {filteredMatches.length === 0 ? (
            <MatchingEmptyState
              onResetFilters={() => setFilters(DEFAULT_FILTERS)}
              hasActiveFilters={
                filters.companyType !== "all" ||
                filters.region !== "all" ||
                filters.verificationLevel !== "all" ||
                filters.certification !== "all"
              }
            />
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((result) => (
                <SupplierMatchCard
                  key={result.company.id}
                  result={result}
                  isSelectedForCompare={compareIds.includes(result.company.id)}
                  onToggleCompare={handleToggleCompare}
                  onViewDossier={(comp) => setSelectedDossierCompany(comp)}
                  onRequestQuote={(comp) => setRfqTargetCompany(comp)}
                  onInspectExplainableFit={(res) => setSelectedExplainableResult(res)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Floating Side-by-Side Comparison Action Bar ───────── */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
          <div className="bg-ink text-surface rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 border border-silver/20">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-copper text-white font-mono text-xs font-bold flex items-center justify-center">
                {compareIds.length}
              </span>
              <div>
                <p className="text-xs font-bold text-surface">
                  {compareIds.length} Supplier{compareIds.length > 1 ? "s" : ""} Selected
                </p>
                <p className="text-[10px] text-silver/70">
                  Ready for side-by-side technical comparison
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCompareIds([])}
                className="text-silver/60 hover:text-surface hover:bg-white/10"
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setIsCompareModalOpen(true)}
                iconLeading={<ArrowsLeftRight size={14} />}
              >
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Comparison Matrix Modal ──────────────────────────── */}
      <SupplierComparisonModal
        companies={comparedCompanies}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveCompany={handleToggleCompare}
        onRequestQuote={(comp) => {
          setIsCompareModalOpen(false);
          setRfqTargetCompany(comp);
        }}
      />

      {/* ── Explainable Matching Drawer ──────────────────────── */}
      <ExplainableMatchDrawer
        result={selectedExplainableResult}
        onClose={() => setSelectedExplainableResult(null)}
        onRequestQuote={(companyId) => {
          const comp = companies.find((c) => c.id === companyId);
          if (comp) setRfqTargetCompany(comp);
        }}
      />

      {/* ── Supplier Profile / Capability Dossier Modal ──────── */}
      <BusinessProfilePreview
        company={selectedDossierCompany}
        onClose={() => setSelectedDossierCompany(null)}
      />

      {/* ── Request for Quote (RFQ) Modal ────────────────────── */}
      <RequestQuoteModal
        company={rfqTargetCompany}
        requirement={SOURCING_PRESETS[1].requirement}
        isOpen={Boolean(rfqTargetCompany)}
        onClose={() => setRfqTargetCompany(null)}
        onSubmitRFQ={() => {
          setRfqTargetCompany(null);
        }}
      />
    </div>
  );
}

export default function MatchingPage() {
  return (
    <RouteGate>
      <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading capability desk...</div>}>
        <MatchingContent />
      </Suspense>
    </RouteGate>
  );
}
