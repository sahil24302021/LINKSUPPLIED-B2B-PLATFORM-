"use client";

import { useState } from "react";
import type { DiscoveryPath } from "@/lib/types";
import { discoveryPathContent } from "@/lib/data";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface RequirementFormProps {
  path: DiscoveryPath;
  onSubmit: () => void;
}

export function RequirementForm({ path, onSubmit }: RequirementFormProps) {
  const content = discoveryPathContent[path];
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-ink">{content.title}</h3>
        <p className="text-sm text-slate mt-1">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {content.fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`field-${field.key}`}
              className="block text-sm font-medium text-ink mb-1.5"
            >
              {field.label}
            </label>
            <input
              id={`field-${field.key}`}
              type="text"
              value={formData[field.key] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              placeholder={field.placeholder}
              className="w-full px-3.5 py-2.5 bg-surface border border-silver/30 rounded-lg text-sm text-ink placeholder:text-silver focus:border-copper focus:ring-2 focus:ring-copper/15 outline-none transition-all duration-200"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-2.5 bg-copper hover:bg-copper-muted text-surface text-sm font-medium rounded-lg transition-colors duration-200"
      >
        <MagnifyingGlass size={16} />
        Find matches
      </button>
    </form>
  );
}
