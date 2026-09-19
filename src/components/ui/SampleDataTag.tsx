"use client";

import { useDemoMode } from "@/hooks/use-demo-mode";

interface SampleDataTagProps {
  label?: string;
  className?: string;
  forceShow?: boolean;
}

export function SampleDataTag({
  label = "Sample Data",
  className = "",
  forceShow = false,
}: SampleDataTagProps = {}) {
  const { isDemo } = useDemoMode();

  if (!isDemo && !forceShow) return null;

  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-copper/10 text-copper border border-copper/25 select-none ${className}`}
      title="Demonstration record active in Instant Evaluation Mode"
    >
      {label}
    </span>
  );
}
