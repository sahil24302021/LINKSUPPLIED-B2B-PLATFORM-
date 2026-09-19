"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getDemoMode, setDemoMode, clearDemoMode, type DemoRole } from "@/lib/demo-mode";
import { openComingSoonModal } from "@/lib/coming-soon";

export function useDemoMode() {
  const router = useRouter();
  const pathname = usePathname();

  const [demoRole, setDemoRoleState] = useState<DemoRole | null>(null);

  // Sync with client storage on initial mount
  useEffect(() => {
    setDemoRoleState(getDemoMode());
  }, []);

  // Check URL query parameters on mount or navigation (client-side only, avoids Next.js SSR bailouts)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const demoParam = urlParams.get("demo");
      if (demoParam === "buyer" || demoParam === "supplier") {
        setDemoMode(demoParam);
        setDemoRoleState(demoParam);
      } else if (demoParam === "true" && !getDemoMode()) {
        // Default to buyer if general ?demo=true is provided
        setDemoMode("buyer");
        setDemoRoleState("buyer");
      }
    } catch {
      // ignore
    }
  }, [pathname]);

  // Sync state on storage or custom event changes
  useEffect(() => {
    const handleSync = () => {
      setDemoRoleState(getDemoMode());
    };

    window.addEventListener("linksupplied_demo_mode_change", handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener("linksupplied_demo_mode_change", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const setDemo = useCallback((role: DemoRole) => {
    setDemoMode(role);
    setDemoRoleState(role);
  }, []);

  const exitDemo = useCallback((redirectPath?: string) => {
    clearDemoMode();
    setDemoRoleState(null);

    // Set single-use intent token for Early Access modal on Home
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("linksupplied_show_early_access", "1");
      } catch {}
    }

    // If a redirect path is explicitly provided, navigate there
    if (redirectPath && redirectPath !== "/") {
      router.push(redirectPath);
      return;
    }

    // Cleanly navigate to Home ('/')
    if (pathname === "/") {
      // If already on Home, clear token and open immediately
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem("linksupplied_show_early_access");
        } catch {}
      }
      openComingSoonModal();
    } else {
      router.push("/");
    }
  }, [router, pathname]);

  return {
    isDemo: demoRole !== null,
    demoRole,
    setDemo,
    exitDemo,
  };
}
