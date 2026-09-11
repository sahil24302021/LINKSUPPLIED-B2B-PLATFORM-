"use client";

import { motion, useReducedMotion } from "motion/react";
import NoiseField from "@/components/ui/NoiseField";

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-28 md:py-40 bg-graphite overflow-hidden">
      <NoiseField density={0.6} fadeOnScroll />

      <div className="relative z-10 grid-page">
        <div className="col-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* ── Left: Statement ──────────────────── */}
            <motion.div
              className="lg:col-span-7"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[clamp(1.75rem,5.5vw,2.25rem)] md:text-hero text-surface leading-tight">
                Every business needs
                <br />
                other businesses.
              </h2>
              <p className="mt-4 text-[clamp(1.75rem,5.5vw,2.25rem)] md:text-display text-silver/50 leading-tight">
                Finding one is easy.
                <br />
                Finding the right one isn&apos;t.
              </p>
              <motion.p
                className="mt-8 text-base text-silver/70 leading-relaxed max-w-[44ch]"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Directories give you thousands of results. LINKSUPPLIED
                gives you the handful that actually match — with reasons
                for each.
              </motion.p>
            </motion.div>

            {/* ── Right: Reduction visual ──────────── */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex flex-col items-center gap-4 w-full max-w-[200px]">
                {/* Thousands — mass of faint dots */}
                <div className="w-full">
                  <span className="text-mono-label text-silver/30 block mb-2 text-center text-[9px]">
                    DIRECTORY RESULTS
                  </span>
                  <div className="grid grid-cols-10 gap-[3px] justify-items-center">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[5px] h-[5px] rounded-full bg-silver/20"
                        initial={reduce ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + i * 0.008,
                          duration: 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Funnel line */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-8 bg-silver/15" />
                  <div className="w-4 h-px bg-copper/30" />
                  <div className="w-px h-8 bg-silver/15" />
                </div>

                {/* Handful — bright, distinct */}
                <div className="w-full">
                  <span className="text-mono-label text-copper/60 block mb-2 text-center text-[9px]">
                    LINKSUPPLIED MATCHES
                  </span>
                  <div className="flex justify-center gap-3">
                    {[92, 87, 64].map((score, i) => (
                      <motion.div
                        key={score}
                        className="flex flex-col items-center"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.8 + i * 0.1,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            score >= 80
                              ? "bg-success/15"
                              : score >= 60
                              ? "bg-copper/15"
                              : "bg-warning/15"
                          }`}
                        >
                          <span
                            className={`font-mono text-sm font-bold tabular-nums ${
                              score >= 80
                                ? "text-success"
                                : score >= 60
                                ? "text-copper"
                                : "text-warning"
                            }`}
                          >
                            {score}
                          </span>
                        </div>
                      </motion.div>
                    ))}
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
