"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle,
  ArrowRight,
  Sparkle,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SampleDataTag } from "@/components/ui/SampleDataTag";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SignalData {
  id: string;
  name: string;
  score: number;
  metric: string;
  proof: string;
}

const SIGNALS: SignalData[] = [
  {
    id: "product",
    name: "PRODUCT / MATERIAL FIT",
    score: 95,
    metric: "Type I Borosilicate Glass",
    proof: "Exact material & geometry match",
  },
  {
    id: "capacity",
    name: "CAPACITY ALIGNMENT",
    score: 88,
    metric: "80,000 units / month",
    proof: "Requirement: 50k / mo (62% plant load)",
  },
  {
    id: "quality",
    name: "QUALITY REQUIREMENTS",
    score: 92,
    metric: "ISO 9001:2015 & GMP",
    proof: "Active registry certificates verified",
  },
];

const ALL_EVALUATION_FACTORS = [
  { name: "Product / Material Fit", score: 95 },
  { name: "Capacity Alignment", score: 88 },
  { name: "Machinery / Capability", score: 90 },
  { name: "Quality Requirements", score: 92 },
  { name: "Location / Logistics", score: 85 },
];

interface TickCoord {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const DESKTOP_CARDINAL_TICKS: TickCoord[] = [
  { x1: 204, y1: 110, x2: 210, y2: 110 },
  { x1: 176.5, y1: 176.5, x2: 180.7, y2: 180.7 },
  { x1: 110, y1: 204, x2: 110, y2: 210 },
  { x1: 43.5, y1: 176.5, x2: 39.3, y2: 180.7 },
  { x1: 16, y1: 110, x2: 10, y2: 110 },
  { x1: 43.5, y1: 43.5, x2: 39.3, y2: 39.3 },
  { x1: 110, y1: 16, x2: 110, y2: 10 },
  { x1: 176.5, y1: 43.5, x2: 180.7, y2: 39.3 },
];

const DESKTOP_MICRO_TICKS: TickCoord[] = [
  { x1: 203.7, y1: 135.1, x2: 206.6, y2: 135.9 },
  { x1: 194, y1: 158.5, x2: 196.6, y2: 160 },
  { x1: 158.5, y1: 194, x2: 160, y2: 196.6 },
  { x1: 135.1, y1: 203.7, x2: 135.9, y2: 206.6 },
  { x1: 84.9, y1: 203.7, x2: 84.1, y2: 206.6 },
  { x1: 61.5, y1: 194, x2: 60, y2: 196.6 },
  { x1: 26, y1: 158.5, x2: 23.4, y2: 160 },
  { x1: 16.3, y1: 135.1, x2: 13.4, y2: 135.9 },
  { x1: 16.3, y1: 84.9, x2: 13.4, y2: 84.1 },
  { x1: 26, y1: 61.5, x2: 23.4, y2: 60 },
  { x1: 61.5, y1: 26, x2: 60, y2: 23.4 },
  { x1: 84.9, y1: 16.3, x2: 84.1, y2: 13.4 },
  { x1: 135.1, y1: 16.3, x2: 135.9, y2: 13.4 },
  { x1: 158.5, y1: 26, x2: 160, y2: 23.4 },
  { x1: 194, y1: 61.5, x2: 196.6, y2: 60 },
  { x1: 203.7, y1: 84.9, x2: 206.6, y2: 84.1 },
];

const MOBILE_CARDINAL_TICKS: TickCoord[] = [
  { x1: 146, y1: 80, x2: 152, y2: 80 },
  { x1: 126.7, y1: 126.7, x2: 130.9, y2: 130.9 },
  { x1: 80, y1: 146, x2: 80, y2: 152 },
  { x1: 33.3, y1: 126.7, x2: 29.1, y2: 130.9 },
  { x1: 14, y1: 80, x2: 8, y2: 80 },
  { x1: 33.3, y1: 33.3, x2: 29.1, y2: 29.1 },
  { x1: 80, y1: 14, x2: 80, y2: 8 },
  { x1: 126.7, y1: 33.3, x2: 130.9, y2: 29.1 },
];

export function MatchingSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Desktop Refs (>= 768px)
  const desktopHeaderRef = useRef<HTMLDivElement>(null);
  const desktopInitialScoreRef = useRef<HTMLDivElement>(null);
  const desktopTreeContainerRef = useRef<HTMLDivElement>(null);
  const desktopTopAnchorRef = useRef<HTMLDivElement>(null);
  const desktopLinesContainerRef = useRef<HTMLDivElement>(null);

  // Discrete SVG paths & dots for physical drawing
  const desktopPathLeftRef = useRef<SVGPathElement>(null);
  const desktopPathCenterRef = useRef<SVGPathElement>(null);
  const desktopPathRightRef = useRef<SVGPathElement>(null);
  const desktopDotLeftRef = useRef<SVGCircleElement>(null);
  const desktopDotCenterRef = useRef<SVGCircleElement>(null);
  const desktopDotRightRef = useRef<SVGCircleElement>(null);

  const desktopSignalRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const desktopStemRefs = [
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
  ];
  const desktopReasonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const desktopCheckRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const desktopFinalCardRef = useRef<HTMLDivElement>(null);

