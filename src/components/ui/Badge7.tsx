"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Badge7Props {
  label: string;
  className?: string;
}

export function Badge7({ label, className }: Badge7Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-mono uppercase tracking-[0.24em] text-copper font-medium",
        className
      )}
    >
      ({label})
    </span>
  );
}
