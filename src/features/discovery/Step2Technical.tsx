"use client";

import { useState } from "react";
import type { BuyerRequirementForm } from "@/types";
import { MANUFACTURING_PROCESSES, CERT_OPTIONS, QUALITY_INSPECTIONS } from "./constants";
import type { ValidationErrors } from "./validation";
import { FormField } from "@/components/ui/FormField";
import { Input, Select } from "@/components/ui/Input";
import { Check, ShieldCheck, Wrench, CaretDown } from "@phosphor-icons/react";

interface Step2TechnicalProps {
  data: BuyerRequirementForm;
  onChange: (updates: Partial<BuyerRequirementForm>) => void;
  errors: ValidationErrors;
}

export function Step2Technical({ data, onChange, errors }: Step2TechnicalProps) {
  // Count active advanced configurations
  const activeAdvancedCount =
    (data.dimensions ? 1 : 0) +
    (data.surfaceFinish ? 1 : 0) +
    (data.certificationsNeeded.length > 0 ? 1 : 0) +
    (data.qualityInspection.length > 0 ? 1 : 0) +
    (data.packagingRequirements ? 1 : 0);

  const [showAdvanced, setShowAdvanced] = useState(activeAdvancedCount > 0);

  const toggleCert = (cert: string) => {
    const exists = data.certificationsNeeded.includes(cert);
    const updated = exists
      ? data.certificationsNeeded.filter((c) => c !== cert)
      : [...data.certificationsNeeded, cert];
    onChange({ certificationsNeeded: updated });
  };

  const toggleInspection = (insp: string) => {
    const exists = data.qualityInspection.includes(insp);
    const updated = exists
      ? data.qualityInspection.filter((i) => i !== insp)
      : [...data.qualityInspection, insp];
    onChange({ qualityInspection: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            STEP 02 · TECHNICAL REQUIREMENTS
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          Engineering & Quality Specifications
        </h2>
        <p className="text-xs sm:text-sm text-slate mt-1 max-w-[68ch] leading-relaxed">
          Specify raw material grades, precision tolerances, and quality criteria to ensure machine capability compatibility.
        </p>
      </div>

      <div className="space-y-5">
        {/* Core Sourcing Parameters (Always Visible) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Base Material Grade */}
          <FormField
            id="material"
            label="Raw Material / Alloy Grade"
            required
            helperText="Specify exact alloy, temper, or polymer standard (e.g. AL 6061-T6, SS 316L)"
            error={errors.material}
          >
            <Input
              id="material"
              value={data.material}
              onChange={(e) => onChange({ material: e.target.value })}
              placeholder="e.g. AL 6061-T6, SS 304, EN8 Steel"
              error={!!errors.material}
            />
          </FormField>

          {/* Manufacturing Process */}
          <FormField
            id="process"
            label="Primary Manufacturing Process"
            required
            helperText="Directs matching to shops with verified equipment for this process"
            error={errors.process}
          >
            <Select
              id="process"
              value={data.process}
              onChange={(e) => onChange({ process: e.target.value })}
              error={!!errors.process}
            >
              {MANUFACTURING_PROCESSES.map((proc) => (
                <option key={proc} value={proc}>
                  {proc}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        {/* Precision Tolerance (Core Parameter) */}
        <FormField
          id="tolerance"
          label="Dimensional Tolerance"
          required
          helperText="Tightest tolerance required on critical dimensions (e.g. ±0.02 mm)"
          error={errors.tolerance}
        >
          <Input
            id="tolerance"
            value={data.tolerance}
            onChange={(e) => onChange({ tolerance: e.target.value })}
            placeholder="e.g. ±0.02 mm, ISO h9, or ISO 2768-m"
            error={!!errors.tolerance}
          />

          {/* Quick Tolerance Helper Presets */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[10px] font-mono uppercase text-slate/60 mr-1">
              Common Standards:
            </span>
            {[
              { label: "ISO h9 (±0.030 mm)", val: "ISO h9 (±0.030 mm)" },
              { label: "±0.010 mm (Precision)", val: "±0.010 mm" },
              { label: "±0.020 mm (Standard CNC)", val: "±0.020 mm" },
              { label: "±0.050 mm (Commercial)", val: "±0.050 mm" },
              { label: "ISO 2768-m", val: "ISO 2768-m" },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => onChange({ tolerance: p.val })}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface hover:bg-paper border border-ink/[0.08] text-slate hover:text-ink transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* ── Progressive Disclosure: Advanced Specifications ──────── */}
        <div className="pt-2 border-t border-ink/[0.06]">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-paper/80 hover:bg-paper border border-ink/[0.06] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-ink">
                Advanced Engineering & Quality Parameters
              </span>
              <span className="text-[11px] text-slate/70 font-mono hidden sm:inline">
                (Dimensions, surface finishing, ISO standards, packaging)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeAdvancedCount > 0 && (
                <span className="text-[10px] font-mono font-bold text-copper bg-copper/10 border border-copper/20 px-2 py-0.5 rounded-full">
                  {activeAdvancedCount} configured
                </span>
              )}
              <CaretDown
                size={14}
                weight="bold"
                className={`text-slate transition-transform duration-200 ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-paper/60 border border-ink/[0.06] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dimensions / Size */}
                <FormField
                  id="dimensions"
                  label="Key Dimensions / Envelope"
                  helperText="Maximum part envelope (e.g. 180mm × 140mm × 95mm)"
                >
                  <Input
                    id="dimensions"
                    value={data.dimensions || ""}
                    onChange={(e) => onChange({ dimensions: e.target.value })}
                    placeholder="e.g. 180mm x 140mm x 95mm or OD 45mm x 300mm"
                  />
                </FormField>

                {/* Surface Treatment / Finishing */}
                <FormField
                  id="surfaceFinish"
                  label="Surface Treatment / Secondary Finishing"
                  helperText="Required plating, anodizing, or heat treatment"
                >
                  <Input
                    id="surfaceFinish"
                    value={data.surfaceFinish || ""}
                    onChange={(e) => onChange({ surfaceFinish: e.target.value })}
                    placeholder="e.g. Hard Anodized 25µm Black, Passivation"
                  />
                </FormField>
              </div>

              {/* Quality Certifications */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-copper" />
                  Mandatory Supplier Quality Standards
                </label>
                <div className="flex flex-wrap gap-2">
                  {CERT_OPTIONS.map((cert) => {
                    const active = data.certificationsNeeded.includes(cert);
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCert(cert)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                          active
                            ? "bg-copper text-white border-copper shadow-xs"
                            : "bg-surface border-ink/[0.08] text-slate hover:text-ink hover:border-ink/[0.2]"
                        }`}
                      >
                        {active && <Check size={12} weight="bold" />}
                        {cert}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Inspection Reports */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench size={15} className="text-copper" />
                  Required Quality Verification Deliverables
                </label>
                <div className="flex flex-wrap gap-2">
                  {QUALITY_INSPECTIONS.map((insp) => {
                    const active = data.qualityInspection.includes(insp);
                    return (
                      <button
                        key={insp}
                        type="button"
                        onClick={() => toggleInspection(insp)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                          active
                            ? "bg-ink text-surface border-ink shadow-xs"
                            : "bg-surface border-ink/[0.08] text-slate hover:text-ink hover:border-ink/[0.2]"
                        }`}
                      >
                        {active && <Check size={12} weight="bold" />}
                        {insp}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Packaging Requirements */}
              <FormField
                id="packaging"
                label="Special Packaging / Export Preservation"
                helperText="Corrosion protection, cushioning, or palletization requirements"
              >
                <Input
                  id="packaging"
                  value={data.packagingRequirements || ""}
                  onChange={(e) => onChange({ packagingRequirements: e.target.value })}
                  placeholder="e.g. VCI anti-corrosive wrapping, individual cell packing"
                />
              </FormField>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step2Technical;
