"use client";

import { motion, useReducedMotion } from "motion/react";
import PinnedPipeline from "@/components/ui/PinnedPipeline";

export function PipelineSection() {
  const reduce = useReducedMotion();

  return (
    <section className="pt-16 md:pt-24 pb-0 bg-paper">
      <div className="grid-page mb-6 md:mb-8">
        <div className="col-content">
          {/* Section heading */}
          <motion.div
            className="max-w-[48ch]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-mono-label text-copper block mb-2.5">
              HOW IT WORKS
            </span>
            <h2 className="text-display text-ink text-2xl sm:text-3xl md:text-4xl font-bold">
              Four steps. One clear pipeline.
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate leading-relaxed">
              Every match comes with an explanation. Here&apos;s how
              LINKSUPPLIED turns a requirement into a ranked shortlist.
            </p>
          </motion.div>
        </div>
      </div>

      <PinnedPipeline />
    </section>
  );
}
