"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ComingSoonModal } from "./ComingSoonModal";
import { InstantEvaluationModal } from "./InstantEvaluationModal";

export function GlobalModals() {
  const pathname = usePathname();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Check for pending Early Access modal upon arriving on Home ('/')
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check single-use sessionStorage token
    try {
      if (pathname === "/") {
        const pending = sessionStorage.getItem("linksupplied_show_early_access");
        if (pending === "1") {
          sessionStorage.removeItem("linksupplied_show_early_access");
          setIsComingSoonOpen(true);
        }
      }
    } catch {}

    // Check query params (?gate=coming-soon or ?early-access=true)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("gate") === "coming-soon" || urlParams.get("early-access") === "true") {
        setIsComingSoonOpen(true);
        const url = new URL(window.location.href);
        url.searchParams.delete("gate");
        url.searchParams.delete("early-access");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      }
    } catch {}
  }, [pathname]);

  useEffect(() => {
    const handleOpenComingSoon = () => setIsComingSoonOpen(true);
    const handleOpenDemo = () => setIsDemoOpen(true);

    window.addEventListener("linksupplied_open_coming_soon", handleOpenComingSoon);
    window.addEventListener("linksupplied_open_demo_eval", handleOpenDemo);

    return () => {
      window.removeEventListener("linksupplied_open_coming_soon", handleOpenComingSoon);
      window.removeEventListener("linksupplied_open_demo_eval", handleOpenDemo);
    };
  }, []);

  return (
    <>
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        onOpenDemo={() => {
          setIsComingSoonOpen(false);
          setIsDemoOpen(true);
        }}
      />
      <InstantEvaluationModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </>
  );
}
