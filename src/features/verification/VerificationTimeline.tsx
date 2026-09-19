"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/animation";
import {
  FileArrowUp,
  MagnifyingGlass,
  Factory,
  ShieldCheck,
  Check,
  ArrowRight,
} from "@phosphor-icons/react";

interface LifecycleStage {
  step: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ElementType;
  description: string;
  keyDeliverables: string[];
  auditorStandard: string;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    step: "01",
    title: "Dossier Submission",
    subtitle: "Supplier Onboarding & Raw Evidence Upload",
    duration: "1–2 Days",
    icon: FileArrowUp,
    description:
      "Supplier completes a structured technical disclosure: legal registration, plant geolocation, machine tool inventory, metrology apparatus, and raw certificate PDFs.",
    keyDeliverables: [
      "Certificate of Incorporation & Tax filings",
      "Factory deed or registered industrial lease",
      "Equipment serial inventory with model numbers",
    ],
    auditorStandard: "Initial document completeness check by automated intake validation.",
  },
  {
    step: "02",
    title: "Desk Authentication",
    subtitle: "Registry Cross-Check & Registrar Query",
    duration: "2–3 Days",
    icon: MagnifyingGlass,
    description:
      "LINKSUPPLIED audit analysts cross-check corporate registries, verify tax compliance standing, and directly query accredited registrars to confirm certificate validity.",
    keyDeliverables: [
      "Government ministry registry verification",
      "Direct registrar database authentication (TÜV, UKAS, etc.)",
      "Corporate officer identification cross-match",
    ],
    auditorStandard: "Zero reliance on scanned paper alone; direct electronic confirmation required.",
  },
  {
    step: "03",
    title: "On-Site Physical Audit",
    subtitle: "Field Engineering Inspection & Toolpath Review",
    duration: "Scheduled",
    icon: Factory,
    description:
      "Field audit engineers visit the manufacturing facility to inspect physical factory premises, match machine tool nameplates to serial logs, and audit calibration logs.",
    keyDeliverables: [
      "GPS-stamped factory walkthrough photo logs",
      "Physical machine nameplate inspection records",
      "Metrology lab & CMM calibration certificate audit",
    ],
    auditorStandard: "Physical on-site presence verifies supplier is an active manufacturer, not a broker.",
  },
  {
    step: "04",
    title: "Dossier Publishing",
    subtitle: "Layer Confirmation & Continuous Monitoring",
    duration: "Continuous",
    icon: ShieldCheck,
    description:
      "Confirmed layers are published to the supplier's public capability dossier. Automated expiration tracking alerts buyers if certificates lapse or re-audits are due.",
    keyDeliverables: [
      "Multi-layered trust status (Verified / Reported / Review)",
      "Cryptographically hashed audit summaries",
      "Automated 12-month re-audit & expiry monitoring",
    ],
    auditorStandard: "Statuses remain active only while underlying certifications remain valid.",
  },
];

export function VerificationTimeline({ className = "" }: { className?: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();

  const currentStage = LIFECYCLE_STAGES[activeStep];
  const Icon = currentStage.icon;

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-ink/[0.08]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase">
            Audit Lifecycle
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
          How Verification Is Executed: From Intake to Confirmation
        </h3>
        <p className="text-sm text-slate mt-1 max-w-2xl">
          The 4-stage engineering audit process behind every verified capability layer on LINKSUPPLIED.
        </p>
      </div>

      {/* Interactive Step Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {LIFECYCLE_STAGES.map((stage, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-copper/[0.08] border-copper shadow-xs"
                  : "bg-paper hover:bg-surface border-ink/[0.08] hover:border-ink/[0.15]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    isActive
                      ? "bg-copper text-white"
                      : "bg-ink/[0.05] text-slate"
                  }`}
                >
                  {stage.step}
                </span>
                <span className="text-[10px] font-mono text-slate/70">
                  {stage.duration}
                </span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-ink truncate mb-0.5">
                {stage.title}
              </div>
              <div className="text-[11px] text-slate/80 line-clamp-1">
                {stage.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <motion.div
        key={activeStep}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.fast, ease: EASE.out }}
        className="p-6 sm:p-8 rounded-2xl bg-paper border border-ink/[0.08] shadow-xs"
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Column: Stage description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center text-copper">
                <Icon size={22} weight="duotone" />
              </div>
              <div>
                <div className="text-xs font-mono text-copper uppercase font-semibold">
                  Stage {currentStage.step} of 04 · {currentStage.duration}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-ink">
                  {currentStage.title}: {currentStage.subtitle}
                </h4>
              </div>
            </div>

            <p className="text-sm text-slate leading-relaxed mb-6">
              {currentStage.description}
            </p>

            {/* Auditor Standard */}
            <div className="p-3.5 rounded-xl bg-surface border border-ink/[0.06] text-xs">
              <span className="font-mono uppercase text-[10px] text-copper block font-semibold mb-1">
                Audit Rigor Standard
              </span>
              <span className="text-ink font-medium">
                {currentStage.auditorStandard}
              </span>
            </div>
          </div>

          {/* Right Column: Key Deliverables Checklist */}
          <div className="w-full lg:w-80 shrink-0 p-5 rounded-xl bg-surface/80 border border-ink/[0.06]">
            <div className="font-mono text-xs uppercase font-bold tracking-wider text-slate/80 mb-3 flex items-center justify-between">
              <span>Required Deliverables</span>
              <span className="text-copper">Stage {currentStage.step}</span>
            </div>
            <div className="space-y-2.5">
              {currentStage.keyDeliverables.map((deliv, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-ink/80">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Check size={10} weight="bold" />
                  </div>
                  <span className="leading-snug">{deliv}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-ink/[0.06] flex items-center justify-between">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 3))}
                className="text-xs font-mono text-slate hover:text-ink transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))}
                className="inline-flex items-center gap-1 text-xs font-mono font-bold text-copper hover:text-copper/80 transition-colors"
              >
                <span>Next Stage</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VerificationTimeline;
