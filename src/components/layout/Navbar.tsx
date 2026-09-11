"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/discover", label: "Discover" },
  { href: "/verification", label: "Verification" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-ink/[0.04]">
      <nav
        className="grid-page h-16"
        aria-label="Main navigation"
      >
        <div className="col-content flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-ink font-semibold text-[17px] tracking-[0.01em] select-none"
          >
            LINKSUPPLIED
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "text-ink font-medium"
                      : "text-slate hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className="text-[13px] text-slate hover:text-ink transition-colors duration-200 px-3 py-1.5"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-[13px] font-medium text-surface bg-copper hover:bg-copper-muted transition-all duration-200 px-4 py-2 rounded-lg active:scale-[0.98]"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate hover:text-ink transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-b border-ink/[0.04]">
          <div className="grid-page">
            <div className="col-content pb-4">
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm py-2.5 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-ink font-medium bg-ink/[0.03]"
                          : "text-slate hover:text-ink hover:bg-ink/[0.02]"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <hr className="my-2 border-ink/[0.04]" />
                <Link
                  href="/login"
                  className="text-sm text-slate hover:text-ink py-2.5 px-3 rounded-lg hover:bg-ink/[0.02] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-surface bg-copper hover:bg-copper-muted transition-colors px-4 py-2.5 rounded-lg text-center mt-1 active:scale-[0.98]"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
