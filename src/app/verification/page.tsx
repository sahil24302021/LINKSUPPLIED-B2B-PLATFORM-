"use client";

import { motion, useReducedMotion } from "motion/react";
import EvidenceStack from "@/components/ui/EvidenceStack";
import { verificationLayers } from "@/lib/data";
import {
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Buildings,
  Factory,
  Airplane,
  Gauge,
  IdentificationCard,
  ChartLine,
} from "@phosphor-icons/react";
import Link from "next/link";

const layerIcons: Record<string, React.ElementType> = {
  "Business Verified": Buildings,
  "Manufacturer Verified": Factory,
  "Trade Verified": Airplane,
  "Capability Verified": Gauge,
  "Identity Verified": IdentificationCard,
  "Interaction Verified": ChartLine,
};

export default function VerificationPage() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-16 md:pt-24 pb-0 bg-paper min-h-screen">
      <div className="grid-page">
        <div className="col-content">
          {/* Header */}
          <motion.div
            className="max-w-[56ch] mb-12 md:mb-16"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 mb-4">
              <ShieldCheck size={14} weight="bold" className="text-copper" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
                TRUST ARCHITECTURE · METHODOLOGY
              </span>
            </div>

            <h1 className="text-display sm:text-hero text-ink font-bold">
              Verification model
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate leading-relaxed">
              Every verification badge on LINKSUPPLIED is backed by documented,
              auditable evidence. We do not use decorative trust symbols or accept
              unverified self-reporting. Each layer represents an independent audit
              dimension with clear evidentiary criteria.
            </p>

            {/* Methodology Highlights Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pt-6 border-t border-ink/[0.06]">
              {[
                "6 Independent Layers",
                "0 Decorative Checkmarks",
                "Audited Primary Registries",
                "Continuous Refresh",
              ].map((pill, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-ink/[0.06] text-xs font-mono text-ink/75 shadow-xs"
                >
                  <CheckCircle size={12} weight="fill" className="text-emerald-600" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Evidence Stack (Preserving exact core component intact) */}
          <div className="bg-surface rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-ink/[0.06] shadow-sm mb-16 md:mb-24">
            <div className="mb-8 pb-6 border-b border-ink/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-mono-label text-copper block mb-1">
                  LAYER SPECIFICATION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink">
                  Six layers of required evidence
                </h2>
              </div>
              <span className="text-xs font-mono text-slate/70">
                Click any layer to inspect criteria
              </span>
            </div>
            <EvidenceStack layers={verificationLayers} detailed />
          </div>

          {/* Why this matters — Elevated Editorial Grid */}
          <motion.div
            className="mt-16 md:mt-20 pt-16 border-t border-ink/[0.08]"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="max-w-[52ch] mb-10">
              <span className="text-mono-label text-copper block mb-2">
                EVALUATION RATIONALE
              </span>
              <h2 className="text-display text-ink font-bold">
                Why this matters
              </h2>
              <p className="mt-3 text-slate text-sm sm:text-base leading-relaxed">
                Most directories rely on self-declared capabilities and superficial
                profiles. In high-stakes manufacturing and cross-border procurement,
                an unverified claim is an unacceptable operational risk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {verificationLayers.map((layer) => {
                const Icon = layerIcons[layer.title] || ShieldCheck;
                return (
                  <div
                    key={layer.type}
                    className="p-6 rounded-2xl bg-surface border border-ink/[0.06] shadow-xs flex flex-col justify-between hover:border-copper/25 transition-colors"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-copper/10 border border-copper/15 flex items-center justify-center mb-4">
                        <Icon size={20} weight="duotone" className="text-copper" />
                      </div>
                      <h3 className="text-base font-bold text-ink mb-2">
                        {layer.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate leading-relaxed">
                        {layer.whyItMatters}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-ink/[0.04] flex items-center justify-between text-[11px] font-mono text-copper font-medium">
                      <span>VERIFIED METRIC</span>
                      <span className="text-emerald-700 font-semibold uppercase">Auditable</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Registration / Trust CTA Callout ──────────────── */}
      <section className="relative bg-ink py-24 md:py-36 overflow-hidden mt-20 md:mt-32">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248,247,244,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248,247,244,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 grid-page">
          <div className="col-content text-center max-w-3xl mx-auto">
            <span className="text-mono-label text-copper block mb-3">
              JOIN THE NETWORK
            </span>
            <h2 className="text-display md:text-hero text-surface">
              Ready to establish your company&apos;s verified profile?
            </h2>
            <p className="mt-4 text-base md:text-lg text-silver max-w-[50ch] mx-auto leading-relaxed">
              Register your business on LINKSUPPLIED. Our intelligence engine
              verifies your capabilities and connects you with verified partners
              based on real production compatibility.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(196,133,76,0.32)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(196,133,76,0.44)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Register your business</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
              <Link
                href="/discover"
                className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
              >
                <span>Explore sample matches</span>
                <ArrowRight
                  size={14}
                  className="text-silver/60 group-hover:text-surface group-hover:translate-x-0.5 transition-all duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
