"use client";

import { useState } from "react";
import type { Company, StructuredRequirement, BuyerRequirementForm } from "@/types";
import { Button } from "@/components/ui/Button";
import { SupplierHeader } from "./SupplierHeader";
import { SupplierCapabilitySummary } from "./SupplierCapabilitySummary";
import { SupplierMachinery } from "./SupplierMachinery";
import { SupplierCapacity } from "./SupplierCapacity";
import { SupplierQuality } from "./SupplierQuality";
import { SupplierCertifications } from "./SupplierCertifications";
import { SupplierVerification } from "./SupplierVerification";
import { SupplierEvidence } from "./SupplierEvidence";
import { SupplierRequirementFit } from "./SupplierRequirementFit";
import { SupplierStickyActionRail } from "./SupplierStickyActionRail";
import { PaperPlaneTilt } from "@phosphor-icons/react";

interface SupplierProfileDossierProps {
  company: Company;
  requirement?: StructuredRequirement | BuyerRequirementForm | null;
  onRequestQuote: () => void;
  onSendInquiry?: () => void;
}

type DossierSection = "overview" | "capabilities" | "operations" | "quality" | "verification";

const DOSSIER_TABS: { id: DossierSection; label: string }[] = [
  { id: "overview", label: "Executive Overview" },
  { id: "capabilities", label: "Capabilities & Machinery" },
  { id: "operations", label: "Capacity & Operations" },
  { id: "quality", label: "Quality & Standards" },
  { id: "verification", label: "Verification & Evidence" },
];

