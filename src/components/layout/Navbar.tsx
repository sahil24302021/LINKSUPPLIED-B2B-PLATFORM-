"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { SPRING, DURATION, EASE } from "@/lib/animation";
import { useDemoMode } from "@/hooks/use-demo-mode";
import {
  List,
  X,
  CaretDown,
  Sparkle,
  ShieldCheck,
  ArrowsLeftRight,
  FileText,
  Factory,
  ArrowRight,
} from "@phosphor-icons/react";

/* ─── Top-Level Direct Navigation Links (Un-duplicated) ──────────── */
const TOP_NAV_ITEMS = [
  { href: "/how-it-works", title: "How It Works" },
  { href: "/verification", title: "Verification" },
  { href: "/about", title: "About" },
];

/* ─── Product Navigation Links ────────────────────────────────────── */
const PRODUCT_ITEMS = [
  {
    href: "/discover",
    title: "Discover & Sourcing",
    description: "Create structured briefs and tolerance envelopes.",
    icon: FileText,
  },
  {
    href: "/matching",
    title: "Capability Matching",
    description: "Review algorithmically ranked manufacturing plants.",
    icon: ArrowsLeftRight,
  },
  {
    href: "/rfq",
    title: "RFQ & Quotations",
    description: "Compare commercial bids, lead times, and tooling NRE.",
    icon: Sparkle,
  },
  {
    href: "/verification",
    title: "Supplier Verification",
    description: "6-layer registry and on-site machinery audit protocol.",
    icon: ShieldCheck,
  },
];

