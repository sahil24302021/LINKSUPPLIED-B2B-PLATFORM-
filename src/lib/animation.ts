/**
 * Shared Animation System for LINKSUPPLIED
 * 
 * Separation of Concerns:
 * - Use Motion (`motion/react`) for component-level transitions:
 *   navigation active indicators, modals, tabs, micro-interactions (hover/tap).
 * - Use GSAP for scroll-driven animations:
 *   hero curtain, pinned pipelines, step diagrams, parallax.
 */

// Timing tokens in seconds
export const DURATION = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.3,
  smooth: 0.45,
  slow: 0.6,
  modalEnter: 0.35,
  modalExit: 0.2,
} as const;

// Easing cubic beziers for CSS / Motion
export const EASE = {
  // Snappy deceleration
  out: [0.16, 1, 0.3, 1] as const,
  // Smooth symmetric ease
  inOut: [0.45, 0, 0.2, 1] as const,
  // Crisp standard
  standard: [0.25, 0.1, 0.25, 1] as const,
  // Subtle overshoot
  overshoot: [0.34, 1.4, 0.64, 1] as const,
};

// Physics-based Spring configurations for Motion
export const SPRING = {
  // For nav indicator, tab pills
  capsule: {
    type: "spring" as const,
    stiffness: 420,
    damping: 30,
    mass: 0.8,
  },
  // Snappy response for buttons & taps
  snappy: {
    type: "spring" as const,
    stiffness: 480,
    damping: 28,
  },
  // Gentle feel for modal entries & drawers
  gentle: {
    type: "spring" as const,
    stiffness: 300,
    damping: 28,
  },
  // Subtle bounce for floating or highlight badges
  bouncy: {
    type: "spring" as const,
    stiffness: 380,
    damping: 18,
  },
};

// Standard Motion Variants for component transitions
export const FADE_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.normal, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE.standard } },
};

export const MODAL_VARIANTS = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...SPRING.gentle, duration: DURATION.modalEnter },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: DURATION.modalExit, ease: EASE.standard },
  },
};

export const SLIDE_UP_VARIANTS = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.smooth, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: DURATION.fast, ease: EASE.standard },
  },
};

// Reusable micro-interaction props for Motion elements
export const HOVER_TAP_PROPS = {
  button: {
    whileHover: { scale: 1.015, transition: { duration: DURATION.fast, ease: EASE.out } },
    whileTap: { scale: 0.975, transition: { duration: DURATION.instant } },
  },
  card: {
    whileHover: { y: -2, transition: { duration: DURATION.fast, ease: EASE.out } },
    whileTap: { scale: 0.99, transition: { duration: DURATION.instant } },
  },
  subtle: {
    whileHover: { scale: 1.01, transition: { duration: DURATION.fast } },
    whileTap: { scale: 0.985, transition: { duration: DURATION.instant } },
  },
};

// GSAP scroll animation tokens
export const GSAP_TOKENS = {
  duration: {
    step: 0.7,
    diagramNode: 0.5,
    connectorLine: 0.4,
    stagger: 0.14,
  },
  ease: {
    out: "power3.out",
    smooth: "power2.out",
    snap: "circ.out",
  },
} as const;
