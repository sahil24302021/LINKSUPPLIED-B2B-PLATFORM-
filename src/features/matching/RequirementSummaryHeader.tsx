"use client";

import Link from "next/link";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { PencilSimple, PlusCircle } from "@phosphor-icons/react";

interface RequirementSummaryHeaderProps {
  referenceId: string;
  partName: string;
  category: string;
  material: string;
  quantity: string;
  unit: string;
  tolerance: string;
  deliveryCity: string;
  deliveryCountry: string;
  incoterm: string;
  status: string;
  matchesCount: number;
}

export function RequirementSummaryHeader({
  referenceId,
  partName,
  category,
  material,
  quantity,
  unit,
  tolerance,
  deliveryCity,
  deliveryCountry,
  incoterm,
  status,
  matchesCount,
}: RequirementSummaryHeaderProps) {
  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-ink/[0.06]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
              YOUR REQUIREMENT
            </span>
            <span className="text-xs font-mono font-bold text-ink bg-paper px-2.5 py-0.5 rounded border border-ink/[0.1]">
              {referenceId}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {status}
            </span>
            <SampleDataTag />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            {partName}
          </h1>
          <p className="text-xs text-slate mt-1">
            Category: <span className="font-semibold text-ink">{category}</span> · Found{" "}
            <strong className="text-ink font-bold">{matchesCount}</strong> verified manufacturing capabilities
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-paper hover:bg-surface border border-ink/[0.1] text-xs font-semibold text-slate hover:text-ink transition-colors"
          >
            <PencilSimple size={14} />
            Modify Specs
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ink hover:bg-ink/90 text-surface text-xs font-semibold tracking-wide transition-colors shadow-xs"
          >
            <PlusCircle size={14} />
            New Requirement
          </Link>
        </div>
      </div>

      {/* Scannable Spec Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Material Grade
          </span>
          <span className="font-semibold text-ink mt-0.5 block truncate">
            {material}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Tolerance Spec
          </span>
          <span className="font-semibold text-ink mt-0.5 block truncate">
            {tolerance}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Target Volume
          </span>
          <span className="font-semibold text-ink mt-0.5 block truncate">
            {quantity} {unit}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase text-slate/70 block">
            Destination & Incoterm
          </span>
          <span className="font-semibold text-ink mt-0.5 block truncate">
            {deliveryCity}, {deliveryCountry} ({incoterm})
          </span>
        </div>
      </div>
    </div>
  );
}
