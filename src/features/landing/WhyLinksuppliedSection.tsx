"use client";

import { motion, useReducedMotion } from "motion/react";
import { X, Check, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/animation";

const comparisons = [
  {
    old: "Search keywords and scroll through hundreds of unvetted directory listings",
    now: "Specify batch size, tolerances, and compliance to receive ranked matches",
  },
  {
    old: "Generic badges and icons with no access to underlying verification documents",
    now: "Inspectable multi-tier criteria showing the exact documentation required",
  },
  {
    old: "Identical search results whether you need 500 prototype units or 500,000 production",
    now: "Matching engine factors in verified monthly capacity, MOQ, and plant equipment",
  },
  {
    old: "Unfiltered contact distribution leading to unsolicited broker phone calls",
    now: "Direct introduction to vetted manufacturers matching your technical requirements",
  },
  {
    old: "Static catalog pages with unverified self-reported claims and stock photos",
    now: "Structured capability profile with audited machinery, plant area, and compliance",
  },
];

export function WhyLinksuppliedSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-paper">
      <div className="grid-page">
        <div className="col-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* ── Left heading ────────────────────── */}
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-32"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
            >
              <span className="text-mono-label text-copper block mb-2">
                03 — A BETTER APPROACH
              </span>
              <h2 className="text-display text-ink text-2xl sm:text-3xl lg:text-4xl font-bold">
                Why is this different from searching a directory?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink/90 leading-relaxed max-w-[36ch]">
                Generic directories index marketing websites. LINKSUPPLIED indexes verified production machinery, audited tolerances, and certified plant capacity.
              </p>

              {/* Sourcing Model Workflow Comparison Box */}
              <div className="mt-8 p-4 rounded-2xl bg-surface border border-ink/[0.08] shadow-xs space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate/70 block mb-1 font-semibold">
                    Traditional Supplier Search
                  </span>
                  <div className="text-xs font-mono text-slate flex flex-wrap items-center gap-1">
                    <span>Keyword search</span>
                    <span className="text-slate/40">→</span>
                    <span>Unfiltered list</span>
                    <span className="text-slate/40">→</span>
                    <span>Broker calls</span>
                    <span className="text-slate/40">→</span>
                    <span className="text-rose-700 font-bold">Uncertain capability</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-ink/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-copper font-bold block mb-1">
                    LINKSUPPLIED Sourcing Formula
                  </span>
                  <div className="text-xs font-mono text-ink flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="px-1.5 py-0.5 rounded bg-copper/10 text-copper font-bold">Requirement</span>
                    <span className="text-copper font-bold">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-copper/10 text-copper font-bold">Capability</span>
                    <span className="text-copper font-bold">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-copper/10 text-copper font-bold">Verification</span>
                    <span className="text-copper font-bold">→</span>
                    <span className="px-1.5 py-0.5 rounded bg-copper text-surface font-bold">Quote</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right comparisons ───────────────── */}
            <div className="lg:col-span-8 space-y-4">
              {comparisons.map((row, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: DURATION.smooth,
                    delay: i * 0.06,
                    ease: EASE.out,
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
                >
                  {/* Old way */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-ink/[0.025] border border-ink/[0.04]">
                    <X
                      size={15}
                      className="text-silver shrink-0 mt-1"
                      weight="bold"
                    />
                    <p className="text-sm sm:text-base text-slate leading-relaxed line-through decoration-silver/60">
                      {row.old}
                    </p>
                  </div>

                  {/* LINKSUPPLIED way */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-ink/[0.08]"
                    style={{ boxShadow: "var(--shadow-resting)" }}
                  >
                    <Check
                      size={15}
                      className="text-copper shrink-0 mt-1"
                      weight="bold"
                    />
                    <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
                      {row.now}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Concise Manufacturer Section */}
              <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-surface border border-copper/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
                    FOR MANUFACTURERS & FACTORIES
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-ink">
                  Manufacturers: make your capabilities discoverable.
                </h3>

                <p className="text-sm sm:text-base text-slate leading-relaxed">
                  Create a structured capability profile so procurement teams can understand what you manufacture, what equipment you operate, and what requirements you can support.
                </p>

                {/* 4-step roadmap */}
                <div className="py-2 flex items-center gap-1.5 text-xs font-mono text-slate/80 flex-wrap">
                  <span className="font-semibold text-ink">Company profile</span>
                  <span className="text-copper font-bold">→</span>
                  <span className="font-semibold text-ink">Capabilities</span>
                  <span className="text-copper font-bold">→</span>
                  <span className="font-semibold text-ink">Verification</span>
                  <span className="text-copper font-bold">→</span>
                  <span className="font-bold text-copper">Relevant inquiries</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                  <Button
                    href="/register?role=supplier"
                    variant="primary"
                    size="md"
                    iconTrailing={<ArrowRight size={13} weight="bold" />}
                  >
                    Join as a supplier
                  </Button>
                  <span className="text-xs text-slate/70">
                    Build your manufacturing profile · Free facility onboarding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
