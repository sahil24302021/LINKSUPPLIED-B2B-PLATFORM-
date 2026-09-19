"use client";

import type { BuyerRequirementForm } from "@/types";
import { INCOTERMS } from "./constants";
import type { ValidationErrors } from "./validation";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

interface Step4DeliveryProps {
  data: BuyerRequirementForm;
  onChange: (updates: Partial<BuyerRequirementForm>) => void;
  errors: ValidationErrors;
}

export function Step4Delivery({ data, onChange, errors }: Step4DeliveryProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 04 · LOGISTICS & GEOGRAPHY
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          Delivery Destination & Sourcing Geography
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Specify destination ports and Incoterms to evaluate freight logistics and verify export readiness.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Destination City / Port */}
          <FormField
            id="deliveryCity"
            label="Destination City / Port Hub"
            required
            helperText="Nearest port, dry port (ICD), or receiving facility location"
            error={errors.deliveryCity}
          >
            <Input
              id="deliveryCity"
              value={data.deliveryCity}
              onChange={(e) => onChange({ deliveryCity: e.target.value })}
              placeholder="e.g. Long Beach, CA or Hamburg, Germany"
              error={!!errors.deliveryCity}
            />
          </FormField>

          {/* Destination Country */}
          <FormField
            id="deliveryCountry"
            label="Destination Country"
            required
            helperText="Determines customs tariffs and compliance documentation"
            error={errors.deliveryCountry}
          >
            <Input
              id="deliveryCountry"
              value={data.deliveryCountry}
              onChange={(e) => onChange({ deliveryCountry: e.target.value })}
              placeholder="e.g. United States, Germany, India"
              error={!!errors.deliveryCountry}
            />
          </FormField>
        </div>

        {/* Incoterm Selection */}
        <div>
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">
            Target Commercial Shipping Term (Incoterms 2020) <span className="text-copper">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCOTERMS.map((term) => {
              const active = data.incoterm === term.code;
              return (
                <button
                  key={term.code}
                  type="button"
                  onClick={() => onChange({ incoterm: term.code })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? "bg-copper/[0.08] border-copper text-ink shadow-xs ring-1 ring-copper/30"
                      : "bg-paper/80 border-ink/[0.08] text-slate hover:border-ink/[0.2] hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-ink block">
                    {term.label}
                  </span>
                  <p className="text-[11px] text-slate/75 mt-1 leading-snug">
                    {term.desc}
                  </p>
                </button>
              );
            })}
          </div>
          {errors.incoterm && (
            <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
              <span aria-hidden="true">⚠</span>
              <span>{errors.incoterm}</span>
            </p>
          )}
        </div>

        {/* Preferred Supplier Region & Export Flag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <FormField
            id="supplierRegion"
            label="Preferred Supplier Manufacturing Region"
            helperText="Leave blank or enter &quot;Any&quot; for broadest capability matching"
          >
            <Input
              id="supplierRegion"
              value={data.preferredSupplierRegion}
              onChange={(e) => onChange({ preferredSupplierRegion: e.target.value })}
              placeholder="e.g. Western India, Southeast Asia, Any"
            />
          </FormField>

          <div className="flex items-center justify-between p-3.5 bg-paper/80 rounded-xl border border-ink/[0.08] mt-auto min-h-[44px]">
            <div>
              <p className="text-xs font-semibold text-ink">
                International Export Requirement
              </p>
              <p className="text-[11px] text-slate">
                Requires suppliers with active customs export registration & IEC
              </p>
            </div>
            <input
              type="checkbox"
              id="isExport"
              checked={data.isExport}
              onChange={(e) => onChange({ isExport: e.target.checked })}
              className="w-4 h-4 rounded text-copper focus:ring-copper accent-copper cursor-pointer ml-3 shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
