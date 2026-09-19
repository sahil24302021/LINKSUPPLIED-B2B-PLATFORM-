import React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: string | boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  const errorId = id ? `${id}-error` : undefined;
  const helperId = id ? `${id}-helper` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-xs font-semibold text-ink uppercase tracking-wider"
          >
            {label}
            {required && <span className="text-copper ml-1">*</span>}
          </label>
        </div>
      )}

      {children}

      {helperText && !error && (
        <p id={helperId} className="text-[11px] text-slate/80 leading-relaxed">
          {helperText}
        </p>
      )}

      {error && typeof error === "string" && (
        <p id={errorId} className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
