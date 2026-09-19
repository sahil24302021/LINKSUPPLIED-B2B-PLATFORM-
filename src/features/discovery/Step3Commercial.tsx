"use client";

import type { BuyerRequirementForm, CadenceOption, CurrencyOption } from "@/types";
import { QUANTITY_UNITS } from "./constants";
import type { ValidationErrors } from "./validation";
import { FormField } from "@/components/ui/FormField";
import { Input, Select } from "@/components/ui/Input";
import { Info, CalendarCheck } from "@phosphor-icons/react";

interface Step3CommercialProps {
  data: BuyerRequirementForm;
  onChange: (updates: Partial<BuyerRequirementForm>) => void;
  errors: ValidationErrors;
}

const CADENCE_OPTIONS: { id: CadenceOption; label: string; desc: string }[] = [
  { id: "one-time", label: "One-time Pilot Order", desc: "Single batch order or prototype run" },
  { id: "monthly", label: "Monthly Recurring", desc: "Consistent monthly production release" },
  { id: "quarterly", label: "Quarterly Release", desc: "Batched orders every 3 months" },
  { id: "annual", label: "Annual Contract", desc: "Long-term blanket purchase agreement" },
];

export function Step3Commercial({ data, onChange, errors }: Step3CommercialProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 03 · QUANTITY & COMMERCIAL
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          Volume & Commercial Expectations
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Production volume determines factory tier compatibility, tooling amortization, and minimum order quantities (MOQs).
        </p>
      </div>

      <div className="space-y-5">
        {/* Quantity and Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="quantity"
            label="Required Batch / Order Volume"
            required
            helperText="Expected production volume per release (e.g. 5,000)"
            error={errors.quantity}
          >
            <Input
              id="quantity"
              value={data.quantity}
              onChange={(e) => onChange({ quantity: e.target.value })}
              placeholder="e.g. 5,000 or 50,000"
              error={!!errors.quantity}
            />
          </FormField>

          <FormField
            id="unit"
            label="Unit of Measure"
            required
            helperText="Base physical metric for quotation pricing"
            error={errors.unit}
          >
            <Select
              id="unit"
              value={data.unit}
              onChange={(e) => onChange({ unit: e.target.value })}
              error={!!errors.unit}
            >
              {QUANTITY_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        {/* Cadence Selector */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CalendarCheck size={15} className="text-copper" />
            Requirement Cadence & Release Schedule
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {CADENCE_OPTIONS.map((c) => {
              const active = data.cadence === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onChange({ cadence: c.id })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? "bg-copper/[0.08] border-copper text-ink shadow-xs ring-1 ring-copper/30"
                      : "bg-paper/80 border-ink/[0.08] text-slate hover:border-ink/[0.2] hover:text-ink"
                  }`}
                >
                  <p className="text-xs font-semibold text-ink">{c.label}</p>
                  <p className="text-[11px] text-slate/70 mt-1 leading-snug">
                    {c.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Price & Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="targetPrice"
            label="Target Price / Unit"
            helperText="Helps filter out suppliers outside your commercial feasibility range"
          >
            <div className="flex rounded-lg overflow-hidden border border-ink/[0.12] focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/15 bg-paper transition-all h-11 min-h-[44px]">
              <select
                value={data.currency}
                onChange={(e) => onChange({ currency: e.target.value as CurrencyOption })}
                className="px-3 bg-ink/[0.04] border-r border-ink/[0.1] text-xs font-mono font-semibold text-ink outline-none cursor-pointer"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
              <input
                id="targetPrice"
                type="text"
                value={data.targetPrice || ""}
                onChange={(e) => onChange({ targetPrice: e.target.value })}
                placeholder="e.g. 350 or 2500"
                className="w-full px-3.5 bg-paper text-sm text-ink placeholder:text-silver/80 outline-none"
              />
            </div>
          </FormField>

          <FormField
            id="leadTime"
            label="Target Lead Time / First Delivery"
            required
            helperText="Maximum turnaround time acceptable for production ramp"
            error={errors.targetLeadTimeDays}
          >
            <Input
              id="leadTime"
              value={data.targetLeadTimeDays}
              onChange={(e) => onChange({ targetLeadTimeDays: e.target.value })}
              placeholder="e.g. 45-60 calendar days"
              error={!!errors.targetLeadTimeDays}
            />
          </FormField>
        </div>

        {/* Volume guidance note */}
        <div className="bg-paper/80 border border-ink/[0.06] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate">
          <Info size={17} className="text-copper shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-ink font-semibold">Capacity Matching Note:</strong> Approximate recurring volume allows LINKSUPPLIED to filter out suppliers whose minimum tooling run exceeds your scope, or whose shop floor capacity cannot sustain your production ramp.
          </p>
        </div>
      </div>
    </div>
  );
}
