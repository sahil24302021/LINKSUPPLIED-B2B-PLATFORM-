"use client";

import { Suspense } from "react";
import { RequirementWizard } from "@/features/discovery/RequirementWizard";
import { RouteGate } from "@/components/auth/RouteGate";

export default function DiscoverPage() {
  return (
    <RouteGate>
      <div className="bg-paper min-h-screen">
      <div className="py-10 md:py-16">
        <div className="grid-page">
          <div className="col-content">
            {/* ── Sourcing Page Header ────────────────────────── */}
            <div className="mb-8 pb-6 border-b border-ink/[0.06]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                      CREATE A SOURCING REQUIREMENT
                    </span>
                  </div>

                  <h1 className="text-display md:text-hero text-ink font-bold tracking-tight">
                    Tell us what you need.
                  </h1>

                  <p className="mt-2 text-sm sm:text-base text-slate max-w-[66ch] leading-relaxed">
                    Specify the component or assembly you are looking to manufacture. We structure your technical parameters so qualified factories can be matched on machine envelope, tolerance, and verified capacity.
                  </p>
                </div>
              </div>

              {/* Sourcing Roadmap Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-ink/[0.05] text-xs">
                <div className="flex items-center gap-2 text-ink font-medium">
                  <span className="w-5 h-5 rounded-full bg-copper text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>Submit Sourcing Brief</span>
                </div>
                <div className="flex items-center gap-2 text-slate">
                  <span className="w-5 h-5 rounded-full bg-ink/[0.06] text-slate font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>Engineering Feasibility Review</span>
                </div>
                <div className="flex items-center gap-2 text-slate">
                  <span className="w-5 h-5 rounded-full bg-ink/[0.06] text-slate font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>Facility Capability Match</span>
                </div>
                <div className="flex items-center gap-2 text-slate">
                  <span className="w-5 h-5 rounded-full bg-ink/[0.06] text-slate font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <span>Direct Quotation Bids</span>
                </div>
              </div>
            </div>

            {/* ── 6-Step Requirement Intake Wizard ────────────── */}
            <Suspense fallback={<div className="p-8 text-center text-xs text-slate">Loading sourcing intake...</div>}>
              <RequirementWizard />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
    </RouteGate>
  );
}
