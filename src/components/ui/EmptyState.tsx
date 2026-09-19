import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  badge?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "dark" | "outline";
    iconLeading?: React.ReactNode;
    iconTrailing?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  badge,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl border border-dashed border-ink/[0.12] p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto my-4 shadow-2xs",
        className
      )}
    >
      {/* 1. Context Icon & Optional Eyebrow */}
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-copper/10 text-copper mx-auto flex items-center justify-center border border-copper/20 shadow-2xs">
          {icon}
        </div>
      )}

      {badge && (
        <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2 py-0.5 rounded bg-copper/10">
          {badge}
        </span>
      )}

      {/* 2. Context & Explanation */}
      <div className="space-y-1.5 max-w-md mx-auto">
        <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate leading-relaxed">
          {description}
        </p>
      </div>

      {/* 3. Actionable Next Step CTA */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          {action && (
            <Button
              href={action.href}
              onClick={action.onClick}
              variant={action.variant || "primary"}
              size="md"
              iconLeading={action.iconLeading}
              iconTrailing={action.iconTrailing}
            >
              {action.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              variant="ghost"
              size="md"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
