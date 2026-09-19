"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";


interface SupplierCapacityProps {
  company: Company;
}

export function SupplierCapacity({ company }: SupplierCapacityProps) {
  const cap = company.capacityDetails;

  if (!cap) {
    return (
      <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-6 shadow-xs space-y-2">
        <h2 className="text-base font-bold text-ink">Production Capacity</h2>
        <p className="text-xs text-slate">
          Reported base capacity: <strong className="text-ink">{company.capacity || "Upon RFQ"}</strong>. Detailed machine hours and shift logs under verification.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            OPERATIONAL CAPACITY & THROUGHPUT
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            Production Capacity & Lead Time
          </h2>
        </div>
        <SampleDataTag />
      </div>

      {/* 3-Tier Capacity Cards (Reported vs Verified vs Open) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-ink/[0.08] bg-paper/50">
          <span className="text-[10px] font-mono uppercase text-slate block mb-1">
            Reported Capacity
          </span>
          <span className="text-base font-bold text-ink block font-mono">
            {cap.reportedMonthly}
          </span>
          <span className="text-[11px] text-slate/70 mt-1 block">
            Self-declared maximum operating threshold
          </span>
        </div>

        {cap.verifiedMonthly && (
          <div className="p-4 rounded-xl border border-copper/30 bg-copper/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase text-copper font-bold">
                Audited Baseline
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            </div>
            <span className="text-base font-bold text-ink block font-mono">
              {cap.verifiedMonthly}
            </span>
            <span className="text-[11px] text-slate/70 mt-1 block">
              Validated during facility run-rate audit
            </span>
          </div>
        )}

        {cap.availableMonthly && (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">
                Estimated Open Slot
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>
            <span className="text-base font-bold text-ink block font-mono">
              {cap.availableMonthly}
            </span>
            <span className="text-[11px] text-slate/70 mt-1 block">
              Immediate machine bed availability window
            </span>
          </div>
        )}
      </div>

      {/* Lead Times & Shifts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs border-t border-ink/[0.06]">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Minimum Order Qty (MOQ)
          </span>
          <span className="font-semibold text-ink mt-0.5 block">
            {cap.standardMoq}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Prototype / Tooling SLA
          </span>
          <span className="font-semibold text-ink mt-0.5 block">
            {cap.prototypeLeadTimeDays}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Production Ramp Lead Time
          </span>
          <span className="font-semibold text-ink mt-0.5 block">
            {cap.productionLeadTimeDays}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Work Shifts
          </span>
          <span className="font-semibold text-ink mt-0.5 block">
            {cap.shifts}
          </span>
        </div>
      </div>
    </div>
  );
}
