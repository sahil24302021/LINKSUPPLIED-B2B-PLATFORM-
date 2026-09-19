"use client";

import { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import {
  ClipboardText,
  Brain,
  ListNumbers,
  ShieldCheck,
  Handshake,
  CheckCircle,
} from "@phosphor-icons/react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinnedPipelineProps {
  detailed?: boolean;
}

const stages = [
  {
    key: "need",
    title: "Tell us what you need",
    step: "01",
    icon: ClipboardText,
    description:
      "Product, material, process, batch quantity, precision tolerance, and target delivery requirements.",
    detail:
      "Enter your engineering criteria directly — material grade (e.g. EN8 / 316L), process (CNC turning, forging), required batch volume, critical precision tolerances (e.g. ±0.02 mm), and target delivery location.",
  },
  {
    key: "structure",
    title: "We structure the requirement",
    step: "02",
    icon: Brain,
    description:
      "Raw engineering inputs become a structured, deterministic sourcing brief.",
    detail:
      "LINKSUPPLIED structures raw specifications into standardized material definitions, machine envelope bounds, and auditable feasibility criteria — eliminating supplier guesswork and ambiguity.",
  },
  {
    key: "suppliers",
    title: "Review relevant suppliers",
    step: "03",
    icon: ListNumbers,
    description:
      "Inspect matched manufacturers with transparent capabilities, tolerances, and capacity.",
    detail:
      "Evaluate categorized manufacturers vs distributors with factual alignment across raw material, machine tolerances, monthly capacity, and verified operational status.",
  },
  {
    key: "evidence",
    title: "Inspect the evidence",
    step: "04",
    icon: ShieldCheck,
    description:
      "Examine primary audit documents, factory property records, and equipment calibration logs.",
    detail:
      "Review auditable documentation before outreach: factory title deeds, machine maintenance logs, CMM calibration records, and ISO/IATF compliance certificates.",
  },
  {
    key: "rfq",
    title: "Request quotations",
    step: "05",
    icon: Handshake,
    description:
      "Dispatch formal RFQs and receive transparent commercial bids with pricing, lead times, and terms.",
    detail:
      "Collect binding bids directly from verified plants — unit prices, tooling NRE, production lead times, MOQ, and payment terms — with zero intermediary commissions.",
  },
];

