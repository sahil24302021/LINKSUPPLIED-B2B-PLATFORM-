import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CardLevel = "primary" | "supporting" | "interactive";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: CardLevel;
  as?: React.ElementType;
}

const levelStyles: Record<CardLevel, string> = {
  // Level 1: Primary — Main forms, main dashboard modules, primary panels
  primary: "bg-surface rounded-2xl border border-ink/[0.08] shadow-xs",
  // Level 2: Supporting — Secondary metrics, metadata groups, inner preview widgets
  supporting: "bg-paper/70 rounded-xl border border-ink/[0.06]",
  // Level 3: Interactive — Clickable cards, supplier cards, RFQ cards, dashboard action rows
  interactive:
    "bg-surface rounded-2xl border border-ink/[0.08] hover:border-ink/[0.2] hover:-translate-y-1 hover:shadow-md active:scale-[0.985] transition-all duration-200 cursor-pointer",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, level = "primary", as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(levelStyles[level], className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base sm:text-lg font-bold text-ink leading-tight tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-slate leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 sm:p-6 pt-0 border-t border-ink/[0.06] mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
