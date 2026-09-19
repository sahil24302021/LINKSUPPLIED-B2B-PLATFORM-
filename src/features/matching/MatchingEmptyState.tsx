"use client";

import { Clock, ArrowsCounterClockwise, Headset } from "@phosphor-icons/react";

interface MatchingEmptyStateProps {
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export function MatchingEmptyState({
  onResetFilters,
  hasActiveFilters,
}: MatchingEmptyStateProps) {
  return (
    <div className="bg-surface rounded-2xl border border-ink/[0.08] p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-xs space-y-4">
      <div className="w-12 h-12 rounded-full bg-copper/10 text-copper flex items-center justify-center mx-auto mb-2">
        <Clock size={28} />
      </div>

      <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2.5 py-1 rounded bg-copper/10">
        ENGINEERING SOURCING DESK ACTIVE
      </span>

      <h3 className="text-xl sm:text-2xl font-bold text-ink">
        We&apos;re Reviewing Your Requirement
      </h3>

      <p className="text-xs sm:text-sm text-slate leading-relaxed">
        {hasActiveFilters
          ? "No suppliers currently match this precise combination of filters. Broadening your search or resetting filters will reveal verified facilities capable of alternative production routes."
          : "Your engineering tolerances and material specifications require specialized facility qualification. A LINKSUPPLIED sourcing engineer is currently matching this brief across our verified offline network."}
      </p>

      <div className="bg-paper p-4 rounded-xl border border-ink/[0.06] text-xs text-left text-slate space-y-1.5">
        <p className="font-semibold text-ink">What happens next?</p>
        <ul className="list-disc list-inside space-y-1 text-[11px]">
          <li>Machine bed capacity and toolpath clearance verified.</li>
          <li>Accredited metallurgical stockists contacted for material grade availability.</li>
          <li>Direct quotation dossier delivered within our standard 24–48h SLA.</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface border border-ink/[0.12] hover:bg-paper text-xs font-semibold text-ink transition-colors shadow-xs"
          >
            <ArrowsCounterClockwise size={14} />
            Reset Sourcing Filters
          </button>
        )}

        <a
          href="mailto:sourcing@linksupplied.com?subject=Sourcing%20Desk%20Assistance"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-ink hover:bg-ink/90 text-surface text-xs font-semibold tracking-wide transition-colors shadow-xs"
        >
          <Headset size={14} />
          Contact Sourcing Desk
        </a>
      </div>
    </div>
  );
}
