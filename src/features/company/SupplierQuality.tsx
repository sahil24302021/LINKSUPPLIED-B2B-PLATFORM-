"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  ShieldCheck,
  CheckCircle,
  Crosshair,
  Barcode,
  ClockCounterClockwise,
} from "@phosphor-icons/react";

interface SupplierQualityProps {
  company: Company;
}

export function SupplierQuality({ company }: SupplierQualityProps) {
  const qs = company.qualitySystem;

  if (!qs) return null;

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            QUALITY ASSURANCE & METROLOGY
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            Quality Inspection System & Metrology Apparatus
          </h2>
        </div>
        <SampleDataTag />
      </div>

      {/* 3-Stage Inspection Gates */}
      <div>
        <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
          <ShieldCheck size={15} className="text-copper" />
          Three-Tier Quality Control Gates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-ink/[0.08] bg-paper/50 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
              1
            </div>
            <div>
              <p className="font-bold text-ink">Incoming Material QC</p>
              <p className="text-[11px] text-slate/75 mt-0.5 leading-snug">
                100% Mill Test Certificate (MTR) verification & spectro chemical composition check before release to machine floor.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-ink/[0.08] bg-paper/50 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
              2
            </div>
            <div>
              <p className="font-bold text-ink">In-Process QC (IPQC)</p>
              <p className="text-[11px] text-slate/75 mt-0.5 leading-snug">
                First-piece inspection approval per shift change plus hourly statistical process control (SPC) dimensional logging.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-ink/[0.08] bg-paper/50 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[10px]">
              3
            </div>
            <div>
              <p className="font-bold text-ink">Final Pre-Dispatch QA</p>
              <p className="text-[11px] text-slate/75 mt-0.5 leading-snug">
                Automated CMM dimensional reports, surface finish roughness traces, and bubble-pack preservation audit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrology Inspection Equipment */}
      {qs.inspectionEquipment.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
            <Crosshair size={14} className="text-copper" />
            Metrology Laboratory Equipment ({qs.qcTeamSize} Dedicated QA Engineers)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {qs.inspectionEquipment.map((eq) => (
              <div
                key={eq}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-ink/[0.02] border border-ink/[0.06] text-xs text-ink font-medium"
              >
                <CheckCircle size={14} className="text-copper shrink-0" weight="fill" />
                <span>{eq}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calibration & Traceability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="p-3 rounded-xl border border-ink/[0.08] bg-paper/30 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate flex items-center gap-1">
            <ClockCounterClockwise size={12} className="text-copper" />
            Calibration Status
          </span>
          <p className="font-semibold text-ink">{qs.calibrationStatus}</p>
        </div>

        <div className="p-3 rounded-xl border border-ink/[0.08] bg-paper/30 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate flex items-center gap-1">
            <Barcode size={12} className="text-copper" />
            Material Traceability
          </span>
          <p className="font-semibold text-ink">{qs.traceabilitySystem}</p>
        </div>
      </div>
    </div>
  );
}
