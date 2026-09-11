"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { MatchFactor } from "@/lib/types";

interface FactorBarChartProps {
  factors: MatchFactor[];
  animate?: boolean;
  staggerMs?: number;
  onComplete?: () => void;
  compact?: boolean;
  highlightIndex?: number | null;
}

function CountUpNumeral({
  value,
  animate,
  delay,
}: {
  value: number;
  animate: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState(animate ? 0 : value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }

    const startTime = performance.now() + delay;
    const duration = 600;

    const tick = (now: number) => {
      if (now < startTime) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame((now) => {
      setDisplay(0);
      tick(now);
    });
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, animate, delay]);

  return <span>{display}</span>;
}

export default function FactorBarChart({
  factors,
  animate = true,
  staggerMs = 80,
  onComplete,
  compact = false,
  highlightIndex = null,
}: FactorBarChartProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;
  const completedRef = useRef(false);

  const handleLastBarComplete = useCallback(() => {
    if (!completedRef.current && onComplete) {
      completedRef.current = true;
      onComplete();
    }
  }, [onComplete]);

  // Reset completion tracking when factors change
  useEffect(() => {
    completedRef.current = false;
  }, [factors]);

  return (
    <div className={`flex flex-col ${compact ? "gap-2" : "gap-3"}`}>
      {factors.map((factor, i) => {
        const delay = shouldAnimate ? i * (staggerMs / 1000) : 0;
        const isHighlighted = highlightIndex === null || highlightIndex === i;
        const isLast = i === factors.length - 1;

        return (
          <div
            key={factor.label}
            className={`transition-opacity duration-200 ${
              isHighlighted ? "opacity-100" : "opacity-40"
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span
                className={`${
                  compact ? "text-xs" : "text-sm"
                } text-slate font-medium`}
              >
                {factor.label}
              </span>
              <span
                className={`font-mono font-semibold tabular-nums ${
                  compact ? "text-sm" : "text-base"
                } ${
                  factor.value >= 80
                    ? "text-success"
                    : factor.value >= 60
                    ? "text-ink"
                    : "text-warning"
                }`}
              >
                <CountUpNumeral
                  value={factor.value}
                  animate={shouldAnimate}
                  delay={delay * 1000}
                />
              </span>
            </div>
            <div
              className={`w-full rounded-full overflow-hidden ${
                compact ? "h-1.5" : "h-2"
              } bg-ink/[0.06]`}
            >
              <motion.div
                className={`h-full rounded-full ${
                  factor.value >= 80
                    ? "bg-success"
                    : factor.value >= 60
                    ? "bg-copper"
                    : "bg-warning"
                }`}
                initial={shouldAnimate ? { width: "0%" } : false}
                animate={{ width: `${factor.value}%` }}
                transition={
                  shouldAnimate
                    ? {
                        duration: 0.7,
                        delay,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    : { duration: 0 }
                }
                onAnimationComplete={isLast ? handleLastBarComplete : undefined}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
