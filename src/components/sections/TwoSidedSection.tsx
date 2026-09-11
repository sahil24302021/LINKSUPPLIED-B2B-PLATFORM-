"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, Storefront, ArrowRight, Handshake, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TwoSidedSection() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Desktop Refs (>= 768px)
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const transformBadgeRef = useRef<HTMLDivElement>(null);

  // Mobile Dedicated Refs (< 768px)
  const mobileBuyerRef = useRef<HTMLDivElement>(null);
  const mobileSupplierRef = useRef<HTMLDivElement>(null);
  const mobileConnectionRef = useRef<HTMLDivElement>(null);
  const mobileMatchRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !wrapRef.current) return;

    const mm = gsap.matchMedia();

    // ══════════════════════════════════════════════════════════════
    // DESKTOP CHOREOGRAPHY (>= 768px) — 100% UNTOUCHED
    // ══════════════════════════════════════════════════════════════
    mm.add("(min-width: 768px)", () => {
      const left = leftPanelRef.current;
      const right = rightPanelRef.current;
      const seam = seamRef.current;
      const node = centerNodeRef.current;
      const badge = transformBadgeRef.current;

      if (!left || !right) return;

      // Initial State (Desktop)
      gsap.set(right, {
        xPercent: 105,
        x: 0,
        y: 0,
        autoAlpha: 0,
      });

      gsap.set(left, {
        xPercent: -105,
        x: 0,
        y: 0,
        autoAlpha: 0,
      });

      if (seam) gsap.set(seam, { autoAlpha: 0, scaleY: 0, transformOrigin: "center" });
      if (node) gsap.set(node, { autoAlpha: 0, scale: 0.6 });
      if (badge) gsap.set(badge, { autoAlpha: 0, y: 24, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
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
            let step = 0;
            if (p >= 0.76) step = 3;
            else if (p >= 0.50) step = 2;
            else if (p >= 0.26) step = 1;
            else step = 0;
            setActiveStep((prev) => (prev !== step ? step : prev));
          },
        },
      });

      // Step 1: Right enters from RIGHT → LEFT (0.02 to 0.16)
      tl.to(
        right,
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        0.02
      );

      // Step 2: Left enters from LEFT → RIGHT (0.28 to 0.42)
      tl.to(
        left,
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        0.28
      );

      // Step 3: Central seam, node, subtle magnetic pull (0.52 to 0.66)
      if (seam) {
        tl.to(
          seam,
          {
            autoAlpha: 1,
            scaleY: 1,
            duration: 0.14,
            ease: "power2.out",
          },
          0.52
        );
      }

      if (node) {
        tl.to(
          node,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.14,
            ease: "back.out(1.5)",
          },
          0.53
        );
      }

      tl.to(
        left,
        {
          x: 12,
          duration: 0.14,
          ease: "power1.inOut",
        },
        0.52
      );
      tl.to(
        right,
        {
          x: -12,
          duration: 0.14,
          ease: "power1.inOut",
        },
        0.52
      );

      // Step 4: Flip / Transformation into 95% Match (0.76 to 0.88)
      if (node) {
        tl.to(
          node,
          {
            autoAlpha: 0,
            scale: 0.75,
            duration: 0.08,
            ease: "power1.in",
          },
          0.76
        );
      }

      if (badge) {
        tl.to(
          badge,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          0.77
        );
      }

      tl.set({}, {}, 1.0);
    });

    // ══════════════════════════════════════════════════════════════
    // MOBILE CHOREOGRAPHY (< 768px) — DEDICATED VERTICAL SEQUENCE
    // ══════════════════════════════════════════════════════════════
    mm.add("(max-width: 767px)", () => {
      const buyer = mobileBuyerRef.current;
      const supplier = mobileSupplierRef.current;
      const connection = mobileConnectionRef.current;
      const match = mobileMatchRef.current;

      if (!buyer || !supplier) return;

      // Initial State (Mobile)
      // STAGE 1 element: Buyer enters from the RIGHT
      gsap.set(buyer, {
        x: "100vw",
        y: 0,
        autoAlpha: 0,
      });

      // STAGE 2 element: Supplier enters from the LEFT
      gsap.set(supplier, {
        x: "-100vw",
        y: 0,
        autoAlpha: 0,
      });

      // STAGE 3 element: Connection line and node between them starts hidden
      if (connection) {
        gsap.set(connection, {
          autoAlpha: 0,
          scale: 0.85,
        });
      }

      // STAGE 4 element: Match Unlocked card in center starts hidden
      if (match) {
        gsap.set(match, {
          autoAlpha: 0,
          scale: 0.88,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
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
            let step = 0;
            if (p >= 0.76) step = 3;
            else if (p >= 0.50) step = 2;
            else if (p >= 0.26) step = 1;
            else step = 0;
            setActiveStep((prev) => (prev !== step ? step : prev));
          },
        },
      });

      // STAGE 1: Buyer enters from RIGHT → CENTER (0.02 to 0.16)
      tl.to(
        buyer,
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        0.02
      );

      // Settle plateau for Stage 1 (0.16 to 0.28)
      // Snap point 0.25 lands here. Only Buyer is visible.

      // STAGE 2: Supplier enters from LEFT → CENTER (0.28 to 0.42)
      // Settles cleanly BELOW Buyer in separate vertical space. Zero overlap.
      tl.to(
        supplier,
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.14,
          ease: "power2.out",
        },
        0.28
      );

      // Settle plateau for Stage 2 (0.42 to 0.52)
      // Snap point 0.50 lands here. Both Buyer & Supplier visible.

      // STAGE 3: Visually connect the two sides with FIT FOUND in center (0.52 to 0.66)
      if (connection) {
        tl.to(
          connection,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.14,
            ease: "back.out(1.4)",
          },
          0.52
        );
      }

      // Settle plateau for Stage 3 (0.66 to 0.76)
      // Snap point 0.75 lands here: FIT FOUND is active in center.

      // STAGE 4: After FIT FOUND, Match Unlocked card appears IN THE CENTER (0.76 to 0.88)
      // Connection fades/scales out to make way for Match card in center
      if (connection) {
        tl.to(
          connection,
          {
            autoAlpha: 0,
            scale: 0.75,
            duration: 0.08,
            ease: "power1.in",
          },
          0.76
        );
      }

      // Buyer and Supplier gently part vertically so Match card has generous center clearance
      tl.to(
        buyer,
        {
          y: -54,
          duration: 0.14,
          ease: "power2.out",
        },
        0.76
      );
      tl.to(
        supplier,
        {
          y: 54,
          duration: 0.14,
          ease: "power2.out",
        },
        0.76
      );

      // Match Unlocked card blooms in the center between them
      if (match) {
        tl.to(
          match,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.14,
            ease: "back.out(1.2)",
          },
          0.77
        );
      }

      // Settle plateau for Stage 4 (0.88 to 1.00)
      tl.set({}, {}, 1.0);
    });

    return () => mm.revert();
  }, [reduce]);

  // Reduced motion accessible fallback
  if (reduce) {
    return (
      <section className="relative overflow-hidden py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
          {/* Left: Supplier */}
          <div className="bg-paper flex items-center p-8 md:p-12 lg:p-16 border-r border-ink/[0.06]">
            <SupplierContent />
          </div>
          {/* Right: Buyer */}
          <div className="bg-ink flex items-center p-8 md:p-12 lg:p-16">
            <BuyerContent />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative w-full bg-paper overflow-hidden" data-two-sided-wrapper="true">
      <div
        ref={wrapRef}
        className="relative w-full h-[100dvh] overflow-hidden bg-paper select-none"
      >
      {/* ══════════════════════════════════════════════════════════════
          DESKTOP VERSION (>= 768px) — 100% EXACT EXISTING DESIGN
          ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block w-full h-full relative overflow-hidden">
        {/* Top desktop section indicator */}
        <div className="absolute top-5 sm:top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-paper/95 backdrop-blur-md border border-ink/[0.08] shadow-sm pointer-events-none">
          <span className="text-[10px] font-mono text-copper uppercase tracking-wider font-bold">
            TWO-SIDED DISCOVERY
          </span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((stepIdx) => (
              <span
                key={stepIdx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeStep >= stepIdx ? "bg-copper scale-110" : "bg-ink/15"
                }`}
              />
            ))}
          </div>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span className="text-[10px] font-mono text-slate/75 font-medium">
            {activeStep === 0
              ? "1. BUYER REQUIREMENT ARRIVES"
              : activeStep === 1
              ? "2. SUPPLIER CAPACITY ARRIVES"
              : activeStep === 2
              ? "3. SIGNALS CONVERGE"
              : "4. 95% EXPLAINABLE MATCH"}
          </span>
        </div>

        {/* Desktop 2-Column Split */}
        <div className="w-full h-full grid grid-cols-2 relative">
          {/* Left Panel: Supplier (Light) */}
          <div
            ref={leftPanelRef}
            className="relative bg-paper flex items-center justify-center p-8 md:p-12 lg:p-16 border-r border-ink/[0.06] h-full z-10"
          >
            <div className="max-w-md w-full my-auto">
              <SupplierContent isMatched={activeStep >= 2} />
            </div>
          </div>

          {/* Right Panel: Buyer (Dark) */}
          <div
            ref={rightPanelRef}
            className="relative bg-ink flex items-center justify-center p-8 md:p-12 lg:p-16 h-full z-10"
          >
            <div className="max-w-md w-full my-auto">
              <BuyerContent isMatched={activeStep >= 2} />
            </div>
          </div>

          {/* Desktop Center Seam */}
          <div
            ref={seamRef}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-copper/50 z-20 pointer-events-none"
          />

          {/* Desktop Connection Node */}
          <div
            ref={centerNodeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center"
          >
            <div className="w-10 h-10 rounded-full bg-surface border border-copper/40 shadow-lg flex items-center justify-center text-copper ring-4 ring-copper/20">
              <Handshake size={20} weight="bold" />
            </div>
            <span className="mt-1 text-[9px] font-mono uppercase tracking-widest text-copper bg-surface/95 px-2 py-0.5 rounded-full border border-copper/30 shadow-xs font-semibold">
              FIT FOUND
            </span>
          </div>

          {/* Desktop Transformation Card */}
          <div
            ref={transformBadgeRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto max-w-sm w-[92%] bg-surface/95 backdrop-blur-md rounded-2xl p-5 border border-copper/35 shadow-2xl"
            style={{
              boxShadow: "0 24px 48px -12px rgba(224, 122, 95, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.12)",
            }}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-ink/[0.06] mb-2.5">
              <div className="flex items-center gap-1.5 text-copper">
                <CheckCircle size={16} weight="fill" />
                <span className="text-mono-label text-[10px] font-bold tracking-wider">
                  MATCH UNLOCKED
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-copper bg-copper/12 px-2.5 py-0.5 rounded-full border border-copper/20">
                95% FIT
              </span>
            </div>

            <div className="space-y-1 text-center my-2.5">
              <p className="text-sm font-bold text-ink">
                European Cosmetics Co. ↔ ABC Packaging
              </p>
              <p className="text-[11px] text-slate leading-snug">
                Requirement matched with verified production capacity.
              </p>
            </div>

            <div className="bg-sand/40 rounded-lg p-2 my-2 border border-ink/[0.04] text-center">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-medium text-slate">
                <span>&ldquo;I need&rdquo;</span>
                <span className="text-copper font-bold">+</span>
                <span>&ldquo;I make&rdquo;</span>
                <span className="text-copper font-bold">→</span>
                <span className="text-copper font-bold">MATCH</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center mt-2.5 pt-2 border-t border-ink/[0.04] text-[9px] font-mono">
              {[
                { title: "BUSINESS" },
                { title: "INTEL" },
                { title: "MATCH" },
                { title: "CONNECT" },
              ].map((step) => (
                <div
                  key={step.title}
                  className="bg-copper/10 text-copper font-bold py-1 px-0.5 rounded border border-copper/20"
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE VERSION (< 768px) — DEDICATED VERTICAL LAYOUT
          Buyer → Connection → Supplier → Match (Zero Overlap)
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col w-full h-full relative overflow-hidden justify-center px-4 pt-16 pb-4">
        {/* Mobile Indicator */}
        <div className="flex items-center justify-center gap-2 mb-2 shrink-0">
          <span className="text-[9px] font-mono text-copper uppercase tracking-wider font-bold">
            TWO-SIDED DISCOVERY
          </span>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((stepIdx) => (
              <span
                key={stepIdx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeStep >= stepIdx ? "bg-copper scale-110" : "bg-ink/15"
                }`}
              />
            ))}
          </div>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span className="text-[9px] font-mono text-slate/75 font-medium">
            {activeStep === 0
              ? "1. BUYER ARRIVES"
              : activeStep === 1
              ? "2. SUPPLIER ARRIVES"
              : activeStep === 2
              ? "3. CONVERGE"
              : "4. 95% MATCH"}
          </span>
        </div>

        {/* 1. Mobile Buyer Card (Top) */}
        <div
          ref={mobileBuyerRef}
          className="w-full bg-ink text-surface rounded-2xl p-3.5 border border-white/10 shadow-lg shrink-0"
        >
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart size={16} weight="duotone" className="text-copper shrink-0" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-copper font-semibold">
              BUYER SIDE
            </span>
          </div>

          <h3 className="text-base font-bold text-surface leading-tight">
            &ldquo;I need something&rdquo;
          </h3>
          <p className="mt-1 text-[11px] text-silver/80 leading-snug">
            A cosmetics brand needs 50,000 glass bottles/month with ISO 9001 and EU export.
          </p>

          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {[
              { label: "Product", value: "Glass cosmetic bottles" },
              { label: "Volume", value: "50,000 units/mo" },
              { label: "Certs", value: "ISO 9001, GMP" },
              { label: "Market", value: "EU export" },
            ].map((item) => (
              <div
                key={item.label}
                className={`px-2 py-1 rounded bg-white/[0.04] transition-colors ${
                  activeStep >= 2 ? "bg-copper/20 border-l-2 border-copper" : ""
                }`}
              >
                <span className="text-[8px] font-mono uppercase tracking-wider text-silver/50 block">
                  {item.label}
                </span>
                <span className="text-[11px] font-medium text-surface block truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/discover"
            className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-copper hover:text-copper-muted transition-colors"
          >
            Find matches
            <ArrowRight size={10} weight="bold" />
          </Link>
        </div>

        {/* 2. Mobile Center Meeting & Match Area (Between Buyer & Supplier) */}
        <div className="relative w-full flex items-center justify-center my-2 shrink-0 min-h-[38px]">
          {/* Stage 3: FIT FOUND Connection (Line + Handshake Pill) */}
          <div
            ref={mobileConnectionRef}
            className="w-full flex items-center justify-center relative py-1"
          >
            <div className="absolute left-2 right-2 h-px bg-copper/30" />
            <div className="relative z-10 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface border border-copper/30 shadow-xs text-copper text-[9px] font-mono font-bold tracking-wider">
              <Handshake size={13} weight="bold" />
              <span>FIT FOUND</span>
            </div>
          </div>

          {/* Stage 4: MATCH UNLOCKED Card (Centered in Meeting Zone) */}
          <div
            ref={mobileMatchRef}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 w-full bg-surface/95 backdrop-blur-md rounded-xl p-3 border border-copper/35 shadow-lg"
            style={{
              boxShadow: "0 12px 24px -8px rgba(224, 122, 95, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-ink/[0.06] mb-1.5">
              <div className="flex items-center gap-1.5 text-copper">
                <CheckCircle size={14} weight="fill" />
                <span className="text-mono-label text-[9px] font-bold tracking-wider">
                  MATCH UNLOCKED
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-copper bg-copper/10 px-2 py-0.5 rounded-full border border-copper/20">
                95% FIT
              </span>
            </div>

            <div className="text-center my-1">
              <p className="text-xs font-bold text-ink truncate">
                European Cosmetics Co. ↔ ABC Packaging
              </p>
              <p className="text-[10px] text-slate leading-snug">
                Requirement matched with verified production capacity.
              </p>
            </div>

            <div className="bg-sand/40 rounded p-1 my-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono font-medium text-slate">
                <span>&ldquo;I need&rdquo;</span>
                <span className="text-copper font-bold">+</span>
                <span>&ldquo;I make&rdquo;</span>
                <span className="text-copper font-bold">→</span>
                <span className="text-copper font-bold">MATCH</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center pt-1 border-t border-ink/[0.04] text-[8px] font-mono">
              {["BUSINESS", "INTEL", "MATCH", "CONNECT"].map((step) => (
                <div
                  key={step}
                  className="bg-copper/10 text-copper font-bold py-0.5 rounded border border-copper/20"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Mobile Supplier Card (Below Meeting Zone) */}
        <div
          ref={mobileSupplierRef}
          className="w-full bg-paper text-ink rounded-2xl p-3.5 border border-ink/[0.08] shadow-md shrink-0"
        >
          <div className="flex items-center gap-2 mb-1">
            <Storefront size={16} weight="duotone" className="text-copper shrink-0" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-copper font-semibold">
              SUPPLIER SIDE
            </span>
          </div>

          <h3 className="text-base font-bold text-ink leading-tight">
            &ldquo;I make or sell something&rdquo;
          </h3>
          <p className="mt-1 text-[11px] text-slate/80 leading-snug">
            A glass packaging manufacturer lists products, capacity, certifications, and markets.
          </p>

          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {[
              { label: "Products", value: "Glass bottles, jars" },
              { label: "Capacity", value: "80,000 units/mo" },
              { label: "Certs", value: "ISO 9001, 22716" },
              { label: "Markets", value: "India, EU, ME" },
            ].map((item) => (
              <div
                key={item.label}
                className={`px-2 py-1 rounded bg-ink/[0.03] transition-colors ${
                  activeStep >= 2 ? "bg-copper/10 border-l-2 border-copper" : ""
                }`}
              >
                <span className="text-[8px] font-mono uppercase tracking-wider text-slate/50 block">
                  {item.label}
                </span>
                <span className="text-[11px] font-medium text-ink/90 block truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-copper hover:text-copper-muted transition-colors"
          >
            Get discovered
            <ArrowRight size={10} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

/* ── Content Sub-Components (Preserving existing desktop content & styles) ── */

function SupplierContent({ isMatched = false }: { isMatched?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
        <Storefront size={22} weight="duotone" className="text-copper shrink-0" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-semibold">
          SUPPLIER SIDE
        </span>
      </div>

      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-ink leading-tight">
        &ldquo;I make or sell something&rdquo;
      </h3>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate/80 leading-relaxed max-w-[34ch]">
        A glass packaging manufacturer lists products, capacity,
        certifications, and markets to be discovered by relevant buyers.
      </p>

      {/* Worked example with subtle highlight on match */}
      <div className="mt-3 sm:mt-5 space-y-1 sm:space-y-2">
        {[
          { label: "Products", value: "Glass bottles, jars, droppers" },
          { label: "Capacity", value: "80,000 units/month" },
          { label: "Certs", value: "ISO 9001, ISO 22716" },
          { label: "Markets", value: "India, EU, Middle East" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-baseline gap-2 sm:gap-3 px-2 py-1 rounded transition-colors ${
              isMatched ? "bg-copper/10 border-l-2 border-copper" : "bg-transparent"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate/50 w-16 shrink-0">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm text-ink/90 font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/register"
        className="inline-flex items-center gap-1.5 mt-3 sm:mt-5 text-xs font-semibold text-copper hover:text-copper-muted transition-colors"
      >
        Get discovered
        <ArrowRight size={12} weight="bold" />
      </Link>
    </div>
  );
}

function BuyerContent({ isMatched = false }: { isMatched?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
        <ShoppingCart size={22} weight="duotone" className="text-copper shrink-0" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-copper font-semibold">
          BUYER SIDE
        </span>
      </div>

      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-surface leading-tight">
        &ldquo;I need something&rdquo;
      </h3>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-silver/80 leading-relaxed max-w-[34ch]">
        A cosmetics brand needs 50,000 glass bottles per month with
        ISO 9001 certification and export experience to Europe.
      </p>

      {/* Worked example with subtle highlight on match */}
      <div className="mt-3 sm:mt-5 space-y-1 sm:space-y-2">
        {[
          { label: "Product", value: "Glass cosmetic bottles" },
          { label: "Volume", value: "50,000 units/month" },
          { label: "Certs", value: "ISO 9001, GMP" },
          { label: "Market", value: "EU export" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-baseline gap-2 sm:gap-3 px-2 py-1 rounded transition-colors ${
              isMatched ? "bg-copper/15 border-l-2 border-copper" : "bg-transparent"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-silver/50 w-16 shrink-0">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm text-surface/90 font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 mt-3 sm:mt-5 text-xs font-semibold text-copper hover:text-copper-muted transition-colors"
      >
        Find matches
        <ArrowRight size={12} weight="bold" />
      </Link>
    </div>
  );
}
