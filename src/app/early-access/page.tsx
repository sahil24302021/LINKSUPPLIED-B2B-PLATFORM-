"use client";

import { EarlyAccessWizard } from "@/features/waitlist/EarlyAccessWizard";
import { ShieldCheck, UserCheck, Clock, LockKey } from "@phosphor-icons/react";

export default function EarlyAccessPage() {
  return (
    <div className="py-8 sm:py-12 md:py-20 bg-paper min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] uppercase font-bold tracking-wider max-w-full">
            <LockKey size={12} weight="bold" className="shrink-0" />
            <span className="truncate sm:whitespace-normal">ACTIVE ONBOARDING INTAKE · REAL APPLICATION</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-display lg:text-hero text-ink font-bold tracking-tight break-words">
            Apply for Enterprise Pilot Access
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate max-w-[58ch] mx-auto leading-relaxed">
            This application is submitted directly to the LINKSUPPLIED engineering sourcing desk. We review your production volumes or facility capacities to qualify and provision your dedicated workspace.
          </p>

          <div className="p-3 rounded-xl bg-surface border border-ink/[0.08] text-xs text-slate max-w-lg mx-auto flex items-start sm:items-center justify-center gap-2 text-left sm:text-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0" />
            <span className="leading-relaxed">
              <strong>Confidential Review:</strong> All company details and spend scales are reviewed under strict NDA protocols.
            </span>
          </div>
        </div>

        {/* 3 Core Questions Clarification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left w-full">
          <div className="p-4 rounded-xl bg-surface border border-ink/[0.08] shadow-xs space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-copper font-mono text-[10px] uppercase font-bold">
              <UserCheck size={14} weight="bold" />
              Who It Is For
            </div>
            <p className="text-xs font-bold text-ink">Procurement & Factories</p>
            <p className="text-[11px] text-slate leading-relaxed">
              Sourcing teams seeking certified plants, and manufacturers wanting direct, qualified RFQs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-ink/[0.08] shadow-xs space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-copper font-mono text-[10px] uppercase font-bold">
              <ShieldCheck size={14} weight="bold" />
              Why We Ask
            </div>
            <p className="text-xs font-bold text-ink">Technical Matching Fit</p>
            <p className="text-[11px] text-slate leading-relaxed">
              We evaluate tolerance, material, and envelope compatibility—no spam or unverified listings.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-ink/[0.08] shadow-xs space-y-1 min-w-0">
            <div className="flex items-center gap-1.5 text-copper font-mono text-[10px] uppercase font-bold">
              <Clock size={14} weight="bold" />
              What Happens Next
            </div>
            <p className="text-xs font-bold text-ink">Response Within 48h</p>
            <p className="text-[11px] text-slate leading-relaxed">
              Our sourcing desk reviews your brief and provisions your pilot workspace access.
            </p>
          </div>
        </div>

        {/* Wizard */}
        <EarlyAccessWizard />
      </div>
    </div>
  );
}
