"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDemoMode } from "@/hooks/use-demo-mode";
import { getDemoMode } from "@/lib/demo-mode";
import { openComingSoonModal } from "@/lib/coming-soon";

interface RouteGateProps {
  children: React.ReactNode;
}

export function RouteGate({ children }: RouteGateProps) {
  const router = useRouter();
  const { isDemo } = useDemoMode();
  const [mounted, setMounted] = useState(false);

  const checkIsDemoActive = useCallback(() => {
    if (typeof window === "undefined") return false;
    const urlParams = new URLSearchParams(window.location.search);
    const hasDemoParam = Boolean(urlParams.get("demo"));
    return Boolean(getDemoMode()) || isDemo || hasDemoParam;
  }, [isDemo]);

  useEffect(() => {
    setMounted(true);
    const active = checkIsDemoActive();
    if (!active) {
      router.replace("/?gate=coming-soon");
      openComingSoonModal();
    }
  }, [checkIsDemoActive, router]);

  const isAccessGranted = mounted && checkIsDemoActive();

  if (!isAccessGranted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-copper border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
