"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Button12Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  iconBgClassName?: string;
}

export function Button12({
  label,
  asChild = false,
  children,
  className,
  iconBgClassName,
  ...props
}: Button12Props) {
  const content = (
    <>
      <span className="font-semibold text-xs md:text-sm tracking-wider uppercase">
        {label}
      </span>
      <span
        className={cn(
          "flex items-center justify-center w-7 h-7 rounded-full bg-copper text-white shrink-0 group-hover:rotate-45 transition-transform duration-200",
          iconBgClassName
        )}
      >
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </>
  );

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    return React.cloneElement(childElement, {
      className: cn(
        "group inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-ink text-paper hover:bg-graphite transition-all duration-200 shadow-raised hover:shadow-floating hover:scale-[1.02] active:scale-[0.98]",
        childElement.props.className,
        className
      ),
      children: content,
    });
  }

  return (
    <button
      className={cn(
        "group inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full bg-ink text-paper hover:bg-graphite transition-all duration-200 shadow-raised hover:shadow-floating hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
}
