"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { DiscoveryPath } from "@/lib/types";
import { RoleSwitcher } from "@/components/discovery/RoleSwitcher";
import PinnedPipeline from "@/components/ui/PinnedPipeline";
import { discoveryPathContent } from "@/lib/data";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState<DiscoveryPath>("buy");
  const reduce = useReducedMotion();
  const content = discoveryPathContent[activeRole];

  return (
    <div className="pt-16 md:pt-24 pb-0">
      {/* Header */}
      <div className="grid-page mb-12 md:mb-16">
        <div className="col-content">
          <h1 className="text-hero text-ink max-w-[16ch]">
            How LINKSUPPLIED works
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate leading-relaxed max-w-[52ch]">
            Choose your starting point. Whether you need to buy, want to sell,
            are looking for partners, or planning to enter a new market,
            LINKSUPPLIED matches you with the businesses that fit.
          </p>
        </div>
      </div>

      {/* Pipeline sequence */}
      <PinnedPipeline detailed />

      {/* Role-specific discovery paths */}
      <div className="grid-page mt-20 md:mt-32">
        <div className="col-content">
          <motion.div
            className="max-w-[48ch] mb-10"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display text-ink">
              Four ways to discover
            </h2>
          </motion.div>

          <div className="mb-8">
            <RoleSwitcher activeRole={activeRole} onRoleChange={setActiveRole} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left — description */}
                <div>
                  <h3 className="text-2xl font-semibold text-ink mb-3">
                    {content.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed mb-2">
                    {content.subtitle}
                  </p>
                  <p className="text-sm text-slate leading-relaxed">
                    {content.description}
                  </p>
                </div>

                {/* Right — example fields */}
                <div
                  className="bg-surface rounded-2xl p-6"
                  style={{ boxShadow: "var(--shadow-raised)" }}
                >
                  <span className="text-mono-label text-copper block mb-4">
                    WHAT YOU WOULD TELL US
                  </span>
                  <div className="space-y-4">
                    {content.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-ink mb-1.5">
                          {field.label}
                        </label>
                        <div className="px-3.5 py-2.5 bg-paper rounded-lg text-sm text-silver border border-ink/[0.05]">
                          {field.placeholder}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/[0.05]">
                    <Link
                      href="/discover"
                      className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(196,133,76,0.32)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(196,133,76,0.44)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      <span>Try the interactive demo</span>
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                        <ArrowRight size={14} weight="bold" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pre-footer CTA ──────────────────────────── */}
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
          <div className="col-content text-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display md:text-hero text-surface">
                See it in action
              </h2>
              <p className="mt-4 text-base md:text-lg text-silver max-w-[48ch] mx-auto leading-relaxed">
                The best way to understand LINKSUPPLIED is to try the
                interactive discovery demo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Link
                  href="/discover"
                  className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(196,133,76,0.32)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(196,133,76,0.44)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Try the interactive demo</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Register your business</span>
                  <ArrowRight
                    size={14}
                    className="text-silver/60 group-hover:text-surface group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
