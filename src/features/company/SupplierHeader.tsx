"use client";

import type { Company } from "@/types";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { VerificationBadge } from "@/features/verification/VerificationBadge";
import {
  MapPin,
  Buildings,
  Factory,
  Warehouse,
  Globe,
  CalendarDots,
  PaperPlaneTilt,
  ArrowSquareOut,
  Clock,
} from "@phosphor-icons/react";

interface SupplierHeaderProps {
  company: Company;
  onRequestQuote: () => void;
  onSendInquiry?: () => void;
}

export function SupplierHeader({
  company,
  onRequestQuote,
  onSendInquiry,
}: SupplierHeaderProps) {
  const isManufacturer = company.type === "manufacturer";
  const isDistributor = company.type === "distributor";

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs relative overflow-hidden">
      {/* Top Accent Strip */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isManufacturer
            ? "bg-copper"
            : isDistributor
            ? "bg-amber-500"
            : "bg-indigo-600"
        }`}
      />

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Company Identity */}
        <div className="space-y-3 max-w-2xl">
          {/* Classification Pill & Sample Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                isManufacturer
                  ? "bg-copper/10 text-copper border border-copper/25"
                  : isDistributor
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-indigo-50 text-indigo-700 border border-indigo-200"
              }`}
            >
              {isManufacturer ? (
                <>
                  <Factory size={14} weight="fill" />
                  <span>VERIFIED MANUFACTURER</span>
                </>
              ) : isDistributor ? (
                <>
                  <Warehouse size={14} weight="fill" />
                  <span>DISTRIBUTOR / WAREHOUSE STOCKIST</span>
                </>
              ) : (
                <>
                  <Buildings size={14} weight="fill" />
                  <span>SOURCING & TRADE SUPPLIER</span>
                </>
              )}
            </span>

            <SampleDataTag />

            {company.verifiedAuditDate && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate/70">
                <Clock size={12} className="text-copper" />
                <span>Audited {company.verifiedAuditDate}</span>
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              {company.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-1 text-ink font-medium">
                <MapPin size={13} className="text-copper" weight="bold" />
                {company.location}
              </span>
              {company.plantAreaSqFt && (
                <>
                  <span className="text-silver">·</span>
                  <span className="text-slate/80">{company.plantAreaSqFt}</span>
                </>
              )}
              {company.yearsInBusiness && (
                <>
                  <span className="text-silver">·</span>
                  <span className="text-slate/80 flex items-center gap-1">
                    <CalendarDots size={12} />
                    {company.yearsInBusiness} Years Operating (Sample)
                  </span>
                </>
              )}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate leading-relaxed pt-1">
            {company.description}
          </p>

          {/* Verification Badges */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {company.verification.map((v) => (
              <VerificationBadge key={v.type} verification={v} compact />
            ))}
          </div>
        </div>

        {/* Action Panel on Right */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0 lg:w-56 pt-2 lg:pt-0 border-t lg:border-t-0 border-ink/[0.06]">
          <Button
            type="button"
            onClick={onRequestQuote}
            variant="primary"
            size="lg"
            className="w-full"
            iconLeading={<PaperPlaneTilt size={16} weight="bold" />}
          >
            Request a Quote
          </Button>

          {onSendInquiry && (
            <Button
              type="button"
              onClick={onSendInquiry}
              variant="secondary"
              size="md"
              className="w-full"
            >
              Send Technical Inquiry
            </Button>
          )}

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-slate hover:text-copper transition-colors py-1"
            >
              <Globe size={13} />
              <span>Official Website</span>
              <ArrowSquareOut size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
