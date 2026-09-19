"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/features/landing/HeroSection";
import { ProblemSection } from "@/features/landing/ProblemSection";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroProblemTransition() {
  const reduce = useReducedMotion();
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const problemSheetRef = useRef<HTMLDivElement>(null);
  const problemInnerRef = useRef<HTMLDivElement>(null);
  const mobileHeroRef = useRef<HTMLDivElement>(null);
  const mobileProblemRef = useRef<HTMLDivElement>(null);

  // ── GSAP matchMedia: Desktop Pinned Curtain vs Mobile Natural Flow ──
  useIsomorphicLayoutEffect(() => {
    if (reduce) return;

    const mm = gsap.matchMedia();

    // ── DESKTOP: Pinned curtain reveal (min-width: 768px, untouched) ──
    mm.add("(min-width: 768px)", () => {
      const hero = heroLayerRef.current;
      const sheet = problemSheetRef.current;
      const inner = problemInnerRef.current;
      const container = desktopContainerRef.current;

      if (!hero || !sheet || !inner || !container) return;

      gsap.set(hero, {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        transformOrigin: "center center",
        willChange: "transform, filter, opacity",
      });

      // Sheet set far off-screen (-130%) and hidden so shadow/fade NEVER bleeds into Hero
      gsap.set(sheet, {
        xPercent: -130,
        autoAlpha: 0,
        visibility: "hidden",
        pointerEvents: "none",
        willChange: "transform, opacity",
      });

      gsap.set(inner, {
        xPercent: 105,
        x: -40,
        filter: "blur(8px)",
        willChange: "transform, filter",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.4}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            gsap.set(hero, { clearProps: "all" });
            gsap.set(sheet, {
              xPercent: -130,
              autoAlpha: 0,
              visibility: "hidden",
              pointerEvents: "none",
            });
          },
        },
      });

      tl.to(
        sheet,
        {
          autoAlpha: 1,
          visibility: "visible",
          pointerEvents: "auto",
          duration: 0.12,
          ease: "power1.in",
        },
        0
      );

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

      tl.to(
        sheet,
        {
          xPercent: 0,
          ease: "power2.out",
          duration: 1.0,
        },
        0
      );

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

      tl.set(inner, { clearProps: "filter" }, 1.0);

      tl.to({}, { duration: 0.45 });
    });

    // ── MOBILE: Hero entrance on mount + Problem entrance from LEFT on scroll (max-width: 767px) ──
    mm.add("(max-width: 767px)", () => {
      if (mobileHeroRef.current) {
        gsap.fromTo(
          mobileHeroRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      if (mobileProblemRef.current) {
        gsap.fromTo(
          mobileProblemRef.current,
          { x: -48, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobileProblemRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => mm.revert();
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
    <>
      {/* ── MOBILE RENDER (block md:hidden): Isolated full-viewport Hero + Left-entrance Problem ── */}
      <div className="block md:hidden relative w-full bg-paper overflow-x-hidden" data-hero-problem-mobile="true">
        <div ref={mobileHeroRef} className="relative w-full min-h-[calc(100svh-54px)] flex flex-col justify-center">
          <HeroSection />
        </div>
        <div ref={mobileProblemRef} className="relative w-full overflow-hidden">
          <ProblemSection />
        </div>
      </div>

      {/* ── DESKTOP RENDER (hidden md:block): Pinned curtain reveal untouched ── */}
      <div className="hidden md:block relative w-full bg-paper" data-hero-problem-wrapper="true">
        <div
          ref={desktopContainerRef}
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

            {/* Incoming Dark Problem Section Sheet - full-screen edge-to-edge coverage, no shadow bleed */}
            <div
              ref={problemSheetRef}
              className="invisible opacity-0 pointer-events-none absolute inset-0 -top-4 -bottom-4 -right-24 z-20 w-[calc(100%+96px)] h-[calc(100%+32px)] overflow-hidden bg-graphite shadow-[30px_0_70px_rgba(0,0,0,0.9)] border-r border-white/10 will-change-transform"
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
    </>
  );
}

