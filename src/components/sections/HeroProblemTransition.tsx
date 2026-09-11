"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroProblemTransition() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const problemSheetRef = useRef<HTMLDivElement>(null);
  const problemInnerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const hero = heroLayerRef.current;
      const sheet = problemSheetRef.current;
      const inner = problemInnerRef.current;

      if (!hero || !sheet || !inner) return;

      // Ensure pristine initial state:
      // Hero starts normal, sharp, scale 1, opacity 1
      gsap.set(hero, {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        transformOrigin: "center center",
        willChange: "transform, filter, opacity",
      });

      // Problem sheet starts translated to the LEFT and fully hidden at scroll 0
      // -105% ensures leading depth shadow does not bleed into the viewport
      gsap.set(sheet, {
        xPercent: -105,
        autoAlpha: 0,
        willChange: "transform, opacity",
      });

      // Problem inner content starts counter-translated with subtle leftward drift and blur
      gsap.set(inner, {
        xPercent: 105,
        x: -40,
        filter: "blur(8px)",
        willChange: "transform, filter",
      });

      // Scrubbed timeline directly driven by user scroll
      // Pinned from the top of the viewport
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
            // Guarantee zero lingering styles when returned to top of homepage
            gsap.set(hero, { clearProps: "all" });
            gsap.set(sheet, { xPercent: -105, autoAlpha: 0 });
          },
        },
      });

      // Show sheet immediately when scroll begins > 0
      tl.to(
        sheet,
        {
          autoAlpha: 1,
          duration: 0.04,
          ease: "none",
        },
        0
      );

      // Phase 1: Incoming dark sheet enters from LEFT → RIGHT
      // Outgoing Hero softens: subtle scale down (1 -> 0.95), blur (0px -> 8px), opacity (1 -> 0.65)
      tl.to(
        hero,
        {
          scale: 0.95,
          filter: "blur(8px)",
          opacity: 0.65,
          ease: "power1.inOut",
          duration: 1.0,
        },
        0
      );

      // Dark sheet sweeps across from LEFT to RIGHT
      tl.to(
        sheet,
        {
          xPercent: 0,
          ease: "power2.out",
          duration: 1.0,
        },
        0
      );

      // Inner content reveals into position, settling x to 0 and sharpening to blur(0px)
      tl.to(
        inner,
        {
          xPercent: 0,
          x: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          duration: 1.0,
        },
        0
      );

      // Clear filter at end of transition to guarantee 100% native sharpness
      tl.set(inner, { clearProps: "filter" }, 1.0);

      // Phase 2: Settled reading hold
      // Problem section is 100% sharp, normal, and completely stable before unpinning
      tl.to({}, { duration: 0.45 });
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) {
    return (
      <>
        <HeroSection />
        <ProblemSection />
      </>
    );
  }

  return (
    <div className="relative w-full bg-paper" data-hero-problem-wrapper="true">
      <div
        ref={containerRef}
        className="relative w-full -mt-16 overflow-hidden bg-paper"
        data-hero-problem-transition="true"
      >
        <div
          ref={stageRef}
          className="relative w-full h-screen min-h-[640px] overflow-hidden bg-paper"
        >
          {/* Outgoing Hero Layer */}
          <div
            ref={heroLayerRef}
            className="absolute inset-0 w-full h-full pt-16 will-change-transform"
            data-hero-layer="true"
          >
            <HeroSection />
          </div>

          {/* Incoming Dark Problem Section Sheet - full-screen edge-to-edge coverage */}
          <div
            ref={problemSheetRef}
            className="absolute inset-0 -top-4 -bottom-4 -right-24 z-20 w-[calc(100%+96px)] h-[calc(100%+32px)] overflow-hidden bg-graphite shadow-[30px_0_70px_rgba(0,0,0,0.9)] border-r border-white/10 will-change-transform"
            data-problem-sheet="true"
          >
            <div
              ref={problemInnerRef}
              className="w-screen max-w-[100vw] h-full pt-16 flex flex-col justify-center overflow-y-auto will-change-transform [&>section]:py-12 md:[&>section]:py-32 lg:[&>section]:py-40"
              data-problem-inner="true"
            >
              <ProblemSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
