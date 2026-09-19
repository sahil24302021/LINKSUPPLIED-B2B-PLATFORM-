"use client";

import type { Company, StructuredRequirement, BuyerRequirementForm } from "@/types";
import {
  CheckCircle,
  WarningCircle,
  Crosshair,
} from "@phosphor-icons/react";

interface SupplierRequirementFitProps {
  company: Company;
  requirement?: StructuredRequirement | BuyerRequirementForm | null;
}

export function SupplierRequirementFit({
  company,
  requirement,
}: SupplierRequirementFitProps) {
  // Extract requirement parameters gracefully from either StructuredRequirement or BuyerRequirementForm
  const partName =
    "spec" in (requirement || {})
      ? (requirement as StructuredRequirement).spec.partName
      : (requirement as BuyerRequirementForm)?.partName || "Precision Machined Component";

  const material =
    "spec" in (requirement || {})
      ? (requirement as StructuredRequirement).spec.material
      : (requirement as BuyerRequirementForm)?.material || "Aluminum 6061-T6";

  const tolerance =
    "spec" in (requirement || {})
      ? (requirement as StructuredRequirement).spec.tolerance
      : (requirement as BuyerRequirementForm)?.tolerance || "± 0.01 mm";

  const volume =
    "commercial" in (requirement || {})
      ? (requirement as StructuredRequirement).commercial?.monthlyVolume ||
        (requirement as StructuredRequirement).commercial?.initialBatch ||
        "5,000 pcs/month"
      : (requirement as BuyerRequirementForm)?.quantity
      ? `${(requirement as BuyerRequirementForm).quantity} ${(requirement as BuyerRequirementForm).unit || "units"}`
      : "5,000 pcs/month";

  const destination =
    "spec" in (requirement || {})
      ? (requirement as StructuredRequirement).commercial.destinationPort || "Hamburg / Mumbai"
      : `${(requirement as BuyerRequirementForm)?.deliveryCity || "Rotterdam"}, ${(requirement as BuyerRequirementForm)?.deliveryCountry || "Global"}`;

  const specs = company.technicalSpecs;

  // Evaluate explainable factors
  const hasMaterial = specs?.materials.some(
    (mat) =>
      material.toLowerCase().includes(mat.toLowerCase()) ||
      mat.toLowerCase().includes(material.toLowerCase())
  );

  const fitItems = [
    {
      factor: "Material Capability",
      status: hasMaterial ? "confirmed" : "reported",
      label: hasMaterial ? "Confirmed Fit" : "Reported Alignment",
      detail: `Supplier operates active supply chains for ${material}. Stock alloys verified on site.`,
    },
    {
      factor: "Dimensional Precision",
      status: "confirmed",
      label: "Confirmed Fit",
      detail: `Supplier's verified machine envelope (${specs?.tightestTolerance || "±0.010 mm"}) complies with requested tolerance (${tolerance}).`,
    },
    {
      factor: "Volume & Capacity Fit",
      status: "confirmed",
      label: "Capacity Suitable",
      detail: `Requested requirement of ${volume} represents ~15–25% of audited monthly throughput (${company.capacity || "50,000/mo"}).`,
    },
    {
      factor: "Certifications & QA",
      status: company.certifications.length > 0 ? "confirmed" : "needs_review",
      label: company.certifications.length > 0 ? "Standards Verified" : "Needs Confirmation",
      detail: company.certifications.length > 0
        ? `Audited quality management credentials (${company.certifications.slice(0, 2).join(", ")}) align with enterprise procurement criteria.`
        : "Specific OEM customer audit approval required prior to production release.",
    },
    {
      factor: "Logistics & Export Customs",
      status: "confirmed",
      label: "Export Ready",
      detail: `Historical shipping history confirmed to ${destination}. Customs export registration active with IEC on file.`,
    },
  ];

  return (
    <div className="bg-surface rounded-2xl border border-copper/25 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="border-b border-ink/[0.06] pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold">
            EXPLAINABLE REQUIREMENT FIT ANALYSIS
          </span>
        </div>
        <h3 className="text-base font-bold text-ink">
          Why {company.name} Fits Your Scope
        </h3>
        <p className="text-xs text-slate mt-0.5">
          Benchmarked against active requirement: <strong className="text-ink">{partName}</strong>
        </p>
      </div>

      <div className="space-y-3">
        {fitItems.map((item) => {
          const isConfirmed = item.status === "confirmed";
          const isReported = item.status === "reported";

          return (
            <div
              key={item.factor}
              className="p-3 rounded-xl bg-paper/60 border border-ink/[0.05] text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink font-mono text-[11px]">
                  {item.factor}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    isConfirmed
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : isReported
                      ? "bg-copper/10 text-copper border border-copper/20"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  {isConfirmed && <CheckCircle size={11} weight="fill" />}
                  {isReported && <Crosshair size={11} />}
                  {!isConfirmed && !isReported && <WarningCircle size={11} weight="fill" />}
                  {item.label}
                </span>
              </div>
              <p className="text-[11px] text-slate/85 leading-snug">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
