"use client";

import { Suspense } from "react";
import { RfqWorkspace } from "@/features/rfq/RfqWorkspace";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { useDemoMode } from "@/hooks/use-demo-mode";
import { RouteGate } from "@/components/auth/RouteGate";
import { SAMPLE_RFQS, SAMPLE_QUOTES } from "@/data";

function RfqContent() {
  const { isDemo, demoRole } = useDemoMode();
  const isBuyerDemo = isDemo && demoRole === "buyer";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-ink/[0.06] pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
            COMMERCIAL PROCUREMENT DESK
          </span>
          <SampleDataTag />
        </div>

        <h1 className="text-display md:text-hero text-ink font-bold tracking-tight">
          Commercial Quotations & RFQs
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate max-w-[65ch] leading-relaxed">
          Review binding commercial bids, compare unit pricing and tooling allocations, inspect technical DFM feedback, and contract with verified facilities.
        </p>
      </div>

      {/* Master Workspace */}
      <RfqWorkspace
        rfqs={isBuyerDemo ? SAMPLE_RFQS : []}
        quotes={isBuyerDemo ? SAMPLE_QUOTES : []}
        isDemo={isBuyerDemo}
      />
    </div>
  );
}

export default function RfqPage() {
  return (
    <RouteGate>
      <div className="py-10 md:py-16 bg-paper min-h-screen">
        <div className="grid-page">
          <div className="col-content">
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading quotation desk...</div>}>
              <RfqContent />
            </Suspense>
          </div>
        </div>
      </div>
    </RouteGate>
  );
}
