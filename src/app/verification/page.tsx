"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { VerificationExplorer } from "@/features/verification/VerificationExplorer";
import { VerificationEvidenceStack } from "@/features/verification/VerificationEvidenceStack";
import { VerificationMatrix } from "@/features/verification/VerificationMatrix";
import { VerificationTimeline } from "@/features/verification/VerificationTimeline";
import { VerificationStatus } from "@/features/verification/VerificationStatus";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { DURATION, EASE } from "@/lib/animation";
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

// TODO: real asset — primary certificate audit scan documents and on-site metrology inspection photographs

export default function VerificationPage() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-20 md:pt-28 pb-0 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content">
          {/* ── 1. Verification Hero ──────────────────────────── */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 mb-4">
                <ShieldCheck size={14} weight="bold" className="text-copper" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
                  B2B TRUST ARCHITECTURE · AUDIT SYSTEM
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.08]">
                Verification you can inspect.
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-slate leading-relaxed max-w-2xl">
                We separate what a supplier reports from what LINKSUPPLIED has verified. Real procurement demands granular clarity across six independent layers — from corporate legal standing and on-site factory equipment to metrology calibration and trade compliance.
              </p>

              {/* Methodology Highlights Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-6 border-t border-ink/[0.08]">
                {[
                  "6 Independent Layers",
                  "No Paid Decorative Badges",
                  "Audited Primary Registries",
                  "Continuous 12-Mo. Monitoring",
                ].map((pill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-ink/[0.08] text-xs font-mono text-ink/80 shadow-2xs"
                  >
                    <CheckCircle size={13} weight="fill" className="text-emerald-600" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Interactive Supplier Dossier Mockup */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: 0.15, ease: EASE.out }}
              className="mt-10 p-5 sm:p-7 rounded-2xl bg-surface border border-ink/[0.08] shadow-sm relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-ink/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-copper/10 border border-copper/20 flex items-center justify-center text-copper font-mono text-xs font-bold">
                    VP
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm sm:text-base font-bold text-ink">
                        Vanguard Precision Engineering Ltd.
                      </h2>
                      <SampleDataTag label="Sample Dossier" />
                    </div>
                    <span className="text-xs font-mono text-slate/70">
                      Bhosari Industrial Area, Pune · CNC Milling & Precision Turning
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                    4 OF 6 LAYERS CONFIRMED
                  </span>
                </div>
              </div>

              {/* Badges preview row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { name: "01 Entity", status: "verified" },
                  { name: "02 Facility", status: "verified" },
                  { name: "03 Capability", status: "verified" },
                  { name: "04 Quality", status: "under_review" },
                  { name: "05 Trade", status: "not_available" },
                  { name: "06 Platform", status: "reported" },
                ].map((badge) => (
                  <div
                    key={badge.name}
                    className="p-2.5 rounded-lg bg-paper border border-ink/[0.05] flex flex-col justify-between gap-1.5"
                  >
                    <span className="text-[10px] font-mono text-slate uppercase font-semibold">
                      {badge.name}
                    </span>
                    <VerificationStatus status={badge.status} size="sm" />
                  </div>
                ))}
              </div>

              <div className="mt-3.5 pt-3 border-t border-ink/[0.04] flex items-center justify-between text-[11px] font-mono text-slate">
                <span>Audited by LINKSUPPLIED Engineering Desk · Cert #AUD-PUN-2026-0612</span>
                <a
                  href="#explorer"
                  className="text-copper font-semibold hover:underline flex items-center gap-1"
                >
                  Inspect layer definitions below ↓
                </a>
              </div>
            </motion.div>
          </section>

          {/* ── 5-Second Status Orientation ─────────────────── */}
          <section className="mb-16 pt-8 border-t border-ink/[0.08]">
            <div className="max-w-2xl mb-6">
              <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase block mb-1">
                At a Glance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                What does verified actually mean?
              </h2>
              <p className="text-sm sm:text-base text-slate mt-1.5 leading-relaxed">
                LINKSUPPLIED rejects binary &quot;100% verified&quot; checkmarks. We classify every operational claim into one of five unambiguous evidentiary states so your engineering and procurement teams know exactly what has been confirmed:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-surface border border-blue-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-blue-800 font-mono text-xs font-bold uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Reported
                </div>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  Self-declared by the manufacturing facility. Not yet cross-referenced with external audits or on-site inspections.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-amber-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs font-bold uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Under Review
                </div>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  Evidence submitted by manufacturer; actively undergoing audit by the LINKSUPPLIED engineering desk.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-emerald-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-xs font-bold uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Verified
                </div>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  Direct documentary proof or on-site engineering audit completed. Independent primary registries confirmed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-ink/[0.08] shadow-2xs">
                <div className="flex items-center gap-1.5 text-slate font-mono text-xs font-bold uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-slate/40"></span>
                  Not Available
                </div>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  Data not provided, or not applicable to this supplier&apos;s current manufacturing scope or operations.
                </p>
              </div>
            </div>
          </section>

          {/* ── 2. Core Philosophy: Why Granular Verification Matters ── */}
          <section className="mb-20 pt-12 border-t border-ink/[0.08]">
            <div className="max-w-2xl mb-8">
              <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase block mb-1">
                The Trust Problem in Manufacturing
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                Why generic &quot;100% verified&quot; checkmarks fail procurement
              </h2>
              <p className="text-base sm:text-lg text-slate mt-2 leading-relaxed">
                Traditional supplier directories monetize premium placement. Any supplier paying for a subscription receives a generic verified shield. In real industrial sourcing, this creates catastrophic blind spots.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "No Decorative Upgrades",
                  subtitle: "Trust cannot be bought",
                  desc: "LINKSUPPLIED badges cannot be acquired through paid listings or premium sponsorship. Verification is awarded exclusively when primary physical or registry evidence is verified.",
                },
                {
                  title: "Granular, Multi-Tiered",
                  subtitle: "Transparency over false certainty",
                  desc: "A supplier may own certified 5-axis machines but lack export records. We clearly state: CAPABILITY: VERIFIED, TRADE: NOT AVAILABLE. Buyers make informed decisions with zero false confidence.",
                },
                {
                  title: "Cryptographic Audit Trail",
                  subtitle: "Document immutability",
                  desc: "Every audited certificate, inspection walkthrough photo log, and tax filing is anchored by SHA-256 reference hashes. Audits are refreshed every 12 months with automated expiration alerts.",
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-surface border border-ink/[0.08] shadow-2xs hover:border-copper/30 transition-colors"
                >
                  <div className="font-mono text-xs text-copper uppercase font-bold mb-1">
                    0{i + 1} · {pillar.subtitle}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-ink mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Six-Layer Interactive Explorer ────────────── */}
          <section id="explorer" className="mb-20 pt-12 border-t border-ink/[0.08] scroll-mt-24">
            <VerificationExplorer />
          </section>

          {/* ── 4. Verified vs. Reported Matrix ──────────────── */}
          <section className="mb-20 pt-12 border-t border-ink/[0.08]">
            <VerificationMatrix />
          </section>

          {/* ── 5. Evidence Stack & Sample Audit Logs ────────── */}
          <section className="mb-20 pt-12 border-t border-ink/[0.08]">
            <VerificationEvidenceStack />
          </section>

          {/* ── 6. 4-Stage Audit Lifecycle Timeline ──────────── */}
          <section className="mb-24 pt-12 border-t border-ink/[0.08]">
            <VerificationTimeline />
          </section>

          {/* ── 7. Strategic Trust & Action CTA ──────────────── */}
          <section className="p-8 sm:p-12 md:p-16 rounded-3xl bg-surface border border-ink/[0.08] shadow-sm mb-20 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="font-mono text-[11px] font-bold tracking-wider text-copper uppercase block mb-2">
                Actionable Verification
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight">
                Source with verified manufacturers or establish your facility profile.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate leading-relaxed">
                Whether you are a procurement manager sourcing precision CNC parts or an accredited manufacturer looking for high-intent buyers, LINKSUPPLIED eliminates guesswork.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  href="/discover"
                  variant="dark"
                  size="lg"
                  className="w-full sm:w-auto"
                  iconTrailing={<ArrowRight size={14} weight="bold" />}
                >
                  Submit requirement & discover matches
                </Button>
                <Button
                  href="/register"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  iconTrailing={<ArrowRight size={14} weight="bold" />}
                >
                  Register manufacturing facility
                </Button>
              </div>

              <div className="mt-6 text-[11px] font-mono text-slate/70">
                Direct contact with audited engineering teams · Zero broker commissions
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
