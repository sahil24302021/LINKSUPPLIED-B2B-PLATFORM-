"use client";

import type { Company } from "@/types";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  CheckCircle,
  ShieldCheck,
} from "@phosphor-icons/react";

interface SupplierMachineryProps {
  company: Company;
}

export function SupplierMachinery({ company }: SupplierMachineryProps) {
  const machinery = company.machinery;

  if (!machinery || machinery.length === 0) {
    if (company.type === "distributor" || company.type === "supplier") {
      return (
        <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-ink">
              Production Machinery Status
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ink/[0.04] text-slate">
              NON-MANUFACTURING ENTITY
            </span>
          </div>
          <p className="text-xs text-slate leading-relaxed">
            {company.name} is classified as a verified {company.type}. They operate warehousing, inventory staging, and supply chain distribution networks rather than proprietary machine tooling equipment.
          </p>
        </div>
      );
    }
    return null;
  }

  const totalMachines = machinery.reduce((sum, m) => sum + m.quantity, 0);

  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-medium">
              EQUIPMENT INVENTORY AUDIT
            </span>
            <SampleDataTag />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
            Key Shop Floor Machinery & Tooling ({totalMachines} Units)
          </h2>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded bg-copper/10 text-copper font-semibold self-start sm:self-auto">
          {machinery.filter((m) => m.verified).length} Machine Lines Verified
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-ink/[0.08]">
        <table className="w-full text-xs text-left">
          <thead className="bg-paper/80 border-b border-ink/[0.08] font-mono text-[11px] text-slate">
            <tr>
              <th className="py-3 px-4">Equipment Type</th>
              <th className="py-3 px-4">Make / Model</th>
              <th className="py-3 px-3 text-center">Qty</th>
              <th className="py-3 px-4">Working Envelope</th>
              <th className="py-3 px-3">Precision</th>
              <th className="py-3 px-3">Year</th>
              <th className="py-3 px-4 text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/[0.06] text-ink">
            {machinery.map((m) => (
              <tr key={m.id} className="hover:bg-paper/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-ink">
                  {m.name}
                </td>
                <td className="py-3 px-4 font-mono text-slate">
                  {m.make} <span className="text-ink font-medium">{m.model}</span>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-copper">
                  {m.quantity}
                </td>
                <td className="py-3 px-4 text-slate font-mono text-[11px]">
                  {m.envelope}
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-ink">
                  {m.tolerance}
                </td>
                <td className="py-3 px-3 text-slate font-mono text-[11px]">
                  {m.yearInstalled || "—"}
                </td>
                <td className="py-3 px-4 text-right">
                  {m.verified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle size={11} weight="fill" />
                      Serial Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-[10px] font-mono text-slate bg-ink/[0.04] px-2 py-0.5 rounded">
                      Reported
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-3">
        {machinery.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-xl border border-ink/[0.08] bg-paper/50 space-y-2 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-ink text-sm">{m.name}</p>
                <p className="font-mono text-slate text-[11px]">
                  {m.make} · {m.model}
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-copper px-2 py-0.5 rounded bg-copper/10">
                {m.quantity} {m.quantity > 1 ? "units" : "unit"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div>
                <span className="text-slate/70 block text-[10px] uppercase">Envelope</span>
                <span className="text-ink">{m.envelope}</span>
              </div>
              <div>
                <span className="text-slate/70 block text-[10px] uppercase">Tolerance</span>
                <span className="text-copper font-bold">{m.tolerance}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-ink/[0.06] flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate/60">Installed: {m.yearInstalled || "N/A"}</span>
              {m.verified ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle size={11} weight="fill" />
                  Verified on site
                </span>
              ) : (
                <span className="text-slate">Reported</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-ink/[0.02] border border-ink/[0.06] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate">
        <ShieldCheck size={16} className="text-copper shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink font-semibold">Equipment Verification Standard:</strong> LINKSUPPLIED verifies machinery existence against serial nameplates, commercial power supply utility records, and OEM service logs during on-site technical audits.
        </p>
      </div>
    </div>
  );
}
