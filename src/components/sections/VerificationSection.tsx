"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Buildings,
  Factory,
  Airplane,
  Gauge,
  IdentificationCard,
  ChartLine,
  Check,
  ArrowRight,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";
import Link from "next/link";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Data ─────────────────────────────────────────────────────── */

interface EvidenceDoc {
  text: string;
  label: string;
}

interface VerificationNode {
  id: string;
  num: string;
  name: string;
  shortName: string;
  tagline: string;
  evidence: EvidenceDoc[];
  Icon: React.ElementType;
}

const NODES: VerificationNode[] = [
  {
    id: "business",
    num: "01",
    name: "Business Verified",
    shortName: "Business",
    tagline:
      "Confirmed as a legitimate legal entity with valid government registration and tax standing.",
    evidence: [
      {
        text: "Government-issued business registration certificate",
        label: "Registration Certificate",
      },
      {
        text: "Tax registration / GST / VAT or equivalent",
        label: "Tax Compliance Filing",
      },
    ],
    Icon: Buildings,
  },
  {
    id: "manufacturer",
    num: "02",
    name: "Manufacturer Verified",
    shortName: "Manufacturer",
    tagline:
      "Validated physical production facilities, equipment ownership, and operational capacity.",
    evidence: [
      {
        text: "Factory or facility ownership / lease documentation",
        label: "Facility Records",
      },
      {
        text: "On-site or third-party production audit report",
        label: "Audit Report",
      },
    ],
    Icon: Factory,
  },
  {
    id: "trade",
    num: "03",
    name: "Trade Verified",
    shortName: "Trade",
    tagline:
      "Confirmed history of domestic or international trade through customs and shipping records.",
    evidence: [
      {
        text: "Export / import documentation and customs clearance",
        label: "Customs Records",
      },
      {
        text: "Trade references, buyer confirmations, or shipping logs",
        label: "Trade History",
      },
    ],
    Icon: Airplane,
  },
  {
    id: "capability",
    num: "04",
    name: "Capability Verified",
    shortName: "Capability",
    tagline:
      "Technical capacity, machinery, and minimum order thresholds independently validated.",
    evidence: [
      {
        text: "Capacity documentation or certified production records",
        label: "Output Capacity",
      },
      {
        text: "Equipment specifications and inventory audit",
        label: "Equipment Spec",
      },
    ],
    Icon: Gauge,
  },
  {
    id: "identity",
    num: "05",
    name: "Identity Verified",
    shortName: "Identity",
    tagline:
      "Principal officer identity and legal authority within the organization confirmed.",
    evidence: [
      {
        text: "Government-issued personal identification of key officer",
        label: "Officer Identity",
      },
      {
        text: "Role and authorization verification within the company",
        label: "Corporate Mandate",
      },
    ],
    Icon: IdentificationCard,
  },
  {
    id: "interaction",
    num: "06",
    name: "Interaction Verified",
    shortName: "Interaction",
    tagline:
      "Sustained platform engagement, profile completeness, and responsive business operations.",
    evidence: [
      {
        text: "Consistent platform activity tracked over time",
        label: "Activity Record",
      },
      {
        text: "Profile completeness and ongoing maintenance audit",
        label: "Profile Audit",
      },
    ],
    Icon: ChartLine,
  },
];

/* ── Component ────────────────────────────────────────────────── */

