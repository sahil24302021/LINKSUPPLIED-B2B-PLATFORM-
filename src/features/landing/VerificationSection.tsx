"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/animation";
import {
  Buildings,
  Factory,
  Gauge,
  SealCheck,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  WarningCircle,
} from "@phosphor-icons/react";

const TRUTH_LEVELS = [
  {
    level: "Reported",
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200/70",
    icon: Clock,
    iconColor: "text-blue-600",
    description: "Self-declared specifications, machinery types, and catalog listings submitted by the supplier.",
  },
  {
    level: "Under Review",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200/70",
    icon: WarningCircle,
    iconColor: "text-amber-600",
    description: "Primary documentation submitted. Site audit, machine envelope check, or registrar confirmation pending.",
  },
  {
    level: "Verified",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200/70",
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    description: "Independently validated against government registries, on-site machine serials, or CMM test logs.",
  },
];

const CORE_VERIFICATION_EXAMPLES = [
  {
    id: "entity",
    num: "01",
    name: "Entity",
    title: "Corporate Identity & Legal Standing",
    tagline: "Confirmed legal entity standing with active government incorporation and tax filings.",
    evidence: "Ministry of Corporate Affairs registration, GST/VAT filings, officer identity verification.",
    type: "Document Verified",
    Icon: Buildings,
  },
  {
    id: "facility",
    num: "02",
    name: "Facility",
    title: "Physical Plant & Operational Premises",
    tagline: "Validated industrial production facilities, premises title deeds, and operational presence.",
    evidence: "Industrial lease/deed records, on-site physical walk-through, geo-tagged plant verification.",
    type: "Physically Verified",
    Icon: Factory,
  },
  {
    id: "capability",
    num: "03",
    name: "Capability",
    title: "Machinery Envelopes & Tolerances",
    tagline: "Machine nameplates, CNC serial numbers, and demonstrated manufacturing tolerances.",
    evidence: "Calibrated machine inventory logs, CMM inspection records, batch production run logs.",
    type: "Physically Audited",
    Icon: Gauge,
  },
  {
    id: "quality",
    num: "04",
    name: "Quality",
    title: "Accredited Certifications",
    tagline: "Standard compliance cross-checked directly with primary accredited certifying registrars.",
    evidence: "Active ISO 9001:2015, IATF 16949, or ISO 22716 validated against registrar databases.",
    type: "Registry Validated",
    Icon: SealCheck,
  },
];

export function VerificationSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-surface border-t border-ink/[0.06] overflow-hidden">
      <div className="grid-page">
        <div className="col-content">
          {/* Header */}
          <div className="max-w-3xl mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 mb-3">
              <ShieldCheck size={14} weight="bold" className="text-copper" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
                08 — VERIFICATION & TRUST FRAMEWORK
              </span>
            </div>

            <h2 className="text-display text-ink text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              How do you know supplier information is reliable?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate leading-relaxed max-w-[52ch]">
              We distinguish what a supplier reports from what has been independently verified.
              Every badge links to concrete evidence — no unexplained checkmarks, no paid promotional rankings.
            </p>
          </div>

          {/* 3-State Truth Progression Strip */}
          <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-paper border border-ink/[0.06] shadow-2xs">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate/70 font-semibold mb-3">
              The 3-State Truth Hierarchy
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TRUTH_LEVELS.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.level}
                    className="p-3.5 rounded-xl bg-surface border border-ink/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${tier.badgeClass}`}>
                        {tier.level}
                      </span>
                      <Icon size={16} weight="fill" className={tier.iconColor} />
                    </div>
                    <p className="text-xs text-slate leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Core Verification Dimensions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
            {CORE_VERIFICATION_EXAMPLES.map((dim, i) => {
              const Icon = dim.Icon;
              return (
                <motion.div
                  key={dim.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: DURATION.smooth, delay: i * 0.08, ease: EASE.out }}
                  className="bg-paper rounded-2xl p-5 border border-ink/[0.06] flex flex-col justify-between shadow-2xs hover:border-copper/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-copper/10 border border-copper/20 flex items-center justify-center text-copper">
                        <Icon size={18} weight="duotone" />
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                        {dim.type}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-copper uppercase font-bold block mb-1">
                      LAYER {dim.num}
                    </span>

                    <h3 className="text-base font-bold text-ink">
                      {dim.name}
                    </h3>
                    <p className="text-xs text-ink/80 font-medium mt-0.5">
                      {dim.title}
                    </p>

                    <p className="text-xs text-slate mt-2 leading-relaxed">
                      {dim.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/[0.04]">
                    <span className="text-[9px] font-mono text-slate/60 uppercase block mb-1">
                      Evidence Required:
                    </span>
                    <p className="text-[11px] text-slate font-mono leading-tight">
                      {dim.evidence}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Primary Action & Deep Link to /verification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-sand/30 border border-ink/[0.06]">
            <div>
              <p className="text-xs sm:text-sm font-bold text-ink">
                Inspect the complete 6-layer verification architecture & evidence criteria.
              </p>
              <p className="text-xs text-slate mt-0.5">
                Learn how legal standing, physical machine nameplates, and quality systems are audited.
              </p>
            </div>

            <Button
              href="/verification"
              variant="primary"
              size="sm"
              iconTrailing={<ArrowRight size={13} weight="bold" />}
              className="shrink-0 self-start sm:self-auto"
            >
              See how verification works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
