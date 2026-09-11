"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-16 md:pt-24 pb-0">
      {/* ── Hero header ────────────────────────────── */}
      <div className="grid-page mb-20 md:mb-28">
        <div className="col-content">
          <motion.div
            className="max-w-[52ch]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-hero text-ink leading-tight">
              About
              <br />
              <span className="text-slate/50">LINKSUPPLIED</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate leading-relaxed">
              A business discovery, intelligence, and matching platform
              built for the way B2B actually works.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── What we believe ────────────────────────── */}
      <div className="grid-page mb-20 md:mb-28">
        <div className="col-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <motion.div
              className="lg:col-span-4"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display text-ink">What we believe</h2>
            </motion.div>

            <motion.div
              className="lg:col-span-8 space-y-5"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-base text-slate leading-relaxed max-w-[56ch]">
                We exist because the current tools for finding business
                partners, suppliers, and buyers are built around volume, not
                relevance.
              </p>
              <p className="text-base text-slate leading-relaxed max-w-[56ch]">
                When a manufacturer searches for buyers, or a procurement team
                looks for suppliers, the existing platforms return thousands of
                results sorted by who paid for visibility, not by who actually
                fits the requirement.
              </p>
              <p className="text-base text-slate leading-relaxed max-w-[56ch]">
                The result is hours of manual filtering, unqualified contacts,
                and missed opportunities with businesses that would have been a
                strong match.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── The discovery problem ──────────────────── */}
      <div className="bg-paper py-20 md:py-28 mb-20 md:mb-28">
        <div className="grid-page">
          <div className="col-content">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <motion.div
                className="lg:col-span-4"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-display text-ink">
                  The discovery
                  <br />
                  problem
                </h2>
              </motion.div>

              <motion.div
                className="lg:col-span-8 space-y-5"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-base text-slate leading-relaxed max-w-[56ch]">
                  B2B discovery today is fragmented. Businesses use a mix of
                  trade directories, export databases, industry events,
                  referrals, and general web searches. Each source has its own
                  limitations.
                </p>
                <p className="text-base text-slate leading-relaxed max-w-[56ch]">
                  The deeper problem is not access to information. It is the
                  absence of structured matching. A manufacturer with
                  ISO-certified capacity for 100,000 units per month should not
                  appear alongside a small workshop with no certifications when
                  a buyer needs exactly that capability.
                </p>
                <p className="text-base text-ink font-medium leading-relaxed max-w-[56ch]">
                  But on most platforms today, they do — because the platforms
                  are not designed to evaluate fit.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── What LINKSUPPLIED changes ──────────────── */}
      <div className="grid-page mb-20 md:mb-28">
        <div className="col-content">
          <motion.div
            className="max-w-[48ch] mb-12"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display text-ink">
              What LINKSUPPLIED changes
            </h2>
            <p className="mt-4 text-base text-slate leading-relaxed">
              Instead of showing every business that vaguely matches a keyword,
              we build structured intelligence profiles and evaluate relevance
              across multiple dimensions.
            </p>
          </motion.div>

          {/* Differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Compared to trade directories",
                body: "Platforms like IndiaMART and TradeIndia verify identity — is this a real business? — but not capability. LINKSUPPLIED evaluates capacity, certifications, and fit.",
              },
              {
                title: "Compared to global marketplaces",
                body: "Alibaba mixes paid visibility with audits, making it difficult to distinguish premium listings from genuinely capable suppliers. We separate visibility from verification.",
              },
              {
                title: "Compared to trade intelligence",
                body: "Platforms like Volza provide import/export analytics but don't match businesses or evaluate fit for specific requirements. We combine intelligence with matching.",
              },
              {
                title: "Compared to professional networks",
                body: "LinkedIn finds individual contacts but cannot evaluate production capacity, certifications, or requirement fit at the business level.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="border-l-2 border-copper/20 pl-5 py-1"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="text-sm font-semibold text-ink mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="relative bg-ink py-24 md:py-36 overflow-hidden">
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
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display text-surface">See it in action</h2>
              <p className="mt-4 text-base text-silver max-w-[44ch] mx-auto leading-relaxed">
                The best way to understand LINKSUPPLIED is to try the
                interactive discovery demo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Link
                  href="/discover"
                  className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2 rounded-full bg-copper hover:bg-copper-muted text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(196,133,76,0.32)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_8px_24px_rgba(196,133,76,0.44)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Try the demo</span>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white shrink-0 group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight size={14} weight="bold" />
                  </span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="group inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-silver hover:text-surface text-xs sm:text-sm font-medium tracking-wide border border-white/12 hover:border-white/25 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
                >
                  <span>How it works</span>
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
