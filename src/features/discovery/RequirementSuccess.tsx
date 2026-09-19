"use client";

import { useState } from "react";
import type { RequirementSubmission } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  CheckCircle,
  Clock,
  DownloadSimple,
  PencilSimple,
  ArrowsClockwise,
  FileText,
  Factory,
  Check,
  ArrowRight,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";

interface RequirementSuccessProps {
  submission: RequirementSubmission;
  onEdit: () => void;
  onNew: () => void;
  onExploreBenchmarks?: () => void;
}

export function RequirementSuccess({
  submission,
  onEdit,
  onNew,
  onExploreBenchmarks,
}: RequirementSuccessProps) {
  const [downloaded, setDownloaded] = useState(false);
  const { requirement, referenceId, submittedAt, estimatedReviewHours } = submission;

  const handleDownloadDocket = () => {
    const docketText = `=====================================================
LINKSUPPLIED — SOURCING REQUIREMENT DOCKET
Reference ID: ${referenceId}
Status: Under Review (Engineering Sourcing Desk)
Submitted At: ${submittedAt}
=====================================================

1. GENERAL SCOPE
- Part / Component: ${requirement.partName}
- Category: ${requirement.category}
- Internal Reference: ${requirement.internalReference || "N/A"}
- Application: ${requirement.description}

2. TECHNICAL SPECIFICATIONS
- Material Grade: ${requirement.material}
- Manufacturing Process: ${requirement.process}
- Dimensions: ${requirement.dimensions || "N/A"}
- Precision Tolerance: ${requirement.tolerance}
- Surface Finishing: ${requirement.surfaceFinish || "Standard Machined"}
- Required Standards: ${requirement.certificationsNeeded.join(", ") || "None"}
- QA Inspections: ${requirement.qualityInspection.join(", ") || "Standard"}

3. COMMERCIAL & VOLUME
- Required Volume: ${requirement.quantity} ${requirement.unit}
- Cadence: ${requirement.cadence.toUpperCase()}
- Target Price: ${requirement.targetPrice ? `${requirement.currency} ${requirement.targetPrice}` : "Open / Market Competitive"}
- Target Lead Time: ${requirement.targetLeadTimeDays}

4. LOGISTICS & DELIVERY
- Destination Hub: ${requirement.deliveryCity}, ${requirement.deliveryCountry}
- Shipping Terms: Incoterms ${requirement.incoterm}
- Preferred Sourcing Region: ${requirement.preferredSupplierRegion}
- Export Requirement: ${requirement.isExport ? "Yes (Customs export registered)" : "No"}

5. ATTACHED SPECIFICATIONS
- Total Files: ${requirement.documents.length}
${requirement.documents.map((d) => `  * ${d.name} (${(d.sizeBytes / 1024).toFixed(1)} KB)`).join("\n")}

6. PROCUREMENT CONTACT
- Name: ${requirement.contact.contactName}
- Company: ${requirement.contact.companyName}
- Work Email: ${requirement.contact.workEmail}
- Phone: ${requirement.contact.phone || "N/A"}
- Role: ${requirement.contact.designation || "N/A"}

=====================================================
Verification Desk: sourcing@linksupplied.com
LINKSUPPLIED Platform — Confidential B2B Procurement
=====================================================`;

    const blob = new Blob([docketText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LINKSUPPLIED-${referenceId}-DOCKET.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* ── Top Confirmation Card ────────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-6 sm:p-8 shadow-xs text-center relative overflow-hidden">
        {/* Subtle accent bar on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper via-copper-muted to-copper" />

        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle size={32} weight="fill" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2.5 py-1 rounded bg-copper/10">
          REQUIREMENT RECEIVED · QUEUED FOR REVIEW
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-3">
          Requirement Docket Confirmed
        </h2>

        <p className="text-sm text-slate mt-2 max-w-[54ch] mx-auto leading-relaxed">
          Your sourcing brief has been registered with reference{" "}
          <strong className="font-mono text-ink font-semibold">{referenceId}</strong>.
          Our manufacturing engineering team is currently conducting feasibility analysis.
        </p>

        {/* Status Pill Card */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-paper border border-ink/[0.08] mt-6 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-slate uppercase text-[10px]">Current Status:</span>
            <span className="font-semibold text-ink">Under Engineering Review</span>
          </div>
          <span className="text-silver">|</span>
          <div className="flex items-center gap-1.5 text-slate">
            <Clock size={14} className="text-copper" />
            <span>Target Review SLA: {estimatedReviewHours} Hours</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7 pt-6 border-t border-ink/[0.06]">
          <Button
            href="/matching"
            variant="primary"
            size="md"
            iconLeading={<Factory size={15} />}
            iconTrailing={<ArrowRight size={13} weight="bold" />}
          >
            View Matching Suppliers
          </Button>

          <Button
            type="button"
            onClick={handleDownloadDocket}
            variant="outline"
            size="md"
            iconLeading={
              downloaded ? (
                <Check size={14} weight="bold" className="text-emerald-600" />
              ) : (
                <DownloadSimple size={14} />
              )
            }
          >
            {downloaded ? "Docket Downloaded" : "Download Sourcing Docket (.txt)"}
          </Button>

          <Button
            type="button"
            onClick={onEdit}
            variant="secondary"
            size="md"
            iconLeading={<PencilSimple size={14} />}
          >
            Edit Specs
          </Button>

          <Button
            type="button"
            onClick={onNew}
            variant="dark"
            size="md"
            iconLeading={<ArrowsClockwise size={14} />}
          >
            Submit Another Requirement
          </Button>
        </div>
      </div>

      {/* ── 4-Stage Truthful Fulfillment Lifecycle ───────────── */}
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-ink">
              What Happens Next?
            </h3>
            <p className="text-xs text-slate mt-0.5">
              LINKSUPPLIED’s verified matching workflow ensures you connect only with audited facilities capable of executing your tolerances.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/[0.04] text-slate">
            4-STAGE LIFECYCLE
          </span>
        </div>

        <div className="space-y-4">
          {/* Stage 1: Received */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={14} weight="bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-ink">01 · Requirement Received & Registered</p>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-semibold">
                  COMPLETED
                </span>
              </div>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">
                Your technical specifications, volume requirements, and CAD documentation have been safely received and indexed under Reference <span className="font-mono text-ink">{referenceId}</span>.
              </p>
            </div>
          </div>

          {/* Stage 2: Technical Feasibility */}
          <div className="flex items-start gap-3.5">
            <div className="w-7 h-7 rounded-full bg-copper text-white flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <span className="font-mono text-xs font-bold">2</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-ink">02 · Engineering & Feasibility Review</p>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-copper/10 text-copper font-semibold">
                  UNDER REVIEW · 24–48H SLA
                </span>
              </div>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">
                A LINKSUPPLIED sourcing engineer verifies manufacturing feasibility, machine bed capacity, material availability, and specified tolerance thresholds ({requirement.tolerance}).
              </p>
            </div>
          </div>

          {/* Stage 3: Capability Identification */}
          <div className="flex items-start gap-3.5 opacity-60">
            <div className="w-7 h-7 rounded-full bg-ink/[0.08] text-slate flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">03 · Capability Matching & Facility Qualification</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">
                We query our verified manufacturing network to isolate facilities possessing active capacity, required quality certifications ({requirement.certificationsNeeded.join(", ") || "ISO 9001"}), and adequate QA test apparatus.
              </p>
            </div>
          </div>

          {/* Stage 4: RFQ Dossiers */}
          <div className="flex items-start gap-3.5 opacity-60">
            <div className="w-7 h-7 rounded-full bg-ink/[0.08] text-slate flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
              4
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">04 · Curated Capability Dossiers & RFQ Delivery</p>
              <p className="text-xs text-slate mt-0.5 leading-relaxed">
                You will receive detailed facility dossiers, machine lists, audit histories, and direct commercial quotation pathways at <span className="text-ink font-medium">{requirement.contact.workEmail}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary Snapshot Docket ──────────────────────────── */}
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider font-mono flex items-center gap-1.5">
          <FileText size={15} className="text-copper" />
          Submitted Specification Snapshot
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Component
            </span>
            <span className="font-semibold text-ink mt-0.5 block truncate">
              {requirement.partName}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Material & Process
            </span>
            <span className="font-semibold text-ink mt-0.5 block truncate">
              {requirement.material} · {requirement.process}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Volume & SLA
            </span>
            <span className="font-semibold text-ink mt-0.5 block truncate">
              {requirement.quantity} {requirement.unit} ({requirement.targetLeadTimeDays})
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-slate/70 block">
              Destination
            </span>
            <span className="font-semibold text-ink mt-0.5 block truncate">
              {requirement.deliveryCity}, {requirement.deliveryCountry} ({requirement.incoterm})
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-ink/[0.06] flex items-center justify-between text-xs text-slate">
          <span>
            Contact: <strong className="text-ink font-semibold">{requirement.contact.contactName}</strong> ({requirement.contact.companyName})
          </span>
          <span>
            Notification sent to <strong className="text-ink font-semibold">{requirement.contact.workEmail}</strong>
          </span>
        </div>
      </div>

      {/* ── Capability Benchmark Explorer Teaser ─────────────── */}
      {onExploreBenchmarks && (
        <div className="bg-paper rounded-2xl border border-ink/[0.08] p-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate font-medium">
              Verified Benchmark Database
            </span>
            <SampleDataTag />
          </div>
          <h4 className="text-base font-bold text-ink">
            Explore Verified Manufacturing Facility Profiles
          </h4>
          <p className="text-xs text-slate max-w-[50ch] mx-auto">
            While your requirement is being qualified, inspect real factory dossiers, machinery audit records, and quality certifications in our benchmark directory.
          </p>
          <Button
            type="button"
            onClick={onExploreBenchmarks}
            variant="secondary"
            size="sm"
            className="mt-1"
            iconLeading={<Factory size={14} />}
            iconTrailing={<ArrowRight size={12} weight="bold" />}
          >
            Explore Capability Benchmarks
          </Button>
        </div>
      )}
    </div>
  );
}