export default function PinnedPipeline({
  detailed = false,
}: PinnedPipelineProps) {
  const reduce = useReducedMotion();
  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  // Smooth click navigation to any stage checkpoint (desktop only)
  const scrollToStage = useCallback((stageIdx: number) => {
    if (!stRef.current) return;
    const st = stRef.current;
    const targetProgress = stageIdx / (stages.length - 1);
    const targetScroll = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // ── GSAP matchMedia: Desktop Pinned vs Mobile Unpinned Flow ──
  useIsomorphicLayoutEffect(() => {
    if (reduce) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP: Pinned timeline (min-width: 768px, untouched) ──
    mm.add("(min-width: 768px)", () => {
      const wrap = desktopWrapRef.current;
      if (!wrap) return;

      const textPanels = gsap.utils.toArray<HTMLElement>(".pipeline-text-panel", wrap);
      const visualPanels = gsap.utils.toArray<HTMLElement>(".pipeline-visual-panel", wrap);

      textPanels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 24, scale: 0.98 });
        }
      });

      visualPanels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, x: 0, scale: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 20, x: 8, scale: 0.97 });
        }
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${window.innerHeight * 4.2}`,
          pin: true,
          scrub: 0.65,
          snap: {
            snapTo: [0, 0.25, 0.5, 0.75, 1.0],
            duration: { min: 0.25, max: 0.55 },
            delay: 0.08,
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let stage = 0;
            if (p >= 0.875) {
              stage = 4;
            } else if (p >= 0.625) {
              stage = 3;
            } else if (p >= 0.375) {
              stage = 2;
            } else if (p >= 0.125) {
              stage = 1;
            } else {
              stage = 0;
            }
            setActiveStage((prev) => (prev !== stage ? stage : prev));
          },
        },
      });

      stRef.current = tl.scrollTrigger as ScrollTrigger;

      for (let i = 0; i < stages.length - 1; i++) {
        const stepBase = i * 1.0;
        const exitStart = stepBase + 0.36;
        const exitDuration = 0.30;
        const enterStart = stepBase + 0.60;
        const enterDuration = 0.30;

        tl.to(
          textPanels[i],
          {
            autoAlpha: 0,
            y: -22,
            scale: 0.98,
            duration: exitDuration,
            ease: "power2.in",
          },
          exitStart
        );

        tl.to(
          visualPanels[i],
          {
            autoAlpha: 0,
            y: -18,
            x: -8,
            scale: 0.97,
            duration: exitDuration,
            ease: "power2.in",
          },
          exitStart
        );

        tl.fromTo(
          textPanels[i + 1],
          { autoAlpha: 0, y: 24, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: enterDuration,
            ease: "power2.out",
          },
          enterStart
        );

        tl.fromTo(
          visualPanels[i + 1],
          { autoAlpha: 0, y: 20, x: 8, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: enterDuration,
            ease: "power2.out",
          },
          enterStart
        );
      }

      tl.set({}, {}, 4.0);
    });

    // ── MOBILE: Sequential 1-by-1 Pinned Scrub (max-width: 767px) ──
    mm.add("(max-width: 767px)", () => {
      const wrap = mobileWrapRef.current;
      if (!wrap) return;

      const panels = gsap.utils.toArray<HTMLElement>(".mobile-stage-panel", wrap);

      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 20, scale: 0.98 });
        }
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          scrub: 0.65,
          snap: {
            snapTo: [0, 0.25, 0.5, 0.75, 1.0],
            duration: { min: 0.25, max: 0.55 },
            delay: 0.08,
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let stage = 0;
            if (p >= 0.875) {
              stage = 4;
            } else if (p >= 0.625) {
              stage = 3;
            } else if (p >= 0.375) {
              stage = 2;
            } else if (p >= 0.125) {
              stage = 1;
            } else {
              stage = 0;
            }
            setActiveStage((prev) => (prev !== stage ? stage : prev));
          },
        },
      });

      for (let i = 0; i < stages.length - 1; i++) {
        const stepBase = i * 1.0;
        const exitStart = stepBase + 0.36;
        const exitDuration = 0.30;
        const enterStart = stepBase + 0.60;
        const enterDuration = 0.30;

        tl.to(
          panels[i],
          {
            autoAlpha: 0,
            y: -18,
            scale: 0.98,
            duration: exitDuration,
            ease: "power2.in",
          },
          exitStart
        );

        tl.fromTo(
          panels[i + 1],
          { autoAlpha: 0, y: 20, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: enterDuration,
            ease: "power2.out",
          },
          enterStart
        );
      }

      tl.set({}, {}, 4.0);
    });

    return () => mm.revert();
  }, [reduce]);

  // Reduced motion accessible fallback
  if (reduce) {
    return (
      <div className="grid-page py-12">
        <div className="col-content space-y-12">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.key}
                className="flex flex-col md:flex-row gap-8 items-start justify-between p-6 rounded-2xl bg-surface border border-ink/[0.06]"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center shrink-0">
                    <Icon size={20} weight="duotone" className="text-copper" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-copper font-semibold block mb-1">
                      {stage.step} — {stage.title.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-ink">{stage.title}</h3>
                    <p className="text-sm text-slate mt-2 leading-relaxed max-w-[42ch]">
                      {detailed ? stage.detail : stage.description}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center">
                  <StageVisual stageIndex={i} compact={true} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── MOBILE RENDER (block md:hidden) — Sequential 1-by-1 Pinned Scrub ── */}
      <div
        ref={mobileWrapRef}
        className="block md:hidden relative w-full h-[100dvh] overflow-hidden bg-paper select-none"
      >
        {/* Compact sticky stage indicator for mobile */}
        <div className="absolute top-[56px] left-0 right-0 z-30 flex items-center justify-center w-full px-3 py-2 bg-paper/95 backdrop-blur-sm border-b border-ink/[0.04]">
          <div className="flex items-center gap-1">
            {stages.map((stage, i) => {
              const isActive = i === activeStage;
              const isPast = i < activeStage;
              return (
                <div key={stage.key} className="flex items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold font-mono transition-all duration-300 ${
                      isActive
                        ? "bg-copper text-surface shadow-sm scale-110"
                        : isPast
                        ? "bg-copper/20 text-copper"
                        : "bg-ink/[0.06] text-slate/50"
                    }`}
                  >
                    {stage.step}
                  </div>
                  {i < stages.length - 1 && (
                    <div
                      className={`w-4 h-px transition-colors duration-300 ${
                        isPast ? "bg-copper/40" : "bg-ink/[0.08]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sequential 1-by-1 cards: exactly one card in the viewport at a time */}
        <div className="absolute inset-0 flex items-center pt-24 pb-4 px-3 overflow-hidden">
          <div className="relative w-full grid [grid-template-areas:'mobile-stage'] items-center justify-items-center">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const isActive = i === activeStage;
              return (
                <div
                  key={stage.key}
                  className="mobile-stage-panel [grid-area:mobile-stage] w-full max-w-[350px] mx-auto rounded-2xl bg-surface border border-ink/[0.08] p-4 shadow-sm"
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-copper/8 border border-copper/15 flex items-center justify-center shrink-0">
                      <Icon
                        size={16}
                        weight="duotone"
                        className="text-copper"
                      />
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-copper tracking-wider uppercase">
                      STEP {stage.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-ink leading-tight tracking-tight mb-1">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-slate leading-snug mb-3">
                    {stage.description}
                  </p>

                  <div className="w-full flex justify-center">
                    <StageVisual stageIndex={i} compact={true} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP RENDER (hidden md:block) — Pinned timeline unchanged ── */}
      <div
        ref={desktopWrapRef}
        className="hidden md:block relative w-full h-[100dvh] overflow-hidden bg-paper"
      >
      {/* FIXED/PINNED 5-STEP HORIZONTAL NAVIGATION */}
      <div className="absolute top-[80px] md:top-[88px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-full px-2 sm:px-3 max-w-full pointer-events-auto">
        <div className="flex items-center gap-0.5 sm:gap-2 bg-paper/95 backdrop-blur-sm py-1 px-1.5 sm:px-2 rounded-full border border-ink/[0.04] shadow-xs max-w-[calc(100vw-16px)] overflow-x-auto [scrollbar-width:none]">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = i === activeStage;
            return (
              <div key={stage.key} className="flex items-center gap-0.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToStage(i)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? "bg-copper text-surface shadow-sm font-semibold scale-102"
                      : "bg-ink/[0.04] text-slate/50 hover:bg-ink/[0.07] hover:text-ink"
                  }`}
                >
                  <Icon
                    size={13}
                    weight={isActive ? "fill" : "regular"}
                    className="shrink-0"
                  />
                  <span>{stage.title}</span>
                </button>
                {i < stages.length - 1 && (
                  <div
                    className={`w-1.5 sm:w-5 h-px transition-colors duration-300 ${
                      i < activeStage ? "bg-copper/40" : "bg-ink/[0.08]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTROLLED STAGE AREA: ONE STAGE, ONE VIEWPORT */}
      <div className="absolute inset-0 flex items-center pt-32 md:pt-36 pb-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* LEFT: Text Stage Area (Stacked via CSS Grid) */}
            <div className="relative w-full grid [grid-template-areas:'stage-text'] items-center min-h-[140px] md:min-h-[220px]">
              {stages.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i === activeStage;
                return (
                  <div
                    key={stage.key}
                    className="pipeline-text-panel [grid-area:stage-text] w-full"
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-copper/8 border border-copper/15 flex items-center justify-center shrink-0">
                        <Icon
                          size={20}
                          weight="duotone"
                          className="text-copper"
                        />
                      </div>
                      <span className="font-mono text-xs md:text-sm font-semibold text-copper tracking-wider uppercase">
                        STEP {stage.step}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight tracking-tight">
                      {stage.title}
                    </h3>

                    <p className="mt-2 md:mt-4 text-sm sm:text-base text-slate leading-relaxed max-w-[40ch]">
                      {detailed ? stage.detail : stage.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Visual Stage Area (Stacked via CSS Grid) */}
            <div className="relative w-full grid [grid-template-areas:'stage-visual'] items-center justify-items-center min-h-[260px] md:min-h-[340px]">
              {stages.map((stage, i) => {
                const isActive = i === activeStage;
                return (
                  <div
                    key={stage.key}
                    className="pipeline-visual-panel [grid-area:stage-visual] w-full flex items-center justify-center"
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <StageVisual stageIndex={i} compact={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

/* ── Stage-specific miniature product UI preview panels ─────── */

function StageVisual({
  stageIndex,
  compact: _compact = false,
}: {
  stageIndex: number;
  compact?: boolean;
}) {
  // STAGE 01: Tell us what you need (Miniature Procurement Intake Form)
  if (stageIndex === 0) {
    return (
      <div
        className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 border border-ink/[0.08] space-y-2.5 shadow-sm"
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
          <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
            BUYER INTAKE · REQUIREMENTS
          </span>
          <SampleDataTag />
        </div>

        {[
          { label: "Part Specification", value: "Round Bright Bar (Turned & Ground)" },
          { label: "Material Grade", value: "EN8 Carbon Steel (Normalized)" },
          { label: "Manufacturing Process", value: "CNC Turning & Centerless Grinding" },
          { label: "Batch Quantity", value: "2,000 kg / month (MOQ: 500 kg)" },
          { label: "Critical Tolerance", value: "±0.02 mm (Shaft OD)" },
          { label: "Delivery Destination", value: "Mumbai, India (Ex-Works / CIF)" },
        ].map((field) => (
          <div key={field.label}>
            <span className="text-[9px] text-slate/60 block mb-0.5 font-mono uppercase tracking-wider">
              {field.label}
            </span>
            <div className="px-2.5 py-1.5 bg-paper rounded-lg border border-ink/[0.04] text-xs text-ink font-medium truncate">
              {field.value}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // STAGE 02: We structure the requirement (Miniature Structured Sourcing Brief)
  if (stageIndex === 1) {
    return (
      <div
        className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 border border-ink/[0.08] space-y-3 shadow-sm"
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
              STRUCTURED SOURCING BRIEF
            </span>
            <span className="font-mono text-[10px] font-bold text-ink bg-paper px-1.5 py-0.5 rounded border border-ink/[0.08]">
              REQ-2026-0841
            </span>
          </div>
          <SampleDataTag />
        </div>

        <div className="p-2.5 rounded-xl bg-paper border border-ink/[0.05] space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate/70 uppercase">Evaluation Model</span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Deterministic</span>
          </div>
          <p className="font-bold text-ink text-xs">Round Bright Bar (EN8 Grade)</p>
          <p className="text-[11px] text-slate">Standard: DIN EN 10083-2 · Hardness 201–255 HB</p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[9px] font-mono uppercase text-slate/60 block">Normalized Feasibility Checks</span>
          {[
            { label: "Material Feasibility", status: "Confirmed (Standard Commercial Stock)" },
            { label: "Tolerance Feasibility", status: "Within Standard Grinding Capability" },
            { label: "Envelope Check", status: "Ø 45 mm x 300 mm within standard lathe bed" },
            { label: "Compliance Filter", status: "ISO 9001:2015 Mandatory Requirement" },
          ].map((check) => (
            <div key={check.label} className="flex items-center justify-between text-[11px] py-1 px-2 rounded bg-ink/[0.02] border border-ink/[0.03]">
              <span className="text-slate">{check.label}</span>
              <span className="text-emerald-700 font-medium font-mono text-[10px] flex items-center gap-1">
                <CheckCircle size={11} weight="fill" />
                Pass
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STAGE 03: Review relevant suppliers (Miniature Relevant Suppliers Card Preview)
  if (stageIndex === 2) {
    return (
      <div className="w-full max-w-[340px] sm:max-w-sm space-y-2.5">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
            RELEVANT SUPPLIERS (3 MATCHED)
          </span>
          <SampleDataTag />
        </div>

        {/* Primary Supplier Match */}
        <div className="bg-surface rounded-xl p-3.5 border border-copper/40 ring-1 ring-copper/15 shadow-sm space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                VERIFIED MANUFACTURER
              </span>
              <h4 className="text-sm font-bold text-ink mt-1">PrecisionCast Works</h4>
              <span className="text-[10px] text-slate">Pune, Maharashtra · 15 MT/mo capacity</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-copper bg-copper/10 px-2 py-0.5 rounded">
              High Fit
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-ink/[0.05]">
            {["Material ✓", "Process ✓", "Tolerance ✓", "Capacity ✓", "Quality ✓"].map((sig) => (
              <span key={sig} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-paper border border-ink/[0.06] text-ink font-medium">
                {sig}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary Supplier Match */}
        <div className="bg-surface rounded-xl p-3 border border-ink/[0.08] shadow-2xs opacity-85">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                MANUFACTURER
              </span>
              <h5 className="text-xs font-bold text-ink mt-0.5">Apex Precision Tooling</h5>
              <span className="text-[10px] text-slate">Nashik · 10 MT/mo capacity</span>
            </div>
            <span className="text-[10px] font-mono text-slate bg-paper px-2 py-0.5 rounded border border-ink/[0.06]">
              3 of 5 Factors
            </span>
          </div>
        </div>
      </div>
    );
  }

  // STAGE 04: Inspect the evidence (Miniature Audit Evidence Stack)
  if (stageIndex === 3) {
    return (
      <div className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 border border-ink/[0.08] space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
          <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
            AUDITED EVIDENCE STACK
          </span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
            4 / 6 CONFIRMED
          </span>
        </div>

        {[
          {
            layer: "01 Entity",
            title: "Ministry of Corporate Affairs Registration",
            evidence: "Document Verified · Certificate of Incorporation",
          },
          {
            layer: "02 Facility",
            title: "Industrial Facility Lease Deed & Property Records",
            evidence: "Physically Verified · On-Site Audit",
          },
          {
            layer: "03 Machinery",
            title: "Mazak 5-Axis Turning & Grinding Serial Logs",
            evidence: "Physically Audited · Machine Nameplate Verified",
          },
          {
            layer: "04 Quality",
            title: "ISO 9001:2015 Quality Management System",
            evidence: "Registry Validated · Active Certificate",
          },
        ].map((item) => (
          <div
            key={item.layer}
            className="p-2.5 rounded-xl bg-paper border border-ink/[0.05] flex items-start gap-2.5 text-xs"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle size={13} weight="fill" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-copper font-bold">{item.layer}</span>
                <span className="text-[9px] font-mono text-slate/50">Audited</span>
              </div>
              <p className="font-semibold text-ink text-[11px] leading-snug mt-0.5 truncate">{item.title}</p>
              <p className="text-[10px] text-slate/70 font-mono mt-0.5">{item.evidence}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // STAGE 05: Request quotations (Miniature Commercial Quotation Matrix)
  return (
    <div className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 border border-copper/30 ring-1 ring-copper/15 shadow-md space-y-3">
      <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="text-mono-label text-copper text-[10px] font-bold tracking-wider">
            RECEIVED QUOTATION
          </span>
          <span className="font-mono text-[10px] font-bold text-ink bg-paper px-1.5 py-0.5 rounded border border-ink/[0.08]">
            QTE-2026-0194
          </span>
        </div>
        <SampleDataTag />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-ink">PrecisionCast Works</h4>
          <span className="text-[10px] text-slate">RFQ-2026-0841 · Round Bright Bar</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          Active Commercial Bid
        </span>
      </div>

      {/* Commercial Breakdown Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded-lg bg-paper border border-ink/[0.04]">
          <span className="text-[9px] font-mono uppercase text-slate/60 block">Unit Price</span>
          <span className="text-sm font-bold text-ink font-mono mt-0.5 block">₹350 / kg</span>
          <span className="text-[9px] text-slate">Material + Turning</span>
        </div>

        <div className="p-2 rounded-lg bg-paper border border-ink/[0.04]">
          <span className="text-[9px] font-mono uppercase text-slate/60 block">Tooling / NRE</span>
          <span className="text-sm font-bold text-emerald-700 font-mono mt-0.5 block">₹0.00</span>
          <span className="text-[9px] text-slate">Standard tooling on hand</span>
        </div>

        <div className="p-2 rounded-lg bg-paper border border-ink/[0.04]">
          <span className="text-[9px] font-mono uppercase text-slate/60 block">Lead Time</span>
          <span className="text-xs font-bold text-ink mt-0.5 block">14 Calendar Days</span>
          <span className="text-[9px] text-slate">First article inspection</span>
        </div>

        <div className="p-2 rounded-lg bg-paper border border-ink/[0.04]">
          <span className="text-[9px] font-mono uppercase text-slate/60 block">Payment Terms</span>
          <span className="text-xs font-bold text-ink mt-0.5 block">Net 30 Days</span>
          <span className="text-[9px] text-slate">Standard commercial PO</span>
        </div>
      </div>

      <div className="pt-1">
        <div className="w-full py-2 rounded-lg bg-copper text-surface text-xs font-semibold text-center tracking-wide shadow-xs">
          Accept Quotation & Issue Purchase Order
        </div>
      </div>
    </div>
  );
}
