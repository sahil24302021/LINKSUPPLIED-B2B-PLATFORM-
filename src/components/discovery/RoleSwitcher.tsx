"use client";

import type { DiscoveryPath } from "@/lib/types";
import {
  ShoppingCart,
  Storefront,
  Handshake,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";

const paths: {
  key: DiscoveryPath;
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "buy", label: "I need to buy", icon: ShoppingCart },
  { key: "sell", label: "I want to sell", icon: Storefront },
  { key: "partners", label: "Find partners", icon: Handshake },
  { key: "new-market", label: "Enter a new market", icon: GlobeHemisphereWest },
];

interface RoleSwitcherProps {
  activeRole: DiscoveryPath;
  onRoleChange: (role: DiscoveryPath) => void;
}

export function RoleSwitcher({ activeRole, onRoleChange }: RoleSwitcherProps) {
  return (
    <div
      className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-surface border border-silver/20"
      role="tablist"
      aria-label="Choose your discovery path"
    >
      {paths.map(({ key, label, icon: Icon }) => {
        const isActive = activeRole === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onRoleChange(key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? "bg-ink text-surface shadow-sm"
                  : "text-slate hover:text-ink hover:bg-silver/8"
              }
            `}
          >
            <Icon size={18} weight={isActive ? "fill" : "regular"} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
