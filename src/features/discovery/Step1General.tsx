"use client";

import type { BuyerRequirementForm } from "@/types";
import { CATEGORIES } from "./constants";
import type { ValidationErrors } from "./validation";
import { FormField } from "@/components/ui/FormField";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Info } from "@phosphor-icons/react";

interface Step1GeneralProps {
  data: BuyerRequirementForm;
  onChange: (updates: Partial<BuyerRequirementForm>) => void;
  errors: ValidationErrors;
}

export function Step1General({ data, onChange, errors }: Step1GeneralProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 01 · GENERAL SCOPE
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          What are you looking to manufacture?
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Describe your component or assembly in plain language. LINKSUPPLIED categorizes requirements to match verified production facilities.
        </p>
      </div>

      <div className="space-y-4">
        {/* Component Name */}
        <FormField
          id="partName"
          label="Product / Component Name"
          required
          helperText="Example: Stainless steel valve spindle, 5-Axis hydraulic manifold, Cosmetic glass bottle"
          error={errors.partName}
        >
          <Input
            id="partName"
            value={data.partName}
            onChange={(e) => onChange({ partName: e.target.value })}
            placeholder="e.g. 5-Axis CNC Hydraulic Manifold Block"
            error={!!errors.partName}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Manufacturing Category */}
          <FormField
            id="category"
            label="Manufacturing Category"
            required
            helperText="Directs your brief to specialized machine shops"
            error={errors.category}
          >
            <Select
              id="category"
              value={data.category}
              onChange={(e) => onChange({ category: e.target.value })}
              error={!!errors.category}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </FormField>

          {/* Internal Reference / Part Code */}
          <FormField
            id="internalRef"
            label="Internal Part # / Sourcing Ref"
            helperText="Optional reference for your internal purchase tracking"
          >
            <Input
              id="internalRef"
              value={data.internalReference || ""}
              onChange={(e) => onChange({ internalReference: e.target.value })}
              placeholder="e.g. PR-2026-ENG-4029"
            />
          </FormField>
        </div>

        {/* Description & Intended Application */}
        <FormField
          id="description"
          label="Requirement Description & Functional Context"
          required
          helperText="Describe operating environment, mechanical load, mating parts, or pressure ratings"
          error={errors.description}
        >
          <Textarea
            id="description"
            rows={3}
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe where and how this part will be deployed (e.g. high-pressure hydraulic manifold for mobile crane steering, must withstand 350 bar operating pressure with zero internal porosity)."
            error={!!errors.description}
          />
        </FormField>

        {/* Helpful Hint Card */}
        <div className="bg-paper/80 border border-ink/[0.06] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate">
          <Info size={17} className="text-copper shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-ink font-semibold">Tip for precision matching:</strong> You do not need proprietary catalog jargon. A clear statement of mechanical function, working pressure, or mating tolerances enables our deterministic engine to filter machine beds capable of holding your dimensions.
          </p>
        </div>
      </div>
    </div>
  );
}
