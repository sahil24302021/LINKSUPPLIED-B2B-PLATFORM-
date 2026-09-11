"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FactorBarChart from "@/components/ui/FactorBarChart";
import {
  ClipboardText,
  Brain,
  ListNumbers,
  Handshake,
} from "@phosphor-icons/react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PinnedPipelineProps {
  detailed?: boolean;
}

const stages = [
  {
    key: "business",
    title: "Business",
    step: "01",
    icon: ClipboardText,
    description: "You describe what your business needs or what it makes.",
    detail:
      "Start with a natural language requirement or structured form — product type, quantity, certifications, target market. LINKSUPPLIED captures the specifics that determine a real match.",
  },
  {
    key: "intelligence",
    title: "Intelligence",
    step: "02",
    icon: Brain,
    description:
      "LINKSUPPLIED understands the requirement and evaluates relevant signals.",
    detail:
      "Your input is decomposed into evaluation factors: product fit, capacity alignment, certification requirements, market experience, and geographic relevance. Each factor is weighted based on your specific context.",
  },
  {
    key: "match",
    title: "Match",
    step: "03",
    icon: ListNumbers,
    description:
      "Relevant businesses are ranked by fit.",
    detail:
      "Every business in the system is evaluated against your factor profile. The result is a ranked shortlist where each score is explainable — you can see exactly which factors drove the match and by how much.",
  },
  {
    key: "connection",
    title: "Connection",
    step: "04",
    icon: Handshake,
    description:
      "You connect with verified businesses that actually fit.",
    detail:
      "Each matched business has a verified intelligence profile — not a catalog page. You see capacity, certifications, trade history, and verification evidence before you make contact.",
  },
];

const intelligenceFactors = [
  { label: "Product fit", value: 95 },
  { label: "Capacity", value: 88 },
  { label: "Certifications", value: 92 },
  { label: "Market experience", value: 85 },
  { label: "Location", value: 78 },
];

export default function PinnedPipeline({
  detailed = false,
}: PinnedPipelineProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  // Smooth click navigation to any stage checkpoint
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

  useIsomorphicLayoutEffect(() => {
    if (reduce || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      const textPanels = gsap.utils.toArray<HTMLElement>(".pipeline-text-panel");
      const visualPanels = gsap.utils.toArray<HTMLElement>(".pipeline-visual-panel");

      // Initial state: Stage 0 settled & visible; Stages 1..3 hidden below
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

      // Master Timeline: exactly 3.0 duration units across 4 stages
      // Snap points: 0.00 (Stage 0), 0.3333 (Stage 1), 0.6667 (Stage 2), 1.0000 (Stage 3)
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          scrub: 0.65,
          snap: {
            snapTo: [0, 1 / 3, 2 / 3, 1],
            duration: { min: 0.25, max: 0.55 },
            delay: 0.08,
            ease: "power2.out",
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            let stage = 0;
            if (p >= 0.833) {
              stage = 3;
            } else if (p >= 0.500) {
              stage = 2;
            } else if (p >= 0.167) {
              stage = 1;
            } else {
              stage = 0;
            }
            setActiveStage((prev) => (prev !== stage ? stage : prev));
          },
        },
      });

      stRef.current = tl.scrollTrigger as ScrollTrigger;

      // Choreographed transitions between each consecutive pair
      // Step 0 -> 1: interval [0.0, 1.0]
      // Step 1 -> 2: interval [1.0, 2.0]
      // Step 2 -> 3: interval [2.0, 3.0]
      for (let i = 0; i < stages.length - 1; i++) {
        const stepBase = i * 1.0;
        const exitStart = stepBase + 0.36; // Hold current stage until 0.36
        const exitDuration = 0.30;         // Exits from 0.36 to 0.66
        const enterStart = stepBase + 0.60;// Starts entering at 0.60 (outgoing almost gone)
        const enterDuration = 0.30;        // Reaches full settle at 0.90
        // Settle & hold from 0.90 through 1.0 (snap point) to 1.36

        // Outgoing stage exits cleanly
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

        // Incoming stage enters smoothly and settles
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

      // Lock timeline duration to exactly 3.0 units
      tl.set({}, {}, 3.0);
    }, wrapRef);

    return () => ctx.revert();
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
    <div
      ref={wrapRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-paper"
    >
      {/* ====================================================
          FIXED/PINNED 4-STEP HORIZONTAL NAVIGATION
          Positioned safely below the 64px navbar, centered, always visible
          [ Business ] — [ Intelligence ] — [ Match ] — [ Connection ]
          ==================================================== */}
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

      {/* ====================================================
          CONTROLLED STAGE AREA: ONE STAGE, ONE VIEWPORT
          Offset cleanly below the navigation (pt-32 md:pt-36)
          ==================================================== */}
      <div className="absolute inset-0 flex items-center pt-32 md:pt-36 pb-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* ------------------------------------------------
                LEFT: Text Stage Area (Stacked via CSS Grid)
                ------------------------------------------------ */}
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

            {/* ------------------------------------------------
                RIGHT: Visual Stage Area (Stacked via CSS Grid)
                ------------------------------------------------ */}
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
  );
}

/* ── Stage-specific visual panels ──────────────────────── */

