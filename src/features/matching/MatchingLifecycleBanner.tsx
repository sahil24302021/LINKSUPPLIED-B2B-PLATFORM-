"use client";

import { Check } from "@phosphor-icons/react";

interface MatchingLifecycleBannerProps {
  currentStage?: number; // default 3
}

export function MatchingLifecycleBanner({ currentStage = 3 }: MatchingLifecycleBannerProps) {
  const steps = [
    { num: 1, label: "Brief Submitted", sub: "Specs & drawings registered" },
    { num: 2, label: "Engineering Review", sub: "Feasibility confirmed" },
    { num: 3, label: "Capability Matched", sub: "Verified facilities ready" },
    { num: 4, label: "Direct RFQ & Quotes", sub: "Commercial negotiation" },
  ];

  return (
    <div className="bg-surface rounded-xl border border-ink/[0.06] p-4 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step) => {
          const isDone = step.num < currentStage;
          const isCurrent = step.num === currentStage;

          return (
            <div
              key={step.num}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                isCurrent
                  ? "bg-copper/5 border border-copper/20"
                  : isDone
                  ? "bg-paper/80"
                  : "opacity-60"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                  isDone
                    ? "bg-emerald-100 text-emerald-800"
                    : isCurrent
                    ? "bg-copper text-white shadow-xs"
                    : "bg-ink/[0.08] text-slate"
                }`}
              >
                {isDone ? <Check size={14} weight="bold" /> : step.num}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-ink truncate leading-tight">
                  {step.label}
                </p>
                <p className="text-[10px] text-slate truncate mt-0.5">
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
