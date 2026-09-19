import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-ink text-silver/80 mt-auto overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(248,247,244,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,247,244,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 grid-page py-14 md:py-16">
        <div className="col-content">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2 space-y-3">
              <Link
                href="/"
                className="text-surface font-semibold text-[16.5px] tracking-[0.01em]"
              >
                LINKSUPPLIED
              </Link>
              <p className="text-xs sm:text-sm leading-relaxed max-w-[32ch] text-silver/60">
                Business discovery, intelligence, and capability matching. Finding qualified manufacturing facilities that fit your exact engineering requirements.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-3.5 font-semibold">
                Product
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                <li>
                  <Link
                    href="/discover"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/verification"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Verification
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Business */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-3.5 font-semibold">
                For business
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                <li>
                  <Link
                    href="/register"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Join as supplier
                  </Link>
                </li>
                <li>
                  <Link
                    href="/early-access"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Early access
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company & Legal */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-3.5 font-semibold">
                Company
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-surface transition-colors duration-200"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-silver/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-[11px] text-silver/35 font-mono">
              &copy; {new Date().getFullYear()} LINKSUPPLIED. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-xs text-silver/40 font-mono text-[11px]">
              <span>Confidential B2B Procurement</span>
              <span>·</span>
              <span>Truthful Sourcing Standards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