/* ─── Resources Navigation Links (Direct un-duplicated items) ────── */
const RESOURCE_ITEMS = [
  {
    href: "/early-access",
    title: "Early Access Program",
    description: "Apply for enterprise buyer pilot access or certified plant listing.",
    icon: Sparkle,
  },
  {
    href: "/register?role=supplier",
    title: "Join as Manufacturer",
    description: "Make machine capabilities discoverable for direct RFQs.",
    icon: Factory,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { isDemo } = useDemoMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"product" | "resources" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-aware backdrop enhancement ─────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Outside click closes dropdowns ────────────────────────────── */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Body scroll lock when mobile menu is open ─────────────────── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── ESC key closes open dropdown or mobile menu ───────────────── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openDropdown) setOpenDropdown(null);
        if (mobileOpen) setMobileOpen(false);
      }
    },
    [openDropdown, mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Close menus on route change ───────────────────────────────── */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isOnDiscover = pathname === "/discover";

  const isProductActive = PRODUCT_ITEMS.some((i) => pathname === i.href);
  const isResourcesActive = RESOURCE_ITEMS.some((i) => pathname === i.href);

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        mobileOpen
          ? "bg-[#f8f7f4]"
          : scrolled
          ? "border-b border-ink/[0.08] bg-paper/95 backdrop-blur-xl shadow-xs"
          : "border-b border-ink/[0.06] bg-paper/90 backdrop-blur-xl"
      }`}
    >
      <nav
        className="max-w-5xl mx-auto h-[54px] px-4 sm:px-6 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Brand Wordmark ───────────────────────────────────── */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="text-ink font-bold text-[14.5px] tracking-[-0.01em] select-none hover:text-ink/80 transition-colors"
          >
            LINKSUPPLIED
          </Link>
        </div>

        {/* ── Desktop Capsule / Pill Navigation Bar ── */}
        <div className="hidden md:flex items-center">
          <div className="h-[34px] p-0.5 rounded-full bg-ink/[0.04] border border-ink/[0.06] flex items-center gap-0.5 relative">
            {/* Dropdown 1: Product (Accessible only in active Demo Mode) */}
            {isDemo && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "product" ? null : "product")
                  }
                  className={`relative h-[28px] px-3 rounded-full flex items-center gap-1 text-xs tracking-normal font-medium transition-colors cursor-pointer z-10 ${
                    isProductActive || openDropdown === "product"
                      ? "text-ink font-semibold"
                      : "text-slate hover:text-ink"
                  }`}
                  aria-expanded={openDropdown === "product"}
                  aria-haspopup="true"
                >
                  {(isProductActive || openDropdown === "product") && (
                    <motion.span
                      layoutId="nav-capsule-active-pill"
                      className="absolute inset-0 rounded-full bg-surface shadow-xs border border-ink/[0.06] -z-10"
                      transition={SPRING.capsule}
                    />
                  )}
                  <span>Product</span>
                  <CaretDown
                    size={11}
                    weight="bold"
                    className={`transition-transform duration-200 ${
                      openDropdown === "product" ? "rotate-180 text-copper" : "text-slate/60"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === "product" && (
                    <motion.div
                      key="product-dropdown"
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="absolute left-0 top-full mt-2 w-72 p-2 rounded-2xl bg-surface/95 border border-ink/[0.08] shadow-[0_12px_32px_rgba(26,26,46,0.1)] space-y-1 z-50 backdrop-blur-xl"
                    >
                      {PRODUCT_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                              active
                                ? "bg-paper border border-ink/[0.06] text-ink font-medium"
                                : "hover:bg-paper/70 text-ink"
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-copper/10 text-copper flex items-center justify-center shrink-0 mt-0.5">
                              <Icon size={15} weight="bold" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-ink leading-tight">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate mt-0.5 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* How It Works Link */}
            <div className="relative">
              <Link
                href="/how-it-works"
                className={`relative h-[28px] px-3 rounded-full flex items-center text-xs tracking-normal font-medium transition-colors cursor-pointer z-10 ${
                  pathname === "/how-it-works"
                    ? "text-ink font-semibold"
                    : "text-slate hover:text-ink"
                }`}
              >
                {pathname === "/how-it-works" && (
                  <motion.span
                    layoutId="nav-capsule-active-pill"
                    className="absolute inset-0 rounded-full bg-surface shadow-xs border border-ink/[0.06] -z-10"
                    transition={SPRING.capsule}
                  />
                )}
                <span>How It Works</span>
              </Link>
            </div>

            {/* Verification Link */}
            <div className="relative">
              <Link
                href="/verification"
                className={`relative h-[28px] px-3 rounded-full flex items-center text-xs tracking-normal font-medium transition-colors cursor-pointer z-10 ${
                  pathname === "/verification"
                    ? "text-ink font-semibold"
                    : "text-slate hover:text-ink"
                }`}
              >
                {pathname === "/verification" && (
                  <motion.span
                    layoutId="nav-capsule-active-pill"
                    className="absolute inset-0 rounded-full bg-surface shadow-xs border border-ink/[0.06] -z-10"
                    transition={SPRING.capsule}
                  />
                )}
                <span>Verification</span>
              </Link>
            </div>

            {/* About Link */}
            <div className="relative">
              <Link
                href="/about"
                className={`relative h-[28px] px-3 rounded-full flex items-center text-xs tracking-normal font-medium transition-colors cursor-pointer z-10 ${
                  pathname === "/about"
                    ? "text-ink font-semibold"
                    : "text-slate hover:text-ink"
                }`}
              >
                {pathname === "/about" && (
                  <motion.span
                    layoutId="nav-capsule-active-pill"
                    className="absolute inset-0 rounded-full bg-surface shadow-xs border border-ink/[0.06] -z-10"
                    transition={SPRING.capsule}
                  />
                )}
                <span>About</span>
              </Link>
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "resources" ? null : "resources")
                }
                className={`relative h-[28px] px-3 rounded-full flex items-center gap-1 text-xs tracking-normal font-medium transition-colors cursor-pointer z-10 ${
                  (isResourcesActive && pathname !== "/how-it-works" && pathname !== "/about") || openDropdown === "resources"
                    ? "text-ink font-semibold"
                    : "text-slate hover:text-ink"
                }`}
                aria-expanded={openDropdown === "resources"}
                aria-haspopup="true"
              >
                {((isResourcesActive && pathname !== "/how-it-works" && pathname !== "/about") || openDropdown === "resources") && (
                  <motion.span
                    layoutId="nav-capsule-active-pill"
                    className="absolute inset-0 rounded-full bg-surface shadow-xs border border-ink/[0.06] -z-10"
                    transition={SPRING.capsule}
                  />
                )}
                <span>Resources</span>
                <CaretDown
                  size={11}
                  weight="bold"
                  className={`transition-transform duration-200 ${
                    openDropdown === "resources" ? "rotate-180 text-copper" : "text-slate/60"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openDropdown === "resources" && (
                  <motion.div
                    key="resources-dropdown"
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: DURATION.fast, ease: EASE.out }}
                    className="absolute left-0 top-full mt-2 w-72 p-2 rounded-2xl bg-surface/95 border border-ink/[0.08] shadow-[0_12px_32px_rgba(26,26,46,0.1)] space-y-1 z-50 backdrop-blur-xl"
                  >
                    {RESOURCE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                            active
                              ? "bg-paper border border-ink/[0.06] text-ink font-medium"
                              : "hover:bg-paper/70 text-ink"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-ink/[0.05] text-ink flex items-center justify-center shrink-0 mt-0.5">
                            <Icon size={15} weight="bold" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-ink leading-tight">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate mt-0.5 leading-snug">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Desktop: Right Actions (Matched corner radius & height) ── */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            href="/early-access"
            className="h-[34px] px-3.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-surface hover:bg-paper text-ink/85 hover:text-ink border border-ink/[0.12] hover:border-ink/[0.22] transition-all shadow-2xs cursor-pointer active:scale-[0.97]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
            <span>Early Access</span>
          </Link>

          {!isOnDiscover && (
            <Link
              href="/discover"
              className="btn-shimmer h-[34px] px-4 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-copper hover:bg-copper-muted text-surface shadow-xs border border-copper/30 transition-all cursor-pointer hover:shadow-md hover:shadow-copper/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
            >
              <span>Submit requirement</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          )}
        </div>

        {/* ── Mobile: Menu Button ───────────────────────────────── */}
        <div className="md:hidden flex items-center">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate hover:text-ink hover:bg-ink/[0.05] border border-ink/[0.08] transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile: Full-screen overlay menu ────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#f8f7f4" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Mobile menu header */}
        <div className="h-[54px] px-4 border-b border-ink/[0.06] flex items-center justify-between max-w-5xl mx-auto">
          <Link
            href="/"
            className="text-ink font-bold text-[15px] tracking-[-0.01em] select-none"
            onClick={() => setMobileOpen(false)}
          >
            LINKSUPPLIED
          </Link>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate hover:text-ink hover:bg-ink/[0.05] border border-ink/[0.08] transition-colors cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Mobile menu content */}
        <div
          className={`max-w-md mx-auto px-5 transition-all duration-300 ease-out overflow-y-auto max-h-[calc(100vh-54px)] pb-8 ${
            mobileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3"
          }`}
          style={{ transitionDelay: mobileOpen ? "80ms" : "0ms" }}
        >
          <div className="pt-4 space-y-5">
            {/* Group 1: Platform Navigation */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate/50 px-2 block">
                Platform
              </span>
              <div className="flex flex-col gap-1">
                {TOP_NAV_ITEMS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between text-sm py-2.5 px-3.5 rounded-full transition-colors min-h-[42px] ${
                        isActive
                          ? "text-ink font-semibold bg-surface border border-ink/[0.08] shadow-2xs"
                          : "text-slate hover:text-ink active:bg-ink/[0.03]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.title}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-copper" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Product (Demo mode only) */}
            {isDemo && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate/50 px-2 block">
                  Product (Demo)
                </span>
                <div className="flex flex-col gap-1">
                  {PRODUCT_ITEMS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center justify-between text-sm py-2.5 px-3.5 rounded-full transition-colors min-h-[42px] ${
                          isActive
                            ? "text-ink font-semibold bg-surface border border-ink/[0.08] shadow-2xs"
                            : "text-slate hover:text-ink active:bg-ink/[0.03]"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{link.title}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-copper" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Group 3: Resources */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate/50 px-2 block">
                Resources
              </span>
              <div className="flex flex-col gap-1">
                {RESOURCE_ITEMS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between text-sm py-2.5 px-3.5 rounded-full transition-colors min-h-[42px] ${
                        isActive
                          ? "text-ink font-semibold bg-surface border border-ink/[0.08] shadow-2xs"
                          : "text-slate hover:text-ink active:bg-ink/[0.03]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{link.title}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-copper" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <hr className="my-2 border-ink/[0.06]" />

            {/* Actions & Account */}
            <div className="space-y-2.5 pt-1">
              {/* Early Access Button */}
              <Link
                href="/early-access"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-ink/90 bg-surface hover:bg-paper border border-ink/[0.12] px-4 py-3 rounded-full text-center active:scale-[0.98] min-h-[44px] shadow-2xs"
                onClick={() => setMobileOpen(false)}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
                <span>Early Access Program</span>
              </Link>

              {/* Primary action */}
              <Link
                href="/discover"
                className="btn-shimmer w-full inline-flex items-center justify-center gap-2 text-xs font-semibold bg-copper hover:bg-copper-muted text-surface px-4 py-3 rounded-full text-center active:scale-[0.98] min-h-[44px] shadow-xs border border-copper/30"
                onClick={() => setMobileOpen(false)}
              >
                <span>Submit requirement</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