  // Mobile Dedicated Refs (< 768px)
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const mobileInitialScoreRef = useRef<HTMLDivElement>(null);
  const mobileTreeContainerRef = useRef<HTMLDivElement>(null);
  const mobileTopAnchorRef = useRef<HTMLDivElement>(null);
  const mobileVerticalLineRef = useRef<SVGLineElement>(null);
  const mobileSignalRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileReasonRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileCheckRefs = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];
  const mobileFinalCardRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (reduce || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    // ══════════════════════════════════════════════════════════════
    // DESKTOP CHOREOGRAPHY (>= 768px) — PHYSICAL SCORE TRANSFORMATION
    // ══════════════════════════════════════════════════════════════
    mm.add("(min-width: 768px)", () => {
      const header = desktopHeaderRef.current;
      const initialScore = desktopInitialScoreRef.current;
      const treeContainer = desktopTreeContainerRef.current;
      const topAnchor = desktopTopAnchorRef.current;
      const linesContainer = desktopLinesContainerRef.current;
      const pathLeft = desktopPathLeftRef.current;
      const pathCenter = desktopPathCenterRef.current;
      const pathRight = desktopPathRightRef.current;
      const dotLeft = desktopDotLeftRef.current;
      const dotCenter = desktopDotCenterRef.current;
      const dotRight = desktopDotRightRef.current;

      const signalCards = desktopSignalRefs.map((r) => r.current).filter(Boolean);
      const stems = desktopStemRefs.map((r) => r.current).filter(Boolean);
      const reasonCards = desktopReasonRefs.map((r) => r.current).filter(Boolean);
      const checks = desktopCheckRefs.map((r) => r.current).filter(Boolean);
      const finalCard = desktopFinalCardRef.current;

      if (!initialScore || !treeContainer || !finalCard) return;

      // Exact calculated path lengths for SVG draw animations
      // Left path: M 400 0 L 400 24 L 140 24 L 140 56 -> 24 + 260 + 32 = 316
      const lenLeft = 316;
      // Center path: M 400 0 L 400 56 -> 56
      const lenCenter = 56;
      // Right path: M 400 0 L 400 24 L 660 24 L 660 56 -> 24 + 260 + 32 = 316
      const lenRight = 316;

      // Set initial states
      gsap.set(header, { autoAlpha: 1, y: 0 });
      gsap.set(initialScore, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(treeContainer, { autoAlpha: 0 });
      gsap.set(topAnchor, { autoAlpha: 0, scale: 0.9, y: 10 });

      if (linesContainer) gsap.set(linesContainer, { autoAlpha: 1 });

      if (pathLeft) {
        gsap.set(pathLeft, {
          strokeDasharray: lenLeft,
          strokeDashoffset: lenLeft,
        });
      }
      if (pathCenter) {
        gsap.set(pathCenter, {
          strokeDasharray: lenCenter,
          strokeDashoffset: lenCenter,
        });
      }
      if (pathRight) {
        gsap.set(pathRight, {
          strokeDasharray: lenRight,
          strokeDashoffset: lenRight,
        });
      }

      if (dotLeft) gsap.set(dotLeft, { cx: 400, cy: 0, autoAlpha: 0, r: 3 });
      if (dotCenter) gsap.set(dotCenter, { cx: 400, cy: 0, autoAlpha: 0, r: 3 });
      if (dotRight) gsap.set(dotRight, { cx: 400, cy: 0, autoAlpha: 0, r: 3 });

      signalCards.forEach((card) => {
        gsap.set(card, {
          autoAlpha: 0,
          y: -14,
          scale: 0.8,
          borderColor: "rgba(196, 133, 76, 0.22)",
        });
      });

      stems.forEach((stem) => {
        gsap.set(stem, { strokeDasharray: 12, strokeDashoffset: 12 });
      });

      reasonCards.forEach((reason) => {
        gsap.set(reason, { autoAlpha: 0, y: -4, height: 0 });
      });

      checks.forEach((chk) => {
        gsap.set(chk, { scale: 0, autoAlpha: 0 });
      });

      gsap.set(finalCard, { autoAlpha: 0, scale: 0.88, y: 24 });

      // Scroll timeline with deliberate rest plateaus & non-aggressive snapping
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          scrub: 0.6,
          snap: {
            snapTo: [0, 0.35, 0.68, 1.0],
            duration: { min: 0.2, max: 0.38 },
            delay: 0.1,
            ease: "power1.out",
          },
          invalidateOnRefresh: true,
        },
        onUpdate: function () {
          const p = this.progress();
          let stage = 0;
          if (p >= 0.78) stage = 3;
          else if (p >= 0.48) stage = 2;
          else if (p >= 0.18) stage = 1;
          else stage = 0;
          setActiveStage((prev) => (prev !== stage ? stage : prev));
        },
      });

      // ── STAGE 1: The Match (0.00 -> 0.12) ──
      // Pure, confident central presentation of 92 MATCH close to headline

      // ── STAGE 2: Deconstruct the Score (0.12 -> 0.35) ──
      // 1. Initial 92 card lifts up slightly
      tl.to(
        initialScore,
        {
          y: -16,
          scale: 0.94,
          duration: 0.05,
          ease: "power1.out",
        },
        0.12
      );

      // 2. Central anchor point forms as initial card morphs into it
      tl.to(
        initialScore,
        {
          autoAlpha: 0,
          duration: 0.03,
          ease: "power1.in",
        },
        0.15
      );
      tl.to(
        treeContainer,
        {
          autoAlpha: 1,
          duration: 0.02,
        },
        0.15
      );
      tl.to(
        topAnchor,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.04,
          ease: "power1.out",
        },
        0.15
      );

      // Top anchor central point forms and emits energy
      tl.to(
        topAnchor,
        {
          scale: 1.03,
          duration: 0.02,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        },
        0.17
      );

      // 3. Connecting lines physically draw outward from the central point
      if (pathCenter) {
        tl.to(
          pathCenter,
          {
            strokeDashoffset: 0,
            duration: 0.06,
            ease: "power1.inOut",
          },
          0.18
        );
      }
      if (pathLeft) {
        tl.to(
          pathLeft,
          {
            strokeDashoffset: 0,
            duration: 0.09,
            ease: "power1.inOut",
          },
          0.18
        );
      }
      if (pathRight) {
        tl.to(
          pathRight,
          {
            strokeDashoffset: 0,
            duration: 0.09,
            ease: "power1.inOut",
          },
          0.18
        );
      }

      // Copper signal pulse dots travel along the drawing paths
      if (dotCenter) {
        tl.to(
          dotCenter,
          {
            keyframes: [
              { cx: 400, cy: 0, autoAlpha: 1, duration: 0.01 },
              { cx: 400, cy: 56, duration: 0.05, ease: "linear" },
            ],
          },
          0.18
        );
      }
      if (dotLeft) {
        tl.to(
          dotLeft,
          {
            keyframes: [
              { cx: 400, cy: 0, autoAlpha: 1, duration: 0.01 },
              { cx: 400, cy: 24, duration: 0.02, ease: "linear" },
              { cx: 140, cy: 24, duration: 0.04, ease: "linear" },
              { cx: 140, cy: 56, duration: 0.02, ease: "linear" },
            ],
          },
          0.18
        );
      }
      if (dotRight) {
        tl.to(
          dotRight,
          {
            keyframes: [
              { cx: 400, cy: 0, autoAlpha: 1, duration: 0.01 },
              { cx: 400, cy: 24, duration: 0.02, ease: "linear" },
              { cx: 660, cy: 24, duration: 0.04, ease: "linear" },
              { cx: 660, cy: 56, duration: 0.02, ease: "linear" },
            ],
          },
          0.18
        );
      }

      // 4. Signals arrive ONLY as lines reach endpoints (Center at 0.23, Left & Right at 0.26)
      if (signalCards[1]) {
        tl.to(
          signalCards[1],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.06,
            ease: "back.out(1.2)",
          },
          0.23
        );
      }
      if (signalCards[0]) {
        tl.to(
          signalCards[0],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.06,
            ease: "back.out(1.2)",
          },
          0.26
        );
      }
      if (signalCards[2]) {
        tl.to(
          signalCards[2],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.06,
            ease: "back.out(1.2)",
          },
          0.26
        );
      }

      // Settle Plateau for Stage 2 (3 Signals): 0.28 -> 0.42 (Rest point 0.35)

      // ── STAGE 3: Sequential Reason Reveal (0.42 -> 0.62) ──
      // Signal 1 (Product Fit) Activates & Reveals Evidence
      tl.to(
        signalCards[0],
        {
          borderColor: "rgba(196, 133, 76, 0.75)",
          duration: 0.03,
          ease: "power1.out",
        },
        0.43
      );
      if (stems[0]) {
        tl.to(stems[0], { strokeDashoffset: 0, duration: 0.03, ease: "linear" }, 0.43);
      }
      if (reasonCards[0]) {
        tl.to(
          reasonCards[0],
          {
            autoAlpha: 1,
            y: 0,
            height: "auto",
            duration: 0.04,
            ease: "power2.out",
          },
          0.44
        );
      }
      if (checks[0]) {
        tl.to(
          checks[0],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.03,
            ease: "back.out(2)",
          },
          0.46
        );
      }

      // Signal 2 (Capacity) Activates & Reveals Evidence
      tl.to(
        signalCards[1],
        {
          borderColor: "rgba(196, 133, 76, 0.75)",
          duration: 0.03,
          ease: "power1.out",
        },
        0.49
      );
      if (stems[1]) {
        tl.to(stems[1], { strokeDashoffset: 0, duration: 0.03, ease: "linear" }, 0.49);
      }
      if (reasonCards[1]) {
        tl.to(
          reasonCards[1],
          {
            autoAlpha: 1,
            y: 0,
            height: "auto",
            duration: 0.04,
            ease: "power2.out",
          },
          0.50
        );
      }
      if (checks[1]) {
        tl.to(
          checks[1],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.03,
            ease: "back.out(2)",
          },
          0.52
        );
      }

      // Signal 3 (Certifications) Activates & Reveals Evidence
      tl.to(
        signalCards[2],
        {
          borderColor: "rgba(196, 133, 76, 0.75)",
          duration: 0.03,
          ease: "power1.out",
        },
        0.55
      );
      if (stems[2]) {
        tl.to(stems[2], { strokeDashoffset: 0, duration: 0.03, ease: "linear" }, 0.55);
      }
      if (reasonCards[2]) {
        tl.to(
          reasonCards[2],
          {
            autoAlpha: 1,
            y: 0,
            height: "auto",
            duration: 0.04,
            ease: "power2.out",
          },
          0.56
        );
      }
      if (checks[2]) {
        tl.to(
          checks[2],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.03,
            ease: "back.out(2)",
          },
          0.58
        );
      }

      // Settle Plateau for Stage 3 (Reasons Audited): 0.62 -> 0.72 (Rest point 0.68)

      // ── STAGE 4: Clean Reconvergence (0.72 -> 0.85) ──
      // 1. Evidence retracts cleanly
      stems.forEach((stem) => {
        tl.to(stem, { strokeDashoffset: 12, duration: 0.03, ease: "power1.in" }, 0.72);
      });
      reasonCards.forEach((reason) => {
        tl.to(
          reason,
          {
            autoAlpha: 0,
            y: -4,
            height: 0,
            duration: 0.03,
            ease: "power1.in",
          },
          0.72
        );
      });
      checks.forEach((chk) => {
        tl.to(chk, { scale: 0, autoAlpha: 0, duration: 0.02 }, 0.72);
      });

      // 2. Connectors retract back to central origin
      if (pathLeft) {
        tl.to(
          pathLeft,
          { strokeDashoffset: lenLeft, duration: 0.04, ease: "power2.in" },
          0.75
        );
      }
      if (pathCenter) {
        tl.to(
          pathCenter,
          { strokeDashoffset: lenCenter, duration: 0.04, ease: "power2.in" },
          0.75
        );
      }
      if (pathRight) {
        tl.to(
          pathRight,
          { strokeDashoffset: lenRight, duration: 0.04, ease: "power2.in" },
          0.75
        );
      }
      if (dotLeft) tl.to(dotLeft, { autoAlpha: 0, duration: 0.02 }, 0.75);
      if (dotCenter) tl.to(dotCenter, { autoAlpha: 0, duration: 0.02 }, 0.75);
      if (dotRight) tl.to(dotRight, { autoAlpha: 0, duration: 0.02 }, 0.75);

      // 3. Signals move toward center point
      if (signalCards[0]) {
        tl.to(
          signalCards[0],
          {
            x: 260,
            y: -24,
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.05,
            ease: "power2.in",
          },
          0.77
        );
      }
      if (signalCards[1]) {
        tl.to(
          signalCards[1],
          {
            y: -24,
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.05,
            ease: "power2.in",
          },
          0.77
        );
      }
      if (signalCards[2]) {
        tl.to(
          signalCards[2],
          {
            x: -260,
            y: -24,
            scale: 0.5,
            autoAlpha: 0,
            duration: 0.05,
            ease: "power2.in",
          },
          0.77
        );
      }

      // 4. Top anchor collapses into center point
      tl.to(
        topAnchor,
        {
          scale: 0.5,
          autoAlpha: 0,
          duration: 0.03,
          ease: "power2.in",
        },
        0.81
      );

      // Ensure tree container is completely hidden (zero ghost fragments)
      tl.to(treeContainer, { autoAlpha: 0, duration: 0.01 }, 0.82);

      // 5. 92 VERIFIED MATCH appears cleanly from center
      tl.to(
        finalCard,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.06,
          ease: "back.out(1.2)",
        },
        0.83
      );

      // ── HANDOFF BUFFER TO PROFILE SECTION: 0.87 -> 1.00 (Rest point 1.0) ──
      // Pinned state rests peacefully with pure 92 VERIFIED MATCH before unpinning
      tl.set({}, {}, 1.0);
    });

    // ══════════════════════════════════════════════════════════════
    // MOBILE CHOREOGRAPHY (< 768px) — SEQUENTIAL STACKED AUDIT
    // ══════════════════════════════════════════════════════════════
    mm.add("(max-width: 767px)", () => {
      const initialScore = mobileInitialScoreRef.current;
      const treeContainer = mobileTreeContainerRef.current;
      const topAnchor = mobileTopAnchorRef.current;
      const verticalLine = mobileVerticalLineRef.current;
      const signalCards = mobileSignalRefs.map((r) => r.current).filter(Boolean);
      const reasonCards = mobileReasonRefs.map((r) => r.current).filter(Boolean);
      const checks = mobileCheckRefs.map((r) => r.current).filter(Boolean);
      const finalCard = mobileFinalCardRef.current;

      if (!initialScore || !treeContainer || !finalCard) return;

      // Initial States
      gsap.set(initialScore, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(treeContainer, { autoAlpha: 0 });
      gsap.set(topAnchor, { autoAlpha: 0, scale: 0.92, y: 8 });

      if (verticalLine) {
        gsap.set(verticalLine, { strokeDasharray: 200, strokeDashoffset: 200 });
      }

      signalCards.forEach((card) => {
        gsap.set(card, {
          autoAlpha: 0,
          y: 10,
          scale: 0.92,
          borderColor: "rgba(196, 133, 76, 0.2)",
        });
      });

      reasonCards.forEach((reason) => {
        gsap.set(reason, { autoAlpha: 0, height: 0 });
      });

      checks.forEach((chk) => {
        gsap.set(chk, { scale: 0, autoAlpha: 0 });
      });

      gsap.set(finalCard, { autoAlpha: 0, scale: 0.9, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          scrub: 0.6,
          snap: {
            snapTo: [0, 0.35, 0.68, 1.0],
            duration: { min: 0.2, max: 0.38 },
            delay: 0.1,
            ease: "power1.out",
          },
          invalidateOnRefresh: true,
        },
        onUpdate: function () {
          const p = this.progress();
          let stage = 0;
          if (p >= 0.78) stage = 3;
          else if (p >= 0.48) stage = 2;
          else if (p >= 0.18) stage = 1;
          else stage = 0;
          setActiveStage((prev) => (prev !== stage ? stage : prev));
        },
      });

      // Stage 1 -> 2: Physical Deconstruction
      tl.to(
        initialScore,
        {
          y: -12,
          scale: 0.92,
          duration: 0.05,
          ease: "power1.out",
        },
        0.12
      );

      tl.to(
        initialScore,
        {
          autoAlpha: 0,
          duration: 0.03,
          ease: "power1.in",
        },
        0.15
      );
      tl.to(
        treeContainer,
        {
          autoAlpha: 1,
          duration: 0.02,
        },
        0.15
      );
      tl.to(
        topAnchor,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.04,
          ease: "power1.out",
        },
        0.15
      );

      if (verticalLine) {
        tl.to(
          verticalLine,
          {
            strokeDashoffset: 0,
            duration: 0.09,
            ease: "power1.inOut",
          },
          0.18
        );
      }

      signalCards.forEach((card, idx) => {
        tl.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.06,
            ease: "back.out(1.2)",
          },
          0.22 + idx * 0.03
        );
      });

      // Settle Plateau for Stage 2: 0.28 -> 0.42 (Rest point 0.35)

      // Stage 3: Sequential Reasons
      signalCards.forEach((card, idx) => {
        const t = 0.44 + idx * 0.06;
        tl.to(
          card,
          {
            borderColor: "rgba(196, 133, 76, 0.7)",
            duration: 0.03,
          },
          t
        );
        if (reasonCards[idx]) {
          tl.to(
            reasonCards[idx],
            {
              autoAlpha: 1,
              height: "auto",
              duration: 0.04,
              ease: "power2.out",
            },
            t + 0.01
          );
        }
        if (checks[idx]) {
          tl.to(
            checks[idx],
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.03,
              ease: "back.out(2)",
            },
            t + 0.02
          );
        }
      });

      // Settle Plateau for Stage 3: 0.62 -> 0.72 (Rest point 0.68)

      // Stage 4: Clean Reconvergence
      reasonCards.forEach((reason) => {
        tl.to(reason, { autoAlpha: 0, height: 0, duration: 0.03 }, 0.72);
      });
      checks.forEach((chk) => {
        tl.to(chk, { scale: 0, autoAlpha: 0, duration: 0.02 }, 0.72);
      });

      if (verticalLine) {
        tl.to(verticalLine, { strokeDashoffset: 200, duration: 0.04 }, 0.75);
      }

      signalCards.forEach((card) => {
        tl.to(
          card,
          {
            autoAlpha: 0,
            scale: 0.7,
            y: -12,
            duration: 0.05,
            ease: "power2.in",
          },
          0.77
        );
      });

      tl.to(
        topAnchor,
        {
          autoAlpha: 0,
          scale: 0.7,
          duration: 0.03,
        },
        0.81
      );

      tl.to(treeContainer, { autoAlpha: 0, duration: 0.01 }, 0.82);

      tl.to(
        finalCard,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.06,
          ease: "back.out(1.2)",
        },
        0.83
      );

      // Handoff Buffer to Profile Section: 0.87 -> 1.00 (Rest point 1.0)
      tl.set({}, {}, 1.0);
    });

    return () => mm.revert();
  }, [reduce]);

  // ══════════════════════════════════════════════════════════════
  // ACCESSIBILITY / REDUCED MOTION FALLBACK
  // ══════════════════════════════════════════════════════════════
  if (reduce) {
    return (
      <section className="py-24 bg-paper">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold block mb-2">
            SEE WHY A SUPPLIER MATCHES
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-ink mb-4">
            A score is only useful when you know why.
          </h2>
          <p className="text-base text-slate max-w-xl mx-auto mb-10">
            Compare material, process, tolerance, capacity, and quality requirements before contacting a supplier.
          </p>

          <div className="bg-surface rounded-2xl p-8 border border-copper/30 shadow-md max-w-md mx-auto mb-10 text-center">
            <span className="text-7xl font-display font-bold text-copper leading-none block">
              92
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold block mt-2">
              VERIFIED MATCH
            </span>
            <h3 className="text-xl font-bold text-ink mt-3">
              ABC Packaging Industries
            </h3>
            <p className="text-xs font-mono text-slate mt-1">
              Match score generated from structured supplier and requirement data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
            {ALL_EVALUATION_FACTORS.map((f) => (
              <div
                key={f.name}
                className="bg-surface rounded-xl p-3 border border-ink/[0.08]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase text-slate/80 font-bold truncate">
                    {f.name}
                  </span>
                  <span className="text-sm font-mono font-bold text-copper">
                    {f.score}
                  </span>
                </div>
                <p className="text-xs text-copper font-mono">✓ Verified signal</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative w-full bg-paper overflow-hidden" data-matching-wrapper="true">
      <section
        ref={sectionRef}
        className="relative w-full h-[100dvh] bg-paper overflow-hidden select-none"
      >
      {/* ══════════════════════════════════════════════════════════════
          DESKTOP CANVAS (>= 768px) — PHYSICAL SCORE TRANSFORMATION
          ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col w-full h-full relative justify-between max-w-5xl mx-auto px-8 lg:px-12 pt-16 lg:pt-18 pb-4">
        {/* Stage Progress Indicator Header (Sits cleanly below fixed navbar) */}
        <div className="flex items-center justify-between border-b border-ink/[0.06] pb-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold">
              STAGE {activeStage + 1} OF 4
            </span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="text-xs font-mono text-slate">
              {activeStage === 0
                ? "THE MATCH (ABC PACKAGING · 92)"
                : activeStage === 1
                ? "DECONSTRUCTING SCORE (3 SIGNALS)"
                : activeStage === 2
                ? "AUDITING REASONS BEHIND SCORE"
                : "RECONVERGENCE (VERIFIED MATCH)"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((stepIdx) => (
              <span
                key={stepIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStage === stepIdx
                    ? "w-8 bg-copper"
                    : activeStage > stepIdx
                    ? "w-4 bg-copper/50"
                    : "w-2 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section Headline — Crisp & Intentional */}
        <div ref={desktopHeaderRef} className="text-center shrink-0 mt-2 mb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface border border-copper/25 shadow-2xs text-copper text-[11px] font-mono font-bold tracking-wider mb-1.5">
            <SlidersHorizontal size={13} weight="bold" />
            <span>07 — EXPLAINABLE CAPABILITY MATCHING</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-display font-bold text-ink tracking-tight max-w-3xl mx-auto leading-[1.12]">
            A score is only useful when you know why.
          </h2>

          <p className="mt-1.5 text-sm lg:text-base text-slate max-w-xl mx-auto leading-relaxed">
            Compare material, process, tolerance, capacity, and quality requirements before contacting a supplier — backed by verified audits, not unverified claims.
          </p>
        </div>

        {/* Center Stage Arena — Anchored with balanced whitespace */}
        <div className="relative w-full flex-1 flex flex-col justify-start items-center pt-3 lg:pt-5 min-h-[380px]">
          {/* ── STAGE 1: Central Match Object (Initial 92 Score with Editorial Measurement Ring) ── */}
          <div
            ref={desktopInitialScoreRef}
            className="absolute z-20 flex flex-col items-center justify-center p-6 lg:p-7 bg-surface/98 backdrop-blur-md rounded-2xl border border-copper/35 shadow-xl text-center max-w-md w-full"
            style={{
              boxShadow:
                "0 18px 36px -10px rgba(196, 133, 76, 0.2), 0 4px 16px -4px rgba(26, 26, 46, 0.06)",
            }}
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-copper/10 border border-copper/20 text-copper text-[10px] font-mono font-bold mb-2">
              <Sparkle size={12} weight="fill" />
              <span>MATCH UNLOCKED</span>
            </div>

            {/* Dominant 92 Score with Subtle Editorial Measurement Ring */}
            <div className="relative flex items-center justify-center my-1">
              <svg
                className="absolute w-48 h-48 pointer-events-none -z-10"
                viewBox="0 0 220 220"
                fill="none"
              >
                {/* Subtle outer circular guide */}
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  fill="none"
                  stroke="#c4854c"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  strokeDasharray="3 6"
                />
                {/* Inner guide ring */}
                <circle
                  cx="110"
                  cy="110"
                  r="82"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="0.75"
                  strokeOpacity="0.1"
                />
                {/* Cardinal & diagonal tick marks (0, 45, 90, 135, 180, 225, 270, 315 deg) */}
                {DESKTOP_CARDINAL_TICKS.map((tick, i) => (
                  <line
                    key={i}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="#c4854c"
                    strokeWidth="1.25"
                    strokeOpacity="0.35"
                  />
                ))}
                {/* Subtle telemetry micro-ticks */}
                {DESKTOP_MICRO_TICKS.map((tick, i) => (
                  <line
                    key={i}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="#c4854c"
                    strokeWidth="0.75"
                    strokeOpacity="0.18"
                  />
                ))}
              </svg>

              <div className="text-8xl lg:text-9xl font-display font-bold text-copper leading-none tracking-tight">
                92
              </div>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-slate font-bold mt-1 block">
              MATCH
            </span>

            <div className="w-12 h-px bg-ink/[0.08] my-3" />

            <h3 className="text-xl font-bold text-ink tracking-tight">
              ABC Packaging Industries
            </h3>
            <p className="text-xs text-slate font-mono mt-0.5">
              Manufacturer · Mumbai, India
            </p>

            <div className="mt-3 pt-2.5 border-t border-ink/[0.06] w-full flex items-center justify-between text-[10px] font-mono text-slate/70">
              <span>SIGNAL REF #LS-8842</span>
              <span className="text-copper font-medium">● Verified Signal Match</span>
            </div>
          </div>

          {/* ── STAGE 2 & 3: Tree of 3 Deconstructed Signals with Drawing SVG Paths ── */}
          <div
            ref={desktopTreeContainerRef}
            className="absolute inset-x-0 top-1 lg:top-2 w-full flex flex-col items-center justify-start z-10"
          >
            <div className="w-full max-w-4xl flex flex-col items-center">
              {/* Top Anchor: 92 MATCH Origin Point */}
              <div
                ref={desktopTopAnchorRef}
                className="shrink-0 flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface/95 border border-copper/35 shadow-sm z-20"
              >
                <span className="text-xl font-display font-bold text-copper leading-none">
                  92
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-semibold">
                  MATCH
                </span>
                <span className="text-slate/30">|</span>
                <span className="text-xs font-bold text-ink">
                  ABC Packaging Industries
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              </div>

              {/* Direct connecting SVG Lines bridging seamlessly from top anchor into cards */}
              <div
                ref={desktopLinesContainerRef}
                className="w-full h-14 relative flex items-center justify-center overflow-visible"
              >
                <svg
                  className="w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 800 56"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  {/* Left Path: M 400 0 L 400 24 L 140 24 L 140 56 */}
                  <path
                    ref={desktopPathLeftRef}
                    d="M 400 0 L 400 24 L 140 24 L 140 56"
                    stroke="#c4854c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Center Path: M 400 0 L 400 56 */}
                  <path
                    ref={desktopPathCenterRef}
                    d="M 400 0 L 400 56"
                    stroke="#c4854c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Right Path: M 400 0 L 400 24 L 660 24 L 660 56 */}
                  <path
                    ref={desktopPathRightRef}
                    d="M 400 0 L 400 24 L 660 24 L 660 56"
                    stroke="#c4854c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Traveling Copper Signal Pulse Dots */}
                  <circle
                    ref={desktopDotLeftRef}
                    cx="400"
                    cy="0"
                    r="3"
                    fill="#c4854c"
                  />
                  <circle
                    ref={desktopDotCenterRef}
                    cx="400"
                    cy="0"
                    r="3"
                    fill="#c4854c"
                  />
                  <circle
                    ref={desktopDotRightRef}
                    cx="400"
                    cy="0"
                    r="3"
                    fill="#c4854c"
                  />

                  {/* Origin emitter marker */}
                  <circle cx="400" cy="0" r="3.5" fill="#c4854c" />
                </svg>
              </div>

              {/* 3 Signal Blocks Shelf */}
              <div className="w-full grid grid-cols-3 gap-5 px-2">
                {SIGNALS.map((sig, idx) => (
                  <div key={sig.id} className="flex flex-col items-center">
                    {/* Primary Signal Card */}
                    <div
                      ref={desktopSignalRefs[idx]}
                      className="w-full bg-surface/95 backdrop-blur-md rounded-xl p-4 border transition-colors duration-200 shadow-sm flex flex-col justify-between"
                      style={{
                        boxShadow: "0 8px 20px -6px rgba(26, 26, 46, 0.05)",
                      }}
                    >
                      <div>
                        {/* Header with signal title & individual score */}
                        <div className="flex items-center justify-between pb-2 border-b border-ink/[0.06] mb-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-bold">
                            {sig.name}
                          </span>
                          <span className="text-xl font-display font-bold text-copper leading-none">
                            {sig.score}
                          </span>
                        </div>

                        {/* Primary metric */}
                        <p className="text-sm font-semibold text-ink leading-snug">
                          {sig.metric}
                        </p>
                      </div>

                      {/* Small Connecting SVG Stem from Signal to Reason */}
                      <div className="flex justify-center h-3 relative my-1 overflow-visible">
                        <svg
                          className="w-2 h-3 pointer-events-none overflow-visible"
                          viewBox="0 0 8 12"
                        >
                          <line
                            ref={desktopStemRefs[idx]}
                            x1="4"
                            y1="0"
                            x2="4"
                            y2="12"
                            stroke="#c4854c"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      {/* Stage 3: Reason revealed sequentially under each signal */}
                      <div
                        ref={desktopReasonRefs[idx]}
                        className="overflow-hidden bg-sand/40 border border-copper/20 rounded p-2.5"
                      >
                        <div className="flex items-start gap-1.5 text-[11px] font-mono text-copper leading-tight">
                          <span
                            ref={desktopCheckRefs[idx]}
                            className="font-bold inline-block text-copper"
                          >
                            ✓
                          </span>
                          <span className="text-ink/90">{sig.proof}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── STAGE 4: Reconvergence Payoff Card (Pure 92 Verified Match) ── */}
          <div
            ref={desktopFinalCardRef}
            className="absolute z-30 w-full max-w-lg bg-surface/98 backdrop-blur-xl rounded-2xl p-7 border border-copper/40 shadow-2xl text-center"
            style={{
              boxShadow:
                "0 24px 52px -12px rgba(196, 133, 76, 0.28), 0 8px 24px -4px rgba(26, 26, 46, 0.08)",
            }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper/10 border border-copper/25 text-copper text-[11px] font-mono font-bold mb-3">
              <CheckCircle size={14} weight="fill" />
              <span>VERIFIED MATCH</span>
            </div>

            <div className="text-7xl lg:text-8xl font-display font-bold text-copper leading-none tracking-tight">
              92
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold mt-1.5 block">
              VERIFIED MATCH
            </span>

            <h3 className="text-2xl font-bold text-ink tracking-tight mt-3">
              ABC Packaging Industries
            </h3>
            <p className="text-xs text-slate font-mono mt-0.5">
              Manufacturer · Mumbai, India
            </p>

            {/* Payoff statement */}
            <div className="my-4 py-3 px-4 rounded-xl bg-sand/50 border border-copper/20 text-center">
              <p className="text-sm font-bold text-ink tracking-tight font-display mb-1.5">
                Match score is generated from structured supplier and requirement data.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[10px] font-mono mt-2">
                {ALL_EVALUATION_FACTORS.map((f) => (
                  <div key={f.name} className="flex flex-col items-center p-1.5 rounded bg-surface/90 border border-ink/[0.04]">
                    <span className="text-slate/60 text-[9px] truncate w-full text-center">{f.name}</span>
                    <span className="font-bold text-copper mt-0.5 text-xs">{f.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-ink/[0.06]">
              <span className="text-slate/70">
                Ready for full intelligence review
              </span>
              <Link
                href="/matching"
                className="group inline-flex items-center gap-1 text-copper hover:text-copper-muted font-bold transition-colors"
              >
                See explainable matching workflow
                <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sample Data Disclosure */}
        <div className="text-center shrink-0 pt-2 border-t border-ink/[0.04] flex items-center justify-center gap-2">
          <SampleDataTag />
          <p className="text-[10px] font-mono text-slate/60">
            ILLUSTRATIVE MULTI-FACTOR MATCHING MODEL FOR SAMPLE PACKAGING REQUIREMENT
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE CANVAS (< 768px) — DELIBERATE STACKED COMPOSITION
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col w-full h-full relative justify-between px-4 pt-16 pb-3 overflow-hidden">
        {/* Mobile Stage Progress Indicator (Below Navbar) */}
        <div className="flex items-center justify-between shrink-0 mb-1 border-b border-ink/[0.06] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-copper font-bold">
              STAGE {activeStage + 1}/4
            </span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="text-[10px] font-mono text-slate/80">
              {activeStage === 0
                ? "THE MATCH (92)"
                : activeStage === 1
                ? "3 SIGNALS"
                : activeStage === 2
                ? "VERIFIED REASONS"
                : "VERIFIED MATCH"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[0, 1, 2, 3].map((stepIdx) => (
              <span
                key={stepIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStage === stepIdx
                    ? "w-5 bg-copper"
                    : activeStage > stepIdx
                    ? "w-2.5 bg-copper/50"
                    : "w-1.5 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Center Content Group: Header + Interactive Arena Unified for Balanced Whitespace */}
        <div className="flex-1 flex flex-col justify-center items-center w-full py-1">
          {/* Mobile Header — Crisp & Cohesive */}
          <div ref={mobileHeaderRef} className="text-center shrink-0 mb-3 w-full">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface border border-copper/25 text-copper text-[9px] font-mono font-bold tracking-wider mb-1.5">
              <SlidersHorizontal size={11} weight="bold" />
              <span>SEE WHY A SUPPLIER MATCHES</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-ink tracking-tight leading-tight">
              A score is only useful when you know why.
            </h2>

            <p className="mt-1 text-xs text-slate leading-snug max-w-[36ch] mx-auto">
              Compare material, process, tolerance, capacity, and quality requirements before contacting a supplier.
            </p>
          </div>

          {/* Mobile Middle Interactive Zone — Anchored & Prominently Proportioned */}
          <div className="relative w-full flex flex-col items-center min-h-[490px] sm:min-h-[510px] max-w-[380px] mx-auto">
            {/* ── Mobile Stage 1: Central Initial Match Score ── */}
            <div
              ref={mobileInitialScoreRef}
              className="absolute top-0 inset-x-0 z-20 w-full bg-surface/98 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-copper/35 shadow-xl text-center"
              style={{
                boxShadow:
                  "0 18px 40px -10px rgba(196, 133, 76, 0.22), 0 4px 14px -2px rgba(26, 26, 46, 0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-copper font-bold bg-copper/10 px-2 py-0.5 rounded-full border border-copper/20 inline-flex items-center gap-1">
                  <Sparkle size={10} weight="fill" />
                  MATCH UNLOCKED
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate/70 font-semibold">
                  TOP 1% FIT
                </span>
              </div>

              {/* Requirement Context Banner */}
              <div className="py-1 px-2.5 rounded-lg bg-ink/[0.03] border border-ink/[0.05] text-[10px] font-mono text-slate flex items-center justify-between mb-1.5">
                <span className="truncate">Requirement: 50k Cosmetic Glass Bottles</span>
                <span className="text-copper font-bold shrink-0 ml-1">MATCHED</span>
              </div>

              {/* Mobile Measurement Ring around 92 */}
              <div className="relative flex items-center justify-center my-1">
                <svg
                  className="absolute w-36 h-36 pointer-events-none -z-10"
                  viewBox="0 0 160 160"
                  fill="none"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="none"
                    stroke="#c4854c"
                    strokeWidth="1"
                    strokeOpacity="0.25"
                    strokeDasharray="3 5"
                  />
                  {MOBILE_CARDINAL_TICKS.map((tick, i) => (
                    <line
                      key={i}
                      x1={tick.x1}
                      y1={tick.y1}
                      x2={tick.x2}
                      y2={tick.y2}
                      stroke="#c4854c"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                  ))}
                </svg>

                <div className="text-7xl font-display font-bold text-copper leading-none">
                  92
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-slate font-bold mt-0.5 block">
                COMPATIBILITY INDEX
              </span>

              <div className="w-12 h-px bg-ink/[0.08] my-2 mx-auto" />

              <h3 className="text-base font-bold text-ink leading-tight">
                ABC Packaging Industries
              </h3>
              <p className="text-[10px] text-slate font-mono mt-0.5">
                Manufacturer · Mumbai, India · 12 Yrs Audited
              </p>

              {/* Verified Signal Telemetry Preview Matrix with Visual Progress Bars */}
              <div className="mt-3 pt-2.5 border-t border-ink/[0.06] text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate font-bold">
                    3 Signals Encoded
                  </span>
                  <span className="text-[9px] font-mono text-copper font-bold">
                    92% OVERALL
                  </span>
                </div>
                <div className="space-y-1.5">
                  {SIGNALS.map((sig) => (
                    <div
                      key={sig.id}
                      className="p-1.5 px-2 rounded-lg bg-sand/40 border border-ink/[0.04] text-[10px] font-mono"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-ink font-semibold truncate">
                          {sig.name}
                        </span>
                        <span className="font-bold text-copper shrink-0">
                          {sig.score}
                        </span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-ink/[0.08] overflow-hidden flex">
                        <div
                          className="h-full bg-copper rounded-full"
                          style={{ width: `${sig.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Footer Cue */}
              <div className="mt-2.5 pt-2 border-t border-ink/[0.06] w-full flex items-center justify-between text-[9px] font-mono text-slate/70">
                <span className="text-copper font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper inline-block animate-pulse" />
                  Verified Registry Data
                </span>
                <span className="text-slate/60">Scroll to explore ↓</span>
              </div>
            </div>

            {/* ── Mobile Stage 2 & 3: Stacked 3 Signals + Reasons ── */}
            <div
              ref={mobileTreeContainerRef}
              className="absolute top-0 inset-x-0 flex flex-col gap-2 z-10 w-full"
            >
              {/* Top Anchor Pill */}
              <div
                ref={mobileTopAnchorRef}
                className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-surface/98 border border-copper/35 shadow-xs text-[10px] font-mono mb-0.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-copper/10 font-bold text-copper text-[10px]">
                    92
                  </span>
                  <span className="text-ink font-bold truncate max-w-[180px]">
                    ABC Packaging Industries
                  </span>
                </div>
                <span className="text-copper font-mono text-[9px] uppercase tracking-wider font-semibold">
                  3 SIGNALS
                </span>
              </div>

              {/* Vertical Connecting SVG line down the left side */}
              <div className="relative w-full flex flex-col gap-2">
                <svg className="absolute left-2.5 top-0 bottom-0 w-1 h-full pointer-events-none -z-0">
                  <line
                    ref={mobileVerticalLineRef}
                    x1="2"
                    y1="0"
                    x2="2"
                    y2="100%"
                    stroke="#c4854c"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* 3 Stacked Signal Cards */}
                {SIGNALS.map((sig, idx) => (
                  <div
                    key={sig.id}
                    ref={mobileSignalRefs[idx]}
                    className="bg-surface/98 backdrop-blur-md rounded-xl p-3 border transition-colors shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono uppercase text-slate font-bold tracking-wider">
                        {sig.name}
                      </span>
                      <span className="text-base font-display font-bold text-copper leading-none">
                        {sig.score}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-ink leading-tight">
                      {sig.metric}
                    </p>

                    {/* Progress bar */}
                    <div className="w-full h-1 rounded-full bg-ink/[0.06] overflow-hidden my-1.5">
                      <div
                        className="h-full bg-copper rounded-full"
                        style={{ width: `${sig.score}%` }}
                      />
                    </div>

                    {/* Mobile Stage 3 Reason Reveal */}
                    <div
                      ref={mobileReasonRefs[idx]}
                      className="overflow-hidden pt-1 border-t border-ink/[0.05]"
                    >
                      <div className="p-1.5 rounded-lg bg-sand/50 border border-copper/20 text-[10px] font-mono text-copper leading-snug flex items-start gap-1.5">
                        <span
                          ref={mobileCheckRefs[idx]}
                          className="font-bold inline-block text-copper mt-0.5"
                        >
                          ✓
                        </span>
                        <span className="text-ink/90 font-sans">{sig.proof}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mobile Stage 4: Reconvergence Card ── */}
            <div
              ref={mobileFinalCardRef}
              className="absolute top-0 inset-x-0 z-30 w-full bg-surface/98 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-copper/40 shadow-xl text-center"
              style={{
                boxShadow: "0 18px 44px -10px rgba(196, 133, 76, 0.28)",
              }}
            >
              <span className="text-[9px] font-mono uppercase tracking-wider text-copper font-bold bg-copper/10 px-2.5 py-0.5 rounded-full border border-copper/20 inline-flex items-center gap-1 mb-2">
                <CheckCircle size={12} weight="fill" />
                VERIFIED MATCH
              </span>

              <div className="text-6xl sm:text-7xl font-display font-bold text-copper leading-none">
                92
              </div>

              <h3 className="text-base font-bold text-ink mt-2 leading-tight">
                ABC Packaging Industries
              </h3>
              <p className="text-[10px] text-slate font-mono mt-0.5">
                Manufacturer · Mumbai, India
              </p>

              <div className="my-3 py-2.5 px-3 rounded-xl bg-sand/50 border border-copper/20 text-center">
                <p className="text-xs font-bold text-ink font-display">
                  Generated from structured data (5 factors)
                </p>
                <div className="grid grid-cols-2 gap-1 mt-2 text-[9px] font-mono">
                  {ALL_EVALUATION_FACTORS.map((f) => (
                    <div key={f.name} className="flex items-center justify-between px-1.5 py-1 rounded bg-surface border border-copper/15">
                      <span className="text-slate/70 truncate text-left">{f.name}</span>
                      <span className="font-bold text-copper ml-1">{f.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                href="/matching"
                variant="primary"
                size="md"
                className="w-full font-mono text-xs font-bold tracking-wider"
                iconTrailing={<ArrowRight size={12} weight="bold" />}
              >
                See matching workflow
              </Button>

              <p className="text-[9px] font-mono text-slate/60 mt-2">
                Illustrative factor breakdown for sample packaging profile
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Footnote */}
        <div className="text-center shrink-0 pt-1 border-t border-ink/[0.04] flex items-center justify-center gap-1.5">
          <SampleDataTag />
          <p className="text-[9px] font-mono text-slate/60">
            ILLUSTRATIVE MULTI-FACTOR MATCHING MODEL
          </p>
        </div>
      </div>
    </section>
    </div>
  );
}