function StageVisual({
  stageIndex,
  compact = false,
}: {
  stageIndex: number;
  compact?: boolean;
}) {
  // STAGE 01: Business Requirement Panel
  if (stageIndex === 0) {
    return (
      <div
        className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3.5 border border-ink/[0.06]"
        style={{ boxShadow: "var(--shadow-raised)" }}
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.04]">
          <span className="text-mono-label text-copper text-[10px] font-semibold tracking-wider">
            YOUR REQUIREMENT
          </span>
          <span className="text-[10px] font-mono text-slate/40 uppercase">
            VERIFIED INPUT
          </span>
        </div>

        {[
          { label: "Product Category", value: "Glass cosmetic containers" },
          { label: "Production Volume", value: "50,000 units / month" },
          { label: "Certifications Required", value: "ISO 9001 · GMP Certified" },
          { label: "Target Destination", value: "European Union (EU export)" },
        ].map((field) => (
          <div key={field.label}>
            <span className="text-[10px] text-slate/60 block mb-0.5 font-mono uppercase tracking-wider">
              {field.label}
            </span>
            <div className="px-3 py-1.5 sm:py-2 bg-paper rounded-lg border border-ink/[0.04] text-xs sm:text-sm text-ink font-medium">
              {field.value}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // STAGE 02: Intelligence Evaluation Factors
  if (stageIndex === 1) {
    return (
      <div
        className="w-full max-w-[340px] sm:max-w-sm bg-surface rounded-2xl p-4 sm:p-5 md:p-6 border border-ink/[0.06]"
        style={{ boxShadow: "var(--shadow-raised)" }}
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-1.5 border-b border-ink/[0.04]">
          <span className="text-mono-label text-copper text-[10px] font-semibold tracking-wider">
            EVALUATION FACTORS
          </span>
          <span className="text-[10px] font-mono text-slate/40 uppercase">
            5 SIGNAL WEIGHTS
          </span>
        </div>

        <FactorBarChart
          factors={intelligenceFactors}
          animate={true}
          staggerMs={90}
          compact={compact}
        />
      </div>
    );
  }

  // STAGE 03: Match Ranked Shortlist
  if (stageIndex === 2) {
    return (
      <div className="w-full max-w-[340px] sm:max-w-sm space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="text-mono-label text-copper text-[10px] font-semibold tracking-wider">
            RANKED SHORTLIST
          </span>
          <span className="text-[10px] font-mono text-slate/40 uppercase">
            EXPLAINABLE FIT
          </span>
        </div>

        {[
          {
            name: "ABC Packaging Industries",
            score: 95,
            type: "Manufacturer · ISO 9001",
            tag: "Top Match",
            primary: true,
          },
          {
            name: "Prism Glassworks Ltd",
            score: 88,
            type: "Manufacturer · GMP Certified",
            tag: "Verified",
            primary: false,
          },
          {
            name: "Orient Cosmetics Container",
            score: 72,
            type: "Tier-1 Regional Supplier",
            tag: "Regional",
            primary: false,
          },
        ].map((match) => (
          <div
            key={match.name}
            className={`flex items-center justify-between bg-surface rounded-xl p-3 sm:p-3.5 border transition-all ${
              match.primary
                ? "border-copper/40 ring-1 ring-copper/15"
                : "border-ink/[0.05]"
            }`}
            style={{ boxShadow: "var(--shadow-resting)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-mono text-sm sm:text-base font-bold tabular-nums ${
                  match.score >= 90
                    ? "bg-copper/10 text-copper border border-copper/20"
                    : "bg-ink/[0.04] text-ink"
                }`}
              >
                {match.score}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                  {match.name}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate/60">
                  {match.type}
                </p>
              </div>
            </div>
            <span
              className={`text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                match.primary
                  ? "bg-copper/10 text-copper font-medium border border-copper/20"
                  : "bg-ink/[0.04] text-slate/50"
              }`}
            >
              {match.tag}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // STAGE 04: Direct Connection Panel
  return (
    <div className="w-full max-w-[340px] sm:max-w-sm flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="flex items-center justify-between w-full px-1 pb-1">
        <span className="text-mono-label text-copper text-[10px] font-semibold tracking-wider">
          DIRECT CONNECTION
        </span>
        <span className="text-[10px] font-mono text-success flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          VERIFIED MATCH
        </span>
      </div>

      {[
        {
          label: "YOUR BUSINESS",
          role: "REQUESTOR",
          name: "European Cosmetics Co.",
          meta: "Glass Packaging Requirement · 50k units/mo",
        },
        {
          label: "MATCHED & VERIFIED PARTNER",
          role: "SUPPLIER · 95% FIT",
          name: "ABC Packaging Industries",
          meta: "Direct Introductions Enabled · Verified Profile",
        },
      ].map((card, i) => (
        <div key={card.label} className="w-full">
          <div
            className="bg-surface rounded-xl p-3 sm:p-4 w-full border border-ink/[0.06]"
            style={{ boxShadow: "var(--shadow-resting)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-mono-label text-copper text-[9px] sm:text-[10px] font-semibold">
                {card.label}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate/40">
                {card.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-ink">
              {card.name}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate/60 mt-0.5">
              {card.meta}
            </p>
          </div>
          {i === 0 && (
            <div className="flex flex-col items-center py-1 sm:py-1.5">
              <div className="w-px h-3 sm:h-4 bg-copper/30" />
              <div className="w-6 h-6 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center my-0.5">
                <Handshake size={13} weight="bold" className="text-copper" />
              </div>
              <div className="w-px h-3 sm:h-4 bg-copper/30" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
