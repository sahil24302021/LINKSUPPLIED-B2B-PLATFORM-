"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Buildings,
  Brain,
  Target,
  Plugs,
} from "@phosphor-icons/react";

const icons = [Buildings, Brain, Target, Plugs];

interface Step {
  title: string;
  description: string;
}

interface StepFlowProps {
  steps: Step[];
}

export function StepFlow({ steps }: StepFlowProps) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
      {steps.map((step, i) => {
        const Icon = icons[i];
        return (
          <motion.div
            key={step.title}
            className="relative flex flex-col items-center text-center px-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Connector line (desktop only, not on first) */}
            {i > 0 && (
              <div className="hidden md:block absolute left-0 top-7 w-full -translate-x-1/2">
                <div className="h-px bg-silver/30 w-full" />
              </div>
            )}

            <div className="relative z-10 w-14 h-14 rounded-xl bg-surface border border-silver/20 flex items-center justify-center mb-4 shadow-sm">
              <Icon size={24} className="text-copper" weight="duotone" />
            </div>

            <h3 className="text-base font-semibold text-ink mb-1.5">
              {step.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed max-w-[22ch]">
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