export function SupplierProfileDossier({
  company,
  requirement,
  onRequestQuote,
  onSendInquiry,
}: SupplierProfileDossierProps) {
  const [activeTab, setActiveTab] = useState<DossierSection>("overview");

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* 1. Header Banner */}
      <SupplierHeader
        company={company}
        onRequestQuote={onRequestQuote}
        onSendInquiry={onSendInquiry}
      />

      {/* In-Page Navigation Bar */}
      <div className="sticky top-[61px] z-30 bg-paper/95 backdrop-blur-md py-2 border-y border-ink/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {DOSSIER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-ink text-surface shadow-xs font-semibold"
                    : "bg-surface border border-ink/[0.08] text-slate hover:text-ink hover:border-ink/[0.2]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Main Dossier Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* ── TAB 1: Executive Overview (10-15s Scan) ─────────── */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Top Decision Matrix: WHO, WHAT, CAN THEY DO MY JOB, TRUST, WHAT NEXT */}
              <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-ink/[0.06]">
                  <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
                    EXECUTIVE PROCUREMENT SNAPSHOT
                  </span>
                  <span className="text-[10px] font-mono text-slate/70">
                    10-Second Decision View
                  </span>
                </div>

                {/* 1. WHO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-paper border border-ink/[0.04] space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate/60 block font-semibold">
                      1. Who They Are
                    </span>
                    <p className="font-bold text-ink text-sm">{company.name}</p>
                    <p className="text-xs text-slate">
                      {company.type === "manufacturer" ? "Verified Manufacturer" : "Stockist / Distributor"} · {company.yearsInBusiness ? `${company.yearsInBusiness} Years in Business` : "Established Plant"}
                    </p>
                    <p className="text-[11px] text-slate/80 mt-1">
                      {company.city || company.location}, {company.country} {company.plantAreaSqFt ? `· ${company.plantAreaSqFt}` : ""}
                    </p>
                  </div>

                  {/* 2. WHAT */}
                  <div className="p-3.5 rounded-xl bg-paper border border-ink/[0.04] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate/60 font-semibold">
                        2. What They Make
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("capabilities")}
                        className="text-[10px] text-copper hover:underline font-semibold"
                      >
                        View Equipment →
                      </button>
                    </div>
                    <p className="font-bold text-ink text-xs truncate">
                      {company.technicalSpecs?.processes.join(", ") || company.products.join(", ")}
                    </p>
                    <p className="text-xs text-slate">
                      Materials: <strong className="text-ink">{company.technicalSpecs?.materials.slice(0, 3).join(", ") || "Carbon & Alloy Steel"}</strong>
                    </p>
                    <p className="text-[11px] text-slate/80">
                      Tightest Tolerance: <strong className="text-emerald-700 font-mono">{company.technicalSpecs?.tightestTolerance || "±0.015 mm"}</strong>
                    </p>
                  </div>
                </div>

                {/* 3. CAN THEY DO MY JOB? & 4. CAN I TRUST THE CLAIMS? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-paper border border-ink/[0.04] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate/60 font-semibold">
                        3. Requirement Fit
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                        High Alignment
                      </span>
                    </div>
                    <p className="font-bold text-ink text-xs">Feasible Machine Envelope</p>
                    <p className="text-xs text-slate">
                      Monthly Capacity: <strong className="text-ink">{company.capacityDetails?.reportedMonthly || company.capacity || "15 MT/month"}</strong>
                    </p>
                    <p className="text-[11px] text-slate/80">
                      Standard MOQ: <strong className="text-ink">{company.capacityDetails?.standardMoq || company.moq || "500 units"}</strong> · Lead Time: {company.capacityDetails?.productionLeadTimeDays || "30 days"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-paper border border-ink/[0.04] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate/60 font-semibold">
                        4. Verification Trust
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab("verification")}
                        className="text-[10px] text-copper hover:underline font-semibold"
                      >
                        Inspect Verification →
                      </button>
                    </div>
                    <p className="font-bold text-emerald-700 text-xs flex items-center gap-1">
                      Facility Physically Audited
                    </p>
                    <p className="text-xs text-slate">
                      4 of 6 Layers Confirmed by Engineering Desk
                    </p>
                    <p className="text-[11px] text-slate/80">
                      Audit Date: {company.verifiedAuditDate || "2026-06-12"} · Certs: {company.certifications.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </div>

                {/* 5. WHAT NEXT? */}
                <div className="p-4 rounded-xl bg-copper/5 border border-copper/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-copper font-bold block mb-0.5">
                      5. Next Procurement Step
                    </span>
                    <p className="font-bold text-ink text-xs">
                      Ready to request a formal quotation or dispatch engineering drawing?
                    </p>
                    <p className="text-[11px] text-slate">
                      Direct connection with verified factory plant manager · Average response under 48 hours.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onRequestQuote}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-copper hover:bg-copper-muted text-surface text-xs font-semibold tracking-wide shadow-xs shrink-0 cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>

              {/* Requirement Fit Section */}
              <SupplierRequirementFit
                company={company}
                requirement={requirement}
              />
            </div>
          )}

          {/* Capabilities & Machinery */}
          {activeTab === "capabilities" && (
            <>
              <SupplierCapabilitySummary company={company} />
              <SupplierMachinery company={company} />
            </>
          )}

          {/* Capacity & Operations */}
          {activeTab === "operations" && (
            <SupplierCapacity company={company} />
          )}

          {/* Quality & Standards */}
          {activeTab === "quality" && (
            <>
              <SupplierQuality company={company} />
              <SupplierCertifications company={company} />
            </>
          )}

          {/* Verification & Evidence */}
          {activeTab === "verification" && (
            <>
              <SupplierVerification company={company} />
              <SupplierEvidence company={company} />
            </>
          )}
        </div>

        {/* Right / Sticky Context Rail (4 cols) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-36 space-y-6">
          {/* Requirement Fit (Desktop) */}
          {activeTab !== "overview" && (
            <SupplierRequirementFit
              company={company}
              requirement={requirement}
            />
          )}

          {/* Sticky RFQ Action Rail */}
          <SupplierStickyActionRail
            company={company}
            onRequestQuote={onRequestQuote}
            onSendInquiry={onSendInquiry}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-surface/95 backdrop-blur-md border-t border-ink/[0.08] z-40 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <p className="text-xs font-bold text-ink truncate">{company.name}</p>
          <p className="text-[10px] font-mono text-copper capitalize">
            {company.type} · {company.location}
          </p>
        </div>

        <Button
          type="button"
          onClick={onRequestQuote}
          variant="primary"
          size="sm"
          className="shrink-0"
          iconLeading={<PaperPlaneTilt size={14} weight="bold" />}
        >
          Request Quote
        </Button>
      </div>
    </div>
  );
}

export default SupplierProfileDossier;
