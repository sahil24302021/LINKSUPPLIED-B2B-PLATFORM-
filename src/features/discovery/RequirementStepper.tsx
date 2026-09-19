"use client";

import { Check, FloppyDisk, ArrowsClockwise } from "@phosphor-icons/react";

interface StepMeta {
  id: number;
  label: string;
  short: string;
  tag: string;
}

export const WIZARD_STEPS: StepMeta[] = [
  { id: 1, label: "Requirement", short: "Requirement", tag: "Overview" },
  { id: 2, label: "Specifications", short: "Specifications", tag: "Engineering" },
  { id: 3, label: "Quantity", short: "Quantity", tag: "Commercial" },
  { id: 4, label: "Delivery", short: "Delivery", tag: "Logistics" },
  { id: 5, label: "Files", short: "Files", tag: "CAD & BOM" },
  { id: 6, label: "Review", short: "Review", tag: "Confirmation" },
];

interface RequirementStepperProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
  lastSavedAt: string | null;
  onReset: () => void;
}

export function RequirementStepper({
  currentStep,
  completedSteps,
  onStepClick,
  lastSavedAt,
  onReset,
}: RequirementStepperProps) {
  return (
    <div className="bg-surface rounded-t-2xl border-b border-ink/[0.08] px-4 sm:px-6 py-4">
      {/* Top row: current status and draft indicator */}
      <div className="flex items-center justify-between gap-3 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono uppercase text-[11px] tracking-wider text-slate font-medium">
            Step {currentStep} of {WIZARD_STEPS.length}:
          </span>
          <span className="font-semibold text-ink">
            {WIZARD_STEPS[currentStep - 1]?.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {lastSavedAt && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate/70 font-mono">
              <FloppyDisk size={13} className="text-copper" />
              <span className="hidden sm:inline">Draft saved locally</span>
              <span>{lastSavedAt}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-slate/60 hover:text-ink transition-colors flex items-center gap-1"
            title="Clear all fields and restart"
          >
            <ArrowsClockwise size={12} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Stepper bar */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {WIZARD_STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isAccessible = isDone || step.id <= currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isAccessible && onStepClick(step.id)}
              disabled={!isAccessible}
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5 p-1.5 sm:p-2 rounded-lg text-left transition-all ${
                isCurrent
                  ? "bg-copper/[0.06] border border-copper/30"
                  : isDone
                  ? "hover:bg-paper cursor-pointer"
                  : "opacity-45 cursor-not-allowed"
              }`}
            >
              {/* Step indicator circle */}
              <div
                className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center shrink-0 transition-colors ${
                  isDone
                    ? "bg-ink text-surface font-bold"
                    : isCurrent
                    ? "bg-copper text-white font-bold ring-2 ring-copper/25"
                    : "bg-ink/[0.06] text-slate"
                }`}
              >
                {isDone ? <Check size={12} weight="bold" /> : step.id}
              </div>

              {/* Step labels for desktop */}
              <div className="min-w-0 hidden md:block">
                <p
                  className={`text-[11px] font-semibold truncate ${
                    isCurrent
                      ? "text-ink"
                      : isDone
                      ? "text-slate"
                      : "text-slate/60"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate/60 font-mono uppercase tracking-wider truncate">
                  {step.tag}
                </p>
              </div>

              {/* Step short label for tablet (sm to md) */}
              <div className="hidden sm:block md:hidden text-left min-w-0 overflow-hidden">
                <span
                  className={`text-[10px] font-medium block truncate ${
                    isCurrent ? "text-ink font-semibold" : "text-slate/70"
                  }`}
                >
                  {step.short}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
