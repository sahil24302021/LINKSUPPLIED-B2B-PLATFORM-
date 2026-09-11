"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlobeHemisphereWest } from "@phosphor-icons/react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MarketTeaserSection() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !containerRef.current || !stageRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = (context.conditions || {}) as {
          isMobile?: boolean;
          isDesktop?: boolean;
        };
        const sheet = sheetRef.current;
        const inner = innerRef.current;

        if (!sheet || !inner) return;

        // Sheet starts translated to the RIGHT (+105%) and fully hidden at scroll 0
        // +105% ensures the leading edge depth shadow does not bleed into the viewport
        gsap.set(sheet, {
          xPercent: 105,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        // Inner content starts counter-translated to the LEFT with subtle drift
        gsap.set(inner, {
          xPercent: -105,
          x: isMobile ? 20 : 40,
          filter: isMobile ? "none" : "blur(6px)",
          willChange: "transform, filter",
        });

        // Scrubbed timeline directly driven by user scroll, pinned from top of viewport
        // Exactly matching the architecture of the Problem Statement transition
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.4}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeaveBack: () => {
              gsap.set(sheet, { xPercent: 105, autoAlpha: 0 });
              gsap.set(inner, {
                xPercent: -105,
                x: isMobile ? 20 : 40,
                filter: isMobile ? "none" : "blur(6px)",
              });
            },
          },
        });

        // Show sheet immediately as soon as scroll begins > 0
        tl.to(
          sheet,
          {
            autoAlpha: 1,
            duration: 0.04,
            ease: "none",
          },
          0
        );

        // Dark sheet sweeps across the viewport from RIGHT → LEFT
        tl.to(
          sheet,
          {
            xPercent: 0,
            ease: "power2.out",
            duration: 1.0,
          },
          0
        );

        // Inner content reveals and settles into position
        tl.to(
          inner,
          {
            xPercent: 0,
            x: 0,
            filter: "none",
            ease: "power2.out",
            duration: 1.0,
          },
          0
        );

        // Clear filter at end of transition to guarantee 100% native sharpness
        tl.set(inner, { clearProps: "filter" }, 1.0);

        // Phase 2: Settled reading hold zone
        // Section is 100% sharp, normal, and completely stable before unpinning
        tl.to({}, { duration: 0.45 });
      },
      containerRef
    );

    return () => mm.revert();
  }, [reduce]);

  // Reduced motion accessible fallback
  if (reduce) {
    return (
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
    );
  }

  return (
    <div className="relative w-full bg-transparent overflow-hidden" data-market-teaser-wrapper="true">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-transparent"
        data-market-teaser-transition="true"
      >
      <div
        ref={stageRef}
        className="relative w-full h-[100dvh] min-h-[520px] overflow-hidden bg-transparent"
      >
        {/* Incoming Dark Sheet — sweeps across from RIGHT to LEFT with depth shadow */}
        <div
          ref={sheetRef}
          className="absolute inset-0 z-20 w-full h-full overflow-hidden bg-ink shadow-[-30px_0_70px_rgba(0,0,0,0.85)] border-l border-white/10 will-change-transform"
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
    </div>
    </div>
  );
}
