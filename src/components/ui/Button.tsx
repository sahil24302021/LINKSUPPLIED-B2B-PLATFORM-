"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CircleNotch } from "@phosphor-icons/react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive"
  | "icon"
  | "dark";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      isLoading = false,
      loadingText,
      iconLeading,
      iconTrailing,
      asChild = false,
      href,
      target,
      rel,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isSpinning = loading || isLoading;
    const isDisabled = disabled || isSpinning;

    // Base styles with group for restrained micro-interactions
    const baseStyles =
      "group relative inline-flex items-center justify-center font-semibold transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 active:scale-[0.975]";

    // Variant mapping
    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "btn-shimmer bg-copper hover:bg-copper-muted text-surface shadow-xs border border-copper/30 hover:shadow-md hover:shadow-copper/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      dark:
        "bg-ink hover:bg-graphite text-surface shadow-xs border border-ink/25 hover:shadow-md hover:shadow-ink/15 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      secondary:
        "bg-surface hover:bg-paper text-ink border border-ink/[0.12] hover:border-ink/[0.24] shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      outline:
        "bg-transparent hover:bg-copper/[0.06] text-ink hover:text-copper border border-ink/[0.14] hover:border-copper/40 active:bg-copper/[0.08] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.975]",
      ghost:
        "bg-transparent hover:bg-ink/[0.05] text-slate hover:text-ink active:bg-ink/[0.08] active:scale-[0.98]",
      link:
        "bg-transparent text-copper hover:text-copper-muted p-0 min-h-0 underline-offset-4 hover:underline active:opacity-80 active:scale-100",
      destructive:
        "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/80 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:bg-rose-200 active:scale-[0.975]",
      icon:
        "bg-surface hover:bg-paper text-slate hover:text-ink border border-ink/[0.1] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:scale-95",
    };

    // Size mapping
    const sizeStyles: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-xs rounded-lg min-h-[36px] gap-1.5",
      md: "px-4 py-2 text-xs sm:text-sm rounded-lg min-h-[44px] gap-2",
      lg: "px-6 py-3 text-sm rounded-xl min-h-[48px] gap-2.5",
      icon: "w-11 h-11 p-0 rounded-xl min-h-[44px] min-w-[44px] justify-center",
    };

    const disabledStyles = isDisabled
      ? "opacity-50 cursor-not-allowed pointer-events-none shadow-none hover:translate-y-0 hover:shadow-none"
      : "cursor-pointer";

    // Stable content layout preventing width jump during loading state
    const content = (
      <>
        {isSpinning ? (
          <CircleNotch size={15} className="animate-spin text-current shrink-0" />
        ) : (
          iconLeading && (
            <span className="shrink-0 transition-transform duration-200">{iconLeading}</span>
          )
        )}
        <span className="truncate">{isSpinning && loadingText ? loadingText : children}</span>
        {!isSpinning && iconTrailing && (
          <span className="shrink-0 group-hover:translate-x-1 transition-transform duration-200 ease-out">
            {iconTrailing}
          </span>
        )}
      </>
    );

    const mergedClasses = cn(
      baseStyles,
      variantStyles[variant],
      variant !== "link" && sizeStyles[size],
      disabledStyles,
      className
    );

    // 1. Direct Next.js Link support if href is provided
    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className={mergedClasses}
          aria-disabled={isDisabled ? true : undefined}
        >
          {content}
        </Link>
      );
    }

    // 2. Polymorphic child element (asChild pattern)
    if (asChild && React.isValidElement(children)) {
      const childElement = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
        "aria-busy"?: boolean;
        "aria-disabled"?: boolean;
      }>;
      return React.cloneElement(childElement, {
        className: cn(mergedClasses, childElement.props.className),
        "aria-busy": isSpinning ? true : undefined,
        "aria-disabled": isDisabled ? true : undefined,
        children: content,
      });
    }

    // 3. Default standard button
    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isSpinning ? true : undefined}
        className={mergedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
