"use client";

import { motion, useReducedMotion } from "motion/react";
import NoiseField from "@/components/ui/NoiseField";
import { ArrowDown, XCircle, CheckCircle } from "@phosphor-icons/react";
import { DURATION, EASE } from "@/lib/animation";

const TRADITIONAL_STEPS = [
  "Thousands of unfiltered listings",
  "Basic keyword search",
  "Irrelevant broker contacts",
  "Manual document chasing",
  "Comparison fatigue",
];

const LINKSUPPLIED_STEPS = [
  "Structured specification",
  "Capability & tolerance filtering",
  "Multi-tier evidence verification",
  "Weighted multi-factor matching",
  "Verified shortlist with reasons",
];

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-14 sm:py-20 md:py-36 bg-graphite overflow-hidden">
      <NoiseField density={0.5} fadeOnScroll />

      <div className="relative z-10 grid-page">
        <div className="col-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ── Left: Problem Statement ──────────────────── */}
            <motion.div
              className="lg:col-span-6"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-silver/70 text-[11px] font-mono uppercase tracking-wider mb-4">
                <span>02 — THE SOURCING PROBLEM</span>
              </div>
              <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] md:text-hero text-surface leading-[1.1] font-bold">
                Finding a capable supplier
                <br />
                <span className="text-copper">is not the same as finding a supplier.</span>
              </h2>
              <motion.p
                className="mt-6 text-base sm:text-lg text-silver/90 leading-relaxed max-w-[48ch]"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: DURATION.slow, ease: EASE.out }}
              >
                Open directories index self-reported keywords and distribute contact details to brokers.
                LINKSUPPLIED evaluates technical specifications against verified plant capabilities —
                delivering a qualified shortlist with transparent engineering reasons.
              </motion.p>
            </motion.div>

            {/* ── Right: Structured Comparison Visual ─────── */}
            <motion.div
              className="lg:col-span-6"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: DURATION.slow,
                delay: 0.2,
                ease: EASE.out,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
                {/* Traditional Discovery Column */}
                <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.03] border border-white/8 backdrop-blur-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 pb-2.5 mb-3 border-b border-white/8">
                      <XCircle size={15} weight="bold" className="text-silver/60 shrink-0" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-silver/70 font-semibold">
                        TRADITIONAL DIRECTORIES
                      </span>
                    </div>

                    <div className="space-y-2">
                      {TRADITIONAL_STEPS.map((step, idx) => (
                        <div key={step} className="flex flex-col items-center">
                          <div className="w-full px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-silver/80 leading-snug">
                            {step}
                          </div>
                          {idx < TRADITIONAL_STEPS.length - 1 && (
                            <ArrowDown size={10} className="text-silver/30 my-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/5 text-center">
                    <span className="text-[10px] font-mono text-warning/90 font-semibold">
                      High Noise · Unvetted Leads
                    </span>
                  </div>
                </div>

                {/* LINKSUPPLIED Sourcing Column */}
                <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.06] border border-copper/30 shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-xs flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-copper/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-copper/20">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={15} weight="fill" className="text-copper shrink-0" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold">
                          LINKSUPPLIED
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase text-copper/80 px-1.5 py-0.5 rounded bg-copper/10 border border-copper/20 font-semibold">
                        STRUCTURED
                      </span>
                    </div>

                    <div className="space-y-2">
                      {LINKSUPPLIED_STEPS.map((step, idx) => (
                        <div key={step} className="flex flex-col items-center">
                          <div className="w-full px-2.5 py-2 rounded-lg bg-copper/[0.08] border border-copper/25 text-xs text-surface font-medium leading-snug">
                            {step}
                          </div>
                          {idx < LINKSUPPLIED_STEPS.length - 1 && (
                            <ArrowDown size={10} className="text-copper/40 my-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-copper/20 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-copper font-semibold">
                      Qualified Matches
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      95% Fit
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
