"use client";

import type { VerificationStatusType } from "@/types";
import {
  CheckCircle,
  Clock,
  Info,
  Minus,
  WarningCircle,
} from "@phosphor-icons/react";

interface VerificationStatusProps {
  status: VerificationStatusType | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function VerificationStatus({
  status,
  size = "md",
  showIcon = true,
  className = "",
}: VerificationStatusProps) {
  // Normalize status string
  const normalized = (status || "").toLowerCase().replace(/[\s-]/g, "_");

  let label = "NOT AVAILABLE";
  let icon = <Minus size={size === "sm" ? 11 : size === "lg" ? 16 : 13} weight="bold" />;
  let colorStyles = "bg-ink/[0.04] text-slate/70 border-ink/[0.08]";

  if (normalized.includes("verified") || normalized === "audited") {
    label = "VERIFIED";
    icon = <CheckCircle size={size === "sm" ? 12 : size === "lg" ? 16 : 14} weight="fill" className="text-emerald-600 shrink-0" />;
    colorStyles = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
  } else if (normalized.includes("under_review") || normalized.includes("review") || normalized.includes("pending")) {
    label = "UNDER REVIEW";
    icon = <Clock size={size === "sm" ? 12 : size === "lg" ? 16 : 14} weight="fill" className="text-copper shrink-0" />;
    colorStyles = "bg-copper/10 text-copper font-semibold border-copper/25";
  } else if (normalized.includes("reported") || normalized.includes("self")) {
    label = "REPORTED";
    icon = <Info size={size === "sm" ? 12 : size === "lg" ? 16 : 14} weight="bold" className="text-blue-600 shrink-0" />;
    colorStyles = "bg-blue-50 text-blue-800 border-blue-200/80";
  } else if (normalized.includes("expired")) {
    label = "EXPIRED";
    icon = <WarningCircle size={size === "sm" ? 12 : size === "lg" ? 16 : 14} weight="fill" className="text-rose-600 shrink-0" />;
    colorStyles = "bg-rose-50 text-rose-800 border-rose-200/80";
  }

  const sizeClasses = {
    sm: "text-[9px] px-1.5 py-0.5 gap-1",
    md: "text-[10px] px-2 py-0.5 gap-1.5",
    lg: "text-xs px-2.5 py-1 gap-2",
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md font-mono uppercase font-bold tracking-wider border shadow-2xs ${sizeClasses} ${colorStyles} ${className}`}
      aria-label={`Verification status: ${label}`}
    >
      {showIcon && icon}
      <span>{label}</span>
    </span>
  );
}
