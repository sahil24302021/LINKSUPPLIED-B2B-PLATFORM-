"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle, ShieldCheck, Factory, Target } from "@phosphor-icons/react";
import { DURATION, EASE } from "@/lib/animation";

// TODO: real asset — team executive portraits & on-site manufacturing metrology photographs

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-16 md:pt-24 pb-0 bg-paper min-h-screen">
      {/* ── Hero Header ────────────────────────────── */}
      <div className="grid-page mb-16 md:mb-24">
        <div className="col-content">
          <motion.div
            className="max-w-[62ch]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE.out }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-copper/10 border border-copper/20 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
                OPERATING PHILOSOPHY & ARCHITECTURE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.08]">
              About LINKSUPPLIED.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate leading-relaxed">
              A precision sourcing and capability matching platform built for how modern industrial B2B procurement actually operates: factual, evidence-backed, and zero decorative sponsor noise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Core Operating Principles (Step Diagram) ──── */}
      <div className="grid-page mb-20 md:mb-28">
        <div className="col-content">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs font-bold text-copper uppercase tracking-wider block mb-1">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              What we believe
            </h2>
            <p className="mt-2 text-base text-slate leading-relaxed">
              Industrial procurement is too critical for speculative directories. Every match must be grounded in physical machine capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                icon: Target,
                title: "Relevance over Volume",
                highlight: "Deterministic Fit",
                body: "Returning 2,000 unverified suppliers isn't a feature — it's unpaid labor for the buyer. We show only manufacturers that actually own the certified tooling, materials, and envelope to manufacture your part.",
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Audited Verification",
                highlight: "Primary Registry Proof",
                body: "Trust cannot be bought with monthly subscriptions. Verification on LINKSUPPLIED requires primary documentary evidence, physical machinery audits, and metrology calibration logs anchored by SHA-256 hashes.",
              },
              {
                step: "03",
                icon: Factory,
                title: "Direct Commercial Flow",
                highlight: "Zero Middleman Fees",
                body: "Enterprise buyers interact directly with verified engineering desks. No concealed broker markups, no commission tolls on repeat orders, and no opaque quotation re-routing.",
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.step}
                  className="bg-surface rounded-2xl border border-ink/[0.08] hover:border-ink/[0.18] p-6 shadow-xs flex flex-col justify-between transition-all group"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={reduce ? undefined : { y: -3, transition: { duration: DURATION.fast, ease: EASE.out } }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: DURATION.smooth, delay: i * 0.1, ease: EASE.out }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/[0.06]">
                      <span className="font-mono text-xs font-bold text-copper bg-copper/10 px-2.5 py-0.5 rounded-md">
                        TENET {pillar.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-paper border border-ink/[0.06] flex items-center justify-center text-slate group-hover:text-ink transition-colors">
                        <Icon size={16} />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-ink">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-copper font-semibold block mt-0.5 mb-2.5">
                      {pillar.highlight}
                    </span>
                    <p className="text-sm sm:text-base text-slate leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Before vs After Architecture Diagram ───────── */}
      <div className="bg-surface py-20 md:py-28 mb-20 md:mb-28 border-y border-ink/[0.06]">
        <div className="grid-page">
          <div className="col-content">
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold text-copper uppercase tracking-wider block mb-1">
                Structural Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                The discovery problem — and the cure
              </h2>
              <p className="mt-2 text-base text-slate leading-relaxed">
                Traditional trade portals optimize for advertising clicks. LINKSUPPLIED is an engineering intelligence network designed to resolve technical feasibility.
              </p>
            </div>

            {/* Architecture Diagram Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Legacy Directory Model */}
              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/20 p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-200/60">
                  <div className="flex items-center gap-2">
                    <XCircle size={18} weight="fill" className="text-rose-600" />
                    <span className="font-bold text-ink text-sm sm:text-base">Legacy Trade Portals</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded">
                    Ad-Revenue Model
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-surface border border-rose-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-rose-700 mt-0.5">1</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Vague Keyword Search</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Buyers type &quot;precision CNC parts&quot; into open search boxes with zero geometric parameters.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface border border-rose-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-rose-700 mt-0.5">2</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Sponsored Search Results</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Top 200 listings awarded to vendors paying maximum advertising fees, regardless of machine fit.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface border border-rose-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-rose-700 mt-0.5">3</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Unqualified Middlemen & Brokers</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Inquiries land in sales spam boxes; trade intermediaries mark up prices without owning machines.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* LINKSUPPLIED Deterministic Engine */}
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/20 p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} weight="fill" className="text-emerald-600" />
                    <span className="font-bold text-ink text-sm sm:text-base">LINKSUPPLIED Engine</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                    Factual Capability Model
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-surface border border-emerald-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-700 mt-0.5">1</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Parametric Sourcing Brief</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Material grade, tolerance (ISO h9/g6), monthly batch volume, and DAP destination strictly specified.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface border border-emerald-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-700 mt-0.5">2</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Deterministic Machine Envelope Match</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Matches only plants operating verified spindles, drawbenches, or press capacity meeting part tolerances.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface border border-emerald-100 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-700 mt-0.5">3</span>
                    <div>
                      <strong className="text-ink block text-xs sm:text-sm">Direct Engineering Desk & Binding Bids</strong>
                      <span className="text-slate text-xs sm:text-sm leading-relaxed block mt-0.5">Commercial quotations with explicit tooling NRE, lead times, and primary audit proofs attached.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Market Differentiators ──────────────────── */}
      <div className="grid-page mb-20 md:mb-28">
        <div className="col-content">
          <div className="max-w-[54ch] mb-10">
            <span className="font-mono text-xs font-bold text-copper uppercase tracking-wider block mb-1">
              Positioning
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              What LINKSUPPLIED changes
            </h2>
            <p className="mt-2 text-base text-slate leading-relaxed">
              Instead of showing every entity that paid for a banner, we build verifiable capability dossiers and evaluate fit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "vs. Trade Directories",
                subtitle: "IndiaMART, TradeIndia",
                diff: "They verify corporate identity (is this a registered GST?). We verify machine envelope, metrology tolerances, and actual production throughput.",
              },
              {
                title: "vs. B2B Marketplaces",
                subtitle: "Alibaba, Global Sources",
                diff: "They blend sponsored ads into search results. We enforce total separation between search ranking and paid sponsorship — zero decorative badges.",
              },
              {
                title: "vs. Trade Data Tools",
                subtitle: "Volza, ImportGenius",
                diff: "They provide historic bill-of-lading logs without matching capability or active capacity. We connect current factory availability to live procurement.",
              },
              {
                title: "vs. Professional Networks",
                subtitle: "LinkedIn",
                diff: "They map individual sales reps. We evaluate physical machinery, ISO/IATF certifications, and CMM inspection calibration records at the company level.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="p-5 rounded-2xl bg-surface border border-ink/[0.08] shadow-2xs hover:border-ink/[0.18] transition-all space-y-2"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduce ? undefined : { y: -2, transition: { duration: DURATION.fast, ease: EASE.out } }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: DURATION.smooth, delay: i * 0.08, ease: EASE.out }}
              >
                <span className="font-mono text-[10px] uppercase font-bold text-copper block">
                  {item.subtitle}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-ink">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate leading-relaxed">
                  {item.diff}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Conversion Strip ──────────────────── */}
      <section className="relative bg-ink py-20 md:py-28 overflow-hidden text-surface">
        <div className="relative z-10 grid-page">
          <div className="col-content text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight">
              Start precision sourcing
            </h2>
            <p className="mt-4 text-sm sm:text-base text-silver leading-relaxed">
              Submit your technical component requirements to receive structured, verified matches.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/discover"
                className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Submit Requirement</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
              <Link
                href="/how-it-works"
                className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm transition-all duration-200"
              >
                <span>How it works</span>
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
