import Link from "next/link";

const productLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/discover", label: "Discover" },
  { href: "/verification", label: "Verification" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/register", label: "Register your business" },
];

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
      <div className="relative z-10 grid-page py-16">
        <div className="col-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="text-surface font-semibold text-[17px] tracking-[0.01em]"
              >
                LINKSUPPLIED
              </Link>
              <p className="mt-3 text-sm leading-relaxed max-w-[28ch] text-silver/60">
                Business discovery, intelligence, and matching. Find the
                businesses that actually fit.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-4">
                Product
              </h3>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-surface transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-surface transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-silver/40 mb-4">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <span className="text-sm text-silver/40">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-sm text-silver/40">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-silver/[0.08]">
            <p className="text-[11px] text-silver/30 font-mono">
              &copy; {new Date().getFullYear()} LINKSUPPLIED. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
