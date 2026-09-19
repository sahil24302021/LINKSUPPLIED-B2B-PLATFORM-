"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  Wrench,
  Stack,
  Crosshair,
  Globe,
  CheckCircle,
} from "@phosphor-icons/react";

interface SupplierCapabilitySummaryProps {
  company: Company;
}

export function SupplierCapabilitySummary({ company }: SupplierCapabilitySummaryProps) {
  const specs = company.technicalSpecs;

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
            CAPABILITY ARCHITECTURE
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            Manufacturing & Technical Scope
          </h2>
        </div>
        <SampleDataTag />
      </div>

      {/* Primary Processes */}
      {specs?.processes && specs.processes.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
            <Wrench size={14} className="text-copper" />
            Core Manufacturing Processes
          </h3>
          <div className="flex flex-wrap gap-2">
            {specs.processes.map((proc) => (
              <span
                key={proc}
                className="text-xs px-3 py-1.5 rounded-lg bg-paper border border-ink/[0.08] text-ink font-medium flex items-center gap-1.5"
              >
                <CheckCircle size={13} className="text-copper" weight="fill" />
                {proc}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Materials Supported */}
      {specs?.materials && specs.materials.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
            <Stack size={14} className="text-copper" />
            Materials Handled & Raw Stock Sourcing
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {specs.materials.map((mat) => (
              <span
                key={mat}
                className="text-xs px-2.5 py-1 rounded-md bg-ink/[0.03] text-slate font-mono"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Technical Specifications Matrix Table */}
      {specs && (
        <div>
          <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
            <Crosshair size={14} className="text-copper" />
            Technical Tolerancing & Envelope Matrix
          </h3>

          <div className="overflow-x-auto rounded-xl border border-ink/[0.08]">
            <table className="w-full text-xs text-left">
              <thead className="bg-paper/80 border-b border-ink/[0.08] font-mono text-[11px] text-slate">
                <tr>
                  <th className="py-2.5 px-4">Metric</th>
                  <th className="py-2.5 px-4">Operating Range</th>
                  <th className="py-2.5 px-4 hidden sm:table-cell">Engineering Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.06] text-ink">
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate">Tightest Precision Tolerance</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-copper">{specs.tightestTolerance}</td>
                  <td className="py-2.5 px-4 text-slate/70 hidden sm:table-cell">Validated in climate-controlled metrology lab</td>
                </tr>
                {specs.maxEnvelopeMm && (
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate">Max Working Envelope</td>
                    <td className="py-2.5 px-4 font-mono">{specs.maxEnvelopeMm}</td>
                    <td className="py-2.5 px-4 text-slate/70 hidden sm:table-cell">5-axis and large table milling capacity</td>
                  </tr>
                )}
                {specs.minDiameterMm !== undefined && specs.maxDiameterMm !== undefined && (
                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate">Diameter Range</td>
                    <td className="py-2.5 px-4 font-mono">{specs.minDiameterMm}mm to {specs.maxDiameterMm}mm</td>
                    <td className="py-2.5 px-4 text-slate/70 hidden sm:table-cell">Swiss turn to large bore chucking</td>
                  </tr>
                )}
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate">Surface Finish Range</td>
                  <td className="py-2.5 px-4 font-mono">{specs.surfaceFinishRange}</td>
                  <td className="py-2.5 px-4 text-slate/70 hidden sm:table-cell">Grinding and fine honing available</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate">Economical Batch Size</td>
                  <td className="py-2.5 px-4 font-mono">{specs.batchSizeRange}</td>
                  <td className="py-2.5 px-4 text-slate/70 hidden sm:table-cell">Rapid changeover tooling enabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Markets Served */}
      <div>
        <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
          <Globe size={14} className="text-copper" />
          Export Markets Served
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {company.marketsServed.map((m) => (
            <span
              key={m}
              className="text-xs px-2.5 py-1 rounded-md bg-paper border border-ink/[0.08] text-slate font-medium"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
