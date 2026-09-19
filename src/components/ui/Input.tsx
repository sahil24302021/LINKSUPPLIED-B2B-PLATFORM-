import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "w-full h-11 min-h-[44px] px-3.5 rounded-lg border bg-paper text-sm text-ink placeholder:text-silver/80 outline-none transition-all duration-150",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
            : "border-ink/[0.12] focus:border-copper focus:ring-2 focus:ring-copper/15",
          disabled && "opacity-50 cursor-not-allowed bg-ink/[0.03]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "w-full min-h-[100px] p-3.5 rounded-lg border bg-paper text-sm text-ink placeholder:text-silver/80 outline-none transition-all duration-150 resize-y",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
            : "border-ink/[0.12] focus:border-copper focus:ring-2 focus:ring-copper/15",
          disabled && "opacity-50 cursor-not-allowed bg-ink/[0.03]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, disabled, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "w-full h-11 min-h-[44px] px-3.5 pr-9 rounded-lg border bg-paper text-sm text-ink outline-none transition-all duration-150 appearance-none cursor-pointer",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              : "border-ink/[0.12] focus:border-copper focus:ring-2 focus:ring-copper/15",
            disabled && "opacity-50 cursor-not-allowed bg-ink/[0.03]",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