export function VerificationSection() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pStage6Ref = useRef(0.75);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const settledStageRef = useRef(0);

  // Smooth click navigation to any stage checkpoint
  const scrollToStage = useCallback((stageIdx: number) => {
    if (!stRef.current) return;
    const st = stRef.current;
    const clamped = Math.max(0, Math.min(6, stageIdx));
    settledStageRef.current = clamped;
    activeStageRef.current = clamped;
    setActiveStage(clamped);
    const targetProgress = (clamped / 6) * pStage6Ref.current;
    const targetScroll = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Keyboard navigation support in its own effect — never re-triggers GSAP effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const st = stRef.current;
      if (!st || !st.isActive) return;

      if (["ArrowDown", "PageDown"].includes(e.code) || (e.code === "Space" && !e.shiftKey)) {
        if (activeStageRef.current < 6) {
          e.preventDefault();
          scrollToStage(activeStageRef.current + 1);
        }
      } else if (["ArrowUp", "PageUp"].includes(e.code) || (e.code === "Space" && e.shiftKey)) {
        if (activeStageRef.current > 0) {
          e.preventDefault();
          scrollToStage(activeStageRef.current - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToStage]);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !wrapRef.current) return;

    const mm = gsap.matchMedia();

    const createChoreography = (
      stageDistance: number,
      teaserDistance: number,
      scrubVal: number,
      snapMin: number,
      snapMax: number,
      snapDel: number,
      isMobile: boolean
    ) => {
      const stagePanels = gsap.utils.toArray<HTMLElement>(
        ".verification-stage-panel"
      );
      const sheet = sheetRef.current;
      const inner = innerRef.current;

      // Initial state: Stage 0 visible & settled; Stages 1..6 hidden below
      stagePanels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { autoAlpha: 1, y: 0, x: 0, scale: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0, y: 20, x: 0, scale: 0.98 });
        }
      });

      // Payoff starts hidden translated to the LEFT
      gsap.set(".verification-final-payoff", {
        autoAlpha: 0,
        x: isMobile ? -24 : -44,
      });

      // Market Teaser Sheet starts translated to the RIGHT (+105%) and fully hidden at scroll 0
      if (sheet && inner) {
        gsap.set(sheet, {
          xPercent: 105,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        gsap.set(inner, {
          xPercent: -105,
          x: isMobile ? 20 : 40,
          filter: isMobile ? "none" : "blur(6px)",
          willChange: "transform, filter",
        });
      }

      const endDistance = stageDistance + teaserDistance;
      const pStage6 = stageDistance / endDistance;
      pStage6Ref.current = pStage6;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * endDistance}`,
          pin: true,
          scrub: scrubVal,
          anticipatePin: 1,
          snap: {
            snapTo: (value: number) => {
              // Beyond Stage 6: user is smoothly scrubbing through Market Teaser transition
              if (value >= pStage6 + 0.04) return value;
              if (value <= 0.03) return 0.0;

              const normVal = Math.min(1.0, value / pStage6);
              const rawStage = Math.round(normVal * 6);
              const current = settledStageRef.current;

              // Bound progression: strictly at most 1 stage advance or retreat per gesture
              let targetStage = rawStage;
              if (targetStage > current + 1) {
                targetStage = current + 1;
              } else if (targetStage < current - 1) {
                targetStage = current - 1;
              }

              targetStage = Math.max(0, Math.min(6, targetStage));
              return (targetStage / 6) * pStage6;
            },
            duration: { min: snapMin, max: snapMax },
            delay: snapDel,
            ease: "power2.out",
            inertia: false,
            onComplete: () => {
              if (stRef.current) {
                const p = stRef.current.progress;
                const normP = Math.min(1.0, p / pStage6);
                const settled = Math.min(6, Math.max(0, Math.round(normP * 6)));
                settledStageRef.current = settled;
              }
            },
          },
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            if (sheet && inner) {
              gsap.set(sheet, { xPercent: 105, autoAlpha: 0 });
              gsap.set(inner, {
                xPercent: -105,
                x: isMobile ? 20 : 40,
                filter: isMobile ? "none" : "blur(6px)",
              });
            }
            if (wrapRef.current) {
              gsap.set(wrapRef.current, { backgroundColor: "" });
            }
            gsap.set(".verification-mobile-footer", { autoAlpha: 1 });
          },
          onUpdate: (self) => {
            const p = self.progress;
            const normP = Math.min(1.0, p / pStage6);
            let stage = 0;
            if (normP >= 0.9167) {
              stage = 6;
            } else if (normP >= 0.7500) {
              stage = 5;
            } else if (normP >= 0.5833) {
              stage = 4;
            } else if (normP >= 0.4167) {
              stage = 3;
            } else if (normP >= 0.2500) {
              stage = 2;
            } else if (normP >= 0.0833) {
              stage = 1;
            } else {
              stage = 0;
            }
            activeStageRef.current = stage;
            if (Math.abs(normP - stage / 6) < 0.02) {
              settledStageRef.current = stage;
            }
            setActiveStage((prev) => (prev !== stage ? stage : prev));
          },
        },
      });

      stRef.current = tl.scrollTrigger as ScrollTrigger;

      // Choreographed transitions between each consecutive pair (0 -> 1, ..., 4 -> 5)
      for (let i = 0; i < 5; i++) {
        const stepBase = i * 1.0;
        const exitStart = stepBase + 0.30;
        const exitDuration = 0.40;
        const enterStart = stepBase + 0.38;
        const enterDuration = 0.40;

        // Outgoing stage exits cleanly
        tl.to(
          stagePanels[i],
          {
            autoAlpha: 0,
            y: -20,
            scale: 0.98,
            duration: exitDuration,
            ease: "power2.inOut",
          },
          exitStart
        );

        // Incoming stage enters smoothly
        tl.fromTo(
          stagePanels[i + 1],
          { autoAlpha: 0, y: 20, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: enterDuration,
            ease: "power2.out",
            immediateRender: false,
          },
          enterStart
        );
      }

      // ── Step 5 -> 6: Final Stage Transition ───────────────────────
      const step5Base = 5.0;
      tl.to(
        stagePanels[5],
        {
          autoAlpha: 0,
          y: -20,
          scale: 0.98,
          duration: 0.40,
          ease: "power2.inOut",
        },
        step5Base + 0.30
      );

      tl.fromTo(
        stagePanels[6],
        { autoAlpha: 0, y: 20, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.40,
          ease: "power2.out",
          immediateRender: false,
        },
        step5Base + 0.38
      );

      // Final Payoff: Enters from LEFT during Stage 6 completion
      tl.fromTo(
        ".verification-final-payoff",
        { autoAlpha: 0, x: isMobile ? -24 : -44 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.38,
          ease: "power2.out",
          immediateRender: false,
        },
        step5Base + 0.60
      );

      // ── Step 6 -> Market Teaser Transition ────────────────────────
      // Hold Stage 6 + ALL LAYERS VERIFIED settled (units 6.0 to 6.35)
      const sweepStart = 6.35;
      const sweepDuration = 1.1;
      const sweepEnd = sweepStart + sweepDuration; // 7.45

      if (sheet && inner) {
        // Fade out mobile footer link cleanly before dark sheet sweeps over
        tl.to(
          ".verification-mobile-footer",
          { autoAlpha: 0, duration: 0.25, ease: "power1.out" },
          sweepStart
        );

        // Show sheet immediately as soon as sweep begins
        tl.to(
          sheet,
          { autoAlpha: 1, duration: 0.04, ease: "none" },
          sweepStart
        );

        // Dark sheet sweeps across from RIGHT to LEFT with depth shadow
        tl.to(
          sheet,
          { xPercent: 0, ease: "power2.out", duration: sweepDuration },
          sweepStart
        );

        // Inner content reveals and settles into position
        tl.to(
          inner,
          {
            xPercent: 0,
            x: 0,
            filter: "none",
            ease: "power2.out",
            duration: sweepDuration,
          },
          sweepStart
        );

        // Clear filter at end of sweep to guarantee 100% native sharpness
        tl.set(inner, { clearProps: "filter" }, sweepEnd);

        // Set container background to bg-ink to guarantee 100% solid dark background
        if (wrapRef.current) {
          tl.set(wrapRef.current, { backgroundColor: "#0B0F19" }, sweepEnd);
        }

        // Settled reading hold zone for Market Teaser before unpinning
        tl.to({}, { duration: 0.55 });
      }
    };

    // Desktop: 6.0 stage distance + 2.0 teaser distance
    mm.add("(min-width: 768px)", () => {
      createChoreography(6.0, 2.0, 0.65, 0.28, 0.48, 0.08, false);
    });

    // Mobile: 4.8 stage distance + 1.6 teaser distance
    mm.add("(max-width: 767px)", () => {
      createChoreography(4.8, 1.6, 0.55, 0.22, 0.38, 0.06, true);
    });

    return () => {
      mm.revert();
    };
  }, [reduce]);

  // ── Reduced Motion: Clean static ───────────────────────────────
  if (reduce) {
    return (
      <>
        <section className="py-24 bg-surface border-t border-ink/[0.06]">
          <div className="grid-page">
            <div className="col-content">
              <h2 className="text-display text-ink">
                Every badge explains what evidence backs it.
              </h2>
              <div className="mt-12 space-y-8">
                {NODES.map((node) => (
                  <div key={node.id} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} weight="bold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{node.name}</h3>
                      <p className="text-sm text-slate mt-1">{node.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="relative bg-ink py-24 md:py-36 overflow-hidden">
          <div className="grid-page">
            <div className="col-content">
              <div className="max-w-[54ch]">
                <div className="w-11 h-11 rounded-xl bg-copper/15 border border-copper/20 flex items-center justify-center mb-5">
                  <GlobeHemisphereWest
                    size={22}
                    weight="duotone"
                    className="text-copper"
                  />
                </div>
                <span className="text-mono-label text-copper block mb-3">
                  MARKET INTELLIGENCE
                </span>
                <h2 className="text-display text-surface">
                  &ldquo;Where should I sell this?&rdquo;
                </h2>
                <p className="mt-4 text-base md:text-lg text-silver leading-relaxed">
                  LINKSUPPLIED identifies where active market demand exists for what
                  your business makes or sells — matching production capacity and
                  verified credentials directly to active buyer requirements across
                  regions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── Derived State ──────────────────────────────────────────────
  const vi = activeStage >= 1 && activeStage <= 6 ? activeStage - 1 : -1;

  return (
    <div className="relative w-full bg-surface overflow-hidden" data-verification-wrapper="true">
      <section ref={wrapRef} className="relative w-full bg-surface overflow-hidden">
        <div
          style={{ height: "100dvh", position: "relative" }}
          className="w-full"
        >
        {/* ════════════════════════════════════════════════════════
            STAGE 0 — INTRO: Centered cinematic headline
            ════════════════════════════════════════════════════════ */}
        <div
          className="verification-stage-panel pt-16 pb-14 sm:py-0"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: activeStage === 0 ? "auto" : "none",
            willChange: "transform, opacity",
          }}
        >
          <div className="text-center max-w-3xl mx-auto px-6">
            <h2 className="text-display text-ink">
              Every badge explains
              <br />
              what evidence backs it.
            </h2>
            <h2 className="text-display text-slate/40 mt-1">
              No unexplained checkmarks.
            </h2>
            <p className="mt-6 text-sm text-slate max-w-md mx-auto leading-relaxed">
              Six independent verification layers.
              <br />
              Each backed by auditable evidence.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              {NODES.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-ink/[0.12]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            STAGES 1-6 — Two column: editorial left + evidence right
            ════════════════════════════════════════════════════════ */}
        {NODES.map((node, i) => {
          const isActive = vi === i;
          const Icon = node.Icon;
          const isStage6 = i === 5;

          return (
            <div
              key={node.id}
              className="verification-stage-panel pt-16 pb-14 sm:py-0"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                pointerEvents: isActive ? "auto" : "none",
                willChange: "transform, opacity",
              }}
            >
              <div className="grid-page w-full">
                <div className="col-content">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 ${isStage6 ? "gap-4" : "gap-6"} lg:gap-16 items-center`}>
                    {/* ── LEFT: Editorial ──────────── */}
                    <div className="lg:col-span-5">
                      <span className="text-mono-label text-copper">
                        LAYER {node.num} / 06
                      </span>
                      <h2 className="text-display text-ink mt-1.5 sm:mt-2">
                        {node.name}
                      </h2>
                      <p className="mt-2.5 sm:mt-4 text-sm sm:text-base text-slate leading-relaxed max-w-[38ch]">
                        {node.tagline}
                      </p>

                      {/* Dot progress */}
                      <div className="mt-4 sm:mt-8 flex items-center gap-2.5">
                        {NODES.map((_, dotIdx) => {
                          const done = dotIdx < i || (isStage6 && activeStage === 6);
                          const active = dotIdx === i && !(isStage6 && activeStage === 6);
                          return (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => scrollToStage(dotIdx + 1)}
                              aria-label={`Jump to ${NODES[dotIdx].name}`}
                              className={`rounded-full transition-all duration-400 cursor-pointer ${
                                done
                                  ? "w-2 h-2 bg-emerald-500"
                                  : active
                                  ? "w-2.5 h-2.5 bg-copper"
                                  : "w-1.5 h-1.5 bg-ink/[0.08]"
                              }`}
                            />
                          );
                        })}
                      </div>

                      {/* Stage 6 Final Payoff Banner entering from LEFT */}
                      {isStage6 && (
                        <div className="verification-final-payoff mt-4 sm:mt-7 pt-4 sm:pt-5 border-t border-ink/[0.08] max-w-[42ch]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                              <Check size={11} weight="bold" />
                            </div>
                            <span className="text-mono-label text-emerald-600 font-semibold tracking-wider text-[11px]">
                              ALL LAYERS VERIFIED
                            </span>
                            <span className="text-[10px] font-mono text-emerald-700/80 bg-emerald-500/[0.08] border border-emerald-500/[0.15] px-2 py-0.5 rounded-full font-medium ml-auto">
                              06 / 06 COMPLETE
                            </span>
                          </div>
                          <h3 className="text-base sm:text-xl font-medium text-ink mt-1.5 sm:mt-2 tracking-tight">
                            No unexplained checkmarks.
                          </h3>
                          <p className="text-xs sm:text-sm text-slate mt-1 leading-relaxed">
                            Six independent verification layers. Each backed by auditable evidence.
                          </p>
                        </div>
                      )}

                      {!isStage6 && (
                        <Link
                          href="/verification"
                          className="hidden sm:inline-flex items-center gap-2 mt-6 sm:mt-8 text-sm font-medium text-copper hover:text-copper-muted transition-colors group"
                        >
                          <span>Full verification model</span>
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      )}
                      {isStage6 && (
                        <Link
                          href="/verification"
                          className="hidden sm:inline-flex items-center gap-2 mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-copper hover:text-copper-muted transition-colors group"
                        >
                          <span>Explore full verification model</span>
                          <ArrowRight
                            size={13}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      )}
                    </div>

                    {/* ── RIGHT: Evidence ──────────── */}
                    <div className="lg:col-span-7">
                      <div className="lg:pl-6">
                        {/* Icon + label */}
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-copper/[0.08] border border-copper/[0.15] flex items-center justify-center">
                            <Icon
                              size={20}
                              weight="duotone"
                              className="text-copper"
                            />
                          </div>
                          <span className="text-mono-label text-ink/40">
                            EVIDENCE REQUIRED
                          </span>
                        </div>

                        {/* Evidence documents */}
                        <div className="flex flex-col gap-2.5 sm:gap-3">
                          {node.evidence.map((doc, docIdx) => (
                            <div
                              key={docIdx}
                              className="evidence-card-item group relative flex items-start gap-3 sm:gap-4 py-3 px-4 sm:py-4 sm:px-5 rounded-xl sm:rounded-2xl bg-paper border border-ink/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-copper/[0.12]"
                            >
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-emerald-500/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                                <Check
                                  size={12}
                                  weight="bold"
                                  className="text-emerald-600"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] sm:text-[10px] font-mono text-copper/60 uppercase tracking-[0.14em] leading-none">
                                  {doc.label}
                                </span>
                                <p className="text-xs sm:text-sm text-ink/80 font-medium mt-1 leading-snug">
                                  {doc.text}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Completed trail */}
                        {i > 0 && (
                          <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span className="text-[9px] font-mono text-slate/35 uppercase tracking-[0.15em]">
                              Passed
                            </span>
                            {NODES.slice(0, i).map((prev) => {
                              const PrevIcon = prev.Icon;
                              return (
                                <span
                                  key={prev.id}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium text-emerald-700/70 bg-emerald-500/[0.06] border border-emerald-500/[0.1]"
                                >
                                  <PrevIcon size={9} weight="bold" />
                                  {prev.shortName}
                                </span>
                              );
                            })}
                            {isStage6 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium text-emerald-700/70 bg-emerald-500/[0.06] border border-emerald-500/[0.1]">
                                <Icon size={9} weight="bold" />
                                {node.shortName}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Mobile footer link */}
        <div className="verification-mobile-footer lg:hidden absolute bottom-3 left-0 right-0 px-5 z-20">
          <div className="flex items-center justify-between pt-3 border-t border-ink/[0.06]">
            <span className="text-[9px] font-mono text-slate/30 uppercase tracking-[0.15em]">
              TRUST FRAMEWORK
            </span>
            <Link
              href="/verification"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-copper hover:text-copper-muted transition-colors"
            >
              <span>Full model</span>
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            INCOMING MARKET TEASER DARK SHEET (Layer 2)
            Sweeps across from RIGHT → LEFT with depth shadow,
            seamlessly covering verification before smooth unpin
            ════════════════════════════════════════════════════════ */}
        <div
          ref={sheetRef}
          className="absolute inset-0 z-30 w-full h-full overflow-hidden bg-ink shadow-[-30px_0_70px_rgba(0,0,0,0.85)] border-l border-white/10 will-change-transform"
          data-market-sheet="true"
        >
          <div
            ref={innerRef}
            className="w-full h-full flex flex-col justify-center pt-16 pb-8 will-change-transform"
            data-market-inner="true"
          >
            <div className="grid-page w-full">
              <div className="col-content">
                <div className="max-w-[54ch]">
                  <div className="w-11 h-11 rounded-xl bg-copper/15 border border-copper/20 flex items-center justify-center mb-4 md:mb-5">
                    <GlobeHemisphereWest
                      size={22}
                      weight="duotone"
                      className="text-copper"
                    />
                  </div>
                  <span className="text-mono-label text-copper block mb-2.5 md:mb-3">
                    MARKET INTELLIGENCE
                  </span>
                  <h2 className="text-display text-surface leading-tight">
                    &ldquo;Where should I sell this?&rdquo;
                  </h2>
                  <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-silver leading-relaxed">
                    LINKSUPPLIED identifies where active market demand exists for
                    what your business makes or sells — matching production
                    capacity and verified credentials directly to active buyer
                    requirements across regions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
