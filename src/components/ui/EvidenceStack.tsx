"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { VerificationLayer } from "@/lib/types";
import {
  Buildings,
  Factory,
  Airplane,
  Gauge,
  IdentificationCard,
  ChartLine,
  Check,
} from "@phosphor-icons/react";

interface EvidenceStackProps {
  layers: VerificationLayer[];
  detailed?: boolean;
}

const layerIcons: Record<string, React.ElementType> = {
  "Business Verified": Buildings,
  "Manufacturer Verified": Factory,
  "Trade Verified": Airplane,
  "Capability Verified": Gauge,
  "Identity Verified": IdentificationCard,
  "Interaction Verified": ChartLine,
};

export default function EvidenceStack({
  layers,
  detailed = false,
}: EvidenceStackProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(reduce ? layers.length : 0);

  useEffect(() => {
    if (reduce) {
      const id = requestAnimationFrame(() => setVisibleCount(layers.length));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleCount((prev) => Math.max(prev, index + 1));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    const items = containerRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [reduce, layers.length]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col">
        {layers.map((layer, i) => {
          const Icon = layerIcons[layer.type] || Buildings;
          const isVisible = i < visibleCount;
          const isLast = i === layers.length - 1;

          return (
            <motion.div
              key={layer.type}
              data-index={i}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex items-stretch gap-3 sm:gap-6 lg:gap-8 group"
            >
              {/* ── Visual Verification Spine ────────────────── */}
              <div className="relative flex flex-col items-center shrink-0 w-7 sm:w-9">
                {/* Node indicator on the spine */}
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold shrink-0 z-10 transition-all duration-300 mt-1 ${
                    isVisible
                      ? "bg-copper text-white shadow-[0_2px_8px_rgba(196,133,76,0.3)] border border-copper/40"
                      : "bg-surface text-slate/40 border border-ink/[0.08]"
                  }`}
                >
                  <span>0{i + 1}</span>
                </div>

                {/* Vertical continuous spine line connecting to next node */}
                {!isLast && (
                  <div className="w-[1.5px] sm:w-[2px] flex-1 my-1.5 transition-colors duration-300 bg-ink/[0.08] relative">
                    <div
                      className={`absolute top-0 left-0 w-full bg-copper/40 transition-all duration-500 origin-top ${
                        i < visibleCount - 1 ? "h-full" : "h-0"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* ── Evidence Card ──────────────────────────── */}
              <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-5 sm:pb-7"}`}>
                <div
                  className="bg-paper/70 hover:bg-paper rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-ink/[0.06] transition-all duration-200 hover:shadow-raised hover:border-copper/25"
                  style={{ boxShadow: "var(--shadow-resting)" }}
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 bg-copper/10 border border-copper/15"
                    >
                      <Icon
                        size={20}
                        weight="duotone"
                        className="text-copper"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-ink">
                          {layer.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-emerald-700 bg-emerald-500/[0.08] border border-emerald-500/[0.15]">
                          <Check size={10} weight="bold" />
                          <span>AUDITED</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate mt-1 sm:mt-1.5 leading-relaxed">
                        {layer.description}
                      </p>

                      {/* Required Evidence Documents */}
                      {detailed && layer.evidenceRequired && (
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-ink/[0.04]">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate/50 block mb-2 font-medium">
                            REQUIRED EVIDENCE AUDIT
                          </span>
                          <div className="space-y-1.5 sm:space-y-2">
                            {layer.evidenceRequired.map((evidence, evIdx) => (
                              <div
                                key={evIdx}
                                className="flex items-start gap-2 text-xs sm:text-sm text-ink/75"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-copper/60 mt-1.5 shrink-0" />
                                <span className="leading-snug">{evidence}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
