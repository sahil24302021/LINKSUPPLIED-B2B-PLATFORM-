"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "motion/react";

interface NoiseFieldProps {
  className?: string;
  density?: number; // 0-1, controls initial dot density
  fadeOnScroll?: boolean;
}

export default function NoiseField({
  className = "",
  density = 0.6,
  fadeOnScroll = true,
}: NoiseFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let dots: { x: number; y: number; baseOpacity: number; size: number }[] =
      [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      generateDots(rect.width, rect.height);
    };

    const generateDots = (w: number, h: number) => {
      const count = Math.floor((w * h * density) / 2000);
      dots = [];
      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseOpacity: 0.08 + Math.random() * 0.18,
          size: 1 + Math.random() * 1.5,
        });
      }
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      let scrollFade = 1;
      if (fadeOnScroll && !reduce) {
        const sectionTop = canvas.closest("section")?.getBoundingClientRect()
          .top;
        if (sectionTop !== undefined) {
          const viewH = window.innerHeight;
          // Fade as section scrolls through viewport
          const progress = Math.max(
            0,
            Math.min(1, 1 - (sectionTop + rect.height) / (viewH + rect.height))
          );
          scrollFade = Math.max(0.1, 1 - progress * 0.8);
        }
      }

      for (const dot of dots) {
        const opacity = dot.baseOpacity * scrollFade;
        if (opacity < 0.02) continue;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
        ctx.fill();
      }

      if (fadeOnScroll && !reduce) {
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();

    if (reduce || !fadeOnScroll) {
      // Static render — no scroll-driven animation
      draw();
    } else {
      rafId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [density, fadeOnScroll, reduce]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
