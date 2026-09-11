"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

export function CTASection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-ink py-24 md:py-36 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
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
          <motion.h2
            className="text-display md:text-hero text-surface"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Tell us what your business
            <br />
            <span className="text-copper">needs or makes</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-base md:text-lg text-silver max-w-[48ch] mx-auto leading-relaxed"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Register your business on LINKSUPPLIED and start discovering
            the companies that are actually relevant to what you do.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Primary CTA: Register your business */}
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(196,133,76,0.32)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(196,133,76,0.44)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Register your business</span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>

            {/* Secondary CTA: Try the demo */}
            <Link
              href="/discover"
              className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
            >
              <span>Try the demo</span>
              <ArrowRight
                size={14}
                className="text-silver/60 group-hover:text-surface group-hover:translate-x-0.5 transition-all duration-200"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
