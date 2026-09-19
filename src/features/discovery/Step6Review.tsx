"use client";

import type { BuyerRequirementForm } from "@/types";
import type { ValidationErrors } from "./validation";
import {
  PencilSimple,
  FileText,
  Factory,
  Package,
  CalendarCheck,
  Lock,
} from "@phosphor-icons/react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Step6ReviewProps {
  data: BuyerRequirementForm;
  onChange: (updates: Partial<BuyerRequirementForm>) => void;
  onJumpToStep: (step: number) => void;
  errors: ValidationErrors;
}

export function Step6Review({
  data,
  onChange,
  onJumpToStep,
  errors,
}: Step6ReviewProps) {
  const updateContact = (field: keyof BuyerRequirementForm["contact"], value: string) => {
    onChange({
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 06 · REVIEW & SUBMIT
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink">
          Review Sourcing Requirement Summary
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Verify your engineering specifications and provide your enterprise contact details for procurement qualification.
        </p>
      </div>

      {/* Comprehensive Requirement Summary Docket */}
      <div className="bg-surface rounded-2xl border border-ink/[0.08] shadow-xs overflow-hidden">
        {/* Docket Header */}
        <div className="p-5 sm:p-6 bg-paper/60 border-b border-ink/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
                Structured Engineering Brief
              </span>
              {data.internalReference && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/[0.04] text-slate font-medium">
                  {data.internalReference}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
              {data.partName || "Untitled Component"}
            </h3>
            <p className="text-xs text-slate mt-0.5">{data.category}</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-copper/10 text-copper font-semibold">
              {data.incoterm}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-ink/[0.04] text-slate font-medium">
              {data.cadence.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Docket Content Sections */}
        <div className="divide-y divide-ink/[0.06] text-xs">
          {/* Section 1: Scope & Application */}
          <div className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-ink uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <FileText size={14} className="text-copper" />
                Scope & Intended Application
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onJumpToStep(1)}
                iconLeading={<PencilSimple size={12} />}
                className="h-7 px-2 text-xs text-copper hover:text-copper-muted"
              >
                Edit
              </Button>
            </div>
            <p className="text-slate leading-relaxed">
              {data.description || "No description provided"}
            </p>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-ink uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Factory size={14} className="text-copper" />
                Technical & Tolerancing Specifications
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onJumpToStep(2)}
                iconLeading={<PencilSimple size={12} />}
                className="h-7 px-2 text-xs text-copper hover:text-copper-muted"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Material Grade
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.material || "—"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Manufacturing Process
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.process || "—"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Tolerance Threshold
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.tolerance || "—"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Surface Treatment
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.surfaceFinish || "Standard Machined"}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-slate">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block mb-1">
                  Required Standards
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.certificationsNeeded.length > 0 ? (
                    data.certificationsNeeded.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-0.5 rounded bg-ink/[0.04] text-ink font-medium"
                      >
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate/60 font-mono">None specified</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block mb-1">
                  Inspection Deliverables
                </span>
                <div className="flex flex-wrap gap-1">
                  {data.qualityInspection.length > 0 ? (
                    data.qualityInspection.map((i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-copper/10 text-copper font-medium"
                      >
                        {i}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate/60 font-mono">Standard QA</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Commercial Terms & Delivery */}
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-ink uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <CalendarCheck size={14} className="text-copper" />
                Commercial Terms & Logistics
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onJumpToStep(3)}
                iconLeading={<PencilSimple size={12} />}
                className="h-7 px-2 text-xs text-copper hover:text-copper-muted"
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Batch Volume
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.quantity} {data.unit}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Target Price / Unit
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.targetPrice
                    ? `${data.currency} ${data.targetPrice}`
                    : "Market Competitive"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Lead Time Expectation
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.targetLeadTimeDays}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate/70 block">
                  Destination Port
                </span>
                <span className="font-semibold text-ink mt-0.5 block">
                  {data.deliveryCity}, {data.deliveryCountry}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Attached Files */}
          <div className="p-5 sm:p-6 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-ink uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Package size={14} className="text-copper" />
                Attached Technical Documentation ({data.documents.length})
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onJumpToStep(5)}
                iconLeading={<PencilSimple size={12} />}
                className="h-7 px-2 text-xs text-copper hover:text-copper-muted"
              >
                Edit
              </Button>
            </div>

            {data.documents.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.documents.map((d) => (
                  <span
                    key={d.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-paper border border-ink/[0.08] text-ink font-mono text-[11px]"
                  >
                    <FileText size={13} className="text-copper" />
                    {d.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate/60 text-xs italic">
                No CAD or specification files attached. You may upload them later after qualification.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Enterprise Contact Information (Required for real follow-up) */}
      <Card level="supporting" className="p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider font-mono">
            Procurement Contact Details
          </h3>
          <p className="text-xs text-slate mt-0.5">
            LINKSUPPLIED’s technical sourcing desk uses these credentials to deliver qualified capability dossiers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="contactName"
            label="Full Name"
            required
            error={errors.contactName}
          >
            <Input
              id="contactName"
              value={data.contact.contactName}
              onChange={(e) => updateContact("contactName", e.target.value)}
              placeholder="e.g. David Sterling"
              error={Boolean(errors.contactName)}
            />
          </FormField>

          <FormField
            id="workEmail"
            label="Corporate Work Email"
            required
            error={errors.workEmail}
          >
            <Input
              id="workEmail"
              type="email"
              value={data.contact.workEmail}
              onChange={(e) => updateContact("workEmail", e.target.value)}
              placeholder="e.g. d.sterling@company.com"
              error={Boolean(errors.workEmail)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            id="companyName"
            label="Company / Entity Name"
            required
            error={errors.companyName}
          >
            <Input
              id="companyName"
              value={data.contact.companyName}
              onChange={(e) => updateContact("companyName", e.target.value)}
              placeholder="e.g. AeroHydraulics Corp"
              error={Boolean(errors.companyName)}
            />
          </FormField>

          <FormField
            id="designation"
            label="Role / Designation"
            helperText="Optional"
          >
            <Input
              id="designation"
              value={data.contact.designation || ""}
              onChange={(e) => updateContact("designation", e.target.value)}
              placeholder="e.g. Sourcing Manager"
            />
          </FormField>

          <FormField
            id="phone"
            label="Direct Phone"
            helperText="Optional"
          >
            <Input
              id="phone"
              type="tel"
              value={data.contact.phone || ""}
              onChange={(e) => updateContact("phone", e.target.value)}
              placeholder="e.g. +1 (555) 019-2834"
            />
          </FormField>
        </div>
      </Card>

      {/* Truthful Process Notice */}
      <div className="bg-copper/[0.06] border border-copper/15 rounded-xl p-4 flex items-start gap-3 text-xs text-slate">
        <Lock size={18} className="text-copper shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink font-semibold">Human-in-the-Loop Qualification Process:</strong> Every submitted brief is verified by LINKSUPPLIED sourcing engineers to prevent frivolous bids. Your requirement will enter the review queue, and verified manufacturing capability dossiers will be curated specifically for your technical tolerances.
        </p>
      </div>
    </div>
  );
}
