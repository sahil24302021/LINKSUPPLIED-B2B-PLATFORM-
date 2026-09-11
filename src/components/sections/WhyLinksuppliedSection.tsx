"use client";

import { motion, useReducedMotion } from "motion/react";
import { X, Check } from "@phosphor-icons/react";

const comparisons = [
  {
    old: "Search by keyword, scroll through thousands of results",
    now: "Describe what you need, get a ranked list of who fits",
  },
  {
    old: "Badges and icons with no explanation of what they mean",
    now: "Every verification shows the evidence that backs it",
  },
  {
    old: "Same results whether you need 500 or 500,000 units",
    now: "Matches factor in capacity, MOQ, certifications, and market",
  },
  {
    old: "Buyers search for suppliers. Suppliers wait to be found",
    now: "Both sides get matched. Sellers discover relevant buyers too",
  },
  {
    old: "Company page with product photos and a contact button",
    now: "Business intelligence profile with verified capabilities",
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
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display text-ink">
                Relevance,
                <br />
                not volume
              </h2>
              <p className="mt-4 text-base text-slate leading-relaxed max-w-[32ch]">
                The platforms you know show you everything.
                LINKSUPPLIED shows you what matters.
              </p>
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
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
                >
                  {/* Old way */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-ink/[0.025]">
                    <X
                      size={14}
                      className="text-silver/50 shrink-0 mt-0.5"
                      weight="bold"
                    />
                    <p className="text-sm text-slate/60 leading-relaxed line-through decoration-silver/30">
                      {row.old}
                    </p>
                  </div>

                  {/* LINKSUPPLIED way */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl bg-surface"
                    style={{ boxShadow: "var(--shadow-resting)" }}
                  >
                    <Check
                      size={14}
                      className="text-copper shrink-0 mt-0.5"
                      weight="bold"
                    />
                    <p className="text-sm text-ink font-medium leading-relaxed">
                      {row.now}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
