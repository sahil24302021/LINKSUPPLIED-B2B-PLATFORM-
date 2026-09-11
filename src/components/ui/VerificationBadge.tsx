"use client";

import { useState } from "react";
import type { VerificationStatus as VerificationStatusType } from "@/lib/types";
import {
  ShieldCheck,
  Factory,
  Handshake,
  Gauge,
  IdentificationCard,
  ChartLineUp,
} from "@phosphor-icons/react";

const iconMap: Record<string, React.ElementType> = {
  "Business Verified": ShieldCheck,
  "Manufacturer Verified": Factory,
  "Trade Verified": Handshake,
  "Capability Verified": Gauge,
  "Identity Verified": IdentificationCard,
  "Interaction Verified": ChartLineUp,
};

interface VerificationBadgeProps {
  verification: VerificationStatusType;
  compact?: boolean;
}

export function VerificationBadge({
  verification,
  compact = false,
}: VerificationBadgeProps) {
  const [showEvidence, setShowEvidence] = useState(false);
  const Icon = iconMap[verification.type] || ShieldCheck;

  if (compact) {
    return (
      <span
        className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/8 text-success text-xs font-medium cursor-help border border-success/15"
        onMouseEnter={() => setShowEvidence(true)}
        onMouseLeave={() => setShowEvidence(false)}
        onFocus={() => setShowEvidence(true)}
        onBlur={() => setShowEvidence(false)}
        tabIndex={0}
        role="button"
        aria-label={`${verification.type}: ${verification.evidenceSummary}`}
      >
        <Icon size={12} weight="fill" />
        {verification.type.replace(" Verified", "")}

        {showEvidence && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-surface text-xs rounded-lg shadow-lg whitespace-nowrap z-50 max-w-xs text-center">
            {verification.evidenceSummary}
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-ink" />
          </span>
        )}
      </span>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-silver/15">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
        <Icon size={18} className="text-success" weight="fill" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink">{verification.type}</p>
        <p className="text-xs text-slate mt-0.5 leading-relaxed">
          {verification.evidenceSummary}
        </p>
      </div>
    </div>
  );
}
